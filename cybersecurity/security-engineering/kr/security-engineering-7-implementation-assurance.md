# Implementation Assurance

## Design vs. Code Assurance

구현된 프로그래밍 코드를 검증할 때는 해당 프로그래밍 코드를 모델링하고 제대로 구현되었는지 증명한다. 예전에는 코드를 모델링하는 기술은 많지 않았는데 그 이유는 `abstraction gap`이 너무 커졌기 때문이다.

<br>

<img src="../images/security-engineering-7-implementation-assurance-1.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.0.2.png?raw=true" alt="drawing" width="640"/>

<br/>

설계도를 모델링할 때와 실제 구현된 코드를 모델링할 때 구현된 코드를 모델링할 때가 `abstraction gap`이 더욱 커진다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.0.3.png?raw=true" alt="drawing" width="640"/>

<br/>

하지만 지금은 기술이 많이 발전하여 코드를 잘 모델링할 수 있는 툴이 많이 개발되었고, `abstraction gap`이 많이 줄어 수학적으로 증명할 수 있는 시대가 되었다. 하지만 여전히 포인터 연산이나 반복문을 많이 사용하면 모델링하기가 어렵다.

하지만 포인터 연산은 배열로 대체하거나, 반복문은 1번만 하는 것으로 바꿔 단순화시키는 방법 등을 쓸 수 있다. 하지만 이럴 경우 실제 구현과는 차이가 생겨 `abstraction gap`이 커질 수 있지만 기술이 많이 발전하고 있다.

<br/>

## Contents

### Ⅰ. Software Testing

- `Static Testing` vs. `Dynamic Testing` (e.g.) DART
- `Black-Box Testing` vs. `White-Box Testing`
- `Model-Driven Testing`
  - 1.1. Criteria-Based Test Design
    - Input Space Partition Coverage
    - Graph Coverage
    - Logic Coverage
    - Syntax Coverage (∋ Model-Based Testing)
  - 1.2. Agile Methods & Testing

<br/>

`Software Testing`은 계산기의 기능을 검사하는 것과 같다. e.g. 1+1=2가 나오는지 검사해보는 것이다. 하지만 모든 숫자에 대해서 테스팅을 하는 것은 불가능하다. 따라서 랜덤한 값을 넣어서 테스팅을 하게 되는데, 그럴 경우 `test coverage`가 100%가 아니기 때문에 오류가 발생할 가능성이 남아있다.

`Software Testing`을 할 때 중요한 점은 `test coverage`를 얼마만큼 달성하는가이다.

`Model-Driven Test Design` 방법은 `test coverage`를 정확하게 계산해 낼 수 있는 방법이다. 실제 현장에서 하는 기법은 대부분 `Model-Driven Test Design` 방법들이다.

<br/>

### Ⅱ. Software Verification via Automated Reasoning

- `Automated Reasoning Tools`
  - 1.1. Symbolic Execution 
    - (e.g.) Microsoft’s SAGE (Not verification but testing)
  - 1.2. Model Checking
    - BLAST model checker
    - Mayhem
    - OpenSSL HMAC
    - Verified Crypto Library, HACL*
    - Cryptol

<br/>

`software verification`은 실제로 소프트웨어가 설계도대로 구현되었다는 것을 수학적으로 증명하는 것이다.

<br/>

## 1. Software Testing

<br/>

### (1) The Term Bug

A `Bug` is used informally.

<img src="../images/security-engineering-7-implementation-assurance-1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (2) Software Faults, Errors & Failures

- `Software Fault`: 소프트웨어 소스코드가 갖고 있는 정적 결함(static `defect`) = `Cause of a problem`
- `Software Error`: `Fault`로 인해 만들어진 불안정한(incorrect) 내부 상태(`internal` state) = `Erroneous program state caused by execution of the defect(fault)`
- `Software Failure`: 요구사항이나 정상적일 경우 기대되는 행동과는 다른 외부적으로(`external`) 나타나는 불안정한 행동 = `Propagation of erroneous state to the program outputs`

<br/>

#### Example

<img src="../images/security-engineering-7-implementation-assurance-1.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`int i=1` 부분이 소스코드에 있는 결함이므로 `Fault`이다.

`i=1`로 시작하는 순간 이미 부정확한 상태인 `Error`가 발생한 상태이다.

`Test1`에서는 `Error`는 발생했지만 `Failure`는 발생하지 않았다.

`Test2`에서는 `Error`가 발생하였고 `Failure`도 발생하였다.

<br/>

테스팅할 때 실제로 내가 입력한 테스트 값이 컴퓨터의 소스코드의 결함(`fault`)에 도달하여 내부상태를 불안정하게 만들고(`error`) 그것이 밖으로 표출되도록(`failure`) 만들어야 좋은 테스트 값이다.

<br/>

### (3) Software Failures

자동차, 항공사 등에서는 `safety`에 대해서는 엄격하게 테스팅을 하지만 `security`는 많이 고려하지 않았었다. 하지만 유럽이 자동차 업계에서 `safety` 뿐만 아니라 `security`까지 고려하도록 강요하고 있으며, 이를 지키지 않으면 자동차를 수출하지 못하도록 규제하고 있다.

<br/>

### (4) Testing in the 21st Century

<br/>

### (5) What is Software Testing?

- `Testing`: process of finding input values to check against a software. 테스팅에서 제일 중요한 것은 어떤 테스트 입력값(테스트 벡터)을 테스트할 때 넣어야 하는지를 결정하는 것이다.
- `Debugging`: process of finding a fault given a failure. 소스코드에 있는 `fault`로 인해 외부로 `failure`가 표출이되면, 역으로 내부의 불안정한 상태(`error`)를 쫓아서 소스코드에 있는 결함(`fault`)을 추적하는 과정이다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.5.1.png?raw=true" alt="drawing" width="640"/>

<br/>

테스팅을 할 때 가능한 모든 경우의 수를 다 테스트할 수 없기 때문에 가급적 적은 테스트 입력으로 많은 부분을 검사하려고 한다. 하지만 모든 곳을 검사한 것은 아니기 때문에 `test coverage`가 100%가 아니므로 ***테스팅은 `failure`가 있다는 것은 알려줄 수 있지만 `failure`가 없다는 것은 알려줄 수 없다.***

<br/>

### (6) Type of SW Testing

<br/>

#### 6.1. `Static Testing` (Static Test Generation) : Testing without executing the program

`정적 테스팅`은 소스코드를 보고 결함들을 찾아내는 것이다. ***프로그램을 실행시키지 않고*** 소스코드를 보고 하는 테스트이다.

사실 개발자가 가장 많이 하는 것은 정적 테스팅이다.

<br/>

#### 6.2. Dynamic Testing (Dynamic Test Generation) : Testing by executing the program with real inputs

***프로그램을 실제로 실행(execution)하여*** 테스팅하는 것이다. `동적 테스팅`이라고 해서 소스코드를 보지 않는 것은 틀린 말이다. ***예를 들어 `DART`는 `동적 테스팅`이지만 `소스코드`를 보면서 테스트한다.***

오래된 회사의 옛날에 만든 `legacy software`는 소스코드가 없기 때문에 `dynamic testing`을 할 수 밖에 없다.

<br/>

#### Systematic Dynamic Testing, `DART`

`Directed Automated Random Testing`

<img src="../images/security-engineering-7-implementation-assurance-1.6.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.6.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

#### DART Example

<img src="../images/security-engineering-7-implementation-assurance-1.6.2.3.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.6.2.4.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.6.2.5.png?raw=true" alt="drawing" width="640"/>

<br/>

위 예제에서 랜덤하게 선택한 x, y 값을 입력하여 DART 테스트를 실행하면, `if (f(x) == x + 10)` 조건은 만족하지 않기 때문에 `abort();` 함수로 가는 경로는 테스트되지 않는다.

체크하지 못한 경로를 검사하기 위해서 조건문의 부호를 바꿔서 `if (f(x) != x + 10)`로 만들어서 해당 경로를 테스트한다.

<br/>

#### 6.3. Black-Box Testing

- `Black-Box Testing`: 소스코드를 보지 않고 테스팅하는 것

<br/>

#### 6.4. White-Box Testing

- `White-Box Testing`: 소스코드를 보면서 테스팅하는 것

<br/>

#### 6.5. Model-Driven Testing: TBD

- `Model-Driven Testing`: 소프트웨어를 모델로 추상화시키고 어떤 테스트 입력을 넣었을 때 coverage가 최대화될 지 생각하여 테스트 값을 만들어내는 것

<br/>

### 7. Validation & Verification (IEEE)

<img src="../images/security-engineering-7-implementation-assurance-1.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Validation`: "Are you building the right thing?" 살기 좋은 집 만들었니? 고객의 needs를 완전히 파악하여 실제 해당 고객이 생각하는 살기 좋은 집을 만들어서 만족시키는 것
- `Verification`: "Are you building it right?" 집 설계도대로 제대로 만들었니? regulation, requirement, specification에 맞게 만들어졌는가?

IV&V stands for "Independent Verification and Validation".

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>






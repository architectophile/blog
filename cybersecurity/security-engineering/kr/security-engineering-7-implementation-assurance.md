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

### (7) Validation & Verification (IEEE)

<img src="../images/security-engineering-7-implementation-assurance-1.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Validation`: "Are you building the right thing?" 살기 좋은 집 만들었니? 고객의 needs를 완전히 파악하여 실제 해당 고객이 생각하는 살기 좋은 집을 만들어서 만족시키는 것
- `Verification`: "Are you building it right?" 집 설계도대로 제대로 만들었니? regulation, requirement, specification에 맞게 만들어졌는가?

IV&V stands for "Independent Verification and Validation".

<br/>

### (8) Testing and SW Development Lifecycle

<img src="../images/security-engineering-7-implementation-assurance-1.8.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (9) Testing Goals Based on Test Maturity

#### Beizer’s scale for test process maturity

- `Level 0` – There’s no difference between testing and debugging. 테스팅과 디버깅을 구분하지 못함.
- `Level 1` – The purpose of testing is to show that the software works. i.e. correctness. 정확성을 따지는데 집중되어 있음.
- `Level 2` – The purpose of testing is to show that the software doesn’t work. 소프트웨어에 결함이 있다는 것을 찾아내는 것이 목적임.
- `Level 3` – The purpose of testing is not to prove anything specific, but to reduce the risk of using the software. 테스팅이 소프트웨어의 리스크를 줄이는데 목적이 있음. 리스크 관리 관점에서 테스팅을 함. 시간이 한정되어 있기 때문에 가장 급한 것부터 문제를 해결함.
- `Level 4` – Testing is a mental discipline that helps all IT professionals develop higher quality software. The testers should train your developers. 테스팅은 품질관리하는 직원만 하는 것이 아니고, 개발라인에 있는 모든 사람들이 테스팅을 하는 것.

<br/>

#### `Shift Left Testing`

테스팅 업무를 왼쪽으로 옮기는 것이다. 요구사항 분석, 설계, 구현하는 사람들이 자신들이 할 수 있는 테스트를 모두 하는 것이다. 오른쪽 끝에만 몰려있던 테스팅 과정을 왼쪽에 있는 모든 사람들에게 전사적으로 퍼뜨린다. 요구사항 분석이나, 설계 단계에 문제가 있을 경우 사전에 발견할 수 있다. 보안팀에서는 개발자들이 쉽게 테스트할 수 있는 자동화 툴과 보안개발 교육을 제공해야 한다. 

<br/>

### (10) Cost of Not Testing

Poor Program Managers might say: ***“Testing is too expensive."***

Testing is the most time consuming and expensive part of software development.

Not testing is even more expensive. 테스팅을 하지 않는 것이 훨씬 많은 비용을 부담하게 된다.

<br/>

### (11) Cost of Late Testing

<img src="../images/security-engineering-7-implementation-assurance-1.11.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-1.11.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

비용대비 효과 `Return Of Investment (ROI)`는 `design state`에서 결함을 발견했을 때 가장 높다.

<br>

## 2. Model-Driven Test Design

테스트 입력 값을 도출하는데 과학적 기법을 사용한다. 적은 수의 테스트 벡터로 coverage를 극대화할 수 있다. 하지만 test coverage가 100%는 아니다.

<br/>

### (1) Testing & Debugging

- Testing : Evaluating software by observing its execution.
- Test Failure : Execution of a test that results in a software failure.
- Debugging : The process of finding a fault given a failure.

<br/>

### (2) Fault & Failure Model (RIPR)

`failure`를 발견하기 위해서는 다음의 4가지가 필요하다.

1. `Reachability` : The location or locations in the program that contain the `fault` must
be reached. 테스트 입력을 넣으면 소프트웨어의 결함이 있는 곳까지 도달해야 한다.
2. `Infection` : Execution of the fault leads to an incorrect program state (`error`). 테스트 입력이 결함에 도달하여 프로그램을 내부적으로 incorrect한 상태로 만들어야 한다.
3. `Propagation` : The infected state must cause some output or final state of the program to be incorrect (`failure`). 내부의 incorrect한 상태가 전이되어서 최종적으로 incorrect한 상태로 외부로 표출되어야 한다.
4. `Reveal` : The tester must observe part of the incorrect portion of the program state. 프로그램의 최종 상태 중에서 failure가 발생한 결과를 실제 테스터가 발견해야 한다. 랜덤 샘플링 테스팅을 할 경우 failure가 발생한 상태를 관찰하지 못할 수도 있다.

<img src="../images/security-engineering-7-implementation-assurance-2.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 모델을 `RIPR`모델 또는 `Fault, Error, Failure 모델`이라고도 부른다.

가끔 정부에서 제품 평가 기간을 단축하기 위해서 랜덤 샘플링을 통해 문서를 검증하는 경우가 있다. 전체가 1만장이라면, 100장만 랜덤 샘플링하여 검증하는 것인데, 이것은 매우 문제가 많다. 검사하지 않은 문서에 문제가 있을 가능성이 있기 때문에 위험하다.

<br/>

### (3) Testing Levels and Types of Faults

<img src="../images/security-engineering-7-implementation-assurance-2.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (4) Traditional Testing Levels

<img src="../images/security-engineering-7-implementation-assurance-2.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-2.4.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Unit testing`

- `Module testing`

- `Integration testing`: 모듈과 모듈 간의 결합을 테스트한다. e.g. 미국에서 만든 모듈과 유럽에서 만든 모듈을 결합했을 때 문제가 발생했는데, 그 원인은 단위에 대한 메트릭이 달라서 발생한 것이었다. 이 때문에 `Integration test`가 필요하다.

- `System testing`: 시스템 전체의 동작을 테스트한다. 각 컴포넌트의 안전성이 증명되었다고 해서 컴포넌트들을 결합했을 때도 안전성이 증명되는 것은 아니기 때문에 `security composition`에서 발생할 수 있는 문제를 찾기 위해 `System test`가 필요하다.

`Unit testing`, `Module testing`, `Integration testing`, `System testing` 4단계는 `Verification` 과정이다.

- `Acceptance testing`: 최종적으로 사용자를 만족시키는지 테스트한다. 이 과정은 `Validation`에 해당한다.

<br/>

### (5) Object-Oriented Testing Levels

<img src="../images/security-engineering-7-implementation-assurance-2.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `intra-method testing`: 메소드 내 테스팅
- `inter-method testing`: 메소드 간 테스팅
- `intra-class testing`: 클래스 내 테스팅
- `inter-class testing`: 클래스 간 테스팅

<br/>

### (6) Software Testing Limitations

The problem of finding all failures in a program is undecidable. 프로그램의 모든 failure를 찾아내는 것은 현실적으로 불가능하다.

Trying to find the fewest inputs that will find the most problems. 따라서 우리는 최대한 적은 입력으로 가능한 많은 문제를 찾을 수 있는 테스트 입력 값을 찾도록 해야 한다.

`Coverage criteria` give structured, practical ways to search the input space. 테스트 입력을 넣었을 때 소프트웨어의 몇 %까지 점검할 수 있는가를 나타낸다. 따라서 우리는 `coverage criteria`를 극대화해야 한다. 

적은 입력으로 coverage를 극대화하기 위해서는 입력값들이 테스트하는 영역이 최대한 겹치지 않는 것이 효율적인 방법이다. 이를 위해서 모델링을 통한 과학적인 테스트 입력 도출 방법이 필요하다.

<br/>

### (7) Test Requirements and Criteria

- `Test Criterion` : A collection of rules and a process that define test requirements
- `Test Requirements` : Specific things that must be satisfied or covered during testing

<br/>

<img src="../images/security-engineering-7-implementation-assurance-2.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Coverage Criteria`: 각 기준들이 모인 것
- `Coverage Criterion`: 테스트를 위한 기준. e.g. 모든 조건문은 테스트하여라.
- `Test Requirements`: 각 기준을 구체화하여 테스트 요구사항을 도출
- `Test Set`: 여러개의 test case로 이루어진 것
- `Test Case`: test requirements를 만족하는 실제 test case

<img src="../images/security-engineering-7-implementation-assurance-2.7.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

- `prefix values`: 테스트를 하기 전에 환경을 설정하는 값(테스트 환경을 언제나 똑같이 맞춰줌). 준비단계
- `test case values`: 환경 설정이 완료되면 실제로 넣는 테스트 케이스 값
- `postfix values`: 테스트가 끝나고 마무리 작업에 들어가는 값. 테스트 케이스 값에 의해 발생한 failure가 실제로 외부로 표출되도록 한다.
- `expected values`: 위 준비 과정 이후에 테스트 케이스를 넣었을 때 나올 것으로 예상되는 결과 값

<br/>






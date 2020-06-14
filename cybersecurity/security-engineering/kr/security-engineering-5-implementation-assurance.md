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

## 1. Ⅰ. Software Testing

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

<img src="../images/security-engineering-7-implementation-assurance-2.7.1.3.png?raw=true" alt="drawing" width="640"/>

<br/>

소프트웨어를 테스트할 때 `Coverage Criteria`는 어떤 모델링 기법을 사용하느냐에 따라서 기준이 달라진다.

대표적인 4개의 S/W 모델은 다음과 같다:

1. `Input domains`: 입력을 이용해서 모델링하는 것. 성질이 비슷한 입력값들의 대표값을 넣어서 테스트 한다.
2. `Graphs`: 그래프를 활용하여 모델링하는 것. e.g. control flow graph
3. `Logic expressions`: 조건문을 이용해 모델링하는 것. 조건문을 놓고 각각의 값이 true, false일 때 진리표를 만들어서 각 경우의 조건에 맞는 테스트 값을 넣는다.
4. `Syntax descriptions`: 문법을 이용해서 모델링하는 것. e.g. mutation 등을 생성한다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-2.7.1.4.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Generator`: 기준을 주면 알아서 test case를 만들어주는 도구. 만들기 매우 어렵다.
- `Recognizer` : test case를 주고 기준을 주면, 해당 기준을 몇 % 충족하는지 coverage를 검사하는 도구. 상대적으로 쉽다. e.g. `Coverage Analysis Tool`

<br/>

#### Example: Jelly Bean Coverage

<img src="../images/security-engineering-7-implementation-assurance-2.7.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Jelly Bean`을 만들어서 파는 회사는 제품을 검사할 때 모든 6가지 맛과 모든 4가지의 색깔에 대해서 테스트해야 한다.

이 때 가능한 기준들(`Coverage Criteria`)은 다음과 같다:

1. C<sub>1</sub>: Taste one jelly bean of each flavor. 모든 맛의 젤리빈을 맛볼 것. (`Coverage Criterion 1`)
2. C<sub>2</sub>: Taste one jelly bean of each color. 모든 색깔의 젤리빈을 맛볼 것. `(Coverage Criterion 2`)

<br/>

위의 기준(C<sub>1</sub>, C<sub>2</sub>)에 따라서 `test requirements`를 다음과 같이 도출한다:

1. TR<sub>1</sub>: `Test requirements` for C<sub>1</sub>

- tr<sub>1</sub>: Lemon
- tr<sub>2</sub>: Pistachio
- tr<sub>3</sub>: Cantaloupe
- tr<sub>4</sub>: Pear
- tr<sub>5</sub>: Tangerine
- tr<sub>6</sub>: Apricot

TR<sub>1</sub> = `{Lemon, Pistachio, Cantaloupe, Pear, Tangerine, Apricot}`

<br/>

2. TR<sub>2</sub>: `Test requirements` for C<sub>2</sub>

- tr<sub>1</sub>: Yellow
- tr<sub>2</sub>: Green
- tr<sub>3</sub>: Orange
- tr<sub>4</sub>: White

TR<sub>2</sub> = `{Yellow, Green, Orange, White}`

<br/>

위에서 도출한 `test requirements`에 맞는 `test set`을 도출한다:

T<sub>1</sub> = `{3 Lemons, 1 Pistachio, 2 Cantaloupes, 1 Pear, 1 Tangerine, 4 apricots}`

Test set T<sub>1</sub>은 C<sub>1</sub>을 충족하는가?

→ `Test set 1`에는 모든 맛이 포함되어 있기 때문에 T<sub>1</sub>은 C<sub>1</sub>을 충족한다.

<br/>

T<sub>2</sub> = `{1 Lemon, 2 Pistachios, 1 Pear, 3 Tangerines}`

Test set T<sub>2</sub>는 C<sub>1</sub>을 충족하는가?

→ `Test set 2`에는 모든 맛이 포함되어 있지 않기 때문에 T<sub>2</sub>는 C<sub>1</sub>을 충족하지 않는다.

<br/>

Test set T<sub>2</sub>는 C<sub>2</sub>을 충족하는가?

→ `Test set 2`에는 모든 색깔이 포함되어 있기 때문에  T<sub>2</sub>는 C<sub>2</sub>를 충족한다.

<br/>

#### Coverage Level

<img src="../images/security-engineering-7-implementation-assurance-2.7.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`Coverage Level`은 전체 `Test requirements` 중에서 몇 개의 `test requirements`가 해당 테스트에 의해 충족되는가를 나타낸다.

따라서 T<sub>1</sub>의 TR<sub>1</sub>에 대한 `coverage level = 6/6`이다.

따라서 T<sub>2</sub>의 TR<sub>1</sub>에 대한 `coverage level = 4/6`이다.

따라서 T<sub>2</sub>의 TR<sub>2</sub>에 대한 `coverage level = 4/4`이다.

<br/>

### (8) Model-Driven Test Design (MDTD)

테스트도 수학적 방식으로 과학적으로 해야 테스트 효율을 높일 수 있다. 즉 적은 입력으로 높은 coverage를 달성할 수 있다.

`Model-Driven Test Design`에서는 정적 분석, 동적 분석, 블랙박스, 화이트박스 등이 중요한 것이 아니고, 그저 `Coverage Level`을 높이는 것이 중요하다고 말한다.

<br/>

### (9) Software Testing Activities

<img src="../images/security-engineering-7-implementation-assurance-2.9.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

1. `Test Design`: 어떤 테스트 입력을 넣어야 적은 입력으로 test coverage를 극대화할 수 있을지 고민하여 테스트 입력을 도출하는 것
2. `Test Automation`: 테스트 실행을 자동화하는 것
3. `Test Execution`: 테스트를 실행하는 것
4. `Test Evaluation`: 테스트 결과를 분석하는 것

테스트에서 가장 중요하고 창조적이면서 어려운 일은 `1. Test Design`이다. 즉 기준을 설정하고 어떤 테스트 입력 값을 넣어야 어떤 test requirements를 충족하는지를 결정하는 것이 매우 중요하다.

그 다음으로 어려운 것은 `4. Test Evaluation`이다. 테스트 결과를 놓고 테스트 입력을 넣고 테스트한 후에 결과를 놓고 요구사항을 얼마나 만족시키는지 얼마만큼 테스트가 되었는지 분석하고 평가하여 제품을 출시할 수 있는지 결정해야 한다.

<br/>

### (10) Other Activities

<br/>

#### Test management

<br/>

#### Test maintenance

<br/>

#### Test documentation

- `Test documentation` : Test Evaluation 이후에 문서작업을 하는 것이다. 어떤 테스트를 어떻게 수행했고, 그 결과는 어떻게 기준이나 테스트 요구사항을 만족하였는지 문서로 상세하게 작성한다. All parties participate

문서작성을 잘 해야 하는 이유는 `추적성(traceability)`을 확보하기 위해서이다.

추적성이 잘 확보되었다는 것은 어떤 제품을 출시하고 취약점이 발견되었을 때, 해당 취약점이 어느 단계에서 테스트되었는지 바로 확인할 수 있고, 어떤 입력을 넣었을 때 어떻게 결과가 나왔는지 다시 확인할 수 있다는 것이다. 그리고 해당 취약점이 어떤 단계에서 문제가 있어서 발생한 것인지 찾아낼 수 있어야 한다.(e.g. 설계단계에서 결함이 있다는 것을 찾아낼 수 있다.) 만약 테스트에는 문제가 없었다면 애초에 요구사항 분석 단계에서 결함이 있었음을 알아낼 수도 있다.

따라서 개발 프로세스 상에 어떤 문제가 있는지를 찾아내고 개선하여 이후에는 같은 문제가 발생하지 않도록 할 수 있다.

<br/>

### (11) Model-Driven Test Design

<img src="../images/security-engineering-7-implementation-assurance-2.11.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

1. `software artifact`: 분석할 대상 소프트웨어. `software artifact`는 소프트웨어 및 관련된 일체를 말함. e.g. 매뉴얼이나 기타 등등 일체를 말함
2. `model structure`: 해당 소프트웨어를 모델링한 것 
3. `test requirements`: Coverage Criteria를 설정하여 `test requirements`를 도출
4. `refined requirements test specs`: 소프트웨어 모델에서 도출된 `test requirements`와 각종 규정이나 compliance로부터 도출된 `test requirements`을 하나로 합쳐서 정제된 `test requirements`를 도출한다. 또한 합칠 수 있는 요구사항들은 최대한 합쳐서 테스트 요구사항을 줄여야 테스트가 훨씬 쉬워진다.
5. `input values`: 테스트 요구사항을 충족할 수 있는 테스트 입력값들
6. `test cases`: 테스트 입력값들이 구체화된 것. prefix values, test case values, postfix values, expected values 등
7. `test scripts`: 테스트 케이스들을 자동으로 테스트할 수 있도록 작성한 스크립트
8. `test result`: 테스트 결과
9. `pass/fail`: 테스트 결과 평가

> Note:  
위 그림에서 `modeling`을 거치지 않고 `test requirements`가 바로 도출되는 경우는 소프트에어와는 전혀 상관없이 도출해야 하는 `test requirements`가 있는데, 이것들을 보통 `compliance`라고 한다. e.g. 정부기관에 들어가는 암호모듈을 seed 또는 aria 알고리즘을 사용해야 한다. e.g. 비밀번호는 8자 이상 영문자, 숫자, 특수문자를 하나 이상 포함해야 한다. 이것들은 소프트웨어와는 직접적인 관련이 없고 각종 법, 규정이나 지침으로부터 나오는 `test requirements`이다.  

<br/>

<img src="../images/security-engineering-7-implementation-assurance-2.11.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`test requirements`를 도출하고 `input value`를 생성할 때는 최대한 적은 `input values`로 모든 `test requirements`를 충족하도록 생성해야 한다.

> Note:  
`domain analysis`를 위해서는 것은 해당 소프트웨어가 사용되는 영역에 해당하는 사전지식이 필요하다. 해당 도메인에서는 어떤 규정을 따라야 하는지 등이다. `domain knowledge`가 필요하다.

<br/>

테스터는 테스팅 결과를 보고 제품을 출시할 수 있는지 없는지를 결정할 수 있어야 한다. 단순히 모의해킹 팀이 취약점을 찾아내는 것에서 그치는 것에 비해서 그 역할과 책임이 더 크다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-2.11.1.3.png?raw=true" alt="drawing" width="640"/>

<br/>

<br/>

## 3. Criteria-Based Test Design

### [Note] Input Domain Model Based Testing

<img src="../images/security-engineering-7-implementation-assurance-3.0.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-3.0.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Each Choice Coverage (ECC)`: 최소한 1개 이상의 test case에 각 성질을 대표하는 대표값을 각각 모두 넣는다.

`정삼각형` 대표값 한 개, `이등변 삼각형` 대표값 한 개, `일반 삼각형` 대표값 한 개, `삼각형에 유효하지 않은 값` 한 개를 넣어서 테스트한다.

<br/>

<br/>

### [Note] Graph Model Based Testing

<img src="../images/security-engineering-7-implementation-assurance-3.0.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Each All-defs coverage (ADC)`: 정의된 변수들이 모두 사용됐는지 검사하는 것이다.

<br/>

#### Edge Coverage

<img src="../images/security-engineering-7-implementation-assurance-3.0.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

<br/>

### [Note] Logic Model Based Testing

<img src="../images/security-engineering-7-implementation-assurance-3.0.3.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Clause Coverage (CC)`: 각 `clause`가 `true`일 때와 `false`일 때를 모두 검사하는 것이다.

<br/>

<br/>

### [Note] Syntax Model Based Testing

<img src="../images/security-engineering-7-implementation-assurance-3.0.4.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (1) Coverage Criteria

### (2) Benefits of Coverage Criteria

### (3) Changing Notions in Testing

<img src="../images/security-engineering-7-implementation-assurance-3.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (4) New : Structures and Criteria

### (5) Test Coverage Criteria

### (6) Model-Driven Test Design

<img src="../images/security-engineering-7-implementation-assurance-3.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (7) Four Structures for Modeling S/W

<img src="../images/security-engineering-7-implementation-assurance-3.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (8) Implementation of Test Criteria

- `Generator` : A procedure that automatically generates values to satisfy a criterion. `coverage criteria`를 주면 자동으로 test inputs을 생성해주는 도구. generator는 만들기 어려움. 따라서 아직도 `test inputs` 도출은 대부분 사람이 해야함.
- `Recognizer` : A procedure that decides whether a given set of test values satisfies a criterion. `test inputs` 값이 주어졌을 때 `coverage criteria`를 만족하는지 검사하는 도구. recognizer는 많이 있음.

`generator`와 `recognizer` 모두 100% 자동화시키는 것은 어렵지만 그나마 상대적으로 `recognizer`(coverage analysis tools)를 만드는 것이 더욱 쉽다.

<br/>

### (9) Comparing Criteria

<img src="../images/security-engineering-7-implementation-assurance-3.9.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Criteria Subsumption

A test criterion `C1` subsumes `C2` if and only if every set of test cases that satisfies criterion `C2` also satisfies `C1`.

위 그림에서 `C1`은 `C2`를 포함하기 때문에 `C1` 기준을 만족하면 자동으로 `C2` 기준을 만족하게 되므로 ***C1만 충족하도록 하면 된다.*** 그래야 `coverage criteria`가 줄어들고 `test requirements`의 개수가 줄어들기 때문에 테스트가 훨씬 효율적이고 쉬워진다.

따라서 `coverage criteria` 또는 `test requirements`가 도출되면 각각 포함관계를 비교하여 불필요한 중복을 없애 테스트 요구사항 개수를 최소화하는 작업이 중요하다.

<br/>

## 4. Input Space Partition Coverage

### [Note] Input Domain Model Based Testing

<img src="../images/security-engineering-7-implementation-assurance-4.0.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`input domain modeling`에서는 동일한 성질을 갖는 입력들의 카테고리를 잘 세분화해서 정확하게 나누어서 각 대표값을 도출하는 것이 중요하다. e.g. 삼각형을 분류하는 함수에서 카테고리를 정삼각형, 이등변 삼각형, 직각삼각형, 기타 삼각형, 삼각형이 되지 않는 유효하지 않는 값들로 각각 분류하여 대표값을 도출한다.

`input domain modeling`은 실제 함수의 내부 구조를 알 지 못하더라도 모델링하여 테스트 인풋을 도출할 수 있다. e.g. 라이브러리 등에서 함수형만 알고 있는 경우에도 사용할 수 있다는 장점이 있다.

<br/>

### (1) Input Domains

아무리 간단한 프로그램도 `input domain`이 너무 크거나 무한대라서 모두 테스트해볼 수 없다.

따라서 `input domain`을 각 `region(block)`으로 `partition`하여 해당 region의 `대표값`을 넣어 테스트한다.

<br/>

### (2) Overview : Input Space Partitioning

<img src="../images/security-engineering-7-implementation-assurance-4.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

1. 파티션을 나눴을 때 각 block들은 겹치면 안 된다.(`disjointness`)
2. 모든 블록을 합쳤을 때 전체 domain을 cover해야 한다.(`completeness`)

<br/>

### (3) Benefits of Input Space Partitioning

<img src="../images/security-engineering-7-implementation-assurance-4.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

매우 간단하고, 직관적이고, 효과적이다.

실제 소프트웨어 코드가 어떻게 구현되어 있는지 모르더라도 프로그램의 기능과 input domain 정도만 알고 있더라도 테스트할 수 있다. e.g. `legacy software` 등을 테스트할 때 유용하다.

<br/>

### (4) Applying Input Space Partitioning

<img src="../images/security-engineering-7-implementation-assurance-4.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

1. `Task I`: `Model input domain` → 위에서 파란색 부분은 테스트할 input domain을 잘 partitioning하는 것이다. e.g. get_index_of() 함수 예제에서 `string`과 `letter` 입력값이 각각 `empty`인지 아닌지로 나누는 것
2. `Task II`: `Choose combinations of values` → 함수에 여러가지 입력이 함께 들어올 때, 즉 combinations이 발생할 때, 경우의 수를 잘 만들어주는 것이다. e.g. get_index_of() 함수 예제에서 `string`과 `letter`의 각각 2개의 경우의 수를 곱하여 총 4개의 결합된(combinations) 입력을 도출하는 것

<br/>

### (5) Example Input Domains

<img src="../images/security-engineering-7-implementation-assurance-4.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

get_index_of() 함수는 `string`과 `letter`를 입력받아서, 해당 `stinrg`에서 해당 `letter`가 몇 번째 `index`에 있는 지를 찾아주는 함수이다.

<br/>

#### Interface-Based

<img src="../images/security-engineering-7-implementation-assurance-4.5.2.1.png?raw=true" alt="drawing" width="640"/>

<img src="../images/security-engineering-7-implementation-assurance-4.5.2.2.png?raw=true" alt="drawing" width="640"/>

<img src="../images/security-engineering-7-implementation-assurance-4.5.2.3.png?raw=true" alt="drawing" width="640"/>

<br/>

`input domain`을 가장 쉽게 나눌 수 있는 방법은 `string`과 `letter`가 `empty`이거나 아니거나로 나누는 것이다.

위 테스트는 `disjointness`와 `completeness`를 만족하지만 이렇게 `input domain`을 두 개로 단순히 나누는 테스트는 의미가 없다. 

따라서 `input domain`을 ***얼마나 정밀하게 나누는지가(partitioning) 중요하다.*** 즉, 모델링을 얼마나 정밀하게 하느냐에 따라서 테스트 입력의 퀄리티가 달라진다.

<br/>

#### Functionality-Based

<img src="../images/security-engineering-7-implementation-assurance-4.5.3.1.png?raw=true" alt="drawing" width="640"/>

<img src="../images/security-engineering-7-implementation-assurance-4.5.3.2.png?raw=true" alt="drawing" width="640"/>

<img src="../images/security-engineering-7-implementation-assurance-4.5.3.3.png?raw=true" alt="drawing" width="640"/>

<br/>

C1 → `string`에서 `letter`가 들어있는 개수: 0개, 1개, 1개 이상

C2 → `string`에서 `letter`가 첫 번째에 나오는지 아닌지: true, false

`Task II` 과정에서 combinations를 만들 때, 각 경우의 수를 계산 할 때 중복되는 것끼리 합친다.

<br/>

### (6) Choosing Combinations of Values

<img src="../images/security-engineering-7-implementation-assurance-4.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (7) ISP Coverage Criteria Subsumption

<img src="../images/security-engineering-7-implementation-assurance-4.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

## 5. Graph Coverage

### (1) Covering Graphs

`그래프(graph)`를 이용한 모델링은 가장 많이 사용되는 방법이다.

`그래프`는 여러가지 다양한 소스로부터 생성될 수 있다. 즉 프로그램 소스코드 이외에도 스펙 문서나 설계 문서를 보고 그릴 수도 있다.

- Program source → Control Flow Graphs
- Design structure
- FSMs and statecharts
- Use cases

<br/>

#### ATM Withdraw Activity Graph (Use Case Example)

<img src="../images/security-engineering-7-implementation-assurance-5.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위와 같이 그래프를 구체적으로 그려야 테스트 요구사항이 정확하게 도출된다.

누가 보더라도 똑같이 해석할 수 있기 때문에 그래프를 활용하면 모호성이 없어진다.

`test case`를 도출할 때 굳이 소스코드가 없더라도 `activity graph`만 있더라도 `test case`를 도출할 수 있다. 즉, `software artifact`(소프트웨어 및 동반되는 문서 일체) 중에서 소스코드가 없더라도 `artifact`에 속하는 `use case 문서`를 `activity graph`로 만들어서 `test case`를 도출할 수 있다. 

하지만 실제 소스코드에서 도출한 test case가 아니기 때문에 ***정밀도가 떨어질 수 있다.*** 그리고 `design spec`만 가지고 테스트를 할 때는 `coverage criteria`와 `test requirements`까지는 도출할 수 있지만 실제 대상 소스코드가 없기 때문에 `input values`를 도출해야할 때는 어떤 형태로 실제 `input values`을 넣어야할 지, 즉 `prefix values`, `test case values`, `postfix values`를 어떻게 넣어야할 지 결정하기가 어렵다.

<br/>

### (2) Testing and Covering Graphs 

- `Structural Coverage Criteria`: Defined on a graph just in terms of `'nodes'` and `'edges'`
- `Data Flow Coverage Criteria` : Requires a graph to be annotated with references to variables

<img src="../images/security-engineering-7-implementation-assurance-5.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (3) Node and Edge Coverage on Graph

<img src="../images/security-engineering-7-implementation-assurance-5.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Complete Path Coverage (CPC)` : TR contains all paths in G. 하지만 만약 그래프에 루프(loop)가 있을 경우 모든 path를 cover할 수 없다. 루프 반복횟수가 매우 큰 경우에는 모두 테스트할 수 없다.

- `Specified Path Coverage (SPC)` : TR contains a set S of test paths, where S is supplied as a parameter.

> Note:  
루프가 있을 경우 모두 테스트할 수 없기 때문에 제약조건을 주게 된다. 루프를 무시하거나 또는 일정 횟수만 반복하도록 하는 것이다. 이럴 경우 실제 소스코드와 `abstraction gap`이 발생하게 되고, 이 `gap`을 줄이기 위해 노력해야 한다.

<br/>

### (4) Structural Coverage Criteria Example

<img src="../images/security-engineering-7-implementation-assurance-5.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Complete Path Coverage`는 루프 때문에 경우의 수가 너무 많아서 모든 path를 cover할 수 없다.

<br/>

#### Control Flow Graph Transform Example

<img src="../images/security-engineering-7-implementation-assurance-5.4.2.1.png?raw=true" alt="drawing" width="462"/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-5.4.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`Control flow graph`에서는 `node`는 `명령어 자체`이고, `edge`는 control을 나타낸다. e.g. 만약 조건을 모든 `edge`를 방문할 것이라고 준다면, 이 얘기는 모든 조건문을 체크하라는 얘기와 같다.

> Note:  
`3번 노드`에 매핑되는 실제 코드는 없지만 루프를 처리하기 위해 인위적으로 넣는 노드이다. 즉 `dummy node`이다.

<br/>

### (5) Handling Loops in Graphs

If a graph contains a `loop`, it has an infinite number of paths. Thus, `CPC` is not feasible.

`SPC` is not satisfactory because the results are subjective and vary with the tester.

#### Attempts to “deal with” loops:

<img src="../images/security-engineering-7-implementation-assurance-5.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (6) Data Flow Coverage Criteria on Graph

- `Goal` : Try to ensure that values are computed and used correctly
- `Definition (def)` : A location where a value is assigned to a variable
- `Use` : A location where a variable’s value is used(accessed)

<img src="../images/security-engineering-7-implementation-assurance-5.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Applying Data Flow Coverage Example

<img src="../images/security-engineering-7-implementation-assurance-5.6.2.1.png?raw=true" alt="drawing" width="462"/>

<br/>

<img src="../images/security-engineering-7-implementation-assurance-5.6.2.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`node`는 변수가 어디에서 정의되고 어디에서 사용되는지를 나타낸다.

<img src="../images/security-engineering-7-implementation-assurance-5.6.2.3.png?raw=true" alt="drawing" width="640"/>

<br/>

`Data Flow Coverage`는 선언되었지만 한 번도 사용되지 않은 변수를 찾아내거나, 또는 선언되지 않았는데 사용되는 변수가 있는지 찾아내는데 사용될 수 있다.

<br/>

### (7) OO Software and Design Structures

객체지향 프로그래밍에서는 상속 등에 의해서 내부구조가 보기 어렵기 때문에 `control flow graph`나 `data flow graph`를 그리는 것이 쉽지 않다.

<br/>

### (8) How to Represent Design as Graph

`Call graphs` are common and very useful ways to design integration tests.
programing
`OO programming`에서는 `call graph`를 사용하는 것이 유용하다.

- `Nodes` : Units (in Java – methods)
- `Edges` : Calls to units

<img src="../images/security-engineering-7-implementation-assurance-5.8.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (9) Data Flow Criteria at the Design Level

<img src="../images/security-engineering-7-implementation-assurance-5.9.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

모듈을 만든 사람이 다를 경우 integration할 때 문제가 발생할 수 있다(e.g. 서로 다른 단위를 사용하여 문제가 발생하는 예가 있었다.). 이럴 때는 모듈 간 `interface`를 잘 맞추는 것이 중요하다. 이럴 때는 `call graph`를 그려서 각 모듈간 호출을 테스트할 수 있다.

<br/>

#### Inter-procedural DU Pairs Example

<img src="../images/security-engineering-7-implementation-assurance-5.9.2.1.png?raw=true" alt="drawing" width="320"/>

<br/>

### (10) Design Specifications

프로그램 소스코드가 없을 경우 `design specification(artifact)`을 이용해서 그래프를 그릴 수 있다.

<br/>

### (11) Finite State Machine (FSM) 

A `finite state machine (FSM)` is a `graph` that describes how software variables are modified during execution.

- `Nodes` : States, representing sets of values for key variables
- `Edges` : Transitions, possible changes in the state

<br/>

### (12) Finite State Machines are Common

<br/>

### (13) Annotations on FSMs

<img src="../images/security-engineering-7-implementation-assurance-5.13.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

> Note:  
보안성 평가는 제품에 취약점이 있다 없다를 말하는 것이 아니라, ***보안공학에서 말하는 개발 프로세스를 충실히 따랐는지를 평가하는 것이다.*** 내가 평가받을 대상 암호모듈에 대해서 `FSM`을 그려야 한다. 대상 암호모듈의 디자인 스펙을 정확하게 기호로 표현해야 한다는 뜻이다. ***따라서 코드를 구현하기 전에 `FSM`을 먼저 그리고 이에 맞게 코드를 짜야한다.*** 하지만 현실에서는 코드를 먼저 구현하고 `FSM`을 그리는 반대의 경우가 많이 발생한다.

<br/>

### (14) UML Use Cases

### (15) Simple Use Case Example

### (16) Covering Activity Graphs

#### Node Coverage
- Inputs to the software are derived from labels on nodes and predicates
- Used to form test case values

#### Edge Coverage

#### Data flow techniques do not apply

Use case를 이용해 테스트할 때는(e.g. ATM 예제), `node coverage`와 `edge coverag`e까지는 어느정도 설정할 수 있지만, ***`data flow`는 실제 소스코드의 구현 속까지 들어가야 알 수 있기 때문에 디자인 스펙의 `use case`만을 이용해 그린 그래프에서는 알 수가 없다.***

<img src="../images/security-engineering-7-implementation-assurance-5.16.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`use case activity graph`는 `전체적인 시나리오`를 테스트하는데 사용될 수 있다(e.g. 핀 4번 틀려보기, 훼손된 카드 넣어보기). 이것은 디테일보다는 상위 레벨에서 해당 소프트웨어가 달성해야 하는 큰 목표들에 대한 테스트라고 할 수 있다. 그리고 여기에 소스코드를 통해 각 목표에 대한 디테일을 테스트하는 것이 결합되어 전체적인 테스팅이 완성된다고 볼 수 있다. 이렇게 함으로써` 추적성(traceability)`이 잘 확보될 수 있다.

정량적으로 측정가능하지 않은 것은 과학적이지 않다. 측정 불가능한 것은 개선시킬 수 없다. 개발 프로세스에서 항상 개발 작업을 측정가능한가? 증명가능한가?를 고민해야 한다.

기존의 블랙박스 테스트, 화이트박스 테스트 등은 결과를 정량적으로 측정하기 어렵다. `test coverage`를 측정하기 위해서는 `Model-Driven` 테스팅을 해야 한다. 소프트웨어를 모델링하고 그 모델을 기준으로 어느정도의 coverage를 달성할 지 기준을 주면, 기준에 맞게 테스트 요구사항을 도출하고 test case를 도출하여 테스트한다.

<br/>

## 6. Logic Coverage

### [Note] Logic Model Based Testing

<img src="../images/security-engineering-7-implementation-assurance-6.0.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (1) Overview

`logic coverage` 테스트는 프로그램의 내부 동작구조까지 제어할 수 있기 때문에 매우 중요하다. 미국의 항공기 등을 테스트할 때는 반드시 `logic coverage`를 테스트한다.

Logical expressions can come from many sources.

- Decisions in programs
- FSMs and state charts
- Requirements

<br/>

### (2) Logic Predicates and Clauses

<img src="../images/security-engineering-7-implementation-assurance-6.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Predicate`: 내포하는 `clause`들의 `true` 또는 `false`를 결합하여 결과가 `true` 또는 `false`로 나오는 것(술어(?))
- `Clause`: `Predicate`를 구성하는 각 단위로서 각각 `true` 또는 `false`를 가짐

> Note:  
위 그림에서 아래에 `clause`가 3개인 이유는, 동일한 `(a=b)` 를 하나의 `clause`로 보기 때문이다. 

<br/>

#### Example : Applying PC, CC, and CoC...

<img src="../images/security-engineering-7-implementation-assurance-6.2.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

> Note:  
모든 `predicate`가 한 번은 `true`, 한 번은 `false`가 나오는 `test case`를 도출하라는 얘기는 ***모든 `clause`에 대해서 `true,` `false`를 테스트하라는 것과 동일한 얘기가 아니다.***

### (3) Note on Predicates

### (4) Short Circuit Evaluation

<img src="../images/security-engineering-7-implementation-assurance-6.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (5) Logic Coverage Criteria

Apply `logic coverage criteria` to derive `test requirements` and design `test cases`.

- Active Clause Coverage (ACC): 실제 `predicate`의 `true` 또는 `false`를 결정하는데 영향을 미치는 중요한 `clause`
- General Active Clause Coverage (GACC)
- Correlated Active Clause Coverage (CACC)
- Restricted Active Clause Coverage (RACC)

<br/>

### (6) Logic Coverage Criteria Subsumption

<br/>

### (7) Logic Expressions from Source Code

Applying logic criteria to program source is hard because of `reachability` and `controllability`.

소프트웨어 `소스코드`에 있는 `로직`을 `모델링`하여 테스트 케이스를 도출하는 것은 쉽지 않다. 왜냐하면 각 조건을 설정하여 `predicate`들이 true일 때와 false일 때를 따져보고, 거기에 맞기 각 `clause`들이 true인지 false인지까지 테이블을 작성하는 것은 가능하지만, 그 이후에 실제로 각 `clause`들이 true 또는 false가 되게 하는 ***실제 input values를 어떻게 넣을지를 모두 도출하는 것이 쉽지 않다.***

- `Reachability` : must get to the predicate statement that we are applying the criteria on
- `Controllability` : must find input values that indirectly assign values to the variables in the predicates
- `Internal variables` : variables in the predicates that are not inputs to the program. input이 아니라 프로그램 내부에서 선언되는 변수들이 있음

<br/>

### (8) Logic Expressions from Specifications

Logic coverage criteria 역시 스펙 문서에서 도출할 수 있다. 하지만 정밀도가 낮다.

<br/>

### (9) Logic Expressions from FSMs

<br/>

## 7. Syntax Coverage

### [Note] Syntax Based Testing

<img src="../images/security-engineering-7-implementation-assurance-7.0.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (1) Four Structures for Modeling S/W

<img src="../images/security-engineering-7-implementation-assurance-7.1.1.1.png?raw=true" alt="drawing" width="240"/>

<br/>

소프트웨어를 모델링하고 `문법`을 이용하여 test case를 도출하는 방법이다. 

`fuzzing` 테스트는 `Syntax` 기법 중에서 `Inputs`에 해당한다(`Input space`). `fuzzing`을 할때 `입력값`을 무작정 랜덤하게 주는 것이 아니라 특정 `문법`에 맞춰서 주게 된다.

사실 `Syntax` 기법에서 가장 중요한 것은 `Source`를 이용하는 것이다(`program-based`).

<br/>

### (2) Using the Syntax to Generate Tests

<br/>

### (3) Syntax Based Testing

<br/>

### (4) Grammar : Regular Expression

<img src="../images/security-engineering-7-implementation-assurance-7.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (5) Test Cases from Grammar

<br/>

### (6) Backus-Naur-Form (BNF) Grammars

<img src="../images/security-engineering-7-implementation-assurance-7.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (7) Using Grammars

<img src="../images/security-engineering-7-implementation-assurance-7.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Example : Valid and Invalid Mutants

<img src="../images/security-engineering-7-implementation-assurance-7.7.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Ground String`: 기본적으로 주어지는 초기 seed 값
- `Mutant`: `Ground String`을 변형한 것(변종)
- `Valid Mutants`: 문법에 맞는 유효한 mutants
- `Invalid Mutants`: 문법에 맞지 않는 유효하지 않은 mutants

<br/>

### (8) UnMutated Derivation Test Coverage

<br/>

### (9) Mutated Derivation Test

<br/>

### (10) What is Mutation Testing?

<br/>

### (11) Underlying Concept : Mutation Testing

`Program-based`

<br/>

<img src="../images/security-engineering-7-implementation-assurance-7.11.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Mutation Testing (9.2.2)

<img src="../images/security-engineering-7-implementation-assurance-7.11.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 소스코드의 조건문에서 `i >= 0` → `i > 0`로 `mutant`를 생성한다.

<br/>

##### Ineffective

Input: x = {1, 3, 2};
Output original : -1
Output mutant : -1

<br/>

##### Killed

Input: x = {0, 1, 2};
Output original : 0
Output mutant : -1

<br/>

`subject`는 ground string에 해당한다.

`Mutation Testing`은 `test case`가 잘 만들어졌는지를 테스트하는 것이다. 따라서 `killing mutant`가 많을 수록 좋은 test case가 도출된 것이다. 얼마나 많은 `mutant`를 죽이는지가 `coverage`이다.

e.g. 어떤 컴파일러가 있을 때, 컴파일러를 테스트하고 싶으면, 정상적인 프로그램은 잘 테스트되어야 하고, 오류를 가진 프로그램은 오류를 잘 발견해야 한다. 이 때 `Mutation Testing`을 통해서 정상적인 프로그램을 넣었을 때와, 오류를 가진 프로그램을 넣었을 때 `mutant`를 얼마나 많이 죽이는지 확인할 수 있다.

<br/>

구글은 `deep fake`를 막기 위해서 집단지성을 활용하기로 하였다. `deep fake`가 된 영상과 일반 영상의 `test case`를 제공하는데 이런 `test case`를 도출할 때 `mutation testing`과 같은 테스트를 이용해서 좋은 `test case`를 도출한다.

<br/>

### (12) Input Space Grammars

<br/>

## 8. Agile Methods & Testing

보안공학 기법들은 아직은 `폭포수(waterfall) 모델`에 집중되어 있다. 보안공학 프로세스를 agile 방법에 가장 잘 적용할 수 있는 회사는 `Microsoft`이다.

### (1) Traditional Assumptions

<br/>

### (2) Why Be Agile?

<br/>

## 9. Ⅱ. Software Verification via Automated Reasoning (자동추론)

### (1) Testing vs. Verification

<img src="../images/security-engineering-7-implementation-assurance-9.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`testing`을 통해서 소프트웨어에 결함이 있다는 것은 알아낼 수 있다. 하지만 `testing`을 통해서 소프트웨어에 결함이 없다는 것은 증명할 수 없다.

`testing`과 다르게 `verification`은 소프트웨어의 ***결함이 없음을 증명(prove)할 수 있다.*** `Model Checking`은 소프트웨어 `verification`을 위한 `도구`이다. ***`Cyber Grand Challenge`에서 나온 `취약점 자동 분석 도구`는 `Model Checking`에서 `파생`되어 나온 도구이다.***

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.1.1.2.png?raw=true" alt="drawing" width="320"/>

<br/>

소프트웨어 `verification`을 하기 위해서는 `exhaustive state-space exploration`이 필요한데, 검사해야 할`state`수가 너무 많아서 현실적으로 불가능하다.

<img src="../images/security-engineering-7-implementation-assurance-9.1.1.3.png?raw=true" alt="drawing" width="640"/>

<br/>

따라서 사람들은 처음에는 `software verification`에 대해서 회의적이었다. 하지만 나중에 사람들은 모든 프로그램을 대상으로 하는 것이 아니라, ***특정 영역의 프로그램에서는 state 수가 제한적이어서 `software verification`이 가능할 수도 있겠다고 생각했다.*** e.g. 암호화 모듈 프로그램

<img src="../images/security-engineering-7-implementation-assurance-9.1.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 그래프의 세로축은 `security requirements`를 나타낸다.

- `type safety`: 타입의 안전성. e.g. 변수 타입에 맞지 않는 값을 할당하지 않도록 함
- `no runtime errors`: 프로그램 실행 중에 발생하는 오류가 없음
- `functional correctness`: 항상 옳은 결과가 나온는가를 나타냄

`strength of guarantee` = `type safety` < `no runtime errors` < `functional correctness`

> Note:  
위의 그래프에서 `seL4 microkernal (NICTA)`이 `functional correctness`를 달성할 수 있는 이유는 바로 `microkernal`의 매우 기능이 일반적인 kernal 보다 적어서 복잡하지 않기 때문이다.  
`requirements`를 도출하고 줄이는 것이 가장 어렵다. `requirements` 도출 자체가 잘못되면 `복잡도(complexity)`를 줄일 수 없다.

<br/>

#### Type Safety

<img src="../images/security-engineering-7-implementation-assurance-9.1.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Runtime Error

<img src="../images/security-engineering-7-implementation-assurance-9.1.2.3.png?raw=true" alt="drawing" width="480"/>

<br/>

#### Functional Correctness

<img src="../images/security-engineering-7-implementation-assurance-9.1.2.4.png?raw=true" alt="drawing" width="480"/>

<br/>

- `Functional Completeness`: 요구되는 모든 태스크(tasks)를 cover하는가?
- `Functional Correctness`: 항상 옳은 결과가 나온는가?

<br/>

### (2) Symbolic Execution

<img src="../images/security-engineering-7-implementation-assurance-9.2.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`symbolic execution`에서는 실제값이 아니라 `기호(symbol)`을 넣는 것이다. 이와 반대되는 개념은 `concrete execution`이다.

<br/>

#### Applications

<img src="../images/security-engineering-7-implementation-assurance-9.2.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (3) Automatic Theorem Prover

Logical deduction performed by machine

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 예제에서 2개의 정수 중에서 최대 값을 찾는 함수가 있다.

- `variables`: 사용되는 변수
- `precondition`: 전제조건
- `postcondition`: 프로그램 실행이 끝난 후 만족해야 하는 조건

<img src="../images/security-engineering-7-implementation-assurance-9.3.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

위와 같이 `variables`, `precondition`, `postcondition`을 설정하여 `automatic theorem prover`에 넣으면 해당 프로그램이 제대로 동작하는지를 증명해준다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.3.1.3.png?raw=true" alt="drawing" width="640"/>

<br/>

`precondition`과 `postcondition`은 사람이 직접 작성해야 하기 때문에 이것들이 틀리면 자동화된 증명 결과도 틀리게 된다. 그리고 `automated theorem prover`는 구간구간 별로 annotation을 넣어주고 구간별로 체크하는 것이기 때문에 완전자동화는 아니다. ***하지만 `Model Checker`는 완전자동화된 도구이다.***

<br/>

#### Floyd-Hoare triple

<img src="../images/security-engineering-7-implementation-assurance-9.3.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

프로그램도 로직의 전개이기 때문에 `precondition`과 `postcondition`을 formal하게 기술해줄 수 있으면, 해당 `precondition`이 주어졌을 때 프로그램이 실행되어 결과적으로 `postcondition`에 도달하는 지를 자동으로 체크할 수 있다. ***따라서 `requirement`가 주어졌을 때 `formal`하게 기술하는 것이 매우 중요하다.***

<br/>

### (4) Model Checker

`model checker`는 완전자동화 도구이기 때문에 제한적이어서 `automatic theorem prover`보다는 증명할 수 있는 레벨이 낮다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

1. 프로그램을 모델렝한다. `Program` → `Model`
2. 프로그램이 달성해야 할 최종 목표(goal)를 준다. `Correctness Property`
3. Verification(Model Checker)에게 전달한다.
4. 해당 프로그램이 달성해야 할 최종 목표를 달성하는지(`Correct`), 아닌지(`Incorrect`)를 알려준다(달성하지 않을 경우 어떤 입력이 들어오면 오류가 발생하는지 `Counterexample`에 추가한다.)

<br/>

#### [Note] Counterexamples

<img src="../images/security-engineering-7-implementation-assurance-9.4.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

#### [Note] Theorem Prover vs. Model Checker

<img src="../images/security-engineering-7-implementation-assurance-9.4.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Theorem Prover`는 `반자동(semi-automated)`이고, `Model Checker`는 `완전자동(automatic)`이다.

<br/>

#### [Note] How to Create Sound Abstractions

<img src="../images/security-engineering-7-implementation-assurance-9.4.3.1.png?raw=true" alt="drawing" width="640"/>

<br/>

실제 프로그램과 모델의 밖에 있는 오류는 문제가 없다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.4.3.2.png?raw=true" alt="drawing" width="640"/>

<br/>

Over-approximation에 의해 실제 프로그램에서는 오류가 아니지만 모델에서는 오류라고 인식하는 `abstraction gap`이 발생한다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.4.3.3.png?raw=true" alt="drawing" width="640"/>

<br/>

모델을 더욱 정교하게 만들어 실제 프로그램과 모델의 `abstraction gap`을 줄이는 것이 좋다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.4.3.4.png?raw=true" alt="drawing" width="640"/>

<br/>

모델을 만들 때는 프로그램 보다 모델의 범위를 작게 만들어서 `under-approximation`에서 시작하여 점점 늘려나가서, `over-approximation`으로 만든다. 이와 관련된 방법으로 `Lazy Abstraction Algorithm` 등이 있다.

> Note:  
`over-approximation`으로 만들어야 실제 프로그램의 오류 상태를 모델에서도 모두 잡아낼 수 있다.

<br/>

<img src="../images/security-engineering-7-implementation-assurance-9.4.4.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Model Checking`은 완전자동화된 상태에서 프로그램의 모든 state를 다 체크한다(`exhaustive testing`). `state-space exploration`

<br/>

#### Automated Exploit Generator

<img src="../images/security-engineering-7-implementation-assurance-9.4.4.2.png?raw=true" alt="drawing" width="640"/>

<br/>

2005년에 `Model Checker`를 이용하여 해킹도구를 자동생성하는 방법을 제안하였다.

해킹불가능한 특성(`un-exploitability property`)을 `Model Checker`에 넣는다. e.g. 버퍼오버플로우를 방지하기 위해서 `버퍼의 사이즈가 정확한가?`를 `un-exploitability property`로 전달한다. 만약 `Violation of Safety` 결과가 나올 경우, 어떤 입력을 넣었을 때 `Exploit`이 될 수 있는지 기록한다.

<br/>

### (5) The Limits of Automated Proof

<img src="../images/security-engineering-7-implementation-assurance-9.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

암호 알고리즘을 구현한 코드들을 기본적으로 수학적인 기호를 많이 포함하고 있다. 그리고 state가 매우 한정적이다. 



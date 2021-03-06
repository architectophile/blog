#  III. Security Policy Modeling - Formal Representation of the Security Requirements

<br/>

`보안 요구사항(security requirements)`을 모두 도출하였으면, `보안 요구사항`의 `정형화 명세(formal representation)`를 만들어야 한다. 

`정형화 명세(formal representation)`를 작성하는 것은 자연어 형태로 도출된 `보안 요구사항`을 ***모호하지 않은(`unambiguous`) 형태로 기술***하기 위한 것인데, 이 때 보안 요구사항을 `수학적으로 증명`이 가능하도록, ***수학 기호로 표현하여 누가 해석하더라도 항상 정확하고 일관된 해석이 가능하게 만드는 것이다.***

<br/>

## 1. Introduction to Formalization

### 1) Formal Methods & IT Security

<img src="../images/security-engineering-5-security-policy-modeling-1.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`SPM(Security Policy Modeling)`을 제대로 하기 위해서는 `소프트웨어 공학(Software Engineering)`, `정보보안(IT Security)`, `정형화 방법(Formal Methods)`에 대한 다양한 지식이 필요하다.

<br/>

### 2) What are Formal Methods?

`Formal Methods`는 어떤 소프트웨어 또는 하드웨어 제품의 설계, 개발, 검증을 위한 `수학적 기반의(mathematically-based) 기술`이다. 이러한 수학적 분석을 통해 제품 설계의 `reliability`와 `robustness`를 증가시킬 수 있다.

`Formal Methods`를 잘 사용하는 곳은 미국의 NASA(로켓의 안정적인 동작이 매우 중요함), 자동차 제조업체, 원자력 발전소 설계 업체 등이 있다.

<br/>

### 3) Realization of FSPM

<img src="../images/security-engineering-5-security-policy-modeling-1.3.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

e.g. 오직 관리자만이 어떤 객체의 접근 권한(access rights)를 변경할 수 있다. → `object y`에 대한 `access 권한`이 `x`가 `y`의 권한을 수정한 이후의 `access 권한`과 다르면 `subject x`는 `admin`이다.

위의 그림은 `First Order Predicate Logic` 방법을 나타낸다.

`자연어`로 쓰여진 `보안정책(Security Policy(SP))`을 `수학적 기호`를 이용해 `정형화 명세(Security Policy Model)`로 변경한다.

`First Order Predicate Logic`보다 풍부한 표현이 가능한 방법으로는 `High Order Predicate Logic`이 있다.

<br/>

### 4) First Order Theories

#### (1) Why need First-Order Theories?

<img src="../images/security-engineering-5-security-policy-modeling-1.4.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

Question : `1+1 == 1+1+0` ?

- 덧셈 연산자가 자연수에 대한 더하기를 나타내는 것이라면 참이다.
- 하지만 스트링 Concatenation일 경우에는 거짓이 된다.

따라서 어떤 것을 기술할 때 사용되는 모든 기호는 그 의미를 정확하게 정의하고 나타내는 것이 중요하다. 이를 위해서 `PL`, `FOL`, `HOL` 등이 만들어졌다.

<br/>

### 5) First-Order Predicate Logic

<img src="../images/security-engineering-5-security-policy-modeling-1.5.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Propositional Logic(PL)`: 매우 제한적인 표현성을 갖고 있음
- `First Order Logic(PL)`: PL을 확장시킨 것
- `High Order Logic(HOL)`

`PL < FOL < HOL`

`HOL`로 갈수록 ***표현성이 높아져서 다양한 표현이 가능해진다.***

<br/>

#### (1) Relations

- `properties`: 어떤 싱글 객체의 특성을 나타낸다. e.g. `Round(ball)`, `Prime(7)`.
- `n-ary relations`: 두 개 이상의 객체들의 관계를 나타낸다. e.g. `Married(John, Marry)`, `Largerthan(3, 2)`.
- `functions`: 또 다른 객체를 나타내는 함수. e.g. `Plus(2,3)`, `Father(Dan)`.

<br/>

#### (2) (e.g.) Translating English to FOL

<img src="../images/security-engineering-5-security-policy-modeling-1.5.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (3) [Note] Common Criteria & SPM

<img src="../images/security-engineering-5-security-policy-modeling-1.5.3.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-1.5.3.2.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-1.5.3.3.png?raw=true" alt="drawing" width="520"/>

<br/>

`EAL 등급`이 높을 수록 높은 보안성을 나타낸다. `EAL5` 이상을 받기 위해서는 필수적으로 `formal security policy model`이 요구된다.

<br/>

#### (4) Example

<img src="../images/security-engineering-5-security-policy-modeling-1.5.4.1.png?raw=true" alt="drawing" width="520"/>

<br/>

왼쪽에는 `Security Policies`를 `정형화 명세`로 표현하여 넣고 오른쪽에는 `설계도`를 넣은 다음 `Model Checker`에게 전달하면 설계가 요구사항을 만족하는지 판별할 수 있다.

<br/>

#### (5) Model Checking Firewall Policy Configuration

<img src="../images/security-engineering-5-security-policy-modeling-1.5.5.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-1.5.5.2.png?raw=true" alt="drawing" width="520"/>

<br/>

방화벽 보안정책이 제대로 설정되었는지, 보안정책 간에 모순된 점은 없는지 자동으로 검사하는 도구를 개발하는 논문

<br/>

#### (6) First Order Theories

- `FOL(First Order Logic)`
- `FOT(First Order Theories)`

<br/>

### 6) Formal Modeling Languages

- `Informal methods`: English와 같은 `자연어`
- `Semiformal methods`: 다이어그램이나 표를 이용해서 `informal method` 보다는 좀 더 정확하게 표현하는 것(e.g. database entity relationship diagrams, UML, UMLSec, SecureUML 등)
- `Formal methods`: 수학적인 기호로 정확하게 표현하여 증명하기 쉽도록 하는 것(e.g. Finite State Machines, Petri Nets, Z, ANNA)

<br/>

### 7) Formal Tools

<img src="../images/security-engineering-5-security-policy-modeling-1.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

어떤 `security requirement`가 주어졌을 때 이것을 `정형화 기법`을 이용해서 표현하고, `설계`가 잘 되었는지 `증명`할 수 있는 `도구들(tools)`이다.

그리고 이렇게 정형화 기법을 이용해 보안정책을 수학적으로 표현하고 설계가 잘 되었는지 증명하는 방법론들은 `암호(cryptography)` 분야나 `접근통제(access control)` 분야에서 많이 발달되어 있다. 그 이유는 전통적인 보안은 기밀자료를 보호하는 것이었다. 기밀자료를 보호하는 방법은 암호화시키거나(encryption) 접근통제(access control)로 관리하는 것이다. 이것을 매우 정확하게 증명하는 것이 중요했기 때문에 `암호(cryptography)` 분야나 `접근통제(access control)` 분야에서 가장 잘 발달하였다.

<br/>

### 8) Basic Ideas of Formal Methods

<img src="../images/security-engineering-5-security-policy-modeling-1.8.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

위의 모든 단계에서 `Formal Methods`가 사용된다.

<br/>

### 9) Main Benefits of Formal Model

`Formal Method`를 사용하면 내가 설계한 디자인이 보안정책을 만족하는지 `수학적으로 증명`할 수 있다는 것이 장점이다.

<br/>

### 10) Two Different Styles of `Formal Methods`

- `Formal Specification`: 어떤 문장이 있을 때 수학적 기호로 바꿔 `정형화 명세`를 만드는 것(UK와 유럽에서 많이 연구함 → 비용이 많이 들지 않는다.)
- 
- `Formal Verification`: 내가 만든 `정형화 명세`가 제대로 만들어졌는지 검증하고, 내가 만든 제품이 `정형화 명세`를 만족하는지 검사하는 것이다(미국과 캐나다에서 많이 연구함 → 검증 툴이 필요하므로 비용이 많이 들어간다.)

둘 중에서 `Formal Specification`이 ***더욱 창의적인 작업이다.*** `Formal Specification`은 자동화하기가 매우 어렵다. 하지만 `Formal Verification`은 사람이 직접 하거나 컴퓨터가 자동으로 할 수 있다.

<img src="../images/security-engineering-5-security-policy-modeling-1.10.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Threat Modeling`을 통해 작성한 보안정책인 `Security Properties`를 `Formal Specification`을 이용해서 수학적 기호로 표현한다. 그 다음 내가 만든 실제 시스템(e.g. C로 만든 프로그램) `Actual System`을 모델링(또는 추상화)한 다음 수학적 기호로 표현하여 `System Representation`를 작성한다. 그 다음 `Formal Verification`을 통해 실제 시스템에 보안정책을 만족하는지 검증한다.

그리고 보안 요구사항(`Security Properties`) 뿐만 아니라 내가 구현하고자 하는 기능 요구사항(`Functional Properties`)에 대한 검증도 가능하다.

<br/>

#### (1) Security Properties  

- `Confidentiality`, `Integrity`, and `Availability`: 기밀성, 무결성, 가용성 (이 중에서 `Availability`는 증명하기가 매우 어렵다.)
- `Non-interference`: 관리자 권한을 가진 사용자가 어떤 작업을 수행했을 때 이와 관련된 정보가 권한이 없는 일반 사용자에게 노출되면 안되다.
- `Isolation`: 한 쪽에서 하는 일이 다른 쪽에 영향을 끼치면 안된다. `Non-interference`와 비슷하지만 `Isolation`은 `동등한 권한`을 가진 사용자끼리 서로 분리되어야 한다는 것이다.(e.g. CPU칩에서 Spectre, Melt Down과 같은 부채널 공격을 통해 다른 사용자의 데이터를 읽어낼 수 있다.)
- `Information Flow`: 정보의 흐름에 있어서 문제가 생기는 것을 찾는 것이다.
- `Type and Memory Safety`: 데이터가 복사될 때 같은 타입의 변수인지 검사하는 것과 메모리 접근이 안전하게 보장되는지 검사한다(e.g. Buffer Overflow를 방지하는 것).
- `Memory Integrity`, and `Execution and Code Integrity`: 메모리에 올라간 프로그램이 허용되지 않은 사용자에 의해 수정되는 것을 막는 것과 프로그램 실행시 코드 무결성을 보장하는 것이다.

이외에도 다양한 `Security Properties`가 존재하며, 해당 시스템에 따라 원하는 `Security Properties`를 추가할 수 있다.

<br/>

### 11) History - Past

`NSA(National Security Agency)`가 `Formal Methods`에 대한 중요성을 인식하고 ***70, 80년대에 많이 연구하고 개발하였다.*** 이 때 `Operating System`에 `multi user` 기능이 추가되면서 보안 위협에 위험성을 인식하였다. 따라서 특히 NSA는 시스템의 보안이 매우 중요한 기관이므로 OS의 `Kernel`에 대한 `Formal Methods` 연구를 많이 하게 되었다. 이를 이용해 보안 운영체제를 만들기 위해 노력하였다.

- `Bell-LaPadula` model: `Bell`과 `LaPadula` 수학자들이 최초로 많이 연구하였다(`Information Flow` property를 주로 연구함).

기존에는 모의해킹하고 패치하는 `Penetrate and Patch` 방법을 많이 사용했었는데, 이 방법이 시스템의 보안성을 검증하는데 충분하지 않다는 생각을 하였다. 따라서 `수학적으로 증명`하려는 시도를 시작하였다.

어떤 시스템을 수학적으로 안전하지 증명하는 것은 해당 시스템 전체가 완전하게 안전하다는 것을 증명하는 것보다는, 어느 부분은 수학적으로 증명하여 안전하고, 어떤 부분은 증명할 수 없어 위험성이 있는지를 검사하여 좀 더 위험한 부분에 더 많은 투자를 하기 위함이다.

<br/>

#### [Note] The Orange Book

최초의 `보안 운영체제`에 대한 평가 기준이다. NCSC에서 1985년에 작성하였다. 

- `Levels`: D, C1, C2, B1, B2, B3, A1, (A2): 

D가 가장 낮은 등급이고, A2가 가장 높은 등급이다.

`A.1` 등급이 의미하는 것은 `보안 요구사항`을 `Formally 표현`하고, 시스템을 `Formally 모델링`하여 해당 모델이 보안 요구사항을 만족하는지 `Formally 검증`되었다는 것이다.

`A.2` 등급은 프로그램 코드가 설계대로 작성되었는지 수학적으로 검증하는 것(Code Assurance)이다. 하지만 당시에 아직 코드까지 수학적으로 증명하는 것은 기술적으로 힘들다고 생각하여 삭제된 등급이다. 하지만 나중에 2000년대에 `Bell-LaPadula`는 `A.2` 등급을 그대로 남겨놨어야 한다고 회고하였다. 그랬으면 미국의 시스템 보안성이 더욱 높아졌을 것이라고 얘기했다.

<br/>

### 12) Model Checking

`SSL` 프로토콜은 설계의 안전성을 수학적으로 증명가능하다. `IKE(Internet Key Exchange)` 프로토콜과 `SET(Secure Electronic Transaction)` 프로토콜도 수학적으로 증명가능하다.

<br/>

### 13) The Limits of Formal Methods

`보안 요구사항`을 `Formal Methods`를 이용하여 `수학적으로 증명`하는 것은 ***해당 `Security Property`를 증명했다는 것 뿐이다.*** 따라서 나머지 증명되지 않은 Security Property에 의해서 취약점이 발생할 수 있다. ***그러므로 보안 요구사항을 매우 상세하게 도출하는 것이 중요하다.***

`보안 요구사항`은 제대로 도출했지만 이를 수학적 기호로 표현하는 `Formal Specification` 과정에서 오류가 있으면 수학적 증명이 실패할 수도 있다. 또는 기존에 알려진 Assumption이 깨질 경우 취약점이 발생할 수 있다.

<img src="../images/security-engineering-5-security-policy-modeling-1.13.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

위 그림에서 모델링을 할 때 전제조건에서 모든 차량은 차도를 통해서만 움직인다고 가정했지만 전제조건이 깨질 경우 새로운 공격이 가능할 수 있다.

`Formal Model`이 실제 모든 공격을 커버할 수는 없다.

<br/>

## 2. Security Policy Modeling

### 1) Security Policy

어떤 것을 어떻게 지켜야하는지 자연어로 기술해놓은 요구사항들

<br/>

### 2) Security Policy Model (SPM)

- `Security Policy`: 자연어로 적어놓은 보안 정책을 의미함
- `Security Policy Model`: `Security Policy`를 정형화 명세(`formal specification`) 방법으로 수학적 기호 형태로 표현하는 것(넓은 의미에서는 거기에 덧붙여서 해당 정형화 명세가 제대로 되었는지 증명하는 `formal verification` 단계까지 포함)

<img src="../images/security-engineering-5-security-policy-modeling-2.2.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### 3) Security Policy Assurance

`Security Policy Assurance`는 `Security Requirements` 간에 ***모순이 없는지 검사***하고, 제대로된 수학적 기호를 통해 표현되었는지 검사하는 것이다.

e.g. 운영체제를 접속할 수 있는 사람은 3명이다. 관리자는 2명 이상이다. 사용자는 2명이다. → `Security Requirements`에 모순이 있다.

1. 보안 요구사항이 정확한지 확인한다(모순 검사).
2. 보안 요구사항이 모두 제대로 도출되었는지(complete) 검사한다. → 검증하기가 매우 어렵다. → 체계적인 보안 요구사항 도출 방법(e.g. `threat risk modeling`)을 사용한 것을 보임으로써 증명을 대체하곤 한다.
3. 보안 요구사항이 완벽한 수학적 기호로 표현되어서 나중에 디자인 검증이나 코드 검증에 사용 가능한지(testable) 검사한다.
4. 보안 요구사항이 설계까지 잘 반영되었는지 확인한다.

<br/>

### 4) In 1967

`time-sharing computer system`이 1967년에 만들어지면서 `보안 운영체제`에 대한 요구가 발생했다. `NSA`의 `Benard Peters`가 `보안 운영체제`에 대한 `요구사항`을 다음과 같이 얘기했다.

1. O/S는 모니터링 시스템이 있어서 운영체제에서 발생하는 모든 이벤트를 검사해야 한다(훗날에 감시 프로그램을 `Reference Monitor`라고 이름붙였다.)

2. 감시 프로그램(`Reference Monitor`)은 매우 중요하기 때문에 이 프로그램의 안전성이 ***수학적으로 증명되어야 한다.*** 따라서 `Assurance Level`이 높아야 한다. → `Simple`하게 만들어야 한다. → `Assurance` 증가

3. `평가인증 제도`를 통해서 시스템에 대한 보안성 인증을 받아야 한다(평가인증 제도 개념의 시작이다.)

<br/>

### 5) In 1972

`James P. Anderson`은 미국 정부의 컴퓨터 시스템에 필요한 `보안 요구사항`을 정립하였다(`James P. Anderson Report`).

1. 컴퓨터 시스템에는 `RVM`(Reference Validation Mechanism)이 있어서 모든 이벤트를 감시해야 한다(`complete mediation`).

2. `RVM`은 반드시 `tamper-proof`한 성질이 있어서 해커가 기능을 변경하거나 무력화할 수 없어야 한다.

3. `RVM`이 제대로 만들어졌는지 검증할 수 있어야 한다(`verifiable`). 그러기 위해서는 `small` enough해야 한다.

<br/>

#### [Note] Modified RVM Prescriptions

<img src="../images/security-engineering-5-security-policy-modeling-2.5.2.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`Anderson Report`에서는 `small`을 사용했지만 → `TCSEC`에서는 `simple`로 바뀌었다. → 단순히 작게 만든다고 복잡도가 낮아지지 않고 오히려 복잡도가 높아질 수 있다. 따라서 시스템은 `simple`해야 분석이 잘 되어서 `complexity`가 낮아진다. → `모듈화`의 필요성

<br/>

### 6) Reference Monitor

<img src="../images/security-engineering-5-security-policy-modeling-2.6.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`Reference Monitor`는 사용자들이 자원에 접근할 때 중간에서 모든 것을 감시하고 관리한다(인증(`authentication`)과, 권한관리(`authorization`) 담당).

- `Reference Monitor`: 접근제어 개념
- `Security Kernel`: `Reference Monitor`을 실제 구현한 것(`implementation`)
- `TCB(Trusted Computing Base)`: `Security Kernel` + 기타 보안 메커니즘들(`Security Kernel`만으로는 부족하다는 것을 느꼈기 때문에)

<br/>

## 3. Access Control Policy

`운영체제`는 접근통제(`access control`) 기능이 매우 많고 중요하다. 따라서 여러가지 보안정책 중에서 `access control`에 대한 보안정책이 먼저 Formal하게 기술되고 증명되기 시작했다.

- `Authentication`: 신원을 검증(proving)하는 것(e.g. ID, PW 로그인 인증). 1:1 매칭
- `Identification`: 주체의 신원을 구축하는(establishing) 것(e.g. 경찰에서 증거 지문을 채취하여 범인의 신원을 알아내는 것). 1:n 매칭
- `Authorization`: Authentication이든, Identification이든 어떤 사용자의 신원이 확인되면, 해당 사용자가 어떤 권한을 갖고 있는지 확인하고 그에 맞는 권한을 관리하는 것

<br/>

### 1) DAC Model

<img src="../images/security-engineering-5-security-policy-modeling-3.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`DAC(Discretionary Access Control) Model`은 `임의적 접근통제`이며, 일반적으로 사용자의 ID, 또는 사용자의 그룹 ID에 따라 접근을 통제하는 것이다.  
좀 더 정확하게 얘기하면, ***해당 파일의 `소유자(owner)`의 판단에 따라서 임의대로 접근 권한을 통제하는 것이다.***  
`needs-to-know` 원칙에 따라 정보를 보호한다. 누가 알아야 하는지는 파일의 `소유주(owner)`가 권한을 관리한다.

<br/>

#### DAC Model Example

대표적인 `DAC`를 사용하는 시스템은 `유닉스` 또는 `리눅스`이다.

<img src="../images/security-engineering-5-security-policy-modeling-3.1.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`DAC`를 사용하면 시스템의 `유연성`이 매우 좋다. 왜냐하면 `소유주`가 자유롭게 접근 권한을 변경할 수 있기 때문이다(e.g. `chmod` 명령).

<br/>

#### DAC Model Weaknesses

<img src="../images/security-engineering-5-security-policy-modeling-3.1.3.1.png?raw=true" alt="drawing" width="480"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-3.1.3.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`Alice(owner)`가 `Bob`에게 파일을 복사해주면, `Bob`이 다시 파일을 복사하여 `Eve`에게 전달할 수 있다.  
애초에 `Alice`는 `Bob`에게만 파일을 보여주려고 했지만, 결과적으로 `Eve`에게도 파일이 전달되었다(e.g. `너만봐 정책`, 카톡에서 한 사람에게 사진을 전송하면 더 이상 통제권을 잃고 다른 사람에게 전파되는 것과 비슷하다.)

<br/>

### 2) MAC Model(Non-DAC Model)

<img src="../images/security-engineering-5-security-policy-modeling-3.2.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`MAC(Mandatory Access Control) Model`은 주로 군에서 사용한다. `DAC`와 다르게 접근권한 레벨에 따라서 `강제적 접근통제`를 할 수 있다. 모든 자원에는 권한 레벨이 설정되어 있고, 해당 사용자의 신원을 인증하여 자원에 부여된 권한 레벨 이상일 때만 접근을 허용하는 방식이다. 따라서 ***사용자는 자신의 권한을 다른 사용자에게 양도할 수 없으므로*** 해당 권한이 없는 사용자는 `강제적으로 접근이 통제`된다.  
이 때 각 `subject`와 `object`들은 `security label`이 붙어있어 해당하는 보안 권한 레벨을 알 수 있다.

<br/>

#### (1) Types of MAC Models

- `MLS(Multi-Level Security)`
- `BLP(Bell-LaPadula)`
- `LBAC(Lattice-Based Access Control)`

<br/>

#### (2) MAC : Traditional Model

<img src="../images/security-engineering-5-security-policy-modeling-3.2.2.1.png?raw=true" alt="drawing" width="280"/>

<br/>

`전통적인 MAC` 방식은 `계층적(hierarchical)` 보안 레벨(`linearly ordered`) 방식이다. 하지만 단순히 계층만 나누고 권한을 부여하면 `최소 권한의 원칙`을 위배하게 된다(e.g. 정보보호학과 교수가 화학과 정보를 접근하는 것과 같은 문제가 발생한다.)

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-3.2.2.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`최소 권한의 원칙`을 지키기 위해서는 `접근 레벨(clearance level)`뿐만 아니라 `구역(compartment)` 개념을 부여하여 접근 권한을 통제해야 한다는 요구가 발생한다.

<br/>

#### (3) MAC : MLS Model

`MLS(Multi-Level Security)` 방식은 `needs-to-know` 정책과 `categories(partially ordered)` 개념, 그리고 lattices의 `security levels(linearly ordered)` 개념을 결합한 것이다.  
최최의 MLS을 시스템을 적용한 제품은 `IBM`에서 개발한 `ADEPT-50` 모델이다.

`linearly ordered`: 계층적으로 보안 레벨을 나누어 접근 권한을 통제하는 것이다.
`partially ordered`: 집합처럼 구역을 나누어서 접근 권한을 통제하는 것이다. 집합에서 부분집합과 같은 개념이다(`Category(Compartment)`의 개념). 부분적으로만 순서가 정렬되어있다. subset relation

<br/>

#### (4) How to Design MLS Model?

<img src="../images/security-engineering-5-security-policy-modeling-3.2.4.1.png?raw=true" alt="drawing" width="520"/>

<br/>

각 `subject`와 `object`에 `clearance level(rank)`과 `category(compartment)`를 부여한다.

하지만 위에 설계가 MLS 정책을 만족하는지 `수학적으로 증명`할 수 있어야 한다. 이를 위해서는 MLS 정책들이 ***`수학적 기호`로 표현되어야 한다.***

<br/>

#### (5) BLP Model of MLS

1973년에 MITER의 `Bell`과 `LaPadula`는 기존의 `Tiger Teams`이 하는 모의해킹 방식(`penetrate and patch`)의 한계를 인식하고 제대로 보안성을 검증하기 위해서는 ***수학적 증명이 필요하다는 주장을 제기한다.***

- `BLP(Bell LaPadula Policy) Model`:  ***MLS 보안정책을 최초로 수학적으로 정의한 것이다.*** → `High Policy Assurance`를 제공한다.

- `Information Flow Policy`: 정보는 덜 신뢰할 수 있는 주체로부터 더 신뢰할 수 있는 주체로만 흘러야 한다.

- 기존의 `MLS` 보안정책은 오직 `simple security property`만 만족하고, `*-property`는 만족하지 못함을 수학적으로 증명한다. → 수학적인 기호로 표현하여 증명하면 어떤 것은 요구사항을 만족하고, 어떤 것은 요구사항을 만족하지 못하는지 명확하게 알 수 있다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-3.2.5.1.png?raw=true" alt="drawing" width="520"/>
 
<br/>

기존의 `MLS` 방식은 매우 정적인 방식이다. 위의 왼쪽 그림처럼 `Unclassified` 정보가 `Top Secret` 정보에 쓰여지는 것은 괜찮지만, 오른쪽 그림처럼 `Top Secret` 정보가 `Unclassified`로 흘러가는 것은 문제가 발생한다. ***하지만 MLS 방식에서는 이를 방지하지 못한다.*** → 따라서 MLS 처럼 자연어로 기술된 정책은 문제가 있으므로 ***수학적 기호로 표현할 수 있어야 한다고 주장했다.***

<br/>

#### (6) BLP Model in Formal

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`S`는 `subject 집합(사용자 또는 프로세스)`을 의미한다. `O`는 `object 집합(파일 등)`을 의미한다. `A`는 `access operation(execute, read, append, and write)`을 의미한다.

`write`와 `append`의 차이점은 `write`는 문서를 볼 수 있어야 가능하지만, `append`는 문서를 읽지 않아도 덧붙일 수 있다. 따라서 `write`에는 문서를 본다는 것이 포함되어 있다.

 `L`은 `security level`을 의미한다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`Access control` 시스템이 표시할 수 있는 `상태(state)`는 3가지의 `b`, `M`, `f`로 구성된다.

- `b`는 현재 사용 중인 `access operations`를 나타내며, `subject`와 `object`, 그리고 `subject`가 `object`에게 하는 `access operation`으로 구성되어 있다.

- `M`은 `matrix`를 나타낸다. `행(row)`이 `subject`이고 `열(column)`이 `object`이다. 이것을 `access control matrix`라고 한다. 이것을 행으로 자르는 것을 `access control capability`라고 하고, 열로 자르는 것을 `access control list`라고 한다.

- `f`는 `security level`을 의미한다. `clearance level`과 `classification level`을 의미한다.     
    - f<sub>s</sub>는 `subject`가 가질 수 있는 `최대의(maximal) security level`을 의미한다.
    - f<sub>c</sub>는 `subject`가 갖는 `현재의(current) security level`을 의미한다. 
    - f<sub>o</sub>는 `object`의 `security level`을 의미한다.

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.3.png?raw=true" alt="drawing" width="520"/>

<br/>

> Note:  
일반적으로 `access control matrix`는 중앙서버에 저장되어 관리되는데, 중앙 서버가 다운되거나 공격당하면 서비스 거부 공격을 당할 수 있다.  
matrix를 행으로 잘라서 `access control capability`를 각 사용자 카드에 넣고 접근제어를 하게 되면 내가 카드를 분실해도 나만 문제가 되고 나머지 사람들은 문제가 없다(가용성 확보). 하지만 퇴직자 처리하는 것이 쉽지 않다.
matrix를 열로 잘라서 `access control list`를 각 방에 있는 리더기에 넣고 접근제어를 하면 퇴직자처리할 때 해당 리더기에서 삭제만 해주면 된다. 하지만 설정 한 번을 바꾸려면 모든 리더기를 업데이트해야 하므로 신속하게 업데이트가 쉽지 않다.

<br/>

- Simple Security Property (SS-Property – No “Read Up”)

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.4.png?raw=true" alt="drawing" width="640"/>

<br/>

`subject`가 `object`에게 `read` 또는 `write`만 하는 모든 `access operation`에 대해서 `subject`의 최대 `security level`은 `object`의 `security level`보다 크거나 같아야 한다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.5.png?raw=true" alt="drawing" width="480"/>

<br/>

<br/>

- *-Property (Star-Property – No “Write Down”)

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.6.png?raw=true" alt="drawing" width="640"/>

<br/>

`subject`가 `object`에게 `append` 또는 `write`만 하는 모든 `access operation`에 대해서 `subject`의 현재 `security level`은 `object`의 `security level`보다 작거나 같아야 한다.

그리고 만약 `subject`가 `object`에게 `append` 또는 `write`를 하는 상태가 존재한다면, 해당 `subject`는 모든 `object'`에 대해서 `read` 또는 `write`만 하는데, 이 때 `object'`의 `security level`은 `object`의 `security level`보다 작거나 같다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.7.png?raw=true" alt="drawing" width="640"/>

<br/>

`information flow security`를 나타낸다.

`current security level`을 사용하는 것은 `subject`의 권한을 일시적으로 낮춰서 등급이 높은 프로세스가 등급이 낮은 프로세스와 통신할 수 있도록 하기 위함이다.

<img src="../images/security-engineering-5-security-policy-modeling-3.2.6.8.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (7) Real World Examples Built on BLP

<img src="../images/security-engineering-5-security-policy-modeling-3.2.7.1.png?raw=true" alt="drawing" width="520"/>

<br/>

#### [Note] MULTICS

<img src="../images/security-engineering-5-security-policy-modeling-3.2.7.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`BLP 보안정책`을 따르는 보안 운영체제는 `MULTICS`가 있다. 현재 운영체제들의 아버지라고 할 수 있다.

`MULTICS` → `UNICS` → `UNIX` → `LINUX`

<br/>

#### (8) The Criticism of McLean

<img src="../images/security-engineering-5-security-policy-modeling-3.2.8.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`McLean`은 `BLP Model`에서 `current security level`을 사용해서 일시적으로 권한을 낮춰서 높은 등급의 정보를 낮은 등급의 subject에게 전달할 수 있다면 이것은 안전하지 않다고 주장했다.

이에 대해 `Bell`과 `LaPadula`는 임시로 긴급통신을 위해 `current security level`을 사용하는 것이지 기밀자료를 몰래 전송하기 위해 사용하는 것은 아니라고 말했다.

따라서 이것은 자신들의 `전제조건(assumption)`을 위반한 것이기 때문에 이것은 고려대상이 아니라고 했다.

`assumptions`의 개수를 최소화하는 것이 좋다. 하지만 처음부터 그것은 쉽지 않기 때문에 하나하나씩 assumption을 줄여나가게 된다.

<br/>

#### (9) BLP Model in a Nutshell

<img src="../images/security-engineering-5-security-policy-modeling-3.2.9.1.png?raw=true" alt="drawing" width="640"/>

<br/>

BLP Model이 제대로 적용되었다면 모든 `subject`와 object에 대해서 위에서 아래로 내려오는 정보의 흐름(`information flow`)이 없어야 한다.

<br/>

#### (10) Covert Channels

`은닉채널(Covert Channels)`은 보이지 않는 채널을 이용해서 데이터를 전달하는 채널이다. `은닉채널(Covert Channels)`를 통해 데이터가 유출되는 것은 `*-property`로 막을 수 없다.
e.g. 높은 등급의 사람이 높은 보안 레벨의 정보를 읽어서 스마트폰으로 사진을 찍어서 낮은 등급의 사람에게 사진을 전송하는 것을 막을 수 없다.

`부채널(Side Channel)`은 `은닉채널(Covert Channels)`은 다른 개념이다. `부채널(Side Channel)`은 CPU의 전력소비를 측정해서 비밀 정보를 알아내는 것과 같은 공격이다.

`은닉채널(Covert Channels)`에서는 전송자와 수신자가 서로 협력해야만 가능하다. `부채널(Side Channel)`은 전송자의 도움이 필요없으며, 외부에서 측정하여 정보를 빼내는 것이다.

<img src="../images/security-engineering-5-security-policy-modeling-3.2.10.1.png?raw=true" alt="drawing" width="480"/>

<br/>

#### (11) Biba Model

`Biba Model`은 `BLP Model`에 대한 `Counterpart(Logical Dual)` 또는 `쌍대개념`이다.

`BLP Model`은 `기밀성(Confidentiality)`를 보장하기 위한 모델이다.

`Biba Model`은 `무결성(Integrity)`을 보장하기 위해 만든 것이다.

<img src="../images/security-engineering-5-security-policy-modeling-3.2.11.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `High Integrity`: 정보는 데이터가 위변조되지 않았고, 정보가 참(true)일 확률이 매우 높은 정보이다.
- `Garbage`: 쓰레기 수준의 정보이다. 정보의 진위 여부가 불분명하다.
 
`BLP Model`과는 다르게 `Biba Model`에서는 ***`높은 등급`의 정보가 → `낮은 등급`으로 흘러야 한다.***

<br/>

- Simple Security Property (SS-Property)

<img src="../images/security-engineering-5-security-policy-modeling-3.2.11.2.png?raw=true" alt="drawing" width="420"/>

<br/>

- *-Property (Start-Property)

<img src="../images/security-engineering-5-security-policy-modeling-3.2.11.3.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (12) Biba Model in a Nutshell

<img src="../images/security-engineering-5-security-policy-modeling-3.2.12.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (13) Clark-Wilson Model

1987년 `D. Clark`와 `D. Wilson`은 `military` 영역에서는 `Confidentiality`가 중요하지만 `commercial` 영역(e.g. 은행 데이터)에서는 `Integrity`가 매우 중요하다고 주장하였다. `Biba Model`을 확장하여 `Clark-Wilson Model`을 제시하였다.

`Well Formed Transaction` 개념을 제시하였다.

<img src="../images/security-engineering-5-security-policy-modeling-3.2.13.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Constrained Data Items (CDIs)`: `integrity`가 매우 잘 지켜져야 하는 데이터(e.g. account balance)
- `Unconstrained Data Items (UDIs)`: `integrity`가 별로 중요하지 않은 데이터
- `Integrity Verification Procedures (IVPs)`: 주기적으로 `CDI`의 데이터의 `무결성`을 검사함(`verify integrity`)(e.g. 은행계좌의 `잔고 = 입금액 - 출금액`이 맞는지 주기적으로 검사)
- `Transformation Procedures(TPs)`: 정해진 업무 절차를 기술한 업무 매뉴얼. `well formed transaction`(e.g. 은행에 가서 돈을 입금하거나 출금할 때 정해진 절차에 따라 처리하게 된다.)

사용자가 `UDI`에 접근할 때는 그냥 접근할 수 있다. 반면에 `CDI`에 접근할 때는 반드시 `TP`(업무 매뉴얼)를 통해 접근해야 한다. 따라서 반드시 정해진 절차에 의해서만 `CDI`에 접근할 수 있도록 통제한다.

<img src="../images/security-engineering-5-security-policy-modeling-3.2.13.2.png?raw=true" alt="drawing" width="640"/>

현재 `Clark-Wilson security model`은 다양한 DBMS(Oracle, DB2, MS SQL, MySQL 등)에 구현되어 있다.

<br/>

#### (14) HRU Model

`BLP Model`과는 다르게 `Harrison`, `Ruzo`, `Ullman`은 `HRU Model`에서 ***변하는(changing)*** `access rights`에 대한 방법을 제시하였다. 새로운 권한을 추가하고 삭제하기 위한 `creation`과 `deletion` 기능이 추가되었다.

<img src="../images/security-engineering-5-security-policy-modeling-3.2.14.1.png?raw=true" alt="drawing" width="320"/>

<br/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-3.2.14.2.png?raw=true" alt="drawing" width="520"/>

<br/>

- `safety property`: System이 계속 safe한 상태를 유지할 수 있으면 `access right` 변경을 허용하고 그렇지 않으면 허용하지 않는다(safety problem을 검사한다.)

하지만 사실상 `safety problem`은 모두 검사하기는 쉽지 않은 `undecidable` 문제이다. ***따라서 적절한 `제약조건(restrictions)`을 줘야 한다.***

보안정책이 화려할수록 수학적으로 증명하기 더욱 어렵다(the more expressive and complex the security model, the more difficult it is to verify security). 보안 운영제체를 만들 때는 모든 기능을 증명하기는 어렵기 때문에 그 중에서 더욱 중요하다고 생각되는 핵심 보안 정책들에 대해서 먼저 수학적으로 증명해 나간다. 그리고나면 증명된 보안정책들은 안전하다고 놓고 그와 관련된 또 다른 보안정책들을 증명해 나간다. 따라서 달성해야 할 보안정책들의 우선순위를 결정하는 것이 매우 중요하다.

- `Monotonic protection system`: `destroy` 또는 `deletion` 명령이 없음(권한 추가만 가능)
- `Monoconditional system`: 각 명령의 조건 파트에서 오직 하나의 조건만 사용함

<br/>

#### (15) Chinese Wall Model

<img src="../images/security-engineering-5-security-policy-modeling-3.2.15.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Conflict of Interest(COI)`: 이해 충돌 관계

현재 허용된 데이터 셋에 기반해서 다음 접근할 수 있는 데이터 셋을 결정한다. ***서로 `이해 충돌 관계`에 있는 데이터에 접근하는 것을 방지한다.***

구글이 유튜브를 인수했을 때, 구글 관리자가 유튜브 사용자 DB에 접근하는 것을 금지시켜달라는 소송이 있었다. 왜냐하면 유튜브 사용자들은 자신들이 데이터에 대한 권한을 유튜브에 허가한 것이지 구글에 허가한 것이 아니라고 주장하였다. 이런 경우에 `Chinese Wall Model`이 유용할 수 있다.

- SS-Property

<img src="../images/security-engineering-5-security-policy-modeling-3.2.15.2.png?raw=true" alt="drawing" width="480"/>

<br/>

`subject`가 이해충돌이 발생하는 곳에 접근하는 것을 방지한다.

<br/>

- *-Property
  
<img src="../images/security-engineering-5-security-policy-modeling-3.2.15.3.png?raw=true" alt="drawing" width="480"/>

<br/>

`un-sanitized` 정보가 회사 데이터 셋에서 흘러나가는 것을 방지한다. 

- `sanitization`: 데이터나 문서에서 `민감한 정보(sensitive information)`을 제거하는 것을 말한다. 따라서 `un-sanitized information`은 `sensitive information`이 제거되지 않은 데이터나 문서 등을 말한다. 따라서 회사 문서가 외부로 유출될 때는 반드시 `sanitization` 과정을 거쳐야 한다.

<br/>

### 3) RBAC Model (Non-DAC Model)

<img src="../images/security-engineering-5-security-policy-modeling-3.3.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`임의적 접근통제(DAC)`와 `강제적 접근통제(MAC)`와는 다르게 `Role-Based Access Control(RBAC)`은 사용자의 `역할(role)`에 기반하여 데이터 접근을 통제한다. 현실에서는 일반적으로 직급(role)에 따라 접근 권한이 부여되는 경우가 많다. 그리고 실제 현장에서는 한 사용자가 ***여러가지 역할(roles)을 갖고 있을 수 있다.***

`RBAC`은 Windows NT, IBM's OS/400, Oracle 8 onwards, .NET framework 등에 구현되어 있다.

<br/>

#### (1) Core RBAC

<img src="../images/security-engineering-5-security-policy-modeling-3.3.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `UA`: user assignments
- `PA`: permission assignment
- `Session`: 사용자를 여러가지 `roles`에 맵핑
- `PRMS`: permission set
- `OBS`: object set

<br/>

#### (2) Hierarchical RBAC

<img src="../images/security-engineering-5-security-policy-modeling-3.3.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

Role 간의 계층을 명시한다. e.g. 사장은 부사장보다 높다. 따라서 사장은 기본적으로 부사장의 모든 권한을 갖는다. 이렇게 하면 사장이 부사장보다 높다는 role hierarchy만 설정해주고, 사장에게만 필요한 추가적인 권한만 더 부여해주면 된다. 

<br/>

##### Example of Hierarchical RBAC

부사장 권한 =` A + B + C`, 사장 권한 = `부사장 권한 + D`

***이 방법은 권한 관리의 모순이나 오류를 줄일 수 있다.***

<br/>

#### (3) SSD with Hierarchical RBAC 

<img src="../images/security-engineering-5-security-policy-modeling-3.3.3.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Static Separation of Duty(SSD)`: 사용자는 서로 충돌되는 두 개의 역할(roles)을 동시에 가질 수 없도록 한다(e.g. 은행 창구의 직원이면서 감사(auditor)의 역할을 동시에 할 수 없다.)

<br/>

#### (4) Dynamic Separation of Duty

- `Dynamic Separation of Duty`: 사용자는 동시에 두 개의 역할로 행동할 수 없다(e.g. 은행 창구의 직원이면서 동시에 은행 창구에 고객으로 있을 수 없다.) 실시간으로 동시간대에 발생하는 역할을 감시하기 위해 Session을 감시한다.

<img src="../images/security-engineering-5-security-policy-modeling-3.3.4.1.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (5) [Note] SELinux

<img src="../images/security-engineering-5-security-policy-modeling-3.3.5.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`Security-Enhanced Linux`는 보안인증을 받기 위해 `NSA`에서 개발하였다.

Hybrid Access-Control Model
- Type Enforcement
- Multi-Level Security (Bell-LaPadula)
- Role-Based Access Control (RBAC)

<br/>

### 4) Security Model Genealogy

<img src="../images/security-engineering-5-security-policy-modeling-3.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`BLP Model`이나 `Biba Model`에서는 MAC을 다루는데 있어서 *-property를 다룰 때만 일부 `information flow`를 다룬 것이다.

하지만 사람들은 `information flow` 개념 자체만으로 매우 중요하다고 생각했다. 그래서 `information flow` 개념을 따로 떼어내서 시스템의 모든 부분에 `information flow` 개념을 적용하면 시스템이 더욱 안전해지는 것을 생각하게 되었다. 따라서 접근통제 이외에도 시스템의 모든 곳에 `information flow model`을 적용하기 시작했다.

<br/>

## 4. Information Flow Security Model

- `Information Flow` : Transmission of information from one “place” to another.

- Two categories of information flows
  - `explicit`: assignment operation(e.g. y = x). 매우 명확한 information flow
  - `implicit`: conditional assignment(e.g. if x then y = z). 쉽게 보이지 않는 information flow

<img src="../images/security-engineering-5-security-policy-modeling-4.0.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`데이터 마이닝`은 DB의 빅데이터에서 숨은 정보를 찾아내는 것인데, 이것은 결국 사람들이 눈치채지 못한 `implicit information flow`를 찾아내는 것과 같다.

단순히 `access control`에만 적용하는 것이 아니고 시스템의 ***모든 정보(all information)의 흐름***을 파악하는 것이기 때문에 이것은 `covert channel` 분석에도 사용할 수 있다.

<br/>

### 1) Entropy-based Analysis (Information Theory)

`Shannon`은 `압축`이라는 개념을 수학적으로 모델링하였다. `Shannon`은 통신채널을 바꾸지 않고 데이터를 많이 보낼 방법을 연구하였다. Shannon은 어떤 데이터를 놓고 얼마만큼의 정보를 갖고 있는지 측정하는 공식을 만들었다. 그리고 데이터의 `Entropy`를 측정하였다.

- `Entropy`: 정보의 양(amount of information)

`Entropy`를 계산하여 `정보의 양의 변화`를 관찰하여 `정보의 흐름`을 알아낸다.

<br/>

### 2) Lattice-based Model

정보가 흘러갈 때 `수학적으로` 설정한 `규칙`에 의해서만 정보가 흘러가도록 하는 것이다.

<br/>

#### (1) Lattice

<img src="../images/security-engineering-5-security-policy-modeling-4.2.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-4.2.1.2.png?raw=true" alt="drawing" width="520"/>

<br/>

- `partial order`: 일부는 순서를 따질 수 있고({1,2}, {1,3}, {2,3}은 {1,2,3}에 포함된다.), 일부는 순서를 따질 수 없는({1,2}, {1,3}, {2,3} 사이에는 순서를 따질 수 없다) 것

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-4.2.1.3.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Lattice`: 모든 `subset`이 `greatest lower bound (glb)`와 `least upper bound (lub)`를 갖고 있는 것

<br/>

#### (2) Lattice Example

<img src="../images/security-engineering-5-security-policy-modeling-4.2.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

1. Bounds, glb, lub of {c, e}?
  - subset `{c, e}` 보다 이하인 점들의 집합은 `{a, c}`이다. `{b, d}`는 `{c, e}`와 연결된 선이 없으므로 순서를 따질 수 없다. 따라서 `glb`는 `{c, e}` 안에서 `c`가 된다.
  - subset `{c, e}` 보다 이상인 점들의 집합은 `{e, f, g, h, i, j}`이다. 따라서 `lub`는 `{e, f, g, h, i, j}` 안에서 `e`가 된다.

2. Bounds, glb, lub of {b, i}?
  - subset `{b, i}` 보다 이하인 점들의 집합은 `{a}`이다. `b`는 `i`와 연결되지 않았기 때문에 포함되지 않는다. 따라서 `glb`는 `a`가 된다.
  - subset `{b, i}` 보다 이상인 점들의 집합은 `{}`이다. 따라서 `lub`는 없다.

따라서 위 예제는 `lattice` 구조가 아니다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-4.2.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

위 예제는 모든 `subset`에 대하여 `glb`와 `lub`가 존재하므로 `lattice` 구조이다.

<br/>

#### (3) Lattice Security Policy

<img src="../images/security-engineering-5-security-policy-modeling-4.2.3.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`(public, {PERSONNEL})`과 `(private, {ENGINEERING})`은 서로 `compartment`가 다르기 때문에 비교할 수 없다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.10.5.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.10.6.png?raw=true" alt="drawing" width="520"/>

<br/>

`Lattice`를 이용하면 `최소권한 원칙`에 맞게 정보가 흘러가도록 할 수 있다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.10.7.png?raw=true" alt="drawing" width="520"/>

<br/>

`Lattice-based Model`의 장단점

- `장점`: 모든 종류의 정보 흐름을 커버할 수 있음
- `단점`: 실제 복잡한 시스템에 적용하기에는 힘듦

<br/>

### 3) Non-Interference Security Model

현실적으로 `information flow model`을 사용하여 모든 정보의 흐름을 파악하기에는 실제 시스템이 너무 복잡하여 적용하기가 힘들었다. 이것을 단순화하기 위해 `non-interference security model`을 만들었다.

상위계층의 `subject A`의 행동이 하위계층의 `subject B`의 시스템 상태에 영향을 끼치면 안된다. 이것은 A의 정보가 B로 흘러갔다고 볼 수 있다. 서로 간에 `간섭(interference)`을 막는 것이다.

`covert channels`와 `inference attacks`을 막는데 사용될 수 있다.

<br/>

### 4) Rule-Based Access Control Model 

`규칙 기반` 접근 통제 모델이다(e.g. 방화벽 규칙 설정).

<br/>

## 5. Access Control Structures

### 1) Access Control Matrix

<img src="../images/security-engineering-5-security-policy-modeling-5.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Capabilities`: Access Control Matrix에서 `가로(행)`으로 자른 것
- `Access Control Lists`: Access Control Matrix에서 `세로(열)`로 자른 것

<br/>

### 2) Capabilities vs. ACL

<img src="../images/security-engineering-5-security-policy-modeling-5.2.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (1) Capabilities e.g.) Kerberos v5

<img src="../images/security-engineering-5-security-policy-modeling-5.2.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

클라이언트는 우선 `KDC`로부터 사용자 `인증(Authentication)`을 한 후 `TGT`를 받아 캐쉬에 저장한다. 다음에 `Target Server`에 접근할 때는 `KDC`에 가서 전에 전달받은 `TGT`를 보여주면서 접근하고자 하는 `Target Server`를 알려준다. `KDC`에서 `TGT`를 검사하고 해당 `Target Server`에 접근가능한 지 검사한 후 `ST`를 발급해주면 이 티켓을 이용해 클라이언트는 `Target Server`에 접근한다.

이전에 사람들은 항상 `인증(Authentication)`과 `권한관리(Authorization)`가 동시에 일어난다고 생각했지만, `커버로스(Kerberos)`에서는 ***한 번만 인증***한 이후에 이후에는 ***권한관리만 반복***적으로 수행된다. 이것은 현재 사용하는 `single-sign-on`의 효시가 되었다.

사용자의 티켓에는 해당 사용자가 어떤 서비스를 이용할 수 있는지 기록되어 있기 때문에 이것은 일종의 `Capabilities`이다.

<br/>

#### (2) (Capabilities e.g.) Android

<img src="../images/security-engineering-5-security-policy-modeling-5.2.2.1.png?raw=true" alt="drawing" width="640"/>

안드로이드 앱에서 `AndroidManifest.xml` 파일은 해당 앱이 어떤 자원에 접근할 수 있는지를 기록해놓았기 때문에 이것은 일종의 `Capabilities`이다.

<br/>

## 6. Reference Monitor

`time-sharing computer system` 또는 `multi-processing` 기능을 갖는 컴퓨터가 등장했을 때 초기에는 비용절감에 도움이 될 것이다라고 생각했으나, 보안 전문가의 입장에서 보았을 때는 동일한 시스템이 여러 사람이 공유하기 때문에 다른 사람이 만든 파일에 접근할 경우 심각한 보안 위협이 될 수 있기 때문에 이를 방지하기 위해서 운영체제 안에 모든 이벤트(events)를 모니터링 할 수 있는 기능이 필요하다고 생각했다. 그리고 후대에 사람들이 이것을 `Reference Monitor`라고 이름 붙였다.

<br/>

### 1) Execution Monitors (EM)

<img src="../images/security-engineering-5-security-policy-modeling-6.1.1.1.png?raw=true" alt="drawing" width="520"/>

`프로그램의 실행(program execution)`을 관찰하는 모니터이다. 이것에 확대되어 나중에 `Reference Monitor`가 된다.

코드가 들어오면 실행을 시키고 발생한 이벤트를 `EM`가 검사한다. 규칙을 위반하는 것이 없으면 코드의 다음 라인을 실행시키고 발생한 이벤트를 다시 `EM`이 검사하는 것을 반복한다. 그러다가 만약 어떤 이벤트를 검사했을 때 규칙을 위반하는 것이 발견되면 `EM`이 프로그램 실행을 중단시킨다.

이와 비슷한 것은 개발할 때 프로그램을 실행시켜 한 줄, 한 줄씩 `디버깅(debugging)`을 하는 것과 비슷하다.

사람들은 `EM`을 운영체제 안에 넣었을 때 어떤 것까지 할 수 있고 어떤 것은 할 수 없는지를 연구하였다. 그 결과 `EM`은 이론적으로 `all safety properties`를 검사할 수 있지만 `liveness properties`는 잡아낼 수 없다고 `Schneider`가 증명하였다.

- `Safety Properties`: 나쁜 일은 발생하지 않을 것이다. 상대적으로 검사하기 쉽다.
- `Liveness Properties`: 언젠가 좋은 일이 발생할 것이다. 상대적으로 훨씬 어렵다. e.g. 프로그램이 언젠가 종료될 것이다. 사용자가 언젠가 금액을 지불할 것이다.

<br/>

#### (1) EM이 할 수 있는(Can) 것들

- `DAC`, `MAC`, `MLS` 접근 통제 정책을 위반했는 지 검사하는 것이 가능

#### (2) EM이 할 수 없는(Can Not) 것들

- `Information Flow`와 관련된 것은 통제할 수 없음
- `Liveness`/`Availability(e.g. DoS)`는 검사할 수 없음

<br/>

### 2) Beyond EM

`EM` 기능의 한계를 인식하게 되어 `보안운영체제`를 만드는 것이 쉽지 않다고 생각하여 더 많은 연구와 예산을 쏟아붓기 시작한다.

<br/>

### 3) Reference Monitor

70년대에는 `Execution Monitor`를 계속 개발하면 안전한 운영체제를 만들 수 있다고 생각하여 계속 연구했다.

`James P. Adnerson`이 최초로 `EM`을 확장하여 `Reference Monitor`라는 개념을 만들었다.

<br/>

#### (1) Reference Monitor Requirements

- 모든 보안 정책 관련된 이벤트를 잡아낼 수 있어야 한다.
- Reference Monitor는 위변조가 불가능(tamper-proof)하고 우회(bypass)되어서는 안 된다.
- 충분히 복잡도가 낮아서 수학적으로 분석할 수 있어야 한다.

<br/>

#### (2) Reference Monitor Types

<img src="../images/security-engineering-5-security-policy-modeling-6.3.2.1.png?raw=true" alt="drawing" width="640"/>

1. `커널(Kernel) 안에` 들어가서 모든 이벤트를 검사하는 형태(일반적으로 `보안운영체제`에서 많이 연구하는 형태)
2. 프로그램이 실행되면 `Interpreter` 역할을 하여 `프로그램을 감싸는` 형태. 프로그램이 커널에 접근할 때 `RM`이 검사하여 중간에서 통제하는 형태
3. `프로그램 안에` 넣어서 `RM`을 운영하는 형태

<br/>

### 4) Validity Checks

`Execution Monitor` 안에 `보안정책`을 주입한다. 한 줄씩 실행할 때마다 주입된 보안정책을 위반하는지 검사한다. 이 모든 것을 통틀어서 `Reference Monitor`라고 한다.

커널 안에 `RM`을 넣은 형태를 `보안 커널(Security Kernel)`이라고 한다.

<br/>

### 5) Practical Issues

사람들이 처음에 생각했던 것 보다 `EM`으로 할 수 있는 것이 접근 제어 정도 밖에 없다는 것을 알게되었고, 운영체제에서 발생하는 모든 이벤트를 잡아내는 것도 쉽지 않다는 것을 알게 된다. 따라서 ***`보안운영체제`를 만드는 것은 매우 어렵다***는 것을 느끼게 된다. 그래서 본격적으로 `보안운영체제`를 연구하기 시작한다.

<br/>

### 6) Commercial Security Kernels

<img src="../images/security-engineering-5-security-policy-modeling-6.6.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### 7) Summary

<img src="../images/security-engineering-5-security-policy-modeling-6.7.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

1970년대에는 `Penetrate and Patch` 방법을 통해 모의해킹 팀을 이용해서 보안운영체제의 보안성을 높이려고 했지만 모의해킹 팀에 따라서 실력이 다르고 일관된 결과가 나오지 않는다는 것을 알게 되었다. 모의해킹 팀을 부르고 고치고 다시 부르고 고치는 방법은 품질 관리에 바람직한 방법이 아니라고 생각한다.

수학적으로 증명을 해서 무엇은 확실히 되고 무엇은 안 되는지를 아는 것이 중요하다고 생각한다. 그래서 시스템을 Formal하게 수학적으로 증명하기 위한 시도를 한다. 따라서 보안정책을 Formal하게 기술하고, 설계와 구현이 보안정책을 제대로 만족하는지 검증하려는 시도가 시작되었다. 그 시초가 된 것이 바로 운영체제의 아버지라고 하는 `MULTICS`이다. `MULTICS`는 보안운영체제와 관련한 많은 기능을 정립하였다.

1980년대에는 정부에서도 평가체계를 만들기 시작하여 `Orange Book`이라는 컴퓨터 시스템과 관련된 평가기준이 만들어진다. `A1 등급`은 실제 설계가 제대로 되었는지 수학적으로 증명한 것이고, `A2 등급`은 실제 코딩까지 제대로 되었다는 것을 수학적으로 증명된 것이다.

<br/>

### 8) Formal Security Policy Models for Smart Card Evaluations

NXP에서는 스마트카드의 보안정책을 Formal하게 표현한다.

<br/>

### 9) Model Checking Firewall Policy Configurations

<img src="../images/security-engineering-5-security-policy-modeling-6.9.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

`Bell Labs`에서 `자동화 도구`를 이용하여 방화벽에 들어가는 보안정책의 모순을 자동검증하는 논문이다.
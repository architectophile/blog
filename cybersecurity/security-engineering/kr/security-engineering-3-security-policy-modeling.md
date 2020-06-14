# Security Policy Modeling - Formal Representation of the Security Requirements

<br/>

보안 요구사항을 모두 도출하였으면, `보안 요구사항(security requirements)`의 `정형화 명세(formal representation)`를 만들어야 한다.  

`정형화 명세(formal representation)`를 작성하는 것은 보안 요구사항을 수학적으로 증명가능한 형태로 바꾸는 것이며, ***수학 기호로 표현하여 누가 해석하더라도 항상 정확하고 일관된 해석이 가능하게 된다.***

<br/>

## 1. Introduction to Formalization

<img src="../images/security-engineering-5-security-policy-modeling-1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

SPM(Security Policy Modeling)을 제대로 하기 위해서는 `소프트웨어 공학(Software Engineering)`, `정보보안(IT Security)`, `정형화 방법(Formal Methods)`에 대한 다양한 지식이 필요하다.

`Formal Methods`는 어떤 소프트웨어 또는 하드웨어 제품의 설계, 개발, 검증을 위한 수학적 기반의 기술이다. 이러한 수학적 분석을 통해 제품 설계의 `reliability`와 `robustness`를 증가시킬 수 있다.

`Formal Methods`를 잘 사용하는 곳은 미국의 NASA(로켓의 안정적인 동작이 매우 중요함), 자동차 제조업체, 원자력 발전소 설계 업체 등이 있다.

<br/>

### FSPM 예시

<img src="../images/security-engineering-5-security-policy-modeling-1.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

위의 그림은 `First Order Predicate Logic` 방법을 나타낸다.

자연어로 쓰여진 보안정책을 수학적 기호를 이용해 정형화 명세로 변경한다.

e.g. 오직 관리자만이 어떤 객체의 접근 권한(access rights)를 변경할 수 있다. 

`First Order Predicate Logic`보다 풍부한 표현이 가능한 방법으로는 `High Order Predicate Logic`이 있다.

<br/>

### First-Order Theories가 필요한 이유

`1+1 == 1+1+0` ?

- 덧셈 연산자가 자연수에 대한 더하기를 나타내는 것이라면 참이다.
- 하지만 스트링 Concatenation일 경우에는 거짓이 된다.

따라서 수학적 기호의 의미를 정확하게 정의하고 나타내는 것이 중요하다.

- `Propositional Logic(PL)`
- `First Order Logic(PL)`
- `High Order Logic Logic(PL)`

`PL < FOl < HOL`

HOL로 갈수록 표현성이 높아져서 다양한 표현이 가능해진다.

<br/>

### First Order Predicate Logic

#### (1) Relations

- `properties`: 어떤 싱글 객체의 특성을 나타낸다. e.g. Round(ball), Prime(7).
- `n-ary relations`: 두 개 이상의 객체들의 관계를 나타낸다. e.g. Married(John, Marry), Largerthan(3, 2).
- `functions`: 또 다른 객체를 나타내는 함수. e.g. Plus(2,3), Father(Dan).

<br/>

#### Translating English to FOL

<img src="../images/security-engineering-5-security-policy-modeling-1.1.3.png?raw=true" alt="drawing" width="640"/>

<br/>

### Common Criteria & SPM

<img src="../images/security-engineering-5-security-policy-modeling-1.1.4.png?raw=true" alt="drawing" width="640"/>

<br/>

EAL 등급이 높을 수록 높은 보안성을 나타낸다. `EAL5` 이상을 받기 위해서는 필수적으로 `formal security policy model`이 요구된다.
    
<img src="../images/security-engineering-5-security-policy-modeling-1.1.5.png?raw=true" alt="drawing" width="640"/>

<br/>

왼쪽에 `정형화 명세(functional requirement)`를 넣고 오른쪽에 `설계 명세(functional specification)`를 넣고 `Model Checker`에게 전달하면 요구사항을 만족하는지 판별할 수 있다.

<br/>

### First Order Theories

- `FOL(First Order Logic)`
- `FOT(First Order Theories)`

<br/>

### Formal Modeling Languages

- `Informal method`: English와 같은 자연어
- `Semiformal methods`: 다이어그램이나 표를 이용해서 좀 더 정확하게 표현하는 것(e.g. database entity relationship diagrams, UML, UMLSec, SecureUML 등)
- `Formal methods`: 

<br/>

### Formal Tools

<img src="../images/security-engineering-5-security-policy-modeling-1.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### Basic Ideas of Formal Methods

<img src="../images/security-engineering-5-security-policy-modeling-1.3.1.png?raw=true" alt="drawing" width="840"/>

<br/>

위의 모든 단계에서 `Formal Methods`가 사용된다.

<br/>

#### `Formal Model`의 장점

`Formal Method`를 사용하면 내가 설계한 디자인이 보안정책을 만족하는지 수학적으로 증명할 수 있다는 것이 장점이다.

<br/>

#### Two Different Styles of Formal Methods

- `Formal Specification`: 어떤 문장이 있을 때 수학적 기호로 바꿔 정형화 명세를 만드는 것(UK와 유럽에서 많이 연구함 → 비용이 많이 들지 않는다.)
- `Formal Verification`: 내가 만든 정형화 명세가 제대로 만들어졌는지 검증하고, 내가 만든 제품이 정형화 명세를 만족하는지 검사하는 것이다(미국과 캐나다에서 많이 연구함 → 검증 툴이 필요하므로 비용이 많이 들어간다.)

둘 중에서 `Formal Specification`이 ***더욱 창의적인 작업이다.*** 대신 `Formal Verification`은 사람이 직접 하거나 컴퓨터가 자동으로 할 수 있다. 하지만 `Formal Specification`은 자동화하기가 매우 어렵다.

<img src="../images/security-engineering-5-security-policy-modeling-1.3.2.png?raw=true" alt="drawing" width="720"/>

<br/>

`Threat Modeling`을 통해 작성한 보안정책인 `Security Properties`를 `Formal Specification`을 이용해서 수학적 기호로 표현한다. 그 다음 내가 만든 실제 시스템 `Actual System`을 모델링(또는 추상화)한 다음 수학적 기호로 표현하여 `System Representation`를 작성한다. 그 다음 `Formal Verification`을 통해 실제 시스템에 보안정책을 만족하는지 검증한다.

그리고 `Security Properties` 뿐만 아니라 내가 구현하고자 하는 기능에 대한 `Functional Properties`에 대한 검증도 가능하다.

<br/>

#### Security Properties  

- `Confidentiality`, `Integrity`, and `Availability`: 기밀성, 무결성, 가용성 (이 중에서 `Availability`는 증명하기가 매우 어렵다.)
- `Non-interference`: 관리자 권한을 가진 사용자가 어떤 작업을 수행했을 때 이와 관련된 정보가 권한이 없는 일반 사용자에게 노출되면 안되다.
- `Isolation`: 한 쪽에서 하는 일이 다른 쪽에 영향을 끼치면 안된다. `Non-interference`와 비슷하지만 `Isolation`은 동등한 권한을 가진 사용자끼리 서로 분리되어야 한다는 것이다.(e.g. CPU칩에서 Spectre, Melt Down과 같은 부채널 공격을 통해 다른 사용자의 데이터를 읽어낼 수 있다.)
- `Information Flow`: 정보의 흐름에 있어서 문제가 생기는 것을 찾는 것이다.
- `Type and Memory Safety`: 데이터가 복사될 때 같은 타입의 변수인지 검사하는 것과 메모리 접근이 안전하게 보장되는지 검사한다(e.g. Buffer Overflow를 방지하는 것).
- `Memory Integrity`, and `Execution and Code Integrity`: 메모리에 올라간 프로그램이 허용되지 않은 사용자에 의해 수정되는 것을 막는 것과 프로그램 실행시 코드 무결성을 보장하는 것이다.

이외에도 다양한 `Security Properties`가 존재하며, 해당 시스템에 따라 원하는 `Security Properties`를 추가할 수 있다.

<br/>

### History

`NSA(National Security Agency)`가 `Formal Methods`에 대한 중요성을 인식하고 ***70, 80년대에 많이 연구하고 개발하였다.*** 이 때 Operating System에 multi user 기능이 추가되면서 보안 위협에 위험성을 인식하였다. 따라서 특히 NSA는 시스템의 보안이 매우 중요한 기관이므로 OS의 `Kernel`에 대한 `Formal Methods` 연구를 많이 하게 되었다.

- `Bell-LaPadula` model: `Bell`과 `LaPadula` 수학자들이 최초로 많이 연구하였다(`Information Flow` property를 주로 연구함).

기존에는 모의해킹하고 패치하는 `Penetrate and Patch` 방법을 많이 사용했었는데, 이 방법이 시스템의 보안성을 검증하는데 충분하지 않다는 생각을 하였다. 따라서 `수학적으로 증명`하려는 시도를 시작하였다.

어떤 시스템을 수학적으로 안전하지 증명하는 것은 해당 시스템 전체가 완전하게 안전하다는 것을 증명하는 것보다는, 어느 부분은 수학적으로 증명하여 안전하고, 어떤 부분은 증명할 수 없어 위험성이 있는지를 검사하여 좀 더 위험한 부분에 더 많은 투자를 하기 위함이다.

<br/>

#### The Orange Book

최초의 `보안 운영체제`에 대한 평가 기준이다. NCSC에서 1985년에 작성하였다. 

- `Levels`: D, C1, C2, B1, B2, B3, A1, (A2): 

D가 가장 낮은 등급이고, A2가 가장 높은 등급이다.

`A.1` 등급이 의미하는 것은 `보안 요구사항`을 `Formally 표현`하고, 시스템을 `Formally 모델링`하여 해당 모델이 보안 요구사항을 만족하는지 `Formally 검증`되었다는 것이다.

`A.2` 등급은 프로그램 코드가 설계대로 작성되었는지 수학적으로 검증하는 것(Code Assurance)이다. 하지만 당시에 아직 코드까지 수학적으로 증명하는 것은 기술적으로 힘들다고 생각하여 삭제된 등급이다. 하지만 나중에 2000년대에 `Bell-LaPadula`는 `A.2` 등급을 그대로 남겨놨어야 한다고 회고하였다. 그랬으면 미국의 시스템 보안성이 더욱 높아졌을 것이라고 얘기했다.

<br/>

### Model Checking

`SSL` 프로토콜은 설계의 안전성을 수학적으로 증명가능하다. `IKE(Internet Key Exchange)` 프로토콜과 `SET(Secure Electronic Transaction)` 프로토콜도 수학적으로 증명가능하다.

<br/>

### The Limits of Formal Methods

보안 요구사항을 수학적으로 증명하는 것은 ***해당 Security Property를 증명했다는 것 뿐이다.*** 따라서 나머지 증명되지 않은 Security Property에 의해서 취약점이 발생할 수 있다. 그러므로 보안 요구사항을 매우 상세하게 도출하는 것이 중요하다.

보안 요구사항은 제대로 도출했지만 Formal Specification 과정에서 실수가 있으면 수학적 증명이 실패할 수도 있다. 또는 기존에 알려진 Assumption이 깨질 경우 취약점이 발생할 수 있다.

<img src="../images/security-engineering-5-security-policy-modeling-1.4.1.png?raw=true" alt="drawing" width="720"/>

<br/>

위 그림에서 모델링을 할 때 전제조건에서 모든 차량은 차도를 통해서만 움직인다고 가정했지만 전제조건이 깨질 경우 새로운 공격이 가능할 수 있다.

`Formal Model`이 실제 모든 공격을 커버할 수는 없다.

<br/>

### Security Policy Model

- `Security Policy`: 자연어로 적어놓은 보안 정책을 의미함
- `Security Policy Model`: `Security Policy`을 정형화 명세 방법으로 수학적 기호 형태로 표현하는 것(넓은 의미에서는 Formal Verification 단계까지 포함)

<br/>

### Security Policy Assurance

`Security Policy Assurance`는 `Security Requirements` 간에 모순이 없는지 검사하고, 제대로된 수학적 기호를 통해 표현되었는지 검사하는 것이다.

e.g. 운영체제를 접속할 수 있는 사람은 3명이다. 관리자는 2명 이상이다. 사용자는 2명이다. → `Security Requirements`에 모순이 있다.

1. 보안 요구사항이 정확한지 확인한다(모순 검사).
2. 보안 요구사항이 모두 제대로 도출되었는지(complete) 검사한다. → 검증하기가 매우 어렵다. → 체계적인 보안 요구사항 도출 방법을 사용한 것을 보임으로써 증명을 대체하곤 한다.
3. 보안 요구사항이 테스트 가능한지 검사한다.
4. 설계에 잘 반영되었는지 확인한다.

<br/>

### In 1967

`time-sharing computer system`이 1967년에 만들어지면서 보안 운영체제에 대한 요구가 발생했다. NSA의 `Benard Peters`가 보안 운영체제에 대한 요구사항을 얘기했다.

- O/S는 모니터링 시스템이 있어서 운영체제에서 발생하는 모든 이벤트를 검사해야 한다(훗날에 감시 프로그램을 `Reference Monitor`라고 이름붙였다.)

- 감시 프로그램(`Reference Monitor`)은 매우 중요하기 때문에 이 프로그램의 안전성이 ***수학적으로 증명되어야 한다.*** `Assurance Level`이 높아야 한다. → `Simple`하게 만들어야 한다. → `Assurance` 증가

- 평가인증 제도를 통해서 시스템에 대한 보안성 인증을 받아야 한다.

<br/>

### In 1972

`James P. Anderson`은 미국 정부의 컴퓨터 시스템에 필요한 보안 요구사항을 정립하였다(`James P. Anderson Report`).

1. 컴퓨터 시스템에는 `RVM`(Reference Validation Mechanism)이 있어서 모든 이벤트를 감시해야 한다(`complete mediation`).

2. `RVM`은 반드시 `tamper-proof`한 성질이 있어서 해커가 기능을 변경하거나 무력화할 수 없어야 한다.

3. `RVM`이 제대로 만들어졌는지 검증할 수 있어야 한다(`verifiable`). 그러기 위해서는 `small` enough해야 한다.

<br/>

`Anderson Report`에서는 `small`을 사용했지만 → `TCSEC`에서는 `simple`로 바뀌었다. → 단순히 작게 만든다고 복잡도가 낮아지지 않고 오히려 복잡도가 높아질 수 있다. 따라서 시스템은 `simple`해야 분석이 잘 되어서 `complexity`가 낮아진다. → `모듈화`의 필요성

<img src="../images/security-engineering-5-security-policy-modeling-1.5.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### Reference Monitor

- `Reference Monitor`: 접근제어 개념
- `Security Kernel`: `Reference Monitor`을 실제 구현한 것
- `TCB(Trusted Computing Base)`: `Security Kernel` + 기타 보안 메커니즘들(`Security Kernel`만으로는 부족하다는 것을 느꼈기 때문에)

<br/>

## 2. Access Control Policy

운영체제는 접근 통제 기능이 매우 많아서 `Access Control Policy`에 대한 보안 정책이 Formal하게 증명되기 시작했다.

- `Authentication`: 신원을 검증(proving)하는 것(e.g. ID, PW 로그인 인증)
- `Identification`: 주체의 신원을 구축하는(establishing) 것(e.g. 경찰에서 증거 지문을 채취하여 범인의 신원을 알아내는 것)
- `Authorization`: 신원이 확인된 사용자가 어떤 권한을 갖고 있는지 확인하고 그에 맞는 권한을 관리하는 것

### (1) DAC Model

<img src="../images/security-engineering-5-security-policy-modeling-2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`DAC(Discretionary Access Control) Model`은 임의적 접근통제이며, 일반적으로 사용자의 ID, 또는 사용자의 그룹 ID에 따라 접근을 통제하는 것이다.  
좀 더 정확하게 얘기하면, 해당 파일에 소유자의 판단에 따라서 접근 권한을 통제하는 것이다.  
`needs-to-know` 원칙에 따라 정보를 보호한다. 누가 알아야 하는지는 파일의 `소유주(owner)`가 권한을 관리한다.

대표적인 `DAC`를 사용하는 시스템은 유닉스 또는 리눅스이다.

<img src="../images/security-engineering-5-security-policy-modeling-2.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`DAC`를 사용하면 시스템의 유연성이 매우 좋다. 왜냐하면 소유주가 자유롭게 접근 권한을 변경할 수 있기 때문이다(e.g. `chmod` 명령).

<br/>

#### DAC 시스템의 문제

<img src="../images/security-engineering-5-security-policy-modeling-2.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`Alice(owner)`가 `Bob`에게 파일을 복사해주면, `Bob`이 다시 파일을 복사하여 `Eve`에게 전달할 수 있다.  
애초에 `Alice`는 `Bob`에게만 파일을 보여주려고 했지만, 결과적으로 `Eve`에게도 파일이 전달되었다(e.g. `너만봐 정책`, 카톡에서 한 사람에게 사진을 전송하면 더 이상 통제권을 잃고 다른 사람에게 전파되는 것과 비슷하다.)

<br/>

### (2) MAC Model(Non-DAC Model)

<img src="../images/security-engineering-5-security-policy-modeling-2.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`MAC(Mandatory Access Control) Model`은 주로 군에서 사용한다. `DAC`와 다르게 접근권한 레벨에 따라서 강제적 접근통제를 할 수 있다. 모든 자원에는 권한 레벨이 설정되어 있고, 해당 사용자의 신원을 인증하여 자원에 부여된 권한 레벨 이상일 때만 접근을 허용하는 방식이다. 따라서 사용자는 자신의 권한을 다른 사용자에게 양도할 수 없으므로 해당 권한이 없는 사용자는 강제적으로 접근이 통제된다.  
이 때 각 `subject`와 `object`들은 `security label`이 붙어있어 해당하는 보안 권한 레벨을 알 수 있다.

<br/>

#### MAC Model의 종류

- `MLS(Multi-Level Security`
- `BLP(Bell-LaPadula)`
- `LBAC(Lattice-Based Access Control)`

<br/>

#### 전통적인 MAC

<img src="../images/security-engineering-5-security-policy-modeling-2.2.2.png?raw=true" alt="drawing" width="320"/>

<br/>

`전통적인 MAC` 방식은 `계층적(hierarchical)` 보안 레벨(`linearly ordered`) 방식이다. 하지만 단순히 계층만 나누고 권한을 부여하면 `최소 권한의 원칙`을 위배하게 된다(e.g. 정보보호학과 교수가 화학과 정보를 접근하는 것과 같은 문제가 발생한다.)

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.2.3.png?raw=true" alt="drawing" width="640"/>

<br/>

`최소 권한의 원칙`을 지키기 위해서는 `구역` 개념을 부여하여 접근 권한을 통제해야 한다는 요구가 발생한다.

<br/>

#### MLS Model

`MLS(Multi-Level Security)` 방식은 `needs-to-know` 정책과 `categories(partially ordered)` 개념, 그리고 lattices의 `security levels(linearly ordered)` 개념을 결합한 것이다.  
최최의 MLS을 시스템을 적용한 제품은 `IBM`에서 개발한 `ADEPT-50` 모델이다.

`linearly ordered`: 계층적으로 보안 레벨을 나누어 접근 권한을 통제하는 것이다.
`partially ordered`: 집합처럼 구역을 나누어서 접근 권한을 통제하는 것이다. 집합에서 부분집합과 같은 개념이다(`Category(Compartment)`의 개념).

#### How to Design MLS Model?

<img src="../images/security-engineering-5-security-policy-modeling-2.2.4.png?raw=true" alt="drawing" width="640"/>

<br/>

하지만 위에 설계가 MLS 정책을 만족하는지 수학적으로 증명할 수 있어야 한다. 이를 위해서는 MLS 정책들이 수학적 기호로 표현되어야 한다.

<br/>

#### BLP Model of MLS

1973년에 MITER의 `Bell`과 `LaPadula`는 기존의 `Tiger Teams`이 하는 모의해킹 방식(`penetrate and patch`)의 한계를 인식하고 제대로 보안성을 검증하기 위해서는 ***수학적 증명이 필요하다는 주장을 제기한다.***

`BLP(Bell LaPadula Policy) Model`은 MLS 보안정책을 최초로 수학적으로 정의한 것이다. → `High Policy Assurance`를 제공한다.

- `Information Flow Policy`: 정보는 덜 신뢰할 수 있는 주체로부터 더 신뢰할 수 있는 주체로만 흘러야 한다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.2.5.png?raw=true" alt="drawing" width="640"/>

<br/>

기존의 `MLS` 방식은 매우 정적인 방식이다. 위의 왼쪽 그림처럼 `Unclassified` 정보가 `Top Secret` 정보에 쓰여지는 것은 괜찮지만, 오른쪽 그림처럼 `Top Secret` 정보가 `Unclassified`로 흘러가는 것은 문제가 발생한다. ***하지만 MLS 방식에서는 이를 방지하지 못한다.*** → 따라서 MLS 처럼 자연어로 기술된 정책은 문제가 있으므로 수학적 기호로 표현할 수 있어야 한다고 주장한다.

<br/>

#### BLP Model in Formal

<img src="../images/security-engineering-5-security-policy-modeling-2.2.6.png?raw=true" alt="drawing" width="640"/>

<br/>

`s`는 `subject 집합(사용자 또는 프로세스)`을 의미한다. `o`는 `object 집합(파일 등)`을 의미한다. `a`는 `access operation(execute, read, append, and write)`을 의미한다.

`write`와 `append`의 차이점은 `write`는 문서를 볼 수 있어야 가능하지만, `append`는 문서를 읽지 않아도 덧붙일 수 있다. 따라서 `write`에는 문서를 본다는 것이 포함되어 있다. `l`은 `security level`을 의미한다.

<img src="../images/security-engineering-5-security-policy-modeling-2.2.7.png?raw=true" alt="drawing" width="640"/>

<br/>

표시할 수 있는 `상태(state)`는 3가지의 `b`, `M`, `f`로 나뉜다. 

- `b`는 subject와 object, 그리고 subject가 object에게 하는 access operation이다.

- `M`은 matrix를 나타낸다. 행(row)이 `subject`이고 열(column)이 `object`이다. 이것을 `access control matrix`라고 한다. 이것을 행으로 자르는 것을 `access control capability`라고 하고, 열로 자르는 것을 `access control list`라고 한다.

- `f`는 `security level`을 의미한다. `clearance level`과 `classification level`을 의미한다. f<sub>s</sub>는 `subject`가 가질 수 있는 `최대의(maximal) security level`을 의미한다. 그리고 f<sub>c</sub>는 `subject`가 갖는 `현재의(current) security level`을 의미한다. f<sub>o</sub>는 `object`의 `security level`을 의미한다.

<img src="../images/security-engineering-5-security-policy-modeling-2.2.8.png?raw=true" alt="drawing" width="640"/>

<br/>

Simple Security Property (SS-Property – No “Read Up”)

<img src="../images/security-engineering-5-security-policy-modeling-2.2.9.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.2.10.png?raw=true" alt="drawing" width="480"/>

<br/>

*-Property (Star-Property – No “Write Down”)

<img src="../images/security-engineering-5-security-policy-modeling-2.2.11.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.2.12.png?raw=true" alt="drawing" width="640"/>

<br/>

`information flow security`를 나타낸다.

`current security level`을 사용하는 것은 subject의 권한을 일시적으로 낮춰서 아래에 있는 프로세스와도 통신을 할 수 있도록 하기 위함이다.

<img src="../images/security-engineering-5-security-policy-modeling-2.2.13.png?raw=true" alt="drawing" width="640"/>

<br/>

`BLP 보안정책`을 따르는 보안 운영체제는 `MULTICS`가 있다. 현재 운영체제들의 아버지라고 할 수 있다.

`MULTICS` → `UNICS` → `UNIX` → `LINUX`

<br/>

#### The Criticism of McLean

`McLean`은 BLP Model에서 `current security level`을 사용해서 일시적으로 권한을 낮춰서 높은 등급의 정보를 낮은 등급의 subject에게 전달할 수 있다면 이것은 안전하지 않다고 주장했다.

이에 대해 Bell과 LaPadula는 자신들의 `전제조건(assumption)`을 위반한 것이기 때문에 그것은 고려대상이 아니라고 했다.

assumptions의 개수를 최소화하는 것이 좋다. 하지만 처음부터 그것은 쉽지 않기 때문에 하나하나씩 assumption을 줄여나가게 된다.

<br/>

#### BLP Model in a Nutshell

<img src="../images/security-engineering-5-security-policy-modeling-2.2.14.png?raw=true" alt="drawing" width="720"/>

<br/>

### (3) Covert Channels

`은닉채널(Covert Channels)`은 보이지 않는 채널을 이용해서 데이터를 전달하는 채널이다.
e.g. 높은 등급의 사람이 높은 보안 레벨의 정보를 읽어서 스마트폰으로 사진을 찍어서 낮은 등급의 사람에게 사진을 전송하는 것을 막을 수 없다.

`부채널(Side Channel)`은 `은닉채널(Covert Channels)`은 다른 개념이다. `부채널(Side Channel)`은 CPU의 전력소비를 측정해서 비밀 정보를 알아내는 것과 같은 공격이다.

`은닉채널(Covert Channels)`에서는 전송자와 수신자가 서로 협력해야만 가능하다. `부채널(Side Channel)`은 전송자의 도움이 필요없으며, 외부에서 측정하여 정보를 빼내는 것이다.

<br/>

### (4) Biba Model

`Biba Model`은 `BLP Model`에 대한 Counterpart(Logical Dual) 또는 쌍대개념이다.

`BLP Model`은 `기밀성(Confidentiality)`를 보장하기 위한 모델이다.

`Biba Model`은 `무결성(Integrity)`을 보장하기 위해 만든 것이다.

<img src="../images/security-engineering-5-security-policy-modeling-2.4.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`High Integrity` 정보는 데이터가 위변조되지 않았고, 정보가 참(true)일 확률이 매우 높은 정보이다.
 
`BLP Model`과는 다르게 `Biba Model`에서는 높은 등급의 정보가 낮은 등급으로 흘러야 한다.

<br/>

#### Biba Model in a Nutshell

<img src="../images/security-engineering-5-security-policy-modeling-2.4.2.png?raw=true" alt="drawing" width="640"/>

<br/>

### (5) Clark-Wilson Model

`military` 영역에서는 `Confidentiality`가 중요하지만 `commercial` 영역에서는 `Integrity`가 매우 중요하다고 주장하였다. `Biba Model`을 확장하여 `Clark-Wilson Model`을 제시하였다.

`Well Formed Transaction` 개념을 제시하였다.

<img src="../images/security-engineering-5-security-policy-modeling-2.5.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Constrained Data Items (CDI)`: `integrity`가 매우 잘 지켜져야 하는 데이터(e.g. account balance)
- `Unconstrained Data Items (UDI)`: `integrity`가 별로 중요하지 않은 데이터
- `Integrity Verification Procedures (IVP)`: 주기적으로 CDI 데이터를 검사함
- `Transformation Procedures(TP)`: 정해진 업무 절차를 나타냄. well formed transaction을 유지함(e.g. depositing money, withdrawing money)

<br/>

### (6) HRU Model

`BLP Model`과는 다르게 `HRU Model`는 변하는 `access rights`에 대한 방법을 제시하였다. 새로운 권한을 추가하고 삭제하기 위한 `creation`과 `deletion` 기능이 추가되었다.

<img src="../images/security-engineering-5-security-policy-modeling-2.6.1.png?raw=true" alt="drawing" width="320"/>

<br/>

System이 safe한 상태를 유지할 수 있으면 `access rights` 변경을 허용하고 그렇지 않으면 허용하지 않는다(safety problem).

하지만 사실상 `safety problem`은 모두 검사하기는 쉽지 않은 `undecidable` 문제이다. 따라서 적절한 `제약조건(restrictions)`을 줘야 한다.

- `Monotonic protection system`: `destroy` 또는 `deletion` 명령이 없음(권한 추가만 가능)
- `Monoconditional system`: 각 명령의 조건 파트에서 오직 하나의 조건만 사용함

<br/>

### (7) Chinese Wall Model

현재 허용된 데이터 셋에 기반해서 다음 접근할 수 있는 데이터 셋을 결정한다. 서로 이해 충돌 관계에 있는 데이터에 접근하는 것을 방지한다.

<img src="../images/security-engineering-5-security-policy-modeling-2.7.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Conflict of Interest(COI)`: 이해 충돌 관계

#### SS-Property

subject가 이해충돌이 발생하는 곳에 접근하는 것을 방지한다.

<br/>

#### *-Property

`un-sanitized` 정보가 회사 데이터셋에서 흘러나가는 것을 방지한다. 

<br/>

### (8) RBAC Model (Non-DAC Model)

`임의적 접근통제(DAC)`와 `강제적 접근통제(MAC)`와는 다르게 `Role-Based Access Control(RBAC)`은 사용자의 역할(role)에 기반하여 데이터 접근을 통제한다. 현실에서는 일반적으로 직급(role)에 따라 접근 권한이 부여되는 경우가 많다. 그리고 실제 현장에서는 한 사용자가 ***여러가지 역할(roles)을 갖고 있을 수 있다.***

<img src="../images/security-engineering-5-security-policy-modeling-2.8.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.8.2.png?raw=true" alt="drawing" width="640"/>

<br/>

- `UA`: user assignments
- `PA`: permission assignment
- `Session`: 사용자를 여러가지 roles에 맵핑

<br/>

#### Hierarchical RBA

role 간의 계층을 명시한다. e.g. 사장은 부사장보다 높다. 따라서 사장은 기본적으로 부사장의 모든 권한을 갖는다.

<br/>

#### SSD with Hierarchical RBAC 

<img src="../images/security-engineering-5-security-policy-modeling-2.8.3.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Static Separation of Duty(SSD)`: 사용자는 서로 충돌되는 두 개의 역할(roles)을 동시에 가질 수 없다.

<br/>

#### Dynamic Separation of Duty

- `Dynamic Separation of Duty`: 사용자는 동시에 두 개의 역할로 행동할 수 없다.

<img src="../images/security-engineering-5-security-policy-modeling-2.8.4.png?raw=true" alt="drawing" width="640"/>

<br/>

### (9) SELinux

Security-Enhanced Linux

Hybrid Access-Control Model

- Type Enforcement
- Multi-Level Security(Bell-LaPadula)
- Role-Based Access Control (RBAC)

<br/>

### (10) Information Flow Security Model

- `explicit`: assignment operation(e.g. y = x)
- `implicit`: conditional assignment(e.g. if x then y = z)

<br/>

#### Entropy-based Analysis (Information Theory)

- `Entropy`: 정보의 양

`Entropy`를 계산하여 정보의 양의 변화를 관찰하여 정보의 흐름을 알아낸다.

<br/>

#### Lattice-based Model

정보가 흘러갈 때 수학적으로 설정한 규칙에 의해서만 정보가 흘러가도록 하는 것이다.

##### Lattice

<img src="../images/security-engineering-5-security-policy-modeling-2.10.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Lattice`: 모든 subset이 `least upper bound`와 `greatest lower bound`를 갖고 있는 것

<img src="../images/security-engineering-5-security-policy-modeling-2.10.2.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.10.3.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.10.4.png?raw=true" alt="drawing" width="640"/>

<br/>

`Lattice`를 이용하면 `최소권한 원칙`에 맞게 정보가 흘러가도록 할 수 있다.

<img src="../images/security-engineering-5-security-policy-modeling-2.10.5.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.10.6.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-2.10.7.png?raw=true" alt="drawing" width="640"/>

<br/>

Lattice-based Model의 장단점

- `장점`: 모든 종류의 정보 흐름을 커버할 수 있음
- `단점`: 실제 복잡한 시스템에 적용하기에는 힘듦

<br/>

#### Non-Interference Security Model

사용자 A의 행동이 사용자 B의 상태에 영향을 끼치면 안된다. 서로 간에 간섭(interference)을 막는 것이다.

<br/>

### (11) Rule-Based Access Control Model 

규칙 기반 접근 통제 모델이다(e.g. 방화벽 규칙 설정).

<br/>

## 3. Access Control Structures

### (1) Access Control Matrix

<img src="../images/security-engineering-5-security-policy-modeling-3.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Capabilities`: Access Control Matrix에서 `가로(행)`으로 자른 것
- `Access Control Lists`: Access Control Matrix에서 `세로(열)`로 자른 것

<br/>

#### Capabilities e.g.) Kerberos v5

<img src="../images/security-engineering-5-security-policy-modeling-3.1.2.png?raw=true" alt="drawing" width="640"/>

클라이언트는 우선 `KDC`로부터 사용자 `인증(Authentication)`을 한 후 `TGT`를 받아 캐쉬에 저장한다. 다음에 `Target Server`에 접근할 때는 `KDC`에 가서 전에 전달받은 `TGT`를 보여주면서 접근하고자 하는 `Target Server`를 알려준다. `KDC`에서 `TGT`를 검사하고 해당 `Target Server`에 접근가능한 지 검사한 후 `ST`를 발급해주면 이 티켓을 이용해 클라이언트는 `Target Server`에 접근한다.

이전에 사람들은 항상 `인증(Authentication)`과 `권한관리(Authorization)`이 동시에 일어난다고 생각했지만, `커버로스(Kerberos)`에서는 한 번만 한 이후에 이후에는 권한관리만 반복적으로 수행된다. 이것은 현재 사용하는 `single-sign-on`의 효시가 되었다.

사용자의 티켓에는 해당 사용자가 어떤 서비스를 이용할 수 있는지 기록되어 있기 때문에 이것은 일종의 `Capability`이다.

<br/>

#### (Capabilities e.g.) Android

<img src="../images/security-engineering-5-security-policy-modeling-3.1.3.png?raw=true" alt="drawing" width="640"/>

안드로이드 앱에서 `AndroidManifest.xml` 파일은 해당 앱이 어떤 자원에 접근할 수 있는지를 기록해놓았기 때문에 이것은 일종의 `Capability`이다.

<br/>

## 4. Reference Monitor

`time-sharing computer system` 또는 `multi-processing` 기능을 갖는 컴퓨터가 등장했을 때 초기에는 비용절감에 도움이 될 것이다라고 생각했으나, 보안 전문가의 입장에서 보았을 때는 동일한 시스템이 여러 사람이 공유하기 때문에 다른 사람이 만든 파일에 접근할 경우 심각한 보안 위협이 될 수 있기 때문에 이를 방지하기 위해서 운영체제 안에 모든 이벤트(events)를 모니터링 할 수 있는 기능이 필요하다고 생각했다. 그리고 후대에 사람들이 이것을 `Reference Monitor`라고 이름 붙였다.

<br/>

### (1) Execution Monitors (EM)

<img src="../images/security-engineering-5-security-policy-modeling-4.1.1.png?raw=true" alt="drawing" width="520"/>

`프로그램의 실행(program execution)`을 관찰하는 모니터이다. 이것에 확대되어 나중에 `Reference Monitor`가 된다.

코드가 들어오면 실행을 시키고 발생한 이벤트를 `EM`가 검사한다. 규칙을 위반하는 것이 없으면 코드의 다음 라인을 실행시키고 발생한 이벤트를 다시 `EM`이 검사하는 것을 반복한다. 그러다가 만약 어떤 이벤트를 검사했을 때 규칙을 위반하는 것이 발견되면 `EM`이 프로그램 실행을 중단시킨다.

이와 비슷한 것은 개발할 때 프로그램을 실행시켜 한 줄, 한 줄씩 `디버깅(debugging)`을 하는 것과 비슷하다.

사람들은 `EM`을 운영체제 안에 넣었을 때 어떤 것까지 할 수 있고 어떤 것은 할 수 없는지를 연구하였다. 그 결과 `EM`은 이론적으로 `all safety properties`를 검사할 수 있지만 `liveness properties`는 잡아낼 수 없다고 `Schneider`가 증명하였다.

- `Safety Properties`: 나쁜 일은 발생하지 않을 것이다. 상대적으로 검사하기 쉽다.
- `Liveness Properties`: 언젠가 좋은 일이 발생할 것이다. 상대적으로 훨씬 어렵다. e.g. 프로그램이 언젠가 종료될 것이다. 사용자가 언젠가 금액을 지불할 것이다.

<br/>

#### EM이 할 수 있는(Can) 것들

- `DAC`, `MAC`, `MLS` 접근 통제 정책을 위반했는 지 검사하는 것이 가능

#### EM이 할 수 없는(Can Not) 것들

- `Information Flow`와 관련된 것은 통제할 수 없음
- `Liveness`/`Availability(e.g. DoS)`는 검사할 수 없음

<br/>

### (2) Beyond EM

`EM` 기능의 한계를 인식하게 되어 `보안운영체제`를 만드는 것이 쉽지 않다고 생각하여 더 많은 연구와 예산을 쏟아붓기 시작한다.

<br/>

### (3) Reference Monitor

70년대에는 `Execution Monitor`를 계속 개발하면 안전한 운영체제를 만들 수 있다고 생각하여 계속 연구한다.

`James P. Adnerson`이 최초로 `EM`을 확장하여 `Reference Monitor`라는 개념을 만들었다.

#### Reference Monitor 요구사항
- 모든 보안 정책 관련된 이벤트를 잡아낼 수 있어야 한다.
- Reference Monitor는 위변조가 불가능(tamper-proof)하고 우회(bypass)되어서는 안 된다.
- 충분히 복잡도가 낮아서 수학적으로 분석할 수 있어야 한다.

<br/>

<img src="../images/security-engineering-5-security-policy-modeling-4.3.1.png?raw=true" alt="drawing" width="640"/>

1. 커널(Kernel) 안에 들어가서 모든 이벤트를 검사하는 형태(일반적으로 `보안운영체제`에서 많이 연구하는 형태)
2. 프로그램이 실행되면 `Interpreter` 역할을 하여 프로그램을 감싸는 형태. 프로그램이 커널에 접근할 때 `RM`이 검사하여 중간에서 통제하는 형태
3. 프로그램 안에 넣어서 `RM`을 운영하는 형태

<br/>

### (4) Validity Checks

`Execution Monitor` 안에 보안정책을 주입한다. 한 줄씩 실행할 때마다 주입된 보안정책을 위반하는지 검사한다. 이 모든 것을 통틀어서 `Reference Monitor`라고 한다.

커널 안에 `RM`을 넣은 형태를 `보안 커널(Security Kernel)`이라고 한다.

<br/>

### (5) Practical Issues

사람들이 처음에 생각했던 것 보다 `EM`으로 할 수 있는 것이 접근 제어 정도 밖에 없다는 것을 알게되었고, 운영체제에서 발생하는 모든 이벤트를 잡아내는 것도 쉽지 않다는 것을 알게 된다.따라서 보안운영체제를 만드는 것이 매우 어렵다는 것을 느끼게 된다.

<br/>

### (6) Commercial Security Kernels

<br/>

### (7) Summary

<img src="../images/security-engineering-5-security-policy-modeling-4.7.1.png?raw=true" alt="drawing" width="720"/>

<br/>

1970년대에는 `Penetrate and Patch` 방법을 통해 모의해킹 팀을 이용해서 보안운영체제의 보안성을 높이려고 했지만 모의해킹 팀에 따라서 실력이 다르고 일관된 결과가 나오지 않는다는 것을 알게 되었다. 모의해킹 팀을 부르고 고치고 다시 부르고 고치는 방법은 품질 관리에 바람직한 방법이 아니라고 생각한다.

수학적으로 증명을 해서 무엇은 확실히 되고 무엇은 안 되는지를 아는 것이 중요하다고 생각한다. 그래서 시스템을 Formal하게 수학적으로 증명하기 위한 시도를 한다. 그 시초가 된 것이 바로 운영체제의 아버지라고 하는 `MULTICS`이다.

1980년대에는 정부에서도 평가체계를 만들기 시작하여 `Orange Book`이라는 컴퓨터 시스템과 관련된 평가기준이 만들어진다. `A1 등급`은 실제 설계가 제대로 되었는지 수학적으로 증명한 것이고, `A2 등급`은 실제 코딩까지 제대로 되었다는 것을 수학적으로 증명된 것이다.

<br/>

### (8) Formal Security Policy Models for Smart Card Evaluations

NXP에서는 스마트카드의 보안정책을 Formal하게 표현한다.

<br/>

### (9) Model Checking Firewall Policy Configurations

`Bell Labs`에서 자동화 도구를 이용하여 방화벽에 들어가는 보안정책의 모순을 자동검증하는 논문이다.
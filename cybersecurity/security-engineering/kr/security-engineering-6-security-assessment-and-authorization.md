# Security Assessment and Authorization

## 1. What Is Security Engineering?

### 1) Security Engineering

<img src="../images/security-engineering-6-security-assessment-and-authorization-1.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

보안공학은 잘 만드는 것과 관련된 방법론을 다루는 학문이다. 머릿 속에 있는 그것이 진짜 구현된 것인지 수학적으로 증명하는 것이다. 수학적으로 증명이 안 되면 개발 프로세스를 체계화해서 최대한 근접하도록 만드는 것이다.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-1.1.1.2.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-1.1.1.3.png?raw=true" alt="drawing" width="520"/>

<br/>

보안공학 프로세스에는 `software engineering process`에 `assurance process`와 `risk process` 개념이 접목된 것이다.

- `Engineering Process`: 엔지니어링이라고 하면 체계적인 방법론이 있어서 누가하든 일정한 결과가 나올 때 공학적 프로세스라고 한다. 주관이나 감에 의존해서 하는 것은 엔지니어링 프로세스라고 하지 않는다. 
- `Assurance Process`
- `Risk Process`

<img src="../images/security-engineering-6-security-assessment-and-authorization-1.1.1.4.png?raw=true" alt="drawing" width="520"/>

<br/>

`보안공학(security engineering)`은 `시스템 개발 생명주기(system development lifecycle)` 안에 `정보 시스템 보안(information system security)`과 `위험 관리(risk management)`를 결합하고, 그리고 해당 제품이 잘 만들어졌는지 평가한 후에 사용을 허가해주는 것을 제공하는 구조화된 프로세스(`structured process`)를 제공한다.

따라서 `보안성 평가`는 ***`보안공학`에서 말하는 개발 프로세스의 일부이다.***

보안공학(SDLC) 프로세스 전체를 보면, 개발과 관련된 내용만 있는 것이 아니고, 구매와 획득에 관련된 내용도 있다. 왜냐하면 프로그램을 작성할 때 오픈소스를 쓰거나, Third-party 컴포넌트를 구매하여 결합시켜 개발하기 때문이다. 따라서 제 3자가 만든 컴포넌트를 구매, 획득하는 단계가 반드시 들어간다. 그리고 이 때 그냥 가져가 쓰는 것이 아니라 평가한 후에 사용해야 하기 때문에 보안공학 프로세스에 평가 프로세스가 함께 들어간다.

<br/>

## 2. Security Evaluation in a Nutshell

### 1) What Is Security Evaluation? (좁은 의미)

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

보안제품이라는 말은 우리나라에서만 쓰인다. 보안제품은 보안기능만 갖고 있는 것이다.

보안성 평가의 대상이 보안제품이 될 경우 컴퓨터 바이러스 백신, 방화벽 등만 보안성평가의 대상이 되어버린다. e.g. 만약 보안성 평가의 대상이 보안제품에만 한정된다면 삼성 스마트폰은 보안성 평가 대상이 아니게 된다.

아래한글 프로그램에는 암호화 기능이 들어가 있다. 하지만 아래한글은 보안제품은 아니다.

보안성 평가의 대상은 ***보안기능이 내장된 IT 제품(H/W, F/W, S/W)이라고 한다.*** 그리고 보안성 평가는 그 안에 들어간 보안기능을 평가하는 것이다.

보안공학을 하는 이유는 단순히 보안제품을 만들려는 것이 아니라 보안기능이 있는 IT 제품을 만들 때 해당 보안기능을 잘 만들기 위한 것이다.

우리는 보안공학을 통해서 `trustworthy(dependable)`한 제품을 만들려고 한다. 사람의 실수나 자연재해에 대해서도 안전하고(`reliability`, `availability`, `safety`), 해킹에도 안전한(`security`) 제품을 만드는 것이다.

`보안성 평가`의 대상은 IT 제품에 들어간 보안기능이며, `Reliability`와 `Security`를 검사하는 것이다.

<br/>

### 2) What Is Security Evaluation? (넓은) 의미)

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.2.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

보안성 평가를 할 때, `기술적인` 것만 보는 것이 아니라 `비기술적인 부분(교육 방법, 운영환경 등)`도 평가한다.

<br/>

### 3) Examples

#### (1) MFP(Multi-Function Printer)

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.3.1.1.png?raw=true" alt="drawing" width="320"/>

<br/>

삼성 `반도체` 사업부는 국제적으로 수출하는 곳이 많았기 때문에 예전부터 보안성 평가에 대한 인식이 높았다.

그리고 `프린터` 역시 수출하기 위해서는 `보안성 평가`를 받아야 한다. 왜냐하면 프린터가 출력될 때 프린터 내부의 메모리에 데이터가 저장되었다가 출력되기 때문에 프린터가 해킹될 경우 중요 문서의 내용이 유출될 수 있기 때문이다.

<br/>

#### (2) Samsung Knox

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.3.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

삼성 스마트폰이 스마트폰 최초로 미국 연방 정부의 보안성 평가를 통과하였다. → `Samsung Knox`

<br/>

#### (3) Smart TV

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.3.3.1.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (4) The DOD Cyber Strategy

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.3.4.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.3.4.2.png?raw=true" alt="drawing" width="520"/>

<br/>

2015년 `미국방부`가 `사이버 전략(Cyber Strategy)`을 발표하면서 `보안성 평가`가 `무기체계(weapons systems)`까지 확대되었다. e.g. `F-35 스텔스 전투기`는 `SDLC 프로세스`를 통해 만들어졌으며 `보안성 평가`도 받았다.

<br/>

### 4) Categorization of Evaluation Methods

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.4.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-2.4.0.2.png?raw=true" alt="drawing" width="520"/>

<br/>

보안성 평가는 크게 다음 3가지로 나뉜다.

1. Assessment of the `deliverable`
2. Assessment of the `processes`
3. Assessment of the `environment`

<br/>

#### (1) Assessment of the deliverable

우리가 일반적으로 생각하는 보안성 평가는 제품이 있을 때 제품이 제대로 만들어졌는지 평가하는 것이다. 이것이 바로 `assessment of the deliverable`이며, 제품 자체를 평가하는 것이다.

<br/>

#### (2) Assessment of the processes

하지만 제품 자체를 평가하는 것은 업체로서 부담이 크다. e.g. MS 운영체제는 2년에 한 개씩 새로운 모델이 나오는데 2년 마다 계속 보안성 평가를 받아야하고 평가하는데 소요되는 기간이 길다. 그래서 나온 것이 바로 `assessment of the processes`이다. 이것은 회사의 개발 또는 생산 공정 자체를 보는 것이다. 일반적으로 `소프트웨어` 분야에서는 `assessment of the processes`를 많이 하는데 이것이 바로 `CMM (Capability Maturity Model) Level`이다. → 카네기멜론 대학에서 CMM 만들고 평가함

프로세스 공정에 대해서 한 번 인증을 받으면, 각 제품마다 인증을 새로 받을 필요가 없다.

하지만 보안 관점에서 보면 헛점이 많다. 같은 생산 프로세스라고 하더라도 제품마다 특성이 다르기 때문이다.

<br/>

#### (3) Assessment of the environment

`ISMS`를 생각하면 된다. `ISMS`는 제품이나 개발 공정을 평가하는 것이 아니다. `ISMS`는 주로 통신사, 금융기관에서 획득하는데, `개인정보`나 기타 중요 정보를 많이 다루는 곳에서 해당 정보가 유출되지 않도록 정보를 얼마나 잘 관리하는지 `환경(environment)`을 평가한다.

<br/>

하지만 위 3가지가 완전히 독립적으로 분리되는 것은 아니다. 예를 들어 `ISMS`는 `환경(environment)`을 평가하는 것이지만 평가 과정에서 보안성 평가를 받은 제품을 사용했는지 여부를 묻기도 한다. 즉 `assessment of the deliverable`를 받은 제품을 사용하는지를 묻는 것이다.

3가지 중에서도 `보안공학`과 관련된 것은 `1. assessment of the deliverable`과 `2. assessment of the processes`이다. 하지만 실제 현장에서는 `2. assessment of the processes`는 많이 쓰이지 않는다.

<br/>

## 3. Security Evaluation in Detail

### 1) History of Security Evaluation

#### (1) Summary

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (2) In 1967

Reference Monitor

<br/>

#### (3) In Late 1960s

Adept-50: The first practical attempt to apply a mathematical model of multilevel security with support from ARPA

<br/>

#### (4) In 1982

DoD CSEC

<br/>

#### (5) In 1983 (TCSEC)

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.5.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.5.2.png?raw=true" alt="drawing" width="520"/>

<br/>

1983년에 만들어진 `TCSEC` (Trusted Computer System Evaluation)은 ***최초의 보안성 평가 기준이다*** (`Orange Book`이라도고 불린다.)

<br/>

`TCSEC (Orange Book)`의 평가 등급은 `C1`부터 `A2`까지 있다. 나중에 `A2 등급`은 삭제된다.

세로축의 `functionality`는 보안기능의 개수를 나타내고, 가로축의 `assurance`는 보안기능이 얼마나 잘 만들어졌는지를 나타낸다(해당 보안기능의 구현상의 오류가 발생할 확률이 적은지를 나타낸다.)

`B3`, `A1`, `A2`로 올라갈수록 보안기능의 개수는 동일한데, assurance는 증가한다. 즉 보안기능이 더 잘만들어졌다는 것이다.

- `B3`: informal 검증
- `A1`: 잘 설계되었는지 수학적으로 증명(design assurance)
- `A2`: 설계 뿐만 아니라 실제 구현된 코드까지 잘 만들어졌는지 수학적을 증명(code assurance). 하지만 당시에는 코드까지 수학적으로 증명하는 것은 기술적으로 어렵다고 판단하여 A2는 삭제하였다.

하지만 TCSEC에서 등급을 나눌 때 `functionality`와 `assurance` 두 개로 나누는 것은 문제가 있다.

<br/>

#### (6) In 1985

DoD CSEC was elevated to NSA NCS.

<br/>

#### (7) In Mid 80s - Mid 90s

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.7.1.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (8) In 1996 (Common Criteria)

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.8.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.8.2.png?raw=true" alt="drawing" width="520"/>

<br/>

민간 제품을 수용하면서 보안성 평가 기준을 만들어서 `functionality`와 `assurance`로 나누어서 평가하는 것이 보편화되면서 각국 여러나라에서 비슷한 표준을 제정하기 시작한다.

유럽의 업체들을 중심으로 각 나라마다 평가를 따로 받아야하는 불편함 때문에 제품의 time to market이 늦어져 반발이 생기기 시작했다. 각 나라별로 순수 평가 목적보다는 수출입 진입장벽으로 악용하기도 했다. 이러한 문제를 해결하기 위해 유럽에서 통합된 기준인 `European ITSEC (1991)`이 만들어진다. 그리고 미국과 캐나다가 합쳐서 `U.S. Federal Criteria Draft (1993)`이 만들어진다. 최종적으로 미국 캐나다 표준과 유럽의 표준이 합쳐지면서 국제 표준인 `Common Criteria`가 만들어진다.

미국의 표준과 유럽의 표준이 합쳐질 때 기본 골격은 `TCSEC`을 따라갔지만 ***유럽쪽에서 문제가 있다고 생각하여 유럽의 의견이 반영된 부분이 있다.*** → `TCSEC`에서 `functionality`가 증가할수록 `assurance`가 증가가는 것은 `Economy of Mechanism` 원칙을 위배한다. 왜냐하면 복잡도를 줄이기 위해서는 요구사항의 개수를 줄어야 하고, 요구사항의 개수를 줄이면 기능(functionality)가 줄어든다. 따라서 `assurance`를 높이기 위해서는 `functionality`가 줄어야 하기 때문에 `TCSEC`의 등급 기준은 모순적인 부분이 있었다.

따라서 유럽에서는 `TCSEC`을 기본으로 하긴 하지만 `functionality`와 `assurance`가 비례하는 등급체계는 문제가 있다고 주장하였다.

<br/>

##### CC vs. ITSEC vs. TCSEC

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.8.3.png?raw=true" alt="drawing" width="640"/>

<br/>

`ITSEC`에서는 등급이 이원화되어 있다. `functionality`에 대한 등급인 `F-C1 ~ F-B3`와 `assurance`에 대한 등급인 `E0 ~ E6`로 나누어져 있다.

나중에 `Common Criteria (CC)`에서는 ***`functionality`에 대한 레벨은 사라지고 `assurance`에 대한 등급인 `EAL1 ~ EAL6`만 남게 되었다.*** 즉 기능의 개수에 대한 등급을 부여하는 것은 의미가 없다고 판단하였다. 왜냐하면 RFP에 requirement가 들어있고 해당 requirement를 얼마나 잘 충족하는지만 판단하면 된다고 생각했기 때문이다.

`EAL1`은 보안성 평가를 받을 때 개발자의 도움이 없이 받을 수 있다. 이것은 보통 `legacy code`에 대해서 소스코드도 없고 개발자도 없을 때 받는 등급이다.

`EAL4`는 개발 프로세스가 어느 정도는 보안공학적인 프로세스가 갖춰져 있어야 하지만 완벽하진 않다. 보통은 상업용으로 받을 수 있는 최고 등급이라고 얘기한다. e.g. MS Windows가 보통 EAL4를 받는다.

`EAL5`, `EAL6`, `EAL7` 기밀자료나 무기체계(weapons systems)에 적용하는 개발 프로세스 등급이다(***high assurance***).

<br/>

##### Sample Products Evaluated by CC

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.8.4.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (9) In 1995, CMVP

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.9.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.9.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`CC`로도 `암호제품`을 평가할 수 있지만 미국은 암호에 대해서 우월성을 갖고 있었고 암호에 대해서 독자적인 정책을 가져가기 위해서 `CMVP`를 만들었다.

`CMVP`의 기본철학은 `TCSEC`이나 `CC`와 매우 유사하다.

`CMVP`는 미국에서만 운영되던 제도이다. 미국이 `CMVP`를 국제 표준으로 만들기 위해 많이 노력한 끝에 ISO/IEC 국제표준으로 인정되었다.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.1.9.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`CMVP` 평가기관은 원래 `미국`과 `캐나다`에만 있었지만 ISO/IEC 국제표준으로 인정되면서 `독일`이나 `일본` 등 여러 국가에 세워지게 되었다.

일반적으로 `CC 평가기관`들이 `CMVP 평가`도 함께 하는 경우가 많다.

<br/>

### 2) From CAVP to C&A

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.2.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`CAVP`와 `CMVP`는 `암호제품`의 평가와 관련된 것이다.

`CC`는 `보안기능`이 들어간 모든 IT제품에 적용할 수 있다.

`CC`는 모든 보안기능을 평가할 수 있기 때문에 `암호 라이브러리`나 `암호칩`도 `CC`로 평가할 수 있다.

미국에서는 TCSEC에 나오고 나중에 CC로 통합되었다. NSA는 다른 나라보다 암호는 압도적으로 우위에 있다고 생각하여 암호와 관련된 독자적인 제도를 만들었다. 이것이 바로 `CAVP`와 `CMVP`이다.

`CC`는 국제표준이 되었지만, `CAVP`와 `CMVP`는 미국만 운영하던 제도인데, 미국이 `CMVP`도 ISO/IEC 국제표준으로 만들고 싶어했다. 이 때 일본과 같은 나라의 힘을 얻어서 ***`CMVP`도 ISO/IEC 국제표준이 되었다.***

우리나라 국정원도 암호를 독자적으로 가져가야 한다고 생각해 `KCMVP` 인증 제도를 운영하고 있다.

일본도 `JCMVP` 인증 제도가 있다.

<br/>

- `CAVP` (Cryptographic Algorithm Validation Program): 암호제품에 미국에서 사용하는 알고리즘 RSA, AES을 넣었는지 평가하는 것(단순히 알고리즘의 유무를 판단하는 것)
- `CMVP` (Cryptographic Module Validation Program): 암호제품에 들어가는 알고리즘이 제대로 구현되었는지를 평가하는 것(`assurance`를 검증하는 것) 레벨1 ~ 레벨4까지 있으며, 레벨2 이상을 받으려면 하드웨어로 구현되어 있어야 한다. 따라서 소프트웨어 암호 라이브러리가 받을 수 있는 최고 등급은 레벨1이이다.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.2.0.2.png?raw=true" alt="drawing" width="520"/>

<br/>

평가기관은 평가할 때 테스트베드를 구축하여 실험실에서 평가한다. 하지만 ***실험실 환경과 실제 운영 환경에서의 오차로 인해 발생하는 문제점이 있다.*** 따라서 실제 운영 환경에서도 지속적으로 검사할 필요가 있다고 생각하게 된다.

실험실에서 각 개별로 보안성을 평가하지만 현장에서는 개별 제품이 합쳐져 시스템으로 구축되어 운영되기 때문에 개별 제품들이 ***전체 시스템으로 구축되어 운영될 때도 안전하게 동작하는지를 평가해야*** 한다고 생각하게 된다. → C&A

현재 미국에 하고 있는 것은 `C&A` 제도이다. 미국의 보안 시스템을 평가하는 전체적인 틀은 `C&A` 제도이며, 이 안에서 `CC`, `CMVP`, `CAVP`가 운영되고 있는 것이다.

<br/>

### 3) C&A

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.0.2.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.0.3.png?raw=true" alt="drawing" width="520"/>

<br/>

미국에는 `FISMA` (Federal Information Security Management Act)라는 법률에 의해 기관들은 `C&A` 평가를 받아야 하고 등급이 떨어지면 내년 예산이 삭감된다. 정부와 군 영역은 필수로 평가를 받아야 한다.

#### (1) What Is C&A?

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.1.2.png?raw=true" alt="drawing" width="520"/>

<br/>

- `certification`: 주어진 환경 안에서 안전하게 동작하는지를 검사하는 것
- `accreditation`: 개발주기(lifecycle) 동안 안전한지를 지속적으로 검사하는 것

우선 실험실 환경에서 제품의 안전성을 테스트하고 인증을 해준다. 그리고 이후에 현장에서 운영되면서 해킹기술의 발전으로 안전성이 계속 떨어지게 된다. 따라서 해킹기술에 새로 나왔을 때, 그 위험도를 분석하여 필요할 경우 업데이트를 통해 안전성을 유지한다. 이런 작업은 더 이상 업데이트로 해결이 불가능할 때까지 지속해야 한다. 따라서 계속해서 신뢰를 유지한다는 의미에서 `accreditation`이다.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.1.3.png?raw=true" alt="drawing" width="520"/>

<br/>

1. `Phase I. Definition`: requirements를 도출하는 단계로서 제품을 만들기 전에 어떤 기능이 동작할 것인지 예측하고 그래프 등을 그리고 위협요소를 분석하여 이에 맞는 보안 요구사항을 도출하는 단계이다. 이 때 요구사항을 도출하는데 seed 문서로 사용되는 것이 `CONOPS`이다.

> Note:  
`CONOPS (Concept of Operations)`: The `CONOPS` drives the `security policy` and `security requirements` that apply, and the architecture must meet the applicable requirements. `CONOPS`를 기반으로 세부적인 `보안정책(security policy)`과 보안 `요구사항(security requirements)`이 도출된다. 보안 요구사항을 도출하는데 필요한 문서이다.

<br/>

2. `Phase II. Verification`: 보안 요구사항이 도출된 후에 `설계`하고 `구현`을 한다. 그리고 마지막에 해당 설계와 구현이 평가를 받기 위한 `준비`가 되었는지 검증하는 단계이다. 따라서 `Verification`이 끝났다는 것은 시스템 개발이 완료되었다는 것이다.

> Note:  
`Verification`: To ensure that the fully integrated system will be ready for certification testing.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.1.4.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

3. `Phase III. (1) Validation/Certification`:
   - `CT&E (Certification Test and Evaluation)`: Lab-based testing으로서 실험실에서 테스트하는 것이다.
   - `ST&E (Security Test and Evaluation)`: On-site testing으로서 실제 현장 환경에서 테스트하는 것이다.

`CT&E`와 `ST&E` 과정이 끝나면 아직 해결되지 않은 `잔존위험(residual risk)`에 대해서 분석하고 해당 잔존위험이 발생할 확률이 계산된다.

> Note:  
`Validation/Certification`: To certify that a given system is safe to operate in its given environment. Certification is basically preparing the system for approval to operate.

<br/>

1. `Phase III. (2) Accreditation`: 관리자는 `잔존위험`을 분석하여 시스템을 현장에 배치해도 될지 안 될지를 결정해야 한다. 이것을 `approval`이라고 한다. `Accreditation` 과정까지 끝나면 시스템이 실제 현장에 배치된다.

> Note:  
`Accreditation`: To `approve` for the system to work in an operational environment. Evaluating the fully-integrated system (i.e., analyzing test results and proposed mitigations) to validate software operation in a specified environment has an ***acceptable level of residual risk***. 

<br/>

4. `Phase IV. Post Accreditation`: 한 번 `Accreditation` 과정이 끝난 이후에도 시스템이 현장에서 안전하게 유지되는 지를 지속적으로 검사하여 `Accreditation` 과정을 반복하는 단계이다. 따라서 `잔존위험(residual risk)`이 감수할만한지 지속적으로 모니터링 한다는 의미이다. 이 과정은 더 이상 업데이트로 잔존위험을 해결할 수 없을 때까지 반복한다(continuous monitoring). 

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.3.1.5.png?raw=true" alt="drawing" width="480"/>

<br/>

`evidence`는 문서를 의미한다. 문서는 따로 만드는 것이 아니라 개발 프로세스가 `보안공학`에 맞춰 잘 만들어져 있다면 개발 과정에서 `문서(evidence)`는 자동으로 함께 생성된다.

<br/>

### 4) From C&A to RMF A&A

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.4.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.4.0.2.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.4.0.3.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.4.0.4.png?raw=true" alt="drawing" width="520"/>

<br/>

`Certification`은 제품에 대해서 `lab-based testing`과 `on-site testing`을 하고 결과의 위험도를 분석하는 것이다.

`Accreditation`은 테스트 결과를 놓고 시스템을 현장에서 운영해도 될지 승인해주는 것이다.

1. 좀 더 쉬운 용어로 변경하였다.

- `RMF (Risk Management Framework)`: 잔존위험도에 기반해서 위험을 관리하여 시스템을 안전하게 유지하는 프레임워크
- `Certification` → `Assessment`
- `Accreditation` → `Authorization`

2. 기본적으로 NIST의 RMF 표준을 바탕으로 만들어졌다. 직급 명칭도 통일시킨다.
3. 기존의 C&A에 비해서 SDLC 프로세스를 요구한다.
4. 상호호혜성(reciprocity) 원칙을 적용한다.

5. `C&A` 때는 `FISMA` 법률에 의해 평가 등급이 낮아지면 예산이 삭감되었기 때문에 평가결과를 `Management and Budgets (OMB)`에 전달했었다. RMF A&A로 바뀐 후에는 군의 무기체계에까지 적용되었기 때문에 평가결과를 `Department of Homeland Security (DHS)` 최상위 보안기관인 `국토안보부`로 전달한다. 한 부처에서 발생한 취약점은 `국토안보부`를 통해 빠르게 다른 전 부처에게 전달된다.

6. 사이버 보안 용어들을 통일하였다.
7. 보안 요구사항 도출보다 선행되어야 하는 것은 해당 시스템의 중요도를 파악하는 것이다. e.g. 해당 시스템이 기밀자료를 보호하는 시스템인지 일반 자료를 보호하는 시스템인지 등을 파악하는 것이다. 따라서 시스템이 얼마나 중요한 시스템인지를 분류하기 위해서 system categorization이 향샹되었다.

8. 단일 표준을 적용한다. 나라 전체의 각 부처를 RMF라는 하나의 표준으로 국토안전부에서 관리한다.

9. 과거의 제도보다는 불필요한 문서작업(paperwork)을 최대한 줄이려고 한다.

10. 보안상 발생할 수 있는 모든 requirements를 DB로 만들었다. 이것을 standard control set이라고 하며, 모든 부처에서 보안 요구사항을 도출할 때 `standard control set`에서 선택하여 사용한다. → 일관된 보안 요구사항을 도출할 수 있다.
  - `security control`: security requirements와 동일한 것이다.

<br/>

### 5) RMF A&A

#### (1) History of RMF A&A

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.5.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.5.1.2.png?raw=true" alt="drawing" width="520"/>

<br/>

1997년 `DITSCAP`는 미국방부에서 최초로 만든 `C&A`이다.

1999년 16개의 미 정보기관으로 구성된 정보공동체에서 `DCID`를 만들었다(정보기관에서 쓰는 `C&A`

연장정부도 NIST `C&A`를 만들었다.

2004년에 `NIST`에서 `IA RMF` (Information Assurance Risk Management Framework)을 발표하면서 `RMF`라는 용어를 사용하기 시작하였다. 그러면서 `NIST`에서 `연방정부용 RMF`를 만들게 되었다.

2006년 CNSS (Committee on National Security Systems)에서 `국방부`, `정보공동체`, `연방정부`에서 독립적으로 운영되던 제도들을 NIST의 IA RMF 표준을 중심으로 통합하기 시작하였다.

`연방정부용 RMF` < `국방부용 RMF` < `정보공동체용 RMF`

`상호호혜성(reciprocity)`의 원칙에 따라 `RMF`는 다음과 같이 운영된다.

1. 연방정부용 RMF 인증을 받는다.
2. 국방부용 RMF에서 필요한 추가적인 요구사항에 대해서만 평가받고 인증받는다.
3. 정보공동체용 RMF에서 필요한 추가적인 요구사항에 대해서만 평가받고 인증받는다.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.5.1.3.png?raw=true" alt="drawing" width="520"/>

<br/>

2013년부터 미 국방부는 완전히 `RMF A&A`로 대체하였다.

이 때까지만 해도 `RMF A&A`의 적용대상은 연방정부, 군기관, 정보기관의 `전산시스템`이었다.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.5.1.4.png?raw=true" alt="drawing" width="520"/>

<br/>

2015년 사이버전략을 발표하면서 `RMF A&A` 적용대상을 전산시스템 뿐만 아니라 무기체계에 까지 확대하였다. e.g. F-35 스텔스 전투기

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.5.1.5.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (2) RMF A&A

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.5.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

1. `Categorize`: `mission type`이나 다루는 `information`의 수준에 따라서 중요도를 나누는 것
2. `Select`: `standard control set`에서 `security requirements`를 선택하는 것
3. `Implement`: `security engineering` 프로세스에 맞게 설계하고 구현하는 것
4. `Assess`: lab-based testing, on-site testing을 수행하고 잔존위험을 계산하는 것
5. `Authorize`: 해당 잔존위험이 감수할만한지를 판단하여 시스템이 실제 현장에 배치하도록 승인하는 것
6. `Monitor`: 잔존위험을 지속적으로 모니터링하여 시스템의 안전성을 유지하는 것

> Note:  
***`RMF`는 `CC`의 철학을 기반으로 한다.***

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.5.2.2.png?raw=true" alt="drawing" width="520"/>

<br/>

### 6) What Is The CC?

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.6.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

1. CC Part1: CC에 대한 일반적인 내용
2. CC Part2: `Security Functional Requirements`(세로축). e.g. `standard control set`
3. CC Part3: `Security Assurance Requirements`(가로축). e.g. assurance level에 따라 기능들을 어떻게 설계하고 구현하고 테스트해야 하는지에 대한 내용

<br/>

### 7) Why Limited to the EAL 1~4?

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.7.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `High robustness products`: 군이나 기밀자료에 적용되는 제품
- `Medium robustness products`: 대외비 정도에 적용되는 제품
- `Basic robustness products`: 일반 업무용 제품

`High robustness products` 레벨의 인증을 받기 위해서는 `EAL5`, `EAL6`, `EAL7`의 레벨을 인증을 받아야 하는데, 이 때는 ***평가과정에 `NSA`가 참관해야 한다.*** 따라서 기밀자료에 해당하는 등급은 거의 외국제품은 받기가 어렵다.

`CMVP`에서 `Type 1 Crypto` 레벨은 `비공개 암호`를 사용하는 암호모듈이 받는 인증이다. 설계도 자체가 공개되어 있지 않은 `NSA`에서 개발한 암호에 대한 암호제품을 평가받는 레벨이다.

> Note:  
`Robustness`: `Functional` + `Assurance` strength

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.7.0.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`CSfC` 제도를 통해서 민간업체가 개발한 상용제품이라고 할지라도 `CSfC` 제도에 따라 NSA 인증을 받으면, 기밀자료에도 적용할 수 있도록 하고 있다.

<br/>

### 8) In Korea

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.8.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

한국에서는 system의 중요도를 판단하는 `categorization`이 잘 되어있지 않다. 국정원에서 개발한 비공개 암호인 NES는 공공기관에 사용되고, `SEED`, `ARIA`는 민간에 사용된다. 공공과 민간이 소통하는 부분에는 `ARIA`가 사용된다. 미국은 자료의 등급에 따라 적용하는 암호를 나누었지만 우리나라는 영역(domain)을 기준으로 암호를 나누고 있다.

따라서 `system categorization`이 잘 되지 않기 때문에 시스템의 중요도가 나뉘지 않고 따라서 보안 요구사항이 제대로 도출되지 않고, 설계와 구현도 제대로 될 수 없고, 나중에 잔존위험도를 분석할 때도 시스템의 중요도에 대한 분류가 없기 때문에 위험도를 제대로 평가할 수 없다.

<br/>

### 9) CCEVS

#### (1) CCEVS - USA -

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.9.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (2) CCEVS - Korea -

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.9.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

- `평가`: 제품이 보안공학에서 말하는 개발 프로세스를 충실히 따라 만들어졌는지 평가하는 것이다. 이를 위해 업체는 개발 프로세스를 증명할 수 있는 관련 문서(evidence)를 제출한다. 평가기관은 해당 문서들을 처음부터 끝까지 전부 검사한다. 모든 프로세스를 재현가능한지 직접 해본다(검증 도구 사용, 테스트 등). 
- `인증`: 정부에서 평가기관을 관리감독하는 것이다. 평가기관에서 평가를 마치고 결과를 제출하면, 평가기관의 보고서를 검수하여 문제가 없으면 최종적으로 인증서를 발급한다.

<br/>

### 10) CC Documents

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.10.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.10.0.2.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.10.0.3.png?raw=true" alt="drawing" width="520"/>

<br/>

보안성 평가를 받을 때 작성하는 문서의 디테일 정도는 `추적성(traceability)`을 만족하도록 작성해야 한다.

e.g. `추적성`이 만족된다면 아래한글 프로그램을 실행시켜서 그 안에 문서 암호화 기능이 어떻게 만들어졌는지 물어봤을 때, 해당 기능은 소스코드에서 어느 부분에 해당하고, 해당 기능의 Low-Level Design은 어떻게 설계되었고, High-Level Design은 어떻게 설계되었고, 기능명세는 어디에 나와있고, 이것은 어떤 보안 요구사항을 충족하기 위한 것이고, 테스트는 어떻게 했고, 취약점 분석은 어떻게 했는지를 모두 찾아낼 수 있어야 한다. 역으로 특정 보안 요구사항을 충족하기 위해서 어떤 어떤 기능이 최종적으로 어떻게 구현되었는지를 찾을 수도 있어야 한다.

추적성은 CC에서 요구하는 것이 아니라 보안공학에서 요구하는 특성이다.

<br/>

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.10.0.3.png?raw=true" alt="drawing" width="520"/>

<br/>

CC는 `security by design`으로 이끌어준다. 따라서 CC와 보안공학은 같은 철학을 공유하는 것이다.

<br/>

### 11) CC Evaluation Process

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.11.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Sufficiency(충분성)`: 제안서 심사할 때는 제안서가 요구조건을 충분히 반영하였는지 검사한다.
- `Correctness(정확성)`: 검수 단계에서는 제안서대로 정확하게 만들었는지 검사한다..
- `Traceability(추적성)`: RFP와 제안서 제출, 검수 과정을 전부 추적할 수 있도록 모든 문서에 추적성이 만족되어야 한다.

<br/>

CC 용어
- RFP → PP (Protection Profile)
- Proposal → ST (Security Target)
- Product → TOE (Target of Evaluation)

물건을 살 때 PP를 공개하는데, 이 때 들어가는 요구사항들은 CC part2, part3에 `standard control set` 안에 정의되어 있다. part2에서 어떤 기능이 들어갈지 작성하고, part3에서 해당 기능이 어떻게 설계되고 구현될지 작성한다. 업체들은 해당 요구조건을 보고 ST를 제출한다.

스페인 CC 평가기관에서 화웨이의 5G 장비를 평가하였는데, 문제는 5G 장비에 대한 PP는 존재하지 않는다. 따라서 화웨이는 PP가 없이 그냥 제안서를 써서 장비를 만든 것이다. 따라서 스페인의 CC 평가기관은 화웨이 장비가 제안서대로 만들어졌는지를 검사한 것이지 5G 장비에서 요구하는 PP에 대해서 검증한 것은 아니다.

<br/>

### 12) But Testing Is Still Required

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.12.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 13) Now DARPA Goes for

<img src="../images/security-engineering-6-security-assessment-and-authorization-3.13.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`DARPA`에서는 `End-to-End Proof` 레벨을 갖는 해킹불가 드론을 위한 운영체제를 개발하고 있다.

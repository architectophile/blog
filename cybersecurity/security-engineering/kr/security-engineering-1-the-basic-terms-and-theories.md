# The Basic Terms & Theories

<br/>

## 1. Security Engineering

### (1) Cryptographer vs. Cryptanalyst

<img src="../images/security-engineering-1-the-basic-terms-and-theories-1.1.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`Cryptology` = `Cryptography` + `Cryptanalysis`

<br/>

#### Cryptography

암호 장비를 개발하는 것(development)과 관련한 학문이다.

`Security Engineer`: 보안 제품을 개발하는 직업

비슷한 직업들: Information Assurance Engineer, Information Security Engineer, Information System Security Engineer

<br/>

#### Cryptanalysis

암호 장비를 해독하는 것(breaking)과 관련한 학문

`Security Analyst`: 취약점 분석, 모의 해킹을 하는 직업

<br/>

### (2) The Limits of Penetration Testing

`모의해킹`을 통해 취약점을 찾아낼 수 있다. 하지만 ***보안 취약점을 발견하지 못했다는 것이 제품의 보안 취약점이 없다는 것을 의미하는 것은 아니다.*** 그것은 단지 ***모의해킹 팀이 보안 취약점을 발견하지 못했음***을 나타낼 뿐이다.  
따라서 우리는 `보안공학`, `SDL(Security Development Lifecycle)`과 같은 엄격한 개발 프로세스가 필요하다. 

<br/>

### (3) What Is Security Engineering?

- `Security Engineer`를 양성하고 교육하기 위한 학문
- 개발 프로세스를 어떻게 관리해야 안전한 제품을 만들 수 있는가를 연구하는 학문
- 머릿속에 있는 보안 요구사항을 분석하고 설계하고 만드는데까지 수학적으로 잘 정의된 보안 프로세스를 만드는 것
- 보안 소프트웨어의 생명주기 전반에 적용되는 체계적인 개발 프레임워크
- `보안 내재화(Security by Design)`를 하는 것

대표적인 보안공학을 잘 적용하는 미국의 기업들: `Microsoft`, `IBM` 등

<br/>

### (4) Then, We Don’t Need Pentesting?

예를 들어 삼성전자에서 갤럭시 핸드폰을 만들더라도 그 안에 들어가는 어플리케이션을 삼성전자에서 모두 컨트롤할 수 없기 때문에 삼성에서는 폰을 만들 때 모든 어플리케이션이 최신의 안전한 버전으로 업데이트되었다고 조건을 전제로 제품을 만들게 된다. 하지만 출시 전에 해당 `전제 조건`이 성립하지 않아서 문제를 일으키는 경우가 있다.
***따라서 `보안공학`을 잘 적용하여 제품을 만들었다고 하더라도 `모의해킹`이나 `취약점 분석`도 함께 필요하다.***

`David Elliott Bell`

Tiger Teams의 `모의해킹`을 통해 보안성을 높이려고 했지만 한계가 있었다. 1970년대 중반까지는 모의해킹하고 취약점을 패치하는 것을 반복하는 ***\"Penetrate and Patch\"*** 시대였다.

<br/>

### (5) Evolution of Security Engineering

<img src="../images/security-engineering-1-the-basic-terms-and-theories-1.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

2011년 미국 국방부가 1989년에 나온 보안공학 표준을 업그레이드 하였다.

***2016년*** NIST SP 800-160 Systems Security Engineering, 연방정부 표준이 만들어졌다.

보통 보안 제품은 먼저 `군에서` 개발 → `연방정부 표준` → `ISO 국제표준` → `미국 업체`가 시장을 장악하는 순서이다.

따라서 `NIST 연방정부 표준`은 곧 `ISO 표준`으로 확대될 것이다.

<br/>

### (6) SDL (Security Development Lifecycle)

보안공학 프로세스를 실제로 도입하기 시작한 기업은 `Microsoft`와 `IBM`

`SDL`은 MS가 만든 ***`보안공학`의 산업표준 버전이라 볼 수 있다.***

`2002년` `빌게이츠 회장`이 MS 전 직원에게 `Trustworthy Computing`에 대한 이메일을 보냈다. 이 이메일을 보내기 얼마 전에 전 세계에 바이러스가 퍼져 윈도우 운영체제를 공격하였다. 전 직원에게 `Trustworthy`한 제품을 만들기 위해 함께 노력할 것을 얘기하였다. 

- `Trustworthy`: `Available`, `Reliable`, `Safe` and `Secure`

2004년 `SDL(Security Development Lifecycle)`을 모든 제품에 적용하여 개발하기로 결정하였다.

`최초의 SDL`이 적용된 MS의 운영체제는 바로 `Windows Vista`이다. `SDL`을 적용한 Windows Vista에서 보안 취약점이 현저하게 줄어들었다.

MS 홈페이지에 가면 SDL에 관련된 자료를 공유하고 있다.

### (7) Cybersecurity and Vehicle Lifecycle

2015년 크리스 발라섹(Chris Valasek) 찰리 밀러(Charlie Miller)는 Wired 방송사에서 크라이슬러사의 체로키 자동차 해킹을 공개적으로 시연하였다.

원격으로 자동차를 마음대로 조작하는 것을 시연하였다. 이것은 해킹으로 인해 차량이 리콜된 최초의 사례이다.

`UNECE (유엔 유럽경제위원회)`에서 `ISO 21434` 표준을 만들었는데, 자동차를 개발할 때 반드시 `보안공학`을 적용할 것을 요구하였다. 따라서 ***`보안공학`이 적용되어 개발되지 않은 자동차는 유럽에 수출할 수 없도록 하였다.***

<br/>

### (8) Connected Vehicle CYbersecurity Volvo Group Trucks Technology

<img src="../images/security-engineering-1-the-basic-terms-and-theories-1.8.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

2018년 10월 Volvo에서 발표한 자료에 따르면 자동차 개발 프로세스에 이미 보안공학을 적용하였음을 보여준다.

<br/>

### (9) The DoD Cyber Strategy

<br/>

2015년 4월 미국방부(Dod)는 `사이버 전략(Cyber Strategy)`을 발표하였다. 그리고 `무기 체계`의 `사이버 보안(cybersecurity)`을 향상시킬 것을 발표하였다. DoD에서 다루는 모든 `무기 체계(weapons systems)`가 특정`cybersecurity` 기준을 만족하도록 강제하겠다고 발표하였다.

2019년 4월에 발표한 `Risk Management Framework for Army Information Technology (RMF)`는 `정보보호` 개념과 `위험관리` 개념을 결합한 것이다. 즉 기존의 무기 개발 프로세스에 `보안공학`이 접목된 것이다.

- `Platform IT`: F-35 전투기나 미사일 등
- `non-Platform IT`: 군의 일반적인 전산 시스템

이미 `미국방부(DoD)`는 `non-Platform IT(전산 시스템)`에는 `보안공학`을 적용해 왔지만, 2019년 `RMF` 발표 이후에는 `Platform IT(무기 체계)`에도 `보안공학`을 적용하기 시작하였다.

#### non-Platform IT
- `MT 1` - 클라우드
- `MT 2` - 군 전산 시스템

기존에는 `MT 1`, `MT 2`에 보안공학 프로세스를 적용해왔다.

#### Platform IT
- `MT 3` - 무기 체계
- `MT 4` - 핵 무기, 우주 시스템

2019년 `RMF` 발표 이후에는 `MT 3`, `MT 4` Platform IT`에도 보안공학을 적용하기 시작하였다.

<br>

### (10) Lockheed Martin’s CRL Model

`Lockheed Martin`은 `무기 체계 개발 프로세스`에 `보안공학`을 적용하는 방법론을 만들어냈다.

`미국방부(Dod)`는 `F-35 전투기`를 운용하는 동맹국들(우리나라를 포함) 중 한 곳이라도 보안이 뚫리면 나머지 F-35 전투기에도 영향을 끼치므로 ***F-35를 운용하는 모든 국가들은 미국에서 적용하는 동일한 수준의 보안공학을 적용하라는 요구를 하였다.***

<br/>

## (11) Security Engineering Process Overview

<img src="../images/security-engineering-1-the-basic-terms-and-theories-1.11.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Engineering Process`: 보안 제품 개발과 관련된 프로세스
- `Assurance Process`: 각 개발 프로세스가 제대로 이루어져 보안 요구사항을 얼마나 충족했는가의 정도를 나타낸다. 일반적으로 수학적인 증명을 통해 그 정밀도를 높인다.
- `Risk Process`: 제품의 위험을 분석하여 우선순위를 따져 보안 요구사항을 도출하고, `risk management`를 통해 위험을 측정하고 관리하는 프로세스

<br/>

`보안공학(security engineering)`은 `개발 생명주기(development lifecycle) 전반`에 걸쳐 `정보 시스템 보안(information system security)`과 `위험 관리(risk management)`를 결합하는 구조화된 프로세스(`structured process`)를 제공한다.

### (12) What Is Assurance?

`Requirements(Security Policy)`
- What? 어떤 제품을 만들 것인가? 요구사항은 무엇이 필요한가?
- 요구사항 자체를 도출하는 것이 어려움

`Mechanism`
- How? 어떻게 보안을 구현할 것인가?
- 어떻게 구현할 것인가?

`Assurance`
- 제품 설계나 구현이 실제 요구사항을 만족하는가?
- 수학적으로 증명함

<br/>

#### Assurance Process

1. `Policy Assurance`: `요구사항(requirements)`을 100% 제대로 도출되었는지 수학적으로 증명하는 것
2. `Design Assurance`: `요구사항`이 충족되도록 설계가 제대로 되었는가를 수학적으로 증명하는 것
3. `Implementation Assurance`: 보안 하드웨어나 소프트웨어가 설계대로 100% 구현되었는지를 수학적으로 증명하는 것
4. `Operational Assurance`: 제품을 운영 중에 중간에 새롭게 패치가 업데이트되어도 기존 요구사항이 계속 유지되는 것을 수학적으로 증명하는 것

1~4 단계를 모두 만족할 경우 `Chain of Evidence`가 확보되었다고 말한다. 또는 이것을 `End-to-End Provable Security`를 만족한다라고 한다.

1~4 단계는 이전 단계가 완벽하게 증명되지 않으면 다음 단계로 넘어갈 수 없다. ***따라서 각 단계에서 문제를 조기에 발견하는 것이 가능하다.***

현실에서는 이전 단계를 꼼꼼하게 점검하지 않고 배포했을 경우 나중에 업데이트를 해야 하는 경우가 많다. 특히 하드웨어는 설계 자체에 결함이 있을 경우 업데이트를 할 수 없으므로 매우 치명적이다.(e.g. 인텔 cpu 설계 결함으로 인해 스펙터, 멜트 다운 공격 발생)

<br/>

### (13) What Is Risk Management?

`체크리스트 기반 평가 방법`을 사용하면 10%를 달성하거나 90%를 달성하거나 둘 다 요구사항에 대해 탈락이다.

`위험관리 기반 방법`에서는 아직 요구사항을 완벽하게 만족하지 않더라도 위험을 감수할만 하다고 판단하면 우선은 통과시키고 나중에 좀 더 요구사항을 완성시키는 것이 가능하다.

특히 천문학적인 비용이 들어가는 프로젝트(e.g. 전투기 개발)에서는 체크리스트 기반 평가보다는 위험관리 방식으로 평가하는 것이 합리적이다.

하지만 요구사항 만족도에 대한 정확한 `정량적 평가`가 필요하므로 훨씬 어려운 방법이다.

<br/>

### (14) Security Engineering Activities

<img src="../images/security-engineering-1-the-basic-terms-and-theories-1.14.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (15) Software Testing vs. Software Verification

`Software Testing`
- 일반적인 소프트웨어 테스트
- 하지만 모든 경우의 수를 모두 테스트할 수는 없음
- 테스팅 커버리지의 한계가 있음

`Software Verification`
- software가 정말로 안전한지 수학적으로 증명하는 학문
- 예전에는 실현 불가능한 이론적인 내용으로만 생각했지만 현재는 컴퓨팅 파워가 증가하여 어느정도 수학적으로 증명하는 것이 가능해짐

<br/>

### (16) Common Criteria

`국제 공통평가 기준(Common Criteria)`
- 해당 제품이 `보안공학`에서 말하는 `개발 프로세스`를 따라 요구하는 모든 `Assurance`를  충족하여 만들어졌는지를 평가하는 기준이다. ***어떤 취약점이 있는지 없는지를 판단하는 평가 기준이 아니다.***

<br/>

## 2. Trustworthiness

<br/>

### (1) Trustworthy란 무엇인가?

`보안공학`은 `Trustworthy`한 제품을 개발하고, 검수하고, 운영하는 제품의 `생명주기 전반`에 적용되는 체계적인 개발 프레임워크에 대한 학문이다.

특히 보안 분야에서는 명확한 용어 정의가 중요하다.

<br/>

### (2) Information Security vs. Cybersecurity

Paradigm Shifts in Security

- `Physical Security` Era. 물리보안
- `Communication Security` (COMSEC) Era. 통신보안
- `Computer Security` (COMPUSEC) Era (1960년대~). 컴퓨터보안
- `Information Security` (INFOSEC) Era (1980s년대~). 정보보안
- `Information Assurance` (IA) Era (1998년~). 정보보증
- `Cybersecurity` Era (2014년~). 사이버보안

1998년 이전에는 보안은 오직 `Secure`한 제품을 만드는 것에 집중하였다.

1998년 이후부터는 `Trustworthy`한 제품을 만드는 것으로 변화하였다.

1998년 `Information Assurance` 시대 이후부터 보안에 대한 패러다임의 큰 변화 발생하였다.

<br/>

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.2.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

#### Information Security (INFOSEC) : 정보보안

주로 `전자정보(electronic information)`만 보호대상이었다.

<br/>

#### Information Assurance (IA) : 정보보증

`전자정보` 뿐만 아니라 `종이에 인쇄된 데이터` 등 `모든 형태(all types)의 정보`가 보호대상이 되었다. 특히 `trustworthy`하게 만드는 것을 강조하였다.

<br/>

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.2.1.2.png?raw=true" alt="drawing" width="480"/>

<br/>

#### Cybersecurity

***`사이버 공간`과 관련된 모든 것을 보호한다.*** SNS 메신저를 이용한 `사이버 왕따(cyber bullying)` 등도 보호 대상이 된다(`IS`, `IA`에서는 보호대상이 아니었다.) 따라서 사이버 왕따로 인한 사람의 심리도 보호한다. 이외에도 `가짜 뉴스(fake news)`도 보호 대상이 된다(IS, IA에서는 보호대상이 아니었다.)

`Available`, `Reliable`, and `Secure` = `Trustworthy` 관점에서 바라본다.

- S/W and H/W based
- Technical and non-Technical
- based on information from NSA, DoD, DISA, and DoN

<br/>

#### Cyber Defense : 사이버 국방

`Cybersecurity` + `Strategy(전략 전술)` = `Cyber Defense`

나라 전체를 보호하기 위해서는 군이라는 조직을 이용하여 `Strategy(전략 전술)` 개념이 추가되어야 한다.

<br/>

"From information security to cyber security" 논문에서 용어의 정의를 정확하게 정리하였다.

<br/>

### (3) Security Alone Is NOT Enough!

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.3.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

1991년 `걸프전(Gulf War)`(1990.8.2 ~ 1991.2.28)이 CNN을 통해서 생중계되었다.

걸프전은 `최초의 정보전(the first information war)`으로 불린다.

항공모함에서 무인폭격기 무인미사일 발사하였다.

타겟의 위치 정보를 정확하고 빠르게 입수하는 것이 중요하였다. → ***미군은 현대전에서의 `정보`의 중요성을 깨달았다.***

적의 정보는 신뢰할 수 있는 정보를 빠르게 입수해야 하고, 그 정보는 아군이 24시간 활용할 수 있어야 한다. 반면에 아군에 대한 정보는 적에게 노출되지 않도록 항상 기밀성이 유지되어야 한다.

걸프전을 통해 미군이 느낀 것은 통신 장비가 `해킹`되지 않는 것도 중요하지만, ***모래 폭풍(dust storm)과 같은 다양한 악조건 속에서도 안정적으로 통신되는 것이 중요하다는 것이었다.***

→ the Gulf War was the harbinger of `Information Assurance`

<br/>

### (4) Information Assurance

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.4.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`Information Assurance` : 내가 원하는 정보는 해킹에 의해서건 자연재해에 의해서건 훼손되지 않아 신뢰할 수 있어야 하고 안정적으로 언제든지 24시간 접근할 수 있어야 한다.

- `Quality`(against `accidental failures`) : 사람의 실수나 자연재해로 인한 오류를 줄이는 것
- `Security`(against `intentional failures`) : 해커가 의도적으로 정보를 훼손하는 것을 방지하는 것

`Quality` + `Security` = `Trustworthy`(or `Dependable`)

좀 더 정확하게 얘기하면 `Information Assurance`는 정보나 정보를 다루는 시스템의 `Quality`와 `Security`를 동시에 제공하는 정책이다. 그리고 `Quality`와 `Security`를 동시에 제공하는 것을 `Trustworthy`하다고 말한다.

따라서 `보안공학`은 `Quality`와 `Security`를 제공하는 제품을 개발하기 위한 방법론에 대한 학문이다.

<br/>

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.4.1.2.png?raw=true" alt="drawing" width="480"/>

<br/>

예전에는 제조 회사들이 `reliable` and `safe`한 제품을 만드는데 집중하였다. 전통적인 소프트웨어 공학 방법론에 집중하였다.(e.g. 로켓이나 자동차 개발)

하지만 ***2015년 크라이슬러 해킹*** 시연 후에 `security`에 대한 요구 발생하였다.

`Information Assurance` 정책이 펼쳐지면서 이전에는 서로 다른 분야였던 `Quality` 분야와 `Security` 분야가 융합되었다.

<br/>

### (5) Trustworthiness Is NOT So Easy!

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.5.1.1.png?raw=true" alt="drawing" width="480"/>

좀 더 정확하게 `Trustworthy`하다는 것은 ***다음 4가지를 만족한다.***

- `Availability` (가용성) : 24시간 365일 원할 때 언제든지 해당 정보나 시스템에 접근 가능
- `Reliability` (안정성) : 사람의 실수로 인한 버그가 없어야 함
- `Safety` (안전성) : 버그가 있을 경우에도 치명적인 피해로 이어지지 않도록 함(e.g. 자동차, 원자력발전소)
- `Security` (보안성) : 의도적인 해커의 공격에 대해 보호하는 것

<br/>

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.5.1.2.png?raw=true" alt="drawing" width="480"/>

<br/>

하지만 `Trustworthiness`를 제공하는 것은 쉽지 않다.

e = mc<sup>2</sup>

errors = (more code)<sup>2</sup> 또는 (more connected)<sup>2</sup>

위의 4가지 특성은 서로 연관되어 있다. 특히 자원이 제한된 임베디드 시스템에서는 `Security`를 위해 코드를 증가시키면 `복잡도(complexity)`가 높아져 안정성 등이 떨어질 수 있다.

따라서 최초 요구사항 도출 단계부터 잘 정리하고 정의해서 4개의 특성을 모두 만족할 수 있도록 최척화된 요구사항 분석 및 설계가 필요하다. `Security` 부분을 나중에 추가하게되면 복잡도가 너무 높아진다. ***따라서 설계 단계부터 `Security`를 나머지 3가지 특성과 함께 고려하여 요구사항을 분석해야 한다.***

- `Security by Design(보안 내재화)` : 보안과 더불어 나머지 3가지 요소를 요구사항 분석, 설계 단계부터 고려하여 요구사항을 최적화하여 ***`복잡도(complexity)`를 최소화 하라는 의미이다.***

e.g. `카카오뱅크` 어플리케이션은 고성능의 보안 프로그램을 운영하면서도 단순한 이유는 최초 요구사항 분석 및 설계 단계부터 3가지 특성과 함께 `Security`를 함께 고려하여 만들었기 때문에 `복잡도`가 매우 낮다. 반면에 전통적인 은행 어플리케이션들은 처음에 `Security`를 많이 고려하지 않고 만들었기 때문에 나중에 `Security`를 추가하다보니 복잡도가 너무 높아진다.

<br/>

### (6) Cybersecurity

`4차 산업혁명` 시대에는 초연결 시대가 될 것이다. 모든 것이 연결될 수 있다. 많은 장비들이 `임베디드` 형태로 운영될 것이다. 임베디드 시스템은 나중에 업데이트 하기 어려우므로 초기 요구사항 분석과 설계 단계부터 안전하게 설계되어야 한다.

<br/>

### (7) HACKING UK TRIDENT : 핵잠수함 해킹

<img src="../images/security-engineering-1-the-basic-terms-and-theories-2.7.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

군에 있던 사람들이 하던 생각 : "The isolated 'air-gapped' systems cannot be penetrated."

하지만 이것은 사실이 아닌 것으로 밝혀졌다. `제조 공정 단계`에서 또는 `중간 업데이트 과정`에서 해킹이 가능했다. ***따라서 망분리되어 있다고 해서 안전한 것이 아니다.***

<br/>

### (8) UNECE (유엔 유럽경제위원회)

차량 제조사는 `Cyber Security Management System`을 운영하여 자동차를 제조해야 한다.

미국의 `F-35 스텔스 전투기` 검수 보고서에 `Cybersecurity Testing`을 통과하도록 요구한다.

<br/>

### Trusted vs. Trustworthy

- `Trusted` : 그 기관은 신뢰할 수 있다고 가정함. 실제 신뢰할 수 있는지는 입증되지 않음(e.g. 수사당국은 trusted 해야 한다. TPM(Trusted Platform Module) 보안칩은 정말 신뢰할 수 있는지는 알 수 없음)
- `Trustworthy` : 실제 제품이 `available`, `reliable`, `safe`, `secure`하여 신뢰할 수 있다고 수학적으로 증명됨(만약 Trustworthy Platform Module이라고 써있다면 실제 수학적으로 안전하다는 것이 증명된 보안칩임)

따라서 `보안공학(security engineering)`에서 추구하는 것은 `Trustworthy`이다.

<br/>

## 3. Threats vs. Risk

### (1) The Security “Big Picture”

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.1.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

<br/>

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.1.2.1.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.1.2.2.png?raw=true" alt="drawing" width="720"/>

<br/>

- `Owners(자산소유자)`: 자산 및 시스템의 주인
- `Countermeasures(보안대책)`: 위험을 줄일 수 있는 대응책
- `Vulnerabilities(취약점)`: 취약점(자산의 잠재적인 속성으로서 위협의 이용 대상이 되는 것)
- `Risk(위험)`: 위협에 의해 발생할 수 있는 손실에 대한 가능성
- `Threat Agents(위협원)`: 북한, 해커 등
- `Threats(위협)`: 손실이나 손상의 원인이 될 가능성을 제공하는 환경
- `Assets(자산)`: 보호해야할 가치(value)를 지닌 것

`위험(risk)`은 없애는 것이 아니라 ***줄이는 것(reduce)이다.***

<br/>

### (2) Risk Treatment

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.2.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

> Note:  
`잔여 위험(residual risk)`은 `risk treatment`에 의해 위험들이 줄어든 이후에 여전히 잔존하는 위험이다. 회사에서는 이 잔여 위험을 보고 감수할만한 위험인지 아닌지를 판단하여 제품을 출시할 지 또는 다른 `risk treatment` 과정을 통해 위험을 줄여야할 지 결정한다. 하지만 잔여위험을 완전히 없애는 것은 사실상 불가능하기 때문에 어느 정도 위험을 감수하는 것이 필요하다.

<br/>

#### Risk Treatment Options

- `Risk Avoidance`: 위험 자체를 피하는 것(e.g. 삼성 스마트TV 해킹 문제로 카메라 자체를 없애버림)
  
- `Risk Transfer`: 위험의 책임을 전가하는 것(e.g. 삼성페이 미국시장에서 토큰 만료 시간을 증가시켜 위험이 증가하여 보험에 가입함, 무언가 프로그램을 설치하거나 실행할 때 사용자에게 책임을 전가하는 경우)

- `Risk Reduction`: 일반적으로 엔지니어들이 위험을 줄이기 위해 사용하는 메커니즘(e.g. 보안 프로그램 개발)

- `Risk Retention`: 위험이 감수할만하다고 판단되면, 그냥 그 위험을 안고가는 것

실제 기업을 운영할 때는 위의 ***4가지 방법을 다양하게 고려해야 한다.***

<br/>

### (3) What Is Security Engineering?

`보안공학`은 실수나 자연재해와 같은 오류와 의도적인 해킹 공격으로부터 `Trustworthy(또는 Dependable)`한 시스템을 개발하는 방법론에 관한 학문이다.

`보안공학`은 `Design`, `Implementation`, `Testing`, `Auditing`, `Adaptation`을 위한 툴, 프로세스, 방법론을 모두 포함한다.

<br/>

### (4) Why Is It Difficult?

- 단순히 오류가 자연적으로 랜덤하게만 발생하는게 아니라 악의적인 공격자에 의해 의도적으로도 나타남
- 공격자는 가장 취약한 부분을 찾으려고 함
- 공격자는 공격하려는 대상 시스템이나 자원에 끊임없이 접근가능할 수도 있음
- `보안공학`은 매우 넓은 범위의 지식과 전문성이 필요함(암호학, 컴퓨터 보안, 전산학, 하드웨어 보안, 경제학, 심리학, 법 등)

<br/>

### (5) Security Engineering Principle

- 위험 기반 접근(risk based approach)  
- 보안 요구사항은 구조화된 엔지니어링 프로세스(structured engineering process)에 의해 도출됨

<br/>

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.5.1.1.png?raw=true" alt="drawing" width="320"/>

<br/>

- Threat Modeling
- Security Requirements
- Develop Security Mechanisms

<br/>

#### Software Assurance Processes

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.5.1.2.png?raw=true" alt="drawing" width="584"/>

<br/>

### (6) Assurance Levels

- `Assurance`는 시스템의 `trustworthiness`를 결정하는 매우 중요한 요소임
- `Informal Evidence`부터 `Rigorous Mathematical Evidence`까지 다양한 레벨의 `Assurance` 가능
- `Assurance`는 시스템의 `생명주기(life cycle)` 전 과정에서 필요함

<br/>

### (7) If It is Not Provable

물론 시스템의 보안성을 모두 ***수학적으로 증명(mathematical proofs)할 수 있으면 가장 좋지만,*** 현실적으로 불가능할 경우에는 ***잘 정의된 소프트웨어 개발 프로세스(well-defined software development processes)를 따라야 한다.***

<br/>

다음은 `Microsoft`의 `SDL(Security Development Lifecycle)`이다.

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.7.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### (8) SDL(Secure Development Lifecycle)

보안공학은 악의적인 공격이든 사람의 실수나 자연재해가 발생했을 때도 제품을 안전하게 만드는 방법론에 관한 학문이다.  `보안공학`을 실제 소프트웨어 개발 프로세스에 잘 녹여낸 기업이 `마이크로소프트`이다. 그리고 이것을 `Security Development Lifecycle (SDL)`이라고 부른다. 산업계에서는 `보안공학`을 `SDL`이라고 부른다.

`Secure Coding`만 한다고해서 `SDL 프로세스`를 제대로 따르는 것이 아니다. 아래의 그림에서 보듯이 `Secure Coding`은 `SDL 프로세스` 중에서 `구현(implementation)` 단계에서 적용되는 일부분에 불과하다.

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.8.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

`SDL` 프로세스를 제대로 구축하고 있는지 확인하기 위한 방법은 다음과 같다.

1. `Secure Coding`만 하고 있는데, `SDL`을 한다고 착각하고 있지 않는가?
2. `Shift Left` 철학을 잘 지키고 있는가?
3. `Traceability`이 제대로 만족되는가?

<br/>

### (9) Basic Principles for SDL : Traceability

#### 추적성(Traceability) :  

- 시스템에 문제가 발생했을 때 개발 프로세스 중에서 어떤 단계에 원인이 있는지 추적하여 바로 찾아냄(요구사항 분석, 설계, 구현, 테스트 등 어디에서 잘못되었는지 찾아냄)
- 추적성이 잘 만족되면 시스템을 패치하면서 ***개발 프로세스 자체, 도구(tools), 교육(training) 방법을 함께 업데이트할 수 있음*** → `continuous improvement`(개발 프로세스가 계속 향상됨) → 동일한 문제가 재발하지 않게됨
- End-to-End Traceability

> ***Note:***  
***\"You can't manage what you can't measure.\"*** Thus, Microsoft has devised a set of ***security metrics*** that product teams can use to monitor their success in implementing the SDL.  
***측정되지 할 수 없으면 관리할 수 없다.*** 따라서 `보안 메트릭(security metrics)`을 통해 항상 `추적성`이 만족되도록 `SDL 프로세스`를 관리해야 한다.

<br/>

`국제 공통평가 기준(Common Criteria)` :  
- CC평가는 제품이 안전한지 취약점을 분석하거나 테스트해주는 것이 아님
- 제품이 `보안공학`에서 말하는 개발 프로세스에 따라서 각종 `Assurance`를 기준에 따라 모두 충족해서 나왔는지 확인하는 것임
- ISO 국제표준에 따라 평가를 받으려면 문서를 제출해야 함(요구사항 분석, 설계, 구현, 테스팅 등의 단계별 과정을 어떻게 진행했는지 구체적으로 작성하여 보냄) → 취약점 분석, 모의해킹 자료를 보내는 것이 아님
- ***추적성(Traceability)이 만족되도록 써야함*** → 제품에 혹시 문제가 발견되면 전체 개발 과정의 문서를 찾아서 원인을 추적할 수 있도록 해야함

<br/>

#### Basic Principles for SDL : Shift Left

보안팀에서 하던 일들을 개발자들에게 넘기는 것이다.

개발자들이 요구사항 분석, 설계, 구현 단계에서부터 보안공학을 적용하여 Assurance를 충족하도록 교육해야 한다.

개발자들이 직접 각 단계별로 Assurance를 충족하는지 테스팅할 수 있어야 한다.

보안팀에서는 개발자들이 매우 쉽고 간단하게 보안성 테스트를 할 수 있도록 툴을 제공하고 교육해야 한다.

<br/>

### (10) Secure Design Principles

***\"The Protection of Information in Computer Systems\"*** by Jerome Saltzer, Michael Schroeder in 1974.

이 논문은 시스템을 안전하게 설계하기  8가지 원칙들을 제시하였다. 이 원칙들은 현대 시스템 디자인에도 적용된다.

1. Principle of Least Privilege
  - `최소 권한`의 원칙
  - 프로그램이든 사용자든 사용하는데 필요한 최소한의 권한만 제공해야 함

2. Principle of Fail-Safe Defaults
  - `명시적으로(explicitly)` 접근 권한이 주어진 사람이나 프로세스만 접근할 수 있어야 함
  - 기본적으로 `접근 불가(access denied)` 상태가 `디폴트(default)`임
  - 시스템에 운용중에 문제가 발생하여 실패할 경우 시스템의 모든 변경된 내용이 원래 안전했던 상태로 되돌아가야 함(실패해도 안전) → 애매한 상태로 남아있어서는 안됨

3. Principle of Economy of Mechanism
  - 디자인(design)과 구현(implementation)을 최대한 `simple`하게 해야 함(***as simple as possible***)
  - small보다는 `simple`해야함(small하게 만들면 오히려 complex해질 수 있음) → `복잡도(complexity)`를 낮춰야 함
  - 단순할수록 오류의 가능성이 낮아지고 `Assurance Level`은 올라감 → 구조가 간단해야 수학적으로 증명할 수 있으며, 수학적으로 증명해야 `Assurance Level`이 올라간다.
  - 테스트 프로세스가 더욱 단순해짐
  - `모듈화 설계` → 분석하기 좋게 `simple`하게 만드는 것
  
4. Principle of Complete Mediation
  - 시스템에서 발생하는 `모든 이벤트를 감시`해야 함(e.g. 보안 운영체제는 운영체제에서 발생하는 모든 이벤트를 감시하고 통제할 수 있어야 함 → 놓치거나 bypass되는 것이 없어짐)
  - 캐쉬된 인증 정보를 가지고 계속 접근하는 것은 옳지 않음
  - 가능하면 사용자가 매번 행동을 할 때마다 허용된 권한을 갖고 있는지 검사하는 것이 좋음
  - 성능이 떨어질 수 있기 때문에 구현하기 쉽지 않음(보안 하드웨어와 같은 성능을 높이는 보조 장치의 도움을 받음)

5. Principle of Open Design
  - 시스템의 보안성은 디자인과 구현의 비밀성에 의존해서는 안됨
  - 시스템 설계도를 공개하여 누구나 검증할 수 있어야 함
  - 이와 반대되는 개념은 바로 `Security through Obscurity` → 설계도를 비밀로 유지함 → 설계도의 비밀성을 유지하기 위한 관리 비용이 계속 증가함
  - `Kerckhoffs의 원칙`(open crypto design)(1883년)과 유사함 → 암호 시스템의 안전성은 암호 시스템의 비밀성에 의존해서는 안됨 → 암호키만 안전하게 보관하면 안전하도록 설계해야 함
  - 일반적으로 공개된 디자인이 훨씬 안전하다고 검증되었음(텔레그램의 자체 개발 암호알고리즘 깨졌음)

6. Principle of Separation of Privilege
  - 권한 분리의 원칙(e.g. 핵 미사일 발사 장치 키 분산)
  - 권한을 여러 사람에게 분산시켜야 한다.
  - 하나의 조건(single condition)에만 기반해서 권한을 제공해서는 안됨

7. Principle of Least Common Mechanism
  - 리소스에 접근하기 위한 메커니즘을 공유하지 말아야 함 → 한 곳에서 발생한 문제가 다른 영역으로 퍼지는 것을 막을 수 있음
  - 공동으로 사용하는 모듈을 최소화해야 함
  - 우리나라의 `공인인증서`는 이 원칙을 위반함 : 공인인증서 한 개로 너무 많은 용도에 쓰임(은행, 증권, 공공기관 인증 등) → 공인인증서 한 개만 해킹되어도 여러 영역에서 피해가 발생함

8. Principle of Psychological Acceptability
  - 보안 프로그램을 실행하고 운용하는 것은 매우 쉽고 직관적이어야 함
  - 보안 메커니즘으로 인해 리소스에 대한 접근이 더욱 어려워져서는 안됨
  - `Ease of Use`를 추구함
  - 최근에는 `Usable Security`(보안과 사용자 편의성을 연구) → e.g. 스마트폰에서 패턴 인식을 통한 편리한 인증 등을 연구, 웹브라우저에서 문서를 다운로드할 때 경고메시지를 띄워서 `읽기전용`으로 유도하는 것 등

<br/>

이 외에도 시스템을 설계하기 위한 `추가적인 3가지 원칙`이 있다.

<br/>

### (11) Ext.1 Defense in Depth

`다단계 보안`(multiple levels of security) 메커니즘 필요하다. 

여러 계층에 걸쳐 시스템에 보안 메커니즘을 적용해야 함으로써 한 계층에서 취약점이 발견되거나 뚫리더라도 다음 계층에서 막을 수 있도록 해야 한다.

대표적인 것으로 `Onion Model of Protection`이 있다.

<img src="../images/security-engineering-1-the-basic-terms-and-theories-3.11.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

만약 `하드웨어 계층`에서 보안 프로그램을 설치하면 다양한 상위 계층에서 해당 보안 프로그램을 활용할 수 있다. 따라서 매우 `보편적인(general) 보안 서비스`가 가능하다.

하지만 `응용 계층`에 보안 프로그램이 있을 경우 `특정 어플리케이션에 특화된 디테일한 서비스`를 제공할 수 있다.

그러므로 `안쪽 계층`으로 갈수록 `보편적인(general)` 보안 서비스를 제공하고, `외부 계층`으로 갈수록 해당 계층에 `특화된(specific)` 보안 서비스를 제공할 수 있다.

<br/>

### (12) Ext.2 Design for Updating

***모든 시스템은 보안 취약점으로부터 평생 안전할 수 없다.*** 시스템을 개발 후에도 추가적인 업데이트가 항상 필요하다. 따라서 `안전하고(safe)` `안정적인(reliable)` `보안 업데이트` 메커니즘이 필요하다.

`Secure Update`에 대한 연구도 매우 중요한 분야이다(e.g. 테슬라 자동차 무선 업데이트 기능).

<br/>

### (13) Ext.3 Centralized vs. Decentralized

`중앙 집중형 시스템`의 경우 한 곳만 공격하면 모든 시스템이 마비되거나 모든 정보가 파괴될 수 있다(`single point of failure`). 하지만 `분산형 시스템`의 경우 공격을 당하면 해당 공격을 당한 곳만 피해를 입으므로 피해가 분산된다.

하지만 분산형 시스템의 경우 보안 정책의 일관성을 유지하기 어렵고(모든 분산된 시스템을 동시에 업데이트 해야함), 시스템 관리의 효율성이 낮아진다.

`스마트홈`의 경우 `Decentralized` 구조를 권장한다. 왜냐하면 문제가 발생했을 때 피해가 생명과 직결될 수 있기 때문이다. 한 곳에 문제가 발생해도 다른 곳에 영향을 미치지 않도록 해야한다.

절대적인 것은 없고 항상 주어진 조건과 환경에 따라서 적절하게 중앙화 시스템과 탈중앙화 시스템을 사용할 수 있어야 한다.

<br/>

# The Basic Terms & Theories

<br/>

## 1. 위협(Threats) vs. 위험(Risk)

<br/>

### 1) The Security “Big Picture”

<img src="../images/security-engineering-3-the-basic-terms-and-theories-1.1.1.png?raw=true" alt="drawing" width="840"/>

<br/>

<img src="../images/security-engineering-3-the-basic-terms-and-theories-1.1.2.png?raw=true" alt="drawing" width="840"/>

<br/>

- `Owners`: 자산 및 시스템의 주인

- `Countermeasures`: 대응책

- `Vulnerabilities`: 취약점(자산의 잠재적인 속성으로서 위협의 이용 대상이 되는 것)

- `Risk`: 위험(위협에 따라 생길 수 있는 손실에 대한 가능성)

- `Threat Agents`: 위협원(북한, 해커 등)

- `Threats`: 위협(손실이나 손상의 원인이 될 가능성을 제공하는 환경)

- `Assets`: 보호해야할 가치(value)를 지닌 자산

위험(risk)은 없애는 것이 아니라 ***줄이는 것(reduce)이다.***

<br/>

### 2) Risk Treatment

<img src="../images/security-engineering-3-the-basic-terms-and-theories-1.2.1.png?raw=true" alt="drawing" width="840"/>

<br/>

Risk Treatment Options

- `Risk Avoidance`: 위험 자체를 피하는 것(e.g. 삼성 스마트TV 해킹 문제로 카메라 자체를 없애버림)
  
- `Risk Transfer`: 위험의 책임을 전가하는 것(e.g. 삼성페이 미국시장에서 토큰 만료 시간을 증가시켜 위험이 증가하여 보험에 가입함, 무언가 프로그램을 설치하거나 실행할 때 사용자에게 책임을 전가하는 경우)

- `Risk Reduction`: 일반적으로 엔지니어들이 위험을 줄이기 위해 사용하는 메커니즘(보안 프로그램 개발)

- `Risk Retention`: 위험이 감수할만하다고 판단되면, 그냥 그 위험을 안고가는 것

실제 기업을 운영할 때는 위의 ***4가지 방법을 다양하게 고려해야 한다.***

<br/>

## 2. 보안공학(Security Engineering)

보안공학은 실수나 자연재해와 같은 오류와 의도적인 해킹 공격으로부터 `Trustworthy(또는 Dependable)`한 시스템을 개발하는 방법론에 관한 학문이다.

보안공학은 Design, Implementation, Testing, Auditing, Adaptation을 위한 툴, 프로세스, 방법론을 모두 포함한다.

### 1) 보안공학이 어려운 이유

- 단순히 오류가 자연적으로 랜덤하게만 발생하는게 아니라 공격자에 의해 의도적으로 나타남

- 공격자는 가장 취약한 부분을 찾으려고 함

- 보안공학은 매우 넓은 범위의 지식과 전문성이 필요함(암호학, 컴퓨터 보안, 전산학, 하드웨어 보안, 경제학, 심리학, 법 등)

<br/>

### 2) 보안공학 원칙(Security Engineering Principle)

- 위험 기반 접근(risk based approach)
  
- 보안 요구사항은 구조화된 엔지니어링 프로세스(structured engineering process)에 의해 도출됨

<img src="../images/security-engineering-3-the-basic-terms-and-theories-2.2.1.png?raw=true" alt="drawing" width="320"/>

<br/>

- Threat Modeling

- Security Requirements

- Develop Security Mechanisms

<img src="../images/security-engineering-3-the-basic-terms-and-theories-2.2.2.png?raw=true" alt="drawing" width="584"/>

<br/>

### 3) 보증 레벨(Assurance Levels)

- `Assurance`는 시스템의 `trustworthiness`를 결정하는 매우 중요한 요소임

- `Informal Evidence`부터 `Rigorous Mathematical Evidence`까지 다양한 레벨의 Assurance 가능

- `Assurance`는 시스템의 생명주기(life cycle)) 전 과정에서 필요함

물론 시스템의 보안성을 모두 ***수학적으로 증명(mathematical proofs)할 수 있으면 가장 좋지만,*** 현실적으로 불가능할 경우에는 ***잘 정의된 소프트웨어 개발 프로세스(well-defined software development processes)를 따라야 한다.***

다음은 `Microsoft`의 `SDL(Security Development Lifecycle)`이다.

<img src="../images/security-engineering-3-the-basic-terms-and-theories-2.3.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 4) SDL(Secure Development Lifecycle)

`Secure Coding`만 한다고해서 `SDL 프로세스`를 제대로 따르는 것이 아니다. 아래의 그림에서 보듯이 `Secure Coding`은 `SDL 프로세스` 중에서 구현(implementation) 단계에서 적용되는 일부분에 불과하다.

<img src="../images/security-engineering-3-the-basic-terms-and-theories-2.4.1.png?raw=true" alt="drawing" width="720"/>

<br/>

#### (1) Basic Principles for SDL : Traceability

<br/>

추적성(Traceability):  
- 개발 프로세스에서 문제가 발생했을 때 문제 원인을 바로 찾아낼 수 있음
- 시스템에 문제가 발생했을 때 SDL 단계 중에서 어떤 단계에 원인이 있는지 추적하여 찾아냄(요구사항 분석, 설계, 구현, 테스트 등 어디에서 잘못되었는지 찾아냄)
- 시스템을 패치하면서 ***개발 프로세스 자체를 함께 업그레이드할 수 있음*** → 동일한 문제가 재발하지 않게됨
- End-to-End Traceability

> ***Note:***  
***\"You can't manage what you can't measure.\"*** Thus, Microsoft has devised a set of ***security metrics*** that product teams can use to monitor their success in implementing the SDL.  
측정되지 할 수 없으면 관리할 수 없다. 따라서 보안 메트릭(security metrics)을 통해 항상 추적성이 만족되도록 SDL 프로세스를 관리해야 한다.

<br/>

보안성 평가론(Common Criteria):  
- CC평가는 제품이 안전한지 취약점을 분석하거나 테스트해주는 것이 아님
- 제품이 보안공학에서 말하는 각종 Assurance를 기준에 따라 모두 충족해서 나왔는지 확인하는 것임
- ISO 국제표준에 따라 평가를 받으려면 문서를 제출해야 함(요구사항 분석, 설계, 구현, 테스팅 등의 단계별 과정을 어떻게 진행했는지 구체적으로 작성하여 보냄) → 취약점 분석, 모의해킹 자료를 보내는 것이 아님
- ***추적성(Traceability)이 만족되도록 써야함*** → 제품에 혹시 문제가 발견되면 전체 개발 과정의 문서를 찾아서 원인을 추적할 수 있도록 해야함

<br/>

#### (2) Basic Principles for SDL : Shift Left

보안팀에서 하던 일들을 개발자들에게 넘기는 것이다.

개발자들이 요구사항 분석, 설계, 구현 단계에서부터 보안공학을 적용하여 Assurance를 충족하도록 교육해야 한다.

개발자들이 직접 각 단계별로 Assurance를 충족하는지 테스팅할 수 있어야 한다.

보안팀에서는 개발자들이 매우 쉽고 간단하게 보안성 테스트를 할 수 있도록 툴을 제공하고 교육해야 한다.

<br/>

### 5) Secure Design Principles

***\"The Protection of Information in Computer Systems\"*** by Jerome Saltzer, Michael Schroeder in 1974.

이 논문은 현대 시스템 디자인에도 적용되는 중요한 원칙들을 제시하였다.

1. Principle of Least Privilege
  - `최소 권한`의 원칙
  - 프로그램이든 사용자든 사용하는데 필요한 최소한의 권한만 제공해야 함

2. Principle of Fail-Safe Defaults
  - 기본적으로 `접근 불가(access denied)` 상태가 디폴트(default)임
  - `명시적으로(explicitly)` 접근 권한이 주어진 사람만 접근할 수 있어야 함
  - 시스템에 운용중에 문제가 발생하여 실패할 경우 시스템의 모든 변경된 내용이 원래 안전했던 상태로 되돌아가야 함(실패해도 안전) → 애매한 상태로 남아있어서는 안됨

3. Principle of Economy of Mechanism
  - 디자인(design)과 구현(implementation)을 최대한 `simple`하게 해야 함(***as simple as possible***)
  - small보다는 simple해야함(small하게 만들면 오히려 complex해질 수 있음)
  - 단순할수록 오류의 가능성이 낮아지고 Assurance Level은 올라감
  - 테스트 프로세스가 더욱 단순해짐
  - `모듈화` 설계 → 분석하기 좋게 simple하게 만드는 것
  
4. Principle of Complete Mediation
  - 시스템에서 발생하는 모든 이벤트를 감시해야 함(e.g. 보안 운영체제는 운영체제에서 발생하는 모든 이벤트를 감시하고 통제할 수 있어야 함 → 놓치거나 bypass되는 것이 없어짐)
  - 캐쉬된 인증 정보를 가지고 계속 접근하는 것은 옳지 않음
  - 가능하면 사용자가 매번 행동을 할 때마다 허용된 권한을 갖고 있는지 검사하는 것이 좋음
  - 성능이 떨어질 수 있기 때문에 구현하기 쉽지 않음(보안 하드웨어와 같은 성능을 높이는 보조 장치의 도움을 받음)

5. Principle of Open Design
  - Kerckhoffs의 원칙(1883년)과 유사함 → 암호 시스템의 안전성은 암호 시스템의 비밀성에 의존해서는 안됨 → 암호키만 안전하게 보관하면 안전하도록 설계해야 함
  - 시스템의 보안성은 디자인과 구현의 비밀성에 의존해서는 안됨
  - 시스템 설계도를 공개하여 누구나 검증할 수 있어야 함
  - 이와 반대되는 개념은 바로 `Security by Obscurity` → 설계도를 비밀로 유지함 → 설계도의 비밀성을 유지하기 위한 관리 비용이 계속 증가함
  - 일반적으로 공개된 디자인이 훨씬 안전하다고 검증되었음(텔레그램의 자체 개발 암호알고리즘 깨졌음)

6. Principle of Separation of Privilege
  - 권한 분산의 원칙(e.g. 핵 미사일 발사 장치 키 분산)
  - 하나의 조건(single condition)에만 기반해서 권한을 제공해서는 안됨

7. Principle of Least Common Mechanism
  - 리소스에 접근하기 위한 메커니즘을 공유하지 말아야 함 → 한 곳에서 발생한 문제가 다른 영역으로 퍼지는 것을 막을 수 있음
  - 공동으로 사용하는 모듈을 최소화해야 함
  - 부채널 공격(side channel attack) 위험
  - 정보가 공유된 채널을 통해 새어나갈 수 있음(Covert channel)
  - Isolation 필요(e.g. Virtual machine 사용)
  - 은행 사이트 DOS 공격(동일한 인터넷 네트워크 채널을 사용하기 때문에 공격이 가능해짐)
  - 우리나라의 공인인증서는 이 원칙을 위반함(공인인증서 한 개로 너무 많은 용도에 쓰임(은행, 증권, 공공기관 인증 등) → 공인인증서 한 개만 해킹되어도 여러 영역에서 피해가 발생함)

8. Principle of Psychological Acceptability
  - 보안 프로그램을 실행하고 운용하는 것은 매우 쉽고 직관적이어야 함
  - 보안 메커니즘으로 인해 리소스에 대한 접근이 더욱 어려워져서는 안됨
  - `Ease of Use`를 추구함
  - `Usable Security`(보안과 사용자 편의성을 연구) → e.g. 스마트폰에서 패턴 인식을 통한 편리한 인증 등을 연구, 웹브라우저에서 문서를 다운로드할 때 경고메시지를 띄워서 `읽기전용`으로 유도하는 것 등

<br/>

#### Ext.1 Defense in Depth

`다단계 보안`(multiple levels of security) 메커니즘 필요하다. 

여러 계층에 걸쳐 시스템에 보안 메커니즘을 적용해야 함으로써 한 계층이 취약점이 발견되거나 뚫리더라도 다음 계층에서 막을 수 있도록 해야 한다.

대표적인 것으로 `Onion Model of Protection`이 있다.

<img src="../images/security-engineering-3-the-basic-terms-and-theories-2.6.1.png?raw=true" alt="drawing" width="720"/>

<br/>

만약 하드웨어 레벨에서 보안 프로그램을 설치하면 다양한 상위 계층에서 해당 보안 프로그램을 활용할 수 있다. 따라서 매우 보편적인 서비스가 가능하다.

하지만 응용 계층에 보안 프로그램이 있을 경우 특정 어플리케이션에 특화된 디테일한 서비스를 제공할 수 있다.

그러므로 안쪽 계층으로 갈수록 보편적인 서비스가 가능하고, 외부 계층으로 갈수록 해당 계층에 특화된 보안 서비스를 제공할 수 있다.

<br/>

#### Ext.2 Design for Updating

***모든 시스템은 보안 취약점으로부터 평생 안전할 수 없다.*** 시스템을 개발 후에도 추가적인 업데이트가 항상 필요하다. 따라서 안전하고(safe) 안정적인(reliable) `보안 업데이트` 메커니즘이 필요하다.

`Secure Update`에 대한 연구도 매우 중요한 분야이다(e.g. 테슬라 자동차 무선 업데이트 기능).

<br/>

#### Ext.3 Centralized vs. Decentralized

`중앙 집중형 시스템`의 경우 한 곳만 공격하면 모든 시스템이 마비되거나 모든 정보가 파괴될 수 있다(`single point of failure`). 하지만 `분산형 시스템`의 경우 공격을 당하면 해당 공격을 당한 곳만 피해를 입으므로 피해가 분산된다.

하지만 분산형 시스템의 경우 보안 정책의 일관성을 유지하기 어렵고(모든 분산된 시스템을 동시에 업데이트 해야함), 시스템 관리의 효율성이 낮아진다.

`스마트홈`의 경우 Decentralized 구조를 권장한다. 왜냐하면 문제가 발생했을 때 피해가 생명과 직결될 수 있기 때문이다. 한 곳에 문제가 발생해도 다른 곳에 영향을 미치지 않도록 해야한다.

절대적인 것은 없고 항상 주어진 조건과 환경에 따라서 적절하게 중앙화 시스템과 탈중앙화 시스템을 사용할 수 있어야 한다.

<br/>

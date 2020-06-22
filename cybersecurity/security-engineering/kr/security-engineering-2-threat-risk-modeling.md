#  II. Threat Risk Modeling to Establish Design Requirements

<br/>

## 1. Threat Risk Modeling

### 1) What Is Threat Modeling?

`보안공학`은 아래의 제품을 개발하는 전체 생명주기 과정을 어떻게 진행해야 하는지 배우는 학문이다.

1. 요구사항 분석 → 요구사항 검증(Policy Assurance)
2. 설계 → 설계 검증(Design Assurance)
3. 구현 → 구현 검증(Implementation Assurance)
4. 운영 → 운영 검증(Operational Assurance)

`보안공학`을 잘 적용하기 위해서는 첫 번째로 우선 `요구사항 분석`이 잘 이뤄져야 한다. 보안 부분에서 요구사항을 분석하는 가장 잘 정립된 방법론이 바로 마이크로소프트에서 개발한 `Threat Risk Modeling`이다. ***현존하는 방법 중에 `보안 요구사항`을 가장 `체계적으로` 도출하는 방법이다.*** 이때 `체계적인 방법`이 의미하는 것은 ***'누가 해당 프로세스를 적용하더라도 항상 동일한 요구사항 분석 결과가 도출된다'***는 뜻이다. 즉 해당 설계자의 전문성에 따라 요구사항 분석 결과가 달라진다면 그것은 체계적이고 올바른 보안공학 프로세스가 아니다. 또한 ***도출된 요구사항을 누가 해석하든 항상 동일하게 해석할 수 있도록 하는 것이 중요하다.***

> Note: 
`Threat risk modeling`은 모의해킹에도 사용될 수 있다. 일반적으로 모의해킹을 하면 모의해킹 수행자의 전문성에 따라 결과가 매우 상이하다. 하지만 `threat risk modeling`을 모의해킹에 결합하면 도출된 `security requirements`을 토대로 모의해킹을 하기 때문에 누가 하든 일정한 결과가 나올 수 있다.  
`Threat Modeling` + `Pentesting` = `Structured Pentesting` 또는 `Structured Threat Assessment Process`라고 한다.

<br/>

### 2) What Is Modeling?

`모델링(Modeling)`이란 `추상화(Abstraction)`와 동일한 의미이다. 어떤 대상 시스템을 분석하려고 할 때 취약점은 어떤 것이 있고 어디에 위협이 발생할 수 있는지 파악하여 보안대책을 수립할 수 있어야 한다. 하지만 현실의 대상 시스템은 굉장히 복잡하거나 보안과는 상관없는 부분이 있을 수 있다. 따라서 대상 시스템에서 우리에게 ***필요한 정보만 추출하는 것을*** `추상화` 또는 `모델링`한다고 말한다. 그리고 모델링을 통해 도출된 모델을 대상으로 분석(`Model Analysis`)한다.

<img src="../images/security-engineering-4-threat-risk-modeling-1.2.1.1.png?raw=true" alt="drawing" width="840"/>

<br/>

위 지도에서 두 지점 간에 최단거리를 분석하는 경우 왼쪽 실측 지도는 도로 정보 외에 불필요한 정보도 포함되어 있다. 따라서 실제 데이터에서 필요한 정보만 추출하는 것이 `모델링(Modeling)` 또는 `추상화(Abstraction)`라고 하며, 이를 바탕으로 실제 최단거리를 분석하는 것은 `모델 분석(Model Analysis)`이라고 말한다.

이때 중요한 것은 실제 지도와 모델링한 지도 간에 간격이 너무 크면 안 된다. 따라서 모델링할 때는 나중에 모델을 분석하는데 필요한 중요 정보는 모두 포함되어야 한다. 따라서 `추상화 간격(Abstraction Gap)`을 최소화해야 한다. 이 추상화 간격을 측정하는 지표를 `건전성(Soundness)`이라고 한다.

추상화된 모델의 보안성을 분석하여 어떠한 공격 A에 대해서 안전하다고 분석되었다면, ***실제 시스템에서도 공격 A에 대해서 안전해야 한다.*** 이럴 경우 `건전성(Soundness)`이 만족되었다고 말한다.

<br/>

### 3) Threats

- `Vulnerability`: 소프트웨어가 가진 결함
- `Threat`: 자산에 대해 위험을 유발할 수 있는 잠재적인 위협
- `Attack`: 시스템을 훼손하거나 접근하기 위한 시도
- `Exploit`: 성공적인 공격(successful attack)
- `Trust Boundary`: 데이터나 소스코드의 `trust level`이 바뀌는 경계

<br/>

### 4) Types of Threats

- `Social Threats`: 사람에 의해 발생하는 위협
- `Operational Threats`: 운영 정책의 실패로 인해 발생하는 위협
- `Technological Threats`: 기술적인 문제로 인해 발생하는 위협
- `Environmental Threats`: 물리적인 환경에 의해 발생하는 위협. e.g. 방화벽이 물이 새는 곳에 설치되었다.

<br/>

### 5) Why Threat Modeling?

일반적인 소프트웨어 공학에서는 `랜덤한 자연적인 오류`를 주로 다루지만 `보안공학`에서는 랜덤한 자연적인 오류 외에도 ***해커 등에 의한 의도적인(intentional) 공격도 다룬다.*** 

의도적인 공격에 의한 오류를 다루려면 ***`공격자`의 `심리상태`를 잘 읽어야 하는데, 방어자의 전문 지식 영역이나 수준에 따라서 방어 방법이 달라질 수 있다.*** 따라서 누가 하더라도 동일한 보안 요구사항을 도출하기 위해서 우리는 ***체계적으로 위협을 모델링하는 방법이 필요하다.***

<br/>

### 6) Threat Modeling Overview

일반적으로 보안 요구사항을 분석할 때 우리는 `기능적 보안 요구사항`(functional security requirements)만을 생각하는 경우가 많다(e.g. 암호화 기능, 메모리 보호 기능 등).

하지만 `비기술적인 요구사항`을 분석하는 것도 필요하다(e.g. 보안 정책을 어떻게 세워야 하는지, 환경 조건을 어떻게 조성해야 하는지 등). `Threat Modeling` 방법을 사용하면 `보안 요구사항`을 분석할 때 `기술적인 것`과 `비기술적인 것(정책, 환경 등)`을 모두 체계적으로 모델링할 수 있다. 

> ***Note:***  
문서에 따라서는 `Security Requirements`를 `Security Controls`라고 표현하는 경우도 있다.

<br/>

마이크로소프트는 ***제품의 50% 이상은 `설계 오류(design flaws)`로 인해 발생한다는 것을 발견하였다.*** `SDL 프로세스`를 통해 `요구사항 분석`과 `설계` 단계를 체계적으로 향상시키기 위한 방법으로 `Threat Modeling`을 개발하였다. `Threat Modeling`은 ***현존하는 `보안 요구사항`을 분석하는 가장 좋은 방법론으로 평가받는다.***

<br/>

> Note:  
`Threat modeling`을 하게 되면 모의해킹에 필요한 `security testing requirements`도 도출되기 때문에 `pentesting`에 사용되어 ***모의해킹의 완성도를 높일 수 있다.***

<br/>

#### [Note] Example of Good Requirement

(1) 나쁜 요구사항의 예 :
- 모든 민감한 데이터는 암호화되어야 한다. → 요구사항을 바탕으로 설계하고 구현하는 사람의 전문 지식 수준에 따라서 편차가 발생한다.

(2) 좋은 요구사항의 예 :
- 모든 민감한 정보는 전송 중이나(in transit) 또는 저장 중이든(at rest) 최소한 256비트 이상의 AES 알고리즘으로 암호화해야 하며, 해당 어플리케이션에서 민감한 정보로 분류되는 아이템 리스트는 부록(addendum) A를 참고하라.

<br/>

#### [Note] Characteristics of Good S/W Requirements

- `Unambiguity`: 요구사항을 설계하고 구현하는 사람이 달라져도 동일한 결과가 도출되어야 함(요구사항에 모호성이 없어야 함)
- `Prioritization`: 각 요구사항에 대한 우선순위가 정해져야 함
- `Verifiability`: 각 요구사항은 실제 제품에서 적절하게 구현되어야 함

<br/>

<br/>

### 7) Threat Modeling Steps

1. 요구사항을 분석할 시스템의 `범위(Scope)`를 결정하고 `System Boundary`를 설정해야 한다.
2. 보호해야 할 `자산(Assets)`을 식별한다.
3. 자산에 가해질 수 있는 가능한 모든 `위협(Threats)`과 가능한 `취약점(Vulnerabilities)`을 `STRIDE` 방법을 이용해 도출한다.
4. 도출된 `위협들(Threats)`의 `위험도(Risks)`를 평가한다(Threat Probability, Risk Assessment, Risk Analysis).
5. 위험에 대한 `대책(Responses)`을 도출한다(Risk Mitigation 또는 Countermeasures). → 이 대책들이 `Security Requirements`가 된다.

<br/>

<img src="../images/security-engineering-4-threat-risk-modeling-1.7.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

1. 분석할 대상 시스템의 `범위(scope)`를 결정하기 위해서 `DFD(Data Flow Diagram)`을 이용해서 실제 시스템에서 불필요한 정보는 제거하고 필요한 정보만 추출하여 `모델링(Modeling)`한다. 그리고 내가 보호해야 할 `자산(Assets)`을 식별한다.
2. `STRIDE` 기법을 통해서 `위협(Threats)`을 도출한다. 이 때 현재까지 알려진 모든 공격 기법이 체계적으로 저장된 `Attack Library`를 참조하여 `STRIDE` 기법을 적용한다.
3. 각 위협에 대한 `위험도(Risks)`를 평가하기 위해 `Attack Tree`를 작성한다.
4. 각 위협에 대한 `해결책(Remediation)`을 도출한다.

<br/>

### 8) Types of Diagrams

#### Types:
- DFDs (Data Flow Diagrams)
- UML (Unified Modeling Language)
- Swim Lane Diagrams
- State Diagrams

<br/>

#### UML(Unified Modeling Language)

<img src="../images/security-engineering-4-threat-risk-modeling-1.8.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

#### Swim Lane Diagram

<img src="../images/security-engineering-4-threat-risk-modeling-1.8.2.1.png?raw=true" alt="drawing" width="280"/>

<br/>

#### State Diagram

<img src="../images/security-engineering-4-threat-risk-modeling-1.8.3.1.png?raw=true" alt="drawing" width="480"/>

<br/>

## 2. Data Flow Diagrams

### 1) DFD (Data Flow Diagram)

By `Larry Constantine` in 1967

`DFD`는 `데이터 흐름(data flow)`에 따라서 다이어그램을 그리는 것으로, 위협분석을 하는데 가장 많이 쓰이는 다이어그램이다. 공격자의 공격 포인트를 도출하기 쉽다.

<img src="../images/security-engineering-4-threat-risk-modeling-2.1.1.1.png?raw=true" alt="drawing" width="520"/>

<img src="../images/security-engineering-4-threat-risk-modeling-2.1.1.2.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-4-threat-risk-modeling-2.1.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

실제 사용되는 DFD에서는 `모든 함수(functions)`를 `process element`로 표현하고 그 사이에 흐르는 데이터를 매우 구체적으로 그리기 때문에 해당 구간에서 어떤 공격이 가능한지 구체적으로 분석할 수 있어서 모든 위협을 도출해낼 수 있다.

이렇게 `DFD`와 `Attack Library`를 활용하여 발생가능한 모든 위협을 도출하면, ***사람에 따라서 편차가 생기는 것을 최소화할 수 있다.***

하지만 모든 함수를 다이어그램으로 표현하면 한 화면에 모든 것을 보기 어렵기 때문에 계층을 나눈다.

- `Context Diagram`: 최상위 계층; 전체 시스템
- `Level 1 Diagram`: High Level; single feature
- `Level 2 Diagram`: Low Level; sub-components of features
- `Level 3 Diagram`: 가장 디테일한 다이어그램(더 이상 프로세스를 쪼갤 수 없음)

`DFD`의 모든 계층을 `Level 3`까지 다 그리기 위해서는 ***전체 시스템을 함수 레벨까지 다 알고 있어야 한다.*** 그리고 `DFD`가 구체적으로 그려져야 가능한 많은 올바른 위협들이 도출될 수 있다. 그리고 위협이 제대로 도출되었는지 알기 위해서는 `건전성(Soundness)`을 만족하는지 확인해봐야 한다. 따라서 모델에서 발생하지 않는 공격은 실제 시스템에서도 발생해서는 안된다.

<img src="../images/security-engineering-4-threat-risk-modeling-2.1.3.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 2) Basic Rules Governing DFD

1. `DFD`를 그릴 때는 시스템의 필요한 모든 `컴포넌트(component)`가 포함되어야 한다. 이것을 `완전성(Completeness)`이라고 한다.

2. `프로세스(process)`
  - 모든 프로세스는 `입력(inputs)`과 `출력(outputs)`을 둘 다 가져야한다.
  - 프로세스의 이름은 `동사(verb)` 형태로 짓는다.

3. `데이터 저장소(data store)`
  - 모든 데이터는 반드시 `프로세스(process)`에 의해서 움직여야 한다.
  - 데이터 스토어는 `명사(noun)` 형태로 짓는다.

4. `소스/싱크(source/sink)`
  - 데이터는 소스(source)에서 싱크(sync)로 직접 이동할 수 없고 반드시 어떤 프로세스(process)에 의해 이동해야 한다 .
  - 소스/싱크는 `명사(noun)` 형태로 짓는다.

5. `데이터 흐름(data flow)`
  - 화살표를 그릴 때 한 방향(→, ←)으로만 표시하도록 한다. 양방향 화살표(↔)를 쓰지 않는다.
  - 화살표가 나뉘는 것은 같은 데이터가 다른 장소로 이동하는 것을 의미한다. 이것을 `fork`라고 한다.
  - 여러 화살표가 한 곳으로 모이는 것은 서로 다른 데이터가 하나의 장소로 이동하는 것을 말한다. 이것은 `join`이라고 말한다.
  - 데이터 스토어로 데이터가 흘러들어가는 것은 update(delete 또는 change)를 의미한다.
  - 데이터 스토어에서 나가는 데이터는 retrieve 또는 use를 의미한다.
  - 데이터 흐름은 `명사(noun)` 형태로 짓는다.

6. `일관성(Consistency)` 원칙이 필요하다.(e.g. DFD level이 바뀌면서 갑자기 전혀 새로운 data flow가 생성되거나 하는 것은 없어야 한다.)

7. 프로세스에 들어가는 `입력`은 `출력`을 생성하기 위해 충분해야 한다.

8. DFD 최하위 레벨에서는 예외적인 상황에 대해 에러 메시지 등의 새로운 데이터 흐름이 추가될 수 있다. 

9. 데이터 흐름이 서로 겹치지(cross) 않도록 한다.

<br/>

### 3) Control Analysis

`DFD`를 그린 후에 각 컴포넌트에 대해 정리해놓는다.

<img src="../images/security-engineering-4-threat-risk-modeling-2.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

## 3. Identification of Assets

### 1) Identification of Assets

<img src="../images/security-engineering-4-threat-risk-modeling-3.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`물리적인 자산`은 측정하기 쉽지만 `추상적인 자산`(e.g. 회사의 명성)은 측정하기 쉽지 않다.

<br/>

## 4. Determine Threats

### 1) Information Assurance Threats

<img src="../images/security-engineering-4-threat-risk-modeling-4.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Threat Modeling`에서는 `STRIDE` 기법을 통해 주로 `Intentional action or inaction`과 `Security` 부분에 중점을 두고 분석한다.

### 2) Determine Threats

만약 회사에 전문가들만 있다면 `brainstorming`이나 기타 `informal methods`를 이용해 위협을 식별할 수 있다.

하지만 일반적으로 회사에는 전문가와 비전문가가 섞여있기 때문에 ***누가 하더라도 일정하게 위협을 도출할 수 있도록*** `STRIDE 기법`을 사용한다.

위협을 도출하려면 현재까지 알려진 모든 공격 기법들을 알고 있어야 하므로 `Attack Library(또는 Threat List)`가 중요하다. e.g. `Common Vulnerability and Exposures(CVE)`

<br/>

### 3) MS’s STRIDE Threat Model

`STRIDE 기법`은 `Loren Kohnfelder`에 의해 마이크로소프트에서 개발되었다. ***공격자의 입장에서*** 시스템의 공격 위협을 분석하는 방법론이다. 

> Note:  
참고로 `Loren Kohnfelder`은 최초로 `인증서(certificate)`의 개념을 제안한 사람이다.

- `S`: Spoofing(다른 사람 흉내를 내는 것)
- `T`: Tampering(데이터를 위변조하는 것)
- `R`: Repudiation(나의 행동을 부인하는 것)
- `I`: Information Disclosure(정보를 유출하는 것)
- `D`: Denial of Service(서비스를 방해하는 것)
- `E`: Elevation of Privilege(권한을 상승시키는 것)

`STRIDE` 기법은 `Authenticity`, `Integrity`, `Non-repudiation`, `Confidentiality`, `Availability`, `Authorization`와 ***반대대는 개념이다.***

시스템의 `DFD`를 보고 각 구간마다 어떤 공격을 수행할 수 있는지 ***공격자의 관점에서 보게 된다.*** `Attack Library`를 참조하면서 어떤 공격을 수행할 수 있는지 찾아낸다. 공격자의 관점에서 시스템을 분석하는 것이 `위협(Threats)`을 도출하는데 훨씬 효율적이다.

<br/>

#### STRIDE-per-Element

<img src="../images/security-engineering-4-threat-risk-modeling-4.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

각 `Element`별로 수행가능한 공격 위협들을 분석하는 방법이다.

- 분석이 더 빠름
- 결과가 더욱 정확함
- 사용하기 더 어려움

#### STRIDE-per-Interaction

`Trust Boundary`를 넘나드는 데이터를 대상으로 공격 위협을 도출하는 방법이다.

- 분석이 더 오래 걸림
- 결과의 오류가 더 많음
- 사용하기 훨씬 쉬움

> Note:  
`Threat Modeling`을 하기 위해서는 타겟 시스템에 대해서 소스코드 레벨까지 완전히 알고 있어야 `DFD`를 제대로 그릴 수 있다.

<br/>

### 4) Where to Start and End With

<img src="../images/security-engineering-4-threat-risk-modeling-4.4.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### 5) MS’s Threat Modeling Tool

<img src="../images/security-engineering-4-threat-risk-modeling-4.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-4-threat-risk-modeling-4.5.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

### 6) Attack Tree

`DFD`를 그리고 `Attack Library`를 참조해 `STRIDE 기법`으로 모든 공격 위협들이 도출되었으면, `Attack Tree`를 사용하여 공격 시나리오를 체계적으로 도출하여 `위험도(Risks)`를 산정한다. 
최상위 `Root 노드`가 공격자가 달성하고자 하는 `목표(goal)`이다.

`Attack Tree`는 `Bruce Schneier`에 의해 만들어졌다.

> Note:  
`Bruce Schneier`는 "Security is a process, not a product."라는 말을 남겼다. 보안이라는 것은 제품 한 두개를 사서 설치한다고 안전해지는 것이 아니고, 관련된 모든 프로세스가 안전해야 제대로 된 보안을 할 수 있다는 의미이다.

<img src="../images/security-engineering-4-threat-risk-modeling-4.6.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

<br/>

<img src="../images/security-engineering-4-threat-risk-modeling-4.6.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

## 5. Rank Threats

### 1) DREAD Risk Analysis Model

- `D`: Damage → 공격에 의해 얼마나 피해를 입을 것인가?
- `R`: Reproducibility → 얼마나 공격을 재현하기 쉬운가(자주 발생하는가)? e.g. 만약 특정 시간에만 공격이 가능하다면 위험도가 낮아짐. 만약 아무때나 공격이 가능하다면 위험도가 3이다.
- `E`: Exploitability → 해당 취약점을 이용해서 실제 공격하기 얼마나 쉬운가?
- `A`: Affected users → 얼마나 많은 사람들이 영향을 받을 것인가?
- `D`: Discoverability → 얼마나 취약점을 발견하기 쉬운가?

<img src="../images/security-engineering-4-threat-risk-modeling-5.1.1.1.png?raw=true" alt="drawing" width="596"/>

<br/>

<img src="../images/security-engineering-4-threat-risk-modeling-5.1.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`Replay Attack`이 `Sniff Password` 공격방법보다 사용하기 좀 더 어렵다. 왜냐하면 단순 스니핑 보다는 좀 더 통신 프로토콜에 대한 이해와 데이터가 항상 일정하게 전달되는지 확인하는 것이 스니핑을 위해 암호화되었는지를 발견하는 것이 더욱 어렵다. 따라서 15점을 받은  `Sniff Password` 공격방법이 더욱 위험하다.

`DREAD Risk Analysis`을 할 때 중요한 것은 한 사람이 일관성 있게 분석하는 것이 중요하다. 따라서 한 사람이 일관성 있게 분석하여 절대적인 점수보다는 공격 위협들 간에 상대적인 위험도를 분석하여 우선순위를 결정하는 것이 중요하다.

그 다음 ***가장 시급하게 해결해야 할 위협부터 처리해야 한다.*** 왜냐하면 현실에서는 예산과 시간이 한정되어 있기 때문이다. 위험도를 분석하여 반드시 줄여야하는 위험은 줄이고 감수할 수 있는 위험은 감수하여 리스크 관리를 해야 한다.

<br/>

### 2) Risk Assessment

<img src="../images/security-engineering-4-threat-risk-modeling-5.2.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

점수를 High(3), Medium(2), Low(1)로 분석하는 것은 너무 부정확해보이지만 이러한 `정성적 분석` 방법은 많은 사람들이 사용할 수 있다. 반면 `정량적 분석` 방법은 더욱 정확할 수 있지만 기본적으로 수학적인 공식이 기반되어야 하기 때문에 많은 전문 지식이 필요하다. 또한 `정량적 분석` 방법은 모든 시스템을 수학적으로 분석하기 어렵다. 따라서 적용분야가 아직까지는 많이 제한적이다. 따라서 실제 현장에서는 더욱 적용하기 쉬운 `정성적 분석` 방법을 많이 사용한다.

하지만 이제는 `DREAD` 기법은 2010년 이후로는 마이크로소프트에서 더 이상 사용하지 않는데, 그 이유는 ***사용하는 사람마다 다른 위험 분석 결과가 나타나서*** 사용하지 않게 되었다. 따라서 이제는 위험도를 분석해 놓은 ***데이터베이스를 구축하여 일관성 있게 위험도를 분석하고 있다.***

<br/>

## 6. LINDDUN Model

### 1) LINDDUN Model

<img src="../images/security-engineering-4-threat-risk-modeling-6.1.1.1.png?raw=true" alt="drawing" width="720"/>

`STRIDE` 기법은 마이크로소프트에서 만든 것인 만큼 `클라이언트-서버 구조`에서 가장 특화된 기법이다. 

`STRIDE` 기법은 `보안(security)`에 초점을 맞춘 반면에, `LINDDUN` 기법은 `프라이버시(privacy)`에 초점을 맞춰 만든 것이다.

<br/>

### 2) LINDDUN Model

`LINDDUN` 기법(공격자 관점)

- `Linkability`
- `Identifiability`
- `Non-repudiation`
- `Detectability`
- `Disclosure of Information`
- `Content Unawareness`
- `Policy and Consent Noncompliance`

<br/>

`LINDDUN` 기법에 상반되는 개념(방어자 관점)

- `Unlinkability`: 어떤 두 트랜잭션이 발생했을 때 두 개가 모두 동일인물이 생성한 트랜잭션인지 알 수 없게 하는 것
- `Anonymity & Pseudonymity`: 익명성, 가명성 → 가명성은 깨질 수도 있음. 익명성은 아예 신원을 노출시키지 않아 더욱 강력함
- `Plausible Deniability`
- `Undetectability & Unobservability`
- `Confidentiality`
- `Content Awareness`
- `Policy and Consent Compliance`

### 3) LINDDDUN Methodology Step

<br/>

<img src="../images/security-engineering-4-threat-risk-modeling-6.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-4-threat-risk-modeling-6.3.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

## 7. Responses to Risk

### 1) Risk Mitigation

모든 위협을 도출하고 위험도를 분석한 이후에는 해결책을 도출해야 한다.

<img src="../images/security-engineering-4-threat-risk-modeling-7.1.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

- `Avoid`: 위험 회피 (`Risk Avoidance`)
- `Transfer`: 위험 전이 (`Risk Transfer`)
- `Mitigate`: 위험 축소(엔지니어들이 일반적인 보안 대책 적용) (`Risk Reduction`)
- `Accept`: 위험 감수 (`Risk Retention`)

일반적인 엔지니어들은 대부분 `Risk Mitigation(Reduction)` 방법만 생각하는 경우가 많은데, 4가지 방법을 다양하게 전략적으로 구상할 수 있어야 한다. 

`Risk Acceptance(Retention)` 방법을 사용했을 때, 해커의 공격방법이 진화함에 따라 위험도는 계속 증가할 수 있다. 이렇게 아직 남아 있는 위험을 `잔여 위험(Residual Risk)`이라고 한다. 잔여위험은 시간이 지날 수록 계속 증가하기 때문에 계속해서 모니터링하면서 어떤 한계치를 넘어가면 조치를 취해야 한다.

<br/>

### 2) Risk Management

위험 관리 대책을 결정하기 위한 가장 쉬운 방법은 `비용(expenditure)`대비 효과를 계산하는 것이다. 4가지 방법에 대한 필요한 비용과 효과를 계산한다. 하지만 이 때 중요한 것은 4가지 방법에 대한 ***비용대비 효과를 정확하게 계산할 수 있어야 한다는 점이다.*** 이것을 `보안 경제학(security economics)`이라고 한다.

<br/>

### 3) Iterate

`Risk Management`까지 완료했다고 해서 끝나는 것이 아니고, 해당 위험 대책을 적용한 후에는 ***처음으로 돌아가서 새롭게 변경된 `DFD`의 분석과 `Threat Risk Modeling`부터 다시 해야한다.*** 이러한 과정을 `반복(iterate)`해야 한다.

반복을 해야 하는 이유는 위험 대책을 위해 새로운 기능이 추가되면 이것이 새로운 문제를 발생시킬 수 있기 때문이다. 이 전체 과정을 반복하여 더 이상 새로운 위협이 발생하지 않을 때까지 반복해야 한다.

<br/>

## 8. Summary

<img src="../images/security-engineering-4-threat-risk-modeling-8.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

## 9. Case Studies 

### 1) enisa

<img src="../images/security-engineering-4-threat-risk-modeling-9.1.1.1.png?raw=true" alt="drawing" width="320"/>

<br/>

유럽의 `enisa`에서 만든 Appstore 보안 가이드라인
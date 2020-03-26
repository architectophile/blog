# Syllabus of Security Engineering

<br/>

## 1.1. 보안공학(Security Engineering)이란?


### Cryptology

Cryptography + Cryptanalysis

<br/>

### Cryptography

암호 장비를 만드는 것(development)과 관련한 학문

Security Engineer: 보안 제품을 개발하는 직업

비슷한 직업들: Information Assurance Engineer, Information Security Engineer, Information System Security Engineer

<br/>

### Cryptanalysis

암호 장비를 해독하는 것(breaking)과 관련한 학문

Security Analyst: 취약점 분석, 모의 해킹을 하는 직업

<br/>

> 모의해킹을 통해 취약점을 찾아낼 수 있다. 하지만 보안 취약점을 발견하지 못했다는 것이 제품의 보안 취약점이 없다는 것을 의미하는 것은 아니다. 그것은 단지 모의해킹 팀이 보안 취약점을 발견하지 못했음을 나타낼 뿐이다.  
따라서 우리는 `보안공학`, `SDL(Security Development Lifecycle)`과 같은 엄격한 개발 프로세스가 필요하다. 

<br/>

보안공학이란?
- `Security Engineer`를 양성하고 교육하기 위한 학문
- 개발 프로세스를 어떻게 관리해야 안전한 제품을 만들 수 있는가를 연구하는 학문
- 머릿속에 있는 보안 요구사항을 분석하고 설계하고 만드는데까지 수학적으로 잘 정의된 보안 프로세스를 만드는 것
- 보안 소프트웨어의 생명주기 전반에 적용되는 체계적인 개발 프레임워크
- 보안 내재화(Security by Design)를 하는 것


대표적인 보안공학을 잘 적용하는 미국의 기업들: Microsoft, IBM 등


예를 들어 삼성전자에서 갤럭시 핸드폰을 만들더라도 그 안에 들어가는 어플리케이션을 삼성전자에서 모두 컨트롤할 수 없기 때문에 삼성에서는 폰을 만들 때 모든 어플리케이션이 최신의 안전한 버전으로 업데이트되었다고 조건을 전제로 제품을 만들게 된다. 하지만 출시 전에 해당 전제 조건이 맞지 않아서 문제를 일으키는 경우가 있다.
따라서 보안공학을 잘 적용하여 제품을 만들었다고 하더라도 모의해킹이나 취약점 분석도 함께 필요하다.

`David Elliott Bell`

Tiger Teams의 모의해킹을 통해 보안성을 높이려고 했지만 한계가 있었다.  
1970년대 중반까지는 모의해킹하고 취약점을 패치하는 것을 반복하는 ***\"Penetrate and Patch\"*** 시대였다.

<br/>

## 1.2. 보안공학 현황

2011년 미국 국방부가 1989년에 나온 보안공학 표준을 업그레이드 함

***2016년*** NIST SP 800-160 Systems Security Engineering, 연방정부 표준이 만들어짐

보통 보안 제품은 군에서 먼저 개발 -> 연방정부 표준 -> ISO 국제표준 -> 미국 업체가 시장 장악

따라서 NIST 연방정부 표준은 곧 ISO 표준으로 확대될 것이다.


SDL(Security Development Lifecycle)

보안공학 프로세스를 실제로 도입하기 시작한 기업은 `Microsoft`와 `IBM`

SDL은 MS가 만든 보안공학의 산업표준 버전이라 볼 수 있음

2002년 빌게이츠 회장이 MS 전 직원에게 Trustworthy Computing에 대한 이메일을 보냄.
이 이메일을 보내기 얼마 전에 전 세계에 바이러스가 퍼져 윈도우 운영체제를 공격함.
전 직원에게 Trustworthy 제품을 만들기 위해 함께 노력할 것을 얘기함. 
Trustworthy: Secure, Available, and Reliable

2004년 SDL(Security Development Lifecycle)을 모든 제품에 적용하여 개발하기로 결정

최초의 SDL이 적용된 MS의 운영체제는 바로 `Windows Vista`

SDL을 적용한 Windows Vista에서 보안 취약점이 현저하게 줄어듦

MS 홈페이지에 가면 SDL에 관련된 자료를 공유함


2015년 클리스 발라섹 찰리 밀러

Wired 방송사에서 해킹 공개 시연

크라이슬러사의 최로키 자동차를 공개 해킹에 성공

원격으로 자동차를 마음대로 조작하는 것을 시연

해킹으로 인해 차량이 리콜된 최초의 사례임


UNECE에서 ISO 21434 표준을 만들었는데, 자동차를 개발할 때 반드시 `보안공학`을 적용할 것을 요구함. 따라서 보안공학이 적용되어 개발되지 않은 자동차는 유럽에 수출할 수 없음.


2018년 10월 Volvo에서 발표한 자료에 따르면 자동차 개발 프로세스에 이미 보안공학을 적용하였음을 보여줌.


2015년 4월 국방부는 사이버 전략(Cyber Strategy)을 발표함.

무기 체계에 사이버 보안성을 향상시킬 것을 발표


2019년 4월에 Risk Management Framework for Army Information Technology
RFM는 정보보호 개념과 위험관리 개념을 결합한 것 -> 즉 기존의 무기 개발 프로세스에 보안공학이 접목된 것

Platform IT: F-35 전투기나 미사일 등

non-Platform IT: 군의 일반적인 전산 시스템

이미 국방부는 non-Platform IT(전산 시스템)에는 보안공학을 적용해 왔지만 2019년 RFM 발표 이후에 무기 체계에도 보안공학을 적용하기 시작함


미국 국방부 자료

non-Platform IT
- MT 1 - 클라우드
- MT 2 - 군 전산 시스템


기존에는 MT 1, MT 2에 보안공학 프로세스를 적용해왔음

2019년 RMF 발표 이후에는 MT 3, MT 4 Platform IT에도 보안공학을 적용하기 시작함


Lockheed Martin은 무기 체계 개발 프로세스에 보안공학을 적용하는 방법론을 만들어냈음.  


미 국방부는 F-35 전투기를 운용하는 동맹국들(우리나라를 포함) 중 한 곳이라도 보안이 뚫리면 나머지 F-35 전투기에도 영향을 끼치므로 F-35를 운용하는 모든 국가들은 미국에서 적용하는 동일한 수준의 보안공학을 적용하라는 요구를 함

<br/>

## 1.3. Security Engineering Process Overview

Security Engineering Process

- Engineering Process: 보안 제품 개발과 관련된 프로세스

- Assuarnce Process: 

- Risk Process: 

<br/>

Requirements(Security Policy)
- What? 어떤 것을 만들 것인가?
- 요구사항 자체를 도출하는 것이 어려움 

Mechanism
- How?
- 어떻게 구현할 것인가?

<br/>

#### Assuarnce Process

1. Policy Assuarnce: 요구사항(requirements)을 100% 제대로 도출되었는지 수학적으로 증명하는 것
2. Design Assuarnce: 요구사항이 충족되도록 설계가 제대로 되었는가를 수학적으로 증명
3. Implementation Assurance: 보안 하드웨어나 소프트웨어가 설계대로 100% 구현되었는지를 수학적으로 증명
4. Operational Assuarance: 제품을 운영 중에 중간에 새롭게 패치가 업데이트되어도 기존 요구사항이 계속 유지되는 것을 수학적으로 증명

1~4를 모두 만족할 경우 Chain of Evidence가 확보되었다고 말함
End-to-End Provable Security


1~4 단계는 이전 단계가 완벽하게 증명되지 않으면 다음 단계로 넘어갈 수 없음
***따라서 각 단계에서 문제를 조기에 발견하는 것이 가능***

현실에서는 이전 단계를 꼼꼼하게 점검하지 않고 배포했을 경우 나중에 업데이트를 해야 하는 경우가 많음
특히 하드웨어는 설계 자체에 결함이 있을 경우 업데이트를 할 수 없으므로 매우 치명적임(e.g. 인텔 cpu 설계 결함으로 인해 스펙터, 멜트 다운 공격 발생)


<br/>

#### Risk Process

위험관리(Risk Management)란?

체크리스트 기반 평가 방법을 사용하면 10%를 달성하거나 90%를 달성하거나 둘 다 요구사항에 대해 탈락임


위험관리 방법에서는 아직 요구사항을 완벽하게 만족하지 않더라도 위험을 감수할만 하다고 판단하면 우선은 통과시키고 나중에 좀 더 요구사항을 완성시키는 것

특히 천문학적인 비용이 들어가는 프로젝트(e.g. 전투기 개발)에서는 체크리스트 기반 평가보다는 위험관리 방식으로 평가하는 것이 합리적임

하지만 요구사항 만족도에 대한 정확한 정량적 평가가 필요하므로 더욱 어려운 방법임


Software Testing
- 일반적인 소프트웨어 테스트
- 하지만 모든 경우의 수를 모두 테스트할 수는 없음
- 테스팅 커버리지의 한계가 있음

Software Verification
- software가 정말로 안전한지 수학적으로 증명하는 학문
- 예전에는 실현 불가능한 이론적인 내용으로만 생각했지만 현재는 컴퓨팅 파워가 증가하여 어느정도 수학적으로 증명하는 것이 가능해짐


국제공통 평가 기준(Common Criteria)
- 제품이 보안공학 개발 프로세스대로 만들어졌는지를 평가하는 기준


















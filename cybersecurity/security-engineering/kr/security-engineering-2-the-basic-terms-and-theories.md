# The Basic Terms & Theories

<br/>

## 2.1. Trustworthy란 무엇인가?

보안공학이란 안전한 제품을 개발하는 것과 관련된 학문

좀 더 정확하게는 보안공학은 `Trustworthy`한 제품을 개발하고, 검수하고, 운영하는 방법론에 대한 학문

명확한 용어 정의가 중요하다.

<br/>

## 2.2. Information Securtiy vs. Cybersecurity

Paradigm Shifts in Security

- Physical Security Era
- Communication Security (COMSEC) Era
- Computer Security (COMPUSEC) Era (1960년대~)
- Information Security (INFOSEC) Era (1980s년대~)
- Information Assuarance (IA) Era (1998년~)
- Cybersecurity Era (2014년~)


1998년 이전에는 Secure한 제품을 만드는 것에 집중

1998년 이후부터는 `Trustworthy`한 제품을 만드는 것으로 변화
1998년 이후부터 보안에 대한 패러다임의 큰 변화 발생


### Information Security (INFOSEC) : 정보보안

주로 전자 정보(electronic information)가 보호됨

<br/>

### Information Assuarance (IA) : 정보보증

전자 정보 뿐만 아니라 종이 데이터도 보호대상이됨
특히 `trustworthy`하게 하는 것을 강조

<br/>

### Cybersecurity

사이버 공간과 관련된 모든 것을 보호함
SNS 메신저를 이용한 사이버 왕따(cyber bullying) 등도 보호 대상이 됨(IS, IA에서는 보호대상이 아니었음)
따라서 사이버 왕따로 인한 사람의 심리도 보호함
가짜 뉴스도 보호 대상이 됨(IS, IA에서는 보호대상이 아니었음)

available, reliable, and secure

- S/W and H/W based
- Technical and non-Technical
- based on information from NSA, DoD, DISA, and DoN

<br/>

### Cyber Defense: 사이버 국방
Cybersecurity + Strategy(전략 전술)

<br/>

"From information security to cyber security" 논문에서 용어의 정의를 정확하게 정리

<br/>

1991년 걸프전(Gulf War) (1990.8.2 ~ 1991.2.28)

전쟁이 CNN을 통해서 생중계됨

최초의 정보전(the first information war)으로 불린다.

항고모함에서 무인폭격기 무인미사일 발사

타겟의 위치 정보를 정확하고 빠르게 입수하는 것이 중요 -> 미군은 정보의 중요성을 깨달음

Information Assuarnce의 Harbinger


걸프전을 통해 미군이 느낀 것은 통신 장비가 해킹되는 것보다는 모래 폭풍(dust strom)과 같은 악조건 속에서도 안정적으로 통신되는 것이 중요하다.

-> Information Assuarnce 개념 등장
내가 원하는 정보는 해킹에 의해서건 자연재해에 의해서건 훼손되지 않고 신뢰할 수 있어야 하고 안정적으로 언제든지 접근할 수 있어야 한다.

좀 더 정확하게 얘기하면 Informatino Assuarnce가 제공하는 것은
- Quality(against `accidental failrues`) : 사람의 실수나 자연재해로 인한 오류를 줄이는 것
- Security(against `intentional failures`) : 해커가 의도적으로 정보를 훼손하는 것을 방지하는 것
Quality + Security -> Trustworthy(or Dependable)

따라서 보안공학은 Quality와 Security를 제공하는 제품을 개발하기 위한 방법론에 대한 학문


- reliability : 코드의 버그가 없는 것
- safety : 버그가 있을 경우에 그것이 치명적인 피해로 이어지지 않도록 하는 것

예전에는 reliable and safe한 제품을 만드는데 집중(e.g. 로켓이나 자동차 개발)

하지만 2015년 크라이슬러 해킹 시연 후에 security에 대한 요구 발생

Information Assuarnce 정책이 펼쳐지면서 이전에는 서로 다른 분야였던 Quality 분야와 Security 분야가 융합됨


좀 더 정확하게 `Trustworthy`하다는 것은 다음 4가지를 만족
- Availabiilty (가용성) : 원할 때 언제든지 접근 가능
- Reliablity (안정성) : 버그가 없어야 함
- Safety (안전성) : 버그가 있을 경우에도 치명적인 피해로 이어지지 않도록 함
- Security (보안성) : 의도적인 해커의 공격에 대해 보호하는 것


하지만 Trustworthiness를 제공하는 것은 쉽지 않다.

e = mc2

error = (more code)2 또는 (more connected)2

위의 4가지 특성은 서로 연관되어 있다. 특히 자원이 제한된 임베디드 시스템에서는 security를 위해 코드를 증가시키면 복잡도가 높아져 안정성 등이 떨어질 수 있다.

따라서 최초 요구사항 도출 단계부터 잘 정리하고 정의해서 4개의 특성을 모두 만족할 수 있도록 최척화된 요구사항 분석 및 설계가 필요하다. Security 부분을 나중에 추가하게되면 복잡도가 너무 높아진다. 따라서 설계 단계부터 Security를 나머지 3가지 특성과 함께 고려하여 요구사항을 분석해야 한다.

-> Security by Design(보안 내재화) : 보안과 더불아 나머지 3가지 요소를 요구사항 분석, 설계 단계부터 고려하여 ***복잡도(complexity)를 최소화 하라는 의미이다.***

e.g. 카카오뱅크 어플리케이션은 고성능의 보안 프로그램을 운영하면서도 단순한 이유는 최초 요구사항 분석 및 설계 단계부터 3가지 특성과 함께 Security를 함께 고려하여 만들었기 때문에 복잡도가 매우 낮다.

<br/>

## Cybersecurity

4차 산업혁명 시대에는 초연결 시대가 될 것이다. 모든 것이 연결될 수 있다. 많은 장비들이 임베디드 형태로 운영될 것이다. 임베디드 시스템은 나중에 업데이트 하기 어려우므로 초기 설계부터 안전하게 설계되어야 한다.

HACKING UK TRIDENT : 핵잠수함 해킹

군에 있던 사람들이 하던 생각 :

"The isolated 'air-gapped' systems cannot be penetrated."

하지만 이것은 사실이 아닌 것으로 밝혀졌다. 제조 공정 단계에서 또는 중간 업데이트 과정에서 해킹이 가능했다. 따라서 망분리되어 있다고 해서 안전한 것이 아니다.


UNECE (유엔 유럽경제위원회)

차량 제조사는 Cyber Security Management System을 운영하여 자동차를 제조해야 한다.

미국의 F-35 스텔스 전투기 검수 보고서에 `Cybersecurity Testing`을 통과하도록 요구한다.

<br/>

### Trusted vs. Trustworthy

- Trusted : 그 기관은 신뢰할 수 있다고 가정함. 실제 신뢰할 수 있는지는 입증되지 않음(e.g. 수사당국은 trusted 해야 한다. TPM(Trusted Platform Module) 보안칩은 정말 신롸할 수 있는지는 알 수 없음)
- Trustworthy : 실제 secure, reliable, safe하여 신뢰할 수 있다고 수학적으로 증명됨(만약 Trustworthy Platform Module이라고 써있다면 실제 수학적으로 안전하다는 것이 증명된 보안칩이다.)

따라서 보안공학에서 추구하는 것은 `Trustworthy`이다.






















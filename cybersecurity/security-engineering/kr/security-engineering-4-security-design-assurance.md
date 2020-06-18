# Security Design Assurance

## 1. Cryptography & Design Assurance

### Why Design Assurance?

MS는 많은 취약점들이 요구사항 분석 단계와 설계 단계에서 나온다고 판단하였다.

`SDL`을 하는 목적은 `보안 내재화(security by design)`를 하기 위한 것이다. 하지만 
우리나라의 보안공학은 `secure coding`에만 치중되어 있다. 따라서 코딩레벨에서부터 SDL이 시작되므로 정확한 SDL이 아니다.
 
`설계(design) 오류`의 중요성을 얘기할 때 `Needham-Schroeder public-key authentication protocol (1978)`을 많이 얘기한다. ***`Gavin Lowe`가 이 프로토콜에 `설계에 오류`가 있다는 것을 17년 뒤인 1995년에 발견하였다.***

`Key Reinstallation Attacks: Forcing Nonce Reuse WPA2` 논문도 `WPA2` 프로토콜의 `설계 오류`를 발견하였다.

<br/>

### [Note] Black Hat EU 2017

`By-design Backdooring of Encryption System-Can We Trust Foreign Encryption Algorithms` 논문은 설계도 상에도 백도어를 넣을 수 있다는 것을 보여준다.

`Operational Cryptology and Virology Lab`에서 발표하였다.

`Adam L. Young`과 `Moti Yung`은 주로 `Malicious Cryptography: Exposing Cryptovirology`를 연구하였는데, 이것은 어떻게 하면 암호 알고리즘 레벨에서 백도어를 넣을지 연구하는 것이다. `Cryptovirology`는 암호 알고즘에 백도어를 숨겨서 마치 바이러스처럼 백도어를 전파시키는 것을 연구한다.

<br/>

### [Note] No Where To Hide

`Edward Snowden`은 `the guardian`지에 `NSA`에서 운영하는 `PRISM` 프로그램을 이용하여 민간인을 사찰할 수 있다는 것을 폭로한다.

`NSA`에서 AOL, Apple, Facebook, Google, Microsoft, Paltalk, Skype, Yahoo, and YouTube의 협조를 얻어서 각 회사에 일종의 검색엔진을 설치하였다. 이 검색엔진을 통해서 사람들의 다양한 정보를 볼 수 있다는 것을 폭로하였다.

<br/>

### [Note] NSA's PRISM

<img src="../images/security-engineering-6-security-design-assurance-1.0.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### [Note] NSA's BULLRUN

<img src="../images/security-engineering-6-security-design-assurance-1.0.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`불런(BULLRUN)`은 암호화된 메시지를 해독하기 위한 프로젝트이다. 하드웨어 장치에 백도어를 넣으면 그 장치를 쓰지 않으면 그만이다. 하지만 알고리즘 자체에 백도어를 넣고 해당 알고리즘을 표준으로 지정하면 해당 알고리즘을 사용하는 모든 장치에 자동으로 백도어가 설치된다.

<br/>

### [Note] 타원곡선암호(Elliptic Curve Crypto)

<img src="../images/security-engineering-6-security-design-assurance-1.0.3.1.png?raw=true" alt="drawing" width="640"/>

<br/>

타원곡선암호는 키길이가 짧아서 처리 속도가 RSA보다 훨씬 빠르다.

<br/>

### [Note] DUAL_EC_DRBG - The Beginning

<img src="../images/security-engineering-6-security-design-assurance-1.0.4.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.0.4.2.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.0.4.3.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.0.4.4.png?raw=true" alt="drawing" width="640"/>

<br/>

`NSA`가 만든 `타원곡선(EC)`의 파라미터에 `백도어`가 숨겨져 있었다. 

타원곡선을 이용한 난수발생기인 `DUAL_EC_DRBG`에는 원리를 알 수 없는 알고리즘이 들어있었다. `NSA`가 타원곡선 표준을 제정할 때 특정 타원곡선을 넣자고하여 표준으로 제정되었다. 2007년에 `Bruce Schneier`가 혹시 `NSA`가 `백도어(backdoor)`를 삽입하려는 것인가하는 의문을 제기하였다. 그리고 나중에 `Edward Snowden`이 폭로한 이후에 `BULLRUN` 프로젝트가 알려졌고 실제로 알고리즘 상에 백도어를 넣은 것이 밝혀진다. ***2015년에 `NSA`에서 알고리즘에 `백도어(backdoor)`를 넣은 사실을 인정하고 사과하였다.***

그 만큼 시스템 설계의 안전성을 증명하는 것은 매우 어렵다.

<br/>

### [Note] DES

DES 알고리즘의 대부분의 substitution과 permutation의 원리를 알 수 있었지만 몇 가지는 이유를 찾아내지 못했다. DES 알고리즘이 나온 후 약 10년 후에 차분해독법이 나오게 된다. DES를 모방해서 만든 다른 알고리듬들은 차분해독법에 깨졌지만 DES만 깨지지 않았다. ***DES를 설계한 사람들은 이미 `차분해독법`을 알고 있었다.***

<br/>

### 1) Emphasis of Modern Cryptography

현대 암호학은 엄밀한 정의(definitions)와, 정확한 전제조건(assumptions), 엄밀한 보안 증명(proofs)을 바탕으로 한다.

<br/>

### 2) Protocol Design Verification Steps

<img src="../images/security-engineering-6-security-design-assurance-1.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Assumption Building`: 기본 전제조건 설정
- `Attacker Modeling`: `Threat Modeling`할 때 생각했던 공격자를 수학적 기호로 표현한 것
- `Security Policy Modeling`: `Security Requirements`를 `정형화 명세(Formal Specification)`로 표현하는 것
- `Design Assurance Verification`: 내가 만든 알고리즘이나 프로토콜 설계가 `Attacker Model` 조건 하에 `Security Policy Model`을 충족하는지 증명하는 것(`Symbolic Method`, `Computational Method`)
  - `Symbolic Method`: 자동화가 쉬움, 증명의 정밀도(assurance)가 낮음.
  - `Computational Method`: 증명의 정밀도(assurance)는 올라감. 자동화는 어려움. 하지만 이제는 도구의 수준이 높아져서 어느 정도 자동화가 가능해졌음.

우리가 설계한 알고리즘이 `Security Requirements`를 만족하는지 증명하기 위해서는 `공격자(Attacker)`를 수학적으로 정형화해야 한다. 따라서 `Attacker Modeling`을 통해서 증명하는 것을 `Design Assurance`라고 한다. 이 방법에는 크게 `Symbolic Method`와 `Computational Method`이다. 마지막으로 `Design Assurance` 이후에 실제 설계대로 구현(코딩)을 한 이후에 실제 구현이 설계된 대로 만들어졌는지를 증명하는 것을 `Code Assurance`라고 한다.


우리가 어떤 실제 제품(real world)를 분석할 때, 실제 대상을 `DFD` 등으로 모델링을 한다. 왜냐하면 실제 타겟을 그대로 하면 쓸데없는 정보가 너무 많아서 효율성이 떨어진다. 따라서 반드시 필요한 정보를 바탕으로 모델링하는 것이 중요하다.

우리가 어떤 알고리즘이나 프로토콜을 구현(implement)할 때는 표준문서(standard)를 놓고 구현한다. 따라서 해당 표준 문서가 `SPM`을 충족하는지 증명해야 한다.

하지만 표준문서를 놓고 `SPM`를 충족하는지 증명하는 것은 매우 어렵다. e.g. `RFC2246(SSL)` 문서는 80페이지가 되는데, 이 중에서 필요한 정보만 뽑아서 모델링하면 매우 양이 줄어든다. 표준문서는 양이 많아지는 이유는 프로토콜에서 암호의 비트수 등을 모두 적어놓기 때문에 양이 많아진다. 이렇게 ***표준문서에서 쓸데없는 정보는 빼고 증명에 필요한 핵심 정보만 추출한 것을 `Algorithm/Protocol Model`이라고 한다.***

<br/>

### 3) Standard, Model, Implementation

- `Protocol Model`: 프로토콜 표준 문서에서 코어 메시지만 추려낸 것

<br/>

### 4) Models of Security Protocol Verification

#### (1) Symbolic Model(Dolev-Yao Model)

#### (2) Computational Model

<br/>

### 5) Symbolic Method(Dolev-Yao Model)

#### (1) Basic Operations:

<img src="../images/security-engineering-6-security-design-assurance-1.5.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`Dolev-Yao Model`에서 암호화 복호화를 할 때 어떤 알고리즘을 사용하는지는 고려하지 않는다. 이것이 `symbolic method`가 정밀도가 떨어지는 이유 중의 하나이다.

<br/>

#### (2) Rules:

<img src="../images/security-engineering-6-security-design-assurance-1.5.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (3) Examples:

<img src="../images/security-engineering-6-security-design-assurance-1.5.3.1.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.5.3.2.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (4) Formal Execution Model

<img src="../images/security-engineering-6-security-design-assurance-1.5.4.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`Dolev`, `Yao`는 실제로 각 오퍼레이션을 기호로 표현하여 자동화하면 어느 정도 단순한 프로토콜은 문제를 발견할 수 있다는 것을 밝혀냈다. e.g. replay attack 등을 찾아낼 수 있었다. 하지만 좀 더 복잡한 문제들은 자동화하기 어렵다고 생각했다. 따라서 더욱 정확하게 분석하려면 `Computational Method`를 사용하여 손으로 직접 증명해야 한다고 생각했다.

<br/>

#### (5) Machine-Assisted Verification

<img src="../images/security-engineering-6-security-design-assurance-1.5.5.1.png?raw=true" alt="drawing" width="520"/>

<br/>

컴퓨터를 이용해 메시지 M을 만들 수 있는 다양한 조합을 만들어내고, 그 중에서 원래 프로토콜에서 사용되는 메시지가 들어가는 것을 찾아낸다.

위 그림에서 원래 프로토콜 메시지인 빨간 부분이 나오면, 나머지 연산을 조합하여 메시지 M을 만들어낼 수 있다.

<br/>

### 6) Computational Method

<img src="../images/security-engineering-6-security-design-assurance-1.6.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

1980년대에 Goldwasser, Micali, Rivest가 제안하였다. `Computational Method` 기법은 ***`정밀도`는 매우 높지만*** 아직도 여전히 많은 것을 `수작업(manual)`으로 해야한다.

<br/>

#### (1) DP-3T

Decentralized Privacy-Preserving Proximity Tracing(DP-3T) 프로토콜을 `자동화 도구`를 이용하여 증명하였다.

<br/>

#### (2) Pedersen Commitment Scheme

<img src="../images/security-engineering-6-security-design-assurance-1.6.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

`Pedersen Commitment Scheme`은 모네로 암호화폐에서 사용한다. 송금액을 감추기 위해서 사용한다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.6.2.2.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.6.2.3.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.6.2.4.png?raw=true" alt="drawing" width="520"/>

<br/>

맨 위에 있는 해당 `설계`가 `Correctness`, `Hiding`, `Binding` 3가지의 `security properties`를 충족하는지 직접 손으로 써서 수학적으로 증명하였었다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.6.2.5.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.6.2.6.png?raw=true" alt="drawing" width="520"/>

<br/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.6.2.7.png?raw=true" alt="drawing" width="520"/>

<br/>

위 그림처럼 `EasyCrypt`라는 `자동화 도구`를 이용해서 `Pedersen Commitment`를 증명할 수도 있다.

<br/>

## 2. Symmetric Ciphers

`Design Assurance`는 대칭키 암호보다는 ***`공개키 암호` 쪽에 더욱 발달되었다.***

<br/>

### 1) SPN

#### (1) Shannon's Proposal

`Shannon`이 `비트(bit)`의 개념을 만들어 `정보의 양`을 측정할 수 있게 되었다. `Shannon`은 어떻게 하면 한정된 대역폭에서 데이터를 많이 보낼 수 있을까 고민하여 데이터 압축을 고민했고, 또한 어떻게 하면 정보를 비밀리에 보낼 수 있는지 고민하였다. 무한대의 컴퓨팅 파워를 가진 공격자에게도 안전한(`Perfect Secure`) 암호시스템을 고민하여 `One-time pad` 시스템을 생각해냈다. `One-time pad` 시스템에서 키의 길이와 메시지의 길이는 같아야 하고, 키는 서로 미리 교환한 난수를 사용해야 하며, 한 번 사용한 키는 재사용하지 않는다. 하지만 `One-time pad` 실생활에서 쓰기에는 실용적이지 않았다(impractical). 따라서 `Perfect Secure`가 아니라 암호를 깨는데 시간이 매우 오래 걸려서 공격의 의미가 없는 `Computational Secure`한 암호를 만들어야 한다고 생각했다. 이를 위해서는 `Confusion` 효과와 `Diffusion` 효과가 필요하다고 생각해냈다.

<img src="../images/security-engineering-6-security-design-assurance-2.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Confusion`: `암호문`과 `키`의 관계를 감춘는 것을 말함. 환자암호(`Substitution` Cipher)
- `Diffusion`: `평문`과 `암호문`의 관계를 감추는 것을 말함. 전치암호(`Permutation` Cipher)

`Feistel` 구조는 블록을 반으로 나눠서 한 쪽에 대해서만 환자암호 전치암호 처리를 한다.

`SPN` 구조는 블록을 반으로 나누지 않고 블록 전체에 대해서 환자암호화 전치암호 처리를 하므로 라운드 수가 적다.

<br/>

## 3. Asymmetric Ciphers

### 1) Ideal Properties of a Proof

<br/>

### 2) Brief History of Provable Security

`Design Assurance`에 대한 연구는 1982년 GM(IND-CPA)에 의해 기초가 정립되어 본격적으로 시작되었다.

<img src="../images/security-engineering-6-security-design-assurance-3.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

설계의 무결성을 수학적으로 증명하는 것은 대칭키암호보다는 공개키암호 분야에서 더욱 발전되어 있다.

<br/>

### 3) [Note] Security Goals & Attacker Models

<img src="../images/security-engineering-6-security-design-assurance-3.3.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

### 4) Symmetric vs. Asymmetric

- `대칭키암호(Symmetric Cipher)`: 암호화 키와 복호화 키가 동일함. secret key
- `공개키암호(Asymmetric Cipher)`: 암호화 키와 복호화 키가 다름. public key, private key

<br/>

### 5) The Origin of PKC

<img src="../images/security-engineering-6-security-design-assurance-3.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`공개키 암호`는 1976년 `Diffie`와 `Hellman`에 의해 개념이 생겨났다. → `New Directions in Cryptography`.

`전자상거래`의 도입으로 인해 민간에서도 암호의 사용이 필요해졌다. 전자상거래에서는 모르는 사람에게 온라인으로 데이터를 전송해야 한다. 암호화키와 복호화키를 다르게 해서 전자상거래에 편리하게 사용할 수 있게 하기 위해 공개키암호가 탄생한다. e.g. 상점주인의 공개키로 암호화해서 카드 비밀정보를 전송한다.

<br/>

### 6) PKC in Formal

<img src="../images/security-engineering-6-security-design-assurance-3.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 7) RSA in a Nutshell

RSA 암호는 1978년 `Rivest`, `Shamir`, `Adleman` 세 사람에 의해 만들어졌다. RSA는 소인수분해 문제가 깨지면 RSA 암호가 깨진다. 하지만 RSA를 해독하는 방법이 소인수분해 문제를 푸는 것 말고도 다양한 방법들이 있다. 이를 보완하기 위해 Textbook RSA에 다양한 방법들을 추가하여 사용한다. 하지만 새로운 RSA 공격 방법이 나올지는 아직 알 수 없다.

<img src="../images/security-engineering-6-security-design-assurance-3.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 그림에서 암호화 시스템은 암호 숫자가 너무 커지고, 역원을 구하기가 쉽기 때문에 안전하지 않다.

<img src="../images/security-engineering-6-security-design-assurance-3.7.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

컴퓨터로 쉽게 계산할 수 없는 `NP문제`를 이용하여 암호 시스템을 안전하게 만들었다.

<img src="../images/security-engineering-6-security-design-assurance-3.7.1.3.png?raw=true" alt="drawing" width="640"/>

<br/>

이전 그림에서 `유클리드 함수(e의 역원 d를 계산하는 함수)`를 적용하여 `RSA` 암호를 완성하였다.

`소수 2개`를 모르는 상태에서 두 값의 곱을 `소인수 분해`를 하는 것은 `NP문제`이므로 매우 오랜 시간이 걸리지만, 반대로 `p × q = N`를 구하는 것은 `P문제`이므로 쉽다. 따라서 키를 생성하고 암호화하는 것은 매우 쉽지만 해킹하기는 매우 시간이 오래걸리므로 안전하다.

<br/>

### 8) OW-CPA Example: Rabin Scheme

<img src="../images/security-engineering-6-security-design-assurance-3.8.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`RSA 암호`는 소인수분해 문제를 풀지 않아도 다른 공격 방법들이 있다. 따라서 문제가 발견될 때마다 계속 RSA 암호를 보완해왔다. 반면에 ***`Rabin 암호 시스템`을 깨기 위한 방법은 오직 소인수분해 문제 밖에 없다는 것이 `수학적으로 증명`되었다.*** 따라서 완성도로 보면 `RSA` 보다 `Rabin` 암호가 훨씬 설계적으로 훌륭하다.

하지만 `RSA`는 최초의 공개키암호라는 상징성 때문에 더욱 널리 쓰이고 있다.

<br/>

### 9) Semantic Security

<img src="../images/security-engineering-6-security-design-assurance-3.9.0.1.png?raw=true" alt="drawing" width="520"/>

<br/>

기존의 `암호해독`의 정의는 매우 애매모호했다. `Goldwasser` 박사는 암호의 `해독`의 정의에 대해서 고민하였다. 평문 전체가 아니라 평문의 일부 정보만 노출되어도 매우 심각한 문제가 발생할 수 있다. 따라서 `Goldwasser` 박사는 해독에 대한 Formal한 정의를 정립했다. ***`Rabin`은 모든 평문이 100% 해독되는 것을 해독이라고 정의하였다.***

하지만 ***`Goldwasser` 박사는 암호문으로부터 평문의 그 어떤 중요 정보도 노출되지 않는 것이 `Secure`하다고 정의하였다.*** 그런데 이렇게 새롭게 정의된 security requirement를 formal하게 정형화명세로 나타내려고 하였더니 `"중요한"` 정보라는 것을 정성적인 개념으로서 수학적으로 정의하기가 불가능했다. 따라서 정형 명세로 바꾸기 위해 더욱 엄밀한 정의로 바꿔서 `암호문으로부터 평문의 한 비트의 정보도 노출되어서는 안 된다`라는 것을 secure한 것으로 정의하였다. 그리고 이것을 `Semantic Security` property로 정의하였다.

따라서 `Rabin`은 암호 시스템의 디자인을 수학적으로 증명하였지만 해독에 대한 정의가 `Goldwasser` 박사와는 달랐다.

<br/>

#### (1) What Is "Nothing Is Learned"?

<img src="../images/security-engineering-6-security-design-assurance-3.9.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

모든 정보를 다 알아내지는 못하더라도 중간 중간 일부 정보를 해독할 수도 있다.

<br/>

#### (2) Semantic Security in Formal

정형 기법에는 `formal specification`과 `formal verification`이 있는데, 어떤 requirement가 있을 때 이것을 정형명세(formal specification)로 바꾸는 것이 훨씬 어렵고, 자동화시키는 도구도 없고, 매우 창조적인 작업이다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.9.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.9.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

위의 그림에서 `passive attacker`가 왼쪽에 보이는 암호문을 갖은 상태에서 공개키와 나머지 기존이 모든 정보를 동원하여 암호문으로부터 얻어낸 정보와 오른쪽 그림의 암호문 없이 공개키와 기존의 모든 정보를 활용하여 얻어낸 정보의 양이 같거나 그 차이가 무시할 수 있을 정도로 매우 작아서 컴퓨터가 이 두 집단이 얻어낸 정보에 대해서 `indistinguishable` 하다면 이 때는 암호문으로부터 어떠한 정보도 노출되지 않는다고 말할 수 있다. 그리고 이것을 `Semantic Security(= Polynomial Security)` property라고 한다.

그리고 이것을 `Computational version of Shannon's perfect secrecy`라고도 한다.

<img src="../images/security-engineering-6-security-design-assurance-3.9.2.3.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Perfect secrecy`: `Shannon`은 passive adversary인 `무한대`(infinite)의 컴퓨팅 파워를 가진 공격자가 해독할 수 없는 암호시스템을 만들 수 있다면 `perfect secrecy`라고 정의하였다. 이것을 만들기는 했지만 비효율적이었다.

- `Semantic security`: 하지만 공개키 알고리즘에서는 공개키가 공개되어 있기 때문에 무한한 컴퓨팅 파워를 가진 공격자는 공개키를 보고 개인키를 찾아낼 수 있다. 따라서 `passive attacker`가 `유한한` 컴퓨팅 파워(polynomially bounded computational resources)를 갖고 있을 때, 평문의 한 비트의 정보도 없을 수 없다면 `semantic security`라고 한다. 따라서 `semantic security`를 `perfect secrecy`의 computational version이라고 부른다.

<br/>

### 10) Polynomial Security (IND-CPA)

- `Polynomial Security`: Can not distinguish 2 ciphertexts(`indistinguishability`)

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.10.0.1.png?raw=true" alt="drawing" width="480"/>

<br/>

위 그림에서 `passive attacker`는 공개키와, 암호문, 메시지 M<sub>0</sub>, M<sub>1</sub>을 주었을 때 어떤 메시지를 암호화한 것인지 알아낸다. 하지만 공개키 암호에서는 공개키가 공개되어 있기 때문에 공격자가 직접 공개키로 암호화를 해보면 쉽게 M<sub>0</sub>, M<sub>1</sub> 둘 중에 어떤 것을 암호화했는지 알 수 있다.

대칭키암호에서는 키와 관련된 정보 자체가 노출되지 않는다. 하지만 공개키암호 시스템에서는 항상 공개키는 누구에게나 노출되어있기 때문에 공격자가 직접 공개키로 암호화해보면 어떤 메시지를 암호화한 것인지 알 수 있다.

이처럼 메시지가 2개 밖에 없는 msg space가 작은 경우에는 쉽게 맞출 수가 있지만 일반적으로 RSA 등에서 사용하는 1024비트 이상의 msg space에서는 현실적으로 어떤 것을 암호화했는지 찾아낼 수 없다.

e.g. 비밀 투표 시스템에서 후보자가 5명 밖에 안 될 때는 5명만 공개키고 암호화해보면 알 수 있기 때문에 공개키 암호시스템은 msg space가 작은 경우에는 안전도가 매우 떨어진다.

<br/>

#### (1) Probabilistic Encryption

<img src="../images/security-engineering-6-security-design-assurance-3.10.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

일반적인 RSA를 쓸 경우에는 동일한 메시지에 대해서 같은 공개키로 암호화하면 동일한 암호문이 생성된다. 따라서 msg space가 작은 경우에는 안전도가 매우 떨어진다.

이를 막기 위해서 `랜덤값`을 메시지에 붙여서 보내주면 동일한 메시지와 동일한 공개키에 대해서 ***매번 랜덤하게 다른 암호문이 생성된다.***

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.10.1.2.png?raw=true" alt="drawing" width="480"/>

<br/>

임의의 메시지 x<sub>0</sub>, x<sub>1</sub> 중에서 랜덤하게 선택하여 공개키로 암호화하고 암호문을 생성하여 공격자에게 주었을 때 x<sub>0</sub>, x<sub>1</sub> 중에서 ***어떤 것을 암호화한 것인지 맞출 확률이 50%라면 이것은 `Polynomial Security property`를 충족한다고 말한다.***

`Shannon`은 박사학위 논문에서 다음과 같이 증명하였다.

`Semantic Security property` -> `Polynomial Security property` 임을 증명하고,

`Polynomial Security property` -> `Semantic Security property`임을 증명한다.

따라서 ***`Semantic Security property`와 `Polynomial Security property`는 `동치`임을 증명한다.***

<br/>

#### (2) Relationships

<img src="../images/security-engineering-6-security-design-assurance-3.10.2.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`Random Padding`을 붙이면 `Polynomial Security(IND-CPA) property`를 만족한다.

`Polynomial Security(IND-CPA) property`와 `Semantic Security property`는 동치이다.

`Semantic Security property`를 만족하면 `CPA 공격(passive attacker)`에 대해서 ***암호문으로부터 한 비트의 정보도 노출되지 않는다.***

<br/>

### 11) Chosen Ciphertext Attack

하지만 기존의 `Goldwasser` 박사가 생각했던 `Semantic Security` 개념은 `CPA 공격`을 하는, 즉 도청만하는 `passive attacker`만 생각했던 개념이다. 이후에 사람들은 `active attacker`가 있을 때도 안전한 암호 시스템 고민하게 되었다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.11.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`IND-CCA1`에서는 암호문을 조작할 수 있는 공격자(active attacker)가 있을 때도 암호문으로부터 평문의 한 비트의 정보도 알아낼 수 없는 것이다. 즉 `active attacker`가 있을 때의 `semantic security`라고 할 수 있다.

<img src="../images/security-engineering-6-security-design-assurance-3.11.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.11.1.3.png?raw=true" alt="drawing" width="640"/>

<br/>

`active attacker`는 실제 메시지 75에 암호화된 메시지에 3의 19승을 곱하여 전달하고, 복호화된 225를 알아낸 다음 3을 나눠보면 원래 메시지가 75임을 알 수 있다.

<br/>

`active attacker`를 막기 위해서는 전자서명을 할 수 있지만 시스템이 너무 무거워진다. MAC을 붙이기 위해서도 키를 공유해야하는 문제가 있다.

***가장 쉬운 방법은 `고정된 형태의 패딩`을 붙이는 것이다.***

<br/>

### 12) Non-Malleability

암호문을 임의로 조작할 수 없어야 한다는 요구사항이다.

<img src="../images/security-engineering-6-security-design-assurance-3.12.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 그림을 입찰 시스템이라고 생각하면, 암호문을 `조작`하여(manipulate) 암호문의 실제 값은 알지 못하더라도 0.9의 19승을 곱함으로써 실제 가격의 10%를 낮출 수 있다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.12.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>
 
기존에는 암호가 `해독`되지 않아야 한다는 요구사항만 있었는데, 여기에 더해 `Non-Malleability`는 암호문의 `조작`까지 불가능해야 한다는 새로운 요구사항 개념이다.

`NM`을 만족하기 위해서는 MAC이나 전자서명을 추가해야 하는 방법을 생각해 볼 수 있다.

<br/>

### 13) How to Make IND/NM-CCA Cipher?

<img src="../images/security-engineering-6-security-design-assurance-3.13.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>
 
`IND`는 `Semantic Security`라고 생각하면 되고, `NM`은 `Non-Malleability`이고, 빨간 줄은 증명이 된 것이다.

결과적으로 `NM-CCA2`와 `IND-CCA2`는 동치인 것이 밝혀졌다. 따라서 한 가지만 만족하면 나머지 한 가지도 만족한다. 따라서 `Semantic Security`를 만족하도록 만들면 `Non-Malleability`도 만족하게 된다.

이것이 바로 정형명세의 힘이다. 서로 모순되거나 중복되는 `Security Requirement`를 찾아낼 수 있다. 따라서 ***정형명세를 통해서 `Security Requirement`를 `compact`하게 만들 수 있다.***

<br/>

#### (1) Authenticated Encryption

<img src="../images/security-engineering-6-security-design-assurance-3.13.1.1.png?raw=true" alt="drawing" width="320"/>

<br/>

- `Authenticated Encryption`: 암호문과 MAC을 함께 사용하는 것

<br/>

#### (2) Generic Composition Methods

<img src="../images/security-engineering-6-security-design-assurance-3.13.2.1.png?raw=true" alt="drawing" width="384"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-3.13.2.2.png?raw=true" alt="drawing" width="520"/>

<br/>

가장 안전한 방법은 `Encrypt-then-MAC` 방법이라는 것이 증명되었다.

이렇게 여러개의 암호 알고리즘을 조합하는 것에 대한 연구를 `합성보안(composition security)`이라고 한다.

e.g. `WPA2` 프로토콜이 깨진 것도 `합성보안`에 결함이 있어 발생한 것이다. 

<br/>

### 14) OAEP

<img src="../images/security-engineering-6-security-design-assurance-3.14.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`passive attacker` 하에서 `semantic security`를 만족하려면 `랜덤 패딩`을 붙여야 했는데, `active attacker` 하에서는 `semantic security`를 만족하기 위해서는 `고정 패딩`을 붙여야 한다. 따라서 어떻게 패딩을 붙여야 하는지 고민하였다.

`active attacker` 하에서 `semantic security`를 만족하기 위해서는 `랜덤패딩`과 `고정패딩`을 쓰거나 또는 `랜덤패딩`과 `MAC`을 사용할 수 있다(전자서명은 너무 무겁다).

<br/>

`Optimal Asymmetric Encryption Padding (OAEP)`은 랜덤 패딩과 고정 패딩을 동시에 붙이는 방법을 제안한 것이다.

<br/>

#### (1) RSA-OAEP

<img src="../images/security-engineering-6-security-design-assurance-3.14.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Feistel` 구조를 활용하여 패딩을 계산하여 붙인다.

<br/>

하지만 `OAEP`를 만들 때의 전제조건은 G함수와 H함수가 안전하다는 전제가 있다. 왜냐하면 해쉬 함수는 충분히 연구되었기 때문에 깨질 가능성이 없다고 전제한 것이다. 이것은 무리한 가정이 아니라고 받아들였다. 이것을 우리는 `random oracle model` 하에서 증명되었다고 말한다.

하지만 2005년도에 산동대학교 수학과의 `왕샤오윤(Wang Xiaoyun)` 교수가 `SHA1` 함수의 충돌쌍을 찾아냈다. SHA-1의 해독 작업량을 2<sup>69</sup>까지 낮췄다.

따라서 이 이후에는 `random oracle model` 전제조건 하에서 증명한 것은 안전하지 않다는 것으로 생각이 바뀌었다.

<br/>

## 4. Machine-Assisted Verification

<img src="../images/security-engineering-6-security-design-assurance-4.0.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `ISO/IEC 29128`: 암호 프로토콜의 설계 무결성을 검증하는 표준. Protocol Assurance Level. PAL1, PAL2, PAL3로 나뉜다. 레벨이 올라갈 수록 많은 것이 `Formal`하게 기술되어야 한다. `PAL2` 이상부터는 도구를 사용한 `Tool-aided`가 요구된다.

전세계적인 추세는 `design assurance` 증명을 할 때 손으로 직접 하는 것보다는 ***되도록이면 `자동화 도구`를 사용할 것을 추천한다.*** 그 이유는 우선 ***사람의 실수가 줄어들고,*** ***사람에 따라 달라지지 않고 항상 `일정한` 증명 결과가 나오기 때문에*** 사람에 따라서 결과의 편차가 발생하지 않는다. 그리고 `자동화 도구`를 사용하면 ***분석도 `빠르게` 할 수 있어 효율적이다.***

<br/>

### 1) Machine-Assisted Verification 

<img src="../images/security-engineering-6-security-design-assurance-4.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`WPA2` 프토토콜의 문제점이 발견되었다. WPA2 프로토콜은 `active attacker` 하에서 `IND-CCA 공격`에 대한 `design assurance`가 증명된 프로토콜이었기 때문에 사람들은 놀랐다. `Matthew Green`은 해당 문제에 대해서 설명하였다. 키 분배 프로토콜과 암호통신 프로토콜을 따로 독립적으로 증명하였기 때문에 두 가지를 결합했을 때 문제가 발생하였다. 따라서 `합성보안(composition security)`에 있어 문제가 발생한 것이다. 따라서 그는 합성보안의 중요성을 강조하였고 그러면서 그는 `자동화 도구`를 사용하여 증명하는 것의 중요성을 강조하였다. 왜냐하면 자동화 도구를 이용하여 증명하는 것이 사람의 실수를 줄일 수 있기 때문이다.

<br/>

### 2) Limits of Provable Security

`Provable Security`라는 말을 사용하지 않는 것이 좋다. 정확하게는 안전성이 증명되는 것이 아니라 `Security Requirements`를 만족하는지를 증명하는 것이다.

<br/>

## 5. Key Management

### 1) Diffie-Hellman Key Agreement

#### (1) Concept of Diffie-Hellman Key Agreement

`Diffie`와 `Hellman`은 서로 멀리 떨어진 두 사람이 키를 교환하는 방법을 제안하였다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-5.1.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

위 방법은 공격자가 로그 함수만 알면 쉽게 키를 알아낼 수 있다.

<br/>

#### (2) [Note] Discrete Logarithm Problem

<img src="../images/security-engineering-6-security-design-assurance-5.1.2.1.png?raw=true" alt="drawing" width="520"/>

<br/>

#### (3) Diffie-Hellman Key Agreement

<img src="../images/security-engineering-6-security-design-assurance-5.1.2.2.png?raw=true" alt="drawing" width="520"/>

<br/>

`mod`를 사용하면 지수승을 구하는 것이 매우 어렵다. 즉 `이산대수 문제`의 어려움에 기반한다. `Diffie-Hellman` 키 교환을 통해 대칭키를 교환하고, 실제 메시지는 대칭키로 암호화하는 것은 `Hybrid Encryption`의 일종이다.

<br/>

## 6. 2-Party Protocols

알고리즘과 프로토콜이 차이는 알고리즘은 컴퓨터 한 대로 가능한 것이고, 프로토콜은 서로 데이터를 주고 받아야 하기 때문에 컴퓨터 두 대 이상이 필요하다.

<br/>

### 1) Interactive Protocol

<br/>

#### (1) Interactive Turing Machine

<img src="../images/security-engineering-6-security-design-assurance-6.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

위 그림의 turing machine 하나를 컴퓨터 한 대라고 생각할 수 있으며, 컴퓨터 한 대에서 처리할 수 있는 것은 `알고리즘(algorithm)`이라고 한다.

<br/>

#### (2) Interactive Turing Machines

<img src="../images/security-engineering-6-security-design-assurance-6.1.2.png?raw=true" alt="drawing" width="720"/>

<br/>

위 그림의 turing machine 두 대는 서로 다른 컴퓨터 두 대를 의미하며, 공통의 목적을 달성해야 하기 때문에 쌍방이 Input을 공유하며, 한 쪽에서 write하면 다른 한 쪽에서 read하는 것은 통신채널을 의미한다. 이런 상호 간에 통신하면서 공동의 목표를 처리하는 것은 `프로토콜(protocol)`이다.

<br/>

### 2) Zero-Knowledge Proofs

프로토콜에서 `Semantic Security` 개념을 적용한다면, A, B가 서로 데이터를 주고받는 동안 두 사용자의 정보가 한 비트도 노출되면 안된다. 이것을 `영지식성(Zero-Knowledge)`라고 한다.

만약 사용자 인증 프로토콜이라고 한다면, 사용자의 비밀정보에 대해서 한 비트도 노출되서는 안 된다.

<br/>

어떤 프로토콜이 영지식성을 만족하는지 증명하기 위해서는 영지식성이라는 개념을 수학적으로 정의하는 것이 필요하다.

<br/>

`Zero-Knowledge` 에서는 A, B가 통신채널을 통해서 데이터를 주고받을 때, A가 B에게 사용자인증을 한다고 가정했을 때, 데이터를 노출시키지 않기 위해서는 데이터를 암호화하면 되지만, 영지식증명에서는 A는 B에게도 비밀정보를 한 비트도 알려주지 않아야 한다.

통신을 할 때는 공격자가 2명이다. 통신채널을 들여다보고 있는 공격자와, 다른 한 명은 통신하는 상대방(e.g. naver)이다.

현재 네이버 등에서 사용하는 사용자인증 프로토콜은 영지식성을 만족하지 않는다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-6.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`prover`는 `verifier` 또는 `passive attacker` 모두에게 나의 정보를 한 비트도 노출시키지 않아야 한다.

<br/>

#### (1) Indistinguishability

<img src="../images/security-engineering-6-security-design-assurance-6.2.2.png?raw=true" alt="drawing" width="480"/>

<br/>

가위바위보 프로그램 A와 프로그램 B가 동일한 지 알기 위해서는 두 프로그램을 충분히 많이 돌려본 다음, 가위, 바위, 보를 출력하는 확률 분포가 동일하다면 그리고 두 프로그램이 게임의 승부를 동일하게 판정한다면, 두 A, B는 동일한 프로그램이라고 생각한다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-6.2.3.png?raw=true" alt="drawing" width="480"/>

<br/>

이렇게 프로그램 A와 B를 비교하는 것을 `앙상블(Ensemble)`을 비교한다고 말한다.

`앙상블(Ensemble)`이란 ***a family of random variables***라고 한다.

컴퓨터가 가위, 바위, 보 중에서 랜덤하게 값을 출력하고 그에 따라 결과가 결정되는데, 이렇게 모든 것들이 변수와 그에 따른 확률로 결정이 된다.

앙상블이라는 것은 모든 값들의 경우를 확률로 표시해서, 그 확률 분포를 비교하는 것을 말한다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-6.2.4.png?raw=true" alt="drawing" width="480"/>

<br/>

위의 그림에서처럼 가위, 바위, 보를 내는 확률이 있을 때, 결정된 값에 따라서 결과가 100%로 결정된다. 이 때 두 앙상블을 비교한다고 말한다. 각 변수들의 확률분포를 나타낸다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-6.2.5.png?raw=true" alt="drawing" width="640"/>

<br/>

왼쪽에 있는 실제 `prover`는 `secret` 값을 알고 상대방과 통신을 하고 있는 앙상블이고, 오른쪽 `시뮬레이터`는 `secret` 값을 모르는 상태에서 통신하는 앙상블이다. 만약 두 개의 앙상블을 구분할 수 없다면(indistinguishable), 해당 프로토콜은 영지식성을 만족한다고 할 수 있다. 이것은 마치 `Semantic Security`에서 암호문을 알고 있는 상태와 암호문을 모르는 상태에서 노출되는 정보의 양이 차이가 없어서 구분할 수 없는 것과 비슷한 개념이다.

왼쪽은 편집하지 않은 앙상블이고, 오른쪽은 편집한 앙상블이다. 두 앙상블의 확률 분포가 똑같다면 왼쪽 앙상블에서 노출되는 정보는 없다고 정의한다.

Edited(Polynomially Simulated) Conversation은 빠른 시간 안에 시뮬레이션이 가능해야 한다는 것을 의미한다. 선택지가 2개일 경우에는 50번 성공을 위해 100번만 시도하면 되지만, 선택지가 10개일 경우에는 50번 성공을 위해서 500번 시도를 해야 한다. 빠른 시간 안에 시뮬레이션을 위해서 보통은 영지식성을 증명할 수 있는 프로토콜은 서버 쪽에서 오는 질문이 매우 단순한 경우가 많다.

<br/>

#### ZKIP for Kids

<img src="../images/security-engineering-6-security-design-assurance-6.2.6.png?raw=true" alt="drawing" width="520"/>

<br/>

알리바바는 자신의 프로토콜이 영지식성을 만족하는 것을 증명하기 위해서, 자신이 직접 비밀을 이용하여 문을 통과하는 장면을 모두 녹화하고, 그 다음 자신과 똑같이 분장을 한 대역이 비밀을 모르는 상태에서 찍어서 문을 통과하는 장면을 편집하여 만든 화면을 보여주고, 실제 본인이 문을 통과하는 것과 대역이 문을 통과하는 장면을 보고 둘을 구분할 수 없다는 것을 보여줌으로써 해당 프로토콜의 영지식성을 증명한다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-6.2.7.png?raw=true" alt="drawing" width="520"/>

<br/>

영지식성은 `prover`와 `verifier`가 실제로 만드는 실제 앙상블과 `가짜 prover`와 `verifier`가 만드는 편집한 앙상블 두 개가 서로 구분할 수 없다는(indistinguishable) 것을 보이는 것이다.

영지식 프로토콜에서 중요한 것은 해당 프로토콜에서 정보가 노출되지 않는다는 것을 증명(prove)할 수 있어야 한다.

<br/>

#### ZKIP for Hamiltonian Cycle

<img src="../images/security-engineering-6-security-design-assurance-6.2.8.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-6.2.9.png?raw=true" alt="drawing" width="520"/>

<br/>

`Graph G`와 `Graph H`는 `동형(isomorphism)`이다. 하지만 위의 표에서 오른쪽에 있는 함수의 변환규칙을 알려주지 않으면 두 그래프가 동형인지 아닌지를 `polynomial time` 안에 계산할 수 없다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-6.2.10.png?raw=true" alt="drawing" width="640"/>

<br/>

위의 `Hamiltonian Cycle`에서 private input을 알려주지 않으면서 verifier에게 private 값을 알고 있음을 증명하기 위해서 동형인 그래프를 이용한다.

1. `동형인 그래프 G'`를 만든 다음 해당 변형된 동형 그래프 G'를 `verifier`에게 전달한다.
2. `Verifier`는 둘 중에 한 가지를 질문한다. (1) 원래 그래프와 바꿔서 보낸 그래프가 동형이라는 것을 증명하라. (2) 변형된 그래프 G'의 hamiltonian cycle을 증명하여라.

<br/>

> Note:  
만약 한 붓그리기를 어떻게 하는지 못하는 경우 그래프를 바꿀 수는 없지만 바꾼 그래프에 대한 `Hamiltonian Cycle`을 알 수 없다.  
만약 한 붓그리기를 알 수 있는 다른 그래프를 알고 있다면, 해당 그래프의 `Hamiltonian Cycle`은 알 수 있지만, 두 그래프는 동형이 아니다.

<br/>

#### Parallel composition of ZKPK

평행하게 여러개의 영지식 증명을 동시에 수행할 경우 영지식성을 보장할 수 없다.

컴포넌트 단위로 설계의 무결성을 증명하였다고 해서, 여러 컴포넌트를 조합하였을 때는 안전성을 보장할 수 없다. 

<br/>

#### Zero-Knowledge for Cryptocurrency

<img src="../images/security-engineering-6-security-design-assurance-6.2.11.png?raw=true" alt="drawing" width="640"/>

<br/>

블록체인은 데이터를 삭제 또는 수정이 불가능하기 때문에 개인정보가 기록될 경우 프라이버시 문제가 발생한다. 데이터를 암호화하고 기록된 정보가 제대로 된 정보인지를 확인하기 위해 영지식성을 활용한다.

하지만 블록체인의 컴퓨팅 파워가 한정되어 있어서 간결하게 만든 영지식증명 프로토콜인 `zk-SNARKs`이 `ZCash` 암호화폐에 사용된다.

하지만 효율적으로 만들기 위해서 단점이 있는데 바로 초기 셋업 과정에서 절대적으로 신뢰할 수 있는 Trusted Third Party(TTP)가 있어야 한다.

<br/>

## 7. Multi-Party Protocols

온라인 도박, 온라인 경매, 전자투표 등 참여자가 많은 Multi-Party Protocols가 있다.

<br/>

### 1) Secure Multi-Party Computation (MPC)

***Cryptographic protocol for emulating a trusted party***

전자투표 프로토콜을 쉽게 만드는 것은 절대적인 신뢰자를 한 명 두는 것이다. 하지만 이것은 현실적으로 거의 불가능하다. 따라서 암호학적으로 신뢰할 수 있는 `trusted party`를 에뮬레이팅 하는 것이 `Secure Multi-Party Computation(MPC)`의 목적이다. 이것은 `탈중앙화`를 의미하기도 한다.

<img src="../images/security-engineering-6-security-design-assurance-7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Secure MPC`에서는 참여자가 미리 정해져있고 참가자의 리스트가 미리 알려져있다. 하지만 `블록체인`에서는 참여자를 미리 고정되어 있지 않다.

***\"Properties must be ensured even if some of the parties maliciously attack the protocol\"***

`MPC`에서는 참여자가 매우 많기 때문에 나를 제외한 나머지 참여자가 모두 공격자가 될 수 있으므로 안전한 프로토콜을 설계하는 것이 `2-party protocol`일 때보다 훨씬 어렵다.

<br/>

***\"Permissionless blockchain can provide efficiency and scalability to MPC!\"***

<br/>

#### Secure Multiparty Computation

#### Examples

- 인증 프로토콜
- 온라인 결제
- 경매
- 투표
- Privacy Preserving 데이터 마이닝

<br/>

## 8. Digital Signatures

### 1) Digital Signature

<br/>

### 2) Security Goal & Attack Model 

#### Target

`Goldwasser` 박사는 전자서명에 대해서 안전성의 레벨을 다음 3가지로 구분하였다.

- `Total Break`: 개인키(private key)를 알아내는 것
- `Selective Forgery`: 내가 선택한 메시지에 대해서 전자서명을 위조해낼 수 있는 것
- `Existential Forgery`: 내가 선택한 메시지가 아니라 랜덤한 메시지에 대한 전자서명을 위조해낼 수 있는 것

우리는 전자서명 알고리즘을 만들 때는 `Existential Forgery`를 막도록 설계해야 안전하다.

원래는 랜덤하게 생성된 중요 메시지에 대한 전자서명을 위조할 수 없게 하려고 했지만, 중요 메시지라는 것이 수학적으로 표현할 수 없기 때문에 아예 랜덤한 모든 메시지에 대해서 전자서명을 위조할 수 없게 하는 것이 안전하다고 정의하였다.

<br/>


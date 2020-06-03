# Security Design Assurance

## Why Design Assurance?

MS는 많은 취약점들이 요구사항 분석 단계와 설계 단계에서 나온다고 판단하였다.

SDL을 하는 목적은 보안 내재화(security by design)를 하기 위한 것이다. 하지만 
우리나라의 보안공학은 secure coding에만 치중되어 있다. 따라서 코딩레벨에서부터 SDL이 시작되므로 정확한 SDL이 아니다.
 
설계 오류의 중요성을 얘기할 때 `Needham-Schroeder public-key authentication protocol (1978)`을 많이 얘기한다. `Gavin Lowe`가 이 프로토콜에 설계에 오류가 있다는 것을 17년 뒤인 1995년에 발견하였다.

 `Key Reinstallation Attacks: Forcing Nonce Reuse WPA2` 논문도 `WPA2` 프로토콜의 설계 오류를 발견하였다.

<br/>

## [Note] Black Hat EU 2017

`By-design Backdooring of Encryption System-Can We Trust Foreign Encryption Algorithms` 논문은 설계도 상에도 백도어를 넣을 수 있다는 것을 보여준다.

`Operational Cryptology and Virology Lab`에서 발표하였다.

`Adam L. Young`과 `Moti Yung`은 주로 `Malicious Cryptography: Exposing Cryptovirology`를 연구하였는데, 이것은 어떻게 하면 암호 알고리즘 레벨에서 백도어를 넣을지 연구하는 것이다.

<br/>

## [Note] No Where To Hide

`Edward Snowden`은 `the guardian`지에 `NSA`에서 운영하는 `PRISM` 프로그램을 이용하여 민간인을 사찰할 수 있다는 것을 폭로한다.

`NSA`에서 AOL, Apple, Facebook, Google, Microsoft, Paltalk, Skype, Yahoo, and YouTube의 협조를 얻어서 각 회사에 일종의 검색엔진을 설치하였다. 이 검색엔진을 통해서 사람들의 다양한 정보를 볼 수 있다는 것을 폭로하였다.

<br/>

## [Note] NSA's PRISM

<img src="../images/security-engineering-6-security-design-assurance-1.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>

## [Note] NSA's BULLRUN

<img src="../images/security-engineering-6-security-design-assurance-1.0.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`불런(BULLRUN)`은 암호화된 메시지를 해독하기 위한 프로젝트이다. 하드웨어 장치에 백도어를 넣으면 그 장치를 쓰지 않으면 그만이다. 하지만 알고리즘 자체에 백도어를 넣고 해당 알고리즘을 표준으로 지정하면 해당 알고리즘을 사용하는 모든 장치에 자동으로 백도어가 설치된다.

<br/>

## [Note] 타원곡선암호(Elliptic Curve Crypto)

<img src="../images/security-engineering-6-security-design-assurance-1.0.3.png?raw=true" alt="drawing" width="640"/>

<br/>

타원곡선암호는 키길이가 짧아서 처리 속도가 RSA보다 훨씬 빠르다.

<br/>

## [Note] DUAL_EC_DRBG - The Beginning

<img src="../images/security-engineering-6-security-design-assurance-1.0.4.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.0.5.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.0.6.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.0.7.png?raw=true" alt="drawing" width="640"/>

<br/>

NSA가 만든 타원곡선(EC)의 파라미터에 백도어가 숨겨져 있었다. 

타원곡선을 이용한 난수발생기인 `DUAL_EC_DRBG`에는 원리를 알 수 없는 알고리즘이 들어있었다. `NSA`가 타원곡선 표준을 제정할 때 특정 타원곡선을 넣자고하여 표준으로 제정되었다. 2007년에 `Bruce Schneier`가 혹시 `NSA`가 `백도어(backdoor)`를 삽입하려는 것인가하는 의문을 제기하였다. 그리고 나중에 `Edward Snowden`이 폭로한 이후에 `BULLRUN` 프로젝트가 알려졌고 실제로 알고리즘 상에 백도어를 넣은 것이 밝혀진다. ***2015년에 `NSA`에서 알고리즘에 `백도어(backdoor)`를 넣은 사실을 인정하고 사과하였다.***

그 만큼 시스템 설계의 안전성을 증명하는 것은 매우 어렵다.

<br/>

## [Note] DES

S-box와 P-box의 원리를 알 수 없었다. DES 알고리즘이 나온 후에 차분해독법이 나오게 된다. DES를 모방해서 만든 다른 알고리듬들은 차분해독법에 깨졌지만 DES만 깨지지 않았다. DES를 설계한 사람들은 이미 차분해독법을 알고 있었다.

<br/>

## 1. Cryptography & Design Assurance

### (1) Emphases of Modern Cryptography

현대 암호학은 엄밀한 정의(definitions)와, 정확한 전제조건(assumptions), 엄밀한 보안 증명(proofs)을 바탕으로 한다.

<br/>

### (2) Protocol Design Verification Steps

1. Assumption Building: 기본 전제조건 설정

2. Security Policy Modeling: Security Policies를 Formal하게 만든다.

3. Security Design: 시스템을 디자인한다.

4. Design Assurance Verification: 설계가 Security Policies를 만족하는지 증명한다.

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

우리가 설계한 알고리듬이 Security Requirements를 만족하는지 증명하기 위해서는 Attacker를 수학적으로 정형화해야 한다. 따라서 `Attacker Modeling`을 통해서 증명하는 것을 `Design Assurance`라고 한다. 이 방법에는 크게 `Symbolic Method`와 `Computational Method`이다. 마지막으로 `Design Assurance` 이후에 실제 설계대로 구현(코딩)을 한 이후에 실제 구현이 설계된 대로 만들어졌는지를 증명하는 것을 `Code Assurance`라고 한다.

- `Symbolic Method`: 자동화가 쉬움
- `Computational Method`: 증명의 정밀도(assurance)는 올라감. 자동화는 어려움. 하지만 이제는 도구의 수준이 높아져서 어느 정도 자동화가 가능해졌음.

우리가 어떤 실제 제품(real world)를 분석할 때, 실제 대상을 `DFD` 등으로 모델링을 한다. 왜냐하면 실제 타겟을 그대로 하면 쓸데없는 정보가 너무 많아서 효율성이 떨어진다. 따라서 반드시 필요한 정보를 바탕으로 모델링하는 것이 중요하다.

표준문서를 놓고 `SPM`를 충족하는지 증명하는 것은 매우 어렵다. e.g. `RFC2246(SSL)` 문서는 80페이지가 되는데, 이 중에서 필요한 정보만 뽑아서 모델링하면 매우 양이 줄어든다. 표준문서는 양이 많아지는 이유는 프로토콜에서 암호의 비트수 등을 모두 적어놓기 때문에 양이 많아진다. 이렇게 표준문서에서 쓸데없는 정보를 없앤 것을 `Algorithm/Protocol Model`이라고 한다.

<br>

## (3) Standard, Model, Implementation

### Protocol Model:

- 표준 프로토콜에서 코어 메시지만 추려낸 것

<br/>

## (4) Models of Security Protocol Verification

### Symbolic Model(Dolev-Yao Model)

### Computational Model

<br/>

## (5) Symbolic Method(Dolev-Yao Model)

### Basic Operations:

<img src="../images/security-engineering-6-security-design-assurance-1.5.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### Rules:

<img src="../images/security-engineering-6-security-design-assurance-1.5.2.png?raw=true" alt="drawing" width="520"/>

<br/>

### Examples:

<img src="../images/security-engineering-6-security-design-assurance-1.5.3.png?raw=true" alt="drawing" width="520"/>

<br/>

<img src="../images/security-engineering-6-security-design-assurance-1.5.4.png?raw=true" alt="drawing" width="520"/>

<br/>

### Formal Execution Model

`DY`는 실제로 각 오퍼레이션을 기호로 표현하여 자동화하면 어느 정도 단순한 프로토콜은 문제를 발견할 수 있다는 것을 밝혀냈다. e.g. replay attack 등을 찾아낼 수 있었다. 하지만 좀 더 복잡한 문제들은 자동화하기 어렵다고 생각했다. 따라서 더욱 정확하게 분석하려면 `Computational Method`를 사용하여 손으로 직접 증명해야 한다고 생각했다.

<br/>

### Machine-Assisted Verification

- `ISO/IEC 29128`: 암호 프로토콜의 설계 무결성을 검증하는 표준. Protocol Assurance Level. PAL1, PAL2, PAL3로 나뉜다. 레벨이 올라갈 수록 많은 것이 `Formal`하게 기술되어야 한다. 레벨2 이상부터는 도구를 사용한 `Tool-aided`가 요구된다.

<br/>

## (6) Computational Method

<br/>

## 2. Symmetric Ciphers

`Design Assurance`는 대칭키 암호보다는 공개키 암호 쪽에 더욱 발달되었다.

<br/>

### (1) SPN

#### Shannon's Proposal

`Shannon`이 `비트(bit)`의 개념을 만들어 정보의 양을 측정할 수 있게 되었다. `Shannon`은 어떻게 하면 한정된 대역폭에서 데이터를 많이 보낼 수 있을까 고민하여 데이터 압축을 고민했고, 또한 어떻게 하면 정보를 비밀리에 보낼 수 있는지 고민하였다. 무한대의 컴퓨팅 파워를 가진 공격자에게도 안전한 암호시스템을 고민하여 `One-time pad` 시스템을 생각해냈다. `One-time pad` 시스템에서 키의 길이와 메시지의 길이는 같아야 하고, 키는 서로 미리 교환한 난수를 사용해야 하며, 한 번 사용한 키는 재사용하지 않는다. 하지만 `One-time pad` 실생활에서 쓰기에는 실용적이지 않았다(impractical). 따라서 `Perfect Secure`가 아니라 암호를 깨는데 시간이 매우 오래 걸려서 공격의 의미가 없는 `Computational Secure`한 암호를 만들어야 한다고 생각했다. 이를 위해서는 `Confusion` 효과와 `Diffusion` 효과가 필요하다고 생각해냈다.

<img src="../images/security-engineering-6-security-design-assurance-2.1.1.png?raw=true" alt="drawing" width="520"/>

<br/>

- `Confusion`: 메시지와 키의 관계를 감춘는 것을 말함. 환자암호(Substitution Cipher)
- `Diffusion`: 평문과 암호문의 관계를 감추는 것을 말함. 전치암호(Permutation Cipher)

`Feistel` 구조는 블록을 반으로 나눠서 한 쪽에 대해서만 환자암호 전치암호 처리를 한다.

`SPN` 구조는 블록을 반으로 나누지 않고 블록 전체에 대해서 환자암호화 전치암호 처리를 하므로 라운드 수가 적다.

### (2) Ideal Properties of a Proof

<br/>

### (3) Brief History of Provable Security

`Design Assurance`에 대한 연구는 1982년 GM(IND-CPA)에 의해 기초가 정립되어 본격적으로 시작되었다.

<img src="../images/security-engineering-6-security-design-assurance-2.3.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (4) Symmetric vs. Asymmetric

- `대칭키암호(Symmetric Cipher)`: 암호화 키와 복호화 키가 동일함. secret key
- `공개키암호(Asymmetric Cipher)`: 암호화 키와 복호화 키가 다름. public key, private key

<br/>

### (5) The Origin of PKC

공개키 암호는 1976년 `Diffie`와 `Hellman`에 의해 개념이 생겨났다. → `New Directions in Cryptography`.

전자상거래의 도입으로 인해 민간에서도 암호의 사용이 필요해졌다.

<br/>

### (6) PKC in Formal

<img src="../images/security-engineering-6-security-design-assurance-2.3.2.png?raw=true" alt="drawing" width="640"/>

<br/>

### (7) RSA in a Nutshell

RSA 암호는 1978년 `Shamir` `Rivest` `Adleman` 세 사람에 의해 만들어졌다.

<img src="../images/security-engineering-6-security-design-assurance-2.7.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 그림에서 암호화 시스템은 암호 숫자가 너무 커지고, 역원을 구하기가 쉽기 때문에 안전하지 않다.

<img src="../images/security-engineering-6-security-design-assurance-2.7.2.png?raw=true" alt="drawing" width="640"/>

<br/>

컴퓨터로 쉽게 계산할 수 없는 NP문제를 이용하여 암호 시스템을 안전하게 만들었다.

<img src="../images/security-engineering-6-security-design-assurance-2.7.3.png?raw=true" alt="drawing" width="640"/>

<br/>

이전 그림에서 유클리드 함수(e의 역원 d를 계산하는 함수)를 적용하여 RSA 암호를 완성하였다.

소수 2개를 모르는 상태에서 소인수 분해를 하는 것은 NP문제이므로 매우 오랜 시간이 걸리지만, 반대로 p × q = N를 구하는 것은 P문제이므로 쉽다. 따라서 키를 생성하고 암호화하는 것은 매우 쉽지만 해킹하기는 매우 시간이 오래걸리므로 안전하다.

<br/>

### (8) OW-CPA Example: Rabin Scheme

<img src="../images/security-engineering-6-security-design-assurance-2.8.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`RSA 암호`는 소인수분해 문제를 풀지 않아도 다른 공격 방법들이 있다. 따라서 문제가 발견될 때마다 계속 RSA 암호를 보완해왔다. 반면에 `Rabin` 암호 시스템을 깨기 위한 방법은 오직 소인수분해 문제 밖에 없다는 것이 수학적으로 증명되었다. 따라서 완성도로 보면 `RSA` 보다 `Rabin` 암호가 훨씬 설계적으로 훌륭하다.

<br/>

### (9) Semantic Security

<img src="../images/security-engineering-6-security-design-assurance-2.9.1.png?raw=true" alt="drawing" width="640"/>

<br/>

기존의 `암호해독`의 정의는 매우 애매모호했다. `Goldwasser` 박사는 암호의 `해독`의 정의에 대해서 고민하였다. 평문 전체가 아니라 평문의 일부 정보만 노출되어도 매우 심각한 문제가 발생할 수 있다. 따라서 `Goldwasser` 박사는 해독에 대한 Formal한 정의를 정립했다. `Rabin`은 모든 평문이 100% 해독되는 것을 해독이라고 정의하였다.  `Goldwasser` 박사는
암호문으로부터 그 어떤 중요 정보도 노출되지 않는 것이 `Secure`하다고 정의하였다. 그리고 이것을 수학적 기호로 Formal하게 정의하였다.
따라서 `Rabin`은 암호 시스템의 디자인을 수학적으로 증명하였지만 해독에 대한 정의가 `Goldwasser` 박사와는 달랐다.

<br/>


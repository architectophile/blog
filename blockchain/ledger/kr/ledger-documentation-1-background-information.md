#  I. Background Information

<br/>

## 1. Introduction

이 챕터에서는 개인 보안 장치와 계층결정적 지갑(hierarchical deterministic wallets)에 대한 배경지식을 설명한다.
그리고 레저 장치의 보안성을 높여주고 오픈소스를 사용하기 편리하게 만들어주는 `어플리케이션 분리 기술(application isolation technology)`을 소개한다.

<br/>

## 2. Personal Security Devices

`개인 보안 장치(personal security devices)`는 비트코인의 `개인키(private keys)`와 같은 암호학적 `비밀정보(secrets)`를 취약점을 가진 안전하지 않은 컴퓨터로부터 분리시키기(isolate) 위해 디자인되었다. 개인키 종이에 적어 보관하거나 암호화된 드라이브와 같은 물리 매체에 안전하게 보관할 수 있지만, 암호화폐를 전송하기 위해 그 키를 컴퓨터에서 불러와 전자서명을 생성할 경우 만약 해당 컴퓨터가 악성코드에 감염된 경우 그 키는 더 이상 안전하지 않게 된다. 따라서 레저와 같은 개인 보안 장치를 사용하면 개인키를 안전하게 보관할 수 있을 뿐만 아니라, 암호화폐를 송금할 때 필요한 전자서명과 같은 `암호 연산들(cryptographic operations)`을 안전하게 장치 내부에서 수행할 수 있다. 또한 레저는 `AIS-31` 기준을 만족하는 `진성난수발생기(true random number generator)`를 사용하여 안전한 랜덤한 키를 생성할 수 있다. 그러므로 키를 외부에서 생성하여 장치에 로드하는 것보다 장치 내부에서 키를 생성하여 사용하는 것이 훨씬 안전한 방법이다.

레저 장치는 `Secure Element` 기술을 사용하여 암호화폐와 블록체인을 위한 보안 장치를 만들었다. 이 장치는 당신의 개인키를 `tamper-proof`하고 `eavesdropping-proof`한 `Secure Element`에 안전하게 저장한다. 그리고 Nano S와 Ledger Blue는 스크린을 갖고 있어서 당신의 자산에 대한 신뢰할 수 있는 정보를 보여준다. 이 스크린은 컴퓨터 소프트웨어가 아닌 장치에서 직접 컨트롤되기 때문에 사용자는 스크린에 나타나는 정보를 신뢰할 수 있다.

그러나 레저 장치는 데이터를 저장하기 위한 목적으로 만들어진 것이 아니라 `root of trust`를 제공하기 위해 만들어진 것이다. 이 장치에서 사용되는 어플리케이션들은 호스트 컴퓨터와 함께 사용되도록 가볍게(lightweight) 만들어진 어플리케이션이다. `Secure Element`는 저장공간에 제한이 있기 때문에 암호화된 정보를 장치에 저장하는 것보다는 호스트 컴퓨터에 저장하는 것이 바람직하다. 따라서 이 장치는 여러개의 개인키를 안전하게 보관하고 자산을 사용할 때 unlock을 하기 위해 사용된다. 이 장치는 당신의 자산에 접근할 수 있는 `secure portal` 역할을 하며, 장치를 잃어버리거나 장치가 훼손되어도 당신의 자산은 여전히 안전하게 보관된다. 그리고 이 secure portal 역할을 하는데 중요한 핵심은 바로 `master seed`이다.

<br/>

## 3. The Master Seed

레저 장치는 `계층 결정적 키 생성(hierarchical deterministic key generation)` 방식을 이용하여 장치에서 실행되는 어플리케이션들이 매우 가볍게 만들어질 수 있도록 한다. 계층 결정적 키 생성 방법을 사용하면 이론적으로 무한개의 개인키와 비밀키를 단 한 개의 `master seed`로부터 `추출(derive)`할 수 있다. 따라서 당신의 암호화폐의 개인키와, 패스워드, 비밀키 등을 단 하나의 `master seed` 안에 저장할 수 있는 것이다. 따라서 장치에서 실행되는 어플리케이션들은 자신의 키를 직접 보관할 필요가 없게 된다. 왜냐하면 각 어플리케이션의 개인키는 언제든 필요할 때마다 `master seed`로부터 추출될 수 있기 때문이다. 게다가 각 어플리케이션은 장치에서 지웠다가 다시 설치하여도 중요한 개인키나 비밀정보를 잃지 않게 된다. 당신의 master seed는 장치를 최초 설정할 때 랜덤하게 생성되며, 나중에 복구를 위해 키의 정보를 따로 적어서 보관해야 한다.

레저 장치는 [BIP 39][3]라는 표준에 맞춰 `master seed`를 생성하고 사용한다. [BIP 39][3]는 다른 지갑들에서도 널리 사용되는 산업 표준이다. 레저 장치에서는 24개의 복구단어(mnemonic)를 생성하는 `BIP 39 English word list`를 사용하며, 이 단어들은 총 2048 가지의 단어들이 사용될 수 있다.

<br/>

### BIP 39 24-word mnemonic seed 생성 방법

1. 장치는 `TRNG`를 사용하여 `256비트` 길이의 `랜덤한 값`을 생성한다.
2. 생성된 랜덤값에 `SHA-256` 해쉬를 계산한 다음 그것의 최초 8비트 랜덤값에 뒤에 붙여 총 `264비트`의 값을 만든다.
3. 해당 264비트 값은 11비트씩 나누어 총 24개의 그룹으로 분리한다.
4. 각 11비트 길이의 값은 0~2047의 범위 중 해당되는 각 단어로 인코딩되고, 결과적으로 총 24개의 복구단어로 변환된다.

<br/>

따라서 장치에서 생성된 `mnemonic seed` 값은 전체 2<sup>256</sup>개의 가능한 `mnemonic seed` 중에서 한 개의 `seed`가 생성되는 것이다. 여기서 24개의 단어 중에서 마지막 단어는 3비트의 랜덤값과 8비트의 해쉬값이 더해져 생성되는데, 이것은 `checksum`과 같은 역할을 하게 된다.

<br/>

이렇게 24개의 복구단어를 생성하였으면, 이 값을 `PBKDF2-HMAC-SHA512` 키 추출 함수(key derivation function)에 넣어서 실질적으로 사용되는 `512비트` 길이의 `binary seed`를 생성하는데, 이 과정을 `serialization`이라고 부른다.그리고 이 때는 `24개`의 `mnemonic words`와 함께 `passphrase`도 추가하여 `binary seed`를 생성할 수도 있다.

<br/>

## 4. HD Key Generation

앞에서 생성한 24개 단어의 `mnemonic seed`로부터 이론적으로 무한개의 키를 생성하기 위해서 `hierarchical deterministic (HD) key generation` 방법을 사용한다. 레저 장치에서 사용하는 `HD kye generation` 프로세스는 [BIP 32][2] 표준에 정의되어 있다.

<br>

<img src="../images/ledger-documentation-1-background-information-3.4.0.1.png?raw=true" alt="drawing" width="832"/>

<br/>

### 1) The Master Node

`HD key generation` 방법은 이론적으로 무한한 길이의 `암호키 트리(tree of cryptographic secrets)`를 생성하는 것이다. 이 트리에서 모든 것이 생성되는 최초의 뿌리에 해당하는 노드를 ***`master node`***라고 부른다.
이 `master node`는 이전에 생성한 `master binary seed`로부터 `HMAC-SHA512` 연산을 통해 직접 추출된다. 그리고 이 `master node`는 당신의 모든 개인키를 접근하는데 필요한 모든 정보를 담고 있다. 따라서 당신은 `mnemonic seed`를 매우 안전하게 보관해야 한다.

<br/>

### 2) Passphrase

`passphrase`는 [BIP 39][3] 표준에서 정의하는 기능이다. `passphrase`는 `HD wallet`에서 `master node`를 추출하기 전에 `master seed`에 추가적인 데이터를 더할 수 있는 옵션 기능이다. 같은 `master seed`라도 서로 다른 `passphrase`를 추가함에 따라 완전히 서로 다른 `master node`가 생성된다. 이러한 방식으로 당신은 동일한 `master seed`에 대해서 서로 다른 `passphrase`를 여러개 관리함으로써 완전히 다른 지갑들을 여러개 관리할 수 있다.

<br/>

### 3) An Infinite Tree

`master node`로부터 특정 키를 결정하기 위해서는 오직 이 트리에서 해당 키의 위치(`path`)만 알면 된다. 이 트리는 [BIP 32][2]에 정의된 CKD 함수라는 강력한 알고리즘에 의해서 생성된다. 이 알고리즘을 이용하면 어떤 `HD tree`에서 `master node`와 원하는 키의 `node`의 `path`만 알면 어떠한 `node`라도 계산할 수 있다. 이 알고리즘이 강려한 이유는 `master node`에서 하위 계층으로 키를 추출하는 것은 가능하지만 역으로 하위 계층에서 상위 계층의 node를 알아내는 것은 현실적으로 불가능하기 때문이다.

<br/>

### 4) Child Key Derivation Function

`CKD function`을 이용하면 하나의 `부모(parent) node`로부터 여러개의 `자식(child) nodes`를 추출할 수 있다. 각 `node`는 중요한 정보 3가지를 갖고 있다. `개인키(private key)`, `공개키(public key)`, 그리고 `체인코드(chain code)`이다. 암호화폐 지갑에서 개인키는 전자서명을 생성하기 위해 사용되고, 공개키는 암호화폐의 주소를 생성하기 위해 사용된다. 그리고 체인코드는 해당 개인키와 공개키만을 가지고 다른 누군가가 child nodes를 생성하는 것을 방지하기 위한 추가 정보이다.

`CKD function`은 유연성을 갖고 있어서 `public key`와 `chain code`만 있으면 `private key`가 없어도 `child public keys`를 생성할 수 있으며, `private key`와 `chain code`만 있으면 `child private keys`를 생성할 수 있다. 또한 [BIP 32][2]에는 ***`hardened`*** child node 개념이 있는데, 이 `hardened child nodes`의 `public keys`는 `parent public key`로부터 생성될 수 없다.

<br/>

#### 키 생성 조건

- parent private key & chain code ➞ child private key & chain code
- parent public key & chain code ➞ child public key & chain code (unless the child node is hardened)
- parent private key & chain code ➞ child public key & chain code

> Note:  
여기서 중요한 점은 `부모 공개키(parent public key)`를 가지고는 `자식 개인키(child private key)`를 ***생성할 수 없다는 것이다.*** 이 특성을 이용하면 hardened 키가 아닐 경우 다른 누군가에게 public key와 chain code를 주면 하위의 모든 `child pubic keys`를 계산할 수 있다는 점이다. 하지만 이때는 물론 `child private keys`는 계산할 수 없다.

<br/>

## 5. Applications of HD Trees

<br/>

### 1) Coin Types

HD 트리 안에서 서로 다른 암호화폐들은 각자 고유의 child key 노드의 위치를 나타내는 서로 다른 `path`를 갖고 있다. 이 `path`에 대한 정보는 공개되어 있으며, 이 `path`를 지정하는 방법은 [BIP 44][4] 표준에 정의되어 있다. 그리고 각 코인에 대한 `path`의 `coin type` 값은 [SLIP 44][5]에 등록되어 있다.

각 암호화폐마다 해당 코인에 대한 모든 키들이 시작되는 노드를 `coin type root node`라고 부른다. 그리고 이 `root node`는 앞서 보았던 `master node`와 동일한 방식으로 해당 루트 노드를 기준으로 하위에 무한개의 자식 키들을 생성할 수 있다. 따라서 `master seed` 하나만 있으면 무한개의 비트코인 주소와 무한개의 이더리움 주소를 생성할 수 있는 것이다.

<br/>

### 2) How does my wallet know which addresses I’ve used?

[BIP 44][4] 표준에서는 `path`를 지정하여 각 코인마다 무한개의 `account`를 가질 수 있다. 그리고 각 `account`에는 기본적으로 `change` 경로 인덱스 0번에 `external address`가 사용되고, 인덱스 1번에 `internal address`가 사용된다. 이 때 일반적으로 `external address`는 외부에 보여지는 용도의 지갑 주소에 사용되고, `internal address`는 `잔액(change)`을 보관하는 용도의 지갑 주소로 사용된다.

지갑 프로그램이 실행되면, 해당 코인의 account 0번부터 external chain과 internal chain에 대하여 각각 주소의 인덱스 0번에 해당하는 주소부터 시작하여 블록체인에 해당 주소의 관련 기록이 있는지 검색한다. 인덱스를 계속 늘려가며 블록체인에 해당 주소와 관련된 기록이 있는지 검색하여 특정 인덱스의 주소에서 거래 기록이 없을 경우 그 이후의 지갑 주소는 사용되지 않았다고 가정하고 거기서 검색을 중단한다(필요할 경우 계속 검색할 수도 있다.) 이런 방식으로 해당 코인과 관련된 정보 기록들을 `master seed` 한 개로 모두 검색할 수 있다.

<br/>

### 3) Summary

<img src="../images/ledger-documentation-1-background-information-5.3.1.1.png?raw=true" alt="drawing" width="832"/>

<br/>

### 4) Going Beyond Cryptocurrencies

`Hierarchical deterministic wallet`은 블록체인을 위한 자산을 보관하는데 매우 유용할 뿐만 아니라 기타 패스워드, PGP 키, SSH 키 등을 추출할 때도 매우 유용하게 쓰일 수 있다.

예를 들면, 레저에서는 패스워드를 관리할 수 있는 `Password Manager app`을 개발하였다. 이 앱은 특정 경로의 node 키값을 텍스트 패스워드로 사용한다. 사용자는 각 노드를 특정할 수 있는 `Label`을 입력하면 해당 `Label`이 각 `path`로 변환되어 특정 `node`의 키값을 패스워드로 읽어오게 된다.

<br/>

## 6. Application Isolation

레저 장치는 악성코드와 해커의 공격으로부터 비밀정보를 보호하기 위해서 `Secure Element` 안의 `application isolation technology`를 사용한다. 이를 위해서 `ARM`의 `Memory Protection Unit`과 `Operating Modes`를 활용한다. `Memory Protection Unit`은 각 `앱(app)`이 자신이 할당받은 메모리 공간에서만 natively isolated 되도록 보호하며, 각 `앱(app)`은 `User mode`에서 동작하고 `Operating System`은 `Supervisor mode`에서 동작한다. 이 장치는 `single-task model`로 동작하도록 제한되는데 즉, 한 번에 오직 한 개의 `앱(app)`만 실행될 수 있으며, 각 앱은 명시적으로 권한을 부여받지 않는 이상 `Secure Element`에 보관된 `비밀정보(cryptographic secrets)`에 직접 접근할 수 없다.

운영체제에 의해 관리되는 키와 비밀정보에 대한 앱의 접근권한은 각 앱을 장치에 로드할 때 설정할 수 있다. 장치에 저장된 `master seed`에 직접 접근하는 대신 각 앱은 해당 앱이 사용하는 키의 `node`를 `master seed`로부터 추출하여 전달받도록 `운영체제`에 해당 `node`의 `path`를 전달하여 요청한다. 각 앱(app)이 장치에서 로드될 때, 각 앱에서 사용하는 `node`를 추출할 수 있는 `BIP 32` `path`가 설정된다. 그리고 이후에 만약 해당 `앱(app)`에서 사용하도록 허용되지 않은 `path`에 대해서 운영체제에게 요청할 경우 해당 요청은 거절된다. 이러한 방식으로 서로 다른 앱들은 장치에 로드되어서 `HD tree` 안에서 서로 다른 각각의 특정 `subtree`로 접근이 제한된다. 그리고 이처럼 `운영체제`에게 Supervisor로서 특정 `연산(operation)`을 `요청(request)`하는 것을 ***`syscall`***이라고 부른다.

다음 챕터에서는 장치에 설치하려는 앱의 무결성을 검증하기 위해서 `운영체제`에서 제공하는 `attestation feature`에 대해서 알아보도록 할 것이다. 이를 위해서는 앱이 장치에 로드될 때 앱에서 제공하는 전자서명을 검증한다. 또한 레저 플랫폼이 얼마나 `open-source friendly`한지에 대해서 알아보고, 이러한 특성으로 인해 레저 장치에 설치되는 자산관리 앱을 당신이 직접 리뷰하고 검사할 수 있다.

<br/>

<br/>

---

### References

\[1\] *Ledger. (2019). [Ledger Documentation Hub][1] [Web Document]*

[1]: https://ledger.readthedocs.io/en/latest/background/introduction.html

\[2\] *Bitcoin. (2012, Feb 11). [BIP 32][2] [Github]*

[2]: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki

\[3\] *Bitcoin. (2013, Sep 10). [BIP 39][3] [Github]*

[3]: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

\[4\] *Bitcoin. (2014, Apr 24). [BIP 44][4] [Github]*

[4]: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki

\[5\] *Bitcoin. (2014, Jul 9). [SLIP 44][5] [Github]*

[5]: https://github.com/satoshilabs/slips/blob/master/slip-0044.md

<br/>

---

### Hashtags

`#Ledger` `#Crpytocurrency` `#Bitcoin` `#Blockchain` `#Crypto Wallet` `#Hardware Wallet` `#레저` `#암호화폐` `#암호화폐 지갑` `#블록체인` `#레저 지갑` `#콜드월렛` `#하드웨어 월렛` `#Secure Element` `#비트코인`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.





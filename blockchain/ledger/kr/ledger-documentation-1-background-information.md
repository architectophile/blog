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

레저 장치는 `BIP 39`라는 표준에 맞춰 `master seed`를 생성하고 사용한다. `BIP 39`는 다른 지갑들에서도 널리 사용되는 산업 표준이다. 레저 장치에서는 24개의 복구단어(mnemonic)를 생성하는 `BIP 39 English word list`를 사용하며, 이 단어들은 총 2048 가지의 단어들이 사용될 수 있다.

<br/>

### BIP 39 24-word mnemonic seed 생성 방법

1. 장치는 `TRNG`를 사용하여 `256비트` 길이의 `랜덤한 값`을 생성한다.
2. 생성된 랜덤값에 `SHA-256` 해쉬를 계산한 다음 그것의 최초 8비트 랜덤값에 뒤에 붙여 총 `264비트`의 값을 만든다.
3. 해당 264비트 값은 11비트씩 나누어 총 24개의 그룹으로 분리한다.
4. 각 11비트 길이의 값은 0~2047의 범위 중 해당되는 각 단어로 인코딩되고, 결과적으로 총 24개의 복구단어로 변환된다.

<br/>

따라서 장치에서 생성된 mnemonic seed 값은 전체 2<sup>256</sup>개의 가능한 mnemonic seed 중에서 한 개의 seed가 생성되는 것이다. 여기서 24개의 단어 중에서 마지막 단어는 3비트의 랜덤값과 8비트의 해쉬값이 더해져 생성되는데, 이것은 checksum과 같으 역할을 하게 된다.

<br/>

이렇게 24개의 복구단어를 생성하였으면, 이 값을 `PBKDF2-HMAC-SHA512` 키 추출 함수(key derivation function)에 넣어서 실질적으로 사용되는 `512비트` 길이의 `binary seed`를 생성하는데, 이 과정을 `serialization`이라고 부른다.그리고 이 때는 `24개`의 `mnemonic words`와 함께 `passphrase`도 추가하여 `binary seed`를 생성할 수도 있다.

<br/>

## 4. HD Key Generation

앞에서 생성한 24개 단어의 mnemonic seed로부터 이론적으로 무한개의 키를 생성하기 위해서 `hierarchical deterministic (HD) key generation` 방법을 사용한다. 레저 장치에서 사용하는 `HD kye generation` 프로세스는 `BIP 32` 표준에 정의되어 있다.

<br/>

### The Master Node

`HD key generation` 방법은 이론적으로 무한한 길이의 `암호키 트리(tree of cryptographic secrets)`를 생성하는 것이다. 이 트리에서 모든 것이 생성되는 최초의 뿌리에 해당하는 노드를 ***`master node`***라고 부른다.
이 `master node`는 이전에 생성한 `master binary seed`로부터 `HMAC-SHA512` 연산을 통해 직접 추출된다. 그리고 이 `master node`는 당신의 모든 개인키를 접근하는데 필요한 모든 정보를 담고 있다. 따라서 당신은 `mnemonic seed`를 매우 안전하게 보관해야 한다.

<br/>

### Passphrase

passphrase는 BIP 39 표준에서 정의하는 기능이다. passphrase는 HD wallet에서 `master node`를 추출하기 전에 `master seed`에 추가적인 데이터를 더할 수 있는 옵션 기능이다. 같은 `master seed`라도 서로 다른 passphrase를 추가함에 따라 완전히 서로 다른 `master node`가 생성된다. 이러한 방식으로 당신은 동일한 `master seed`에 대해서 서로 다른 passphrase를 여러개 관리함으로써 완전히 다른 지갑들을 여러개 관리할 수 있다.

<br/>

### An Infinite Tree

`master node`로부터 특정 키를 결정하기 위해서는 오직 이 트리에서 해당 키의 위치(`path`)만 알면 된다. 이 트리는 BIP 32에 정의된 CKD 함수라는 강력한 알고리즘에 의해서 생성된다. 이 알고리즘을 이용하면 어떤 `HD tree`에서 `master node`와 원하는 키의 `node`의 `path`만 알면 어떠한 `node`라도 계산할 수 있다. 이 알고리즘이 강려한 이유는 `master node`에서 하위 계층으로 키를 추출하는 것은 가능하지만 역으로 하위 계층에서 상위 계층의 node를 알아내는 것은 현실적으로 불가능하기 때문이다.

<br/>

### Child Key Derivation Function

CKD function을 이용하면 하나의 `부모(parent) node`로부터 여러개의 `자식(child) nodes`를 추출할 수 있다. 각 node는 중요한 정보 3가지를 갖고 있다. `개인키(private key)`, `공개키(public key)`, 그리고 `체인코드(chain code)`이다. 암호화폐 지갑에서 개인키는 전자서명을 생성하기 위해 사용되고, 공개키는 암호화폐의 주소를 생성하기 위해 사용된다. 그리고 체인코드는 해당 개인키와 공개키만을 가지고 다른 누군가가 child nodes를 생성하는 것을 방지하기 위한 추가 정보이다.

CKD function은 유연성을 갖고 있어서 public key와 chain code만 있으면 private key가 없어도 child public keys를 생성할 수 있으며, private key와 chain code만 있으면 child private keys를 생성할 수 있다. 또한 `BIP 32`에는 ***`hardened`*** child node 개념이 있는데, 이 `hardened child nodes`의 public keys는 parent public key로부터 생성될 수 없다.

<br/>

#### 키 생성 조건

- parent private key & chain code ➞ child private key & chain code
- parent public key & chain code ➞ child public key & chain code (unless the child node is hardened)
- parent private key & chain code ➞ child public key & chain code

> Note:  
여기서 중요한 점은 `부모 공개키(parent public key)`를 가지고는 `자식 개인키(child private key)`를 ***생성할 수 없다는 것이다.*** 이 특성을 이용하면 hardened 키가 아닐 경우 다른 누군가에게 public key와 chain code를 주면 하위의 모든 child pubic keys를 계산할 수 있다는 점이다. 하지만 물론 이 때 child private key는 계산할 수 없다.

<br/>


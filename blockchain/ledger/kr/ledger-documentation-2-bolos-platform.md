 #  II. Bolos Platform

<br/>

## 1. Introduction

이 챕터에서는 `BOLOS`에 의해 제공되는 핵심 기능들에 대해서 알아보고, 이 기능들을 `BOLOS` 어플리케이션과 사용자가 사용하는지 알아볼 것이다. 우리는 어떻게 `BOLOS`가 `master device seed`와 `device private key`를 관리하는지 알아보고, `attestation` 과정을 위해 어떻게 사용되는지 알아볼 것이다.  
또한 `BOLOS` 장치들에 공통적으로 사용되는 하드웨어 아키텍처에 대해서도 알아볼 것이다.

<br/>

## 2. Overview

`Ledger` 장치에서 사용되는 운영체제는 `Blockchain Open Ledger Operating System`, 줄여서는 `BOLOS`라고 불린다. `BOLOS`는 가벼운 오픈소스 프레임워크를 개발자에게 제공함으로써 어플리케이션의 소스코드 `이식성(portability)`이 좋은 어플리케이션을 개발할 수 있도록 하고, 이 어플리케이션은 `secure environment` 안에서 동작하게 된다. 따라서 `BOLOS`는 `하드웨어 지갑(hardware wallet)`을 `완전한 형태의(fully fledged)` `개인 보안 장치(personal security device)`로 만들어준다.

`BOLOS`는 사용자가 직접 어플리케이션을 리뷰하고 설치할 수 있도록 하며, 이 어플리케이션은 장치의 암호키를 이용하여 다양한 작업을 수행할 수 있는데, 이 때 `BOLOS`는 장치와 다른 어플리케이션들을 악성코드로부터 보호한다.  
`BOLOS`의 `open-source friendly`한 특성과 사용자의 암호키 노출을 제한할 수 있는 기능의 핵심이 되는 것은 바로 `application isolation technology`이다.

`BOLOS`는 크게 5개의 모듈들로 구성되어 있다.
- `입출력 모듈(An input / output module)`: `secure environment` 에서 구동되는 어플리케이션들이 `외부 세계(the outside world)` 또는 `third party peripherals`와 통신할 수 있도록 만든다.
- `암호 모듈(A cryptography module)`: 로우 레벨의 암호 프리미티브들을 구현하며, 필요할 경우 하드웨어 가속(hardware acceleration) 장치에 접근을 제공한다.
- `저장 모듈(A persistent storage module)`: 어플리케이션들이 데이터를 안전하게 장치에 저장할 수 있도록 한다.
- `보증 및 어플리케이션 증명 모듈(An endorsement & application attestation module)`: `BOLOS` 어플리케이션들이 `proof of execution`을 제공하도록 한다. 
- `사용자 인터페이스 모듈(A user interface module)`: GUI 렌더링과 사용자 입력(e.g. 버튼 입력)을 처리한다.

<br/>

### 1) The Dashboard

모든 `BOLOS` 장치는 특정 권한에서만 OS에서 동작하는 `특별한 어플리케이션(special app)`이 한 개 설치되어 있는데, 이것은 `Dashboard application` 또는 `PSD Content Manager`라고 불린다. 이 `dashboard app`은 사용자가 다른 앱을 열지 않았을 때 보이는 `메인 GUI`를 제공한다. 이 `dashboard app`을 이용하여 사용자는 `master seed`를 입력하고, 다른 앱을 실행시킬 수 있다. 또한 이 `dashboard app`은 사용자의 `host computer`와 통신하며 장치에 다른 앱을 로드하거나 삭제할 때 사용된다.

`dashboard`의 중요 컴포넌트는 바로 `BOLOS UX`이다. `BOLOS UX`는 장치 전반에 사용되는 사용자 인터페이스를 구현하며, 다른 어플리케이션들은 이를 이용하여 사용자와 상호작용할 수 있다. Nano S 펌웨어에 빌드되어 들어가는 `dashboard app`의 기본 UI는 `external application`을 로드하여 사용자가 원하는 UI로 변경하여 사용할 수도 있다.

<br/>

## 3. BOLOS Features

이번 섹션에서는, 우리는 `BOLOS`에 내장된 몇몇 기능들에 대해서 알아볼 것이다. 이러한 기능들은 `dashboard app` 또는 사용자공간 어플리케이션(`userspace applications`)에서 사용될 수 있다.

<br/>

### 1) Management of Cryptographic Secrets

`BOLOS`에 의해 관리되는 가장 중요한 두 개의 암호키가 있는데, 하나는 `Device keypair`(공장에서 생성됨)이고, 두 번째는 `BIP 32 master node`(BIP 39 mnemonic seed로부터 생성됨)이다. 이 두 가지의 키는 모두 `BOLOS`에 의해 저장되며, 어플리케이션들은 보안을 위해 직접 접근할 수 없다. `Device keypair`는 어플리케이션 증명(`application attestation`)을 위해 간접적으로 접근될 수 있다. 그리고 어플리케이션들은 `BOLOS`에 시스템 `호출(system call)`을 통해 `BIP 32 master node`로부터 필요한 키를 추출(`derive`)받을 수 있다(해당 앱이 장치에 로드될 때 적절한 권한(permissions)을 부여받았을 경우에만 가능).

<br/>

### 2) Passphrases in BOLOS

펌웨어 버전 1.3 이후부터 `BOLOS`는 사용자가 한 번에 여러개의 `BIP 39 passphrases`를 입력할 수 있게 되었다. 이전 챕터에서 설명한 것처럼 `passphrase`는 `BIP 39 master seed`에 사용자가 추가적인 엔트로피(entropy)를 부여함으로써 완전히 다른 `HD tree`를 생성할 수 있는 방법이다. 

<br/>

### 3) Attestation

#### (1) Anti-Tampering with Attestation

Ledger 장치에서 사용되는 증명(`attestation`) 프로세스는 해당 Ledger 장치가 위변조되지 않은 가짜 장치가 아니라는 것을 증명하는데 사용된다. 이것은 장치가 호스트 컴퓨터에 연결되었을 때, `BOLOS`가 해당 장치가 변조되지 않았음을 증명할 때 사용될 수 있다. 또한 이것은 어플리케이션들이 실행될 때, 진짜 Ledger 장치에서 실행되고 있음을 증명하기 위해서도 사용된다.

Ledger 장치는 펌웨어에 내장된 `anti-tampering technology`에 의해 물류창고에서 사용자에게 전달되는 과정에서 장치가 위변조될 수 있는 `interdiction attack`으로부터 보호된다. 사용자가 장치를 호스트 컴퓨터에 연결하여 사용할 때마다 `attestation` 기능을 사용하여 해당 장치의 진위성(`authenticity`)이 검증된다. 

모든 Ledger 장치들은 공장에서 생산될 때, 우선 자신만의 고유한 `Device public-private keypair`를 생성한다. 그리고 Ledger의 `Issuer key`를 이용하여 해당 `Device public key`를 서명하고, 해당 장치에는 `Issuer Certificate`이 저장된다. 해당 장치는 `Device public key`와 `Issuer Certificate`을 이용하여 그것이 진짜 Ledger 장치임을 증명할 수 있다.

Ledger 장치가 크롬 어플리케이션에 연결되었을 때, 장치는 `Issuer Certificate`을 이용하여 해당 장치가 진짜임을 증명한다. 만약 공격자가 가짜 펌웨어를 설치한 장치를 만들었을 경우 이 attestation 과정은 실패하게 된다. 왜냐하면 `Issuer Certificate`과 `Issuer key`로 서명된 `Device public key`가 없이는 `attestation`을 전송하는 것이 불가능하기 때문이다. 

<br/>

#### (2) Endorsement & Application Attestation

보안을 위해서 어플리케이션들은 `Device private key`에 직접 접근할 수 없다. 대신 어플리케이션들은 간접적으로 `attestation keypairs`를 생성하여 attestation을 전송할 수 있다. 

`attestation keypairs`은 사용자가 요구할 때마다 생성되어 어플리케이션이 사용할 수 있다. `attestation key`는 `endorsementSetup.py` 또는 `endorsementSetupLedger.py` 파이썬 로더(loader) 스크립트들을 이용하여 설치할 수 있다. `attestation keypair`를 생성할 때는 호스트 컴퓨터는 `dashboard app`에 연결하고 `Secure Channel`을 형성한다. 그리고 장치에게 명령하여 `attestation keypair`를 생성하도록 한다. 장치는 새로운 `attestation keypair`를 생성하고, `Device private key`를 이용하여 생성된 `attestation keypair`를 서명하여 `Device Certificate`을 생성한다. 그리고 장치는 생성된 `attestation public key`, `Device Certificate`, `Issuer Certificate`을 `Secure Channel`을 통해 호스트 컴퓨터에게 전송한다. 그 다음 `Ledger` 또는 `third party`에서 해당 `attestation public key`를 `Owner private key`로 서명하여 `Owner Certificate`을 생성한 다음 `Owner Certificate`을 `Secure Channel`을 통해 전송하여 장치에 저장한다.  
따라서 장치는 해당 `attestation key`가 진짜 Ledger 장치에 속하다는 것을 `Device Certificate`을 통해 증명하고, 또한 해당 `attestation key`가 `Owner`에게 신뢰된다는 것을 `Owner Certificate`을 이용하여 증명한다.

`attestation keys`는 어플리케이션들에 의해 직접 접근될 수 없으며, 대신 `BOLOS`가 `system call`에 의해 사용가능한 암호 프리미티브(cryptographic primitives)를 통해 `userspace applications`에게 `attestation` 기능을 제공한다.  
어플리케이션들이 사용할 수 있는 두 개의 `Endorsement Schemes`가 있다. `attestation keypair`를 생성할 때 사용자는 해당 `attestation keypair`가 어떠한 `scheme`에 속할지를 결정해야 한다. 어플리케이션들은 적절한 `Endorsement Scheme`에 제공되는 암호 프리미티브를 사용하여 해당 생성된 `attestation keypair`를 사용할 수 있다.

<br/>

`Endorsement Scheme #1`은 두 개의 암호 프리미티브(cryptographic primitives)를 제공한다.

- `os_endorsement_key1_get_app_secret(...)`: `attestation private key`로부터 비밀값을 추출하고, 실행되는 어플리케이션의 해쉬를 계산한다.
- `os_endorsement_key1_sign_data(...)`: 실행되는 어플리케이션의 해쉬가 연접된(concatenated) 어떤 메시지(message)를 `attestation private key`로 서명한다(이 서명은 `verifyEndorsement1.py`를 이용하여 검증할 수 있다.)

`Endorsement Scheme #2`는 하나의 암호 프리미티브(cryptographic primitive)를 제공한다.
- `os_endorsement_key2_derive_sign_data(...)`: `attestation private key`와 실행되는 어플리케이션의 해쉬값으로부터 추출된(derived) `private key`를 이용하여 어떠한 메시지(message)를 서명한다(이 서명은 `verifyEndorsement2.py`를 이용하여 검증할 수 있다.).

<br/>

#### (3) Attestation Chain of Trust

<img src="../images/ledger-documentation-2-bolos-platform-3.3.3.1.png?raw=true" alt="drawing" width="840"/>

<br/>

`attestation keys`에 의해 서명된 모든 데이터는 진짜(authentic) Ledger 장치에 의해 서명되었다고 신뢰될 수 있다. 왜냐하면 `Device Certificate`은 해당 `attestation key`가 어떤 장치에 속한다는 증명이고, `Issuer Certificate`은 해당 장치가 진짜(authentic) Ledger 장치임을 증명하는 것이기 때문이다. 게다가 `Owner Certificate`은 해당 `attestation key`가 `Owner(Ledger 또는 third party)`에 의해 신뢰된다는 것을 증명한다.

<br/>

### 4) Secure Channel

호스트 컴퓨터는 Ledger 장치와 `Secure Channel`을 형성함으로써 해당 장치의 `authenticity`를 검증하고, 데이터를 암호화하여 안전하게(securely) 비밀정보를 교환할 수 있다.

`Anti-Tampering with Attestation`에서 설명했던 것처럼, Ledger 장치의 `authenticity`는 해당 장치가 호스트 컴퓨터에 연결되었을 때 장치에게 `Issuer Certificate`을 요청함으로써 증명할 수 있다. 이 과정은 장치와 `Secure Channel`을 형성할 때 수행할 수 있다.  
오직 `dashboard app`만 호스트 컴퓨터와 `Secure Channel`을 형성할 수 있는데, 왜냐하면 이 때 `Device private key`에 대한 접근이 필요하기 때문이다.

`Secure Channel protocol`은 USB를 통해 장치와 통신할 때 사용되는 `APDU protocol` 위에서 만들어졌다. `Secure Channel protocol`은 호스트 컴퓨터로부터 전송되는 일련의 `Command APUDs`와 이에 대한 응답으로 장치에서 전송되는 `Reponse APDUs`로 이루어져있다.

`Secure Channel`은 `Signer`와 `Device` 사이에서 존재한다. `Signer`는 장치에 연결하는 원격 호스트이며, 이것은 우리의 API를 통해 장치에 연결하는 `Issure(Ledger)`일 수도 있고, 기존에 등록된 `Custom CA public key`를 이용해 장치에 연결하려는 `Custom Certificate Authority`일 수도 있고, 또는 무작위로 생성된 keypair를 사용하는 `end-user`일수도 있다.

`Secure Channel`을 형성할 때, `Signer`와 `Device`는 각자 `ephemeral keypair`를 생성하고 이를 이용하여 `ECDH` 알고리즘을 통해 `shared secret`을 서로 공유한다. 그리고 각 파티는 서로가 제공하는 인증서 체인(certificate chain)을 검증하여 상대방이 전송한 `ephemeral public key`를 신뢰한다. 이 때 인증서를 생성하는 과정에서 `Signer nonce`와 `Device nonce`를 넣음으로써 도청자에 의한 키 재사용을 방지할 수 있다. 만약 `Signer`로부터 제공된 `certificate chain`에서 `root certificate`이 장치가 신뢰하는 파티로부터 서명된 것임이 확인되면 `Secure Channel`이 형성된 이후에 장치는 해당 원격 호스트에게 특별한 권한(permissions)을 제공한다.  
예를 들면, 만약 `Signer`가 제공한 `certificate chain`에서 `root certificate`을 서명한 것이 `enrolled Custom CA keypair`이거나 `Ledger's Issuer keypair`일 경우, 호스트는 사용자의 동의 없이도 해당 장치에 임의로 앱을 설치하거나 제거할 수 있다.

<br/>

아래의 다이어그램은 `Secure Channel`을 형성하는 과정을 보여준다.

<img src="../images/ledger-documentation-2-bolos-platform-3.4.0.1.png?raw=true" alt="drawing" width="840"/>

<br/>

위 다이어그램에서 (6)번 과정 중, `Device`는 `Signer serial`을 제공한다. `Signer serial`은 장치에 의해 저장된 번호로서 해당 장치의 `Issuer Certificate`을 서명하기 위해 사용된 특정 `Issuer keypair`를 특정하기 위해서 사용되는데, 왜냐하면 Ledger는 모든 장치에 대해서 동일한 `Issuer keypair`를 사용하는 것이 아니기 때문이다.

`Signer certificate chain`이 생성되어 `Device`에게 전송된 다음 (7)에서 (11)까지의 과정을 통해 `Device`에게 검증된다. 그리고 `Device certificate chain`은 생성되어 `Signer`에게 전송된 다음 (12)에서 (16)까지의 과정을 통해 `Signer`에게 검증된다. 이 예제에서 양쪽의 `certificate chains`는 각각 2개의 `certificates`으로 구성된다.  
`Signer certificate chain`에서 `root certificate`은 `Signer private key`에 의해 `self-signed`되었다. 그리고 `final certificate`도 `Signer private key`에 의해 서명되었으며, 이것은 `Signer ephemeral public key`의 `authenticity`를 증명한다.  
그리고 `Device certificate chain`에서 `root certificate`은 `Issuer Certificate`이며, 이것은 장치의 `authenticity`를 증명한다. 그리고 `final certificate`은 `Device certificate`으로서 `Device private key`에 의해 서명되며 이것은 `Signer ephemeral public key`이 `authenticity`를 증명한다.

<br/>

### 5) Custom CA Public Key Enrollment

`Custom Certificate Authorities`는 `genCAPair.py`를 이용하여 `keypair`를 생성하거나 또는 `setupCustomCA.py`를 사용하여 그들의 `public key`를  장치에 등록(`enroll`)할 수 있다. `Custom CA public key`를 장치에 등록하는 것은 다음과 같은 특권을 부여한다.

- `Custom CA`는 인증된(authenticated) `Secure Channel`을 장치와 열 수 있다(파이썬 로더 스크립트에서 `--rootPrivateKey` 옵션을 사용).
- `Custom CA`는 `signApp.py`을 사용하여 어플리케이션을 서명하여 해당 앱을 장치에 로드할 때 사용자 동의를 받지 않고 설치할 수 있다.
  
이 기능은 `BOLOS application` 개발자들이 개발 프로세스를 간단하게 하기 위해 사용될 수도 있고, 더 나아가서는 `third party company`가 그들 자신의 `application manager`에게 권한을 부여하여 해당 장치를 괸리할 때 일일이 사용자의 동의를 받지 않기 위해 사용될 수도 있다.

<br/>

### 6) Parties Involved in our Model

#### Device

#### Device Certificate

각 장치는 고유한 `Device keypair`를 갖고 있으며, `Device private key`는 오직 장치만 알고 있으며 `Ledger` 또한 알지 못한다. 공장에서 `Device`는 자신의 고유한 `Device keypair`를 생성한다. `Device private key`는 인증서를 서명하기 위해 사용될 수 있다.

<br/>

#### Issuer

#### Issuer Certificate

`Issuer`는 `Device`를 최초에 제공하는 파티이며 이 파티는 항상 `Ledger`이다. `Issuer`는 `Issuer keypair`를 갖고 있으며, `Issuer private key`는 `Issuer Certificate`을 서명하기 위해 사용된다. `Ledger`는 여러개의 `Issuer keypair`를 갖고 있다.

<br/>

#### Owner

#### Owner Certificate

`Owner`는 장치를 갖고 있거나 또는 장치의 `authenticity`를 검증하는 파티이다. `Owner`는 `Owner keypair`를 갖고 있으며, `Owner private key`는 인증서를 서명하기 위해 사용될 수 있다. 하나의 장치는 여러개의 `Owners`를 가질 수 있으며, `Owner`는 반드시 `Ledger`일 필요는 없다. 장치는 `Owner Certificates`을 이용하여 `application attestation`에 사용할 수 있다.

<br/>

#### Custom CA

#### Custom CA Certificate

`Custom CA`는 `Custom CA keypair`를 갖고 있으며, `Custom CA public key`는 장치에 등록되어(`enrolled`) 있다. `Custom CA private key`는 장치와 `authenticated Secure Channel`을 형성하는데 사용되거나 또는 어플리케이션을 서명하는데 사용될 수 있다.

`Custom CA`는  `BOLOS application` 개발자이거나 또는 `third party company`일 수 있으며, 그들은 자신의 `application manager`에게 특별한 권한을 부여하여 `BOLOS device`를 관리할 수 있다.

<br/>

## 5. Hardware Architecture

`Ledger` 장치들은 고유한 설계 구조를 갖고 있어 `Secure Element`의 보안기능을 사용하면서도 여전히 다른 주변 장치들과(screen, buttons, host computer over USB, Bluetooth &NFC)과 상호작용할 수 있다. 이를 위해서 추가적인 `STM32 microcontroller`가 `Secure Element(SE)`에 연결되어 각종 주변장치와 `Secure Element` 사이에서 `dumb router`의 역할을 한다. 이 `MCU`는 어떠한 어플리케이션 기능도 수행하지는 않으며, `BOLOS`에 의해 사용되는 어떠한 데이터도 저장하지 않으며, 그저 주변 장치를 관리하고 새로운 데이터가 있을 때마다 `Secure Element`에게 알려주는 역할만 할 뿐이다. 모든 `BOLOS applications`는 온전히 `Secure Element`에서만 실행된다. 이 섹션에서 우리는 `Ledger` 장치의 하드웨어 구조에 대해서 알아볼 것이다.

<br/>

### 1) Multiple Processors: Secure Element Proxy

<img src="../images/ledger-documentation-2-bolos-platform-4.1.1.1.png?raw=true" alt="drawing" width="840"/>

<br/>

`BOLOS`는 두 하드웨어 칩 사이에서 나뉘는데 하나는 `secure`한 `ST32 Secure Element`이고, 다른 하나는 `JTAG enabled`된 `proxy`로서 동작하는 `STM32 MCU`이다.

그리고 `Secure Element`는 다시 두 부분으로 나뉜다. 하나는 `firmware`로서 `NDA`하에 소스코드가 공개되지 않는 것이고, 다른 부분은 `SDK` & `application-loaded code`로서 `open source friendly`하다. `BOLOS firmware`는 `low level I/O operations`를 담당하며, `SE-MCU link`를 구현한다(비록 `SE`와 `MCU` 사이의 프로토콜은 현재 실행 중인 `app`에 의해 처리되긴하지만 말이다.)

`Secure Element`는 강력한 보안기능을 제공하지만 부족한 입출력 인터페이스를 갖고 있다. 따라서 `Ledger` 장치는 이를 해결하기 위해서 입출력 인터페이스가 풍부한 `MCU`를 추가하여 `Secure Element`를 위한 `proxy`로 동작하도록 하였다. 그리고 간단한 `asynchronous protocol` 덕분에 `Secure Element`는 이 `proxy`를 제어할 수 있다.

`SE-MCU link protocol`은 `SEPROXYHAL` 또는 `SEPH`라고 불린다. `HAL`은 `Hardware Abstraction Layer`를 의미한다.

<br/>

### 2) SEPROXYHAL

`SEPROXYHAL` 프로토콜은 serialized된 3종류의 패킷(`Events`, `Commands`, `Statuses`)으로 구성되어 있다. `SEPROXYHAL`은 `Secure Element`가 외부 세계와 통신할 수 있는 유일한 채널이기 때문에 만약 프로토콜 레벨에서 오류가 있을 경우(e.g. Events / Commands / Statuses 형식의 순서가 잘못된 경우)에는 `SE`는 완전히 `isolated`된 상태로 빠지고 더 이상 통신을 중단한다. 만약 이런 상황이 발생했을 경우에는 `SE`와 통신하기 위해 장치를 `reboot`하고 `SEPROXYHAL` 프로토콜 상태를 리셋(reset)해야 한다. 

`SEPROXYHAL` 프로토콜은 다음과 같이 동작한다.

1. `MCU`는 `Event`(button press, ticker, USB transfer, ...)를 전송한다.
2. `SE`는 해당 `Event`에 대해서 0개 또는 여러개의 `Commands` 리스트를 응답으로 전송한다.
3. `SE`는 해당 `Event`의 처리가 완전히 완료되었다는 상태를 나타내는 `Status`를 전송한다.

<img src="../images/ledger-documentation-2-bolos-platform-4.2.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

사실 버퍼 사이즈 때문에 어떤 것을 스크린에 표시하는 요청은 `Status`를 이용하여 전달된다. `MCU`가 `Display Status` 처리를 완료했을 때는 `Display Processed Event`를 `SE`에 전달하여 또 다른 `Display Status`를 받을 준비가 되었다는 것을 알려준다. 따라서 완전한 사용자 인터페이스를 구축하기 위해 여러개의 elements를 스크린에 보여주는 것은 core application logic으로부터 비동기적으로(asynchronously) 이루어져야 한다. 이 프로세스는 `SDK`에 구현되어 있는 `UX helper`에 의해 용이해진다.

`SE`는 만약 어플리케이션이 두 개 이상의 `Statuses`를 연속으로 전송하려고 할 경우 exception을 throw한다. 따라서 반드시 각 `Status` 사이에는 적절한 `Event`가 전송되어야 한다. 

<br/>

## 5. Application Environment

`Secure Element`의 제한된 `RAM` 용량 때문에 `Secure Element`는 한 번에 한 개의 어플리케이션만 실행하도록 설계되었다. 따라서 한 어플리케이션이 실행되고 있을 때는 다른 어플리케이션들은 `SE-MCU` link에 개입할 수 없다. 이것은 `BOLOS`가 현재 실행 중인 어플리케이션에게 `주변장치(peripherals)`와의 `입출력(I/O)`에 대한 `full control`을 부여할 수 있다는 얘기이다. 이러한 모델은 `BOLOS`가 어플리케이션에게 가능한 많은 `control` 권한을 부여할 수 있도록 만들어준다. 근본적으로 각 어플리케이션은 `virtual device` 위에서 실행되며, 각자 원하는대로 하드웨어를 `reconfigure`할 수 있다. `BOLOS`는 각 어플리케이션을 다른 어플리케이션들로부터 분리시키고, 해당 앱에게 할당된 구역 외에는 나머지 플래쉬 메모리 영역에는 접근하지 못하도록 제한한다.

이러한 모델은 어플리케이션이 할 수 있는 것을 제한하지 않는다는 커다란 장점을 가지고 있지만, 한편으로는 각 어플리케이션이 `SE` 외부 세계와 통신하기 위해 필요한 전송 프로콜의 모든 레이어를 직접 관리해야 한다는 부담을 주기도 한다.  
다행히 `SDK`는 일반적인 어플리케이션들이 해야 하는 모든 `I/O` 처리에 대한 것을 구현하고 있다. 게다가 개발자들은 원할 경우 각 어플리케이션에 맞게 I/O 프로토콜을 커스터마이즈하여 사용할 수도 있다.

<img src="../images/ledger-documentation-2-bolos-platform-5.0.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

위의 다이어그램은 어플리케이션의 입장에서 바라본 시스템에 대한 구조이다. 어플리케이션은 다양한 주변장치(peripherals)에 직접 접근할 수 있으며, 앱이 실행되는 동안에는 장치의 실질적인 brain 역할을 한다. 각 박스 안의 주변장치들은 어플리케이션의 직접적인 명령 하에 있는 `coprocessors`로 볼 수 있다.

몇몇의 주변장치들은 `SE`로부터 `commands`를 전달받을 뿐만 아니라 `event`를 트리거할 수 있으며, 이것은 `MCU`에서 릴레이되어 `SE`에게 전달된다. 예를 들면, 사용자가 버튼을 눌렀을 때 발생하는 이벤트나 또는 백그라운드 통신을 수행하는 USB 컨트롤러나 또는 어플리케이션이 처리해야 하는 요청을 전달하는 `I/O` 주변장치 같은 경우에 해당한다.

이 모델에서는 어플리케이션이 중심에 있으며, 다른 어떠한 embedded co-applications에 의존하지 않는다.

<br/>

### 1) Delegation Model


<img src="../images/ledger-documentation-2-bolos-platform-5.1.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

`BOLOS`가 어플리케이션을 한 번 부팅하면, `BOLOS`는 더 이상 접근할 수 없다. 앱이 실행되는 동안 `BOLOS`는 오직 `시스템 호출(system calls)`을 통해서 `기본적인 서비스(basic services)`만 어플리케이션에게 제공한다.  
그 결과, `BOLOS`는 주변장치(e.g. USB)로부터 전달된 `commands`를 처리하지 않으며, 따라서 `BOLOS`는 `I/O`를 처리하는 역할을 하지 않는다.

이러한 두 가지 키 포인트로 인해서 어플리케이션은 장치에 대한 책임을 맡게 된다. 이것은 어플리케이션이 직접 디스플레이를 커스터마이즈하는 것 뿐만 아니라 사용자 입력에 대한 액션과 USB에서 장치가 enumerated 되는 방식도 변경할 수 있다. 만약 어플리케이션이 `Mass Storage emulation`이 필요하거나 `WinUSB` 주변장치로 보이게 하고 싶으면 그저 적절하게 `event`만 처리해주면 된다.

<br/>

<br/>

---

### References

\[1\] *Ledger. (2019). [Ledger Documentation Hub][1] [Web Document]*

[1]: https://ledger.readthedocs.io/en/latest/bolos/introduction.html

<br/>

---

### Hashtags

`#Ledger` `#Crpytocurrency` `#Bitcoin` `#Blockchain` `#Crypto Wallet` `#Hardware Wallet` `#레저` `#암호화폐` `#암호화폐 지갑` `#블록체인` `#레저 지갑` `#콜드월렛` `#하드웨어 월렛` `#Secure Element` `#비트코인`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

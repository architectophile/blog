 #  III. Userspace Development

<br/>

## 1. Introduction

이번 챕터에서는 BOLOS 개발 환경을 구축하기 위한 튜토리얼을 진행하고, 그에 필요한 다양한 BOLOS SDK 컴포넌트에 대해서 알아볼 것이다.

<br/>

## 2. Getting Started

> ***주의사항 :***  
현재 개발OS는 리눅스(Linux)만 지원된다. 윈도우나 맥 사용자는 가상머신을 사용해서 개발하도록 한다.

<br/>

`BOLOS` 어플리케이션을 개발하고 컴파일하기 위해서는 해당 레저 장치에 맞는 적절한 `SDK`(`Nano S SDk` 또는 `Blue SDK`)가 요구된다. 그리고 다음의 2개이 컴파일러가 필요하다.

- 스탠다드 ARM gcc : non-secure (STM32) 펌웨어를 빌드하고 secure (ST31) 어플리케이션을 링크하기 위해 필요
- 스탠다드 ARM clang (7.0.0 이상) with ROPI support : secure (ST31) 어플리케이션을 빌드하기 위함

<br/>

### 1) Setting up the Toolchain

`BOLOS` 어플리케이션이 사용하는 `Makefiles`는 `PAPTH` 환경 변수를 이용하여 `gcc`와 `clang`의 설치를 확인한다. 

만약 특정 버전의 `gcc` 또는 `clang`을 당신의 시스템에 직접적으로 설치하고 싶지 않을 경우에는 해당 로케이션을 `PATH` 환경 변수에 추가하면 된다.

```bash
# GCC
PATH=~/bolos-devenv/gcc-arm-none-eabi-5_3-2016q1/bin:$PATH

# Clang
PATH=~/bolos-devenv/clang+llvm-7.0.0-x86_64-linux-gnu-ubuntu-16.04/bin:$PATH
```

<br/>

`gcc-multilib`와 `g++-multilib` 패키지 안에 크로스 컴파일을 위한 헤더가 제공된다. 

```console
$ sudo apt install gcc-multilib g++-multilib
```

<br/>

### 2) Setting up the SDK

툴체인 셋업이 끝났으면 이제 해당 레저 장치에 맞는 SDK를 다운로드한다. 이 때 반드시 장치의 펌웨어 버전의 tag와 매칭되는 버전을 선택해야 한다. 

- Ledger Nano S SDK: https://github.com/LedgerHQ/nanos-secure-sdk
- Ledger Blue SDK: https://github.com/LedgerHQ/blue-secure-sdk

<br/>

그리고 `BOLOS_SDK` 환경변수를 다운로드한 SDK에 연결한다. `BOLOS` 앱을 위해 `Makefile`을 사용할 때, `Makefile`은 `SDK`의 컨텐츠를 사용하여 당신의 타겟 장치 ID(Ledger Nano S 또는 Ledger Blue)를 결정한다. 어떤 앱을 빌드하거나 로드하는것이 아니더라도 `Makefile` 에서는 `BOLOS_SDK` 환경변수에 연결된 `SDK`가 필요하다.

<br/>

### 3) Python Loader

호스트 컴퓨터에서 레저 장치와 통신을 하려는 경우에는 `Python loader`를 설치해야 한다. `Makefiles`는 대부분 `Python loader`와 직접 통신한다. 따라서 만약 단순히 앱을 로드하거나 삭제할 때는 `Python loader`에 의해 제공되는 많은 스크립트의 내용을 직접 알 필요는 없다. 하지만 여전히 `Python loader`는 설치되어 있어야 한다.

<br/>

### 4) Building and Loading Apps

이번 섹션에서는 당신의 첫 번째 `BOLOS` 앱을 컴파일하고 로드해보도록 할 것이다. 다양한 `BOLOS` 장치들을 지원하는 어플리케이션들은 일반적으로 단독적인 리포지토리에 들어있다. 따라서 당신은 동일한 리포지토리를 이용하여 다른 레저 장치를 위한 앱을 빌드할 수 있다. 이 떄 `BOLOS_SDK` 환경변수가 적절한 `SDK`로 설정되어 있는지 확인하도록 한다.

우선 boilerplate app을 다운로드 한다.

```console
$ git clone https://github.com/LedgerHQ/ledger-app-boilerplate.git
```

그 다음 Makefile이 모든 일을 처리하도록 한다. 해당 `load` 타겟은 필요할 경우 앱을 빌드하고 USB를 통해 당신의 장치에 앱을 로드할 것이다.

```console
$ cd ledger-app-boilerplate/
$ make load
```

당신이 장치에서 해당 앱을 설치를 허용하면 `Boilerplate`라는 이름의 앱을 볼 수 있을 것이다.

만약 앱을 삭제하고 싶다면 다음과 같이 삭제한다.

```console
$ make delete
```

`Sia` 앱은 커뮤니티에서 문서화를 매우 잘 해놓은 앱이다. 만약 완전한 기능의 앱을 공부하고 싶다면, 아래 리포지토리를 다운로드하도록 한다.

```console
$ git clone https://github.com/LedgerHQ/ledger-app-sia.git
```

<br/>

## 3. Interaction Between BOLOS and Apps

`BOLOS`는 `single-task` 모델로 설계되었기 때문에 한 번에 한 개의 앱만 실행될 수 있다. 따라서 해당 앱은 일반적인 OS가 처리해야 하는 일들도 직접 처리해야 한다. 이러한 작업들에는 장치 스크린이나 버튼, 타이머와 같은 하드웨어 처리나 주변장치와의 모든 I/O 처리 등이 포함된다. 하지만 어플리케이션이 특정 연산을 수행하기 위해  OS에게 요청해야 하는 수 많은 instances가 있는데, 이것은 `syscall`을 통해서 이루어진다.

어플리케이션이 `syscall`을 수행하면, `Secure Element`는 `Supervisor mode`로 전환하고, `OS`가 해당 요청된 작업을 수행한 후에 다시 어플리케이션에게 `User mode`로 컨트롤 권한을 돌려준다.

모든 `syscall`은 `SDK` 안에 `wrapper function`을 갖고 있으며, `syscall`을 호출할 때 사용된다. `syscall`은 하드웨어 가속된 암호 프리미티브(대부분 `SDK`의 `include/cx.h`에 포함되어 있음)에 접근하거나, 하위 레벨의 I/O 연산(`MCU` 데이터 송수신)을 하거나, 또는 `BOLOS`에 의해 관리되는 암호키에 접근하기 위해 사용된다(예를 들어 `BIP 32` 마스터 노드에서 특정 노드를 추출할 때 사용된다.)

<br/>

### 1) Error Model

만약 C 프로그래밍에 익숙하다면 `default error model`의 에러코드에 익숙할 것이다. 하지만 임베디드 환경에서는 이러한 전통적인 방식은 코드베이스의 크기를 증가시키기 때문에 우리는 자체적으로 `try / catch` 시스템을 구현하여 `nesting`을 지원하도록 하였으며, `setjmp`와 `longjmp` API를 사용하여 안정적인 코드를 작성할 수 있게 한다.

다음은 일반적인 `try / catch / finally` 구조의 예이다.

```
BEGIN_TRY {
    TRY {
        // Perform some operation that may throw an error using THROW(...)
    } CATCH_OTHER(e) {
        // Handle error
    } FINALLY {
        // Always executed before continuing control flow
    }
} END_TRY;
```

하지만 `try / catch` 시스템에 대해 알아야 할 한 가지 제한사항이 있는데, 그것은 바로 `TRY` clause는 반드시 적절한 방식으로 닫혀야 한다는 것이다. 만약 `return`, `break`, `continue` 또는 `goto` statement를 사용하여 해당 `TRY` clause 외부로 점프하게 될 경우에는 반드시 직접(manually) 닫아주어야 한다. 그렇지 않으면 나중에 `THROW`에서 앱의 충돌이 발생하게 된다. 

`TRY` clause는 `CLOSE_TRY`를 통해서 직접 닫힐 수 있다. `CLOSE_TRY`의 사용은 오직 `TRY`, `CATCH` 또는 `FINALLY` 외부로 점프할 때만 허용된다(하지만 여전히 `TRY` clause 안에서 `CATCH` nested되지는 않는 다는 것을 염두해야 한다.) 

가능한 경우 반드시 `SDK`에서 정의된 에러코드를 사용해야 한다(`os.h` 안에 있는 `EXCEPTION`, `INVALID_PARAMETER` 등을 참조하도록 한다.) 만약 커스텀 에러코드를 사용할 경우 절대 `0` 값을 갖는 에러코드는 사용해서는 안 된다.

<br/>

개발자들은 코드 사이즈와 스택 사이즈를 줄이기 위해서 가능하면 새로운 `try context`를 만들지 않는 것이 좋다. 이상적인 경우는 어플리케이션 `main() 함수` 안의 entry point에서 단 하나의 최상위(single top-level) `try context`를 갖는 것이 좋다. 

<br/>

### 2) Syscall Requirements

`BOLOS`는 에러를 처리하는데 있어서 `exception model`을 사용한다. 따라서 `BOLOS API`를 호출할 때, 이 메커니즘에 따라 호출해야 한다. 만약 API function이 `TRY context` 외부에서 호출될 경우 `BOLOS`는 해당 호출을 거절한다.

다음은 `system entry point`를 호출하는 유효한 방법이다.

```
BEGIN_TRY {
    TRY {
        cx_hash_sha512(...);
    } FINALLY {}
} END_TRY;
```

하지만 위에서 얘기한 것처럼, 가능하면 최소한의 `try contexts`를 사용하는 것이 좋기 때문에 `single top-level try context`를 사용하여 `catch` clause에서 모든 `syscall`에 의해 전달되는 모든 `exception`을 처리하는 것도 가능하다.

<br/>

## 4.  Application Structure and I/O

존재하는 많은 `BOLOS` 어플리케이션들은 스마트카드 구조에 기반하고 있다. 왜냐하면 `BOLOS` 어플리케이션은 독립적으로 실행되지 않고 컴퓨터나 스마트폰의 호스트 프로세스를 보조하여 전자서명, 암호화, 복호화 등의 연산을 수행하도록 만들어졌기 때문이다. 따라서 장치는 `command`, `response` scheme을 사용하여 접근된다.

하지만 `Event / Commands / Status` 모델은 `command / response` 동기화 모델을 사용하지 않기 때문에 어플리케이션의 제한사항을 없애준다. 개발자들은 원할 경우 해당 모델을 사용하지 않고 커스텀 이벤트 처리 루프를 재설계하여 원하는대로 변경할 수도 있다.

<br/>

### 1) APDU Interpretation Loop

장치에 접근하기 위한 `command / response` scheme은 `ISO/IEC 7816-4` 스마트카드 프로토콜과 유사하다. 각 `command / response` 패킷은 `APDU`라고 불린다. 어플리케이션은 절대 끝나지 않는 `APDU interpretation loop`에 의해 동작하며, 이 루프는 어플리케이션의 `main` 함수에서 직접 호출된다.

<br/>

`APDU interpretation loop`에서는 각 사이클마다 `SDK`로부터 `io_exchange(...)`를 호출한다.

하지만 가끔 보안관련 액션을 수행하기 위한 사용자의 컨펌이 반드시 `APDU`에 응답을 보내기 전에 수행되어야 할 때가 있다. 그럴 때는 해당 명령에 대해서 데이터가 없는 응답을 전달하는데 `IO_REPLY_ASYNC` flag를 사용한다. 그리고 `IO_RETURN_AFTER_TX` flag와 명령에 응답해야 하는 데이터의 함께 `io_exchange`를 호출하는 사용자 액션을 취한다.

이 기능의 예는 [blue-app-samplesign][2]을 참조하도록 한다. 이 앱에서 서명을 해야 하는 command APDU가 수신되었을 경우(510번 라인), `IO_ASYNC_REPLY` flag가 셋되고 response APDU는 응답하지 않는다. 만약 사용자가 해당 액션에 대한 컨펌을 취하면, 버튼 푸쉬 핸들러가 `io_seproxyhal_touch_approve(...)`을 호출하고, 이것은 response APDU를 전송하는데, 이 때 `io_exchange(...)`에 대하여 다른 호출을 사용하며, `IO_RETURN_AFTER_TX` flag를 함께 셋한다(434 라인). 만약 사용자가 해당 액션을 거부하였을 때도 동일하게 동작하며 이 때는 `io_seproxyhal_touch_deny(...)`가 호출된다.

<br/>

### 2) Protocols

대부분의 `BOLOS` 어플리케이션에서 사용되는 APDU 프로토콜은 `BOLOS`에서 직접 구현되지 않는다는 점을 이해하는 것이 매우 중요하다. 대신 `APDU interpretation`은 완전히 `SDK`에서 수행된다. 이것이 의미하는 것은 어플리케이션은 원할 경우 자체적인 프로토콜을 구현하여 transport layer(USB HID, USB CCID, BLE, ...) 위에서 APDU 대신에 사용할 수 있다는 것이다. 어플리케이션은 어플리케이션이 호스트에 의해 USB enumerated 되는 방식도 직접 커스터마이즈 할 수 있다.

<img src="../images/ledger-documentation-3-userspace-development-4.2.1.1.png?raw=true" alt="drawing" width="648"/>

<br/>

### 3) Unprocessed Events

APDU 처리는 `BOLOS` 방식의 `framing / transporting APDU packets`을 따른다. `USB`를 포함한 전송(transfer) 오퍼레이션과 관련된 모든 이벤트 처리는 `io_exchange(...)` 안에서 이루어진다. 몇몇 이벤트들은 `io_exchange(...)`에 의해 자동으로 처리되지 않는다(e.g. BUtton Push Events, Display Processed Events, Ticker Events, ...). 이러한 자동으로 처리되지 않는 이벤트들을 처리하기 위해서 `io_exchange(...)`는 `io_event(...)`를 호출하는데 이것은 `SDK`가 아니라 해당 어플리케이션에 의해 정의된다.

이벤트는 APDU 전송 중간에 발생할 수 있다(대부분 Button Push 또는 Ticker Events에 의해 발생한다). 그러한 경우, `io_event(...)`는 예상된 이벤트일 경우 반드시 `1`을 리턴해야 현재 APDU 전송이 종료되지 않는다(이 기능은 timeout을 구현하기 위해 사용될 수 있다.)

`SE` 안의 하드웨어 버퍼 덕분에 Event 패킷을 놓치지 않을 수 있다. 그리고 `E/Cs/S protocol design` 덕분에 새로운 `Status`가 어플리케이션에 의해 전송되기 전까지는 `MCU`는 다른 `Event`를 전송하지 않는다.

<br/>

<br/>

---

### References

\[1\] *Ledger. (2019). [Ledger Documentation Hub][1] [Web Document]*

[1]: https://ledger.readthedocs.io/en/latest/background/introduction.html

\[2\] *LedgerHQ. (2017, Jul 3). [blue-app-samplesign][2] [Github]*

[2]: hhttps://github.com/LedgerHQ/ledger-sample-apps/blob/2fb0f8f68ef68bbecd601cf476e532177288a0fa/blue-app-samplesign/src/main.c

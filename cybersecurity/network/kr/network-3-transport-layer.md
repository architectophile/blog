# 3. Transport Layer

`congestion control`은 네트워크 분야에서 매우 중요한 분야이다. 현재까지 많이 연구되고 있는 주제이다. `packet loss`를 최소화 하기 위해서 계속해서 연구하고 있다.

현재 우리 과목에서는 인터넷에서의 `congestion control`를 공부한다. 하지만 이외에도 데이터센터의 `congestion control` 연구 등 다양한 분야에서 연구하고 있다.

<br/>

## 3.1. transport-layer services

### (1) Transport services and protocols

<img src="../images/network-transport-layer-3.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`Transport Layer`에서 처리하는 통신은 `logical communication`으로서 `inter-process communication`을 처리한다. `Network Layer`는 `physical communication`이지만, `Transport Layer`는 포트번호를 이용해서 프로세스 간에 통신하기 때문에 `logical communication`이다.

- 전송자: `application layer`에서 전달받은 `messages`를 여러개의 `segments`로 나누어서 `network layer`로 전달한다.
- 수신자: `network layer`에서 전달받은 `segments`를 재조립하여 `messages`로 만든 뒤 `application layer`에게 전달한다.

<br/>

### (2) Transport vs. network layer

- `network layer`: 호스트들 사이의 `logical communication`. IP주소로 구분
- `transport layer`: 프로세스들 사이의 `logical communication`. Port 번호로 구분

<img src="../images/network-transport-layer-3.1.2.png?raw=true" alt="drawing" width="480"/>

<br/>

### (3) Internet transport-layer protocols

#### TCP: reliable(packet loss 재전송), in-order delivery(패킷 순서가 바뀌었을 때 재전송)
- `Congestion control`(리시버까지 가는 길목의 스위치 버퍼가 넘쳐서 패킷 로스가 발생하는 것을 막는 것). network-wide mechanism
- `Flow control`(호스트의 리시버 버퍼가 넘쳐서 패킷 로스가 발생하는 것을 막는 것). end-to-end mechanism
- `Connection setup`(사전에 connection을 수립한 뒤 통신)

#### UDP: unreliable, unorder Delivery
- No-frills extension of "best-effort" IP. 인터넷은 minimalism을 추구하기 때문에 최대한의 노력(best effort)을 하지만 패킷이 안정적으로 전달되는 것을 보장하지는 않는다.

#### Services of available
- Delay guarantees
- Bandwidth guarantees

<br/>

## 3.2. multiplexing and demultiplexing

<br/>

### (1) Multiplexing/demultiplexing

<img src="../images/network-transport-layer-3.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `multiplexing`: `application layer`에서 메시지가 내려오면 `transport layer` 헤더를 붙여서 `network laery`로 내려보내는 것
- `demultiplexing`: 소켓으로 여러개의 `segments`가 들어오면 상위의 `application layer`에게 전달하는 것

<br/>

### (2) How demultiplexing works

<img src="../images/network-transport-layer-3.2.2.png?raw=true" alt="drawing" width="320"/>

<br/>

### (3) Connectionless demultiplexing

<img src="../images/network-transport-layer-3.2.3.png?raw=true" alt="drawing" width="640"/>

<br/>

`UDP`를 사용하여 demultiplexing 할 때는 `destination IP address`와 `destination port number`가 필요하다.

`UDP`에서는 목적지의 IP주소와 포트번호가 동일하면 소스의 IP주소와 포트번호가 다르더라도 동일한 프로세스로 전달된다.

<br/>

### (4) Connection-oriented demultiplexing

<img src="../images/network-transport-layer-3.2.4.png?raw=true" alt="drawing" width="640"/>

<br/>

`TCP`를 사용하여 demultiplexing 할 때는 `source IP address`와 `source port number` `destination IP address`와 `destination port number`가 필요하다.

`TCP`에서는 목적지의 IP주소와 포트번호가 동일하더라도 소스의 IP주소와 포트번호가 다르다면 다른 프로세스로 전달된다.

<img src="../images/network-transport-layer-3.2.4.2.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Threaded server`: 하나의 프로세스만 생성하고 그것을 다시 여러개의 `쓰레드(thread)`로 분리하는 방식

<br/>

## 3.3. connectionless transport: UDP

- `Connection-less`(handshaking 없음)
- `No frills`, `bare bones` internet transport protocol
- `Best effort` 서비스
- 스트리밍 멀티미디어 서비스(loss tolerant, rate sensitive), DNS, SNMP

#### Reliable transfer over UDP
- add reliability at application layer:  `application layer`에 패킷 재전송 메커니즘을 넣을 수 있음(application layer에서 처리되는 속도가 network stack(linux kernel)에서 처리되는 속도보다 빠름)
- application-specific error recovery

### (1) UDP: segment header

<img src="../images/network-transport-layer-3.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`UDP segment header`에는 `source port #`, `destination poart #`가 기록된다.

※ 구글에서 만든 `QUIC(http/3)`는 `UDP`를 사용하여 `TCP`처럼 동작하게 만드는 것인데, connection 수립하는 것을 1 RTT로 줄였다.

<img src="../images/network-transport-layer-3.3.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`UDP`는 `source port #`를 사용하지 않는데, 왜냐하면 `connection-less`이기 때문이다. 하지만 응답할 때 `source port #`와 `destination poart #`가 뒤바뀌어 전송되기 때문에 여전히 `source port #`가 필요하다.

<br/>

### (2) UDP checksum

`UDP`는 checksum을 이용하여 전송된 segment의 오류를 검사한다.

<br/>

## 3.4. principles of reliable data transfer

<br/>

## 3.5. connection-oriented transport: TCP

<br/>

## 3.6.  principles of congestion control

<br/>

## 3.7. TCP congestion control
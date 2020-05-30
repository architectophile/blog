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

### (1) Principles of reliable data transfer

<img src="../images/network-transport-layer-3.4.1.1.png?raw=true" alt="drawing" width="392"/>

<br/>

실제 `physical channel`은 `unreliable`하지만 `TCP`를 사용하면 `transport layer`에서 `reliable`하게 만든다.

unreliable channel의 특성이 `reliable data transfer` protocol (`rdt`)의 복잡도를 결정한다. 즉 transport layer 아래에 있는 채널이 unreliable할수록 이것을 reliable하게 만들기 위해서는 더욱 복잡한 메커니즘이 필요하게 된다.

<br/>

<img src="../images/network-transport-layer-3.4.1.2.png?raw=true" alt="drawing" width="840"/>

<br/>

### (2) Reliable data transfer: getting started

<img src="../images/network-transport-layer-3.4.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`sender`쪽에서는 `application layer`에서 message를 생성하여 `rdt_send()`를 호출하고, `transport layer`에서 `udt_send()`를 호출하면 `unreliable channel`을 통해서 데이터가 전달된다.

`receiver`쪽에서는 데이터가 도착하면 `transport layer`에서 `rdt_rcv()`를 통해 데이터를 전달받고 이를 message 만들어서 `application layer`에게 위로 전달한다.

`TCP`는 `reliable data transfer protocol`의 완성본이다. 따라서 TCP는 RDT의 일종이지만, RDT는 TCP가 아니다.

<img src="../images/network-transport-layer-3.4.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

FSM(finite state machines)를 사용하여 어떤 이벤트가 발생하면 state1에서 어떤 액션을 취하여 state2로 넘어가는 것으로 다양한 rdt를 설명한다.

<br/>

### (3) rdt1.0: reliable transfer over a reliable channel

<img src="../images/network-transport-layer-3.4.3.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`rdt1.0`은 매우 단순한 가정으로 시작한다. udt 채널이 unreliable할수록 더욱 rdt protocol이 복잡해진다. rdt1.0에서는 매우 단순화하기 위해 `underlying channel`이 ***완벽하게 reliable하다고 가정한다.***

#### Sender

대기하다가 application layer에서 rdt_send(data)를 호출하면 make_pkt(data)로 packet을 생성하고 udt_send(packet)을 호출하여 데이터를 전송한다.

#### Receiver

대기하다가 rdt_rcv(packet)을 통해 packet을 전달받고, extract를 호출하여 packet에서 data를 추출하여 deliver_data(data)를 호출하여 application layer에게 data를 전달한다.

즉, sender는 대기하다가 application layer에서 데이터가 들어오면 전송하고, receiver는 대기하다가 데이터가 들어오면 application layer에게 전달한다.

<br/>

### (4) rdt2.0: channel with bit errors

`rdt2.0`에서는 packet loss는 발생하지 않지만 대신 packet의 순서가 뒤바뀌어서 bit errors가 발생할 수 있다.

`checksum`을 이용하여 `bit error detection`을 한다.

`checksum`을 검사한 후 정상적이면 `acknowledgements(ACKs)`을 전송하고, 만약에 오류가 있으면 `negative acknowledgements)NAKs`을 전송한다. 

<img src="../images/network-transport-layer-3.4.4.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Sender

application layer에서 data가 전달되면, packet을 만드는데 이 때, checksum을 함께 넣는다. 그리고 packet을 전송한 후에 state는 `Wait for ACK or NAK` 상대로 바뀐다. 이 후에 rdt_rcv(rcvpakt)을 통해 packet을 전송받고, 만약 이 때 `NAC`이 전송되었을 경우 udt_send(sndpkt)을 호출하여 packet을 재전송한 후에 다시 대기상태에서 기다린다. 하지만 만약 `ACK`을 전달받았을 경우 state는 원래 상태인 `Wait for call from above`로 바뀐다.

#### Receiver

rdt_rcv(rcvpkt)을 통해 packet을 전달받고, 만약 checksum 값에 오류가 있으면 `NAK`을 전송하고 state가 다시 `Wait for call from below`로 바뀐다. 하지만 만약 checksum 결과가 정상적이면 packet에서 data를 추출하여 application layer에게 전달한 후에 `ACK`를 전송하고 state가 다시 `Wait for call from below`로 바뀐다.

<br/>

#### rdt2.0 has a fatal flaw!

- receiver가 보내는 ACK NAC에도 bit error가 발생할 수도 있다. 하지만 이를 검사하지는 않는다. 따라서 sender가 보낸 데어티가 일반 전송인지 아니면 NAC에 대한 재전송인지 확인할 수 있는 방법이 없다.

<br/>

### (5) rdt2.1: sender, handles garbled ACK/NAKs

rdt2.1 에서는 `sequence number`를 추가하여 sender가 보낸 packet이 재전송인지 아닌지 알 수 있다.

#### Sender

<img src="../images/network-transport-layer-3.4.5.1.png?raw=true" alt="drawing" width="640"/>

<br/>

sender는 application layer에서 내려온 data를 packet으로 만들고 `checksum`과 `sequence number`를 함께 전송한다. 그리고 receiver로부터 응답받은 packet에 오류가 있거나 또는 NAC일 경우 해당 packet을 재전송한다. 그리고 다시 `Wait for ACK or NAC 0` state로 돌아온다. 그리고 receiver로부터 전달받은 packet에 오류가 없고 ACK일 경우에 `Wait for call 1 from above` state로 바뀐다.

<br/>

#### Receiver

<img src="../images/network-transport-layer-3.4.5.2.png?raw=true" alt="drawing" width="840"/>

<br/>

#### `Wait for 0 from below` state일 때

전송받은 packet에 오류가 없고 `sequence number`가 0이라면 data를 application layer에게 전달하고 checksum과 함께 ACK을 전달한다(***rdt2.1에서는 receiver도 packet을 전송할 때 `checksum`을 함께 전송한다.***) 그리고 `Wait for 1 from below` state로 변경된다.

만약 전송받은 packet에 오류가 있을 경우 checksum과 함께 NAC을 전송한다. 그리고 만약에 packet을 받았는데 오류는 없지만 `sequence number`가 1일 경우 checksum과 함께 ACK을 전송한다.

<br/>

#### `Wait for 1 from below` state일 때

전송받은 packet의 오류가 없고 sequence number가 1이라면 application layer에게 data를 전달한 다음, checksum과 함께 ACK을 전송한다. 그리고 `Wait for 0 from below` state로 변경된다.

만약 전송받은 packet에 오류가 있을 경우 checksum과 함께 NAC을 전송한다. 그리고 만약에 packet을 받았는데 오류는 없지만 `sequence number`가 0일 경우 checksum과 함께 ACK을 전송한다.

<br/>

> ***Note:***  
rdt2.0과 rdt2.1은 `stop and wait` 방식이기 때문에 sequence number가 0과 1만 있어도 충분하다. 하지만 stop and wait 방식이 아닌 여러개의 packet을 전송할 때는 sequence number가 2개로는 충분하지 않다.

<br/>

### (6) rdt2.2: a NAK-free protocol

rdt2.1은 ACK과 NAC의 비트 오류를 해결하기 위해 디자인 되었다. 하지만 구현해본 결과 NAC이 굳이 필요없다는 것을 알게되었다.

<br/>

#### Sender

<img src="../images/network-transport-layer-3.4.6.1.png?raw=true" alt="drawing" width="720"/>

<br/>

application layer에서 data를 전달받은 후 packet으로 만들어서 전송한 다음 `Wait for ACK 0` 상태로 변경된다.

#### `Wait for ACK 0` state일 때

전달받은 packet에 비트 오류가 있거나 또는 ACK이 아닐 경우 동일한 packet을 재전송한 다음 계속 `Wait for ACK 0` 상태로 대기한다.

전달받은 packet에 비트오류가 없고, ACK일 경우에는 `Wait for call from 1 from above` 상태로 변경된다.

<br/>

#### `Wait for ACK 1` state일 때

위의 방법과 동일하게 처리한다.

<br/>

#### Receiver

#### `Wait for 0 from below` state일 때

전달받은 packet에 비트 오류가 없고 sequence number가 0일 경우 데이터를 추출하여 application layer에게 전달한 후 ACK0을 전송하고 `Wait for 1 from below` state로 변경된다.

만약 전달받은 packet에 비트 오류가 있거나 또는 sequence number가 1일 경우에는 전달받은 packet을 재전송한다.

<br/>

### (7) rdt3.0: channels with errors and loss

`rdt3.0`에서는 `bit erros`와 `packet loss`가 발생할 수 있다고 가정한다.

`timer`를 시용하여 일정시간 기다린 후에 응답이 오지 않으면 재전송을 한다.

<img src="../images/network-transport-layer-3.4.7.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Sender

packet을 보냄과 동시에 start_time를 호출하여 timer를 실행시킨다.

#### `Wait for ACK 0` state일 때

packet을 응답받아서 비트 오류가 없고 sequence number가 0인 ACK일 경우에는 ***`timer`를 종료하고***, `Wait for call 1 from above` 상태로 변경된다.

만약 전송받은 packet에 비트 오류가 있거나 또는 sequence number가 1인 ACK일 경우에는 재전송하고 다시 그대로 `Wait for ACK 0` 상태로 남아있는다.

그리고 만약에 packet을 전송받지 않았어도 만약 `timer`가 일정시간을 초과하면 `packet loss`가 발생할 것으로 간주하고 packet을 재전송한다.

<br/>

#### `Wait for ACK 0` state일 때

위 방법과 동일하다.

<br/>

#### Receiver

`rdt 2.2`와 동일하다.

<br/>

#### rdt3.0 in action

<img src="../images/network-transport-layer-3.4.7.2.png?raw=true" alt="drawing" width="640"/>

<br/>

<br/>

<img src="../images/network-transport-layer-3.4.7.3.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Performance of rdt3.0

stop and wait 방식을 쓰기 때문에 utilization이 0.00027로 매우 떨어진다. 따라서 network protocol이 physical resources의 사용을 제한하는 것이다. Bandwidth는 충분한데 이것을 모두 사용하지 않는다.

<br/>

#### rdt3.0: stop-and-wait operation

<img src="../images/network-transport-layer-3.4.7.4.png?raw=true" alt="drawing" width="720"/>

<br/>

`stop and wait` 방식을 사용할 경우 패킷을 하나 전송할 때마다 RTT 시간이 소모되는 것이 매우 비효율적이다. 패킷을 하나 전송할 때 switch output port에서 link로 bit가 올라가는 시간인 transmission time은 매우 짧지만 `RTT`가 매우 커서 `utilization`이 매우 작아져 비효율적이다.

<br/>

### (8) Pipelined protocols

`pipelined protocols`는 utilization을 극대화하기 위해서 한 번에 여러개의 패킷을 전송하는 프로토콜이다. 대표적으로는 `Go-back-N`과 S`elective repeat` 프로토콜이 있다.

<img src="../images/network-transport-layer-3.4.8.1.png?raw=true" alt="drawing" width="720"/>

<br/>

#### Go-back-N

만약 패킷이 1 2  4 5가 전달되어 3이 로스가 발생했을 경우, 3 4 5를 재전송한다. 따라서 마지막으로 성공적으로 전송된 패킷 이후에 모든 패킷을 다시 보낸다.

<br>

#### Sender

<img src="../images/network-transport-layer-3.4.8.2.png?raw=true" alt="drawing" width="720"/>

<br/>

`window size` N은 한 번에 보낼 패킷의 개수를 나타낸다. 위 예제에서는 N=14이다. 성공적으로 ACK이 수신될 때마다 window가 한 칸씩 오른쪽으로 슬라이드된다.

녹색은 이미 ACK을 받은 패킷을 의미한다. 노란색은 패킷을 보냈지만 아직 ACK이 도착하지 않은 패킷을 의미한다. 파란색은 아직 전송하지 않은 패킷을 의미한다.

timeout이 발생할 경우 아직 응답을 받지 못한 윈도우 안의 노란색 패킷을 모두 재전송한다.

<br/>

<img src="../images/network-transport-layer-3.4.8.3.png?raw=true" alt="drawing" width="720"/>

<br/>

#### GBN: receiver extended FSM

<img src="../images/network-transport-layer-3.4.8.4.png?raw=true" alt="drawing" width="720"/>

<br/>

GBN receiver쪽에 버퍼가 없기 때문에 1 2 5 3 4가 와도 3부터 재전송받게 된다.

<br/>

#### GBN in action

<img src="../images/network-transport-layer-3.4.8.5.png?raw=true" alt="drawing" width="720"/>

<br/> 

#### Selective Repeat

만약 패킷이 1 2  4 5가 전달되어 3이 로스가 발생했을 경우, 3만 재전송한다. 따라서 로스가 발생한 패킷만 선택적으로 재전송한다.

<img src="../images/network-transport-layer-3.4.8.6.png?raw=true" alt="drawing" width="720"/>

<br/>

- receiver 버퍼가 존재한다.
- sender는 ACK을 받지 못한 패킷에 대해서만 재전송한다.

<img src="../images/network-transport-layer-3.4.8.7.png?raw=true" alt="drawing" width="720"/>

<br/>

#### Selective repeat in action

<img src="../images/network-transport-layer-3.4.8.8.png?raw=true" alt="drawing" width="720"/>

<br/>

GBN에 비해서 Selective repeat은 receiver buffer가 필요하기 때문에 추가적인 리소스가 필요하기 때문에 trade-off가 된다.

TCP는 GBN도 아니고 Selective repeat도 아니다. 

<br/>

## 3.5. connection-oriented transport: TCP

<br/>

### (1) TCP: Overview

- point-to-point: one sender, one receiver
- reliable, in-order byte stream: no "message" boundaries
- pipelined: TCP `congestion control` and `flow control`
- full duplex data: bi-directional data flow, MMS: maximum segment size(transport layer에서 한 번에 보낼 수 있는 최대 바이트)
  - Message(application)
  - Segment(transport)
  - Datagram(network)
  - Frame(link)

- connection-oriented: handshaking
- flow controlled: sender will not overwhelm receiver

> Note:  
`QUIC(HTTP/3)`는 application layer에서 TCP를 구현하고 transport layer에서는 UDP를 사용한다.

- `flow control`: end-to-end(receiver의 버퍼에서 전송받을 수 있는 패킷). receiver가 알려주면 되기 때문에 컨트롤이 쉬움
- `congestion control`: network-wide(switch의 버퍼에서 전송받을 수 있는 패킷). 수 많은 sender들이 보낸 패킷이 모이기 때문에 컨트롤하기가 훨씬 어려움. 스위치가 매우 많은 개별 sender들에게 받을 수 있는 패킷 수를 알려주면 리소스가 많이 소모되고, 또한 sender들이 여러 개의 스위치를 거치기 때문에 패킷 경로에 있는 모든 스위치끼리 통신을 해야 하는데 이것은 쉽지 않음

<br/>

### (2) TCP segment structure

<img src="../images/network-transport-layer-3.5.2.1.png?raw=true" alt="drawing" width="720"/>

<br/>

반드시 source port #, dest port #를 포함해야 원격에 있는 프로세스를 찾아갈 수 있다.

sequence number는 각 segment의 id라고 할 수 있다.

acknowledgement number는 receiver가 다음에 받기로 예상되는 sequence number를 넣는다.

`receive window`가 `flow control`할 때 사용되는 윈도우 사이즈(receiver가 받을 수 있는 바이트 수)이다.

<br/>

### (3) TCP seq. numbers, ACKs

<img src="../images/network-transport-layer-3.5.3.1.png?raw=true" alt="drawing" width="520"/>

<br/>

> Note:  
`out-of-order` segments를 처리하는 방법은 TCP의 구현에 달려있다.

<br/>

<img src="../images/network-transport-layer-3.5.3.2.png?raw=true" alt="drawing" width="520"/>

<br/>

### (4) TCP round trip time, timeout

- timer를 너무 짧게 설정하면 premature timeout 문제가 발생한다.
- timer를 너무 길게 설정하면 packet loss가 발생한 것을 빨리 알지 못해 전체 시간이 길어질 수 있다.
  
`timer`는 당연히 `RTT`보다는 길게 설정해야 한다. 그런데 `RTT`는 실시간 네트워크 상태에 따라서 계속해서 달라진다. 왜냐하면 경로에 있는 여러 스위치 버퍼의 상태가 계속 변동하기 때문이다. 또한 상대방 end host의 패킷을 처리하는 network stack도 랜덤하게 퍼포먼스가 동적으로 바뀐다. 이를 해결하기 위해서 `RTT estimation`을 하게 된다.

<img src="../images/network-transport-layer-3.5.4.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<img src="../images/network-transport-layer-3.5.4.2.png?raw=true" alt="drawing" width="640"/>

<br/>

Linux에서는 Retransmission Timeout(RTO)라고 한다. RTO_final = max(RTO_min, RTO)

RTO_min = Base RTT = packet delay - queueing delay

Linux의 timeout resolution을 하는 jiffy timer는 1ms 단위를 사용하므로 RTO_min = 1ms가 된다.

그런데 데이터센터 네트워크 환경에서는 us-scale로 동작한다. e.g. base RTT = 50us일 때 RTO_min은 시스템에서 지원하는 것이 1ms이므로 RTO값이 아무리 작아도(e.g. 100us) RTO_min값인 1ms가 된다. 따라서 RTO_final 값이 항상 RTO_min 값으로 수렴된다.

e.g. RTO_min=5ms, RTO=100us일 때, 데이터센터 네트워크에서는 `packet loss`가 발생하면 시간이 초과하여 timer가 발동된 후에 전송된다. 따라서 timer가 발동할 때까지 5ms가 소요되고, 추가로 100us이므로 5.1ms의 전송속도가 걸린다. 만약 packet loss가 발생하지 않았을 경우에는 100us가 소요된다. 따라서 `packet loss`가 발생하면, `packet loss`가 발생하지 않았을 때보다 50배 이상 증가하게 된다. 왜냐하면 리눅스에서는 timer resolution이 ms-scale로 조절되기 때문이다.

<br/>

### (5) TCP reliable data transfer

- TCP creates rdt service on top of IP’s unreliable service
- Retransmissions triggered by timeout events and duplicate acks
- simplified TCP sender: ignore duplicate akcs, ignore flow control, and congestion control

<br/>

### (6) TCP sender events

<br/>

### (7) TCP sender (simplified)

<img src="../images/network-transport-layer-3.5.7.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### (8) TCP: retransmission scenarios

<img src="../images/network-transport-layer-3.5.8.1.png?raw=true" alt="drawing" width="640"/>

<br/>

<br/>

<img src="../images/network-transport-layer-3.5.8.2.png?raw=true" alt="drawing" width="640"/>

<br/>

### (9) TCP ACK generation

<img src="../images/network-transport-layer-3.5.9.1.png?raw=true" alt="drawing" width="640"/>

<br/>

duplicate ACK은 받기로 한 패킷이 안오면 바로 직전에 보냈던 ACK을 다시 보낸다.

<br/>

### (10) TCP fast retransmit

<img src="../images/network-transport-layer-3.5.10.1.png?raw=true" alt="drawing" width="320"/>

<br/>

ACK을 3번 동일하게 보내면 packet loss가 발생했다고 판단하고 빠르게 retransmission을 한다.

<br/>

<img src="../images/network-transport-layer-3.5.10.2.png?raw=true" alt="drawing" width="640"/>

<br/>

### (11) TCP flow control

<img src="../images/network-transport-layer-3.5.11.1.png?raw=true" alt="drawing" width="320"/>

<br/>

receiver가 sender에게 버퍼에 받을 수 있는 패킷 수를 알려주기 위해서 TCP header receive window 필드에 `rwnd` 값을 넣어서 보낸다.

`rwnd`는 전체 receive buffer 사이즈 중에서 현재 남아 있는 `free buffer space`를 의미한다.

<br/>

## 3.6.  principles of congestion control

<br/>

## 3.7. TCP congestion control
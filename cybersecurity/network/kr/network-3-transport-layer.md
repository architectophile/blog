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
- full duplex data: bi-directional data flow, MSS: maximum segment size(transport layer에서 한 번에 보낼 수 있는 최대 바이트)
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

receiver가 sender에게 버퍼에 받을 수 있는 패킷 수를 알려주기 위해서 TCP header receive window 필드에 `rwnd(receive window size)` 값을 넣어서 보낸다.

`rwnd`는 전체 receive buffer 사이즈 중에서 현재 남아 있는 `free buffer space`를 의미한다.

<br/>

### (12) Connection Management

sender/receiver 사이에 데이터를 교환하기 전에 "handshake"를 통해 connection을 맺은 후에 통신한다. 그리고 통신을 close할 때도 서로에게 알려준다.

<br/>

### (13) Agreeing to establish a connection

<img src="../images/network-transport-layer-3.5.13.1.png?raw=true" alt="drawing" width="320"/>

<br/>

실제 `TCP`에서는 3-way handshake를 사용한다.

### (14) TCP 3-way handshake

<img src="../images/network-transport-layer-3.5.14.1.png?raw=true" alt="drawing" width="720"/>

<br/>

처음 handshake를 시작할 때 클라이언트는 SYNbit = 1로 설정, Seq=x는 랜덤하게 설정하여 서버에게 전송한다.

TCP는 양방향 통신(full-duplex)이기 때문에 클라이언트와 서버에서 서로 Initial Sequence #를 전송한다. 

`3-way handshake`를 통해 양방향의 connection이 수립된다.

<br/>

### (15) TCP: closing a connection 

<img src="../images/network-transport-layer-3.5.15.1.png?raw=true" alt="drawing" width="720"/>

<br/>
 
클라이언트는 FINbit=1, seq=x를 전송한다. 서버에서는 클라이언트의 Fin 요청에 대한 응답을 전송한다. 그리고 서버도 클라이언트에게 Finbit=1를 전송하여 connection 종료를 알려주고 마지막으로 클라이언트에서도 서버의 connection 종료에 대한 응답을 보내고 `4-way handshake`를 마무리한다.

<br/>

## 3.6.  principles of congestion control

<br/>

### (1) Principles of congestion control

`Network congestion`: 네트워크 상에 존재하는 어떤 스위치상의 link로의 arrival(input) rate가 departure(output) rate 보다 큰 경우에 발생한다. `flow contorl`과는 다르게 network-wide한 영역이다. 버퍼에 들어간 패킷은 queueing delay를 경험하고, 버퍼에 들어가지 못한 패킷은 packet loss를 경험한다.

<br/>

### (2) Causes/costs of congestion: scenario 1

<img src="../images/network-transport-layer-3.6.2.1.png?raw=true" alt="drawing" width="720"/>

<br/>

위 가정에서는 ***무한한 크기의 버퍼를 사용***하고, packet loss가 발생하지 않기 때문에 재전송(retransmission)이 없다. arrival rate가 증가할 수록 `queueing delay`가 무한히 계속 증가한다.

<br/>

### (3) Causes/costs of congestion: scenario 2

<img src="../images/network-transport-layer-3.6.3.1.png?raw=true" alt="drawing" width="720"/>

<br/>

위 가정에서는 ***유한한 크기의 버퍼를 사용***하기 때문에, `packet loss`가 발생하고, `재전송(retransmission)`이 발생한다.

sender에서 보낸 패킷은 재전송을 포함하기 때문에 transport-layer input은 재전송 패킷을 포함하게 된다.

하지만 application-layer input = application layer output이 된다.

<br/>

#### idealization: perfect knowledge

<img src="../images/network-transport-layer-3.6.3.2.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/network-transport-layer-3.6.3.3.png?raw=true" alt="drawing" width="240"/>

<br/>

sender는 router의 버퍼에 남는 공간이 있을 때만 packet을 전송한다. 이럴 경우 packet loss가 발생하지 않기 때문에 재전송이 발생하지 않는다.

하지만 실제로는 sender는 패킷이 어떤 경로로 이동하는지 알 수 없다. 따라서 어떤 라우터/스위치를 경우하는지 알 수 없다. 따라서 해당 라우터/스위치의 버퍼의 남는 공간을 알 수 없다.

<br/>

##### Realistic: duplicates

<img src="../images/network-transport-layer-3.6.3.4.png?raw=true" alt="drawing" width="720"/>

<br/>

<img src="../images/network-transport-layer-3.6.3.5.png?raw=true" alt="drawing" width="320"/>

<br/>

#### "cost" of congestion:

packet loss 때문에 재전송이 발생하여 `application-layer throughput`인 `goodput`이 감소한다.

<br/>

### (4) Causes/costs of congestion: scenario 3

<img src="../images/network-transport-layer-3.6.4.1.png?raw=true" alt="drawing" width="720"/>

<br/>

Host A와 Host D가 라우터를 공유하기 때문에 Host A가 매우 많은 데이터를 빠르게 보내는 경우 packet loss가 발생할 수 있다. 그런데 이럴 경우 이전에 거쳐간 스위치에서 해당 패킷을 전송하기 위해 사용한 bandwidth가 낭비되었다고 볼 수 있다. 따라서 단일 스위치에서 발생하는 `packet loss`가 다른 스위치들의 `link capacity`를 낭비하게 만들 수 있다.

<img src="../images/network-transport-layer-3.6.4.2.png?raw=true" alt="drawing" width="720"/>

<br/>

네트워크에 존재하는 모든 라우터의 남는 버퍼를 알 수 있다면 congestion이 발생하지 않게 되지만 현실적으로 불가능하다. 따라서 sender는 네트워크의 정보를 모르기 때문에 조금씩 간을 보면서 전송하는 패킷수를 조절한다.

<br/>

## 3.7. TCP congestion control

<br/>

### (1) TCP congestion control: AIMD

sender가 receiver에게 window size 만큼의 패킷을 보낸다.

`cwnd` = congestion window size

`rwnd` = receive window size

sender의 실제 `cwnd = min(cwnd, rwnd)`

따라서 네트워크 스위치 상의 버퍼 크기와 receiver의 버퍼 사이즈 모두를 고려하여 ***더 작은 윈도우 사이즈로 패킷을 전송한다.*** 즉 sender는 congestion control, flow control을 모두 고려해야 한다.

rwnd가 매우 크다면 힝상 min(cwnd, rwnd) = cwnd 이 된다.

<br/>

#### AIMD(additive increase, multiplicative decrease)

<img src="../images/network-transport-layer-3.7.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

##### cwnd:

RTT 1: 1 pkt  
RTT 2: 2 pkts  
RTT 3: 3 pkts  
RTT 4: 4 pkts  

...

RTT 100: 100 pkts
RTT 101: 101 pkts -> packet loss 발생

RTT 102: 51 pkts(마지막으로 전송한 패킷수의 절반을 전송함)  
RTT 103: 52 pkts  
RTT 104: 53 pkts -> packet loss 발생

RTT 102: 27 pkts(마지막으로 전송한 패킷수의 절반을 전송함)  
RTT 103: 28 pkts  

`packet loss`를 발생하기 전까지는 패킷수를 1씩 계속 증가시키고, `packet loss`가 발생하는 순간 `congestion window size`를 절반으로 줄인다.

<br/>

### (2) TCP Congestion Control: details

<img src="../images/network-transport-layer-3.7.2.1.png?raw=true" alt="drawing" width="480"/>

<br/>

#### TCP sending rate

<img src="../images/network-transport-layer-3.7.2.2.png?raw=true" alt="drawing" width="240"/>

<br/>

> Note:  
1 패킷(packet) 당 바이트(bytes) 수는 다를 수 있다. `cwnd`의 단위는 패킷이지만 패킷마다 바이수를 알아야 `sending rate`를 구할 수 있다.

<br/>

### (3) TCP Slow Start

<img src="../images/network-transport-layer-3.7.3.1.png?raw=true" alt="drawing" width="384"/>

<br/>

패킷을 전송할 때 1씩 증가시키는 것이 아니라 2배씩 증가시킨다. `packet loss`가 발생하면 cwnd가 다시 1로 돌아간다.

#### cwnd:

RTT 1: 1 pkt  
RTT 2: 2 pkts  
RTT 3: 4 pkts  
RTT 4: 8 pkts  
RTT 5: 16 pkts  
RTT 6: 32 pkts  
RTT 7: 64 pkts -> packet loss 발생

RTT 8: 1 pkt  
RTT 16: 2 pkt  
RTT 32: 4 pkt  
...

<br/>

#### (4) TCP: detecting, reacting to loss

TCP를 사용할 때 어떠한 congestion control을 사용하는 지는 각자 구현에 따라 다르다.

- `TCP RENO`: 3 duplicate ACKs를 받았을 경우 cwnd를 1이 아니라 그 절반(half)으로 줄인다.

<br/>

#### (5) TCP: switching from slow start to CA

<img src="../images/network-transport-layer-3.7.5.1.png?raw=true" alt="drawing" width="720"/>

<br/> 

- `TCP Tahoe`: cwnd를 일정 threshold(ssthres(slow start threshold))를 넘어서면 AIMD처럼 1씩 증가하게 만든다. 그리고 packet loss가 발생하면 cwnd=1로 초기화하고, threshold를 마지막 cwnd의 절반으로 줄인다.

<br/>

#### (6) Summary: TCP Congestion Control

<img src="../images/network-transport-layer-3.7.6.1.png?raw=true" alt="drawing" width="840"/>

<br/>

#### (7) TCP throughput

<img src="../images/network-transport-layer-3.7.7.1.png?raw=true" alt="drawing" width="384"/>

<br/>

`congestion control` algorithm을 사용하면 ***평균적인 sending rate에 3/4 정도가 나온다.***

<br/>

#### (8) TCP Futures: TCP over “long, fat pipes”

<img src="../images/network-transport-layer-3.7.8.1.png?raw=true" alt="drawing" width="648"/>

<br/>

long, fat pipes는 2000년 초반 개념이다. 당시에는 RTT가 길고 bandwidth가 크다.

하지만 2010년 이후 많이 연구하는 데이터센터 네트워크는 RTT는 매우 짧고 bandwidth는 매우 크다. RTT는 us단위로 매우 작다. 따라서 현재는 데이터센터에서 사용하는 `TCP`에 맞는 congestion control algorithm을 많이 연구한다.

<br/>

### (9) TCP Fairness

<img src="../images/network-transport-layer-3.7.9.1.png?raw=true" alt="drawing" width="520"/>

<br/>

결과적으로 `congestion control`은 부족한 자원(bandwidth, packet buffer 등)을 효율적으로 공유하는 알고리듬이다.

`fairness goal`: 만약 K개의 TCP 세션들이 bandwidth R의 동일한 bottleneck link를 공유하고 있다면, 각 세션은 평균적으로 R/K의 bandwidth를 사용해야 한다.

<br/>

### (10) Why is TCP fair?

<img src="../images/network-transport-layer-3.7.10.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### (11) Simple Model of Congestion Control

#### Congestion control

- `congestion avoidance`: AIMD
- `slow start`: exponential increase

`congestion control algorithm`은 최초에는 `congestion avoidance`만 존재했으며, `AIMD`를 사용함으로써 `공평성(fairness)`과 `효율성(efficiency)`을 모두 가질 수 있었다. 그리고 나중에 가용한 bandwidth의 probing을 빠르게 하기 위해서 `slow start`가 추가되었다.

<br/>

<img src="../images/network-transport-layer-3.7.11.1.png?raw=true" alt="drawing" width="320"/>

<br/>

#### Example

<img src="../images/network-transport-layer-3.7.11.2.png?raw=true" alt="drawing" width="520"/>

<br/>

### (12) AIAD

<img src="../images/network-transport-layer-3.7.12.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### (13) MIMD

<img src="../images/network-transport-layer-3.7.13.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### (14) AIMD

<img src="../images/network-transport-layer-3.7.14.1.png?raw=true" alt="drawing" width="520"/>

<br/>

따라서 `AIMD`를 사용하면 유저간 공평성(fairness)를 추구하면서 가용한 bandwidth를 효율적으로 사용하게 된다.

### (15) Why is TCP fair?

<br/>

### (16) How to detect congestion?

#### Implicit

네트워크의 도움없이 end-host가 event 발생 여부를 판단하여 대응한다.

- `loss-based`: retransmission timer(RTO, timeout) 사용, fast retransmission 사용. e.g. `TCP Tahoe`, `TCP Reno`
- `delay-based`: packet loss뿐만 아니라 queueing delay가 너무 길어져도 cwnd를 조절함. `packet loss`가 발생하기 전에 선제적으로 cwnd를 조절함. RTT를 계속 측정하여 `queueing delay`를 확인한다. e.g. `TCP Vegas`

#### Explicit

네트워크가 `congestion control`을 도와준다.

스위치 버퍼  
First-In-First-Out (FIFO)  
First-Come-First-Served (FCFS)  

- `RED`: Random Early Detection. e.g. threshold = 80이면, queue length=81부터 무작위로 패킷을 미리 드랍시킨다. 버퍼에 남는 공간이 있어 더 저장할 수도 있지만 패킷을 드랍시킨다. `queueing delay`를 짧게 유지할 수 있다. parameter들이 설정할 것들이 많아서 복잡하여 널리 사용되지 않았다.
- `ECN`: 패킷을 드랍하지 않고 `congestion experienced`라고 기록한다. 스위치가 `ECN` 비트를 마킹하기 때문에 네트워크의 도움을 받는것이다.
- `Rate allocation by switches`: `스위치`가 능동적으로 flow를 감시하면서 현재 가장 적절한 `cwnd`를 명시적으로 end-host들에게 직접 알려주는 것이다. 하지만 사용자 수가 많아지고, 사용자들이 다양한 스위치에 연결되면 현실적으로 사용하기가 쉽지 않다. 스위치 안에 flow table을 관리해서 per-flow state를 저장해야 하는데 실제로 인터넷 네트워크에서 모든 것을 처리하는 것은 현실적으로 불가능하다. 따라서 `scalability`에 제한이 있다.

<br/>

### (17) Explicit Congestion Notification (ECN)

<img src="../images/network-transport-layer-3.7.17.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`ECN`을 사용하면 `packet loss`가 발생하지 않고, `queueing delay`도 매우 짧게 만들 수 있는 혁신적인 방법이다.

#### ToS(type of service) 필드 = 8 bits

6 bits = DSCP(differentiate service code point) field  
2 bits = ECN field  

`00` = Not-ETC(ECN-Capable Transport): ECN 사용안함  
`01`, `10` = ECT(ECN-Capable Transport): ECN 사용함  
`11` = CE(Congestion Experienced): Congestion 발생함  

receiver는 만약 ECN필드가 CE일 경우 ECE=1을 전달하여 sender에게 congestion이 발생했음을 알려준다.
이후에 sender는 윈도우 사이즈를 조절한 뒤에 TCP헤더에 CWR(Congestion Window Reduced)=1을 설정하여 전송한다.

<img src="../images/network-transport-layer-3.7.17.2.png?raw=true" alt="drawing" width="640"/>

<br/>

> Note:  
`ECN` 관련 헤더는 `TCP 헤더`에도 존재하고 `IP 헤더`에도 존재한다.

`ECN`은 매우 좋은 알고리즘이지만 근본적인 한계가 있다.

1. `ECN`을 사용하기 위해서는 sender, receiver, switches 전부 모든 host가 ECN을 지원해야 한다. 스위치에서 ECN을 enable하면 ECN을 사용하지 않는 모든 패킷을 드랍시켜버리는 문제가 있다. 왜냐하면 스위치에서 ECN을 사용하지 않는 다른 패킷을 함께 처리할 경우 congestion control이 엉망이 돼버린다.

2. 애초에 `ECN` 기능이 들어가지 않은 장치들이 너무 많다.

3. `ECN-enabled` 스위치는 가격이 매우 비싸다(600 ~ 700만원 정도).

따라서 인터넷 환경에서는 모든 host 및 switch에서 `ECN`을 사용하는 것은 불가능하다.

<br/>

<img src="../images/network-transport-layer-3.7.17.3.png?raw=true" alt="drawing" width="520"/>

<br/>

전체 `buffer size = B`일 때, `Buffer Headroom = B - K` 만큼의 버퍼 여유를 남겨놓는다. 그리고 이 여유 공간은 packet의 inter-arrival time이 매우 변동이 심하기 때문에 나중에 갑자기 packet이 한 번에 많이 도착했을 때 `microburst`를 흡수하는데 쓰인다. 따라서 결과적으로 `microburst`가 발생해도 `packet loss`가 발생하지 않는다.

<br/>

큰 기업들이 규모가 커지고 여러 국가의 사용자들이 사용하게 되면서 많은 기업들이 데이터센터를 사용하게 되었다. 하지만 데이터센터 네트워크는 인터넷과 달리 장치 설정을 기업에서 직접 통제할 수 있다. 따라서 데이터센터 환경에서는 모든 장치들이 ECN을 사용하도록 강제할 수 있다. 

<br/>

#### DCTCP = Data Center TCP

MS에서 만든 것인데, 사실상 미국의 많은 기업들의 데이터센터에서 표준으로 사용하고 있다. 그리고 `DCTCP`는 `ECN-based TCP`이다.

<br/>

### (18) Review: The TCP/ECN Control Loop

<img src="../images/network-transport-layer-3.7.18.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### (19) TCP Buffer Requirement

<img src="../images/network-transport-layer-3.7.19.1.png?raw=true" alt="drawing" width="520"/>

<br/>

어떤 bottleneck link에 throughput을 100% saturation시키기 위해서는 BDP(bandwidth-delay product)만큼의 buffer size가 필요하다.

C = link capacity, RTT = delay

BDP = C × RTT

#### K < C × RTT:

- 장점: 더 많은 microburst를 흡수할 수 있다. queue length가 낮아서 queueing delay도 낮아진다. low queueing delay, high burst tolerance
- 단점: 하지만 throughput이 100%가 항상 유지되지 않는다. No line-rate throughput

> Note:  
line-rate throughput이 나오지 않는 이유는 링크에서 전송할 수 있는 capacity가 있지만 버퍼에 패킷이 저장되어 있지 않아서 capacity를 100% 사용하지 못하기 때문이다.

<br/>

#### K >= C × RTT:

- 장점: throughput이 100%가 된다. line-rate throughput
- 하지만 queueing delay가 길어진다. 그리고 microburst를 충분히 흡수하지 못할 수도 있다. high queueing delay, low burst tolerance

> Note:  
line-rate throughput이 가능한 이유는 버퍼에 항상 패킷이 저장되어 있기 때문에 링크의 capacity를 100% 활용할 수 있다.

<br/>

### (20) Reducing Buffer Requirements

<img src="../images/network-transport-layer-3.7.20.1.png?raw=true" alt="drawing" width="520"/>

<br/>

N = 매우 사이즈가 큰 flow

<br/>

### (21) Two Key Ideas

<img src="../images/network-transport-layer-3.7.21.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### (22) Data Center TCP Algorithm

<img src="../images/network-transport-layer-3.7.22.1.png?raw=true" alt="drawing" width="520"/>

<br/>


#### DCTCP:

Adjust cwnd ***in proportion to*** the number of `ECN-marked packets`.

<br/>

#### Switch side:

mark packets when `Queue Length > K`

e.g. K=10, queue length=5, cwnd=10
=> queue length=15가 되므로, 4개는 mark 되지 않고, 6개는 mark 된다.

sender는 cwnd에서 마크된 ECN비트의 개수의 비율에 비례하여 congestion control을 위한 cwnd를 계산한다.

따라서 전체 패킷 10개 중에 10개가 congestion을 경험했으면 50%를 감소시키고, congestion bit가 1개씩 줄어들 때마다 5%씩 cwnd 감소 비율을 감소시킨다. e.g. 50%, 45%, 40%, ...

> Note:  
***`ECN` 자체는 그저 signal일 뿐, congestion control 알고리듬이 아니다.*** ECN 비트를 보고 어떻게 congestion control할 지는 각 end-host에 구현된 알고리듬에 따라 다르다.

<br/>

### (23) Queue length evolution

<img src="../images/network-transport-layer-3.7.23.1.png?raw=true" alt="drawing" width="720"/>

<br/>

(1) `DCTCP`를 사용할 때 `queue length`가 매우 짧게 유지된다.

(2) `TCP-RED`에 비해서 `DCTCP`는 `queue length`의 variation이 작고 평균값이 매우 낮게 유지된다.

CDF = 누적 분포도

<br/>

### (24) Convergence

<img src="../images/network-transport-layer-3.7.24.1.png?raw=true" alt="drawing" width="648"/>

<br/>

하지만 convergence(수렴) 되기까지 TCP보다 DCTCP의 시간이 더욱 오래 걸린다.

TCP는 매우 빠르게 변동하면서 convergence되지만, DCTCP는 feedback되는 ECN의 비율에 따라 조금씩 조절하기 때문에 convergence되는 시간이 더욱 오래걸린다.

<br/>

### (25) TIMELY

데이터센터에서는 DCTCP(ECN-based) 또는 loss-based를 사용한다.

loss-based보다 더욱 나중에 나온 delay-based를 잘 쓰지 않는 이유는 데이터센터의 RTT가 us-scale이기 때문에 사용하기 쉽지 않다.

delay-based는 RTT를 계속 정확하게 측정해야 하는데, 인터넷 네트워크에서는 RTT가 ms-scale이기 때문에 end-host의 network stack noise가 us-scale이라서 별 영향을 미치지 않아 RTT를 측정하는데 별 문제가 없지만, 데이터센터 환경에서는 end-host의 network stack의 노이즈가 us-scale인데 RTT도 매우 짧아서 RTT에서 노이즈가 차지하는 비중이 너무 커서 RTT를 신뢰할 수가 없다.

하지만 `TIMELY`는 `delay-based congestion control algorithm`인데, 이제는 데이터센터에서도 RTT를 정확하게 측정할 수 있게 되었기 때문이다.

<br/>

### (26) Qualities of RTT

### (27) RTT correlates with queuing delay

<img src="../images/network-transport-layer-3.7.27.1.png?raw=true" alt="drawing" width="520"/>

<br/>

### (28) Accurate RTT Measurement

#### Hardware Assisted RTT Measurement

network stack은 OS에서 처리하는 것이므로 소프트웨어 기반인데, NIC에서 하드웨어에서 timestamp를 측정하여 noise를 줄여 더욱 정확하게 측정할 수 있다. 그리고 프로세싱 오버헤드도 줄어든다.

<br/>

#### Hardware vs Software Timestamps

<img src="../images/network-transport-layer-3.7.28.1.png?raw=true" alt="drawing" width="520"/>

<br/>

NIC 하드웨어의 도움을 받아서 타임스탬프를 측정하면 커널 소프트웨어에서 측정하는 것보다 노이즈가 훨씬 적어서 정확하게 측정할 수 있다.

<br/>

#### Impact of RTT Noise

<img src="../images/network-transport-layer-3.7.28.2.png?raw=true" alt="drawing" width="520"/>

<br/>

하드웨어를 사용하지 않고 delay-based를 사용하게 되면 throughput이 떨어지게 된다. 따라서 line-rate throughput이 나오지 않는다. 따라서 노이즈를 없애야 한다.

### (29) TIMELY Framework

#### Overview

<img src="../images/network-transport-layer-3.7.29.1.png?raw=true" alt="drawing" width="520"/>

<br/>

NIC 하드웨어가 RTT를 측정하고 그것을 바탕으로 윈도우 사이즈를 조절한다.

<br/>

#### RTT Measurement Engine

<img src="../images/network-transport-layer-3.7.29.2.png?raw=true" alt="drawing" width="520"/>

<br/>

RTT는 `serialization delay`를 제외한 순수한 `RTT`만을 고려한다.

<br/>

#### Algorithm Overview

RTT가 증가하는 `기울기(gradient)`에 따라서 윈도우 사이즈를 조절한다.

<img src="../images/network-transport-layer-3.7.29.3.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/network-transport-layer-3.7.29.4.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/network-transport-layer-3.7.29.5.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/network-transport-layer-3.7.29.6.png?raw=true" alt="drawing" width="320"/>

<br/>

<img src="../images/network-transport-layer-3.7.29.7.png?raw=true" alt="drawing" width="640"/>

<br/>

기본적으로는 AIMD 방식을 사용하는데, AIMD 사이에 끼워넣어서 보조적인 메커니즘으로 사용한다.

따라서 NIC를 사용하여 노이즈를 감소시켜서 delay-based congestion control을 데이터센터에서도 사용할 수 있게 하였다.

최근에는 INT-based(in-band network telemetry) 방식도 있다.

그리고 강화학습을 이용한 congestion control 방법도 있다.















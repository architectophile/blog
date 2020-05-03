# I. Introduction

## 1. 네트워크(Network)

`네트워크(Network)`란 연결된 모든 것을 말한다.

사람들 간의 연결(소셜 네트워크), 지하철 간의 네트워크, 컴퓨터 간의 네트워크 등이 있다.

<img src="../images/network-introduction-2.1.1.png?raw=true" alt="drawing" width="320"/>

<br/>

***인터넷(Internet)이란 네트워크들의 네트워크이다.*** 따라서 인터넷은 매우 다양한 네트워크들이 연결되어 형성된 매우 거대한 네트워크이다. 그 안의 네트워크들은 더 작은 네트워크로 나뉠 수 있다(대륙별, 나라별, 지역별 등으로 점점 더 작은 네트워크로 나뉜다.)

- `스위치(switch)`: L2 스위치
- `라우터(router)`: L3 스위치

<br/>

## 2. 프로토콜(Protocol)

`프로토콜(protocol)`은 네트워크 간에 주고받는 메시지의 `형식(format)`과 `순서(order)`를 정의한다. 그리고 전달된 메시지에 따라 미리 약속된 규칙에 의해 특정 행동을 취한다.

<img src="../images/network-introduction-2.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `네트워크 엣지(Network Edge)`: 서버, 노트북, 신호등, TV 등 네트워크 디바이스들
- `네트워크 코어(Network Core):` 수 많은 라우터들이 연결되어 있음(패킷의 경로를 찾아서 잘 전달하는 역할)

- `전송 지연 시간(Transmission delay)`: NIC(Network Interface Card)에서 데이터가 실제 랜선으로 비트 단위로 올라갈 때까지 걸리는 시간

<img src="../images/network-introduction-2.2.2.png?raw=true" alt="drawing" width="640"/>

<br/>

## 3. 물리 매체(Physical Media)

### 유선 링크(wired links)

- `RJ45 커넥터`: 우리가 보통 사용하는 랜선(보통 1Gbps 까지 지원함)
- `QSFP`: 데이터센터 서버에서 사용하는 고성능 케이블

링크를 통해서 어떻게 데이터가 전달되는 지는 네트워크 영역이 아니라 전자전기 영역에서 다루는 분야이다.

<img src="../images/network-introduction-2.2.3.png?raw=true" alt="drawing" width="640"/>

<br/>

### 무선 링크(wireless links)

- `와이파이(wifi)`: 사용되는 주파수에는 `802.11n(2.4Ghz)`, `802.11ac(5Ghz)` 등이 있다. 하지만 `802.11ac(5Ghz)` 주파수는 상대적으로 전송반경이 짧다.
- `셀룰러(cellular)`: 3G, LTE, LTE-A, 5G 등이 있다.
- `위성(satellite)`: 원양어선이나 남극 등 오지에 사용된다.

<br/>

## 4. 네트워크 코어(Network Core)

데이터는 여러 개의 `패킷(packets)`으로 쪼개져 전송되는데, 라우터는 이러한 패킷들을 잘 전달할 수 있도록 경로를 찾는 역할을 한다. `네트워크 코어(network core)`에는 이러한 수 많은 `라우터들(routers)`이 연결되어 있다.

<br/>

## 5. 패킷 스위칭(Packet-switching)

<img src="../images/network-introduction-2.5.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`store-and-forward` 방법을 사용한다. 패킷(packet)은 스위치 메모리에 `저장(store)`되었다가 여러가지 처리를 받은 후에 `나간다(forward)`.

- `L` = 보내고자 하는 데이터의 길이
- `R` = 초당 보낼 수 있는 데이터의 양(=`대역폭(bandwidth)`)

e.g. 대역폭이 100Mbps인 경우 200Mbits의 데이터를 보내는데 걸리는 시간은 2초이다.

- `Queueing Delay`: 패킷이 전달될 때 기다리는 시간
- `Packet Loss`: 패킷 손실
 
<img src="../images/network-introduction-2.5.2.png?raw=true" alt="drawing" width="640"/>

<br/>

`호스트 A`가 `라우터`에게 보낼 때 대역폭은 `100 Mb/s`이지만 해당 `라우터`에서 다음 `라우터`로 보내는 대역폭은 `1.5 Mb/s`이기 때문에 기다려야 하므로 `queueing delay`가 발생한다.

e.g 100 Mbits를 보내는데 호스트 A에서는 1초가 걸리지만 라우터에서 다음 라우터까지는 67초가 걸린다. ***100개의 패킷을 전송한다면 100번째 패킷은 앞의 99개 패킷이 모두 전송될 때까지 기다려야 한다.***

그리고 만약 `A`와 `B`가 동시에 `C`에게 패킷을 전송한다면, 같은 라우터를 공유하기 때문에 `queueing delay`가 길어질 수 있다.

e.g. `A`가 패킷을 1000개를 먼저 보내고, 그 다음 `B`는 패킷을 1개만 보낸다고 하더라도 `B`의 패킷은 `A` 모든 패킷이 전송될 때까지 기다려야 한다. → `Head of line blocking`이 발생한다.

e.g. 이마트에 가서 물건을 계산할 때 줄이 길게 서있는 것을 `queueing delay`라고 볼 수 있다.

### Queueing Delay 해결 방법

e.g. 이마트에서 줄이 길게 있을 때 셀프 계산대 또는 소량 계산대를 이용하여 물건이 적을 때 전용 계산대를 사용하는 방법이 있다.

라우터(스위치) 내부에서 A, B가 초당 보내는 패킷 수를 비교해서, 적은 쪽을 먼저 보낸다.

`queueing delay`는 네트워크에서 가장 중요한 성능 저하(performance degradation) 관련 분야이다.

<br/>

패킷은 버퍼에 저장되는데, 만약 더 이상 새로운 패킷을 저장할 공간이 부족할 경우 `packet loss`가 발생한다.

패킷을 보내는 입장에서는 패킷이 분실되면 단순히 전송되는데 시간이 오래걸리는 것인지 패킷이 분실된 것인지 알기 쉽지 않다.

<br/>

## 6. 두 개의 핵심 네트워크 코어 기능들(Two key network-core functions)

<img src="../images/network-introduction-2.6.1.png?raw=true" alt="drawing" width="720"/>

<br/>

- `Routing`: 패킷을 전달할 최적의 경로를 찾는 것(컨트롤 플레인에서 수행)
- `Forwarding`: 패킷이 라우터에서 나갈 때 가장 적합한 포트를 정하는 것(데이터 플레인에서 수행)

안암역에서 서울역까지 갈 때, 최적의 경로를 찾는다고 할 때, 최적이라는 기준은 다양할 수 있다(e.g. 최소 환승, 최소 요금, 최소 혼잡도 등 기준이 다양할 수 있다.) 그리고 이 최적의 경로를 찾는 것을 `routing`이라고 할 수 있다.

지하철 앱에서 `빠른환승(4-3)` 플랫폼 번호를 알려주는데 어느쪽으로 가야 가장 적합한 곳인지 찾을 수 있는데, 이것을 `forwarding`이라고 할 수 있다.

<br/>

## 7. 서킷 스위칭(circuit switching)

<img src="../images/network-introduction-2.7.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`전용회선`을 사용하여 데이터를 전송한다.

e.g. 예전에 `PC통신`을 할 때는 전화회선 전체를 예약해서 사용했기 때문에 인터넷을 사용하는 동안 전화를 사용할 수 없었다.

### 장점
- `전용회선`을 사용하므로 쾌적하게 사용할 수 있다.
- `보장된 성능`을 제공한다.

### 단점
- 공유가 안 되므로 `확장성(scalability)`이 떨어진다.
- `자원낭비`가 발생한다.

<br/>

## 8. 패킷 스위칭 vs. 서킷 스위칭

<img src="../images/network-introduction-2.8.1.png?raw=true" alt="drawing" width="480"/>

<br/>

e.g. 대역폭 1 Mb/s의 링크가 있다.  
 - `서킷 스위칭`: 각 100 kb/s의 속도를 가진 사용자 10명이 10%식 예약해서 사용한다.
 - `패킷 스위칭`: 35명이 사용해도 동시에 10명이 사용할 확률이 0.04% 이하이므로 사용이 가능하다.

`인터넷`은 ***확장성(scalability)이 매우 중요하기 때문에*** `큐잉 딜레이`나 `패킷 손실`이 발생하더라도 더 많은 사람들이 인터넷 네트워크를 사용하기 위해 `패킷 스위칭(packet switching)` 방식을 사용한다.

e.g. 수강신청 기간에 접속 장애가 발생하는 경우나 1월 1일에 카카오톡 전송 오류가 발생하는 경우 등이 있다.

그렇다고 서킷 스위칭 방식이 더 이상 사용되지 않는 것은 아니다. 일반 인터넷이 아닌 데이터센터나 학교 등 사설망에서는 서킷 스위칭 방식을 사용하여 전용회선을 사용할 수 있다.

<br/>

## 9. 지연이나 손실은 왜 발생하는가?

패킷의 `input rate > output rate`일 때 지연이나 손실이 발생한다.

<img src="../images/network-introduction-2.9.1.png?raw=true" alt="drawing" width="480"/>

<br/>

<br/>

## 10. 패킷 지연의 4가지 원인(Packet Delay Components)

<img src="../images/network-introduction-2.10.1.png?raw=true" alt="drawing" width="480"/>

<br/>

1. `Transmission Delay`: L/R
2. `Queueing Delay`: 트랜스미션 행위를 받기까지 기다려야 하는 시간
3. `Processing Delay`: 패킷에 여러가지 처리를 하는 시간(e.g. `packet forwarding`). 시간이 매우 짧기 때문에 거의 고려하지 않음
4. `Propagation Delay`: 순수하게 물리적으로 전달되는 시간

- `Delay(=Latency)`: A → B까지 걸리는 `편도 시간`
- `Response Time`: A → B → A까지 걸리는 `왕복 시간`(`응용 계층`에서)
- `RTT(Round-Trip Time)`: A → B → A까지 걸리는 `왕복 시간`(`네트워크 계층`에서)
- `Base RTT`: RTT - Queueing Delay → 순수하게 `큐잉 딜레이` 없이 패킷이 스위치에서 처리를 받고 이동하여 왕복하는 시간

<br/>

## 11. 큐잉 딜레이(Queueing Delay)

<img src="../images/network-introduction-2.11.1.png?raw=true" alt="drawing" width="480"/>

<br/>

큐잉 딜레이 = 패킷 수 * 패킷의 평균 transmission delay

버퍼의 크기가 매우 크다면 큐잉 딜레이가 매우 커질 수 있다(e.g. Deep buffer의 공포. 버퍼가 매우 매우 크다면 패킷이 영원히 라우터를 빠져나가지 못할 것이다.)

<br/>

## 12. Latency(Delay)

일반적으로 `Latency(Delay)`는 편도 지연시간을 나타내지만 종종 왕복 시간을 나타내는 경우도 있다. 하지만 `RTT`와 `Response Time`은 항상 왕복 시간을 나타낸다. 

<br/>

## 13. Packet Loss

스위치에서 사용하는 SRAM 가격이 비싸기 때문에 패킷 버퍼의 크기는 보통 작다. 패킷 버퍼에 저장될 공간이 없을 경우 패킷 손실이 발생한다. 패킷 손실이 발생하면 전송자는 일정시간 이후에 재전송을 하게 된다.

<br/>

## 14. Throughput

### Bandwidth 

<img src="../images/network-introduction-2.14.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`대역폭(Bandwidth)`은 초당 전송할 수 있는 비트(bit)의 양으로서, 도로로 비유했을 경우 도로의 폭 또는 `차선 수`라고 할 수 있다(e.g. 2차선, 4차선, 8차선).


`Throughput`은 전송자와 수신자 사이에 실제로 전송한 데이터의 양을 나타내고, `Bandwidth`은 최대 가용량을 나타낸다.

- `Instantaneous Throughput`: 특정 시점에 사용한 Throughput
- `Average Throughput`: 일정 구간 내에 평균적인 Throughput

<img src="../images/network-introduction-2.14.2.png?raw=true" alt="drawing" width="720"/>

<br/>

Rs: 서버쪽 Bandwidth  
Rc: 클라이언트쪽 Bandwidth  
F: 파일크기  

### (1)

Rs: 100Mbps  
Rc: 100Mbps  
F: 100Mbits  
→ Throughput: 100Mbps

### (2)

Rs: 100Mbps  
Rc: 100Mbps  
F: 50Mbits  
→ Throughput: 50Mbps

### (3)

Rs: 100Mbps  
Rc: 100Mbps  
F: 200Mbits  
→ Throughput: 100Mbps

따라서 `Throughput`은 지원되는 `Bandwidth`를 ***초과할 수 없다.***

<img src="../images/network-introduction-2.14.3.png?raw=true" alt="drawing" width="720"/>

<br/>

클라이언트와 서버 중에서 ***더 작은*** `Bandwidth`에 제한될 수 밖에 없다. 둘 중에 한 곳의 `Bandwidth`가 아무리 크더라도 상대방의 `Bandwidth`가 더 작을 경우 그것에 제한될 수 밖에 없다. 따라서 데이터가 여러개의 링크(links)를 거쳐서 전달된다고 하면 그 중에서 가장 작은 `Bandwidth`를 가진 링크에 바운드될 수 밖에 없다.  
e.g. 집에서 KT의 10Gbps를 사용하더라도 학교 서버가 1Gbps를 사용하면 `Throughput`은 최대 1Gbps에 바운드된다.

### Bottleneck Link

송신자(1Gbps), 중간경유지(100Mbps), 수신자(1Gbps)일 경우 중간경유지가 `병목링크(Bottleneck Link)`가 된다. 또한 중간경유지지의 Bandwidth가 1Gbps라고 하더라도 이를 다른 사람들과 공유해서 사용할 경우 `Throughput`는 낮아지게 된다.

<img src="../images/network-introduction-2.14.4.png?raw=true" alt="drawing" width="720"/>

<br/>

회선을 독점적으로 사용할 때는 거의 100Mbps의 `Throughput`이 나오지만 다른 사용자와 공유하면서 `Throughput`이 낮아지는 것을 볼 수 있다.

<br/>

<img src="../images/network-introduction-2.14.5.png?raw=true" alt="drawing" width="720"/>

<br/>

`DCTCP(Data Center TCP)`를 사용하면 `TCP`를 사용할 때보다 사용자들이 사용하는 리소스를 좀 더 공평하게 분배할 수 있다.

<br/>

<img src="../images/network-introduction-2.14.6.png?raw=true" alt="drawing" width="480"/>

<br/>

`네트워크 코어`의 링크의 커패시티 `Bandwidth`가 매우 크기 때문에 각 `네트워크 엣지`들이 `Bottleneck Link`가 된다.

<br/>

<img src="../images/network-introduction-2.14.7.png?raw=true" alt="drawing" width="480"/>

<br/>

클라이언트에서 여러 개의 데이터센터 서버에서 데이터를 읽어올 때 동시에 서버에서 데이터를 전송하면 클라언트의 `Bandwidth`로는 모두 전송받을 수 없기 때문에 클라이언트가 `Bottleneck Link`가 된다.

<br/>

### Goodput

`Goodput`은 `Application-Level Throughput`을 의미한다.

`Goodput` <= `Throughput` <= `Bandwidth`

`Goodput`은 `Throughput` 중에서 실제 유용한 비트(useful bits)만 의마한다. 실제로 네트워크 자원을 사용해서 데이터를 전달했지만 패킷 손실이 발생하여 실제 어플리케이션 레벨에서는 데이터를 전달받지 못했을 경우 `Goodput`은 줄어든다.

<img src="../images/network-introduction-2.14.8.png?raw=true" alt="drawing" width="480"/>

<br/>

서버의 수가 늘어날수록 한 번에 몰리는 데이터가 많아져서 Congestion 현상에 의해 패킷 손실(packet loss)가 발생하여 `Goodput`이 점점 줄어든다.

따라서 `Goodput`을 늘리기 위해서는 서버에서 전송하는 데이터를 한 번에 보내는 것이 아니라 지연시간을 줘서 순차적으로 보내는 방법이 있다.

`Goodput`의 반대 개념은 `Badput`이다. 따라서 `Throughput` = `Goodput` + `Badput`이다.

하지만 일반적으로 `Badput`은 잘 사용하지 않으며 `Goodput`을 더 많이 사용한다.

<br/>

### Latency

보내는 데이터의 크기가 작은 경우에는 `Latency`가 중요하다. 이런 경우 `Bandwidth`는 별로 중요하지 않다(e.g. 카카오톡 메시지). 그 중에서도 `Queueing Delay`가 매우 중요하다. → Latency-sensitive applications

하지만 대용량의 데이터를 전송하거나 받을 때는 `Bandwidth`가 중요하다(e.g. 유튜브에서 고화질 영상을 스트리밍 할 때). 그리고 좀 더 정확하게는 실제로 내가 점유하는 `Throughput`이 중요하다. → Throughput-sensitive applications

<br/>

### Netcode

FPS 게임은 `Latency`가 가장 중요하다. 서로 총을 쐈을 때 서버에 빨리 데이터가 전달되는게 중요하다.

`Ping`은 지연시간을 측정하는 프로그램이다. 보통명사화되어서 `Ping`이 지연시간을 나타내기도 한다.

지연시간 차이를 보정하기 위해 만든 기술이 바로 `Netcode`이다. 하지만 오히려 지연시간이 느린 사람에게 불리하게 작용할 수도 있는 문제가 있다.

<br/>

## 15. Protocol layers

`Layering`은 복잡한 시스템을 기능별로 세분화하는 것이다. 프로그래밍에서 모듈화하는 것과 비슷한 개념이다.

`Layering` 장점
- 유지보수가 편하다. 어떤 계층에서 문제가 발생하면 해당 계층에서만 고치면 된다.
- 계층끼리 분리되기 때문에 한 계층의 변화가 다른 계층에 미치는 영향이 적다.

`Layering` 단점
- Overhead가 증가한다.

<img src="../images/network-introduction-2.15.1.png?raw=true" alt="drawing" width="240"/>

<br/>

- `Application Layer`: 우리가 보통 사용하는 응용프로그램 계층이다. e.g. http, ftp, smtp 등
- `Transport Layer`: 프로세스 간 통신을 처리하는 계층이다. 물리적으로 떨어진 원격의 장치(서버)의 프로세스와 통신하기 위한 계층이다.
- `Network Layer`: 경로를 찾아주는 역할을 하는 계층이다. e.g. naver.com 서버의 경로를 찾는 역할
- `Link Layer`: 바로 인접해 있는 장치에 대해서만 알고 있다. 전기전자에서 다루는 분야이다.
- `Physical Layer`: 물리적 계층이다. 전기전자에서 다루는 분야이다.

Client
Application: 크롬 브라우저
Process: chrome.exe

Server
naver.com
Application: Apache
Process: apache.exe

서로 떨어진 두 프로세스가 통신하기 위해서 TCP 또는 UDP 등의 트랜스포트 계층의 프로토콜을 사용한다.

<img src="../images/network-introduction-2.15.2.png?raw=true" alt="drawing" width="240"/>

<br/>

`ISO/OSI 7 Layer Reference Model`은 현재 사용하는 실제 인터넷 프로토콜 스택에서는 `Presentation`과 `Session` 계층이 사라지고 ***대부분*** `Application` 계층에 흡수되었다. 일부 기능만 `Transport` 계층에 흡수되었다.

<br/>

### Encapsulation

<img src="../images/network-introduction-2.15.3.png?raw=true" alt="drawing" width="720"/>

<br/>

`Layering`을 하게 되면 `Overhead`가 발생하게 된다. 각 계층을 지날 때마다 `Overhead`가 계속 추가된다.

- `Segment`: Transport 계층에서 사용하는 데이터 단위
- `Packet(또는 Datagram)`: Network 계층에서 사용하는 데이터 단위
- `Frame`: Link 계층에서 사용하는 데이터 단위

<br/>

## 16. 인터넷의 역사

- `ARPAnet`: 군사용 목적으로 개발된 최초의 네트워크(1960년대)
- `Internetworking Principles`: minimalism, autonomy, stateless routers, decentralized control 등 최대한 많은 사람들이 사용할 수 있게 단순하게 만들어야 한다는 원칙(1070년대)
- `TCP/IP` 프로토콜, DNS, TCP congestion control 등(1980년대)
- `Web`, HTML, HTTP 등 (1990년대)
- Facebook, Youtube, AWS (2000년대)


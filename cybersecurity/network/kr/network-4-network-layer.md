# 4. Network Layer

<br/>

## 1. Overview of Network layer

### 1) Network Layer

<img src="../images/network-4-network-layer-1.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (1) Network Layer의 역할

- `Packet routing`: 한 `end-host`에서 다른 `end-host`에서 패킷을 보낼 때 `가장 효율적`으로 보낼 수 있는 경로를 탐색하는 것 
- `Packet forwarding`: 계산된 경로에 따라서 스위치가 다음 경유지에 해당하는 output port로 패킷을 넘겨주는 것

예전에는 다른 곳에 전화할 때 전화교환수들이 목적지에 따라서 케이블을 연결해주었다. 이것이 `packet forwarding`이라고 할 수 있다.

목적지에 연결되어 있는 output port로 패킷을 전달하는 것이다.

`Packet Forwarding`은 스케일이 `hop 단위`이다.

switch `A - B - C` 가 있을 때, `A → B`까지 `1 hop`이고, `A → C`까지 `2 hop`이다.

인접해 있는 `이웃 노드`에게 패킷을 전달하는 것이다.

`라우팅`은 `전체 경로`를 찾아주는 것이고, `포워딩`은 해당 경로 안에 하나 하나의 `hop`으로 전달해주는 것이다.

<br/>

#### (2) Example: Packet Routing

`안암역` → `김포공항역` 가는 경로를 탐색(버스, 지하철, 도보 포함)

네이버 지도에서 경로를 탐색해보면 여러개의 경로들이 나온다.

1. 안암역 → 청구역 → 김포공항역 (53분, 요금 1350원): 
2. 안암역 → 신당역 → 7854번 버스 → 김포공항역 (30분, 요금 5050원): 가장 빠른 시간
3. 도보(15분) → 고려대역 → 석계역 → 김포공항역 (1시간 20분, 요금 500원): 가장 적은 요금

- `효율적`: `routing algorithm`의 목적에 따라 효율적인 경로의 기준이 다를 수 있다.

<br/>

#### (3) Example: Packet Forwarding

1. 고려대역 → 안암역 → 버스환승(안암역 3번 출구)

안암역 출구는 1,2,3,4개

목적지가 김포공항일 때는 3번 출구로 가는 것이 `packet forwarding`이다.

<br/>

### 2) Two key network-layer functions

<img src="../images/network-4-network-layer-1.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (1) Network-layer functions

- `forwarding`: move packets from router’s input to appropriate router output. input port로 들어온 패킷을 적합한 output port로 이동시키는 것
- `routing`: determine route taken by packets from source to destination

<br/>

#### (2) Taking a trip

- `forwarding`: process of getting through single interchange. IC에서 이동하는 것
- `routing`: process of planning trip from source to destination

<br/>

### 3) Network layer: data plane, control plane

<img src="../images/network-4-network-layer-1.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Data plane`: 포워딩을 하는 곳. local, per-router function. 인접해 있는 노드로 패킷을 전달
- `Control plane`: 라우팅을 하는 곳. network-wide logic. source host에서 destination host로 가는 end-to-end path를 결정한다.
  - `traditional routing algorithms`: 전통적인 방식으로서 `Switch` 안에 `control plane`과 `data plane`으로 나눠져있다. `control plane`에서 경로를 계산하여 `data plane`에게 알려준다. 모든 라우터가 각각 라우팅 알고리즘을 수행하고, 인접해 있는 라우터들과 싱크를 맞추는 것이다.
  - `software-defined networking(SDN)`: `중앙서버`가 있어서 전지적인 시점으로 네트워크를 파악하여 최적의 경로를 계산해서 아래에 있는 스위치들에게 `rule`을 업데이트 해주는 것이다.

<br/>

### 4) Per-router control plane

<img src="../images/network-4-network-layer-1.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Local forwarding table`: 패킷이 들어오면 헤더를 읽어서 해더에 따라서 패킷을 output port로 전달한다.

`control plane`에서 `local forwarding table`을 계산한다.

전통적인 `per-route control plane` 방식에서는 `local forwarding table`을 계산할 때 각 라우터들이 직접 계산하였다. 각자 라우터가 개별적으로 `routing algorithm`을 계산하고 정보를 인접한 라우터끼리 공유하여 싱크를 맞추었다.

<br/>

### 5) Logically centralized control plane

<img src="../images/network-4-network-layer-1.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`SDN` 방식은 네트워크 어딘가에 중앙집중적인 `remote controller`가 있어서 전지적인 시점으로 네트워크를 보고 라우팅 경로를 결정하여 각 라우터에게 전달하는 것이다.

2008년 SIGCOMM CCR. 스탠포드 대학에서 `SDN` 방식을 먼저 테스트했다.

중앙집중적으로 하면 효율적이지만 기존에는 각 라우터들이 각자 라우팅 알고리즘을 계산했던 이유는 `remote controller`가 패킷 프로세싱하는 능력이 부족했기 때문이다. `remote controller`가 연결된 모든 스위치의 정보를 모니터링하고 빠르게 계산하고 업데이트하는 것이 예전에는 하드웨어 성능 문제로 불가능했다.

인터넷 네트워크는 쉽지 않겠지만 캠퍼스 네트워크나 데이터센터와 같은 소규모 네트워크에 `SDN`을 적용할 수 있다고 생각했다.

2010년대에 SDN 붐이 일었다. 산업체에서 SDN에 대한 관심이 증가했다. remote controller 모델도 매우 다양하다.

신기술은 항상 거품이 있다.



<br/>

### 6) Network service model

<img src="../images/network-4-network-layer-1.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 7) Network layer service models:

<img src="../images/network-4-network-layer-1.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `ATM`: 90년대 중후반에 인기 많았던 기술. ATM이 인터넷 구조를 완전히 바꿀것이라고 얘기했음. 90년대는 멀티미디어의 시대였다. 따라서 어플리케이션의 요구사항에 맞게 explicit하게 지원해줘야 한다고 생각했다. 하지만 ATM은 쓰이지 않는데, 왜냐하면 모든 host, 스위치, 랜선 등을 모두 바꿔야 했다. 한 마디로 internet infrastructure를 모두 바꿔야 했다. 따라서 장점에도 불구하고 사용되지 못하고 사라졌다.

- delay-sensitive (latency-sensitive) applications, real-time applications: Video streaming, VoIP, Skype
- throughput-sensitive applications: cloud backup, big data analytics

<br/>

### 8) Router architecture overview

<img src="../images/network-4-network-layer-1.8.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

Router = Switch

- `Router` = L3 Switch
- `Switch` = L2 Switch (일반적으로 말하는 스위치)

스위치의 모드를 고를 수 있는데, 최근에는 기본적으로 라우터로(L3 스위치)로 출시된다. 20년 전에는 L3가 고급기능이었고, L2 스위치와 따로 판매했었다. 홈네트워크에서는 공유기 한 대로 연결되어 있다. 공유기 거쳐서 외부망으로 나가는 것은 한 hop만 거치면 됐기 때문에 L2 스위치만 사용해도 됐다. L3 스위치는 회사나 서버실에서 많이 사용했었다. 요즘에는 프로그래밍 가능한 L4 스위치도 있다.

router의 `input port`와 `output port`는 logical한 개념이다. 

패킷이 라우터의 `input port`로 들어오면, 적합한 `output port`로 `forwarding`한다. 이 때 중간에 `switching fabric`을 지나서 이동한다. 스위치 내부에 `input port`와 `output port` 간에 작은 네트워크가 있다고 볼 수 있다.

- `switching fabric` = `switching topology`: 격자무늬 직물을 의미한다.

`routing processor`가 `control plane`(`routing`, `management`) 을 담당하고, `switching fabric`이 `data plane`(`forwarding`)을 담당한다.

- `routing processor`: `x86 CPU` = 범용 프로세서. 여러가지 계산 가능. 라우팅 계산도 가능하고 매니지먼트도 가능하다. 하지만 범용이기 때문에 속도는 느리다. in millisecond timeframe. `control plane(software)`. → Software switch
- `switching fabric`: 스위치는 항상 `ASIC`이다. ASIC은 정해진 기능만 할 수 있는 하드웨어이다. Switch ASIC은 패킷 포워딩에 특화되어 있는 하드웨어다. in nanosecond timeframe. `data plane(hardware)` → Hardware switch

<br/>

### 9) Input port functions

<img src="../images/network-4-network-layer-1.9.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Ingress pipeline`: `port lookup`을 하고 해당 포트로 `packet forwarding`을 하는 것. if header의 destination IP == 163.152.10.2 then output port = 3 → `match action`이라고 부른다.
  - `destination-based forwarding`: 전통적으로 `목적지 IP주소`만을 가지고 포워딩을 한다.
  - `generalized forwarding`: 패킷 헤더의 어떤 값을 가지고도 포워딩을 할 수 있다. e.g. Source IP를 보고 포워딩하거나, 패킷 크기에 따라서 포워딩을 할 수 있다. 이것은 보안목적을 위한 VPN, VXLAN을 사용할 때 패킷 헤더의 목적지IP 값이 아니라 다른 값을 이용해서 포워딩하고 있다.  
- `Packet buffer`: 
- `Egress pipeline`: 

> Note:  
우리가 얘기하는 목적지 IP는 실제로 물리적으로 end-host와 스위치가 존재하는 경우에 라우팅과 포워딩을 생각했던 것이다. 하지만 어떤 logical한 개념의 overlay 네트워크를 생각하면 overlay 관점에서는 X → Y로만 전달하면 되기 때문에 underlay에서는 어떻게 전달하는 상관하지 않는다. 이런 경우에는 목적지 IP를 감추고 logical한 ID를 패킷 헤더에 넣어서 전달한다.

<br/>

### 10) Destination-based forwarding

<img src="../images/network-4-network-layer-1.10.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`목적지IP`의 범위에 따라 `output port(link interface)`로 `포워딩`한다.

<br/>

### 11) Longest prefix matching

<img src="../images/network-4-network-layer-1.11.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

헤더 필드값과 비교하여 가장 길에 매칭되는 것을 찾아서 `output port(link interface)`로 포워딩한다.

<br/>

<img src="../images/network-4-network-layer-1.11.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### Switch memory
- `TCAM`: 스위치 ASIC에 on-chip TCAM이 연결되어 있다. Search에 특화된 메모리이다. forwarding table의 크기가 매우 클 수 있는데, ***TCAM을 사용하면 매우 빠르게 matching을 찾을 수 있다.*** 만약 forwarding table을 searching할 때 만약 `SRAM`을 사용한다면 N clock cycles이 소요될 수 있지만, ***`TCAM`을 사용하면 테이블 크기와 상관없이 1 clock cycle 안에 찾아낼 수 있다.***
- `SRAM`: `DRAM`보다 transistor 개수가 많아서 속도가 매우 빠르다(CPU에서 캐쉬에도 사용됨). 스위치는 속도가 중요하기 때문에 ASIC을 사용한다. 또한 메모리에 읽고 쓰는 시간을 최소화하기 때문에 스위치 ASIC 내에 on-chip SRAM을 사용한다. ***패킷 버퍼는 SRAM으로 되어있다.*** `SRAM`은 범용 메모리이다.

<br/>

### 12) Switching fabrics

<img src="../images/network-4-network-layer-1.12.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`fabric`은 crossbar(격자무늬)를 의미한다.

`switching fabric`이 하는 일은 `input port`로 들어온 `패킷`에 대해서 `port lookup`을 하고 `output port`의 버퍼에 버퍼링하도록 전달하는 것이다.

`switching rate`: 초당 `input port`에서 `output port`로 전달하는 개수

<br/>

### 13) Output ports

<img src="../images/network-4-network-layer-1.13.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`패킷 버퍼`는 `SRAM`으로 되어있다. 

`output port`로 패킷이 들어오면 비로소 `queueing`이 일어난다. 이 때 `queueing`은 `port` 별로 발생한다.

- `Queue length`: 어느 특정 `output port`에 대기중인 패킷 수
- `Buffer occupancy`: 전체 `port`의 모든 `queue length`를 더한 것

<br/>

- `Shared buffer allocation`: 모든 port가 패킷 버퍼를 제한없이 `first-in-first-out` 형태로 공유해서 사용
- `Static buffer allocation`: 각 port별로 사용할 수 있는 최대 패킷 버퍼의 크기가 `고정`되어 있음

지금 존재하는 대부분의 `switch`들이 `output port buffering`을 사용한다.

실제로는 4\~8개의 `class(service) queue`가 존재한다. `한 port` 안에 `logical`하게 ***4\~8개의 queue로 쪼갠다.***

#### Example

`Input port 1`: VoIP(Skype), latency-sensitive applications

`Input port 2`: Cloud storage backup, throughput-sensitive applications

위의 `input port1`, `output port2`의 패킷이 동일한 `output port1`로 전송된다. 이 때 input port2으로는 대용량의 패킷이 전송되고 있다. 반면에 input port1으로는 상대적으로 작은 양의 패킷이 전송되고 있다. 이 때 클라우드 백업을 위한 대용량의 패킷들이 버퍼를 점유하고 있으면, latency-sensitive한 VoIP 패킷들에 지연시간이 발생하게 된다.

이를 해결하기 위해서 다음과 같이 처리한다.

- `latency-sensitive application`: `Traffic Class 0번`
- `throughput-sensitive application`: `Traffic Class 1번`

패킷의 `service`에 따라서 `latency-sensitive application`은 0번 class queue에 버퍼링하고, `throughput-sensitive application`은 1번 class queue에 버퍼링한다. 그리고 `스케쥴링(scheduling)`을 0번 class queue에 있는 패킷을 1번 class queue에 있는 패킷보다 먼저 전송하도록 설정해서 `latency-sensitive application`이 `throughput-sensitive application`와 동일한 `output port`를 공유할 때 `queueing delay`를 경험하지 않도록 해준다.

<br/>

### 14) Output port queueing

<img src="../images/network-4-network-layer-1.14.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 15) Programmable switch ASICs

<img src="../images/network-4-network-layer-1.15.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`ASIC`은 x86 CPU와는 다르게 프로그래밍이 불가능하지만 `속도`가 매우 빠르다. 

`x86 CPU`은 `프로그래밍이 가능`하지만 속도가 상대적으로 ASIC에 비해서 느리다.

- `Fixed-function switch ASIC`: 기능을 변경할 수 없는 전통적인 `스위치 ASIC`이다.

2013년 부터 `Programmable switch ASIC`에 대한 연구가 활발해졌다. 

- `Reconfiguration Match-action Table(RMT) Architecture`: match-action 규칙을 원하는대로 설정할 수 있는 구조이다. `High-level programming language(P4)`로 프로그래밍이 가능하다.

`SDN`은 `control plane`에 대한 얘기였고, `Programmable switch ASIC`은 `data plane`에 대한 얘기다.

`FPGA`는 로직을 변경할 수 있지만 `Verilog`와 같은 `low-level programming language`를 써야하고, 상대적으로 성능이 낮다.

기존에는 `performance`와 `flexibility`는 trade-off 관계라고 생각했다. 하지만 최근에 나온 `Programmable switch ASIC`은 기존의 trade-off 관계를 깼다. ***따라서 프로그래밍이 가능하면서도 성능도 매우 빠르다.*** 게다가 프로그래밍 언어도 `high-level programming language(P4)`를 사용하기 때문에 사용하기도 쉽다.

<br/>

### 16) How much buffering?

<img src="../images/network-4-network-layer-1.16.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`congestion`이 일어난 `link`를 `saturation`시키려면 `BDP` 만큼의 `버퍼 사이즈`가 필요하다.

`RTT × C/ Root(N)` 공식은 `인터넷`에서만 유효한 식이다. 만약에 flow의 개수가 충분히 많다면 패킷 `버퍼 사이즈`가 `BDP` 만큼 필요없고, `BDP / Root(N)` 만큼만 있으면 된다. 이것은 인터넷 환경에 대한 얘기이다.하지만 데이터센터에 대해서는 여전히 `BDP` 만큼이 필요하다.

<br/>

### 17) Scheduling mechanisms

<img src="../images/network-4-network-layer-1.17.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Scheduling`: `output port` 내에 여러개의 `queue`가 존재하는데, 이 때 `queue`별로 어디를 먼저 전송할 것인지 결정하는 것

- `FIFO(first in first out) scheduling`: 들어온 순서대로 선착순으로 패킷을 전송
- `discard policy`
  - `tail drop`: 가장 늦게 온 패킷을 드랍
  - `priority`: 앞의 100개의 패킷이 클라우드 백업 패킷이고, 101번째가 VoIP 패킷이라면 우선순위를 따져서 클라우드 패킷을 드랍함
  - `random`: 무작위로 패킷을 드랍

<br/>

### 18) Scheduling vs. Buffer management

<img src="../images/network-4-network-layer-1.18.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`Buffer Management`: 어떤 패킷이 버퍼링될 것인가? 어떤 flow가 얼마만큼의 공간을 차지할 것인가? e.g. 클라우드 백업 트래픽은 90 패킷까지만 버퍼링할 수 있다. 아직 10개의 버퍼 여유 공간이 있더라도 91번째 클라우드 백업 패킷은 드랍된다. 
`Packet Scheduling`: 패킷 버퍼 안의 어떤 패킷을 먼저 전송할 것인가?

<br/>

### 19) Scheduling policies: priority

<img src="../images/network-4-network-layer-1.19.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

위 그림에서 `빨간색` 패킷들은 `latency-sensitive application` 패킷들이고, `초록색`은 `throughput-sensitive application` 패킷들이다. 이 때 빨간색 패킷들을 우선순위를 높게하여 더 먼저 전송하는 것이다.

e.g. 이마트 소액전용 계산대

### 20) Scheduling policies: still more

#### (1) Round Robin (RR) scheduling

<img src="../images/network-4-network-layer-1.20.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Round Robin (RR) scheduling`: `한 round` 당 `각 queue`에서 `한 개씩` `output port`에서 패킷이 전송된다.

<br/>

##### Example

`1 Round`: 1, 2

`2 Round`: 1, 2

`3 Round`: 2 (1번는 queue에 패킷이 없음)

`4 Round`: 2 (1번는 queue에 패킷이 없음)

<br/>

#### (2) Weighted Round Robin (WRR) scheduling

<img src="../images/network-4-network-layer-1.20.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Weighted Round Robin (WRR) scheduling`: 각 queue별로 `가중치`를 줘서 한 round 당 뽑혀나가는 패킷의 양이 각 queue 마다 다르다.

#### Example

가중치의 비율이 1:2로 설정되어 있다 → 한 라운드당 `1500 bytes` : `3000 bytes`

`1 Round`: 1, 2, 2

`2 Round`: 1, 2, 2

<br/>

### 21) Put them together

<img src="../images/network-4-network-layer-1.21.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

두 개를 섞어서 사용할 수 있다.

<br/>

##### Example

`queue 1`번을 `high priority`로 설정하고, `queue 2, 3`번은 `low priority`로 설정한다.

그리고 `queue 2`번과 `queue 3`번 사이에는 가중치를 줘서 2:1의 비율로 패킷을 전송하도록 한다.

<br/>

### 22) Relationship between buffer sharing and bandwidth

<img src="../images/network-4-network-layer-1.22.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

queue 1에는 flow가 8개가 몰리고 있고, queue 2에는 32개의 flow가 몰리고 있다. 이 때 스케쥴러는 round robin scheduling을 사용하여 동등하게 한 라운드마다 각 queue에서 패킷을 하나씩 전송하더라도, 버퍼에 들어오는 arrival rate의 차이로 인해 queue 2에 저장되는 패킷이 훨씬 많아져서 각 queue 당 throughput이 1:1이 되지 않고 queue 1의 throughput이 훨씬 작게 된다.

<br/>

## 2. Internet Protocol

### 1) IP datagram format

<img src="../images/network-4-network-layer-2.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

Application layer: Message
Transport layer: Segment
IP layer: Datagram (Packet)

ToS (Type of Service)
- First 6 bits: DSCP
- Last 2 bits: ECN

<br/>

### 2) IP fragmentation, reassembly

<img src="../images/network-4-network-layer-2.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

network link마다 한 번에 보낼 수 있는 `최대 패킷`의 크기인 `MTU`가 있다. 일반적으로 `1500 bytes`이다. `MTU`는 스위치 마다 다르게 설정할 수 있다. ***`MTU`에서 20 bytes는 무조건 헤더로 할당되어야 한다.***

- `Fragmentation`: 단편화

<br/>

<img src="../images/network-4-network-layer-2.2.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

4000 bytes의 packet
Header 20 bytes + Payload 3980 bytes

MTU = 1500 bytes

실제로 한 패킷에 들어갈 수 있는 데이터는 헤더 20 bytes를 제외하고 각 1480 bytes이다.

`pkt 1` = 20 bytes (header) + `1480 bytes` (payload), fragflag = 1 (payload가 더 남아있음)

`pkt 2` = 20 bytes (header) + `1480 bytes` (payload), fragflag = 1 (payload가 더 남아있음)

`pkt 3` = 20 bytes (header) + `1020 bytes` (payload), fragflag = 0 (payload가 더 이상 없음)

`offset`은 바이트를 8씩 나눠서 적음

결과적으로 `40 bytes`의 `헤더 오버헤드(overhead)`가 발생하였다.

잘게 쪼개는 것의 장점은 헤더 오버헤드가 증가하여 `goodput`이 감소하기는 하지만, 패킷 하나 하나의 단위가 작기 때문에 패킷 버퍼에 여유 공간이 많이 없을 때 일부의 패킷만 `packet loss`를 경험하지만, 패킷 크기가 크면 패킷 전체가 `packet loss`가 될 수 있다.

<br/>

### 3) IP addressing: introduction

<img src="../images/network-4-network-layer-2.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`IP주소`는 `32비트`(8비트, 8비트, 8비트, 8비트)로 구성된다.

`IP주소`는 컴퓨터 주소가 아니다. 단일 컴퓨터 안에 여러개의 `IP주소`를 가질 수 있다. 왜냐하면 IP주소는 네트워크 인터페이스에 할당되기 때문이다.

스위치의 각 `포트(port)`마다 IP주소를 가질 수 있다.

<br/>

### 4) IP addressing: introduction

<img src="../images/network-4-network-layer-2.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 5) Subnets

<img src="../images/network-4-network-layer-2.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `subnet mask`: IP주소에서 어디까지를 `network address`로 사용할 것인지를 알려줌. 비트가 1로 되어 있는 곳까지가 `network address`로 사용되는 곳이고, 0으로 된 것이 `host address`로 사용한다.

163.152.XXX.YYY 고려대학교 /16

163.152.162.ZZZ 우정정보관

163.152.108.ZZZ 교양관

163.151.XXX.YYY 연세대학교

163.150.XXX.YYY 서울대학교

subnet이 다르면 직접 통신이 불가능하고, 반드시 라우터를 거쳐서 전송돼야 한다.

<br/>

<img src="../images/network-4-network-layer-2.5.2.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 6) IPv6: motivation

<img src="../images/network-4-network-layer-2.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`IPv6` 주소는 `128비트`이다.

### 7) IPv6 datagram format

<img src="../images/network-4-network-layer-2.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 8) Transition from IPv4 to IPv6

<img src="../images/network-4-network-layer-2.8.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

IPv6는 deployment 문제 때문에 확산되지 못했다. IPv6를 지원하는 모든 라우터들이 존재해야 했다. 전 인터넷 네트워크의 라우터들을 모두 업그레이드하는 것은 불가능하다.

- `tunneling`: `IPv4 패킷`과 `IPv6 패킷`이 호환되도록 하는 방법이다. `IPv6 패킷`을 `IPv4 패킷`의 payload로 숨겨서 전송하는 것이다. 

하지만 결국에는 IPv6는 적용되지 못했다.

<br/>

### 9) IPv6: adoption

<img src="../images/network-4-network-layer-2.9.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

결국 모든 장비를 IPv6를 지원하도록 업그레이드 할 수 없었고, NAT를 이용한 가상 IP의 등장으로 IPv6는 사용되지 않게 되었다.

<br/>

## 3. Network Layer Control Plane

### 1) Network-layer functions

<img src="../images/network-4-network-layer-3.1.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `forwarding`
- `routing`

### 2) Routing protocols

<img src="../images/network-4-network-layer-3.2.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

- `Routing protocol goal`: determine `"good"` paths. good의 기준은 라우팅 알고리즘마다 다르다.

<br/>

### 3) Graph abstraction of the network

<img src="../images/network-4-network-layer-3.3.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### 4) Graph abstraction: costs

<img src="../images/network-4-network-layer-3.4.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

각 edge에는 cost가 표시되어 있다. 

가장 낮은 cost를 갖는 path를 찾는 것이 라우팅 알고리즘이다.

위 그림에서 `u → z`로 가는 경로 중에 `cost`가 가장 낮은 경로는 `u → x → y → z`이다.

<br/>

### 5) Routing algorithm classification

<img src="../images/network-4-network-layer-3.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`라우팅 알고리즘`은 `global 방식`과 `decentralized 방식`이 있다.

스위치가 100개가 있다고 하면, 스위치 1은 자기가 속한 네트워크의 스위치들이 어떻게 연결되어 있는지 일반적으로는 알 수 없다.

`global 알고리즘`: 스위치가 네트워크와 모든 호스트에 대한 정보를 알고 있다고 가정한다. → 최적의 경로를 찾아낼 수 있다.

`decentralized 알고리즘`: 내 옆에 직접적으로 연결되어 있는 이웃 노드의 정보만 알고 있다고 가정한다(더욱 현실적이다).

<br/>

### 6) A link-state routing algorithm

<img src="../images/network-4-network-layer-3.6.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

#### (1) Dijkstra's algorithm

`Dijkstra`는 수학자였다.

`Dijkstra's algorithm`은 최단 경로를 찾는 알고리즘이다.

iteration이 돌아가면서 가장 작은 cost의 해당하는 경로들을 순차적으로 탐색하면서 선택하는 알고리즘이다.

<br/>

### 7) Routing protocols (More)

<img src="../images/network-4-network-layer-3.7.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

`데이터센터 네트워크`에서는 hop 수가 매우 작다. 인터넷 환경과는 다르게 라우팅 경로가 뻔한 경우가 많다.

```
    B  
  /   \  
A       D  
  \   /  
    C  
```

- `flow` = group of packets

1. `Per-flow routing algorithm` 기존 인터넷 네트워크에서는 주로 사용하는 라우팅 알고리즘이다. 
`per-flow routing algorithm`에서는 `A - B - D`와 `A - C - D` ***둘 중 `한 경로`로 패킷을 보낸다.*** 기본적으로 `라우팅 알고리즘`은 `flow 단위`로 처리한다.

2. `Per-packet routing algorithm`:  `flow`를 쪼개서 일부 패킷은 `A - B - D`경로로 보내고, 일부 패킷은 `A - C - D` 경로로 전송한다. ***따라서 `flow` 단위가 아니라 `packet` 단위로 `fine-grained`한 방식으로 패킷을 전송한다.*** 이렇게 하는 이유는 각 경로마다 `RTT`가 유동적으로 변할 수 있기 때문에 시간에 따라 최소 cost를 갖는 최적의 경로가 바뀔 수 있기 때문이다.

3. `Power of two choices routing algorithm`: 두 경로 중에 랜덤하게 보내는 것이다. 확률적으로는 한 쪽으로만 보내는 것보다는 나은 결과가 나올 수 있다.

4. `Other routing algorithms`: 동일한 패킷을 복사해서 두 경로에 모두 패킷을 전송하는 방법도 있다. 늦게 도착한 패킷은 무시되고, A도 먼저 도착한 ACK만 처리한다.

<br/>

### 8) Last words

<img src="../images/network-4-network-layer-3.8.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>
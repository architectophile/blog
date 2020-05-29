# 2. Application Layer

<br/>

## Blackboard issues

clients = 수요

servers = 공급

수요 트래픽이 `network bandwidth`를 초과하게 되면 `network bottleneck`이 발생하고, `packet buffering` 발생 → `queueing delay` 또는 `packet loss` 발생

한 번 `queueing delay`가 발생하기 시작하면 사용자들이 계속 새로고침을 하며 요청이 더욱 증가하여 악순환이 된다. 클라이언트 요청이 너무 많아지면 서버의 cpu 안에서도 버퍼링이 발생하여 `queueing delay`가 발생하게 된다.

> ***Note:***  
buffer 최대 크기를 넘어서서 더 이상 기록을 할 수 없으면 switch가 packet drop을 하여 `packet loss`가 발생한다.

유튜브 서버들은 데이터센터 안에 있고 스위치의 수가 매우 많다. 트래픽이 많이 들어와도 충분히 감당할 수 있다. 

그리고 데이터센터에서는 `load balancing`를 이용하여 여러 스위치에 트래픽을 동적으로 할당하여 효율적으로 운영한다.

<br/>

## 2.1. Principles of network applications

### Some network apps

- e-mail
- web
- text messaging
- remote login
- P2P file sharing
- multi-user network games
- streaming stored video(YouTube, Hulu, and Netflix)

<br/>

### Creating a network app

`network`를 통해서 네트워크 어플리케이션끼리 통신한다. e.g. 웹서버는 클라이언트의 브라우저 어플리케이션과 통신한다.

`network core` 장치들을 위해 어플리케이션을 만들 필요가 없다. `network core` 장치들의 역할은 네트워크에서 패킷을 목적지까지 잘 전달해주는 것(routing, forwarding)이다. 하지만 어플리케이션은 `network edge` 장치에서 실행된다. application layer 하위 계층에서 발생하는 일에 대해서는 관여하지 않으며 알지도 못한다.

> ***Note:***  
- `Network App`: Application Layer
- `Network Core`: Network Layer

<br/>

### Client-server architecture

`Client-server architecture`는 대부분의 어플리케이션들이 사용하는 구조이다.

Client → Server 요청

Server → Client 회신

<br/>

#### Server  
- `always-on host`: `Client-server architecture`에서는 `Server`는 ***항상 켜져있어야 한다***.
- `permanent IP address`: `Server`의 `IP 주소`는 영구적으로 고정되어 있어야 한다. 만약 IP 주소가 변경되면 그것을 클라이언트에게 알려줘야 한다.
- `data centers for scaling`: 데이터센터 안에는 매우 많은 서버가 있어서 트래픽이 많이 발생하면 더 많은 서버를 할당할 수 있다. 이것을 자동화한 것이 `auto scaling`이다. 

요즘에는 자체 서버 보다는 클라우드 데이터센터를 많이 사용한다.

<br/>

#### Client  
- `communicate with server`: 클라이언트는 서버와 통신을 한다. 
- `may be intermittently connected`: 간헐적으로 연결될 수 있다.
- `may have dynamic IP addresses`: 클라이언트 IP 주소는 동적으로 변경될 수 있다. e.g. 스마트폰은 `cellular network`을 사용하는데 해당 기지국에서 새로 IP 주소를 할당해주므로 이동하면서 계속 IP 주소가 변경된다.
- `do not communicate directly with each other`: 카카오톡 메시지는 클라이언트끼리 통신하는 것이 아니라 클라이언트가 서버에 메시지를 전송하면, 다른 클라이언트가 서버에서 메시지를 읽어온다.

<img src="../images/network-application-layer-2.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

### P2P architecture

`P2P architecture`는 토렌트에서 사용하는 구조이다.

`server`와 `client`의 경계가 없다. 모든 `client`가 동시에 `server` 역할도 한다.

client끼리 직접 데이터를 서로 주고 받는다. 

`seed user`: 100% 데이터를 갖고 있는 클라이언트이다. 만약 seed user가 없다면 모든 사용자는 절대 100% 데이터를 다운로드할 수가 없다.

대부분의 P2P 구조에서는 인센티브나 페널티 제도를 사용한다. 만약 upload rate를 제한하면 download rate도 제한시키기도 한다. 네트워크에 기여하도록 유도한다.

비트코인 블록체인 네트워크도 P2P 방식을 사용한다.

<br/>

### Processes communicating

- `process`: program running within a host

동일한 호스트 안에 있는 프로세스끼리 통신할 때는 OS에서 지원하는 `inter-process communication`을 이용해 통신할 수 있다.

하지만 서로 다른 호스트에 있는 프로세스끼리 통신할 때는 `client process`와 `server process`가 서로 `message`를 교환하여 통신하게 된다.

프로그램이 실행되면 해당 프로세스는 항상 메모리를 사용하게 된다.

<img src="../images/network-application-layer-2.1.2.png?raw=true" alt="drawing" width="640"/>

<br/>

### Sockets

프로세스끼 간에는 `socket`을 통해서 어플리케이션 `message`를 전송하고 전달받는다.

<img src="../images/network-application-layer-2.1.3.png?raw=true" alt="drawing" width="720"/>

<br/>

### Addressing processes

네트워크를 통해서 프로세스끼리 통신하기 위해서는 `IP주소`를 갖고 있어야 한다.

`IP주소`는 물리적인 네트워크 디바이스를 구분하는 주소이다. 따라서 `IP주소`는 호스트를 구분하는 주소이지만 프로세스를 구분할 수 없다. 해당 호스트에는 도착할 수 있지만 어떤 프로세스와 통신해야 하는지는 알 수가 없다.

따라서 프로세스를 찾을 수 있도록 `포트 번호(port number)`를 사용한다.

identifier includes both `IP address` and `port numbers`.

- `well known port numbers`: 80(http), 25(mail server), 443(https)

<br/>

### App-layer protocol defines

- `types of messages exchanged`
- `message syntax`
- `message semantics`
- `rules`
- `open protocols`: RFC(Request for Comments)

<br/>

### What transport service does an app need?

- `data integrity`: `reliable data transfer`의 의미는 `packet loss`가 없음을 의미한다. 파일 전송할 때는 `reliability`가 매우 중요하지만 오디오 전송 같은 경우에는 `packet loss`를 허용하기도 한다.

- `timing`: 인터넷 전화, 게임 등에서는 짧은 지연시간이 매우 중요하다. `deadline(effective delay)`은 어플리케이션이 필요한 최소한의 시간지연을 의미한다. 예를 들어 게임에서 ping이 50ms 이하로 나와야 한다는 것을 의미한다.

- `throughput`: `effective throughput` = `minimum throughput`을 의미하며, 어플리케이션이 제대로 동작하기 위해 요구되는 최소한의 `throughput`을 말한다.

- `security`: 민감한 정보는 암호화가 필요하다.

<br/>

### Transport service requirements: common apps

<img src="../images/network-application-layer-2.1.4.png?raw=true" alt="drawing" width="640"/>

<br/>
  
### Internet transport protocols services

<img src="../images/network-application-layer-2.1.5.png?raw=true" alt="drawing" width="640"/>

<br/>

- `TCP`: reliable data transfer
- `UDP`: unreliable data transfer이지만 상대적으로 TCP보다 빠르다.

<br/>

### Internet apps: application, transport protocols

<img src="../images/network-application-layer-2.1.6.png?raw=true" alt="drawing" width="640"/>

<br/>

> ***Note:***  
최근에는 TCP 기술이 많이 발전하여 ***TCP 속도가 많이 빨라져서 UDP 만큼 빨라졌다.*** 그리고 `Youtube`에서는 `TCP`를 사용한다.

<br/>

## 2.2. Web and HTTP

### 웹페이지 구성요소

웹 페이지는 수 많은 `오브젝트(objects)`로 이루어져 있다. 오브젝트들은 그림, html 파일, video, audio, java applet 등이 있다.

각 오브젝트는 해당 `URL`을 통해서 찾을 수 있다.

<img src="../images/network-application-layer-2.2.1.png?raw=true" alt="drawing" width="480"/>

<br/>

### HTTP overview

client-server 구조에서 사용한다.

- `HTTP`: hypertext transfer protocol

<img src="../images/network-application-layer-2.2.2.png?raw=true" alt="drawing" width="480"/>

<br/>

웹페이지는 서버에 저장되어 있는 다양한 `오브젝트(objects)`를 보여주는 것이다.

개별 오브젝트를 `URL`을 통해 하나씩 읽어올 수도 있다.

- `client`: Browser that requests, receives,(using HTTP protocol) and “displays” Web objects.

- `server`: Web server sends (using HTTP protocol) objects in response to requests.

`socket`은 다른 호스트에 있는 프로세스 간에 inter-process communication을 처리하는 역할 또는 관문 역할을 한다.

<br/>

Http uses `TCP`

1. client initiates TCP connection (creates socket) to server, port 80

2. server accepts TCP connection from client.

3. HTTP messages(application-layer protocol
messages) exchanged between browser (HTTP client) and Web server(HTTP server).

4. TCP connection closed

<br/>

HTTP is `stateless`: 이전 상태를 저장하지 않는다. 최대한 심플하게 하기 위해서이다.

<br/>

#### Non-persistent HTTP

<img src="../images/network-application-layer-2.2.3.png?raw=true" alt="drawing" width="640"/>

<img src="../images/network-application-layer-2.2.4.png?raw=true" alt="drawing" width="640"/>

<br/>

한 TCP 연결당 최대 1개의 오브젝트를 전송할 수 있다. 오브젝트 개수 만큼 연결을 생성해야 한다.

오브젝트1(txt), 오브젝트2(jpg), 오브젝트3(gif)

1. 커넥션 생성
2. 오브젝트1 요청 및 응답
3. 커넥션 종료
4. 커넥션 생성
5. 오브젝트2 요청 및 응답
6. 커넥션 종료
7. 커넥션 생성
8. 오브젝트3 요청 및 응답
9. 커넥션 종료

<br/>

<img src="../images/network-application-layer-2.2.5.png?raw=true" alt="drawing" width="480"/>

<br/>

1개의 오브젝트를 전송하기 위한 `non-persistent HTTP` response time = `2RTT` + `file transmission time`

non-persistent HTTP에서는 오브젝트 전송을 위한 기본 RTT 시간이 많이 걸리는 문제 뿐만 아니라, socket의 패킷 프로세싱은 OS에서 처리되기 때문에 많은 소켓 커넥션 생성에 의한 시스템 자원의 오버헤드도 많이 발생하는 문제가 있다.

<br/>

#### Persistent HTTP

한 TCP 연결당 여러개의 오브젝트를 전송할 수 있다.

1. 커넥션 생성
2. 오브젝트1 요청 및 응답
5. 오브젝트2 요청 및 응답
8. 오브젝트3 요청 및 응답
9. 커넥션 종료

`persistent HTTP`는 상대적으로 `non-persistent HTTP`에 비해서 기본적으로 필요한 RTT 뿐만 아니라 시스템 자원의 오버헤드도 많이 줄어드는 장점이 있다.

일반적으로 `persistent HTTP`에서 아무 요청없이 30분 이상 초과하면 서버에서 커넥션을 종료한다.

<br/>

#### 예제(example)

1kb index.html, 99개의 각 1kb 이미지 파일들이 있을 때, 만약 1kb 파일을 전송하는데 필요한 시간이 1RTT라고 하면, 1개의 파일을 전송받는데 필요한 시간은 2RTT + 1RTT = 3RTT가 된다.

이 때 `non-persistent HTTP`에서는 index.html을 포함한 99개의 모든 이미지를 전송받기 위해서는 `3RTT × 100 = 300RTT`의 시간이 필요하다.

하지만 `persistent HTTP`에서 필요한 응답시간은 최초 연결을 위한 1RTT + file transmission time + 연결 종료를 위한 1RTT가 된다. 따라서 `1RTT + 100RTT + 1RTT = 202RTT`의 시간이 필요하게 된다.

<br/>

### HTTP request message

<img src="../images/network-application-layer-2.2.6.png?raw=true" alt="drawing" width="480"/>

<br/>

<img src="../images/network-application-layer-2.2.7.png?raw=true" alt="drawing" width="480"/>

<br/>

### Uploading form input

- `URL(GET)` method: Read query, 데이터를 읽어올 때 사용하며, URL 상에 input 데이터를 부가적으로 전송한다. 일반적으로는 서버에 쓰여질 데이터를 input으로 보내지는 않는다.
- `POST` method: 데이터를 쓸 때 사용하며(게시판 댓글), entity body 안에 input 데이터를 전송한다. 일반적으로 서버에 저장할 데이터를 input 데이터로 전송한다.
- `HEAD` method: 서버의 상태를 점검하기 위해 사용한다.

<br/>

### Method types

- `HTTP/1.0`: GET, POST, and HEAD
- `HTTP/1.1`: GET, POST, HEAD, PUT, and DELETE

<br/>

### HTTP response message

<img src="../images/network-application-layer-2.2.8.png?raw=true" alt="drawing" width="480"/>

<br/>

### HTTP response status codes

- `200`: OK
- `301`: Moved Permanently
- `400`: Bad Request
- `404`: Not Found
- `505`: HTTP Version Not Supported
- `503`: Service Unavailable

<br/>

### User-server state: cookies

- `Client-side cookie`: 클라이언트 장치에 저장된 쿠키 e.g. 웹브라우저에서 로그인 정보 자동 입력
- `Server-side cookie`: 서버 장치에 저장된 쿠키 e.g. 로그인 유지(세션) → 한 번 로그인하면 브라우저를 껐다가 켜도 계속 로그인되어 있음, 아마존 장바구니 아이템 목록

> ***Note: ***  
요즘에는 `Client-side cookie`와 `Server-side cookie`의 경계가 많이 없어지고 있다. e.g. 구글 계정 연동으로 여러 장치에서 쿠키를 공유하여 사용할 수 있다. 하지만 서버에 비밀번호와 같은 정보를 쿠키로 저장하는 것은 보안 문제를 일으킬 수 있다.

※ 외국 사이트에 가면 사용자의 쿠키를 저장하는 것에 대한 사용자 동의를 얻는 경우가 있다.

<br/>

### Cookies: keeping “state” (cont.)

<img src="../images/network-application-layer-2.2.9.png?raw=true" alt="drawing" width="480"/>

<br/>

### Web caches (proxy server)

<img src="../images/network-application-layer-2.2.10.png?raw=true" alt="drawing" width="480"/>

<br/>

프로시 서버는 서버와 클라이언트 역할을 동시에 수행한다. 사용자를 대신해서 클라이언트 역할을 하여 다른 서버에 요청을 전달한다.

object1     4           7           10  
2           5           8           11  
3           6           9           12  
server1     server2     server3     server4  

보통은 특정 서버나 특정 오브젝트에 대한 요청이 많이 몰리게 된다(`load imbalance`).

프록시 서버에 캐쉬를 저장하여 자주 요청되는 데이터를 빠르게 전송할 수 있다. 이럴 경우 실제 서버까지 요청할 필요가 없다.

<br/>

### More about Web caching

일반적으로 cache는 ISP에 의해 제공된다.

#### Why web caching?
- 응답시간을 줄일 수 있음
- 트래픽을 줄일 수 있음, 네트워크 자원 절약
- 인터넷은 많은 캐쉬가 있음

> ***Note: ***  
***일단 무조건 캐쉬에 보내고 보기 때문에*** 만약에 캐쉬가 안되어 있다면 캐쉬를 방문한 요청은 `delay=손실`이 된다. → latency penalty for a cache miss(캐쉬를 사용하는 것에 대한 tradeoff)

많이 요청되는 오브젝트에 대한 response time은 빠르게 되고, 덜 요청되는 오브젝트에 대한 response time은 조금 느리게 된다.

<br/>

## 2.3. DNS

### DNS: domain name system

서버1       서버2       서버3       서버4  
cafe        blog        new        cafe

서버4 = 서버1의 replica

selective replication, replicated systems

서버 IP주소는 영구적이어야 한다. 하지만 해당 서버는 여러개이므로 IP주소도 여러개이다.

이를 해결하기 위해서 `domain name`을 사용한다. `DNS`는` hostname`을 `IP주소`로 변환해준다.

#### Domain Name System
- distributes database
- application-layer protocol

<br/>

### DNS: services, structure

#### DNS services
- hostname to IP address translation
- host aliasing(canonical, alias names)
- mail server aliasing
- load distribution(replicated web servers): 여러 IP 주소들을 하나의 이름으로 맵핑

#### Why not centralize DNS?
- single point of failure
- traffic volume
- distant centralized database
- maintenance

<img src="../images/network-application-layer-2.3.1.png?raw=true" alt="drawing" width="640"/>

<br/>

### DNS: root name servers

`local name server`에 의해 접근된다. `root name servers`는 여러 국가에 replicated 되어있다.

<img src="../images/network-application-layer-2.3.2.png?raw=true" alt="drawing" width="640"/>

<br/>

### TLD, authoritative servers

#### Top-level domain (TLD) servers:
- com, org, net, edu, aero, jobs, museums와 모든 top-level 국가 도메인(e.g. uk, kr, ca)

#### Authoritative DNS servers:
- organization's own DNS servers: 

e.g. `portal.korea.ac.kr`를 접근할 경우 우선 다음과 같이 IP주소를 가져오게 된다.  
`root name server` → kr `TLD server` → ac `TLD server`  → portal `authoritative DNS server`

<br/>

### Local DNS name server

자주 접속하는 사이트 등의 hostname과 IP주소를 갖고 있다.

각 ISP는 Local DNS name server를 갖고 있다.

`host`가 `DNS query`를 요청하면 우선 `local DNS server`에 요청한다.

> ***Note: ***  
하지만 `local DNS server`의 정보는 ***outdated 되었을 수 있다.*** → `cache coherence` 문제, `consistency`를 보장해야 함

### DNS name resolution example

#### Iterated Query

local DNS server가 계속 찾아가기 때문에 root DNS server에 트래픽이 많이 몰리지 않는다. local DNS server에게 load를 분산한다. 하지만 local DNS server가 많은 load를 감당해야 한다.

<img src="../images/network-application-layer-2.3.3.png?raw=true" alt="drawing" width="480"/>

<br/>

#### Recursive Query

<img src="../images/network-application-layer-2.3.4.png?raw=true" alt="drawing" width="480"/>

<br/>

### DNS: caching, updating records

한 번 name server가 맵핑을 받으면, 이것을 캐쉬한다.

- cache entires timeout after some time(TTL)
- TLD server들은 일반적으로 local name server에 캐쉬되어 있다. 따라서 root name server를 거치지 않는 경우가 많다.

cached entires는 `out of date`일 수도 있다. 왜냐하면 캐쉬된 정보가 실시간으로 업데이트되지 않기 때문이다.

<br/>

### DNS protocol, messages

`query`와 `reply` messages는 동일한 `message format`을 갖는다.

<img src="../images/network-application-layer-2.3.5.png?raw=true" alt="drawing" width="480"/>

<br/>

## 2.4. Socket programming with UDP and TCP

### Socket programming

<img src="../images/network-application-layer-2.4.1.png?raw=true" alt="drawing" width="720"/>

<br/>

`socket`은 호스트가 다른 장치에 있는 프로세스와 네트워크를 통해서 통신하기 위해서 사용하는 관문 역할을 한다. 

- 네트워크를 통해 프로세스들을 서로 연결하는 `인터페이스(interface)`이다.
- 여러가지 프로토콜을 위한 `generic interface`이다.

<img src="../images/network-application-layer-2.4.2.png?raw=true" alt="drawing" width="720"/>

<br/>

### What APIs Needed?

#### Connection-oriented TCP

1. create socket
2. establish connection
3. data send/receive
4. identify socket
5. close socket

#### Connectionless UDP

1. create socket
3. data send/receive
4. identify socket
5. close socket

<br/>

### Socket Descriptor

<img src="../images/network-application-layer-2.4.3.png?raw=true" alt="drawing" width="480"/>

<br/>

TCP를 사용할 경우 `SOCK_STREAM`을 선택하고, UDP를 사용할 경우 `SOCK_DGRAM`을 사용한다.

<br/>

### Socket programming

- `UDP`: unreliable datagram
- `TCP`: reliable, byte stream-oriented

<br/>

### Socket programming with UDP

`sender`가 `목적지 IP주소`와 `포트번호`를 ***명시적으로(explicitly) 패킷에 붙여서 전송한다.***

`receiver`는 패킷의 `목적지 IP주소`와 `포트번호`를 읽어서 처리한다.

`UDP`를 사용하면 `packet loss`가 발생하거나 순서가 바뀔 수 있지만 이에 대한 처리는 하지 않는다.

<img src="../images/network-application-layer-2.4.4.png?raw=true" alt="drawing" width="480"/>

<br/>

### Socket programming with TCP

`UDP`와의 가장 큰 차이점은 소켓을 생성하고 커넥션을 생성하는 과정이 있다.

<img src="../images/network-application-layer-2.4.5.png?raw=true" alt="drawing" width="480"/>

<br/>

`TCP`에서는 커넥션을 한 번 생성하면 패킷에 `IP주소`와 `포트번호`를 붙이지 않아도 된다.

<br/>

### Refreshing

- Host (NIC card)는 IP 주소에 의해 구분된다.
- 네트워크 어플리케이션/프로세스는 포트번호에 의해 구분된다.
- 네트워크 커넥션은 `5-tuple`(src ip, src port, dst ip, dst port, protocol)에 의해서 구분된다.


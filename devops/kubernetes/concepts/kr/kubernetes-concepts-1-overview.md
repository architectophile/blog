# I. Overview

<br/>

## 1. What is Kubernetes?

`쿠버네티스(Kubernetes)`는 `선언적 설정(declarative configuration)`과 `자동화(automation)`를 가능하게 하는 `컨테이너화된(containerized)` 워크로드와 서비스를 관리하기 위한 이식가능하고(portable), 확장가능한(extensible), 오픈소스 플랫폼(open-source platform)이다.

`쿠버네티스(Kubernetes)`라는 이름은 그리스어(Greek)로 `조타수(helmsman)` 또는 `조종사(piolot)`을 의미한다. 구글은 쿠버네티스 프로젝트를 2014년에 오픈소스화하였다. `쿠버네티스`는 `구글`의 15년간 축적된 `프로덕션 워크로드(production workloads)`을 매우 큰 스케일에서(at scale)에서 운영해온 경험(experience)과 `커뮤니티`의 최상의(best-of-breed) `아이디어(ideas)`와 `실습(practice)` 결과들을 결합하여 만들어졌다.

<br/>

### 1) Going back in time

과거의 방식들을 살펴보며 왜 쿠버네티스가 유용한지 알아보도록 하자.

<img src="../images/kubernetes-concepts-1-overview-1.1.1.1.png?raw=true" alt="drawing" width="864"/>

<br/>

#### (1) Traditional deployment era

과거 초창기 시절에는 기업들은 `어플리케이션`을 `물리적 서버(physical servers)`에서 운영하였다. 이 때는 물리적 서버에서 각 `어플리케이션`별로 `리소스 바운더리(resource boundaries)`를 설정할 수 없었으며, 이로 인해 리소스 할당에 대한 문제가 발생했다. 예를 들어 한 개의 물리적 서버 안에서 여러 개의 어플리케이션이 실행될 때, 한 개의 어플리케이션이 대부분의 리소스를 차지하는 인스턴스들이 존재할 수 있었다. 그 결과로 다른 어플리케이션들은 성능이 저하되는(underperform) 문제가 발생하였다. 이에 대한 한 가지 해결방법은 각 어플리케이션을 서로 다른 물리적 서버에서 동작시키는 것이다. 하지만 이 방법은 리소스들이 최대로 활용되지 못하기(underutilized) 때문에 확장(scale)할 수 없었고, 기업 입장에서 여러 개의 물리적 서버를 운용하는 것은 많은 비용이 필요했다.

<br/>

#### (2) Virtualized deployment era

앞서 나타난 문제를 해결하기 위하여 `가상화(Virtualization)` 방법이 소개되었다. 이 방법은 한 개의 물리적 서버 CPU 위에서 여러 개의 `가상머신들(Virtual Machines (VMs))`을 실행하도록 하였다. 이 `가상화` 방법에서는 각 가상머신 사이에서 `어플리케이션`끼리 `독립되어(isolated)` 운용되었고, 한 어플리케이션의 정보에 다른 어플리케이션들이 자유롭게 접근할 수 없었기 때문에 `보안성(security)`을 제공하였다.

가상화 방법은 한 개의 물리적 서버에서 `리소스들(resources)`의 `활용도(utilization)`를 높일 수 있었고, 좋은 `확장성(scalability)`을 제공하였다. 왜냐하면 가상화 방법을 통해 각 어플리케이션은 손쉽게 추가되고 업데이트될 수 있었으며, 하드웨어에 대한 비용을 줄일 수 있었다. 가상화 방법을 통해 어떤 물리적 리소스들의 한 집합(set)을 여러 개의 `일회용(disposable)` 가상머신들로 이루어진 하나의 `클러스터(cluster)`로 나타낼 수 있었다.

이 때 각 `가상머신(VM)`은 `가상화된 하드웨어(virtualized hardware)` 위에서 `운영체제(operating system)`를 포함하여 필요한 모든 `컴포넌트들(components)`을 실행시켜야 했다.

<br/>

#### (3) Container deployment era

컨테이너들(containers)은 가상머신과 비슷하지만 컨테이너들은 좀 더 느슨한(relaxed) 독립성(isolation) 속성들을 제공함으로써 어플리케이션들 사이에서 운영체제(operating system)를 공유할 수 있도록 한다. 따라서 컨테이너는 가상머신에 비해 가볍다(lightweight).

가상머신과 비슷하게 한 컨테이너는 자신만의 filesystem, share of CPU, memory, process space 등을 갖는다. 그리고 각 컨테이너들은 하위에 있는 `인프라(infrastructure)`와는 `분리되어(decoupled)` 있기 때문에 서로 다른 운영체제 또는 클라우드 사이에서 `이식가능(portable)`하다.

`컨테이너(container)`는 다음과 같은 `장점들(benefits)`을 갖고 있다.

- `애자일(agile)`한 어플케이션 생성 및 배포: 가상머신 이미지에 비해서 훨씬 쉽고 효율적인 컨테이너 이미지를 생성한다.
- `지속적 개발, 통합 및 배포(CI/CD)`: 안정적으로(reliable) 빈번하게(frequent) 컨테이너 이미지를 빌드하고 배포하며, 빠르고 쉬운 `롤백(rollback)`을 제공한다(컨테이너 이미지의 불변성(immutability)을 통해).
- `개발(Dev) 과 운영(Ops)의 분리`: 어플리케이션 컨테이너 이미지를 배포 과정이 아닌 빌드/릴리즈 과정에서 생성함으로써 인프라(infrastructure)와 분리되도록 한다.
- `높은 관측성(observability) 제공`: 단순히 운영체제 레벨의 정보나 메트릭(metrics) 뿐만 아니라 어플리케이션의 상태(health)와 여러가지 신호(signals)를 제공한다.
- `개발, 테스팅, 생산 전반에 걸친 환경 일관성(environmental consistency)`: 클라우드에서 동작하는 것처럼 노트북에서도 동일하게 동작한다.
- `클라우드 및 다양한 운영체제 이식성(portability)`: Ubuntu, RHEL, CoreOS, on-premises, Clouds 등 모든 곳에서 실행가능하다.
- `어플리케이션 중심의 관리`: 기존에는 가상 하드웨어(virtual hardware) 위에서 운영체제를 실행하는 것에서 이제는 운영체제의 논리적 리소스들(logical resources) 위에서 어플리케이션을 실행하는 것으로 바뀌면서 `추상화(abstraction)` 레벨이 높아졌다.
- `마이크로 서비스(micro services)`: 느슨하게 커플링된(loosely coupled), 분산되고(distributed), 탄력적이고(elastic), 자율적인(liberated) 마이크로 서비스를 사용할 수 있다. 어플리케이션은 더 작고 독립적인 여러개의 마이크로 서비스로 나눠질 수 있고, 동적으로 배포되고 관리될 수 있다.
- `리소스 고립(isolation)`: 어플리케이션의 `성능(performance)`이 예측가능(predictable)하다.
- `리소스 활용(utilization)`: 리소스의 높은 효율성(efficiency)과 사용 밀도(density)를 제공한다.

<br/>

### 2) Why you need Kubernetes and what it can do

컨테이너는 어플리케이션들을 하나로 `묶고(bundle)` `실행(run)`시키기 위한 좋은 방법이다. `프로덕션 환경(production environment)`에서는 어플리케이션들을 실행시키는 컨테이너를 관리하고 어플리케이션이 동작하지 않는 `다운타임(downtime)`이 발생하지 않도록 해야 한다. 예를 들어 어떤 컨테이너 하나가 종료되면, 다른 컨테이너가 시작되어야 한다. 만약 이런 것들이 시스템에 의해서 처리된다면 매우 편할 것이다.

이를 위해서 쿠버네티스가 개발되었다. 쿠버네티스는 `분산된 시스템들(distributed systems)`을 `회복력 있게(resiliently)` 실행할 수 있도록 하는 프레임워크(framework)를 제공한다. 쿠버네티스는 어플리케이션의 `스케일링(scailing)`과 `장애극복(failover)`을 처리하며, `배포 패턴(deployment patterns)` 등을 제공한다. 예를 들어, 쿠버네티스는 매우 쉽게 `카나리아 배포(canary deployment)`를 관리할 수 있다.

쿠버네티스가 제공하는 것들은 다음과 같다.

- `서비스 발견과 로드 밸런싱`: 쿠버네티스는 컨테이너를 `DNS이름` 또는 `IP주소`를 이용하여 노출시킬 수 있다. 만약 특정 컨테이너의 트래픽이 높을 경우 쿠버네티스는 `로드 밸런싱`을 통해 네트워크 트래픽을 분산하여 안정적인(stable) 운영을 가능하게 한다.

- `스토리지 오케스트레이션`: 쿠버네티스는 자동으로 스토리지 시스템을 마운트할 수 있다. 예를 들어 로컬 스토리지 또는 퍼블릭 클라우드 등을 자동으로 마운트할 수 있다.

- `자동 롤아웃 및 롤백`: 배포된 컨테이너의 `원하는 상태(desired state)`를 설정(describe)할 수 있으며, 이를 이용하여 컨테이너의 상태를 원하는 상태(desired state)로 설정된 속도(at a controlled rate)로 변화시킬 수 있다. 예를 들어, 쿠버네티스를 이용하여 새로 배포되는 컨테이너들을 생성하고, 기존의 컨테이너들은 삭제하고 모든 리소스들을 새로운 컨테이너에 할당하는 작업을 자동화할 수 있다.

- `자동 빈 패킹(bin packing)`: 쿠버네티스에게 여러 노드들(nodes)의 클러스터(cluster)를 전달하여 컨테이너화된 태스크들(containerized tasks)을 수행할 수 있다. 쿠버네티스에게 각 컨테이너가 필요한 CPU와 memory (RAM) 용량을 알려주면 쿠버네티스는 컨테이너들을 노드들에게 맞추어 리소스를 최대로 활용할 수 있도록 한다.

- `자체복구`: 쿠버네티스는 실패한 컨테이너들을 재시작(restart)하고, 사용자 정의된 `상태 체크(health check)`에 응답하지 않는 컨테이너들을 교체(replace)하고 없앤다(kill). 그리고 컨테이너들이 정상적으로 동작하지 전까지는 클라이언트에게 노출시키지 않는다.

- `비밀정보 및 설정 관리`: 쿠버네티스는 민감정보(secrets)를 저장하고 관리할 수 있도록 한다. 예를 들어 `패스워드`, `OAuth 토큰`, `SSH 키` 등을 관리한다. 쿠버네티스를 이용하면 비밀정보나 어플리케이션의 설정값을 배포하거나 업데이트할 때, 컨테이너 이미지를 재빌드할 필요가 없으며, 스택 설정(stack configuration) 안의 비밀정보를 노출시키지 않는다.

<br>

### 3) What Kubernetes is not

쿠버네티스는 전통적인 모든 것을 포함하는(all-inclusive) `PaaS (Platform as a Service)` 시스템이 아니다. 쿠버네티스는 `하드웨어 레벨(hardware level)`이 아니라 `컨테이너 레벨(container level)`에서 운영되기 때문에 보편적으로 적용할 수 있는 `배포(deployment)`, `스케일링(scaling)`, `로드 밸런싱(load balancing)` 등을 제공하며, 사용자로 하여금 솔루션에 대한 `로깅(logging)`, `모니터링(monitoring)`, `변경(altering)`을 `통합(integrate)`하게 해준다. 하지만 쿠버네티스는 `단일 형태(monolithic)`가 아니며 이러한 디폴트 솔루션들(default solutions)은 `선택적(optional)`이며 `플러거블(pluggable)`하다.  
쿠버네티스는 `개발자 플랫폼(developer platforms)`을 빌드하기 위한 `빌딩 블록(building blocks)`을 제공하지만, 중요한 `사용자의 선택(user choice)`과 `유연성(flexibility)`은 유지하도록 한다.

쿠버네티스 다음과 같은 특징을 갖는다.

- 쿠버네티스는 지원되는 어플리케이션의 종류가 제한되지 않는다. 쿠버네티스는 매우 다양한 종류의 `워크로드들`(e.g. stateless, stateful, data-processing workloads)을 지원하는 것이 목적이다. 만약 어플리케이션이 컨테이너에서 실행된다면 그것은 쿠버네티스에서도 잘 동작해야 한다.

- 쿠버네티스는 소스코드를 배포하거나 어플리케이션을 빌드하지 않는다. `CI/CD 워크로드`는 기업의 요구사항과 기술 요구사항에 맞게 결정된다.

- 쿠버네티스는 `어플리케이션 레벨`의 서비스를 제공하지 않는다. 예를 들어 `미들웨어(e.g. message buses)`, `데이터 처리 프레임워크(e.g. Spark`), `데이터베이스(e.g. MySQL)`, `캐쉬(caches)`, 또는 `클러스터 스토리지 시스템(e.g. Ceph)` 등의 서비스를 제공하지 않는다. 이러한 컴포넌트들은 쿠버네티스에서 실행될 수 있으며, `Open Service Broker`와 같은 `이식 메커니즘(portable mechanisms)`을 통해 쿠버네티스에서 실행되는 다른 어플리케이션에 의해 접근이 가능하다.

- 쿠버네티스는 솔루션의 `로깅`, `모니터링`, `변경`을 독점하지 않는다. 쿠버네티스는 이러한 것들의 `통합(integrations)`을 `POC`로서 제공하며, `메트릭(metrics)`을 `수집(collect)`하고 `외부로 전달(export)`하기 위한 메커니즘을 제공한다.

- 쿠버네티스는 `설정 언어/시스템` (e.g. Jsonnet)을 제공하거나 강제하지 않는다. 쿠버네티스는 `선언적(declarative) API`를 제공하는데, 이것은 다양한 형태의 `선언적 스펙들(declarative specifications)`에 의해 사용될 수 있다.

- 쿠버네티스는 어떠한 전체적인 머신 설정, 유지보수, 관리, 또는 자체복구 시스템을 사용(adopt)하지 않는다. 그리고 쿠버네티스는 단순한 오케스트레이션 시스템이 아니다. 사실, 쿠버네티스는 오케스트레이션의 필요성을 없애준다. 오케스트레이션의 기술적 의미는 정의된 워크플로우(e.g. A를 하고, B를 하고, C를 수행하라.)의 실행이다. 반면 쿠버네티스는 `현재 상태(current state)`를 `요구되는 상태(desired state)`로 지속적으로(continuously) 유도하는 `독립적(independent)`이고 `결합할 수 있는(composable)` 제어 `프로세스들(control processes)`의 집합으로 이루어져 있다. 쿠버네티스에서는 A에서 C로 어떻게 이동하는지는 중요하지 않다. 중앙적인(centralized) 제어 또한 필요하지 않다. 이로 인해 시스템은 더욱 `사용하기 쉽고(easy)`, `강력하며(powerful)`, `튼튼하며(robust)` `회복력을 갖추며(resilient)`, `확장가능(extensible)`해진다.

<br/>

## 2. Kubernetes Components

<br/>

<br/>

<br/>

---

### References

\[1\] Kubernetes. (2020). [Kubernetes Documentation - Overview][1] [Web Document]\_

[1]: https://kubernetes.io/docs/concepts/overview/

<br/>

---

### Hashtags

`#Kubernetes #devops #큐버네티스`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

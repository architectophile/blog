# Fundamental Design Issues for the Future Internet - Scott Shenker, Member, IEEE

<br/>

## 1. Motivations

The internet was originally designed to link together a small group of researchers. But now an abundant number of people are using the internet all over the globe. So the design choices we make for the internet will affect a huge amount of people who are using it. Therefore, the design decisions for the internet will play a very important role in determining the nature of our future telecommunications infrastructure.

<br/>

## 2. Overview

In this paper we address some of the fundamental architectural design issues facing the future Internet. In particular, we discuss whether the
Internet should adopt a new service model, how this service model should be invoked, and whether this service model should include admission control. The primary purpose of this paper is to provide a conceptual framework for evaluating the various design choices.

<br/>

## 3. Current Issues

### 3.1. No admission control

Since the current internet protocol offers a best-effort service, there is no admission control and the network offers no assurance about when, or even if, packets will be delivered. Current usage of the internet is dominated by traditional applications such as Telnet, FTP, HTTP, DNS, and SMTP. These applications are rather elastic in nature, they tolerate packet delays and packet losses gracefully. Therefore, they can decrease their transmission rate in the presence of congestion.

However, with the increase of usage of multimedia applications that process voice and video in addition to the traditional tasks, the internet must be prepared to cope with the traffic from these applications.

Since these "real-time" applications, are less elastic, they are less tolerant of delay variations than the traditional data applications.

There are two problems for the real-time applications with the current internet. The first is that they are not running adequately with the current internet because there are too many dropped packets. And the second is that they do not back off in the presence of congestion, other traditional data applications end up receiving very little bandwidth. 

There is a way that can address one of these problems without changing the basic Internet architecture by improving router implementations using the Fair Queueing packet scheduling algorithm in routers. However, it only solves the second problem, but not the first one.

And there is another way that can address the first problem by modifying application implementations rather than the network implementation. Using delay adaptive techniques, the real-time applications can be much more adaptive to variations in packet delays.

These methods has advantages in that no changes are required to any network interfaces. However, in this approach it is up to applications to adjust to the inevitable variations in packet delay and available bandwidth. Therefore, there are likely to be limitations to this adaptability. And since there is no admission control, the network must be provisioned so that the fair bandwidth shares are not unreasonably small.













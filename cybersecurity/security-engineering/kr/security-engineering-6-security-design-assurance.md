# Security Design Assurance
 
설계 오류의 중요성을 얘기할 때 `Needham-Schroeder public-key authentication protocol (1978)`을 많이 얘기한다. `Lowe`가 이 프로토콜에 설계에 오류가 있다는 것을 17년 뒤인 1995년에 발견하였다.

 `Key Reinstallation Attacks: Forcing Nonce Reuse WPA2` 논문도 `WPA2` 프로토콜의 설계 오류를 발견하였다.

 `By-design Backdooring of Encryption System-Can We Trust Foreign Encryption Algorithms` 논문은 설계도 상에 백도어를 넣을 수 있다는 것을 보여준다.

 `Edward Snowden`은 `NSA`에서 운영하는 `PRISM` 프로그램을 이용하여 민간인을 사찰할 수 있다는 것을 폭로한다.

## [Note] NSA's PRISM

<img src="../images/security-engineering-6-security-design-assurance-1.0.1.png?raw=true" alt="drawing" width="640"/>

<br/>

## [Note] NSA's BULLRUN

<img src="../images/security-engineering-6-security-design-assurance-1.0.2.png?raw=true" alt="drawing" width="640"/>

<br/>

## [Note] 타원곡선암호(Elliptic Curve Crypto)

<img src="../images/security-engineering-6-security-design-assurance-1.0.3.png?raw=true" alt="drawing" width="640"/>

<br/>

타원곡선암호는 키길이가 짧아서 처리 속도가 RSA보다 훨씬 빠르다.

<br/>

## [Note] DUAL_EC_DRBG - The Beginning

<img src="../images/security-engineering-6-security-design-assurance-1.0.4.png?raw=true" alt="drawing" width="640"/>

<br/>

`NSA`가 타원곡선 표준을 제정할 때 특정 타원곡선을 넣자고하여 표준으로 제정되었다. 2007년에 `Bruce Schneier`가 혹시 `NSA`가 백도어를 삽입하려는 것인가하는 의문을 제기하였다. 그리고 나중에 `Edward Snowden`이 폭로한 이후에 `Bullrun` 프로젝트가 알려졌고 실제로 알고리즘 상에 백도어를 넣은 것이 밝혀진다. 2015년에 `NSA`에서 알고리즘에 백도어를 넣은 사실을 인정하고 사과하였다.

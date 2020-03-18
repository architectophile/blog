# [리눅스] SFTP 툴로 안전하게 원격으로 파일 전송하는 법

<br/>

## 1. 설명

리눅스의 [SFTP(Secure File Transfer Protocol)][1] 커맨드 라인 툴을 사용하면 파일이나 디렉토리를 원격에 있는 다른 시스템으로 ***안전하게 전송할 수 있다***. SFTP 툴은 상대 원격 시스템과 [SSH(Secure Shell)][2] 프로토콜을 사용하여 연결을 맺기 때문에 네트워크를 통해 파일이 전송될 때 데이터가 ***암호화되어 전송되므로*** 보안적으로 안전하게 파일을 주고받을 수 있다.

예전에는 [SCP(Secure Copy)][3]라는 툴을 사용하였지만 2019년 4월 OpenSSH 개발자들은 SCP는 이제 낡았고, 유연하지 못하며, 그리고 문제점을 고치기 쉽지 않다고 하였다. 따라서 안전한 파일 전송을 위해 **`sftp`** 또는 **`rsync`**를 사용할 것을 권장하였다.

<br/>

## 2. 사용방법

### 1) 원격 시스템에 접속

SFTP 툴은 SCP와는 다르게 한 번의 명령으로 파일을 전송하는 것이 아니고 1단계 접속 과정을 거친 후에 ***인터랙티브 모드(interactive mode)***에서 2단계로 파일을 주고받는다. 다음과 같은 명령으로 원격 시스템에 접속할 수 있다.

```shell
$ sftp [options] [user@]host[:dir[/]]
```

<br/>

### 2) 인터랙티브 명령어 사용(get, put, rm, mkdir, ...)

SFTP 툴은 1단계 접속 과정을 완료하면 인터랙티브 모드(interactive mode)로 들어가고 ***인터랙티브 명령어(interactive commands)***를 사용하여 파일을 주고받거나 변경하는 작업 등을 할 수 있다.

```shell
sftp> command [options] [arguments]
```

<br/>

## 3. 사용예제

### 1) 원격 시스템에 접속하기

- 패스워드 인증 방식

원격 시스템에서 전통적인 접근제어 인증 방법으로 ***username, password 방식을 사용할 경우*** 다음과 같이 sftp 명령과 함께 사용자 이름과 호스트 및 접속할 디렉토리를 입력한 뒤, password 입력창이 나타나면 표준입력으로 비밀번호를 입력하면 접속이 완료된다. 이때 옵션 중의 하나로 포트번호를 지정할 수 있으면 디폴트 포트번호는 22이다.

```shell
$ sftp -P 22 adminuser@127.0.0.1:/home/adminuser/downloads
```

<br/>

- 키 인증 방식

만약 AWS EC2 서버와 같이 전통적인 username, password 방식이 아니라 ***키 파일을 사용하여 사용자를 인증하는 경우***에는 다음과 같이 옵션 `-i`(identity file)를 사용하여 키 파일을 통해 사용자를 인증할 수 있다.

```shell
$ sftp -i /home/.ssh/aws-ec2-server-key.pem -P 22 adminuser@56.172.42.22:/home/adminuser/downloads
```

<br/>

### 2) 원격 시스템으로 파일 전송하기

파일을 전송할 때는 인터랙티브 명령 중에서 `put` 명령을 사용하여 파일을 전송할 수 있다. 옵션으로 목적지 디렉토리를 지정할 수 있으며, 생략할 경우 처음 접속했던 디렉토리로 전송된다.

```shell
sftp> put /home/jason/docs/example.pdf /home/adminuser/downloads/docs
```

<br/>

### 3) 원격 시스템으로 디렉토리 전송하기

디렉토리를 전송할 때는 인터랙티브 명령 중에서 `put` 명령을 사용하여 디렉토리를 전송할 수 있다. 이때 옵션 `-r`(recursive)을 사용해야 하위 디렉토리 및 파일을 모두 전송할 수 있다. 파일 전송과 마찬가지로 옵션으로 목적지 디렉토리를 지정할 수 있으며, 생략할 경우 처음 접속했던 디렉토리로 전송된다.

```shell
sftp> put -r /home/jason/docs /home/adminuser/downloads
```

<br/>

### 4) 원격 시스템에서 파일 가져오기

파일을 가져올 때는 인터랙티브 명령 중에서 `get` 명령을 사용하여 파일을 전송할 수 있다. 옵션으로 파일을 가져올 로컬 시스템의 디렉토리를 지정할 수 있으며, 생략할 경우 현재 쉘이 접속되어 있는 디렉토리로 다운로드 된다.

```shell
sftp> get /home/adminuser/downloads/docs/remote-file.txt /home/jason/docs
```

<br/>

### 5) 원격 시스템에서 디렉토리 가져오기

파일을 가져올 때는 인터랙티브 명령 중에서 `get` 명령을 사용하여 파일을 전송할 수 있다. 이때 옵션 `-r`(recursive)을 사용해야 하위 디렉토리 및 파일을 모두 가져올 수 있다. 파일 가져오기와 마찬가지로 옵션으로 파일을 가져올 로컬 시스템의 디렉토리를 지정할 수 있으며, 생략할 경우 현재 쉘이 접속되어 있는 디렉토리로 다운로드 된다.

```shell
sftp> get -r /home/adminuser/downloads/docs /home/jason/downloads
```

<br/>

<br/>

---

### References

\[1\] *Wikipedia. (2020, Jan 25). [Secure file transfer program][1] [Wikipedia Page]*

[1]: https://en.wikipedia.org/wiki/Secure_file_transfer_program

\[2\] *Wikipedia. (2020, Feb 20). [Secure Shell][2] [Wikipedia Page]*

[2]: https://en.wikipedia.org/wiki/Secure_Shell

\[3\] *Wikipedia. (2020, Jan 25). [Secure Shell][3] [Wikipedia Page]*

[3]: https://en.wikipedia.org/wiki/Secure_copy

\[4\] *Oracle. (?). [Logging In to a Remote System to Copy a File (sftp)][4] [Web Document]*

[4]: https://docs.oracle.com/cd/E26502_01/html/E29001/remotehowtoaccess-14.html

<br/>

---

### Hashtags

`#sftp` `#Secure FTP` `#sftp 사용법` `#sftp 사용방법` `#sftp 설명` `#리눅스 sftp` `#scp` `#Secure Copy` `#rsync` `#linux ssh` `#ubuntu sftp` `#linux secure shell` `#how to use sftp` `#linux secure ftp`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.





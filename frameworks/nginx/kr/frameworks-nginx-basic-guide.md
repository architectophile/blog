# [Nginx] 초보자 가이드

<br/>

## 1. Nginx 기본 설명

nginx는 ***1개의 마스터 프로세스(master process)***와 ***여러개의 워커 프로세스들(worker processes)***을 가지고 있다.
마스터 프로세스의 주요 역할은 설정(configuration)을 읽고 평가하고, 워커 프로세스들을 관리하는 것이다.
반면 워커 프로세스들의 역할은 실질적인 요청들(requests)을 처리하는 것이다. nginx는 이벤트 기반 모델(event-based model) 사용하며, 운영체제 의존적인(OS-dependent) 메커니즘을 활용하여 워커 프로세스들 사이의 요청을 효율적으로 분배한다.
워커 프로세스의 개수는 컨피겨레이션 파일 안에 정의되어 있는데, 설정에 따라 절대적인 개수로 고정될 수도 있고 또는 가용한 CPU 코어의 개수에 따라 자동으로 조절될 수도 있다.

nginx와 그 모듈들이 동작하는 방식은 컨피겨레이션 파일 안에서 결정된다. 디폴트로는 그 컨피겨레이션 파일 이름은 `nginx.conf`로 되어 있으며, 그 파일이 위치하는 디렉토리는 `/usr/local/nginx/conf`, `/etc/nginx`, 또는 `/usr/local/etc/nginx`이다.

<br/>

## 2. Nginx 시작, 중지 그리고 리로딩 설정 방법

nginx를 시작하기 위해서는 우선 실행파일(executable file)을 실행한다. nginx가 시작되면 실행파일을 `-s` 파라미터와 함께 실행하여 컨트롤할 수 있다. 사용 문법은 다음과 같다.

`nginx -s [signal]`

`signal`의 종류는 다음과 같이 4가지가 있다.

- stop : 빠른 종료(fast shutdown)
- quit : 우아한 종료(graceful shutdown)
- reload : 컨피겨레이션 파일(configuration file) 다시 로딩하기
- reopen : 로그 파일 다시 열기
ㄴ
예를 들어, nginx를 종료할 때 워커 프로세스들이 현재 처리하고 있는 요청들을 모두 완료할 때까지 기다리고 싶을 때는 다음과 같은 명령을 사용한다.

```shell
foo@bar:~$ nginx -s quit
```

*위 명령은 nginx를 실행시킨 유저와 동일한 유저에 의해 실행되어야 한다. 만약 nginx를 실행한 유저가 root 유저일 경우 권한 획득을 위해 `sudo`와 같은 명령을 함께 사용해야 한다.*

컨피겨레이션 파일이 변경되었을 경우, nginx에 `reload` 명령을 보내거나 nginx를 재시작하기 전까지는 변경된 설정은 적용되지 않는다. 컨피겨레이션을 리로드하기 위해서는 다음과 같은 명령을 사용한다.

```shell
foo@bar:~$ nginx -s reload
```

마스터 프로세스가 `reload` 시그널을 전달받은 경우, 그것은 우선 새로운 컨피겨레이션 파일의 문법 유효성 검사를 마친 뒤, 새로운 설정을 적용한다. 만약 문법 검사에서 이상이 없을 경우, 마스터 프로세스는 새로운 워커 프로세스들을 실행시키고, 예전 워커 프로세스들에게는 메시지를 보내 종료 요청을 한다. 예전 워커 프로세스들은 종료 요청을 받으면 더 이상 새로운 요청은 거부하고 기존에 처리하던 요청들을 마무리한 뒤 종료한다.

하지만 만약 문법 검사에 이상이 있거나 오류가 발생했을 경우에는 마스터 프로세스는 변경 내용을 롤백(roll back)하고 이전 설정(configuration)으로 계속 작업한다.

signal은 `kill`과 같은 Unix 툴을 사용하여 nginx 프로세스에게 전달될 수 있다. 이 경우에는 signal은 `프로세스 ID`를 이용해 프로세스에게 직접 전달된다. 그 nginx 마스터 프로세스의 `프로세스 ID`는 기본적으로 `/usr/local/nginx/logs` 또는 `/var/run` 디렉토리에 있는 `nginx.pid` 파일에 쓰여있다. 만약 마스터 프로세스의 프로세스 ID가 1628일 경우, nginx에게 우아한 종료(graceful shutdown) 요청을 보내기 위해서는 다음과 같이 명령을 사용할 수 있다.

```shell
foo@bar:~$ kill -s QUIT 1628
```

실행 중인 모든 nginx 프로세스들의 목록을 얻기 위해서는 `ps` 유틸리티를 사용하여 다음과 같이 명령을 사용한다.

```shell
foo@bar:~$ ps -ax | grep nginx
```

<br/>

## 3. 컨피겨레이션 파일(configuration file) 구조

nginx는 여러 개의 모듈들로 구성되어 있는데, 그것들은 컨피겨레이션 파일 안의 `디렉티브(directives)`에 의해 제어된다. 디렉티브들은 `심플 디렉티브(simple directives)`와 `블록 디렉티브(block directives)`로 나뉜다. `심플 디렉티브`의 이름과 파라미터는 스페이스(spaces)에 의해 구분되고 `세미콜론(;)`으로 끝난다. `블록 디렉티브`는 심플 디렉티브와 기본적으로는 동일한 구조를 가지는데, 하지만 세미콜론 대신에 그것은 `중괄호(braces)`로 둘러싸인 추가적인 명령들의 집합이 뒤에 붙는다. 그리고 만약 블록 디렉티브가 중괄호 안에 다른 디렉티브를 가질 수 있으면 그것은 `컨텍스트(context)`라고 불린다(e.g. `events`, `http`, `server` 그리고 `location` 등).

컨피겨레이션 파일 안에서 다른 컨텍스트 밖에 있는 디렉티브들은 모두 `메인 컨텍스트(main context)` 안에 있는 것으로 본다.
`events`와 `http` 디렉티브는 `메인` 컨텍스트 안에 있는 것이고, `server` 디렉티브는 `http` 컨텍스트 안에, 그리고 `location` 디렉티브는 `server` 컨텍스트 안에 있는 것이다.

그리고 `#` 기호 이후에 오는 모든 줄은 주석으로 간주된다.

<br/>

## 4. 정적 컨텐트(static content) 서빙

웹 서버의 중요한 업무는 파일들(e.g. images 또는 정적 HTML pages 등)을 서빙하는 것이다. 이제 우리는 서버에 들어오는 요청에 따라서 서로 다른 로컬 디렉토리들(`/data/www`(HTML 파일 디렉토리) 그리고 `/data/images`(이미지 파일 디렉토리))에 있는 파일들이 서빙되는 예제를 구현할 것이다. 이를 위해서 컨피겨레이션 파일을 수정해야 하는데, `http` 블록 안에 `server` 블록을 설정하고, 그 `server` 블록 안에는 두 개의 `location` 블록들을 설정할 것이다.









<br/>

---

### References

\[1\] *Nginx. (?). [Beginner’s Guide](http://nginx.org/en/docs/beginners_guide.html) [Web Document]*

\[2\] *Linode. (2019, Apr 5). [How to Configure NGINX](https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx) [Web Document]*


<br/>

---

### Hashtags

`#Nginx` `#Nginx Guide` `#Nginx Manual` `#엔진엑스` `#엔진엑스 가이드` `#엔진엑스 매뉴얼`


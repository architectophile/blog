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

우선, `/data/www` 디렉토리를 생성하고 그 안에 `index.html` 파일을 만들고 아무런 텍스트 내요을 작성한다. 그리고 `/data/images/` 디렉토리를 만들고 그 안에 몇 장의 이미지 파일들을 넣는다.

그 다음 컨피겨레이션 파일을 연다. 디폴트 컨피겨레이션 파일 안에는 이미 몇 개의 `server` 블록에 대한 예제들이 포함되어 있는데, 대부분은 주석으로 처리되어있다. 이제 다른 모든 블록들을 주석으로 처리하고 새로운 `server` 블록을 다음과 같이 작성한다.

```nginx
http {
    server {
    }
}
```

일반적으로 컨피겨레이션 파일 안에는 여러개의 `server` 블록들을 포함할 수 있는데, 그것들은 사용하는 `포트번호` 또는 `서버이름`에 따라 나뉘어져있다. 어떤 요청이 들어오면 nginx는 우선 어떤 `server` 블록이 해당 요청을 처리할지 결정하고, 그 다음은 요청 헤더(header)에 있는 `URI`를 server 블록 안의 `location` 디렉티브들의 `파라미터(parameters)`와 대조하여 검사한다.

이제 `server` 블록 안에 다음의 `location` 블록을 추가한다.

```nginx
location / {
    root /data/www;
}
```

위의 `location` 블록은 요청에서 URI와 비교하여 "/" 프리픽스(prefix)를 나타낸다. 매칭되는 요청에 대해서 `root` 디렉티브에 설정된 경로(path)에 해당 URI가 붙여진다. 즉, `/data/www`에 붙여져서 로컬 파일 시스템에 있는 요청된 파일에 대한 경로를 형성한다.
만약 `location` 블록들 중에 매칭되는 것이 여러개 있다면, nginx는 그 중 가장 긴 프리픽스(prefix)를 가진 것을 선택한다. 위의 `location` 블록은 길이 1의 가장 짧은 프리픽스를 제공한다. 따라서 다른 모든 `location` 블록들이 매칭에 실패할 경우 이 블록이 사용될 것이다.

이제 아래의 두 번째 `location` 블록을 추가한다.

```nginx
location /images/ {
    root /data;
}
```

위의 location 블록은 `/images/`로 시작하는 요청에 대해 매치가될 것이다(`location /` 블록에도 역시 매치될 것이지만 이것은 가장 짧은 길이의 프리픽스이다.)

현재까지 작성된 `server` 블록의 모습은 아래와 같다.

```nginx
server {
    location / {
        root /data/www;
    }

    location /images/ {
        root /data;
    }
}
```

이것은 이미 포트 80에서 듣고 있는 서버로 동작하는 컨피겨레이션이며, 그것은 로컬 머신에서 `http://localhost/`로 접속이 가능하다.
그리고 `/images/`로 시작하는 URI를 가진 요청에 대해서는 서버는 `/data/images` 디렉토리에서 파일을 전송할 것이다.
예를 들어, `http://localhost/images/example.png` 요청에 대한 응답으로 nginx는 `/data/images/example.png` 파일을 전송할 것이다. 만약 그 파일이 존재하지 않을 경우 nginx는 `404 오류(Not Found)`를 전송할 것이다.
그리고 `/images/`로 시작하지 않는 URI를 가진 요청은 `/data/www` 디렉토리로 맵핑될 것이다. 예를 들어, `http://localhost/some/example.html` 요청에 대한 응답으로 nginx는 `/data/www/some/example.html` 파일을 전송할 것이다.

새로운 컨피겨레이션을 적용하기 위해서, 아직 nginx를 실행하지 않았으면 nginx를 시작시키고, 이미 샐행 중인 경우 다음과 같이 `reload` 시그널을 마스터 프로세스에 전송한다. 

```shell
foo@bar:~$ nginx -s reload
```

> ***Note:***  
만약 어떤 것이 예상한대로 동작하지 않을 경우, `/usr/local/nginx/logs` 또는 `/var/log/nginx` 디렉토리 안에 있는 `access.log` 또는 `error.log` 파일을 확인해 볼 수 있다.

<br/>

## 5. 간단한 프록시 서버(proxy server) 세팅

nginx의 가장 흔한 사용 중 하나는 그것을 프록시 서버로 사용하는 것이다. 따라서 프로시 서버는 요청을 받으면 프록시된 다른 서버에게 요청을 전달하고, 그들에게 받은 응답을 결과적으로 클라이언트에게 전송한다.

우리는 기본적인 프록시 서버를 하나 설정할 것인데, 그것은 로컬 디렉토리에 있는 이미지 파일에 대한 요청을 처리하고, 나머지 모든 요청들은 프록시된 서버에게 전달한다. 이 예제에서, 두 서버 모두 하나의 nginx 인스턴스에서 정의된다.

우선, 프록시된 서버를 하나 정의할 것인데, 다음과 같이 컨피겨레이션 파일에 하나의 `server` 블록을 추가한다.

```nginx
server {
    listen 8080;
    root /data/up1;

    location / {
    }
}
```

이것은 포트 8080을 듣고 있는 간단한 서버가 될 것인데(이전에는 `listen` 디렉티브를 생략했었는데, 왜냐하면 표준 포트인 80번이 사용되었기 때문이다.) 이 서버는 모든 요청을 로컬 파일 시스템의 `/data/up1` 디렉토리로 맵핑할 것이다. 따라서 `/data/up1` 디렉토리를 생성하고 이 안에 새로운 `index.html` 파일을 만들어 넣도록한다. 이 때 잘 보아야할 것은 `root` 디렉티브가 `server` 컨텍스트 안에 위치한다는 점이다. 그러한 `root` 디렉티브는 어떤 요청에 대해 선택된 `location` 블록이 자체적인 `root` 디렉티브를 갖고 있지 않을 때 사용된다.

다음으로, 이전에 작성했던 `server` 컨피겨레이션을 수정하여 프록시 컨피겨레이션으로 만들어보자. 첫 번째 `location` 블록에는 **`proxy_pass`** 디렉티브와 함께 프록시된 서버의 프로토콜, 이름, 포트 번호를 파라미터에 명시된대로 넣어준다(이 경우에는 `http://localhost:8080`가 된다.)

```nginx
server {
    location / {
        proxy_pass http://localhost:8080;
    }

    location /images/ {
        root /data;
    }
}
```

그리고 두 번째 `location` 블록을 수정하여 특정 파일 확장자를 가진 이미지 요청에 대해 매치되도록 만든다. 변경된 `location` 블록은 다음과 같다.

```nginx
location ~ \.(gif|jpg|png)$ {
    root /data/images;
}
```

위의 파라미터는 `레귤러 익스프레션(regular expression)`이며 이것은 `.gif`, `.jpg`, 또는 `.png`로 끝나는 모든 URI와 매치된다. ***레귤러 익스프레션은 반드시 `~` 심볼을 앞에 붙여야한다.*** 이에 해당하는 요청들은 모두 `/data/images` 디렉토리로 맵핑될 것이다.

nginx가 요청을 처리하기 위해 어떤 `location` 블록을 선택할 때는, 우선 각 `location` 디렉티브의 프리픽스(prefix)를 검사하고 매치되는 가장 긴 프리픽스를 가진 하나의 `location` 블록을 기억해둔다. 그 다음으로 레귤러 익스프레션을 검사한다. 만약 매치되는 레귤러 익스프레션이 있을 경우 그 `location`을 선택하게 되고, 매치되는 레귤러 익스프레션이 없을 경우에는 이전에 기억해두었던 `location` 블록을 선택한다.

지금까지 완성된 프록시 서버의 컨피겨레이션은 다음과 같다.

```nginx
server {
    location / {
        proxy_pass http://localhost:8080/;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```

이 서버는 .gif, .jpg, 또는 .png로 끝나는 모든 요청을 필터링하여 `/data/images` 디렉토리로 맵핑할 것이다(해당 `root` 디렉티브의 파라미터에 요청의 URI를 덧붙인다.) 그리고 다른 모든 요청들은 위에 설정한 프록시된 서버로 전달될 것이다.

새로운 컨피겨레이션을 적용하기 위해서 이전처럼 `reload` 시그널을 마스터 프로세스에 전송한다.

```shell
foo@bar:~$ nginx -s reload
```

> ***Note:***  
프록시 커넥션을 설정하기 위한 많은 다양한 [디렉티브(directives)][2]가 존재한다.

<br/>

## 6. FastCGI 프록시 세팅

nginx는 요청들을 다양한 프레임워크와 PHP와 같은 프로그래밍 언어로 빌드된 어플리케이션을 실행하는 `FastCGI` 서버들로 라우트(route)하기 위해 사용될 수 있다.

`FastCGI` 서버와 함께 동작하기 위한 가장 기본적인 nginx 컨피겨레이션은 `proxy_pass` 대신에 **`fastcgi_pass`** 디렉티브를 사용하는 것이다. 그리고 `FastCGI` 서버에 전달되는 파라미터(parameters)를 설정하기 위해서 `fastcgi_param` 디렉티브를 사용한다.
FastCGI 서버가 `localhost:9000`에서 접속가능하다고 가정해보자. 이전의 프록시 설정을 기본으로 해서 `proxy_pass` 디렉티브를 `fastcgi_pass` 디렉티브로 교체하고 파라미터를 `localhost:9000`로 설정한다. PHP에서는 `SCRIPT_FILENAME` 파라미터는 스크립트 이름을 결정하기 위해 사용되며, `QUERY_PARAMETER`는 요청 파라미터를 전달하기 위해 사용된다. 완성된 컨피겨레이션은 다음과 같다.

```nginx
server {
    location / {
        fastcgi_pass  localhost:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param QUERY_STRING    $query_string;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```

위의 서버는 정적 이미지에 대한 요청을 제외한 모든 요청들을 `localhost:9000`에서 동작 중인 프록시된 서버에게 `FastCGI 프로토콜`을 사용해 `라우트(route)`할 것이다.

<br/>

<br/>

---

### References

\[1\] *Nginx. (?). [Beginner’s Guide](http://nginx.org/en/docs/beginners_guide.html) [Web Document]*

\[2\] *Nginx. (?). [Module ngx_http_proxy_module][2] [Web Document]*

[2]: http://nginx.org/en/docs/http/ngx_http_proxy_module.html

<br/>

---

### Hashtags

`#Nginx` `#Nginx Guide` `#Nginx Manual` `#엔진엑스` `#엔진엑스 가이드` `#엔진엑스 매뉴얼`


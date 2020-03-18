# [Nginx] 기본 설정 방법

<br/>

Nginx는 가벼운 고성능의 웹서버로서 높은 트래픽 처리를 위해 디자인되었다.

Nginx의 가장 강력한 기능 중 하나는 HTML이나 미디어 파일 같은 정적 컨텐츠를 효율적으로 서브하는 것이다. Nginx는 비동기적 이벤트 드리븐 모델(asynchronous event-driven model)을 사용하는데, 이것은 부하(load)에 대해 예측가능한 성능을 제공한다.

Nginx는 동적 컨텐트에 대해서는 CGI, FastCGI, 또는 아파치(Apache)와 같은 다른 서버에게 처리를 맡긴다. 이러한 동적 컨텐츠는 다시 Nginx에게 전달되어 결과적으로 클라이언트에게 전달된다. 이 글은 당신이 Nginx의 파라미터와 컨벤션에 익숙하게 만들어줄 것이다.

<br/>

## 1. 디렉티브(Directives), 블록(Blocks), 그리고 컨텍스트(Contexts)

모든 nginx 컨피겨레이션 파일들은 `/etc/nginx` 디렉토리 안에 위치한다. 가장 주요한 컨피겨레이션 파일은 `/etc/nginx/nginx.conf` 파일이다.

nginx에서 켠피겨레이션 옵션은 `디렉티브(directives)`라고 불린다. 디렉티브는 `블록(blocks)` 또는 `컨텍스트(contexts)`라고 알려진 그룹으로 구성된다. 이 `블록`과 `컨텍스트`는 nginx에서 동일한 의미로 사용된다.

`#` 문자로 시작하는 줄은 주석으로서 nginx에 의해 해석되지 않는다. 디렉티브를 나타낼 때는 반드시 `세미콜론(;)`으로 끝나거나, 또는 `중괄호 블록({})`로 끝나야 한다.

아래에 보이는 것은 nginx 리포지토리에서 설치했을 때 디폴트로 포함되는 `/etc/nginx/nginx.conf` 파일의 압축된 형태이다.
이 컨피겨레이션 파일은 4개의 디렉티브(directives)로 시작한다: `user`, `worker_processes`, `error_log`, 그리고 `pid`이다. 이 디렉티브들은 어떠한 특정한 `블록`이나 `컨텍스트` 안에 포함되지 않는다. 따라서 그들은 `메인 컨텍스트(main context)` 안에 있다고 불린다. 그리고 `events`와 `http` 블록은 추가적인 디렉티브를 위한 공간이며, 그들 또한 `메인 컨텍스트` 안에 존재한다.

```nginx
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
       . . .
}

http {
       . . .
}
```

<br/>

## 2. http 블록

`http` 블록은 웹 트래픽을 처리하는 디렉티브들을 담고있다. 이 디렉티브들은 종종 *Universal*으로 불리는데, 왜냐하면 그것들은 nginx가 서브하는 모든 웹사이트 컨피겨레이션에 전달되기 때문이다. `http` 블록에서 사용되는 모든 디렉티브들의 목록은 [Nginx 문서][2]에서 찾아볼 수 있다.

```nginx
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

<br/>

## 3. server 블록

- 위의 `http` 블록 안에 있는 `include` 디렉티브는 nginx에게 웹사이트 컨피겨레이션 파일이 어디에 위치해 있는지를 알려준다. 만약 nginx 리포지토리에서 설치했다면 위에서와 같이 `http` 블록 안에 `include /etc/nginx/conf.d/*.conf;` 디렉티브가 포함되어 있을 것이다. 호스팅하는 각 웹사이트는 반드시 `/etc/nginx/conf.d/` 디렉토리 안에 `example.com.conf` 형태로 만들어진 각자 자신만의 컨피겨레이션 파일을 갖고 있어야 한다. 그리고 사이트 중에서 비활성화된(disabled) 것들은 반드시 `example.com.conf.disabled` 형태로 파일 이름을 설정해야 한다.

- 만약 nginx를 Debian 또는 Ubuntu 리포지토리에서 설치했다면, `http` 블록 안에는 `include /etc/nginx/sites-enabled/*;` 디렉티브가 포함되어 있을 것이다. 그 `.../sites-enabled/` 디렉토리는 `/etc/nginx/sites-available/` 디렉토리 안의 컨피겨레이션 파일들을 가리키는 `심링크들(symlinks)`을 담고 있다.

- 당신의 nginx 설치 소스에 따라 샘플 컨피겨레이션 파일은 `/etc/nginx/conf.d/default.conf` 또는 `etc/nginx/sites-enabled/default`에 위치할 것이다.

그리고 설치 소스와는 상관없이 서버 컨피겨레이션 파일은 다음과 같은 어떤 하나의 기본 `server` 블록을 갖고 있을 것이다.

```nginx
server {
    listen         80 default_server;
    listen         [::]:80 default_server;
    server_name    example.com www.example.com;
    root           /var/www/example.com;
    index          index.html;
    try_files $uri /index.html;
}
```

<br/>

## 4. 리스닝 포트(Listening Ports)

`listen` 디렉티브는 nginx에게 HTTP 연결을 위해 필요한 `hostname/IP`와 `TCP 포트(port)`를 알려준다. `default_server` 인자가 의미하는 것은 이 가상의 호스트가 다른 가상의 호스트들의 `listen statement`와 매치되지 않는 모든 요청에 응답한다는 것이다. 그리고 두 번째 줄의 `listen` 디렉티브는 IPv6 형식의 요청을 처리한다는 것이고 `default_server`가 의미하는 것은 앞서 설명한 것과 동일하다.

<br/>

## 5. 이름 기반의 가상 호스팅(Name-Based Virtual Hosting)

`server_name` 디렉티브는 하나의 IP 주소에 대해 여러개의 도메인(domains)을 사용할 수 있게 한다. 서버는 전달받은 요청 헤더(request header)에 기반하여 어떤 도메인을 서브할지 결정한다.

일반적으로 호스트하고자 하는 하나의 도메인 또는 하나의 사이트당 하나의 파일을 생성한다. 다음의 예제들이 있다.

1. `example.com`과 `www.example.com` 두 개 모두의 도메인에 대한 요청을 처리하는 경우에는 다음과 같이 설정한다.

```nginx
# /etc/nginx/conf.d/example.com.conf

server {
    server_name   example.com www.example.com;
      . . .
}
```

2. `server_name` 디렉티브는 또한 `와일드카드(*)`를 사용할 수 있다. `*.example.com`과 `.example.com`는 둘 다 `example.com`의 모든 **서브도메인들(subdomains)**에 대한 요청을 처리하도록 한다.

```nginx
# /etc/nginx/conf.d/example.com.conf

server {    
    server_name   *.example.com;  # 또는 .example.com;
        . . .
}
```

3.  `example.`으로 시작하는 모든 도메인에 대한 요청을 처리하는 경우 다음과 같이 설정한다.

```nginx
# /etc/nginx/conf.d/example.com.conf

server {    
    server_name   example.*;
        . . .
}
```

nginx는 유효하지 않은 도메인 네임을 `server_name`에 사용할 수 있도록 한다. nginx는 요청의 HTTP 헤더에 있는 이름을 사용하여 요청에 응답하며, 해당 도메인 네임이 유효한지 아닌지는 상관없다.

도메인 네임이 아닌 호스트네임(non-domain hostname)을 사용하는 것은 서버가 LAN에 있거나 또는 이미 서버에 요청을 보낼 클라이언트들을 알고 있는 경우 유용하다. 예를 들면 이것은 nginx가 듣고있는 IP 주소들로 설정된 `/etc/hosts` 엔트리를 사용하는 전면 프록시 서버(front-end proxy servers)를 사용할 때 유용하다.

<br/>

## 5. location 블록

`location` 디렉티브는 서버 안의 리소스에 대한 요청을 어떻게 응답해야 할지를 설정한다. `server_name` 디렉티브가 nginx에게 해당 도메인에 대한 요청을 어떻게 처리해야 하는지 설정하는 것처럼, `location` 디렉티브는 특정 파일과 특정 디렉토리에 대한 요청을 처리한다. 예를 들면, `http://example.com/blog/`와 같은 요청에 대한 처리를 설정한다. 다음과 같은 예가 있다.

```nginx
# /etc/nginx/sites-available/example.com

server {
    location / {
        . . .
    }

    location /images/ { 
        . . .
    }
    
    location /blog/ { 
        . . .
    }
    
    location /planet/ { 
        . . .
    }
    
    location /planet/blog/ { 
        . . .
    }
}
```

위의 `location` 디렉티브들은 `리터럴 스트링(literal string)`에 대한 매치이며, 호스트 세그멘트(host segment) 이후에 오는 HTTP 요청에서 어떠한 부분이라도 매치된다. 위와 같은 `location` 디렉티브 설정에서 다음과 같은 몇 가지 요청들에 대한 예를 살펴보자.

<br/>

**요청(Request):** `http://example.com/`

**응답(Response):** `example.com`을 위한 `server_name` 엔트리가 존재한다는 가정하에, 위의 `location /` 디렉티브가 요청에 대해 어떻게 응답할지를 결정할 것이다.

> ***Note:***  
nginx는 항상 ***가장 구체적인 매치(the most specific match)***에 대해 요청을 처리할 것이다.

<br/>

**요청(Request):** `http://example.com/planet/blog/` 또는 `http://example.com/planet/blog/about/`

**응답(Response):** 이것은 `location /planet/blog/` 디렉티브가 요청에 대해 어떻게 응답할지를 결정할 것이다. 비록 `location /planet/` 디렉티브도 매치되긴 하지만 ***가장 구체적인 매치가 요청을 처리한다***.

<br/>

```nginx
# /etc/nginx/sites-available/example.com

server {
    location ~ IndexPage\.php$ {
        . . .
    }

    location ~ ^/BlogPlanet(/|/index\.php)$ { 
        . . .
    }
}
```

만약 `location` 디렉티브 뒤에 **`틸드(~)`** 문자가 올 경우, nginx는 `레귤러 익스프레션(regular expression)` 매치를 수행한다. 위의 매치 예제들은 대소문자를 구분(case-sensitive)하기 때문에 위의 예제에서 첫 번째 location 디렉티브에 대해 `IndexPage.php`는 매치가되지만 `indexpage.php`는 매치되지 않는다.

위의 예제에서 두 번째 location 디렉티브에 대해 `/BlogPlanet/`과 `/BlogPlanet/index.php`는 매치되지만, `/BlogPlanet`, `/blogplanet/`, 또는 `/blogplanet/index.php`는 매치되지 않는다.

> ***Note:***  
nginx는 [Perl Compatible Regular Expressions(PCRE)][3]을 사용한다.

<br/>

```nginx
# /etc/nginx/sites-available/example.com

server {
    location ~* \.(pl|cgi|perl|prl)$ {
        . . .
    }

    location ~* \.(md|mdwn|txt|mkdn)$ { 
        . . .
    }
}
```

만약 레귤러 익스프레션을 대소문자 구분없이(case-insensitive) 매치되도록 하고 싶다면 `a tiled and asterisk(~*)`를 사용하도록 한다. 위의 예제에서는 특정 파일 확장자로 끝나는 요청들을 어떻게 처리할지를 나타낸다. 첫 번째 location 디렉티브는 `.pl`, `.PL`, `.cgi`, `.CGI`, `.perl`, `.Perl`, `.prl`, 그리고 `.PrL`로 끝나는 어떠한 요청에 대해서도 매치될 것이다.

<br/>

```nginx
# /etc/nginx/sites-available/example.com

server {
    location ^~ /images/IndexPage/ {
        . . .
    }

    location ^~ /blog/BlogPlanet/ {
        . . .
    }
}
```

만약 location 디렉티브 뒤에 `a caret and tilde(^~)`를 붙인다면, nginx는 특정 스트링과 매치가 있으면 더 이상 다른 매치를 찾기위해 진행하지 않고 바로 그 매치되는 디렉티브를 사용한다. 다른 곳에 더욱 구체적으로 매치되는 디렉티브가 있더라도, 해당 요청이 이러한 디렉티브 중에 하나에 매치된다면 곧바로 그 디렉티브가 사용된다.

<br/>

```nginx
# /etc/nginx/sites-available/example.com

server {
    location = / {
        . . .
    }
}
```

마지막으로 location 디렉티브 뒤에 `an equals sign(=)`를 붙인다면, 요청된 경로(path)에 대해서 ***정확히 일치하는 매치***를 찾으면 다른 location 디렉티브에 대한 서치를 마치고 그 정확히 일치하는 디렉티브를 사용한다. 따라서 위의 예제에서는 `http://example.com/`는 정확히 일치하므로 매치되지만 `http://example.com/index.html`는 매치되지 않는다. 정확한 매치를 사용하는 것은 요청 처리 시간을 줄이는데 도움이 되는데, 특정 경로의 요청이 자주 발생한다면 매우 유용할 수 있다.

<br/>

**최종 정리된 디렉티브 매칭 처리 순서는 다음과 같다.**

1. 정확한 스트링 매치(exact string matches)를 먼저 찾는다. 만야 매치가 발견될 경우 nginx는 더 이상 서치를 멈추고 해당 디렉티브를 사용하여 요청을 처리한다.

2. 그 다음 나머지 리터럴 스트링 매치(literal string matches)를 찾는다. nginx는 만약 `^~`를 가진 매치를 발견했을 경우 서치를 중단하고 해당 디렉티를 사용하여 요청을 처리한다. 만약 `^~` 매치가 없을 경우 다음의 리터럴 스트링 매치를 계속 찾으며 가장 구체적인 매치를 저장해놓는다.

3. 그 다음 레귤러 익스프레션(`~` 또는 `~*`)을 가진 매치를 찾는다. 만약 요청과 매치되는 레귤러 익스프레션을 찾을 경우 서치를 중단하고 해당 디렉티브를 사용하여 요청을 처리한다.

4. 만약 레귤러 익스프레션과 매치되는 디렉티브를 발견하지 못한다면, 현재 저장되어 있는 가장 구체적으로 매치되는 리터럴 스트링 매치(literal string match)가 사용된다.

> ***Note:***  
Nginx에서 `location` 디렉티브 안에 `네스티드 블록(nested blocks)`은 지원하지 않는다.

<br/>

## 6. location 블록의 root와 index

`location` 디렉티브는 자체적인 인자값(arguments)을 갖고 있는 블록이다.

nginx가 어떤 `location` 디렉티브가 요청에 대해 가장 적절한 매치인지 결정하면, 이 요청에 대한 응답은 해당 `location` 디렉티브 블록 안에 있는 관련된 컨텐츠에 의해 결정된다. 다음과 같은 예제를 살펴보자.

```nginx
# /etc/nginx/sites-available/example.com

server {
    location / {
        root html;
        index index.html index.htm;
    }
}
```

이 예제에서 해당 location의 문서의 root는 `html/` 디렉토리에 있다. nginx의 디폴트 프리픽스에 의해서 전체 경로는 `/etc/nginx/html/`이다.

<br/>

**요청(Request):** `http://example.com/blog/includes/style.css`

**응답(Response):** nginx는 `/etc/nginx/html/blog/includes/style.css`에 위치한 파일을 서브할 것이다.

> ***Note:***  
`root` 디렉티브에는 ***절대경로(absolute paths) 또한 사용할 수 있다.***

`index` 디렉티브는 아무런 파일명이 명시되어 있지 않을 때 어떤 것을 서브해야 하는지를 알려준다. 다음 예를 보자.

<br/>

**요청(Request):** `http://example.com`

**응답(Response):** nginx는 `/etc/nginx/html/index.html`에 있는 파일을 서브할 것이다.

만약 `index` 디렉티브에 여러개의 파일이 명시되어 있다면, nginx는 파라미터들이 쓰여진 순서대로 처리하며, 그 중에서 파일이 존재하면 응답할 것이다. 즉 위의 예제에서는 `index.html` 파일을 먼저 찾아보고 없을 경우에는 다음으로 `index.htm` 파일을 찾아보고 이것도 없을 경우 `404 오류(Not Found)`를 응답한다.

다음은 도메인 `example.com`에 대응하는 서버의 조금 더 복잡한 형태의 `location` 디렉티브들을 보여주고 있다.

```nginx
# /etc/nginx/sites-available/example.com

server {
    location / {
        root   /srv/www/example.com/public_html;
        index  index.html index.htm;
    }

    location ~ \.pl$ {
        gzip off;
        include /etc/nginx/fastcgi_params;
        fastcgi_pass unix:/var/run/fcgiwrap.socket;
        fastcgi_index index.pl;
        fastcgi_param SCRIPT_FILENAME /srv/www/example.com/public_html$fastcgi_script_name;
    }
}
```

위의 예제에서, 확장자가 `.pl`로 끝나는 모든 요처들은 두 번재 `location` 블록에 의해 처리되며, 그것은 `fastcgi` 핸들러를 명시하여 요청들을 처리한다. 그 외 나머지 요청에 대해서는 nginx는 첫 번째 `location` 디렉티브를 사용한다.  
리소스들은 파일 시스템의 `/srv/www/example.com/public_html/` 디렉토리에 위치한다. 만약 요청에서 파일 이름이 명시되지 않을 경우에는 nginx는 `index.html` 또는 `index.htm` 파일을 제공할 것이다. 만약 두 개의 파일 모두 존재하지 않을 경우 서버는 `404 오류(Not Found)`를 응답한다.

몇 가지 요청들에 대해서 위의 예제 서버가 어떻게 응답하는지 살펴보자.

<br/>

**요청(Request):** `http://example.com/`

**응답(Response):** 우선 `/srv/www/example.com/public_html/index.html` 파일을 찾아보고 만약 존재하지 않으면 `/srv/www/example.com/public_html/index.htm` 파일을 찾아볼 것이다. 만약 둘 다 존재하지 않으면 서버는 `404 오류(Not Found)`를 응답한다.

<br/>

**요청(Request):** `http://example.com/blog/`

**응답(Response):** 우선 `/srv/www/example.com/public_html/blog/index.html` 파일을 찾아보고 만약 존재하지 않으면 `/srv/www/example.com/public_html/blog/index.htm`파일을 찾아볼 것이다. 만약 둘 다 존재하지 않으면 서버는 `404 오류(Not Found)`를 응답한다.

<br/>

**요청(Request):** `http://example.com/tasks.pl`

**응답(Response):** nginx는 `FastCGI` 핸들러를 사용하여 `/srv/www/example.com/public_html/tasks.pl`에 존재하는 파일을 실행하고 결과를 응답한다.

<br/>

**요청(Request):** `http://example.com/username/roster.pl`

**응답(Response):** nginx는 `FastCGI` 핸들러를 사용하여 `/srv/www/example.com/public_html/username/roster.pl`에 존재하는 파일을 실행하고 결과를 응답한다.

<br/>

---

### References

\[1\] *Linode. (2019, Apr 5). [How to Configure NGINX](https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx) [Web Document]*

\[2\] *Nginx. (?). [Module ngx_http_core_module][2] [Web Document]*

[2]: https://nginx.org/en/docs/http/ngx_http_core_module.html

\[3\] *Perl. (?). [Perl Compatible Regular Expressions(PCRE)][3] [Web Document]*

[3]: https://perldoc.perl.org/perlre.html



<br/>

---

### Hashtags

`#Nginx` `#Nginx Guide` `#Nginx Manual` `#nginx.conf` `#Nginx Config` `#Nginx Configuration` `#Nginx Directives` `#Nginx Blocks` `Nginx Contexts` `#nginx http` `#nginx server` `#nginx location` `#nginx proxy server` `#nginx request` `#nginx response` `#sites-available` `#sites-enabled` `#엔진엑스` `#엔진엑스 가이드` `#엔진엑스 매뉴얼` `#엔진엑스 설정` `#엔진엑스 컨피겨레이션`


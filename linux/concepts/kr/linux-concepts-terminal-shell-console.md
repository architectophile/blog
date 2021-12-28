# [Linux] 터미널, 콘솔, 그리고 쉘의 차이점

<br/>

## 터미널(Terminal)

`터미널(Terminal)`은 원래 초창기에 컴퓨터에 연결되어 사용자의 입력을 전달하고 사용자에게 출력을 보여주는 하드웨어 장치였다. 유닉스 시스템에서 이것은 `teletypewriter`라고 불리었기 때문에 짧게 줄여서 `tty`라고 불렸다. `터미널(terminal)`은 전기적인 관점에서 생긴 용어이다. 유닉스 시스템에서 `tty`는 특별한 죵류의 `장치 파일(device file)`인데, 읽기와 쓰기 외에도 다양한 명령들을 구현한다. 그리고 일반적으로 이제는 `terminal`은 `tty`와 동일한 의미로 사용되고 있다. 그리고 `pseudo-ttys`는 `Xterm`, `Screen`, `Expect`와 같은 `terminal emulators`에 의해 제공된다.

<br/>

## 콘솔(Console)

`콘솔(Console)`은 컴퓨터와 물리적으로 연결된 터미널을 말한다. 운영체제의 입장에서 콘솔은 커널에 의해 구현된 어떤 `tty(text input/output environment)`로 보여진다.

<br/>

## 쉘(Shell)

`쉘(Shell)`은 사용자가 로그인할 때 볼 수 있는 인터페이스이며, 쉘은 다른 프로그램을 실행하기 위해 주로 사용한다. 유닉스 시스템에서 쉘은 `command-line shell`을 의미한다. 여러 종류의 쉘들이 있는데, 대부분의 리눅스 시스템에서 디폴트로 사용하는 `Bash`가 있으며, `zsh`, `fish` 등이 있다. `Command-line shell`은 여러가지 명령을 결합할 수 있는 흐름제어 기능을 포함하고 있다. 또한 사용자들은 스크립트(scripts)를 작성하여 쉘에서 실행시킬 수 있는데, 대부분의 쉘들은 `Bourne_shell`[[2]] 을 기반으로 만들어졌다. 쉘 프로그래밍(`shell programming`)을 얘기할 때는 대부분 쉘이 `Bourne-style shell`이라는 것을 의미한다. 그리고 대부분 유닉스 또는 리눅스 시스템에서 `Bourne-style shell`은 `/bin/sh`에 설치되어 있다.

<br/>

<br/>

---

### References

\[1\] *StackExchange Question. (2011). [What is the exact difference between a 'terminal', a 'shell', a 'tty' and a 'console'?][1] [StackExchange Question]*

[1]: https://unix.stackexchange.com/questions/4126/what-is-the-exact-difference-between-a-terminal-a-shell-a-tty-and-a-con

\[2\] *Wikipedia. (?). [Bourne shell][2] [Web Document]*

[2]: https://en.wikipedia.org/wiki/Bourne_shell

\[3\] *askubuntu Question. (2017). [Why is a virtual terminal “virtual”, and what/why/where is the “real” terminal?][2] [Web Document]*

[3]: https://askubuntu.com/questions/14284/why-is-a-virtual-terminal-virtual-and-what-why-where-is-the-real-terminal



<br/>

---

### Hashtags

`#Linux` `#Unix` `#command` `#terminal` `#tty` `#shell` `#console`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

# [리눅스] 명령 실행 원리 2 : 파이프(Pipe)

<br/>

## 1. 파일 디스크립터(File Descriptors)

유닉스(Unix)에서는 기본적으로 입력(input)을 터미널 키보드와 연결시키고 출력(output)을 터미널 디스플레이와 연결시킨다. 유닉스는 키보드와 모니터를 포함하여 컴퓨터의 모든 것을 ***파일***로 모델링하는 것으로 유명하다. 따라서 디스플레이에 데이터를 쓰는 것은 스크린 위에 데이터 디스플레이를 담당하는 어떤 ***파일에 데이터를 쓰는 것***이다. 비슷하게 키보드에서 데이터를 읽어오는 것은 키보드를 나타내는 어떤 ***파일에서 데이터를 읽어오는 것***이다.

데이터는 바이트를 한 곳에서 다른 곳으로 전송하는 ***스트림(streams)***을 통해 흐른다. 3가지의 디폴트 입출력 스트림들(input/output(I/O) streams)이 있는데 바로 ***`표준 입력(Standard Input(STDIN))`***, ***`표준 출력(Standard Output(STDOUT))`***, 그리고 ***`표준 오류(Standard Error(STDERR))`***이다. 기본적으로 이 스트림들은 각자 특정한 ***파일 디스크립터(File Descriptor)***를 갖고 있다. 

각 파일 디스크립터는 어떤 정수(integer) 값인데 그것은 어떤 하나의 오픈 파일(open file)과 연결되어 있다. 그리고 프로세스들은 파일 디스크립터를 이용해 데이터를 처리한다.

그 3가지의 기본 스트림들은 다음과 같은 파일 디스크립터 숫자를 갖고 있다: stdin=0, stdout=1, 그리고  stderr=2.
이 파일 디스크립터들은 어떤 하나의 파일 디스크립터 테이블(File Descriptor Table)에 저장되어 있다. 그리고 각 프로세스는 자신만의 파일 디스크립터 테이블을 갖고 있으며, 프로세스가 생성될 때 기본적으로 0,1 그리고 2가 해당하는 스트림들에게 각각 맵핑된다.

각 스트림은 자신에게 맵핑된 ***파일 디스크립터에게 보낸 데이터***가 어디로 가는지 또는 그 ***파일 디스크립터로부터 받은 데이터***가 어디로부터 오는지 알 지 못한다. 스트림은 자신의 파일 디스크립터를 통해 데이터를 처리할 뿐 실제 데이터 리소스를 직접 처리하는 것이 아니다. 따라서 프로세스는 파일 디스크립터들만 처리하면 되고 실제 그 파일을 처리하지는 않는다. 대신 커널(kernel)이 안전하게 그 파일을 관리한다.

그리고 프로세스는 0,1,2 이외에도 다른 파일 디스크립터를 사용하게 되는데, 새로운 파일 디스크립터가 할당될 때는 가장 낮은 숫자의 아직 사용되지 않은(unopen) 파일 디스크립터가 사용된다. 따라서 0,1,2가 디폴트로 설정된 이후에 다음으로 사용될 파일 디스크립터는 3이다.

<br/>

## 2. 데이터 흐름(Data Flow)

이제 데이터 흐름에 대해 좀 더 깊게 얘기할 준비가 되었다. 우리가 터미널에서 어떤 명령을 실행시킬 때는 입력과 출력이 적절하게 처리되어야 한다. 각 명령은 어떤 데이터를 입력으로 받아야 할지 그리고 어떤 데이터를 출력으로 내보내야 할지를 알아야 한다.
데이터 흐름의 입력(stdin을 통해 기본적으로 키보드로부터 들어오는 데이터)과 데이터 흐름의 출력(stdout을 통해 또는 오류가 발생하면 stderr를 통해 기본적으로 터미널에게 전달되는 데이터)을 나타내기 위해 아래와 같은 다이어그램을 사용할 것이다.

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-1-file-descriptors-and-data-flow-2.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

위의 그림은 입력 출력 스트림의 기본 설정을 나타낸다. 키보드는 명령을 수행하는 프로그램에게 데이터를 전달하고(명령의 입장에서는 stdin을 통해 입력을 전달받는다.) 그 프로그램은 stdout을 통해 터미널에게 데이터를 출력한다. 이 그림에서 데이터는 왼쪽에서 오른쪽으로 흐르고 이 경우에 입력(in)은 stdin과 연결되고 출력(out)은 stdout과 연결된다. 그리고 각 입력과 출력에 대응되는 파일 옆에는 파일 디스크립터 번호(0, 1)가 쓰여있다.

일반적으로 데이터가 어떤 곳으로 흘러들어가는 것을 입력이라고 하며, 데이터가 어떤 곳으로부터 흘러나가는 것을 출력이라고 한다. 이러한 개념을 머릿속에 염두하고 있으면, 앞으로 보게 될 더욱 복잡한 다이어그램들을 이해하는데 도움이 될 것이다.

한 가지 알아야 할 사실은 터미널로 데이터를 출력할 수 있는 스트림은 기본적으로 2가지 라는 것이다: stdout과 stderr이다.
strerr 스트림은 어떤 명령을 실행시킬 때 오류가 있을 경우 사용된다.

예를 들어 다음과 같은 명령은 존재하지 않는 디렉토리(dir_x)의 컨텐츠를 리스트하려고 한다.

```shell
foo@bar:~$ ls dir_x
ls: cannot access dir_x: No such file or directory
```

위의 예제에서 두 번째 줄을 출력하기 위해 사용된 스트림은 사실 `stderr`이며, stdout이 아니다. 따라서 stderr 또한 기본적으로 터미널에게 출력하기 때문에 우리는 오류 메시지를 터미널에서 볼 수 있다. 대신 만약 그 디렉토리(dir_x)가 존재했었다면, `stdout` 스트림을 통해 디렉토리의 컨텐츠를 터미널로 출력했을 것이다.

여기에 업데이트된 다이어그램이 있는데, 이것은 데이터 출력을 위한 2가지의 스트림(stdout, stderr)을 보여주고 있다.

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-1-file-descriptors-and-data-flow-2.1.2.png?raw=true" alt="drawing" width="480"/>

<br/>

위 그림에서 각 출력 스트림과 연결된 파일 디스크립터 번호(1, 2)를 볼 수 있다. 따라서 stderr 스트림도 출력을 위해 사용될 수 있음을 알게되었다. 하지만 앞으로 보일 다이어그램에서는 예제에서 stderr 스트림을 사용하지 않는 한 간결성을 위해서 stderr 스트림은 생략하도록 할 것이다. 하지만 그것이 존재한다는 사실은 항상 염두해두길 바란다.

우리는 이제 명령을 이용하여 데이터 흐름을 알아볼 것이다. 몇몇 명령들은 입력과 출력 모두를 사용한다. 하지만 몇몇은 둘 중 하나만 사용하거나 아예 사용하지 않는 것도 있다. 우리는 다양한 경우를 다룰 것인데, 우선은 여기서 입력(input)의 진정한 의미에 대해서 알아보자. 
`쉘(shell)`의 입장에서 봤을 때는(쉘은 터미널로 전달된 커맨드 라인을 처리한다.), 키보드로 입력되는 모든 것(그 명령(command) 자체를 포함하여)이 `입력(input)`인 것이다. 하지만 우리는 좀 더 구체적으로 명령을 처리하는 `프로세스`가 파일들로부터(키보드와 디스플레이를 포함하여) 데이터를 주고받기 위해서 명령들(commands)에게 필요한 입력과 출력에 대해 다룰 것이다.

명령의 `옵션 인자들(option arguments)`은 커맨드 라인(command line)으로부터 읽히는데 비해서(옵션 인자들은 배열로 전달된다.) 실제 `입력(input)`은 파일 디스크립터와 연결된 오픈 파일(open file)로부터 읽힌다. 따라서 나는 명령에 대한 입력(input)을 다음과 같이 정의한다: stdin(또는 리펄포즈된(repurposed) 파일 티스크립터)을 이용해 전달된 데이터. 그리고 그 입력이 키보드를 통해서 입력되었는지, I/O 리다이렉션(redirection)을 통해 리다이렉트되었는지, 또는 명령에게 파일 인자(file argument)로 전달되었는지는 상관없다. 나는 어떤 파일 인자(file argument)가 명령에 전달되었을 때, 프로세스가 실질적으로 그 파일의 컨텐츠를 읽거나(read) 변경할(manipulate) 경우(e.g. sort 명령) 그것을 입력(input)으로 생각할 것이다. 하지만 단순히 그 파일을 참조하는 경우(e.g. mv 명령)에는 입력(input)으로 간주하지 않는다.

추가적으로, 커맨드 라인 옵션 인자들은 어떤 유닉스 디자인 선택의 결과인데, 그것은 받은 입력(input)에 의해 실행되는 명령의 행동 변화가 독립적으로 전달될 수 있게 해준다(?)

이제 예제들을 살펴보자. 명령들 중에서 ***입력은 없지만 출력은 있는 명령***의 한 예로 `ls` 명령을 생각할 수 있으며, 이것은 현재 디렉토리에 있는 모든 파일과 디렉토리를 나열한다.

```shell
foo@bar:~$ ls
dir1	file1	file2
```

이 명령은 다음과 같이 시각화될 수 있다.

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-1-file-descriptors-and-data-flow-2.1.3.png?raw=true" alt="drawing" width="240"/>

<br/>

만약 어떤 명령이 stdin으로부터 입력을 받지 않는다면, 그 명령으로 전달되는 데이터는 그 명령을 실행하는 프로그램에 의해 무시될 것이다. 왜냐하면 그 명령은 입력 데이터를 처리하도록 만들어지지 않았기 때문이다. 예를 들어, `< words.txt ls` 를 입력하면 이것은 현재 디렉토리 안의 모든 파일과 디렉토리를 출력하고 stdin으로 리다이렉트된 입력 데이터는 무시할 것이다.

이제 다음으로 볼 명령은 ***입력은 없지만 출력은 있는 명령***의 한 예로 `mv` 명령을 생각할 수 있으며, 이것은 파일을 이동시키거나 이름을 바꾸는데 사용된다. 내가 그 명령에게 이동시키거나 이름을 바꾸려고 하는 파일 또는 디렉토리의 이름을 정확히 전달하면, stdout 또는 stderr를 통해 출력 데이터는 없다. 다시 한 번 말하면, 전달되는 파일의 컨텐츠가 읽히거나 또는 사용되는 것이 아니기 때문에 전달된 파일은 입력(input)이 아니다. 명령이 성공적으로 이루어졌을 경우 다음과 같은 다이어그램을 그릴 수 있다.

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-1-file-descriptors-and-data-flow-2.1.4.png?raw=true" alt="drawing" width="180"/>

<br/>

하지만 만약 `mv` 명령을 잘못 사용할 경우에는 다음과 같이 오류가 발생하여 stderr를 통해 출력될 것이다.
 
```shell
foo@bar:~$ $ mv
mv: missing file operand
Try 'mv --help' for more information.
```

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-1-file-descriptors-and-data-flow-2.1.5.png?raw=true" alt="drawing" width="480"/>

<br/>

이제 더욱 흥미로운 것들을 해보자. ***입력과 출력을 모두 사용하는 명령***에 대한 예제에서 내가 제일 좋아하는 것은 `sort` 명령이다.
만약 파일 인자(file argument)와 입력 리다이렉션이 둘 다 없을 경우 터미널은 사용자가 정렬(sort)할 스트링을 입력할 때까지 대기한다. 그리고 사용자가 Ctrl-D를 입력하면(이것은 `sort` 프로세스의 stdin과 키보드를 연결하는 커뮤니케이션 채널(communication channel의 쓰기 엔드(write end)를 종료한다.)), 그 `sort` 명령을 실행하는 프로세스는 필요한 스트링이 전부 입력되었다고 생각할 것이다. 그러므로 그 입력된 스트링들은 stdin을 통해 명령을 실행하는 프로세스에게 전달되고, 그 프로세스에 의해 정렬(sort)된 후, stdout을 통해 터미널에게 출력된다. 매우 훌륭하다! 다음과 같은 예제를 보자.

```shell
foo@bar:~$ sort
cherry
banana
apple
apple
banana
cherry
```

위의 3줄의 단어는 사용자가 입력한 것이고 아래의 3줄의 단어는 `sort` 명령에 의해 정렬된 결과이다.

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-1-file-descriptors-and-data-flow-2.1.6.png?raw=true" alt="drawing" width="480"/>

<br/>

`sort` 명령은 또한 사용자에게 직접 스트링을 입력받지 않고 파일 이름을 인자로 받아 그 파일 안의 스트링을 입력으로 사용할 수 있다(e.g. `sort words.txt`). 이것은 아까 말한 입력(input)의 정의를 만족하는데, 왜냐하면 그것은 파일(file)이면서 `sort -r`과 같은 옵션 인자(option argument)가 아니기 때문이다. 게다가, `sort` 명령은 리다이렉션을 통해서도 입력을 전달받을 수 있다.

이제 우리는 stdin으로부터 stdout 또는 stderr로 전달되는 데이터 흐름의 일반적인 개념을 공부했다. 우리는 이제 어떻게 그 입력과 출력의 흐름을 제어하는지 알아볼 것이다. 나는 이를 위해서 2가지 방법을 사용할 것이다. 첫 번째는 `파이프(pipe)`를 사용하는 것인데, 이것은 ***한 프로세스의 출력이 다른 프로세스의 입력으로 전달***되도록 해준다. 그리고 두 번째로는 `I/O 리다이렉션(redirection)`을 사용할 것인데, 이것은 키보드나 터미널 대신에 ***파일들(files)이 데이터의 입력과 출력으로 사용***되도록 해준다.

따라서 다음 포스트에서는 `파이프(pipe)`에 대해서 알아보도록 하겠다.

<br/>

<br/>

---

### References

\[1\] *Roslyn Michelle Cyrus. (2017, Nov 8). [PIPES, FORKS, & DUPS: UNDERSTANDING COMMAND EXECUTION AND INPUT/OUTPUT DATA FLOW](http://www.rozmichelle.com/pipes-forks-dups) [Web Blog Post]*

<br/>

---

### Hashtags

`#리눅스` `#리눅스 명령` `#리눅스 명령어` `#리눅스 명령 프로세스` `#리눅스 프로세스` `#리눅스 파일 디스크립터` `#리눅스 데이터 흐름` `#리눅스 파이프` `#리눅스 리다이렉션` `#리눅스 명령 실행` `#linux` `#linux file descriptor` `#linux commands` `#linux command execution` `#linux file` `#linux pipe` `#linux redirection` `#linux data flow` `#stdin` `#stdout` `#stderr` `#표준 입력` `#표준 출력` `#표준 입출력` 
# [리눅스] 명령 실행 원리 3 : I/O 리다이렉션(Redirection)

<br/>

## 1. I/O 리다이렉션 소개

이번 리눅스 명령 실행 원리 포스트에서 마지막으로 다룰 주제는 바로 `리다이렉션(redirection)`이다. 앞서 보았던 포스트들을 통해 우리는 이제 디폴트 스트림들(default streams)이 3개의 디폴트 파일 디스크립터(file descriptors)를 사용하여 어떻게 동작하는지 알게 되었다. 디폴트 스트림들은 키보드를 통해 데이터를 입력(input)받고 터미널을 통해 데이터를 출력(output)한다. 우리는 또한 파이프라인 안에서 프로세스들 사이에서 어떻게 데이터가 전달되는지도 보았다.

하지만 만약 우리가 파이프라인의 첫 번째 명령에게 입력을 전달할 때 키보드를 사용하지 않고 기존의 파일을 입력으로 전달하고 싶다면 어떻게 해야 할까? 또는 파이프라인의 마지막 명령이 결과를 출력할 때 터미널이 아니라 어떤 파일로 출력하고 싶다면 어떻게 할까?  
이런 경우 I/O 리다이렉션(redirection)을 사용할 수 있다. 커맨드 라인(command line)에서 **`"<"`** 문자는 `입력 리다이렉션(input redirection)`을 위해 사용되며, **`">"`** 문자는 `출력 리다이렉션(output redirection)`을 위해 사용된다. 그리고 출력된 파일은 ***존재하지 않을 경우 자동으로 생성***되며, 만약 ***이미 존재할 경우에는 기존 파일에 덮어쓰게(overwrite) 된다.*** 그리고 만약 리다이렉트된 출력 데이터가 파일에 덮어씌워지는(overwritten) 것이 아니라 ***기존 컨텐츠에 출력 데이터가 추가(append)되는 것을 원할 경우***에는 **`">>"`** 문자를 사용할 수 있다.  
이제 입력, 출력 리다이렉션을 모두 사용하는 한 예제를 살펴보자. 우리는 다음과 같은 컨텐츠를 담고 있는 `words.txt` 파일이 있다.

```shell
$ cat words.txt
pear
peach
apple
```

우리는 이 파일을 입력(input)으로 사용하여 `sort` 명령에 전달한 뒤, 그 결과를 또 다른 파일로 출력(output)할 수 있다(또는 원할 경우 입력과 동일한 파일에 출력할 수도 있다.)

```shell
$ < words.txt sort > words2.txt
```

위의 명령을 입력하면 `words.txt` 파일이 리다이렉트되어 `sort` 명령의 입력으로 전달되고, 그 결과는 터미널이 아닌 `words2.txt` 파일에 출력된다. 우리는 동일한 명령을 다음과 같이 사용할 수도 있다: `sort < words.txt > words2.txt`  
`cat` 명령을 통해 결과를 확인할 수 있다.

```shell
$ cat words2.txt
apple
peach
pear
```

그리고 I/O 리다이렉션을 구현하는 것은 매우 상대적으로 간단하다. 우리는 그저 앞에서 사용했던 `dup2()` 함수의 마법을 사용하면 된다.

```c
// if first command in pipeline has input redirection
if (hasInputFile && is1stCommand) { 
  int fdin = open(inputFile, O_RDONLY, 0644);
  dup2(fdin, STDIN_FILENO);
  close(fdin);
}

// if last command in pipeline has output redirection
if (hasOutputFile && isLastCommand) { 
  int fdout = open(outputFile, O_WRONLY | O_CREAT | O_TRUNC, 0644);
  dup2(fdout, STDOUT_FILENO);
  close(fdout);
}
```

위 코드는 매우 직관적으로 보일 것이라 생각한다. 만약 입력 리다이렉션(input redirection)이 있다면(입력 리다이렉션을 발견하는 함수는 위 코드에서는 생략되어 있다.), 프로세스는 `open()` 함수를 호출하여 그 입력 파일을 열고(open) 해당 데이터 스트림(data stream)을 `open()` 함수가 사용하는 `파일 디스크립터(file descriptor)`에게 할당한다. 그런 다음, 이전 포스트에서처럼 `dup2()` 함수를 사용하여 해당 파일 디스크립터를 `stdin`과 연결시킨다.  
이와 비슷하게 만약 파이프라인의 마지막 명령에서 출력 리다이렉션(input redirection)이 있을 경우, `dup2()` 함수를 사용하여 해당 파일 디스크립터를 `stdout`과 연결시킨다.

아래에 이를 나타내는 다이어그램이 있다.

<img src="../images/linux-concepts-cmd-execution-3-io-redirection-1.1.1.png?raw=true" alt="drawing" width="320"/>

<br/>

당신은 아마도 왜 파일 디스크립터들이 입력과 출력에서 모두 3으로 시작하는지 궁금할 것이다. 위의 코드를 살펴보면, 우선 입력 리다이렉션이 있는지 검사한 후에 만약에 있을 경우, 프로세스는 `open()` 함수를 호출하여 파일을 열고 해당 데이터 스트림을 `파일 디스크립터 3`에게 할당(assign)한다. 그리고 `dup2()` 함수를 호출하여 파일 디스크립터 3이 처리하는 데이터를 `stdin`이 처리하도록 리다이렉트한다. 그 다음 더 이상 필요없는 ***파일 디스크립터 3을 닫고(close) 나면***, 이제 `파일 디스크립터 3`은 출력 리다이렉션을 처리하기 위해 ***사용가능한(available) 상태로 다시 바뀌게 된다.***  
따라서 입력과 출력 파일에 대해 모두 `파일 디스크립터 3`을 사용한 다음, 적절하게 데이터를 처리하기 위한 스트림들(stdin과 stdout)에게 리다이렉트되고 나면, 더 이상 필요없는 파일 디스크립터 3을 닫는다(close).

이것을 통해 우리는 Unix의 강력한 힘을 엿볼 수 있다. 우리는 파이프를 이용하여 작은 프로그램들을 연결(chain)하여 더 큰 프로그램을 만들 수 있을 뿐만 아니라, I/O 리다이렉션을 이용해 파일로 된 데이터를 파이프라인으로 입력하고, 또한 처리된 결과 데이터를 파일로 출력하여 저장할 수 있는 것이다.

<br/>

## 2. 최종 정리

우리가 이번 리눅스 명령 실행 원리 시리즈 3편의 포스트를 통해 배운 것을 정리하기 위해서 마지막으로 아래의 예제와 다이어그램을 살펴보도록 하자.  

당신은 어떤 그룹의 사람들을 대상으로 그들이 가장 좋아하는 색깔이 무엇인지를 알아보고자 한다고 가정해보자. 우선 당신은 사람들이 가장 좋아하는 색깔이 무엇인지를 조사하여 파일에 적어 저장한다. 따라서 파일의 한 줄마다 사람들이 좋아하는 색깔이 하나씩 적혀있다. 이제 당신은 그 파일에 대해 여러 명령들을 실행하여 최종적으로 가장 인기있는 3개의 색깔이 무엇인지 찾아내고 각 색깔마다 몇명의 투표를 받았는지에 대한 결과를 하나의 파일로 출력하고자 한다. 그리고 이 모든 명령들은 단 하나의 파이프라인(pipeline)에서 처리하고자 한다.

이를 처리하기 위한 명령은 다음과 같다.

```shell
$ < colors.txt sort | uniq -c | sort -r | head -3 > favcolors.txt
```

다음은 위의 명령을 처리되는 과정을 나타내는 다이어그램이다.

<img src="../images/linux-concepts-cmd-execution-3-io-redirection-2.1.1.png?raw=true" alt="drawing" width="840"/>

<br/>

위의 명령은 다음과 같이 처리된다: 우선 `colors.txt` 파일은 사람들이 좋아하는 색깔들이 무작위 순서로 저장되어 있다. `uniq` 명령은 이전 라인과 동일한 중복되는 모든 라인을 삭제한다. 그리고 위해서 우선 `sort` 명령을 사용해 동일한 색깔들이 연속으로 나타나도록 만든다. 그리고 `uniq -c`를 호출하는데, 이 때 `-c` 옵션은 중복되는 라인을 삭제한 다음 결과를 출력할 때 왼쪽에 각 중복된 라인의 숫자(count)를 함께 출력한다. 그 다음 우리는 다시 그 처리된 결과에 대해 내림차순(descending order)으로 정렬하기 위해 `sort -r` 명령을 사용한다. 그리고 마지막으로 `head -3` 명령을 실행하여 가장 위에 있는 3줄만 출력하는데 이 때 리다이렉션을 통해 `favcolors.txt` 파일에 출력하여 저장한다. 결과적으로 `favcolors.txt` 파일에는 다음과 같은 데이터가 저장된다.

```
$ cat favcolors.txt 
   4 red
   3 blue
   2 green
```

위 예제는 지금까지 다루었던 예제들 보다 더욱 복잡하다. 그리고 위 다이어그램의 파일 디스크립터들 역시 매우 복잡하다.  
나의 쉘 프로그램은 I/O 리다이렉션을 검사하기 전에 pipe() 함수를 먼저 호출한다. 따라서 첫 번째 파이프가 파일 디스크립터 3, 4를 사용하게 된다. 그리고 입력과 출력을 위한 파일 디스크립터는 각각 5, 6이 할당된다. 그리고 파일 디스크립터 5, 6이 각각 stdin과 stdout으로 리다이렉트된 이후에는 닫히게(close) 되고, 위의 다이어그램의 양쪽 끝을 보면 이를 알 수 있다.  
두 번째 파이프가 생성될 때, 이것은 재활용된 파일 디스크립터를 사용할 수 있는데, 그 이후에 다른 모든 파이프에 대해서도 마찬가지이다.  
하지만 파일 디스크립터들이 어떻게 재활용되는지에 대해 너무 집중할 필요는 없다. 그것은 나의 쉘 프로그램과 예제 코드에 따라 결정되는 것이기 때문이다.

이것으로 이번 리눅스 명령 실행 원리 시리즈의 마지막 포스트를 마치도록 하겠다.

<br/>

<br/>

---

### References

\[1\] *Roslyn Michelle Cyrus. (2017, Nov 8). [PIPES, FORKS, & DUPS: UNDERSTANDING COMMAND EXECUTION AND INPUT/OUTPUT DATA FLOW](http://www.rozmichelle.com/pipes-forks-dups) [Web Blog Post]*

<br/>

---

### Hashtags

`#리눅스` `#유닉스` `#리다이렉트``#리눅스 리다이렉션` `#리눅스 리다이렉트` `#리눅스 리디렉션 설명` `#유닉스 리다이렉트` `#리눅스 리다이렉션 설명` `#IO 리다이렉트` `#IO 리다이렉션` `#IO 리디렉션` `#리눅스 명령어` `#리눅스 프로세스` `#리눅스 파일 디스크립터` `#리눅스 데이터 흐름` `#리눅스 명령 실행` `#표준 입력` `#표준 출력` `#표준 오류` `#표준 입출력` `#linux` `#unix` `#linux redirection` `#linux IO redirection` `#I/O Redirection` `#IO Redirection` `#unix redirect` `#what is redirection in linux?` `#what is linux redirection?` `#linux redirect` `#linux redirect commands` `#linux file descriptor` `#linux commands` `#linux command execution` `#linux file` `#linux data flow` `#stdin` `#stdout` `#stderr`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

# [리눅스] 명령 실행 원리 2 : 파이프(Pipe('|'))

<br/>

## 1. 파이프(Pipe) 소개

유닉스(Unix)는 단순하지만 매우 가치있는 디자인 철학을 갖고 있는데, 유닉스 파이프(Pipe)의 창시자인 `Doug McIlroy`는 다음과 같이 말했다.

> *“한 가지 일만 아주 잘하는 프로그램들을 작성하라. 프로그램들이 다른 프로그램들과 함께 일할 수 있도록 작성하라. 프로그램들이 텍스트 스트림을 처리할 수 있도록 작성하라. 왜냐하면 그것은 보편적인 인터페이스이기 때문이다.”*

> 원문 :  
*“Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface.”*

파이프의 개념은 매우 강력하다. 파이프는 데이터가 한 프로세스에서 다른 프로세스로 전달되도록 하는데(일방향(unidirectional)의 데이터 흐름을 통해서), 그로인해 프로세스들의 명령들이 스트림에 의해 서로 연결된다(chained). 이것은 여러 명령들이 함께 동작하여 더 큰 목적을 달성할 수 있도록 해준다. 이러한 프로세스들의 체이닝(chaining)은 `파이프라인(pipeline)`으로 표현될 수 있다: 한 파이프라인 안에 있는 `명령들(commands)`은 서로 ***`파이프(pipes)`에 의해서 연결되며***, 파이프의 한 쪽 끝에서 다른 쪽 끝으로 데이터가 흐르면서 두 프로세스 사이에 데이터가 공유된다. 이 때 파이프라인 안에 있는 각 명령들은 각자 독립적인 프로세스 안에서 실행되며, 각자 독립적인 메모리 공간에서 실행된다. 그러므로 우리는 각 프로세스들이 서로 통신할 수 있는 방법이 필요하게 되는데, 바로 `pipe()` 시스템 호출이 그 방법을 제공하는 것이다.

구현에 있어서, 사실 파이프는 그저 `버퍼된 스트림(buffered stream)`에 불과하며, 그 스트림은 2개의 파일 디스크립터(file descriptors)와 연결되어 있는데, 첫 번째는 데이터를 `읽기` 위한 것이고, 두 번째는 데이터에 `쓰기` 위한 것이다. 더욱 구체적으로, 파이프라인의 명령의 실행을 처리하는 코드를 살펴보면, 2개의 정수값을 저장하는 배열(array)이 생성되고, `pipe()` 호출은 그 배열에 사용 가능한 2개의 파일 디스크립터 값을(일반적으로 사용가능한 가장 낮은 숫자의 2개의 파일 디스크립터를 사용한다.) 채운다(populate).

실제 물리적인 파이프는 지금 설명하는 유닉스 파이프의 추상적인 개념을 설명하는데 매우 좋은 비유이다. 우리는 한 프로세스에서 시작되는 `데이터 스트림`을 독립된 공간에 들어있는 `물`이라고 생각할 수 있다. 그리고 그 물이 다음 프로세스의 공간으로 흐를 수 있는 유일한 방법은 각 공간을 파이프(pipe)로 연결하는 것이다. 이러한 방식으로, 그 `물(데이터)`은 `첫 번째 공간(프로세스)`에서 `파이프`로 흘러들어가고, 파이프 안에 물이 가득차면, 다시 그 `파이프`에서 `다음 공간(프로세스)`으로 `물(데이터)`을 흘려보낸다. 아래의 다이어그램은 이러한 데이터 흐름(data flow)을 표현한 예이다(`sort | grep ea`).

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-1.1.1.png?raw=true" alt="drawing" width="480"/>

<br/>

이제 위의 예제를 하나씩 파헤쳐보도록 하자. 기본적으로 `sort` 명령은 사용자가 `stdin(file descriptor 0)`을 통해서 `입력(input)`을 전달할 때까지 기다린다. 그 다음, 입력받은 스트링들은 알파벳 순서대로 정렬되고, 졍렬된 결과가 `stdout`을 통해서 `파이프(pipe)`로 전달된다. 이것은 `stdout`으로 하여금 출력된 데이터를 터미널 디스플레이(file descriptor 1)가 아니라 `파이프의 왼쪽 끝(file descriptor 4)`으로 입력(feed)하도록 만듦으로써 가능해진다.

위 예제에서 프로세스의 실행 과정에 대한 더욱 자세한 내용은 추후에 다시 설명하도록 하겠다.

계속 진행하기 전에, 다시 한 번 떠올려야 할 중요한 점이 있는데, 바로 각 프로세스는 자신 만의 `파일 디스크립터 테이블(own file descriptor table)`을 갖는다는 것이다. 파이프라인의 각 명령은 각자 독립적인 프로세스 안에서 실행되기 때문에, 각 명령은 자신만의 버전의 파일 디스크립터를 갖고 있으며, 자신만의 stdin, stdout, 그리고 stderr를 갖고 있다. 이것이 의미하는 것은 위의 다이어그램에서 왼쪽 끝에 있는 `0`은 `sort` 명령을 실행하는 프로세스에 속하는 것이고, 따라서 이것은 다이어그램의 오른쪽 끝에 있는 `1`과는 다른 파일 디스크립터 테이블 안에 있는 것이고, 그것은 `grep` 명령을 실행하는 프로세스에 속하는 것이다. 하지만 스트림들은 프로세스 바운더리(process boundaries)를 건너 데이터를 전송하도록 설정되어있기 때문에, 데이터가 파이프라인을 타고 잘 전달된다면 결과적으로 데이터는 마지막 프로세스로 전달될 것이다.

다시 처음부터 살펴보면, `sort` 명령은 정렬된 스트링 리스트를 출력(output)으로 갖게되고, 그 출력 데이터를 결과적으로 다음 프로세스(grep)에게 전달하기 위해서, 생성된 파이프(pipe)에게 출력 데이터를 전달해야 한다. 우선 잠시 동안은 파일 디스크립터 3, 4에 대해서는 잊도록 하고, 다어이그램에 쓰여 있는 **'in'**과 **'out'** 단어들을 살펴보자. 데이터는 `sort 프로세스`로부터(**out of**) `파이프`로(**into**) 전달되고, 그것은 다시 `파이프`로부터(**out of**) `grep 프로세스`로(**into**) 전달된다.

이제 `pipe()` 호출에 의해 전달되는 파일 디스크립터에 대해서 알아보도록 하자. 파이프라인에서 명령들을 실행하는 코드 안에서, `pipe()` 호출은 파일 디스크립터 배열 {3, 4}를 채우게(populate) 되고, 따라서 `파일 디스크립터 4`에 **쓰여진(written)** 데이터가 `파일 디스크립터 3`으로부터 **읽히도록(read)** 만든다. 사실 이 번호들이 숫자가 무엇인지는 별로 중요하지 않다. 배열 속에 들어가는 값들은 오직 프로세스에게만 중요하다. 하지만 ***각 파일 디스크립터의 용도(purpose)는 데이터에게 있어 매우 중요하다.*** 그리고 각 파일 디스크립터의 용도는 배열(array) 안에서 몇 번째 인덱스(index)에 위치하느냐에 따라서 결정된다.

그리고 여기에서 알아야 할 매우 중요한 개념이 있는데, 나는 이것을 이해하기 위해 위의 다이어그램들을 그려보며 생각해야 했다. 내가 처음에 얘기했던 것처럼 위의 다이어그램들은 데이터가 왼쪽에서 오른쪽으로 흐르는 모델이라는 것을 잘 생각해보자. 파일 디스크립터는 배열 안에서 설정되어 4에 쓰여진 데이터가 3에서 읽히도록 된다. 하지만 당신은 왜 4가 왼쪽으로 가고 3이 오른쪽으로 가는지 궁금해할 수 있다.
여기서 핵심적인 내용은 바로 `pipe()` 호출에 의해 설정되는 `읽기(read)`, `쓰기(write)` 액션은 바로 파이프를 사용하는 ***양쪽의 2개의 `프로세스`들의 관점에서 정의된다는 것이다.*** 따라서 `pipe()` 호출에 ***4를 `writable end`로 설정하면***, 그것은 첫 번째 명령(`sort`)의 프로세스가 ***출력(output)을 `쓰기(write)`하는*** 파이프의 입력(input)을 전달받는 파이프의 왼쪽 파일 디스크립터가 되는 것이다. 반대로 `pipe()` 호출에 ***3을 `readable end`로 설정하면***, 그것은 두 번째 명령(`grep`)의 프로세스가 ***입력(input)을 `읽기(read)`하는*** 파이프의 출력(output)을 전달하는 파이프의 오른쪽 파일 디스크립터가 되는 것이다.

따라서 데이터는 첫 번째 프로세스(`sort`)에서 파이프로 전달되고, 파이프는 모든 데이터가 전달될 때까지 기다렸다가 모든 데이터가 전달되면, 파이프는 그 다음 프로세스(`grep`)로 그 데이터를 내보낸다. 그리고 마지막으로 파이프로부터 데이터를 전달받은 `grep` 명령을 실행하는 프로세스는 그 입력 데이터 중에서 "ea"가 포함된 라인을 stdout으로 출력하여 터미널로 내보내게 된다.

다음으로 우리는 이러한 프로세스들을 처리하는 코드들에 대해서 더욱 자세히 알아보도록 할 것이다. 지금까지 알아본 `pipe()` 호출을 이해했다면 우리는 전체 중에서 절반 정도 왔다고 할 수 있다. 나머지 절반은 바로 `fork()`와 `dup2()`를 이해하는 것이다. 이제 이 함수들이 어떻게 동작하는지 알아보도록 하자!

<br/>

## 2. 파이프라인(pipeline)에서 여러 명령들 실행하기

우리는 지금까지 파이프(pipes)를 이용하여 어떻게 한 프로세스의 데이터가 다른 프로세스로 전달되는지를 살펴보았다. 하지만 우리는 아직 그 명령들을 실행하는 프로세스들의 `계층(hierarchy)`에 대해서는 아직 다루지 않았다. 수업시간에 우리는 모든 명령들이 **`자식 프로세스(child process)`**에서 실행되도록 하거나 또는 **`부모 프로세스(parent process(calling process))`**에서 실행되도록 하는 것을 배웠다. 일반적으로 `부모 프로세스`는 기본적으로 필요한 설정(setup) 작업을 하고, `fork()` 호출을 통해 `자식 프로세스`를 생성하여 부모 프로세스의 메모리 상태(memory state)와 파일 디스크립터(file descriptors)를 복제하도록 한다. 따라서 `자식 프로세스`는 `fork()` 호출이 실행될 때의 부모 프로세스에 존재했던 동일한 변수(variables)와 파일 디스크립터(file descriptors)를 갖는 독립적인 복사본을 갖게 된다. 그리고 `fork()` 호출이 끝난 이후에는 자식 프로세스는 더 이상 부모 프로세스의 변화에 대해서 알지 못하고, 반대로 부모 프로세스 역시 자식 프로세스의 변화에 대해서 알지 못한다.

이러한 자식 프로세스 명령 실행 패턴(the children-execute commands pattern)은 그저 싱글 명령(single command)을 처리하는 경우에는 불필요해 보인다. 왜냐하면 굳이 자식 프로세스를 생성하지 않고도 부모 프로세스에서 그 명령을 실행하면 되기 때문이다.  
하지만 싱글 명령(single command)이나 또는 파이프라인에서 멀티플 명령들(multiple commands) 모두를 처리할 수 있는 제네릭(generic) 코드를 작성한다고 생각한다면, 이 경우에는 항상 다른 자식 프로세스가 각각 다른 명령을 수행하도록 하는 것이 당연할 것이다.  
물론 이 규칙이 적용되지 않는 예외적인 경우도 있지만, 여기서 우리는 모든 명령들이 각기 다른 자식 프로세스에서 실행된다고 가정할 것이다.

이제 다음과 같은 `sort` 명령을 실행하는 C 코드 예제를 살펴보도록 하자. 이 예제에서 입력(input)은 `dprintf()` 함수를 사용하여 직접적으로 파일 디스크립터(file descriptor)로 출력되는데, 이것은 파이프를 사용하여 부모 프로세스로부터 자식 프로세스로 데이터가 전달되는 경우를 보여주기 위함이다.

다음의 예제는 우리 수업에서 제공된 샘플 코드를 간략화한 버전이다.

```c
#include <unistd.h>
#include <sys/wait.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
  int fds[2];                      // an array that will hold two file descriptors
  pipe(fds);                       // populates fds with two file descriptors
  pid_t pid = fork();              // create child process that is a clone of the parent
  
  if (pid == 0) {                  // if pid == 0, then this is the child process
    dup2(fds[0], STDIN_FILENO);    // fds[0] (the read end of pipe) donates its data to file descriptor 0
    close(fds[0]);                 // file descriptor no longer needed in child since stdin is a copy
    close(fds[1]);                 // file descriptor unused in child
    char *argv[] = {(char *)"sort", NULL};   // create argument vector
    if (execvp(argv[0], argv) < 0) exit(0);  // run sort command (exit if something went wrong)
  } 

  // if we reach here, we are in parent process
  close(fds[0]);                 // file descriptor unused in parent
  const char *words[] = {"pear", "peach", "apple"};
  // write input to the writable file descriptor so it can be read in from child:
  size_t numwords = sizeof(words)/sizeof(words[0]);
  for (size_t i = 0; i < numwords; i++) {
    dprintf(fds[1], "%s\n", words[i]); 
  }

  // send EOF so child can continue (child blocks until all input has been processed):
  close(fds[1]); 

  int status;
  pid_t wpid = waitpid(pid, &status, 0); // wait for child to finish before exiting
  return wpid == pid && WIFEXITED(status) ? WEXITSTATUS(status) : -1;
}
```

이 프로그램은 한 가지 구체적인 명령(`sort`)을 실행하도록 쓰여졌다. 코드가 동작하는 과정은 다음과 같다.  
1. 우선 `부모 프로세스(parent process)`에서 2개의 `파일 디스크립터(file descriptors)`를 저장하기 위한 ***배열(array)이 한 개 생성된다.***
2. `pipe()` 호출 이후에 그 배열은 연결된 2개의 파일 디스크립터로 채워지게(populate) 된다. 이 때 배열의 ***첫 번째 요소는*** `자식 프로세스`에서 `입력(input)`을 ***읽는데(read) 사용되고***, ***두 번째 요소는*** `부모 프로세스`로부터 `출력(output)`을 ***쓰는데(write) 사용된다.***
3. `fork()` 함수가 호출되어 `자식 프로세스`가 생성되고, 그것은 `부모 프로세스`의 ***파일 디스크립터(file descriptors)와 메모리(memory)를 복제한다.***

4. 이제 현재 실행 중인 `프로세스 아이디(process id)`가 ***자식 프로세스인지(pid == 0) 검사한다.***

<br/>

### (1) 자식 프로세스(child process)인 경우

5. `dup2()` 함수를 호출하여 자신의 `stdin`을 `파이프(pipe)`의 ***읽기 엔드(read end)와 연결시킨다.*** 그리고 이것은 `fds[0]`에 해당한다. 이 때 알아야 할 점은 `dup2()` 함수가 동작할 때, 두 번째 파라미터의 파일 디스크립터를 먼저 료시킨다는 것이다. 따라서 위 예제에서는 `stdin`(디폴트로 열려 있는 표준 입력)이 먼저 닫히면서, 디폴트 키보드 파일에 대한 레퍼런스가 삭제된다. 그 이후에는 해당 자식 프로세스의 `stdin`은 ***더 이상 키보드가 아니라 fds[0]에서 데이터를 입력받게 된다.*** 이것이 바로 `dup2()` 함수에서 일어나는 마법이다.

6. 이제 자식 프로세스의 `stdin`은 데이터를 읽어들일 준비가 되었으며, `pipe()` 호출에 의해 생성된 파일 디스크립터는 이제 더 이상 필요 없으므로 파일 디스크립터를 닫는다(close): `close(fds[0]);` `close(fds[1]);`

7. 이제 자식 프로세스는 `execvp()` 함수를 호출하여 `sort` 명령을 실행하고, 부모 프로세스의 모든 데이터가 파이프의 `읽기 엔드(readable end)`로 쓰여질 때가지 대기한다. 

8. 부모 프로세스로부터 모든 데이터가 파이프의 입력 엔드를 통해 자식 프로세스로 전달되면 `sort` 명령을 통해 데이터를 정렬하고, 그 결과를 stdout을 통해 터미널 디스플레이로 출력한 다음, execvp() 호출이 리턴된 이후, 자식 프로세는 디폴트 파일 디스크립터 0, 1, 그리고 2를 자동으로 닫는다.

<br/>

### (2) 부모 프로세스(parent process)인 경우

5. `부모 프로세스`는 `fork()` 함수를 호출한 이후에 파일 디스크립터 `fds[0]`를 닫는데, 왜냐하면 `부모 프로세스`는 데이터를 읽기(read)는 사용하지 않고 데이터를 ***쓰기(write)만 사용***하기 때문이다. 

6. `dprintf()` 함수를 이용해서 `자식 프로세스`에게 전달하고자 하는 배열(array) 안에 담긴 단어들(words)을 파이프의 `쓰기 엔드(writable end)`인 `fds[1]`에 쓴다. 이 때 각 단어 끝에는 줄바꿈 문자(a new line character('\n'))를 붙여 `sort` 명령이 한 줄당 한 단어씩 받을 수 있도록 한다.

7. 모든 단어들을 전송한 후에 `fds[1]`을 닫는다: `close(fds[1]);`. 이 때 자동으로 `EOF(end-of-file)`이 전송되고, 그 뒤에 자식 프로세스는 `sort` 명령을 수행한다. 

8. `waitpid()` 함수를 호출하여 ***자식 프로세스가 종료될 때가지 기다린다.***

9. 자식 프로세스가 종료되고 나면 부모 프로세스도 종료된다.

<br/>

아래는 위의 모든 과정에 대한 데이터 흐름 다이어그램이다.

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.1.1.png?raw=true" alt="drawing" width="480"/>

> 위 예제 코드의 최종 데이터 흐름(data flow)이다. `파일 디스크립터 3`은 자식 프로세스에서 `stdin`으로 복사된 뒤에 종료되었다. 그리고 오직 `자식 프로세스`의 `stdin`만 데이터를 읽기 위해 사용되었다.

<br/>

이 예제는 파이프가 어떻게 동작하는지를 보여주기 위한 것이라는 점을 명심하길 바란다. 사실 위 예제에서 파이프가 꼭 필요한 것은 아니다. 왜냐하면 자식 프로세스는 부모 프로세스의 도움 없이 파이프를 사용하지 않고 그저 디폴트 stdin을 이용해 데이터에 접근할 수도 있다. 하지만 위 예제의 목적은 파이프를 이용해 한 프로세스에서 다른 프로세스로 데이터를 전달하는 것을 보여주기 위함이다. 그리고 이것은 파이프라인에서 1개 이상의 명령들을 처리할 때 매우 중요한 패턴이다.

위 예제 코드에서 어떤 일들이 일어나는지 알아보기 위해 다음의 다이어그램들을 살펴보자. 아래 그림들에서 선(lines)은 파일 디스크립터와 그것이 가진 포인터가 가리키는 오픈 파일 사이의 관계를 나타낸다. 그리고 이 때 화살표의 방향은 데이터 흐름의 방향을 나타낸다. 이러한 다이어그램은 부모와 자식 프로세스에게 어떤 파일 디스크립터가 필요한지를 분명하게 보여주고, 또한 메모리 누수(leak)를 막기 위해 언제 파일 디스크립터를 닫는 것이 적절한지를 알 수 있게 한다.  
또한 명심해야 할 점은 부모 프로세스에서 실행되는 명령어들(instructions)이 자식 프로세스의 명령어들(instructions)보다 이전에 실행된다는 보장이 없기 때문에 아래의 몇몇 과정들은 서로 다른 시간에 발생할 수 있다. 아래의 다이어그램들은 명령 실행 과정에서 어떤 일들이 일어나는지에 대한 개념을 제공하기 위한 것이며, 몇몇 과정은 실행 중에 순서가 뒤바뀔 수도 있다.

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.1.png?raw=true" alt="drawing" width="480"/>

> 프로그램이 시작될 때, `부모 프로세스`가 생성되고 디폴트 스트림들(default streams)이 그것의 파일 디스크립터 테이블(file descriptor table) 안에 설정된다. 화살표의 방향은 데이터의 흐름 방향을 나타낸다: `stdin`은 키보드로부터 **입력(input)**을 받고, `stdout`과 `stderr`는 **출력(output)**을 터미널로 전송한다.

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.2.png?raw=true" alt="drawing" width="480"/>

> `pipe()` 함수 호출은 다음으로 사용가능한 파일 디스크립터 2개를 찾고 그것들을 생성된 `파이프(pipe)`의 **읽기 엔드(readable end)**와 **쓰기 엔드(writable end)**와 각각 연결시킨다. 이 다이어그램에서는 프로세스는 3을 통해 읽고, 4를 통해 쓸 수 있다.

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.3.png?raw=true" alt="drawing" width="480"/>

> `fork()` 함수 호출은 `자식 프로세스`를 생성하는데, 그것은 함수 호출 당시의 부모 프로세스의 메모리와 파일 디스크립터 테이블을 복사한다. 이 때 `부모 프로세스`의 파일 디스크립터가 연결된 파일들(files)이 무엇이든지 간에 `자식 프로세스`의 파일 디스크립터 역시 동일한 그 파일들(files)과 연결된다.

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.4.png?raw=true" alt="drawing" width="480"/>

> `부모 프로세스`는 파이프의 읽기 엔드가 필요없기 때문에 `fds[0]`을 닫는다(close). `자식 프로세스`는 `dup2()` 함수를 호출하여 디폴트로 `stdin`과 연결되어 있던 ***파일 디스크립터 0을 먼저 닫은 후에,*** `fds[0]`을 복사하여 `stdin`에 연결시킨다.

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.5.png?raw=true" alt="drawing" width="480"/>

> `부모 프로세스`는 `파이프`의 **쓰기 엔드(writable end)**에 데이터를 쓴다. `자식 프로세스`는 더 이상 필요없는 `파이프`의 `파일 디스크립터(fds[0]과 fds[1])`를 닫는다(close).

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.6.png?raw=true" alt="drawing" width="480"/>

> `부모 프로세스`는 모든 데이터를 다 쓰고난 뒤에 `fds[1]`을 닫는다(close). 그러면 자동으로 `EOF`가 전송되고 `자식 프로세스`에게 모든 데이터가 전송되었음을 알리게 된다.

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.7.png?raw=true" alt="drawing" width="480"/>

> `자식 프로세스`는 받은 `입력(input)`에 대해서 `sort` 명령을 수행한다.

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.8.png?raw=true" alt="drawing" width="480"/>

> `자식 프로세스`에서 `sort` 명령에 의해 생성된 **출력(output)**은 터미널로 전송된다. 그리고 `자식 프로세스`가 종료되면서 신호(signal)을 전송하고, 이것은 ***자식 프로세스의 종료를 기다리고 있는*** `부모 프로세스`에게 전달된다.

<br/>

<img src="https://github.com/architectophile/blog/blob/master/linux/concepts/images/linux-concepts-cmd-execution-2-pipe-2.2.9.png?raw=true" alt="drawing" width="480"/>

> `자식 프로세스`는 종료되면서 자신의 디폴트 파일 디스크립터 0, 1, 그리고 2를 모두 닫는다(close). ***자식 프로세스가 종료되고 나면*** `부모 프로세스` 또한 종료되면서 자신의 디폴트 파일 디스크립터 0, 1, 그리고 2를 모두 닫는다(close). 그러면 프로세스 실행 중에 추가적으로 사용되었던 모든 파일 디스크립터들은 닫히게 된다.

<br/>

특히 위의 다이어그램들 중에서 ***파란색 선들(blue lines)을 잘 보아라***. 그것들은 당시 과정에서 ***데이터의 흐름(the flow of data)을 나타낸다.*** 위 다이어그램들을 연결하면 다음과 같은 데이터 흐름을 얻는다:

1. `부모 프로세스`는 `파이프`의 `쓰기 엔드`를 통해 데이터를 작성한다.

2. `자식 프로세스`는 `파이프`의 `읽기 엔드`를 통해 `stdin`에서 데이터를 읽어온다.

3. `자식 프로세스`는 `sort` 명령을 처리하고 결과를 `터미널`로 `출력`한다.


이 예제를 통해 알 수 있는 것은 `파이프`에 의해 생성된 `파일 디스크립터들(file descriptors)`은 필요할 경우 다른 스트림(e.g. stdin)으로 `리다이렉트(redirect)`될 수 있다는 것이다. 파이프는 프로세스끼리 서로 통신할 수 있는 2개의 파일 디스크립터를 제공하는 편리한 도구이다. 그리고 ***파이프(pipe)의 파일 디스크립터(file descriptors)는 데이터가 적절하게 원하는 곳으로 흐를 수 있도록 리다이렉트(redirect)될 수 있다.***

위의 예제 코드와 다이어그램들이 프로세스가 파이프를 통해 여러 명령들을 처리하는 과정을 이해하는데 도움이 되었길 바란다. 위 예제를 통해 알아야 할 것은 `파일 디스크립터`가 ***어떻게(how) 사용되는지를 이해***하는 것도 중요하지만 `파일 디스크립터`가 ***어느 시점에(when) 사용되지 않으며, 그걸 경우 적절하게 닫혀야한다는 것을 이해***하는 것도 중요하다는 사실이다. 파일 디스크립터의 힘은 강력하지만 잘못 사용할 경우 문제를 일으킬 수 있고, 쉽게 까먹고 놓칠 수도 있는 부분이다.

다음 편에서는 이번 리눅스 명령 실행 원리 시리즈의 마지막으로서 **리다이렉션(redirection)**에 알아보도록 하자.

<br/>

<br/>

---

### References

\[1\] *Roslyn Michelle Cyrus. (2017, Nov 8). [PIPES, FORKS, & DUPS: UNDERSTANDING COMMAND EXECUTION AND INPUT/OUTPUT DATA FLOW](http://www.rozmichelle.com/pipes-forks-dups) [Web Blog Post]*

<br/>

---

### Hashtags

`#리눅스` `#유닉스` `#파이프` `#리눅스 파이프` `#리눅스 파이프란` `#리눅스 파이프 설명` `#유닉스 파이프` `#리눅스 명령` `#리눅스 명령어` `#리눅스 명령 프로세스` `#리눅스 프로세스` `#리눅스 파일 디스크립터` `#리눅스 데이터 흐름` `#리눅스 리다이렉션` `#리눅스 리디렉션` `#리눅스 명령 실행` `#linux` `#unix` `#linux pipe` `#unix pipe` `#what is pipe?` `#what is linux pipe?` `#linux pipe |` `#linux | command` `#linux |` `#pipe(|)` `#linux file descriptor` `#linux commands` `#linux command execution` `#linux file` `#linux redirection` `#linux data flow` `#stdin` `#stdout` `#stderr` `#표준 입력` `#표준 출력` `#표준 오류` `#표준 입출력`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.
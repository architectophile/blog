# [ARM] 어셈블리 언어

<br/>

## 1. 서론(Introduction)

매우 넓게 범위를 나누었을 때, 우리는 프로그래밍 언어를 크게 `4가지`로 분류할 수 있다. 첫 번째는 가장 하위의(the lowest level) 언어인 `기계어(machine code)`이다. 기계어는 이진 숫자로 이루어진 CPU가 디코딩하여 바로 명령어로 이해할 수 있는 최하위 언어이다. 그리고 두 번째가 바로 우리가 다루게 될 `어셈블리(assembly)`이다. 어셈블리는 기계어를 단어로 표현한 것이라 할 수 있다. 따라서 각 `어셈블리 명령어(assembly instruction)` 한 개는 `기계어 명령어(machine code instruction)` 한 개와 1:1 매칭된다. 그리고 세 번째는 C언어와 같은 `컴파일 언어(compiled language)`이다. 컴파일 언어는 사람들이 읽고 이해하기 쉬운 문법을 갖고 있으며, 실행되기 전에 컴파일러에 의해 어셈블리 또는 기계어로 미리 컴파일되어야 한다. 그리고 마지막 네 번째는 `스크립크 언어(scripting language)` 또는 `인터프리트 언어(interpreted language)`이다. 대표적으로는 PHP, JavaScript, Python, Ruby 등이 있다. 스크립트 언어는 미리 컴파일되지 않고 실시간으로 한 줄씩 인터프리터에 의해 해석되어 실행되는 코드이다. 실시간으로 해석하기 때문에 상대적으로 컴파일 언어보다는 런타임 실행 속도가 느리지만 대신 빌드 시간이 필요하지 않다. 따라서 상위 언어(higher language)일 수록 사람이 읽고 사용하기 쉽고(easy) 코드 이식성(portability)이 좋아지지만 대신 실행속도는 더욱 느려지고 많은 헤더에 의해 코드의 크기가 증가한다. 최근에는 컴퓨터의 성능 향상으로 인해 이러한 실행 속도에 대한 단점이 많이 보완되기는 하였지만 임베디드 시스템(embedded system)과 같은 리소스가 제한된 환경에서는 여전히 어셈블리를 이용한 최적화 과정이 필요한 경우가 많다.

어셈블리로 프로그래밍하기 위해서는 컴파일러 또는 인터프리터가 없기 때문에 프로세서(CPU)가 어떻게 동작하는지를 정확하게 알아야 하며 이를 바탕으로 프로세서가 이해할 수 있도록 코드를 잘 작성해야만 한다. 어셈블리에서는 구조화된 `for` loop, `while` loop, 또는 `if/else` branch 등은 없으며 그저 `goto`만 존재한다. 또한 `struct`나 `class`, `상속(inheritance)` 그리고 심지어 `데이터 타입(data types)`도 존재하지 않는다. 따라서 어셈블리는 매우 anarchic하다고 볼 수 있지만 대신에 매우 빠른 속도를 제공한다.

실행속도와 코드 사이즈에 대한 이슈를 제외하고도 어셈블리를 배우는 것은 많은 장점을 제공한다. CPU가 어떻게 동작하는지를 이해할 수 있고 이것은 나중에 C언어로 프로그래밍을 하더라도 많은 도움이 된다. 예를 들면 코딩을 할 때 변수를 어떤 데이터 타입으로 선언하는 것이 가장 좋은지를 알 수 있다. ARM 프로세서는 32비트로 설계되었기 때문에 데이터 타입 중에서 int 타입을 가장 선호한다. 그리고 다른 타입은 int 타입에 비해 속도가 더 느리게 된다. 따라서 어셈블리를 공부하게 되면 왜 int 타입이 속도가 더 빠른지 이해할 수 있게 된다.

<br/>

## 2. 일반적인 어셈블리(General Assembly)

각 어셈블리 명령은 실제 기계어와 1:1 매칭 관계에 있다. 그리고 어셈블리는 `연상 기호들(mnemonics)`을 사용하여 해당 프로세서가 수행가능한 연산들(operations)을 나타낸다. 이 때 ***`어셈블리(assembly)` 코드를 기계어로 변환하는 툴을 `어셈블러(assembler)`라고 부른다.***

<br/>

### 1) 기본 연산(Basic Operations)

모든 `프로세서(processor)`는 `산술(arithmetic)`이나 `비트 조작(bit manipulation)`과 같은 기본적인 `데이터 처리(data processing)`를 수행한다. 그리고 프로세서는 `메모리(memory)`에 접근하거나 코드 안의 한 영역에서 `조건문(conditional)`이나 `반복문(loop)`의 다른 영역으로 `점프(jump)`하는 `명령어들(instructions)`을 갖고 있다. 하지만 각 프로세서마다 명령어을 처리하는 방식이 다르며, 또한 어떤 프로세서에서는 지원하는 `명령어 집합(instruction set)`이 다른 프로세서에는 없을 수도 있다. 예를 들어 `ARM` 프로세서는 `나누기 명령어(division instruction)`가 없으며, `메모리(memory)`에서 직접(directly) 데이터를 처리할 수 없다. 하지만 ARM 명령어 집합은 몇몇 장점도 갖고 있는데, 꽤 많은 수의 `범용 레지스터들(general-purpose registers)`와 `단순한 명령어 집합(simple instruction set)`을 갖고 있다. 게다가 ARM 프로세서는 `비트 쉬프트(bit-shift)` 연산을 매우 훌륭한 방식으로 처리한다.

아래의 예제에서 3개의 서로 다른 어셈블리 언어들(`x86(Intel)`, `68000`, `ARM`)에서 더하기(addition)와 메모리 읽기(memory read)를 처리하는 방식들을 볼 수 있다. 기본적인 형식은 `'operation operand1, operand2, ...'` 와 같은 형식을 갖고 있다(물론 예외도 있다.) ***여기서 중요한 점은 `x86`과 `ARM`은 `목적지(destination)`가 `Operand1`에 위치하며, `68000`은 `목적지`가 `operand2`에 위치한다는 점이다.*** 그리고 프로세서마다 사용되는 `레지스터들(registers)`의 이름도 다르다.

몇몇 보편적인 연산들이 있는데, 예를 들어 `'x += y'` 와 같은 연산은 위에서 말한 3개의 모든 프로세서에 존재한다. 그리고 `x86`은 값을 1만큼 증가시키는 특별한 명령어를 갖고 있으며, `ARM`에서는 `결과 레지스터(result register)`는 두 개의 `피연산자(operands) 레지스터들`과 다를 수 있다. 이러한 차이는 프로세서들이 실제로 어떻게 동작하느냐에 따라 발생한다. 

```assembly
// Some examples
// Addition and memory loads in different assemblies

// === x86 asm ========================================================
add     eax, #2         // Add immediate:   eax += 2;
add     eax, ebx        // Add register:    eax += ebx;
add     eax, [ebx]      // Add from memory: eax += ebx[0];
inc     eax             // Increment:       eax++;

mov     eax, DWORD PTR [ebx]        // Load int from memory:    eax= ebx[0];
mov     eax, DWORD PTR [ebx+4]      // Load next int:           eax= ebx[1];

// === 68000 asm ======================================================
ADD     #2, D0          // Add immediate:   D0 += 2;
ADD     D1, D0          // Add register:    D0 += D1;
ADD     (A0), D0        // Add from memory: D0 += A0[0];

MOVE.L  (A0), D0        // Load int from memory:    D0= A0[0];
MOVE.L  4(A0), D0       // Load next int:           D0= A0[1];

// === ARM asm ========================================================
add     r0, r0, #2      // Add immediate:   r0 += 2;
add     r0, r0, r1      // Add register:    r0 += r1;
add     r0, r1, r2      // Add registers:   r0= r1 + r2;

ldr     r0, [r2]        // Load int from memory:    r0= r2[0];
ldr     r0, [r2, #4]    // Load int from memory:    r0= r2[1];
ldmia   r2, {r0, r1}    // Load multiple:           r0= r2[0]; r1= r2[1];
```

<br/>

### 2) 변수들(Variables): 레지스터(register), 메모리(memory) 그리고 스택(stack)

고급 언어에는 변수들(variables)을 사용하여 데이터를 처리한다. `어셈블리`에서는 `레지스터(registers)`, `메모리(메모리 안의 특정 범위)`, 그리고 `스택(stack)`을 사용한다. `레지스터(register)`는 기본적으로 칩 자체 내부에 있는 변수이며, 매우 빠르게 접근이 가능하다. 그리고 레지스터들(registers)은 프로세서에 많이 존재하지 않는다. 

하지만 대부분의 프로그램들은 레지스터보다 훨씬 많은 수의 변수들이 필요하다. 따라서 변수들을 `메모리(memory)` 안에도 넣어서 사용할 수 있다. 메모리는 레지스터보다 훨씬 많은 바이트를 저장할 수 있지만 레지스터에 비해서 접근 속도가 훨씬 느리다. 그리고 중요한 점은 `레지스터`와 `메모리` 모두 `전역 변수들(global variables)`이라는 것이다. 만약 한 함수에서 값이 변경되면 프로그램의 나머지 영역에도 모두 영향을 미치게 된다. 

그리고 마지막으로 `지역 변수들(local variables)`은 바로 `스택(stack)`에 넣어서 사용한다. `스택(stack)` 또한 `메모리(memory)`의 특별한 영역으로서 `Last-In First-Out` 메커니즘을 사용한다. `스택 포인터(stack pointer)`라는 특별한 레지스터가 한 개 있는데, `스택 포인터(SP)`는 스택의 가장 `상위 주소(top address)`를 가리키고 있다. 변수를 스택의 상단에 `푸쉬(push)`하여 안전하게 저장하고, 데이터를 처리하고 난 뒤 변수 사용이 끝나면 `팝(pop)`을 통해 스택에서 삭제하며, 레지스터에 원래 저장되어 있던 값을 복원한다. 스택의 주소는 고정되어 있지 않으며 코드 함수의 호출이 계층이 깊어질수록 스택은 증가하며 반대로 계층이 얕아질수록 스택은 줄어든다. 이 때 중요한 점은 각 코드 블록은 데이터 처리가 끝나면 스택을 정리하여 해당 코드 블록이 실행되기 전과 스택 포인터 값이 동일하도록 해야 한다.

예를 들어 함수 `foo()`가 있는데 이 함수는 레지스터 A, B, C, D를 사용한다. 함수 `foo()`는 다른 함수 `bar()`를 호출하는데, 함수 `bar()` 역시 레지스터 A, B, C를 사용한다. 이 때 `foo()` 함수가 잘 동작하는 것을 보장하기 위해서는 `bar()` 함수는 시작할 때 레지스터 A, B, C를 스택에 `푸쉬(push)`한 뒤 해당 레지스터들을 원하는대로 사용한 다음 마지막에 함수를 리턴하기 전에 스택에 있던 값을 `팝(pop)`하여 레지스터 A, B, C 값을 `bar()` 함수를 호출하기 전으로 복구한다. 이 과정을 의사 코드로 나타내면 아래와 같다.

```assembly
// Use of stack in pseudo-asm

// Function foo
foo:
    // Push A, B, C, D onto the stack, saving their original values
    push    {A, B, C, D}

    // Use A-D
    mov     A, #1        // A= 1
    mov     B, #2        // B= 2
    mov     C, #3        // well, you get the idea
    call    bar
    mov     D, global_var0

    // global_var1 = A+B+C+D
    add     A, B
    add     A, C
    add     A, D
    mov     global_var1, A

    // Pop A-D, restoring then to their original values
    pop     {A-D}
    return

// Function bar
bar:
    // push A-C: stack now holds 1, 2, 3 at the top
    push    {A-C}

    // A=2; B=5; C= A+B;
    mov     A, #2
    mov     B, #5
    mov     C, A
    add     C, B

    // global_var0= A+B+C (is 2*C)
    add     C, C
    mov     global_var, C

    // A=2, B=5, C=14 here, which would be bad when we 
    // return to foo. So we restore A-C to original values.
    // In this case to: A=1, B=2, C=3
    pop     {A-C}
    return
```

<br/>

위의 의사코드는 비슷하지만 실제 어셈블리 코드는 아니다. 위의 코드는 레지스터의 사용에 있어서 매우 비효율적이지만 위 예제는 그저 스택의 사용을 보여주기 위함이다.

`foo()` 함수는 레지스터 A, B, C 값을 각각 1, 2, 3으로 설정(`mov` 명령어를 사용)하고 `bar()` 함수를 호출하는데, `bar()` 함수에서는 레지스터 A, B, C를 2, 5, 14로 설정한 다음 global_var 변수에 A+B+C 값을 할당한다. 이 때 레지스터 A, B, C의 값이 변경되기 때문에 `bar()` 함수에서 그냥 리턴할 경우 `foo()` 함수에서 사용하는 레지스터의 값이 바뀌게 된다. 따라서 이를 막기 위해서는 `bar()` 함수는 시작과 동시에 `스택`에 레지스터 A, B, C 값을 `푸쉬(push)`하여 저장하고 함수를 리턴하기 전에 다시 `스택`에 저장된 값을 `팝(pop)`하여 레지스터 A, B, C의 값을 복원한다. 

`레지스터` 값을 `스택`에 저장하는 것은 가이드라인일 뿐 의무사항은 아니다. `호출자(caller)`가 레지스터 값을 저장하고 복원하는 역할을 할 수도 있고, 또는 아예 `스택`을 사용하지 않고 `피호출자(callee)` 함수에서 변경한 레지스터 값들을 `리턴값(return values)`으로 사용할 수도 있다. 그리고 `스택`을 함수를 호출할 때 넘겨주는 `인자값(arguments)`을 저장하거나 `리턴값(return value)`을 저장하는데 사용할 수도 있다.






<br/>

<br/>

---

### References

\[1\] J Vijn. (2015, Jan 28). [Whirlwind Tour of ARM Assembly](https://www.coranac.com/tonc/text/asm.htm#sec-asm) [Web Blog Post]_

<br/>

### Hashtags

`#어셈블리` `#임베디드` `#ARM` `#Assembly` `#ARM Assembly` `#Advanced RISC Machine` `#embedded`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

# [ARM] 어셈블리 언어

<br/>

## 1. 서론(Introduction)

매우 넓게 범위를 나누었을 때, 우리는 프로그래밍 언어를 크게 `4가지`로 분류할 수 있다. 첫 번째는 가장 하위의(the lowest level) 언어인 `기계어(machine code)`이다. 기계어는 이진 숫자로 이루어진 CPU가 디코딩하여 바로 명령으로 이해할 수 있는 최하위 언어이다. 그리고 두 번째가 바로 우리가 다루게 될 `어셈블리(assembly)`이다. 어셈블리는 기계어를 단어로 표현한 것이라 할 수 있다. 따라서 각 `어셈블리 명령(assembly instruction)` 한 개는 `기계어 명령(machine code instruction)` 한 개와 1:1 매칭된다. 그리고 세 번째는 C언어와 같은 `컴파일 언어(compiled language)`이다. 컴파일 언어는 사람들이 읽고 이해하기 쉬운 문법을 갖고 있으며, 실행되기 전에 컴파일러에 의해 어셈블리 또는 기계어로 미리 컴파일되어야 한다. 그리고 마지막 네 번째는 `스크립크 언어(scripting language)` 또는 `인터프리트 언어(interpreted language)`이다. 대표적으로는 PHP, JavaScript, Python, Ruby 등이 있다. 스크립트 언어는 미리 컴파일되지 않고 실시간으로 한 줄씩 인터프리터에 의해 해석되어 실행되는 코드이다. 실시간으로 해석하기 때문에 상대적으로 컴파일 언어보다는 런타임 실행 속도가 느리지만 대신 빌드 시간이 필요하지 않다. 따라서 상위 언어(higher language)일 수록 사람이 읽고 사용하기 쉽고(easy) 코드 이식성(portability)이 좋아지지만 대신 실행속도는 더욱 느려지고 많은 헤더에 의해 코드의 크기가 증가한다. 최근에는 컴퓨터의 성능 향상으로 인해 이러한 실행 속도에 대한 단점이 많이 보완되기는 하였지만 임베디드 시스템(embedded system)과 같은 리소스가 제한된 환경에서는 여전히 어셈블리를 이용한 최적화 과정이 필요한 경우가 많다.

어셈블리로 프로그래밍하기 위해서는 컴파일러 또는 인터프리터가 없기 때문에 프로세서(CPU)가 어떻게 동작하는지를 정확하게 알아야 하며 이를 바탕으로 프로세서가 이해할 수 있도록 코드를 잘 작성해야만 한다. 어셈블리에서는 구조화된 `for` loop, `while` loop, 또는 `if/else` branch 등은 없으며 그저 `goto`만 존재한다. 또한 `struct`나 `class`, `상속(inheritance)` 그리고 심지어 `데이터 타입(data types)`도 존재하지 않는다. 따라서 어셈블리는 매우 anarchic하다고 볼 수 있지만 대신에 매우 빠른 속도를 제공한다.

실행속도와 코드 사이즈에 대한 이슈를 제외하고도 어셈블리를 배우는 것은 많은 장점을 제공한다. CPU가 어떻게 동작하는지를 이해할 수 있고 이것은 나중에 C언어로 프로그래밍을 하더라도 많은 도움이 된다. 예를 들면 코딩을 할 때 변수를 어떤 데이터 타입으로 선언하는 것이 가장 좋은지를 알 수 있다. ARM 프로세서는 32비트로 설계되었기 때문에 데이터 타입 중에서 int 타입을 가장 선호한다. 그리고 다른 타입은 int 타입에 비해 속도가 더 느리게 된다. 따라서 어셈블리를 공부하게 되면 왜 int 타입이 속도가 더 빠른지 이해할 수 있게 된다.

<br/>

## 2. 일반 어셈블리(General Assembly)












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

# [ARM KEIL] Scatter File Syntax

<br/>

## 8.1. BNF notation used in scatter-loading description syntax

scatter-loading 설명 문법은 `Backus-Naur Form (BNF)` 표기법을 사용한다. 아래의 표는 `scatter file(.sct)`에서 사용되는 BNF 기호들과 설명을 나타낸다.

| Symbol     | Description   |
|------------|---------------|
| "          | 리터럴 캐릭터로 사용되며 예를 들어, 정의 B"+"C 는 오직 B+C 패턴으로만 대체될 수 있다. 정의 B+C는 패턴 BC, BBC, BBBC로 대체될 수 있다.|
| A ::= B    | A를 B로 정의한다. 예를 들어, A::= B"+" &#124; C 는 A는 B+ 또는 C와 동일하다는 것을 의미한다. ::= 기호는 컴포넌트들에 대해서 상위 레벨의 구조체를 정의한다. 각 컴포넌트 역시 ::= 기호를 사용하여 더욱 단순한 컴포넌트들로 정의될 수 있다. 예를 들어 A::= B 와 B::= C &#124; D 일 경우에는 A는 C 또는 D와 동일한다. |
| [A]        | A는 선택적인 요소(optional element)를 나타낸다. 예를 들어 A::= B[C]D 는 A는 BD 또는 BCD로 확장될 수 있음을 나타낸다. |
| A+         | A는 한 번 이상 나타날 수 있다. 예를 들어 A::= B+ 는 정의 A는 B, BB 또는 BBB 등으로 확장될 수 있음을 나타낸다. |
| A*         | A는 0번 또는 한 번 이상 나타날 수 있다. |
| A &#124; B | A 또는 B가 나타날 수 있으며, 둘 중에 한 개만 발생가능하다. |
| (A B)      | A 와 B가 한 그룹으로 묶인다. 이 기호는 &#124; 연산자를 사용하거나 또는 복잡한 패턴이 반복될 때 유용하다. 예를 들어 A::=(B C)+ (D &#124 E) 는 정의 A는 BCD, BCE, BCBCD, BCBCE, BCBCBCD, BCBCBCE 등과 동일하다는 것을 의미한다. |

<br/>

## 8.2. Syntax of a scatter file

`스캐터 파일(scatter file)`은 한 개 이상의 `로드 구역(load region)`을 갖는다. 각 `로드 구역`은 한 개 이상의 `실행 구역(execution region)`을 갖는다. 아래의 그림은 일반적인 스캐터 파일의 컴포넌트들과 구조를 보여준다.

<br/>

<img src="../images/embedded-arm-keil-8.2.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

## 8.3. Load region descriptions

`로드 구역 설명(load region description)`은 `자식 실행 구역(child execution region)`이 메모리의 어느 구역에 위치해야 하는지를 명세한다.

<br/>

### 8.3.1. Components of a load region description

`로드 구역 설명(load region description)`의 `컴포넌트들(components)`은 로드 구역을 유일하게 식별하도록 하며, `ELF 파일`의 어떤 부분들이 해당 로드 구역에서 어느 곳에 위치해야 하는지를 컨트롤한다.

<br/>

`로드 구역 설명`은 아래와 같은 `컴포넌트들`을 가질 수 있다.

- `name`: `링커(linker)`가 서로 다른 `로드 구역(load region)`을 식별하기 위해 사용된다.
- `base address`: `로드뷰(load view)` 안의 `코드(code)` 또는 `데이터(data)`의 시작 주소를 나타낸다.
- `attributes`: 해당 `로드 구역(load region)`의 `속성(properties)`을 나타낸다.
- `optional maximum size`: 선택적인 최대 사이즈를 나타낸다.
- `execution region`: `로드 구역(load region)`은 한 개 이상의 `실행 구역(execution region)`을 가질 수 있다.

<br/>

아래의 그림은 일반적인 로드 구역 설명을 보여준다.

<br/>

<img src="../images/embedded-arm-keil-8.3.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 8.3.2. Syntax of a load region description

로드 구역은 한 개 이상의 실행 구역 설명을 갖는다. 로드 구역 설명은 BNF 문법을 사용하여 다음과 같이 정의된다.

```bash
load_region_description ::=
  load_region_name  (base_address  | ("+" offset)) [attribute_list] [max_size]
       "{"
          execution_region_description+ 
       "}"
```

- `load_region_name`: 해당 로드 구역의 이름을 정의한다. 이 이름은 구역과 관련된 링커 정의된 기호를 사용할 경우에만 대소문자를 구분한다.
- `base_address`: 구역 안의 오브젝트들이 링크되는 주소를 나타낸다. `base_address`는 정렬 제한(alignment constraints)를 만족해야 한다.
- `+offset`: 앞서 정의된 로드 구역의 마지막으로부터 해당 `offset` 바이트 만큼을 상쇄한 후에 기본 주소(base address)로 설정한다. 해당 `offset`은 반드시 `4의 배수`여야 한다. 만약 해당 로드 구역이 첫 번째 로드 구역일 경우에는, `+offset` 를 사용할 경우 0에서부터 해당 `offset` 바이트 만큼을 상쇄한 후에 `base address`가 설정된다. 만약 `+offset`을 사용할 경우 해당 로드 구역은 이전 로드 구역의 특정 `attributes`를 상속받는다.
- `attribute list`: 해당 로드 구역의 속성을 나타낸다.
- `max_size`: 해당 로드 구역의 최대 크기를 설정한다. 이 크기는 `압축 해제(decompression)` 또는 `zero initialization`이 발생하기 전의 로드 구역의 크기를 나타한다. `maz_size`가 정의되었을 때, 만약 해당 구역에 최대 크기를 넘어가는 바이트가 할당되었을 경우에는 `armlink`는 오류를 출력한다.
- `execution_region_description`: 실행 구역의 `이름(name)`, `주소(address)`, `컨텐츠(contents)`를 명세한다.

<br/>

### 8.3.3. Load region attributes

로드 구역은 `attribute`를 가질 수 있는데, 이를 이용하여 이미지(image)의 어느 부분들이 타겟 메모리에 로드되어야 하는지를 결정할 수 있다. 로드 구역에서 사용되는 `attribute`는 다음과 같다.

- `ABSOLUTE`: 컨텐트가 링킹(linking) 이후에 변경되지 않는 고정된 주소(fixed address)에 위치하는 경우 사용된다. 해당 구역의 로드 주소는 `base designator`에 의해 명시된다. 이것은 `PI` 또는 `RELOC`를 사용하지 않는 이상 디폴트이다.
- `ALIGN alignment`: `정렬 제한(alignment constraint)`을 4에서 해당 `alignment` 값으로 변경한다. `alignment` 값은 반드시 2의 배수인 양의 정수여야 한다. 만약 해당 로드 구역이 `base_address`를 갖고 있다면, 이 주소는 반드시 해당 `alignment` 값에 부합해야 한다. 만약 해당 로드 구역이 `+offset`을 갖고 있다면, 링커는 해당 구역의 계산된 `base address`를 정의된 `alignment` 값에 맞게 정렬한다. 이 값은 `ELF 파일` 안의 offset에도 영향을 미칠 수 있다. 예를 들어, 다음의 경우 `FOO`에 대한 데이터가 `ELF 파일` 안의 4k offset에 쓰여지도록 한다. `FOO +4 ALIGN 4096`
- `NOCOMPRESS`: `RW` 데이터 압축은 디폴트이다. `NOCOMPRESS` 키워드는 해당 로드 구역의 컨텐츠가 파이널 이미지(final image)에서 압축되지 않도록 한다.
- `OVERLAY`: 동일한 주소에 여러 개의 로드 구역을 설정할 수 있도록 한다. ARM 툴은 오버레이 메커니즘을 제공하지 않는다. 동일한 주소에 여러 개의 로드 구역을 설정하기 위해서는 독자적인 `오버레이 매니저(overlay manager)`를 사용해야 한다. 컨텐트는 링킹 이후에 변경되지 않는 고정된 주소에 위치한다. 해당 컨텐트는 `OVERLAY`로 설정된 다른 구역과 오버레이될 수 있다.
- `PI`: 이 구역은 `위치 독립적(position independent)`이다. 컨텐트는 어떠한 고정된 주소에도 의존하지 않으며, 링킹 이후에 위치가 변경될 수 있다.






<br/>

<br/>

---

### References

\[1\] arm KEIL. (?). [Scatter File Syntax](https://www.keil.com/support/man/docs/armlink/armlink_pge1362075650322.htm) [Web Blog Post]

<br/>

### Hashtags

`#스캐터 파일` `#임베디드` `#ARM` `#Scatter File` `#ARM KEIL` `#Advanced RISC Machine` `#embedded` `#scatter-loading description` `#sct file` `#.sct` `#uVision` `#µVision Keil` `#Keil Scatter File`

<br/>

<br/>

© 2021, Byeongcheol Yoo. All rights reserved.

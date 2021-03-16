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

`스캐터 파일(scatter file)`은 한 개 이상의 `로드구역(load region)`을 갖는다. 각 `로드구역`은 한 개 이상의 `실행구역(execution region)`을 갖는다. 아래의 그림은 일반적인 스캐터 파일의 컴포넌트들과 구조를 보여준다.

<br/>

<img src="../images/embedded-arm-keil-8.2.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

## 8.3. Load region descriptions

`로드구역 설명(load region description)`은 `자식 실행구역(child execution region)`이 메모리의 어느 구역에 위치해야 하는지를 명세한다.

<br/>

### 8.3.1. Components of a load region description

`로드구역 설명(load region description)`의 `컴포넌트들(components)`은 로드구역을 유일하게 식별하도록 하며, `ELF 파일`의 어떤 부분들이 해당 로드구역에서 어느 곳에 위치해야 하는지를 컨트롤한다.

<br/>

`로드구역 설명`은 아래와 같은 `컴포넌트들`을 가질 수 있다.

- `name`: `링커(linker)`가 서로 다른 `로드구역(load region)`을 식별하기 위해 사용된다.
- `base address`: `로드뷰(load view)` 안의 `코드(code)` 또는 `데이터(data)`의 시작 주소를 나타낸다.
- `attributes`: 해당 `로드구역(load region)`의 `속성(properties)`을 나타낸다.
- `optional maximum size`: 구역의 최대 사이즈를 나타낸다(선택사항).
- `execution region`: `로드구역(load region)`은 한 개 이상의 `실행구역(execution region)`을 가질 수 있다.

<br/>

아래의 그림은 일반적인 로드구역 설명을 보여준다.

<br/>

<img src="../images/embedded-arm-keil-8.3.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 8.3.2. Syntax of a load region description

로드구역은 한 개 이상의 실행구역 설명을 갖는다. 로드구역 설명은 BNF 문법을 사용하여 다음과 같이 정의된다.

```c
load_region_description ::=
  load_region_name  (base_address  | ("+" offset)) [attribute_list] [max_size]
       "{"
          execution_region_description+ 
       "}"
```

- `load_region_name`: 해당 로드구역의 이름을 정의한다. 이 이름은 구역과 관련된 링커 정의된 기호를 사용할 경우에만 대소문자를 구분한다.
- `base_address`: 구역 안의 오브젝트들이 링크되는 주소를 나타낸다. `base_address`는 정렬 제한(alignment constraints)를 만족해야 한다.
- `+offset`: 앞서 정의된 로드구역의 마지막으로부터 해당 `offset` 바이트 만큼을 상쇄한 후에 기본 주소(base address)로 설정한다. 해당 `offset`은 반드시 `4의 배수`여야 한다. 만약 해당 로드구역이 첫 번째 로드구역일 경우에는, `+offset` 를 사용할 경우 0에서부터 해당 `offset` 바이트 만큼을 상쇄한 후에 `base address`가 설정된다. 만약 `+offset`을 사용할 경우 해당 로드구역은 이전 로드구역의 특정 `attributes`를 상속받는다.
- `attribute list`: 해당 로드구역의 속성을 나타낸다.
- `max_size`: 해당 로드구역의 최대 크기를 설정한다. 이 크기는 `압축 해제(decompression)` 또는 `zero initialization`이 발생하기 전의 로드구역의 크기를 나타한다. `maz_size`가 정의되었을 때, 만약 해당 구역에 최대 크기를 넘어가는 바이트가 할당되었을 경우에는 `armlink`는 오류를 출력한다.
- `execution_region_description`: 실행구역의 `이름(name)`, `주소(address)`, `컨텐츠(contents)`를 명세한다.

<br/>

### 8.3.3. Load region attributes

로드구역은 `attribute`를 가질 수 있는데, 이를 이용하여 이미지(image)의 어느 부분들이 타겟 메모리에 로드되어야 하는지를 결정할 수 있다. 로드구역에서 사용되는 `attribute`는 다음과 같다.

- `ABSOLUTE`: 컨텐트가 링킹(linking) 이후에 변경되지 않는 `고정된 주소(fixed address)`에 위치한다. 해당 구역의 로드 주소는 `base designator`에 의해 명시된다. `ABSOLUTE`는 설정은 `PI` 또는 `RELOC`를 사용하지 않는 이상 디폴트이다.
- `ALIGN alignment`: `정렬 제한(alignment constraint)`을 4에서 해당 `alignment` 값으로 변경한다. `alignment` 값은 반드시 2의 거듭제곱인 양의 정수여야 한다. 만약 해당 로드구역이 `base_address`를 갖고 있다면, 이 주소는 반드시 해당 `alignment` 값에 부합해야 한다. 만약 해당 로드구역이 `+offset`을 갖고 있다면, 링커는 해당 구역의 계산된 `base address`를 정의된 `alignment` 값에 맞게 정렬한다. 이 값은 `ELF 파일` 안의 offset에도 영향을 미칠 수 있다. 예를 들어, 다음의 경우 `FOO`에 대한 데이터가 `ELF 파일` 안의 4k offset에 쓰여지도록 한다. `FOO +4 ALIGN 4096`
- `NOCOMPRESS`: `RW` 데이터 압축은 디폴트이다. `NOCOMPRESS` 키워드는 해당 로드구역의 컨텐츠가 파이널 이미지(final image)에서 압축되지 않도록 한다.
- `OVERLAY`: 동일한 주소에 여러 개의 로드구역을 설정할 수 있도록 한다. ARM 툴은 오버레이 메커니즘을 제공하지 않는다. 동일한 주소에 여러 개의 로드구역을 설정하기 위해서는 독자적인 `오버레이 매니저(overlay manager)`를 사용해야 한다. 컨텐트는 링킹 이후에 변경되지 않는 고정된 주소에 위치한다. 해당 컨텐트는 `OVERLAY`로 설정된 다른 구역과 오버레이될 수 있다.
- `PI`: 이 구역은 `위치 독립적(position independent)`이다. 컨텐트는 어떠한 고정된 주소에도 의존하지 않으며, 링킹 이후에 위치가 변경될 수 있다.

> ***Note***:  
아래의 `attribute`들은 이미지(image)가 `execute-only` 섹션을 포함할 경우에는 지원되지 않는다.

- `PROTECTED`: `Overlapping of load regions`, `Veneer sharing`, `String sharing with the --merge option` 세 가지를 방지한다.
- `RELOC`: 해당 구역이 `relocatable`하다. 컨텐트는 구정된 주소에 의존한다. 출력된 `재배치(relocation)` 정보를 바탕으로 다른 툴에 의해 컨텐트가 다른 곳으로 이동될 수 있다.

<br/>

### 8.3.4. Inheritance rules for load region address attributes

로드구역은 이전 로드구역의 `attributes` 상속받을 수 있다. 이전 로드구역의 `attributes`를 상속받기 위해서는 `+offset`을 사용하여 `base address`를 명시한다. 

아래의 경우에는 `attributes`를 상속받을 수 없다.

- 특정 로드구역에 명시적으로 `attribute`를 설정한 경우
- 바로 이전 로드구역이 `OVERLAY` `attribute`를 갖고 있는 경우

로드구역의 주소는 명시적으로 `ABSOLUTE`, `PI`, `RELOC`, `OVERLAY`로 설정될 수 있다. 만약 address attribute가 명시되어 있지 않다면 아래와 같은 상속 규칙들이 적용된다.

- `OVERLAY` attribute는 상속될 수 없다. `OVERLAY` attribute를 갖는 구역은 상속받을 수 없다.
- 로드구역 또는 실행구역의 `base address`는 `ABSOLUTE`가 디폴트로 설정된다.
- `+offset`을 사용할 경우 이전 로드구역의 address attribute를 상속받거나 만약 이전 로드구역이 없을 경우에는 `ABSOLUTE`로 설정된다.

#### Example

```c
LR1 0x8000 PI
{
    …
}
LR2 +0             ; LR2 inherits PI from LR1
{
    …
}
LR3 0x1000         ; LR3 does not inherit because it has no relative base
                     address, gets default of ABSOLUTE
{
    …
}
LR4 +0             ; LR4 inherits ABSOLUTE from LR3
{
    …
}
LR5 +0 RELOC       ; LR5 does not inherit because it explicitly sets RELOC
{
    …
}
LR6 +0 OVERLAY     ; LR6 does not inherit, an OVERLAY cannot inherit
{
    …
}
LR7 +0             ; LR7 cannot inherit OVERLAY, gets default of ABSOLUTE
{
    …
}
```

<br/>

### 8.3.5. Inheritance rules for the RELOC address attribute

로드구역에는 `RELOC` attribute를 명시적으로 설정할 수 있다. 하지만 실행구역은 오직 부모 로드구역으로부터만 `RELOC` attribute를 상속받을 수 있다.

#### Example

```c
LR1 0x8000 RELOC
{ 
    ER1 +0 ; inherits RELOC from LR1
    {
        …
    }
    ER2 +0 ; inherits RELOC from ER1
    {
        …
    }
    ER3 +0 RELOC ; Error cannot explicitly set RELOC on an execution region
    {
        …
    }
}
```

<br/>

### 8.3.6. Considerations when using a relative address +offset for a load region

로드구역에서 상대 주소(relative address)를 사용할 때는 몇 가지 고려할 사항들이 있다. 

- 만약 `+offset` 로드구역 LR2가 ZI 데이터를 갖는 로드구역 LR1를 따를 경우 LR2는 ZI 데이터를 덮어쓰기(overlap)한다. 이를 막기 위해서는 `ImageLimit()` 함수를 사용하여 LR2의 base address를 명시해야 한다.
- `+offset` 로드구역 LR2는 바로 이전의 로드구역 LR1의 attributes를 상속한다(하지만 만약 LR1이 `OVERLAY` attribute를 갖거나 LR2가 명시적인 attribute set을 갖을 경우에는 상속받지 않는다.) 그리고 만약 로드구역이 어떤 attribute를 상속받을 수 없는 경우에는 `ABSOLUTE` attribute를 갖는다.
- 만약 이전 로드구역에 만약 RW 데이터 압축이 적용되었을 경우에는 ROM image에서 `+offset` 로드구역과 이전 로드구역 사이에 갭(gap)이 있을 수 있다. 이것은 링커(linker)가 `+offset`을 계산할 때 이전 구역의 데이터가 압축되지 않았을 때를 기준으로 계산하기 때문이다. 하지만 이 갭(gap)은 RW 데이터가 로드 타임 때 압축 해제되면서 사라진다.

<br/>

## 8.4. Execution region descriptions

`실행구역 설명(execution region description)`은 런타임(run-time) 때 이미지(image)의 어떤 부분들이 어느 메모리 공간에 위치하는지 명시한다.

<br/>

### 8.4.1. Components of an execution region description

실행구역 설명의 컴포넌트들은 부모 로드구역 안에서 각 실행구역과 그 위치를 유일하게 식별하도록 한다. 그리고 ELF 파일의 어떤 부분들이 실행구역 안에 위치할 지 결정한다.

실행구역은 아래와 같은 컴포넌트들을 가질 수 있다.

- `name`: `링커(linker)`가 서로 다른 `실행구역(execution) region)`을 식별하기 위해 사용된다.
- `base address`: 절대주소 또는 상대주소일 수 있다.
- `attributes`: 해당 `실행구역(execution region)`의 `속성(properties)`을 나타낸다.
- `optional maximum size`: 구역의 최대 사이즈를 나타낸다(선택사항).
- `section descriptions`: 해당 실행구역에 위치하는 `모듈들(modules)`을 나타낸다.

<br/>

아래의 그림은 실행구역의 일반적인 컴포넌트들을 보여준다.

<img src="../images/embedded-arm-keil-8.4.1.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 8.4.2. Syntax of an execution region description

`실행구역(execution region)`은 런타임 때 `input sections`가 타겟 메모리의 어디에 위치해야 하는지를 명세한다.

실행구역 설명은 BNF 문법을 사용하여 다음과 같이 정의된다.

```c
execution_region_description ::= 
  exec_region_name (base_address | "+" offset) [attribute_list] [max_size | length]
        "{" 
            input_section_description* 
        "}"
```

- `exec_region_name`: 해당 실행구역의 이름이다. 만약 구역 관련된 링커 정의된 기호를 사용한다면 실행구역의 이름은 대소문자를 구분한다.
- `base_address`: 해당 구역 안의 `오브젝트들(objects)`이 어디에 링크될 지를 나타낸다. `base_address`는 반드시 `word-aligned` 되어야 한다.

> ***Note***:  
`실행구역`에서 `ALIGN`를 사용할 경우 `load address`와 `execution address` 모두 align 된다.

- `+offset`: 이전 실행구역의 끝에서부터 `offset` 바이트 만큼을 상쇄한 값을 `base address`로 설정한다. `offset` 값은 반드시 4의 배수여야 한다. 만약 로드구역에서 첫 번째 실행구역일 경우에는 해당 로드구역의 base address로부터 `offset` 만큼 상쇄한다. `+offset`을 사용할 경우 부모 로드구역 또는 같은 로드구역의 이전 실행구역으로부터  `attributes`를 상속받을 수 있다.
- `attribute_list`: 실행구역 컨텐츠들의 속성을 명세한다.
- `max_size`: `EMPTY` 또는 `FILL`로 표시된 경우에는 `max_size`는 실행구역 길이를 나타낸다. 그렇지 않은 경우에는 실행구역의 최대 크기를 나타낸다.
- `[-]length`: 오직 `EMPTY`와 함께 사용되며 아래로 증가(grows down)하는 메모리의 스택을 나타낸다. 만약 길이 값이 음수일 경우에는 `base_address`가 해당 구역의 end address로 취급된다.
- `input_section_description`: 컨텐트의 `input sections`를 명세한다.

<br/>

### 8.4.3. Execution region attributes

실행구역에 attributes를 사용하여 이미지(image)의 어떤 부분이 타겟 메모리의 어디에 위치할 지를 결정할 수 있다. 실행구역에서 사용되는 attribute는 아래와 같다.

- `ABSOLUTE`: 컨텐트가 고정된 주소에 위치하고 링킹(linking) 이후에도 주소가 변하지 않는다. base designator가 해당 구역의 실행 주소를 명세한다.
- `ALIgN alignment`: 정렬 제한을 4에서 `alignment` 값만큼 증가시킨다. `alignment` 값은 반드시 2의 거듭제곱 값이어야 한다. 만약 해당 실행구역이 `base_address`를 갖고 있을 경우 주소는 반드시 `alignment` 값에 부합해야 한다. 만약 실행구역이 `+offset`을 갖고 있을 경우, 링커는 계산된 base address를 `alignment` 바운더리에 정렬한다.

> ***Note:***  
실행구역에서 `ALIGN`을 사용하면 `load address`와 `execution address` 모두 정렬된다. 그리고 정렬(alignment)에 의해 ELF 파일에 패딩이 추가될 수 있다. `execution address`만 정렬하고 싶은 경우에는 base address 위에 `AlignExpr`을 사용한다.

- `ALIGNALL value`: 해당 실행구역에서 섹션들(sections)의 alignment를 증가시킨다. 이 값은 반드시 4 이상의 2의 거듭제곱 값이어야 한다.
- `ANY_SIZE max_size`: 해당 실행구역의 unassigned sections를 `armlink`가 채워넣을 수 있는 최대 크기이다. 

> ***Note:***  
`ANY_SIZE`를 사용하면 해당 구역의 `--any_contingency`의 효과를 덮어쓰게 된다. `max_size` 값은 반드시 해당 구역의 크기 이하여야 한다. 그리고 `ANY_SIZE`를 사용할 때 `.ANY` selector 없이 사용가능하다.

- `EMPTY [–]length`: 해당 구역에 빈 메모리 블록(empty block of memory)을 예약하는데, 일반적으로 `heap` 또는 `stack`에 의해 사용된다. `EMPTY` attribute를 갖는 구역에는 어떠한 section도 위치할 수 없다. `length` 값은 메모리에서 아래로 증가하는 `stack`을 나타낸다. 만약 길이 값이 음수라면, `base_address`는 해당 구역의 마지막 주소가 된다.
- `FILL value`: 해당 `value` 값을 갖는 링커 생성된 구역을 만든다. `FILL`을 사용할 경우 반드시 `value` 값을 설정해야 한다. 예를 들어 `FILL 0xFFFFFFFF` 와 같이 사용한다. `FILL` attribute는 `EMPTY ZEROPAD PADVALUE` 조합을 대체한다. 시뮬레이션과 같은 특정 상황에서는 어떤 구역을 특정값으로 채우는 것이 제로화 루프를 돌리는데 시간을 쓰는 것보다 훨씬 좋다.
- `FIXED`: 링커로 하여금 주소를 고정하여 `execution address`와 `load address`를 동일하게 만든다. 성공할 경우 해당 구역이 `root region`이 된다. 만약 실패할 경우 링커는 오류를 출력한다.

- `NOCOMPRESS`: RW 데이터 압축은 디폴트로 활성화되어 있다. `NOCOMPRESS` 키워드는 파이널 이미지에서 실행구역의 RW 데이터가 압축되지 않도록 한다.
- `OVERLAY`: 섹션들(sections)의 주소 범위를 오버레이한다. 만약 연속된 실행구역들이 `+offset`을 사용할 경우, 각 실행구역들은 동일한 `base address`를 갖는다. 컨텐트는 고정된 주소에 위치하며 링킹 이후에 변경되지 않는다. 컨텐트는 다른 `OVERLAY`된 구역들에 의해 덮어쓰여질 수 있다.
- `PADVALUE value`: `value` 값을 패딩으로 사용한다. `PADVALUE`를 사용할 경우 반드시 `value` 값을 명시해야 한다. 예를 들어 `EXEC 0x10000 PADVALUE 0xFFFFFFFF EMPTY ZEROPAD 0x2000` 과 같이 사용한다. 이 경우 `0xFFFFFFFF`로 패딩된 `0x2000` 크기의 구역이 생성된다. 그리고 `value`는 반드시 word 크기여야 한다. `load region`의 `PADVALUE`는 무시된다.
- `PI`: 해당 구역은 오직 위치 독립적인 섹션들(position independent sections)만 포함한다. 컨텐트는 고정 주소에 의존하지 않고 링킹 이후에 위치가 변경될 수 있다.
- `SORTTYPE algorithm`: 실행구역의 분류 알고리즘을 명세한다. 예를 들어 `ER1 +0 SORTTYPE CallTree` 와 같이 사용한다.

- `UNINIT`: 초기화되지 않은 데이터(uninitialized data) 또는 memory-mapped I/O를 포함하는 실행구역을 생성한다.

> ***Note: ***  
`UNINIT` attribute를 사용하면 커맨드라인 옵션에서 사용된 `--sort`의 분류 알고리즘을 덮어쓰기한다.

- `ZEROPAD`: EFL 파일 안에 0으로 초기화된 섹션이 쓰여진다. 따라서 런타임 때 0으로 채울 필요가 없다. 이 attribute를 사용할 경우 ZI 출력 섹션의 로드 길이(load length)는 `Image$$region_name$$Length`로 설정된다. 오직 `루트 실행구역들(root execution regions)`만 `ZEROPAD`를 이용하여 0으로 초기화될 수 있다. `non-root execution region`에서 `ZEROPAD`를 사용할 경우 무시된다. 시뮬레이션과 같은 특정 상황에서는 `ZEROPAD`를 사용하여 어떤 구역을 0값으로 채우는 것이 제로화 루프를 돌리는데 시간을 쓰는 것보다 훨씬 좋다.

<br/>

### 8.4.4. Inheritance rules for execution region address attributes

실행구역에서 이전 실행구역의 attributes를 상속받을 수 있다. 이전 실행구역의 attributes를 상속받기 위해서는 해당 구역의 `+offset` base address를 명시해야 한다. 첫 번째 `+offset` 실행구역은 부모 로드구역의 attributes를 상속할 수 있다.

아래의 경우에는 실행구역은 attributes를 상속받을 수 없다.

- 해당 실행구역에 명시적으로 attribute를 설정한 경우
- 이전 실행구역이 `OVERLAY` attribute를 갖는 경우. 실행구역에는 `ABSOLUTE`, `PI`, `OVERLAY` attributes를 설정할 수 있는데, 실행구역은 부모 로드구역으로부터 오직 `RELOC` attribute만 상속받을 수 있다.

아래는 address attribute가 명시되지 않았을 때 적용되는 상속 규칙이다.

- `OVERLAY` attribute는 상속될 수 없다. `OVERLAY` attribute를 갖는 구역은 상속받을 수 없다.
- 로드구역과 실행구역의 base address는 디폴트로 `ABSOLUTE`를 갖는다.
- `+offset` 실행구역은 이전 실행구역 또는 만약 이전 실행구역이 존재하지 않을 경우 부모 로드구역으로부터 `address attribute`를 상속받는다. 

<br/>

#### Example

이 예제는 실행구역의 address attributes 설정에 대한 상속 규칙을 보여준다.

```c
LR1 0x8000 PI
{
    ER1 +0         ; ER1 inherits PI from LR1
    {
        …
    }
    ER2 +0         ; ER2 inherits PI from ER1
    {
        …
    }
    ER3 0x10000    ; ER3 does not inherit because it has no relative base
                     address and gets the default of ABSOLUTE
    {
        …
    }
    ER4 +0         ; ER4 inherits ABSOLUTE from ER3
    {
        …
    }
    ER5 +0 PI      ; ER5 does not inherit, it explicitly sets PI
    {
        …
    }
    ER6 +0 OVERLAY ; ER6 does not inherit, an OVERLAY cannot inherit
    {
        …
    }
    ER7 +0        ; ER7 cannot inherit OVERLAY, gets the default of ABSOLUTE
    {
        …
    }
}
```

<br/>

### 8.4.5. Considerations when using a relative address +offset for execution regions

실행구역에서 상대 주소를 사용할 때 고려해야 하는 사항들이 몇 가지 있다. `+offset`을 사용하여 실행구역의 base address를 명세할 경우 다음과 같은 규칙들이 적용된다.

- 첫 번째 실행구역은 명시적으로 attribute를 설정하지 않는 한 부모 로드구역으로부터 `attributes`를 상속한다.
- `+offset`을 사용하는 실행구역 `ER2`는 바로 직전의 실행구역 `ER1`의 attributes를 상속받는다. 하지만 `ER1`이 `OVERLAY` attribute를 갖거나 또는 `ER2`가 명시적으로 attribute set을 설정한 경우는 예외이다. 만약 실행구역이 어떤 attribute를 상속받을 수 없는 경우에는 자동으로 `ABSOLUTE` attribute로 설정된다.
- 만약 부모 로드구역이 `RELOC` attribute를 갖는 경우에는 해당 로드구역 안의 모든 실행구역들은 반드시 `+offset` base address를 가져야 한다. 

<br/>

## 8.5. Input section descriptions

입력섹션 설명은 입력섹션을 식별하는 패턴이다.

<br/>

### 8.5.1. Components of an input section description.

입력섹션 설명은 해당 실행구역 안의 ELF 파일의 부분들을 식별하게 해준다. 입력섹션 설명은 다음을 이용해 입력섹션을 식별한다.

- `Module name`: `object filename`, `library member name`, `library filename`이다. 모듈 이름에는 wildcard character를 사용할 수 있다. 
- `Input section name`
- `Input section attribute`: `READ-ONLY`, `CODE`. 섹션 이름에는 wildcard character를 사용할 수 있다.
- `Symbol name`

아래의 그림은 일반적인 입력섹션 설명을 보여준다.

<img src="../images/embedded-arm-keil-8.5.1.1.png?raw=true" alt="drawing" width="640"/>

<br/>

> ***Note:***  
실행구역 안의 섹션 순서는 출력 이미지(image)에서 섹션의 순서에 영향을 주지 않는다.

<br/>

#### Input section descriptions when linking partially-linked objects

부분 링크된(partially-linked) 오브젝트(objects)는 입력섹션 설명에 명세할 수 없다. 오직 결합된(combined) 오브젝트 파일(object file)만 명세할 수 있다.

예를 들어, 만약 부분 링크된 오브젝트들 obj1.o, obj2.o, obj3.o를 obj_all.o로 함께 링크하면 결과 오브젝트에는 각 컴포넌트 오브젝트 이름(component object name)은 삭제된다. 따라서 obj1.o와 같이 각 오브젝트를 이름으로 참조할 수 없다. 오직 결합된 오브젝트 obj_all.o만 참조할 수 있게 된다.

<br/>

### 8.5.2. Syntax of an input section description.

입력섹션 설명은 부모 실행구역에 어떤 입력 섹션들이 로드될 지를 명세한다. BNF 문법으로 나타낸 입력섹션 설명의 문법은 다음과 같다.

```
input_section_description ::= 
  module_select_pattern [ "(" input_section_selector ( "," input_section_selector )* ")" ]
input_section_selector ::= "+" input_section_attr
        | input_section_pattern
        | input_symbol_pattern
        | section_properties
```

<br/>

- `module_select_pattern`: 리터럴 텍스트로부터 생성된 패턴이다. `module_select_pattern`이 아래 중 한 가지와 매칭될 때 입력섹션은 `module_select_pattern`과 매칭된다.

1. 해당 섹션을 포함하는 오브젝트 파일의 이름
2. 라이브러리 멤버의 이름(앞에 붙는 경로 이름 없이)
3. 해당 섹션이 추출된 라이브러리의 전체 이름(full name). 만약 이름이 공백을 포함할 경우 wildcard character를 사용하여 검색을 단순화한다. 예를 들어, `*libname.lib` 를 사용하여 `C:\lib dir\libname.lib` 를 매칭할 수 있다.

wildcard character `*`는 0개 이상의 문자를 매칭하고, `?`는 1개의 문자를 매칭한다. 매칭은 대소문자를 구분하지 않는다(파일 이름에 대소문자를 구분하는 호스트에서도 매칭 시 대소문자를 구분하지 않는다.)

`*.o`를 사용하여 모든 오브젝트들을 매칭할 수 있다. `*`를 사용하여 모든 오브젝트 파일과 라이브러리들을 매칭할 수 있다. 

`"file one.o"`과 같이 따옴표로 묶인 파일이름을 사용할 수도 있다. 

한 스캐터 파일 안에는 두 개의 `*` selector를 가질 수 없다. 하지만 두 개의 변형된 selectors는 가질 수 있는데, 예를 들어, `*A`와 `*B`처럼 가질 수 있다. 

`.ANY` selector를 `*` module selector와 함께 사용할 수 있다. `*` module selector는 `.ANY` selector 보다 높은 우선순위를 갖는다. 만약 `*` selector를 갖는 부분이 파일에서 제거되면 `.ANY` selector가 활성화된다.

`input_section_attr`: 입력섹션 attributes에 대하여 매칭된 attribute selector이다. 각 `input_section_attr`은 `+`를 앞에 붙인다. `selectors`는 대소문자를 구분하지 않는다. 아래와 같은 `selectors`가 사용된다.

- `RO-CODE`
- `RO-DATA`
- `RO`, selects both `RO-CODE` and `RO-DATA`.
- `RW-DATA`
- `RW-CODE`
- `RW`, selects both `RW-CODE` and `RW-DATA`.
- `XO`.
- `ZI`.
- `ENTRY`, that is, a section containing an `ENTRY point`.

<br/>

아래는 동일한 의미를 갖는 기호들이다.

- `CODE` for `RO-CODE`
- `CONST` for `RO-DATA`
- `TEXT` for `RO`
- `DATA` for `RW`
- `BSS` for `ZI`

<br/>

다음과 같은 `pseudo-attributes`가 사용가능하다.

- `FIRST`
- `LAST`

만약 섹션 순서가 중요한 경우에는 `FIRST`와 `LAST`를 사용하여 해당 실행구역에서 첫 번째와 마지막 섹션을 표시할 수 있다. 예를 들어, 특정 `input section`이 첫 번째로 와야하고 checksum을 포함하는 `input section`이 마지막에 와야하는 경우에 사용한다. 

> ***Note:***  
`FIRST`와 `LAST`는 basic attribute의 분류 순서를 위반해서는 안 된다. 예를 들어 `FIRST RW`는 반드시 어떠한 `read-only code` 또는 `read-only data` 이후에 위치해야 한다.

한 실행구역 안에는 반드시 한 개의 `FIRST`와 한 개의 `LAST`만 존재할 수 있다. 그리고 반드시 한 개의 `input_section_selector` 이후에 나와야 한다.

예를 들어 `* (section, +FIRST)` 는 올바른 패턴이다.

하지만 `* (+FIRST, section)`은 잘못된 패턴이며 오류를 출력한다.

<br/>

- `input_section_selector`: input section name에 대해 대소문자 구분없이 매칭된 패턴이다. 리터럴 텍스트로 만들어진다. wildcard character `*`는 0개 이상의 캐릭터와 매칭되며, `+`는 1개의 캐릭터와 매칭된다. input section name에 따옴표로 묶인 이름을 사용할 수 있다.

> ***Note:***  
만약 1개 이상의 `input_section_pattern`을 사용할 경우, 반드시 다른 실행구역들 안에 동일한 패턴이 없도록 해야 불명확함(ambiguity)에 대한 오류를 피할 수 있다.

<br/>

- `input_symbol_pattern`: 해당 섹션이 정의하는 global symbol의 이름을 통해 input section을 선택할 수 있다. partially-linked objects에서 동일한 이름을 통해 개별의 섹션들을 선택할 수 있다. `:gdef:` 접두어를 사용하여 section pattern으로부터 global symbol pattern을 구분할 수 있다. 예를 들어, `gdef:mysym`을 사용하여 `mysym`을 정의하는 섹션을 선택할 수 있다. 다음의 예제에서는 `ExecReg1` 실행구역은 `mysym1` global symbol을 정의하는 섹션과, `mysym2` global symbol을 정의하는 섹션을 포함한다.

```cLoadRegion 0x8000
{
    ExecReg1 +0
    {
        *(:gdef:mysym1)
        *(:gdef:mysym2)
    }
                        ; rest of scatter-loading description
}

```

따옴표로 묶인(quoted) `global symbol pattern`을 사용할 수 있다. `:gdef` 접두어는 따옴표 내부와 외부에 위치가능하다.

<br/>

> ***Note:***  
만약 1개 이상의 `input_symbol_pattern`을 사용할 경우, 반드시 다른 실행구역들 안에 동일한 패턴이 없도록 해야 불명확함(ambiguity)에 대한 오류를 피할 수 있다.

<br/>

- input section descriptors의 순서는 중요하지 않다.
- `module_select_pattern`과 최소한 한 개의 `input_section_attr` 또는 `input_section_pattern`과 매치되는 `input sections`만 실행구역에 포함된다. 만약 `(+ input_section_attr)`과 `(input_section_pattern)`을 생략할 경우 디폴트는 `+RO` 이다.
- 컴파일러 또는 ARM 라이브러리 코드에 의해 생성되는 `input section names`에 의존해서는 안 된다. 예를 들어 다른 컴파일 옵션을 사용할 경우 이 이름들은 컴파일 과정에서 변경될 수 있다. 게다가 컴파일러에서 사용되는 section naming convention은 컴파일러 버전에 따라 바뀔 수 있다.
- `BNF` 문법으로 표현된 정의 예제에는 가독성을 높이기 위해 return과 space가 삽입되어 있지만 실제 `scatter-loading descriptions`에서 필수적인 사항은 아니다. 

<br/>

#### 8.5.3. Examples of module and input section specifications.

`module_select_pattern` 예는 다음과 같다.

- `*`: 아무 module 또는 library와 매칭된다.
- `*.o`: 아무 오브젝트 module과 매칭된다.
- `math.o`: `math.o` module과 매칭된다.
- `*armlib*` ARM에서 제공하는 모든 C libraries와 매칭된다.
- `"file 1.o"`: `file 1.o` module과 매칭된다.
- `*math.lib`: `match.lib`로 끝나는 모든 library path와 매칭된다. 예를 들어, `C:\apps\lib\math\satmath.lib`와 매칭된다.

<br/>

`input_section_selector`의 

- `+RO`: 모든 `RO code`와 모든 `RO data`와 매칭되는 `input section attribute`
- `+RW, +ZI`: 모든 `RW code`, 모든 `RW data`, 모든 `ZI data`와 매칭되는 `input section attribute`
- `BLOCK_42`: `BLOCK_42`라는 이름을 가진 섹션들과 매칭되는 `input section pattern`. 서로 다른 attributes를 갖는 동일한 `BLOCK_42` 이름을 갖는 여러 개의 ELF 파일이 존재할 수 있다. 예를 들어 `+RO-CODE,+RW` 를 사용할 수 있다.

<br/>

## 8.6. Expression evaluation in scatter files.

스캐터 파일은 종종 상수들(numeric constants)을 포함하는데, 이것들은 구체적인 값일 수도 있고 또는 어떤 표현의 결과일 수도 있다.

<br/>

### 8.6.1. Expression usage in scatter files.

expression은 다양한 로드구역과 실행구역 attributes에서 사용될 수 있다. expression은 다음과 같은 곳에 사용될 수 있다.

- 로드구역과 실행구역의 `base_address`
- 로드구역과 실행구역의 `+offset`
- 로드구역과 실행구역의 `max_size`
- `ALIGN`, `FILL`, `PADVALUE`의 파라미터
- `ScatterAssert` 함수의 파라미터

<br/>

#### Example of specifying the maximum size in terms of an expression

```c
LR1 0x8000 (2 * 1024)
{
    ER1 +0 (1 * 1024)
    {
        *(+RO)
    }
    ER2 +0 (1 * 1024)
    {
        *(+RW +ZI)
    }
}
```

<br/>

### 8.6.2. Expression rules in scatter files

expressions는 C-Precedence 규칙을 따른다. expressions는 다음의 요소들로 구성된다.

- `10진수(decimal number)` 또는 `16진수(hexadecimal number)`
- `산술 연산자(arithmetic operators)`: `+`, `-`, `/`, `*`, `~`, `OR`, `AND`. 이 때 `OR`, `AND`는 각각 C언어에서 `|`, `&` 연산자와 동일하다.
- `논리 연산자(logical operators)`: `LOR`, `LAND`, `!`. 이 때 `LOR`, `LAND`는 각각 C언어에서 `||`, `&&` 연산자와 동일하다.
- `관계 연산자(relational operators)`: `<`, `<=`, `>`, `>=`, `==`. expression이 false일 경우 0이 리턴되고, true일 경우에는 0이 아닌 값이 출력된다.
- `조건 연산자(operational operators)`: `Expression ? Expression1 : Expression2`. 이것은 C언어의 조건 연산자와 동일하며, Expression이 0이 아닌 경우 Expression1이 되고, 0인 경우에는 Expression2가 된다.
- 숫자를 리턴하는 `함수(functions)`

> ***Note:***  
로드구역이나 실행구역에서 `+offset`에서 조건 연산자를 사용할 때 `Expression1`과 `Expression2`가 둘 다 상대주소 형태여야 해당 expression이 상대주소로 인식된다. 아래의 예제에서 `er3`에서는 `+0`은 상대주소 표현이더라도 `0x0`은 절대주소이기 때문에 절대주소로 인식된다.

#### Example

```c
er1 0x8000
{
    …
}
er2 ((ImageLimit(er1) < 0x9000) ? +0 : +0x1000)    ; er2 has a relative address
{
    …
}
er3 ((ImageLimit(er2) < 0x10000) ? 0x0 : +0)       ; er3 has an absolute address
{
    …
}
```

<br/>

expression은 대소문자를 구분하지 않으며, `괄호()`로 묶여서 명확하게 나타낼 수도 있다.

<br/>

### 8.6.3. Execution address built-in functions for use in scatter files

스캐터 파일에는 `실행 주소(execution address)`를 계산하기 위해 `내장된 함수들(built-in functions)`이 제공된다. `실행 주소`와 관련된 함수들은 오직 `base_address`, `+offset`, `max_size`를 명시할 때만 사용할 수 있다. 이것들은 아래 테이블에 나타난 것처럼 링커 정의된 기호들 조합과 매칭된다.

<img src="../images/embedded-arm-keil-8.6.3.1.png?raw=true" alt="drawing" width="960"/>

`region_name` 파라미터는 로드구역 또는 실행구역 이름이 될 수 있다. 이 때 로드구역 또는 실행구역의 이름은 이전에 이미 정의되어 있어야 한다.

<br/>

> ***Note:***  
`.ANY` selector pattern을 사용할 때는 이 함수들을 사용할 수 없다. 왜냐하면 `.ANY` 구역은 섹션을 할당할 때 최대 크기를 사용하기 때문이다. 그 시점에 최대 크기는 사용가능하지 않을 수도 있는데, 왜냐하면 모든 구역의 크기는 `.ANY` 할당 이후 전까지는 알 수 없기 때문이다.

<br/>

아래의 예제는 `mageLimit(region_name)` 함수를 사용하여 실행구역의 주소를 정의하는 것을 보여준다.

```c
LR1 0x8000
{
    ER1 0x100000
    {
        *(+RO)
    }
}
LR2 0x100000
{
    ER2 (ImageLimit(ER1))               ; Place ER2 after ER1 has finished
    {
        *(+RW +ZI)
    }
}
```

<br/>

#### Using +offset with expressions

실행구역에서 `+offset` 값은 이전 구역에 의해 정의된다. 그리고 `+offset`은 아래의 예제처럼 `AlignExpr`과 같은 다른 expressions의 입력으로 들어갈 수 있다.

```c
LR1 0x4000
{
    ER1 AlignExpr(+0, 0x8000)
    {
        …
    }
}
```

`AlignExpr`을 사용하여 `+0`의 결과가 `0x8000` 경계에 맞춰 정렬된다. 이 경우 `로드 주소(load address)`는 `0x4000`이고, `실행 주소(execution address)`는 `0x8000`인 `실행구역(execution region)`이 생성된다.

<br/>

### 8.6.4. ScatterAssert function and load address related functions

`ScatterAssert` 함수는 `max_size` attribute에 의해 설정된 것보다 더욱 복잡한 크기 검사를 수행한다.

`ScatterAssert(expression)` 함수는 최상위 계층에서 사용되거나 로드 구역(load region)에서 사용될 수 있다. 이 함수는 링크가 완료된 이후에 평가되며, 만약 `expression`이 false일 경우 오류를 출력한다.

`로드 주소(load address)`와 관련된 함수들은 오직 `ScatterAssert` 함수 안에서만 사용될 수 있다. 그리고 아래의 테이블과 같이 3개의 링커 정의된 기호들과 매핑된다.

<img src="../images/embedded-arm-keil-8.6.4.1.png?raw=true" alt="drawing" width="480"/>

<br/>

`region_name`은 로드구역 또는 실행구역의 이름이다. `region_name`에 해당하는 로드구역 또는 실행구역은 반드시 이전에 미리 정의되어 있어야 한다. 아래의 예제는 `ScatterAssert` 함수를 사용하여 `max_size` attribute로 설정된 것보다 더욱 복잡한 크기 검사를 진행하는 것을 보여준다.

```c
LR1 0x8000
{
    ER0 +0
    {
        *(+RO)
    }
    ER1 +0
    {
        file1.o(+RW)
    }
    ER2 +0
    {
        file2.o(+RW)
    }
    ScatterAssert((LoadLength(ER1) + LoadLength(ER2)) < 0x1000)
                                         ; LoadLength is compressed size
    ScatterAssert((ImageLength(ER1) + ImageLength(ER2)) < 0x2000)
                                         ; ImageLength is uncompressed size
}
ScatterAssert(ImageLength(LR1) < 0x3000) 
                                         ; Check uncompressed size of load region LR1
```

<br/>

### 8.6.5. Symbol related function in a scatter file

기호 관련 함수인 `defined`는 `global symbol`이 정의되어 있는지 아닌지에 따라 다른 값을 할당한다.

기호 관련 함수인 `defined(global_symbol_name)`은 만약 `global_symbol_name`이 정의되어 있지 않으면 0을 출력하고 그렇지 않으면 0이 아닌 값을 출력한다.

<br/>

#### Example

아래의 스캐터 파일은 `version1` 기호에 따라 `base address`를 다르게 정의하는 예제를 보여준다.

```c
LR1 0x8000
{
    ER1 (defined(version1) ? 0x8000 : 0x10000)   ; Base address is 0x8000
                                                 ; if version1 is defined
                                                 ; 0x10000 if not
    {
        *(+RO)
    }
    ER2 +0
    {
        *(+RW +ZI)
    }
}
```

<br/>

### 8.6.6. AlignExpr(expr, align) function

address expression을 특정 바운더리에 정렬한다.

이 함수는 `(expr + (align-1)) & ~(align-1))`를 리턴한다.

- `expr`은 유효한 `address expression`이다.
- `align`은 `alignment`이며, 반드시 2의 거듭제곱 값이다.

`expr`을 `expr ≡ 0 (mod align)`까지 증가시킨다.

<br/>

#### Example

아래 예제는 `ER2`의 주소를 8바이트 바운더리에 정렬한다. 

```c
ER +0
{
    …
}
ER2 AlignExpr(+0x8000,8)
{
    …
}
```

<br/>

#### Relationship with the ALIGN keyword

`ALIGN`과 `AlignExpr` 사이에는 다음과 같은 관계가 있다.

`ALIGN` keyword:
- `로드구역(load region)`에 대해서는 `ALIGN` 키워드는 `load space`와 `file` 안의 `load region`의 `base address`를 명시된 값으로 정렬한다.
- `실행구역(execution region)`에 대해서는 `execution space`와 `load space` 안의 `execution region`의 `base address`를 명시된 값으로 정렬한다.

`AlignExpr`:
운영되는 expression을 정렬한다. 하지만 로드구역 또는 실행구역의 속성에는 영향을 끼치지 않는다.

<br/>

### 8.6.7. GetPageSize() function

`GetPageSize` 함수는 `이미지(image)`가 `demand paged`일 때 페이지 크기(page size)를 리턴한다. 그리고 `AlignExpr` 함수와 함께 사용하면 유용하다.

`--paged` 커맨드라인 옵션과 함께 링크할 때, `armlink`가 alignment 계산에서 사용하는 내부 페이지 크기를 리턴한다.

디폴트로 내부 페이지 크기는 `8000`으로 설정되며, 커맨드라인 옵션의 `--pagesize`를 사용하여 변경할 수 있다.

<br/>

#### Example 

아래의 예제는 `ER`의 `base address`를 `Page Boundary`로 정렬한다.

```c
ER AlignExpr(+0, GetPageSize())
{
    …
}
```

<br/>

### 8.6.8. SizeOfHeaders() function

`ELF 헤더의 크기` + 평가된 `프로그램 헤더 테이블(Program Header table) 크기`를 리턴한다.

이 함수는 `ELF 헤더`와 `Program Header table` 바로 이후에 `demand paged` 이미지(image)의 `code`와 `data`가 시작하도록 할 때 유용하다.

<br/>

#### Example

아래의 예제는 `LR1`의 base address를 ELF header와 Program Headers 직후에 시작하도록 설정한다.

```c
LR1 SizeOfHeaders()
{
    …
}
```

<br/>

### 8.6.9. Example of aligning a base address in execution space but still tightly packed in load space

아래의 예제는 preprocessor macros와 expressions 조합을 사용하여 tightly packed된 실행구역들을 page-boundary 안의 execution addresses에 복사하는 방법을 보여준다.

`ALIGN` scatter-loading 키워드를 사용하여 `ER2`, `ER3`의 load addresses와 execution addresses를 정렬한다.

<br/>

#### Example: aligning a base address in execution space but still tightly packed in load space

```c
#! armcc -E
#define START_ADDRESS  0x100000
#define PAGE_ALIGNMENT 0x100000

LR1 0x8000
{
    ER0 +0
    {
        *(InRoot$$Sections)
    }
    ER1 START_ADDRESS
    {
        file1.o(*)
    }
    ER2 AlignExpr(ImageLimit(ER1), PAGE_ALIGNMENT)
    {
        file2.o(*)
    }
    ER3 AlignExpr(ImageLimit(ER2), PAGE_ALIGNMENT)
    {
        file3.o(*)
    }
}
```

<br/>

### 8.6.10. Scatter files containing relative base address load regions and a ZI execution region

`zero-initialized(ZI) data`는 하나의 `로드 구역`에 넣고, 다음 `로드 구역`에는 `relative base address`를 사용하고 싶을 수 있다.

다음 예제는 `ZI data`는 `LR1` `로드구역`에 위치하고, 그 다음 `로드구역`인 `LR2`에는 `relative base address`를 사용하는 것을 보여준다.

```c
LR1 0x8000
{
    er_progbits +0
    {
        *(+RO,+RW) ; Takes space in the Load Region
    }
    er_zi +0
    {
        *(+ZI) ; Takes no space in the Load Region
    }
}
LR2 +0 ; Load Region follows immediately from LR1
{
    er_moreprogbits +0
    {
        file1.o(+RO) ; Takes space in the Load Region
    }
}
```

<br/>

링커는 `ZI data`를 주기 위해 `LR2`의 `base address`를 조정하지 않기 때문에 `er_zi` 실행구역은 `er_moreprogbits` 실행구역을 오버랩하며, 이것은 링킹할 때 오류를 출력한다. 다음 예제에서는 이를 바로잡기 위해서, `ZI` 실행구역의 이름과 함께 `ImageLimit()` 함수를 사용하여 LR2의 base address를 계산한다.

```c
LR1 0x8000
{
    er_progbits +0
    {
        *(+RO,+RW) ; Takes space in the Load Region
    }
    er_zi +0
    {
        *(+ZI) ; Takes no space in the Load Region
    }
}
LR2 ImageLimit(er_zi) ; Set the address of LR2 to limit of er_zi
{
    er_moreprogbits +0
    {
        file1.o(+RO) ; Takes space in the Load Region
    }
}
```

<br/>






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

# Recursive Length Prefix(RLP)

`RLP`는 무작위로(arbitrarily) nested된 `binary data` arrays를 인코딩(encoding)하는 방법이다. `RLP`는 이더리움에서 오브젝트(object)를 시리얼라이즈(serialize)하는 방법으로 사용된다. `RLP`는 오직 데이터의 구조(structure)를 인코딩하기 위한 것이며, 특정 구체적인 데이터 타입(e.g. strings, floats)을 인코딩하는 것은 상위 프로토콜에서 처리한다. 하지만 `RLP`에서 `양의 정수(positive integer)`는 반드시 `빅 엔디안(big endian)` 바이너리 형태(binary form)로 나타내며 이 때 `leading zeros`는 표시하지 않는다. 따라서 값이 0인 경우에는 `empty byte array([])`로 나타낸다. 그러므로 만약 RLP 디코딩된 양의 정수값의 앞에 `leading zeros`가 있다면 이것은 잘못된 값이다. 그리고 `string`의 길이에 대한 정수 표현과 `payload`의 정수 표현도 이와 동일한 방식으로 처리돼야 한다. 추가적인 설명은 이더리움 [Yellow Paper][2]의 `Appendix B`에 자세히 나와있다.

> ***참고사항*** :  
`RLP` 인코딩은 추후에 [Blob serialization][1]으로 대체될 예정이다. 이것은 `sharding clients`에 구현되어 있다.

<br/>

`RLP`를 이용하여 어떤 `dictionary`를 인코딩할 때 제안되는 `canonical forms`는 `[[k1,v1],[k2,v2]... ]`를 `lexicographical order`로 정렬된 `keys`와 함께 사용하거나 또는 이더리움에서처럼 상위레벨의 `Patricia Tree` 인코딩을 사용하는 것이다.

> ***참고사항*** :  
`lexicographic order` 또는 `lexical order`란 어떤 `words`의 `component letters`의 알파벳 순서에 기반하여 해당 `words`를 `알파벳 순서로(alphabetically ordered)` 정렬하는 방식을 `일반화(generalization)`하는 방법이다. 이 때 `generalization`은 어떤 유한한 정렬된 집합의 요소들의 `sequences`에 대해 `전체 순서(total order)`를 `정의(defining)`하는 것 위주로 구성되어 있다.

<br/>

## 1. RLP Encoding

`RLP` 인코딩 함수는 어떤 `아이템(item)`을 입력으로 받는데, 이 아이템은 다음과 같이 정의된다.

- 어떤 `string`(e.g. `byte array`)은 `item`이다.
- 어떤 `list of items`는 `item`이다.

<br/>

예를 들어 어떤 `empty string`은 `item`이고, `"cat"`이라는 단어를 포함하는 `string`도 `item`이며, 어떤 `list of any number of strings`도 `item`이며, 그리고 다음과 같은 매우 복잡한 데이터 구조도 모두 `item`이다.

```
["cat",["puppy","cow"],"horse",[[]],"pig",[""],"sheep"]
```

<br/>

그리고 이 글에서는 `"string"`은 binary data로 된 `bytes`와 동일하다.

<br/>

`RLP 인코딩` 방법은 다음과 같다.

1. 만약 `[0x00, 0x7f]` 범위에 있는 `single byte`라면 해당 `byte`는 그 자체로 RLP 인코딩된 것이다.
2. 어떤 `string`이 `0-55 bytes`의 길이를 갖는 경우에는 RLP 인코딩은 (`0x80` + `string.length`) 값의 `single byte` | `string`으로 이루어진다. 따라서 해당 첫 바이트의 범위는 `[0x80, 0xb7]`이다.
3. 어떤 `string`이 `55 bytes`보다 큰 길이를 갖는 경우에는 RLP 인코딩은 (`0xb7` + (`string.length`를 나타내는 데이터의 길이))의 `single byte` | `string.length` | `string`으로 이루어진다. 예를 들어 어떤 1024 bytes 길이의 `string`을 RLP 인코딩하면 다음과 같다. `0xb9` | `0x04` | `0x00` | `string`
4. 만약 어떤 list의 `total payload`(즉 해당 리스트의 모든 RLP 인코딩된 `items`들의 길이의 합)가 `0-55 bytes` 사이라면, RLP 인코딩은 (`0xc0` + `list.length`) | (RLP 인코딩된 `items`)로 표현된다. 따라서 첫 번재 바이트의 범위는 `[0xc0, 0xf7]` 사이이다.
5. 만약 어떤 list의 `total payload`가 55 bytes 보다 크다면, RLP 인코딩은 (`0xf7` + (`payload.length`를 나타내는 데이터의 길이))의 `single byte` | `payload.length` | RLP 인코딩된 `items`로 이루어진다. 따라서 첫 번째 바이트의 범위는 `[0xf8. 0xff]`이다.

<br/>

`RLP 인코딩` 과정을 코드로 나타내면 다음과 같다.

```scala
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80: return input
        else: return encode_length(len(input), 0x80) + input
    elif isinstance(input,list):
        output = ''
        for item in input: output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L,offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    else:
         raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    else:
        return to_binary(int(x / 256)) + chr(x % 256)
```

<br/>

## 2. Examples

- The string "dog" = `[ 0x83, 'd', 'o', 'g' ]`
- The list [ "cat”, "dog” ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- The empty string (‘null') = `[ 0x80 ]`
- The empty list = `[ 0xc0 ]`
- The integer 0 = `[ 0x80 ]`
- The encoded integer 0 ('\x00') = `[ 0x00 ]`
- The encoded integer 15 ('\x0f') = `[ 0x0f ]`
- The encoded integer 1024 ('\x04\x00') = `[ 0x82, 0x04, 0x00 ]`
- The set theoretical representation of three, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- The string "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

<br/>

## 3. RLP decoding

`RLP 인코딩` 규칙에 따라서 `RLP 디코딩` 될 입력값(input)은 `binary data`의 `array`로 간주된다.

<br/>

`RLP 디코딩` 방법은 다음과 같다.

1. 입력 데이터의 첫 번째 바이트에 따라서 데이터 타입과, 실제 데이터의 길이와 오프셋 구한다.
2. 데이터의 타입과 오프셋에 따라서 데이터를 디코딩한다.
3. 나머지 입력값에 대해서도 동일하게 디코딩을 반복한다.

이 때 데이터 타입과 오프셋 디코딩 규칙은 다음과 같다.

1. 만약 첫 번째 바이트가 [0x00, 0x7f] 사이라면 이것은 `single byte`이며, 그 바이트 자체가 디코딩된 값이다.
2. 만약 첫 번재 바이트가 `[0x80, 0xb7]` 사이라면, 이것은 `string`이며, `(first byte - 0x80)`이 `string.length`이며, 그 뒤에 해당 길이의 `string`이 나타난다.
3. 만약 첫 번재 바이트가 `[0xb8, 0xbf]` 사이라면, 이것은 `string`이며, `(first byte - 0xb7)`이 `string.length`를 나타내는 데이터의 크기이며, 그 길이를 나타내는 데이터 이후에 `string`이 나타난다.
4. 만약 첫 번재 바이트가 `[0xc0, 0xf7]` 사이라면, 이것은 `list`이며, `(first byte - 0xc0)`이 `payload.length`이며, 그 뒤에 해당 길이의 `RLP 인코딩된 items`가 나타난다.
5. 만약 첫 번재 바이트가 `[0xf8, 0xff]` 사이라면, 이것은 `list`이며, `(first byte - 0xf7)`이 `payload.length`를 나타내는 데이터의 크기이며, 그 길이를 나타내는 데이터 이후에 `RLP 인코딩된 items`가 나타난다.

<br/>

`RLP 디코딩` 과정을 코드로 나타내면 다음과 같다.

```scala
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output + rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    else:
        raise Exception("input don't conform RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    else:
        return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

<br/>

<br/>

---

### References

\[1\] *Ethereum Wiki. (2020, Jun 11). [RLP][1] [Ethereum Wiki]*

[1]: https://eth.wiki/fundamentals/rlp

\[2\] *Justin Drake. (2020, Apr 18). [Blob serialisation][2] [Ethereum Wiki]*

[2]: https://ethresear.ch/t/blob-serialisation/1705

\[3\] *Dr. Gavin Wood. (2020, Sep 5). [ETHEREUM: A SECURE DECENTRALISED GENERALISED TRANSACTION LEDGER PETERSBURG VERSION][3] [Ethereum]*

[3]: https://ethereum.github.io/yellowpaper/paper.pdf

\[4\] *Ethereum Wiki. (2020, Jun 11). [Patricia Tree][4] [Ethereum Wiki]*

[4]: https://eth.wiki/fundamentals/patricia-tree

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.
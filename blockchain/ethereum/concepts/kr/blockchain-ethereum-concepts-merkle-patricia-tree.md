# Merkle Patricia Tree

`Merkle Patricia trie`는 암호학적으로 인증된 데이터 구조를 제공하는데, 이 데이터 구조는 모든 (key,value) bindings 데이터를 저장할 수 있다. 비록 이 글에서는 `key`와 `value`의 타입을 `string`으로 제한하지만, 다른 데이터 타입에 대해서도 해당 데이터에 대한 `serialization format`을 이용하면 사용가능하다. `Patricia trie`는 `결정적(deterministic)`이기 때문에 동일한 (key,value) bindings를 갖는 경우 모든 바이트는 동일한 값을 가지며, 따라서` root hash `값도 항상 동일한 값을 갖는다. 그리고 `insert`, `lookup`, `delete` 연산에 대해 `O(log(n))` 의 시간 복잡도(time complexity)를 갖으며, `red-black trie`와 같은 복잡한 `comparison-based` 트리보다 훨씬 이해하기 쉽고 코딩하기 편리하다.

<br/>

## 1. Preamble: Basic Radix Tries

`basic radix trie`에서 모든 노드는 다음과 같이 생겼다.

```
[i0, i1, ... in, value]
```

여기서 `i0 ... in`은 알파벳 기호(`binary` 또는 `hex`)를 나타내며, `value`는 해당 노드의 `terminal value`이며, `i0 ... in` slot들에 들어있는 `value`는 `NULL` 또는 다른 노드에 대한 `pointer`(여기서는 다른 노드의 해쉬)이다. 이것은 기본적인 (key, value) store를 형성한다. 예를 들어 만약 trie에서 `dog`에 맵핑되는 `value`를 알고싶다면, 우선 `dog`의 각 알파벳을 대응되는 hex 값(`64 6f 67`)으로 변환한다. 그리고 해당 `path`를 따라서 계속 내려가다가 해당 `path`의 마지막에서 `value`를 읽는다. 즉, 우선 `root node`를 찾기 위해 해당 `flat key/value DB`에서 `root hash`를 lookup한다. 그 다음 index 6에 있는 `value`를 `key`로 사용하여 한 레벨 아래에 있는 `node`를 lookup한다. 그 다음 index 4에 있는 `value`를 `key`로 사용하여 한 레벨 아래에 있는 `node`를 lookup한다. 그 다음은 index 6에 있는 `value`를 사용하여 이전과 동일하게 lookup하며, `path`의 마지막까지 계속 반복한다. 따라서 `path`는 `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`가 된다.

> 참고사항 :  
`trie` 안에서 어떤 것을 `looking up`하는 것과, `flat key/value DB`에서 어떤 것을 `looking up`하는 것은 다른 개념이다. 둘 다 key/value arrangements를 정의하지만, `underlying DB`는 어떤 key에 대한 1 스텝의 `lookup`을 할 수 있지만, `trie`에서 어떤 `key`에 대한 `lookup`은 최종 `value`를 얻기 위해서는 `underlying DB`에서 여러번의 `lookups`를 필요로 한다. 혼동이 없게 하기 위해서 `trie`에서 `lookup`하는 절차를 `path`라고 부를 것이다.

`radix trie`에서 `update`와 `delete` 연산 방법을 코드로 나타내면 다음과 같다.

```scala
def update(node,path,value):
    if path == '':
        curnode = db.get(node) if node else [ NULL ] * 17
        newnode = curnode.copy()
        newnode[-1] = value
    else:
        curnode = db.get(node) if node else [ NULL ] * 17
        newnode = curnode.copy()
        newindex = update(curnode[path[0]],path[1:],value)
        newnode[path[0]] = newindex
    db.put(hash(newnode),newnode)
    return hash(newnode)

def delete(node,path):
    if node is NULL:
        return NULL
    else:
        curnode = db.get(node)
        newnode = curnode.copy()
        if path == '':
            newnode[-1] = NULL
        else:
            newindex = delete(curnode[path[0]],path[1:])
            newnode[path[0]] = newindex

        if len(filter(x -> x is not NULL, newnode)) == 0:
            return NULL
        else:
            db.put(hash(newnode),newnode)
            return hash(newnode)
```

<br/>

radix trie의 `Merkle` 부분은 바로 `node`의 `pointer`로서 결정적인 암호학적 해쉬(hash)를 사용한다는 점이다(모든 key/value DB lookup에서 `key = sha3(rlp(value))`이며, C로 구현된 전통적인 trie  구조에서와 같은 32비트 또는 64비트의 메모리 로케이션이 아니다.) 이것은 데이터 구조에 대한 암호학적 인증을 제공한다. 만약 어떤 `trie`에 대한 `root hash`가 알려졌다면, 누구든지 해당 `trie`의 특정 `path`에 특정 `value`를 갖고 있다는 것을 증명할 수 있다. 그리고 공격자는 해당 `trie`에 존재하지 않는 (path, value) pair에 대한 증거를 제공할 수 없다. 왜냐하면 `root hash`는 하위에 있는 모든 node의 해쉬값들을 해쉬한 것이기 때문에 조금이라도 값이 바뀌면 `root hash`도 바뀌기 때문이다.

`path`의 `1 nibble`씩 traverse하면서, 대부분 `node`는 `17-element array`를 갖는다. `path`에서 다음 `nibble(next hex character)`에 저장된 `value`를 위한 인덱스 1개와, `path`가 완전히 traverse된 경우에는 final target value를 위한 인덱스 1개를 갖는다. 그리고 이러한 `17-element array nodes`는 `branch nodes`라고 불린다.

<br/>

## 2. Main specification: Merkle Patricia Trie

하지만 `radix trie`의 단점은 비효율적이라는 것이다. 만약 한 개의 (path,value) binding을 저장하려고 할 때, `path`가 이더리움 `state trie`처럼 64 characters(32바이트의 nibbles 개수) 길이라면, 각 character마다 한 레벨을 저장하는데 1KB의 추가공간이 필요하다. 그리고 매 `lookup` 또는 delete 마다 전체 64 steps 수행이 필요하다. `Patricia trie`는 이 문제를 해결한다.

<br/>

### 1) Optimization

`Merkle Patricia trie`는 데이터 구조에 약간의 기능을 추가하여 비효율성 문제를 해결하였다. `Merkle Patricia trie`에서 `node`는 다음 중 하나이다.

1. `NULL` (empty string으로 표현됨)
2. `branch` : 17-item node [ v0, ... v15, vt ]
3. `leaf` : 2-item node [ encodedPath, value ]
4. `extension` : 2-item node [ encodedPath, key ]

64-character `path`에서는 해당 `trie`의 처음 몇 개의 레이어를 traverse를 하다보면 어떤 node에서는 divergent path를 갖지 않는 node를 만나게 된다. 이러한 `node`가 `target index`(next nibble)를 제외한 모든 `index`(각 16개의 hex characters를 위한 index)에 대해 `empty values`를 갖게하는 것은 매우 naive한 방식이다.
 대신 `[ encodedPath, key ]` 형태의 `extension node`를 설정하는데, 이 때 `encodedPath`는 compact encoding을 이용해서 만든 `partial path`를 포함하며, `key`는 다음 db lookup을 위한 것이다.

 `leaf node`의 경우 `encodedPath`의 첫 번째 `nibble`에 의해 결정되며, 위 상황이 발생하면 `skip ahead`하기 위한 `partial path`는 `path`의 full remainder를 완성한다. 그리고 이 경우에는 `value`는 그 자체로 `target value`가 된다.

 하지만 이러한 optimization은 모호성을 갖고 있다.

어떤 path의 각 nibbles를 traverse하면서 홀수 개수의 nibble가 남을 수 있는데, 모든 데이터는 `bytes` format으로 저장되기 때문에, 예를 들면 nibble `1`과 nibbles `01`을 구분하는 것이 불가능하다. 왜냐하면 둘 다 <01>로 저장돼야 하기 때문이다. 따라서 홀수 길이를 표시하기 위해서 `partial path`는 `flag`를 이용해 prefixed된다.

<br/>

### 2) Specification: Compact encoding of hex sequence with optional terminator

`odd` vs. `even` remaining partial path 길이에 대한 `flagging`과 `leaf` vs. `extension` node에 대한 `flagging`은 `2-item node`의 `partial path`의 첫 번째 `nibble`에 표현된다. 그 값은 다음과 같다.

|hex char | bits | node type partial  | path length |
|---------|------|--------------------|-------------|
|    0    | 0000 |     extension      |     even    |
|    1    | 0001 |     extension      |     odd     |
|    2    | 0010 | terminating (leaf) |     even    |
|    3    | 0011 | terminating (leaf) |     odd     |

<br/>

`even remaining path` 길이(`0` 또는 `2`)를 위해서 항상 또 다른 `0` `padding`이 따라온다.

```scala
def compact_encode(hexarray):
    term = 1 if hexarray[-1] == 16 else 0
    if term: hexarray = hexarray[:-1]
    oddlen = len(hexarray) % 2
    flags = 2 * term + oddlen
    if oddlen:
        hexarray = [flags] + hexarray
    else:
        hexarray = [flags] + [0] + hexarray
    // hexarray now has an even length whose first nibble is the flags.
    o = ''
    for i in range(0,len(hexarray),2):
        o += chr(16 * hexarray[i] + hexarray[i+1])
    return o
```

<br/>

#### Examples:

```scala
> [ 1, 2, 3, 4, 5, ...]
'11 23 45'
> [ 0, 1, 2, 3, 4, 5, ...]
'00 01 23 45'
> [ 0, f, 1, c, b, 8, 10]
'20 0f 1c b8'
> [ f, 1, c, b, 8, 10]
'3f 1c b8'
```

<br/>

다음은 `Merkle Patricia trie`에서 `node`를 구하는 확장된 코드이다.

```scala
def get_helper(node,path):
    if path == []: return node
    if node = '': return ''
    curnode = rlp.decode(node if len(node) < 32 else db.get(node))
    if len(curnode) == 2:
        (k2, v2) = curnode
        k2 = compact_decode(k2)
        if k2 == path[:len(k2)]:
            return get(v2, path[len(k2):])
        else:
            return ''
    elif len(curnode) == 17:
        return get_helper(curnode[path[0]],path[1:])

def get(node,path):
    path2 = []
    for i in range(len(path)):
        path2.push(int(ord(path[i]) / 16))
        path2.push(ord(path[i]) % 16)
    path2.push(16)
    return get_helper(node,path2)
```

<br/>

### 3) Example Trie

예를 들어 다음과 같은 4개의 `path/value` pairs를 갖는 `trie`를 구해보자. `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coin')`, `('horse', 'stallion')`.

우선 `paths`와 `values` 모두를 `bytes`로 변환한다. `paths`를 바이트로 나타내기 위해 `<>`로 표시되고, `value`는 쉬운 이해를 돕기 위해 여전히 `stings`로 `''`에 의해 표시되지만 이것들은 모두 `bytes`이다.

```scala
<64 6f> : 'verb'
<64 6f 67> : 'puppy'
<64 6f 67 65> : 'coin'
<68 6f 72 73 65> : 'stallion'
```

<br/>

이제 우리는 underlying DB에서 다음과 같은 `key/value pairs`를 갖는 `trie`를 만들 수 있다.

```scala
rootHash: [ <16>, hashA ]
hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
hashB:    [ <00 6f>, hashD ]
hashD:    [ <>, <>, <>, <>, <>, <>, hashE, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
hashE:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coin' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

<br/>

한 `node`가 다른 `node` 안에서 참조될 때 포함되는 것은 `H(rlp.encode(x))`이다. 이 때 `H(x) = sha3(x) if len(x) >= 32 else x`이며, `rlp.encode`는 [RLP][2] 인코딩 함수이다.

<br/>

### 4) Tries in Ethereum

이더리움에서 모든 `Merkle trie`는 `Merkle Patricia trie`를 사용한다. `블록헤더(block header)`에는 다음과 같이 3개의 `tires`에 대한 3개의 `roots`가 포함된다.

1. Transaction Root
2. State Root
3. Receipts Root
   
<br/>

<img src="../images/blockchain-ethereum-concepts-merkle-patricia-tree-2.4.1.1.jpg?raw=true" alt="drawing" width="648"/>

<br/>

<br/>

### 5) State Trie

이더리움에는 하나의 거대한 `global state trie`가 있으며, 트랜잭션에 의해 계속 상태가 업데이트된다. 그 안에서 `path`는 항상 `sha3(ethereumAddress)`이며, `value`는 `rlp(ethereumAccount)`이다. 더욱 구체적으로 이더리움 `account`는 다음과 같이 `4-item array`이다. 이 때 `storageRoot`는 또 다른 `Patricia trie`의 `root`이다.

```
[nonce,balance,storageRoot,codeHash]
```

<br/>

### 6) Storage Trie

`storage` trie는 모든 `contract` 데이터가 저장되는 곳이다. 이것은 각 `account` 마다 독립적으로 갖고 있는 저장공간이다. `path`를 계산하기 위해서는 우선 `Solidity`가 변수들을 정렬하는 방식을 알아야 한다. `path`를 얻기 위해서는 추가적인 해쉬가 연산된다(이 글에서는 자세히 다루지 않도록 하겠다.) 예를 들어 0번째 변수에 대한 `path`는 
`sha3(<0000000000000000000000000000000000000000000000000000000000000000>)`이다. 이것은 항상 `290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563`가 된다. 그리고 `leaf node`에 있는 `storage value`는 `RLP` 인코딩된 `value`이다(e.g. `1234`(=`0x04d2`) => `<82 04 d2>`)  

<br/>

### 7) Transaction Trie

각 블록마다 독립적인 transaction들이 포함되어 있다. 한 `path`는 `rlp(transactionIndex)`이다. `transactionIndex`는 그 블록에서 해당 트랜잭션의 `index`이다. 트랜잭션들의 순서는 miner에 의해 결정되기 때문에 블록이 마이닝되기 전까지는 해당 index는 알 수 없다. 블록이 마이닝된 이후에는 해당 블록에서 `transaction tire`는 절대 변경되지 않는다.

<br/>

### 8) Receipts Trie

모든 블록은 각자의 `receipts trie`를 갖고 있다. 한 `path`는 `rlp(transactionIndex)`이다. `transactionIndex`는 그 블록에서 해당 트랜잭션의 `index`이다. 블록이 마이닝된 이후에는 해당 블록에서 `receipts tire`는 절대 변경되지 않는다.

<br/>

<br/>

---

### References

\[1\] *Ethereum Wiki. (2020, Jun 11). [Patricia Tree][1] [Ethereum Wiki]*

[1]: https://eth.wiki/fundamentals/patricia-tree

\[2\] *Ethereum Wiki. (2020, Jun 11). [RLP][2] [Ethereum Wiki]*

[2]: https://eth.wiki/fundamentals/rlp

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

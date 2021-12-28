
# 트러플 스위트(Truffle Suite)

<br/>

## 1. 트러플 오버뷰(Truffle Overview)

`트러플(Truffle)`은 `Ethereum Virtual Machine(EVM)`을 사용하는 `블록체인(blockchains)`을 위한 `개발 환경(development environment)`, `테스팅 프레임워크(testing framework)` 및 `에셋 파이프라인(asset pipeline)`을 의미합니다.

<br/>

트러플은 다음과 같은 기능들이 있습니다.

- 내장된(built-in) 스마트 컨트랙트 컴필레이션(compilation), 링킹(linking), 그리고 바이너리 관리(binary management)
- 자동화된 컨트랙트 테스팅(빠른 개발 가능)
- 스크립터블(scriptable)하고 확장가능한(extensible) 개발 및 마이그레이션 프레임워크
- 수 많은 퍼블릭 & 프라이빗 네트워크에 배치(deploy)하기 위한 네트워크 관리(network management)
- [ERC190][2] 표준을 사용하여 `EthPM` & `NPM` 패키지 관리
- 스마트 컨트랙트와 직접적인(direct) 통신을 하기 위한 `interactive console`
- 설정가능한(configurable) 빌드 파이프라인과 tight integration 지원
- 트러플 환경에서 스크립트(scripts)를 실행할 수 있는 외부 스크립트 러너(script runner)

<br/>

## 2. 트러플 퀵스타트(Truffle Quickstart)

이번에는 트러플 프로젝트를 생성하고 블록체인 상에 스마트 컨트랙트를 배포하는 기본적인 방법을 알아볼 것입니다.

<br/>

### 1) 프로젝트 생성(Creating a project)

대부분의 트러플 명령들(commands)을 사용하기 위해서는, 기존의 트러플 프로젝트에 명령들을 실행시켜야 합니다. 따라서 첫 번째 과정은 트러플 프로젝트를 생성하는 것입니다.

여러분은 아무것도 설정되지 않은 `베어(bare) 프로젝트 템플릿`을 만들 수도 있지만, 트러플을 처음 사용하신 분들은 예제 어플리케이션과 프로젝트 템플릿이 담긴 `Truffle Box`를 사용하여 프로젝트를 생성할 수 있습니다. 우리는 `MetaCoin box`를 사용해볼 것인데, 이 프로젝트는 계정(accounts) 간에 전송할 수 있는 토큰을 생성하는 프로젝트입니다.

<br/>

#### (1) 트러플 프로젝트를 위한 새로운 디렉토리를 생성

```console
$ mkdir MetaCon
$ cd MetaCoin
```

<br/>

#### (2) MetaCoin을 다운로드(unbox)

```console
$ truffle unbox metacoin
```

> 참고사항 : 
`트러플 박스(Truffle Boxes)`를 `다운로드(download)`하는 것을 `트러플`에서는 `언박스(unbox)`라고 합니다. 즉 상자를 열어본다고 표현하는 것이죠.

> 참고사항 : 
만약 스마트 컨트랙트가 기본으로 포함되어 있지 않은 `베어(bare) 트러플 프로젝트`를 생성하고 싶다면 ***`truffle init`*** 명령을 사용하여 프로젝트를 생성할 수 있습니다.

<br/> 

MetaCoin box를 다운로드하면 아래와 같은 프로젝트 구조를 보게 됩니다.

- `contracts/` : 솔리디티 컨트랙트를 위한 디렉토리
- `migrations/` : 스크립터블한 배포(deployment) 파일들을 위한 디렉토리
- `test/` : 어플리케이션과 컨트랙트를 테스트하기 위한 테스트파일 디렉토리
- `truffle.js` : 트러플 설정 파일

<br/>

### 2) 트러플 프로젝트 탐색(Exploring the project)

1. `contracts/MetaCoin.sol` 파일을 텍스트 에디터에서 열기합니다. 이것은 솔리디티(Solidity) 언어로 작성된 스마트 컨트랙트이며, 이 컨트랙트는 MetaCoin 토큰을 생성할 수 있습니다. 참고로 이 컨트랙트는 동일한 디렉토리 내에 `contracts/ConvertLib.sol` 컨트랙트를 참조하는 것을 볼 수 있습니다.
2. `contracts/Migrations.sol` 파일을 엽니다. 이것은 별도의 솔리디티 파일로서 여러분이 배포한 스마트 컨트랙트의 상태를 관리하고 업데이트하는 역할을 합니다. 참고로 이 파일은 모든 트러플 프로젝트에 포함되어 있으며, 일반적으로 변경되지 않습니다.
3. `migrations/1_initial_migration.js` 파일을 엽니다. 이 파일은 마이그레이션(deployment) 스크립트로서 `MetaCoin.sol` 안의 `Migrations` 컨트랙트를 위한 것입니다.
4. `migrations/2_deploy_contracts.js` 파일을 엽니다. 이 파일은 `MetaCoin` 컨트랙트를 위한 마이그레이션 스크립트입니다.

> 참고사항 :  마이그레이션 스크립트(migration script)는 순서대로 실행이되며, 예를 들어 `2`로 시작하는 파일은 `1`로 시작되는 파일 이후에 실행됩니다.

5. `test/TestMetacoin.sol` 파일을 엽니다. 이것은 `솔리디티(Solidity)`로 작성된 테스트 파일이며, 여러분의 컨트랙트가 예상대로 동작하는지 테스트합니다.

6. `test/metacoin.js` 파일을 엽니다. 이것은 `자바스크립트(JavaScript)`로 작성된 테스트 파일로서 위의 `솔리디티(Solidity)`로 작성된 테스트 파일과 동일한 기능을 합니다.

7. `truffle-config.js` 파일을 엽니다. 이것은 트러플 설정 파일로서 네트워크 정보 설정이나 프로젝트 관련된 다른 설정들(settings)을 저장합니다. 최초에 이 파일은 비어있습니다.

<br/>

### 3) 테스팅(Testing)

#### (1) 솔리디티 테스트 파일 실행

```console
$ truffle test ./test/TestMetaCoin.sol
```

<br/>

위 테스트 실행 결과는 다음과 같습니다.

```scala
Compiling your contracts...
===========================
> Compiling ./contracts/ConvertLib.sol
> Compiling ./contracts/MetaCoin.sol
> Compiling ./contracts/Migrations.sol
> Compiling ./test/TestMetaCoin.sol
> Artifacts written to /var/folders/0k/mstyw69j5v97tbmlrjccrhz80000gn/T/test--8310-xbLClkNE2z6i
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

  TestMetaCoin
    ✓ testInitialBalanceUsingDeployedContract (78ms)
    ✓ testInitialBalanceWithNewMetaCoin (77ms)

  2 passing (5s)
```

> 참고사항 :  
만약 윈도우(Windows)에서 위 명령을 실행 시 오류가 발생할 경우 [Resolving naming conflicts on Windows][3]를 참조하시기 바랍니다.

<br/>

#### (2) 자바스크립트 테스트 파일 실행

```console
$ truffle test ./test/metacoin.js
```

<br/>

위 테스트 실행 결과는 다음과 같습니다.

```scala
Compiling your contracts...
===========================
> Compiling ./contracts/ConvertLib.sol
> Compiling ./contracts/MetaCoin.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /var/folders/0k/mstyw69j5v97tbmlrjccrhz80000gn/T/test--8496-y1zxBQS1fJyy
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account
    ✓ should call a function that depends on a linked library (56ms)
    ✓ should send coin correctly (150ms)


  3 passing (271ms)
```

<br/>

### 4) 컴파일링(Compiling)

#### (1) 스마트 컨트랙트 컴파일

```console
$ truffle compile
```

<br/>

위 컴파일 결과는 다음과 같습니다.

```scala
Compiling your contracts...
===========================
> Compiling ./contracts/ConvertLib.sol
> Compiling ./contracts/MetaCoin.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /Volumes/Workspace-enc/architectophile/playground/truffle/MetaCoin/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

<br/>

### 5) Truffle Develop과 마이그레이팅(Migrating)

`스마트 컨트랙트`를 배포(deploy)하기 위해서는 우리는 `블록체인` 네트워크에 연결해야 합니다. `트러플`은 `내장된(built-in)` 개인 블록체인을 가지고 있으며, 이것은 `테스팅`에 사용될 수 있습니다. 이 블록체인은 `로컬 블록체인`으로서 실제 메인 이더리움 네트워크와는 연결되지 않습니다.

이 때 여러분은 [Truffle Develop][5]을 사용하여 이 로컬 블록체인에 연결할 수 있습니다.

> 참고사항 :  
만약 [가나슈(Ganache)][4]를 사용할 경우 다음 섹션으로 넘어갑니다.

<br/>

#### (1) Truffle Develop 실행

```console
$ truffle develop
```

<br/>

위 명령 실행 결과는 다음과 같습니다.

```bash
Truffle Develop started at http://127.0.0.1:9545/

Accounts:
(0) 0xd676a962b4d76ab12aaa364a216d2b424608540c
(1) 0xff9dfdfc19044d439dc4f4aed5203d43a51e3ea8
(2) 0x0247a37b0cb525cb5ce035a76a6c3ef788cb7887
(3) 0x0862d64e4ce74bcc5680945fe7d5aea5c38916dd
(4) 0x6a902618117e64c326ad65328a43e9b3cdcc4b5d
(5) 0xdb6aa5f7efb90164aaba2122062a4c6181a1f641
(6) 0xabae60cd3ca6f3d33086bf853ea76fd4e9388c9c
(7) 0xa4d723d84dc4dc12af1d2f0d1ee70714fad7c701
(8) 0x307cc3e8667fd247b029d359c1589cc91835b284
(9) 0x845e7fa67e524c04ccfdb58f44581455a02a0f72

Private Keys:
(0) 8f574b37b61fea9e026be52d4b719803dffc5a4d39f8c1cbd1aaecc673e1217c
(1) 4e9af0f509fea8e4a534664f6f43a1992225279a35576d2af3c5aa99b7943ae4
(2) 7f9aa338bbddf99a22b4e244166f0cba85e4d03d00f8b4c33e2825ee0803ce87
(3) ac11dd506de7be0f2defd0b633b53c4b424acf30a57fc3505c51c6b17419b767
(4) 5e43d21e20b9d6c78c6311c4ef2a65515e5bd89466176ac1e49f167df5adbbc2
(5) 44406b7d243a6f9b311327ead4dd27e53f6687e5333abe18c06103b0479e85ba
(6) b3f69b48c850a43d180dc9bb6891e7a76dad4cdb6a5ceab33ee7d1d8f8ac495e
(7) 7467de11b69fb4aea9cdd4c921467553483f345eccdf985be910acedc22b3817
(8) 78d8403bb6ddb0e7edcb55b210f6404776d3cde7285ab5621cbeee15b6cee3ba
(9) 91db2d61a5f681c89640b94eb0b6f0e4f7518b47439825aac7818817bff54a00

Mnemonic: hand boil absent say exchange lumber second ketchup west infant elite sea

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.
```

<br/>

위 실행 결과를 살펴보면, 우리는 이 `로컬 블록체인`에서 `10`개의 계정을 사용할 수 있음을 알 수 있습니다.

<br/>

#### (2) 마이그레이트(Migrate)

위의 Truffle Develop 프롬트(prompt)에서 트러플 명령어들은 `truffle` prefix를 생략하고 실행할 수 있습니다. 예를 들어 위 프롬트에서 `truffle compile`을 실행하려면 그저 `compile`이라고만 칠 수 있습니다. 그리고 컴파일된 컨트랙트들을 배포(deploy)하기 위한 명령은 `truffle migrate`이므로, 프롬트에서는 다음과 같이 명령을 실행할 수 있습니다.

```console
migrate
```

<br/>

위 명령 실행 결과는 다음과 같습니다.

```scala
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x7101e5aede3c720aed0f179ea42b0e733460dd1026c220b850f1cd8c441f751a
   > Blocks: 0            Seconds: 0
   > contract address:    0xC1E6a34A66fec25d9fBd72FE6b9D190de77761Ba
   > block number:        1
   > block timestamp:     1600100116
   > account:             0xd676a962b4d76Ab12aAA364a216D2b424608540c
   > balance:             99.9967165
   > gas used:            164175 (0x2814f)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0032835 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0032835 ETH


2_deploy_contracts.js
=====================

   Deploying 'ConvertLib'
   ----------------------
   > transaction hash:    0x57a11bde754c8b6d8f05bb0b489d930f1e139b60d41f2604c6ddad61e5636ed1
   > Blocks: 0            Seconds: 0
   > contract address:    0xbb02d74d37bd42cF3481088167EA2273Fc92dfA3
   > block number:        3
   > block timestamp:     1600100116
   > account:             0xd676a962b4d76Ab12aAA364a216D2b424608540c
   > balance:             99.99396028
   > gas used:            95470 (0x174ee)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0019094 ETH


   Linking
   -------
   * Contract: MetaCoin <--> Library: ConvertLib (at address: 0xbb02d74d37bd42cF3481088167EA2273Fc92dfA3)

   Deploying 'MetaCoin'
   --------------------
   > transaction hash:    0xc35c0a101b05bb9feccd929c16bfc5e457a1ff85baf54e39f810250504391e40
   > Blocks: 0            Seconds: 0
   > contract address:    0xaFdb14DaB0b6BefA54A648825Dd2b1BFCF7dF1Fb
   > block number:        4
   > block timestamp:     1600100116
   > account:             0xd676a962b4d76Ab12aAA364a216D2b424608540c
   > balance:             99.98822898
   > gas used:            286565 (0x45f65)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0057313 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0076407 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.0109242 ETH
```

<br/>

위 실행 결과에서 우리는 `트랜잭션 아이디(transaction IDs)`와 배포된(deployed) 컨트랙트들의 `주소(addresses)`를 확인할 수 있으며, 또한 `사용 비용(cost)`과 실시간 `상태(status) 업데이트`를 확인할 수 있습니다.

<br/>

> 참고사항 :  
위 실행 결과 중 트랜잭션 아이디와 컨트랙트의 주소는 여러분이 실행한 결과와 다를 것입니다. 왜냐하면 Truffle Develop에서 사용자마다 다른 `개인키(private key)`를 사용하기 때문에 `계정(account)`의 정보가 다르기 때문입니다.

<br/>

### 6) 방법 2 : 가나슈(Ganache)를 이용한 마이그레이팅

`Truffle Develop`은 올인원(all-in-one) 로컬 블록체인이며 콘솔(console)입니다. 여러분은 [가나슈(Ganache)][4]라는 데스크탑 어플리케이션을 이용해도 개인 로컬 블록체인을 운영할 수 있습니다. `가나슈`는 이더리움 블록체인에 익숙하지 않은 입문자에게 훨씬 사용하고 이해하기 쉬울 수 있는 툴입니다. 왜냐하면 편리한 `GUI`를 통해 많은 정보들을 쉽게 확인할 수 있기 때문입니다.

<br/>


가나슈를 실행한다는 점 이외에도 한 가지 추가적인 절차가 있는데, 바로 트러플 설정 파일에서 블록체인 연결이 가나슈 인스턴스를 사용하도록 지정해야 한다는 것입니다.

#### (1) 가나슈 다운로드

[가나슈(Ganache)][4]를 설치합니다.



 바로 트러플 설정 파일(`truffle-config.js`)에 다음 내용을 입력해야 합니다.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
};
```

<br/>

위 설정은 가나슈의 기본 파라미터를 사용하여 블록체인에 연결하도록 합니다.

<br/>













<br/>

<br/>

---

### References

\[1\] *Truffle Suite. (?). [Truffle Overview][1] [Truffle Documentation]*

[1]: https://www.trufflesuite.com/docs/truffle/overview

\[2\] *Piper Merriam. (2017, Jan 11). [ERC: Ethereum Smart Contract Packaging Specification][2] [EIP]*

[2]: https://github.com/ethereum/EIPs/issues/190

\[3\] *Truffle Suite. (?). [Resolving naming conflicts on Windows][3] [Truffle Documentation]*

[3]: https://www.trufflesuite.com/docs/truffle/reference/configuration#resolving-naming-conflicts-on-windows

\[4\] *Truffle Suite. (?). [Ganache][4] [Web Page]*

[4]: https://www.trufflesuite.com/ganache

\[5\] *Truffle Suite. (?). [Truffle Develop][5] [Web Page]*

[5]: https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console#truffle-develop

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.




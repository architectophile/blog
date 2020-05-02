# TypeScript에서 ESLint 사용하는 법

<br/>

## 1. 서론

`ESLint`는 ***JavaScript linter로서*** `자바스크립트(JavaScript)` 또는 `타입스크립트(TypeScript)`로 작성된 코드를 `lint`하기 위해 사용된다. 코드를 형식화(formatting)하는 것은 클린 코드(clean code)를 작성하기 위한 방법 중의 하나로서 우리가 코드를 작성할 때 명확한 기준에 따라 일관성 있게 코드를 작성할 수 있도록 도와준다.

`ESLint`는 우리의 코드베이스(codebase)가 특정 코딩 스타일(style), 형식(formatting) 그리고 기준(standards)을 따르는 것을 강제하도록 만드는데, `ESLint`는 우리의 코드를 검사하여 만약 우리가 설정한 어떤 코딩 기준을 따르지 않았을 경우 우리에게 알려준다.

아마도 `TSLint`에 대해서도 들어본 적이 있을 것이다. 이것은 타입스크립트 전용 linter인데 2019년도에 ***TSLint 개발팀은 더 이상 지원을 중단하기로 결정하였다.*** 그 주된 이유는 바로 `ESLint`가 있기 때문인데 그 두 프로젝트 사이에 중복되는 코드가 너무 많기 때문이다. 따라서 이번 블로그에서 우리는 `ESLint`를 사용하도록 할 것이다.

<br/>

## 2. 준비사항(Prerequisites)

- `Node.js` 설치(이 글에서는 *v12.16.1* 사용)
- `NPM` 설치(이 글에서는 *6.13.4* 사용)
- `TypeScript`로 작성된 프로젝트(만약 없을 경우 [타입스크립트 스타터 프로젝트](https://github.com/architectophile/node-typescript-starter) 사용)

<br/>

## 3. ESLint 기본 설정 방법

### 1) ESLint, 타입스크립트 파서 및 플러긴 설치

```shell
$ npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

<br/>

### 2) .eslintrc.json 파일 생성

```shell
$ vim .eslintrc.json
```

`.eslintrc.json` 파일 안에 다음과 같이 작성하고 저장한다.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

> ***Note:***  
- `root`: 현재 디렉토리가 프로젝트의 최상위 디렉토리인지 나타낸다. 이 값을 `true`로 설정함으로써 ESLint는 이 디렉토리를 최상위 디렉토리로 인식하고 하위에 있는 디렉토리와 파일에 ESLint를 적용한다.
- `parser`: 사용할 `파서(parser)`를 설정한다. 디폴트 값은 `Espree`이며, 우리는 타입스크립트 파서를 사용할 것이므로 우리가 설치한 타입스크립트 파서인 `@typescript-eslint/parser`를 사용하도록 설정한다.
- `plugins`: `써드파티 플러긴(third-party plugins)`을 사용하도록 설정한다. 우리가 설치한 `@typescript-eslint` 플러긴을 사용하도록 설정한다.
- `extends`: 기본 설정(base configurations)으로부터 활성화된 규칙들(enabled rules)의 집합을 확장한다. `eslint:recommended`를 사용하여 ESLint의 코어 규칙들(core rules) 중에서 공통적으로 문제가 보고되는 규칙들(체크마크(✔)가 표시된 규칙들)을 사용하도록 하는데, 이 `recommended` 규칙들은 `ESLint`의 ***메이저 버전(major version)에 따라 달라진다.*** 그리고 `plugin:@typescript-eslint/eslint-recommended`, `plugin:@typescript-eslint/recommended`를 추가하여 ESLint 코어 규칙들이 타입스크립트 규칙들과 잘 호환되도록 설정한다.

<br/>

### 3) .eslintignore 파일 생성

```shell
$ vim .eslintignore
```

`.eslintignore` 파일 안에 다음과 같이 작성하고 저장한다.

```json
node_modules
build
```

> ***Note:***  
ESLint를 적용하지 않는 디렉토리를 설정한다. 노드 모듈이 설치된 `node_modules` 디렉토리와 컴파일된 타입스크립트 코드를 저장하는 `build` 디렉토리를 검사하지 않도록 설정한다. 이 디렉토리 이름은 .tsconfig 파일에서 설정한 `outDir` 디렉토리의 이름에 맞게 설정하도록 한다.

<br/>

### 4) ESLint 스크립트 추가

다음과 같이 `package.json` 파일 안에 `lint` 스크립트를 추가한다.

```json
"lint": "eslint . --ext .ts"
```

> ***Note:***  
`npm run lint` 명령을 실행하면, `eslint`가 실행되고 `.ts` 확장자를 가진 파일들에 대해 lint하여 검사한다. 만약 `타입스크립트 스타터 프로젝트` 코드베이스에서 이 명령을 실행한다면 현재는 오직 `index.ts` 파일 밖에 없기 때문에 특별한 오류가 없어서 아무런 메시지도 출력되지 않을 것이다.

<br/>

## 4. ESLint 추가 설정 방법

<br/>

### 1) ESLint 규칙(rules)

ESLint 규칙들은 다음의 3가지 모드를 가질 수 있다.

- `"off"` 또는 `0`: 규칙을 비활성화함
- `"warn"` 또는 `1`: 규칙을 활성화하고, 규칙 위반에 대해 `경고(warning)`를 출력함(`exit code`에 영향을 미치지 않음) 
- `"error"` 또는 `2`: 규칙을 활성화하고, 규칙 위반에 대해 `오류(error)`를 출력함(**`exit code 1`** 리턴됨)

<br/>

### 2) 규칙 추가하기

추가하고 싶은 규칙이 있을 경우 설정 파일에서 `rules` 속성(attribute)에 규칙이름을 `key`로 하고 규칙모드를 `value`로 하여 규칙을 추가할 수 있다. `ESLint`의 기본 규칙들은 [List of available rules][2]에서 확인할 수 있다.

우리는 아래와 같이 `.eslintrc.json` 파일 안에 `rules` 속성을 추가하고 그 안에 `no-console` 규칙을 추가하여 `console.log()` 함수의 사용을 오류로 검사할 수 있다.

```json
"rules": {
  "no-console": "error" // Using 'console.log()' is considered as an error!
}
```

다음은 `npm run lint` 명령을 실행한 결과이다. 아래 결과를 보면 `no-console` 규칙을 추가한 이후로 `console.log()` 함수의 사용을 오류로 출력하는 것을 알 수 있다.

<img src="../images/languages-typescript-typescript-with-eslint-4.2.1.png?raw=true" alt="drawing" width="840"/>

<br/>

그리고 다음과 같이 `no-console` 규칙을 `"off"`로 설정하면 더 이상 오류가 출력되지 않는 것을 알 수 있다.

```json
"rules": {
  "no-console": "off" // Using 'console.log()' is allowed.
}
```

<br/>

### 3) 실제 프로젝트에서의 규칙 적용

규칙 중에서 `"off"` 모드를 사용하면 기본 설정(base configuration)에서 우리 팀에서는 중요하지 않게 생각하는 규칙이 있을 경우 해당 규칙만 비활성화할 수 있다.  

그리고 `"error"` 모드를 사용하면 우리 팀에서 사용하는 기본 설정(base configuration)이 업데이트로 인해 변경되거나 혹은 다른 설정([Shopify's][3], [Facebook's][4] 등)을 사용하게 되었을 때, 우리 팀에서 반드시 지켜야 하는 규칙들을 분명하게(explicitly) 명시함으로써 기존에 사용하던 커벤션을 계속 유지할 수 있다.  
그리고 코드 컨벤션을 강제하기 위해 함께 사용할 수 있는 툴(tool) 중에는 [Husky][5]가 있는데, 이것은 우리 팀에서 누군가 `git commit` 또는 `git push` 명령을 실행할 때, 항상 `linter`를 먼저 실행시킨 뒤, 반드시 코드 검사를 통과해야만 git 명령을 계속 수행하도록 한다.

그리고 `"warning"` 모드는 해당 규칙을 따르는 것을 지향하지만, 굳이 해당 규칙을 따르지 않았다고 해서 개발 진행 자체를 막고싶지는 않을 때 사용할 수 있다.

<br/>

### 4) 플러긴 추가하기

ESLint에서는 플러긴을 통해 새로운 기능을 추가할 수 있다. [Awesome ESLint][6]에 가면 다양한 ESLint 플러긴들을 찾을 수 있다. 그 중에서 재밌는 한 가지가 있는데 바로 [no-loops][7]인데, 이것은 `for`, `while` statements의 사용을 금지한다. 따라서 대신 `map` 또는 `forEach` 등을 사용하도록 한다.

다음 명령을 입력하여 `no-loops' 플러긴을 설치한다.

```shell
$ npm install --save-dev eslint-plugin-no-loops
```

그리고 다음과 같이 `.eslintrc.json` 파일에서 `plugins` 속성 안에 `no-loops` 플러긴을 추가하고, `rules` 속성 안에 `no-loops/no-loops` 규칙을 추가한다.

```json
"plugins": [
  "@typescript-eslint",
  "no-loops"
],

...

"rules": {
  "no-console": "warn", // Using 'console.log()' is allowed but a 'warning' will be displayed.
  "no-loops/no-loops": "error"
}
```

그 다음 `src/index.ts` 파일을 다음과 같이 수정하고 저장한다.

```typescript
console.log('Hello World! This is the first TypeScript project!')

for (let i = 0; i < 100; i++) {
  console.log(i)
}
```

다음은 `npm run lint` 명령을 실행한 결과이다. 아래 결과를 보면 `console.log()` 함수에 대한 사용은 `경고(warning)`로 나타나고, `for` statement의 사용은 `오류(error)`로 출력되는 것을 볼 수 있다.

<img src="../images/languages-typescript-typescript-with-eslint-4.4.1.png?raw=true" alt="drawing" width="840"/>

<br/>

### 5) 다른 설정으로 확장(extending)하기

만약 기본 설정에 [Shopify's][3] 설정을 추가하여 확장하고 싶다면 어떻게 해야할까?

우선 다음과 같이 명령을 실행하여 `eslint-plugin-shopify`를 설치한다.

```shell
$ npm install eslint-plugin-shopify --save-dev
```

그리고 `.eslintrc.json` 파일에서 `extends` 속성을 다음과 같이 설정한다.

```json
"extends": [
  "plugin:shopify/esnext"
]
```

> ***Note:***  
***여러개의 추가 설정(additional configuration)***을 배열(array) 안에 담아 `extends` 속성에 추가할 수도 있지만 이럴 경우 중복되는 linting 규칙이 여러번 나타날 수 있다. 또한 배열에 담는 순서도 매우 중요한데, ***배열에서 뒤에 있는 설정이 앞에 있는 설정을 확장하게(extend) 된다.***

다음은 `npm run lint` 명령을 실행한 결과이다. 아래 결과를 보면 설정이 `Shopify`로 확장됨에 따라 이전과는 다른 오류가 출력되는 것을 확인할 수 있다.

<img src="../images/languages-typescript-typescript-with-eslint-4.5.1.png?raw=true" alt="drawing" width="840"/>

<br/>

### 6) 자동으로 문제점 수정(fixing)하기

바로 위에서 보았던 eslint 결과 출력 로그를 확인해보면 다음과 같은 문장이 있는 것을 알 수 있다.

```
5 errors and 0 warnings potentially fixable with the `--fix` option.
```

따라서 `eslint` 명령에 `--fix` 옵션을 추가하면 lint한 후에 발견한 오류(errors)나 경고(warnings) 중에서 수정할 수 있는 것이 있으면 ***자동으로 문제점들을 고칠 수 있다.***

이제 `package.json` 파일 안에 `scripts` 속성에 다음 스크립트를 추가해준다.

```json
"lint-and-fix": "eslint . --ext .ts --fix"
```

다음은 `npm run lint-and-fix` 명령을 실행한 결과이다. 아래 결과를 보면 이전과 동일하게 `Shopify` 설정을 사용하였지만 ***자동으로 몇 개의 오류가 수정되면서*** 전체 오류가 줄어든 것을 확인할 수 있다.

<img src="../images/languages-typescript-typescript-with-eslint-4.6.1.png?raw=true" alt="drawing" width="840"/>

<br/>

그리고 `src/index.ts` 파일을 살펴보면 `console.log()` 함수 호출 끝에 자동으로 `세미콜론(;)`이 추가된 것을 알 수 있다.

<img src="../images/languages-typescript-typescript-with-eslint-4.6.2.png?raw=true" alt="drawing" width="584"/>

<br/>

이처럼 우리는 `ESLint`를 사용하여 코딩 스타일과 형식을 검사하고 기준에 맞게 수정할 수 있다는 것을 알게되었다. 하지만 매번 eslint 명령을 수행하여 문제점을 수정하는 것이 아니라 코딩을 하는 도중에 실시간으로 우리가 정해놓은 코딩 컨벤션 기준에 따라 자동으로 형식을 맞춰줄 수 있는 방법은 없을까?

물론 방법이 있다. `Prettier`를 사용하면 가능하다. 따라서 우리는 다음 포스트에서 `Prettier`를 사용하는 방법에 대해 알아보도록 할 것이다.

<br/>

위 예제를 구현한 전체 소스코드(source code)는 아래의 `Github` 리포지토리(repository)에서 확인할 수 있다.

> ***Source Code:***  
https://github.com/architectophile/node-typescript-eslint

<br/>

<br/>

---

### References

\[1\] *Khalil Stemmler. (?). [How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/) [Web Blog Post]*

\[2\] *ESLint. (?). [List of available rules][2] [Web Documentation]*

[2]:https://eslint.org/docs/rules/

\[3\] *Shopify. (?). [Shopify's ESLint Rules][3] [NPM]*

[3]:https://www.npmjs.com/package/eslint-plugin-shopify

\[4\] *Facebook. (?). [Facebook's ESLint Rules][4] [NPM]*

[4]:https://www.npmjs.com/package/eslint-config-fbjs

\[5\] *Husky. (?). [Husky][5] [NPM]*

[5]:https://www.npmjs.com/package/husky

\[6\] *Dustin Specker. (?). [Awesome ESLint][6] [Github Repository]*

[6]:https://github.com/dustinspecker/awesome-eslint

\[7\] *buildo. (?). [eslint-plugin-no-loops][7] [Github Repository]*

[7]:https://github.com/buildo/eslint-plugin-no-loops

<br/>

### Hashtags

`#타입스크립트` `#노드` `#노드 서버` `#타입스크립트 노드` `#타입스크립트 노드 프로젝트` `#타입스크립트 프로젝스 시작` `#타입스크립트 노드 프로젝트` `#타입스크립트 노드 서버` `#TypeScript` `#Node.js` `#typescript and node.js` `#typescript and node project` `#node with typescript` `#node.js with typescript` `#how to create a typescript project` `#how to create Node.js with TypeScript project` `#how to start a typescript project for node.js`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.





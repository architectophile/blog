# TypeScript에서 ESLint와 Prettier 함께 사용하는 법

<br/>

## 1. 서론

이번 포스트에서는 `ESLint`와 함께 결합하여 `Prettier`를 사용하는 방법에 대해서 알아보도록 할 것이다. 우리는 코딩 컨벤션 정의(coding convention definition)에 대한 책임은 `ESLint`에게 맡기고, 이제 맞게 포맷팅(formatting)하는 책임은 `Prettier`에게 맡기도록 할 것이다.

`Prettier`는 자신이 원하는대로 설정하는 코드 포맷터(`opinionated code formatter`)로서 JavaScript, JSX, Angular, Vue, Flow, TypeScript, CSS, Less, SCSS, HTML, JSON, GraphQL, Markdown(GFM, MDX 포함) YAML을 지원한다.

`ESLint`도 역시 코드를 포맷하는데 사용할 수 있긴 하지만, 그것은 주로 우리가 코딩 컨벤션을 따르지 않았을 때 이를 감지하는 역할을 한다.

<br/>

## 2. 준비사항(Prerequisites)

- `Node.js` 설치(이 글에서는 _v12.16.1_ 사용)
- `NPM` 설치(이 글에서는 _6.13.4_ 사용)
- `TypeScript`와 `ESLint`를 사용하는 프로젝트(만약 없을 경우 [타입스크립트 샘플 프로젝트][2] 사용)
- `VS Code` 에디터 설치

<br/>

## 3. 프로젝트 기본 설정

### 1) Prettier 설치

```shell
$ npm install --save-dev prettier
```

<br/>

### 2) Prettier 설정 파일 생성

다음 명령을 실행하여 `.prettierrc` 파일을 생성한다.

```shell
$ vim .prettierrc
```

그리고 `.prettierrc` 파일 안에 다음과 같이 작성하고 저장한다.

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": false,
  "printWidth": 80
}
```

> ***Note:***  
- `semi`: `true`로 설정할 경우 필요할 곳에 자동으로 `세미콜론(;)`을 추가한다.
- `trailingComma`: `all`로 설정할 경우 필요한 모든 곳에 자동으로 `트레일링 커마(trailing comma)`를 추가한다.
- `singleQuote`: `true`로 설정할 경우 스트링을 만들 때 `single quote(')` 대신에 `double quote(")`를 사용하도록 한다(이것은 각자 **_개인의 취향이므로 자유롭게 선택하면 되는데,_** 나는 개인적으로 JSON 형식과 다른 언어(e.g. Java)와의 호환성 때문에 `double quote(")`를 선택하였지만, 전체적인 추세는 `single quote(')`를 사용하는 사람들이 조금 더 많은 것 같다.)
- `printWidth`: 한 줄당 문자수를 설정한다. 그 이상은 자동으로 줄넘김을 한다.

<br/>

### 3) Prettier CLI를 이용하여 테스트

이제 Prettier 커맨드라인 인터페이스(CLI)를 이용해서 테스트해볼 것이다. 우선 다음과 같이 `package.json` 파일 안에 `scripts` 속성에 `prettier-format` 스크립트를 추가한다.

```json
"scripts": {
  "prettier-format": "prettier --config .prettierrc 'src/**/*.ts' --write"
}
```

만약 [타입스크립트 샘플 프로젝트][2]를 클론해서 작업하고 있다면 우리는 `src/index.ts` 파일이 있는데, 현재 코드는 다음과 같다.

```typescript
console.log('Hello World! This is the first TypeScript project!')

for (let i = 0; i < 100; i++) {
  console.log(i)
}
```

이제 `npm run prettier-format`을 실행하고 나서 다시 `index.ts` 파일을 확인해 보면, 다음과 같이 `세미콜론(;)`이 자동으로 추가되고 스트링에 `double quote(")`가 사용된 것을 확인할 수 있다.

```typescript
console.log("Hello World! This is the first TypeScript project!");

for (let i = 0; i < 100; i++) {
  console.log(i);
}
```

<br/>

## 4. Prettier 사용하기

`Prettier`를 사용하는 가장 일반적인 방법은 `VS Code` 에디터에 설치하여 사용하는 것이다. 우리가 코드를 작성하고 저장하면 `VS Code` 에디터에서 우리가 설정한 `Prettier` 스타일에 맞게 자동으로 코드를 포맷해준다.

<br/>

### 1) VS Code에서 코드 저장 시 자동 포맷팅하기

우선 `VS Code` 에디터에서 [Prettier - Code formatter][2] 익스텐션(extension)을 설치한다.

<img src="../images/languages-typescript-typescript-and-eslint-with-prettier-4.1.1.png?raw=true" alt="drawing" width="840"/>

<br/>

`Code > Preferences > Settings`(on macOS) 또는 `File > Preference > Settings`(on Windows)로 간다.

`Edit in settings.json`을 클릭한다. 그리고 `settings.json` 파일 안에서 `editor.formatOnPaste`, `editor.formatOnSave` 속성을 다음과 같이 `true`로 설정한다(만약 해당 속성의 키 값이 없을 경우 새롭게 추가한다.) 이 때 `[typescript]` 속성을 이용해서 `TypeScript` 코드에 대해서만 자동 포맷을 사용하도록 지정한다.

```json
"[typescript]": {
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
},
"editor.formatOnPaste": false,
"editor.formatOnSave": false
```

> ***Note:***  
- `formatOnPaste`: 이 값을 `true`로 설정할 경우 코드를 붙여넣기할 때 자동으로 코드를 포맷한다.
- `formatOnSave`: 이 값을 `true`로 설정할 경우 코드를 저장할 때 자동으로 코드를 포맷한다.

<br/>

### 2) Husky를 이용하여 커밋하기 전에 코드 포맷하기

다른 개발자와 함께 작업할 경우 항상 코드 스타일을 통일하여 일관성이 있게 유지하는 것이 매우 중요하다. 하지만 모든 개발자들이 VS Code 에디터를 사용하고 싶지는 않을 수 있다. 따라서 이럴 경우에는 최소한 다른 개발자들이 커밋(commit)할 때 만큼은 자동으로 `Prettier`를 수행하도록 하는 것이 적절할 것이다. 이를 위해 우리는 `Husky`라는 툴을 사용할 것이다.

`Husky`는 `Git`의 `훅(hooks)` 기능을 쉽게 사용할 수 있도록 하는 npm 패키지다. `Git` 프로젝트가 초기화될 때 자동으로 `훅(hooks)`이라고 하는 기능이 함께 생성된다. 다음과 명령을 실행하면 `pre-push`, `pre-rebase`, `pre-commit`과 같은 훅 예제를 볼 수 있다.

```shell
ls .git/hooks
```

`Husky`를 사용하면 새로운 개발자가 우리의 코드베이스를 클론했을 때 자동으로 훅(hooks)이 생성되고, 어떤 `Git` 명령을 수행할 때 자동으로 우리가 지정한 훅을 실행하도록 할 수 있다.

다음 명령을 실행하여 `Husky`를 설치한다.

```shell
$ npm install husky --save-dev
```

그리고 `package.json` 파일 안에 다음과 같이 `husky` 속성을 추가한다.

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run prettier-format && npm run lint"
  }
}
```

이제 `git commit`을 수행할 때마다 자동으로 `prettier-format`과 `lint` 스크립트를 수행하게 된다. 그리고 만약 `eslint` 명령에 오류가 발생할 경우 커밋이 실패하게 된다.

다음과 같이 테스트를 위해서 `.eslint.json` 파일에 `rules` 속성에 `no-loops/no-loops`를 추가하여 `for`문을 금지하도록 한 다음 `git commit` 명령을 실행해보도록 하자.

```
"no-loops/no-loops": "error"
```

다음과 같이 `for`문 사용 때문에 `eslint` 검사에서 오류가 출력되면서 커밋(commit)에 실패하게 된다.

<img src="../images/languages-typescript-typescript-and-eslint-with-prettier-4.2.1.png?raw=true" alt="drawing" width="720"/>

<br/>

### 3) Prettier와 ESLint 추가 설정하기

다음 명령을 실행하여 추가 패키지를 설치한다.

```shell
$ npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

- `eslint-config-prettier`: `ESLint`의 규칙들 중에서 `Prettier`의 규칙들과 충돌 가능성이 있는 규칙들을 사용하지 않도록 한다.
- `eslint-plugin-prettier`: `Prettier` 규칙들을 `ESLint` 규칙들로 전환한다.

다음과 같이 `.eslintrc.json` 파일에서 `plugins`와 `extends` 속성에 `prettier`를 추가하고, `rules`에는 `prettier/prettier`를 추가한다.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "no-loops",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": "warn", // Using 'console.log()' is allowed but a 'warning' will be displayed.
    "prettier/prettier": 2
  }
}
```

<br/>

위 예제를 구현한 전체 소스코드(source code)는 아래의 `Github` 리포지토리(repository)에서 확인할 수 있다.

> **_Source Code:_**  
> https://github.com/architectophile/node-typescript-eslint-prettier

<br/>

<br/>

---

### References

\[1\] _Khalil Stemmler. (?). [How to use Prettier with ESLint and TypeScript in VSCode](https://khalilstemmler.com/blogs/tooling/prettier/) [Web Blog Post]_

\[2\] _Byeongcheol Yoo. (2020, Mar 24). [A Sample Project with Node.js, TypeScript, and ESLint][2] [Github Repository]_

[2]: https://github.com/architectophile/node-typescript-eslint

\[3\] _Esben Petersen. (?). [Prettier - Code formatter][2] [Visual Studio Marketplace]_

[3]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

\[4\] _Khalil Stemmler. (?). [Enforcing Coding Conventions with Husky Pre-commit Hooks](https://khalilstemmler.com/blogs/tooling/enforcing-husky-precommit-hooks/) [Web Blog Post]_

<br/>

### Hashtags

`#타입스크립트` `#노드` `#노드 서버` `#타입스크립트 노드` `#타입스크립트 노드 프로젝트` `#타입스크립트 프로젝스 시작` `#타입스크립트 노드 프로젝트` `#타입스크립트 노드 서버` `#TypeScript` `#Node.js` `#typescript and node.js` `#typescript and node project` `#node with typescript` `#node.js with typescript` `#how to create a typescript project` `#how to create Node.js with TypeScript project` `#how to start a typescript project for node.js`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

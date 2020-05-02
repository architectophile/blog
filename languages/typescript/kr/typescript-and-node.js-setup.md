# Node.js + TypeScript 스타터 프로젝트 만들기

<br/>

## 1. 서론

이번 포스트에서는 노드(Node.js)와 타입스크립트(TypeScript)를 결합한 기본 스타터 프로젝트를 만들어 볼 것이다. 그리고 각각 빌드(building), 개발(development), 프로덕션(production) 환경에서 실행하기 위한 스크립트를 작성해볼 것이다.

<br/>

## 2. 준비사항(Prerequisites)

- `Node.js` 설치(이 글에서는 *v12.16.1* 사용)
- `NPM` 설치(이 글에서는 *6.13.4* 사용)

<br/>

## 3. 프로젝트 기본 설정

### 1) 프로젝트 디렉토리 생성

```shell
$ mkdir node-typescript-starter
$ cd node-typescript-starter
```

<br/>

### 2) NPM init

다음 명령을 실행하여 기본적인 패키지 네임 등을 설정하고 `package.json`을 생성한다.

```shell
$ npm init
```

<br/>

### 3) 타입스크립트 개발 디펜던시로(dev dependency) 설치

```shell
$ npm install typescript --save-dev
```

> ***Note:***  
`typescript` 패키지를 설치하면 **`tsc`** 명령을 이용하여 TypeScript의 커맨드라인 컴파일러를 사용할 수 있다. 

<br/>

### 4) Node.js에 대한 엠비언트 타입(ambient types) 설치

```shell
& npm install @types/node --save-dev
```

<br/>

### 5) TypeScript init

다음 명령을 실행하여 타입스크립트 소스 디렉토리 등을 설정하고 `tsconfig.json`을 생성한다.

```shell
$ npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib ES6 \
--module commonjs --allowJs --noImplicitAny true
```

> ***Note:***  
- `rootDir`: 타입스크립트가 소스 코드를 찾는 디렉토리이다. 우리는 `src` 디렉토리 안에 소스 코드를 작성할 것이다.
- `outDir`: 타입스크립트가 컴파일된 코드를 출력하는 디렉토리이다. 우리는 `build` 디렉토리 안에 컴파일된 코드를 출력할 것이다.
- `esModuleInterop`: 자바스크립트를 사용하여 예전부터 개발해왔다면 자바스크립트의 모듈 시스템이 매우 복잡하고 다양하게 변화해왔다는 것을 알 것이다(AMD, SystemJS, ES Modules 등). 이 값을 true로 설정함으로써 `CommonJS` 모듈 시스템(Node.js에서 사용하는 표준 모듈 시스템)을 `ES6` 모듈 시스템에 맞춰 사용할 수 있다.
- `resolveJsonModule`: 이 값을 true로 설정함으로써 `.json` 확장자를 가진 JSON 모듈을 사용할 수 있다.
- `lib`: 컴파일에 들어가는 라이브러리 파일을 설정한다. 우리는 `ES6`에서 사용하는 엠비언트 타입(ambient types)을 추가해준다. 그리고 모든 것은 다시 `ES5`에 맞게 컴파일될 것이다.
- `module`: 모듈 코드 생성을 위한 모듈 시스템을 설정한다. 우리는 `Node.js`를 사용할 것이므로 `CommonJS`로 설정한다.
- `allowJs`: 이 값을 true로 설정함으로써 `.js` 파일도 함께 컴파일되도록 한다.
- `noImplicitAny`: 이 값을 true로 설정함으로써 타입이 명확하지 않은 표현 또는 선언과 `implied any` 타입의 사용을 엄격히 금지한다.

위 명령을 실행한 후 생성된 `tsconfig.json` 파일은 다음과 같을 것이다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["es6"],                           /* Specify library files to be included in the compilation. */
    "allowJs": true,                          /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "build",                        /* Redirect output structure to the directory. */
    "rootDir": "src",                         /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    "noImplicitAny": true,                    /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "resolveJsonModule": true,                /* Include modules imported with '.json' extension */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}
```

<br/>

### 6) src 디렉토리 및 index.ts 파일 생성

```shell
$ mkdir src
$ touch src/index.ts
```

그리고 `index.ts` 파일 안에 다음과 같은 코드를 작성한다.

```typescript
console.log('Hello World! This is the first TypeScript project!')
```

<br/>

### 7) 타입스크립트 코드 컴파일

타입스크립트 코드를 컴파일하기 위해 `tsc` 명령을 사용하는데, 이를 실행하기 위해 `npx`(node package executer) 명령을 함께 이용한다. 그리고 `tsc` 명령은 `tsconfig.json` 파일을 읽고 해당 설정을 적용하여 `타입스크립트(TypeScript)` 컴파일러를 실행하여 컴파일된 `자바스크립트(JavaScript)` 코드를 생성한다.

```shell
npx tsc
```

그리고 컴파일된 `자바스크립트` 코드인 `build/index.js`를 살펴보면 다음과 같다.

```javascript
"use strict";
console.log('Hello World! This is the first TypeScript project!');
```

<br/>

## 4. 유용한 설정 및 스크립트 작성

### 1) Cold reloading

`Cold reloading`은 로컬 개발 환경에서 매우 유용한 기능이다. 이를 위해 다음 명령을 실행하여 `ts-node`, `nodemon` 패키지를 설치한다.

```shell
$ npm install ts-node nodemon --save-dev
```

> ***Note:***  
- `ts-node`: 타입스크립트 코드가 컴파일되는 것을 기다리지 않고 코드를 바로 실행할 수 있게 한다.
- `nodemon`: 코드에 변화가 있는지 실시간으로 검사하고, 코드 변경이 감지될 경우 자동으로 프로그램을 재시작한다.

<br/>

`nodemon.json` 파일을 생성한다.

```shell
$ vim nodemon.json
```

그리고 `nodemon.json` 파일 안에 다음과 같이 작성하고 저장한다.

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

그리고 `package.json` 파일 안의 `스크립트(scripts)` 안에 다음을 추가한다.

```json
"start:dev": "nodemon"
```

> ***Note:***  
`npm run start:dev` 명령을 실행하면, `nodemon`이 시작되고 `ts-node ./src/index.ts` 명령으로 앱을 실행한다. 그리고 `nodemon` 프로세스는 `src` 디렉토리에 있는 `.ts`, `.js` 파일들의 변경을 실시간으로 감시한다.

<br/>

다음은 `npm run start:dev` 명령을 실행한 결과이다.

<img src="../images/languages-typescript-typescript-and-node.js-setup-4.1.1.png?raw=true" alt="drawing" width="840"/>

<br/>

<br/>

### 2) 프로덕션(production) 빌드 스크립트 생성

다음 명령을 실행하여 `rimraf` 패키지를 설치한다.

```shell
$ npm install rimraf --save-dev
```

> ***Note:***  
- `rimraf`: 크로스 플랫폼 툴로서 `rm -rf` 명령(지정하는 모든 것을 삭제하는 명령)처럼 동작한다.

<br/>

그리고 `package.json` 파일 안의 `스크립트(scripts)` 안에 다음을 추가한다.

```json
"build": "rimraf ./build && tsc"
```

> ***Note:***  
`npm run build` 명령을 실행하면, 우선 `rimraf`가 오래된 `build` 디렉토리를 삭제하고, 타입스크립트 컴파일러가 새로운 코드를 `build` 디렉토리로 출력한다.

<br/>

마지막으로 `package.json` 파일 안의 `스크립트(scripts)` 안에 다음을 추가한다.

```json
"start": "npm run build && node build/index.js"
```

> ***Note:***  
`npm run start` 명령을 실행하면, 우선 `build` 스크립트가 실행되어 새로운 코드가 컴파일되고 `node` 프로세스가 컴파일된 코드인 `build/index.js`로 앱을 실행하게 된다.

<br/>

다음은 `npm run start` 명령을 실행한 결과이다.

<img src="../images/languages-typescript-typescript-and-node.js-setup-4.1.1.png?raw=true" alt="drawing" width="840"/>

<br/>

현재까지 작성된 `package.json` 파일은 다음과 같을 것이다.

```json
{
  "name": "node-typescript-starter",
  "version": "1.0.0",
  "description": "A starter project with Node.js and TypeScript",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "nodemon",
    "build": "rimraf ./build && tsc",
    "start": "npm run build && node build/index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/architectophile/node-typescript-starter.git"
  },
  "keywords": [
    "TypeScript",
    "Node.js"
  ],
  "author": "architectophile",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/architectophile/node-typescript-starter/issues"
  },
  "homepage": "https://github.com/architectophile/node-typescript-starter#readme",
  "devDependencies": {
    "@types/node": "^13.9.2",
    "nodemon": "^2.0.2",
    "rimraf": "^3.0.2",
    "ts-node": "^8.7.0",
    "typescript": "^3.8.3"
  }
}
```

<br/>

위 예제를 구현한 전체 소스코드(source code)는 아래의 `Github` 리포지토리(repository)에서 확인할 수 있다.

> ***Source Code:***  
https://github.com/architectophile/node-typescript-starter

<br/>

<br/>

---

### References

\[1\] *Khalil Stemmler. (?). [How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/) [Web Blog Post]*

<br/>

### Hashtags

`#타입스크립트` `#노드` `#노드 서버` `#타입스크립트 노드` `#타입스크립트 노드 프로젝트` `#타입스크립트 프로젝스 시작` `#타입스크립트 노드 프로젝트` `#타입스크립트 노드 서버` `#TypeScript` `#Node.js` `#typescript and node.js` `#typescript and node project` `#node with typescript` `#node.js with typescript` `#how to create a typescript project` `#how to create Node.js with TypeScript project` `#how to start a typescript project for node.js`

<br/>

<br/>

© 2020, Byeongcheol Yoo. All rights reserved.

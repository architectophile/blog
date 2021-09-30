## 리액트 프론트엔드 개발자 기술면접 질문

### JavaScript 질문

#### 1. ECMAScript와 JavaScript의 차이점은 무엇인가요?

>  
`ECMAScript`는 `Ecma International`이 `ECMA-262` 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어를 말한다. 따라서 `ECMAScript`는 `ECMA-262` 표준에서 정의하는 이름이고 `JavaScript`는 `ECMAScript specification`을 준수하여 구현된 언어를 말한다.

<br/>

#### 2. JavaScript의 데이터 타입은 어떠한 것들이 있나요?

>   
**Primitive values**: `null`, `undefined`, `boolean`, `number`, `bigint`, `string`, `symbol`  
**Objects**: `Object`, `Function`, `Array`, `Date`, `Map`, `Set` 등

<br/>

#### 3. 객체의 프로토타입(Prototype)이란 무엇인가요?

>  
`JavaScript`는 프로토타입 기반 언어(prototype-based language)로서 모든 객체들이 메소드와 속성들을 상속 받기 위한 템플릿으로써 `프로토타입 객체(prototype object)`를 갖는다. 프로토타입 객체는 또 다른 프로토타입 객체를 갖고 있으며 이것은 상위의 객체로부터 상속받은 프로토타입을 가리킨다. 이처럼 객체 간에 상속을 받으며 프로토타입이 연결되는 것을 `프로토타입 체인(prototype chain)`이라고 부르며 어떤 개체의 속성과 메소드를 탐색할 때 프로토타입 체인을 따라 탐색한다.

<br/>

#### 4. ES6에서 추가된 문법은 어떠한 것들이 있나요?

>  
`let & const 키워드`, `arrow function`, `template literals`, `spread operator`, `destructuring`, `import & export 키워드`, `Map & Set`, `Promise`, `Class` 등

<br/>

#### 5. var, let, const 키워드의 차이점은 무엇인가요?

>  
`var`로 선언된 변수는 `function scope`를 가진다. `let`과 `const`로 선언된 변수는 `block scope`를 갖는다.  
`var`로 선언된 변수는 재할당 및 재선언이 가능하다. `let`으로 선언된 변수는 재할당은 가능하지만 재선언은 불가능하다. `const`로 선언된 변수는 재할당 및 재선언이 불가능하다.

<br/>

#### 6. JavaScript에서 거짓 값(falsy value)으로 인식되는 값은 무엇이 있나요?

>   
`false`, `0`, `""`, `null`, `undefined`, `NaN`

<br>

#### 7. '==' 와 '===' 연산자의 차이점은 무엇인가요?

>  
`===(strict equality)`는 두 값을 비교할 때 형변환을 하지 않는다. 우선 양쪽이 같은 타입인지 비교한 후에 같은 값을 갖고 있는지 비교한다.  
`==(loose equality)`는 양쪽 값을 공통 타입으로 변환한 후에 두 값을 비교한다. 변환 후에는 `===`과 동일한 방법으로 양쪽을 비교한다.

```javascript
console.log(1 == "1"); // true
console.log(1 === "1"); // false

console.log(0 == false); // true
console.log(0 === false); // false

console.log("" == false); // true
console.log("" === false); // false

console.log(null == undefined); // true
console.log(null === undefined); // false
```

<br/>

#### 8. null 과 undefined 의 차이점은 무엇인가요?

>  
`undefined`은 변수를 선언하고 값을 할당하지 않은 상태, `null`은 변수를 선언하고 빈 값을 할당한 상태(빈 객체)이다. 즉, `undefined`는 자료형이 없는 상태이다.  
`undefined`는 원시값 중 하나로 선언한 후에 값을 할당하지 않은 변수나 값이 주어지지 않은 인수에 자동으로 할당되며 리턴 값이 없는 함수의 출력으로 설정된다.  
`null`은 원시값 중 하나로 어떤 값이 의도적으로 비어있음을 표현한다.  
따라서 `typeof`를 통해 자료형을 확인해보면 `null`은 `object`로, `undefined`는 `undefined`가 출력되는 것을 확인할 수 있다.

<br/>

#### 9. 일반함수와 화살표(arrow) 함수의 차이점은 무엇인가요?

>  
기존의 일반함수는 명시적으로 `this` 컨텍스트를 설정할 수 있으며, 그렇지 않은 경우에는 전역 컨텍스트를 상속받는다. 반면에 화살표 함수는 `this` 컨텍스트를 직접 지정할 수 없고 자신이 선언된 부모 스코프에서 컨텍스트를 그대로 상속한다.  
화살표 함수는 모두 `anonymous function`이므로 이름을 설정할 수 없으며, `new` 키워드를 사용하여 생성자(`constructor`)로 사용될 수 없다.  
화살표 함수에서는 `블록({})`과 `return` 키워드를 생략하고 `implicit return`을 할 수 있다. 또한 `default parameter`를 설정할 수 있다.

<br/>

- (추가질문) 둘은 서로를 직접 대체하여 사용할 수 있습니까?

>  
두 함수는 `this` 컨텍스트를 설정하는 방법이 다르기 때문에 함수 내에서 `this` 컨텍스트를 사용할 경우 서로를 완전 대체하면 문제가 발생할 가능성이 매우 높다.  
또한 일반함수에서 `arguments` 객체를 사용할 경우 화살표 함수에서는 사용할 수 없다.

<br/>

#### 10. Event Loop란 무엇인가요? (Call Stack, Callback Queue, Microtask Queue와 함께 설명)

>  
`JavaScript`는 `싱글스레드(single thread)` 환경에서 `Call Stack`의 작업을 처리하기 때문에 한 개의 `Call Stack`에 쌓여있는 작업들을 순차적으로 처리한다. `Event Loop`는 지속적으로 `Call Stack`, `Callback Queue`, `Microtask Queue`를 감시하며, 만약 `Call Stack`이 비어있을 때 `Callback Queue` 또는 `Microtask Queue`에 처리해야 할 작업이 있을 경우 이들을 `Call Stack`에 적재하여 처리하도록 하는 역할을 한다. 이 때 `Callback Queue`과 `Microtask Queue` 중에서 `Microtask Queue`에 등록된 작업의 우선순위가 더 높다. 대표적으로 `setTimeout`에 등록된 비동기 콜백함수는 `Callback Queue`에 쌓이게 되고, `Promise`의 `then` 메소드에 등록된 콜백함수는 `Microtask Queue`에 쌓이게 된다.

<br/>

- (추가질문) setTimeout 함수는 정확한 동작 시간을 보장하나요?

>  
`setTimeout` 함수는 정확한 동작 시간을 보장하지 않는다. `Web API`에 의해 설정된 시간 후에 정확히 `Callback Queue`에 해당 작업이 생성될 수는 있지만 만약 `Call Stack` 또는 `Microstack Queue`에 처리해야 할 작업들이 있는 경우 해당 작업들이 끝날 때까지 `setTimeout`에 의해 생성된 `Callback Queue`의 작업은 처리되지 않는다.

<br/>

- (추가질문) 아래의 코드를 실행했을 때 출력 결과에 대해 설명해 주세요.

```javascript
console.log("Begin");

setTimeout(() => {
console.log("setTimeout 1");
}, 0);

setTimeout(() => {
console.log("setTimeout 2");
}, 0);

Promise.resolve()
.then(() => console.log("Promise 1"))
.then(() => console.log("Promise 2"));

console.log("End");
```

```
Begin
End
Promise 1
Promise 2
setTimeout 1
setTimeout 2
```

<br/>

### React 질문

#### 11. DOM이란 무엇인가요? 그리고 Virtual DOM은 무엇이며, Virtual DOM의 장점은 무엇인가요?

`Virtual DOM`은 애플리케이션의 UI를 구성하는 HTML 엘리먼트를 메모리 내에서 구현한 것이다. 컴포넌트가 다시 렌더링될 때, `Virtual DOM`은 업데이트할 요소의 목록을 만들기 위해 기존의 `DOM` 모델에서 변경되는 사항을 비교한다. `DOM` 전체를 다시 렌더링할 필요 없이 실제 `DOM`에 필요한 최소한만 변경하여 효율성이 높다는 것이 큰 장점이다.

<br/>

- (추가질문) React에서 재조정(Reconciliation)은 무엇입니까? list의 children의 key는 어떤 값이 적합한가요?

>
`list item`의 `key` 값은 해당 아이템의 고유한 아이디로 설정하는 것이 좋다. 재조정 과정에서 값이 변경되었는지 확인할 때 `key`를 비교하면 효율적이기 때문에 각 아이템이 고유한 `key` 값을 갖고 있다면 효율적으로 리스트 아이템의 변경 사항을 파악할 수 있다. 만약 배열을 사용할 경우 배열 내 아이템의 `index`를 `key`로 사용하는 것은 피해야 한다. 또한 `Math.random()`과 같은 연관없는 예측불가능한 값도 사용하지 않아야 한다.

<br/>

#### 12. 클래스 컴포넌트와 함수형 컴포넌트를 설명하고 둘간의 차이점은 무엇인가요?

>  
**클래스 컴포넌트**:
React 16.8(hooks 도입) 이전에는 내부 state를 유지하는 데 필요한 컴포넌트를 생성하거나 생명주기 메소드(lifecycle methods)(즉, componentDidMount 및 shouldComponentUpdate)를 활용하기 위해 클래스 기반 컴포넌트를 사용하였다. 클래스 기반 컴포넌트는 리액트의 Component 클래스를 확장하는 ES6 클래스이다. 또한 항상 render() 메서드를 포함해야 한다.

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

>  
**함수형 컴포넌트**:
함수형 컴포넌트는 렌더링할 출력 결과를 리턴한다. 예전에는 state를 갖지 않았지만 현재는 useState hook을 사용하여 state를 관리할 수 있다. 함수형 컴포넌트는 클래스 기반 컴포넌트보다 심플하기 때문에 props에만 의존하는 UI을 렌더링하는데 선호된다.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

<br/>

#### 13. React Hook은 무엇인가요?

- (추가질문) useState 함수의 리턴값은 무엇인가요?
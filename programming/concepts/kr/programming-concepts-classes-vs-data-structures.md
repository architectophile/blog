# Classes vs Data Structures

<br/>

### 클래스란 무엇인가?

(*What is a class?*)

→ 클래스란 비슷한 오브젝트들 집합의 구체적 설명(또는 명세)이다.

(*A class is the specification of a set of similar objects.*)

<br/>

### 오브젝트란 무엇인가?

(*What is an object?*)

→ 오브젝트란 감싸진 데이터 요소들 위에서 동작하는 함수들의 집합이다.

(*An object is a set of functions that operate upon encapsulated data elements.*)

→ 또는 오브젝트란 함축된 데이터 요소들 위에서 동작하는 함수들의 집합이다.

(*Or rather, an object is a set of functions that operate on implied data elements.*)

<br/>

### 함축된 데이터 요소들이란 무엇인가?

(*What do you mean by implied data elements?*)

→ 어떤 오브젝트의 함수들은 어떤 데이터 요소들의 존재를 암시한다. 하지만 그 데이터는 오브젝트의 외부에서 직접적으로 접근되거나 보이지는 않는다.

(*The functions of an object imply the existence of some data elements; but that data is not directly accessible or visible outside of the object.*)

<br/>

### 데이터는 오브젝트 안에 있는 것이 아닌가?

(*Isn’t the data inside the object?*)

→ 그럴 수도 있다. 하지만 반드시 그래야 한다는 법칙은 없다. 사용자의 입장에서 봤을 때, 오브젝트는 그저 함수들의 집합에 불과하다. 그 함수들이 동작하는데 필요한 데이터는 반드시 존재하지만 그 데이터의 위치는 사용자에게는 알려지지 않는다.

(*It could be; but there’s no rule that says it must be. From the point of view of the user, an object is nothing more than a set of functions. The data that those functions operate upon must exist, but the location of that data is unknown to the user.*)

<br/>

### 데이터 스트럭처란 무엇인가?

(*what is a data structure?*)

→ 데이터 스트럭처란 데이터 요소들의 결합적인 집합이다. 

(*A data structure is a cohesive set of data elements.*)

→ 또는 다른 말로, 데이터 스트럭처란 함축된 함수들에 의해 동작되는 데이터 요소들의 집합이다.

(*Or, in other words, a data structure is a set of data elements operated upon by implied functions.*)

→ 데이터 스트럭처 위에서 동작하는 그 함수들은 데이터 스트럭처에 의해 구체화되지 않는다. 하지만 데이터 스트럭처의 존재는 어떤 동작이 반드시 존재한다는 것을 암시한다.

(*The functions that operate on the data structure are not specified by the data structure but the existence of the data structure implies that some operations must exist.*)

<br/>

### 그렇다. 이제 그 2가지 정의에 대해서 어떻게 생각하는가?

(*Right. Now what do you notice about those two definitions?*)

→ 그들은 서로 상반된다.

(*They are sort of the opposite of each other.*)

→ 사실 둘은 서로 보상관계를 갖는다. 그들은 마치 글러브 안의 손이 들어가는 것처럼 함께 들어맞는다.

(*Indeed. They are complements of each other. They fit together like a hand in a glove.*)

- An Object is a set of functions that operate upon implied data elements.
- A Data Structure is a set of data elements operated upon by implied functions.

<br/>

### 그렇다면 오브젝트는 데이터 스트럭처가 아니란 말이군.

(*Wow, so objects aren’t data structures.*)

→ 정확하다. 오브젝트는 데이터 스트럭처와 상반되는 개념이다.

(*Correct. Objects are the opposite of data structures.*)

<br/>

### 그렇다면 DTO(Data Transfer Object)는 오브젝트가 아닌 것인가?

(*So a DTO – a Data Transfer Object – is not an object?*)

→ 정확하다. DTO는 데이터 스트럭처이다.

(*Correct. DTOs are data structures.*)

<br/>

### 그렇다면 데이터베이스 테이블 역시 오브젝트가 아닌가?

(*And so database tables aren’t objects either, are they?*)

→ 이번에도 정확하다. 데이터베이스는 데이터 스트럭처를 포함하는 것이지 오브젝트를 포함하지 않는다.

(*Correct again. Databases contain data structures, not objects.*)

<br/>

### 하지만 ORM(Object Relational Mapper)은 데이터베이스 테이블을 오브젝트로 맵핑하지 않는가?

(*But wait. Doesn’t an ORM – And Object Relational Mapper – map database tables to objects?*)

→ 물론 아니다. 데이터베이스 테이블과 오브젝트 사이에는 맵핑이 일어하지 않는다. 데이터베이스 테이블은 데이터 스트럭처이지 오브젝트가 아니다.

(*Of course not. There is no mapping between database tables and objects. Database tables are data structures, not objects.*)

<br/>

### 그렇다면 ORM이 하는 일은 무엇인가?

(*So then what do ORMs do?*)

→ 그것은 데이터 스트럭처들 간에 데이터를 전송한다.

(*They transfer data between data structures.*)

<br/>

### 그렇다면 그것은 오브젝트와는 전혀 상관없는 것인가?

(*So they don’t have anything to do with Objects?*)

→ 전혀 상관없다. Object Relational Mapper라고 하는 것은 없다. 왜냐하면 데이터베이스 테이블과 오브젝트 사이에는 맵핑이 일어나지 않기 때문이다.

(*Nothing whatever. There is no such thing as an Object Relational Mapper; because there is no mapping between database tables and objects.*)

<br/>

### 하지만 나는 ORM이 우리를 위해 비지니스 오브젝트를 생성한다고 생각했다.

(*But I thought ORMs built our business objects for us.*)

→ 아니다. ORM은 우리의 비지니스 오브젝트들이 동작하는데 필요한 데이터를 추출한다. 그 데이터는 ORM에 의해 로드된 데이터 스트럭처 안에 저장된다.

(*No, ORMs extract the data that our business objects operate upon. That data is contained in a data structure loaded by the ORM.*)

<br/>

### 하지만 그 비지니스 오브젝트는 그 데이터 스트럭처를 포함하지 않는가?

(*But then doesn’t the business object contain that data structure?*)

→ 그럴 수도 있고 아닐 수도 있다. 그것은 ORM이 신경쓸 일이 아니다.

It might. It might not. That’s not the business of the ORM.

<br/>

### 그것은 사소한 의미론적인 내용처럼 보인다.

(*That seems like a minor semantic point.*)

→ 전혀 아니다. 그 둘의 구별은 상당히 많은 것을 암시한다.

(*Not at all. The distinction has significant implications.*)


### 예를 들면?

(*Such as?*)

예를 들면 데이터베이스 스키마 디자인 vs. 비지니스 오브젝트의 디자인이 있다.
비지니스 오브젝트는 비지니스 행동의 구조를 정의한다.
데이터베이스 스키마는 비지니스 데이터의 구조를 정의한다.
그 두 개의 구조들은 매우 다른 힘에 의해 제한된다.
비지니스 데이터의 구조는 그 비지니스 행동을 위한 최고의 구조일 필요는 없다.

(*Such as the design of the database schema vs. the design of the business objects. Business objects define the structure of the business behavior. Database schemas define the structure of the business data. Those two structures are constrained by very different forces. The structure of the business data is not necessarily the best structure for the business behavior.*)

<br/>

### 그것은 매우 헷갈린다.

(*Hmmm. That’s confusing.*)

이런 식으로 생각해봐라. 데이터베이스 스키마는 오직 하나의 어플리케이션에만 맞춰지지 않는다.
그것은 반드시 엔터프라이즈 전체를 서브해야 한다.
따라서 그 데이터의 구조는 매우 다른 어플리케이션들 사이에서 타협된 것이다.

(*Think of it this way. The database schema is not tuned for just one application; it must serve the entire enterprise. So the structure of that data is a compromise between many different applications.*)

<br/>

### 알겠다. 데이터베이스 스키마는 모든 다양한 어플리케이션들 중에서 타협한 것이기 때문에, 그 스키마는 어떤 특정한 하나의 어플리케이션의 오브젝트 모델에 부합하지 않을 것이다.

(*Oh, I see. Since the database schema is a compromise of all the various applications, that schema will not conform to the object model of any particular application.*)

→ 맞다! 오브젝트와 데이터 구조는 매우 다른 힘에 의해 제한된다. 그들은 좀처럼 잘 졍럴되지 않는다.
사람들은 이것을 Object/Relational 저항 부조화라고 불렀다.

(*Right! Objects and Data Structures are constrained by very different forces. They seldom line up very nicely. People used to call this the Object/Relational impedance mismatch.*)

<br/>

### 나는 그것을 들어본 적이 있다. 하지만 나는 그 저항 부조화가 ORM에 의해 해결되었다고 생각했다.

(*I’ve heard of that. But I thought that impedance mismatch was solved by ORMs.)

→ 그리고 이제 당신은 달라졌다. 저항 부조화가 없어지는 이유는 오브젝트와 데이터 스트럭처는 동형이 아니라 서로 상호보완적인 관계이기 때문이다. 

(*And now you now differently. There is no impedance mismatch because objects and data structures are complementary, not isomorphic.*)

<br/>

### 뭐라고요?

(*Say what?*)

→ 그들은 서로 상반된다. 비슷한 개체들이 아니다.

They are opposites, not similar entities.

<br/>

### 상반된다고요?

(*Opposites?*)

→ 그렇다. 매우 흥미로운 방식으로 말이다. 오브젝트와 데이터 스트럭처는 완전히 반대되는 제어 구조를 의미한다.

(*Yes, in a very interesting way. You see, objects and data structures imply diametrically opposed control structures.*)

<br/>

### 잠깐만. 뭐라고요?

(*Wait, what?*)

→ 어떤 공통 인터페이스에 모두 부합하는 오브젝트 클래스들의 집합을 떠올려 보자.
예를 들어, 2차원의 도형을 나타내는 클래스들을 상상해보자. 그리고 그것들은 각자 도형의 넓이와 둘레를 계산하는 함수를 갖고 있다.

(*Consider a set of object classes that all conform to a common interface. For example, imagine classes that represent two dimensional shapes that all have functions for calculating the area and perimeter of the shape.*)

<br/>

### 어째서 모든 소프트웨어 예제들이 도형을 사용하는가?

(*Why does every software example always involve shapes?*)

→ 그저 두 개의 다른 형태를 생각해보자. 사각형과 원형.
이 두 개의 클래스의 넓이와 둘레를 구하는 함수들은 서로 다른 함축된 데이터 스트럭처 위에서 동작한다는 것은 분명해야 한다.
그리고 그 함수들이 호출되는 방식은 동적 다형성을 통해 이뤄져야 한다는 것 또한 분명하다.

(*Let’s just consider two different types: Squares and Circles. It should be clear that the area and permimeter functions of these two classes operate on different implied data structures. It should also be clear that the way those operations are called is via dynamic polymorphism.*)

<br/>

### 잠깐만요. 천천히요. 뭐라고요?

Wait. Slow down. What?

→ 두 개의 다른 넓이 함수가 있다. 하나는 정사각형을 위한 것이고, 다른 하나는 원형을 위한 것이다.
어떤 특정 오브젝트의 넓이 계산 함수를 호출했을 때, 그 오브젝트가 어떤 함수를 호출해야 할 지를 알고 있다.
우리는 그것을 동적 다형성이라고 말한다.

(*There are two different area functions; one for Square, the other for Circle. When the caller invokes the area function on a particular object, it is that object that knows what function to call. We call that dynamic polymorphism.*)

<br/>

### 알겠다. 물론 그 오브젝트가 그 메소드의 구현을 알고 있기 때문이죠.

(*OK. Sure. The object knows the implementation of its methods. Sure.*)

→ 이제 그 오브젝트들을 데이터 구조들로 바꿔보자. 우리는 식별된 결합을 이용할 것이다.

(*Now let’s turn those objects into data structures. We’ll use Discriminated Unions.*)

<br/>

### 식별된 뭐요?

→ 차별된 결합이다. 우리의 경우에서 그것은 그저 서로 다른 두 개의 데이터 스트럭처들이다.
하나는 정사각형을 위한 것이고, 다른 원형을 위한 것이다.
원형의 데이터 스트럭처에는 원의 중점과 반지름이 데이터 요소로 들어간다.
또한 그것이 원형임을 나타내는 타입 코드를 가지고 있다.

(*Discriminated Unions. In our case that’s just two different data structures. One for Square and the other for Circle. The Circle data structure has a center point, and a radius for data elements. It’s also got a type code that identifies it as a Circle.*)

<br/>

### enum과 같은 것을 말하는 건가요?

(*You mean like an enum?*)

→ 물론이다. 정사각형의 데이터 스트럭처는 죄측 상단의 점과 변의 길이를 갖고 있다.
그것은 또한 타입 식별자를 갖고 있다 - 그 enum이다.

(*Sure. The Square data structure has the top left point, and the length of the side. It also has the type discriminator – the enum.*)

<br/>

### 알겠다. 두 개의 데이터 스트럭처는 타입 코드를 하나씩 갖고 있다.

OK. Two data structures with a type code.

→ 그렇다. 이제 넓이 계산 함수를 생각해보자. 그것은 내부에 스위치 문을 갖고 있을 것이다. 그렇지 않은가?

Right. Now consider the area function. It's going to have a switch statement in it, isn’t it?

<br/>

### 물론이다. 두 개의 다른 경우를 위해서 말이다. 하나는 정사각형일 때이고 다른 하나는 원형일 때이다. 그리고 둘레 함수 역시도 비슷한 스위치 문을 갖고 있을 것이다.

(*Um. Sure, for the two different cases. One for Square and the other for Circle. And the perimeter function will need a similar switch statement*)

→ 그렇다. 이제 그 두개의 시나리로의 구조를 생각해보자. 오브젝트 시나리오에서 넓이 함수의 그 두 개의 구현은 서로 독립적이고 각자의 타입에 속할 것이다. 정사각형의 넓이 함수는 정사각형에 속하고 원형의 넓이 함수는 원형에 속한다. 

(*Right again. Now think about the structure of those two scenarios. In the object scenarios the two implementations of the area function are independent of each other and belong (in some sense of the word) to the type. Square’s area function belongs to Square and Circle’s area function belongs to Circle.*)

<br/>

### 알겠다. 그 다음 당신이 무엇을 말할지 알 것 같다. 데이터 스트럭처 시나리오에서는 넓이 함수의 그 두 개의 구현은 같은 함수에 있으며, 그들은 타입에 속하지 않는다는 것이다.

(*OK, I see where you are going with this. In the data structure scenario the two implementations of the area function are together in the same function, they don’t “belong” (however you mean that word) to the type.*)

→ 점점 나아지고 있다. 만약 당신이 삼각형 타입을 오브젝트 시나리오에 추가하려고 한다면, 어떤 코드가 변경되어야 할까?

It gets better. If you want to add the Triangle type to the object scenario, what code must change?

<br/>

### 아무 코드도 바뀌지 않는다. 당신은 그저 새로운 삼각형 클래스를 만들면 된다. 오, 아마 그 인스턴스 생성자가 바뀌어야 할 것 같다.

(*No code changes. You just create the new Triangle class. Oh, I suppose the creator of the instance has to be changed.*)

→ 그렇다. 새로운 타입을 추가할 때, 매우 적은 것이 변경된다. 이제 새로운 함수를 추가하고 싶다고 가정해 보자 - 센터 함수를 말이다.

(*Right. So when you add a new type, very little changes. Now suppose you want to add a new function - say the center function.*)

<br/>

### 글쎄요. 그렇다면 그 함수를 3개의 모든 타입에 추가해야 하지 않나요? 원형, 정사각형, 그리고 삼각형이요. 

(*Well then you’d have to add that to all three types, Circle, Square ,and Triangle.*)

→ 좋다. 새로운 함수를 추가하는 것은 어렵다. 당신은 각 클래스를 변경해야 한다.

(*Good. So adding new functions is hard, you have to change each class.*)

<br/>

### 하지만 데이터 스트럭처에서는 다르다. 삼각형을 추가하기 위해서 각 스위치 문마다 삼각형을 추가해야 하기 때문에 당신은 각 함수를 변경해야 한다.

(*But with data structures it’s different. In order to add Triangle you have to change each function to add the Triangle case to the switch statements.*)

→ 그렇다. 새로운 타입을 추가하는 것은 어렵다. 당신은 각 함수를 변경해야 한다.

(*Right. Adding new types is hard, you have to change each function.*)

<br/>

### 하지만 당신이 그 센터 함수를 새로 추가할 때는 아무것도 바뀌지 않는다.

(*But when you add the new center function, nothing has to change.*)

→ 그렇다. 새로운 함수를 추가하는 것은 쉽다.

(*Yup. Adding new functions is easy.*)

<br/>

### 와우. 완전 정반대군요.

(*Wow. It’s the exact opposite.*)

→ 확실히 그렇다. 이제 다시 정리해보자.

(*It certainly is. Let’s review:*)

→ 클래스들의 집합에 새로운 함수를 추가하는 것은 어렵다. 당신은 각 클래스를 모두 변경해야 한다.

→ 데이터 스트럭처에 새로운 함수를 추가하는 것은 쉽다. 당신은 그저 그 함수를 추가하면 되고, 다른 것은 바뀌는 것이 없다.

→ 클래스들이 집합에 새로운 타입을 추가하는 것은 쉽다. 당신은 그저 그 새로운 클래스를 추가하면 된다.

→ 데이터 스트럭처에 새로운 타입을 추가하는 것은 어렵다. 당신은 각 함수를 모두 변경해야 한다.

(*Adding new functions to a set of classes is hard, you have to change each class.*)

(*Adding new functions to a set of data structures is easy, you just add the function, nothing else changes.*)

(*Adding new types to a set of classes is easy, you just add the new class.*)

(*Adding new types to a set of data structures is hard, you have to change each function.*)

<br/>

### 그렇다. 매우 흥미로운 방식으로 서로 상반된다. 그러니까, 만약 당신이 타입들의 집합에 새로운 함수를 추가하려고 한다면, 당신은 데이터 스트럭처를 사용하고 싶을 것이다. 하지만 새로운 타입을 추가하고 싶다면 당신은 클래스들을 사용하고 싶을 것이다.

(*Yeah. Opposites. Opposites in an interesting way. I mean, if you know that you are going to be adding new functions to a set of types, you’d want to use data structures. But if you know you are going to be adding new types then you want to use classes.*)

→ 좋은 발견이다! 하지만 마지막으로 생각해야 할 것이 있다. 데이터 스트럭처와 클래스가 상반되는 다른 방식이 한 가지 더 있다. 그것은 의존성과 관련 있다.

(*Good observation! But there’s one last thing for us to consider today. There’s yet another way in which data structures and classes are opposites. It has to do with dependencies.*)

<br/>

### 의존성?

(*Dependencies?*)

→ 그렇다. 소스코드의 의존성의 방향이다.

Yes, the direction of the source code dependencies.

<br/>

### 알겠다. 차이점이 무엇인가?

(*OK, I’ll bite. What’s the difference?*)

→ 데이터 스트럭처 경우를 생각해보자. 각 함수는 스위치 문을 갖고 있는데, 그것은 식별된 유니온 안의 타입에 따라서 적절한 구현을 선택한다.

(*Consider the data structure case. Each function has a switch statement that selects the appropriate implementation based upon the type code within the discriminated union.*)

<br/>

### 알겠다. 그것은 사실이다. 그게 어쨌다는 건가?

(*OK, that’s true. But so what?*)

→ 넓이 계산 함수에 대한 호출을 생각해보자. 그 호출자는 그 넓이 함수에 의존한다. 그리고 그 넓이 함수는 각각의 모든 구현에 의존한다.

(*Consider a call to the area function. The caller depends upon the area function, and the area function depends upon every specific implementation.*)

<br/>

### "의존한다"는 것이 어떤 의미인가?

(*What do you mean by “depends”?*)

→ 넓이 함수의 각 구현들이 각자 자신만의 함수 안에 쓰여져 있다고 가정해보자. 그러므로 circleArea, squareArea, 그리고 triangleArea 구현이 각각 있는 것이다.

(*Imagine that each of the implementations of area is written into it’s own function. So there’s circleArea and squareArea and triangleArea.*)

<br/>

### 알겠다. 그러면 그 스위치 문이 그저 그러한 함수들을 호출하는 것이다.

OK, so the switch statement just calls those functions.

→ 그 함수들이 각각 다른 소스파일에 들어있다고 상상해보자.

Imagine those functions are in different source files.

<br/>

### 그렇다면 그 스위치 문을 갖고 있는 소스파일은 나머지 소스파일들을 import, use, 또는 include해야 할 것이다.

(*Then the source file with the switch statement would have to import, or use, or include, all those source files.*)

→ 그렇다. 그것이 바로 소스코드 의존성이다. 하나의 소스파일이 다른 소스파일에 의존하는 것이다. 그 의존성의 방향은 무엇인가?

(*Right. That’s a source code dependency. One source file depends upon another source file. What is the direction of that dependency?*)

<br/>

### 그 스위치 문을 갖고 있는 소스파일이 구현을 담고 있는 다른 모든 소스파일들에 의존한다.

(*The source file with the switch statement depends upon the source files that contain all the implementations.*)

→ 그리고 그 넓이 함수의 호출자는 어떻게 되는가?

(*And what about the caller of the area function?*)

<br/>

### 그 넓이 함수의 호출자는 그 스위치 문을 포함하고 있는 소스파일에 의존하며, 그것은 나머지 구현들에 의존한다.

(*The caller of the area function depends upon the source file with the switch statement which depends upon all the implementations.*)

→ 정확하다. 모든 소스파일들의 의존성은 호출의 방향과 동일하다. 호출자로부터 구현 방향으로 향한다. 따라서 만약 당신이 그 구현들 중 하나에 아주 작은 변화라도 발생시킨다면...

(*Correct. All the source file dependencies point in the direction of the call, from the caller to the implementation. So if you make a tiny change to one of those implementations…*)

<br/>

### 알겠다. 당신이 무슨 말을 하려는지 알겠다. 그 구현들 중 하나에 어떤 변화가 발생한다면 그것은 스위치 문을 갖고 있는 소스파일을 재컴파일 하도록 만들 것이고, 그것은 그 스위치 문을 호출하는 모든 호출자(이 경우에서는 그 넓이 함수)를 재컴파일하게 만들 것이다.

(*OK, I see where you are going with this. A change to any one of the implementations will cause the source file with the switch statement to be recompiled, which will cause everyone who calls that switch statement – the area function in our case – to be recompiled.*)

→ 그렇다. 최소한 소스파일의 최종 변경 날짜에 의존하여 어떤 모듈이 컴파일되어야 하는지를 결정하는 언어 시스템에 대해서는 그것은 사실이다.

(*Right. At least that’s true for language systems that depend upon the dates of source files to figure out which modules should be compiled.*)

<br/>

### 정적 타이핑을 사용하는 대부분의 것들이 그렇지 않은가?

(*That’s pretty much all of them that use static typing, right?*)

→ 그렇다. 그리고 몇몇은 그렇지 않다.

(*Yes, and some that don’t.*)

<br/>

### 그것은 엄청난 양의 재컴파일이다.

(*That’s a lot of recompiling.*)

→ 그리고 그것은 엄청난 양의 재배치이다.

(*And a lot of redeploying.*)

<br/>

### 알겠다. 하지만 이것은 클래스의 경우에 예약되어 있는 것인가?

(*OK, but this is reversed in the case of classes?*)

→ 그렇다. 왜냐하면 그 넓이 함수의 호출자는 한 인터페이스에 의존하며, 그 구현 함수 또한 그 인터페이스에 의존하기 때문이다.

(*Yes, because the caller of the area function depends upon an interface, and the implementation functions also depend upon that interface.*)

<br/>

### 당신이 무슨 말은 하는지 알겠다. Square 클래스의 소스파일은 Shape 인터페이스를 import, use 또는 include 한다.

(*I see what you mean. The source file of the Square class imports, or uses, or includes the source file of the Shape interface.*)

→ 그렇다. 구현을 갖고 있는 소스파일의 의존성 방향은 호출 방향과 반대 방향이다. 그들은 구현에서 호출자 방향으로 향한다. 최소한 그것은 정적 타입 언어들에 대해서는 사실이다. 동적 타입 언어에서는 그 넓이 함수의 호출자는 어느 것에도 의존하지 않는다. 그 연결은 런타임 때 형성된다.

(*Right. The source files of the implementation point in the opposite direction of the call. They point from the implementation to the caller. At least that’s true for statically typed languages. For dynamically typed languages the caller of the area function depends upon nothing at all. The linkages get worked out at run time.*)

<br/>

### 알겠다. 그래서 만약 당신이 그 구현들 중 하나에 변화를 만들면...

(*Right. OK. So if you make a change to one of the implementations…*)

→ 오직 변경된 파일만 재컴파일되거나 재배치된다.

(*Only the changed file needs to be recompiled or redeployed.*)

<br/>

### 그리고 그것은 소스파일들 간의 의존성이 호출의 방향과 반대이기 때문이다.

(*And that’s because the dependencies between the source files point against the direction of the call.*)

→ 그렇다. 우리는 그것을 의존성 역전이라고 부른다.

(*Right. We call that Dependency Inversion.*)

<br/>

### 알겠다. 내가 다시 정리해보겠다. 클래스와 데이터 스트럭처는 최소한 3가지 부분에 있어서 상반된다.

(*OK, so let me see if I can wrap this up. Classes and Data Structures are opposites in at least three different ways.*)

1. 클래스는 데이터를 감추는 대신에 함수를 노출시킨다. 데이터 스트럭처는 데이터를 보여주지만 함수는 감춘다.

2. 클래스는 새로운 타입을 추가하는 것은 쉽지만 새로운 함수를 추가하는 것은 어렵다. 데이터 스트럭처는 새로운 함수를 추가하는 것은 쉽지만 새로운 타입을 추가하는 것은 어렵다.

3. 데이터 스트럭처는 호출자에게 재컴파일과 재배치에 노출시킨다. 클래스는 호출자를 재컴파일이나 재배치로부터 격리시킨다.

(*Classes make functions visible while keeping data implied. Data structures make data visible while keeping functions implied.*)

(*Classes make it easy to add types but hard to add functions. Data structures make it easy to add functions but hard to add types.*)

(*Data Structures expose callers to recompilation and redeployment. Classes isolate callers from recompilation and redeployment.*)

→ 당신은 이제 알았다. 이것은 모든 좋은 소프트웨어 디자이너와 아키텍트가 항상 머릿속에 간직해야 하는 문제들이다.

(*You got it. These are issues that every good software designer and architect needs to keep in mind.*)

<br/>

---

원본 출처

[Robert C. Martin (Uncle Bob). (2019, June 16). Classes vs. Data Structures.](https://blog.cleancoder.com/uncle-bob/2019/06/16/ObjectsAndDataStructures.html)

`ts`

##### 쉽게 시작하는 타입스크립트 도서를 보고 공부하며 기록.

## 타입 별칭이란?

`타입 별칭(type alias)`은 특정 타입이나 인터페이스 등을 참조할 수 있는 타입 변수를 의미합니다.

```ts
// MyName이라는 타입 별칭을 선언하고 string 타입을 할당합니다.
type MyName = string;

let capt: string = 'slatime';
// 타입별칭 적용
let capt: MyName = 'slatime';
```

타입별칭을 썼을 때 장점은 반복되는 타입 코드를 줄여 줄 수 있습니다.

```ts
function logText(text: string | number) {
  //...
}

let message: string | number = 'hello';
logText(message);

// 타입 별칭 적용
type MyMessage = string | number;
function logText(text: MyMessage) {
  //...
}

let message: MyMessage = 'hello';
logText(message);
```

string | number 타입을 MyMessage라는 타입 별칭으로 정의하고 logText() 함수와 message 변수에 지정하였습니다.

> 타입 변수라고 표현햇다고 해서 타입을 선언하고 다시 다른 타입을 할당할 수 없습니다. <br> type MyName = string; <br> type MyName = number; `error`

## 타입 별칭과 인터페이스의 차이점

```ts
type User = {
  id: string;
  name: string;
};

interface User {
  id: string;
  name: string;
}

// 타입과 인터페이스의 차이점은?
```

### 코드 에디터에서 표기 방식 차이

- 표기방식 차이
  ![img](/images/vscode-type-interface-preview.png)

### 사용할 수 있는 타입의 차이

인터페이스는 주로 객체의 타입을 정의하는데 사용하는 반면, 타입 별칭은 일반 타입에 이름을 짓는데 사용하거나 유니언 타입, 인터섹션 타입 등에도 사용할 수 있습니다.

```ts
type ID = string;
type Product = Tshirt | Shoes;
type teacher = Person & Adult;
```

반대로 이런 타입들은 인터페이스로 정의할 수 없습니다. 그리고 타입별칭은 제네릭이나 유틸리티 타입 등 다양한 타입에 사용핧 수 있습니다.

```ts
type but<T> = {
  book: T;
};

type MyBeer = Pick<Beer, 'brand'>;
```

인터페이스와 타입 별칭의 정의를 함께 사용할 수도 있습니다.

```ts
interface Person {
  name: string;
  age: number;
}
type Adult = {
  old: boolean;
};

type Teacher = Person & Adult;
```

### 타입 확장 관점에서 차이

타입 확장이란 이미 정의되어 있는 타입들을 조합해서 더 큰 의미의 타입을 생성하는 것을 의미합니다.

```ts
// 인터페이스 타입 확장
// 인터페이스의 타입을 자식 인터페이스에서 상속해서 사용
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  skill: string;
}
let slatime: Developer = {
  name: 'slatime',
  age: 21,
  skill: 'web',
};

// 타입별칭 타입 확장은 인터섹션 타입으로 객체 타입을 2개 합쳐서 사용할 수 있습니다.
type Person = {
  name: string;
  age: number;
};

type Developer = {
  skill: string;
};

let slatime: Person & Developer = {
  name: 'slatime',
  age: 21,
  skill: 'web',
};

// 인터섹션 타입을 별도의 타입 별칭 정의로 사용할 수 있습니다.
type Slatime = Person & Developer;
let slatime: Slatime = {
  name: 'slatime',
  age: 21,
  skill: 'web',
};
```

인터페이스의 `선언 병합`은 인터페이스를 동일한 이름으로 선언하면 인터페이스의 내용을 합치는 특성이 있습니다.

```ts
interface Person {
  name: string;
  age: number;
}

interface Person {
  address: string;
}

let slatime: Person = {
  name: 'slatime',
  age: 21,
  address: 'street',
};
```

## 타입 별칭은 언제 쓰는 것이 좋을까?

타입 별칭으로만 타입 정의가 가능한 곳에서는 타입 별칭을 사용하고 백엔드와 인터페이스를 정의하는 곳에서는 인터페이스를 이용하자.

### 타입 별칭으로만 정의할 수 있는 타입들

데이터 타입이나 인터센션, 유니언 타입입니다. 인터페이스는 객체 타입을 정의할 때 사용하는 타입이기 때문에 다음 타입은 인터페이스로 정의할 수 없습니다.

```ts
type MyString = string;
type StringOrNumber = string | number;
type Admin = Person & Developer;
```

타입별칭은 제네릭, 유틸리티 타입, 맵드 타입과도 연동하여 사용할 수 있습니다.

```ts
// 제네릭
type Dropdown<T> = {
  id: string;
  title: T;
};

// 유틸리티
type Admin = { name: string; age: number; role: string };
type OnlyName = Pick<Admin, 'name'>;

// 맵드 타입
type Picker<T, K extends key of T> = {
  [P in K]: T[P]
}
```

제네릭은 인터페이스와 타입 별칭에 모두 상요할 수 있지만 유틸리티 타입이나 맵드 타입은 타입 별칭으로만 정의할 수 있습니다.

### 백엔드와 인터페이스 정의

```ts
// 타입 별칭으로 api 응답 형태를 정의
type User = {
  id: string;
  name: string;
};

function getchData(): User {
  return axios.get('http://localhost/users/1');
}

// 인터페이스로 api 함수의 응답 형태를 정의
interface User {
  id: string;
  name: string;
}

function fetchData(): User {
  return axios.get('http://localhost/users/1');
}
```

데이터 구조가 변경되었을 때 사용자 객체의 속성에 role, adress등 추가되거나 다른 객체 정보와 결합하여 표시되어야 한다면 기존의 타입확장이라는 측면에서 인터페이스로 정의하는 것이 더 수월합니다.

```ts
interface Admin {
  role: string;
  department: string;
}

// 상속
interface User extends Admin {
  id: string;
  name: string;
}

// 선언 병합
interface User {
  skill: string;
}

// result User
interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  skill: string;
}
```

이처럼 유연하게 타입을 확장하는 관점ㄴ에서는 타입 별칭보다 인터페이스가 더 유리합니다.

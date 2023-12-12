`ts`

##### 쉽게 시작하는 타입스크립트 도서를 보고 공부하며 기록.

# 인터페이스

타입스크립트에서 인터페이스(interface)는 객체 타입을 정의할 때 사용하는 문법입니다.
인터페이스로 타입을 정의할 수 있는 부분은 다음과 같습니다.

- [객체의 속성과 속성 타입](#인터페이스를-이용한-객체-타입-정의)
- [함수의 파라미터와 반환 타입](#인터페이스를-이용한-함수-타입-정의)
- [함수의 스펙(파라미터 개수와 반환값 여부 등)](#인터페이스의-옵션-속성)
- [클래스](#인터페이스-상속)
- [배열과 객체를 접근하는 방식](#인터페이스를-이용한-인덱싱-타입-정의)

## 인터페이스를 이용한 객체 타입 정의

인터페이스로 객체 타입을 정의해 보겠습니다. 다음과 같은 객체가 있다고 합시다.

```ts
let seho = { name: '세호', age: 36 };
```

문자열을 갖는 `name`속성과 숫자를 갖는 `age`속성으로 구성된 객체입니다. 이 객체의 타입을 인터페이스로 정의하면 다음과 같습니다.

```ts
interface User {
  name: string;
  age: number;
}

let seho: User = { name: '세호', age: 36 };
```

`interface`라는 예약어를 이용하여 `User`라는 인터페이스를 선언한 코드입니다. 인터페이스의 속성으로 `name`과 `age`를 각각 문자열과 숫자타입으로 정의했습니다.

## 인터페이스를 이용한 함수 타입 정의

앞에서 인터페이스는 객체의 타입을 정의할 때 사용한다고 배웠습니다. 그렇다면 객체가 활용되는 모든 곳에 인터페이스를 쓸 수 있다는 이야기인데요. 객체는 함수의 파라미터로 사용되고 반환값으로도 사용될 수 있습니다.

### 함수 파라미터 타입 정의

다음과 같은 함수가 있다고 합시다.

```ts
function logAge(someone) {
  console.log(someone.age);
}
```

`logAge()`는 `someone`이라는 인자를 받아 인자 안의 `age`속성을 출력하는 간단한 함수입니다. 특정 데이터에 속성이 존재하려면 해당 데이터가 객체여야 하기 때문에 이 함수의 파라미터를 좀 더 명시적으로 선언하려면 다음과 같이 인터페이스를 이요하여 타입을 선언합니다.

```ts
interface Person {
  name: string;
  age: number;
}

function logAge(someone: Person) {
  console.log(someone.age);
}
```

`Person`이라는 인터페이스를 선언한 후 `logAge()` 함수의 파라미터인 `someone`에 `Person`타입을 정의합니다. 함수의 파라미터 타입은 콜론(:)이라는 타입 표기 방식을 이용해서 정의합니다.

```ts
interface Person {
  name: string;
  age: number;
}

function logAge(someone: Person) {
  console.log(someone.age);
}

let captain = { name: 'Capt', age: 100 };
logAge(captain); //; 100

// 파라미터 타입이 만족하지 않으면 에러를 반환
let captain2 = { name: 'Capt' };
logAge(captain2); // error
```

### 함수 반환 타입 정의

이번에는 함수 반환 타입을 인터페이스로 정의해보겟습니다. 다음 코드를 봅시다.

```ts
interface Person {
  name: string;
  age: number;
}

function getPerson(someone: Person) {
  return someone;
}
```

이 함수의 반환 타입을 명시적으로 표시하기 위해 다음과 같이 인터페이스로 함수의 반환 타입을 정의할 수 있습니다.

```ts
interface Person {
  name: string;
  age: number;
}

function getPerson(someone: Person): Person {
  return someone;
}
```

## 인터페이스의 옵션 속성

인터페이스로 정의된 객체의 속성을 선택적으로 사용하고 싶을 때 옵션 속성을 사용합니다. 예를 들어 다음과 같이 속성을 2개 가진 객체에서 속성 1개만 필요할 때가 있다고 합시다.

```ts
interface Person {
  name: string;
  age: number;
}

function logAge(someone: Person) {
  console.log(someone.age);
}

let captain = { age: 100 };
logAge(captain);
```

이 코드를 보면 `logAge()`라는 함수는 name과 age속성을 가진 객체를 받아 age속성의 값을 출력합니다. 현재 로직상으로는 변수에 age 속성만 있으면 되기 때문에 captain 변수에 age속성만 정의하여 인자로 넘깁니다. 이때 logAge()함수에 다음과 같은 에러가 발생합내다.

```ts
// 생략
let captain = { age: 100 };
logAge(captain);

// error { age: nubmer; } 형식의 인수는 'Person'형식의 매개 변수에 할당될 수 없습니다.
// 'name'속성이 'Person'형식에서 필수입니다.
```

이 에러는 logAge()의 인자가 name과 age속성을 가진 객체여야 하는데 age속성만 정의된 객체를 받아서 발생합니다.
`옵션 속성(optional property)`을 사용해 상황에 따라 유연하게 인터페이스 속성의 사용 여부를 결정할 수 있습니다.

```ts
interface Person {
  name?: string;
  age: number;
}
```

## 인터페이스 상속

인터페이스 상속으로 타입 정의를 확장하는 방법을 알아보겟습니다. 상속은 객체 간 관계를 형성하는 ㅏㅇ법이며, 상위(부모) 클래스의 내용을 하위(자식) 클래스가 물려받아 사용하거나 확장하는 기법을 의미합니다.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  logAge() {
    console.log(this.age);
  }
}

class Developer extends Person {
  constructor(name, age, skill) {
    super(name, age);
    this.skill = skill;
  }

  logDeveloperInfo() {
    this.logAge();
    console.log(this.name);
    console.log(this.skill);
  }
}

let capt = new Developer('캡틴', 100, 'js');
capt.logDeveloperInfo(); // 100, 캡틴, js
```

### 인터페이스의 상속이란?

앞서 클래스를 상속받을 때 `extends`란 예약어를 사용했습니다. 인터페이스를 상속받을 때도 동일하게 `extends`예약어를 사용합니다.

```ts
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  skill: string;
}

let ironman: Developer = {
  name: '아이언맨',
  age: 100,
  skill: '레이저',
};
```

이렇게 extends 키워드를 사용해서 인터페이스의 타입을 상속받아 확장하여 사용할 수 있습니다.

### 인터페이스를 상속할 때 참고사항

상위 인터페이스의 타입을 하위 인터페이스에서 상속받아 타입을 정의할 때 상위 인터페이스의 타입과 호환이 되어야 합니다. 여기에서 호환이 된다는 것은 상위 클래스에서 정의된 타입을 사용해야 한다는 의미입니다.

```ts
interface Person {
  name: string;
  age: number;
}
interface Developer extends Person {
  name: number;
}
// error
// `Developer` 인터페이스가 'Person' 인터페이스를 잘못 확장합니다.
// 'name'속성의 형식이 호환되지 않습니다.
```

상속을 여러번 할 때에도 부모 인터페이스에 정의된 타입을 자식 인터페이스에서 모두 보장해주어야 합니다.

```ts
interface Hero {
  power: boolean;
}

interface Person extends Hero {
  name: string;
  age: number;
}

interface Developer extends Person {
  skill: string;
}

let ironman: Developer = {
  name: '아이언맨',
  age: 100,
  skill: '레이저',
  power: true,
};
```

## 인터페이스를 이용한 인덱싱 타입 정의

인덱싱이란 다음과 같이 객체의 특정 속성을 접근하거나 배열의 인덱스로 특정 요소에 접근하는 동작을 의합니다.

```ts
let user = {
  name: 'slatime',
  age: 11,
};
consle.log(user['name']); // slatime

let companies = ['삼성', '네이버', '구글'];
console.log(companies[0]); // 삼성
```

이렇게 `user['name']`형태로 객체의 특정 속성에 접근하거나 `companies[0]`형태로 배열의 특정 요소에 접근하는 것을 `인덱싱`이라고 합니다.

### 배열 인덱싱 타입 정의

배열을 인덱싱할 때 인터페이스로 인덱스와 요소의 타입을 정의할 수 있습니다.

```ts
interface StringArray {
  [index: number]: string;
}

let compaines: StringArray = ['삼성', '네이버', '구글'];
```

StringArray 인터페이스 속성에 [index: number]라는 코드가 선언되었습니다. 이 코드는 어떤 숫자든 모두 속성의 이름이 될 수 있다는 의미입니다. 그리고 [index: number]: string; 에서 속성 이름은 숫자고 그 속성 값으로 문자열 타입이 와야 한다는 의미입니다.

### 객체 인덱싱 타입 정의

배열 인덱싱과 마찬가지로 객체 인덱싱의 타입도 인터페이스로 정의할 수 있습니다.

```ts
interface SalaryMap {
  [level: string]: number;
}

let salary: SalaryMap = {
  junior: 100,
};
```

이 SalaryMap 인터페이스는 속성 이름이 문자열 타입이고 속성 값이 숫자 타입인 모든 속성 이름/속성 쌍을 허용하겠다는 의미입니다.

> 객체의 속성에 접근하는 방법은 salary['junior'] 또는 salary.junior 모두 가능합니다. 다만 속성 이름에 숫자나 - 등 특수 기호가 들어가면 .junior 방식으로 접근할 수 없기 때문에 ['junior']방식으로 접근해야 합니다.

### 인덱스 시그니처란?

앞서 배열과 객체의 인덱싱 타입을 정의할 때는 다음 형태로 인터페이스를 정의했습니다.

```ts
interface SalaryMap {
  [level: string]: number;
}
```

이처럼 정확히 속성 이름을 명시하지 않고 속성 이름의 타입과 속성 값의 타입을 정의하는 문법을 `인덱스 시그니처(index signature)`라고 합니다. 인덱스 시그니처는 단순히 객체와 배열을 인덱싱할 때 활용될 뿐만 아니라 객체의 속성 타입을 유연하게 정의할 때도 사용됩니다.

```ts
let salary = {
  junior: '100원',
};
```

이 겍체의 타입을 인터페이스로 정의한다면 다음과 같이 작성됩니다.

```ts
interface SalaryInfo {
  junior: string;
}
```

위와같이 명식적으로 junior: string이라는 타입을 정의할 수 잇습니다. 하지만 미드, 시니어 등 여러 레벨의 급여(salary)까지 추가한다고 하면 에러가 발생합니다.

```ts
let salary = {
  junior: '100원',
  mid: '400원',
  senior: '700원',
};
// error  (property) mid: string
```

결국 인터페이스 정의를 객체 내용에 맞추어 다음과 같이 수정해야 타입 에러가 발생하지 않습니다.

```ts
interface SalaryInfo {
  junior: string;
  mid: string;
  senior: string;
}
```

하지만 새로운 객체의 프로퍼티가 추가된다면 다시 인터페이스를 수정해야되는 번거로움이 생깁니다. 이때 인덱스 시그니처 방식을 이용하여 속성 이름의 타입과 벨류의 타입을 설정합니다.

```ts
interface SalaryInfo {
  [level: string]: string;
}
```

### 인덱스 시그니처는 언제 쓸까?

객체의 속성 이름과 개수가 구체적으로 정의되어 있다면 인터페이스에서 속성 이름과 속성 값의 타입을 명시하는 것이 더 효과적입니다.
인덱스 시그니처가 적용되어있는 인터페이스에는 구채적으로 어떤 속성이 제공될지 알 수 없어 코드 자동완성이 되지 않습니다.
인터페이스에 고정 프로퍼티가 있다면 다음과 같이 섞어서 정의할 수 있습니다.

```ts
interface User {
  [property: string]: string;
  id: string;
  name: string;
}
```

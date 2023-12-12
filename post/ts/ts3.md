`ts`

##### 쉽게 시작하는 타입스크립트 도서를 보고 공부하며 기록.

# 연산자를 사용한 타입 저의

연산자 기호를 이용하여 타입을 정의하는 방법을 알아보겟습니다. 자바스크립트의 or 연산자인 `||` 와 and 연산자인 `&&`을 따서 타입을 정의할 수 잇습니다.

## 유니언 타입

`유니언 타입(union type)`은 여러 개의 타입 중 한 개만 쓰고 싶을 때 사용하는 문법입니다.

```ts
function logText(text: string) {
  console.log(text);
}
logText('hi'); // hi
logText(100); // error 'number' 형식의 인수는 'string'형식의 매개 변수에 할당할 수 없습니다.
```

이때 유니언 타입을 사용하면 문제를 해결 할 수 있습니다.

```ts
function logText(text: string | number) {
  console.log(text);
}
logText('hi'); // hi
logText(100); // 100
```

## 유니언 타입의 장점

- 같은 동작을 하는 함수의 코드 중복을 줄일 수 잇습니다.
- 여러개의 타입을 받기 위해 any 타입을 사용햇을 때와 비교해도 더 타입을 정확하게 사용할 수 있습니다.
- 타입스크립트의 장점인 자동 속성과 api 스펙이 자동완성기능을 사용할 수 잇습니다.

## 유니언 타입을 사용할 때 주의할 점

앞에서 유니온 타입과 인터섹션 타입을 살펴봤습니다. 아마 논리적으로 유니온 타입은 OR, 인터섹션은 AND라고 생각하시는 분들이 있을텐데요. 인터페이스와 같은 타입을 다룰 때는 이와 같은 논리적 사고를 주의하셔야 합니다.

```ts
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: string;
}
function introduce(someone: Person | Developer) {
  someone.name; // O 정상 동작
  someone.age; // X 타입 오류
  someone.skill; // X 타입 오류
}
```

여기서 `introduce()` 함수의 파라미터 타입을 `Person`, `Developer` 인터페이스의 유니온 타입으로 정의하였는데요. 유니온 타입은 A도 될 수 있고 B도 될 수 있는 타입이지라고 생각하면 파라미터의 타입이 `Person`도 되고 `Developer`도 될테니까 함수 안에서 당연히 이 인터페이스들이 제공하는 속성들인 `age`나 `skill`를 사용할 수 있겠지라고 생각할 수 있습니다. 하지만, 타입스크립트 관점에서는 `introduce()` 함수를 호출하는 시점에 `Person` 타입이 올지 `Developer` 타입이 올지 알 수가 없기 때문에 어느 타입이 들어오든 간에 오류가 안 나는 방향으로 타입을 추론하게 됩니다.

```ts
const capt: Person = { name: 'capt', age: 100 };
introduce(capt); // 만약 `introduce` 함수 안에서 `someone.skill` 속성을 접근하고 있으면 함수에서 오류 발생
```

```ts
const tony: Developer = { name: 'tony', skill: 'iron making' };
introduce(tony); // 만약 `introduce` 함수 안에서 `someone.age` 속성을 접근하고 있으면 함수에서 오류 발생
```

결과적으로 `introduce()` 함수 안에서는 별도의 `타입 가드(Type Guard)`를 이용하여 타입의 범위를 좁히지 않는 이상 기본적으로는 `Person`과 `Developer` 두 타입에 공통적으로 들어있는 속성인 name만 접근할 수 있게 됩니다.

```ts
function introduce(someone: Person | Developer) {
  // in 연산자는 객체에 특성 속성이 있는지 확인하는 자바스크립트 연산자
  if ('age' in someone) {
    console.log(someone.age);
    return;
  }

  if ('skill' in someone) {
    console.log(someone.skill);
    return;
  }
}
```

특정 타입의 속성과 메서드를 사용하고 싶다면 typeof 나 in 연산자를 통해 타입을 구분한 후 코드를 작성해야 합니다. 이러한 동작을 타입 가드라고 합니다.

## 인터섹션 타입

인터섹션 타입(intersection type)은 타입 2개를 하나로 합쳐서 사용할 수 있는 타입입니다. 보통 인터페이스 2개를 합치거나 타입 정의 여러개를 하나로 합칠 때 사용합니다.

```ts
interface Avenger {
  name: string;
}

interface Hero {
  skill: string;
}

function introduce(someone: Avenger & Hero) {
  console.log(someone.name);
  console.log(someone.skill);
}
```

인터페이스 Avenger와 Hero를 선언하고 introduce 함수의 파라미터에 인터섹션 타입(`&`)으로 정의햇습니다. 따라서 파라미터에는 두 타입의 name과 skill속성을 모두 사용할 수 있습니다.

```ts
introduce({ name: 'slatime', skill: '어셈' });
introduce({ name: 'slatime' }); // error
```

introduce 함수의 파라미터가 Avenger와 Hero 타입의 인터섹션 타입으로 정의되어 있기 때문에 모든 속성을 만족하는 객체를 인자로 넘겨야 한다는 의미입니다.

`ts`

##### 쉽게 시작하는 타입스크립트 도서를 보고 공부하며 기록.

# 변수와 함수 타입

```js
//자바스크립트 코드에서 변수에 문자열을 항당
let name = 'slatime';
```

```ts
// 변수의 타입은 문자열이고 값으로 slatime이라는 문자열을 갖는다는 의미
// 변수 이름 뒹 콜론(:)을 붙여서 해당 변수의 타입을 정의할 수 있습니다.
let name: string = 'slatime';
```

> 이 콜론(:)을 타입표기(type annotation)라고 합니다.

## 기본타입

- [string](#문자열-타입-string)
- [number](#숫자-타입-number)
- [boolean](#진위타입-boolean)
- [object](#객체타입-object)
- [Array](#배열-타입-array)
- [tuple](#튜플-타입-tuple)
- [any](#any)
- [null](#null과-undefined)
- [undefined](#null과-undefined)

### 문자열 타입: string

스트링은 무자열을 의미하는 타입입니다.

```ts
let name: string = 'slatime';
```

name 변수의 타입이 string으로 지정되어 있기 때문ㅋ에 이제 이 변수는 문자열만 취급하는 변수.

### 숫자 타입: number

```ts
let age: number = 100;
```

### 진위타입: boolean

진위 값만 취급하는 변수에는 boolean이라는 타입을 사용합니다.

```ts
let isLogin: boolean = false;
```

### 객체타입: object

객체 유형의 데이터를 취급할 때는 object라는 타입을 사용합니다.

```ts
let hero: obejct = { name: 'slatiem', age: 100 };
```

> 타입스크립트의 장접을 극대화하려면 가급적 타입을 최대한 구체적으로 선언해야 한다. 이 관점에서 볼 때 예시의 object타입은 어떤 속성이 있고 해당 속성이 무슨 타입을 갖는지 명시되어 있지 않으므로 자바스크립트를 사용하는것과 크게 차이가 없습니다. object를 구체적으로 명시하는 방법은 인터페이스에서 설명.

### 배열 타입: Array

배열타입은 두 가지 방법으로 선언할 수 잇습니다.

```ts
// 문자배열
let companies: Array<string> = ['Google', '삼성', 'lg'];
let companies: string[] = ['Google', '삼성', 'lg'];

//숫자배열
let cards: Array<number> = [1, 2, 3, 4];
let cards: number[] = [1, 2, 3, 4];
```

> Array<배열의 데이터 타입<br>배열의 데이터 타입[]

### 튜플 타입:tuple

튜플은 특정 형태를 갖는 배열을 의미합니다. 배열 길이가 고정되고 각 요소 타입이 정의된 배열을 튜플이라고 합니다.

```ts
let itmes: [string, number] = ['hi', 1];
```

`items`의 변수는 배열 길이가 2고 첫 번째 요소는 `문자열`, 두 번째 요소는 `숫자`인 타입으로 정의되어 있습니다.

### any

`any`타입은 아무 데이터나 취급하겠다는 의미입니다. 타입스크립트에서 자바스크립트의 유연함을 취하려고 할 때 사용하는 타입입니다.

```ts
let myName: any = 'slatime';
myName = 1100;
let age: any = 22;
```

### null과 undefined

자바스크립트에서 `null`은 의도적인 빈 값을 의미합니다. 개발자가 의도적으로 값을 비어 두고 싶을 때 사용하는 값이죠.
반면 `undefined`는 변수를 선언할 때 값을 할당하지 않으면 기본적으로 할당되는 초깃값입니다.

```ts
let empty: null = null;
let nothingAssigned: undefined;
```

empty변수에는 null값을 할당했기 때문에 null타입을 지정했습니다. nothingAssigned변수는 선언만 하고 아무값도 할당하지 않아서 undefined가 초깃값으로 지정될것입니다. 그래서 nothingAssigned 변수를 undefined 타입으로 지정해주었습니다.

> null과 undefined 타입은 타입스크립트 설정파일의 strict 옵션에 따라 사용 여부가 결정됩니다. strict 옵션이 꺼져 잇을 때는 신경쓰지 않아도 되는 타입입니다.

## 함수에 타입을 정의하는 방법

```js
// 자바스크립트에서 함수는 다음과 같이 선언.

// function -> 예약어
// sayHi -> 함수명
// word -> 매개변수(파라미터)
function sayWord(word) {
  return word;
}

// hello, bye -> 인자
sayWord('hello');
saysayWordHi('bye');
```

### 함수의 타입 정의: 파라미터와 반환값

함수의 타입을 정의할 때는 입력값과 출력값에 대한 타입을 정의합니다. 앞서 살펴본 sayWord 함수를 다시 보겠습니다.

```js
function sayWord(word) {
  return word;
}
```

sayWord함수는 입력받은 단어를 그대로 반환하라는 의미이므로 word 파라미터는 문자열을 취급하고 반환값도 문자열이 된다는 것을 알 수 있습니다. 그럼 먼저 반환값의 타입을 문자열로 지정해 보겠습니다.

```ts
function sayWord(word): string {
  return word;
}
```

함수의 반환값 타입은 위와 같이 함수 이름 오른쪽에 `: 타입이름`으로 지정할 수 있습니다. 이 함수의 반환값은 문자열이라는 것을 명시합니다. 여기에서 함수의 입력값인 파라미터 타입도 문자열로 지정해 보겠습니다.

```ts
function sayWord(word: string): string {
  return word;
}
```

이번에는 word 파라미터의 타입이 문자열이라고 명시했습니다. 파라미터 오른쪽에 `: 타입이름`을 넣으면 파라미터의 타입이 정의됩니다.

### 타입스크립트 함수의 인자 특징

자바스크립트 함수에서는 파라미터와 인자의 개수가 일치하지 않아도 문제가 없었습니다. 그러나 타입스크립트에서는 파라미터와 인자의 개수가 다르면 에러가 발생합니다.

### 옵셔널 파라미터

이번에는 반대로 파라미터의 개수만큼 인자를 넘기지 않고 싶을 때는 어떻게 해야 할까요. 다음과 같이 성과 이름을 입력받아 내 이름을 반환해주는 함수가 있다고 합시다.

```ts
function sayMyName(firstName: string, lastName: string): string {
  return `myName : ${firstName} ${lastName}`;
}

sayMyName('slatime');
// error 2개의 인수가 필요한데 1개를 가져왔습니다.
```

옵셔털 파라미터(optional parameter)를 사용해 선택적으로 파라미터를 사용하게 변경합니다.
옵셔털 파라미터는 `?`로 표기합니다. 선택적으로 사용하고 싶은 파라미터의 오른쪽에 다음과 같이 `?`를 붙이면 됩니다.

```ts
function sayMyName(firstName: string, lastName?: string): string {
  return `myName : ${firstName} ${lastName}`;
}

sayMyName('slatime');
// myName : slatime
```

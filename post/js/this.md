# JavaScript의 this 바인딩

JavaScript에서 `this`의 값은 함수가 호출되는 방식에 따라 동적으로 결정됩니다. 여러 상황에서 `this`가 어떻게 바인딩되는지 알아보겠습니다.

## 함수의 다양한 형태
함수 생성 방식은 ES5와 ES6를 기준으로 생각하면 쉽습니다. ES5까지의 함수 표현(`function` 키워드 사용)은 모두 `Normal`이고, ES6의 화살표 함수는 `Arrow`, 객체 리터럴에서 메서드 문법은 `Method`가 됩니다.

```javascript
function foo() {} // Normal
const foo1 = () => {}; // Arrow
const person = {
  // ...
  sayName() {} // Method
};
```

함수 생성을 구분하는 이유는 `Arrow`나 `Method`인 경우 생성자로 동작하지 못하도록 방지하고(`[[Construct]]` 메서드를 구현하지 않음), 함수의 `this` 참조 방식을 결정하기 위해서입니다(`Arrow`인 경우 `this` 키워드는 lexical 참조).

## 1. 일반 함수 호출
일반 함수로 호출할 경우 `this`는 전역 객체(window)를 가리킵니다.

```javascript
function show() {
    console.log(this); // window (브라우저 환경)
}

show();
```

## 2. 메서드 호출
메서드로 호출할 경우 `this`는 해당 메서드를 소유한 객체를 가리킵니다.

```javascript
const person = {
    name: 'Kim',
    sayHi() {
        console.log(this); // {name: 'Kim', sayHi: f}
        console.log(this.name); // 'Kim'
    }
};

person.sayHi();
```

## 3. 생성자 함수 호출
`new` 키워드와 함께 생성자 함수를 호출할 경우 `this`는 새로 생성되는 객체를 가리킵니다.

```javascript
function Person(name) {
    this.name = name;
    console.log(this); // Person {name: 'Kim'}
}

const person1 = new Person('Kim');
```

**생성자 함수에서의 주의사항:**
- `new` 연산자와 함께 호출하면 생성자로 동작
- `person1`은 새로운 객체가 생성됨
- 일반 함수로 호출하면 `this`가 전역 객체를 가리킴
```javascript
Person('Lee'); // window.name = 'Lee'가 됨 (의도치 않은 전역 객체 오염)
```

## 4. 화살표 함수
화살표 함수에서 `this`는 상위 스코프의 `this`를 가리킵니다 (렉시컬 this).

```javascript
const person = {
    name: 'Kim',
    sayHiLater() {
        setTimeout(() => {
            console.log(this.name); // 'Kim'
        }, 1000);
    }
};

person.sayHiLater();
```

## 5. 콜백 함수에서의 this
콜백 함수에서 `this`는 함수의 종류와 호출 방식에 따라 다르게 바인딩됩니다.

```javascript
const button = document.querySelector('button');

// 일반 함수: this는 이벤트를 발생시킨 요소
button.addEventListener('click', function() {
    console.log(this); // button 요소
});

// 화살표 함수: this는 상위 스코프의 this
button.addEventListener('click', () => {
    console.log(this); // window
});
```

## 6. 명시적 this 바인딩
`call`, `apply`, `bind` 메서드를 사용하여 `this`를 명시적으로 바인딩할 수 있습니다.

```javascript
function introduce() {
    console.log(`안녕하세요, ${this.name}입니다.`);
}

const person1 = { name: 'Kim' };
const person2 = { name: 'Lee' };

// call
introduce.call(person1);    // 안녕하세요, Kim입니다.
introduce.call(person2);    // 안녕하세요, Lee입니다.

// apply
introduce.apply(person1);   // 안녕하세요, Kim입니다.

// bind
const boundIntroduce = introduce.bind(person1);
boundIntroduce();          // 안녕하세요, Kim입니다.
```

## 7. 메서드 내부의 중첩 함수
메서드 내부의 중첩 함수에서 `this`는 전역 객체를 가리키지만, 화살표 함수나 `bind`를 사용하여 해결할 수 있습니다.

```javascript
const person = {
    name: 'Kim',
    sayHi() {
        function innerFunc() {
            console.log(this); // window
        }
        innerFunc();
        
        // 해결방법 1: 화살표 함수 사용
        const innerArrow = () => {
            console.log(this); // person 객체
        }
        innerArrow();
        
        // 해결방법 2: bind 사용
        const boundInner = innerFunc.bind(this);
        boundInner(); // person 객체
    }
};
```

## this 바인딩 문제 해결 방법

### 1. 화살표 함수 사용
```javascript
const person = {
    name: 'Kim',
    friends: ['Lee', 'Park'],
    printFriends() {
        // 화살표 함수는 상위 스코프의 this를 유지
        this.friends.forEach(friend => {
            console.log(this.name + '의 친구: ' + friend);
        });
    }
};
```

### 2. bind 메서드 사용
```javascript
const person = {
    name: 'Kim',
    friends: ['Lee', 'Park'],
    printFriends() {
        this.friends.forEach(function(friend) {
            console.log(this.name + '의 친구: ' + friend);
        }.bind(this));
    }
};
```

### 3. 변수에 this 저장
```javascript
const person = {
    name: 'Kim',
    friends: ['Lee', 'Park'],
    printFriends() {
        const that = this;
        this.friends.forEach(function(friend) {
            console.log(that.name + '의 친구: ' + friend);
        });
    }
};
```
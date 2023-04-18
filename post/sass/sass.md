# Sass

-   [Sass(Syntactically Awesome StyleSheets)](https://sass-lang.com/)는 CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장(extension)이다.
-   Sass추가 기능

    -   변수의 사용
    -   조건문과 반복문
    -   Import
    -   Nesting
    -   Mixin
    -   Extend/Inheritance

-   CSS와 비교하여 Sass는 아래와 같은 장점이 있다.
    -   CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다.
    -   스킬 레벨이 다른 팀원들과의 작업 시 발생할 수 있는 구문의 수준 차이를 평준화할 수 있다.
    -   CSS에는 존재하지 않는 Mixin 등의 강력한 기능을 활용하여 CSS 유지보수 편의성을 큰 폭으로 향상시킬 수 있다.

## Install

```bash
npm install -g sass
```

## 트랜스파일

-   foo.scss 생성

```sass
$site_max_width: 960px;
$font_color: #333;
$link_color: #00c;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);

body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}

#main {
  width: 100%;
  max-width: $site_max_width;
}
```

-   트랜스파일링할 SCSS파일의 경로와 트랜스 파일링 후 생성될 css파일의 경로를 지정한다

```bash
## foo.scss를 트랜스파일링해서 foo.css를 생성
$ sass foo.scss:foo.css
```

foo.scss 파일이 트랜스파일링되어 다음과 같이 foo.css파일이 생성된다

```css
body {
    color: #333;
    font-size: 16px;
    font-family: Arial, sans-serif;
    line-height: 125%;
}

#main {
    width: 100%;
    max-width: 960px;
}

/*# sourceMappingURL=foo.css.map */
```

특정 디렉터리 내 모든 scss 파일을 css파일로 일괄 트랜스파일링해서 지정한 디렉터리에 지정하려면 다음과 같이 인풋,아웃풋 디렉토리를 지정한다.

```bash
## sass input-directory-path:output-directory-path
$ sass src/sass:dist/css
```

npm scripts를 사용하면 매번 긴 명령어를 입력하지 않고 좀 더 간단히 명령어를 사용할 수 있다.
프로젝트 디럭터리에 아직 package.json이 없다면 다음 명령으로 package.json을 생성한다.

```bash
cd sass-project
npm init -y
```

생성된 package.json을 다음과 같이 수정한다.

```json
{
    "name": "sass-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "build:sass": "sass src/sass:dist/css"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

```bash
npm run build:sass
```

## style

scss 파일을 트랜스파일링하여 css 파일을 생성할 때 2가지 스타일 중 하나를 선택할 수 있다.

-   expanded: 표준적인 스타일의 css 파일이 생성된다. 기본값이다.

```bash
sass --style expanded src/sass:dist/css
# 위와 같은 결과가 만들어진다.
sass src/sass:dist/css
```

-   compressed :가능한 빈공간이 없는 압축된 스타일의 css 파일이 생성된다.

```bash
sass --style compressed src/sass:dist/css
```

## watch

watch 옵션은 scss 파일의 변경을 감지하여 변경될 때마다 scss 파일을 트랜스파일링하여 css 파일을 자동 업데이트한다.

```bash
## watch src/sass -> dist/css
sass --watch src/sass:dist/css
```

Sass는 SASS 표기법(.sass)과 SCSS 표기법(.scss)이 있다. 이전 버전에서는 SASS 표기법이 기본 표기법이었으나 Sass 3.0부터 CSS 친화적인 SCSS（Sassy CSS） 표기법이 기본 표기법이 되었다.

| å         | SCSS      | SASS   | CSS                                                  |
| --------- | :-------- | :----- | :--------------------------------------------------- | ------ |
| 중괄호]   | {}        | 필요   | 불필요（공백 2문자 들여쓰기가 코드 블록을 의미) 필요 |
| 세미콜론] | ;         | 필요   | 불필요                                               | 필요   |
| :         | 뒤의 공백 | 불필요 | 필요                                                 | 불필요 |
| Mixin     | @mixin    | =      | 없음                                                 |
| Include   | @include  | +      | 없음                                                 |
| 확장자    | .scss     | .sass  | .css                                                 |

## 데이터 타입

-   프로퍼티 값으로 사용할 수 있는 값에는 각가그이 데이터 타입이 존재한다.
    -   숫자형: 1.2, 13, 10px
    -   문자열: css는 2종류의 문자열을 사용할 수 있다. `""`,`''`
    -   컬러: blue, hexcode, rgba
    -   boolean: true, false
    -   null: 프로퍼티값에 값이 null인 변수가 지정되면 해당 룰셋은 트랜스파일링하지 않는다.
    -   list: margin, padding과 같이 프로퍼티값에 지정에 사용되는 0 auto등은 공백 또는 콤마 구분된값의 list이다.
    -   map: 객체와 유사한 방식으로 `map-get`함수를 사용하여 원하는 값을 추출할 수 있다.

```sass
// map
$foundation-palette: (
  primary: #E44347,
  mars: #D7525C,
  saturn: #E4B884,
  neptune: #5147D7
);

.mars {
  color: map-get($foundation-palette, mars);
}

// => .mars { color: #D7525C; }
```

## 변수

-   Sass에서는 변수를 사용할 수 있다. 문자열, 숫자, 컬러등을 사전에 변수에 저장하고 필요할 때 불러 사용할 수 있다. 변수명은 `$`로 시작한다.

```sass
$site_max_width: 960px;
$font_color: #333;
$link_color: #00c;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);

body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}

#main {
  width: 100%;
  max-width: $site_max_width;
}
```

```css
body {
    color: #333;
    font-size: 16px;
    font-family: Arial, sans-serif;
    line-height: 125%;
}

#main {
    width: 100%;
    max-width: 960px;
}
```

### 변수의 스코프

-   변수에는 유효범위(scope)가 존재한다.
-   코드 블록 내에서 선언된 변수는 지역변수가 된다.

```sass
$width: 960px; // 전역 변수

header {
  width: $width;
  margin: 0 auto;
}

#main {
  $color: #333; // 지역 변수
  width: $width;
  margin: 20px auto;
  section {
    p {
      color: $color;

      a:link {
        color: $color;
      }
    }
  }
}

footer {
  width: $width;
  margin: 0 auto;
  color: $color; // Error: Undefined variable: "$color".
}
```

위 예제에서 $width는 top level에 기술되었으므로 전역 변수다. 전역변수는 전역은 물론 하위의 어떤 코드 블록 내에서도 유효하다.

위 예제를 트랜스파일링하면 Undefined variable: “$color”라는 에러가 발생한다. 이는 #main에서 선언한 $color는 #main 내에서만 유효한 지역 변수이기 때문이다.

코드 블록 내에서 선언한 변수를 전역 변수로 지정하는 방법은 아래와 같다.

```sass
#main {
  $color: #333 !global; // 전역 변수
  width: $width;
  ...
```

## 연산자

### 숫자 연산자

| 연산자 | 설명   |
| ------ | ------ |
| +      | 덧셈   |
| -      | 뺄셈   |
| \*     | 곱셈   |
| /      | 나눗셈 |
| %      | 나머지 |
| ==     | 동등   |
| !=     | 부등   |

```sass
$width: 100px;

#foo {
  width: $width + 10; // 110px
}

#bar {
  width: $width + 10in; // 1060px
}
```

변수 $width의 값 100px에 10 또는 10em과 같이 다른 단위의 값을 연산하여도 에러없이 연산이 수행된다. 이때 연산자의 왼쪽 값을 기준으로 단위가 설정된다.

> $width에 10em을 더하면 어떻게 될까?

```sass
$width: 100px;

#foo {
  width: $width + 10em; // 100px + 10em => Error: Incompatible units em and px.
}
```

트랜스파일링 결과 Error: Incompatible units em and px.이라는 에러를 출력한다.

Sass 연산은 대상을 변환하여 연산할 수 없는 경우 에러를 출력한다.

%, em, rem, vh, vw, vmin, vmax과 같이 상대적인 값을 Sass는 알지 못한다. 상대적인 값의 결과값은 브라우저만이 알 수 있기 때문이다.

따라서 상대적인 값을 갖는 단위의 연산은 동일한 단위를 갖는 값과의 연산만이 유효하다.

```sass
#foo {
  width: 5% + 10%; // 15%
}

#foo {
  width: calc(25% - 5px);
}
```

```sass
p {
  /*
    font: font-style font-variant font-weight font-size/line-height font-family
  */
  font: italic bold 12px/30px Georgia, serif;
}
```

CSS에서의 `/`는 나눗셈의 의미가 아니라 값을 구분하는 의미를 갖는다.

따라서 Sass의 `/` 연산자를 사용하기 위해서는 몇가지 조건이 필요하다.

-   변수에 대해 사용
-   괄호 내에서 사용
-   다른 연산의 일부로서 사용

```sass
p {
  // font와 border-radius의 '/'는 CSS문법에 맞는 표현이므로 연산되지 않는다.
  font: italic bold 12px/30px Georgia, serif;
  // 타원형 둥근 모서리
  border-radius: 10px 20px/20px;
  /*
  border-top-left-radius: 10px 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 10px 20px;
  border-bottom-left-radius: 20px;
  */

  $width: 1000px;

  width: $width / 2;            // 변수에 대해 사용 →　width: 500px;
  height: (500px / 2);          // 괄호 내에서 사용 →　height: 250px;
  margin-left: 5px + 8px / 2px; // 다른 연산의 일부로서 사용 →　margin-left: 9px;
}
```

-   변수를 CSS의 /와 함께 사용하고자 하는 경우 `#{}`(Interpolation)를 사용한다.

```sass
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};  // 12px/30px
}
```

### 문자열 연산자

-   `+`연산자는 자바스크립트와 같이 문자열을 연결할 수 있다.

```sass
p {
  cursor: e + -resize;  // e-resize
}
```

따옴표가 있는 문자열과 없는 문자열을 함께 사용하는 경우 좌항의 문자열을 기준으로 따옴표를 처리한다.

```sass
p:before {
  content: "Foo " + Bar;        // "Foo Bar"
  font-family: sans- + "serif"; // sans-serif
}
```

### 불린 연산자

-   `&&` : and
-   `||` : or
-   ! : not

### 리스트 연산자

-   리스트를 위한 별도의 연산자는 제공되지 않지만 `리스트 함수`를 사용하여 필요한 처리를 수행할 수 있다.

## 함수

-   참조

## Interpolation: #{}

-   인터폴레이션은 변수의 값을 문자열 그대로 삽입한다. 인터폴레이션에 의해 삽입된 문자열은 연산의 대상으로 취급되지 않는다.

-   변수는 프로퍼티값으로만 사용할 수 있으나 #{}을 사용하면 프로퍼티값은 물론 셀렉터와 프로퍼티명에도 사용할 수 있다.

```sass
$name: foo;
$attr: border;

p.#{$name} {            // p.foo
  #{$attr}-color: blue; // border-color: blue;
}

.someclass {
  $font-size: 12px;
  $line-height: 30px;
  // 연산의 대상으로 취급되지 않도록
  font: #{$font-size} / #{$line-height}; // 12px / 30px
}
```

## Ampersand(&)

-   `&`는 부모요소를 참조하는 셀렉터.

```sass
a {
  color: #ccc;

  &.home {
    color: #f0f;
  }

  &:hover {
    text-decoration: none;
  }

  // & > span (X)
  > span {
    color: blue;
  }

  span {
    color: red;
  }
}
```

```css
a {
    color: #ccc;
}

a.home {
    color: #f0f;
}

a:hover {
    text-decoration: none;
}

a > span {
    color: blue;
}

a span {
    color: red;
}
```

[The Sass Ampersand](https://css-tricks.com/the-sass-ampersand/)

## !default

-   !default flag 할당되지 않은 변수의 초기값을 설정한다.

```sass
$content: null;
$content: "Non-null content" !default;

#main {
  content: $content; // "Non-null content"
}
```

이미 값이 할당되어 있는 변수에 !default flag를 사용하면 적용되지 않는다.

```sass
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content; // "First content"
  new-content: $new_content; // "First time reference"
}
```

이러한 특성은 partial에 매우 유용하다.

2개의 파일 \_font.scss와 main.scss를 생성해 보자. main.scss은 내부에서 \_font.scss을 import한다.

```sass
// _font.scss
$font-size: 16px !default;
$line-height: 1.5 !default;
$font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif !default;

body {
  font: #{$font-size}/$line-height $font-family;
}
// main.scss
$font-family: "Lucida Grande", "Lucida Sans Unicode", sans-serif;

@import "font";
```

위 코드의 트랜스파일링 결과는 아래와 같다. !default는 변수에 값이 할당되지 않았을 때 사용할 기본값을 지정할 때 사용한다. 위 예제의 경우, main.scss에서 변수에 값을 할당하였기 때문에 !default와 같이 사용한 변수값은 무력화된다.

```css
body {
    font: 16px/1.5 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
}
```

만일 font.scss의 $font-family 변수에 !default 설정이 없었다면 후위에 선언된 font.scss의 $font-family 변수값이 적용돠어 아래와 같은 결과가 생성되었을 것이다

```css
body {
    font: 16px/1.5 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
```

## Nesting

-   Nesting은 Sass의 유용한 확장 기능으로 선언을 중첩(nesting)하는 것이다.
-   CSS는 후손 셀렉터(Descendant combinator)의 경우 부모요소를 기술하여야 한다.

```css
#navbar {
    width: 80%;
    height: 23px;
}

#navbar ul {
    list-style-type: none;
}

#navbar li {
    float: left;
}

#navbar li a {
    font-weight: bold;
}
```

```scss
#navbar {
    width: 80%;
    height: 23px;

    ul {
        list-style-type: none;
    }

    li {
        float: left;
        a {
            font-weight: bold;
        }
    }
}
```

-   너무 깊은 nesting은 가독성을 나쁘게 하고 셀렉터를 복잡하게 만든다.

```sass
// Bad case
div#main {
  #sidebar {
    #navbar {
      width: 80%;
      height: 23px;

      aside {
        div {
          ul {
            list-style-type: none;

            li {
              float: left;

              a {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
```

-   부모 요소의 참조가 필요한 경우 `&`를 사용한다. 예를 들어, :hover 또는 ::before 등의 가상 클래스 선택자 (Pseudo-class selector)를 지정하는 경우 부모 요소의 참조가 필요하다.

```sass
.myAnchor {
  color: blue;

  // .myAnchor:hover
  &:hover {
    text-decoration: underline;
  }

  // .myAnchor:visited
  &:visited {
    color: purple;
  }
}
```

-   nesting은 프로퍼티에도 사용할 수 있다.

```sass
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

```css
.funky {
    font-family: fantasy;
    font-size: 30em;
    font-weight: bold;
}
```

## @-Rules and Directives

### @import

-   1개의 CSS 파일에 모든 스타일을 기술하면 유지보수하기 힘들고 가독성이 좋지 않다. 기능에 따라 CSS 파일을 분리하면 재사용 및 유지보수 측면에서 유리하다. 따라서 룰을 정하여 파일을 분리하여 개발하는 것은 효과적인 방법이다.

-   Sass는 @import directive를 사용하여 분리된 stylesheet 파일을 import할 수 있다. Sass는 기존의 CSS @import보다 편리한 기능을 제공한다.

```sass
@import "foo.scss";

// 확장자는 생략 가능하다
@import "foo";

// 여러 개의 파일을 한번에 임포트할 수 있다.
@import "rounded-corners", "text-shadow";

// 변수를 사용해 문자열을 생성하여 임포트할 수도 있다.
$family: "Open+Sans";
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```

여러 개의 파일로 분할하는 것 또는 분할된 파일을 partial이라 하며 partial된 Sass 파일명의 선두에는 underscore(\_)를 붙인다. (\_reset.scss, \_module.scss, \_print.scss)

예를 들어, “*foo.scss”라는 partial된 Sass 파일이 있고 이 파일을 import하는 경우 아래와 같이 기술한다. 파일명 선두의 *와 확장자는 생략할 수 있다.

```sass
@import "foo";
```

partial된 Sass 파일명 선두에 붙인 \_의 의미는 import는 수행하되 CSS로의 트랜스파일링은 수행하지 말라는 의미를 갖는다. 따라서 partial은 import시에는 CSS 파일로 트랜스파일링되지 않기 때문에 최종적으로 CSS로 트랜스파일링을 수행할 Sass 파일에서 import한다.
![img](/images/sass.png)
예를 들어, 위 그림과 같이 partial된 \_vars.scss, \_header.scss, \_sidebar.scss, \_footer.scss를 style.scss가 import하는 경우를 생각해 보자.

```sass
// partial/_vars.scss
$width: 960px;
```

```sass
// partial/_header.scss
#header {
  width: $width;
}
```

```sass
// partial/_sidebar.scss
#sidebar {
  width: $width;
}
```

```sass
// partial/_footer.scss
#footer {
  width: $width;
}
```

```sass
// style.scss
@import "partial/vars";
@import "partial/header";
@import "partial/sidebar";
@import "partial/footer";
```

*vars.scss에는 변수가 선언되어 있으므로 partial된 \_vars.scss, \_header.scss, \_sidebar.scss, \_footer.scss를 import가 수행되어 하나의 파일이 되기 이전에 트랜스파일링을 실행하면 에러가 발생한다. 즉, partial된 Sass 파일명 선두에 붙인 *을 제거하면 에러가 발생한다. 따라서 partial된 Sass 파일명 선두에는 반드시 \_를 붙여서 import 시에는 partial이 CSS 파일로 트랜스파일링되지 않고 import가 완료된 이후, CSS로 트랜스파일링을 수행도록 한다.

> 최신 버전에서는 \_을 붙이지 않아도 에러가 발생하지 않는다. @import 대신 @use를 사용하는 방법도 있다. 이에 대해서는 SCSS에 새로 추가된 Module System (@use, @forward)을 참고하기 바란다.

-   @import는 top-level에서 사용하는 것이 일반적이지만 CSS rule 또는 @media rule 내에 포함시키는 것도 가능하다.

```sass
// _example.scss
.example {
  color: red;
}
```

```sass
#main {
  @import "example";
}
```

위 코드의 트랜스파일링 결과는 아래와 같다.

```css
#main .example {
    color: red;
}
```

### @extend

-   기존 스타일을 상속하고자 경우 @extend를 사용한다. 예를 들어, 아래의 경우를 살펴보자.

```html
<div class="error seriousError">Oh no! You've been hacked!</div>
```

기존에 선언되어 있는 error class를 사용하면서 일부 rule set에 대해서는 다른 선언이 필요한 경우 자주 사용하는 방법이다.

이러한 경우 사용할 수 있는 방법이 상속이다. 상속되는 rule set을 그대로 상속받아 다른 부분만 별도 선언하면 된다.

```sass
.error {
  border: 1px #f00;
  background-color: blue;
}

.seriousError {
  @extend .error;

  border-width: 3px;
  border-color: darkblue;
}
```

위 코드의 트랜스파일링 결과는 아래와 같다. .error와 .seriousError가 공통으로 사용하는 프로퍼티를 묶어 합리적인 룰셋을 생성한다.

```css
.error,
.seriousError {
    border: 1px #f00;
    background-color: blue;
}

.seriousError {
    border-width: 3px;
    border-color: darkblue;
}
```

이제는 하나의 클래스만 적용시키면 된다.

```html
<div class="seriousError">Oh no! You've been hacked!</div>
```

@extend를 @media 블록과 같이 사용하는 경우, 제대로 작동하지 않는다. 다시 말해, @media 안에서 외부의 선택자를 @extend할 수 없다.

```sass
.foo {
  color: red;
}

@media print {
  .bar {
    @extend .foo; // ERROR: You may not @extend selectors across media queries.
  }
}
```

> @extend를 사용하면 트랜스파일링 후 자신의 셀렉터가 어디에 첨부될 것인지 예상하기 어렵고, 예상치 못했던 부작용이 발생할 수 있다. 따라서 @extend의 사용은 가급적 자제하고 Mixin은 사용하는 것을 추천한다.

[@extend의 부작용](https://sass-guidelin.es/ko/#extend)

### @Placeholder Selectors

-   Placeholder Selector는 재사용이 가능한 rule set을 % 키워드로 지정하는 @extend 전용 Selector이다.

-   Placeholder Selector은 상속만을 위한 rule set으로 자신은 트랜스파일링되지 않는다.

```sass
%input-style {
  font-size: 14px;
}

.input-black {
  @extend %input-style;

  color: black;
}

.input-red {
  @extend %input-style;

  color: red;
}
```

```css
.input-black,
.input-red {
    font-size: 14px;
}

.input-black {
    color: black;
}

.input-red {
    color: red;
}
```

## 조건과 반복

### if()

-   built-in if() 함수는 주어진 조건을 판단하여 결과를 리턴한다. Javascript의 삼항연산자와 유사하게 동작한다.

```sass
if(condition, if_true, if_false)
```

condition이 true이면 if_true를, false이면 if_false를 반환한다.

```sass
$type: ocean;

p {
  color: if($type == ocean, blue, black); // color: blue;
}
```

### @if...@else

-   @if…@else를 사용하면 조건 분기가 가능하다.

```sass
$type: monster;

p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

```css
p {
    color: green;
}
```

### @for

-   @for으로 반복문을 사용할 수 있다.

```sass
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

```css
.item-1 {
    width: 2em;
}
.item-2 {
    width: 4em;
}
.item-3 {
    width: 6em;
}
```

### @each

-   @each와 list 또는 map의 요소에 대해 반복을 실시한다.

```sass
// List
@each $animal in puma, sea-slug, egret, salamander {

  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// Map
// $header: h1, $size: 2em
// $header: h2, $size: 1.5em
// $header: h3, $size: 1.2em
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

```css
.puma-icon {
    background-image: url('/images/puma.png');
}

.sea-slug-icon {
    background-image: url('/images/sea-slug.png');
}

.egret-icon {
    background-image: url('/images/egret.png');
}

.salamander-icon {
    background-image: url('/images/salamander.png');
}

h1 {
    font-size: 2em;
}

h2 {
    font-size: 1.5em;
}

h3 {
    font-size: 1.2em;
}
```

## Mixin

-   Mixin은 Sass의 매우 유용한 기능으로 중복 기술을 방지하기 위해 사용 빈도가 높은 마크업을 사전에 정의하여 필요할 때에 불러 사용하는 방법이다.
-   @extend와 유사하나 프로그래밍 언어의 함수와 같이 인수를 전달받을 수 있다는 차이가 있다.
-   @mixin 선언하고 @include로 불러들인다.

```sass
// 지름이 50px인 원
@mixin circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

// 지름이 50px인 원을 위한 mixin을 include한 후 배경을 추가 지정
.box {
  @include circle;

  background: #f00;
}
```

```css
.box {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #f00;
}
```

@extend와 차이가 없어 보이나 Mixin은 함수와 같이 매개 변수를 사용할 수 있다.

```sass
@mixin circle($size) {
  width: $size;
  height: $size * 2;
  border-radius: 50%;
}

.box {
  @include circle(100px);

  background: #f00;
}
```

```css
.box {
    width: 100px;
    height: 200px;
    border-radius: 50%;
    background: #f00;
}
```

매개 변수의 초기값을 설정할 수도 있다.

```sass
@mixin circle($size: 10px) {
  width: $size;
  height: $size * 2;
  border-radius: 50%;
}

.box {
  // 인수가 전달되지 않으면 초기값을 사용한다.
  @include circle();
  background: #f00;
}
```

```css
.box {
    width: 10px;
    height: 20px;
    border-radius: 50%;
    background: #f00;
}
```

# npm 기본 정리

## npm이란?

<p style='margin:30px 0 0; text-align:center'>
    <img src="/images/npm.svg" alt="test" width="200" caption='Node Package Manager'>
    <p style='margin-top:0px; text-align:center; font-weight:bold'>Node Package Manager</p>
</p>

`npm(node package manager)`은 자바스크립트 패키지 매니저이다. Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI(Command Line Interface)를 제공한다. 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 사용할 수도 있다.

## npm 초기화
```bash
npm init
npm init -y 
```
- package.json을 생성한다.
- `npm init -y` 기본설정으로 생성한다.

## 장점
#### 설치 용이
- cdn을 사용할 때는 검색하고 찾아서 태그를 긁어와야 하는 번거로움이 잇다.
- 내가 필요한 것이 있다면 npm install로 라이브러리 설치가 빠르게 된다.
- 내 컴퓨터 환경에 node_modules에 잘 정돈되어 설치된다.

#### 관리 용이
- 라이브러리가 페이지 중간에 넣어도 돌아가는게 웹 개발의 유연함이지만 그에 따라 의존성, 라이브러리 버전 관리가 매우불편한다.
- 라이브러리 사이간 버전 의존이 있어 버전 관리가 불편했으나 package.json안에서 dependencies 한곳에 다 뭉치게 되어 라이브러리 관리가 편해졌다.

## 설치명령어 
- Node.js에서 사용할 수 있는 모듈인 패키지를 설치할 때에는 `npm install` 명령어 뒤에 설치할 패키지 이름을 지정한다.
- `npm install`명령어는 옵션을 별도로 지정하지 않으면 지역으로 설치된다. 패키지 루트 디렉토리 `node_modules` 디렉토리가 자동으로 생성되고 그 안에 패키지가 설치된다.
- 지역으로 설치된 패키지는 해당 프로젝트 내에서만 사용할 수 있다.
```bash
npm install <package>
```
### 지역설치
- 프로젝트 node_modules에 설치된다.
```bash
npm install <package>
npm i <package>
```
--- 
- `dependencies` : 앱의 로직을 직접적으로 구현하는데 필요한 라이브러리 설치
```bash
npm install <package>
```
--- 
- `devDependencies` : 개발을 할때 도움을 주는 보조 라이브러리
```bash
npm install <package> -D
```
#### `dependencies(배포용)`와 `devDependencies(개발용)` 사용시 주의점
- 배포용은 npm run build시 최종 애플리케이션 코드안에 포함됨
- 주의! 배포용에 필요 없는 개발용 라이브러리가 포함시 빌드 시간이 매우 오래 걸린다.
- 개발용은 npm run build시 앱에 포함 안됨
기본적으로는 개발자가 설치시 구분하나, 구분을 못하겠으면 라이브러리 안내 된 곳에서 설치 하라는 방법대로 하면 된다.
#
### 전역설치
- 전역에 패키지를 설치하려면 npm install 명령어에 -g 옵션을 지정한다.
- 전역으로 설치된 패키지는 전역에서 참조할수 있다. 모든 프로젝트가 공통 사용하는 패키지는 지역으로 설치하지 않고 전역으로 설치한다.
- 전역에 설치된 패키지는 os에 따라 설치 장소가 다르다
    - `macOS`: /usr/local/lib/node_modules
    - `windows`: c:\users\%username%\AppData\Roaming\npm\node_modules
```bash
npm install <package> -g 
npm i <package> -g
```


## package.json과 의존성 관리
- 프로젝트 의존하고 있는 패키지관리가 필요한다. npm은 `package.json`파일을 통해서 프로젝트 정보와 패키지의 의존성(dependency)를 관리한다.
- Java의 maven에서 pom.xml과 비슷한 역할을 한다.
- package.json을 생성하려면 프로젝트 루트에서 npm init 명령어를 실행한다.
```bash
npm init
```

## 자주사용하는 명령어
#### package.json 생성
```bash
npm init
npm init -y
```
#### 패키지 설치
```bash
npm install <package> #로컬설치
npm install <package> -g #전역설치
npm install --save-dev <package> #개발설치
npm install #package.json의 모든 패키지 설치
```
#### 패키지 제거
```bash
npm uninstall <package> #로컬/개발 패키지 제거
npm uninstall -g <package> #전역 페키지 제거
```
#### 패키지 업데이트
```bash
npm update <package> 
```
#### 전역 설치 패키지 확인
```bash
npm ls -g --depth=0
```
#### package.json script 프로퍼티의 start 실행
```bash
npm start
```
#### package.json script 프로퍼티의 start 이외의 script 실행
```bash
npm run <script-name>
```
#### 전역패키지 설치 폴더 확인
```bash
npm root -g
```
#### 버전확인
```bash
npm -v
```

#### 명령어 설명 참조
```bash
npm help <command>
```
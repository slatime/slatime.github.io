# core APi

## 요소 바인딩

### 일반 요소 바인딩(this)

- 일반 요소 바인딩 this 요소 키워드 참조.
- HTML, 컴포넌트 모두 this 바인딩 할 수 있다.

```js
let inputEl;

<input bind:this={inputEl} />;
```

### 입력 요소 바인딩(Properties, group)

```js
let text;
let checked = false;
let selectedGroup = [];
let groupItem = ['apple','apple11']
let radioGroup = ''; // 라디오 그룹은 배열이 아닌 단일데이터
let selected = "";
let multipleSelected = [];
// text, number, range, textarea
<input type="text" bind:value={text}/>

<input type="checkbox" bind:checked={checked}/>

// 다중선택
<input type="checkbox" bind:group={selectedGroup} value={groupItem[0]}>
<input type="checkbox" bind:group={selectedGroup} value={groupItem[1]}>
<input type="checkbox" bind:group={selectedGroup} value={groupItem[2]}>

<input type="radio" bind:group={radioGroup} value="value1"/>
<input type="radio" bind:group={radioGroup} value="value2"/>
<input type="radio" bind:group={radioGroup} value="value3"/>

<select bind:value={selected}>
  <option value="value2"></option>
  <option value="value3"></option>
  <option value="value4"></option>
</select>

<select multiple bind:value={multipleSelected}>
  <option value="value2"></option>
  <option value="value3"></option>
  <option value="value4"></option>
</select>
```

### 편집 가능 요소 바인딩(contenteditable)

- `contenteditable`을 사용하면 `textContent`와 `innerHTML` 바인딩을지원합니다.
- innerHTML은 html태그까지 반환
- textContent 태그 안에 요소만

```html
<script>
  let innerHtml = '';
  let textContent = '';
</script>

<div contenteditable bind:innerHtml bind:textContent>Hello</div>

<!-- @html : 문자열을 html로 표현 -->
<div>{@html innerHtml}</div>
<div>{textContent}</div>
```

## 조건 반복과 키

### 조건 블록 패턴 정리

```svelte
<!-- if -->
{#if count > 3}
 <div></div>
{/if}

<!-- if else  -->
{#if count > 3}
  ...
{:else}
  ...
{/if}

{#if count > 3}
{:else if count === 3}
{:else }
{/if}

```

### 반복 블록의 Key 사용

- 고유한 값을 가지고 있는 프로퍼티가 있다면 key로 사용할 수 있다.
- 배열을 순회하면서 추가되는 HTML요소에 key속성을 부여하여 DOM 업데이트를 최적화 할 수 있다.

```svelte
<script>
  let fruits = [
    {id: '1', name: 'Apple'},
    {id: '2', name: 'banana'},
    {id: '3', name: 'Cherry'},
    {id: '4', name: 'Orange'},
  ]

  function deleteFirst() {
    fruits = fruits.slice(1)
  }
</script>
<button on:click={deleteFirst}>Del</button>

<ul>
  {#each fruits as fruit (fruit.id)}
    <li>{fruit}</li>
  {/each}
</ul>
```

### 반복 블록 패넌 정리

```svelte
{#each fruits as fruit}
  <div>{fruit.name}</div>
{/each}

<!-- {#each 배열 as 속성, 순서} {/eadch} -->
{#each fruits as fruit, index}
  <div>{index} / {fruit.name}</div>
{/each}

<!-- {#each 배열 as 속성, 순서 (key)} {/eadch} -->
{#each fruits as fruit, index (fruit.id)}
  <div>{index} / {fruit.name}</div>
{/each}

<!-- {#each} {:else} {/each} 빈 배열 처리 undefined , null (X)-->
{#each todos as todo (todo.id) }
  <div>{todo.name}</div>
{:else}
  <div>아이템이 없음.</div>
{/each}


<!-- {#each 배열 as { id, name}} {/eadch} -->
{#each fruits as { id, name }}
  <div>{name} {id}</div>
{/each}

<!-- 2차원 배열 {#each 배열 as [id, name]} {/eadch} -->
{#each fruits as [ id, name ]}
  <div>{name} {id}</div>
{/each}

<!-- 나머지 연산자 {#each 배열 as { id, ...rest }} {/eadch} -->
{#each fruits as { id, ...rest }}
  <div>{name} {id}</div>
{/each}

<!-- 객체 데이터  {#each Object.entries(user) as [key, value] (key)} {/eadch} -->
{#each Object.entries(user) as [key, value] (key)}
  <div>{key} : {value}</div>
{/each}

```

### 키 블록

- `key`블록은 특정값이 변경될때마다 삭제와 갱신을 반복합니다.
- `key`값이 변경되면, 새롭게 컴포넌트를 인스턴스화 하고 생성자함수를 실행합니다.

```svelte
<script>
  import Count from './count.svelte';
  let reset = false;
</script>

{#key reset }
  <Count/>
{/key}
 
<button on:click={() => reset = !reset}> reset</button>
```

## 비동기

### 비동기 처리의 이해와 사용 패턴 정리

### Await 블록

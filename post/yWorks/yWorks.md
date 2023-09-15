yWorks

# yWorks 라이브러리 (yFile HTML)

- [yWorks](https://www.yworks.com/products/yfiles)

## 설치 환경

- sveltekit(svelte+vite)
- yfiles 데모파일

sveltekit 설치

```bash
# project root
npm create svelte@latest ./

# skeleton project
# typescript
```

1. `yFile` 데모 폴더 안에 `lib`폴더 복사
2. `svelte`프로젝트 루트 에 복사한 `lib`폴더 붙여넣기
3. `lib`폴더 내 `yfiles-26.0.1+eval.tgz` , `yfiles-umd-26.0.1+eval.taz`로 파일 이름 변경
4. `license.json` 파일을 svelte 프로젝트 lib 폴더로 이동

```json
// package.json
{
  // ...생략
  "dependencies": {
    "yfiles": "./lib-dev/yfiles-26.0.1+dev.tgz",
    "yfiles-umd": "./lib-dev/yfiles-umd-26.0.1+dev.tgz"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^2.0.0",
    "@sveltejs/kit": "^1.20.4",
    "svelte": "^4.0.5",
    "svelte-check": "^3.4.3",
    "tslib": "^2.4.1",
    "typescript": "^5.0.0",
    "vite": "^4.4.2"
  },
  "type": "module"
}
```

```bash
npm install
npm run dev
```

## yFiles

### 모듈 로딩

```ts
import { GraphComponent, License } from "yfiles";
import licenseValue from "../../lib/license/license.json";

License.value = licenseValue;
```

### 구성요소 추가

```ts
import { GraphComponent, License, Rect } from "yfiles";
import { onMount } from "svelte";

let graphComponent: GraphComponent;

onMount(() => {
  graphComponent = new GraphComponent("#id");

  // Component 그래프 요소 가져오기
  const graph = graphComponent.graph;

  // 노드 생성
  const node1 = graph.createNode(new Rect(0, 0, 30, 30));
  const node2 = graph.createNode(new Rect(100, 0, 30, 30));
  const node3 = graph.createNode(new Rect(300, 300, 60, 30));
});
```

## 그래프 요소 생성

- [GraphApi](https://docs.yworks.com/yfiles-html/api/GraphComponent.html#graph)

### 노드 생성(Create Node)

- [createNode API](<https://docs.yworks.com/yfiles-html/api/IGraph.html#createNode(Rect,INodeStyle,Object)>)

```ts
import { Rect } from "yfiles";
const node1 = graph.createNode(new Rect(0, 0, 30, 30));
const node2 = graph.createNode(new Rect(100, 0, 30, 30));
const node3 = graph.createNode(new Rect(300, 300, 60, 30));
```

##### 보이는 영역에 그래프 맞추기

> graphComponent.fitGraphBounds()

### 엣지 생성(Create Edge)

- [createEdge APi](<https://docs.yworks.com/yfiles-html/api/IGraph.html#createEdge(INode,INode,IEdgeStyle,Object)>)

```ts
const edge1 = graph.createEdge(node1, node2);
const edge2 = graph.createEdge(node2, node3);
```

### 선 굽힘 사횽(Using Band)

- [addBend Api](<https://docs.yworks.com/yfiles-html/api/IGraph.html#addBend(IEdge,Point,number)>)
- addBend(Edge, Point, number)

```ts
import { Point } from "yfiles";
const bend1 = graph.addBend(edge2, new Point(330, 15));
```

### 포트 사용 (Using Ports)

- [addPort API](<https://docs.yworks.com/yfiles-html/api/IGraph.html#addPort(IPortOwner,IPortLocationModelParameter,IPortStyle,Object)>)
- addPort(owner, parameter)
- addPort(owner)

```ts
import { FreeNodePortLocationModel } from "yfiles";
const portAtNode1 = graph.addPort(node1);
const portAtNode3 = graph.addPort(
  node3,
  FreeNodePortLocationModel.NODE_LEFT_ANCHORED
);
const edgeAtPorts = graph.createEdge(portAtNode1, portAtNode3);
```

### 라벨 추가 (Adding Labels)

- [addLabel API](<https://docs.yworks.com/yfiles-html/api/IGraph.html#addLabel(ILabelOwner,string,ILabelModelParameter,ILabelStyle,Size,Object)>)

```ts
const ln1 = graph.addLabel(node1, "n1");
const ln2 = graph.addLabel(node2, "n2");
const ln3 = graph.addLabel(node3, "n3");
const le3 = graph.addLabel(edgeAtPorts, "edgeAtPorts");
```

### 요소 삭제 (Remove Elements)

- [remove API](<https://docs.yworks.com/yfiles-html/api/IGraph.html#remove(IModelItem)>)

```ts
graph.remove(node1);
```

## User Ineraction

```ts
import { GraphEditorInputMode } from "yfiles";
graphComponent.inputMode = new GraphEditorInputMode();
```

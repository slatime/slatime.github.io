# svelte Kit

## 파일업로드

+server.js

```js
let formData = Obejct.fromEntries(await request.formData());
let path = '/static/uploads/';
let uploiadFileName = `${crypto.randomUUID()}.${
  formData.file.name.split('.')[1]
}`;
let originalFilename = formData.file.name;
let filePath = `${process.cwd()}${path}${uploiadFileName}`;

await fs.writeFile(
  '파일업로드패스/파일명',
  Buffer.from(await formData.file.arrayBuffer())
);
```

vite.config.js

```js
server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), '/static/uploads/'],
    },
  },
```

## component event

component.svelte

```js
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
function moveUi() {
  dispatch('moveContact', {
    href: '#contact',
  });
}

<button type="button" on:click="{moveUi}"></button>;
```

page.svelte

```js
function pageEvent(event) {
  event.detail.href;
}
<Component bind:moveContact={pageEvent} />;
```

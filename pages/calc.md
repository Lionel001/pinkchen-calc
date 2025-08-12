# @pinkchen/calc

## 宗旨

旨在解决前端使用 bignumber.js 或者 decimal.js 时，由于链式调用导致公式代码可读性差的问题，并集成部分常用的格式化场景，轻量且易使用。

## 文档地址

[document](https://github.com/Lionel001/pinkchen-docs)

## 安装

```bash
npm i @pinkchen/calc -S
// or
yarn add @pinkchen/calc
// or
pnpm add @pinkchen/calc
// or
bun add @pinkchen/calc
```

## 引入

- cjs

```js
const { calc } = require('@pinkchen/calc');
```

- es

```js
import { calc } from '@pinkchen/calc';
```

- umd

```html
<script src="node_modules/@pinkchen/calc/dist/umd/index.js"></script>
<script>
  console.log(window.pinkchen.calc('0.1+0.2')); //0.3
  // 其他用法参考具体使用示例
</script>
```

## 具体使用

```js
console.log(calc('0.1+0.2')); //0.3
console.log(calc('22.22*22.22')); //493.7284
console.log(calc('(22.22*22.22)')); //493.7284
console.log(calc('22.22/(22.22+22.22)')); //0.5
console.log(calc('a*b', { a: 11, b: 22 })); //242
console.log(calc('aa*bb.bb', { aa: 22, b: 22, bb: { bb: 33 } })); //726
console.log(calc('oo.a+oo.b*(oo.c-oo.d.d*(oo.e.e+oo.ff))', { oo: { a: 1, b: 2, c: 3, d: { d: 4 }, e: { e: 5 }, ff: 6 } })); //-81
console.log(calc('1 + 2 * (3 - 4 * (5 + 6))')); //-81
// 格式化
console.log(calc('2222.22*2222.22', {}, { separator: true })); //4,938,261.7284
console.log(calc('2222.22*2222.22', {}, { digit: 6 })); //4938261.728400
console.log(calc('2222.22*2222.22', {}, { preUnit: '$' })); //$ 4938261.7284
console.log(calc('2222.22*2222.22', {}, { postUnit: 'USD' })); //4938261.7284 USD
console.log(calc('2222.22*2222.22', {}, { percentage: true })); //49382.617284 %
console.log(calc('2222.22*2222.22', {}, { permillage: true })); //4938.2617284 ‰
console.log(
  calc(
    '2222.22*2222.22',
    {},
    {
      separator: true,
      digit: 6,
      preUnit: '达到',
      postUnit: '结丹率',
      percentage: true,
    }
  )
); //达到 49,382.617284 % 结丹率
```

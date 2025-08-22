# @pinkchen/calc

前端精确计算终极解决方案, 精确计算、轻量、便捷、计算公式易维护、集成 Decimal 数学函数，支持自定义函数，一应俱全。

## 优势

1. 💪 支持精确计算
2. 🎈 轻量，体积小
3. 🚀 便捷，支持 es,cjs,umd
4. 🔢 集成 Decimal 内部数学函数
5. ⚒️ 支持自定义函数，全方面满足定制化需求

## 文档地址

[English](https://github.com/Lionel001/pinkchen-calc)|中文文档

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
  window.pinkchen.calc('0.1+0.2'); //0.3
  // 其他用法参考具体使用示例
</script>
```

## 具体使用

### 普通计算

```js
calc('0.1+0.2'); //0.3
calc('22.22*22.22'); //493.7284
calc('(22.22*22.22)'); //493.7284
calc('1 + 2 * (3 - 4 * (5 + 6))'); //-81
```

### 带数据源计算

```js
calc('1+22.22/(22.22+a)', { a: 22.22 }); //1.5
calc('a*b', { a: 11, b: 22 }); //242
calc('1+a*b', { a: 11, b: 22 }); //243
calc('aa*bb.bb', { aa: 22, b: 22, bb: { bb: 33 } }); //726
calc('oo.a+oo.b*(oo.c-oo.d.d*(oo.e.e+oo.ff))', { oo: { a: 1, b: 2, c: 3, d: { d: 4 }, e: { e: 5 }, ff: 6 } }); //-81
```

### 带函数计算

内部集成了 Decimal.js 中的静态数学函数，函数参见[Decimal.js](https://mikemcl.github.io/decimal.js/#methods)

也可以用 DC.为前缀来使用内置函数，例如：DC.max(1,2)

```js
calc('max(a+b,0.3)', { a: 0.1, b: 0.2 }); //0.3
calc('1+DC.max(a+b,0.3)', { a: 0.1, b: 0.2 }); //1.3
calc('1+abs(-1-a-1)', { a: -1 }); //2
```

### 自定义函数支持

只需要在数据源中注入自定义函数，即可完成定制化

```js
calc('a+max(getSum(a,b)+1, a+c, a+111/(d*e))', { a: 11, b: 12, c: 133, d: 14, e: 15, getSum: (a, b) => a + b }); //155
calc('a+getSum(max(a*b, a+b), b)', { a: 1, b: 2, getSum: (a, b) => a + b }); //6
```

<span style="color:red;font-size: 20px;">❗❗❗ 注意：不论是内置函数还是自定义函数，所有参数都会使用 Decimal 做转换，所以自定义函数体内部请按照数字来处理参数</span>

### 格式化处理

```js
calc('2222.22*2222.22', {}, { separator: true }); //4,938,261.7284
calc('2222.22*2222.22', {}, { digit: 6 }); //4938261.728400
calc('2222.22*2222.22', {}, { preUnit: '$ ' }); //$ 4938261.7284
calc('2222.22*2222.22', {}, { postUnit: ' USD' }); //4938261.7284 USD
calc('2222.22*2222.22', {}, { percentage: true }); //49382.617284%
calc('2222.22*2222.22', {}, { permillage: true }); //4938.2617284‰
calc(
  '99.9949999/100',
  {},
  {
    separator: true,
    digit: 2,
    preUnit: '您的技术水平超越了',
    postUnit: '的同行',
    percentage: true,
  }
); //您的技术水平超越了99.99%的同行
```

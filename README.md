# @pinkchen/calc

The ultimate solution for precise front-end calculations, featuring accurate computation, lightweight design, convenience, maintainable calculation formulas, integrated decimal.js mathematical functions, and support for custom functions.

## Advantages

1. 💪 Supports precise calculations
2. 🎈 Lightweight with small bundle size
3. 🚀 Convenient, supports es, cjs, umd
4. 🔢 Integrates decimal.js internal mathematical functions
5. ⚒️ Supports custom functions to meet all customization needs

## Documentation

English|[中文文档](https://github.com/Lionel001/pinkchen-calc/blob/main/README_CN.md)

## Installation

```bash
npm i @pinkchen/calc -S
// or
yarn add @pinkchen/calc
// or
pnpm add @pinkchen/calc
// or
bun add @pinkchen/calc
```

## Import

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
  // Refer to specific usage examples for other usages
</script>
```

## Usage

### Basic Calculation

```js
calc('0.1+0.2'); //0.3
calc('22.22*22.22'); //493.7284
calc('(22.22*22.22)'); //493.7284
calc('1 + 2 * (3 - 4 * (5 + 6))'); //-81
```

### Calculation with Data Source

```js
calc('1+22.22/(22.22+a)', { a: 22.22 }); //1.5
calc('a*b', { a: 11, b: 22 }); //242
calc('1+a*b', { a: 11, b: 22 }); //243
calc('aa*bb.bb', { aa: 22, b: 22, bb: { bb: 33 } }); //726
calc('oo.a+oo.b*(oo.c-oo.d.d*(oo.e.e+oo.ff))', { oo: { a: 1, b: 2, c: 3, d: { d: 4 }, e: { e: 5 }, ff: 6 } }); //-81
```

### Calculation with Functions

It integrates static mathematical functions from decimal.js. Refer to [decimal.js](https://mikemcl.github.io/decimal.js/#methods) for available functions.

Built-in functions can also be used in the form: DC.max(1,2)

```js
calc('max(a+b,0.3)', { a: 0.1, b: 0.2 }); //0.3
calc('1+DC.max(a+b,0.3)', { a: 0.1, b: 0.2 }); //1.3
calc('1+abs(-1-a-1)', { a: -1 }); //2
```

### Custom Function Support

You can achieve customization by injecting custom functions into the data source.

```js
calc('a+max(getSum(a,b)+1, a+c, a+111/(d*e))', { a: 11, b: 12, c: 133, d: 14, e: 15, getSum: (a, b) => a + b }); //155
calc('a+getSum(max(a*b, a+b), b)', { a: 1, b: 2, getSum: (a, b) => a + b }); //6
```

<span style="color:red;font-size: 20px;">❗❗❗ Note: Whether built-in or custom functions, all parameters will be converted using Decimal, so please handle parameters as numbers inside custom function bodies.</span>

### Formatting

```js
calc('2222.22*2222.22', {}, { separator: true }); //4,938,261.7284
calc('2222.22*2222.22', {}, { digit: 6 }); //4938261.728400
calc('2222.22*2222.22', {}, { preUnit: '$' }); //$ 4938261.7284
calc('2222.22*2222.22', {}, { postUnit: 'USD' }); //4938261.7284 USD
calc('2222.22*2222.22', {}, { percentage: true }); //49382.617284 %
calc('2222.22*2222.22', {}, { permillage: true }); //4938.2617284 ‰
calc(
  '99.999999/100',
  {},
  {
    separator: true,
    digit: 6,
    preUnit: 'Your skill level exceeds',
    postUnit: 'of peers',
    percentage: true,
  }
); //Your skill level exceeds 99.999999 % of peers
```

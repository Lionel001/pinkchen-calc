import { expect, test } from 'vitest';
import { calc } from '@pinkchen/calc';

// 001. 基础计算: 0.1 + 0.2
test('001. 基础计算: 0.1 + 0.2', () => {
  expect(calc('0.1+0.2')).toBe(0.3);
});

// 002. 基础乘法: 22.22 * 22.22
test('002. 基础乘法: 22.22 * 22.22', () => {
  expect(calc('22.22*22.22')).toBe(493.7284);
});

// 003. 带括号乘法: (22.22*22.22)
test('003. 带括号乘法: (22.22*22.22)', () => {
  expect(calc('(22.22*22.22)')).toBe(493.7284);
});

// 004. 复杂表达式: 1 + 2 * (3 - 4 * (5 + 6))
test('004. 复杂表达式: 1 + 2 * (3 - 4 * (5 + 6))', () => {
  expect(calc('1 + 2 * (3 - 4 * (5 + 6))')).toBe(-81);
});

// 005. 数据源计算: 1+22.22/(22.22+a)
test('005. 数据源计算: 1+22.22/(22.22+a)', () => {
  expect(calc('1+22.22/(22.22+a)', { a: 22.22 })).toBe(1.5);
});

// 006. 数据源计算: a*b
test('006. 数据源计算: a*b', () => {
  expect(calc('a*b', { a: 11, b: 22 })).toBe(242);
});

// 007. 数据源计算: 1+a*b
test('007. 数据源计算: 1+a*b', () => {
  expect(calc('1+a*b', { a: 11, b: 22 })).toBe(243);
});

// 008. 嵌套对象计算: aa*bb.bb
test('008. 嵌套对象计算: aa*bb.bb', () => {
  expect(calc('aa*bb.bb', { aa: 22, b: 22, bb: { bb: 33 } })).toBe(726);
});

// 009. 复杂嵌套对象: oo.a+oo.b*(oo.c-oo.d.d*(oo.e.e+oo.ff))
test('009. 复杂嵌套对象: oo.a+oo.b*(oo.c-oo.d.d*(oo.e.e+oo.ff))', () => {
  expect(
    calc('oo.a+oo.b*(oo.c-oo.d.d*(oo.e.e+oo.ff))', {
      oo: { a: 1, b: 2, c: 3, d: { d: 4 }, e: { e: 5 }, ff: 6 },
    })
  ).toBe(-81);
});

// 010. DC.max函数: DC.max(a+b,0.3)
test('010. DC.max函数: DC.max(a+b,0.3)', () => {
  expect(calc('DC.max(a+b,0.3)', { a: 0.1, b: 0.2 })).toBe(0.3);
});

// 011. DC函数混合: 1+DC.max(a+b,0.3)
test('011. DC函数混合: 1+DC.max(a+b,0.3)', () => {
  expect(calc('1+DC.max(a+b,0.3)', { a: 0.1, b: 0.2 })).toBe(1.3);
});

// 012. DC.abs函数: 1+DC.abs(-1-a-1)
test('012. DC.abs函数: 1+DC.abs(-1-a-1)', () => {
  expect(calc('1+DC.abs(-1-a-1)', { a: -1 })).toBe(2);
});

// 013. 自定义函数: a+DC.max(getSum(a,b)+1, a+c, a+111/(d*e))
test('013. 自定义函数: a+DC.max(getSum(a,b)+1, a+c, a+111/(d*e))', () => {
  expect(
    calc('a+DC.max(getSum(a,b)+1, a+c, a+111/(d*e))', {
      a: 11,
      b: 12,
      c: 133,
      d: 14,
      e: 15,
      getSum: (a: number, b: number) => a + b,
    })
  ).toBe(155);
});

// 014. 自定义函数: a+getSum(DC.max(a*b, a+b), b)
test('014. 自定义函数: a+getSum(DC.max(a*b, a+b), b)', () => {
  expect(
    calc('a+getSum(DC.max(a*b, a+b), b)', { a: 1, b: 2, getSum: (a: number, b: number) => a + b })
  ).toBe(6);
});

// 015. 自定义函数: a.a*(b + c + getOne())
test('015. 自定义函数: a.a*(b + c + getOne())', () => {
  expect(calc('a.a*(b + c + getOne())', { a: { a: 2 }, b: 3, c: 3, getOne: () => 1 })).toBe(14);
});

// 016. 千位分隔符: 2222.22*2222.22
test('016. 千位分隔符: 2222.22*2222.22', () => {
  expect(calc('2222.22*2222.22', {}, { separator: true })).toBe('4,938,261.7284');
});

// 017. 小数位数: 2222.22*2222.22
test('017. 小数位数: 2222.22*2222.22', () => {
  expect(calc('2222.22*2222.22', {}, { digit: 6 })).toBe('4938261.728400');
});

// 018. 前置单位: 2222.22*2222.22
test('018. 前置单位: 2222.22*2222.22', () => {
  expect(calc('2222.22*2222.22', {}, { preUnit: '$ ' })).toBe('$ 4938261.7284');
});

// 019. 后置单位: 2222.22*2222.22
test('019. 后置单位: 2222.22*2222.22', () => {
  expect(calc('2222.22*2222.22', {}, { postUnit: ' USD' })).toBe('4938261.7284 USD');
});

// 020. 百分比格式: 2222.22*2222.22
test('020. 百分比格式: 2222.22*2222.22', () => {
  expect(calc('2222.22*2222.22', {}, { percentage: true })).toBe('493826172.84%');
});

// 021. 千分比格式: 2222.22*2222.22
test('021. 千分比格式: 2222.22*2222.22', () => {
  expect(calc('2222.22*2222.22', {}, { permillage: true })).toBe('4938261728.4‰');
});

// 022. 综合格式化: 99.9949999/100
test('022. 综合格式化: 99.9949999/100', () => {
  expect(
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
    )
  ).toBe('您的技术水平超越了99.99%的同行');
});

// 023. 减法运算: 10 - 3.5
test('023. 减法运算: 10 - 3.5', () => {
  expect(calc('10-3.5')).toBe(6.5);
});

// 024. 除法运算: 15 / 3
test('024. 除法运算: 15 / 3', () => {
  expect(calc('15/3')).toBe(5);
});

// 025. 混合运算: 2 + 3 * 4
test('025. 混合运算: 2 + 3 * 4', () => {
  expect(calc('2+3*4')).toBe(14);
});

// 026. 复杂括号: ((2 + 3) * 4) - 5
test('026. 复杂括号: ((2 + 3) * 4) - 5', () => {
  expect(calc('((2+3)*4)-5')).toBe(15);
});

// 027. 负数运算: -5 + 3
test('027. 负数运算: -5 + 3', () => {
  expect(calc('-5+3')).toBe(-2);
});

// 028. 小数运算: 0.1 + 0.3
test('028. 小数运算: 0.1 + 0.3', () => {
  expect(calc('0.1+0.3')).toBe(0.4);
});

// 029. 多运算符: 1+2+3+4+5
test('029. 多运算符: 1+2+3+4+5', () => {
  expect(calc('1+2+3+4+5')).toBe(15);
});

// 030. 复杂表达式: 2*3+4*5-6/2
test('030. 复杂表达式: 2*3+4*5-6/2', () => {
  expect(calc('2*3+4*5-6/2')).toBe(23);
});

// 031. 复杂数据源: obj.a + obj.b * obj.c
test('031. 复杂数据源: obj.a + obj.b * obj.c', () => {
  expect(calc('obj.a+obj.b*obj.c', { obj: { a: 1, b: 2, c: 3 } })).toBe(7);
});

// 032. 多变量: x + y + z
test('032. 多变量: x + y + z', () => {
  expect(calc('x+y+z', { x: 10, y: 20, z: 30 })).toBe(60);
});

// 033. 嵌套属性: user.profile.age
test('033. 嵌套属性: user.profile.age', () => {
  expect(calc('user.profile.age', { user: { profile: { age: 25 } } })).toBe(25);
});

// 034. 复杂嵌套: user.profile.age + 5
test('034. 复杂嵌套: user.profile.age + 5', () => {
  expect(calc('user.profile.age+5', { user: { profile: { age: 25 } } })).toBe(30);
});

// 035. 数组索引: arr[0] + arr[1]
test('035. 数组索引: arr[0] + arr[1]', () => {
  expect(calc('arr[0]+arr[1]', { arr: [10, 20] })).toBe(30);
});

// 036. 多函数嵌套: DC.max(DC.min(5,3), DC.abs(-2))
test('036. 多函数嵌套: DC.max(DC.min(5,3), DC.abs(-2))', () => {
  expect(calc('DC.max(DC.min(5,3),DC.abs(-2))')).toBe(3);
});

// 037. 三角函数: DC.sin(0)
test('037. 三角函数: DC.sin(0)', () => {
  expect(calc('DC.sin(0)')).toBe(0);
});

// 038. 三角函数: DC.cos(0)
test('038. 三角函数: DC.cos(0)', () => {
  expect(calc('DC.cos(0)')).toBe(1);
});

// 039. 平方根: DC.sqrt(16)
test('039. 平方根: DC.sqrt(16)', () => {
  expect(calc('DC.sqrt(16)')).toBe(4);
});

// 040. 幂函数: DC.pow(2,3)
test('040. 幂函数: DC.pow(2,3)', () => {
  expect(calc('DC.pow(2,3)')).toBe(8);
});

// 041. 向上取整: DC.ceil(3.2)
test('041. 向上取整: DC.ceil(3.2)', () => {
  expect(calc('DC.ceil(3.2)')).toBe(4);
});

// 042. 向下取整: DC.floor(3.8)
test('042. 向下取整: DC.floor(3.8)', () => {
  expect(calc('DC.floor(3.8)')).toBe(3);
});

// 043. 四舍五入: DC.round(3.5)
test('043. 四舍五入: DC.round(3.5)', () => {
  expect(calc('DC.round(3.5)')).toBe(4);
});

// 044. DC.abs函数: DC.abs(-5)
test('044. DC.abs函数: DC.abs(-5)', () => {
  expect(calc('DC.abs(-5)')).toBe(5);
});

// 045. DC.max函数: DC.max(1,2,3)
test('045. DC.max函数: DC.max(1,2,3)', () => {
  expect(calc('DC.max(1,2,3)')).toBe(3);
});

// 046. DC.min函数: DC.min(1,2,3)
test('046. DC.min函数: DC.min(1,2,3)', () => {
  expect(calc('DC.min(1,2,3)')).toBe(1);
});

// 047. DC.pow函数: DC.pow(2,3)
test('047. DC.pow函数: DC.pow(2,3)', () => {
  expect(calc('DC.pow(2,3)')).toBe(8);
});

// 048. 自定义函数: getConstant()
test('048. 自定义函数: getConstant()', () => {
  expect(calc('getConstant()', { getConstant: () => 42 })).toBe(42);
});

// 049. 自定义函数: double(x)
test('049. 自定义函数: double(x)', () => {
  expect(calc('double(x)', { x: 5, double: (x: number) => x * 2 })).toBe(10);
});

// 050. 自定义函数: add(a, b, c)
test('050. 自定义函数: add(a, b, c)', () => {
  expect(
    calc('add(a,b,c)', { a: 1, b: 2, c: 3, add: (a: number, b: number, c: number) => a + b + c })
  ).toBe(6);
});

// 051. 自定义+内置函数: DC.max(square(a), square(b))
test('051. 自定义+内置函数: DC.max(square(a), square(b))', () => {
  expect(calc('DC.max(square(a),square(b))', { a: 3, b: 4, square: (x: number) => x * x })).toBe(
    16
  );
});

// 052. 大数字千分位: 1000000
test('052. 大数字千分位: 1000000', () => {
  expect(calc('1000000', {}, { separator: true })).toBe('1,000,000');
});

// 053. 小数位数0: 3.14159
test('053. 小数位数0: 3.14159', () => {
  expect(calc('3.14159', {}, { digit: 0 })).toBe('3');
});

// 054. 小数位数2: 3.14159
test('054. 小数位数2: 3.14159', () => {
  expect(calc('3.14159', {}, { digit: 2 })).toBe('3.14');
});

// 055. 单位组合: 100
test('055. 单位组合: 100', () => {
  expect(calc('100', {}, { preUnit: '¥', postUnit: 'CNY' })).toBe('¥100CNY');
});

// 056. 百分比转换: 0.1234
test('056. 百分比转换: 0.1234', () => {
  expect(calc('0.1234', {}, { percentage: true })).toBe('12.34%');
});

// 057. 千分比转换: 0.1234
test('057. 千分比转换: 0.1234', () => {
  expect(calc('0.1234', {}, { permillage: true })).toBe('123.4‰');
});

// 058. 零值计算: 0 + 0
test('058. 零值计算: 0 + 0', () => {
  expect(calc('0+0')).toBe(0);
});

// 059. 无穷小数: 1/3
test('059. 无穷小数: 1/3', () => {
  expect(calc('1/3', {}, { digit: 5 })).toBe('0.33333');
});

// 060. 大数计算: 999999999 * 999999999
test('060. 大数计算: 999999999 * 999999999', () => {
  expect(calc('999999999*999999999')).toBe(999999998000000001);
});

// 061. 负数计算: -10 + 5
test('061. 负数计算: -10 + 5', () => {
  expect(calc('-10+5')).toBe(-5);
});

// 062. 负数乘法: -3 * -4
test('062. 负数乘法: -3 * -4', () => {
  expect(calc('-3*-4')).toBe(12);
});

// 063. 除零处理
test('063. 除零处理', () => {
  expect(calc('1/0')).toBe(Infinity);
});

// 064. 复杂表达式1: 2 * (3 + 4) / 5 - 6
test('064. 复杂表达式1: 2 * (3 + 4) / 5 - 6', () => {
  expect(calc('2*(3+4)/5-6')).toBe(-3.2);
});

// 065. 复杂表达式2: (1 + 2) * (3 + 4) - (5 + 6)
test('065. 复杂表达式2: (1 + 2) * (3 + 4) - (5 + 6)', () => {
  expect(calc('(1+2)*(3+4)-(5+6)')).toBe(10);
});

// 066. 复杂表达式3: 1 + 2 * 3 - 4 / 5
test('066. 复杂表达式3: 1 + 2 * 3 - 4 / 5', () => {
  expect(calc('1+2*3-4/5')).toBe(6.2);
});

// 067. 布尔值处理
test('067. 布尔值处理', () => {
  expect(() => calc('a+b', { a: true, b: false })).toThrow();
});

// 068. 字符串数字: "5" + "3"
test('068. 字符串数字: "5" + "3"', () => {
  expect(calc('a+b', { a: '5', b: '3' })).toBe(8);
});

// 069. 复杂对象链: a.b.c.d
test('069. 复杂对象链: a.b.c.d', () => {
  expect(calc('a.b.c.d', { a: { b: { c: { d: 42 } } } })).toBe(42);
});

// 070. 函数与数据源: DC.max(a, b, c)
test('070. 函数与数据源: DC.max(a, b, c)', () => {
  expect(calc('DC.max(a,b,c)', { a: 10, b: 5, c: 15 })).toBe(15);
});

// 071. 自定义多参数: calculate(x, y, z)
test('071. 自定义多参数: calculate(x, y, z)', () => {
  const calculate = (x: number, y: number, z: number) => x * y + z;
  expect(calc('calculate(x,y,z)', { x: 2, y: 3, z: 4, calculate })).toBe(10);
});

// 072. 多层嵌套对象: a.b.c + d.e.f
test('072. 多层嵌套对象: a.b.c + d.e.f', () => {
  expect(
    calc('a.b.c+d.e.f', {
      a: { b: { c: 10 } },
      d: { e: { f: 20 } },
    })
  ).toBe(30);
});

// 073. 多层函数嵌套: DC.abs(DC.max(DC.min(5,-3), DC.abs(-2)))
test('073. 多层函数嵌套: DC.abs(DC.max(DC.min(5,-3), DC.abs(-2)))', () => {
  expect(calc('DC.abs(DC.max(DC.min(5,-3),DC.abs(-2)))')).toBe(2);
});

// 074. 含空格表达式: 2 + 3 * 4
test('074. 含空格表达式: 2 + 3 * 4', () => {
  expect(calc('2 + 3 * 4')).toBe(14);
});

// 075. 含制表符表达式: 2	+	3
test('075. 含制表符表达式: 2	+	3', () => {
  expect(calc('2	+	3')).toBe(5);
});

// 076. 综合格式化: 1234.56789
test('076. 综合格式化: 1234.56789', () => {
  expect(
    calc(
      '1234.56789',
      {},
      {
        separator: true,
        digit: 2,
        preUnit: '$',
        postUnit: 'USD',
      }
    )
  ).toBe('$1,234.57USD');
});

// 077. 百分比+小数: 0.123456
test('077. 百分比+小数: 0.123456', () => {
  expect(
    calc(
      '0.123456',
      {},
      {
        percentage: true,
        digit: 2,
      }
    )
  ).toBe('12.35%');
});

// 078. 无效表达式
test('078. 无效表达式', () => {
  expect(() => calc('invalid expression')).toThrow();
});

// 079. 未定义变量
test('079. 未定义变量', () => {
  expect(() => calc('undefinedVar + 5')).toThrow();
});

// 080. 冲突格式化选项
test('080. 冲突格式化选项', () => {
  expect(() => calc('0.5', {}, { percentage: true, permillage: true })).toThrow();
});

// 081. 大量加法: 1+1+1+...+1 (100次)
test('081. 大量加法: 1+1+1+...+1 (100次)', () => {
  let expression = Array(100).fill('1').join('+');
  expect(calc(expression)).toBe(100);
});

// 082. 大量乘法: 2*2*2*...*2 (10次)
test('082. 大量乘法: 2*2*2*...*2 (10次)', () => {
  let expression = Array(10).fill('2').join('*');
  expect(calc(expression)).toBe(1024);
});

// 083. 三角函数嵌套: DC.sin(DC.cos(0))
test('083. 三角函数嵌套: DC.sin(DC.cos(0))', () => {
  expect(calc('DC.sin(DC.cos(0))', {}, { digit: 5 })).toBe('0.84147');
});

// 084. 平方根+幂: DC.sqrt(DC.pow(3,2))
test('084. 平方根+幂: DC.sqrt(DC.pow(3,2))', () => {
  expect(calc('DC.sqrt(DC.pow(3,2))')).toBe(3);
});

// 085. 复杂自定义函数: complexCalc(a, b, c)
test('085. 复杂自定义函数: complexCalc(a, b, c)', () => {
  const complexCalc = (a: number, b: number, c: number) => {
    return (a + b) * c - (a * b) / c;
  };
  expect(calc('complexCalc(a,b,c)', { a: 10, b: 5, c: 2, complexCalc })).toBe(5);
});

// 086. 数组长度: arr.length
test('086. 数组长度: arr.length', () => {
  expect(calc('arr.length', { arr: [1, 2, 3, 4, 5] })).toBe(5);
});

// 087. 财务计算: (principal * rate * time) / 100
test('087. 财务计算: (principal * rate * time) / 100', () => {
  expect(
    calc('(principal*rate*time)/100', {
      principal: 10000,
      rate: 5,
      time: 2,
    })
  ).toBe(1000);
});

// 088. 物理计算: (mass * acceleration) / forceConstant
test('088. 物理计算: (mass * acceleration) / forceConstant', () => {
  expect(
    calc('(mass*acceleration)/forceConstant', {
      mass: 10,
      acceleration: 5,
      forceConstant: 2,
    })
  ).toBe(25);
});

// 089. 多层括号: (((1+2)*3)+4)*5
test('089. 多层括号: (((1+2)*3)+4)*5', () => {
  expect(calc('(((1+2)*3)+4)*5')).toBe(65);
});

// 090. 综合财务: 复杂财务计算
test('090. 综合财务: 复杂财务计算', () => {
  expect(
    calc('principal+principal*rate*time', {
      principal: 10000,
      rate: 0.05,
      time: 2,
    })
  ).toBe(11000);
});

// 091. 负数复杂表达式: -((2+3)*4)
test('091. 负数复杂表达式: -((2+3)*4)', () => {
  expect(calc('-((2+3)*4)')).toBe(-20);
});

// 092. 负数复杂表达式: -(2+3)*4
test('092. 负数复杂表达式: -(2+3)*4', () => {
  expect(calc('-(2+3)*4')).toBe(-20);
});

// 093. 复杂嵌套函数: DC.max(DC.min(10,5), DC.max(3,7))
test('093. 复杂嵌套函数: DC.max(DC.min(10,5), DC.max(3,7))', () => {
  expect(calc('DC.max(DC.min(10,5),DC.max(3,7))')).toBe(7);
});

// 094. 复杂表达式+数据源: (a+b)*(c-d)/e
test('094. 复杂表达式+数据源: (a+b)*(c-d)/e', () => {
  expect(calc('(a+b)*(c-d)/e', { a: 10, b: 5, c: 20, d: 5, e: 3 })).toBe(75);
});

// 095. 小数复杂表达式: 1.5*2.5+3.5/0.5
test('095. 小数复杂表达式: 1.5*2.5+3.5/0.5', () => {
  expect(calc('1.5*2.5+3.5/0.5')).toBe(10.75);
});

// 096. 多层括号+负数: -(((-1+2)*3)-4)
test('096. 多层括号+负数: -(((-1+2)*3)-4)', () => {
  expect(calc('-(((-1+2)*3)-4)')).toBe(1);
});

// 097. 复杂自定义+数据源: process(a, b, c)
test('097. 复杂自定义+数据源: process(a, b, c)', () => {
  const process = (a: number, b: number, c: number) => {
    return Math.sqrt(a * a + b * b + c * c);
  };
  expect(calc('process(a,b,c)', { a: 3, b: 4, c: 5, process }, { digit: 2 })).toBe('7.07');
});

// 098. 多自定义函数: func1(func2(a,b), func3(c,d))
test('098. 多自定义函数: func1(func2(a,b), func3(c,d))', () => {
  expect(
    calc('func1(func2(a,b),func3(c,d))', {
      a: 2,
      b: 3,
      c: 4,
      d: 5,
      func1: (x: number, y: number) => x + y,
      func2: (x: number, y: number) => x * y,
      func3: (x: number, y: number) => x - y,
    })
  ).toBe(5);
});

// 099. 格式化复杂表达式: (1000+2000)*1.5
test('099. 格式化复杂表达式: (1000+2000)*1.5', () => {
  expect(calc('(1000+2000)*1.5', {}, { separator: true, preUnit: '$' })).toBe('$4,500');
});

// 100. 综合测试: 复杂表达式、数据源和格式化
test('100. 综合测试: 复杂表达式、数据源和格式化', () => {
  expect(
    calc(
      'total*(1+taxRate)+shipping',
      {
        total: 100,
        taxRate: 0.08,
        shipping: 10,
      },
      {
        separator: true,
        digit: 2,
        postUnit: ' USD',
        percentage: true,
      }
    )
  ).toBe('11,800.00% USD');
});

// 101. DC.acos函数测试: DC.acos(0)
test('101. DC.acos函数测试: DC.acos(0)', () => {
  expect(calc('DC.acos(0)', {}, { digit: 5 })).toBe('1.57080');
});

// 102. DC.asin函数测试: DC.asin(1)
test('102. DC.asin函数测试: DC.asin(1)', () => {
  expect(calc('DC.asin(1)', {}, { digit: 5 })).toBe('1.57080');
});

// 103. DC.atan函数测试: DC.atan(1)
test('103. DC.atan函数测试: DC.atan(1)', () => {
  expect(calc('DC.atan(1)', {}, { digit: 5 })).toBe('0.78540');
});

// 104. DC.atan2函数测试: DC.atan2(1, 1)
test('104. DC.atan2函数测试: DC.atan2(1, 1)', () => {
  expect(calc('DC.atan2(1,1)', {}, { digit: 5 })).toBe('0.78540');
});

// 105. DC.cbrt函数测试: DC.cbrt(27)
test('105. DC.cbrt函数测试: DC.cbrt(27)', () => {
  expect(calc('DC.cbrt(27)')).toBe(3);
});

// 106. DC.clamp函数测试: DC.clamp(5, 1, 10)
test('106. DC.clamp函数测试: DC.clamp(5, 1, 10)', () => {
  expect(calc('DC.clamp(5,1,10)')).toBe(5);
});

// 107. DC.clamp函数边界测试: DC.clamp(0, 1, 10)
test('107. DC.clamp函数边界测试: DC.clamp(0, 1, 10)', () => {
  expect(calc('DC.clamp(0,1,10)')).toBe(1);
});

// 108. DC.clamp函数边界测试: DC.clamp(15, 1, 10)
test('108. DC.clamp函数边界测试: DC.clamp(15, 1, 10)', () => {
  expect(calc('DC.clamp(15,1,10)')).toBe(10);
});

// 109. DC.exp函数测试: DC.exp(1)
test('109. DC.exp函数测试: DC.exp(1)', () => {
  expect(calc('DC.exp(1)', {}, { digit: 5 })).toBe('2.71828');
});

// 110. DC.hypot函数测试: DC.hypot(3, 4)
test('110. DC.hypot函数测试: DC.hypot(3, 4)', () => {
  expect(calc('DC.hypot(3,4)')).toBe(5);
});

// 111. DC.ln函数测试: DC.ln(2.71828)
test('111. DC.ln函数测试: DC.ln(2.71828)', () => {
  expect(calc('DC.ln(2.71828)', {}, { digit: 2 })).toBe('1.00');
});

// 112. DC.log函数测试: DC.log(100, 10)
test('112. DC.log函数测试: DC.log(100, 10)', () => {
  expect(calc('DC.log(100,10)')).toBe(2);
});

// 113. DC.log2函数测试: DC.log2(8)
test('113. DC.log2函数测试: DC.log2(8)', () => {
  expect(calc('DC.log2(8)')).toBe(3);
});

// 114. DC.log10函数测试: DC.log10(1000)
test('114. DC.log10函数测试: DC.log10(1000)', () => {
  expect(calc('DC.log10(1000)')).toBe(3);
});

// 115. DC.mod函数测试: DC.mod(10, 3)
test('115. DC.mod函数测试: DC.mod(10, 3)', () => {
  expect(calc('DC.mod(10,3)')).toBe(1);
});

// 116. DC.random函数测试: DC.random()
test('116. DC.random函数测试: DC.random()', () => {
  const result = calc('DC.random()') as number;
  expect(typeof result).toBe('number');
  expect(result >= 0 && result < 1).toBe(true);
});

// 117. DC.sign函数测试: DC.sign(-5)
test('117. DC.sign函数测试: DC.sign(-5)', () => {
  expect(calc('DC.sign(-5)')).toBe(-1);
});

// 118. DC.sign函数测试: DC.sign(5)
test('118. DC.sign函数测试: DC.sign(5)', () => {
  expect(calc('DC.sign(5)')).toBe(1);
});

// 119. DC.sign函数测试: DC.sign(0)
test('119. DC.sign函数测试: DC.sign(0)', () => {
  expect(calc('DC.sign(0)')).toBe(0);
});

// 120. DC.sinh函数测试: DC.sinh(0)
test('120. DC.sinh函数测试: DC.sinh(0)', () => {
  expect(calc('DC.sinh(0)')).toBe(0);
});

// 121. DC.cosh函数测试: DC.cosh(0)
test('121. DC.cosh函数测试: DC.cosh(0)', () => {
  expect(calc('DC.cosh(0)')).toBe(1);
});

// 122. DC.tanh函数测试: DC.tanh(0)
test('122. DC.tanh函数测试: DC.tanh(0)', () => {
  expect(calc('DC.tanh(0)')).toBe(0);
});

// 123. DC.trunc函数测试: DC.trunc(3.7)
test('123. DC.trunc函数测试: DC.trunc(3.7)', () => {
  expect(calc('DC.trunc(3.7)')).toBe(3);
});

// 124. DC.trunc函数测试: DC.trunc(-3.7)
test('124. DC.trunc函数测试: DC.trunc(-3.7)', () => {
  expect(calc('DC.trunc(-3.7)')).toBe(-3);
});

// 125. 复杂DC函数嵌套: DC.abs(DC.sin(DC.acos(0)))
test('125. 复杂DC函数嵌套: DC.abs(DC.sin(DC.acos(0)))', () => {
  expect(calc('DC.abs(DC.sin(DC.acos(0)))', {}, { digit: 5 })).toBe('1.00000');
});

// 126. DC.sum函数测试: DC.sum(1, 2, 3, 4, 5)
test('126. DC.sum函数测试: DC.sum(1, 2, 3, 4, 5)', () => {
  expect(calc('DC.sum(1,2,3,4,5)')).toBe(15);
});

// 127. 多层DC函数嵌套: DC.max(DC.min(10,5), DC.abs(-3))
test('127. 多层DC函数嵌套: DC.max(DC.min(10,5), DC.abs(-3))', () => {
  expect(calc('DC.max(DC.min(10,5),DC.abs(-3))')).toBe(5);
});

// 128. DC函数与自定义函数混合: DC.max(customFunc(2,3), 5)
test('128. DC函数与自定义函数混合: DC.max(customFunc(2,3), 5)', () => {
  expect(calc('DC.max(customFunc(2,3),5)', { customFunc: (a: number, b: number) => a + b })).toBe(
    5
  );
});

// 129. 复杂DC函数表达式: DC.sqrt(DC.pow(3,2) + DC.pow(4,2))
test('129. 复杂DC函数表达式: DC.sqrt(DC.pow(3,2) + DC.pow(4,2))', () => {
  expect(calc('DC.sqrt(DC.pow(3,2)+DC.pow(4,2))')).toBe(5);
});

// 130. DC.atan2边界测试: DC.atan2(0, 1)
test('130. DC.atan2边界测试: DC.atan2(0, 1)', () => {
  expect(calc('DC.atan2(0,1)')).toBe(0);
});

// 131. DC.atan2边界测试: DC.atan2(1, 0)
test('131. DC.atan2边界测试: DC.atan2(1, 0)', () => {
  expect(calc('DC.atan2(1,0)', {}, { digit: 5 })).toBe('1.57080');
});

// 132. DC.hypot多参数测试: DC.hypot(3, 4, 5)
test('132. DC.hypot多参数测试: DC.hypot(3, 4, 5)', () => {
  expect(calc('DC.hypot(3,4,5)', {}, { digit: 2 })).toBe('7.07');
});

// 133. DC.clamp负数测试: DC.clamp(-5, -10, -1)
test('133. DC.clamp负数测试: DC.clamp(-5, -10, -1)', () => {
  expect(calc('DC.clamp(-5,-10,-1)')).toBe(-5);
});

// 134. DC.mod负数测试: DC.mod(-10, 3)
test('134. DC.mod负数测试: DC.mod(-10, 3)', () => {
  expect(calc('DC.mod(-10,3)')).toBe(-1);
});

// 135. DC.mod零测试: DC.mod(0, 5)
test('135. DC.mod零测试: DC.mod(0, 5)', () => {
  expect(calc('DC.mod(0,5)')).toBe(0);
});

// 136. DC.pow负指数测试: DC.pow(2, -3)
test('136. DC.pow负指数测试: DC.pow(2, -3)', () => {
  expect(calc('DC.pow(2,-3)', {}, { digit: 3 })).toBe('0.125');
});

// 137. DC.pow零指数测试: DC.pow(5, 0)
test('137. DC.pow零指数测试: DC.pow(5, 0)', () => {
  expect(calc('DC.pow(5,0)')).toBe(1);
});

// 138. DC.pow大数测试: DC.pow(10, 6)
test('138. DC.pow大数测试: DC.pow(10, 6)', () => {
  expect(calc('DC.pow(10,6)')).toBe(1000000);
});

// 139. DC.sqrt小数测试: DC.sqrt(0.25)
test('139. DC.sqrt小数测试: DC.sqrt(0.25)', () => {
  expect(calc('DC.sqrt(0.25)')).toBe(0.5);
});

// 140. DC.sqrt零测试: DC.sqrt(0)
test('140. DC.sqrt零测试: DC.sqrt(0)', () => {
  expect(calc('DC.sqrt(0)')).toBe(0);
});

// 141. DC.ln零测试: DC.ln(1)
test('141. DC.ln零测试: DC.ln(1)', () => {
  expect(calc('DC.ln(1)')).toBe(0);
});

// 142. DC.log零测试: DC.log(1, 10)
test('142. DC.log零测试: DC.log(1, 10)', () => {
  expect(calc('DC.log(1,10)')).toBe(0);
});

// 143. DC.exp零测试: DC.exp(0)
test('143. DC.exp零测试: DC.exp(0)', () => {
  expect(calc('DC.exp(0)')).toBe(1);
});

// 144. 复杂混合函数: DC.max(DC.min(a,b), DC.abs(c))
test('144. 复杂混合函数: DC.max(DC.min(a,b), DC.abs(c))', () => {
  expect(calc('DC.max(DC.min(a,b),DC.abs(c))', { a: 5, b: 3, c: -7 })).toBe(7);
});

// 145. 多层嵌套DC函数: DC.abs(DC.max(DC.min(-5,3), DC.abs(-2)))
test('145. 多层嵌套DC函数: DC.abs(DC.max(DC.min(-5,3), DC.abs(-2)))', () => {
  expect(calc('DC.abs(DC.max(DC.min(-5,3),DC.abs(-2)))')).toBe(2);
});

// 146. DC函数与运算符混合: DC.max(a+b, c*d)
test('146. DC函数与运算符混合: DC.max(a+b, c*d)', () => {
  expect(calc('DC.max(a+b,c*d)', { a: 2, b: 3, c: 4, d: 5 })).toBe(20);
});

// 147. 复杂DC表达式: DC.sqrt(DC.pow(a,2) + DC.pow(b,2))
test('147. 复杂DC表达式: DC.sqrt(DC.pow(a,2) + DC.pow(b,2))', () => {
  expect(calc('DC.sqrt(DC.pow(a,2)+DC.pow(b,2))', { a: 3, b: 4 })).toBe(5);
});

// 148. DC函数链式调用模拟: DC.max(DC.min(10,5), DC.max(3,7))
test('148. DC函数链式调用模拟: DC.max(DC.min(10,5), DC.max(3,7))', () => {
  expect(calc('DC.max(DC.min(10,5),DC.max(3,7))')).toBe(7);
});

// 149. DC函数与格式化混合: DC.max(a,b)
test('149. DC函数与格式化混合: DC.max(a,b)', () => {
  expect(calc('DC.max(a,b)', { a: 1000, b: 2000 }, { separator: true })).toBe('2,000');
});

// 150. DC.acosh函数测试: DC.acosh(1)
test('150. DC.acosh函数测试: DC.acosh(1)', () => {
  expect(calc('DC.acosh(1)')).toBe(0);
});

// 151. DC.asinh函数测试: DC.asinh(0)
test('151. DC.asinh函数测试: DC.asinh(0)', () => {
  expect(calc('DC.asinh(0)')).toBe(0);
});

// 152. DC.atanh函数测试: DC.atanh(0)
test('152. DC.atanh函数测试: DC.atanh(0)', () => {
  expect(calc('DC.atanh(0)')).toBe(0);
});

// 153. 复杂DC函数组合: DC.hypot(DC.abs(a), DC.abs(b))
test('153. 复杂DC函数组合: DC.hypot(DC.abs(a), DC.abs(b))', () => {
  expect(calc('DC.hypot(DC.abs(a),DC.abs(b))', { a: -3, b: -4 })).toBe(5);
});

// 154. DC函数与负数: DC.max(DC.abs(-5), DC.abs(-3))
test('154. DC函数与负数: DC.max(DC.abs(-5), DC.abs(-3))', () => {
  expect(calc('DC.max(DC.abs(-5),DC.abs(-3))')).toBe(5);
});

// 155. DC函数边界值测试: DC.sqrt(DC.pow(0,2))
test('155. DC函数边界值测试: DC.sqrt(DC.pow(0,2))', () => {
  expect(calc('DC.sqrt(DC.pow(0,2))')).toBe(0);
});

// 156. DC函数精度测试: DC.div(1,3)
test('156. DC函数精度测试: DC.div(1,3)', () => {
  expect(calc('DC.div(1,3)', {}, { digit: 10 })).toBe('0.3333333333');
});

// 157. DC.mul函数测试: DC.mul(2.5, 4)
test('157. DC.mul函数测试: DC.mul(2.5, 4)', () => {
  expect(calc('DC.mul(2.5,4)')).toBe(10);
});

// 158. DC.sub函数测试: DC.sub(10, 3.5)
test('158. DC.sub函数测试: DC.sub(10, 3.5)', () => {
  expect(calc('DC.sub(10,3.5)')).toBe(6.5);
});

// 159. DC.add函数测试: DC.add(2.5, 3.7)
test('159. DC.add函数测试: DC.add(2.5, 3.7)', () => {
  expect(calc('DC.add(2.5,3.7)', {}, { digit: 1 })).toBe('6.2');
});

// 160. 复杂DC运算: DC.add(DC.mul(2,3), DC.div(10,2))
test('160. 复杂DC运算: DC.add(DC.mul(2,3), DC.div(10,2))', () => {
  expect(calc('DC.add(DC.mul(2,3),DC.div(10,2))')).toBe(11);
});

// 161. DC函数与括号: DC.max((a+b), (c*d))
test('161. DC函数与括号: DC.max((a+b), (c*d))', () => {
  expect(calc('DC.max((a+b),(c*d))', { a: 2, b: 3, c: 4, d: 5 })).toBe(20);
});

// 162. DC函数与负括号: DC.abs(-(a+b))
test('162. DC函数与负括号: DC.abs(-(a+b))', () => {
  expect(calc('DC.abs(-(a+b))', { a: 2, b: 3 })).toBe(5);
});

// 163. 多层DC函数与括号: DC.max(DC.min((a+b),(c+d)), DC.abs(e))
test('163. 多层DC函数与括号: DC.max(DC.min((a+b),(c+d)), DC.abs(e))', () => {
  expect(calc('DC.max(DC.min((a+b),(c+d)),DC.abs(e))', { a: 2, b: 3, c: 4, d: 5, e: -6 })).toBe(6);
});

// 164. DC函数与小数精度: DC.div(DC.mul(1,7),3)
test('164. DC函数与小数精度: DC.div(DC.mul(1,7),3)', () => {
  expect(calc('DC.div(DC.mul(1,7),3)', {}, { digit: 6 })).toBe('2.333333');
});

// 165. DC函数与科学计数法: DC.mul(1e6, 2)
test('165. DC函数与科学计数法: DC.mul(1e6, 2)', () => {
  expect(calc('DC.mul(1e6,2)')).toBe(2000000);
});

// 166. DC函数与极小数: DC.mul(1e-6, 2)
test('166. DC函数与极小数: DC.mul(1e-6, 2)', () => {
  expect(calc('DC.mul(1e-6,2)', {}, { digit: 7 })).toBe('0.0000020');
});

// 167. 复杂DC函数链: DC.abs(DC.sub(DC.add(5,3),DC.mul(2,4)))
test('167. 复杂DC函数链: DC.abs(DC.sub(DC.add(5,3),DC.mul(2,4)))', () => {
  expect(calc('DC.abs(DC.sub(DC.add(5,3),DC.mul(2,4)))')).toBe(0);
});

// 168. DC函数与变量替换: DC.max(data.a, data.b)
test('168. DC函数与变量替换: DC.max(data.a, data.b)', () => {
  expect(calc('DC.max(data.a,data.b)', { data: { a: 10, b: 20 } })).toBe(20);
});

// 169. 多层对象DC函数: DC.abs(obj.nested.value)
test('169. 多层对象DC函数: DC.abs(obj.nested.value)', () => {
  expect(calc('DC.abs(obj.nested.value)', { obj: { nested: { value: -15 } } })).toBe(15);
});

// 170. DC函数与数组索引: DC.max(arr[0], arr[1])
test('170. DC函数与数组索引: DC.max(arr[0], arr[1])', () => {
  expect(calc('DC.max(arr[0],arr[1])', { arr: [5, 10] })).toBe(10);
});

// 171. 复杂DC表达式: DC.sqrt(DC.add(DC.pow(3,2), DC.pow(4,2)))
test('171. 复杂DC表达式: DC.sqrt(DC.add(DC.pow(3,2), DC.pow(4,2)))', () => {
  expect(calc('DC.sqrt(DC.add(DC.pow(3,2),DC.pow(4,2)))')).toBe(5);
});

// 172. DC函数与自定义函数混合2: customFunc(DC.max(2,3), DC.min(4,5))
test('172. DC函数与自定义函数混合2: customFunc(DC.max(2,3), DC.min(4,5))', () => {
  expect(
    calc('customFunc(DC.max(2,3),DC.min(4,5))', { customFunc: (a: number, b: number) => a * b })
  ).toBe(12);
});

// 173. DC函数边界测试: DC.div(0, 5)
test('173. DC函数边界测试: DC.div(0, 5)', () => {
  expect(calc('DC.div(0,5)')).toBe(0);
});

// 174. DC函数边界测试: DC.mul(0, 100)
test('174. DC函数边界测试: DC.mul(0, 100)', () => {
  expect(calc('DC.mul(0,100)')).toBe(0);
});

// 175. DC函数与负零: DC.abs(-0)
test('175. DC函数与负零: DC.abs(-0)', () => {
  expect(calc('DC.abs(-0)')).toBe(0);
});

// 176. 复杂DC嵌套: DC.max(DC.min(DC.abs(-5), 3), DC.max(1, 2))
test('176. 复杂DC嵌套: DC.max(DC.min(DC.abs(-5), 3), DC.max(1, 2))', () => {
  expect(calc('DC.max(DC.min(DC.abs(-5),3),DC.max(1,2))')).toBe(3);
});

// 177. DC函数与大数运算: DC.add(999999999, 1)
test('177. DC函数与大数运算: DC.add(999999999, 1)', () => {
  expect(calc('DC.add(999999999,1)')).toBe(1000000000);
});

// 178. DC函数与极小差值: DC.sub(1.0000001, 1.0000000)
test('178. DC函数与极小差值: DC.sub(1.0000001, 1.0000000)', () => {
  expect(calc('DC.sub(1.0000001,1.0000000)', {}, { digit: 7 })).toBe('0.0000001');
});

// 179. DC函数与循环小数: DC.div(22, 7)
test('179. DC函数与循环小数: DC.div(22, 7)', () => {
  expect(calc('DC.div(22,7)', {}, { digit: 5 })).toBe('3.14286');
});

// 180. DC函数与π近似: DC.mul(3.14159, 2)
test('180. DC函数与π近似: DC.mul(3.14159, 2)', () => {
  expect(calc('DC.mul(3.14159,2)', {}, { digit: 5 })).toBe('6.28318');
});

// 181. DC函数与e近似: DC.pow(2.71828, 1)
test('181. DC函数与e近似: DC.pow(2.71828, 1)', () => {
  expect(calc('DC.pow(2.71828,1)', {}, { digit: 5 })).toBe('2.71828');
});

// 182. 复杂三角函数: DC.sin(DC.div(DC.mul(3.14159,1),2))
test('182. 复杂三角函数: DC.sin(DC.div(DC.mul(3.14159,1),2))', () => {
  expect(calc('DC.sin(DC.div(DC.mul(3.14159,1),2))', {}, { digit: 4 })).toBe('1.0000');
});

// 183. DC函数与角度转换: DC.cos(DC.mul(3.14159,2))
test('183. DC函数与角度转换: DC.cos(DC.mul(3.14159,2))', () => {
  expect(calc('DC.cos(DC.mul(3.14159,2))', {}, { digit: 4 })).toBe('1.0000');
});

// 184. DC函数与对数恒等式: DC.pow(10, DC.log10(100))
test('184. DC函数与对数恒等式: DC.pow(10, DC.log10(100))', () => {
  expect(calc('DC.pow(10,DC.log10(100))')).toBe(100);
});

// 185. DC函数与指数恒等式: DC.ln(DC.exp(2))
test('185. DC函数与指数恒等式: DC.ln(DC.exp(2))', () => {
  expect(calc('DC.ln(DC.exp(2))', {}, { digit: 2 })).toBe('2.00');
});

// 186. DC函数与平方恒等式: DC.sqrt(DC.pow(5,2))
test('186. DC函数与平方恒等式: DC.sqrt(DC.pow(5,2))', () => {
  expect(calc('DC.sqrt(DC.pow(5,2))')).toBe(5);
});

// 187. DC函数与立方恒等式: DC.cbrt(DC.pow(3,3))
test('187. DC函数与立方恒等式: DC.cbrt(DC.pow(3,3))', () => {
  expect(calc('DC.cbrt(DC.pow(3,3))')).toBe(3);
});

// 188. 复杂DC函数恒等式: DC.exp(DC.ln(5))
test('188. 复杂DC函数恒等式: DC.exp(DC.ln(5))', () => {
  expect(calc('DC.exp(DC.ln(5))', {}, { digit: 2 })).toBe('5.00');
});

// 189. DC函数与反三角恒等式: DC.asin(DC.sin(1.5708))
test('189. DC函数与反三角恒等式: DC.asin(DC.sin(1.5708))', () => {
  expect(calc('DC.asin(DC.sin(1.5708))', {}, { digit: 4 })).toBe('1.5708');
});

// 190. DC函数与反余弦恒等式: DC.acos(DC.cos(0))
test('190. DC函数与反余弦恒等式: DC.acos(DC.cos(0))', () => {
  expect(calc('DC.acos(DC.cos(0))')).toBe(0);
});

// 191. DC函数与反正切恒等式: DC.atan(DC.tan(0.7854))
test('191. DC函数与反正切恒等式: DC.atan(DC.tan(0.7854))', () => {
  expect(calc('DC.atan(DC.tan(0.7854))', {}, { digit: 4 })).toBe('0.7854');
});

// 192. DC函数与双曲正弦恒等式: DC.asinh(DC.sinh(1))
test('192. DC函数与双曲正弦恒等式: DC.asinh(DC.sinh(1))', () => {
  expect(calc('DC.asinh(DC.sinh(1))', {}, { digit: 5 })).toBe('1.00000');
});

// 193. DC函数与双曲余弦恒等式: DC.acosh(DC.cosh(1))
test('193. DC函数与双曲余弦恒等式: DC.acosh(DC.cosh(1))', () => {
  expect(calc('DC.acosh(DC.cosh(1))', {}, { digit: 5 })).toBe('1.00000');
});

// 194. DC函数与双曲正切恒等式: DC.atanh(DC.tanh(0.5))
test('194. DC函数与双曲正切恒等式: DC.atanh(DC.tanh(0.5))', () => {
  expect(calc('DC.atanh(DC.tanh(0.5))', {}, { digit: 5 })).toBe('0.50000');
});

// 195. 综合DC函数测试: DC.abs(DC.sin(DC.cos(DC.tan(0))))
test('195. 综合DC函数测试: DC.abs(DC.sin(DC.cos(DC.tan(0))))', () => {
  expect(calc('DC.abs(DC.sin(DC.cos(DC.tan(0))))', {}, { digit: 5 })).toBe('0.84147');
});

// 196. DC函数与数据源混合: DC.max(obj.a, obj.b)
test('196. DC函数与数据源混合: DC.max(obj.a, obj.b)', () => {
  expect(calc('DC.max(obj.a,obj.b)', { obj: { a: 15, b: 25 } })).toBe(25);
});

// 197. 复杂DC函数表达式: DC.sqrt(DC.add(DC.pow(a,2), DC.pow(b,2), DC.pow(c,2)))
test('197. 复杂DC函数表达式: DC.sqrt(DC.add(DC.pow(a,2), DC.pow(b,2), DC.pow(c,2)))', () => {
  expect(
    calc('DC.sqrt(DC.add(DC.pow(a,2),DC.pow(b,2),DC.pow(c,2)))', { a: 1, b: 2, c: 2 }, { digit: 2 })
  ).toBe('2.24');
});

// 198. DC函数与自定义函数链: custom(DC.max(a,b), DC.min(c,d))
test('198. DC函数与自定义函数链: custom(DC.max(a,b), DC.min(c,d))', () => {
  expect(
    calc('custom(DC.max(a,b),DC.min(c,d))', {
      a: 10,
      b: 20,
      c: 5,
      d: 15,
      custom: (x: number, y: number) => x + y,
    })
  ).toBe(25);
});

// 199. DC函数与条件表达式模拟: DC.max(DC.abs(x), DC.abs(y))
test('199. DC函数与条件表达式模拟: DC.max(DC.abs(x), DC.abs(y))', () => {
  expect(calc('DC.max(DC.abs(x),DC.abs(y))', { x: -8, y: 6 })).toBe(8);
});

// 200. 科学计数法基础运算: 1.23e2 + 4.56e1
test('200. 科学计数法基础运算: 1.23e2 + 4.56e1', () => {
  expect(calc('1.23e2 + 4.56e1')).toBe(168.6);
});

// 201. 科学计数法乘法运算: 2.5e3 * 1.2e-2
test('201. 科学计数法乘法运算: 2.5e3 * 1.2e-2', () => {
  expect(calc('2.5e3 * 1.2e-2')).toBe(30);
});

// 202. 科学计数法除法运算: 6.02e23 / 2.0e2
test('202. 科学计数法除法运算: 6.02e23 / 2.0e2', () => {
  expect(calc('6.02e23 / 2.0e2')).toBe(3.01e21);
});

// 203. 科学计数法与DC函数: DC.sqrt(1.44e4)
test('203. 科学计数法与DC函数: DC.sqrt(1.44e4)', () => {
  expect(calc('DC.sqrt(1.44e4)')).toBe(120);
});

// 204. 科学计数法幂运算: DC.pow(2.5e-1, 3)
test('204. 科学计数法幂运算: DC.pow(2.5e-1, 3)', () => {
  expect(calc('DC.pow(2.5e-1, 3)', {}, { digit: 6 })).toBe('0.015625');
});

// 205. 极小数科学计数法: 1.23e-10 + 4.56e-10
test('205. 极小数科学计数法: 1.23e-10 + 4.56e-10', () => {
  expect(calc('1.23e-10 + 4.56e-10')).toBe(5.79e-10);
});

// 206. 极大数科学计数法: 9.99e15 * 9.99e15
test('206. 极大数科学计数法: 9.99e15 * 9.99e15', () => {
  expect(calc('9.99e15 * 9.99e15')).toBe(9.98001e31);
});

// 207. 科学计数法精度测试: 1.0000000001e10 + 1
test('207. 科学计数法精度测试: 1.0000000001e10 + 1', () => {
  expect(calc('1.0000000001e10 + 1')).toBe(10000000002); //10000000002===10000000002
});

// 208. 科学计数法与三角函数: DC.sin(3.14159e0 / 2)
test('208. 科学计数法与三角函数: DC.sin(3.14159e0 / 2)', () => {
  expect(calc('DC.sin(3.14159e0 / 2)', {}, { digit: 5 })).toBe('1.00000');
});

// 209. 科学计数法对数运算: DC.log10(1e5)
test('209. 科学计数法对数运算: DC.log10(1e5)', () => {
  expect(calc('DC.log10(1e5)')).toBe(5);
});

// 210. 科学计数法自然对数: DC.ln(2.718281828e0)
test('210. 科学计数法自然对数: DC.ln(2.718281828e0)', () => {
  expect(calc('DC.ln(2.718281828e0)', {}, { digit: 3 })).toBe('1.000');
});

// 211. 科学计数法指数运算: DC.exp(2.302585e0)
test('211. 科学计数法指数运算: DC.exp(2.302585e0)', () => {
  expect(calc('DC.exp(2.302585e0)', {}, { digit: 2 })).toBe('10.00');
});

// 212. 科学计数法与开方: DC.sqrt(6.25e-2)
test('212. 科学计数法与开方: DC.sqrt(6.25e-2)', () => {
  expect(calc('DC.sqrt(6.25e-2)')).toBe(0.25);
});

// 213. 科学计数法立方根: DC.cbrt(1.331e3)
test('213. 科学计数法立方根: DC.cbrt(1.331e3)', () => {
  expect(calc('DC.cbrt(1.331e3)')).toBe(11);
});

// 214. 科学计数法绝对值: DC.abs(-5.67e-8)
test('214. 科学计数法绝对值: DC.abs(-5.67e-8)', () => {
  expect(calc('DC.abs(-5.67e-8)')).toBe(5.67e-8);
});

// 215. 科学计数法符号函数: DC.sign(-1.23e4)
test('215. 科学计数法符号函数: DC.sign(-1.23e4)', () => {
  expect(calc('DC.sign(-1.23e4)')).toBe(-1);
});

// 216. 科学计数法截断函数: DC.trunc(1.999e1)
test('216. 科学计数法截断函数: DC.trunc(1.999e1)', () => {
  expect(calc('DC.trunc(1.999e1)')).toBe(19);
});

// 217. 科学计数法向上取整: DC.ceil(1.001e-2)
test('217. 科学计数法向上取整: DC.ceil(1.001e-2)', () => {
  expect(calc('DC.ceil(1.001e-2)')).toBe(1);
});

// 218. 科学计数法向下取整: DC.floor(1.999e-2)
test('218. 科学计数法向下取整: DC.floor(1.999e-2)', () => {
  expect(calc('DC.floor(1.999e-2)')).toBe(0);
});

// 219. 科学计数法四舍五入: DC.round(1.23456e2)
test('219. 科学计数法四舍五入: DC.round(1.23456e2)', () => {
  expect(calc('DC.round(1.23456e2)')).toBe(123);
});

// 220. 科学计数法最大值函数: DC.max(1.23e2, 4.56e1, 7.89e0)
test('220. 科学计数法最大值函数: DC.max(1.23e2, 4.56e1, 7.89e0)', () => {
  expect(calc('DC.max(1.23e2, 4.56e1, 7.89e0)')).toBe(123);
});

// 221. 科学计数法最小值函数: DC.min(1.23e-2, 4.56e-3, 7.89e-4)
test('221. 科学计数法最小值函数: DC.min(1.23e-2, 4.56e-3, 7.89e-4)', () => {
  expect(calc('DC.min(1.23e-2, 4.56e-3, 7.89e-4)')).toBe(0.000789);
});

// 222. 科学计数法求和函数: DC.sum(1.5e3, 2.5e2, 7.5e1)
test('222. 科学计数法求和函数: DC.sum(1.5e3, 2.5e2, 7.5e1)', () => {
  expect(calc('DC.sum(1.5e3, 2.5e2, 7.5e1)')).toBe(1825);
});

// 223. 科学计数法乘积函数: DC.mul(2e2, 3e1, 4e0)
test('223. 科学计数法乘积函数: DC.mul(2e2, 3e1, 4e0)', () => {
  expect(calc('DC.mul(2e2, 3e1, 4e0)')).toBe(6000);
});

// 224. 科学计数法减法函数: DC.sub(1e5, 2.5e4)
test('224. 科学计数法减法函数: DC.sub(1e5, 2.5e4)', () => {
  expect(calc('DC.sub(1e5, 2.5e4)')).toBe(75000);
});

// 225. 科学计数法除法函数: DC.div(1e6, 2.5e2)
test('225. 科学计数法除法函数: DC.div(1e6, 2.5e2)', () => {
  expect(calc('DC.div(1e6, 2.5e2)')).toBe(4000);
});

// 226. 科学计数法模运算: DC.mod(1.23e3, 4.56e2)
test('226. 科学计数法模运算: DC.mod(1.23e3, 4.56e2)', () => {
  expect(calc('DC.mod(1.23e3, 4.56e2)')).toBe(318);
});

// 227. 科学计数法双曲正弦: DC.sinh(1.23e0)
test('227. 科学计数法双曲正弦: DC.sinh(1.23e0)', () => {
  expect(calc('DC.sinh(1.23e0)', {}, { digit: 4 })).toBe('1.5645');
});

// 228. 科学计数法双曲余弦: DC.cosh(1.23e0)
test('228. 科学计数法双曲余弦: DC.cosh(1.23e0)', () => {
  expect(calc('DC.cosh(1.23e0)', {}, { digit: 4 })).toBe('1.8568');
});

// 229. 科学计数法双曲正切: DC.tanh(5.67e-1)
test('229. 科学计数法双曲正切: DC.tanh(5.67e-1)', () => {
  expect(calc('DC.tanh(5.67e-1)', {}, { digit: 4 })).toBe('0.5132');
});

// 230. 科学计数法反双曲正弦: DC.asinh(1.23e0)
test('230. 科学计数法反双曲正弦: DC.asinh(1.23e0)', () => {
  expect(calc('DC.asinh(1.23e0)', {}, { digit: 4 })).toBe('1.0350');
});

// 231. 科学计数法反双曲余弦: DC.acosh(1.23e0)
test('231. 科学计数法反双曲余弦: DC.acosh(1.23e0)', () => {
  expect(calc('DC.acosh(1.23e0)', {}, { digit: 4 })).toBe('0.6659');
});

// 232. 科学计数法反双曲正切: DC.atanh(5.67e-1)
test('232. 科学计数法反双曲正切: DC.atanh(5.67e-1)', () => {
  expect(calc('DC.atanh(5.67e-1)', {}, { digit: 4 })).toBe('0.6431');
});

// 233. 科学计数法反正弦: DC.asin(5.67e-1)
test('233. 科学计数法反正弦: DC.asin(5.67e-1)', () => {
  expect(calc('DC.asin(5.67e-1)', {}, { digit: 4 })).toBe('0.6029');
});

// 234. 科学计数法反余弦: DC.acos(5.67e-1)
test('234. 科学计数法反余弦: DC.acos(5.67e-1)', () => {
  expect(calc('DC.acos(5.67e-1)', {}, { digit: 4 })).toBe('0.9679');
});

// 235. 科学计数法反正切: DC.atan(1.23e0)
test('235. 科学计数法反正切: DC.atan(1.23e0)', () => {
  expect(calc('DC.atan(1.23e0)', {}, { digit: 4 })).toBe('0.8882');
});

// 236. 科学计数法两参数反正切: DC.atan2(1.23e0, 1e0)
test('236. 科学计数法两参数反正切: DC.atan2(1.23e0, 1e0)', () => {
  expect(calc('DC.atan2(1.23e0, 1e0)', {}, { digit: 4 })).toBe('0.8882');
});

// 237. 科学计数法余弦: DC.cos(3.14159e0 / 3)
test('237. 科学计数法余弦: DC.cos(3.14159e0 / 3)', () => {
  expect(calc('DC.cos(3.14159e0 / 3)', {}, { digit: 4 })).toBe('0.5000');
});

// 238. 科学计数法正弦: DC.sin(3.14159e0 / 2)
test('238. 科学计数法正弦: DC.sin(3.14159e0 / 2)', () => {
  expect(calc('DC.sin(3.14159e0 / 2)', {}, { digit: 4 })).toBe('1.0000');
});

// 239. 科学计数法正切: DC.tan(7.854e-1)
test('239. 科学计数法正切: DC.tan(7.854e-1)', () => {
  expect(calc('DC.tan(7.854e-1)', {}, { digit: 4 })).toBe('1.0000');
});

// 240. 科学计数法欧几里得距离: DC.hypot(3e0, 4e0)
test('240. 科学计数法欧几里得距离: DC.hypot(3e0, 4e0)', () => {
  expect(calc('DC.hypot(3e0, 4e0)')).toBe(5);
});

// 241. 科学计数法三维距离: DC.hypot(1e1, 2e1, 3e1)
test('241. 科学计数法三维距离: DC.hypot(1e1, 2e1, 3e1)', () => {
  expect(calc('DC.hypot(1e1, 2e1, 3e1)', {}, { digit: 2 })).toBe('37.42');
});

// 242. 科学计数法钳制函数: DC.clamp(5e-1, 1e-1, 9e-1)
test('242. 科学计数法钳制函数: DC.clamp(5e-1, 1e-1, 9e-1)', () => {
  expect(calc('DC.clamp(5e-1, 1e-1, 9e-1)')).toBe(0.5);
});

// 243. 科学计数法边界钳制下界: DC.clamp(5e-2, 1e-1, 9e-1)
test('243. 科学计数法边界钳制下界: DC.clamp(5e-2, 1e-1, 9e-1)', () => {
  expect(calc('DC.clamp(5e-2, 1e-1, 9e-1)')).toBe(0.1);
});

// 244. 科学计数法边界钳制上界: DC.clamp(9.5e-1, 1e-1, 9e-1)
test('244. 科学计数法边界钳制上界: DC.clamp(9.5e-1, 1e-1, 9e-1)', () => {
  expect(calc('DC.clamp(9.5e-1, 1e-1, 9e-1)')).toBe(0.9);
});

// 245. 科学计数法负数钳制: DC.clamp(-5e-1, -9e-1, -1e-1)
test('245. 科学计数法负数钳制: DC.clamp(-5e-1, -9e-1, -1e-1)', () => {
  expect(calc('DC.clamp(-5e-1, -9e-1, -1e-1)')).toBe(-0.5);
});

// 246. 科学计数法与数据源混合: 1.23e2 + value
test('246. 科学计数法与数据源混合: 1.23e2 + value', () => {
  expect(calc('1.23e2 + value', { value: 4.56e1 })).toBe(168.6);
});

// 247. 科学计数法复杂表达式: (1.23e2 + 4.56e1) * 7.89e0
test('247. 科学计数法复杂表达式: (1.23e2 + 4.56e1) * 7.89e0', () => {
  expect(calc('(1.23e2 + 4.56e1) * 7.89e0')).toBe(1330.254);
});

// 248. 科学计数法嵌套函数: DC.sqrt(DC.abs(-1.44e2))
test('248. 科学计数法嵌套函数: DC.sqrt(DC.abs(-1.44e2))', () => {
  expect(calc('DC.sqrt(DC.abs(-1.44e2))')).toBe(12);
});

// 249. 科学计数法与格式化组合: 1.23e6
test('249. 科学计数法与格式化组合: 1.23e6', () => {
  expect(calc('1.23e6', {}, { separator: true })).toBe('1,230,000');
});

// 250. 科学计数法基本加法: 1e2 + 2e2
test('250. 科学计数法基本加法: 1e2 + 2e2', () => {
  expect(calc('1e2+2e2')).toBe(300);
});

// 251. 科学计数法基本减法: 5e3 - 2e3
test('251. 科学计数法基本减法: 5e3 - 2e3', () => {
  expect(calc('5e3-2e3')).toBe(3000);
});

// 252. 科学计数法基本乘法: 2e2 * 3e1
test('252. 科学计数法基本乘法: 2e2 * 3e1', () => {
  expect(calc('2e2*3e1')).toBe(6000);
});

// 253. 科学计数法基本除法: 8e3 / 2e2
test('253. 科学计数法基本除法: 8e3 / 2e2', () => {
  expect(calc('8e3/2e2')).toBe(40);
});

// 254. 科学计数法与普通数字混合: 1e2 + 50
test('254. 科学计数法与普通数字混合: 1e2 + 50', () => {
  expect(calc('1e2+50')).toBe(150);
});

// 255. 负指数科学计数法: 1e-2 + 2e-2
test('255. 负指数科学计数法: 1e-2 + 2e-2', () => {
  expect(calc('1e-2+2e-2')).toBe(0.03);
});

// 256. 正负指数混合: 1e2 + 1e-2
test('256. 正负指数混合: 1e2 + 1e-2', () => {
  expect(calc('1e2+1e-2')).toBe(100.01);
});

// 257. 大指数科学计数法: 1e10 + 2e10
test('257. 大指数科学计数法: 1e10 + 2e10', () => {
  expect(calc('1e10+2e10')).toBe(30000000000);
});

// 258. 小指数科学计数法: 1e-10 + 2e-10
test('258. 小指数科学计数法: 1e-10 + 2e-10', () => {
  expect(calc('1e-10+2e-10')).toBe(3e-10);
});

// 259. 科学计数法与变量: a + b
test('259. 科学计数法与变量: a + b', () => {
  expect(calc('a+b', { a: 1e2, b: 2e3 })).toBe(2100);
});

// 260. 科学计数法与函数: DC.max(1e2, 2e1)
test('260. 科学计数法与函数: DC.max(1e2, 2e1)', () => {
  expect(calc('DC.max(1e2,2e1)')).toBe(100);
});

// 261. 科学计数法嵌套计算: (1e2 + 2e1) * 3e0
test('261. 科学计数法嵌套计算: (1e2 + 2e1) * 3e0', () => {
  expect(calc('(1e2+2e1)*3e0')).toBe(360);
});

// 262. 科学计数法复杂表达式: 1e2 + 2e1 * 3e0
test('262. 科学计数法复杂表达式: 1e2 + 2e1 * 3e0', () => {
  expect(calc('1e2+2e1*3e0')).toBe(160);
});

// 263. 科学计数法负数: -1e2 + 2e2
test('263. 科学计数法负数: -1e2 + 2e2', () => {
  expect(calc('-1e2+2e2')).toBe(100);
});

// 264. 科学计数法负指数负数: -1e-2 + 2e-2
test('264. 科学计数法负指数负数: -1e-2 + 2e-2', () => {
  expect(calc('-1e-2+2e-2')).toBe(0.01);
});

// 265. 科学计数法大负指数: 1e-100 + 2e-100
test('265. 科学计数法大负指数: 1e-100 + 2e-100', () => {
  expect(calc('1e-100+2e-100')).toBe(3e-100);
});

// 266. 科学计数法大正指数: 1e100 + 2e100
test('266. 科学计数法大正指数: 1e100 + 2e100', () => {
  expect(calc('1e100+2e100')).toBe(3e100);
});

// 267. 科学计数法与格式化: 1e6 格式化千分位
test('267. 科学计数法与格式化: 1e6 格式化千分位', () => {
  expect(calc('1e6', {}, { separator: true })).toBe('1,000,000');
});

// 268. 科学计数法与百分比: 1e-2 转换为百分比
test('268. 科学计数法与百分比: 1e-2 转换为百分比', () => {
  expect(calc('1e-2', {}, { percentage: true })).toBe('1%');
});

// 269. 科学计数法与千分比: 1e-3 转换为千分比
test('269. 科学计数法与千分比: 1e-3 转换为千分比', () => {
  expect(calc('1e-3', {}, { permillage: true })).toBe('1‰');
});

// 270. 科学计数法小数位数控制: 1.23e2 保留1位小数
test('270. 科学计数法小数位数控制: 1.23e2 保留1位小数', () => {
  expect(calc('1.23e2', {}, { digit: 1 })).toBe('123.0');
});

// 271. 科学计数法单位格式化: 1e3 添加美元单位
test('271. 科学计数法单位格式化: 1e3 添加美元单位', () => {
  expect(calc('1e3', {}, { preUnit: '$' })).toBe('$1000');
});

// 272. 科学计数法复杂格式化: 1.5e6 综合格式化
test('272. 科学计数法复杂格式化: 1.5e6 综合格式化', () => {
  expect(calc('1.5e6', {}, { separator: true, digit: 2, preUnit: '¥' })).toBe('¥1,500,000.00');
});

// 273. 科学计数法除零处理: 1e10 / 0
test('273. 科学计数法除零处理: 1e10 / 0', () => {
  expect(calc('1e10/0')).toBe(Infinity);
});

// 274. 科学计数法零除处理: 0 / 1e10
test('274. 科学计数法零除处理: 0 / 1e10', () => {
  expect(calc('0/1e10')).toBe(0);
});

// 275. 科学计数法与自定义函数: custom(1e2, 2e1)
test('275. 科学计数法与自定义函数: custom(1e2, 2e1)', () => {
  expect(calc('custom(a,b)', { a: 1e2, b: 2e1, custom: (x: number, y: number) => x + y })).toBe(
    120
  );
});

// 276. 科学计数法与DC函数: DC.pow(1e2, 2)
test('276. 科学计数法与DC函数: DC.pow(1e2, 2)', () => {
  expect(calc('DC.pow(1e2,2)')).toBe(10000);
});

// 277. 科学计数法与DC函数: DC.sqrt(1e4)
test('277. 科学计数法与DC函数: DC.sqrt(1e4)', () => {
  expect(calc('DC.sqrt(1e4)')).toBe(100);
});

// 278. 科学计数法与DC函数: DC.log(1e3)
test('278. 科学计数法与DC函数: DC.log(1e3)', () => {
  expect(calc('DC.log(1e3)', {}, { digit: 5 })).toBe('3.00000');
});

// 279. 科学计数法与DC函数: DC.ln(1e2)
test('279. 科学计数法与DC函数: DC.ln(1e2)', () => {
  expect(calc('DC.ln(1e2)', {}, { digit: 5 })).toBe('4.60517');
});

// 280. 科学计数法与DC函数: DC.log10(1e5)
test('280. 科学计数法与DC函数: DC.log10(1e5)', () => {
  expect(calc('DC.log10(1e5)')).toBe(5);
});

// 281. 科学计数法与DC函数: DC.exp(1e1)
test('281. 科学计数法与DC函数: DC.exp(1e1)', () => {
  expect(calc('DC.exp(1e1)', {}, { digit: 2 })).toBe('22026.47');
});

// 282. 科学计数法与DC函数: DC.sin(1e0)
test('282. 科学计数法与DC函数: DC.sin(1e0)', () => {
  expect(calc('DC.sin(1e0)', {}, { digit: 5 })).toBe('0.84147');
});

// 283. 科学计数法与DC函数: DC.cos(1e0)
test('283. 科学计数法与DC函数: DC.cos(1e0)', () => {
  expect(calc('DC.cos(1e0)', {}, { digit: 5 })).toBe('0.54030');
});

// 284. 科学计数法与DC函数: DC.tan(1e0)
test('284. 科学计数法与DC函数: DC.tan(1e0)', () => {
  expect(calc('DC.tan(1e0)', {}, { digit: 5 })).toBe('1.55741');
});

// 285. 科学计数法与DC函数: DC.asin(1e-1)
test('285. 科学计数法与DC函数: DC.asin(1e-1)', () => {
  expect(calc('DC.asin(1e-1)', {}, { digit: 5 })).toBe('0.10017');
});

// 286. 科学计数法与DC函数: DC.acos(1e-1)
test('286. 科学计数法与DC函数: DC.acos(1e-1)', () => {
  expect(calc('DC.acos(1e-1)', {}, { digit: 5 })).toBe('1.47063');
});

// 287. 科学计数法与DC函数: DC.atan(1e0)
test('287. 科学计数法与DC函数: DC.atan(1e0)', () => {
  expect(calc('DC.atan(1e0)', {}, { digit: 5 })).toBe('0.78540');
});

// 288. 科学计数法与DC函数: DC.abs(-1e2)
test('288. 科学计数法与DC函数: DC.abs(-1e2)', () => {
  expect(calc('DC.abs(-1e2)')).toBe(100);
});

// 289. 科学计数法与DC函数: DC.ceil(1.5e2)
test('289. 科学计数法与DC函数: DC.ceil(1.5e2)', () => {
  expect(calc('DC.ceil(1.5e2)')).toBe(150);
});

// 290. 科学计数法与DC函数: DC.floor(1.5e2)
test('290. 科学计数法与DC函数: DC.floor(1.5e2)', () => {
  expect(calc('DC.floor(1.5e2)')).toBe(150);
});

// 291. 科学计数法与DC函数: DC.round(1.56e2)
test('291. 科学计数法与DC函数: DC.round(1.56e2)', () => {
  expect(calc('DC.round(1.56e2)')).toBe(156);
});

// 292. 科学计数法与DC函数: DC.min(1e2, 2e1, 5e0)
test('292. 科学计数法与DC函数: DC.min(1e2, 2e1, 5e0)', () => {
  expect(calc('DC.min(1e2,2e1,5e0)')).toBe(5);
});

// 293. 科学计数法与DC函数: DC.max(1e2, 2e1, 5e0)
test('293. 科学计数法与DC函数: DC.max(1e2, 2e1, 5e0)', () => {
  expect(calc('DC.max(1e2,2e1,5e0)')).toBe(100);
});

// 294. 科学计数法与DC函数: DC.sum(1e1, 2e1, 3e1)
test('294. 科学计数法与DC函数: DC.sum(1e1, 2e1, 3e1)', () => {
  expect(calc('DC.sum(1e1,2e1,3e1)')).toBe(60);
});

// 295. 科学计数法与DC函数: DC.mul(2e1, 3e1)
test('295. 科学计数法与DC函数: DC.mul(2e1, 3e1)', () => {
  expect(calc('DC.mul(2e1,3e1)')).toBe(600);
});

// 296. 科学计数法与DC函数: DC.div(6e2, 2e1)
test('296. 科学计数法与DC函数: DC.div(6e2, 2e1)', () => {
  expect(calc('DC.div(6e2,2e1)')).toBe(30);
});

// 297. 科学计数法与DC函数: DC.mod(1e2, 3e1)
test('297. 科学计数法与DC函数: DC.mod(1e2, 3e1)', () => {
  expect(calc('DC.mod(1e2,3e1)')).toBe(10);
});

// 298. 科学计数法与DC函数: DC.clamp(1e3, 1e1, 1e2)
test('298. 科学计数法与DC函数: DC.clamp(1e3, 1e1, 1e2)', () => {
  expect(calc('DC.clamp(1e3,1e1,1e2)')).toBe(100);
});

// 299. 科学计数法与DC函数: DC.sign(-1e2)
test('299. 科学计数法与DC函数: DC.sign(-1e2)', () => {
  expect(calc('DC.sign(-1e2)')).toBe(-1);
});

// 300. 科学计数法与DC函数: DC.sign(1e2)
test('300. 科学计数法与DC函数: DC.sign(1e2)', () => {
  expect(calc('DC.sign(1e2)')).toBe(1);
});

// 301. 科学计数法与DC函数: DC.sign(0)
test('301. 科学计数法与DC函数: DC.sign(0)', () => {
  expect(calc('DC.sign(0)')).toBe(0);
});

// 302. 科学计数法与DC函数: DC.trunc(1.9e1)
test('302. 科学计数法与DC函数: DC.trunc(1.9e1)', () => {
  expect(calc('DC.trunc(1.9e1)')).toBe(19);
});

// 303. 科学计数法与DC函数: DC.cbrt(1e3)
test('303. 科学计数法与DC函数: DC.cbrt(1e3)', () => {
  expect(calc('DC.cbrt(1e3)', {}, { digit: 5 })).toBe('10.00000');
});

// 304. 科学计数法与DC函数: DC.atan2(1e1, 1e1)
test('304. 科学计数法与DC函数: DC.atan2(1e1, 1e1)', () => {
  expect(calc('DC.atan2(1e1,1e1)', {}, { digit: 5 })).toBe('0.78540');
});

// 305. 科学计数法与DC函数: DC.hypot(3e1, 4e1)
test('305. 科学计数法与DC函数: DC.hypot(3e1, 4e1)', () => {
  expect(calc('DC.hypot(3e1,4e1)')).toBe(50);
});

// 306. 科学计数法与DC函数: DC.pow(2e0, 1e1)
test('306. 科学计数法与DC函数: DC.pow(2e0, 1e1)', () => {
  expect(calc('DC.pow(2e0,1e1)')).toBe(1024);
});

// 307. 科学计数法与DC函数: DC.random() 范围检查
test('307. 科学计数法与DC函数: DC.random() 范围检查', () => {
  const result = calc('DC.random()');
  expect(typeof result).toBe('number');
  expect(result).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThan(1);
});

// 308. 科学计数法大数加法溢出检查: 1e308 + 1e308
test('308. 科学计数法大数加法溢出检查: 1e308 + 1e308', () => {
  expect(calc('1e308+1e308')).toBe(Infinity);
});

// 309. 科学计数法极小数加法: 1e-308 + 1e-308
test('309. 科学计数法极小数加法: 1e-308 + 1e-308', () => {
  expect(calc('1e-308+1e-308')).toBe(2e-308);
});

// 310. 科学计数法与嵌套对象属性: obj.value
test('310. 科学计数法与嵌套对象属性: obj.value', () => {
  expect(calc('obj.value', { obj: { value: 1.5e2 } })).toBe(150);
});

// 311. 科学计数法与数组索引: arr[0]
test('311. 科学计数法与数组索引: arr[0]', () => {
  expect(calc('arr[0]', { arr: [1e2, 2e1] })).toBe(100);
});

// 312. 科学计数法复杂表达式: (1e2 + 2e1) * (3e0 - 1e0)
test('312. 科学计数法复杂表达式: (1e2 + 2e1) * (3e0 - 1e0)', () => {
  expect(calc('(1e2+2e1)*(3e0-1e0)')).toBe(240);
});

// 313. 科学计数法超复杂表达式: ((1e2 + 2e1) * 3e0 - 4e1) / 5e0
test('313. 科学计数法超复杂表达式: ((1e2 + 2e1) * 3e0 - 4e1) / 5e0', () => {
  expect(calc('((1e2+2e1)*3e0-4e1)/5e0')).toBe(64);
});

// 314. 科学计数法负指数复杂运算: (1e-2 + 2e-3) * 1e3
test('314. 科学计数法负指数复杂运算: (1e-2 + 2e-3) * 1e3', () => {
  expect(calc('(1e-2+2e-3)*1e3')).toBe(12);
});

// 315. 科学计数法混合精度运算: 1.23456789e2 + 9.87654321e1
test('315. 科学计数法混合精度运算: 1.23456789e2 + 9.87654321e1', () => {
  expect(calc('1.23456789e2+9.87654321e1', {}, { digit: 8 })).toBe('222.22222110');
});

// 316. 科学计数法与自定义函数嵌套: custom(DC.max(1e2, 2e1), DC.min(3e1, 4e0))
test('316. 科学计数法与自定义函数嵌套: custom(DC.max(1e2, 2e1), DC.min(3e1, 4e0))', () => {
  expect(
    calc('custom(DC.max(1e2,2e1),DC.min(3e1,4e0))', {
      custom: (a: number, b: number) => a + b,
    })
  ).toBe(104);
});

// 317. 科学计数法超大指数运算: 1e100 * 2e50
test('317. 科学计数法超大指数运算: 1e100 * 2e50', () => {
  expect(calc('1e100*2e50')).toBe(2e150);
});

// 318. 科学计数法超小指数运算: 1e-100 * 2e-50
test('318. 科学计数法超小指数运算: 1e-100 * 2e-50', () => {
  expect(calc('1e-100*2e-50')).toBe(2e-150);
});

// 319. 科学计数法与科学计数法相除: 1e100 / 2e50
test('319. 科学计数法与科学计数法相除: 1e100 / 2e50', () => {
  expect(calc('1e100/2e50')).toBe(5e49);
});

// 320. 科学计数法与科学计数法相除产生小数: 1e50 / 2e100
test('320. 科学计数法与科学计数法相除产生小数: 1e50 / 2e100', () => {
  expect(calc('1e50/2e100')).toBe(5e-51);
});

// 321. 科学计数法开方运算: DC.sqrt(1.44e2)
test('321. 科学计数法开方运算: DC.sqrt(1.44e2)', () => {
  expect(calc('DC.sqrt(1.44e2)')).toBe(12);
});

// 322. 科学计数法立方根运算: DC.cbrt(1e3)
test('322. 科学计数法立方根运算: DC.cbrt(1e3)', () => {
  expect(calc('DC.cbrt(1e3)')).toBe(10);
});

// 323. 科学计数法对数运算: DC.log10(1e10)
test('323. 科学计数法对数运算: DC.log10(1e10)', () => {
  expect(calc('DC.log10(1e10)')).toBe(10);
});

// 324. 科学计数法自然对数运算: DC.ln(1e1)
test('324. 科学计数法自然对数运算: DC.ln(1e1)', () => {
  expect(calc('DC.ln(1e1)', {}, { digit: 5 })).toBe('2.30259');
});

// 325. 科学计数法指数运算: DC.exp(1e0)
test('325. 科学计数法指数运算: DC.exp(1e0)', () => {
  expect(calc('DC.exp(1e0)', {}, { digit: 2 })).toBe('2.72');
});

// 326. 科学计数法三角函数运算: DC.sin(1e0)
test('326. 科学计数法三角函数运算: DC.sin(1e0)', () => {
  expect(calc('DC.sin(1e0)', {}, { digit: 5 })).toBe('0.84147');
});

// 327. 科学计数法反三角函数运算: DC.asin(1e0)
test('327. 科学计数法反三角函数运算: DC.asin(1e0)', () => {
  expect(calc('DC.asin(1e0)', {}, { digit: 5 })).toBe('1.57080');
});

// 328. 科学计数法双曲函数运算: DC.sinh(1e0)
test('328. 科学计数法双曲函数运算: DC.sinh(1e0)', () => {
  expect(calc('DC.sinh(1e0)', {}, { digit: 5 })).toBe('1.17520');
});

// 329. 科学计数法绝对值运算: DC.abs(-1.5e2)
test('329. 科学计数法绝对值运算: DC.abs(-1.5e2)', () => {
  expect(calc('DC.abs(-1.5e2)')).toBe(150);
});

// 330. 科学计数法取整运算: DC.ceil(1.56e2)
test('330. 科学计数法取整运算: DC.ceil(1.56e2)', () => {
  expect(calc('DC.ceil(1.56e2)')).toBe(156);
});

// 331. 科学计数法取整运算: DC.floor(1.56e2)
test('331. 科学计数法取整运算: DC.floor(1.56e2)', () => {
  expect(calc('DC.floor(1.56e2)')).toBe(156);
});

// 332. 科学计数法四舍五入运算: DC.round(1.567e2)
test('332. 科学计数法四舍五入运算: DC.round(1.567e2)', () => {
  expect(calc('DC.round(1.567e2)')).toBe(157);
});

// 333. 科学计数法截断运算: DC.trunc(-1.987e1)
test('333. 科学计数法截断运算: DC.trunc(-1.987e1)', () => {
  expect(calc('DC.trunc(-1.987e1)')).toBe(-19);
});

// 334. 科学计数法符号函数: DC.sign(-1e-10)
test('334. 科学计数法符号函数: DC.sign(-1e-10)', () => {
  expect(calc('DC.sign(-1e-10)')).toBe(-1);
});

// 335. 科学计数法最大值函数: DC.max(1e10, 2e5, 3e15)
test('335. 科学计数法最大值函数: DC.max(1e10, 2e5, 3e15)', () => {
  expect(calc('DC.max(1e10,2e5,3e15)')).toBe(3e15);
});

// 336. 科学计数法最小值函数: DC.min(1e10, 2e5, 3e15)
test('336. 科学计数法最小值函数: DC.min(1e10, 2e5, 3e15)', () => {
  expect(calc('DC.min(1e10,2e5,3e15)')).toBe(2e5);
});

// 337. 科学计数法求和函数: DC.sum(1e1, 2e2, 3e3)
test('337. 科学计数法求和函数: DC.sum(1e1, 2e2, 3e3)', () => {
  expect(calc('DC.sum(1e1,2e2,3e3)')).toBe(3210);
});

// 338. 科学计数法乘法函数: DC.mul(1.5e2, 2e1)
test('338. 科学计数法乘法函数: DC.mul(1.5e2, 2e1)', () => {
  expect(calc('DC.mul(1.5e2,2e1)')).toBe(3000);
});

// 339. 科学计数法除法函数: DC.div(1.5e2, 2e1)
test('339. 科学计数法除法函数: DC.div(1.5e2, 2e1)', () => {
  expect(calc('DC.div(1.5e2,2e1)')).toBe(7.5);
});

// 340. 科学计数法取模函数: DC.mod(1.5e2, 2e1)
test('340. 科学计数法取模函数: DC.mod(1.5e2, 2e1)', () => {
  expect(calc('DC.mod(1.5e2,2e1)')).toBe(10);
});

// 341. 科学计数法截断函数: DC.trunc(1.5e2)
test('341. 科学计数法截断函数: DC.trunc(1.5e2)', () => {
  expect(calc('DC.trunc(1.5e2)')).toBe(150);
});

// 342. 科学计数法与DC函数: DC.acos(1e0)
test('342. 科学计数法与DC函数: DC.acos(1e0)', () => {
  expect(calc('DC.acos(1e0)', {}, { digit: 5 })).toBe('0.00000');
});

// 343. 科学计数法与DC函数: DC.acosh(1e0)
test('343. 科学计数法与DC函数: DC.acosh(1e0)', () => {
  expect(calc('DC.acosh(1e0)', {}, { digit: 5 })).toBe('0.00000');
});

// 344. 科学计数法与DC函数: DC.asinh(1e0)
test('344. 科学计数法与DC函数: DC.asinh(1e0)', () => {
  expect(calc('DC.asinh(1e0)', {}, { digit: 5 })).toBe('0.88137');
});

// 345. 科学计数法与DC函数: DC.atanh(1e-1)
test('345. 科学计数法与DC函数: DC.atanh(1e-1)', () => {
  expect(calc('DC.atanh(1e-1)', {}, { digit: 5 })).toBe('0.10034');
});

// 346. 科学计数法与DC函数: DC.cosh(1e0)
test('346. 科学计数法与DC函数: DC.cosh(1e0)', () => {
  expect(calc('DC.cosh(1e0)', {}, { digit: 5 })).toBe('1.54308');
});

// 347. 科学计数法与DC函数: DC.tanh(1e0)
test('347. 科学计数法与DC函数: DC.tanh(1e0)', () => {
  expect(calc('DC.tanh(1e0)', {}, { digit: 5 })).toBe('0.76159');
});

// 348. 科学计数法与DC函数: DC.acos(1e0)
test('348. 科学计数法与DC函数: DC.acos(1e0)', () => {
  expect(calc('DC.acos(1e0)', {}, { digit: 5 })).toBe('0.00000');
});

// 349. 科学计数法与DC函数: DC.acosh(1e0)
test('349. 科学计数法与DC函数: DC.acosh(1e0)', () => {
  expect(calc('DC.acosh(1e0)', {}, { digit: 5 })).toBe('0.00000');
});

// 350. 科学计数法与DC函数: DC.asinh(1e0)
test('350. 科学计数法与DC函数: DC.asinh(1e0)', () => {
  expect(calc('DC.asinh(1e0)', {}, { digit: 5 })).toBe('0.88137');
});

// 351. 科学计数法与DC函数: DC.acosh(1e0)
test('351. 科学计数法与DC函数: DC.acosh(1e0)', () => {
  expect(calc('DC.acosh(1e0)', {}, { digit: 5 })).toBe('0.00000');
});

// 352. 科学计数法与DC函数: DC.asinh(1e0)
test('352. 科学计数法与DC函数: DC.asinh(1e0)', () => {
  expect(calc('DC.asinh(1e0)', {}, { digit: 5 })).toBe('0.88137');
});

// 353. 科学计数法与DC函数: DC.atanh(1e-1)
test('353. 科学计数法与DC函数: DC.atanh(1e-1)', () => {
  expect(calc('DC.atanh(1e-1)', {}, { digit: 5 })).toBe('0.10034');
});

// 354. 科学计数法与DC函数: DC.cosh(1e0)
test('354. 科学计数法与DC函数: DC.cosh(1e0)', () => {
  expect(calc('DC.cosh(1e0)', {}, { digit: 5 })).toBe('1.54308');
});

// 355. 科学计数法与DC函数: DC.tanh(1e0)
test('355. 科学计数法与DC函数: DC.tanh(1e0)', () => {
  expect(calc('DC.tanh(1e0)', {}, { digit: 5 })).toBe('0.76159');
});

// 356. 科学计数法大数减法: 1e100 - 1e99
test('356. 科学计数法大数减法: 1e100 - 1e99', () => {
  expect(calc('1e100-1e99')).toBe(9e99);
});

// 357. 科学计数法极小数减法: 1e-100 - 1e-101
test('357. 科学计数法极小数减法: 1e-100 - 1e-101', () => {
  expect(calc('1e-100-1e-101')).toBe(9e-101);
});

// 358. 科学计数法与科学计数法相加: 1.23e2 + 4.56e1
test('358. 科学计数法与科学计数法相加: 1.23e2 + 4.56e1', () => {
  expect(calc('1.23e2+4.56e1')).toBe(168.6);
});

// 359. 科学计数法与科学计数法相减: 9.87e3 - 6.54e2
test('359. 科学计数法与科学计数法相减: 9.87e3 - 6.54e2', () => {
  expect(calc('9.87e3-6.54e2')).toBe(9216);
});

// 360. 科学计数法与科学计数法相乘: 1.5e2 * 2.5e1
test('360. 科学计数法与科学计数法相乘: 1.5e2 * 2.5e1', () => {
  expect(calc('1.5e2*2.5e1')).toBe(3750);
});

// 361. 科学计数法与科学计数法相除: 7.5e3 / 2.5e1
test('361. 科学计数法与科学计数法相除: 7.5e3 / 2.5e1', () => {
  expect(calc('7.5e3/2.5e1')).toBe(300);
});

// 362. 科学计数法混合运算: 1e2 + 2e1 * 3e0
test('362. 科学计数法混合运算: 1e2 + 2e1 * 3e0', () => {
  expect(calc('1e2+2e1*3e0')).toBe(160);
});

// 363. 科学计数法带括号运算: (1e2 + 2e1) * 3e0
test('363. 科学计数法带括号运算: (1e2 + 2e1) * 3e0', () => {
  expect(calc('(1e2+2e1)*3e0')).toBe(360);
});

// 364. 科学计数法负数运算: -1e2 + 2e2
test('364. 科学计数法负数运算: -1e2 + 2e2', () => {
  expect(calc('-1e2+2e2')).toBe(100);
});

// 365. 科学计数法负指数运算: 1e-2 + 2e-3
test('365. 科学计数法负指数运算: 1e-2 + 2e-3', () => {
  expect(calc('1e-2+2e-3')).toBe(0.012);
});

// 366. 科学计数法与DC函数嵌套: DC.abs(DC.max(-1e2, 2e1))
test('366. 科学计数法与DC函数嵌套: DC.abs(DC.max(-1e2, 2e1))', () => {
  expect(calc('DC.abs(DC.max(-1e2,2e1))')).toBe(20);
});

// 367. 科学计数法与DC函数嵌套: DC.round(DC.sqrt(2e2))
test('367. 科学计数法与DC函数嵌套: DC.round(DC.sqrt(2e2))', () => {
  expect(calc('DC.round(DC.sqrt(2e2))')).toBe(14);
});

// 368. 科学计数法与DC函数嵌套: DC.ceil(DC.log10(1e5))
test('368. 科学计数法与DC函数嵌套: DC.ceil(DC.log10(1e5))', () => {
  expect(calc('DC.ceil(DC.log10(1e5))')).toBe(5);
});

// 369. 科学计数法与DC函数嵌套: DC.floor(DC.exp(1e0))
test('369. 科学计数法与DC函数嵌套: DC.floor(DC.exp(1e0))', () => {
  expect(calc('DC.floor(DC.exp(1e0))', {}, { digit: 2 })).toBe('2.00');
});

// 370. 科学计数法与DC函数嵌套: DC.trunc(DC.sin(1e1))
test('370. 科学计数法与DC函数嵌套: DC.trunc(DC.sin(1e1))', () => {
  expect(calc('DC.trunc(DC.sin(1e1))', {}, { digit: 5 })).toBe('0.00000');
});

// 371. 科学计数法与自定义函数: custom(1e2)
test('371. 科学计数法与自定义函数: custom(1e2)', () => {
  expect(calc('custom(x)', { x: 1e2, custom: (x: number) => x * 2 })).toBe(200);
});

// 372. 科学计数法与自定义函数: custom(1e2, 2e1)
test('372. 科学计数法与自定义函数: custom(1e2, 2e1)', () => {
  expect(calc('custom(a,b)', { a: 1e2, b: 2e1, custom: (a: number, b: number) => a + b })).toBe(
    120
  );
});

// 373. 科学计数法与自定义函数: custom(1e2, 2e1, 3e0)
test('373. 科学计数法与自定义函数: custom(1e2, 2e1, 3e0)', () => {
  expect(
    calc('custom(a,b,c)', {
      a: 1e2,
      b: 2e1,
      c: 3,
      custom: (a: number, b: number, c: number) => a + b + c,
    })
  ).toBe(123);
});

// 374. 科学计数法与DC函数和自定义函数混合: custom(DC.max(1e2, 2e1))
test('374. 科学计数法与DC函数和自定义函数混合: custom(DC.max(1e2, 2e1))', () => {
  expect(calc('custom(DC.max(a,b))', { a: 1e2, b: 2e1, custom: (x: number) => x * 2 })).toBe(200);
});

// 375. 科学计数法复杂表达式: 1e2 + 2e1 * 3e0 - 4e0 / 5e-1
test('375. 科学计数法复杂表达式: 1e2 + 2e1 * 3e0 - 4e0 / 5e-1', () => {
  expect(calc('1e2+2e1*3e0-4e0/5e-1')).toBe(152);
});

// 376. 科学计数法超复杂表达式: ((1e2 + 2e1) * 3e0 - 4e1) / 5e0 + 6e0
test('376. 科学计数法超复杂表达式: ((1e2 + 2e1) * 3e0 - 4e1) / 5e0 + 6e0', () => {
  expect(calc('((1e2+2e1)*3e0-4e1)/5e0+6e0')).toBe(70);
});

// 377. 科学计数法与变量混合: a + b * c
test('377. 科学计数法与变量混合: a + b * c', () => {
  expect(calc('a+b*c', { a: 1e2, b: 2e1, c: 3 })).toBe(160);
});

// 378. 科学计数法与对象属性: obj.a + obj.b
test('378. 科学计数法与对象属性: obj.a + obj.b', () => {
  expect(calc('obj.a+obj.b', { obj: { a: 1e2, b: 2e1 } })).toBe(120);
});

// 379. 科学计数法与数组元素: arr[0] + arr[1]
test('379. 科学计数法与数组元素: arr[0] + arr[1]', () => {
  expect(calc('arr[0]+arr[1]', { arr: [1e2, 2e1] })).toBe(120);
});

// 380. 科学计数法与数组元素和DC函数: DC.max(arr[0], arr[1])
test('380. 科学计数法与数组元素和DC函数: DC.max(arr[0], arr[1])', () => {
  expect(calc('DC.max(arr[0],arr[1])', { arr: [1e2, 2e1] })).toBe(100);
});

// 381. 科学计数法与数组元素和自定义函数: custom(arr[0], arr[1])
test('381. 科学计数法与数组元素和自定义函数: custom(arr[0], arr[1])', () => {
  expect(
    calc('custom(arr[0],arr[1])', { arr: [1e2, 2e1], custom: (a: number, b: number) => a + b })
  ).toBe(120);
});

// 382. 科学计数法与DC函数和数组元素: DC.abs(arr[0])
test('382. 科学计数法与DC函数和数组元素: DC.abs(arr[0])', () => {
  expect(calc('DC.abs(arr[0])', { arr: [-1e2] })).toBe(100);
});

// 383. 科学计数法与DC函数和对象属性: DC.sqrt(obj.value)
test('383. 科学计数法与DC函数和对象属性: DC.sqrt(obj.value)', () => {
  expect(calc('DC.sqrt(obj.value)', { obj: { value: 1e4 } })).toBe(100);
});

// 384. 科学计数法与DC函数和变量: DC.log10(a)
test('384. 科学计数法与DC函数和变量: DC.log10(a)', () => {
  expect(calc('DC.log10(a)', { a: 1e5 })).toBe(5);
});

// 385. 科学计数法与DC函数和表达式: DC.ceil(1e1 + 2e0)
test('385. 科学计数法与DC函数和表达式: DC.ceil(1e1 + 2e0)', () => {
  expect(calc('DC.ceil(1e1+2e0)')).toBe(12);
});

// 386. 科学计数法与DC函数和表达式: DC.floor(1e2 - 3e1)
test('386. 科学计数法与DC函数和表达式: DC.floor(1e2 - 3e1)', () => {
  expect(calc('DC.floor(1e2-3e1)')).toBe(70);
});

// 387. 科学计数法与DC函数和表达式: DC.round(1e1 * 1.23e1)
test('387. 科学计数法与DC函数和表达式: DC.round(1e1 * 1.23e1)', () => {
  expect(calc('DC.round(1e1*1.23e1)')).toBe(123);
});

// 388. 科学计数法与DC函数和表达式: DC.trunc(1e3 / 7e0)
test('388. 科学计数法与DC函数和表达式: DC.trunc(1e3 / 7e0)', () => {
  expect(calc('DC.trunc(1e3/7e0)', {}, { digit: 2 })).toBe('142.00');
});

// 389. 科学计数法与DC函数和表达式: DC.abs(-(1e2 + 2e1))
test('389. 科学计数法与DC函数和表达式: DC.abs(-(1e2 + 2e1))', () => {
  expect(calc('DC.abs(-(1e2+2e1))')).toBe(120);
});

// 390. 科学计数法与DC函数和表达式: DC.max(1e2, 2e1, 3e0 + 4e0)
test('390. 科学计数法与DC函数和表达式: DC.max(1e2, 2e1, 3e0 + 4e0)', () => {
  expect(calc('DC.max(1e2,2e1,3e0+4e0)')).toBe(100);
});

// 391. 科学计数法与DC函数和表达式: DC.min(1e2, 2e1, 3e0 * 4e0)
test('391. 科学计数法与DC函数和表达式: DC.min(1e2, 2e1, 3e0 * 4e0)', () => {
  expect(calc('DC.min(1e2,2e1,3e0*4e0)')).toBe(12);
});

// 392. 科学计数法与DC函数和表达式: DC.sum(1e1, 2e1, 3e1, 4e1)
test('392. 科学计数法与DC函数和表达式: DC.sum(1e1, 2e1, 3e1, 4e1)', () => {
  expect(calc('DC.sum(1e1,2e1,3e1,4e1)')).toBe(100);
});

// 393. 科学计数法与DC函数和表达式: DC.mul(1e1, 2e1, 3e0)
test('393. 科学计数法与DC函数和表达式: DC.mul(1e1, 2e1, 3e0)', () => {
  expect(calc('DC.mul(1e1,2e1,3e0)')).toBe(200);
});

// 394. 科学计数法与DC函数和表达式: DC.div(1e3, 2e1, 5e0)
test('394. 科学计数法与DC函数和表达式: DC.div(1e3, 2e1, 5e0)', () => {
  expect(calc('DC.div(1e3,2e1,5e0)')).toBe(50);
});

// 395. 科学计数法与DC函数和表达式: DC.mod(1e2, 3e1, 7e0)
test('395. 科学计数法与DC函数和表达式: DC.mod(1e2, 3e1, 7e0)', () => {
  expect(calc('DC.mod(1e2,3e1,7e0)')).toBe(10);
});

// 396. 科学计数法与DC函数和表达式: DC.clamp(1e3, 1e2, 5e2)
test('396. 科学计数法与DC函数和表达式: DC.clamp(1e3, 1e2, 5e2)', () => {
  expect(calc('DC.clamp(1e3,1e2,5e2)')).toBe(500);
});

// 397. 科学计数法与DC函数和表达式: DC.pow(1e1, 2e0, 3e-1)
test('397. 科学计数法与DC函数和表达式: DC.pow(1e1, 2e0, 3e-1)', () => {
  expect(calc('DC.pow(1e1,2e0,3e-1)')).toBe(100);
});

// 398. 科学计数法与DC函数和表达式: DC.sqrt(1e4, 2e2)
test('398. 科学计数法与DC函数和表达式: DC.sqrt(1e4, 2e2)', () => {
  expect(calc('DC.sqrt(1e4,2e2)')).toBe(100);
});

// 399. 科学计数法与DC函数和表达式: DC.cbrt(1e6, 2e3)
test('399. 科学计数法与DC函数和表达式: DC.cbrt(1e6, 2e3)', () => {
  expect(calc('DC.cbrt(1e6,2e3)', {}, { digit: 5 })).toBe('100.00000');
});

// 400. 科学计数法与DC函数和表达式: DC.log(1e3, 1e2)
test('400. 科学计数法与DC函数和表达式: DC.log(1e3, 1e2)', () => {
  expect(calc('DC.log(1e3,1e2)', {}, { digit: 5 })).toBe('1.50000');
});

// 401. 科学计数法与DC函数和表达式: DC.ln(1e2, 1e1)
test('401. 科学计数法与DC函数和表达式: DC.ln(1e2, 1e1)', () => {
  expect(calc('DC.ln(1e2,1e1)', {}, { digit: 5 })).toBe('4.60517');
});

// 402. 科学计数法与DC函数和表达式: DC.log10(1e5, 1e2)
test('402. 科学计数法与DC函数和表达式: DC.log10(1e5, 1e2)', () => {
  expect(calc('DC.log10(1e5,1e2)')).toBe(5);
});

// 403. 科学计数法与DC函数和表达式: DC.exp(1e0, 2e-1)
test('403. 科学计数法与DC函数和表达式: DC.exp(1e0, 2e-1)', () => {
  expect(calc('DC.exp(1e0,2e-1)', {}, { digit: 2 })).toBe('2.72');
});

// 404. 科学计数法与DC函数和表达式: DC.sin(1e0, 2e-1)
test('404. 科学计数法与DC函数和表达式: DC.sin(1e0, 2e-1)', () => {
  expect(calc('DC.sin(1e0,2e-1)', {}, { digit: 5 })).toBe('0.84147');
});

// 405. 科学计数法与DC函数和表达式: DC.cos(1e0, 2e-1)
test('405. 科学计数法与DC函数和表达式: DC.cos(1e0, 2e-1)', () => {
  expect(calc('DC.cos(1e0,2e-1)', {}, { digit: 5 })).toBe('0.54030');
});

// 406. 科学计数法与DC函数和表达式: DC.tan(1e0, 2e-1)
test('406. 科学计数法与DC函数和表达式: DC.tan(1e0, 2e-1)', () => {
  expect(calc('DC.tan(1e0,2e-1)', {}, { digit: 5 })).toBe('1.55741');
});

// 407. 科学计数法与DC函数和表达式: DC.asin(1e-1, 2e-2)
test('407. 科学计数法与DC函数和表达式: DC.asin(1e-1, 2e-2)', () => {
  expect(calc('DC.asin(1e-1,2e-2)', {}, { digit: 5 })).toBe('0.10017');
});

// 408. 科学计数法与DC函数和表达式: DC.acos(1e-1, 2e-2)
test('408. 科学计数法与DC函数和表达式: DC.acos(1e-1, 2e-2)', () => {
  expect(calc('DC.acos(1e-1,2e-2)', {}, { digit: 5 })).toBe('1.47063');
});

// 409. 科学计数法与DC函数和表达式: DC.atan(1e0, 2e-1)
test('409. 科学计数法与DC函数和表达式: DC.atan(1e0, 2e-1)', () => {
  expect(calc('DC.atan(1e0,2e-1)', {}, { digit: 5 })).toBe('0.78540');
});

// 410. 科学计数法与DC函数和表达式: DC.asinh(1e0, 2e-1)
test('410. 科学计数法与DC函数和表达式: DC.asinh(1e0, 2e-1)', () => {
  expect(calc('DC.asinh(1e0,2e-1)', {}, { digit: 5 })).toBe('0.88137');
});

// 411. 科学计数法与DC函数和表达式: DC.acosh(1e0, 1e-1)
test('411. 科学计数法与DC函数和表达式: DC.acosh(1e0, 1e-1)', () => {
  expect(calc('DC.acosh(1e0,1e-1)', {}, { digit: 5 })).toBe('0.00000');
});

// 412. 科学计数法与DC函数和表达式: DC.atanh(1e-1, 2e-2)
test('412. 科学计数法与DC函数和表达式: DC.atanh(1e-1, 2e-2)', () => {
  expect(calc('DC.atanh(1e-1,2e-2)', {}, { digit: 5 })).toBe('0.10034');
});

// 413. 科学计数法与DC函数和表达式: DC.cosh(1e0, 2e-1)
test('413. 科学计数法与DC函数和表达式: DC.cosh(1e0, 2e-1)', () => {
  expect(calc('DC.cosh(1e0,2e-1)', {}, { digit: 5 })).toBe('1.54308');
});

// 414. 科学计数法与DC函数和表达式: DC.tanh(1e0, 2e-1)
test('414. 科学计数法与DC函数和表达式: DC.tanh(1e0, 2e-1)', () => {
  expect(calc('DC.tanh(1e0,2e-1)', {}, { digit: 5 })).toBe('0.76159');
});

// 415. 科学计数法与DC函数和表达式: DC.abs(-1e2, 2e1)
test('415. 科学计数法与DC函数和表达式: DC.abs(-1e2, 2e1)', () => {
  expect(calc('DC.abs(-1e2,2e1)')).toBe(100);
});

// 416. 科学计数法与DC函数和表达式: DC.sign(-1e2, 2e1)
test('416. 科学计数法与DC函数和表达式: DC.sign(-1e2, 2e1)', () => {
  expect(calc('DC.sign(-1e2,2e1)')).toBe(-1);
});

// 417. 科学计数法与DC函数和表达式: DC.ceil(1.56e2, 2e1)
test('417. 科学计数法与DC函数和表达式: DC.ceil(1.56e2, 2e1)', () => {
  expect(calc('DC.ceil(1.56e2,2e1)')).toBe(156);
});

// 418. 科学计数法与DC函数和表达式: DC.floor(1.56e2, 2e1)
test('418. 科学计数法与DC函数和表达式: DC.floor(1.56e2, 2e1)', () => {
  expect(calc('DC.floor(1.56e2,2e1)')).toBe(156);
});

// 419. 科学计数法与DC函数和表达式: DC.round(1.567e2, 2e1)
test('419. 科学计数法与DC函数和表达式: DC.round(1.567e2, 2e1)', () => {
  expect(calc('DC.round(1.567e2,2e1)')).toBe(157);
});

// 420. 科学计数法与DC函数和表达式: DC.trunc(-1.987e1, 2e0)
test('420. 科学计数法与DC函数和表达式: DC.trunc(-1.987e1, 2e0)', () => {
  expect(calc('DC.trunc(-1.987e1,2e0)')).toBe(-19);
});

// 421. 科学计数法与DC函数和表达式: DC.atan2(1e1, 2e1, 3e0)
test('421. 科学计数法与DC函数和表达式: DC.atan2(1e1, 2e1, 3e0)', () => {
  expect(calc('DC.atan2(1e1,2e1,3e0)', {}, { digit: 5 })).toBe('0.46365');
});

// 422. 科学计数法与DC函数和表达式: DC.hypot(3e1, 4e1, 5e1, 6e1)
test('422. 科学计数法与DC函数和表达式: DC.hypot(3e1, 4e1, 5e1, 6e1)', () => {
  expect(calc('DC.hypot(3e1,4e1,5e1,6e1)', {}, { digit: 5 })).toBe('92.73618');
});

// 423. 科学计数法与DC函数和表达式: DC.random() 多次调用检查
test('423. 科学计数法与DC函数和表达式: DC.random() 多次调用检查', () => {
  const result1 = calc('DC.random()');
  const result2 = calc('DC.random()');
  expect(typeof result1).toBe('number');
  expect(typeof result2).toBe('number');
  // 两次随机数极大概率不相等
  expect(result1 === result2).toBe(false);
});

// 424. 科学计数法与DC函数和表达式: DC.min(1e10, 2e5, 3e15, 4e2)
test('424. 科学计数法与DC函数和表达式: DC.min(1e10, 2e5, 3e15, 4e2)', () => {
  expect(calc('DC.min(1e10,2e5,3e15,4e2)')).toBe(400);
});

// 425. 科学计数法与DC函数和表达式: DC.max(1e10, 2e5, 3e15, 4e2)
test('425. 科学计数法与DC函数和表达式: DC.max(1e10, 2e5, 3e15, 4e2)', () => {
  expect(calc('DC.max(1e10,2e5,3e15,4e2)')).toBe(3e15);
});

// 426. 科学计数法与DC函数和表达式: DC.sum(1e1, 2e2, 3e3, 4e4, 5e5)
test('426. 科学计数法与DC函数和表达式: DC.sum(1e1, 2e2, 3e3, 4e4, 5e5)', () => {
  expect(calc('DC.sum(1e1,2e2,3e3,4e4,5e5)')).toBe(543210);
});

// 427. 科学计数法与DC函数和表达式: DC.mul(1e1, 2e0, 3e-1, 4e-2)
test('427. 科学计数法与DC函数和表达式: DC.mul(1e1, 2e0, 3e-1, 4e-2)', () => {
  expect(calc('DC.mul(1e1,2e0,3e-1,4e-2)')).toBe(20);
});

// 428. 科学计数法与DC函数和表达式: DC.div(1e6, 2e2, 5e1, 1e1)
test('428. 科学计数法与DC函数和表达式: DC.div(1e6, 2e2, 5e1, 1e1)', () => {
  expect(calc('DC.div(1e6,2e2,5e1,1e1)')).toBe(5000);
});

// 429. 科学计数法与DC函数和表达式: DC.mod(1e2, 3e1, 7e0, 2e0)
test('429. 科学计数法与DC函数和表达式: DC.mod(1e2, 3e1, 7e0, 2e0)', () => {
  expect(calc('DC.mod(1e2,3e1,7e0,2e0)')).toBe(10);
});

// 430. 科学计数法与DC函数和表达式: DC.clamp(1e3, 1e2, 5e2, 3e2)
test('430. 科学计数法与DC函数和表达式: DC.clamp(1e3, 1e2, 5e2, 3e2)', () => {
  expect(calc('DC.clamp(1e3,1e2,5e2,3e2)')).toBe(500);
});

// 431. 科学计数法与DC函数和表达式: DC.pow(2e0, 3e0, 1e0)
test('431. 科学计数法与DC函数和表达式: DC.pow(2e0, 3e0, 1e0)', () => {
  expect(calc('DC.pow(2e0,3e0,1e0)')).toBe(8);
});

// 432. 科学计数法与DC函数和表达式: DC.sqrt(1.44e2, 2.25e2)
test('432. 科学计数法与DC函数和表达式: DC.sqrt(1.44e2, 2.25e2)', () => {
  expect(calc('DC.sqrt(1.44e2,2.25e2)')).toBe(12);
});

// 433. 科学计数法与DC函数和表达式: DC.cbrt(1e3, 8e3, 2.7e3)
test('433. 科学计数法与DC函数和表达式: DC.cbrt(1e3, 8e3, 2.7e3)', () => {
  expect(calc('DC.cbrt(1e3,8e3,2.7e3)', {}, { digit: 5 })).toBe('10.00000');
});

// 434. 科学计数法与DC函数和表达式: DC.log(1e3, 1e2, 1e1)
test('434. 科学计数法与DC函数和表达式: DC.log(1e3, 1e2, 1e1)', () => {
  expect(calc('DC.log(1e3,1e2,1e1)', {}, { digit: 5 })).toBe('1.50000');
});

// 435. 科学计数法与DC函数和表达式: DC.ln(1e2, 1e1, 1e0)
test('435. 科学计数法与DC函数和表达式: DC.ln(1e2, 1e1, 1e0)', () => {
  expect(calc('DC.ln(1e2,1e1,1e0)', {}, { digit: 5 })).toBe('4.60517');
});

// 436. 科学计数法与DC函数和表达式: DC.log10(1e5, 1e2, 1e1)
test('436. 科学计数法与DC函数和表达式: DC.log10(1e5, 1e2, 1e1)', () => {
  expect(calc('DC.log10(1e5,1e2,1e1)')).toBe(5);
});

// 437. 科学计数法与DC函数和表达式: DC.exp(1e0, 5e-1, 2e-1)
test('437. 科学计数法与DC函数和表达式: DC.exp(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.exp(1e0,5e-1,2e-1)', {}, { digit: 2 })).toBe('2.72');
});

// 438. 科学计数法与DC函数和表达式: DC.sin(1e0, 5e-1, 2e-1)
test('438. 科学计数法与DC函数和表达式: DC.sin(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.sin(1e0,5e-1,2e-1)', {}, { digit: 5 })).toBe('0.84147');
});

// 439. 科学计数法与DC函数和表达式: DC.cos(1e0, 5e-1, 2e-1)
test('439. 科学计数法与DC函数和表达式: DC.cos(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.cos(1e0,5e-1,2e-1)', {}, { digit: 5 })).toBe('0.54030');
});

// 440. 科学计数法与DC函数和表达式: DC.tan(1e0, 5e-1, 2e-1)
test('440. 科学计数法与DC函数和表达式: DC.tan(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.tan(1e0,5e-1,2e-1)', {}, { digit: 5 })).toBe('1.55741');
});

// 441. 科学计数法与DC函数和表达式: DC.asin(1e-1, 5e-2, 2e-2)
test('441. 科学计数法与DC函数和表达式: DC.asin(1e-1, 5e-2, 2e-2)', () => {
  expect(calc('DC.asin(1e-1,5e-2,2e-2)', {}, { digit: 5 })).toBe('0.10017');
});

// 442. 科学计수法与DC函数和表达式: DC.acos(1e-1, 5e-2, 2e-2)
test('442. 科学计数法与DC函数和表达式: DC.acos(1e-1, 5e-2, 2e-2)', () => {
  expect(calc('DC.acos(1e-1,5e-2,2e-2)', {}, { digit: 5 })).toBe('1.47063');
});

// 443. 科学计数法与DC函数和表达式: DC.atan(1e0, 5e-1, 2e-1)
test('443. 科学计数法与DC函数和表达式: DC.atan(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.atan(1e0,5e-1,2e-1)', {}, { digit: 5 })).toBe('0.78540');
});

// 444. 科学计数法与DC函数和表达式: DC.asinh(1e0, 5e-1, 2e-1)
test('444. 科学计数法与DC函数和表达式: DC.asinh(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.asinh(1e0,5e-1,2e-1)', {}, { digit: 5 })).toBe('0.88137');
});

// 445. 科学计数法与DC函数和表达式: DC.acosh(1e0, 1e-1, 5e-2)
test('445. 科学计数法与DC函数和表达式: DC.acosh(1e0, 1e-1, 5e-2)', () => {
  expect(calc('DC.acosh(1e0,1e-1,5e-2)', {}, { digit: 5 })).toBe('0.00000');
});

// 446. 科学计수法与DC函数和表达式: DC.atanh(1e-1, 5e-2, 2e-2)
test('446. 科学计数法与DC函数和表达式: DC.atanh(1e-1, 5e-2, 2e-2)', () => {
  expect(calc('DC.atanh(1e-1,5e-2,2e-2)', {}, { digit: 5 })).toBe('0.10034');
});

// 447. 科学计数法与DC函数和表达式: DC.cosh(1e0, 5e-1, 2e-1)
test('447. 科学计数法与DC函数和表达式: DC.cosh(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.cosh(1e0,5e-1,2e-1)', {}, { digit: 5 })).toBe('1.54308');
});

// 448. 科学计수法与DC函数和表达式: DC.tanh(1e0, 5e-1, 2e-1)
test('448. 科学计数法与DC函数和表达式: DC.tanh(1e0, 5e-1, 2e-1)', () => {
  expect(calc('DC.tanh(1e0,5e-1,2e-1)', {}, { digit: 5 })).toBe('0.76159');
});

// 449. 科学计数法与DC函数和表达式: DC.abs(-1e2, 5e1, -2e1)
test('449. 科学计数法与DC函数和表达式: DC.abs(-1e2, 5e1, -2e1)', () => {
  expect(calc('DC.abs(-1e2,5e1,-2e1)')).toBe(100);
});

// 450. 科学计数法与DC函数和表达式: DC.sign(-1e2, 5e1, -2e1)
test('450. 科学计数法与DC函数和表达式: DC.sign(-1e2, 5e1, -2e1)', () => {
  expect(calc('DC.sign(-1e2,5e1,-2e1)')).toBe(-1);
});

// 451. 科学计数法极值运算: 9.999999999999999e+307 + 1e+307
test('451. 科学计数法极值运算: 9.999999999999999e+307 + 1e+307', () => {
  expect(calc('9.999999999999999e+307 + 1e+307')).toBe(1.0999999999999998e308);
});

// 452. 科学计数法极小值运算: 1e-323 * 2e-323
test('452. 科学计数法极小值运算: 1e-323 * 2e-323', () => {
  expect(calc('1e-323 * 2e-323')).toBe(0);
});

// 453. 科学计数法高精度运算: 1.234567890123456e+100 / 9.876543210987654e+99
test('453. 科学计数法高精度运算: 1.234567890123456e+100 / 9.876543210987654e+99', () => {
  expect(calc('1.234567890123456e+100 / 9.876543210987654e+99', {}, { digit: 10 })).toBe(
    '1.2499999886'
  );
});

// 454. 科学计数法复利计算: 1e5 * DC.pow(1.05e0, 10e0)
test('454. 科学计数法复利计算: 1e5 * DC.pow(1.05e0, 10e0)', () => {
  expect(calc('1e5 * DC.pow(1.05e0, 10e0)', {}, { digit: 2 })).toBe('162889.46');
});

// 455. 科学计数法分子物理: 6.02214076e23 / 1.66053906660e-27
test('455. 科学计数法分子物理: 6.02214076e23 / 1.66053906660e-27', () => {
  expect(calc('6.02214076e23 / 1.66053906660e-27', {}, { digit: 3 })).toBe(
    '362661793457861900000000000000000000000000000000000.000'
  );
});

// 456. 科学计数法天文距离: 9.461e15 * 3.26e0
test('456. 科学计数法天文距离: 9.461e15 * 3.26e0', () => {
  expect(calc('9.461e15 * 3.26e0', {}, { digit: 2 })).toBe('30842860000000000.00');
});

// 457. 科学计数法量子计算: DC.sqrt(2.718281828459045e0) * 1e-10
test('457. 科学计数法量子计算: DC.sqrt(2.718281828459045e0) * 1e-10', () => {
  expect(calc('DC.sqrt(2.718281828459045e0) * 1e-10', {}, { digit: 8 })).toBe('0.00000000');
});

// 458. 科学计数法化学平衡: DC.log10(1e-14) + 14e0
test('458. 科学计数法化学平衡: DC.log10(1e-14) + 14e0', () => {
  expect(calc('DC.log10(1e-14) + 14e0')).toBe(-1414);
});

// 459. 科学计数法统计学: DC.sqrt(2.718281828459045e-1) * 1e2
test('459. 科学计数法统计学: DC.sqrt(2.718281828459045e-1) * 1e2', () => {
  expect(calc('DC.sqrt(2.718281828459045e-1) * 1e2', {}, { digit: 6 })).toBe('52.137144');
});

// 460. 科学计数法工程计算: (1.5e6 + 2.3e5) / 7.8e3
test('460. 科学计数法工程计算: (1.5e6 + 2.3e5) / 7.8e3', () => {
  expect(calc('(1.5e6 + 2.3e5) / 7.8e3', {}, { digit: 2 })).toBe('221.79');
});

// 461. 科学计数法金融衍生: DC.exp(DC.ln(1.25e0) * 5e0)
test('461. 科学计数法金融衍生: DC.exp(DC.ln(1.25e0) * 5e0)', () => {
  expect(calc('DC.exp(DC.ln(1.25e0) * 5e0)', {}, { digit: 3 })).toBe('3.052');
});

// 462. 科学计数法生物学: 2.99792458e8 / 1.5e-10
test('462. 科学计数法生物学: 2.99792458e8 / 1.5e-10', () => {
  expect(calc('2.99792458e8 / 1.5e-10', {}, { digit: 2 })).toBe('1998616386666666800.00');
});

// 463. 科学计数法材料科学: DC.pow(1.602176634e-19, 2e0) * 1e10
test('463. 科学计数法材料科学: DC.pow(1.602176634e-19, 2e0) * 1e10', () => {
  expect(calc('DC.pow(1.602176634e-19, 2e0) * 1e10', {}, { digit: 8 })).toBe('0.00000000');
});

// 464. 科学计数法气候模型: DC.sin(2.356194490192345e0) * 6.371e6
test('464. 科学计数法气候模型: DC.sin(2.356194490192345e0) * 6.371e6', () => {
  expect(calc('DC.sin(2.356194490192345e0) * 6.371e6', {}, { digit: 2 })).toBe('4504977.30');
});

// 465. 科学计数法宇宙常数: 2.99792458e8 / 6.62607015e-34
test('465. 科学计数法宇宙常数: 2.99792458e8 / 6.62607015e-34', () => {
  expect(calc('2.99792458e8 / 6.62607015e-34', {}, { digit: 3 })).toBe(
    '452443833544382300000000000000000000000000.000'
  );
});

// 466. 科学计数法纳米技术: DC.cbrt(1e-27) * 1e9
test('466. 科学计数法纳米技术: DC.cbrt(1e-27) * 1e9', () => {
  expect(calc('DC.cbrt(1e-27) * 1e9')).toBe(1);
});

// 467. 科学计数法遗传学: DC.pow(2e0, 4.640537912e1) / 1e12
test('467. 科学计数法遗传学: DC.pow(2e0, 4.640537912e1) / 1e12', () => {
  expect(calc('DC.pow(2e0, 4.640537912e1) / 1e12', {}, { digit: 6 })).toBe('93.198962');
});

// 468. 科学计数法地质学: 5.972e24 / (4.5e0 * 3.1415926535e0 * DC.pow(6.371e6, 2e0))
test('468. 科学计数法地质学: 5.972e24 / (4.5e0 * 3.1415926535e0 * DC.pow(6.371e6, 2e0))', () => {
  expect(calc('5.972e24 / (4.5e0 * 3.1415926535e0 * DC.pow(6.371e6, 2e0))', {}, { digit: 3 })).toBe(
    '10407398940.609'
  );
});

// 469. 科学计数法天体物理: DC.sqrt(6.67430e-11 * 1.989e30 / 1.496e11)
test('469. 科学计数法天体物理: DC.sqrt(6.67430e-11 * 1.989e30 / 1.496e11)', () => {
  expect(calc('DC.sqrt(6.67430e-11 * 1.989e30 / 1.496e11)', {}, { digit: 6 })).toBe('29788.899321');
});

// 470. 科学计数法化学反应: DC.exp(-1.5e4 / (8.314462618e0 * 2.98e2))
test('470. 科学计数法化学反应: DC.exp(-1.5e4 / (8.314462618e0 * 2.98e2))', () => {
  expect(calc('DC.exp(-1.5e4 / (8.314462618e0 * 2.98e2))', {}, { digit: 8 })).toBe('0.00234850');
});

// 471. 科学计数法电磁学: 8.8541878128e-12 * DC.pow(3e8, 2e0) / (4.0e0 * 3.1415926535e0)
test('471. 科学计数法电磁学: 8.8541878128e-12 * DC.pow(3e8, 2e0) / (4.0e0 * 3.1415926535e0)', () => {
  expect(
    calc('8.8541878128e-12 * DC.pow(3e8, 2e0) / (4.0e0 * 3.1415926535e0)', {}, { digit: 5 })
  ).toBe('63413.44909');
});

// 472. 科学计数法热力学: 1.380649e-23 * 3.0e2 / DC.ln(2e0)
test('472. 科学计数法热力学: 1.380649e-23 * 3.0e2 / DC.ln(2e0)', () => {
  expect(calc('1.380649e-23 * 3.0e2 / DC.ln(2e0)', {}, { digit: 8 })).toBe('0.00000000');
});

// 473. 科学计数法光学计算: 2.99792458e8 / 5.5e-7 * DC.sin(1.5707963267948966e0)
test('473. 科学计数法光学计算: 2.99792458e8 / 5.5e-7 * DC.sin(1.5707963267948966e0)', () => {
  expect(calc('2.99792458e8 / 5.5e-7 * DC.sin(1.5707963267948966e0)', {}, { digit: 3 })).toBe(
    '545077196363636.400'
  );
});

// 474. 科学计数法量子力学: DC.sqrt(2e0 * 1.0545718e-34 * 1e-9 / (9.1093837e-31 * DC.pow(1e-10, 2e0)))
test('474. 科学计数法量子力学: DC.sqrt(2e0 * 1.0545718e-34 * 1e-9 / (9.1093837e-31 * DC.pow(1e-10, 2e0)))', () => {
  expect(
    calc(
      'DC.sqrt(2e0 * 1.0545718e-34 * 1e-9 / (9.1093837e-31 * DC.pow(1e-10, 2e0)))',
      {},
      { digit: 6 }
    )
  ).toBe('4811.811181');
});

// 475. 科学计数法相对论: 1e0 / DC.sqrt(1e0 - DC.pow(2.99792458e8 / 2.99792458e8, 2e0))
test('475. 科学计数法相对论: 1e0 / DC.sqrt(1e0 - DC.pow(2.99792458e8 / 2.99792458e8, 2e0))', () => {
  expect(calc('1e0 / DC.sqrt(1e0 - DC.pow(2.99792458e8 / 2.99792458e8, 2e0))')).toBe(Infinity);
});

// 476. 科学计数法相对论修正: 1e0 / DC.sqrt(1e0 - DC.pow(2.99792458e8 / 3e8, 2e0))
test('476. 科学计数法相对论修正: 1e0 / DC.sqrt(1e0 - DC.pow(2.99792458e8 / 3e8, 2e0))', () => {
  expect(calc('1e0 / DC.sqrt(1e0 - DC.pow(2.99792458e8 / 3e8, 2e0))', {}, { digit: 8 })).toBe(
    '26.88857308'
  );
});

// 477. 科学计数法核物理: DC.pow(2.718281828459045e0, 1.602176634e-19 / (1.380649e-23 * 3e2))
test('477. 科学计数法核物理: DC.pow(2.718281828459045e0, 1.602176634e-19 / (1.380649e-23 * 3e2))', () => {
  expect(
    calc('DC.pow(2.718281828459045e0, 1.602176634e-19 / (1.380649e-23 * 3e2))', {}, { digit: 6 })
  ).toBe('62988405950449464.000000');
});

// 478. 科学计数法晶体学: DC.sin(1.5707963267948966e0 / 2e0) * 5.43e-10
test('478. 科学计数法晶体学: DC.sin(1.5707963267948966e0 / 2e0) * 5.43e-10', () => {
  expect(calc('DC.sin(1.5707963267948966e0 / 2e0) * 5.43e-10', {}, { digit: 12 })).toBe(
    '0.000000000384'
  );
});

// 479. 科学计数法大气科学: DC.exp(-6.5e3 / (2.87e1 * 2.88e2)) * 1.01325e5
test('479. 科学计数法大气科学: DC.exp(-6.5e3 / (2.87e1 * 2.88e2)) * 1.01325e5', () => {
  expect(calc('DC.exp(-6.5e3 / (2.87e1 * 2.88e2)) * 1.01325e5', {}, { digit: 4 })).toBe(
    '46152.0500'
  );
});

// 480. 科学计数法海洋学: 1.025e3 * 9.81e0 * 1e4 / (1e5 + 1.01325e5)
test('480. 科学计数法海洋学: 1.025e3 * 9.81e0 * 1e4 / (1e5 + 1.01325e5)', () => {
  expect(calc('1.025e3 * 9.81e0 * 1e4 / (1e5 + 1.01325e5)', {}, { digit: 5 })).toBe('499.45362');
});

// 481. 科学计数法天文学距离: 3.0856775814913673e16 * 4.22e0
test('481. 科学计数法天文学距离: 3.0856775814913673e16 * 4.22e0', () => {
  expect(calc('3.0856775814913673e16 * 4.22e0', {}, { digit: 3 })).toBe('130215593938935680.000');
});

// 482. 科学计数法粒子物理: DC.sqrt(2e0 * 1.25663706212e-6 * 1e3 / (4e0 * 3.1415926535e0 * 1e-7))
test('482. 科学计数法粒子物理: DC.sqrt(2e0 * 1.25663706212e-6 * 1e3 / (4e0 * 3.1415926535e0 * 1e-7))', () => {
  expect(
    calc('DC.sqrt(2e0 * 1.25663706212e-6 * 1e3 / (4e0 * 3.1415926535e0 * 1e-7))', {}, { digit: 6 })
  ).toBe('44.721360');
});

// 483. 科学计数法生物信息学: DC.log2(4.294967296e9) / 3.2e1
test('483. 科学计数法生物信息学: DC.log2(4.294967296e9) / 3.2e1', () => {
  expect(calc('DC.log2(4.294967296e9) / 3.2e1', {}, { digit: 4 })).toBe('1.0000');
});

// 484. 科学计数法密码学: DC.mod(DC.pow(2e0, 1.792e2), 1e3)
test('484. 科学计数法密码学: DC.mod(DC.pow(2e0, 1.792e2), 1e3)', () => {
  expect(calc('DC.mod(DC.pow(2e0, 1.792e2), 1e3)', {}, { digit: 3 })).toBe('0.000');
});

// 485. 科学计数法机器学习: DC.exp(-DC.pow(2.5e-1, 2e0) / (2e0 * 1e-2))
test('485. 科学计数法机器学习: DC.exp(-DC.pow(2.5e-1, 2e0) / (2e0 * 1e-2))', () => {
  expect(calc('DC.exp(-DC.pow(2.5e-1, 2e0) / (2e0 * 1e-2))', {}, { digit: 6 })).toBe('0.043937');
});

// 486. 科学计数法信号处理: DC.sin(2e0 * 3.1415926535e0 * 1e3 * 1e-3) * 5e-1
test('486. 科学计数法信号处理: DC.sin(2e0 * 3.1415926535e0 * 1e3 * 1e-3) * 5e-1', () => {
  expect(calc('DC.sin(2e0 * 3.1415926535e0 * 1e3 * 1e-3) * 5e-1', {}, { digit: 6 })).toBe(
    '0.000000'
  );
});

// 487. 科学计数法控制系统: 1e0 / (1e0 + DC.exp(-1e2 * (5e-1 - 3e-1)))
test('487. 科学计数法控制系统: 1e0 / (1e0 + DC.exp(-1e2 * (5e-1 - 3e-1)))', () => {
  expect(calc('1e0 / (1e0 + DC.exp(-1e2 * (5e-1 - 3e-1)))', {}, { digit: 6 })).toBe('1.000000');
});

// 488. 科学计数法有限元: DC.sqrt(2e0 * 2.1e11 * 7.85e3 / (3e0 * 1e-4))
test('488. 科学计数法有限元: DC.sqrt(2e0 * 2.1e11 * 7.85e3 / (3e0 * 1e-4))', () => {
  expect(calc('DC.sqrt(2e0 * 2.1e11 * 7.85e3 / (3e0 * 1e-4))', {}, { digit: 6 })).toBe(
    '3315116890.850155'
  );
});

// 489. 科学计数法流体力学: 1.225e0 * DC.pow(3.4e2, 2e0) / (2e0 * 1.46e-5)
test('489. 科学计数法流体力学: 1.225e0 * DC.pow(3.4e2, 2e0) / (2e0 * 1.46e-5)', () => {
  expect(calc('1.225e0 * DC.pow(3.4e2, 2e0) / (2e0 * 1.46e-5)', {}, { digit: 3 })).toBe(
    '4849657534.247'
  );
});

// 490. 科学计数法热传导: 2.01e2 * 8.92e3 * 3.85e2 / DC.ln(1e1 / 1e-2)
test('490. 科学计数法热传导: 2.01e2 * 8.92e3 * 3.85e2 / DC.ln(1e1 / 1e-2)', () => {
  expect(calc('2.01e2 * 8.92e3 * 3.85e2 / DC.ln(1e1 / 1e-2)', {}, { digit: 6 })).toBe(
    '99927425.353394'
  );
});

// 491. 科学计数法振动分析: DC.sqrt(1.5e6 / (2e0 * 3.1415926535e0 * 5e1 * 2.5e-2))
test('491. 科学计数法振动分析: DC.sqrt(1.5e6 / (2e0 * 3.1415926535e0 * 5e1 * 2.5e-2))', () => {
  expect(calc('DC.sqrt(1.5e6 / (2e0 * 3.1415926535e0 * 5e1 * 2.5e-2))', {}, { digit: 4 })).toBe(
    '437.0194'
  );
});

// 492. 科学计数法电路分析: 1e0 / (2e0 * 3.1415926535e0 * 6e3 * 1e-6)
test('492. 科学计数法电路分析: 1e0 / (2e0 * 3.1415926535e0 * 6e3 * 1e-6)', () => {
  expect(calc('1e0 / (2e0 * 3.1415926535e0 * 6e3 * 1e-6)', {}, { digit: 5 })).toBe('26.52582');
});

// 493. 科学计数法电磁场: DC.sqrt(1e-7 * 4e0 * 3.1415926535e0 * 5e2 / 1e-3)
test('493. 科学计数法电磁场: DC.sqrt(1e-7 * 4e0 * 3.1415926535e0 * 5e2 / 1e-3)', () => {
  expect(calc('DC.sqrt(1e-7 * 4e0 * 3.1415926535e0 * 5e2 / 1e-3)', {}, { digit: 6 })).toBe(
    '0.792665'
  );
});

// 494. 科学计数法结构力学: 2.1e11 * 1e-4 / (1e2 * DC.pow(1e-2, 3e0))
test('494. 科学计数法结构力学: 2.1e11 * 1e-4 / (1e2 * DC.pow(1e-2, 3e0))', () => {
  expect(calc('2.1e11 * 1e-4 / (1e2 * DC.pow(1e-2, 3e0))', {}, { digit: 6 })).toBe(
    '210000000000.000000'
  );
});

// 495. 科学计数法空气动力学: 1.225e0 * DC.pow(2.5e2, 2e0) / (2e0 * 1.81e-5)
test('495. 科学计数法空气动力学: 1.225e0 * DC.pow(2.5e2, 2e0) / (2e0 * 1.81e-5)', () => {
  expect(calc('1.225e0 * DC.pow(2.5e2, 2e0) / (2e0 * 1.81e-5)', {}, { digit: 3 })).toBe(
    '2114986187.845'
  );
});

// 496. 科学计数法材料疲劳: DC.log10(1e7) * 2.5e1 / DC.ln(1e2)
test('496. 科学计数法材料疲劳: DC.log10(1e7) * 2.5e1 / DC.ln(1e2)', () => {
  expect(calc('DC.log10(1e7) * 2.5e1 / DC.ln(1e2)', {}, { digit: 4 })).toBe('38.0008');
});

// 497. 科学计数法腐蚀速率: DC.exp(-1.5e3 / (8.314e0 * 3.23e2)) * 1e6
test('497. 科学计数法腐蚀速率: DC.exp(-1.5e3 / (8.314e0 * 3.23e2)) * 1e6', () => {
  expect(calc('DC.exp(-1.5e3 / (8.314e0 * 3.23e2)) * 1e6', {}, { digit: 6 })).toBe('572025.660550');
});

// 498. 科学计数法扩散系数: 2.18e-5 * DC.exp(-1.5e4 / (8.314e0 * 2.98e2))
test('498. 科学计数法扩散系数: 2.18e-5 * DC.exp(-1.5e4 / (8.314e0 * 2.98e2))', () => {
  expect(calc('2.18e-5 * DC.exp(-1.5e4 / (8.314e0 * 2.98e2))', {}, { digit: 8 })).toBe(
    '0.00000005'
  );
});

// 499. 科学计数法表面张力: 7.28e-2 / DC.sqrt(1e-3 * 9.81e0 * 1e-3)
test('499. 科学计数法表面张力: 7.28e-2 / DC.sqrt(1e-3 * 9.81e0 * 1e-3)', () => {
  expect(calc('7.28e-2 / DC.sqrt(1e-3 * 9.81e0 * 1e-3)', {}, { digit: 6 })).toBe('23.243251');
});

// 500. 科学计数法量子效率: 1e0 / (1e0 + DC.exp((1.5e1 - 1.2e1) / (2.585e-2 * 3e2)))
test('500. 科学计数法量子效率: 1e0 / (1e0 + DC.exp((1.5e1 - 1.2e1) / (2.585e-2 * 3e2)))', () => {
  expect(calc('1e0 / (1e0 + DC.exp((1.5e1 - 1.2e1) / (2.585e-2 * 3e2)))', {}, { digit: 6 })).toBe(
    '0.404477'
  );
});

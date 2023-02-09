---
lang: zh-CN
title: 基础语法
description: Java
category: 
 - Java
tag:
 - JavaSE
---

## 注释

注释是对代码的解释和说明文字。

* 单行注释：

~~~java
// 这是单行注释文字
~~~

* 多行注释：

~~~java
/*
这是多行注释文字
这是多行注释文字
这是多行注释文字
*/
注意：多行注释不能嵌套使用。
~~~

## 关键字

| **abstract**   | **assert**       | **boolean**   | **break**      | **byte**   |
| -------------- | ---------------- | ------------- | -------------- | ---------- |
| **case**       | **catch**        | **char**      | **class**      | **const**  |
| **continue**   | **default**      | **do**        | **double**     | **else**   |
| **enum**       | **extends**      | **final**     | **finally**    | **float**  |
| **for**        | **goto**         | **if**        | **implements** | **import** |
| **instanceof** | **int**          | **interface** | **long**       | **native** |
| **new**        | **package**      | **private**   | **protected**  | **public** |
| **return**     | **strictfp**     | **short**     | **static**     | **super**  |
| **switch**     | **synchronized** | **this**      | **throw**      | **throws** |
| **transient**  | **try**          | **void**      | **volatile**   | **while**  |

## 数据类型

### Java语言数据类型的分类

- 基本数据类型
- 引用数据类型

### 基本数据类型的四类八种

| 数据类型 | 关键字  | 字节数 |              取值范围              |
| :------: | :-----: | :----: | :--------------------------------: |
|   整数   |  byte   |   1    |     -2^7 ~ 2^7-1   (-128~127)      |
|          |  short  |   2    | -2^15次方 ~ 2^15-1  (-32768~32767) |
|          |   int   |   4    |         -2^31次方 ~ 2^31-1         |
|          |  long   |   8    |         -2^63次方 ~ 2^63-1         |
|  浮点数  |  float  |   4    |    1.401298e-45 ~ 3.402823e+38     |
|          | double  |   8    |   4.9000000e-324 ~ 1.797693e+308   |
|   字符   |  char   |   2    |              0-65535               |
|   布尔   | boolean |   1    |            true，false             |

#### 说明

​	e+38表示是乘以10的38次方，同样，e-45表示乘以10的负45次方。

​	在java中整数默认是int类型，浮点数默认是double类型。

### 定义8种基本数据类型变量

```java
public class VariableDemo3{
    public static void main(String[] args){
        //1.定义byte类型的变量
        //数据类型 变量名 = 数据值;
        byte a = 10;
        System.out.println(a);

        //2.定义short类型的变量
        short b = 20;
        System.out.println(b);

        //3.定义int类型的变量
        int c = 30;
        System.out.println(c);

        //4.定义long类型的变量
        long d = 123456789123456789L;
        System.out.println(d);

        //5.定义float类型的变量
        float e = 10.1F;
        System.out.println(e);

        //6.定义double类型的变量
        double f = 20.3;
        System.out.println(f);

        //7.定义char类型的变量
        char g = 'a';
        System.out.println(g);

        //8.定义boolean类型的变量
        boolean h = true;
        System.out.println(h);

    }
}
```



## 标识符

业内大多数程序员都在遵守阿里巴巴的命名规则。

### 硬性要求：

​	必须要这么做，否则代码会报错。

- 必须由数字、字母、下划线_、美元符号$组成。
- 数字不能开头
- 不能是关键字
- 区分大小写的。

### 小驼峰命名法

适用于变量名和方法名

* 如果是一个单词，那么全部小写，比如：name

* 如果是多个单词，那么从第二个单词开始，首字母大写，比如：firstName、maxAge

### 大驼峰命名法

适用于类名

* 如果是一个单词，那么首字母大写。比如：Demo、Test。

* 如果是多个单词，那么每一个单词首字母都需要大写。比如：HelloWorld

不管起什么名字，都要做到见名知意。

### 阿里巴巴命名规范细节：

1. 尽量不要用拼音。但是一些国际通用的拼音可视为英文单词。

   正确：alibaba、hangzhou、nanjing

   错误：jiage、dazhe

2. 平时在给变量名、方法名、类名起名字的时候，不要使用下划线或美元符号。

   错误：_name

   正确：name



## 键盘录入

```java
//导包，其实就是先找到Scanner这个类在哪
import java.util.Scanner;
public class ScannerDemo1{
	public static void main(String[] args){
		//2.创建对象，其实就是申明一下，我准备开始用Scanner这个类了。
		Scanner sc = new Scanner(System.in);
		//3.接收数据
		//当程序运行之后，我们在键盘输入的数据就会被变量i给接收了
		System.out.println("请输入一个数字");
		int i = sc.nextInt();
		System.out.println(i);
	}
}
```



## 算术运算符

分类：

```java
+ - * / %
```

运算特点：

```java
+ - * :跟小学数学中一模一样没有任何区别.
```

```java
/：
1.整数相除结果只能得到整除，如果结果想要是小数，必须要有小数参数。
2.小数直接参与运算，得到的结果有可能是不精确的。
案例：
System.out.println( 10 / 3);//3
System.out.println(10.0 / 3);//3.3333333333333335
```

```java
%：取模、取余。
   他做的也是除法运算，只不过获取的是余数而已。
案例：
System.out.println(10 % 2);//0
System.out.println(10 % 3);//1
应用场景：
//可以利用取模来判断一个数是奇数还是偶数
System.out.println(15 % 2);//1  奇数
```



## 隐式转换

也叫自动类型提升。

​	就是把一个取值范围小的数据或者变量，赋值给另一个取值范围大的变量。此时不需要我们额外写代码单独实现，是程序自动帮我们完成的。



* 取值范围小的，和取值范围大的进行运算，小的会先提升为大的，再进行运算。
* byte、short、char三种类型的数据在运算的时候，都会直接先提升为int，然后再进行运算。

​	byte short int long float double



## 强制转换

```
目标数据类型 变量名 = （目标数据类型）被强转的数据；
```

```java
public class OperatorDemo2 {
    public static void main(String[] args) {
        double a = 12.3;
        int b = (int) a;
        System.out.println(b);//12
    }
}
```

注意点：

​	强制转换有可能会导致数据的精度丢失



## 字符串的+操作

当+操作中出现字符串时，此时就是字符串的连接符，会将前后的数据进行拼接，并产生一个新的字符串。

当连续进行+操作时，从左到右逐个执行的。



## 字符的+操作

当+操作中出现了字符，会拿着字符到计算机内置的ASCII码表中去查对应的数字，然后再进行计算。

```java
char c = 'a';
int result = c + 0;
System.out.println(result);//97
```

ASCII码表中：

​	'a'   -----    97

​	'A'   -----    65



## 自增自减运算符

```java
++  自增运算符
--  自减运算符
```

```java
//++
int a = 10;
a++;//就是让变量a里面的值 + 1
System.out.println(a);//11
++a;//就是让变量a里面的值 + 1
System.out.println(a);//12
```



## 赋值运算符

```java
public class OperatorDemo6 {
    public static void main(String[] args) {
        //1.最为简单的赋值运算符用法
        int a = 10;//就是把10赋值给变量a
        System.out.println(a);

        //2.如果等号右边需要进行计算。
        int b = 20;
        int c = a + b;//先计算等号右边的，把计算的结果赋值给左边的变量
        System.out.println(c);

        //3.特殊的用法
        a = a + 10;//先计算等号右边的，把计算的结果赋值给左边的变量
        System.out.println(a);//20
    }
}
```



## 扩展赋值运算符

​	+=、-=、*=、/=、%=

```java
public class OperatorDemo7 {
    public static void main(String[] args) {
        //扩展赋值运算符
        int a = 10;
        int b = 20;
        a += b;//把左边和右边相加，再把最终的结果赋值给左边，对右边没有任何影响
        // 相当于 a = a + b;
        System.out.println(a);//30
        System.out.println(b);//20
    }
}
```

​	扩展的赋值运算符中隐层还包含了一个强制转换。

以+=为例。

a += b ;实际上相当于 a = (byte)(a + b);

```java
public class OperatorDemo8 {
    public static void main(String[] args) {
        byte a = 10;
        byte b = 20;
        //a += b;
        a = (byte)(a + b);
        System.out.println(a);//30
    }
}
```



## 关系运算符

| 符号 | 解释                                                         |
| ---- | ------------------------------------------------------------ |
| ==   | 就是判断左边跟右边是否相等，如果成立就是true，如果不成立就是false |
| !=   | 就是判断左边跟右边是否不相等，如果成立就是true，如果不成立就是false |
| >    | 就是判断左边是否大于右边，如果成立就是true，如果不成立就是false |
| >=   | 就是判断左边是否大于等于右边，如果成立就是true，如果不成立就是false |
| <    | 就是判断左边是否小于右边，如果成立就是true，如果不成立就是false |
| <=   | 就是判断左边是否小于等于右边，如果成立就是true，如果不成立就是false |

* 关系运算符最终的结果一定是布尔类型的。要么是true，要么是false
* 在写==的时候，千万不要写成=



## 逻辑运算符

&：逻辑与（而且）

​	两边都为真，结果才是真，只要有一个为假，那么结果就是假。

|：逻辑或（或者）

​	两边都为假，结果才是假，只要有一个为真，那么结果就是真。

代码示例：

```java
// &  //两边都是真，结果才是真。
System.out.println(true & true);//true
System.out.println(false & false);//false
System.out.println(true & false);//false
System.out.println(false & true);//false

System.out.println("===================================");

// | 或  //两边都是假，结果才是假，如果有一个为真，那么结果就是真。
System.out.println(true | true);//true
System.out.println(false | false);//false
System.out.println(true | false);//true
System.out.println(false | true);//true
```

​	根据固定的场景，来选择使用&还是使用|

* 用户登录。

  用户名输入正确  & 密码输入正确

  因为只有用户名和密码同时都正确了，那么才能成功登录，只要有一个失败了都不行。

  使用技巧：

  ​	当我们需要同时满足左边和右边两种情况时，可以使用且

* 丈母娘选女婿

  丈母娘：女婿啊，你要么买个房子，要么买辆车。就可以把我的小棉袄穿走了。

  买个房子 | 买辆车

  两个条件中，只要满足其中一个，就可以穿走小棉袄了。

  使用技巧：

  ​	当两种条件只要满足其中一个的时候，可以使用或

^（异或）的使用：

​	在以后用的不多，了解一下即可。

计算规则：如果两边相同，结果为false，如果两边不同，结果为true

代码示例：

```java
//^   //左右不相同，结果才是true，左右相同结果就是false
System.out.println(true ^ true);//false
System.out.println(false ^ false);//false
System.out.println(true ^ false);//true
System.out.println(false ^ true);//true
```

!（取反）的使用：

​	是取反，也叫做非。

计算规则：false取反就是true，true取反就是false

温馨提示：**取反最多只用一个。**

代码示例：

```java
System.out.println(!false);//true
System.out.println(!true);//false

System.out.println(!!false);//注意点：取反最多只用一个。
```



## 短路逻辑运算符

分类：  &&   ||

&&：

​	运算结果跟&是一模一样的，只不过具有短路效果。

||：

​	运算结果跟|是一模一样的。只不过具有短路效果。

逻辑核心：

​	当左边不能确定整个表达式的结果，右边才会执行。

​	当左边能确定整个表达式的结果，那么右边就不会执行了。从而提高了代码的运行效率。

## 三元运算符

```
	关系表达式 ？ 表达式1 ：表达式2 ；
```

* 计算关系表达式的值。
* 如果关系表达式的值为真，那么执行表达式1。
* 如果关系表达式的值为假，那么执行表达式2。

```java
public class OperatorDemo12 {
    public static void main(String[] args) {
        //需求：求两个数的较大值
        int a = 10;
        int b = 20;

        //格式：关系表达式 ？ 表达式1 ： 表达式2 ；
        //注意点：
        //三元运算符的最终结果一定要被使用。
        //要么赋值给一个变量，要么直接输出。
       int max =  a > b ? a : b ;
        System.out.println(max);


        System.out.println(a > b ? a : b);
    }
}
```










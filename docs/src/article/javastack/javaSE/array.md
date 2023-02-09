---
lang: zh-CN
title: 数组
description: Java
category: 
 - Java
tag:
 - JavaSE
---
## 数组

指的是一种容器，可以同来存储同种数据类型的多个值。

但是数组容器在存储数据的时候，需要结合隐式转换考虑。

容器的类，和存储的数据类型保持一致。

```java
数据类型 [] 数组名
int[] arr; //JAVA Syntax
```

```java
数据类型  数组名 []
int arr[];
```

平时习惯使用第一种方式。

## 数组静态初始化

```java
数据类型[] 数组名 = new 数据类型[]{元素1，元素2，元素3，元素4...};
int[] array = {1,2,3,4,5};
double[] array = {1.1,1.2,1.3};
```

* 等号前后的数据类型必须保持一致。
* 数组一旦创建之后，长度不能发生变化。



## 地址

```java
int[] arr = {1,2,3,4,5};
System.out.println(arr);//[I@6d03e736

double[] arr2 = {1.1,2.2,3.3};
System.out.println(arr2);//[D@568db2f2
```

打印数组的时候，实际出现的是数组的地址值。

数组的地址值：就表示数组在内存中的位置。

以[I@6d03e736为例：

[ ：表示现在打印的是一个数组。

I：表示现在打印的数组是int类型的。

@：仅仅是一个间隔符号而已。

6d03e736：就是数组在内存中真正的地址值。（十六进制的）

但是，我们习惯性会把[I@6d03e736这个整体称之为数组的地址值。



## 访问数组元素

```
数组名[索引];
```

```java
public class ArrDemo2 {
    public static void main(String[] args) {
       int[] arr = {1,2,3,4,5};
       //需求1：获取arr数组中，3索引上的值
        int number = arr[3];
        System.out.println(number);
        System.out.println(arr[3]);
       //需求2：将arr数组中，3索引上的值修改为10
            arr[3] = 10;
        System.out.println("修改之后为:" + arr[3]);

    }
}
```

## 索引

​	也叫角标、下标

​	就是数组容器中每一个小格子对应的编号。

* 索引一定是从0开始的。

* 连续不间断。

* 逐个+1增长。

  

## 数组的遍历

遍历：就是把数组里面所有的内容一个一个全部取出来。

数组的长度：数组名.length;

通用代码：

```java
for(int i = 0; i < arr.length; i++){
    //在循环的过程中，i依次表示数组中的每一个索引
    sout(arr[i]);//就可以把数组里面的每一个元素都获取出来，并打印在控制台上了。
}
```



## 数组的动态初始化

初始化时只指定数组长度，不指定具体存入的元素。

```
数据类型[] 数组名 = new 数据类型[数组的长度];
```

```java
//1.定义一个数组，存3个人的年龄，年龄未知
int[] agesArr = new int[3];


//2.定义一个数组，存班级10名学生的考试成绩，考试成绩暂时未知，考完才知道。
int[] scoresArr = new int[10];
```

#### 默认初始化值：

整数类型：0

小数类型：0.0

布尔类型：false

字符类型：'\u0000'

引用类型：null

## 数组两种初始化方式的区别

静态初始化：int[] arr = {1,2,3,4,5};

动态初始化：int[] arr = new int[3];

静态初始化：手动指定数组的元素，系统会根据元素的个数，计算出数组的长度。

动态初始化：手动指定数组长度，由系统给出默认初始化值。

## 数组常见问题

当访问了数组中不存在的索引，就会引发索引越界异常。

避免：

​	针对于任意一个数组，索引的范围：
   	最小索引：0
   	最大索引：数组的长度 - 1
​           		    数组名.length - 1

```java
public class ArrDemo6 {
    public static void main(String[] args) {
       int[] arr = {1,2,3,4,5,5,5,5,5};
        //用索引来访问数组中的元素
        System.out.println(arr[1]);
        System.out.println(arr[10]);//ArrayIndexOutOfBoundsException

    }
}
```










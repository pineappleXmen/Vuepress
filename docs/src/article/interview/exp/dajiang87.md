---
title: 大疆2022.08.07笔试记录
lang: zh-CN
description: 大疆笔试
category: 
 - 笔试
tag:
 - 大疆
 - 笔试
---



简答题
::: tip 写RPC实现的框架和解决的问题
:::
略

::: tip 大疆的无人机可以在一排的物品中取物品，但是取一个后需要冷却取一个的时间，问对于输入的数组，最多能拿到多少价值的物品
:::

::: code-tabs

@tab java

```java
//Leetcode198. 打家劫舍原题
//转移方程 dp[i]=Math.max(dp[i-1],dp[i-2]+num[i]);
public class Test01 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] num = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int[] dp = new int[num.length];
        if(num.length<=2){
            System.out.println(Arrays.stream(num).max().getAsInt());
            return;
        }
        dp[0]=num[0];
        dp[1]=Math.max(num[1],dp[0]);
        for(int i=2;i<num.length;i++){
            dp[i]=Math.max(dp[i-1],dp[i-2]+num[i]);
        }
        System.out.println(Arrays.stream(dp).max().getAsInt());
    }
}
```
:::
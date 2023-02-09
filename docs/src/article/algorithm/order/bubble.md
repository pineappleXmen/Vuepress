---
lang: zh-CN
title: 冒泡排序
description: 排序算法
category: 
 - 算法
tag:
 - 排序
---

| 排序方法 | 时间复杂度 | 是否稳定 |
| -------- | ---------- | -------- |
| 冒泡排序 | O(N2)      | 稳定     |

::: code-tabs#java

@tab java

```java
public void bubbleSort(int[] arr){
        for(int i=arr.length-1;i>=0;i--)
            for (int j=0;j<i;j++)
                if(arr[j]>arr[j+1])
                    swap.swap(arr,j,j+1);
 }
```

:::
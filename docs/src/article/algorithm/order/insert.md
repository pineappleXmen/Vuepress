---
lang: zh-CN
title: 插入排序
description: 排序算法
category: 
 - 算法
tag:
 - 排序
---

| 排序方法 | 时间复杂度 | 是否稳定 |
| -------- | ---------- | -------- |
| 冒泡排序 | O(N2)      | 稳定     |
| 选择排序 | O(N2)      | 不稳定   |
| 插入排序 | O(N2)      | 稳定     |
| 归并排序 | O(nlogn)   | 稳定     |
| 快速排序 | O(nlogn)   | 不稳定   |
| 堆排序   | O(nlogn)   | 不稳定   |

::: code-tabs#shell

@tab java

```java
public static void insertSort(int [] arr){
        for (int i=1;i<arr.length;i++){
            for(int j=i-1 ; j>=0&&arr[j]>arr[j+1] ; j--){
                swap(arr,j+1,j);
            }
          }
   }
```

:::

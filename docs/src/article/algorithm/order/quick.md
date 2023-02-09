---
lang: zh-CN
title: 快速排序
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

:::code-tabs#shell

@tab java

```java
//快速排序
public void quickSort(int[] arr){
        process(arr,0, arr.length-1);
    }
    public void process(int[] arr,int L,int R){
        if(L>R) return;
        int mid = partition(arr,L,R);
        process(arr,L,mid-1);
        process(arr,mid+1,R);
    }
    public int partition(int[] arr,int L,int R){
        int pivot = R;
        int wall = L;
        for(int i=L;i<R;i++){
            if(arr[i]<arr[pivot])
                swap.swap(arr,wall++,i);
        }
        swap.swap(arr,wall,pivot);
        return wall;
    }
```

:::

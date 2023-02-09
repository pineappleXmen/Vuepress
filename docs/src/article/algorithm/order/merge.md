---
lang: zh-CN
title: 归并排序
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
//归并排序
public void mergeSort(int[] arr){
        process(arr,0,arr.length-1);
    }
    public void process(int[] arr,int L,int R){
        if(L==R) return;
        int mid = L+(R-L)/2;
        process(arr,L,mid);
        process(arr,mid+1,R);
        partition(arr,L,mid,R);
    }
    public void partition(int[] arr,int L,int mid,int R){
        int left = L;
        int right =mid+1;
        int[] helper = new int[R-L+1];
        int i=0;
        while(left<=mid&&right<=R){
            helper[i++]  =  arr[left]<arr[right]?arr[left++]:arr[right++];
        }
        while (left<=mid) helper[i++]=arr[left++];
        while (right<=R)  helper[i++]=arr[right++];
        for (int j = 0; j < i; j++) {
            arr[L+j] =  helper[j];
        }
    }
```

:::

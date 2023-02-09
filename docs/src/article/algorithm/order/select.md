---
lang: zh-CN
title: 选择排序
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



```java
//选择排序
 public static void selectionSort(int [] arr){
        if (arr == null || arr.length < 2){
            return;
        }
        for(int i=0;i<arr.length-1;i++){
            int minindex=i;
            for (int j =i+1;j<arr.length;j++){
                minindex = arr[j]<arr[minindex]? j:minindex;
            }
            swap(arr,minindex,i);
        }
    }
```


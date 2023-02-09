---
lang: zh-CN
title: 堆排序
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
//堆排序
public static void heapSort(int[] arr){
        if(arr==null||arr.length<2){
            return;
        }
        for (int i=arr.length-1;i>=0;i--){
            heapify(arr,i,arr.length);
        }//将原数列变成大根堆
        int heapSize = arr.length;
        swap(arr,0,--heapSize);//将最大值放在最后一位 数组大小--
        while (heapSize>0){
            heapify(arr,0,heapSize);//再次变为大根堆
            swap(arr,0,--heapSize);//放在最后一位
        }
    }
    private static void heapInsert(int [] arr,int index){
        while (arr[index]>arr[(index-1)/2]){
            swap(arr,index,(index-1)/2);
            index=(index-1)/2;
        }
    }
    private static void heapify(int[] arr, int index, int heapSize) {
        int left = index * 2 + 1; //左边孩子下标
        while (left < heapSize) {
            int largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
            largest = arr[largest] > arr[index] ? largest : index;
            if (largest == index) {
                break;
            }
            swap(arr, largest, index);
            index = largest;
            left = index * 2 + 1;
        }
    } //O(log
```

:::

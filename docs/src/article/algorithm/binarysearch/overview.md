---
lang: zh-CN
title: 二分法概述
description: 二分法题目
category: 
 - 算法
tag:
 - 二分法
---

# 二分法

二分类型题目一般有两类

==**查找有序集合中某个值的位置**==  和   ==**通过二分缩小范围猜答案**==

## **1.查找有序集合中某个值的位置**

一般会将整个区间分为**左侧**和**右侧**。

通过在**循环中的不变量**获取最终的答案。

对于一个 [1~n-1] 的区间上有序数组，根据区间开闭的定义，选定**初始化**的参数

```
left = 0 right = n-1  闭区间
left = -1 right = n   开区间
```

**循环判断条件（划分区间依据）**

```
if nums[mid] < target   //区间左侧为<target 右侧为>=target
if nums[mid] <= target  //区间左侧为<=target 右侧为>target
```

**循环转移条件**

因为mid已经被取，根据开闭区间的定义，需要保证转移后的区间仍然符合要求。

```
left = mid+1
right = mid-1  //闭区间转移条件 保证转移后仍为闭区间

left = mid
right = mid-1 //左开右闭区间

left = mid+1
right = mid   //左闭右开区间
```

**循环不变量（确定答案）**

因为退出循环后仍满足循环前提条件

```
left-1始终会<target 始终在左侧
right+1始终会>=target 始终在右侧
```

**条件的转换**

```
上述方法实现的为>=x的搜索
对于>x的搜索 只需转换为>=(x+1) 即可
对于<x 只需转换为>=x结果左边的那个数
对于<=x 只需转换为>x左边的数 也就是>=(x+1)左边的那个数
```



## 二分法 实现代码

**返回大于等于target的数在数组中的位置，如果不存在，则返回-1**

::: code-tabs#shell

@tab java


```java
//闭区间 左侧<target 右侧>=target
public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length-1;
        while(left<=right){                //区间不为空则继续循环
            int mid = left+(right-left)/2; //避免下取整
            if(nums[mid]<target){      //左侧为<target 右侧为>=target
                left = mid+1;
            }else{
                right = mid-1;
            }
        }
    	//不满足区间为空条件 退出循环，此时left>right 且满足
        return nums[left+1]==target?left:-1;
    //return时需注意，L+1一定在右侧,R-1一定在左侧
}
```

@tab python

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums)-1
        while(left<=right):
            mid = (left+right)//2
            if nums[mid]<target:
                left = mid+1
            else:
                right = mid-1
        return left+1

//bisect下的bisect_left也提供这个功能

class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        return bisect.bisect_left(nums, target)+1
```

@tab c++

```c
class Solution {
    // lower_bound 返回最小的满足 nums[i] >= target 的 i
    // 如果数组为空，或者所有数都 < target，则返回 nums.size()
    // 要求 nums 是非递减的，即 nums[i] <= nums[i + 1]

    // 闭区间写法
    int lower_bound(vector<int> &nums, int target) {
        int left = 0, right = (int) nums.size() - 1; // 闭区间 [left, right]
        while (left <= right) { // 区间不为空
            // 循环不变量：
            // nums[left-1] < target
            // nums[right+1] >= target
            int mid = left + (right - left) / 2;
            if (nums[mid] < target)
                left = mid + 1; // 范围缩小到 [mid+1, right]
            else
                right = mid - 1; // 范围缩小到 [left, mid-1]
        }
        return left; // 或者 right+1
    }

    // 左闭右开区间写法
    int lower_bound2(vector<int> &nums, int target) {
        int left = 0, right = nums.size(); // 左闭右开区间 [left, right)
        while (left < right) { // 区间不为空
            // 循环不变量：
            // nums[left-1] < target
            // nums[right] >= target
            int mid = left + (right - left) / 2;
            if (nums[mid] < target)
                left = mid + 1; // 范围缩小到 [mid+1, right)
            else
                right = mid; // 范围缩小到 [left, mid)
        }
        return left; // 或者 right
    }

    // 开区间写法
    int lower_bound3(vector<int> &nums, int target) {
        int left = -1, right = nums.size(); // 开区间 (left, right)
        while (left + 1 < right) { // 区间不为空
            // 循环不变量：
            // nums[left] < target
            // nums[right] >= target
            int mid = left + (right - left) / 2;
            if (nums[mid] < target)
                left = mid; // 范围缩小到 (mid, right)
            else
                right = mid; // 范围缩小到 (left, mid)
        }
        return right; // 或者 left+1
    }

public:
    vector<int> searchRange(vector<int> &nums, int target) {
        int start = lower_bound(nums, target); // 使用其中一种写法即可
        if (start == nums.size() || nums[start] != target)
            return {-1, -1};
        // 如果 start 存在，那么 end 必定存在
        int end = lower_bound(nums, target + 1) - 1;
        return {start, end};
    }
};
```

@tab go

```go
// lowerBound 返回最小的满足 nums[i] >= target 的 i
// 如果数组为空，或者所有数都 < target，则返回 nums.length
// 要求 nums 是非递减的，即 nums[i] <= nums[i + 1]

// 闭区间写法
func lowerBound(nums []int, target int) int {
    left, right := 0, len(nums)-1 // 闭区间 [left, right]
    for left <= right {           // 区间不为空
        // 循环不变量：
        // nums[left-1] < target
        // nums[right+1] >= target
        mid := left + (right-left)/2
        if nums[mid] < target {
            left = mid + 1 // 范围缩小到 [mid+1, right]
        } else {
            right = mid - 1 // 范围缩小到 [left, mid-1]
        }
    }
    return left // 或者 right+1
}

// 左闭右开区间写法
func lowerBound2(nums []int, target int) int {
    left, right := 0, len(nums) // 左闭右开区间 [left, right)
    for left < right {          // 区间不为空
        // 循环不变量：
        // nums[left-1] < target
        // nums[right] >= target
        mid := left + (right-left)/2
        if nums[mid] < target {
            left = mid + 1 // 范围缩小到 [mid+1, right)
        } else {
            right = mid // 范围缩小到 [left, mid)
        }
    }
    return left // 或者 right
}

// 开区间写法
func lowerBound3(nums []int, target int) int {
    left, right := -1, len(nums) // 开区间 (left, right)
    for left+1 < right {         // 区间不为空
        // 循环不变量：
        // nums[left] < target
        // nums[right] >= target
        mid := left + (right-left)/2
        if nums[mid] < target {
            left = mid // 范围缩小到 (mid, right)
        } else {
            right = mid // 范围缩小到 (left, mid)
        }
    }
    return right // 或者 left+1
}

func searchRange(nums []int, target int) []int {
    start := lowerBound(nums, target) // 使用其中一种写法即可
    if start == len(nums) || nums[start] != target {
        return []int{-1, -1}
    }
    // 如果 start 存在，那么 end 必定存在
    end := lowerBound(nums, target+1) - 1
    return []int{start, end}
}
```

:::

### Python bisect模块

[Python bisect模块文档](https://docs.python.org/zh-cn/3/library/bisect.html?highlight=bisect#bisect.bisect_left)

| API                     |                                  |
| ----------------------- | -------------------------------- |
| bisect.**bisect_left**  | **左侧为<target 右侧为>=target** |
| bisect.**bisect_right** | **左侧为<=target 右侧为>target** |

bisect.**bisect_left**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

在 *a* 中找到 *x* 合适的插入点以维持有序。参数 *lo* 和 *hi* 可以被用于确定需要考虑的子集；默认情况下整个列表都会被使用。如果 *x* 已经在 *a* 里存在，那么插入点会在已存在元素之前（也就是左边）。如果 *a* 是列表（list）的话，返回值是可以被放在 `list.insert()` 的第一个参数的。

返回的插入点 *i* 将数组 *a* 分成两半，使得 `all(val < x for val in a[lo : i])` 在左半边而 `all(val >= x for val in a[i : hi])` 在右半边。

**也就是左侧为<target 右侧为>=target**

bisect.**bisect_right**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

bisect.**bisect**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

类似于 [`bisect_left()`](https://docs.python.org/zh-cn/3/library/bisect.html?highlight=bisect#bisect.bisect_left)，但是返回的插入点是 *a* 中已存在元素 *x* 的右侧。

返回的插入点 *i* 将数组 *a* 分成两半，使得左半边为 `all(val <= x for val in a[lo : i])` 而右半边为 `all(val > x for val in a[i : hi])`。

**左侧为<=x 右侧为>x**



## **2.通过二分法猜答案**

一般在题目中存在 最大化最小值、最小化最大值等提示，即可用二分法猜答案。

在满足答案的区间[min,max]中，猜一个答案x，如果x满足答案要求，那么答案存在于[min,x]中，继续二分循环猜答案，如果x不满足答案要求，那么答案存在于[x+1,max]中。



## 3.参考题目

| 题号题目                                                     | 难度 |                             说明                             |
| ------------------------------------------------------------ | :--: | :----------------------------------------------------------: |
| [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/ "35. 搜索插入位置") | 简单 | 模板题.需要注意的是下标len也有可能是答案 所以初始化的时候right=len |
| [278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version/ "278. 第一个错误的版本") | 简单 | 需要思考 如果isBadversion是false那么该个n也有可能是答案故下一轮搜索的范围还是mid |
| [704. 二分查找](https://leetcode.cn/problems/binary-search/ "704. 二分查找") | 简单 |                   返回需要注意判断是否存在                   |
| [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/ "300. 最长递增子序列") | 中等 |                          right=size                          |
| [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/ "34. 在排序数组中查找元素的第一个和最后一个位置") | 中等 |                    不能先找到再往两边扩散                    |
| [410. 分割数组的最大值](https://leetcode.cn/problems/split-array-largest-sum/ "410. 分割数组的最大值") | 困难 |                         二分法猜答案                         |
| [875. 爱吃香蕉的珂珂](https://leetcode.cn/problems/koko-eating-bananas/ "875. 爱吃香蕉的珂珂") | 中等 |                         二分法猜答案                         |
| [1011. 在 D 天内送达包裹的能力](https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/ "1011. 在 D 天内送达包裹的能力") | 中等 |            需要注意left为weight的max 不能小于该值            |
| [374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/ "374. 猜数字大小") | 简单 |                            二分法                            |
| [1283. 使结果不超过阈值的最小除数](https://leetcode.cn/problems/find-the-smallest-divisor-given-a-threshold/ "1283. 使结果不超过阈值的最小除数") | 中等 |                            猜答案                            |
| [1482. 制作 m 束花所需的最少天数](https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/ "1482. 制作 m 束花所需的最少天数") | 中等 |                            猜答案                            |
| [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/ "287. 寻找重复数") | 中等 |                       二分法+抽屉原理                        |
| [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/) | 中等 |                            二分法                            |




---
lang: zh-CN
title: Python拾遗
description: Python
category: 
 - Python
tag:
 - Python
---

## 容器类型collections

[Collections Docs](https://docs.python.org/zh-cn/3/library/collections.html)

| name                                                         | function                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`namedtuple()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple) | 创建命名元组子类的工厂函数                                   |
| [`deque`](https://docs.python.org/zh-cn/3/library/collections.html#collections.deque) | 类似列表(list)的容器，实现了在两端快速添加(append)和弹出(pop) |
| [`ChainMap`](https://docs.python.org/zh-cn/3/library/collections.html#collections.ChainMap) | 类似字典(dict)的容器类，将多个映射集合到一个视图里面         |
| [`Counter`](https://docs.python.org/zh-cn/3/library/collections.html#collections.Counter) | 字典的子类，提供了可哈希对象的计数功能                       |
| [`OrderedDict`](https://docs.python.org/zh-cn/3/library/collections.html#collections.OrderedDict) | 字典的子类，保存了他们被添加的顺序                           |
| [`defaultdict`](https://docs.python.org/zh-cn/3/library/collections.html#collections.defaultdict) | 字典的子类，提供了一个工厂函数，为字典查询提供一个默认值     |
| [`UserDict`](https://docs.python.org/zh-cn/3/library/collections.html#collections.UserDict) | 封装了字典对象，简化了字典子类化                             |
| [`UserList`](https://docs.python.org/zh-cn/3/library/collections.html#collections.UserList) | 封装了列表对象，简化了列表子类化                             |
| [`UserString`](https://docs.python.org/zh-cn/3/library/collections.html#collections.UserString) | 封装了字符串对象，简化了字符串子类化                         |

## 堆的实现

这个模块提供了堆队列算法的实现，也称为优先队列算法。

堆是一个二叉树，它的每个父节点的值都只会小于或等于所有孩子节点（的值）。 它使用了数组来实现：从零开始计数，对于所有的 *k* ，都有 `heap[k] <= heap[2*k+1]` 和 `heap[k] <= heap[2*k+2]`。 为了便于比较，不存在的元素被认为是无限大。 堆最有趣的特性在于最小的元素总是在根结点：`heap[0]`。

这个API与教材的堆算法实现有所不同，具体区别有两方面：（a）我们使用了从零开始的索引。这使得节点和其孩子节点索引之间的关系不太直观但更加适合，因为 Python 使用从零开始的索引。 （b）我们的 pop 方法返回最小的项而不是最大的项（这在教材中称为“最小堆”；而“最大堆”在教材中更为常见，因为它更适用于原地排序）。

基于这两方面，把堆看作原生的Python list也没什么奇怪的： `heap[0]` 表示最小的元素，同时 `heap.sort()` 维护了堆的不变性！

要创建一个堆，可以使用list来初始化为 `[]` ，或者你可以通过一个函数 [`heapify()`](https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heapify) ，来把一个list转换成堆。

定义了以下函数：

- heapq.**heappush**(*heap*, *item*)

  将 *item* 的值加入 *heap* 中，保持堆的不变性。

- heapq.**heappop**(*heap*)

  弹出并返回 *heap* 的最小的元素，保持堆的不变性。如果堆为空，抛出 [`IndexError`](https://docs.python.org/zh-cn/3/library/exceptions.html#IndexError) 。使用 `heap[0]` ，可以只访问最小的元素而不弹出它。

- heapq.**heappushpop**(*heap*, *item*)

  将 *item* 放入堆中，然后弹出并返回 *heap* 的最小元素。该组合操作比先调用 [`heappush()`](https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappush) 再调用 [`heappop()`](https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappop) 运行起来更有效率。

- heapq.**heapify**(*x*)

  将list *x* 转换成堆，原地，线性时间内。

- heapq.**heapreplace**(*heap*, *item*)

  弹出并返回 *heap* 中最小的一项，同时推入新的 *item*。 堆的大小不变。 如果堆为空则引发 [`IndexError`](https://docs.python.org/zh-cn/3/library/exceptions.html#IndexError)。这个单步骤操作比 [`heappop()`](https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappop) 加 [`heappush()`](https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappush) 更高效，并且在使用固定大小的堆时更为适宜。 pop/push 组合总是会从堆中返回一个元素并将其替换为 *item*。返回的值可能会比添加的 *item* 更大。 如果不希望如此，可考虑改用 [`heappushpop()`](https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappushpop)。 它的 push/pop 组合会返回两个值中较小的一个，将较大的值留在堆中。

该模块还提供了三个基于堆的通用功能函数。
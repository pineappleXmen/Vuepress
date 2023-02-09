<template><div><h2 id="容器类型collections" tabindex="-1"><a class="header-anchor" href="#容器类型collections" aria-hidden="true">#</a> 容器类型collections</h2>
<p><a href="https://docs.python.org/zh-cn/3/library/collections.html" target="_blank" rel="noopener noreferrer">Collections Docs<ExternalLinkIcon/></a></p>
<table>
<thead>
<tr>
<th>name</th>
<th>function</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple" target="_blank" rel="noopener noreferrer"><code v-pre>namedtuple()</code><ExternalLinkIcon/></a></td>
<td>创建命名元组子类的工厂函数</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.deque" target="_blank" rel="noopener noreferrer"><code v-pre>deque</code><ExternalLinkIcon/></a></td>
<td>类似列表(list)的容器，实现了在两端快速添加(append)和弹出(pop)</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.ChainMap" target="_blank" rel="noopener noreferrer"><code v-pre>ChainMap</code><ExternalLinkIcon/></a></td>
<td>类似字典(dict)的容器类，将多个映射集合到一个视图里面</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.Counter" target="_blank" rel="noopener noreferrer"><code v-pre>Counter</code><ExternalLinkIcon/></a></td>
<td>字典的子类，提供了可哈希对象的计数功能</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.OrderedDict" target="_blank" rel="noopener noreferrer"><code v-pre>OrderedDict</code><ExternalLinkIcon/></a></td>
<td>字典的子类，保存了他们被添加的顺序</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.defaultdict" target="_blank" rel="noopener noreferrer"><code v-pre>defaultdict</code><ExternalLinkIcon/></a></td>
<td>字典的子类，提供了一个工厂函数，为字典查询提供一个默认值</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.UserDict" target="_blank" rel="noopener noreferrer"><code v-pre>UserDict</code><ExternalLinkIcon/></a></td>
<td>封装了字典对象，简化了字典子类化</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.UserList" target="_blank" rel="noopener noreferrer"><code v-pre>UserList</code><ExternalLinkIcon/></a></td>
<td>封装了列表对象，简化了列表子类化</td>
</tr>
<tr>
<td><a href="https://docs.python.org/zh-cn/3/library/collections.html#collections.UserString" target="_blank" rel="noopener noreferrer"><code v-pre>UserString</code><ExternalLinkIcon/></a></td>
<td>封装了字符串对象，简化了字符串子类化</td>
</tr>
</tbody>
</table>
<h2 id="堆的实现" tabindex="-1"><a class="header-anchor" href="#堆的实现" aria-hidden="true">#</a> 堆的实现</h2>
<p>这个模块提供了堆队列算法的实现，也称为优先队列算法。</p>
<p>堆是一个二叉树，它的每个父节点的值都只会小于或等于所有孩子节点（的值）。 它使用了数组来实现：从零开始计数，对于所有的 <em>k</em> ，都有 <code v-pre>heap[k] &lt;= heap[2*k+1]</code> 和 <code v-pre>heap[k] &lt;= heap[2*k+2]</code>。 为了便于比较，不存在的元素被认为是无限大。 堆最有趣的特性在于最小的元素总是在根结点：<code v-pre>heap[0]</code>。</p>
<p>这个API与教材的堆算法实现有所不同，具体区别有两方面：（a）我们使用了从零开始的索引。这使得节点和其孩子节点索引之间的关系不太直观但更加适合，因为 Python 使用从零开始的索引。 （b）我们的 pop 方法返回最小的项而不是最大的项（这在教材中称为“最小堆”；而“最大堆”在教材中更为常见，因为它更适用于原地排序）。</p>
<p>基于这两方面，把堆看作原生的Python list也没什么奇怪的： <code v-pre>heap[0]</code> 表示最小的元素，同时 <code v-pre>heap.sort()</code> 维护了堆的不变性！</p>
<p>要创建一个堆，可以使用list来初始化为 <code v-pre>[]</code> ，或者你可以通过一个函数 <a href="https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heapify" target="_blank" rel="noopener noreferrer"><code v-pre>heapify()</code><ExternalLinkIcon/></a> ，来把一个list转换成堆。</p>
<p>定义了以下函数：</p>
<ul>
<li>
<p>heapq.<strong>heappush</strong>(<em>heap</em>, <em>item</em>)</p>
<p>将 <em>item</em> 的值加入 <em>heap</em> 中，保持堆的不变性。</p>
</li>
<li>
<p>heapq.<strong>heappop</strong>(<em>heap</em>)</p>
<p>弹出并返回 <em>heap</em> 的最小的元素，保持堆的不变性。如果堆为空，抛出 <a href="https://docs.python.org/zh-cn/3/library/exceptions.html#IndexError" target="_blank" rel="noopener noreferrer"><code v-pre>IndexError</code><ExternalLinkIcon/></a> 。使用 <code v-pre>heap[0]</code> ，可以只访问最小的元素而不弹出它。</p>
</li>
<li>
<p>heapq.<strong>heappushpop</strong>(<em>heap</em>, <em>item</em>)</p>
<p>将 <em>item</em> 放入堆中，然后弹出并返回 <em>heap</em> 的最小元素。该组合操作比先调用 <a href="https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappush" target="_blank" rel="noopener noreferrer"><code v-pre>heappush()</code><ExternalLinkIcon/></a> 再调用 <a href="https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappop" target="_blank" rel="noopener noreferrer"><code v-pre>heappop()</code><ExternalLinkIcon/></a> 运行起来更有效率。</p>
</li>
<li>
<p>heapq.<strong>heapify</strong>(<em>x</em>)</p>
<p>将list <em>x</em> 转换成堆，原地，线性时间内。</p>
</li>
<li>
<p>heapq.<strong>heapreplace</strong>(<em>heap</em>, <em>item</em>)</p>
<p>弹出并返回 <em>heap</em> 中最小的一项，同时推入新的 <em>item</em>。 堆的大小不变。 如果堆为空则引发 <a href="https://docs.python.org/zh-cn/3/library/exceptions.html#IndexError" target="_blank" rel="noopener noreferrer"><code v-pre>IndexError</code><ExternalLinkIcon/></a>。这个单步骤操作比 <a href="https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappop" target="_blank" rel="noopener noreferrer"><code v-pre>heappop()</code><ExternalLinkIcon/></a> 加 <a href="https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappush" target="_blank" rel="noopener noreferrer"><code v-pre>heappush()</code><ExternalLinkIcon/></a> 更高效，并且在使用固定大小的堆时更为适宜。 pop/push 组合总是会从堆中返回一个元素并将其替换为 <em>item</em>。返回的值可能会比添加的 <em>item</em> 更大。 如果不希望如此，可考虑改用 <a href="https://docs.python.org/zh-cn/3/library/heapq.html#heapq.heappushpop" target="_blank" rel="noopener noreferrer"><code v-pre>heappushpop()</code><ExternalLinkIcon/></a>。 它的 push/pop 组合会返回两个值中较小的一个，将较大的值留在堆中。</p>
</li>
</ul>
<p>该模块还提供了三个基于堆的通用功能函数。</p>
</div></template>



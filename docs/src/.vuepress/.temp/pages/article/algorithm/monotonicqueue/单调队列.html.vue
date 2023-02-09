<template><div><h1 id="单调队列-monotone-queue" tabindex="-1"><a class="header-anchor" href="#单调队列-monotone-queue" aria-hidden="true">#</a> 单调队列 Monotone Queue</h1>
<p>需要不断维护队列的单调性，时刻保证队列元素从大到小或从小到大
前置知识：双指针
以固定窗口大小的区间最大值为例（此时维护的是一个从大到小的单调队列）：
每次向右移动一格左指针，在移动前，如果左指针指向的元素在队首左侧，说明左指针指向的元素小于队首，移动左指针不会改变区间最大值，直接移动左指针即可；
如果左指针指向的就是队首，那么移动左指针会使区间最大值变小（变为单调队列队首之后的那个元素），我们要弹出队首。
这样无论是何种情况，都保证了在移动左指针后，单调队列的队首始终为当前区间的最大值。</p>
<ul>
<li><a href="https://oi-wiki.org/ds/monotonous-queue/" target="_blank" rel="noopener noreferrer">https://oi-wiki.org/ds/monotonous-queue/<ExternalLinkIcon/></a></li>
<li><a href="https://oi-wiki.org/dp/opt/monotonous-queue-stack/" target="_blank" rel="noopener noreferrer">https://oi-wiki.org/dp/opt/monotonous-queue-stack/<ExternalLinkIcon/></a></li>
<li><a href="https://cp-algorithms.com/data_structures/stack_queue_modification.html" target="_blank" rel="noopener noreferrer">https://cp-algorithms.com/data_structures/stack_queue_modification.html<ExternalLinkIcon/></a></li>
<li><a href="https://blog.csdn.net/weixin_43914593/article/details/105791217" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/weixin_43914593/article/details/105791217<ExternalLinkIcon/></a> 算法竞赛专题解析（13）：DP优化(3)--单调队列优化</li>
<li>todo <a href="https://xyzl.blog.luogu.org/DQ-OP-DP" target="_blank" rel="noopener noreferrer">https://xyzl.blog.luogu.org/DQ-OP-DP<ExternalLinkIcon/></a></li>
<li><a href="https://leetcode.cn/tag/monotonic-queue/problemset/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/tag/monotonic-queue/problemset/<ExternalLinkIcon/></a></li>
<li>todo <a href="https://www.luogu.com.cn/problem/P2627" target="_blank" rel="noopener noreferrer">https://www.luogu.com.cn/problem/P2627<ExternalLinkIcon/></a></li>
<li>todo <a href="http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1070" target="_blank" rel="noopener noreferrer">http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1070<ExternalLinkIcon/></a></li>
<li>LC375 猜数字大小 II <a href="https://leetcode-cn.com/problems/guess-number-higher-or-lower-ii/" target="_blank" rel="noopener noreferrer">https://leetcode-cn.com/problems/guess-number-higher-or-lower-ii/<ExternalLinkIcon/></a></li>
<li>​      <a href="https://leetcode.cn/problems/guess-number-higher-or-lower-ii/solution/cong-ji-yi-hua-sou-suo-on3-dao-dong-tai-q13g9/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/guess-number-higher-or-lower-ii/solution/cong-ji-yi-hua-sou-suo-on3-dao-dong-tai-q13g9/<ExternalLinkIcon/></a></li>
</ul>
</div></template>



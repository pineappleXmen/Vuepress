import{_ as t,V as d,W as o,Y as e,Z as n,$ as l,a0 as i,D as c}from"./framework-3845b112.js";const a={},r={id:"_160-相交链表",tabindex:"-1"},u=e("a",{class:"header-anchor",href:"#_160-相交链表","aria-hidden":"true"},"#",-1),p={href:"https://leetcode.cn/problems/intersection-of-two-linked-lists/",target:"_blank",rel:"noopener noreferrer"},_=e("p",null,"难度简单1863",-1),m=e("p",null,[n("给你两个单链表的头节点 "),e("code",null,"headA"),n(" 和 "),e("code",null,"headB"),n(" ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 "),e("code",null,"null"),n(" 。")],-1),g=e("p",null,[n("图示两个链表在节点 "),e("code",null,"c1"),n(" 开始相交**：**")],-1),v={href:"https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png",target:"_blank",rel:"noopener noreferrer"},h=e("img",{src:"https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png",alt:"img",tabindex:"0",loading:"lazy"},null,-1),b=e("figcaption",null,"img",-1),x=i("<p>题目数据 <strong>保证</strong> 整个链式结构中不存在环。</p><p><strong>注意</strong>，函数返回结果后，链表必须 <strong>保持其原始结构</strong> 。</p><p><strong>自定义评测：</strong></p><p><strong>评测系统</strong> 的输入如下（你设计的程序 <strong>不适用</strong> 此输入）：</p><ul><li><code>intersectVal</code> - 相交的起始节点的值。如果不存在相交节点，这一值为 <code>0</code></li><li><code>listA</code> - 第一个链表</li><li><code>listB</code> - 第二个链表</li><li><code>skipA</code> - 在 <code>listA</code> 中（从头节点开始）跳到交叉节点的节点数</li><li><code>skipB</code> - 在 <code>listB</code> 中（从头节点开始）跳到交叉节点的节点数</li></ul><p>评测系统将根据这些输入创建链式数据结构，并将两个头节点 <code>headA</code> 和 <code>headB</code> 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 <strong>视作正确答案</strong> 。</p><p><strong>示例 1：</strong></p>",7),B={href:"https://assets.leetcode.com/uploads/2018/12/13/160_example_1.png",target:"_blank",rel:"noopener noreferrer"},A=e("img",{src:"https://assets.leetcode.com/uploads/2021/03/05/160_example_1_1.png",alt:"img",tabindex:"0",loading:"lazy"},null,-1),f=e("figcaption",null,"img",-1),k=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at &#39;8&#39;
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
— 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向相同的位置。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>`,2),V={href:"https://assets.leetcode.com/uploads/2018/12/13/160_example_2.png",target:"_blank",rel:"noopener noreferrer"},N=e("img",{src:"https://assets.leetcode.com/uploads/2021/03/05/160_example_2.png",alt:"img",tabindex:"0",loading:"lazy"},null,-1),y=e("figcaption",null,"img",-1),L=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at &#39;2&#39;
解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>`,2),I={href:"https://assets.leetcode.com/uploads/2018/12/13/160_example_3.png",target:"_blank",rel:"noopener noreferrer"},z=e("img",{src:"https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_3.png",alt:"img",tabindex:"0",loading:"lazy"},null,-1),E=e("figcaption",null,"img",-1),w=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>listA</code> 中节点数目为 <code>m</code></li><li><code>listB</code> 中节点数目为 <code>n</code></li><li><code>1 &lt;= m, n &lt;= 3 * 104</code></li><li><code>1 &lt;= Node.val &lt;= 105</code></li><li><code>0 &lt;= skipA &lt;= m</code></li><li><code>0 &lt;= skipB &lt;= n</code></li><li>如果 <code>listA</code> 和 <code>listB</code> 没有交点，<code>intersectVal</code> 为 <code>0</code></li><li>如果 <code>listA</code> 和 <code>listB</code> 有交点，<code>intersectVal == listA[skipA] == listB[skipB]</code></li></ul><p>**进阶：**你能否设计一个时间复杂度 <code>O(m + n)</code> 、仅用 <code>O(1)</code> 内存的解决方案？</p><p>通过次数558,473</p><p>提交次数883,535</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA;
        ListNode b = headB;
        while(a!=b){
            a = a==null? headB:a.next;
            b = b==null? headA:b.next;
        }
        return a;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function O(S,C){const s=c("ExternalLinkIcon");return d(),o("div",null,[e("h4",r,[u,n(),e("a",p,[n("160. 相交链表"),l(s)])]),_,m,g,e("figure",null,[e("a",v,[h,l(s)]),b]),x,e("figure",null,[e("a",B,[A,l(s)]),f]),k,e("figure",null,[e("a",V,[N,l(s)]),y]),L,e("figure",null,[e("a",I,[z,l(s)]),E]),w])}const T=t(a,[["render",O],["__file","160.html.vue"]]);export{T as default};
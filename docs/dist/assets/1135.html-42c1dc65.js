import{_ as t,V as p,W as o,Y as n,Z as s,$ as e,a0 as c,D as l}from"./framework-3845b112.js";const i={},u={id:"_1135-最低成本联通所有城市",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_1135-最低成本联通所有城市","aria-hidden":"true"},"#",-1),r={href:"https://leetcode.cn/problems/connecting-cities-with-minimum-cost/",target:"_blank",rel:"noopener noreferrer"},d=c(`<p>难度中等95</p><p>想象一下你是个城市基建规划者，地图上有 <code>n</code> 座城市，它们按以 <code>1</code> 到 <code>n</code> 的次序编号。</p><p>给你整数 <code>n</code> 和一个数组 <code>conections</code>，其中 <code>connections[i] = [xi, yi, costi]</code> 表示将城市 <code>xi</code> 和城市 <code>yi</code> 连接所要的<code>costi</code>（<strong>连接是双向的</strong>）。</p><p>返回连接所有城市的<strong>最低成本</strong>，每对城市之间<strong>至少</strong>有一条路径。如果无法连接所有 <code>n</code> 个城市，返回 <code>-1</code></p><p>该 <strong>最小成本</strong> 应该是所用全部连接成本的总和。</p><p><strong>示例 1：</strong></p><figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/07/27/1314_ex2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：n = 3, conections = [[1,2,5],[1,3,6],[2,3,1]]
输出：6
解释：选出任意 2 条边都可以连接所有城市，我们从中选取成本最小的 2 条。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/07/27/1314_ex1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：n = 4, conections = [[1,2,3],[3,4,4]]
输出：-1
解释：即使连通所有的边，也无法连接所有城市。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>1 &lt;= n &lt;= 104</code></li><li><code>1 &lt;= connections.length &lt;= 104</code></li><li><code>connections[i].length == 3</code></li><li><code>1 &lt;= xi, yi &lt;= n</code></li><li><code>xi != yi</code></li><li><code>0 &lt;= costi &lt;= 105</code></li></ul><p>通过次数11,054</p><p>提交次数19,225</p><p>采用prim算法解决</p><p>具体思路是</p><p><strong>1.从某一个点开始 寻找当前该点可以访问的所有的边</strong></p><p><strong>2.在目前所有边的集合里找到最小的边 这个边必须有一个点 未被访问过</strong></p><p><strong>3.寻找当前集合可以访问的所有边 直到没有新的点可以加入</strong></p><p><strong>4.此时所有的边构成的树就为最小生成树</strong></p><h3 id="方法一" tabindex="-1"><a class="header-anchor" href="#方法一" aria-hidden="true">#</a> 方法一：</h3><p>PQ implement prim</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">minimumCost</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> connections<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> costs <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;&gt;</span> graph <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PriorityQueue</span><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> pq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token operator">-&gt;</span>a<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">-</span>b<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//用来pop路径费用最小值</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> visited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//用来避免走回头路</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> con<span class="token operator">:</span>connections<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> from <span class="token operator">=</span> con<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> <span class="token keyword">to</span> <span class="token operator">=</span> con<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> cost <span class="token operator">=</span> con<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            graph<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>from<span class="token punctuation">,</span>k<span class="token operator">-&gt;</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token keyword">to</span><span class="token punctuation">,</span>cost<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            graph<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span><span class="token keyword">to</span><span class="token punctuation">,</span>k<span class="token operator">-&gt;</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>from<span class="token punctuation">,</span>cost<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        pq<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//BFS</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>pq<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cur <span class="token operator">=</span> pq<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> from <span class="token operator">=</span> cur<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> <span class="token keyword">to</span> <span class="token operator">=</span> cur<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> cost <span class="token operator">=</span> cur<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">to</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                costs <span class="token operator">+=</span> cost<span class="token punctuation">;</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nei<span class="token operator">:</span>graph<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">to</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    pq<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token keyword">to</span><span class="token punctuation">,</span>nei<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>nei<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> visited<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span>n<span class="token operator">?</span>costs<span class="token operator">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24);function m(v,g){const a=l("ExternalLinkIcon");return p(),o("div",null,[n("h4",u,[k,s(),n("a",r,[s("1135. 最低成本联通所有城市"),e(a)])]),d])}const y=t(i,[["render",m],["__file","1135.html.vue"]]);export{y as default};
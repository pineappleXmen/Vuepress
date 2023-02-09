import{_ as d,V as t,W as s,Y as e,Z as n,$ as l,a0 as r,D as o}from"./framework-3845b112.js";const c={},a={id:"_127-单词接龙",tabindex:"-1"},v=e("a",{class:"header-anchor",href:"#_127-单词接龙","aria-hidden":"true"},"#",-1),u={href:"https://leetcode.cn/problems/word-ladder/",target:"_blank",rel:"noopener noreferrer"},g=r(`<p>难度困难1140</p><p>字典 <code>wordList</code> 中从单词 <code>beginWord</code> 和 <code>endWord</code> 的 <strong>转换序列</strong> 是一个按下述规格形成的序列 <code>beginWord -&gt; s1 -&gt; s2 -&gt; ... -&gt; sk</code>：</p><ul><li>每一对相邻的单词只差一个字母。</li><li>对于 <code>1 &lt;= i &lt;= k</code> 时，每个 <code>si</code> 都在 <code>wordList</code> 中。注意， <code>beginWord</code> 不需要在 <code>wordList</code> 中。</li><li><code>sk == endWord</code></li></ul><p>给你两个单词 <code>beginWord</code> 和 <code>endWord</code> 和一个字典 <code>wordList</code> ，返回 <em>从 <code>beginWord</code> 到 <code>endWord</code> 的 <strong>最短转换序列</strong> 中的 <strong>单词数目</strong></em> 。如果不存在这样的转换序列，返回 <code>0</code> 。</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]
输出：5
解释：一个最短转换序列是 &quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; &quot;cog&quot;, 返回它的长度 5。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]
输出：0
解释：endWord &quot;cog&quot; 不在字典中，所以无法进行转换。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>1 &lt;= beginWord.length &lt;= 10</code></li><li><code>endWord.length == beginWord.length</code></li><li><code>1 &lt;= wordList.length &lt;= 5000</code></li><li><code>wordList[i].length == beginWord.length</code></li><li><code>beginWord</code>、<code>endWord</code> 和 <code>wordList[i]</code> 由小写英文字母组成</li><li><code>beginWord != endWord</code></li><li><code>wordList</code> 中的所有字符串 <strong>互不相同</strong></li></ul><p>通过次数167,057</p><p>提交次数347,877</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Solution {
    public int ladderLength(String beginWord, String endWord, List&lt;String&gt; wordListInput) {
        //双向BFS
        Set&lt;String&gt; beginSet =new HashSet&lt;&gt;(),endSet = new HashSet&lt;&gt;(wordList);
        Set&lt;String&gt; wordList =new HashSet&lt;&gt;(wordListInput);
        Set&lt;String&gt; visited = new HashSet&lt;&gt;();
        if(!wordList.contains(endWord)) return 0;
        int step=1,N=beginWord.length();
        beginSet.add(beginWord);
        endSet.add(endWord);
        while(!beginSet.isEmpty()&amp;&amp;!endSet.isEmpty()){
            Set&lt;String&gt; nextSet =new HashSet&lt;&gt;();
            for(String word:beginSet){
                char[] chs= word.toCharArray();
                for(int i=0;i&lt;N;i++)
                    for(char c=&#39;a&#39;;c&lt;=&#39;z&#39;;c++){
                        char pre = chs[i];
                        chs[i]=c;
                        String nextWord =new String(chs);
                        if(endSet.contains(nextWord)) return step+1;
                        if(visited.add(nextWord)&amp;&amp;wordList.contains(nextWord))
                            nextSet.add(nextWord);
                        chs[i]=pre;
                    }
            }
            if(endSet.size()&lt;nextSet.size()){
                beginSet =endSet;
                endSet=nextSet;
                
            }else beginSet=nextSet;
            step++;
            
        }return 0;
        
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>双向BFS优化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Solution {
    public int ladderLength(String beginWord, String endWord, List&lt;String&gt; wordListInput) {
        //双向BFS
        Set&lt;String&gt; beginSet =new HashSet&lt;&gt;(),endSet = new HashSet&lt;&gt;();
        Set&lt;String&gt; wordList =new HashSet&lt;&gt;(wordListInput);
        Set&lt;String&gt; visited = new HashSet&lt;&gt;();
        if(!wordList.contains(endWord)) return 0;
        int step=1,N=beginWord.length();
        beginSet.add(beginWord);
        endSet.add(endWord);
        while(!beginSet.isEmpty()&amp;&amp;!endSet.isEmpty()){
            Set&lt;String&gt; nextSet =new HashSet&lt;&gt;();
            for(String word:beginSet){
                char[] chs= word.toCharArray();
                for(int i=0;i&lt;N;i++)
                    for(char c=&#39;a&#39;;c&lt;=&#39;z&#39;;c++){
                        char pre = chs[i];
                        chs[i]=c;
                        String nextWord =new String(chs);
                        if(endSet.contains(nextWord)) return step+1;
                        if(visited.add(nextWord)&amp;&amp;wordList.contains(nextWord))
                            nextSet.add(nextWord);
                        chs[i]=pre;
                    }
            }
            if(endSet.size()&lt;nextSet.size()){
                beginSet =endSet;
                endSet=nextSet;
                
            }else beginSet=nextSet;
            step++;
            
        }return 0;
        
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function b(m,S){const i=o("ExternalLinkIcon");return t(),s("div",null,[e("h4",a,[v,n(),e("a",u,[n("127. 单词接龙"),l(i)])]),g])}const p=d(c,[["render",b],["__file","127.html.vue"]]);export{p as default};

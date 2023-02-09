<template><div><h4 id="_127-单词接龙" tabindex="-1"><a class="header-anchor" href="#_127-单词接龙" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/word-ladder/" target="_blank" rel="noopener noreferrer">127. 单词接龙<ExternalLinkIcon/></a></h4>
<p>难度困难1140</p>
<p>字典 <code v-pre>wordList</code> 中从单词 <code v-pre>beginWord</code> 和 <code v-pre>endWord</code> 的 <strong>转换序列</strong> 是一个按下述规格形成的序列 <code v-pre>beginWord -&gt; s1 -&gt; s2 -&gt; ... -&gt; sk</code>：</p>
<ul>
<li>每一对相邻的单词只差一个字母。</li>
<li>对于 <code v-pre>1 &lt;= i &lt;= k</code> 时，每个 <code v-pre>si</code> 都在 <code v-pre>wordList</code> 中。注意， <code v-pre>beginWord</code> 不需要在 <code v-pre>wordList</code> 中。</li>
<li><code v-pre>sk == endWord</code></li>
</ul>
<p>给你两个单词 <code v-pre>beginWord</code> 和 <code v-pre>endWord</code> 和一个字典 <code v-pre>wordList</code> ，返回 <em>从 <code v-pre>beginWord</code> 到 <code v-pre>endWord</code> 的 <strong>最短转换序列</strong> 中的 <strong>单词数目</strong></em> 。如果不存在这样的转换序列，返回 <code v-pre>0</code> 。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：5
解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
输出：0
解释：endWord "cog" 不在字典中，所以无法进行转换。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>1 &lt;= beginWord.length &lt;= 10</code></li>
<li><code v-pre>endWord.length == beginWord.length</code></li>
<li><code v-pre>1 &lt;= wordList.length &lt;= 5000</code></li>
<li><code v-pre>wordList[i].length == beginWord.length</code></li>
<li><code v-pre>beginWord</code>、<code v-pre>endWord</code> 和 <code v-pre>wordList[i]</code> 由小写英文字母组成</li>
<li><code v-pre>beginWord != endWord</code></li>
<li><code v-pre>wordList</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>
<p>通过次数167,057</p>
<p>提交次数347,877</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Solution {
    public int ladderLength(String beginWord, String endWord, List&lt;String> wordListInput) {
        //双向BFS
        Set&lt;String> beginSet =new HashSet&lt;>(),endSet = new HashSet&lt;>(wordList);
        Set&lt;String> wordList =new HashSet&lt;>(wordListInput);
        Set&lt;String> visited = new HashSet&lt;>();
        if(!wordList.contains(endWord)) return 0;
        int step=1,N=beginWord.length();
        beginSet.add(beginWord);
        endSet.add(endWord);
        while(!beginSet.isEmpty()&amp;&amp;!endSet.isEmpty()){
            Set&lt;String> nextSet =new HashSet&lt;>();
            for(String word:beginSet){
                char[] chs= word.toCharArray();
                for(int i=0;i&lt;N;i++)
                    for(char c='a';c&lt;='z';c++){
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>双向BFS优化</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Solution {
    public int ladderLength(String beginWord, String endWord, List&lt;String> wordListInput) {
        //双向BFS
        Set&lt;String> beginSet =new HashSet&lt;>(),endSet = new HashSet&lt;>();
        Set&lt;String> wordList =new HashSet&lt;>(wordListInput);
        Set&lt;String> visited = new HashSet&lt;>();
        if(!wordList.contains(endWord)) return 0;
        int step=1,N=beginWord.length();
        beginSet.add(beginWord);
        endSet.add(endWord);
        while(!beginSet.isEmpty()&amp;&amp;!endSet.isEmpty()){
            Set&lt;String> nextSet =new HashSet&lt;>();
            for(String word:beginSet){
                char[] chs= word.toCharArray();
                for(int i=0;i&lt;N;i++)
                    for(char c='a';c&lt;='z';c++){
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>



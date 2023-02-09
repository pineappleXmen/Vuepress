import{_ as n,V as s,W as d,Y as t,Z as e,$ as l,a0 as r,D as a}from"./framework-3845b112.js";const u={},o={id:"_17-电话号码的字母组合",tabindex:"-1"},c=t("a",{class:"header-anchor",href:"#_17-电话号码的字母组合","aria-hidden":"true"},"#",-1),v={href:"https://leetcode.cn/problems/letter-combinations-of-a-phone-number/",target:"_blank",rel:"noopener noreferrer"},m=r(`<p>难度中等2055</p><p>给定一个仅包含数字 <code>2-9</code> 的字符串，返回所有它能表示的字母组合。答案可以按 <strong>任意顺序</strong> 返回。</p><p>给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。</p><figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/11/09/200px-telephone-keypad2svg.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：digits = &quot;23&quot;
输出：[&quot;ad&quot;,&quot;ae&quot;,&quot;af&quot;,&quot;bd&quot;,&quot;be&quot;,&quot;bf&quot;,&quot;cd&quot;,&quot;ce&quot;,&quot;cf&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：digits = &quot;&quot;
输出：[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：digits = &quot;2&quot;
输出：[&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>0 &lt;= digits.length &lt;= 4</code></li><li><code>digits[i]</code> 是范围 <code>[&#39;2&#39;, &#39;9&#39;]</code> 的一个数字。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Solution {
	//一个映射表，第二个位置是&quot;abc“,第三个位置是&quot;def&quot;。。。
	//这里也可以用map，用数组可以更节省点内存
	String[] letter_map = {&quot; &quot;,&quot;*&quot;,&quot;abc&quot;,&quot;def&quot;,&quot;ghi&quot;,&quot;jkl&quot;,&quot;mno&quot;,&quot;pqrs&quot;,&quot;tuv&quot;,&quot;wxyz&quot;};
	public List&lt;String&gt; letterCombinations(String digits) {
		//注意边界条件
		if(digits==null || digits.length()==0) {
			return new ArrayList&lt;&gt;();
		}
		iterStr(digits, new StringBuilder(), 0);
		return res;
	}
	//最终输出结果的list
	List&lt;String&gt; res = new ArrayList&lt;&gt;();
	
	//递归函数
	void iterStr(String str, StringBuilder letter, int index) {
		//递归的终止条件，注意这里的终止条件看上去跟动态演示图有些不同，主要是做了点优化
		//动态图中是每次截取字符串的一部分，&quot;234&quot;，变成&quot;23&quot;，再变成&quot;3&quot;，最后变成&quot;&quot;，这样性能不佳
		//而用index记录每次遍历到字符串的位置，这样性能更好
		if(index == str.length()) {
			res.add(letter.toString());
			return;
		}
		//获取index位置的字符，假设输入的字符是&quot;234&quot;
		//第一次递归时index为0所以c=2，第二次index为1所以c=3，第三次c=4
		//subString每次都会生成新的字符串，而index则是取当前的一个字符，所以效率更高一点
		char c = str.charAt(index);
		//map_string的下表是从0开始一直到9， c-&#39;0&#39;就可以取到相对的数组下标位置
		//比如c=2时候，2-&#39;0&#39;，获取下标为2,letter_map[2]就是&quot;abc&quot;
		int pos = c - &#39;0&#39;;
		String map_string = letter_map[pos];
		//遍历字符串，比如第一次得到的是2，页就是遍历&quot;abc&quot;
		for(int i=0;i&lt;map_string.length();i++) {
			//调用下一层递归，用文字很难描述，请配合动态图理解
            letter.append(map_string.charAt(i));
            //如果是String类型做拼接效率会比较低
			//iterStr(str, letter+map_string.charAt(i), index+1);
            iterStr(str, letter, index+1);
            letter.deleteCharAt(letter.length()-1);
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function b(g,q){const i=a("ExternalLinkIcon");return s(),d("div",null,[t("h4",o,[c,e(),t("a",v,[e("17. 电话号码的字母组合"),l(i)])]),m])}const x=n(u,[["render",b],["__file","17.html.vue"]]);export{x as default};

<template><div><h1 id="动态规划" tabindex="-1"><a class="header-anchor" href="#动态规划" aria-hidden="true">#</a> 动态规划</h1>
<h4 id="动态规划-1" tabindex="-1"><a class="header-anchor" href="#动态规划-1" aria-hidden="true">#</a> 动态规划</h4>
<table>
<thead>
<tr>
<th style="text-align:left">题号题目</th>
<th>类型</th>
<th>难度</th>
<th>状态说明</th>
<th>状态转移方程</th>
<th>链接</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/meafa8eevhQnvZW9mCpTpx" title="509. 斐波那契数" target="_blank" rel="noopener noreferrer">509. 斐波那契数<ExternalLinkIcon/></a></td>
<td>单序列,坐标型</td>
<td>简单</td>
<td>i表示第i个斐波那契数</td>
<td>dp[i]=dp[i-1]+dp[i-2]</td>
<td><a href="https://leetcode.cn/problems/fibonacci-number/" title="https://leetcode.cn/problems/fibonacci-number/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/fibonacci-number/<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/5tkzpwMRkfcuF6LboGPRBR" title="70.爬楼梯" target="_blank" rel="noopener noreferrer">70.爬楼梯<ExternalLinkIcon/></a></td>
<td>单序列,坐标型</td>
<td>简单</td>
<td>i表示第i级台阶</td>
<td>dp[i]=dp[i-1]+dp[i-2]</td>
<td><a href="https://leetcode.cn/problems/climbing-stairs/" title="https://leetcode.cn/problems/climbing-stairs/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/climbing-stairs/<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/2TmDF6VRXYwW2esxLwec4s" title="746. 使用最小花费爬楼梯" target="_blank" rel="noopener noreferrer">746. 使用最小花费爬楼梯<ExternalLinkIcon/></a></td>
<td>单序列,坐标型</td>
<td>简单</td>
<td>i表示第i级台阶</td>
<td>dp[i]=min(dp[i−1]+cost[i−1],dp[i−2]+cost[i−2])</td>
<td><a href="https://leetcode.cn/problems/min-cost-climbing-stairs/" title="https://leetcode.cn/problems/min-cost-climbing-stairs/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/min-cost-climbing-stairs/<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/jEm1ky3Fx539xSCMLcQzzL" title="264. 丑数 II" target="_blank" rel="noopener noreferrer">264. 丑数 II<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>中等</td>
<td>dp[i]表示第i个丑数</td>
<td>dp[i] = min(dp[p2] * 2, dp[p3] * 3, dp[p5] * 5)</td>
<td><a href="https://leetcode.cn/problems/ugly-number-ii/" title="https://leetcode.cn/problems/ugly-number-ii/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/ugly-number-ii/<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/5RP5fwU98TPgyjKX61qYYr" title="剑指 Offer 60. n个骰子的点数" target="_blank" rel="noopener noreferrer">剑指 Offer 60. n个骰子的点数<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>中等</td>
<td>dp[i][j]为第i次掷骰子时点数j出现的次数</td>
<td>dp[i][j] = sum(dp[i-1][j-k]) k=1~6 and j-k&gt;=1</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/2RT83FSHw2ccUWASkRCsb5" title="剑指 Offer 42. 连续子数组的最大和" target="_blank" rel="noopener noreferrer">剑指 Offer 42. 连续子数组的最大和<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>中等</td>
<td>dp[i] 表示以元素 nums[i] 为结尾的连续子数组最大和</td>
<td>dp[i] = max(nums[i], dp[i-1] + nums[i])</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/78MVFQPtYwWCCVNBHuWxuw" title="121.买卖股票的最佳时机" target="_blank" rel="noopener noreferrer">121.买卖股票的最佳时机<ExternalLinkIcon/></a></td>
<td>单序列,坐标型</td>
<td>简单</td>
<td>dp[i] 表示第 i 天的最大利润</td>
<td>minprice = min(minprice, prices[i])
dp[i] = max(dp[i - 1], prices[i] - minprice)</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/5WH9hmvfcXdJFDAChaLG4b" title="122.买卖股票的最佳时机 II" target="_blank" rel="noopener noreferrer">122.买卖股票的最佳时机 II<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>中等</td>
<td>dp[i][0] 表示第 i 天交易完后手里没有股票时的最大利润
dp[i][1] 表示第 i 天交易完后手里持有一支股票时的最大利润</td>
<td>dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i])
dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i])</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/gJw9AixrZt9eZXUvKswLYE" title="123. 买卖股票的最佳时机 III" target="_blank" rel="noopener noreferrer">123. 买卖股票的最佳时机 III<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>困难</td>
<td>buy1表示第一次购买、sell1表示第一次售卖、buy2表示第二次购买、sell2表示第二次售卖</td>
<td>buy1 = Math.max(buy1, -prices[i]);
sell1 = Math.max(sell1, buy1 + prices[i]);
buy2 = Math.max(buy2, sell1 - prices[i]);
sell2 = Math.max(sell2, buy2 + prices[i]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/fFd5eXpKdvNVgishDmauND" title="188. 买卖股票的最佳时机 IV" target="_blank" rel="noopener noreferrer">188. 买卖股票的最佳时机 IV<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>困难</td>
<td>buy[i][j]表示在第i天刚好进行j次交易时 持有股票的最大收益</td>
<td>buy[i][j] = Math.max(buy[i - 1][j], sell[i - 1][j] - prices[i]);
sell[i][j] = Math.max(sell[i - 1][j], buy[i - 1][j - 1] + prices[i]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/negBcLggHie6Tx68NjnGqa" title="309. 最佳买卖股票时机含冷冻期" target="_blank" rel="noopener noreferrer">309. 最佳买卖股票时机含冷冻期<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>中等</td>
<td>dp[i][0]: 手上持有股票的最大收益
dp[i][1]: 手上不持有股票，并且处于冷冻期中的累计最大收益
dp[i][2]: 手上不持有股票，并且不在冷冻期中的累计最大收益</td>
<td>dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i]);
dp[i][1] = dp[i - 1][0] + prices[i];
dp[i][2] = Math.max(dp[i - 1][1], dp[i - 1][2]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/o645AjGNJgKcqNMpZ2wbGL" title="714. 买卖股票的最佳时机含手续费" target="_blank" rel="noopener noreferrer">714. 买卖股票的最佳时机含手续费<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>中等</td>
<td>dp[i][0] 表示第 i 天交易完后手里没有股票时的最大利润
dp[i][1] 表示第 i 天交易完后手里持有一支股票时的最大利润</td>
<td>dp[i][0]=Math.max(dp[i-1][0],dp[i-1][1]+prices[i]-fee);
dp[i][1]=Math.max(dp[i-1][1],dp[i-1][0]-prices[i]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/4T28cdfR6XEcxZGySjAby2" title="62. 不同路径" target="_blank" rel="noopener noreferrer">62. 不同路径<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>中等</td>
<td>dp[i][j]表示到坐标i，j时的不同路径数</td>
<td>if(i&gt;0&amp;&amp;j&gt;0)
dp[i][j] = dp[i-1][j]+dp[i][j-1];
else if(i&gt;0) dp[i][j]=dp[i-1][j];
else if(j&gt;0) dp[i][j]=dp[i][j-1];</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/9Gr4vN2E64EoSDoCchJLJj" title="63. 不同路径 II" target="_blank" rel="noopener noreferrer">63. 不同路径 II<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>中等</td>
<td>dp[i][j]表示到坐标i，j时的不同路径数</td>
<td>if (grid[i][j] != 1) 
 f[i][j] = f[i - 1][j] + f[i][j - 1];              
</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/ew1e2nA8YcX8AF9rZMkFhj" title="64. 最小路径和" target="_blank" rel="noopener noreferrer">64. 最小路径和<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>中等</td>
<td>dp[i][j]表示i，j位置的最小路径</td>
<td>dp[i][j]=Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j];</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/56FfM9qtrsMuTDFKUHLFgB" title="174. 地下城游戏" target="_blank" rel="noopener noreferrer">174. 地下城游戏<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>困难</td>
<td>从终点往起点反向dp dp[i][j]表示到达i，j位置时最少需要的血量</td>
<td>dp[i][j] = Math.max(Math.min(dp[i+1][j],dp[i][j+1])-dungeon[i][j],1);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/oMZYU2C1tvniNRaaquxPwU" title="329. 矩阵中的最长递增路径" target="_blank" rel="noopener noreferrer">329. 矩阵中的最长递增路径<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>困难</td>
<td>i，j表示到达i，j时的最长递增路径</td>
<td>dp[i][j] = max(dp[i][j], dp[nextI][nextJ] + 1)
nextI, nextJ = [(i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)]</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/7v11snz7cY9DwbCoN9UZDk" title="656. 金币路径" target="_blank" rel="noopener noreferrer">656. 金币路径<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>困难</td>
<td>dp[i]表示到达i处需要花费的最少金币（反向）</td>
<td>dp[i] = dp[j] + coins[i]</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/4QyHmm57V2HzDEBPf7pGh" title="198. 打家劫舍" target="_blank" rel="noopener noreferrer">198. 打家劫舍<ExternalLinkIcon/></a></td>
<td>单序列,路径型</td>
<td>中等</td>
<td>dp[i]表示到达第i家时获得的最大收益</td>
<td>dp[i]=Math.max(dp[i-2]+nums[i],dp[i-1]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/dnwUdpo7BorKVuzV7w4Yi6" title="213. 打家劫舍 II" target="_blank" rel="noopener noreferrer">213. 打家劫舍 II<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>中等</td>
<td>将区间分为0-n-1、1-n两份对两份分别使用198的方法</td>
<td>dp[i]=Math.max(dp[i-2]+nums[i],dp[i-1]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/o2qyVa1oggJpNm5cLCSUvw" title="276. 栅栏涂色" target="_blank" rel="noopener noreferrer">276. 栅栏涂色<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>中等</td>
<td>dp[i]表示第i个栅栏的方法 如果与dp[i-1]不同，则有k-1种方法、如果与dp[i-1]相同，需要保证i-1与i-2不同i-1就有k-1种方法 同理i也有k-1种解法</td>
<td>dp[i] = dp[i - 1] * (k - 1) + dp[i - 2] * (k - 1) =(dp[i−2]+dp[i−1])∗(k−1)

</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/9cbDqVnqxiWbxcJnuof2ve" title="120. 三角形最小路径和" target="_blank" rel="noopener noreferrer">120. 三角形最小路径和<ExternalLinkIcon/></a></td>
<td>路径型</td>
<td>中等</td>
<td>f[i][j]f[i][j] 表示从三角形顶部走到位置 (i, j)(i,j) 的最小路径和。</td>
<td>f[i][j]=min(f[i−1][j−1],f[i−1][j])+c[i][j]</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/sTQ7YNG6XJaY1VkPX3kqbQ" title="322. 零钱兑换" target="_blank" rel="noopener noreferrer">322. 零钱兑换<ExternalLinkIcon/></a></td>
<td>背包型,完全背包</td>
<td>中等</td>
<td>dp[i][j]表示对于前i种硬币，取出amount为j的最少硬币取法（完全背包）可以优化为一维dp[i]表示对于amount为i的最少取法</td>
<td>dp[i][j]=Math.min(dp[i][j],dp[i][j-coins[i-1]]+1);或者采用一维 dp[i] = Math.min(dp[i], dp[i - coin] + 1);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/bfbXGTakWYB3vRBEUbu2EX" title="518. 零钱兑换 II" target="_blank" rel="noopener noreferrer">518. 零钱兑换 II<ExternalLinkIcon/></a></td>
<td>背包型,完全背包</td>
<td>中等</td>
<td>dp[i]表示对于目标钱数i 有多少种可能</td>
<td>dp[i] += dp[i - coin];</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/i2B8sFBMGsnT21cFaQzQTF" title="474. 一和零" target="_blank" rel="noopener noreferrer">474. 一和零<ExternalLinkIcon/></a></td>
<td>背包型,01背包</td>
<td>中等</td>
<td>01背包  dp[i][j]表示0的容量为i ，1的容量为j的子集中的最大个数</td>
<td>dp[i][j]=Math.max(dp[i][j],dp[i-Zeros][j-Ones]+1);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/7yGsk6gW2AJS4AWkr7TbUz" title="416. 分割等和子集" target="_blank" rel="noopener noreferrer">416. 分割等和子集<ExternalLinkIcon/></a></td>
<td>背包型,01背包</td>
<td>中等</td>
<td>01背包 dp[i]表示目标和为i时是否可以分割成功</td>
<td>dp[i]=dp[i]||dp[i-num];</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/agPEXT2YvWco4XtsUwuFyj" title="1049. 最后一块石头的重量 II" target="_blank" rel="noopener noreferrer">1049. 最后一块石头的重量 II<ExternalLinkIcon/></a></td>
<td>背包型,01背包</td>
<td>中等</td>
<td>01背包 背包容量为sum/2 找到最大值  答案就为 sum-2*dp[n] dp[i]表示容量为i时的最小答案</td>
<td>dp[i]=Math.max(dp[i],dp[i-stone]+stone);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/7ZAtEMtvCnsdJZZyiPsaGw" title="494. 目标和" target="_blank" rel="noopener noreferrer">494. 目标和<ExternalLinkIcon/></a></td>
<td>背包型,01背包</td>
<td>中等</td>
<td>将加数拆分为两块 一块为加数写作a 一块为减数为b 则最终target应该等于a-b=target  而a+b=sum两式相加得a=（S+sum）/2剩下的一半即为减数 所以题目就变成求解 背包容量为a的种类数</td>
<td>dp[i]+=dp[i-num];</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/mAnXjVKs6NAXs3WWSzdaw7" title="377. 组合总和 Ⅳ" target="_blank" rel="noopener noreferrer">377. 组合总和 Ⅳ<ExternalLinkIcon/></a></td>
<td>背包型,01背包</td>
<td>中等</td>
<td>同494</td>
<td>dp[i]+=dp[i-num];</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/j6qCYjL9pmWpa52DaTzUH4" title="115. 不同的子序列" target="_blank" rel="noopener noreferrer">115. 不同的子序列<ExternalLinkIcon/></a></td>
<td>双序列</td>
<td>困难</td>
<td>dp[i][j]表示在target的前j个字符在s的前i个字符中出现的次数</td>
<td>if(s.charAt(i-1)==t.charAt(j-1))
dp[i][j]=dp[i-1][j]+dp[i-1][j-1];
 else
dp[i][j]=dp[i-1][j];</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/3ipEmbarEp7EdPHK1UxWCt" title="91. 解码方法" target="_blank" rel="noopener noreferrer">91. 解码方法<ExternalLinkIcon/></a></td>
<td>单序列</td>
<td>中等</td>
<td>通过dfs recursive方式记录搜索结果 memo[i]表示i...length的解码方法个数</td>
<td>memo[i]=dfs(s,i+1,memo)+dfs(s,i+2,memo);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/gATXamtVwk2KaGvLyc5W9X" title="139. 单词拆分" target="_blank" rel="noopener noreferrer">139. 单词拆分<ExternalLinkIcon/></a></td>
<td>单序列</td>
<td>中等</td>
<td>dp[i]记录索引到i时字典是否包含该单词</td>
<td>dfs或iterative way</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/jqqsoac3k6sYcbr8u8cVo7" title="140. 单词拆分 II" target="_blank" rel="noopener noreferrer">140. 单词拆分 II<ExternalLinkIcon/></a></td>
<td>单序列</td>
<td>困难</td>
<td>同上 需要记录答案</td>
<td></td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/razhWimkHjBhsxMteuExjg" title="53. 最大子数组和" target="_blank" rel="noopener noreferrer">53. 最大子数组和<ExternalLinkIcon/></a></td>
<td>单序列</td>
<td>简单</td>
<td>dp[i]表示到达i位置时前i个元素的最大子数组和为多少</td>
<td>dp[i]=max(dp[i-1],dp[i]+num[i])</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/iGiYbjfp7caFuiioSnS1hx" title="152. 乘积最大子数组" target="_blank" rel="noopener noreferrer">152. 乘积最大子数组<ExternalLinkIcon/></a></td>
<td>单序列</td>
<td>中等</td>
<td>维护一个maxdp和一个mindp 如果当前数大于0则max为nums*max</td>
<td>if(nums[i]&gt;0)          max[i]=Math.max(nums[i],nums[i]<em>max[i-1]);
min[i]=Math.min(nums[i],nums[i]</em> min[i-1]);
else{
max[i]=Math.max(nums[i],nums[i]<em>min[i-1]);
min[i]=Math.min(nums[i],nums[i]</em> max[i-1]);
}</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/jVFMw5XbH6HCy3kEX2kDXX" title="300. 最长递增子序列" target="_blank" rel="noopener noreferrer">300. 最长递增子序列<ExternalLinkIcon/></a></td>
<td>单序列</td>
<td>中等</td>
<td>维护一个单调栈 有比末尾数字大的数进来时 在dp中通过二分法寻找插入位置 最后返回size就是答案 dp[i]为构造的答案</td>
<td></td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/tiAJTHUBrr2RWzJqqEJ57K" title="1713. 得到子序列的最少操作次数" target="_blank" rel="noopener noreferrer">1713. 得到子序列的最少操作次数<ExternalLinkIcon/></a></td>
<td>单序列</td>
<td>困难</td>
<td>利用300题解 计算target序列的下标的最长递增子序列数 target-res即为</td>
<td>同300</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/uahGXKduDVnW79cF9dsaEM" title="97. 交错字符串" target="_blank" rel="noopener noreferrer">97. 交错字符串<ExternalLinkIcon/></a></td>
<td>双序列</td>
<td>中等</td>
<td>dp[i][j]表示s1的前i个和s2的前j个字符能否组成s3的前i+j个字符 如果能则true</td>
<td>dp[i][j]=(s3.charAt(i+j-1)==s1.charAt(i-1)&amp;&amp;dp[i-1][j])||(s3.charAt(i+j-1)==s2.charAt(j-1)&amp;&amp;dp[i][j-1]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/8V6pYUDe8obGMTAbM7MhiU" title="72. 编辑距离" target="_blank" rel="noopener noreferrer">72. 编辑距离<ExternalLinkIcon/></a></td>
<td>双序列</td>
<td>困难</td>
<td>dp[i][j]表示a的前i个和b的前j个之间的编辑距离   A后有三种可能 a的char与b相等 则直接拿i-1，j-1即可， a删除一个与b相等，a替换一个与b相等，a插入一个与b相等</td>
<td>if(word1.charAt(i-1)==word2.charAt(j-1))
dp[i][j]=dp[i-1][j-1];
 else
dp[i][j]=Math.min(Math.min(dp[i-1][j]+1,dp[i][j-1]+1),dp[i-1][j-1]+1);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/j6jn8NdbJPfAmCaGVd1fvD" title="1143. 最长公共子序列 lcs" target="_blank" rel="noopener noreferrer">1143. 最长公共子序列 lcs<ExternalLinkIcon/></a></td>
<td>双序列</td>
<td>中等</td>
<td>dp[i][j]表示s1的前i个字符串与s2的前j个字符组成的最长公共子序列</td>
<td>if(word1.charAt(i-1)==word2.charAt(j-1))
dp[i][j]=1+dp[i-1][j-1];
else
dp[i][j]=Math.max(dp[i-1][j]+1,dp[i][j-1]+1);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/hPtUzccBqAsjv4unNZioag" title="1312. 让字符串成为回文串的最少插入次数" target="_blank" rel="noopener noreferrer">1312. 让字符串成为回文串的最少插入次数<ExternalLinkIcon/></a></td>
<td>双序列</td>
<td>困难</td>
<td>lcs变形 将字符串翻转 再找翻转的字符串与原来的lcs 答案为length-lcs</td>
<td>同1143</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/wUzjHPWL7enJpKggbx4AVr" title="516. 最长回文子序列" target="_blank" rel="noopener noreferrer">516. 最长回文子序列<ExternalLinkIcon/></a></td>
<td>双序列,区间型</td>
<td>中等</td>
<td>lcs 直接返回reverse后的字符串</td>
<td>同1143</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/sDoaeAX2UwKwF7TY4hc3b7" title="1216. 验证回文字符串 III" target="_blank" rel="noopener noreferrer">1216. 验证回文字符串 III<ExternalLinkIcon/></a></td>
<td>双序列,区间型</td>
<td>困难</td>
<td>lcs 判断s.length-lcs是否&lt;=k</td>
<td>同1143</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/7s4LWtcRf7uJCiNiUTRNJS" title="5. 最长回文子串" target="_blank" rel="noopener noreferrer">5. 最长回文子串<ExternalLinkIcon/></a></td>
<td>区间型</td>
<td>中等</td>
<td>dp[i][j]表示字符串在i...j范围内是否为回文串  如果chari==charj 则看内部是否是回文串 i+1到j-1是否是回文串</td>
<td>if(s.charAt(i)==s.charAt(j)&amp;&amp;((j-i)&lt;=2||dp[i+1][j-1]))
dp[i][j]=true;
</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/9ou6T442YY5cGKxCBhQkBH" title="312. 戳气球" target="_blank" rel="noopener noreferrer">312. 戳气球<ExternalLinkIcon/></a></td>
<td>区间型</td>
<td>困难</td>
<td>dp[i][j]表示在i...j范围内拿到的最多硬币数</td>
<td>dfs+memo                                                      left = dfs(start,i-1,nums,dp);
int right = dfs(i+1,end,nums,dp);
int cur = get(nums,i)<em>get(nums,start-1)</em> get(nums,end+1);
max = Math.max(max,cur+left+right);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/ksFTQJPnfmRMb9be7xbLSP" title="1039. 多边形三角剖分的最低得分" target="_blank" rel="noopener noreferrer">1039. 多边形三角剖分的最低得分<ExternalLinkIcon/></a></td>
<td>区间型</td>
<td>中等</td>
<td>同312 需要注意的是多边形至少要有三条边</td>
<td></td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/6sBcrBFLwt6t3CqsE12Jir" title="221. 最大正方形" target="_blank" rel="noopener noreferrer">221. 最大正方形<ExternalLinkIcon/></a></td>
<td>坐标型</td>
<td>中等</td>
<td>dp[i][j]表明以i，j为右下角的最大正方形的面积</td>
<td>dp[i][j]=Math.min(Math.min(dp[i-1][j],dp[i][j-1]),dp[i-1][j-1])+1;</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/9cDKTN33nZi61bexaQk36x" title="294. 翻转游戏 II" target="_blank" rel="noopener noreferrer">294. 翻转游戏 II<ExternalLinkIcon/></a></td>
<td>博弈型</td>
<td>中等</td>
<td>dfs+memo</td>
<td></td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/gWEZ8RBd4gciA2XCDQ3v1T" title="292. Nim 游戏" target="_blank" rel="noopener noreferrer">292. Nim 游戏<ExternalLinkIcon/></a></td>
<td>博弈型</td>
<td>中等</td>
<td>return n%4!=0;</td>
<td></td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/kWZAxvwUtfo7wgpWfUmTBs" title="877. 石子游戏" target="_blank" rel="noopener noreferrer">877. 石子游戏<ExternalLinkIcon/></a></td>
<td>博弈型</td>
<td>中等</td>
<td>memo+dfs</td>
<td>memo[i][j]= Math.max(nums[i]-dfs(nums,i+1,j,memo),nums[j]-dfs(nums,i,j-1,memo));</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/c2RLoGSk1ARzUYvdkRAdxW" title="376. 摆动序列" target="_blank" rel="noopener noreferrer">376. 摆动序列<ExternalLinkIcon/></a></td>
<td></td>
<td>中等</td>
<td>贪心 或 dp 变一维</td>
<td>if (nums[i] &gt; nums[i - 1])
            up = down + 1;
        else if (nums[i] &lt; nums[i - 1])
            down = up + 1;</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/j4NNNWS33ovKCs6YLUXXN3" title="487. 最大连续1的个数 II" target="_blank" rel="noopener noreferrer">487. 最大连续1的个数 II<ExternalLinkIcon/></a></td>
<td>单序列,行使权力</td>
<td>中等</td>
<td>dp[i][0]表示以当前元素结尾 没有行使翻转权利的最长连续 1  dp[i][1]为行使权利后的结果</td>
<td>if(nums[i]==1){
                dp[i][0]=dp[i-1][0]+1;
                dp[i][1]=dp[i-1][1]+1;
            }else{
                dp[i][0]=0;
                dp[i][1]=dp[i-1][0]+1;
            }</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/bZ5ji7KpYJQUQivDq8md7m" title="1186. 删除一次得到子数组最大和" target="_blank" rel="noopener noreferrer">1186. 删除一次得到子数组最大和<ExternalLinkIcon/></a></td>
<td>单序列,行使权力</td>
<td>中等</td>
<td>dp[i][0]表示以当前元素结尾 没有行使删除权利的最长连续 1  dp[i][1]为行使删除权利后的结果</td>
<td>dp[i][0]=Math.max(dp[i-1][0]+arr[i],arr[i]);
            dp[i][1]=Math.max(dp[i-1][0],dp[i-1][1]+arr[i]);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/sRnkdcRnynoqt8D5t1dqMm" title="1092. 最短公共超序列" target="_blank" rel="noopener noreferrer">1092. 最短公共超序列<ExternalLinkIcon/></a></td>
<td>双序列</td>
<td>困难</td>
<td>LCS 再对dp结果进行处理拿到答案序列</td>
<td>同LCS</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/tC99mTHVjW7wNVgd8C2Zn4" title="1105. 填充书架" target="_blank" rel="noopener noreferrer">1105. 填充书架<ExternalLinkIcon/></a></td>
<td>单序列,时间序列加强</td>
<td>中等</td>
<td>i表示以第i本书作为上一层的最后一本书的最小高度</td>
<td>levelWidth+=books[j-1][0];
if(levelWidth&gt;shelfWidth) break;        levelMaxHeight=Math.max(levelMaxHeight,books[j-1][1]);
dp[i]=Math.min(dp[i],dp[j-1]+levelMaxHeight);</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/92ckzocMy1n4B71bLutmXp" title="1278. 分割回文串 III" target="_blank" rel="noopener noreferrer">1278. 分割回文串 III<ExternalLinkIcon/></a></td>
<td>区间型</td>
<td>困难</td>
<td>dp[i][j]表示前i个字符分割为k个区间需要改动的最小字符个数   对于前i个字符来说 分成的第k个区间取决于第k-1个区间再加上count最后一个区间的次数  在k-1，i的区间内依次遍历即可</td>
<td>for(int i=0;i&lt;=n;i++)
for(int j=1;j&lt;=Math.min(i,k);j++){
if(j==1) dp[i][j]=count(s.substring(0,i));
for(int m=i-1;m&gt;=j-1;m--){
dp[i][j]=Math.min(dp[i][j],dp[m][j-1]+count(s.substring(m,i)));</td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/k1KbFzdVUxPpRcice4tkA8" title="813. 最大平均值和的分组" target="_blank" rel="noopener noreferrer">813. 最大平均值和的分组<ExternalLinkIcon/></a></td>
<td>区间型</td>
<td>中等</td>
<td>类似1278 需要初始化dp数组</td>
<td></td>
<td></td>
</tr>
<tr>
<td style="text-align:left"><a href="https://www.wolai.com/8Twtd8Dun9KcL9oXBQTBhc" title="410. 分割数组的最大值" target="_blank" rel="noopener noreferrer">410. 分割数组的最大值<ExternalLinkIcon/></a></td>
<td>区间型</td>
<td>困难</td>
<td>类似1278 本题可以采用二分猜答案</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p><a href="https://www.wolai.com/t3zbqB3XRM8iM1qshU9dUh" title="坐标型动态规划" target="_blank" rel="noopener noreferrer">坐标型动态规划<ExternalLinkIcon/></a></p>
</div></template>



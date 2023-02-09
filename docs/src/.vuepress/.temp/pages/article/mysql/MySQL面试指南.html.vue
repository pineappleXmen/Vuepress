<template><div><h1 id="mysql面试指南" tabindex="-1"><a class="header-anchor" href="#mysql面试指南" aria-hidden="true">#</a> MySQL面试指南</h1>
<h2 id="_1-基础" tabindex="-1"><a class="header-anchor" href="#_1-基础" aria-hidden="true">#</a> 1.基础</h2>
<h3 id="_1-mysql常用的存储引擎有什么-它们有什么区别" tabindex="-1"><a class="header-anchor" href="#_1-mysql常用的存储引擎有什么-它们有什么区别" aria-hidden="true">#</a> 1.MySQL常用的存储引擎有什么？它们有什么区别？</h3>
<p>**Table **Feature of different engine</p>
<table>
<thead>
<tr>
<th style="text-align:center">Feature</th>
<th style="text-align:center">InnoDB</th>
<th style="text-align:center">MyISAM</th>
<th style="text-align:center">MEMORY</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><strong>B-tree indexes</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
</tr>
<tr>
<td style="text-align:center"><strong>Backup/point-in-time recovery</strong> (Implemented in the server, rather than in the storage engine.)</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
</tr>
<tr>
<td style="text-align:center"><strong>Cluster database support</strong></td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Clustered indexes</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Compressed data</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes (Compressed MyISAM tables are supported only when using the compressed row format. Tables using the compressed row format with MyISAM are read only.)</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Data caches</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
<td style="text-align:center">N/A</td>
</tr>
<tr>
<td style="text-align:center"><strong>Encrypted data</strong></td>
<td style="text-align:center">Yes (Implemented in the server via encryption functions; In MySQL 5.7 and later, data-at-rest encryption is supported.)</td>
<td style="text-align:center">Yes (Implemented in the server via encryption functions.)</td>
<td style="text-align:center">Yes (Implemented in the server via encryption functions.)</td>
</tr>
<tr>
<td style="text-align:center"><strong>Foreign key support</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Full-text search indexes</strong></td>
<td style="text-align:center">Yes (Support for FULLTEXT indexes is available in MySQL 5.6 and later.)</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Geospatial data type support</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Geospatial indexing support</strong></td>
<td style="text-align:center">Yes (Support for geospatial indexing is available in MySQL 5.7 and later.)</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Hash indexes</strong></td>
<td style="text-align:center">No (InnoDB utilizes hash indexes internally for its Adaptive Hash Index feature.)</td>
<td style="text-align:center">No</td>
<td style="text-align:center">Yes</td>
</tr>
<tr>
<td style="text-align:center"><strong>Index caches</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">N/A</td>
</tr>
<tr>
<td style="text-align:center"><strong>Locking granularity</strong></td>
<td style="text-align:center">Row</td>
<td style="text-align:center">Table</td>
<td style="text-align:center">Table</td>
</tr>
<tr>
<td style="text-align:center"><strong>MVCC</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Replication support</strong> (Implemented in the server, rather than in the storage engine.)</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Limited (See the discussion later in this section.)</td>
</tr>
<tr>
<td style="text-align:center"><strong>Storage limits</strong></td>
<td style="text-align:center">64TB</td>
<td style="text-align:center">256TB</td>
<td style="text-align:center">RAM</td>
</tr>
<tr>
<td style="text-align:center"><strong>T-tree indexes</strong></td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Transactions</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">No</td>
<td style="text-align:center">No</td>
</tr>
<tr>
<td style="text-align:center"><strong>Update statistics for data dictionary</strong></td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
<td style="text-align:center">Yes</td>
</tr>
</tbody>
</table>
<h3 id="_2-数据库的三大范式" tabindex="-1"><a class="header-anchor" href="#_2-数据库的三大范式" aria-hidden="true">#</a> 2.数据库的三大范式</h3>
<ul>
<li>第一范式：确保每列保持原子性，<a href="https://www.nowcoder.com/jump/super-jump/word?word=%E6%95%B0%E6%8D%AE" target="_blank" rel="noopener noreferrer">数据<ExternalLinkIcon/></a>表中的所有字段值都是不可分解的原子值。</li>
<li>第二范式：确保表中的每列都和主键相关</li>
<li>第三范式：确保每列都和主键列直接相关而不是间接相关</li>
</ul>
<h3 id="_3-mysql的数据类型有哪些" tabindex="-1"><a class="header-anchor" href="#_3-mysql的数据类型有哪些" aria-hidden="true">#</a> 3.MySQL的<a href="https://www.nowcoder.com/jump/super-jump/word?word=%E6%95%B0%E6%8D%AE" target="_blank" rel="noopener noreferrer">数据<ExternalLinkIcon/></a>类型有哪些</h3>
<h4 id="_3-1-数字" tabindex="-1"><a class="header-anchor" href="#_3-1-数字" aria-hidden="true">#</a> 3.1 数字</h4>
<ul>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/bit-type.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIT[(*</code>M<code v-pre>*)\]</code><ExternalLinkIcon/></a></p>
<p>A bit-value type. <em><code v-pre>M</code></em> indicates the number of bits per value, from 1 to 64. The default is 1 if <em><code v-pre>M</code></em> is omitted.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>TINYINT[(*</code>M<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A very small integer. The signed range is <code v-pre>-128</code> to <code v-pre>127</code>. The unsigned range is <code v-pre>0</code> to <code v-pre>255</code>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BOOL</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BOOLEAN</code><ExternalLinkIcon/></a></p>
<p>These types are synonyms for <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>TINYINT(1)</code><ExternalLinkIcon/></a>. A value of zero is considered false. Nonzero values are considered true:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> <span class="token boolean">false</span>                  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>

mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> <span class="token boolean">true</span>                   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>

mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> <span class="token boolean">true</span>                   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>However, the values <code v-pre>TRUE</code> and <code v-pre>FALSE</code> are merely aliases for <code v-pre>1</code> and <code v-pre>0</code>, respectively, as shown here:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">=</span> <span class="token boolean">FALSE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">--------------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">=</span> <span class="token boolean">FALSE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">--------------------------------+</span>
<span class="token operator">|</span> <span class="token boolean">true</span>                           <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">--------------------------------+</span>

mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">=</span> <span class="token boolean">TRUE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">-------------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">=</span> <span class="token boolean">TRUE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------------+</span>
<span class="token operator">|</span> <span class="token boolean">true</span>                          <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------------+</span>

mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">=</span> <span class="token boolean">TRUE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">-------------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">=</span> <span class="token boolean">TRUE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------------+</span>
<span class="token operator">|</span> <span class="token boolean">false</span>                         <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------------+</span>

mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">=</span> <span class="token boolean">FALSE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">--------------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">IF</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">=</span> <span class="token boolean">FALSE</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">--------------------------------+</span>
<span class="token operator">|</span> <span class="token boolean">false</span>                          <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">--------------------------------+</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The last two statements display the results shown because <code v-pre>2</code> is equal to neither <code v-pre>1</code> nor <code v-pre>0</code>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>SMALLINT[(*</code>M<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A small integer. The signed range is <code v-pre>-32768</code> to <code v-pre>32767</code>. The unsigned range is <code v-pre>0</code> to <code v-pre>65535</code>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>MEDIUMINT[(*</code>M<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A medium-sized integer. The signed range is <code v-pre>-8388608</code> to <code v-pre>8388607</code>. The unsigned range is <code v-pre>0</code> to <code v-pre>16777215</code>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>INT[(*</code>M<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A normal-size integer. The signed range is <code v-pre>-2147483648</code> to <code v-pre>2147483647</code>. The unsigned range is <code v-pre>0</code> to <code v-pre>4294967295</code>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>INTEGER[(*</code>M<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>This type is a synonym for <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>INT</code><ExternalLinkIcon/></a>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT[(*</code>M<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A large integer. The signed range is <code v-pre>-9223372036854775808</code> to <code v-pre>9223372036854775807</code>. The unsigned range is <code v-pre>0</code> to <code v-pre>18446744073709551615</code>.</p>
<p><code v-pre>SERIAL</code> is an alias for <code v-pre>BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE</code>.</p>
<p>Some things you should be aware of with respect to <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> columns:</p>
<ul>
<li>
<p>All arithmetic is done using signed <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> or <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a> values, so you should not use unsigned big integers larger than <code v-pre>9223372036854775807</code> (63 bits) except with bit functions! If you do that, some of the last digits in the result may be wrong because of rounding errors when converting a <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> value to a <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a>.</p>
<p>MySQL can handle <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> in the following cases:</p>
<ul>
<li>When using integers to store large unsigned values in a <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> column.</li>
<li>In <a href="https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_min" target="_blank" rel="noopener noreferrer"><code v-pre>MIN(*</code>col_name<code v-pre>*)</code><ExternalLinkIcon/></a> or <a href="https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_max" target="_blank" rel="noopener noreferrer"><code v-pre>MAX(*</code>col_name<code v-pre>*)</code><ExternalLinkIcon/></a>, where <em><code v-pre>col_name</code></em> refers to a <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> column.</li>
<li>When using operators (<a href="https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus" target="_blank" rel="noopener noreferrer"><code v-pre>+</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus" target="_blank" rel="noopener noreferrer"><code v-pre>-</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times" target="_blank" rel="noopener noreferrer"><code v-pre>*</code><ExternalLinkIcon/></a>, and so on) where both operands are integers.</li>
</ul>
</li>
<li>
<p>You can always store an exact integer value in a <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> column by storing it using a string. In this case, MySQL performs a string-to-number conversion that involves no intermediate double-precision representation.</p>
</li>
<li>
<p>The <a href="https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus" target="_blank" rel="noopener noreferrer"><code v-pre>-</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus" target="_blank" rel="noopener noreferrer"><code v-pre>+</code><ExternalLinkIcon/></a>, and <a href="https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times" target="_blank" rel="noopener noreferrer"><code v-pre>*</code><ExternalLinkIcon/></a> operators use <a href="https://dev.mysql.com/doc/refman/8.0/en/integer-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>BIGINT</code><ExternalLinkIcon/></a> arithmetic when both operands are integer values. This means that if you multiply two big integers (or results from functions that return integers), you may get unexpected results when the result is larger than <code v-pre>9223372036854775807</code>.</p>
</li>
</ul>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DECIMAL[(*</code>M<code v-pre>*[,*</code>D<code v-pre>*\])] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A packed “exact” fixed-point number. <em><code v-pre>M</code></em> is the total number of digits (the precision) and <em><code v-pre>D</code></em> is the number of digits after the decimal point (the scale). The decimal point and (for negative numbers) the <code v-pre>-</code> sign are not counted in <em><code v-pre>M</code></em>. If <em><code v-pre>D</code></em> is 0, values have no decimal point or fractional part. The maximum number of digits (<em><code v-pre>M</code></em>) for <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DECIMAL</code><ExternalLinkIcon/></a> is 65. The maximum number of supported decimals (<em><code v-pre>D</code></em>) is 30. If <em><code v-pre>D</code></em> is omitted, the default is 0. If <em><code v-pre>M</code></em> is omitted, the default is 10. (There is also a limit on how long the text of <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DECIMAL</code><ExternalLinkIcon/></a> literals can be; see <a href="https://dev.mysql.com/doc/refman/8.0/en/precision-math-expressions.html" target="_blank" rel="noopener noreferrer">Section 12.25.3, “Expression Handling”<ExternalLinkIcon/></a>.)</p>
<p><code v-pre>UNSIGNED</code>, if specified, disallows negative values. As of MySQL 8.0.17, the <code v-pre>UNSIGNED</code> attribute is deprecated for columns of type <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DECIMAL</code><ExternalLinkIcon/></a> (and any synonyms); you should expect support for it to be removed in a future version of MySQL. Consider using a simple <code v-pre>CHECK</code> constraint instead for such columns.</p>
<p>All basic calculations (<code v-pre>+, -, *, /</code>) with <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DECIMAL</code><ExternalLinkIcon/></a> columns are done with a precision of 65 digits.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DEC[(*</code>M<code v-pre>*[,*</code>D<code v-pre>*\])] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>NUMERIC[(*</code>M<code v-pre>*[,*</code>D<code v-pre>*\])] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FIXED[(*</code>M<code v-pre>*[,*</code>D<code v-pre>*\])] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>These types are synonyms for <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DECIMAL</code><ExternalLinkIcon/></a>. The <a href="https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FIXED</code><ExternalLinkIcon/></a> synonym is available for compatibility with other database systems.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT[(*</code>M<code v-pre>*,*</code>D<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A small (single-precision) floating-point number. Permissible values are <code v-pre>-3.402823466E+38</code> to <code v-pre>-1.175494351E-38</code>, <code v-pre>0</code>, and <code v-pre>1.175494351E-38</code> to <code v-pre>3.402823466E+38</code>. These are the theoretical limits, based on the IEEE standard. The actual range might be slightly smaller depending on your hardware or operating system.</p>
<p><em><code v-pre>M</code></em> is the total number of digits and <em><code v-pre>D</code></em> is the number of digits following the decimal point. If <em><code v-pre>M</code></em> and <em><code v-pre>D</code></em> are omitted, values are stored to the limits permitted by the hardware. A single-precision floating-point number is accurate to approximately 7 decimal places.</p>
<p><code v-pre>FLOAT(*</code>M<code v-pre>*,*</code>D<code v-pre>*)</code> is a nonstandard MySQL extension. As of MySQL 8.0.17, this syntax is deprecated, and you should expect support for it to be removed in a future version of MySQL.</p>
<p><code v-pre>UNSIGNED</code>, if specified, disallows negative values. As of MySQL 8.0.17, the <code v-pre>UNSIGNED</code> attribute is deprecated for columns of type <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT</code><ExternalLinkIcon/></a> (and any synonyms) and you should expect support for it to be removed in a future version of MySQL. Consider using a simple <code v-pre>CHECK</code> constraint instead for such columns.</p>
<p>Using <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT</code><ExternalLinkIcon/></a> might give you some unexpected problems because all calculations in MySQL are done with double precision. See <a href="https://dev.mysql.com/doc/refman/8.0/en/no-matching-rows.html" target="_blank" rel="noopener noreferrer">Section B.3.4.7, “Solving Problems with No Matching Rows”<ExternalLinkIcon/></a>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT(*</code>p<code v-pre>*) [UNSIGNED\] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A floating-point number. <em><code v-pre>p</code></em> represents the precision in bits, but MySQL uses this value only to determine whether to use <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT</code><ExternalLinkIcon/></a> or <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a> for the resulting data type. If <em><code v-pre>p</code></em> is from 0 to 24, the data type becomes <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT</code><ExternalLinkIcon/></a> with no <em><code v-pre>M</code></em> or <em><code v-pre>D</code></em> values. If <em><code v-pre>p</code></em> is from 25 to 53, the data type becomes <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a> with no <em><code v-pre>M</code></em> or <em><code v-pre>D</code></em> values. The range of the resulting column is the same as for the single-precision <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT</code><ExternalLinkIcon/></a> or double-precision <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a> data types described earlier in this section.</p>
<p><code v-pre>UNSIGNED</code>, if specified, disallows negative values. As of MySQL 8.0.17, the <code v-pre>UNSIGNED</code> attribute is deprecated for columns of type <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT</code><ExternalLinkIcon/></a> (and any synonyms) and you should expect support for it to be removed in a future version of MySQL. Consider using a simple <code v-pre>CHECK</code> constraint instead for such columns.</p>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT(*</code>p<code v-pre>*)</code><ExternalLinkIcon/></a> syntax is provided for ODBC compatibility.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE[(*</code>M<code v-pre>*,*</code>D<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>A normal-size (double-precision) floating-point number. Permissible values are <code v-pre>-1.7976931348623157E+308</code> to <code v-pre>-2.2250738585072014E-308</code>, <code v-pre>0</code>, and <code v-pre>2.2250738585072014E-308</code> to <code v-pre>1.7976931348623157E+308</code>. These are the theoretical limits, based on the IEEE standard. The actual range might be slightly smaller depending on your hardware or operating system.</p>
<p><em><code v-pre>M</code></em> is the total number of digits and <em><code v-pre>D</code></em> is the number of digits following the decimal point. If <em><code v-pre>M</code></em> and <em><code v-pre>D</code></em> are omitted, values are stored to the limits permitted by the hardware. A double-precision floating-point number is accurate to approximately 15 decimal places.</p>
<p><code v-pre>DOUBLE(*</code>M<code v-pre>*,*</code>D<code v-pre>*)</code> is a nonstandard MySQL extension. As of MySQL 8.0.17, this syntax is deprecated and you should expect support for it to be removed in a future version of MySQL.</p>
<p><code v-pre>UNSIGNED</code>, if specified, disallows negative values. As of MySQL 8.0.17, the <code v-pre>UNSIGNED</code> attribute is deprecated for columns of type <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a> (and any synonyms) and you should expect support for it to be removed in a future version of MySQL. Consider using a simple <code v-pre>CHECK</code> constraint instead for such columns.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE PRECISION[(*</code>M<code v-pre>*,*</code>D<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>REAL[(*</code>M<code v-pre>*,*</code>D<code v-pre>*)\] [UNSIGNED] [ZEROFILL]</code><ExternalLinkIcon/></a></p>
<p>These types are synonyms for <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a>. Exception: If the <a href="https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_real_as_float" target="_blank" rel="noopener noreferrer"><code v-pre>REAL_AS_FLOAT</code><ExternalLinkIcon/></a> SQL mode is enabled, <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>REAL</code><ExternalLinkIcon/></a> is a synonym for <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>FLOAT</code><ExternalLinkIcon/></a> rather than <a href="https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html" target="_blank" rel="noopener noreferrer"><code v-pre>DOUBLE</code><ExternalLinkIcon/></a>.</p>
</li>
</ul>
<h4 id="_3-2日期" tabindex="-1"><a class="header-anchor" href="#_3-2日期" aria-hidden="true">#</a> 3.2日期</h4>
<p>The date and time data types for representing temporal values are <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATE</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/time.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIME</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a>, and <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR</code><ExternalLinkIcon/></a>.</p>
<p>For the <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATE</code><ExternalLinkIcon/></a> and <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a> range descriptions, “supported” means that although earlier values might work, there is no guarantee.</p>
<p>MySQL permits fractional seconds for <a href="https://dev.mysql.com/doc/refman/8.0/en/time.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIME</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a>, and <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> values, with up to microseconds (6 digits) precision. To define a column that includes a fractional seconds part, use the syntax <code v-pre>*</code>type_name<code v-pre>*(*</code>fsp<code v-pre>*)</code>, where <em><code v-pre>type_name</code></em> is <a href="https://dev.mysql.com/doc/refman/8.0/en/time.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIME</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a>, or <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a>, and <em><code v-pre>fsp</code></em> is the fractional seconds precision. For example:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t1 <span class="token punctuation">(</span>t <span class="token keyword">TIME</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> dt <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ts <span class="token keyword">TIMESTAMP</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The <em><code v-pre>fsp</code></em> value, if given, must be in the range 0 to 6. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0. (This differs from the standard SQL default of 6, for compatibility with previous MySQL versions.)</p>
<p>Any <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> or <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a> column in a table can have automatic initialization and updating properties; see <a href="https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html" target="_blank" rel="noopener noreferrer">Section 11.2.5, “Automatic Initialization and Updating for TIMESTAMP and DATETIME”<ExternalLinkIcon/></a>.</p>
<ul>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATE</code><ExternalLinkIcon/></a></p>
<p>A date. The supported range is <code v-pre>'1000-01-01'</code> to <code v-pre>'9999-12-31'</code>. MySQL displays <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATE</code><ExternalLinkIcon/></a> values in <code v-pre>'*</code>YYYY-MM-DD<code v-pre>*'</code> format, but permits assignment of values to <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATE</code><ExternalLinkIcon/></a> columns using either strings or numbers.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME[(*</code>fsp<code v-pre>*)\]</code><ExternalLinkIcon/></a></p>
<p>A date and time combination. The supported range is <code v-pre>'1000-01-01 00:00:00.000000'</code> to <code v-pre>'9999-12-31 23:59:59.999999'</code>. MySQL displays <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a> values in <code v-pre>'*</code>YYYY-MM-DD hh:mm:ss<code v-pre>*[.*</code>fraction<code v-pre>*]'</code> format, but permits assignment of values to <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a> columns using either strings or numbers.</p>
<p>An optional <em><code v-pre>fsp</code></em> value in the range from 0 to 6 may be given to specify fractional seconds precision. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0.</p>
<p>Automatic initialization and updating to the current date and time for <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>DATETIME</code><ExternalLinkIcon/></a> columns can be specified using <code v-pre>DEFAULT</code> and <code v-pre>ON UPDATE</code> column definition clauses, as described in <a href="https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html" target="_blank" rel="noopener noreferrer">Section 11.2.5, “Automatic Initialization and Updating for TIMESTAMP and DATETIME”<ExternalLinkIcon/></a>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP[(*</code>fsp<code v-pre>*)\]</code><ExternalLinkIcon/></a></p>
<p>A timestamp. The range is <code v-pre>'1970-01-01 00:00:01.000000'</code> UTC to <code v-pre>'2038-01-19 03:14:07.999999'</code> UTC. <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> values are stored as the number of seconds since the epoch (<code v-pre>'1970-01-01 00:00:00'</code> UTC). A <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> cannot represent the value <code v-pre>'1970-01-01 00:00:00'</code> because that is equivalent to 0 seconds from the epoch and the value 0 is reserved for representing <code v-pre>'0000-00-00 00:00:00'</code>, the “zero” <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> value.</p>
<p>An optional <em><code v-pre>fsp</code></em> value in the range from 0 to 6 may be given to specify fractional seconds precision. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0.</p>
<p>The way the server handles <code v-pre>TIMESTAMP</code> definitions depends on the value of the <a href="https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp" target="_blank" rel="noopener noreferrer"><code v-pre>explicit_defaults_for_timestamp</code><ExternalLinkIcon/></a> system variable (see <a href="https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html" target="_blank" rel="noopener noreferrer">Section 5.1.8, “Server System Variables”<ExternalLinkIcon/></a>).</p>
<p>If <a href="https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp" target="_blank" rel="noopener noreferrer"><code v-pre>explicit_defaults_for_timestamp</code><ExternalLinkIcon/></a> is enabled, there is no automatic assignment of the <code v-pre>DEFAULT CURRENT_TIMESTAMP</code> or <code v-pre>ON UPDATE CURRENT_TIMESTAMP</code> attributes to any <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> column. They must be included explicitly in the column definition. Also, any <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> not explicitly declared as <code v-pre>NOT NULL</code> permits <code v-pre>NULL</code> values.</p>
<p>If <a href="https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp" target="_blank" rel="noopener noreferrer"><code v-pre>explicit_defaults_for_timestamp</code><ExternalLinkIcon/></a> is disabled, the server handles <code v-pre>TIMESTAMP</code> as follows:</p>
<p>Unless specified otherwise, the first <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> column in a table is defined to be automatically set to the date and time of the most recent modification if not explicitly assigned a value. This makes <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> useful for recording the timestamp of an <a href="https://dev.mysql.com/doc/refman/8.0/en/insert.html" target="_blank" rel="noopener noreferrer"><code v-pre>INSERT</code><ExternalLinkIcon/></a> or <a href="https://dev.mysql.com/doc/refman/8.0/en/update.html" target="_blank" rel="noopener noreferrer"><code v-pre>UPDATE</code><ExternalLinkIcon/></a> operation. You can also set any <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> column to the current date and time by assigning it a <code v-pre>NULL</code> value, unless it has been defined with the <code v-pre>NULL</code> attribute to permit <code v-pre>NULL</code> values.</p>
<p>Automatic initialization and updating to the current date and time can be specified using <code v-pre>DEFAULT CURRENT_TIMESTAMP</code> and <code v-pre>ON UPDATE CURRENT_TIMESTAMP</code> column definition clauses. By default, the first <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> column has these properties, as previously noted. However, any <a href="https://dev.mysql.com/doc/refman/8.0/en/datetime.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIMESTAMP</code><ExternalLinkIcon/></a> column in a table can be defined to have these properties.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/time.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIME[(*</code>fsp<code v-pre>*)\]</code><ExternalLinkIcon/></a></p>
<p>A time. The range is <code v-pre>'-838:59:59.000000'</code> to <code v-pre>'838:59:59.000000'</code>. MySQL displays <a href="https://dev.mysql.com/doc/refman/8.0/en/time.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIME</code><ExternalLinkIcon/></a> values in <code v-pre>'*</code>hh:mm:ss<code v-pre>*[.*</code>fraction<code v-pre>*]'</code> format, but permits assignment of values to <a href="https://dev.mysql.com/doc/refman/8.0/en/time.html" target="_blank" rel="noopener noreferrer"><code v-pre>TIME</code><ExternalLinkIcon/></a> columns using either strings or numbers.</p>
<p>An optional <em><code v-pre>fsp</code></em> value in the range from 0 to 6 may be given to specify fractional seconds precision. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR[(4)\]</code><ExternalLinkIcon/></a></p>
<p>A year in 4-digit format. MySQL displays <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR</code><ExternalLinkIcon/></a> values in <em><code v-pre>YYYY</code></em> format, but permits assignment of values to <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR</code><ExternalLinkIcon/></a> columns using either strings or numbers. Values display as <code v-pre>1901</code> to <code v-pre>2155</code>, or <code v-pre>0000</code>.</p>
<p>For additional information about <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR</code><ExternalLinkIcon/></a> display format and interpretation of input values, see <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer">Section 11.2.4, “The YEAR Type”<ExternalLinkIcon/></a>.</p>
<p>Note</p>
<p>As of MySQL 8.0.19, the <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR(4)</code><ExternalLinkIcon/></a> data type with an explicit display width is deprecated; you should expect support for it to be removed in a future version of MySQL. Instead, use <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR</code><ExternalLinkIcon/></a> without a display width, which has the same meaning.</p>
<p>MySQL 8.0 does not support the 2-digit <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR(2)</code><ExternalLinkIcon/></a> data type permitted in older versions of MySQL. For instructions on converting to 4-digit <a href="https://dev.mysql.com/doc/refman/8.0/en/year.html" target="_blank" rel="noopener noreferrer"><code v-pre>YEAR</code><ExternalLinkIcon/></a>, see <a href="https://dev.mysql.com/doc/refman/5.7/en/migrating-from-year2.html" target="_blank" rel="noopener noreferrer">2-Digit YEAR(2) Limitations and Migrating to 4-Digit YEAR<ExternalLinkIcon/></a>, in <a href="https://dev.mysql.com/doc/refman/5.7/en/" target="_blank" rel="noopener noreferrer">MySQL 5.7 Reference Manual<ExternalLinkIcon/></a>.</p>
</li>
</ul>
<p>The <a href="https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_sum" target="_blank" rel="noopener noreferrer"><code v-pre>SUM()</code><ExternalLinkIcon/></a> and <a href="https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_avg" target="_blank" rel="noopener noreferrer"><code v-pre>AVG()</code><ExternalLinkIcon/></a> aggregate functions do not work with temporal values. (They convert the values to numbers, losing everything after the first nonnumeric character.) To work around this problem, convert to numeric units, perform the aggregate operation, and convert back to a temporal value. Examples:</p>
<h4 id="_3-3字符串" tabindex="-1"><a class="header-anchor" href="#_3-3字符串" aria-hidden="true">#</a> 3.3字符串</h4>
<p>The string data types are <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>BINARY</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARBINARY</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/enum.html" target="_blank" rel="noopener noreferrer"><code v-pre>ENUM</code><ExternalLinkIcon/></a>, and <a href="https://dev.mysql.com/doc/refman/8.0/en/set.html" target="_blank" rel="noopener noreferrer"><code v-pre>SET</code><ExternalLinkIcon/></a>.</p>
<p>In some cases, MySQL may change a string column to a type different from that given in a <a href="https://dev.mysql.com/doc/refman/8.0/en/create-table.html" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE TABLE</code><ExternalLinkIcon/></a> or <a href="https://dev.mysql.com/doc/refman/8.0/en/alter-table.html" target="_blank" rel="noopener noreferrer"><code v-pre>ALTER TABLE</code><ExternalLinkIcon/></a> statement. See <a href="https://dev.mysql.com/doc/refman/8.0/en/silent-column-changes.html" target="_blank" rel="noopener noreferrer">Section 13.1.20.7, “Silent Column Specification Changes”<ExternalLinkIcon/></a>.</p>
<p>For definitions of character string columns (<a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a>, and the <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> types), MySQL interprets length specifications in character units. For definitions of binary string columns (<a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>BINARY</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARBINARY</code><ExternalLinkIcon/></a>, and the <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a> types), MySQL interprets length specifications in byte units.</p>
<p>Column definitions for character string data types <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a>, the <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> types, <a href="https://dev.mysql.com/doc/refman/8.0/en/enum.html" target="_blank" rel="noopener noreferrer"><code v-pre>ENUM</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/set.html" target="_blank" rel="noopener noreferrer"><code v-pre>SET</code><ExternalLinkIcon/></a>, and any synonyms) can specify the column character set and collation:</p>
<ul>
<li>
<p><code v-pre>CHARACTER SET</code> specifies the character set. If desired, a collation for the character set can be specified with the <code v-pre>COLLATE</code> attribute, along with any other attributes. For example:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t
<span class="token punctuation">(</span>
    c1 <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8mb4<span class="token punctuation">,</span>
    c2 <span class="token keyword">TEXT</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> latin1 <span class="token keyword">COLLATE</span> latin1_general_cs
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This table definition creates a column named <code v-pre>c1</code> that has a character set of <code v-pre>utf8mb4</code> with the default collation for that character set, and a column named <code v-pre>c2</code> that has a character set of <code v-pre>latin1</code> and a case-sensitive (<code v-pre>_cs</code>) collation.</p>
<p>The rules for assigning the character set and collation when either or both of <code v-pre>CHARACTER SET</code> and the <code v-pre>COLLATE</code> attribute are missing are described in <a href="https://dev.mysql.com/doc/refman/8.0/en/charset-column.html" target="_blank" rel="noopener noreferrer">Section 10.3.5, “Column Character Set and Collation”<ExternalLinkIcon/></a>.</p>
<p><code v-pre>CHARSET</code> is a synonym for <code v-pre>CHARACTER SET</code>.</p>
</li>
<li>
<p>Specifying the <code v-pre>CHARACTER SET binary</code> attribute for a character string data type causes the column to be created as the corresponding binary string data type: <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a> becomes <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>BINARY</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> becomes <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARBINARY</code><ExternalLinkIcon/></a>, and <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> becomes <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a>. For the <a href="https://dev.mysql.com/doc/refman/8.0/en/enum.html" target="_blank" rel="noopener noreferrer"><code v-pre>ENUM</code><ExternalLinkIcon/></a> and <a href="https://dev.mysql.com/doc/refman/8.0/en/set.html" target="_blank" rel="noopener noreferrer"><code v-pre>SET</code><ExternalLinkIcon/></a> data types, this does not occur; they are created as declared. Suppose that you specify a table using this definition:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t
<span class="token punctuation">(</span>
  c1 <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> <span class="token keyword">binary</span><span class="token punctuation">,</span>
  c2 <span class="token keyword">TEXT</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> <span class="token keyword">binary</span><span class="token punctuation">,</span>
  c3 <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">,</span><span class="token string">'c'</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> <span class="token keyword">binary</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The resulting table has this definition:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t
<span class="token punctuation">(</span>
  c1 <span class="token keyword">VARBINARY</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  c2 <span class="token keyword">BLOB</span><span class="token punctuation">,</span>
  c3 <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">,</span><span class="token string">'c'</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> <span class="token keyword">binary</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>The <code v-pre>BINARY</code> attribute is a nonstandard MySQL extension that is shorthand for specifying the binary (<code v-pre>_bin</code>) collation of the column character set (or of the table default character set if no column character set is specified). In this case, comparison and sorting are based on numeric character code values. Suppose that you specify a table using this definition:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t
<span class="token punctuation">(</span>
  c1 <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> latin1 <span class="token keyword">BINARY</span><span class="token punctuation">,</span>
  c2 <span class="token keyword">TEXT</span> <span class="token keyword">BINARY</span>
<span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8mb4<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The resulting table has this definition:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t <span class="token punctuation">(</span>
  c1 <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> latin1 <span class="token keyword">COLLATE</span> latin1_bin<span class="token punctuation">,</span>
  c2 <span class="token keyword">TEXT</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8mb4 <span class="token keyword">COLLATE</span> utf8mb4_bin
<span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8mb4<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In MySQL 8.0, this nonstandard use of the <code v-pre>BINARY</code> attribute is ambiguous because the <code v-pre>utf8mb4</code> character set has multiple <code v-pre>_bin</code> collations. As of MySQL 8.0.17, the <code v-pre>BINARY</code> attribute is deprecated and you should expect support for it to be removed in a future version of MySQL. Applications should be adjusted to use an explicit <code v-pre>_bin</code> collation instead.</p>
<p>The use of <code v-pre>BINARY</code> to specify a data type or character set remains unchanged.</p>
</li>
<li>
<p>The <code v-pre>ASCII</code> attribute is shorthand for <code v-pre>CHARACTER SET latin1</code>. Supported in older MySQL releases, <code v-pre>ASCII</code> is deprecated in MySQL 8.0.28 and later; use <code v-pre>CHARACTER SET</code> instead.</p>
</li>
<li>
<p>The <code v-pre>UNICODE</code> attribute is shorthand for <code v-pre>CHARACTER SET ucs2</code>. Supported in older MySQL releases, <code v-pre>UNICODE</code> is deprecated in MySQL 8.0.28 and later; use <code v-pre>CHARACTER SET</code> instead.</p>
</li>
</ul>
<p>Character column comparison and sorting are based on the collation assigned to the column. For the <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/enum.html" target="_blank" rel="noopener noreferrer"><code v-pre>ENUM</code><ExternalLinkIcon/></a>, and <a href="https://dev.mysql.com/doc/refman/8.0/en/set.html" target="_blank" rel="noopener noreferrer"><code v-pre>SET</code><ExternalLinkIcon/></a> data types, you can declare a column with a binary (<code v-pre>_bin</code>) collation or the <code v-pre>BINARY</code> attribute to cause comparison and sorting to use the underlying character code values rather than a lexical ordering.</p>
<p>For additional information about use of character sets in MySQL, see <a href="https://dev.mysql.com/doc/refman/8.0/en/charset.html" target="_blank" rel="noopener noreferrer">Chapter 10, <em>Character Sets, Collations, Unicode</em><ExternalLinkIcon/></a>.</p>
<ul>
<li>
<p><code v-pre>[NATIONAL] CHAR[(*</code>M<code v-pre>*)] [CHARACTER SET *</code>charset_name<code v-pre>*] [COLLATE *</code>collation_name<code v-pre>*]</code></p>
<p>A fixed-length string that is always right-padded with spaces to the specified length when stored. <em><code v-pre>M</code></em> represents the column length in characters. The range of <em><code v-pre>M</code></em> is 0 to 255. If <em><code v-pre>M</code></em> is omitted, the length is 1.</p>
<p>Note</p>
<p>Trailing spaces are removed when <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a> values are retrieved unless the <a href="https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_pad_char_to_full_length" target="_blank" rel="noopener noreferrer"><code v-pre>PAD_CHAR_TO_FULL_LENGTH</code><ExternalLinkIcon/></a> SQL mode is enabled.</p>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a> is shorthand for <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHARACTER</code><ExternalLinkIcon/></a>. <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>NATIONAL CHAR</code><ExternalLinkIcon/></a> (or its equivalent short form, <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>NCHAR</code><ExternalLinkIcon/></a>) is the standard SQL way to define that a <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a> column should use some predefined character set. MySQL uses <code v-pre>utf8mb3</code> as this predefined character set. <a href="https://dev.mysql.com/doc/refman/8.0/en/charset-national.html" target="_blank" rel="noopener noreferrer">Section 10.3.7, “The National Character Set”<ExternalLinkIcon/></a>.</p>
<p>The <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR BYTE</code><ExternalLinkIcon/></a> data type is an alias for the <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>BINARY</code><ExternalLinkIcon/></a> data type. This is a compatibility feature.</p>
<p>MySQL permits you to create a column of type <code v-pre>CHAR(0)</code>. This is useful primarily when you must be compliant with old applications that depend on the existence of a column but that do not actually use its value. <code v-pre>CHAR(0)</code> is also quite nice when you need a column that can take only two values: A column that is defined as <code v-pre>CHAR(0) NULL</code> occupies only one bit and can take only the values <code v-pre>NULL</code> and <code v-pre>''</code> (the empty string).</p>
</li>
<li>
<p><code v-pre>[NATIONAL] VARCHAR(*</code>M<code v-pre>*) [CHARACTER SET *</code>charset_name<code v-pre>*] [COLLATE *</code>collation_name<code v-pre>*]</code></p>
<p>A variable-length string. <em><code v-pre>M</code></em> represents the maximum column length in characters. The range of <em><code v-pre>M</code></em> is 0 to 65,535. The effective maximum length of a <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> is subject to the maximum row size (65,535 bytes, which is shared among all columns) and the character set used. For example, <code v-pre>utf8mb3</code> characters can require up to three bytes per character, so a <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> column that uses the <code v-pre>utf8mb3</code> character set can be declared to be a maximum of 21,844 characters. See <a href="https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html" target="_blank" rel="noopener noreferrer">Section 8.4.7, “Limits on Table Column Count and Row Size”<ExternalLinkIcon/></a>.</p>
<p>MySQL stores <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> values as a 1-byte or 2-byte length prefix plus data. The length prefix indicates the number of bytes in the value. A <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> column uses one length byte if values require no more than 255 bytes, two length bytes if values may require more than 255 bytes.</p>
<p>Note</p>
<p>MySQL follows the standard SQL specification, and does <em>not</em> remove trailing spaces from <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> values.</p>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> is shorthand for <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHARACTER VARYING</code><ExternalLinkIcon/></a>. <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>NATIONAL VARCHAR</code><ExternalLinkIcon/></a> is the standard SQL way to define that a <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> column should use some predefined character set. MySQL uses <code v-pre>utf8mb3</code> as this predefined character set. <a href="https://dev.mysql.com/doc/refman/8.0/en/charset-national.html" target="_blank" rel="noopener noreferrer">Section 10.3.7, “The National Character Set”<ExternalLinkIcon/></a>. <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>NVARCHAR</code><ExternalLinkIcon/></a> is shorthand for <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>NATIONAL VARCHAR</code><ExternalLinkIcon/></a>.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>BINARY[(*</code>M<code v-pre>*)\]</code><ExternalLinkIcon/></a></p>
<p>The <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>BINARY</code><ExternalLinkIcon/></a> type is similar to the <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>CHAR</code><ExternalLinkIcon/></a> type, but stores binary byte strings rather than nonbinary character strings. An optional length <em><code v-pre>M</code></em> represents the column length in bytes. If omitted, <em><code v-pre>M</code></em> defaults to 1.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARBINARY(*</code>M<code v-pre>*)</code><ExternalLinkIcon/></a></p>
<p>The <a href="https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARBINARY</code><ExternalLinkIcon/></a> type is similar to the <a href="https://dev.mysql.com/doc/refman/8.0/en/char.html" target="_blank" rel="noopener noreferrer"><code v-pre>VARCHAR</code><ExternalLinkIcon/></a> type, but stores binary byte strings rather than nonbinary character strings. <em><code v-pre>M</code></em> represents the maximum column length in bytes.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TINYBLOB</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a> column with a maximum length of 255 (28 − 1) bytes. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TINYBLOB</code><ExternalLinkIcon/></a> value is stored using a 1-byte length prefix that indicates the number of bytes in the value.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TINYTEXT [CHARACTER SET *</code>charset_name<code v-pre>*\] [COLLATE *</code>collation_name<code v-pre>*]</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> column with a maximum length of 255 (28 − 1) characters. The effective maximum length is less if the value contains multibyte characters. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TINYTEXT</code><ExternalLinkIcon/></a> value is stored using a 1-byte length prefix that indicates the number of bytes in the value.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB[(*</code>M<code v-pre>*)\]</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a> column with a maximum length of 65,535 (216 − 1) bytes. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a> value is stored using a 2-byte length prefix that indicates the number of bytes in the value.</p>
<p>An optional length <em><code v-pre>M</code></em> can be given for this type. If this is done, MySQL creates the column as the smallest <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a> type large enough to hold values <em><code v-pre>M</code></em> bytes long.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT[(*</code>M<code v-pre>*)\] [CHARACTER SET *</code>charset_name<code v-pre>*] [COLLATE *</code>collation_name<code v-pre>*]</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> column with a maximum length of 65,535 (216 − 1) characters. The effective maximum length is less if the value contains multibyte characters. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> value is stored using a 2-byte length prefix that indicates the number of bytes in the value.</p>
<p>An optional length <em><code v-pre>M</code></em> can be given for this type. If this is done, MySQL creates the column as the smallest <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> type large enough to hold values <em><code v-pre>M</code></em> characters long.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>MEDIUMBLOB</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a> column with a maximum length of 16,777,215 (224 − 1) bytes. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>MEDIUMBLOB</code><ExternalLinkIcon/></a> value is stored using a 3-byte length prefix that indicates the number of bytes in the value.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>MEDIUMTEXT [CHARACTER SET *</code>charset_name<code v-pre>*\] [COLLATE *</code>collation_name<code v-pre>*]</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> column with a maximum length of 16,777,215 (224 − 1) characters. The effective maximum length is less if the value contains multibyte characters. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>MEDIUMTEXT</code><ExternalLinkIcon/></a> value is stored using a 3-byte length prefix that indicates the number of bytes in the value.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>LONGBLOB</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>BLOB</code><ExternalLinkIcon/></a> column with a maximum length of 4,294,967,295 or 4GB (232 − 1) bytes. The effective maximum length of <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>LONGBLOB</code><ExternalLinkIcon/></a> columns depends on the configured maximum packet size in the client/server protocol and available memory. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>LONGBLOB</code><ExternalLinkIcon/></a> value is stored using a 4-byte length prefix that indicates the number of bytes in the value.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>LONGTEXT [CHARACTER SET *</code>charset_name<code v-pre>*\] [COLLATE *</code>collation_name<code v-pre>*]</code><ExternalLinkIcon/></a></p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>TEXT</code><ExternalLinkIcon/></a> column with a maximum length of 4,294,967,295 or 4GB (232 − 1) characters. The effective maximum length is less if the value contains multibyte characters. The effective maximum length of <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>LONGTEXT</code><ExternalLinkIcon/></a> columns also depends on the configured maximum packet size in the client/server protocol and available memory. Each <a href="https://dev.mysql.com/doc/refman/8.0/en/blob.html" target="_blank" rel="noopener noreferrer"><code v-pre>LONGTEXT</code><ExternalLinkIcon/></a> value is stored using a 4-byte length prefix that indicates the number of bytes in the value.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/enum.html" target="_blank" rel="noopener noreferrer"><code v-pre>ENUM('*</code>value1<code v-pre>*','*</code>value2<code v-pre>*',...) [CHARACTER SET *</code>charset_name<code v-pre>*\] [COLLATE *</code>collation_name<code v-pre>*]</code><ExternalLinkIcon/></a></p>
<p>An enumeration. A string object that can have only one value, chosen from the list of values <code v-pre>'*</code>value1<code v-pre>*'</code>, <code v-pre>'*</code>value2<code v-pre>*'</code>, <code v-pre>...</code>, <code v-pre>NULL</code> or the special <code v-pre>''</code> error value. <a href="https://dev.mysql.com/doc/refman/8.0/en/enum.html" target="_blank" rel="noopener noreferrer"><code v-pre>ENUM</code><ExternalLinkIcon/></a> values are represented internally as integers.</p>
<p>An <a href="https://dev.mysql.com/doc/refman/8.0/en/enum.html" target="_blank" rel="noopener noreferrer"><code v-pre>ENUM</code><ExternalLinkIcon/></a> column can have a maximum of 65,535 distinct elements.</p>
<p>The maximum supported length of an individual <code v-pre>ENUM</code> element is <em><code v-pre>M</code></em> &lt;= 255 and (<em><code v-pre>M</code></em> x <em><code v-pre>w</code></em>) &lt;= 1020, where <code v-pre>M</code> is the element literal length and <em><code v-pre>w</code></em> is the number of bytes required for the maximum-length character in the character set.</p>
</li>
<li>
<p><a href="https://dev.mysql.com/doc/refman/8.0/en/set.html" target="_blank" rel="noopener noreferrer"><code v-pre>SET('*</code>value1<code v-pre>*','*</code>value2<code v-pre>*',...) [CHARACTER SET *</code>charset_name<code v-pre>*\] [COLLATE *</code>collation_name<code v-pre>*]</code><ExternalLinkIcon/></a></p>
<p>A set. A string object that can have zero or more values, each of which must be chosen from the list of values <code v-pre>'*</code>value1<code v-pre>*'</code>, <code v-pre>'*</code>value2<code v-pre>*'</code>, <code v-pre>...</code> <a href="https://dev.mysql.com/doc/refman/8.0/en/set.html" target="_blank" rel="noopener noreferrer"><code v-pre>SET</code><ExternalLinkIcon/></a> values are represented internally as integers.</p>
<p>A <a href="https://dev.mysql.com/doc/refman/8.0/en/set.html" target="_blank" rel="noopener noreferrer"><code v-pre>SET</code><ExternalLinkIcon/></a> column can have a maximum of 64 distinct members.</p>
<p>The maximum supported length of an individual <code v-pre>SET</code> element is <em><code v-pre>M</code></em> &lt;= 255 and (<em><code v-pre>M</code></em> x <em><code v-pre>w</code></em>) &lt;= 1020, where <code v-pre>M</code> is the element literal length and <em><code v-pre>w</code></em> is the number of bytes required for the maximum-length character in the character set.</p>
</li>
</ul>
<h4 id="_3-4其他" tabindex="-1"><a class="header-anchor" href="#_3-4其他" aria-hidden="true">#</a> 3.4其他</h4>
<p>MySQL has spatial data types that correspond to OpenGIS classes. The basis for these types is described in <a href="https://dev.mysql.com/doc/refman/8.0/en/opengis-geometry-model.html" target="_blank" rel="noopener noreferrer">Section 11.4.2, “The OpenGIS Geometry Model”<ExternalLinkIcon/></a>.</p>
<p>Some spatial data types hold single geometry values:</p>
<ul>
<li><code v-pre>GEOMETRY</code></li>
<li><code v-pre>POINT</code></li>
<li><code v-pre>LINESTRING</code></li>
<li><code v-pre>POLYGON</code></li>
</ul>
<p><code v-pre>GEOMETRY</code> can store geometry values of any type. The other single-value types (<code v-pre>POINT</code>, <code v-pre>LINESTRING</code>, and <code v-pre>POLYGON</code>) restrict their values to a particular geometry type.</p>
<p>The other spatial data types hold collections of values:</p>
<ul>
<li><code v-pre>MULTIPOINT</code></li>
<li><code v-pre>MULTILINESTRING</code></li>
<li><code v-pre>MULTIPOLYGON</code></li>
<li><code v-pre>GEOMETRYCOLLECTION</code></li>
</ul>
<p><code v-pre>GEOMETRYCOLLECTION</code> can store a collection of objects of any type. The other collection types (<code v-pre>MULTIPOINT</code>, <code v-pre>MULTILINESTRING</code>, and <code v-pre>MULTIPOLYGON</code>) restrict collection members to those having a particular geometry type.</p>
<p>Example: To create a table named <code v-pre>geom</code> that has a column named <code v-pre>g</code> that can store values of any geometry type, use this statement:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> geom <span class="token punctuation">(</span>g <span class="token keyword">GEOMETRY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Columns with a spatial data type can have an <code v-pre>SRID</code> attribute, to explicitly indicate the spatial reference system (SRS) for values stored in the column. For example:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> geom <span class="token punctuation">(</span>
    p <span class="token keyword">POINT</span> SRID <span class="token number">0</span><span class="token punctuation">,</span>
    g <span class="token keyword">GEOMETRY</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> SRID <span class="token number">4326</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>SPATIAL</code> indexes can be created on spatial columns if they are <code v-pre>NOT NULL</code> and have a specific SRID, so if you plan to index the column, declare it with the <code v-pre>NOT NULL</code> and <code v-pre>SRID</code> attributes:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> geom <span class="token punctuation">(</span>g <span class="token keyword">GEOMETRY</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> SRID <span class="token number">4326</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>InnoDB</code> tables permit <code v-pre>SRID</code> values for Cartesian and geographic SRSs. <code v-pre>MyISAM</code> tables permit <code v-pre>SRID</code> values for Cartesian SRSs.</p>
<p>The <code v-pre>SRID</code> attribute makes a spatial column SRID-restricted, which has these implications:</p>
<ul>
<li>The column can contain only values with the given SRID. Attempts to insert values with a different SRID produce an error.</li>
<li>The optimizer can use <code v-pre>SPATIAL</code> indexes on the column. See <a href="https://dev.mysql.com/doc/refman/8.0/en/spatial-index-optimization.html" target="_blank" rel="noopener noreferrer">Section 8.3.3, “SPATIAL Index Optimization”<ExternalLinkIcon/></a>.</li>
</ul>
<p>Spatial columns with no <code v-pre>SRID</code> attribute are not SRID-restricted and accept values with any SRID. However, the optimizer cannot use <code v-pre>SPATIAL</code> indexes on them until the column definition is modified to include an <code v-pre>SRID</code> attribute, which may require that the column contents first be modified so that all values have the same SRID.</p>
<p>For other examples showing how to use spatial data types in MySQL, see <a href="https://dev.mysql.com/doc/refman/8.0/en/creating-spatial-columns.html" target="_blank" rel="noopener noreferrer">Section 11.4.6, “Creating Spatial Columns”<ExternalLinkIcon/></a>. For information about spatial reference systems, see <a href="https://dev.mysql.com/doc/refman/8.0/en/spatial-reference-systems.html" target="_blank" rel="noopener noreferrer">Section 11.4.5, “Spatial Reference System Support”<ExternalLinkIcon/></a>.</p>
<h2 id="_2-索引" tabindex="-1"><a class="header-anchor" href="#_2-索引" aria-hidden="true">#</a> 2.索引</h2>
<h3 id="_2-1索引的数据结构" tabindex="-1"><a class="header-anchor" href="#_2-1索引的数据结构" aria-hidden="true">#</a> 2.1索引的数据结构</h3>
<p>Understanding the B-tree and hash data structures can help predict how different queries perform on different storage engines that use these data structures in their indexes, particularly for the <code v-pre>MEMORY</code> storage engine that lets you choose B-tree or hash indexes.</p>
<ul>
<li><a href="https://dev.mysql.com/doc/refman/8.0/en/index-btree-hash.html#btree-index-characteristics" target="_blank" rel="noopener noreferrer">B-Tree Index Characteristics<ExternalLinkIcon/></a></li>
<li><a href="https://dev.mysql.com/doc/refman/8.0/en/index-btree-hash.html#hash-index-characteristics" target="_blank" rel="noopener noreferrer">Hash Index Characteristics<ExternalLinkIcon/></a></li>
</ul>
<h4 id="b-tree-index-characteristics" tabindex="-1"><a class="header-anchor" href="#b-tree-index-characteristics" aria-hidden="true">#</a> B-Tree Index Characteristics</h4>
<p>A B-tree index can be used for column comparisons in expressions that use the <a href="https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal" target="_blank" rel="noopener noreferrer"><code v-pre>=</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_greater-than" target="_blank" rel="noopener noreferrer"><code v-pre>&gt;</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_greater-than-or-equal" target="_blank" rel="noopener noreferrer"><code v-pre>&gt;=</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_less-than" target="_blank" rel="noopener noreferrer"><code v-pre>&lt;</code><ExternalLinkIcon/></a>, <a href="https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_less-than-or-equal" target="_blank" rel="noopener noreferrer"><code v-pre>&lt;=</code><ExternalLinkIcon/></a>, or <a href="https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_between" target="_blank" rel="noopener noreferrer"><code v-pre>BETWEEN</code><ExternalLinkIcon/></a> operators. The index also can be used for <a href="https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like" target="_blank" rel="noopener noreferrer"><code v-pre>LIKE</code><ExternalLinkIcon/></a> comparisons if the argument to <a href="https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like" target="_blank" rel="noopener noreferrer"><code v-pre>LIKE</code><ExternalLinkIcon/></a> is a constant string that does not start with a wildcard character. For example, the following <a href="https://dev.mysql.com/doc/refman/8.0/en/select.html" target="_blank" rel="noopener noreferrer"><code v-pre>SELECT</code><ExternalLinkIcon/></a> statements use indexes:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> tbl_name <span class="token keyword">WHERE</span> key_col <span class="token operator">LIKE</span> <span class="token string">'Patrick%'</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> tbl_name <span class="token keyword">WHERE</span> key_col <span class="token operator">LIKE</span> <span class="token string">'Pat%_ck%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>In the first statement, only rows with <code v-pre>'Patrick' &lt;= *</code>key_col<code v-pre>* &lt; 'Patricl'</code> are considered. In the second statement, only rows with <code v-pre>'Pat' &lt;= *</code>key_col<code v-pre>* &lt; 'Pau'</code> are considered.</p>
<p>The following <a href="https://dev.mysql.com/doc/refman/8.0/en/select.html" target="_blank" rel="noopener noreferrer"><code v-pre>SELECT</code><ExternalLinkIcon/></a> statements do not use indexes:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> tbl_name <span class="token keyword">WHERE</span> key_col <span class="token operator">LIKE</span> <span class="token string">'%Patrick%'</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> tbl_name <span class="token keyword">WHERE</span> key_col <span class="token operator">LIKE</span> other_col<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>In the first statement, the <a href="https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like" target="_blank" rel="noopener noreferrer"><code v-pre>LIKE</code><ExternalLinkIcon/></a> value begins with a wildcard character. In the second statement, the <a href="https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like" target="_blank" rel="noopener noreferrer"><code v-pre>LIKE</code><ExternalLinkIcon/></a> value is not a constant.</p>
<p>If you use <code v-pre>... LIKE '%*</code>string<code v-pre>*%'</code> and <em><code v-pre>string</code></em> is longer than three characters, MySQL uses the Turbo Boyer-Moore algorithm to initialize the pattern for the string and then uses this pattern to perform the search more quickly.</p>
<p>A search using <code v-pre>*</code>col_name<code v-pre>* IS NULL</code> employs indexes if <em><code v-pre>col_name</code></em> is indexed.</p>
<p>Any index that does not span all <a href="https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and" target="_blank" rel="noopener noreferrer"><code v-pre>AND</code><ExternalLinkIcon/></a> levels in the <code v-pre>WHERE</code> clause is not used to optimize the query. In other words, to be able to use an index, a prefix of the index must be used in every <a href="https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and" target="_blank" rel="noopener noreferrer"><code v-pre>AND</code><ExternalLinkIcon/></a> group.</p>
<p>The following <code v-pre>WHERE</code> clauses use indexes:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> index_part1<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">AND</span> index_part2<span class="token operator">=</span><span class="token number">2</span> <span class="token operator">AND</span> other_column<span class="token operator">=</span><span class="token number">3</span>

    <span class="token comment">/* index = 1 OR index = 2 */</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> <span class="token keyword">index</span><span class="token operator">=</span><span class="token number">1</span> <span class="token operator">OR</span> A<span class="token operator">=</span><span class="token number">10</span> <span class="token operator">AND</span> <span class="token keyword">index</span><span class="token operator">=</span><span class="token number">2</span>

    <span class="token comment">/* optimized like "index_part1='hello'" */</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> index_part1<span class="token operator">=</span><span class="token string">'hello'</span> <span class="token operator">AND</span> index_part3<span class="token operator">=</span><span class="token number">5</span>

    <span class="token comment">/* Can use index on index1 but not on index2 or index3 */</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> index1<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">AND</span> index2<span class="token operator">=</span><span class="token number">2</span> <span class="token operator">OR</span> index1<span class="token operator">=</span><span class="token number">3</span> <span class="token operator">AND</span> index3<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>These <code v-pre>WHERE</code> clauses do <em>not</em> use indexes:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>    <span class="token comment">/* index_part1 is not used */</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> index_part2<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">AND</span> index_part3<span class="token operator">=</span><span class="token number">2</span>

    <span class="token comment">/*  Index is not used in both parts of the WHERE clause  */</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> <span class="token keyword">index</span><span class="token operator">=</span><span class="token number">1</span> <span class="token operator">OR</span> A<span class="token operator">=</span><span class="token number">10</span>

    <span class="token comment">/* No index spans all rows  */</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">WHERE</span> index_part1<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">OR</span> index_part2<span class="token operator">=</span><span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Sometimes MySQL does not use an index, even if one is available. One circumstance under which this occurs is when the optimizer estimates that using the index would require MySQL to access a very large percentage of the rows in the table. (In this case, a table scan is likely to be much faster because it requires fewer seeks.) However, if such a query uses <code v-pre>LIMIT</code> to retrieve only some of the rows, MySQL uses an index anyway, because it can much more quickly find the few rows to return in the result.</p>
<h4 id="hash-index-characteristics" tabindex="-1"><a class="header-anchor" href="#hash-index-characteristics" aria-hidden="true">#</a> Hash Index Characteristics</h4>
<p>Hash indexes have somewhat different characteristics from those just discussed:</p>
<ul>
<li>They are used only for equality comparisons that use the <code v-pre>=</code> or <code v-pre>&lt;=&gt;</code> operators (but are <em>very</em> fast). They are not used for comparison operators such as <code v-pre>&lt;</code> that find a range of values. Systems that rely on this type of single-value lookup are known as “key-value stores”; to use MySQL for such applications, use hash indexes wherever possible.</li>
<li>The optimizer cannot use a hash index to speed up <code v-pre>ORDER BY</code> operations. (This type of index cannot be used to search for the next entry in order.)</li>
<li>MySQL cannot determine approximately how many rows there are between two values (this is used by the range optimizer to decide which index to use). This may affect some queries if you change a <code v-pre>MyISAM</code> or <code v-pre>InnoDB</code> table to a hash-indexed <code v-pre>MEMORY</code> table.</li>
<li>Only whole keys can be used to search for a row. (With a B-tree index, any leftmost prefix of the key can be used to find rows.)</li>
</ul>
<p>The following diagram shows in-memory and on-disk structures that comprise the <code v-pre>InnoDB</code> storage engine architecture. For information about each structure, see <a href="https://dev.mysql.com/doc/refman/8.0/en/innodb-in-memory-structures.html" target="_blank" rel="noopener noreferrer">Section 15.5, “InnoDB In-Memory Structures”<ExternalLinkIcon/></a>, and <a href="https://dev.mysql.com/doc/refman/8.0/en/innodb-on-disk-structures.html" target="_blank" rel="noopener noreferrer">Section 15.6, “InnoDB On-Disk Structures”<ExternalLinkIcon/></a>.</p>
</div></template>



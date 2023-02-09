<template><div><div class="custom-container tip">
<p class="custom-container-title">C Program</p>
<p><strong>C</strong> (<em>pronounced like the letter c</em>) is a general-purpose computer programming language. It was created in the 1970s by <a href="https://en.wikipedia.org/wiki/Dennis_Ritchie" target="_blank" rel="noopener noreferrer">Dennis Ritchie<ExternalLinkIcon/></a>, and remains very widely used and influential.  																					 			‘</p>
<p>​																												<strong>——Wikipedia</strong></p>
<p><strong>C Program Main standard</strong></p>
<p><strong>C99</strong></p>
<p>The C standard was further revised in the late 1990s, leading to the publication of ISO/IEC 9899:1999 in 1999, which is commonly referred to as &quot;<strong>C99</strong>&quot;. It has since been amended three times by Technical Corrigenda.</p>
<p><strong>C11</strong></p>
<p>In 2007, work began on another revision of the C standard, informally called &quot;<strong>C1X</strong>&quot; until its official publication of ISO/IEC 9899:2011 on 2011-12-08. The C standards committee adopted guidelines to limit the adoption of new features that had not been tested by existing implementations.</p>
<p><strong>C17</strong></p>
<p>Published in June 2018 as ISO/IEC 9899:2018, C17 is the current standard for the C programming language. It introduces no new language features, only technical corrections, and clarifications to defects in C11.</p>
<p><strong>C reference</strong></p>
<p><a href="https://www.iso.org/standard/74528.html" target="_blank" rel="noopener noreferrer">C标准文档<ExternalLinkIcon/></a></p>
<p><a href="https://en.cppreference.com/w/c" target="_blank" rel="noopener noreferrer">C在线文档<ExternalLinkIcon/></a></p>
</div>
<h3 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Data Type</th>
<th style="text-align:center">Size</th>
<th style="text-align:center">Range Range</th>
<th style="text-align:center">Description Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>char</code></td>
<td style="text-align:center">1 byte</td>
<td style="text-align:center"><code v-pre>−128</code> ~ <code v-pre>127</code></td>
<td style="text-align:center">single character/alphanumeric/ASCII</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>signed char</code></td>
<td style="text-align:center">1 byte</td>
<td style="text-align:center"><code v-pre>−128</code> ~ <code v-pre>127</code></td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>unsigned char</code></td>
<td style="text-align:center">1 byte</td>
<td style="text-align:center"><code v-pre>0</code> ~ <code v-pre>255</code></td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>int</code></td>
<td style="text-align:center"><code v-pre>2</code> to <code v-pre>4</code> bytes</td>
<td style="text-align:center"><code v-pre>−32,768</code> ~ <code v-pre>32,767</code></td>
<td style="text-align:center">store integers</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>signed int</code></td>
<td style="text-align:center">2 bytes</td>
<td style="text-align:center"><code v-pre>−32,768</code> ~ <code v-pre>32,767</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>unsigned int</code></td>
<td style="text-align:center">2 bytes</td>
<td style="text-align:center"><code v-pre>0</code> ~ <code v-pre>65,535</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>short int</code></td>
<td style="text-align:center">2 bytes</td>
<td style="text-align:center"><code v-pre>−32,768</code> ~ <code v-pre>32,767</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>signed short int</code></td>
<td style="text-align:center">2 bytes</td>
<td style="text-align:center"><code v-pre>−32,768</code> ~ <code v-pre>32,767</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>unsigned short int</code></td>
<td style="text-align:center">2 bytes</td>
<td style="text-align:center"><code v-pre>0</code> ~ <code v-pre>65,535</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>long int</code></td>
<td style="text-align:center">4 bytes</td>
<td style="text-align:center"><code v-pre>-2,147,483,648</code> ~ <code v-pre>2,147,483,647</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>signed long int</code></td>
<td style="text-align:center">4 bytes</td>
<td style="text-align:center"><code v-pre>-2,147,483,648</code> ~ <code v-pre>2,147,483,647</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>unsigned long int</code></td>
<td style="text-align:center">4 bytes</td>
<td style="text-align:center"><code v-pre>0</code> ~ <code v-pre>4,294,967,295</code></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>float</code></td>
<td style="text-align:center">4 bytes</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>double</code></td>
<td style="text-align:center">8 bytes</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>long double</code></td>
<td style="text-align:center">10 bytes</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
</div></template>



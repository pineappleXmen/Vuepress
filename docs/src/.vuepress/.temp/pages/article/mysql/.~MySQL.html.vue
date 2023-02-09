<template><div><h2 id="sql基础语法" tabindex="-1"><a class="header-anchor" href="#sql基础语法" aria-hidden="true">#</a> <strong>SQL基础语法</strong></h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>- DDL: 数据定义语言，用来定义数据库对象（数据库、表、字段）
- DML: 数据操作语言，用来对数据库表中的数据进行增删改
- DQL: 数据查询语言，用来查询数据库中表的记录
- DCL: 数据控制语言，用来创建数据库用户、控制数据库的控制权限
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ddl-数据定义语言" tabindex="-1"><a class="header-anchor" href="#ddl-数据定义语言" aria-hidden="true">#</a> <strong>DDL（数据定义语言）</strong></h3>
<p>查询所有数据库：<code v-pre>SHOW DATABASES;</code></p>
<p>查询当前数据库：<code v-pre>SELECT DATABASE();</code></p>
<p>创建数据库：<code v-pre>CREATE DATABASE [ IF NOT EXISTS ] 数据库名 [ DEFAULT CHARSET 字符集] [COLLATE 排序规则 ];</code></p>
<p>删除数据库：<code v-pre>DROP DATABASE [ IF EXISTS ] 数据库名;</code></p>
<p>使用数据库：<code v-pre>USE 数据库名;</code></p>
<h5 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h5>
<ul>
<li>UTF8字符集长度为3字节，有些符号占4字节，所以推荐用utf8mb4字符集</li>
</ul>
<h4 id="表操作" tabindex="-1"><a class="header-anchor" href="#表操作" aria-hidden="true">#</a> 表操作</h4>
<p>查询当前数据库所有表：<code v-pre>SHOW TABLES;</code></p>
<p>查询表结构：<code v-pre>DESC 表名;</code></p>
<p>查询指定表的建表语句：<code v-pre>SHOW CREATE TABLE 表名;</code></p>
<p>创建表：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>CREATE TABLE 表名(
	字段1 字段1类型 [COMMENT 字段1注释],
	字段2 字段2类型 [COMMENT 字段2注释],
	字段3 字段3类型 [COMMENT 字段3注释],
	...
	字段n 字段n类型 [COMMENT 字段n注释]
)[ COMMENT 表注释 ];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后一个字段后面没有逗号</strong></p>
<p>添加字段：
<code v-pre>ALTER TABLE 表名 ADD 字段名 类型(长度) [COMMENT 注释] [约束];</code>
例：<code v-pre>ALTER TABLE emp ADD nickname varchar(20) COMMENT '昵称';</code></p>
<p>修改数据类型：
<code v-pre>ALTER TABLE 表名 MODIFY 字段名 新数据类型(长度);</code>
修改字段名和字段类型：
<code v-pre>ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型(长度) [COMMENT 注释] [约束];</code>
例：将emp表的nickname字段修改为username，类型为varchar(30)
<code v-pre>ALTER TABLE emp CHANGE nickname username varchar(30) COMMENT '昵称';</code></p>
<p>删除字段：
<code v-pre>ALTER TABLE 表名 DROP 字段名;</code></p>
<p>修改表名：
<code v-pre>ALTER TABLE 表名 RENAME TO 新表名</code></p>
<p>删除表：
<code v-pre>DROP TABLE [IF EXISTS] 表名;</code>
删除表，并重新创建该表：
<code v-pre>TRUNCATE TABLE 表名;</code></p>
<h3 id="dml-数据操作语言" tabindex="-1"><a class="header-anchor" href="#dml-数据操作语言" aria-hidden="true">#</a> DML（数据操作语言）</h3>
<h4 id="添加数据" tabindex="-1"><a class="header-anchor" href="#添加数据" aria-hidden="true">#</a> 添加数据</h4>
<p>指定字段：
<code v-pre>INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...);</code>
全部字段：
<code v-pre>INSERT INTO 表名 VALUES (值1, 值2, ...);</code></p>
<p>批量添加数据：
<code v-pre>INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);</code>
<code v-pre>INSERT INTO 表名 VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);</code></p>
<h5 id="注意事项-1" tabindex="-1"><a class="header-anchor" href="#注意事项-1" aria-hidden="true">#</a> 注意事项</h5>
<ul>
<li>字符串和日期类型数据应该包含在引号中</li>
<li>插入的数据大小应该在字段的规定范围内</li>
</ul>
<h4 id="更新和删除数据" tabindex="-1"><a class="header-anchor" href="#更新和删除数据" aria-hidden="true">#</a> 更新和删除数据</h4>
<p>修改数据：
<code v-pre>UPDATE 表名 SET 字段名1 = 值1, 字段名2 = 值2, ... [ WHERE 条件 ];</code>
例：
<code v-pre>UPDATE emp SET name = 'Jack' WHERE id = 1;</code></p>
<p>删除数据：
<code v-pre>DELETE FROM 表名 [ WHERE 条件 ];</code></p>
<h3 id="dql-数据查询语言" tabindex="-1"><a class="header-anchor" href="#dql-数据查询语言" aria-hidden="true">#</a> DQL（数据查询语言）</h3>
<p>语法：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT
	字段列表
FROM
	表名字段
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后的条件列表
ORDER BY
	排序字段列表
LIMIT
	分页参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="基础查询" tabindex="-1"><a class="header-anchor" href="#基础查询" aria-hidden="true">#</a> 基础查询</h4>
<p>查询多个字段：
<code v-pre>SELECT 字段1, 字段2, 字段3, ... FROM 表名;</code>
<code v-pre>SELECT * FROM 表名;</code></p>
<p>设置别名：
<code v-pre>SELECT 字段1 [ AS 别名1 ], 字段2 [ AS 别名2 ], 字段3 [ AS 别名3 ], ... FROM 表名;</code>
<code v-pre>SELECT 字段1 [ 别名1 ], 字段2 [ 别名2 ], 字段3 [ 别名3 ], ... FROM 表名;</code></p>
<p>去除重复记录：
<code v-pre>SELECT DISTINCT 字段列表 FROM 表名;</code></p>
<p>转义：
<code v-pre>SELECT * FROM 表名 WHERE name LIKE '/_张三' ESCAPE '/'</code>
/ 之后的_不作为通配符</p>
<h4 id="条件查询" tabindex="-1"><a class="header-anchor" href="#条件查询" aria-hidden="true">#</a> 条件查询</h4>
<p>语法：
<code v-pre>SELECT 字段列表 FROM 表名 WHERE 条件列表;</code></p>
<p>条件：</p>
<table>
<thead>
<tr>
<th>比较运算符</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>&gt;</td>
<td>大于</td>
</tr>
<tr>
<td>&gt;=</td>
<td>大于等于</td>
</tr>
<tr>
<td>&lt;</td>
<td>小于</td>
</tr>
<tr>
<td>&lt;=</td>
<td>小于等于</td>
</tr>
<tr>
<td>=</td>
<td>等于</td>
</tr>
<tr>
<td>&lt;&gt; 或 !=</td>
<td>不等于</td>
</tr>
<tr>
<td>BETWEEN ... AND ...</td>
<td>在某个范围内（含最小、最大值）</td>
</tr>
<tr>
<td>IN(...)</td>
<td>在in之后的列表中的值，多选一</td>
</tr>
<tr>
<td>LIKE 占位符</td>
<td>模糊匹配（_匹配单个字符，%匹配任意个字符）</td>
</tr>
<tr>
<td>IS NULL</td>
<td>是NULL</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>逻辑运算符</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>AND 或 &amp;&amp;</td>
<td>并且（多个条件同时成立）</td>
</tr>
<tr>
<td>OR 或 ||</td>
<td>或者（多个条件任意一个成立）</td>
</tr>
<tr>
<td>NOT 或 !</td>
<td>非，不是</td>
</tr>
</tbody>
</table>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 年龄等于30
select * from employee where age = 30;
-- 年龄小于30
select * from employee where age &lt; 30;
-- 小于等于
select * from employee where age &lt;= 30;
-- 没有身份证
select * from employee where idcard is null or idcard = '';
-- 有身份证
select * from employee where idcard;
select * from employee where idcard is not null;
-- 不等于
select * from employee where age != 30;
-- 年龄在20到30之间
select * from employee where age between 20 and 30;
select * from employee where age &gt;= 20 and age &lt;= 30;
-- 下面语句不报错，但查不到任何信息
select * from employee where age between 30 and 20;
-- 性别为女且年龄小于30
select * from employee where age &lt; 30 and gender = '女';
-- 年龄等于25或30或35
select * from employee where age = 25 or age = 30 or age = 35;
select * from employee where age in (25, 30, 35);
-- 姓名为两个字
select * from employee where name like '__';
-- 身份证最后为X
select * from employee where idcard like '%X';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="聚合查询-聚合函数" tabindex="-1"><a class="header-anchor" href="#聚合查询-聚合函数" aria-hidden="true">#</a> 聚合查询（聚合函数）</h4>
<p>常见聚合函数：</p>
<table>
<thead>
<tr>
<th>函数</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>count</td>
<td>统计数量</td>
</tr>
<tr>
<td>max</td>
<td>最大值</td>
</tr>
<tr>
<td>min</td>
<td>最小值</td>
</tr>
<tr>
<td>avg</td>
<td>平均值</td>
</tr>
<tr>
<td>sum</td>
<td>求和</td>
</tr>
</tbody>
</table>
<p>语法：
<code v-pre>SELECT 聚合函数(字段列表) FROM 表名;</code>
例：
<code v-pre>SELECT count(id) from employee where workaddress = &quot;广东省&quot;;</code></p>
<h4 id="分组查询" tabindex="-1"><a class="header-anchor" href="#分组查询" aria-hidden="true">#</a> 分组查询</h4>
<p>语法：
<code v-pre>SELECT 字段列表 FROM 表名 [ WHERE 条件 ] GROUP BY 分组字段名 [ HAVING 分组后的过滤条件 ];</code></p>
<p>where 和 having 的区别：</p>
<ul>
<li>执行时机不同：where是分组之前进行过滤，不满足where条件不参与分组；having是分组后对结果进行过滤。</li>
<li>判断条件不同：where不能对聚合函数进行判断，而having可以。</li>
</ul>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 根据性别分组，统计男性和女性数量（只显示分组数量，不显示哪个是男哪个是女）
select count(*) from employee group by gender;
-- 根据性别分组，统计男性和女性数量
select gender, count(*) from employee group by gender;
-- 根据性别分组，统计男性和女性的平均年龄
select gender, avg(age) from employee group by gender;
-- 年龄小于45，并根据工作地址分组
select workaddress, count(*) from employee where age &lt; 45 group by workaddress;
-- 年龄小于45，并根据工作地址分组，获取员工数量大于等于3的工作地址
select workaddress, count(*) address_count from employee where age &lt; 45 group by workaddress having address_count &gt;= 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="注意事项-2" tabindex="-1"><a class="header-anchor" href="#注意事项-2" aria-hidden="true">#</a> 注意事项</h5>
<ul>
<li>执行顺序：where &gt; 聚合函数 &gt; having</li>
<li>分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义</li>
</ul>
<h4 id="排序查询" tabindex="-1"><a class="header-anchor" href="#排序查询" aria-hidden="true">#</a> 排序查询</h4>
<p>语法：
<code v-pre>SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1, 字段2 排序方式2;</code></p>
<p>排序方式：</p>
<ul>
<li>ASC: 升序（默认）</li>
<li>DESC: 降序</li>
</ul>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 根据年龄升序排序
SELECT * FROM employee ORDER BY age ASC;
SELECT * FROM employee ORDER BY age;
-- 两字段排序，根据年龄升序排序，入职时间降序排序
SELECT * FROM employee ORDER BY age ASC, entrydate DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="注意事项-3" tabindex="-1"><a class="header-anchor" href="#注意事项-3" aria-hidden="true">#</a> 注意事项</h5>
<p>如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序</p>
<h4 id="分页查询" tabindex="-1"><a class="header-anchor" href="#分页查询" aria-hidden="true">#</a> 分页查询</h4>
<p>语法：
<code v-pre>SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数;</code></p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询第一页数据，展示10条
SELECT * FROM employee LIMIT 0, 10;
-- 查询第二页
SELECT * FROM employee LIMIT 10, 10;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="注意事项-4" tabindex="-1"><a class="header-anchor" href="#注意事项-4" aria-hidden="true">#</a> 注意事项</h5>
<ul>
<li>起始索引从0开始，起始索引 = （查询页码 - 1） * 每页显示记录数</li>
<li>分页查询是数据库的方言，不同数据库有不同实现，MySQL是LIMIT</li>
<li>如果查询的是第一页数据，起始索引可以省略，直接简写 LIMIT 10</li>
</ul>
<h4 id="dql执行顺序" tabindex="-1"><a class="header-anchor" href="#dql执行顺序" aria-hidden="true">#</a> DQL执行顺序</h4>
<p>FROM -&gt; WHERE -&gt; GROUP BY -&gt; SELECT -&gt; ORDER BY -&gt; LIMIT</p>
<h3 id="dcl" tabindex="-1"><a class="header-anchor" href="#dcl" aria-hidden="true">#</a> DCL</h3>
<h4 id="管理用户" tabindex="-1"><a class="header-anchor" href="#管理用户" aria-hidden="true">#</a> 管理用户</h4>
<p>查询用户：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>USE mysql;
SELECT * FROM user;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建用户:
<code v-pre>CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';</code></p>
<p>修改用户密码：
<code v-pre>ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码';</code></p>
<p>删除用户：
<code v-pre>DROP USER '用户名'@'主机名';</code></p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 创建用户test，只能在当前主机localhost访问
create user 'test'@'localhost' identified by '123456';
-- 创建用户test，能在任意主机访问
create user 'test'@'%' identified by '123456';
create user 'test' identified by '123456';
-- 修改密码
alter user 'test'@'localhost' identified with mysql_native_password by '1234';
-- 删除用户
drop user 'test'@'localhost';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="注意事项-5" tabindex="-1"><a class="header-anchor" href="#注意事项-5" aria-hidden="true">#</a> 注意事项</h5>
<ul>
<li>主机名可以使用 % 通配</li>
</ul>
<h4 id="权限控制" tabindex="-1"><a class="header-anchor" href="#权限控制" aria-hidden="true">#</a> 权限控制</h4>
<p>常用权限：</p>
<table>
<thead>
<tr>
<th>权限</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>ALL, ALL PRIVILEGES</td>
<td>所有权限</td>
</tr>
<tr>
<td>SELECT</td>
<td>查询数据</td>
</tr>
<tr>
<td>INSERT</td>
<td>插入数据</td>
</tr>
<tr>
<td>UPDATE</td>
<td>修改数据</td>
</tr>
<tr>
<td>DELETE</td>
<td>删除数据</td>
</tr>
<tr>
<td>ALTER</td>
<td>修改表</td>
</tr>
<tr>
<td>DROP</td>
<td>删除数据库/表/视图</td>
</tr>
<tr>
<td>CREATE</td>
<td>创建数据库/表</td>
</tr>
</tbody>
</table>
<p>更多权限请看<a href="#%E6%9D%83%E9%99%90%E4%B8%80%E8%A7%88%E8%A1%A8" title="权限一览表">权限一览表</a></p>
<p>查询权限：
<code v-pre>SHOW GRANTS FOR '用户名'@'主机名';</code></p>
<p>授予权限：
<code v-pre>GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';</code></p>
<p>撤销权限：
<code v-pre>REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';</code></p>
<h5 id="注意事项-6" tabindex="-1"><a class="header-anchor" href="#注意事项-6" aria-hidden="true">#</a> 注意事项</h5>
<ul>
<li>多个权限用逗号分隔</li>
<li>授权时，数据库名和表名可以用 * 进行通配，代表所有</li>
</ul>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<ul>
<li>字符串函数</li>
<li>数值函数</li>
<li>日期函数</li>
<li>流程函数</li>
</ul>
<h3 id="字符串函数" tabindex="-1"><a class="header-anchor" href="#字符串函数" aria-hidden="true">#</a> 字符串函数</h3>
<p>常用函数：</p>
<table>
<thead>
<tr>
<th>函数</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>CONCAT(s1, s2, ..., sn)</td>
<td>字符串拼接，将s1, s2, ..., sn拼接成一个字符串</td>
</tr>
<tr>
<td>LOWER(str)</td>
<td>将字符串全部转为小写</td>
</tr>
<tr>
<td>UPPER(str)</td>
<td>将字符串全部转为大写</td>
</tr>
<tr>
<td>LPAD(str, n, pad)</td>
<td>左填充，用字符串pad对str的左边进行填充，达到n个字符串长度</td>
</tr>
<tr>
<td>RPAD(str, n, pad)</td>
<td>右填充，用字符串pad对str的右边进行填充，达到n个字符串长度</td>
</tr>
<tr>
<td>TRIM(str)</td>
<td>去掉字符串头部和尾部的空格</td>
</tr>
<tr>
<td>SUBSTRING(str, start, len)</td>
<td>返回从字符串str从start位置起的len个长度的字符串</td>
</tr>
</tbody>
</table>
<p>使用示例：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 拼接
SELECT CONCAT('Hello', 'World');
-- 小写
SELECT LOWER('Hello');
-- 大写
SELECT UPPER('Hello');
-- 左填充
SELECT LPAD('01', 5, '-');
-- 右填充
SELECT RPAD('01', 5, '-');
-- 去除空格
SELECT TRIM(' Hello World ');
-- 切片（起始索引为1）
SELECT SUBSTRING('Hello World', 1, 5);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数值函数" tabindex="-1"><a class="header-anchor" href="#数值函数" aria-hidden="true">#</a> 数值函数</h3>
<p>常见函数：</p>
<table>
<thead>
<tr>
<th>函数</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>CEIL(x)</td>
<td>向上取整</td>
</tr>
<tr>
<td>FLOOR(x)</td>
<td>向下取整</td>
</tr>
<tr>
<td>MOD(x, y)</td>
<td>返回x/y的模</td>
</tr>
<tr>
<td>RAND()</td>
<td>返回0~1内的随机数</td>
</tr>
<tr>
<td>ROUND(x, y)</td>
<td>求参数x的四舍五入值，保留y位小数</td>
</tr>
</tbody>
</table>
<h3 id="日期函数" tabindex="-1"><a class="header-anchor" href="#日期函数" aria-hidden="true">#</a> 日期函数</h3>
<p>常用函数：</p>
<table>
<thead>
<tr>
<th>函数</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>CURDATE()</td>
<td>返回当前日期</td>
</tr>
<tr>
<td>CURTIME()</td>
<td>返回当前时间</td>
</tr>
<tr>
<td>NOW()</td>
<td>返回当前日期和时间</td>
</tr>
<tr>
<td>YEAR(date)</td>
<td>获取指定date的年份</td>
</tr>
<tr>
<td>MONTH(date)</td>
<td>获取指定date的月份</td>
</tr>
<tr>
<td>DAY(date)</td>
<td>获取指定date的日期</td>
</tr>
<tr>
<td>DATE_ADD(date, INTERVAL expr type)</td>
<td>返回一个日期/时间值加上一个时间间隔expr后的时间值</td>
</tr>
<tr>
<td>DATEDIFF(date1, date2)</td>
<td>返回起始时间date1和结束时间date2之间的天数</td>
</tr>
</tbody>
</table>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- DATE_ADD
SELECT DATE_ADD(NOW(), INTERVAL 70 YEAR);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="流程函数" tabindex="-1"><a class="header-anchor" href="#流程函数" aria-hidden="true">#</a> 流程函数</h3>
<p>常用函数：</p>
<table>
<thead>
<tr>
<th>函数</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>IF(value, t, f)</td>
<td>如果value为true，则返回t，否则返回f</td>
</tr>
<tr>
<td>IFNULL(value1, value2)</td>
<td>如果value1不为空，返回value1，否则返回value2</td>
</tr>
<tr>
<td>CASE WHEN [ val1 ] THEN [ res1 ] ... ELSE [ default ] END</td>
<td>如果val1为true，返回res1，... 否则返回default默认值</td>
</tr>
<tr>
<td>CASE [ expr ] WHEN [ val1 ] THEN [ res1 ] ... ELSE [ default ] END</td>
<td>如果expr的值等于val1，返回res1，... 否则返回default默认值</td>
</tr>
</tbody>
</table>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>select
	name,
	(case when age &gt; 30 then '中年' else '青年' end)
from employee;
select
	name,
	(case workaddress when '北京市' then '一线城市' when '上海市' then '一线城市' else '二线城市' end) as '工作地址'
from employee;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="约束" tabindex="-1"><a class="header-anchor" href="#约束" aria-hidden="true">#</a> 约束</h2>
<p>分类：</p>
<table>
<thead>
<tr>
<th>约束</th>
<th>描述</th>
<th>关键字</th>
</tr>
</thead>
<tbody>
<tr>
<td>非空约束</td>
<td>限制该字段的数据不能为null</td>
<td>NOT NULL</td>
</tr>
<tr>
<td>唯一约束</td>
<td>保证该字段的所有数据都是唯一、不重复的</td>
<td>UNIQUE</td>
</tr>
<tr>
<td>主键约束</td>
<td>主键是一行数据的唯一标识，要求非空且唯一</td>
<td>PRIMARY KEY</td>
</tr>
<tr>
<td>默认约束</td>
<td>保存数据时，如果未指定该字段的值，则采用默认值</td>
<td>DEFAULT</td>
</tr>
<tr>
<td>检查约束（8.0.1版本后）</td>
<td>保证字段值满足某一个条件</td>
<td>CHECK</td>
</tr>
<tr>
<td>外键约束</td>
<td>用来让两张图的数据之间建立连接，保证数据的一致性和完整性</td>
<td>FOREIGN KEY</td>
</tr>
</tbody>
</table>
<p>约束是作用于表中字段上的，可以再创建表/修改表的时候添加约束。</p>
<h3 id="常用约束" tabindex="-1"><a class="header-anchor" href="#常用约束" aria-hidden="true">#</a> 常用约束</h3>
<table>
<thead>
<tr>
<th>约束条件</th>
<th>关键字</th>
</tr>
</thead>
<tbody>
<tr>
<td>主键</td>
<td>PRIMARY KEY</td>
</tr>
<tr>
<td>自动增长</td>
<td>AUTO_INCREMENT</td>
</tr>
<tr>
<td>不为空</td>
<td>NOT NULL</td>
</tr>
<tr>
<td>唯一</td>
<td>UNIQUE</td>
</tr>
<tr>
<td>逻辑条件</td>
<td>CHECK</td>
</tr>
<tr>
<td>默认值</td>
<td>DEFAULT</td>
</tr>
</tbody>
</table>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>create table user(
	id int primary key auto_increment,
	name varchar(10) not null unique,
	age int check(age &gt; 0 and age &lt; 120),
	status char(1) default '1',
	gender char(1)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="外键约束" tabindex="-1"><a class="header-anchor" href="#外键约束" aria-hidden="true">#</a> 外键约束</h3>
<p>添加外键：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>CREATE TABLE 表名(
	字段名 字段类型,
	...
	[CONSTRAINT] [外键名称] FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名)
);
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名) REFERENCES 主表(主表列名);

-- 例子
alter table emp add constraint fk_emp_dept_id foreign key(dept_id) references dept(id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除外键：
<code v-pre>ALTER TABLE 表名 DROP FOREIGN KEY 外键名;</code></p>
<h4 id="删除-更新行为" tabindex="-1"><a class="header-anchor" href="#删除-更新行为" aria-hidden="true">#</a> 删除/更新行为</h4>
<table>
<thead>
<tr>
<th>行为</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>NO ACTION</td>
<td>当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新（与RESTRICT一致）</td>
</tr>
<tr>
<td>RESTRICT</td>
<td>当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新（与NO ACTION一致）</td>
</tr>
<tr>
<td>CASCADE</td>
<td>当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则也删除/更新外键在子表中的记录</td>
</tr>
<tr>
<td>SET NULL</td>
<td>当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（要求该外键允许为null）</td>
</tr>
<tr>
<td>SET DEFAULT</td>
<td>父表有变更时，子表将外键设为一个默认值（Innodb不支持）</td>
</tr>
</tbody>
</table>
<p>更改删除/更新行为：
<code v-pre>ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段) REFERENCES 主表名(主表字段名) ON UPDATE 行为 ON DELETE 行为;</code></p>
<h2 id="多表查询" tabindex="-1"><a class="header-anchor" href="#多表查询" aria-hidden="true">#</a> 多表查询</h2>
<h3 id="多表关系" tabindex="-1"><a class="header-anchor" href="#多表关系" aria-hidden="true">#</a> 多表关系</h3>
<ul>
<li>一对多（多对一）</li>
<li>多对多</li>
<li>一对一</li>
</ul>
<h4 id="一对多" tabindex="-1"><a class="header-anchor" href="#一对多" aria-hidden="true">#</a> 一对多</h4>
<p>案例：部门与员工
关系：一个部门对应多个员工，一个员工对应一个部门
实现：在多的一方建立外键，指向一的一方的主键</p>
<h4 id="多对多" tabindex="-1"><a class="header-anchor" href="#多对多" aria-hidden="true">#</a> 多对多</h4>
<p>案例：学生与课程
关系：一个学生可以选多门课程，一门课程也可以供多个学生选修
实现：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键</p>
<h4 id="一对一" tabindex="-1"><a class="header-anchor" href="#一对一" aria-hidden="true">#</a> 一对一</h4>
<p>案例：用户与用户详情
关系：一对一关系，多用于单表拆分，将一张表的基础字段放在一张表中，其他详情字段放在另一张表中，以提升操作效率
实现：在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的（UNIQUE）</p>
<h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h3>
<p>合并查询（笛卡尔积，会展示所有组合结果）：
<code v-pre>select * from employee, dept;</code></p>
<blockquote>
<p>笛卡尔积：两个集合A集合和B集合的所有组合情况（在多表查询时，需要消除无效的笛卡尔积）</p>
</blockquote>
<p>消除无效笛卡尔积：
<code v-pre>select * from employee, dept where employee.dept = dept.id;</code></p>
<h3 id="内连接查询" tabindex="-1"><a class="header-anchor" href="#内连接查询" aria-hidden="true">#</a> 内连接查询</h3>
<p>内连接查询的是两张表交集的部分</p>
<p>隐式内连接：
<code v-pre>SELECT 字段列表 FROM 表1, 表2 WHERE 条件 ...;</code></p>
<p>显式内连接：
<code v-pre>SELECT 字段列表 FROM 表1 [ INNER ] JOIN 表2 ON 连接条件 ...;</code></p>
<p>显式性能比隐式高</p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询员工姓名，及关联的部门的名称
-- 隐式
select e.name, d.name from employee as e, dept as d where e.dept = d.id;
-- 显式
select e.name, d.name from employee as e inner join dept as d on e.dept = d.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="外连接查询" tabindex="-1"><a class="header-anchor" href="#外连接查询" aria-hidden="true">#</a> 外连接查询</h3>
<p>左外连接：
查询左表所有数据，以及两张表交集部分数据
<code v-pre>SELECT 字段列表 FROM 表1 LEFT [ OUTER ] JOIN 表2 ON 条件 ...;</code>
相当于查询表1的所有数据，包含表1和表2交集部分数据</p>
<p>右外连接：
查询右表所有数据，以及两张表交集部分数据
<code v-pre>SELECT 字段列表 FROM 表1 RIGHT [ OUTER ] JOIN 表2 ON 条件 ...;</code></p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 左
select e.*, d.name from employee as e left outer join dept as d on e.dept = d.id;
select d.name, e.* from dept d left outer join emp e on e.dept = d.id;  -- 这条语句与下面的语句效果一样
-- 右
select d.name, e.* from employee as e right outer join dept as d on e.dept = d.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>左连接可以查询到没有dept的employee，右连接可以查询到没有employee的dept</p>
<h3 id="自连接查询" tabindex="-1"><a class="header-anchor" href="#自连接查询" aria-hidden="true">#</a> 自连接查询</h3>
<p>当前表与自身的连接查询，自连接必须使用表别名</p>
<p>语法：
<code v-pre>SELECT 字段列表 FROM 表A 别名A JOIN 表A 别名B ON 条件 ...;</code></p>
<p>自连接查询，可以是内连接查询，也可以是外连接查询</p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询员工及其所属领导的名字
select a.name, b.name from employee a, employee b where a.manager = b.id;
-- 没有领导的也查询出来
select a.name, b.name from employee a left join employee b on a.manager = b.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="联合查询-union-union-all" tabindex="-1"><a class="header-anchor" href="#联合查询-union-union-all" aria-hidden="true">#</a> 联合查询 union, union all</h3>
<p>把多次查询的结果合并，形成一个新的查询集</p>
<p>语法：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT 字段列表 FROM 表A ...
UNION [ALL]
SELECT 字段列表 FROM 表B ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="注意事项-7" tabindex="-1"><a class="header-anchor" href="#注意事项-7" aria-hidden="true">#</a> 注意事项</h4>
<ul>
<li>UNION ALL 会有重复结果，UNION 不会</li>
<li>联合查询比使用or效率高，不会使索引失效</li>
</ul>
<h3 id="子查询" tabindex="-1"><a class="header-anchor" href="#子查询" aria-hidden="true">#</a> 子查询</h3>
<p>SQL语句中嵌套SELECT语句，称谓嵌套查询，又称子查询。
<code v-pre>SELECT * FROM t1 WHERE column1 = ( SELECT column1 FROM t2);</code>
<strong>子查询外部的语句可以是 INSERT / UPDATE / DELETE / SELECT 的任何一个</strong></p>
<p>根据子查询结果可以分为：</p>
<ul>
<li>标量子查询（子查询结果为单个值）</li>
<li>列子查询（子查询结果为一列）</li>
<li>行子查询（子查询结果为一行）</li>
<li>表子查询（子查询结果为多行多列）</li>
</ul>
<p>根据子查询位置可分为：</p>
<ul>
<li>WHERE 之后</li>
<li>FROM 之后</li>
<li>SELECT 之后</li>
</ul>
<h4 id="标量子查询" tabindex="-1"><a class="header-anchor" href="#标量子查询" aria-hidden="true">#</a> 标量子查询</h4>
<p>子查询返回的结果是单个值（数字、字符串、日期等）。
常用操作符：- &lt; &gt; &gt; &gt;= &lt; &lt;=</p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询销售部所有员工
select id from dept where name = '销售部';
-- 根据销售部部门ID，查询员工信息
select * from employee where dept = 4;
-- 合并（子查询）
select * from employee where dept = (select id from dept where name = '销售部');

-- 查询xxx入职之后的员工信息
select * from employee where entrydate &gt; (select entrydate from employee where name = 'xxx');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="列子查询" tabindex="-1"><a class="header-anchor" href="#列子查询" aria-hidden="true">#</a> 列子查询</h4>
<p>返回的结果是一列（可以是多行）。</p>
<p>常用操作符：</p>
<table>
<thead>
<tr>
<th>操作符</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>IN</td>
<td>在指定的集合范围内，多选一</td>
</tr>
<tr>
<td>NOT IN</td>
<td>不在指定的集合范围内</td>
</tr>
<tr>
<td>ANY</td>
<td>子查询返回列表中，有任意一个满足即可</td>
</tr>
<tr>
<td>SOME</td>
<td>与ANY等同，使用SOME的地方都可以使用ANY</td>
</tr>
<tr>
<td>ALL</td>
<td>子查询返回列表的所有值都必须满足</td>
</tr>
</tbody>
</table>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询销售部和市场部的所有员工信息
select * from employee where dept in (select id from dept where name = '销售部' or name = '市场部');
-- 查询比财务部所有人工资都高的员工信息
select * from employee where salary &gt; all(select salary from employee where dept = (select id from dept where name = '财务部'));
-- 查询比研发部任意一人工资高的员工信息
select * from employee where salary &gt; any (select salary from employee where dept = (select id from dept where name = '研发部'));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="行子查询" tabindex="-1"><a class="header-anchor" href="#行子查询" aria-hidden="true">#</a> 行子查询</h4>
<p>返回的结果是一行（可以是多列）。
常用操作符：=, &lt;, &gt;, IN, NOT IN</p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询与xxx的薪资及直属领导相同的员工信息
select * from employee where (salary, manager) = (12500, 1);
select * from employee where (salary, manager) = (select salary, manager from employee where name = 'xxx');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="表子查询" tabindex="-1"><a class="header-anchor" href="#表子查询" aria-hidden="true">#</a> 表子查询</h4>
<p>返回的结果是多行多列
常用操作符：IN</p>
<p>例子：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询与xxx1，xxx2的职位和薪资相同的员工
select * from employee where (job, salary) in (select job, salary from employee where name = 'xxx1' or name = 'xxx2');
-- 查询入职日期是2006-01-01之后的员工，及其部门信息
select e.*, d.* from (select * from employee where entrydate &gt; '2006-01-01') as e left join dept as d on e.dept = d.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="进阶篇" tabindex="-1"><a class="header-anchor" href="#进阶篇" aria-hidden="true">#</a> 进阶篇</h1>
<h2 id="存储引擎" tabindex="-1"><a class="header-anchor" href="#存储引擎" aria-hidden="true">#</a> 存储引擎</h2>
<p>MySQL体系结构：</p>
<p><img src="\mysql\MySQL体系结构_20220315034329549927.png" alt="结构图" title="结构图" loading="lazy">
<img src="https://dhc.pythonanywhere.com/media/editor/MySQL体系结构层级含义_20220315034359342837.png" alt="层级描述" title="层级描述" loading="lazy"></p>
<p>存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式。存储引擎是基于表而不是基于库的，所以存储引擎也可以被称为表引擎。
默认存储引擎是InnoDB。</p>
<p>相关操作：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查询建表语句
show create table account;
-- 建表时指定存储引擎
CREATE TABLE 表名(
	...
) ENGINE=INNODB;
-- 查看当前数据库支持的存储引擎
show engines;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="innodb" tabindex="-1"><a class="header-anchor" href="#innodb" aria-hidden="true">#</a> InnoDB</h3>
<p>InnoDB 是一种兼顾高可靠性和高性能的通用存储引擎，在 MySQL 5.5 之后，InnoDB 是默认的 MySQL 引擎。</p>
<p>特点：</p>
<ul>
<li>DML 操作遵循 ACID 模型，支持<strong>事务</strong></li>
<li><strong>行级锁</strong>，提高并发访问性能</li>
<li>支持<strong>外键</strong>约束，保证数据的完整性和正确性</li>
</ul>
<p>文件：</p>
<ul>
<li>xxx.ibd: xxx代表表名，InnoDB 引擎的每张表都会对应这样一个表空间文件，存储该表的表结构（frm、sdi）、数据和索引。</li>
</ul>
<p>参数：innodb_file_per_table，决定多张表共享一个表空间还是每张表对应一个表空间</p>
<p>知识点：</p>
<p>查看 Mysql 变量：
<code v-pre>show variables like 'innodb_file_per_table';</code></p>
<p>从idb文件提取表结构数据：
（在cmd运行）
<code v-pre>ibd2sdi xxx.ibd</code></p>
<p>InnoDB 逻辑存储结构：
<img src="\mysql\逻辑存储结构_20220316030616590001.png" alt="InnoDB逻辑存储结构" title="InnoDB逻辑存储结构" loading="lazy"></p>
<h3 id="myisam" tabindex="-1"><a class="header-anchor" href="#myisam" aria-hidden="true">#</a> MyISAM</h3>
<p>MyISAM 是 MySQL 早期的默认存储引擎。</p>
<p>特点：</p>
<ul>
<li>不支持事务，不支持外键</li>
<li>支持表锁，不支持行锁</li>
<li>访问速度快</li>
</ul>
<p>文件：</p>
<ul>
<li>xxx.sdi: 存储表结构信息</li>
<li>xxx.MYD: 存储数据</li>
<li>xxx.MYI: 存储索引</li>
</ul>
<h3 id="memory" tabindex="-1"><a class="header-anchor" href="#memory" aria-hidden="true">#</a> Memory</h3>
<p>Memory 引擎的表数据是存储在内存中的，受硬件问题、断电问题的影响，只能将这些表作为临时表或缓存使用。</p>
<p>特点：</p>
<ul>
<li>存放在内存中，速度快</li>
<li>hash索引（默认）</li>
</ul>
<p>文件：</p>
<ul>
<li>xxx.sdi: 存储表结构信息</li>
</ul>
<h3 id="存储引擎特点" tabindex="-1"><a class="header-anchor" href="#存储引擎特点" aria-hidden="true">#</a> 存储引擎特点</h3>
<table>
<thead>
<tr>
<th>特点</th>
<th>InnoDB</th>
<th>MyISAM</th>
<th>Memory</th>
</tr>
</thead>
<tbody>
<tr>
<td>存储限制</td>
<td>64TB</td>
<td>有</td>
<td>有</td>
</tr>
<tr>
<td>事务安全</td>
<td>支持</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>锁机制</td>
<td>行锁</td>
<td>表锁</td>
<td>表锁</td>
</tr>
<tr>
<td>B+tree索引</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>Hash索引</td>
<td>-</td>
<td>-</td>
<td>支持</td>
</tr>
<tr>
<td>全文索引</td>
<td>支持（5.6版本之后）</td>
<td>支持</td>
<td>-</td>
</tr>
<tr>
<td>空间使用</td>
<td>高</td>
<td>低</td>
<td>N/A</td>
</tr>
<tr>
<td>内存使用</td>
<td>高</td>
<td>低</td>
<td>中等</td>
</tr>
<tr>
<td>批量插入速度</td>
<td>低</td>
<td>高</td>
<td>高</td>
</tr>
<tr>
<td>支持外键</td>
<td>支持</td>
<td>-</td>
<td>-</td>
</tr>
</tbody>
</table>
<h3 id="存储引擎的选择" tabindex="-1"><a class="header-anchor" href="#存储引擎的选择" aria-hidden="true">#</a> 存储引擎的选择</h3>
<p>在选择存储引擎时，应该根据应用系统的特点选择合适的存储引擎。对于复杂的应用系统，还可以根据实际情况选择多种存储引擎进行组合。</p>
<ul>
<li>InnoDB: 如果应用对事物的完整性有比较高的要求，在并发条件下要求数据的一致性，数据操作除了插入和查询之外，还包含很多的更新、删除操作，则 InnoDB 是比较合适的选择</li>
<li>MyISAM: 如果应用是以读操作和插入操作为主，只有很少的更新和删除操作，并且对事务的完整性、并发性要求不高，那这个存储引擎是非常合适的。</li>
<li>Memory: 将所有数据保存在内存中，访问速度快，通常用于临时表及缓存。Memory 的缺陷是对表的大小有限制，太大的表无法缓存在内存中，而且无法保障数据的安全性</li>
</ul>
<p>电商中的足迹和评论适合使用 MyISAM 引擎，缓存适合使用 Memory 引擎。</p>
<h2 id="性能分析" tabindex="-1"><a class="header-anchor" href="#性能分析" aria-hidden="true">#</a> 性能分析</h2>
<h3 id="查看执行频次" tabindex="-1"><a class="header-anchor" href="#查看执行频次" aria-hidden="true">#</a> 查看执行频次</h3>
<p>查看当前数据库的 INSERT, UPDATE, DELETE, SELECT 访问频次：
<code v-pre>SHOW GLOBAL STATUS LIKE 'Com_______';</code> 或者 <code v-pre>SHOW SESSION STATUS LIKE 'Com_______';</code>
例：<code v-pre>show global status like 'Com_______'</code></p>
<h3 id="慢查询日志" tabindex="-1"><a class="header-anchor" href="#慢查询日志" aria-hidden="true">#</a> 慢查询日志</h3>
<p>慢查询日志记录了所有执行时间超过指定参数（long_query_time，单位：秒，默认10秒）的所有SQL语句的日志。
MySQL的慢查询日志默认没有开启，需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息：
# 开启慢查询日志开关
slow_query_log=1
# 设置慢查询日志的时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
long_query_time=2
更改后记得重启MySQL服务，日志文件位置：/var/lib/mysql/localhost-slow.log</p>
<p>查看慢查询日志开关状态：
<code v-pre>show variables like 'slow_query_log';</code></p>
<h3 id="profile" tabindex="-1"><a class="header-anchor" href="#profile" aria-hidden="true">#</a> profile</h3>
<p>show profile 能在做SQL优化时帮我们了解时间都耗费在哪里。通过 have_profiling 参数，能看到当前 MySQL 是否支持 profile 操作：
<code v-pre>SELECT @@have_profiling;</code>
profiling 默认关闭，可以通过set语句在session/global级别开启 profiling：
<code v-pre>SET profiling = 1;</code>
查看所有语句的耗时：
<code v-pre>show profiles;</code>
查看指定query_id的SQL语句各个阶段的耗时：
<code v-pre>show profile for query query_id;</code>
查看指定query_id的SQL语句CPU的使用情况
<code v-pre>show profile cpu for query query_id;</code></p>
<h3 id="explain" tabindex="-1"><a class="header-anchor" href="#explain" aria-hidden="true">#</a> explain</h3>
<p>EXPLAIN 或者 DESC 命令获取 MySQL 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。
语法：
# 直接在select语句之前加上关键字 explain / desc
EXPLAIN SELECT 字段列表 FROM 表名 HWERE 条件;</p>
<p>EXPLAIN 各字段含义：</p>
<ul>
<li>id：select 查询的序列号，表示查询中执行 select 子句或者操作表的顺序（id相同，执行顺序从上到下；id不同，值越大越先执行）</li>
<li>select_type：表示 SELECT 的类型，常见取值有 SIMPLE（简单表，即不适用表连接或者子查询）、PRIMARY（主查询，即外层的查询）、UNION（UNION中的第二个或者后面的查询语句）、SUBQUERY（SELECT/WHERE之后包含了子查询）等</li>
<li>type：表示连接类型，性能由好到差的连接类型为 NULL、system、const、eq_ref、ref、range、index、all</li>
<li>possible_key：可能应用在这张表上的索引，一个或多个</li>
<li>Key：实际使用的索引，如果为 NULL，则没有使用索引</li>
<li>Key_len：表示索引中使用的字节数，该值为索引字段最大可能长度，并非实际使用长度，在不损失精确性的前提下，长度越短越好</li>
<li>rows：MySQL认为必须要执行的行数，在InnoDB引擎的表中，是一个估计值，可能并不总是准确的</li>
<li>filtered：表示返回结果的行数占需读取行数的百分比，filtered的值越大越好</li>
</ul>
<h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2>
<p>索引是帮助 MySQL <strong>高效获取数据</strong>的<strong>数据结构（有序）</strong>。在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据结构上实现高级查询算法，这种数据结构就是索引。</p>
<p>优缺点：</p>
<p>优点：</p>
<ul>
<li>提高数据检索效率，降低数据库的IO成本</li>
<li>通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗</li>
</ul>
<p>缺点：</p>
<ul>
<li>索引列也是要占用空间的</li>
<li>索引大大提高了查询效率，但降低了更新的速度，比如 INSERT、UPDATE、DELETE</li>
</ul>
<h3 id="索引结构" tabindex="-1"><a class="header-anchor" href="#索引结构" aria-hidden="true">#</a> 索引结构</h3>
<table>
<thead>
<tr>
<th>索引结构</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>B+Tree</td>
<td>最常见的索引类型，大部分引擎都支持B+树索引</td>
</tr>
<tr>
<td>Hash</td>
<td>底层数据结构是用哈希表实现，只有精确匹配索引列的查询才有效，不支持范围查询</td>
</tr>
<tr>
<td>R-Tree(空间索引)</td>
<td>空间索引是 MyISAM 引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少</td>
</tr>
<tr>
<td>Full-Text(全文索引)</td>
<td>是一种通过建立倒排索引，快速匹配文档的方式，类似于 Lucene, Solr, ES</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>索引</th>
<th>InnoDB</th>
<th>MyISAM</th>
<th>Memory</th>
</tr>
</thead>
<tbody>
<tr>
<td>B+Tree索引</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>Hash索引</td>
<td>不支持</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>R-Tree索引</td>
<td>不支持</td>
<td>支持</td>
<td>不支持</td>
</tr>
<tr>
<td>Full-text</td>
<td>5.6版本后支持</td>
<td>支持</td>
<td>不支持</td>
</tr>
</tbody>
</table>
<h4 id="b-tree" tabindex="-1"><a class="header-anchor" href="#b-tree" aria-hidden="true">#</a> B-Tree</h4>
<figure><img src="\mysql\二叉树_20220316153214227108.png" alt="二叉树" tabindex="0" loading="lazy"><figcaption>二叉树</figcaption></figure>
<p>二叉树的缺点可以用红黑树来解决：
<img src="https://dhc.pythonanywhere.com/media/editor/红黑树_20220316163142686602.png" alt="红黑树" title="红黑树" loading="lazy">
红黑树也存在大数据量情况下，层级较深，检索速度慢的问题。</p>
<p>为了解决上述问题，可以使用 B-Tree 结构。
B-Tree (多路平衡查找树) 以一棵最大度数（max-degree，指一个节点的子节点个数）为5（5阶）的 b-tree 为例（每个节点最多存储4个key，5个指针）</p>
<figure><img src="\mysql\B-Tree结构_20220316163813441163.png" alt="B-Tree结构" tabindex="0" loading="lazy"><figcaption>B-Tree结构</figcaption></figure>
<blockquote>
<p>B-Tree 的数据插入过程动画参照：<a href="https://www.bilibili.com/video/BV1Kr4y1i7ru?p=68" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1Kr4y1i7ru?p=68<ExternalLinkIcon/></a>
演示地址：<a href="https://www.cs.usfca.edu/~galles/visualization/BTree.html" target="_blank" rel="noopener noreferrer">https://www.cs.usfca.edu/~galles/visualization/BTree.html<ExternalLinkIcon/></a></p>
</blockquote>
<h4 id="b-tree-1" tabindex="-1"><a class="header-anchor" href="#b-tree-1" aria-hidden="true">#</a> B+Tree</h4>
<p>结构图：</p>
<figure><img src="\mysql\B+Tree结构图_20220316170700591277.png" alt="B+Tree结构图" tabindex="0" loading="lazy"><figcaption>B+Tree结构图</figcaption></figure>
<blockquote>
<p>演示地址：<a href="https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html" target="_blank" rel="noopener noreferrer">https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html<ExternalLinkIcon/></a></p>
</blockquote>
<p>与 B-Tree 的区别：</p>
<ul>
<li>所有的数据都会出现在叶子节点</li>
<li>叶子节点形成一个单向链表</li>
</ul>
<p>MySQL 索引数据结构对经典的 B+Tree 进行了优化。在原 B+Tree 的基础上，增加一个指向相邻叶子节点的链表指针，就形成了带有顺序指针的 B+Tree，提高区间访问的性能。</p>
<figure><img src="\mysql\结构图_20220316171730865611.png" alt="MySQL B+Tree 结构图" tabindex="0" loading="lazy"><figcaption>MySQL B+Tree 结构图</figcaption></figure>
<h4 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h4>
<p>哈希索引就是采用一定的hash算法，将键值换算成新的hash值，映射到对应的槽位上，然后存储在hash表中。
如果两个（或多个）键值，映射到一个相同的槽位上，他们就产生了hash冲突（也称为hash碰撞），可以通过链表来解决。</p>
<figure><img src="\mysql\Hash索引原理图_20220317143226150679.png" alt="Hash索引原理图" tabindex="0" loading="lazy"><figcaption>Hash索引原理图</figcaption></figure>
<p>特点：</p>
<ul>
<li>Hash索引只能用于对等比较（=、in），不支持范围查询（betwwn、&gt;、&lt;、...）</li>
<li>无法利用索引完成排序操作</li>
<li>查询效率高，通常只需要一次检索就可以了，效率通常要高于 B+Tree 索引</li>
</ul>
<p>存储引擎支持：</p>
<ul>
<li>Memory</li>
<li>InnoDB: 具有自适应hash功能，hash索引是存储引擎根据 B+Tree 索引在指定条件下自动构建的</li>
</ul>
<h4 id="面试题" tabindex="-1"><a class="header-anchor" href="#面试题" aria-hidden="true">#</a> 面试题</h4>
<ol>
<li>为什么 InnoDB 存储引擎选择使用 B+Tree 索引结构？</li>
</ol>
<ul>
<li>相对于二叉树，层级更少，搜索效率高</li>
<li>对于 B-Tree，无论是叶子节点还是非叶子节点，都会保存数据，这样导致一页中存储的键值减少，指针也跟着减少，要同样保存大量数据，只能增加树的高度，导致性能降低</li>
<li>相对于 Hash 索引，B+Tree 支持范围匹配及排序操作</li>
</ul>
<h3 id="索引分类" tabindex="-1"><a class="header-anchor" href="#索引分类" aria-hidden="true">#</a> 索引分类</h3>
<table>
<thead>
<tr>
<th>分类</th>
<th>含义</th>
<th>特点</th>
<th>关键字</th>
</tr>
</thead>
<tbody>
<tr>
<td>主键索引</td>
<td>针对于表中主键创建的索引</td>
<td>默认自动创建，只能有一个</td>
<td>PRIMARY</td>
</tr>
<tr>
<td>唯一索引</td>
<td>避免同一个表中某数据列中的值重复</td>
<td>可以有多个</td>
<td>UNIQUE</td>
</tr>
<tr>
<td>常规索引</td>
<td>快速定位特定数据</td>
<td>可以有多个</td>
<td></td>
</tr>
<tr>
<td>全文索引</td>
<td>全文索引查找的是文本中的关键词，而不是比较索引中的值</td>
<td>可以有多个</td>
<td>FULLTEXT</td>
</tr>
</tbody>
</table>
<p>在 InnoDB 存储引擎中，根据索引的存储形式，又可以分为以下两种：</p>
<table>
<thead>
<tr>
<th>分类</th>
<th>含义</th>
<th>特点</th>
</tr>
</thead>
<tbody>
<tr>
<td>聚集索引(Clustered Index)</td>
<td>将数据存储与索引放一块，索引结构的叶子节点保存了行数据</td>
<td>必须有，而且只有一个</td>
</tr>
<tr>
<td>二级索引(Secondary Index)</td>
<td>将数据与索引分开存储，索引结构的叶子节点关联的是对应的主键</td>
<td>可以存在多个</td>
</tr>
</tbody>
</table>
<p>演示图：</p>
<p><img src="\mysql\原理图_20220318194454880073.png" alt="大致原理" title="大致原理" loading="lazy">
<img src="\mysql\演示图_20220319215403721066.png" alt="演示图" title="演示图" loading="lazy"></p>
<p>聚集索引选取规则：</p>
<ul>
<li>如果存在主键，主键索引就是聚集索引</li>
<li>如果不存在主键，将使用第一个唯一(UNIQUE)索引作为聚集索引</li>
<li>如果表没有主键或没有合适的唯一索引，则 InnoDB 会自动生成一个 rowid 作为隐藏的聚集索引</li>
</ul>
<h4 id="思考题" tabindex="-1"><a class="header-anchor" href="#思考题" aria-hidden="true">#</a> 思考题</h4>
<p>1. 以下 SQL 语句，哪个执行效率高？为什么？</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>select * from user where id = 10;
select * from user where name = 'Arm';
-- 备注：id为主键，name字段创建的有索引
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答：第一条语句，因为第二条需要回表查询，相当于两个步骤。</p>
<p>2. InnoDB 主键索引的 B+Tree 高度为多少？</p>
<p>答：假设一行数据大小为1k，一页中可以存储16行这样的数据。InnoDB 的指针占用6个字节的空间，主键假设为bigint，占用字节数为8.
可得公式：<code v-pre>n * 8 + (n + 1) * 6 = 16 * 1024</code>，其中 8 表示 bigint 占用的字节数，n 表示当前节点存储的key的数量，(n + 1) 表示指针数量（比key多一个）。算出n约为1170。</p>
<p>如果树的高度为2，那么他能存储的数据量大概为：<code v-pre>1171 * 16 = 18736</code>；
如果树的高度为3，那么他能存储的数据量大概为：<code v-pre>1171 * 1171 * 16 = 21939856</code>。</p>
<p>另外，如果有成千上万的数据，那么就要考虑分表，涉及运维篇知识。</p>
<h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3>
<p>创建索引：
<code v-pre>CREATE [ UNIQUE | FULLTEXT ] INDEX index_name ON table_name (index_col_name, ...);</code>
如果不加 CREATE 后面不加索引类型参数，则创建的是常规索引</p>
<p>查看索引：
<code v-pre>SHOW INDEX FROM table_name;</code></p>
<p>删除索引：
<code v-pre>DROP INDEX index_name ON table_name;</code></p>
<p>案例：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- name字段为姓名字段，该字段的值可能会重复，为该字段创建索引
create index idx_user_name on tb_user(name);
-- phone手机号字段的值非空，且唯一，为该字段创建唯一索引
create unique index idx_user_phone on tb_user (phone);
-- 为profession, age, status创建联合索引
create index idx_user_pro_age_stat on tb_user(profession, age, status);
-- 为email建立合适的索引来提升查询效率
create index idx_user_email on tb_user(email);

-- 删除索引
drop index idx_user_email on tb_user;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用规则" tabindex="-1"><a class="header-anchor" href="#使用规则" aria-hidden="true">#</a> 使用规则</h3>
<h4 id="最左前缀法则" tabindex="-1"><a class="header-anchor" href="#最左前缀法则" aria-hidden="true">#</a> 最左前缀法则</h4>
<p>如果索引关联了多列（联合索引），要遵守最左前缀法则，最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。
如果跳跃某一列，索引将部分失效（后面的字段索引失效）。</p>
<p>联合索引中，出现范围查询（&lt;, &gt;），范围查询右侧的列索引失效。可以用&gt;=或者&lt;=来规避索引失效问题。</p>
<h4 id="索引失效情况" tabindex="-1"><a class="header-anchor" href="#索引失效情况" aria-hidden="true">#</a> 索引失效情况</h4>
<ol>
<li>在索引列上进行运算操作，索引将失效。如：<code v-pre>explain select * from tb_user where substring(phone, 10, 2) = '15';</code></li>
<li>字符串类型字段使用时，不加引号，索引将失效。如：<code v-pre>explain select * from tb_user where phone = 17799990015;</code>，此处phone的值没有加引号</li>
<li>模糊查询中，如果仅仅是尾部模糊匹配，索引不会是失效；如果是头部模糊匹配，索引失效。如：<code v-pre>explain select * from tb_user where profession like '%工程';</code>，前后都有 % 也会失效。</li>
<li>用 or 分割开的条件，如果 or 其中一个条件的列没有索引，那么涉及的索引都不会被用到。</li>
<li>如果 MySQL 评估使用索引比全表更慢，则不使用索引。</li>
</ol>
<h4 id="sql-提示" tabindex="-1"><a class="header-anchor" href="#sql-提示" aria-hidden="true">#</a> SQL 提示</h4>
<p>是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的。</p>
<p>例如，使用索引：
<code v-pre>explain select * from tb_user use index(idx_user_pro) where profession=&quot;软件工程&quot;;</code>
不使用哪个索引：
<code v-pre>explain select * from tb_user ignore index(idx_user_pro) where profession=&quot;软件工程&quot;;</code>
必须使用哪个索引：
<code v-pre>explain select * from tb_user force index(idx_user_pro) where profession=&quot;软件工程&quot;;</code></p>
<p>use 是建议，实际使用哪个索引 MySQL 还会自己权衡运行速度去更改，force就是无论如何都强制使用该索引。</p>
<h4 id="覆盖索引-回表查询" tabindex="-1"><a class="header-anchor" href="#覆盖索引-回表查询" aria-hidden="true">#</a> 覆盖索引&amp;回表查询</h4>
<p>尽量使用覆盖索引（查询使用了索引，并且需要返回的列，在该索引中已经全部能找到），减少 select *。</p>
<p>explain 中 extra 字段含义：
<code v-pre>using index condition</code>：查找使用了索引，但是需要回表查询数据
<code v-pre>using where; using index;</code>：查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询</p>
<p>如果在聚集索引中直接能找到对应的行，则直接返回行数据，只需要一次查询，哪怕是select *；如果在辅助索引中找聚集索引，如<code v-pre>select id, name from xxx where name='xxx';</code>，也只需要通过辅助索引(name)查找到对应的id，返回name和name索引对应的id即可，只需要一次查询；如果是通过辅助索引查找其他字段，则需要回表查询，如<code v-pre>select id, name, gender from xxx where name='xxx';</code></p>
<p>所以尽量不要用<code v-pre>select *</code>，容易出现回表查询，降低效率，除非有联合索引包含了所有字段</p>
<p>面试题：一张表，有四个字段（id, username, password, status），由于数据量大，需要对以下SQL语句进行优化，该如何进行才是最优方案：
<code v-pre>select id, username, password from tb_user where username='itcast';</code></p>
<p>解：给username和password字段建立联合索引，则不需要回表查询，直接覆盖索引</p>
<h4 id="前缀索引" tabindex="-1"><a class="header-anchor" href="#前缀索引" aria-hidden="true">#</a> 前缀索引</h4>
<p>当字段类型为字符串（varchar, text等）时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘IO，影响查询效率，此时可以只降字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。</p>
<p>语法：<code v-pre>create index idx_xxxx on table_name(columnn(n));</code>
前缀长度：可以根据索引的选择性来决定，而选择性是指不重复的索引值（基数）和数据表的记录总数的比值，索引选择性越高则查询效率越高，唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。
求选择性公式：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>select count(distinct email) / count(*) from tb_user;
select count(distinct substring(email, 1, 5)) / count(*) from tb_user;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>show index 里面的sub_part可以看到接取的长度</p>
<h4 id="单列索引-联合索引" tabindex="-1"><a class="header-anchor" href="#单列索引-联合索引" aria-hidden="true">#</a> 单列索引&amp;联合索引</h4>
<p>单列索引：即一个索引只包含单个列
联合索引：即一个索引包含了多个列
在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。</p>
<p>单列索引情况：
<code v-pre>explain select id, phone, name from tb_user where phone = '17799990010' and name = '韩信';</code>
这句只会用到phone索引字段</p>
<h5 id="注意事项-8" tabindex="-1"><a class="header-anchor" href="#注意事项-8" aria-hidden="true">#</a> 注意事项</h5>
<ul>
<li>多条件联合查询时，MySQL优化器会评估哪个字段的索引效率更高，会选择该索引完成本次查询</li>
</ul>
<h3 id="设计原则" tabindex="-1"><a class="header-anchor" href="#设计原则" aria-hidden="true">#</a> 设计原则</h3>
<ol>
<li>针对于数据量较大，且查询比较频繁的表建立索引</li>
<li>针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引</li>
<li>尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高</li>
<li>如果是字符串类型的字段，字段长度较长，可以针对于字段的特点，建立前缀索引</li>
<li>尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率</li>
<li>要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价就越大，会影响增删改的效率</li>
<li>如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询</li>
</ol>
<h2 id="sql-优化" tabindex="-1"><a class="header-anchor" href="#sql-优化" aria-hidden="true">#</a> SQL 优化</h2>
<h3 id="插入数据" tabindex="-1"><a class="header-anchor" href="#插入数据" aria-hidden="true">#</a> 插入数据</h3>
<p>普通插入：</p>
<ol>
<li>采用批量插入（一次插入的数据不建议超过1000条）</li>
<li>手动提交事务</li>
<li>主键顺序插入</li>
</ol>
<p>大批量插入：
如果一次性需要插入大批量数据，使用insert语句插入性能较低，此时可以使用MySQL数据库提供的load指令插入。</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code># 客户端连接服务端时，加上参数 --local-infile（这一行在bash/cmd界面输入）
mysql --local-infile -u root -p
# 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关
set global local_infile = 1;
select @@local_infile;
# 执行load指令将准备好的数据，加载到表结构中
load data local infile '/root/sql1.log' into table 'tb_user' fields terminated by ',' lines terminated by '\n';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主键优化" tabindex="-1"><a class="header-anchor" href="#主键优化" aria-hidden="true">#</a> 主键优化</h3>
<p>数据组织方式：在InnoDB存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为索引组织表（Index organized table, IOT）</p>
<p>页分裂：页可以为空，也可以填充一般，也可以填充100%，每个页包含了2-N行数据（如果一行数据过大，会行溢出），根据主键排列。
页合并：当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记（flaged）为删除并且它的空间变得允许被其他记录声明使用。当页中删除的记录到达 MERGE_THRESHOLD（默认为页的50%），InnoDB会开始寻找最靠近的页（前后）看看是否可以将这两个页合并以优化空间使用。</p>
<p>MERGE_THRESHOLD：合并页的阈值，可以自己设置，在创建表或创建索引时指定</p>
<blockquote>
<p>文字说明不够清晰明了，具体可以看视频里的PPT演示过程：<a href="https://www.bilibili.com/video/BV1Kr4y1i7ru?p=90" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1Kr4y1i7ru?p=90<ExternalLinkIcon/></a></p>
</blockquote>
<p>主键设计原则：</p>
<ul>
<li>满足业务需求的情况下，尽量降低主键的长度</li>
<li>插入数据时，尽量选择顺序插入，选择使用 AUTO_INCREMENT 自增主键</li>
<li>尽量不要使用 UUID 做主键或者是其他的自然主键，如身份证号</li>
<li>业务操作时，避免对主键的修改</li>
</ul>
<h3 id="order-by优化" tabindex="-1"><a class="header-anchor" href="#order-by优化" aria-hidden="true">#</a> order by优化</h3>
<ol>
<li>Using filesort：通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区 sort buffer 中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序</li>
<li>Using index：通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高</li>
</ol>
<p>如果order by字段全部使用升序排序或者降序排序，则都会走索引，但是如果一个字段升序排序，另一个字段降序排序，则不会走索引，explain的extra信息显示的是<code v-pre>Using index, Using filesort</code>，如果要优化掉Using filesort，则需要另外再创建一个索引，如：<code v-pre>create index idx_user_age_phone_ad on tb_user(age asc, phone desc);</code>，此时使用<code v-pre>select id, age, phone from tb_user order by age asc, phone desc;</code>会全部走索引</p>
<p>总结：</p>
<ul>
<li>根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则</li>
<li>尽量使用覆盖索引</li>
<li>多字段排序，一个升序一个降序，此时需要注意联合索引在创建时的规则（ASC/DESC）</li>
<li>如果不可避免出现filesort，大数据量排序时，可以适当增大排序缓冲区大小 sort_buffer_size（默认256k）</li>
</ul>
<h3 id="group-by优化" tabindex="-1"><a class="header-anchor" href="#group-by优化" aria-hidden="true">#</a> group by优化</h3>
<ul>
<li>在分组操作时，可以通过索引来提高效率</li>
<li>分组操作时，索引的使用也是满足最左前缀法则的</li>
</ul>
<p>如索引为<code v-pre>idx_user_pro_age_stat</code>，则句式可以是<code v-pre>select ... where profession order by age</code>，这样也符合最左前缀法则</p>
<h3 id="limit优化" tabindex="-1"><a class="header-anchor" href="#limit优化" aria-hidden="true">#</a> limit优化</h3>
<p>常见的问题如<code v-pre>limit 2000000, 10</code>，此时需要 MySQL 排序前2000000条记录，但仅仅返回2000000 - 2000010的记录，其他记录丢弃，查询排序的代价非常大。
优化方案：一般分页查询时，通过创建覆盖索引能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化</p>
<p>例如：</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 此语句耗时很长
select * from tb_sku limit 9000000, 10;
-- 通过覆盖索引加快速度，直接通过主键索引进行排序及查询
select id from tb_sku order by id limit 9000000, 10;
-- 下面的语句是错误的，因为 MySQL 不支持 in 里面使用 limit
-- select * from tb_sku where id in (select id from tb_sku order by id limit 9000000, 10);
-- 通过连表查询即可实现第一句的效果，并且能达到第二句的速度
select * from tb_sku as s, (select id from tb_sku order by id limit 9000000, 10) as a where s.id = a.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="count优化" tabindex="-1"><a class="header-anchor" href="#count优化" aria-hidden="true">#</a> count优化</h3>
<p>MyISAM 引擎把一个表的总行数存在了磁盘上，因此执行 count(*) 的时候会直接返回这个数，效率很高（前提是不适用where）；
InnoDB 在执行 count(*) 时，需要把数据一行一行地从引擎里面读出来，然后累计计数。
优化方案：自己计数，如创建key-value表存储在内存或硬盘，或者是用redis</p>
<p>count的几种用法：</p>
<ul>
<li>如果count函数的参数（count里面写的那个字段）不是NULL（字段值不为NULL），累计值就加一，最后返回累计值</li>
<li>用法：count(*)、count(主键)、count(字段)、count(1)</li>
<li>count(主键)跟count(*)一样，因为主键不能为空；count(字段)只计算字段值不为NULL的行；count(1)引擎会为每行添加一个1，然后就count这个1，返回结果也跟count(*)一样；count(null)返回0</li>
</ul>
<p>各种用法的性能：</p>
<ul>
<li>count(主键)：InnoDB引擎会遍历整张表，把每行的主键id值都取出来，返回给服务层，服务层拿到主键后，直接按行进行累加（主键不可能为空）</li>
<li>count(字段)：没有not null约束的话，InnoDB引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，服务层判断是否为null，不为null，计数累加；有not null约束的话，InnoDB引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，直接按行进行累加</li>
<li>count(1)：InnoDB 引擎遍历整张表，但不取值。服务层对于返回的每一层，放一个数字 1 进去，直接按行进行累加</li>
<li>count(*)：InnoDB 引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加</li>
</ul>
<p>按效率排序：count(字段) &lt; count(主键) &lt; count(1) &lt; count(*)，所以尽量使用 count(*)</p>
<h3 id="update优化-避免行锁升级为表锁" tabindex="-1"><a class="header-anchor" href="#update优化-避免行锁升级为表锁" aria-hidden="true">#</a> update优化（避免行锁升级为表锁）</h3>
<p>InnoDB 的行锁是针对索引加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁升级为表锁。</p>
<p>如以下两条语句：
<code v-pre>update student set no = '123' where id = 1;</code>，这句由于id有主键索引，所以只会锁这一行；
<code v-pre>update student set no = '123' where name = 'test';</code>，这句由于name没有索引，所以会把整张表都锁住进行数据更新，解决方法是给name字段添加索引</p>
<h1 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h1>
<h2 id="整型" tabindex="-1"><a class="header-anchor" href="#整型" aria-hidden="true">#</a> 整型</h2>
<table>
<thead>
<tr>
<th>类型名称</th>
<th>取值范围</th>
<th>大小</th>
</tr>
</thead>
<tbody>
<tr>
<td>TINYINT</td>
<td>-128〜127</td>
<td>1个字节</td>
</tr>
<tr>
<td>SMALLINT</td>
<td>-32768〜32767</td>
<td>2个宇节</td>
</tr>
<tr>
<td>MEDIUMINT</td>
<td>-8388608〜8388607</td>
<td>3个字节</td>
</tr>
<tr>
<td>INT (INTEGHR)</td>
<td>-2147483648〜2147483647</td>
<td>4个字节</td>
</tr>
<tr>
<td>BIGINT</td>
<td>-9223372036854775808〜9223372036854775807</td>
<td>8个字节</td>
</tr>
</tbody>
</table>
<p>无符号在数据类型后加 unsigned 关键字。</p>
<h2 id="浮点型" tabindex="-1"><a class="header-anchor" href="#浮点型" aria-hidden="true">#</a> 浮点型</h2>
<table>
<thead>
<tr>
<th>类型名称</th>
<th>说明</th>
<th>存储需求</th>
</tr>
</thead>
<tbody>
<tr>
<td>FLOAT</td>
<td>单精度浮点数</td>
<td>4 个字节</td>
</tr>
<tr>
<td>DOUBLE</td>
<td>双精度浮点数</td>
<td>8 个字节</td>
</tr>
<tr>
<td>DECIMAL (M, D)，DEC</td>
<td>压缩的“严格”定点数</td>
<td>M+2 个字节</td>
</tr>
</tbody>
</table>
<h2 id="日期和时间" tabindex="-1"><a class="header-anchor" href="#日期和时间" aria-hidden="true">#</a> 日期和时间</h2>
<table>
<thead>
<tr>
<th>类型名称</th>
<th>日期格式</th>
<th>日期范围</th>
<th>存储需求</th>
</tr>
</thead>
<tbody>
<tr>
<td>YEAR</td>
<td>YYYY</td>
<td>1901 ~ 2155</td>
<td>1 个字节</td>
</tr>
<tr>
<td>TIME</td>
<td>HH:MM:SS</td>
<td>-838:59:59 ~ 838:59:59</td>
<td>3 个字节</td>
</tr>
<tr>
<td>DATE</td>
<td>YYYY-MM-DD</td>
<td>1000-01-01 ~ 9999-12-3</td>
<td>3 个字节</td>
</tr>
<tr>
<td>DATETIME</td>
<td>YYYY-MM-DD HH:MM:SS</td>
<td>1000-01-01 00:00:00 ~ 9999-12-31 23:59:59</td>
<td>8 个字节</td>
</tr>
<tr>
<td>TIMESTAMP</td>
<td>YYYY-MM-DD HH:MM:SS</td>
<td>1980-01-01 00:00:01 UTC ~ 2040-01-19 03:14:07 UTC</td>
<td>4 个字节</td>
</tr>
</tbody>
</table>
<h2 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h2>
<table>
<thead>
<tr>
<th>类型名称</th>
<th>说明</th>
<th>存储需求</th>
</tr>
</thead>
<tbody>
<tr>
<td>CHAR(M)</td>
<td>固定长度非二进制字符串</td>
<td>M 字节，1&lt;=M&lt;=255</td>
</tr>
<tr>
<td>VARCHAR(M)</td>
<td>变长非二进制字符串</td>
<td>L+1字节，在此，L&lt; = M和 1&lt;=M&lt;=255</td>
</tr>
<tr>
<td>TINYTEXT</td>
<td>非常小的非二进制字符串</td>
<td>L+1字节，在此，L&lt;2^8</td>
</tr>
<tr>
<td>TEXT</td>
<td>小的非二进制字符串</td>
<td>L+2字节，在此，L&lt;2^16</td>
</tr>
<tr>
<td>MEDIUMTEXT</td>
<td>中等大小的非二进制字符串</td>
<td>L+3字节，在此，L&lt;2^24</td>
</tr>
<tr>
<td>LONGTEXT</td>
<td>大的非二进制字符串</td>
<td>L+4字节，在此，L&lt;2^32</td>
</tr>
<tr>
<td>ENUM</td>
<td>枚举类型，只能有一个枚举字符串值</td>
<td>1或2个字节，取决于枚举值的数目 (最大值为65535)</td>
</tr>
<tr>
<td>SET</td>
<td>一个设置，字符串对象可以有零个或 多个SET成员</td>
<td>1、2、3、4或8个字节，取决于集合 成员的数量（最多64个成员）</td>
</tr>
</tbody>
</table>
<h2 id="二进制类型" tabindex="-1"><a class="header-anchor" href="#二进制类型" aria-hidden="true">#</a> 二进制类型</h2>
<table>
<thead>
<tr>
<th>类型名称</th>
<th>说明</th>
<th>存储需求</th>
</tr>
</thead>
<tbody>
<tr>
<td>BIT(M)</td>
<td>位字段类型</td>
<td>大约 (M+7)/8 字节</td>
</tr>
<tr>
<td>BINARY(M)</td>
<td>固定长度二进制字符串</td>
<td>M 字节</td>
</tr>
<tr>
<td>VARBINARY (M)</td>
<td>可变长度二进制字符串</td>
<td>M+1 字节</td>
</tr>
<tr>
<td>TINYBLOB (M)</td>
<td>非常小的BLOB</td>
<td>L+1 字节，在此，L&lt;2^8</td>
</tr>
<tr>
<td>BLOB (M)</td>
<td>小 BLOB</td>
<td>L+2 字节，在此，L&lt;2^16</td>
</tr>
<tr>
<td>MEDIUMBLOB (M)</td>
<td>中等大小的BLOB</td>
<td>L+3 字节，在此，L&lt;2^24</td>
</tr>
<tr>
<td>LONGBLOB (M)</td>
<td>非常大的BLOB</td>
<td>L+4 字节，在此，L&lt;2^32</td>
</tr>
</tbody>
</table>
<h1 id="权限一览表" tabindex="-1"><a class="header-anchor" href="#权限一览表" aria-hidden="true">#</a> 权限一览表</h1>
<blockquote>
<p>具体权限的作用详见<a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html" title="官方文档" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>GRANT 和 REVOKE 允许的静态权限</p>
<table>
<thead>
<tr>
<th style="text-align:left">Privilege</th>
<th style="text-align:left">Grant Table Column</th>
<th style="text-align:left">Context</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_all" target="_blank" rel="noopener noreferrer"><code v-pre>ALL [PRIVILEGES]</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Synonym for “all privileges”</td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_alter" target="_blank" rel="noopener noreferrer"><code v-pre>ALTER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Alter_priv</code></td>
<td style="text-align:left">Tables</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_alter-routine" target="_blank" rel="noopener noreferrer"><code v-pre>ALTER ROUTINE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Alter_routine_priv</code></td>
<td style="text-align:left">Stored routines</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_create" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Create_priv</code></td>
<td style="text-align:left">Databases, tables, or indexes</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_create-role" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE ROLE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Create_role_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_create-routine" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE ROUTINE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Create_routine_priv</code></td>
<td style="text-align:left">Stored routines</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_create-tablespace" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE TABLESPACE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Create_tablespace_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_create-temporary-tables" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE TEMPORARY TABLES</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Create_tmp_table_priv</code></td>
<td style="text-align:left">Tables</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_create-user" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE USER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Create_user_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_create-view" target="_blank" rel="noopener noreferrer"><code v-pre>CREATE VIEW</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Create_view_priv</code></td>
<td style="text-align:left">Views</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_delete" target="_blank" rel="noopener noreferrer"><code v-pre>DELETE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Delete_priv</code></td>
<td style="text-align:left">Tables</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_drop" target="_blank" rel="noopener noreferrer"><code v-pre>DROP</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Drop_priv</code></td>
<td style="text-align:left">Databases, tables, or views</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_drop-role" target="_blank" rel="noopener noreferrer"><code v-pre>DROP ROLE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Drop_role_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_event" target="_blank" rel="noopener noreferrer"><code v-pre>EVENT</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Event_priv</code></td>
<td style="text-align:left">Databases</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_execute" target="_blank" rel="noopener noreferrer"><code v-pre>EXECUTE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Execute_priv</code></td>
<td style="text-align:left">Stored routines</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_file" target="_blank" rel="noopener noreferrer"><code v-pre>FILE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>File_priv</code></td>
<td style="text-align:left">File access on server host</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_grant-option" target="_blank" rel="noopener noreferrer"><code v-pre>GRANT OPTION</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Grant_priv</code></td>
<td style="text-align:left">Databases, tables, or stored routines</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_index" target="_blank" rel="noopener noreferrer"><code v-pre>INDEX</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Index_priv</code></td>
<td style="text-align:left">Tables</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_insert" target="_blank" rel="noopener noreferrer"><code v-pre>INSERT</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Insert_priv</code></td>
<td style="text-align:left">Tables or columns</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_lock-tables" target="_blank" rel="noopener noreferrer"><code v-pre>LOCK TABLES</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Lock_tables_priv</code></td>
<td style="text-align:left">Databases</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_process" target="_blank" rel="noopener noreferrer"><code v-pre>PROCESS</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Process_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_proxy" target="_blank" rel="noopener noreferrer"><code v-pre>PROXY</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">See <code v-pre>proxies_priv</code> table</td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_references" target="_blank" rel="noopener noreferrer"><code v-pre>REFERENCES</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>References_priv</code></td>
<td style="text-align:left">Databases or tables</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_reload" target="_blank" rel="noopener noreferrer"><code v-pre>RELOAD</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Reload_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_replication-client" target="_blank" rel="noopener noreferrer"><code v-pre>REPLICATION CLIENT</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Repl_client_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_replication-slave" target="_blank" rel="noopener noreferrer"><code v-pre>REPLICATION SLAVE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Repl_slave_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_select" target="_blank" rel="noopener noreferrer"><code v-pre>SELECT</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Select_priv</code></td>
<td style="text-align:left">Tables or columns</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_show-databases" target="_blank" rel="noopener noreferrer"><code v-pre>SHOW DATABASES</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Show_db_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_show-view" target="_blank" rel="noopener noreferrer"><code v-pre>SHOW VIEW</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Show_view_priv</code></td>
<td style="text-align:left">Views</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_shutdown" target="_blank" rel="noopener noreferrer"><code v-pre>SHUTDOWN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Shutdown_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_super" target="_blank" rel="noopener noreferrer"><code v-pre>SUPER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Super_priv</code></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_trigger" target="_blank" rel="noopener noreferrer"><code v-pre>TRIGGER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Trigger_priv</code></td>
<td style="text-align:left">Tables</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_update" target="_blank" rel="noopener noreferrer"><code v-pre>UPDATE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>Update_priv</code></td>
<td style="text-align:left">Tables or columns</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_usage" target="_blank" rel="noopener noreferrer"><code v-pre>USAGE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Synonym for “no privileges”</td>
<td style="text-align:left">Server administration</td>
</tr>
</tbody>
</table>
<p>GRANT 和 REVOKE 允许的动态权限</p>
<table>
<thead>
<tr>
<th style="text-align:left">Privilege</th>
<th style="text-align:left">Context</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_application-password-admin" target="_blank" rel="noopener noreferrer"><code v-pre>APPLICATION_PASSWORD_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Dual password administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_audit-abort-exempt" target="_blank" rel="noopener noreferrer"><code v-pre>AUDIT_ABORT_EXEMPT</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Allow queries blocked by audit log filter</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_audit-admin" target="_blank" rel="noopener noreferrer"><code v-pre>AUDIT_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Audit log administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_authentication-policy-admin" target="_blank" rel="noopener noreferrer"><code v-pre>AUTHENTICATION_POLICY_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Authentication administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_backup-admin" target="_blank" rel="noopener noreferrer"><code v-pre>BACKUP_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Backup administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_binlog-admin" target="_blank" rel="noopener noreferrer"><code v-pre>BINLOG_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Backup and Replication administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_binlog-encryption-admin" target="_blank" rel="noopener noreferrer"><code v-pre>BINLOG_ENCRYPTION_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Backup and Replication administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_clone-admin" target="_blank" rel="noopener noreferrer"><code v-pre>CLONE_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Clone administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_connection-admin" target="_blank" rel="noopener noreferrer"><code v-pre>CONNECTION_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_encryption-key-admin" target="_blank" rel="noopener noreferrer"><code v-pre>ENCRYPTION_KEY_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_firewall-admin" target="_blank" rel="noopener noreferrer"><code v-pre>FIREWALL_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Firewall administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_firewall-exempt" target="_blank" rel="noopener noreferrer"><code v-pre>FIREWALL_EXEMPT</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Firewall administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_firewall-user" target="_blank" rel="noopener noreferrer"><code v-pre>FIREWALL_USER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Firewall administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_flush-optimizer-costs" target="_blank" rel="noopener noreferrer"><code v-pre>FLUSH_OPTIMIZER_COSTS</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_flush-status" target="_blank" rel="noopener noreferrer"><code v-pre>FLUSH_STATUS</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_flush-tables" target="_blank" rel="noopener noreferrer"><code v-pre>FLUSH_TABLES</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_flush-user-resources" target="_blank" rel="noopener noreferrer"><code v-pre>FLUSH_USER_RESOURCES</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_group-replication-admin" target="_blank" rel="noopener noreferrer"><code v-pre>GROUP_REPLICATION_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Replication administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_group-replication-stream" target="_blank" rel="noopener noreferrer"><code v-pre>GROUP_REPLICATION_STREAM</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Replication administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_innodb-redo-log-archive" target="_blank" rel="noopener noreferrer"><code v-pre>INNODB_REDO_LOG_ARCHIVE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Redo log archiving administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_ndb-stored-user" target="_blank" rel="noopener noreferrer"><code v-pre>NDB_STORED_USER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">NDB Cluster</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_passwordless-user-admin" target="_blank" rel="noopener noreferrer"><code v-pre>PASSWORDLESS_USER_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Authentication administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_persist-ro-variables-admin" target="_blank" rel="noopener noreferrer"><code v-pre>PERSIST_RO_VARIABLES_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_replication-applier" target="_blank" rel="noopener noreferrer"><code v-pre>REPLICATION_APPLIER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left"><code v-pre>PRIVILEGE_CHECKS_USER</code> for a replication channel</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_replication-slave-admin" target="_blank" rel="noopener noreferrer"><code v-pre>REPLICATION_SLAVE_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Replication administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_resource-group-admin" target="_blank" rel="noopener noreferrer"><code v-pre>RESOURCE_GROUP_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Resource group administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_resource-group-user" target="_blank" rel="noopener noreferrer"><code v-pre>RESOURCE_GROUP_USER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Resource group administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_role-admin" target="_blank" rel="noopener noreferrer"><code v-pre>ROLE_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_session-variables-admin" target="_blank" rel="noopener noreferrer"><code v-pre>SESSION_VARIABLES_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_set-user-id" target="_blank" rel="noopener noreferrer"><code v-pre>SET_USER_ID</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_show-routine" target="_blank" rel="noopener noreferrer"><code v-pre>SHOW_ROUTINE</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_system-user" target="_blank" rel="noopener noreferrer"><code v-pre>SYSTEM_USER</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_system-variables-admin" target="_blank" rel="noopener noreferrer"><code v-pre>SYSTEM_VARIABLES_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_table-encryption-admin" target="_blank" rel="noopener noreferrer"><code v-pre>TABLE_ENCRYPTION_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_version-token-admin" target="_blank" rel="noopener noreferrer"><code v-pre>VERSION_TOKEN_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
<tr>
<td style="text-align:left"><a href="https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_xa-recover-admin" target="_blank" rel="noopener noreferrer"><code v-pre>XA_RECOVER_ADMIN</code><ExternalLinkIcon/></a></td>
<td style="text-align:left">Server administration</td>
</tr>
</tbody>
</table>
<h1 id="图形化界面工具" tabindex="-1"><a class="header-anchor" href="#图形化界面工具" aria-hidden="true">#</a> 图形化界面工具</h1>
<ul>
<li>Workbench(免费): <a href="http://dev.mysql.com/downloads/workbench/" target="_blank" rel="noopener noreferrer">http://dev.mysql.com/downloads/workbench/<ExternalLinkIcon/></a></li>
<li>navicat(收费，试用版30天): <a href="https://www.navicat.com/en/download/navicat-for-mysql" target="_blank" rel="noopener noreferrer">https://www.navicat.com/en/download/navicat-for-mysql<ExternalLinkIcon/></a></li>
<li>Sequel Pro(开源免费，仅支持Mac OS): <a href="http://www.sequelpro.com/" target="_blank" rel="noopener noreferrer">http://www.sequelpro.com/<ExternalLinkIcon/></a></li>
<li>HeidiSQL(免费): <a href="http://www.heidisql.com/" target="_blank" rel="noopener noreferrer">http://www.heidisql.com/<ExternalLinkIcon/></a></li>
<li>phpMyAdmin(免费): <a href="https://www.phpmyadmin.net/" target="_blank" rel="noopener noreferrer">https://www.phpmyadmin.net/<ExternalLinkIcon/></a></li>
<li>SQLyog: <a href="https://sqlyog.en.softonic.com/" target="_blank" rel="noopener noreferrer">https://sqlyog.en.softonic.com/<ExternalLinkIcon/></a></li>
</ul>
<h1 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h1>
<h1 id="小技巧" tabindex="-1"><a class="header-anchor" href="#小技巧" aria-hidden="true">#</a> 小技巧</h1>
<ol>
<li>在SQL语句之后加上<code v-pre>\G</code>会将结果的表格形式转换成行文本形式</li>
<li>查看Mysql数据库占用空间：</li>
</ol>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT table_schema &quot;Database Name&quot;
     , SUM(data_length + index_length) / (1024 * 1024) &quot;Database Size in MB&quot;
FROM information_schema.TABLES
GROUP BY table_schema;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>



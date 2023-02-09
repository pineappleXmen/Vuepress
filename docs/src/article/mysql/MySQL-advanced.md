---
lang: zh-CN
title: 进阶篇
description: MySQL
category: 
 - MySQL
tag:
 - MySQL进阶
---

# 进阶篇

## 视图

视图是虚拟表，只保存了查询SQL的逻辑，数据是在使用视图时动态创建的

**创建：**

`CREATE [OR REPLACE] VIEW 视图名[(列名 列表)] AS SELECT [WITH[CASCADED|LOCAL]CHECK OPTION];`

**查询：**

查看创建语句：`SHOW CREATE VIEW 视图名`

查询：`SELECT * FROM 视图名`

**修改：**

`ALTER VIEW 视图名[列名列表] AS SELECT [WITH[CASCADED|LOCAL]CHECK OPTION]`

**删除：**

`DROP VIEW [IF EXISTS] 视图名[,视图名]`

**视图的检查选项：**

当使用`WITH CHECK OPTION`子句创建视图时，MySQL会通过视图检查正在更改的每个行，例如 插入，更新，删除，以使其符合视图的定义。 MySQL允许基于另一个视图创建视图，它还会检查依赖视图中的规则以保持一致性。为了确定检查的范围，mysql提供了两个选项：`CASCADED` 和 `LOCAL` ，默认值为 `CASCADED `。

`cascaded`检查选项

如果当前视图有检查选项，则插入数据要满足包括当前视图条件以及满足当前视图所依赖的视图的条件。如果当前视图没有检查选项，则插入数据要满足当时视图所依赖视图有检查选项及其依赖的视图的条件。

`local`检查选项

是递归的查找当前视图所依赖的视图是否有检查选项，如果有，则检查；如果没有，就不做检查。



## 存储过程

存储过程是实现编译并存储在数据库中的一段SQL语句集合 就是SQL语言层面的代码封装和重用

创建

`CREATE PROCEDURE NAME[PARAMS LIST] BEGIN -SQL END` 

调用

`CALL  NAME(PARAMS)`

**变量**

查看系统变量

`SHOW [SESSION|GLOBAL] VARIABLES`

查看指定变量的值

`SELECT @@[SESSION|GLOBAL] NAME`

设置系统变量值

`SET [SESSION|GLOBAL] VARIABLE NAME = VALUE`



## 触发器

触发器是与表有关的数据库对象，在insert/update/delete操作之前或之后 触发执行触发器中定义的SQL语句集合

```mysql
CREATE TRIGGER NAME
BEFORE/AFTER INSERT/UPDATE/DELETE
ON TABLENAME FOR EACH ROW
BEGIN
   SQL
END;
```

查看

`SHOW TRIGGERS`

删除

`DROP TRIGGER TRIGGERNAME`



## 锁

#### 全局锁

对整个数据库实例枷锁 加锁后处于只读状态 DML DDL会处于阻塞状态

上锁

`flush tables with read lock`

解锁

`unlock tables`



#### 表级锁

表共享读锁

表独占血锁

加锁

`lock tables name read/write`

解锁

`unlock tables;`

读锁阻塞其他客户端的写

写锁都阻塞



**元数据锁**

由系统自动控制

维护表结构的数据一致性

避免DML与DDL冲突

表上有活动事务的时候 不能对表结构进行改变



**意向锁**

意向共享锁

`select ..lock in share mode`

与读锁兼容 与写锁互斥

意向排它锁

`insert update delete select for update`

都互斥

加表锁的时候会和之前加的行锁，需要遍历，Innodb做出修改 在加行锁的时候加入一个意向锁

省去遍历过程



#### 行级锁

基于Innodb索引组织的

**行锁**

锁定单行记录 防止其他事物进行update和delete RC RR

**间隙锁**

锁住索引间的间隙RR

**临键锁**（nextkey lock）：

同时锁住数据和间隙



**默认情况下 在RR事务隔离级别运行 Innodb会使用nextkey进行搜索和索引扫描 防止幻读**

- InnoDB 针对唯一索引进行检索时，对已存在的记录进行等值匹配时，将优化为行锁
- InnoDB的行锁是针对于索引加的锁，不通过索引条件检索数据的话，那么InnoDB将对所有记录加锁 也就会升级为表锁
- 索引上的等值查询（唯一索引） 给不存在的记录加锁的时候，优化为间隙锁
- 索引上的等值查询（普通索引） 向右遍历时最后一个值不满足查询需求时，会退化为间隙锁
- 索引上的范围查询（唯一索引）会访问到不满足条件的第一个值为止



## 事务

事务是一组操作的集合，事务会把所有操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

基本操作：

```mysql
-- 1. 查询张三账户余额
select * from account where name = '张三';
-- 2. 将张三账户余额-1000
update account set money = money - 1000 where name = '张三';
-- 此语句出错后张三钱减少但是李四钱没有增加
模拟sql语句错误
-- 3. 将李四账户余额+1000
update account set money = money + 1000 where name = '李四';

-- 查看事务提交方式
SELECT @@AUTOCOMMIT;
-- 设置事务提交方式，1为自动提交，0为手动提交，该设置只对当前会话有效
SET @@AUTOCOMMIT = 0;
-- 提交事务
COMMIT;
-- 回滚事务
ROLLBACK;

-- 设置手动提交后上面代码改为：
select * from account where name = '张三';
update account set money = money - 1000 where name = '张三';
update account set money = money + 1000 where name = '李四';
commit;
```

操作方式二：

开启事务：
`START TRANSACTION 或 BEGIN TRANSACTION;`
提交事务：
`COMMIT;`
回滚事务：
`ROLLBACK;`

操作实例：

```mysql
start transaction;
select * from account where name = '张三';
update account set money = money - 1000 where name = '张三';
update account set money = money + 1000 where name = '李四';
commit;
```

### 四大特性ACID

- 原子性(Atomicity)：事务是不可分割的最小操作但愿，要么全部成功，要么全部失败
- 一致性(Consistency)：事务完成时，必须使所有数据都保持一致状态
- 隔离性(Isolation)：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行
- 持久性(Durability)：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的

### 并发事务

| 问题       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 脏读       | 一个事务读到另一个事务还没提交的数据                         |
| 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同             |
| 幻读       | 一个事务按照条件查询数据时，没有对应的数据行，但是再插入数据时，又发现这行数据已经存在 |

> 这三个问题的详细演示：https://www.bilibili.com/video/BV1Kr4y1i7ru?p=55cd 

并发事务隔离级别：

| 隔离级别              | 脏读 | 不可重复读 | 幻读 |
| --------------------- | ---- | ---------- | ---- |
| Read uncommitted      | √    | √          | √    |
| Read committed        | ×    | √          | √    |
| Repeatable Read(默认) | ×    | ×          | √    |
| Serializable          | ×    | ×          | ×    |

- √表示在当前隔离级别下该问题会出现
- Serializable 性能最低；Read uncommitted 性能最高，数据安全性最差

查看事务隔离级别：
`SELECT @@TRANSACTION_ISOLATION;`
设置事务隔离级别：
`SET [ SESSION | GLOBAL ] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE };`
SESSION 是会话级别，表示只针对当前会话有效，GLOBAL 表示对所有会话有效



## redo log

redo log 记录数据页变化在redo log buffer中 在事务提交时 将redo log buffer进行持久化 放入磁盘中 redo log file中 用于在刷新脏页到磁盘发生错误时 进行数据恢复使用



## undo log

解决事务原子性

记录逻辑日志 

delete->insert

update->old date

在事务执行时产生，在事务提交时不一定删除 检查是否可用于MVCC

存放在rollback segment



## MVCC

#### 当前读

读取最新版本、读取时保证其他事务不能对当前数据进行修改 会对读取的数据加锁

select lock in share mode   for update加锁之后变为当前读

#### 快照读

不加锁 可能读取的是历史数据 

Read commited 每次select时，生成一个快照读

repeatable read：开启事务的第一个select时候生成快照读

serializable：快照读退化为当前读

#### 隐藏字段

DB_TRX_ID:最近修改该记录的事务的ID

DB_ROLL_PTR 回滚指针指向这条记录的上一个版本 undo log

DB_ROW_ID：隐藏主键 如果没有指定主键 会生成该主键

![image-20220829125653160](\mysql\image-20220829125653160.png)

### readview 读视图

核心的四个字段

- m_ids:当前活跃的事务ID集合
- min_trx_id:最小活跃的事务ID
- max_trx_id:最大事务ID+1
- creator_trx_id:ReadView创建者的事务ID

![image-20220829130005644](\mysql\image-20220829130005644.png)

RC隔离级别下 每次快照读的时候生成Readview

RR隔离级别下 只在第一次快照读的时候生成Readview



## 日志

**错误日志**

默认地址`/var/log/mysqld.log`

**二进制日志**

记录了所有的DDL DML语句

作用 

- 灾难恢复
-  主从复制

**查询日志**

记录客户端所有操作语句

**慢查询日志**

慢查询日志记录了所有执行时间超过指定参数（long_query_time，单位：秒，默认10秒）的所有SQL语句的日志。
MySQL的慢查询日志默认没有开启，需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息：
	# 开启慢查询日志开关
	slow_query_log=1
	# 设置慢查询日志的时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
	long_query_time=2
更改后记得重启MySQL服务，日志文件位置：/var/lib/mysql/localhost-slow.log

查看慢查询日志开关状态：
`show variables like 'slow_query_log';`



## 主从复制

把主库的数据写入二进制数据，拷贝进从库，在从库中执行二进制数据，保持同步

## 分库分表

垂直拆分

根据业务吧不同业务拆分到不同库中

水平拆分

把一张表存入多个数据库

## 分库分表算法

### RANGE范围算法

第一种方法们可以指定一个数据范围来进行分表，例如从1~1000000，1000001-2000000，使用一百万一张表的方式，如下图所示

这种方法需要维护表的ID，特别是分布式环境下，这种分布式ID通常建议使用Redis，Redis的Incr操作可以轻松的维护分布式的表ID。

RANGE方法优点： 扩容简单，提前建好库、表就好

RANGE方法缺点： 大部分读和写都访会问新的数据，有IO瓶颈，这样子造成新库压力过大，不建议采用。

### HASH取模算法

对id的hash取模x。
针对上述RANGE方式分表有IO瓶颈的问题，咱们可以采用根据某些特定ID HASH取模的方式进行分库分表，如图所示：

这样就可以将数据分散在不同的库、表中，避免了IO瓶颈的问题。

HASH取模方法优点： 能保证数据较均匀的分散落在不同的库、表中，减轻了数据库IO压力

HASH取模方法缺点：扩容麻烦、迁移数据时每次都需要重新计算hash值分配到不同的库和表。无法指定特定id到某个分区，受id自增影响，有几率也分不均匀

### 一致性HASH算法

普通的hash算法在分布式应用中的不足：在分布式的存储系统中，要将数据存储到具体的节点上，如果我们采用普通的hash算法进行路由，将数据映射到具体的节点上，如key%n，key是数据的key，n是机器节点数，如果有一个机器加入或退出集群，则所有的数据映射都无效了，如果是持久化存储则要做数据迁移，如果是分布式缓存，则其他缓存就失效了。

一致性HASH算法： 按照常用的hash算法来将对应的key哈希到一个具有2^32次方个节点的空间中，形成成一个顺时针闭合的环形，如下图所示。

整个环按照顺时针方向进行组织。然后可以用服务器ip,port作为key进行hash从而确定在环中的位置，对数据进行存储时也进行相同的hash算法对key运算确定数据在此环上的位置，从此位置沿顺时针开始遇到的第一个服务器就是数据存放的服务器：
当添加一台服务器时，只有增加服务器的位置和逆时针方向第一台服务器之间的键会受影响

如果服务器太少，分布会不均匀，为了解决这种数据倾斜问题，hash算法引入了虚拟节点机制，即对每一个服务节点计算多个哈希，每个结果未知都放置一个此服务节点，称为虚拟节点，数据定位算法不变，只是多了一个虚拟节点到实际节点的映射，例如定位到NodeA#1,2,3三个虚拟节点的数据均定位到NodeA节点，这样就解决了服务节点少时的数据倾斜问题。在实际应用中，通常将虚拟节点数设置为32甚至更大，这样即使很少的服务节点也能做到相对均匀的数据分布。

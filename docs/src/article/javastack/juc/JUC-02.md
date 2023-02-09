---
lang: zh-CN
title: Synchronized
description: Java
category: 
 - Java
tag:
 - JUC
---

# synchronized

**Java对象头 monitor**

普通对象数据结构

| Object header      |                      |
| ------------------ | -------------------- |
| MarkWord（32bits） | class word（32bits） |

有Object Header 其中有32bit（32bit JVM）为MarkWord （标记位）

| State              | MarkWord（32bit）                                            |                             |                                                   |                          |
| ------------------ | ------------------------------------------------------------ | --------------------------- | ------------------------------------------------- | ------------------------ |
| Normal             | ***Hashcode***  25bit                  标识该对象的类名的hash | ***age***   4bit 垃圾回收代 | ***biased_lock*** 1bit  偏向锁标识**（0）**无偏向 | ***状态位***  2bit（01） |
| Biased             | **thread **（23bit）标识偏向的线程+***epoch***（2bit）       | **age**   4bit              | **（1）**（表示有偏向）                           | （01）                   |
| Lightweight_locked | ptr_to_lock_record（30bit）                                  |                             |                                                   | （00）                   |
| Heavyweight_locked | ptr_to_heavyweight_monitor (30bit)                           |                             |                                                   | （10）                   |
| Marked for GC      |                                                              |                             |                                                   | (11)                     |

#### 轻量级锁

虽然有多个线程访问，但时间错开，无竞争，此时为轻量级锁

![image-20220829145057997](\javastack\juc\image-20220829145057997.png)

每个线程都有一个lock record记录当前线程使用的锁

存储对象的markword

![image-20220829145457034](\javastack\juc\image-20220829145457034.png)

![image-20220829145530240](\javastack\juc\image-20220829145530240.png)

![image-20220829145618021](\javastack\juc\image-20220829145618021.png)

![image-20220829145701598](\javastack\juc\image-20220829145701598.png)

![image-20220829145726092](\javastack\juc\image-20220829145726092.png)

#### 重量级锁

![image-20220829145844269](\javastack\juc\image-20220829145844269.png)

![image-20220829150240389](\javastack\juc\image-20220829150240389.png)

#### 偏向锁

轻量级锁在没有竞争时（就自己这个线程），每次重入仍然需要执行CAS操作。
Java6中引入了偏向锁来做进一步优化：只有第一次使用CAS将线程D设置到对象的Mark Word头，之后
发现这个线程D是自己的就表示没有竞争，不用重新CAS。以后只要不发生竞争，这个对象就归该线程所
有

#### **monitor数据结构**

![image-20220829142715657](\javastack\juc\image-20220829142715657.png)

- 执行synchronized时monitor会将当前线程设置为owner
- 如果此时有其他线程来申请锁，则进入entrylist的blocked队列中
- 执行完后通知entrylist来竞争锁 竞争是非公平的



Synchronized锁由于需要切换上下文，也就是内核态和用户态 对性能消耗比较大 所以引入轻量级锁等优化

由低到高为：无锁→偏向锁→轻量级锁→重量级锁 锁只能由低级到高级

无竞争 单线程 无锁

无竞争 多线程 偏向锁（实际并没有上锁/第一次存储线程信息后，下一次发现还是他，就继续给）

有些许竞争 多线程 轻量级锁

大量竞争 重量级锁

每个Java对象都可以关联一个Monitor对象。如果用Synchronized给对象上锁（heavyweight）



## wait/notify

![image-20220829151243652](\javastack\juc\image-20220829151243652.png)

#### **wait vs sleep**

- sleep是thread方法 wait是object方法

- sleep不需要和synchronized配合使用 wait需要

- sleep在睡眠不会释放锁 wait会

  

## park & unpark

LockSupport方法

![image-20220829151914461](\javastack\juc\image-20220829151914461.png)
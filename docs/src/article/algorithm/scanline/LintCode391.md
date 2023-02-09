---
lang: zh-CN
title: LintCode391-数飞机
description: 扫描线
category: 
 - 算法
tag:
 - 扫描线
---

391 · 数飞机

算法

中等

通过率38%

描述

给出飞机的起飞和降落时间的列表，用序列 `interval` 表示. 请计算出天上同时最多有多少架飞机？

如果多架飞机降落和起飞在同一时刻，我们认为降落有优先权。

样例

**样例 1:**

```
输入: [(1, 10), (2, 3), (5, 8), (4, 7)]
输出: 3
解释: 
第一架飞机在1时刻起飞, 10时刻降落.
第二架飞机在2时刻起飞, 3时刻降落.
第三架飞机在5时刻起飞, 8时刻降落.
第四架飞机在4时刻起飞, 7时刻降落.
在5时刻到6时刻之间, 天空中有三架飞机.
```

**样例 2:**

```
输入: [(1, 2), (2, 3), (3, 4)]
输出: 1
解释: 降落优先于起飞.
```

```java
List<Point> list  = new ArrayList<>();
for(interval i:airplanes){
list.add(new Point(i.start,1));
list.add(new Point(i.end,-1));
}
Collections.sort(list,(p1,p2)->p1.T==p2.T?p1.s-p2.s:p1.T-p2.T);
int res = 0;
int cnt = 0;
for(Point p:list){
	cnt+=p.S;
	res = Math.max(res,cnt);
}
return res;
```


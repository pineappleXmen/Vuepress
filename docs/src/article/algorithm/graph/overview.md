---
lang: zh-CN
title: 图论概念
description: graph
category: 
 - 算法
tag:
 - graph
---

## **基础概念**

**图 (graph)** 是一个二元组G(V(G),E(G))。其中V(G)是非空集，称为 **点集 (vertex set)**，对于V中的每个元素，我们称其为 **顶点 (vertex)** 或 **节点 (node)**，简称 **点**；E(G)为V(G)各结点之间边的集合，称为 **边集 (edge set)**。

## **图的存储**

### **直接存边**

::: code-tabs#shell

@tab c++

```c
#include <iostream>
#include <vector>

using namespace std;

struct Edge {	//结构体存储一条边的头结点编号和尾结点编号
  int u, v;
};

int n, m;
vector<Edge> e;	//边集合
vector<bool> vis;

//遍历边的集合 如果找到头尾节点都吻合为真
bool find_edge(int u, int v) {
  for (int i = 1; i <= m; ++i) {
    if (e[i].u == u && e[i].v == v) {
      return true;
    }
  }
  return false;
}

void dfs(int u) {
  if (vis[u]) return;
  vis[u] = true;
  for (int i = 1; i <= m; ++i) {
    if (e[i].u == u) {
      dfs(e[i].v);
    }
  }
}

int main() {
  cin >> n >> m;

  vis.resize(n + 1, false);
  e.resize(m + 1);

  for (int i = 1; i <= m; ++i) cin >> e[i].u >> e[i].v;

  return 0;
}
```

@tab python

```python
class Edge:
    u = 0
    v = 0

n, m = map(lambda x:int(x), input().split())

e = [Edge()] * m; vis = [False] * n

for i in range(0, m):
    e[i].u, e[i].v = map(lambda x:int(x), input().split())

def find_edge(u, v):
    for i in range(1, m + 1):
        if e[i].u == u and e[i].v == v:
            return True
    return False

def dfs(u):
    if vis[u]:
        return
    vis[u] = True
    for i in range(1, m + 1):
        if e[i].u == u:
            dfs(e[i].v)
```

@tab java

```

```

:::

### **邻接矩阵**

用一个二维数组来存储边集，数组的i,j索引表示该边的两个点

::: code-tabs#shell

@tab c++

```c
#include <iostream>
#include <vector>

using namespace std;

int n, m;
vector<bool> vis;
vector<vector<bool> > adj;

bool find_edge(int u, int v) { return adj[u][v]; }

void dfs(int u) {
  if (vis[u]) return;
  vis[u] = true;
  for (int v = 1; v <= n; ++v) {
    if (adj[u][v]) {
      dfs(v);
    }
  }
}

int main() {
  cin >> n >> m;

  vis.resize(n + 1, false);
  adj.resize(n + 1, vector<bool>(n + 1, false));

  for (int i = 1; i <= m; ++i) {
    int u, v;
    cin >> u >> v;
    adj[u][v] = true;
  }

  return 0;
}
```

@tab python

```python
vis = [False] * (n + 1)
adj = [[False]] * (n + 1)

for i in range(1, m + 1):
    u, v = map(lambda x:int(x), input().split())
    adj[u][v] = True

def find_edge(u, v):
    return adj[u][v]

def dfs(u):
    if vis[u]:
        return
    vis[u] = True
    for v in range(1, n + 1):
        if adj[u][v]:
            dfs(v)
```

:::

### **邻接表**

通过一个可扩展长度的数组来存储一个点所连接的所有边

::: code-tabs#shell

@tab c++

```c
#include <iostream>
#include <vector>

using namespace std;

int n, m;
vector<bool> vis;
vector<vector<int> > adj;

bool find_edge(int u, int v) {
  for (int i = 0; i < adj[u].size(); ++i) {
    if (adj[u][i] == v) {
      return true;
    }
  }
  return false;
}

void dfs(int u) {
  if (vis[u]) return;
  vis[u] = true;
  for (int i = 0; i < adj[u].size(); ++i) dfs(adj[u][i]);
}

int main() {
  cin >> n >> m;

  vis.resize(n + 1, false);
  adj.resize(n + 1);

  for (int i = 1; i <= m; ++i) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
  }

  return 0;
}
```

@tab python

```python
vis = [False] * (n + 1)
adj = [[]] * (n + 1)

for i in range(1, m + 1):
    u, v = map(lambda x:int(x), input().split())
    adj[u].append(v)

def find_edge(u, v):
    for i in range(0, len(adj[u])):
        if adj[u][i] == v:
            return True
    return False

def dfs(u):
    if vis[u]:
        return
    vis[u] = True
    for i in range(0, len(adj[u])):
        dfs(adj[u][i])
```

:::
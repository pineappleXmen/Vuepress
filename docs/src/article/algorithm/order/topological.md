---
lang: zh-CN
title: 拓扑排序
description: 排序算法
category: 
 - 算法
tag:
 - 排序
---

:::code-tabs#shell

@tab java

```java
//拓扑排序
public boolean topologicalSort(int N, int[][] edges) {
         Map<Integer, List<Integer>> graph=new HashMap<>();
         int[] indegree =new int[N];
         for (int[] edge:edges){
             int end = edge[0],start = edge[1];
             graph.computeIfAbsent(start,x->new ArrayList<>()).add(end);
             indegree[end]++;
         }
         Queue<Integer> q = new LinkedList<>();
         for (int i=0;i<N;i++)
             if(indegree[i]==0) q.add(i);
         int count =0;
         while (!q.isEmpty()){
             int cur = q.poll();
             count++;
             for(int nei:graph.getOrDefault(cur,new ArrayList<>()))
                 if(--indegree[nei]==0) q.offer(nei);
         }
         return count==N;
     }
     
     
    List<List<Integer>> edges;
    int[] visited;
    boolean valid =true;
    public boolean dfs(int N,int[][] prerequisites){
        edges = new ArrayList<>();
        for(int i=0;i<N;i++) edges.add(new ArrayList<Integer>());
        visited = new int[N];
        for(int[] edge:prerequisites){
            edges.get(edge[1]).add(edge[0]);
        }
        for(int i=0;i<N;i++){
            if(visited[i]==0) dfs(i);

        }
        return valid;
    }
    public void dfs(int u){
        visited[u]=1;
        for(int v:edges.get(u)){
            if(visited[v]==0) dfs(v);
            else if (visited[v]==1) valid=false;
        }
        visited[u]=2;
    }
```

:::

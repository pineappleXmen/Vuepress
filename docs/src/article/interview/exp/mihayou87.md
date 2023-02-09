---
title: 米哈游2022.08.07笔试记录
lang: zh-CN
description: 米哈游笔试
category: 
 - 笔试
tag:
 - 米哈游
 - 笔试
---



米哈游有点坑 只能用CPP 导致Java选手全程都在回忆CPP的API 浪费了很长时间 CPP不太会写 大佬勿喷 之后更新Java版本的题解
::: tip 1.有七种不同类型的怪物用七个不同字母表示（w,i,t,f,g,s,b），随后输入第一个数字表示查询的数目，在查询中，1表示往队列中加入一个类型的怪兽，2表示从队首弹出该怪兽，3表示返回该队列中不同怪兽类型的数量；
> 例：
输入 
2
1 b
3
输出
1
:::

::: code-tabs

@tab C++

```cpp
/CPP
int main(){
    vector<string> strs;
    string str;
    queue<int> q;
    map<char,int> names; //七种各对应一个数字来表示
    names.insert({'w',0});
    names.insert({'i',1});
    names.insert({'t',2});
    names.insert({'f',3});
    names.insert({'g',4});
    names.insert({'s',5});
    names.insert({'b',6});
    int cnt[7]={0,0,0,0,0,0,0};
    int num;
    int typenum=0;
    cin>>num;
    char ty;
    for (int i = 0; i < num; ++i) {
        cin>>str;
        if(str=="1"){
            cin>>ty;
            int no = names.find(ty)->second;
            if(cnt[no]==0) typenum++;
            cnt[no]++;
            q.push(no);
        }
        if(str=="2"){
            int ou = q.front();
            cnt[ou]--;
            if(cnt[ou]==0){
                typenum--;
            }
        }
        if(str=="3"){
            cout<<typenum<<endl;
        }
    }

}
```
:::

::: tip  2.跳跃游戏 有一堆石头，你需要按顺序跳他们，每块石头标记了跳到该块石头需要花费的步数，同时步数也受到限制 如果每次跳跃成功加30分，如果不能再跳跃则结束，如果到最后一个石头则结束
:::

::: code-tabs

@tab C++

```cpp
#include<iostream>
using namespace std;

int main(){
    int num;
    int maxdis;
    cin>>num;
    cin>>maxdis;
    int stones[num];
    int fib[maxdis];
    for(int i=0;i<num;i++){
        cin>>stones[i];
    }
    for(int i=0;i<maxdis;i++){
        cin>>fib[i];
    }
    int score = 0;
    for(int i=0;i<num;i++){
        int distance = stones[i];
//        if(distance>maxdis){
//            break;
//        }
        if(fib[distance-1]==0){
            break;
        } else{
            fib[distance-1]--;
            score+=30;
        }
    }
    cout<<score;
}
```
:::

::: tip 3.给一颗树 检查其中每个节点是一个输入的字符 检查节点和邻居组成形式为abb的个数
:::

:::code-tabs

@tab java
```java
//不太熟悉CPP 用java写的 不知道对不对 如果有错误希望大家纠正
//思路是用dfs
public class Test03 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = Integer.parseInt(sc.nextLine());
        Map<Integer, List<Integer>> tree = new HashMap<>();
        String ch = sc.nextLine();
        boolean[] visited = new boolean[num];
        for(int i=0;i<num+1;i++){
            int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            tree.computeIfAbsent(nums[0],k->new ArrayList<>()).add(nums[1]);
            tree.computeIfAbsent(nums[1],k->new ArrayList<>()).add(nums[0]);
        }
        int res = 0;
        for(int i=1;i<num+1;i++){
            boolean is = dfs(tree,i,1,1,ch);
            if(is){
                res++;
            }
        }
        System.out.println(res);
    }
    public static boolean dfs(Map<Integer, List<Integer>> tree,int last,int level,int node,String ch){
        if(level>3) return false;
        if(level==1){
            for (int i : tree.get(node)) {
                boolean is = dfs(tree,node,level+1,i,ch);
                if(is){
                    return true;
                }
            }
        }
        if(level==2){
            if(ch.charAt(last-1)==ch.charAt(node-1)) return false;
            for (int i : tree.get(node)) {
                boolean is = dfs(tree,node,level+1,i,ch);
                if(is){
                    return true;
                }
            }
        }
        if(level==3){
            if(ch.charAt(node-1)==ch.charAt(last)){
                return true;
            }
        }
        return false;
    }
}
```
---
lang: zh-CN
title: 红黑树
description: 数据结构
category: 
 - 算法
tag:
 - 数据结构
---

红黑树是特殊的二叉查找树，意味着它满足二叉查找树的特征：任意一个节点所包含的键值，大于等于左孩子的键值，小于等于右孩子的键值。

红黑树的特点

> 1.每个节点或者是黑色，或者是红色。
>
> 2.根节点是黑色。
>
> 3.每个叶子节点是黑色。 注意：这里叶子节点，是指为空的叶子节点！
>
> 4.如果一个节点是红色的，则它的子节点必须是黑色的。
>
> 5.从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。

## 插入数据put

初始化时 将该节点默认设为红色

### 1.插入节点的父节点是黑色

则不需要处理

### 2.插入节点的父节点是红色



```java
public class BlackRedTree {

    public static final byte red = 0;
    public static final byte black = 1;
    BlackRedTreeNode root;

    public int compare(int a,int b) {
       if (a<b) return 0;
       if (a>b) return 1;
       else return -1;
    }


    public void put(int key,int value){
        this.root = put(this.root,key,value);
        this.root.color=black;
    }


    public BlackRedTreeNode put(BlackRedTreeNode node,int key,int value){
        if(node==null){
            return new BlackRedTreeNode(1,1,key,value,red);
        }
        int cmp = compare(key, node.key);
        if (cmp>=0){
            node.children[cmp]=put(node.children[cmp],key,value);
            if(node.children[0]==null||node.children[1]==null) return node;
            if (node.children[1].isRed()&&!node.children[0].isRed()){
                node=node.rotate(0);
            }
            if (node.children[0].children[0]==null) return node;
            if (node.children[0].isRed()&&!node.children[0].children[0].isRed()){
                node=node.rotate(1);
            }
            if (node.children[0].isRed()&&!node.children[1].isRed()){
                node.flipColors();
            }

        }else {
            node.value = value;
        }
        node.pushUp();
        return node;
    }
    public BlackRedTreeNode get(int key){
        BlackRedTreeNode node = this.root;
        while (node!=null){
            int cmp = compare(key, node.key);
            if(cmp>=0){
                node = node.children[cmp];
            }else {
                return node;
            }

        }
        return null;
    }




    public static class BlackRedTreeNode{
        public BlackRedTreeNode(int size, int msz, int key, int value, byte color) {
            this.children = new BlackRedTreeNode[2];
            this.size = size;
            this.msz = msz;
            this.key = key;
            this.value = value;
            this.color = color;
        }

        BlackRedTreeNode[] children;
        int size;
        int msz;
        int key;
        int value;
        byte color;

        public boolean isRed(){
            return this.color==red;
        }

        private void pushUp(){
            int size = 1;
            int msz = (int)this.value;
            BlackRedTreeNode left = this.children[0];
            BlackRedTreeNode right = this.children[1];
            if(left!=null){
                size += left.size;
                msz += left.msz;
            }
            if(right!=null){
                size+= right.size;
                msz+=right.msz;
            }
            this.size=size;
            this.msz=msz;
        }

        public BlackRedTreeNode rotate(int flag){
            BlackRedTreeNode child = this.children[flag ^ 1];
            this.children[flag^1]=child.children[flag];
            child.children[flag]=this;
            child.color=child.children[flag].color;
            child.children[flag].color=red;
            this.pushUp();
            child.pushUp();
            return child;
        }

        public void flipColors(){
            if (this.color==red){
                this.color=black;
            }else {
                this.color=red;
            }
            if(this.children[0].color==red){
                this.children[0].color=black;
            }else {
                this.children[0].color=red;
            }
            if(this.children[1].color==red){
                this.children[1].color=black;
            }else {
                this.children[1].color=red;
            }
        }

        public BlackRedTreeNode moveRedLeft(){
            this.flipColors();
            BlackRedTreeNode node=this;
            if(this.children[0].children[1].isRed()){
                node.children[1]=node.children[1].rotate(1);
                node=node.rotate(0);
                node.flipColors();
            }
            return node;
        }
        public BlackRedTreeNode moveRedRight(){
            this.flipColors();
            BlackRedTreeNode node=this;
            if(this.children[0].children[0].isRed()){
                node=node.rotate(1);
                node.flipColors();
            }
            return node;
        }

        public BlackRedTreeNode balance(){
            BlackRedTreeNode node=this;
            if(node.children[1].isRed()){
                node=node.rotate(0);
            }
            if (node.children[0].isRed()&&node.children[0].children[0].isRed()){
                node=node.rotate(1);
            }
            if (node.children[0].isRed()&&node.children[1].isRed()){
                node.flipColors();
            }
            node.pushUp();
            return node;
        }

        public BlackRedTreeNode min(){
            BlackRedTreeNode node = this;
            while (node.children[0]!=null) {
                node = node.children[0];
            }
            return node;
        }

        public BlackRedTreeNode deleteMin(){
            BlackRedTreeNode node = this;
            if (node.children[0]==null){
                return null;
            }
            if(node.children[0].isRed()&&!node.children[0].isRed()){
                node = node.moveRedLeft();
            }
            node.children[0]=node.children[0].deleteMin();
            return node.balance();
        }



    }
    }
```


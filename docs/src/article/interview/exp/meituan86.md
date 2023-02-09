---
title: 美团2022.08.06笔试记录
lang: zh-CN
description: 美团笔试
category: 
 - 笔试
tag:
 - 美团
 - 笔试
---

::: tip 1.给定a、b两种点心的数量，每个礼盒放3个点心，a、b至少各有一个，求最多能包多少个礼盒
:::
::: note 例 
输入 2 2

输出 1
:::
```
public class Test01 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        for(int i=0;i<num;i++){
            int a = sc.nextInt();
            int b = sc.nextInt();
            int min = Math.min(a,b);
            int max = Math.max(a,b);
            if(max>=min*2){   //如果max>=2*min 由于每一份都至少需要一个min 所以答案就是min种（一个min，两个max）
                System.out.println(min);
            }
            else{       //如果  min<=max<2*min 那么此时肯定凑不够 一个min配2个max
                // 此时需要有min填补max的位置 答案从min开始减小 每次减小有两重效果
                // 例如 44 85  min=44 max=85  min = 44 max =44+41 不够
                // 当min取43时 min减少1 同时有多余的一个min和一个max可以补充 所以min-1的效果相当于补充了3个max
                //min=43 max = 43+42+1
                //本方法会TLE 因此需要优化
                //将此处的两种情况总结 可以发现答案要么是min 要么是 a+b//3
                for(int k=min;k>=0;k--){
                    if(k<=(min-k)+(max-k)){
                        System.out.println(k);
                        break;
                    }
                }
            }
        }
    }
}
```


```
//所以可以写成
public class Test01 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        for(int i=0;i<num;i++){
            int a = sc.nextInt();
            int b = sc.nextInt();
            int min = Math.min(a,b);
            System.out.println(Math.min(min,(a+b)/3));
        }
}
}
```


::: tip 2.给定一组0，-1，+1数组，分割点k左大于等于0、右侧小于等于0的为异常数据，求最乐观情况下有多少个异常数据
:::

```
public class Test02 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int[] nums = new int[num];
        for(int i=0;i<num;i++){
            nums[i]=sc.nextInt();
        }
        int[] min = new int[num+2]; //记录左侧有多少个>=0的数
        int[] max = new int[num+2]; //记录右侧有多少个<=0的数

        for(int i=0;i<num;i++){
            if(nums[i]<0){
                min[i+1]=min[i];
            }else {
                min[i+1]=min[i]+1;
            }
        }
        for(int i=num-1;i>=0;i--){
            if(nums[i]<=0){
                max[i+1]=max[i+2]+1;
            }else {
                max[i+1]=max[i+2];
            }
        }
        min[min.length-1]=min[min.length-2]; //处理边界条件
        max[0]=max[1];                        //处理边界
        int res = Integer.MAX_VALUE;
        for(int i=0;i<num+1;i++){
            res = Math.min(res,min[i]+max[i+1]);
        }

        System.out.println(res);
        //Arrays.stream(min).forEach(System.out::print);
        //System.out.println();
        //Arrays.stream(max).forEach(System.out::print);
    }
}
```


::: tip  3.给定一组魔法石正面和反面表示的数字，只有当至少一半相同数字的面朝上可以触发法阵，初始状态为全部朝上，求最少需要翻转多少块石头可以触发法阵，无解输出-1
:::

```
public class Test03 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int nums = Integer.parseInt(sc.nextLine());
        int[] front = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int[] back = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        Map<Integer,Integer> frontNum = new HashMap<>();//记录正面的个数 key 种类 value 个数
        Map<Integer,Integer> AllNum = new HashMap<>(); //记录全部的无重复的个数 key种类 value 正反不重复个数
        for(int num:front){
            frontNum.put(num,frontNum.getOrDefault(num,0)+1);
        }
        AllNum.putAll(frontNum);//frontnum 的map进行 深拷贝
        for(int i=0;i<back.length;i++){
            if(back[i]!=front[i]) AllNum.put(back[i],AllNum.getOrDefault(back[i],0)+1);
        }
        int target = (nums+1)/2;
        int res =Integer.MAX_VALUE;
        for(int i:AllNum.keySet()){
            if(AllNum.getOrDefault(i,0)>=target)//如果总数不足target 直接排除掉
                if(frontNum.getOrDefault(i,0)>=target){ //如果正面已经超过了target 不需要再做改变
                    res = 0;
                    break;
                }else {//否则就需要翻转target-正面朝上的数目
                    res = Math.min(res,target-frontNum.getOrDefault(i,0));
                }
        }
        res= res == Integer.MAX_VALUE?-1:res;
        System.out.println(res);

    }
}
```


::: tip  4.给定n个样本的类别编号，输入的次序为样本编号，每类样本编号最小的(m+1)/2为训练集，剩下的为测试集。按照样本编号升序输出所有训练集样本及训练集样本
:::

```
public class Test04 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for(int i=0;i<n;i++){
            nums[i]=sc.nextInt();
        }
        int[] count = new int[k+1];
        for(int i=0;i<n;i++){
            count[nums[i]]++;
        }

        for(int i=0;i<=k;i++){
            if(count[i]%2==1){
                count[i]=(count[i]/2+1);
            }else
                count[i]=(count[i]/2);
        }
        List<Integer> res = new ArrayList<>();
        List<Integer> tr = new ArrayList<>();
        for(int i=0;i<n;i++){
            if(count[nums[i]]>0){
                res.add(i+1);
                count[nums[i]]--;
            }else {
                tr.add(i+1);
            }
        }
        for (int i=0;i<res.size();i++){
            System.out.print(res.get(i));
            if(i!=res.size()-1)
            System.out.print(" ");
        }
        System.out.println();
        for (int i=0;i<tr.size();i++){
            System.out.print(tr.get(i));
            if(i!=tr.size()-1)
                System.out.print(" ");
        }
    }
}
```
::: tip 5.将字符串s丢入机器后则输出新字符串s+reverse(s)+"wow"。初始字符串为"MeiTuan"，不停的反复将新字符串丢入机器，求得到的无限长字符串的第k位字母（1 ≤ k ≤ 1e18）
:::


```
public class Test05 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int i = sc.nextInt();
        System.out.println("MeiTuannauTieMWoWWoW".charAt((i-1)%20)); //发现一直是这20个字符在循环
    }
}
```

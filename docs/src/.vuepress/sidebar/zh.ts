import { sidebar } from "vuepress-theme-hope";
export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "计算机系统基础",
      icon: "process",
      collapsible: true,
      prefix: "article/basic/",
      children: ["overview","cpu","cache","nemu","decode"]
    },
    {
      text: "操作系统基础",
      icon: "centos",
      collapsible: true,
      prefix: "article/os/",
      children: ["overview","concurrence","model"]
    },
    {
      text: "计算机网络基础",
      icon: "network",
      collapsible: true,
      prefix: "article/network",
      children: ["HTTP","TCP","IP","UDP","rpc"],
    },
    {
      text: "Java", 
      icon: "java",
      collapsible: true,
      prefix: "article/javastack",
      children: [
        {
          text: "Java基础",
          icon: "note",
          collapsible: true,
          prefix: "javaSE",
          children: ["basic", "syntax", "loop","array","function","oop","string"],
        },
        {
          text: "Java进阶",
          icon: "note",
          collapsible: true,
          prefix: "javaadvance",
          children:["collection","IO","thread"]
        },
        {
          text: "JVM",
          icon: "note",
          collapsible: true,
          prefix: "jvm",
          children: ["basic","memory","classloader","invoke","error","garbage","jit","inline","bytecode"]
        },{
          text: "JUC",
          icon: "note",
          collapsible: true,
          prefix: "juc",
          children: []
        }
      ],
    },
    {
      text: "MySQL",
      icon: "mysql",
      collapsible: true,
      prefix: "article/mysql",
      children: ["MySQL","MySQL-advanced"],
    },
    {
      text: "Redis",
      icon: "link",
      collapsible: true,
      prefix: "article/redis",
      children:[
        "overview",
        {
          text: "Redis面试题",
          icon: "link",
          collapsible: true,
          children: ["Redisinterv"],
        },
        {
          text: "Redis底层源码剖析",
          icon: "link",
          collapsible: true,
          children: ["源码数据类型"],
        },
      ]
    },
    {
      text: "Spring",
      icon: "leaf",
      collapsible: true,
      prefix: "article/spring",
      children:[
        {
          text: "Spring高级",
          icon: "leaf",
          collapsible: true,
          prefix: "springadvance",
          children: ["contextandbean","AOP","SpringMVC","Boot","Springinterview"],
        },
      ]
    },
    {
      text: "Python",
      icon: "python",
      collapsible: true,
      prefix: "article/python",
      children:["overview","advance"]
    },
    {
      text: "Golang",
      icon: "generic",
      collapsible: true,
      prefix: "article/golang",
      children:["overview"]
    },
    {
      text: "C/C++",
      icon: "vscode",
      collapsible: true,
      prefix: "article/ccpp",
      children:["overview","cbasic","cadv"]
    },
    {
      text: "算法",
      collapsible: true,
      icon: "function",
      prefix: "article/algorithm",
      children:[
        {
          text: "算法基础",
          icon: "function",
          collapsible: true,
          children: [
            {
              text: "二分法",
              icon: "play",
              prefix: "binarysearch",
              collapsible: true,
              children: ["overview","34","35","162","33","300","410"],
            },
            {
              text: "分治法",
              icon: "play",
              prefix: "divideandconquer",
              collapsible: true,
              children: ["98","215","169","50","23"],
            },
            {
              text: "排序",
              icon: "play",
              prefix: "order",
              collapsible: true,
              children: ["bubble","insert","merge","quick","heap","topological"],
            },
            {
              text: "模拟",
              icon: "play",
              prefix: "simulate",
              collapsible: true,
              children: ["59"],
            }
          ]
        },
        {
          text: "搜索算法",
          icon: "function",
          collapsible: true,
          children: [
            {
              text: "BFS",
              icon: "play",
              prefix: "BFS",
              collapsible: true,
              children: ["102","127","200","490","505","207","210"],
            },
            {
              text: "DFS",
              icon: "play",
              prefix: "DFS",
              collapsible: true,
              children: ["94","124","297","78","90","46","47","77"],
            },
            {
              text: "回溯",
              icon: "play",
              prefix: "backtrack",
              collapsible: true,
              children: ["17","40","46","51","77","78","93","131","216","491"],
            },

          ]
        },
        {
          text: "数据结构",
          icon: "function",
          collapsible: true,
          children: [
          {
            text: "单调栈",
            icon: "play",
            prefix: "monotonicstack",
            collapsible: true,
            children: ["单调栈","42","84","739"],
          },
          {
            text: "单调队列",
            icon: "play",
            prefix: "monotonicqueue",
            collapsible: true,
            children: ["单调队列","239","375"],
          },
          {
            text: "堆",
            icon: "play",
            prefix: "heap",
            collapsible: true,
            children: ["堆"],
          },
          {
            text: "字典树",
            icon: "play",
            prefix: "trie",
            collapsible: true,
            children: ["212"],
          },
          {
            text: "并查集",
            icon: "play",
            prefix: "unionfind",
            collapsible: true,
            children: ["并查集"],
          },
          {
            text: "链表",
            icon: "play",
            prefix: "linkedlist",
            collapsible: true,
            children: ["206","92","25","2","445","21","23","141","142","203","83","82","19","1171","234","160","138","426"]
          },
          {
            text: "滑动窗口",
            icon: "play",
            prefix: "slidingwindow",
            collapsible: true,
            children: ["滑动窗口","3","76","159","209","340","438","567","395","424"],
          },
          {
            text: "双指针",
            icon: "play",
            prefix: "doublepointer",
            collapsible: true,
            children: ["双指针","11","142","283","2302"],
          },
          {
            text: "LRU",
            icon: "play",
            prefix: "datastruct",
            collapsible: true,
            children: ["146"],
          },
          {
            text: "LFU",
            icon: "play",
            prefix: "datastruct",
            collapsible: true,
            children: ["460"],
          },
          {
            text: "红黑树",
            icon: "play",
            prefix: "datastruct",
            collapsible: true,
            children: ["br-tree"],
          },
          {
            text: "跳表",
            icon: "play",
            prefix: "datastruct",
            collapsible: true,
            children: ["skiplist"],
          },
        ],
        },
        {
          text: "数学",
          icon: "function",
          collapsible: true,
          children: [
            {
              text: "位运算",
              icon: "play",
              prefix: "bitmanipulation",
              collapsible: true,
              children: ["78"],
            },
            {
              text: "扫描线",
              icon: "play",
              prefix: "scanline",
              collapsible: true,
              children: ["LintCode391","252","253","56","57","1272","435","1288","352","1229","986","759","218"],
            },
            {
              text: "快速幂",
              icon: "play",
              prefix: "pow",
              collapsible: true,
              children: ["pow"],
            }
          ],
        },
        {
          text: "动态规划",
          icon: "function",
          prefix: "dp",
          collapsible: true,
          children: ["动态规划"],
        },
        {
          text: "图",
          icon: "function",
          prefix: "graph",
          collapsible: true,
          children: ["overview","207"],
        },
        {
          text: "周赛",
          icon: "ability",
          prefix: "week",
          collapsible: true,
          children: [
            {
              text: "第308周周赛",
              icon: "ability",
              collapsible: true,
              children: ["308week1","308week2","308week3","308week4"],
            },
            {
              text: "第309周周赛",
              icon: "ability",
              collapsible: true,
              children: ["309week1","309week2","309week3","309week4"],
            },
          ],
        },
      ]
    }
  ],
}
);


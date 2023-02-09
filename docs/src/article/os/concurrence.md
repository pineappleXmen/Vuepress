---
lang: zh-CN
title: 并发程序
description: 操作系统基础概念
category: 
 - Linux
tag:
 - OS
---

::: tip 并发模块

多处理器编程

理解并发程序执行

并发控制

并发编程及对Bug应对

:::

::: note 什么是并发(Concurrent)

Concurrent: existing, happening, or done ***at the same time*.**

In computer science, concurrency refers to the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the final outcome. (Wikipedia)

:::

如果使用状态机的视角查看并发程序，并发的程序实际是一个共享内存的多个执行流

共享内存的多个执行流

- 执行流拥有独立的堆栈/寄存器
- 共享全部的内存 (指针可以互相引用)

多个执行流会带来方便，同时也打开了潘多拉的魔盒

::: note 并发程序带来的问题

原子性缺失

顺序性缺失

可见性缺失

:::

## 多处理器编程

### **原子性**

原子性：一段代码执行 (例如 `pay()`) 独占整个计算机系统

- 单处理器多线程
  - 线程在运行时可能被中断，切换到另一个线程执行
- 多处理器多线程
  - 线程根本就是并行执行的

在多处理器时代，程序的原子性无法被保证。此时需要使用其他的方式来保证在并发状态下的程序的原子性。

那么如何实现并发程序的原子性呢？

- `lock(&lk)`
- `unlock(&lk)`
  - 实现临界区 (critical section) 之间的绝对串行化
  - 程序的其他部分依然可以并行执行

99% 的并发问题都可以用一个队列解决

- 把大任务切分成可以并行的小任务
- worker thread 去锁保护的队列里取任务
- 除去不可并行的部分，剩下的部分可以获得线性的加速



### **顺序性**

::: note 编译器的优化

编译器对内存访问 “eventually consistent” 的处理导致共享内存作为线程同步工具的失效。

:::

在C程序被编译成汇编码的过程里，并不会保证程序执行的顺序性。

另一方面，CPU也是编译器，会对汇编码进行进一步的优化。这也会导致代码顺序性的错误。

如何保证顺序性？

可以使用下面的内联汇编语句实现内存屏障

```c
asm volatile ("" ::: "memory");
```

__volatile__告诉编译器，严禁将此处的汇编语句与其它的语句重组合优化。即：原原本本按原来的样子处理这这里的汇编。
**memory**强制 gcc 编译器假设 RAM 所有内存单元均被汇编指令修改，这样 cpu 中的 registers 和 cache 中已缓存的内存单元中的数据将作废。**cpu 将不得不在需要的时候重新读取内存中的数据。**这就阻止了 cpu 又将 registers, cache 中的数据用于去优化指令，而避免去访问内存。
""::: 表示这是个空指令。barrier() 不用在此插入一条串行化汇编指令。在后文将讨论什么叫串行化指令。

那么这句话是什么意思呢？它只是插入了一个空指令""，什么也没做。其实不然，这句话的关键在最后的"memory" clobber，它告诉编译器：这条指令（其实是空的）可能会读取任何内存地址，也可能会改写任何内存地址。那么编译器会变得保守起来，它会防止这条fence命令上方的内存访问操作移到下方，同时防止下方的操作移到上面，也就是防止了乱序，是我们想要的结果。

但这还没完，这条命令还有另外一个副作用：它会让编译器把所有缓存在寄存器中的内存变量flush到内存中，然后重新从内存中读取这些值。这并不一定是我们想要的结果，比如有些变量只在当前线程中使用，留在寄存器中很好，多了一对写/读内存操作是不必要的开销。

同时也可以使用 mfence 汇编命令实现内存的屏障

```c
asm volatile ("mfence" ::: "memory");
```

::: note mfence 手册

[mfence](https://www.felixcloutier.com/x86/mfence.html)

[mfence 和 asm volatile ("" ::: "memory"); 区别](https://stackoverflow.com/questions/12183311/difference-in-mfence-and-asm-volatile-memory)

:::

### 可见性

现代的处理器本身也是一个动态的处理器

::: note 现代处理器也是只保证最终一致性

满足单处理器 eventual memory consistency 的执行，在多处理器上可能无法序列化！

[内存系统模型](https://research.swtch.com/hwmm)

:::

如何保证顺序性

可以通过关键字

```c
__sync_synchronize()
RTFM 
```

[syc 手册](https://gcc.gnu.org/onlinedocs/gcc/_005f_005fsync-Builtins.html)

## 并发编程控制

### 互斥

::: note 互斥算法的困难点

实现互斥的根本困难：不能同时读/写共享内存

- load (环顾四周) 的时候不能写，只能 “看一眼就把眼睛闭上”
  - 看到的东西马上就过时了
- store (改变物理世界状态) 的时候不能读，只能 “闭着眼睛动手”
  - 也不知道把什么改成了什么

:::

> Peterson算法
>
> 
>
> 

如果软件无法解决问题，硬件可以用一条指令来解决

硬件能为我们提供一条 “瞬间完成” 的读 + 写指令

在Intel 80486指令集中 增加了Lock指令

Lock的作用为，在CPU执行到带有Lock指令的时候，会将内存先上锁（此时其他CPU无法读写内存）随后在执行操作。

![80486 CPU内存模型](\os\CPU80486.png)

```c
int xchg(volatile int *addr, int newval) {
  int result;
  asm volatile ("lock xchg %0, %1"
    : "+m"(*addr), "=a"(result) : "1"(newval));
  return result;
}
```

这是一个原子操作，是在硬件层面上了一把总线锁，由总线决定谁更先运行。

然而今天的CPU拥有多个缓存(L1、L2、L3)

![CPU Cache模型](\os\CPU80486cache.png)

这意味着，如果需要给Memory中的某个值上锁，则需要将其他CPU的Cache中的这个值给删掉，这增加了很多性能损耗。

**思考一下：我们对原子操作的主要需求**

考虑常见的原子操作：

- atomic test-and-set
  - `reg = load(x); if (reg == XX) { store(x, YY); }`
- lock xchg
  - `reg = load(x); store(x, XX);`
- lock add
  - `t = load(x); t++; store(x, t);`

它们的本质都是：

1. load
2. exec (处理器本地寄存器的运算)
3. store

通过硬件来解决这个问题

#### Load-Reserved/Store-Conditional (LR/SC)

LR: 在内存上标记 reserved (盯上你了)，中断、其他处理器写入都会导致标记消除

```
lr.w rd, (rs1)
  rd = M[rs1]
  reserve M[rs1]
```

------

SC: 如果 “盯上” 未被解除，则写入

```
sc.w rd, rs2, (rs1)
  if still reserved:
    M[rs1] = rs2
    rd = 0
  else:
    rd = nonzero
```

从硬件上实现CAS指令

#### Compare-and-Swap 的 LR/SC 实现

```
int cas(int *addr, int cmp_val, int new_val) {
  int old_val = *addr;
  if (old_val == cmp_val) {
    *addr = new_val; return 0;
  } else { return 1; }
}
cas:
  lr.w  t0, (a0)       # Load original value.
  bne   t0, a1, fail   # Doesn’t match, so fail.
  sc.w  t0, a2, (a0)   # Try to update.
  bnez  t0, cas        # Retry if store-conditional failed.
  li a0, 0             # Set return to success.
  jr ra                # Return.
fail:
  li a0, 1             # Set return to failure.
  jr ra                # Return
```

这就是一个自旋锁。

::: note LR/SC的硬件实现

[RISCV-BOOM](https://github.com/riscv-boom/riscv-boom)

[LR SC](https://github.com/riscv-boom/riscv-boom/blob/master/src/main/scala/lsu/dcache.scala#L655)

:::

::: tip 自旋锁缺陷

自旋锁也会面临一定的缺陷

- 自旋 (共享变量) 会触发处理器间的缓存同步，延迟增加

- 除了进入临界区的线程，其他处理器上的线程都在空转
- 争抢锁的处理器越多，利用率越低

- 获得自旋锁的线程 可能被操作系统切换出去
  - 操作系统不 “感知” 线程在做什么 (但为什么不能呢？)
- 实现 100% 的资源浪费

:::

自旋锁浪费的例子

```c
#include "thread.h"
#include "thread-sync.h"

#define N 10000000
spinlock_t lock = SPIN_INIT();

long n, sum = 0;

void Tsum() {
  for (int i = 0; i < n; i++) {
    spin_lock(&lock);
    sum++;
    spin_unlock(&lock);
  }
}

int main(int argc, char *argv[]) {
  assert(argc == 2);
  int nthread = atoi(argv[1]);
  n = N / nthread;
  for (int i = 0; i < nthread; i++) {
    create(Tsum);
  }
  join();
  assert(sum == n * nthread);
}
```

执行上面的代码，发现一个线程时只需100ms 而如果增加多个线程运行时，时间不减反增，这就是因为自旋锁面临的问题。



::: note 自旋锁使用场景

**临界区几乎不拥堵**

**持有自旋锁时禁止执行流切换**（持有锁 但被切换出去 导致其他一直在等，但操作系统不会允许程序实现这一点）

故使用场景主要在 

- 操作系统可以关闭中断和抢占
  - 保证锁的持有者在很短的时间内可以释放锁
- (如果是虚拟机呢...😂)
  - PAUSE 指令会触发 VM Exit
- 但依旧很难做好

:::

那么该如何实现长临界区的互斥呢

“让” 不是 C 语言代码可以做到的 (C 代码只能计算)

- 把锁的实现放到操作系统里就好啦！

  - ```
    syscall(SYSCALL_lock, &lk);
    ```

    - 试图获得 `lk`，但如果失败，就切换到其他线程

  - ```
    syscall(SYSCALL_unlock, &lk);
    ```

    - 释放 `lk`，如果有等待锁的线程就唤醒



操作系统 = 更衣室管理员

- 先到的人 (线程)
  - 成功获得手环，进入游泳馆
  - `*lk = 🔒`，系统调用直接返回
- 后到的人 (线程)
  - 不能进入游泳馆，排队等待
  - 线程放入等待队列，执行线程切换 (yield)
- 洗完澡出来的人 (线程)
  - 交还手环给管理员；管理员把手环再交给排队的人
  - 如果等待队列不空，从等待队列中取出一个线程允许执行
  - 如果等待队列为空，`*lk = ✅`
- 管理员 (OS) 使用自旋锁确保自己处理手环的过程是原子的

**自旋锁和睡眠锁各有自己的优点和缺点**

自旋锁 (线程直接共享 locked)

- 更快的 fast path
  - xchg 成功 → 立即进入临界区，开销很小
- 更慢的 slow path
  - xchg 失败 → 浪费 CPU 自旋等待

睡眠锁 (通过系统调用访问 locked)

- 更快的 slow path
  - 上锁失败线程不再占用 CPU
- 更慢的 fast path
  - 即便上锁成功也需要进出内核 (syscall)

那么是否有两种都要的锁呢

- Fast path: 一条原子指令，上锁成功立即返回
- Slow path: 上锁失败，执行系统调用睡眠
  - 性能优化的最常见技巧
    - 看 average (frequent) case 而不是 worst case

------

POSIX 线程库中的互斥锁 (`pthread_mutex`)

```c
#include "thread.h"
#include "thread-sync.h"

#define N 10000000
mutexlock_t lock = MUTEX_INIT();

long n, sum = 0;

void Tsum() {
  for (int i = 0; i < n; i++) {
    mutex_lock(&lock);
    sum++;
    mutex_unlock(&lock);
  }
}

int main(int argc, char *argv[]) {
  assert(argc == 2);
  int nthread = atoi(argv[1]);
  n = N / nthread;
  for (int i = 0; i < nthread; i++) {
    create(Tsum);
  }
  join();
  assert(sum == n * nthread);
}
```

#### Futex的实现

可以发现明显改善了多线程的时候自旋锁的缺点。

那么Futex如何实现的呢

先在用户空间自旋

- 如果获得锁，直接进入
- 未能获得锁，系统调用
- 解锁以后也需要系统调用
  - [futex.py](http://jyywiki.cn/pages/OS/2022/demos/futex.py)
  - 更好的设计可以在 fast-path 不进行系统调用

::: note Futex

[Futex overview and update](https://lwn.net/Articles/360699/)

[Futex are tricky](http://jyywiki.cn/pages/OS/manuals/futexes-are-tricky.pdf)

:::



### 同步

::: tip 同步概念

#### 同步 (Synchronization)

两个或两个以上随时间变化的量在变化过程中保持一定的相对关系

- iPhone/iCloud 同步 (手机 vs 电脑 vs 云端)
- 变速箱同步器 (合并快慢速齿轮)
- 同步电机 (转子与磁场速度一致)
- 同步电路 (所有触发器在边沿同时触发)

------

异步 (Asynchronous) = 不同步

- 上述很多例子都有异步版本 (异步电机、异步电路、异步线程)

::: 

#### 生产者-消费者问题：学废你就赢了

> 99% 的实际并发问题都可以用生产者-消费者解决。

```
void Tproduce() { while (1) printf("("); }
void Tconsume() { while (1) printf(")"); }
```

在 `printf` 前后增加代码，使得打印的括号序列满足

- 一定是某个合法括号序列的前缀

- 括号嵌套的深度不超过

   

  n*n*

  - n=3*n*=3, `((())())(((` 合法
  - n=3*n*=3, `(((())))`, `(()))` 不合法

- 同步

  - 等到有空位再打印左括号
  - 等到能配对时再打印右括号

为什么叫 “生产者-消费者” 而不是 “括号问题”？

- 左括号：生产资源 (任务)、放入队列
- 右括号：从队列取出资源 (任务) 执行

------

能否用互斥锁实现括号问题？

- 左括号：嵌套深度 (队列) 不足 n*n* 时才能打印
- 右括号：嵌套深度 (队列)>1时才能打印
  - 当然是等到满足条件时再打印了
    - 用互斥锁保持条件成立
  - 压力测试的检查当然不能少：[pc-check.py](http://jyywiki.cn/pages/OS/2022/demos/pc-check.py)
  - Model checker 当然也不能少 (留作习题)ss

```c
#include "thread.h"
#include "thread-sync.h"

int n, count = 0;
mutex_t lk = MUTEX_INIT();

void Tproduce() {
  while (1) {
retry:
    mutex_lock(&lk);
    if (count == n) {
      mutex_unlock(&lk);
      goto retry;
    }
    count++;
    printf("(");
    mutex_unlock(&lk);
  }
}

void Tconsume() {
  while (1) {
retry:
    mutex_lock(&lk);
    if (count == 0) {
      mutex_unlock(&lk);
      goto retry;
    }
    count--;
    printf(")");
    mutex_unlock(&lk);
  }
}

int main(int argc, char *argv[]) {
  assert(argc == 2);
  n = atoi(argv[1]);
  setbuf(stdout, NULL);
  for (int i = 0; i < 8; i++) {
    create(Tproduce);
    create(Tconsume);
  }
}
```



但是这样还是会有自旋的操作

如何避免呢

#### Conditional Variables (条件变量, CV)

把上述代码中的自旋变成睡眠

- 在完成操作时唤醒

------

条件变量 API

- wait(cv, mutex) 💤
  - 调用时必须保证已经获得 mutex
  - 释放 mutex、进入睡眠状态
- signal/notify(cv) 💬 私信：走起
  - 如果有线程正在等待 cv，则唤醒其中一个线程
- broadcast/notifyAll(cv) 📣 所有人：走起
  - 唤醒全部正在等待 cv 的线程



通过条件变量的代码

我们可以实现刚刚的问题

```c
void Tproduce() {
  mutex_lock(&lk);
  if (count == n) cond_wait(&cv, &lk);
  printf("("); count++; cond_signal(&cv);
  mutex_unlock(&lk);
}

void Tconsume() {
  mutex_lock(&lk);
  if (count == 0) cond_wait(&cv, &lk);
  printf(")"); count--; cond_signal(&cv);
  mutex_unlock(&lk);
}
```

但是这样的代码在面临生产者和消费者不对等的时候是不成立的。

所以需要两个条件变量来控制同类不唤醒。

**条件变量：正确的打开方式**

需要等待条件满足时

```
mutex_lock(&mutex);
while (!cond) {
  wait(&cv, &mutex);
}
assert(cond);
// ...
// 互斥锁保证了在此期间条件 cond 总是成立
// ...
mutex_unlock(&mutex);
```

其他线程条件可能被满足时

```
broadcast(&cv);
```

随后来挑战一个更为复杂的题目！

::: warn 打印一条鱼

有三种线程，分别打印 `<`, `>`, 和 `_`

- 对这些线程进行同步，使得打印出的序列总是 `<><_` 和 `><>_` 组合

------

使用条件变量，只要回答三个问题：

- 打印 “`<`” 的条件？
- 打印 “`>`” 的条件？
- 打印 “`_`” 的条件？

::: 

画状态机 同时解决即可

```c
#include "thread.h"

#define LENGTH(arr) (sizeof(arr) / sizeof(arr[0]))

enum { A = 1, B, C, D, E, F, };

struct rule {
  int from, ch, to;
};

struct rule rules[] = {
  { A, '<', B },
  { B, '>', C },
  { C, '<', D },
  { A, '>', E },
  { E, '<', F },
  { F, '>', D },
  { D, '_', A },
};
int current = A, quota = 1;

pthread_mutex_t lk   = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t  cond = PTHREAD_COND_INITIALIZER;

int next(char ch) {
  for (int i = 0; i < LENGTH(rules); i++) {
    struct rule *rule = &rules[i];
    if (rule->from == current && rule->ch == ch) {
      return rule->to;
    }
  }
  return 0;
}

void fish_before(char ch) {
  pthread_mutex_lock(&lk);
  while (!(next(ch) && quota)) {
    // can proceed only if (next(ch) && quota)
    pthread_cond_wait(&cond, &lk);
  }
  quota--;
  pthread_mutex_unlock(&lk);
}

void fish_after(char ch) {
  pthread_mutex_lock(&lk);
  quota++;
  current = next(ch);
  assert(current);
  pthread_cond_broadcast(&cond);
  pthread_mutex_unlock(&lk);
}

const char roles[] = ".<<<<<>>>>___";

void fish_thread(int id) {
  char role = roles[id];
  while (1) {
    fish_before(role);
    putchar(role); // can be long; no lock protection
    fish_after(role);
  }
}

int main() {
  setbuf(stdout, NULL);
  for (int i = 0; i < strlen(roles); i++)
    create(fish_thread);
}
```



#### 信号量：实现生产者-消费者

做一点扩展——线程可以任意 “变出” 一个手环

- 把手环看成是令牌
- 得到令牌的可以进入执行
- 可以随时创建令牌

------

“手环” = “令牌” = “一个资源” = “信号量” (semaphore)

- P(&sem) - prolaag = try + decrease; wait; down; in
  - 等待一个手环后返回
  - 如果此时管理员手上有空闲的手环，立即返回
- V(&sem) - verhoog = increase; post; up; out
  - 变出一个手环，送给管理员

信号量设计的重点

- 考虑 “手环” (每一单位的 “资源”) 是什么，谁创造？谁获取？
  - [`pc-sem.c`](http://jyywiki.cn/pages/OS/2022/demos/pc-sem.c)

```
void producer() {
  P(&empty);   // P()返回 -> 得到手环
  printf("("); // 假设线程安全
  V(&fill);
}
void consumer() {
  P(&fill);
  printf(")");
  V(&empty);
}
```

- 在 “一单位资源” 明确的问题上更好用



#### 哲学家吃饭问题

```c
mutex_lock(&mutex);
while (!(avail[lhs] && avail[rhs])) {
  wait(&cv, &mutex);
}
avail[lhs] = avail[rhs] = false;
mutex_unlock(&mutex);

mutex_lock(&mutex);
avail[lhs] = avail[rhs] = true;
broadcast(&cv);
mutex_unlock(&mutex);
```

分布式的解决方案

另一方面是集中式

```c
void Tphilosopher(int id) {
  send_request(id, EAT);
  P(allowed[id]); // waiter 会把叉子递给哲学家
  philosopher_eat();
  send_request(id, DONE);
}

void Twaiter() {
  while (1) {
    (id, status) = receive_request();
    if (status == EAT) { ... }
    if (status == DONE) { ... }
  }
}
```

利用一个waiter来集中给哲学家分配叉子

你可能会觉得，管叉子的人是性能瓶颈

- 一大桌人吃饭，每个人都叫服务员的感觉
- Premature optimization is the root of all evil (D. E. Knuth)

------

抛开 workload 谈优化就是耍流氓

- 吃饭的时间通常远远大于请求服务员的时间
- 如果一个 manager 搞不定，可以分多个 (fast/slow path)
  - 把系统设计好，使集中管理不成为瓶颈
    - [Millions of tiny databases](https://www.usenix.org/conference/nsdi20/presentation/brooker) (NSDI'20)

### **现实生活中的并发程序**

::: tip 并发程序遇到的主要挑战

**计算任务如何分解**

- 计算图需要容易并行化
  - 机器-线程两级任务分解
- 生产者-消费者解决一切
  - [MPI](https://hpc-tutorials.llnl.gov/mpi/) - “a specification for the developers and users of message passing libraries”, [OpenMP](https://www.openmp.org/) - “multi-platform shared-memory parallel programming in C/C++ and Fortran”
- [Parallel and Distributed Computation: Numerical Methods](https://web.mit.edu/dimitrib/www/pdc.html)

------

**线程间如何通信**

- 通信不仅发生在节点/线程之间，还发生在任何共享内存访问

:::

#### 数据中心：协程和线程

数据中心

- 同一时间有数千/数万个请求到达服务器
- 计算部分
  - 需要利用好多处理器
    - 线程 → 这就是我擅长的 (Mandelbrot Set)
    - 协程 → 一人出力，他人摸鱼
- I/O 部分
  - 会在系统调用上 block (例如请求另一个服务或读磁盘)
    - 协程 → 一人干等，他人围观
    - 线程 → 每个线程都占用可观的操作系统资源
- (这个问题比你想象的复杂，例如虚拟机)

#### Go 和 Goroutine

> Go: 小孩子才做选择，多处理器并行和轻量级并发我全都要！

Goroutine: 概念上是线程，实际是线程和协程的混合体

- 每个 CPU 上有一个 Go Worker，自由调度 goroutines
- 执行到 blocking API 时 (例如 sleep, read)
  - Go Worker 偷偷改成 non-blocking 的版本
    - 成功 → 立即继续执行
    - 失败 → 立即 yield 到另一个需要 CPU 的 goroutine
      - 太巧妙了！CPU 和操作系统全部用到 100%

------

例子

- [fib.go](http://jyywiki.cn/pages/OS/2022/demos/fib.go); 
- [The Go Programming Language (ch 9.8)](https://books.studygolang.com/gopl-zh/ch9/ch9-08.html)

Go解决了两个大问题，一个是线程上下文切换时的开销，一个是协程在遇到IO操作时会遇到的切换线程。

通过channel来进行线程间的通信，避免了共享内存的麻烦。



## 并发BUG应对方法

防御性编程

多用Assert断言来判断操作是否正确



### 死锁

#### AA-Deadlock

假设你的 spinlock 不小心发生了中断

- 在不该打开中断的时候开了中断
- 在不该切换的时候执行了 `yield()`

------

```
void os_run() {
  spin_lock(&list_lock);
  spin_lock(&xxx);
  spin_unlock(&xxx); // ---------+
}                          //    |
                           //    |
void on_interrupt() {      //    |
  spin_lock(&list_lock);   // <--+
  spin_unlock(&list_lock);
}
```

#### ABBA-Deadlock

```
void swap(int i, int j) {
  spin_lock(&lock[i]);
  spin_lock(&lock[j]);
  arr[i] = NULL;
  arr[j] = arr[i];
  spin_unlock(&lock[j]);
  spin_unlock(&lock[i]);
}
```

------

上锁的顺序很重要……

- ```
  swap
  ```

   

  本身看起来没有问题

  - `swap(1, 2)`; `swap(2, 3)`, `swap(3, 1)` → 死锁
  - [philosopher.c](http://jyywiki.cn/pages/OS/2022/demos/philosopher.c)

避免死锁

死锁产生的四个必要条件 ([Edward G. Coffman](https://en.wikipedia.org/wiki/Edward_G._Coffman,_Jr.), 1971):

- 互斥：一个资源每次只能被一个进程使用
- 请求与保持：一个进程请求资阻塞时，不释放已获得的资源
- 不剥夺：进程已获得的资源不能强行剥夺
- 循环等待：若干进程之间形成头尾相接的循环等待资源关系

------

> “理解了死锁的原因，尤其是产生死锁的四个必要条件，就可以最大可能地避免、预防和解除死锁。所以，在系统设计、进程调度等方面注意如何不让这四个必要条件成立，如何确定资源的合理分配算法，避免进程永久占据系统资源。此外，也要防止进程在处于等待状态的情况下占用资源。因此，对资源的分配要给予合理的规划。” ——Bullshit.

#### 避免死锁 (cont'd)

AA-Deadlock

- AA 型的死锁容易检测，及早报告，及早修复
- spinlock-xv6.c 中的各种防御性编程
  - `if (holding(lk)) panic();`

------

ABBA-Deadlock

- 任意时刻系统中的锁都是有限的
- 严格按照固定的顺序获得所有锁 (lock ordering; 消除 “循环等待”)
  - 遇事不决可视化：[lock-ordering.py](http://jyywiki.cn/pages/OS/2022/demos/lock-ordering.py)
  - 进而证明是安全的
    - “在任意时刻总是有获得 “最靠后” 锁的可以继续执行”



### 数据竞争

> 不同的线程同时访问同一段内存，且至少有一个是写。

- 两个内存访问在 “赛跑”，“跑赢” 的操作先执行

  - peterson-barrier.c

    : 内存访问都在赛跑

    - [MFENCE](https://www.felixcloutier.com/x86/mfence)：~~如何留下最少的 fence，依然保证算法正确？~~

用互斥锁保护数据，避免数据竞争

### 其他BUG

```c
// Case #1: 上错了锁
void thread1() { spin_lock(&lk1); sum++; spin_unlock(&lk1); }
void thread2() { spin_lock(&lk2); sum++; spin_unlock(&lk2); }
```

------

```c
// Case #2: 忘记上锁
void thread1() { spin_lock(&lk1); sum++; spin_unlock(&lk1); }
void thread2() { sum++; }
```

#### 原子性违反 (AV)

“ABA”

- 我以为一段代码没啥事呢，但被人强势插入了

![ABA](http://jyywiki.cn/pages/OS/img/av-bug.png)

#### 顺序违反 (OV)

“BA”

- 怎么就没按我预想的顺序来呢？
  - 例子：concurrent use after free

![OV](http://jyywiki.cn/pages/OS/img/ov-bug.png)

### 应对错误的方法

#### Lockdep: 运行时的死锁检查

Lockdep 规约 (Specification)

- 为每一个锁确定唯一的 “allocation site”
  - [lock-site.c](http://jyywiki.cn/pages/OS/2022/demos/lock-site.c)
  - assert: 同一个 allocation site 的锁存在全局唯一的上锁顺序

检查方法：printf

- 记录所有观察到的上锁顺序，例如

维护的其实是一个图，如果图中有环，则违背了加锁的顺序。

#### ThreadSanitizer: 运行时的数据竞争检查

为所有事件建立 happens-before 关系图

- Program-order + release-acquire
- 对于发生在不同线程且至少有一个是写的 x,y*x*,*y* 检查

还是要依靠工具做检查！

## 动态分析工具：Sanitizers

没用过 lint/sanitizers？

- AddressSanitizer(asan);(paper): 非法内存访问
  - Buffer (heap/stack/global) overflow, use-after-free, use-after-return, double-free, ...
  - Demo: [uaf.c](http://jyywiki.cn/pages/OS/2022/demos/uaf.c); [kasan](https://www.kernel.org/doc/html/latest/dev-tools/kasan.html)
- ThreadSanitizer(tsan): 数据竞争
  - Demo: [fish.c](http://jyywiki.cn/pages/OS/2022/demos/fish.c), [sum.c](http://jyywiki.cn/pages/OS/2022/demos/sum.c), [peterson-barrier.c](http://jyywiki.cn/pages/OS/2022/demos/peterson-barrier.c); [ktsan](https://github.com/google/ktsan)
- [MemorySanitizer](https://clang.llvm.org/docs/MemorySanitizer.html) (msan): 未初始化的读取
- UBSanitizer(ubsan): undefined behavior
  - Misaligned pointer, signed integer overflow, ...
  - Kernel 会带着 `-fwrapv` 编译

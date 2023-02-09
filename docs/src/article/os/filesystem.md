---
lang: zh-CN
title: 文件系统
description: Linux操作系统
category: 
 - Linux
tag:
 - OS
---

Linux的设计哲学是「**一切皆文件**」。也就是说，Linux系统中的一切实体都可以抽象为文件这一概念。所以，先了解一下Linux是怎样实现**文件**这一概念是相对重要的。

接下来我们将从以下几点综观Linux的文件系统是进行如何工作的

## **1.文件系统的结构**

在文件系统中分配空间的基本单位是逻辑块，逻辑块是文件系统所在的磁盘设备上的多个连续物理存储区间。例如，在ext2文件系统上的逻辑块大小为1024、2048或4096字节。

![image-20221005160310792](\os\image-20221005160310792.png)

**Boot Block**：启动块并没有被文件系统使用。其中包含的是用于引导操作系统的信息。尽管操作系统只需要一个引导块，但所有文件系统都有一个引导块(其中大多数是未使用的)。

**Superblock**:这是一个单独的块，紧挨着引导块，它包含关于文件系统的参数信息，包括:

- inode表的总量、使用量、剩余量（通过位图标识）等;
- data block的总量、使用量、剩余量（通过位图标识）等;
- 文件系统格式等。

位于同一物理设备上的不同文件系统可以具有不同的类型和大小，并且具有不同的参数设置(例如，块大小)。这是将磁盘分割为多个分区的原因之一。

**I-node table**:文件系统中的每个文件或目录在I-node表中都有一个唯一的条目。这个条目记录了关于文件的各种信息。

**Data block**:文件系统中的绝大多数空间用于构成文件系统中的文件和目录的数据块。



### **I-node table**

文件系统的i-node table为文件系统中的每个文件保存一个i-node指针，指向该文件的地址。

i-node通过它们在i-node表中的顺序位置进行数字标识。

![早期 Unix 文件系统](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F/Unix%20%E5%A4%9A%E7%BA%A7%E7%B4%A2%E5%BC%95.png)



### **虚拟文件系统 (VFS)**

操作系统支持的文件系统有很多，如ext2、ext3、VFAT、NFS等。如果每次实现具体的文件保存需要考虑具体的文件系统的不同实现是相当麻烦的。

VFS为文件系统操作定义了一个通用接口。所有处理文件的程序都根据这个通用接口指定它们的操作。并且每个文件系统都提供VFS接口的实现。这样，应用程序就只需要和VFS打交道即可实现不同文件系统的操作了。



## 2.进程如何操作文件

对于一个进程而言，对文件的操作一般分为三种类型打开文件、读/写文件、关闭文件。

操作文件的模式为：

`打开文件->读/写文件->关闭文件`

进程是如何进行这三个操作的呢？

在此之前，首先要看下在Linux内核中，进程是如何表示的。

### **进程中的文件结构**

进程在linux中用`task_struct`来进行抽象。在task_struct中，关于文件的定义是

```C
//linux-master/linux-master/kernel/sched/sched.h
struct task_struct {
    // ...
    struct files_struct     *files;
    // ...
}
```

这就是说 每个进程里都会保存一个files的指针 指向一个files_struct的结构体。

那么这个files_struct的结构体的构成又是什么呢

```c
//linux-master/linux-master/include/linux/fdtable.h
struct files_struct {
  /*
   * read mostly part
   */
	atomic_t count;
	bool resize_in_progress;
	wait_queue_head_t resize_wait;

	struct fdtable __rcu *fdt;
	struct fdtable fdtab;
  /*
   * written part on a separate cache line in SMP
   */
	spinlock_t file_lock ____cacheline_aligned_in_smp;
	unsigned int next_fd;
	unsigned long close_on_exec_init[1];
	unsigned long open_fds_init[1];
	unsigned long full_fds_bits_init[1];
	struct file __rcu * fd_array[NR_OPEN_DEFAULT];
};
```

可以看到，有一个`fdtable`的指针 `fdt` 和一个`fdtable`的实例 `fdtab`。以及一个存储*file类型的数组`fd_array`以及其他一些与fd操作相关的字段。

在`fd_array`中存储的便是进程打开的文件的数组。数组存储的类型 struct *file的文件指针。但是这个数组是固定长度的，如果进程打开了超过该数目的文件，那么就需要通过fdtable对该数组进行动态管理了。

fdtable的结构如下

```c
//linux-master/linux-master/include/linux/fdtable.h
struct fdtable {
	unsigned int max_fds;
	struct file __rcu **fd;      /* current fd array */
	unsigned long *close_on_exec;
	unsigned long *open_fds;
	unsigned long *full_fds_bits;
	struct rcu_head rcu;
};
```

`fd`字段的类型有点费解，拆开来看fd是一个指向file指针类型的指针。其实该字段指向的就是当前fd_array的地址。也就是说 fd其实就是fd_array这个数组的引用。当与用户态交互的时候，可以通过fdt->fd[fd]获取该*file指针。

当一个进程打开的文件数目没有达到max_fds的时候，直接从fdtable里申请新的位置，当超过时，通过申请一个新的fdt数组结构，并把当前打开的进行copy之后，将当前的指针指向新的table完成扩容。这就是fdt指针的作用。

![image-20221005210948015](\os\image-20221005210948015.png)

了解了这些之后，再尝试看一下内核在打开文件时做的操作

### **进程打开文件**

```c
long do_sys_open(int dfd, const char __user *filename, int flags, umode_t mode)
{
        struct open_flags op;
        /*flag是用户传递的参数，检查合法性并根据mode生成新的flags*/
        int fd = build_open_flags(flags, mode, &op);
        struct filename *tmp;

        if (fd)
                return fd;

        tmp = getname(filename);
        if (IS_ERR(tmp))
                return PTR_ERR(tmp);

        /*申请新的fd*/
        fd = get_unused_fd_flags(flags);
        if (fd >= 0) {
                struct file *f = do_filp_open(dfd, tmp, &op);
                if (IS_ERR(f)) {
                        put_unused_fd(fd);
                        fd = PTR_ERR(f);
                } else {
                        /*产生打开文件的通知事件*/
                        fsnotify_open(f);
                        /*将fd和文件管理结构对应起来*/
                        fd_install(fd, f);
                }
        }
        putname(tmp);
        return fd;
}

//申请fd的函数
/*do_sys_open->get_unused_fd_flags->alloc_fd(0, (flags))*/
int __alloc_fd(struct files_struct *files,
               unsigned start, unsigned end, unsigned flags)
{
        unsigned int fd;
        int error;
        struct fdtable *fdt;

        spin_lock(&files->file_lock);
repeat:
        fdt = files_fdtable(files);
        fd = start;
        if (fd < files->next_fd)
                fd = files->next_fd;

        if (fd < fdt->max_fds)
                fd = find_next_fd(fdt, fd);

        /*
         * N.B. For clone tasks sharing a files structure, this test
         * will limit the total number of files that can be opened.
         */
        error = -EMFILE;
        if (fd >= end)
                goto out;

        error = expand_files(files, fd);
        if (error < 0)
                goto out;

        /*
         * If we needed to expand the fs array we
         * might have blocked - try again.
         */
        if (error)
                goto repeat;

        if (start <= files->next_fd)
                files->next_fd = fd + 1;

        __set_open_fd(fd, fdt);
        if (flags & O_CLOEXEC)
                __set_close_on_exec(fd, fdt);
        else
                __clear_close_on_exec(fd, fdt);
        error = fd;
#if 1
        /* Sanity check */
        if (rcu_access_pointer(fdt->fd[fd]) != NULL) {
                printk(KERN_WARNING "alloc_fd: slot %d not NULL!\n", fd);
                rcu_assign_pointer(fdt->fd[fd], NULL);
        }
#endif

out:
        spin_unlock(&files->file_lock);
        return error;
}

//将fd和files在fdtable中相关联
void __fd_install(struct files_struct *files, unsigned int fd,
                struct file *file)
{
        struct fdtable *fdt;

        might_sleep();
        rcu_read_lock_sched();

        while (unlikely(files->resize_in_progress)) {
                rcu_read_unlock_sched();
                wait_event(files->resize_wait, !files->resize_in_progress);
                rcu_read_lock_sched();
        }
        /* coupled with smp_wmb() in expand_fdtable() */
        smp_rmb();
        fdt = rcu_dereference_sched(files->fdt);
        BUG_ON(fdt->fd[fd] != NULL);
        rcu_assign_pointer(fdt->fd[fd], file);
        rcu_read_unlock_sched();
}
```

可以看到，操作系统通过fdt->fd[fd]来获取该打开文件的*file指针

所以说明fd本质上就是fd_array的下标或者说是索引。

此时也便有了打开文件的系统调用

```c
#include <sys/stat.h>
#include <fcntl.h>
int open(const char *pathname, int flags, ... /* mode_t mode */);
								Returns file descriptor on success, or –1 on error
```

该系统调用返回的就是文件描述符 也就是fd

### 文件的结构

在前面讲到fd就是fd_array的索引，fd_array中存储的变量为*file结构体，那么这个 *file结构体又是什么样子的结构呢？

```c
struct file {
	union {
		struct llist_node	f_llist;
		struct rcu_head 	f_rcuhead;
		unsigned int 		f_iocb_flags;
	};
    
    
	struct path		f_path;
	struct inode		*f_inode;	/* cached value */
	const struct file_operations	*f_op;

	/*
	 * Protects f_ep, f_flags.
	 * Must not be taken from IRQ context.
	 */
	spinlock_t		f_lock;
	atomic_long_t		f_count;
	unsigned int 		f_flags;
	fmode_t			f_mode;
	struct mutex		f_pos_lock;
	loff_t			f_pos;
	struct fown_struct	f_owner;
	const struct cred	*f_cred;
	struct file_ra_state	f_ra;

	u64			f_version;
#ifdef CONFIG_SECURITY
	void			*f_security;
#endif
	/* needed for tty driver, and maybe others */
	void			*private_data;

#ifdef CONFIG_EPOLL
	/* Used by fs/eventpoll.c to link all the hooks to this file */
	struct hlist_head	*f_ep;
#endif /* #ifdef CONFIG_EPOLL */
	struct address_space	*f_mapping;
	errseq_t		f_wb_err;
	errseq_t		f_sb_err; /* for syncfs */
} __randomize_layout
  __attribute__((aligned(4)));
```

`f_path`：标识该文件地址，也就是文件名

`f_inode`：VFS系统的inode指针

`f_pos`：文件的偏移量

首先需要明确，这个*file类型的指针不是只属于某个进程的，而是在全局对所有的进程共享的。

试想一种情况，如果一个进程对某个文件进行写操作，而另一个也进行写操作，这样是会导致错误的发生的。所以需要用一些同步锁的手段保证不会产生同时写的操作。所以*file 应该是全局所有进程共享的。

那么，我们如何通过file结构体找到我们想要打开的文件呢？

答案在inode结构体当中，inode保存了一些文件的基本信息。

```c
struct inode {
    // 文件相关的基本信息（权限，模式，uid，gid等）
    umode_t             i_mode;
    unsigned short      i_opflags;
    kuid_t              i_uid;
    kgid_t              i_gid;
    unsigned int        i_flags;
    // 回调函数
    const struct inode_operations   *i_op;
    struct super_block              *i_sb;
    struct address_space            *i_mapping;
    // 文件大小，atime，ctime，mtime等
    loff_t              i_size;
    struct timespec64   i_atime;
    struct timespec64   i_mtime;
    struct timespec64   i_ctime;
    // 回调函数
    const struct file_operations    *i_fop;
    struct address_space            i_data;
    // 指向后端具体文件系统的特殊数据
    void    *i_private;     /* fs or device private pointer */
};
```

如何通过VFS的inode拿到具体实现的文件系统的inode呢？

以ext4举例

```c
struct ext4_inode_info {
    // ext4 inode 特色字段
    // ...
    struct inode    vfs_inode;  
};
```

在ext4的inode info结构体里已经包含了inode字段

那么已知该字段在该结构体中的偏移量，我们就可以通过类型强制转换的方式拿到ext4结构体的地址

假设偏移量为64 vfs inode 的地址为0xa89be0

那么具体文件系统的结构体地址就为

```c
(struct ext4_inode_info *)(0xa89be0 - 64)
```

![image-20221005214526462](\os\image-20221005214526462.png)

通过这样的方式，我们就找到了具体文件管理系统下面的具体的文件的结构体。

### 进程读文件

```c
#include <unistd.h>
ssize_t read(int fd, void *buffer, size_t count);
							Returns number of bytes read, 0 on EOF, or –1 on error
```

Count参数指定要读取的最大字节数。(SIZE_T数据类型是无符号整数类型。)。BUFFER参数提供要放置输入数据的内存缓冲区的地址。此缓冲区必须至少有计数字节长。

系统调用不会为用于向调用方返回信息的缓冲区分配内存。相反，我们必须传递一个指向先前分配的正确大小的内存缓冲区的指针。这与一些库函数不同，这些库函数确实会分配内存缓冲区，以便向调用方返回信息。

### 进程写文件

```c
#include <unistd.h>
ssize_t write(int fd, void *buffer, size_t count);
									Returns number of bytes written, or –1 on error
```

write尝试从buf写入count个字节到文件描述符fd所指的文件，并返回成功写入的字节数，同时将文件偏移向前移动相同字节数。write有可能写入比指定count少的字节数。

write本质上是把用户态缓存区的数据写入内核态缓存。

### 进程关闭文件

```c
#include <unistd.h>
int close(int fd);
 												Returns 0 on success, or –1 on error
```

### 文件的偏移量

```c
#include <unistd.h>
off_t lseek(int fd, off_t offset, int whence);
							   Returns new file offset if successful, or –1 on error
```

在写入和读取的文件的时候，是通过偏移量所在的位置进行读和写的。



## **3.特殊文件的封装**

Linux秉持「**一切皆文件**」的设计哲学，对于所有的文件都可以按照这个模式进行操作

`打开文件->读/写文件->关闭文件`

对于一些特殊的文件，Linux是如何进行封装的呢？

## 对Socket的封装

我们知道，在Linux中 Socket也被抽象成了文件的方式处理。那么Linux是如何做到的呢？

对于一个C/S体系而言，一般对于服务端和客户端，所使用的socket模式一般是这样

```
服务端
socket = socket()
socket.bind()
socket.listen()
socket.accept()
wirte/read
socket.close()
```

```
客户端
socket = socket()
socket.connect()
write/read
socket.close()
```

在这个过程中，服务端的socket是被动等待连接的，而客户端的socket是要主动发送连接请求的。这个区别主要是在系统调用中实现的

socket也能像一个文件一样进行打开、读写、关闭的操作。

### 打开一个socket

```c
#include <sys/socket.h>
int socket(int domain, int type, int protocol);
									   Returns file descriptor on success, or –1 on error
```

调用该方法会创建一个主动的普通socket

具体而言

首先调用 `socket_create` 函数创建好 `struct socket` ，还有与之关联的 `socket sock` 结构，再往下就是具体网络协议对应的结构体

调用 `sock_map_fd` 函数创建好 `struct file` 这个结构体，并与第一步创建出的 `struct socket` 关联起来；

这个struct file结构体在之前的结构中有讲到 在fd_array中存储的就是指向该结构体的指针 而fd就为该数组的索引也就是下标，这样，我们就把file结构体和实际的socket相关联了起来。

`sock_create` 函数里，会根据协议族查找对应的操作表，以 AF_INET 协议族举例，`pf->create` 是 `inet_create` ，主要做两件事：

1. 把 `sock->ops` 按照协议类型赋值成**具体的函数操作表**，比如 tcp 的就是 `inet_stream_ops` ；
2. 创建了 `struct sock` 对象，并且把 `struct sock` 初始化，并和 `struct socket` 进行关联；

着重提一点，`sock_init_data` 函数（ `net/core/sock.c` ）主要是初始化 `struct sock` 结构体的，提两点最关键的：

**第一步：初始化接收队列和发送队列**

每个socket包含一个接收队列和一个发送队列，也就是在内核中开辟一篇缓存供发送和接收数据使用。

- sk_receive_queue：socket接收到的数据（sk_buff 里面是纯粹的用户数据哦，没有 header 啥信息）；
- sk_write_queue：socket要发送的数据；
- sk_error_queue：挂接一些 pengding 的 error 信息；

**第二步：设置socket 的唤醒回调方式**；

```text
   sk->sk_data_ready   =   sock_def_readable;
   sk->sk_write_space  =   sock_def_write_space;
```

为什么这里很重要，因为这个跟 socket fd 可读可写的判断逻辑，数据到了之后的唤醒路径息息相关。简述下回调链路（以套接字层为主干，其他的流程简略描述）：

```text
sk->sk_data_ready（数据到了，该通知留下过联系方式的人了）
tcp_v4_rcv（具体协议栈处理函数）
软中断
硬中断
```

**再说下结构体：**

继续说 `struct sock` ，这个对象有意思了，这个也是以组合的方式往下兼容的，同一个地址强转类型得到不同层面的结构体。原理就在于：他们是一块连续的内存空间，起始地址相同。

```text
sock -> inet_sock -> inet_connection_sock-> tcp_sock
```

**`struct socket` 和 `struct sock` 是两个不同的结构体**属于**套接字层**的两个维度的描述，一个面向上层，一个面向下层。

`struct socket` 在内核的注释为：

> struct socket - general BSD socket

`struct sock` 在内核的注释为：

> struct sock_common - minimal network layer representation of sockets

`struct socket` 是内核抽象出的一个通用结构体，主要作用是放置了一些跟 fs 相关的字段，而真正跟网络通信相关的字段结构体是 `struct sock` 。它们内部有相互的指针，可以获取到对方的地址。

`struct socket` 这个字段出生的时候其实就和一个 inode 结构体伴生出来的，由 socketfs 的 `sock_alloc_inode` 函数分配。

`struct sock` 这个结构体是 socket 套阶字核心的结构（注意，还有个结构是 `struct socket`，这两个是不同的结构体哦）。这个是对底下具体协议做的一层抽象封装，比如在分配 `struct sock` 的时候，如果是 tcp 协议，那么 `sk->sk_prot` 会赋值为 `tcp_prot` ，udp 协议赋值的是 `udp_prot` ，之后的一系列协议解析和处理就是调用到对应协议的回调函数。

**为什么socketfd 可以像文件一样调用 `write(fd,args)` **

`write(fd, args)` 进到内核首先是到 vfs 层，也就是调用到 `vfs_write` ，在这个里面首先获取到 `file` 这个结构体，然后调用下层注册的回调，比如 `file->f_op->write_iter` ，`file->f_op->write` ，所以，关键在如何调用的`file->f_op` 这个字段。

该字段赋值是根据所谓file的类型决定的，不同的类型的file会被赋予不同的值

```c
vfs_write    =>  
                -> socket_file_ops （sockfs）
                -> ext2_file_operations （ext2）
                -> ext4_file_operations （ext4）
                -> eventfd_fops 
```

而这个socket_file_ops结构体就是

```c
static const struct file_operations socket_file_ops = {
    .llseek =   no_llseek,
    .read_iter =    sock_read_iter,
    .write_iter =   sock_write_iter,
    .poll =     sock_poll,
    // ...
}   
```

所以调用write方法时，通过vfs系统，实际调用的是sock_write_iter这个方法，而这个方法直接接入网络处理的方向去了。

### 给socket绑定端口

```c
#include <sys/socket.h>
int bind(int sockfd, const struct sockaddr *addr, socklen_t addrlen);
													 Returns 0 on success, or –1 on error
```

`sockfd`参数是从先前对Socket()的调用中获得的文件描述符。

`addr`参数是指向指定此套接字要绑定到的地址的结构的指针。

内核通过sockfd找到对应的struct socket结构体

通过内部的sock->ops->bind函数把addr和socket进行绑定

### 监听socket绑定的端口

```c
#include <sys/socket.h>
int listen(int sockfd, int backlog);
 													Returns 0 on success, or –1 on error
```

此时操作系统会将普通的socket转化为监听socket

首先通过fd找到该struct socket结构体 并且调用sock->ops中的listen函数

而该listen函数做了几件事

**初始化请求队列**

```c
void reqsk_queue_alloc(struct request_sock_queue *queue)
{
	spin_lock_init(&queue->rskq_lock);

	spin_lock_init(&queue->fastopenq.lock);
	queue->fastopenq.rskq_rst_head = NULL;
	queue->fastopenq.rskq_rst_tail = NULL;
	queue->fastopenq.qlen = 0;

	queue->rskq_accept_head = NULL;  // 全连接队列
}
```

**套接字状态设置成 `TCP_LISTEN`；**

**获取到之前socket绑定的端口，如果没有设置，那么就会用个临时的端口；**

**把监听套接字加入到全局 hash 表中；**

```c
int inet_hash(struct sock *sk)
{
	int err = 0;

        // 刚才状态已经是TCP_LISTEN了
	if (sk->sk_state != TCP_CLOSE) {
		local_bh_disable();
		err = __inet_hash(sk, NULL);
		local_bh_enable();
	}

	return err;
}

int __inet_hash(struct sock *sk, struct sock *osk)
{
	struct inet_hashinfo *hashinfo = sk->sk_prot->h.hashinfo;
	struct inet_listen_hashbucket *ilb;
	int err = 0;

        // TCP状态一定是TCP_LISTEN，不满足此条件
	if (sk->sk_state != TCP_LISTEN) {
		inet_ehash_nolisten(sk, osk);
		return 0;
	}
	WARN_ON(!sk_unhashed(sk));
	ilb = &hashinfo->listening_hash[inet_sk_listen_hashfn(sk)];
	spin_lock(&ilb->lock);
	if (sk->sk_reuseport) {
		err = inet_reuseport_add_sock(sk, ilb);
		if (err)
			goto unlock;
	}
        // 加入全局hash表
	if (IS_ENABLED(CONFIG_IPV6) && sk->sk_reuseport &&
		sk->sk_family == AF_INET6)
		__sk_nulls_add_node_tail_rcu(sk, &ilb->nulls_head);
	else
		__sk_nulls_add_node_rcu(sk, &ilb->nulls_head);
	inet_hash2(hashinfo, sk);
	ilb->count++;
	sock_set_flag(sk, SOCK_RCU_FREE);
	sock_prot_inuse_add(sock_net(sk), sk->sk_prot, 1);
unlock:
	spin_unlock(&ilb->lock);

	return err;
}
```

### 与客户端的socket建立连接

```c
#include <sys/socket.h>
int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen);
									   Returns file descriptor on success, or –1 on error
```

inet_accept （ `net/ipv4/af_inet.c` ）注释：

> Accept a pending connection. The TCP layer now gives BSD semantics.

这个主要是从队列 `icsk->icsk_accept_queue` 中取请求，如果队列为空，就看 socket 是否设置了非阻塞标识，非阻塞的就直接报错 EAGAIN，否则阻塞线程等待。

所以，监听套接字的可读事件是啥？

icsk_accept_queue 队列非空。

这个队列什么时候被填充的？

```text
tcp_child_process
    -> tcp_rcv_state_process
```

这个也是底层网络协议回调往上调用的，tcp 三次握手之后，建立好的连接就在一个队列中 accept_queue ，队列非空则为只读。由 tcp 的协议栈往上调用，对应到 socket 层，还是会调用到 `sk->sk_data_ready` 。

这里还是以 epoll 管理监听套接字来举例。这个跟上面讲的数据来了一样，都是把挂接在 socket 本身上的 wait 对象进行唤醒（调用回调），这样就会到 `ep_poll_callback` ，`ep_poll_callback` 就会把监听套接字对应的 ep_item 挂到 epoll 的 ready 队列中，并且唤醒阻塞在 epoll_wait 的线程，从而实现了监听套接字的读事件的触发的流程。

关于accept()需要理解的关键点是它创建了一个新的socket，并且正是这个新socket与客户端的Connect()的对等socket相连接。accept的返回值即为该socket的fd。而此时，之前监听的socket(Sockfd)仍然保持打开状态，可用于接受进一步的连接。

所以在服务端建立连接的过程中，实际上创建了两个socket，一个负责监听来自于客户端的连接，通过bind/listen创建并使用，另一个是与客户端建立端口对端口的连接的socket，其fd由accept系统调用返回。

### 总结

1.在Linux中 socket也能像文件一样通过fd调用，并且可以open->read/write->close，这得益于vfs中的file结构体中做得处理，将read&write等操作转移

2.socket分为监听socket和普通socket，调用socket()时创建的是普通socket，在进行listen之后，转变为监听socket。监听套接字一般只监听可读事件，关注连接的建立，普通套接字走数据流，关注数据的读写事件；

3.因为socket实现了poll接口，所以socket文件可以用epoll管理socketfd，这也是之后实现多路复用的重要原理。

## 对目录的封装

在Linux中，目录以与常规文件类似的方式存储在文件系统中。

但是目录与常规文件有两个区别：

在全局的inode表中，目录被标记为不同的文件类型，

目录在本质上是一个由文件名和inode编号组成的文件

![image-20221006203230816](\os\image-20221006203230816.png)

尽管进程可以打开目录，但它不能使用Read()来读取目录的内容。若要检索目录的内容，进程必须改用本章后面讨论的系统调用和库函数。(在某些UNIX实现中，可以对目录执行Read()，但这是不可移植的。)。进程也不能使用WRITE()直接更改目录的内容；它只能使用诸如Open()(创建新文件)、link()、mkdir()、symlink()、unlink()和rmdir()等系统调用间接(即请求内核)更改内容。I-node表从1开始编号，而不是从0开始编号，因为目录条目的i-node字段中的0表示该条目未使用。I节点1用于在文件系统中记录坏块。文件系统的根目录(/)总是存储在i-node条目2中，因此内核在解析路径名时知道从哪里开始。

只有当i节点的链接计数降至0时，即当文件的所有名称都已删除时，才会删除(释放)文件的inode条目和数据块。总而言之：rm命令从目录列表中删除文件名，将相应i-node的链接计数减1，并且如果链接计数因此而降至0，则释放i-node及其引用的数据块。文件的所有名称(链接)都是等价的--没有一个名称(例如，第一个)的优先级高于任何其他名称。正如我们在上面的示例中看到的，在删除了与文件相关联的第一个名称之后，物理文件仍然存在，但随后只能通过另一个名称访问它。

### 软连接和硬连接

有时候我们希望给某个文件取个别名，那么在 Linux 中可以通过**硬链接（\*Hard Link\*）** 和**软链接（\*Symbolic Link\*）** 的方式来实现，它们都是比较特殊的文件，但是实现方式也是不相同的。

硬链接是**多个目录项中的「索引节点」指向一个文件**，也就是指向同一个 inode，但是 inode 是不可能跨越文件系统的，每个文件系统都有各自的 inode 数据结构和列表，所以**硬链接是不可用于跨文件系统的**。由于多个目录项都是指向一个 inode，那么**只有删除文件的所有硬链接以及源文件时，系统才会彻底删除该文件。**

![硬链接](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E7%A1%AC%E9%93%BE%E6%8E%A5-2.png)

软链接相当于重新创建一个文件，这个文件有**独立的 inode**，但是这个**文件的内容是另外一个文件的路径**，所以访问软链接的时候，实际上相当于访问到了另外一个文件，所以**软链接是可以跨文件系统的**，甚至**目标文件被删除了，链接文件还是在的，只不过指向的文件找不到了而已。**

![软链接](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F/%E8%BD%AF%E9%93%BE%E6%8E%A5.png)

## 4.文件I/O

## I/O buffer

为了速度和效率，当操作磁盘文件时，I/O系统调用和标准C库的I/O函数会对磁盘数据进行缓冲。这两种类型的缓冲究竟是如何实现的，它们如何影响应用程序性能？如果禁用这两种类型的缓冲的各种技术会造成什么影响，直接I/O又有什么作用？

### 内核缓存区

当进行write()和read()操作磁盘文件的时候，该系统调用并不会直接从磁盘进行访问。

write操作只会将用户态缓存区的数据copy到内核态中的缓存区，之后某个时刻，内核才会将缓存区的数据写入磁盘。也就是说系统调用和磁盘的操作并不是同步的。如果在此时，有进程尝试读取这些字节，内核会直接从缓存区提供数据。

对于read操作，内核从硬盘中读取数据后会存储在内核缓存区中，调用read时，从缓冲区提供数据，直到内核缓冲区耗尽。

这种设计的目的是使读写很快，因为它们不需要等待(慢的)磁盘操作。这种设计也很高效，因为它减少了内核必须执行的磁盘传输次数。

### 用户态缓存区

用户态缓存区是由编程语言的标准库方法提供的，以C语言来说明。

将数据缓冲到内存中以减少系统调用正是C库I/O函数(例如，fprint tf()、fscanf()、fget()、flets()、fputc()、fgetc())在操作磁盘文件时所做的事情。因此，使用stdio库使我们摆脱了缓冲数据以通过WRITE()输出或通过READ()输入的任务。

![image-20221006210345024](\os\image-20221006210345024.png)

### 直接I/O

通过禁用缓存的方式，将用户态的信息直接拷贝到内核态或者磁盘的方式。

- 缓存文件 I/O：用户空间要读写一个文件并**不直接**与磁盘交互，而是中间夹了一层缓存，即 page cache；
- 直接文件 I/O：用户空间读取的文件**直接**与磁盘交互，没有中间 page cache 层；

“直接”在这里还有另一层语义：其他所有技术中，数据至少需要在内核空间存储一份，但是在 Direct I/O 技术中，数据直接存储在用户空间中，绕过了内核。

使用DMA技术可以实现直接IO，直接IO在Netty等软件中发挥的很大的作用，将在后面部分进行说明。

## I/O模型

主要有BIO/NIO/AIO等

将在之后的篇幅介绍



## 5.fd(文件描述符)

### 普通fd

在前面的部分里，提到过fd的本质。

fd就是定义在fd_array中，用于管理file数组的索引，fd会指向一个file指针，表示一个Linux 文件，这个文件可能是普通文件，可能是socket，也可能是目录项等。fd在Linux文件系统里起到很重要的作用。这里对fd做出总结。

当打开一个文件时，内核向进程返回一个文件描述符（ `open` 系统调用得到 ），后续 `read`、`write` 这个文件时，则只需要用这个**文件描述符**fd来标识该文件，将其作为参数传入 `read`、`write` 。

**什么时候会出现多个进程的 `fd` 指向同一个 `file` 结构体？**

在子进程fork父进程时，如果父进程打开了文件，那么就会出现这种情况。

**什么时候，在同一个进程中，多个 `fd` 指向同一个 file 结构？**

在使用系统调用dup的时候，可能出现

```c
#include <unistd.h>
int dup(int oldfd);
 	                             Returns (new) file descriptor on success, or –1 on error
```

dup系统调用用于获取一个新的fd指向该file结构体

```c
#include <unistd.h>
int dup2(int oldfd, int newfd);
                                 Returns (new) file descriptor on success, or –1 on error
```

dup2可以指定获取的新的fd

进程 `open` 文件得到一个非负数 `fd`，之后针对该文件的 I/O 操作都是基于这个 `fd` ；

文件描述符 `fd` 本质上来讲就是数组索引，`fd` 等于 5 ，那对应array__fd的第 5 个元素而已，该数组是进程打开的所有文件的数组，数组元素类型为 `struct file`；

结构体 `task_struct` 对应一个抽象的进程，`files_struct` 是这个进程管理**该进程打开的文件**数组管理器。`fd` 则对应了这个数组的编号，每一个打开的文件用 `file` 结构体表示，内含当前偏移等信息；

`file` 结构体可以为进程间共享，属于系统级资源，同一个文件可能对应多个 `file` 结构体，`file` 内部有个 `inode` 指针，指向文件系统的 `inode`；

`inode` 是虚拟文件系统级别的概念，只由文件系统管理维护，不因进程改变（ `file` 是进程出发创建的，进程 `open` 同一个文件会导致多个 `file` ，指向同一个 `inode` ）

### 匿名 fd

在 `/proc/${pid}/fd/` 下面能看到 `anon_inode :` 前缀的句柄，如下：

```text
root@ubuntu:~/temp# ll /proc/5398/fd

lr-x------ 1 root root 64 Aug 24 09:39 11 -> anon_inode:inotify
lrwx------ 1 root root 64 Aug 24 09:39 4 -> anon_inode:[eventpoll]
lrwx------ 1 root root 64 Aug 24 09:39 5 -> anon_inode:[signalfd]
lrwx------ 1 root root 64 Aug 24 09:39 7 -> anon_inode:[timerfd]
lrwx------ 1 root root 64 Aug 24 09:39 9 -> anon_inode:[eventpoll]
```

如果是正常的文件句柄，一般显式的是一个路径：

```text
root@ubuntu:~/temp# ll /proc/5398/fd

lr-x------ 1 root root 64 Aug 24 09:39 10 -> /proc/5398/mountinfo
lr-x------ 1 root root 64 Aug 24 09:39 12 -> /proc/swaps
```

当然 path 只是一个浅层次的感官，因为对于 socket 句柄来说也不算有 path ，所以这个匿名其实**匿的是 inode** 。

在 Linux 里一切皆文件，你理解的常见“文件”有什么特性？是**路径**，也就是 path ，**匿名**的意思说的就是没有路径（ 在内核里面说的就是没有有效的 dentry ）。

在 Linux 的文件体系中，一个文件句柄，对应一个 file 结构体，关联一个 inode 。 `file/dentry/inode` 这三驾马车是一定要配齐的，就算是匿名的（无 path，无效 dentry），对于 file 结构体来说，一定要绑定 inode 和 dentry ，**哪怕是伪造的、不完整的 inode**。

**anon_inodefs** 就应运而生了，内核就帮你搞出来一个公共的 inode ，这就节省了所有**有这样需求的内核模块**，避免了内存的浪费，省了冗余重复的 inode 初始化代码。

匿名 fd 背后的是一个叫做 anon_inodefs 的内核文件系统（ 位于 `fs/anon_inodes.c` ），这个文件系统极其简单，整个文件系统只有一个 inode ，这个 inode 是文件系统初始化的时候创建好的。之后，所有需要一个匿名 inode 的句柄都直接跟这个 inode 关联即可。

1. anon_inodefs 是为了公共需求抽离出来的一个内核文件系统，只有一个 inode ，为了节省内存，抽象重复代码之用；
2. 匿名句柄是因为 fd 对应的 file 实例背靠着的是匿名 inode ，anon_inodefs 提供了两个功能函数，都是用来获取匿名 fd 的；
3. inode 上可以挂多个 dentry 节点，换句话说，**一个 inode 可以出现在 Linux 目录树的多个位置**；
4. dentry 对应目录树的一个节点位置，最直观的是对应 path 路径的一个位置；
5. 一个挂载路径可以挂多个文件系统实例，后面的覆盖前面的，所以光靠 dentry 无法唯一定位一个“文件”，Linux 内核才用两元组 < vfsmount, dentry > 来唯一定位一个“文件”；

### Socket fd

vfs 下有一个 sockfs 的抽象层，是把 socket 抽象成“文件” fd 的关键之一；

socket fd 能够和文件 IO 一样，使用 write/read 等系统调用，就得益于 vfs 帮你做的转接。那 `socket()` 函数调用是不是就和 open 文件 fd 的效果是一样的呀？是的，都是构建并关联各种内核结构体；



### Event fd

从内核2.6.22开始，Linux通过Eventfd()系统调用提供了额外的非标准同步机制。此系统调用创建一个Eventfd对象，该对象具有由内核维护的关联8字节无符号整数。系统调用返回引用该对象的文件描述符。

将整数写入此文件描述符会将该整数与对象的值相加。

如果对象的值为0，则从文件描述符中读取()会阻塞。如果对象具有非零值，则Read()返回该值并将其重置为0。

此外，Poll()、SELECT()或EPOLL可用于测试对象是否具有非零值；如果具有非零值，则文件描述符指示为可读。希望使用Eventfd对象进行同步的应用程序必须首先使用Eventfd()创建对象，然后调用fork()以创建继承引用该对象的文件描述符的相关进程。

```c
#include <sys/eventfd.h>
int eventfd(unsigned int initval, int flags);
																		returns eventfd
```

只有实现了 `file_operation->poll` 的调用的“文件” fd 才能被 epoll 管理。eventfd 刚好就实现了这个接口。

eventfd 是专门用来传递事件的 fd ，而 epoll 池则是专门用来管理事件的池子，它们两结合就妙了。

我们知道 epoll 监听的是**可读可写事件**。那么你想过 eventfd 的可读可写事件是啥吗？

“**可读可写事件**”这是个有趣的问题，我们可以去发散下，对比思考下 socket fd，文件 fd：

- socket fd：缓存区可以写入发送数据，那么触发可写事件，网卡中来自其他网络的数据来了，可以读，触发可读事件；
- 文件 fd：文件 fd 的可读可写事件就更有意思了，因为文件一直是可写的，所以一直都触发可写事件，文件里的数据也一直是可读的，所以一直触发可读事件。这个也是为什么类似 ext4 这种文件不实现 poll 接口的原因。**因为文件 fd 一直是可读可写的，poll 监听没有任何意义；**

eventfd 实现的是计数的功能。所以 eventfd 计数不为 0 ，那么 fd 是可读的。

由于 eventfd 一直可写（可以一直累计计数），所以一直有可写事件。

所以，这里有个什么隐藏知识点呢？

**eventfd 如果用 epoll 监听事件，那么都是监听读事件，因为监听写事件无意义。**

最简单的例子，一个消费者和多个生产者，这种就可以借助 eventfd 优雅的完成事件通知。

生产者：

是多个线程，会把请求投递到一个 list 中，然后唤醒生产者。

```text
producer:
    // 投递请求到链表
    list_add( global_list, request )
    // 唤醒消费者处理
    write(eventfd, &cnt /* 1 */ , 8)
```

消费者：

是一个线程，后台 loop 处理。使用 epoll 监听 eventfd 的可读事件，这样能做到一旦有请求入队，消费者就立马唤醒处理。

```c
consumer 
    // 添加 eventfd 到监听池
    epoll_ctl(ep, EPOLL_CTL_ADD, eventfd, &ee);

loop:
    // 等待唤醒
    epoll_wait(ep, ... );
    
    // 读取新添加到列表里的元素个数，并且进行处理；
    n = read(eventfd, ... )
    // 遍历链表处理
    for each global_list:
        // do something
```

eventfd 实现了 read/write 的接口，本质是一个计数器的实现；

eventfd 实现了 poll 接口，所以可以和 epoll 双剑合璧，实现事件的通知管理；

eventfd 可以和 libaio & epoll 一起，实现 Linux 下的纯异步 IO；

eventfd 监听可读事件才有意义；

ext4 这种文件 fd 一直可读可写，所以实现 poll 毫无意义。eventfd 一直可写，所以监听可写毫无意义；

eventfd 可以结合业务，做一个事件通知的通信机制，非常巧妙；

### Signal fd

信号（ signal ）本质是 Linux 进程间通信的一种机制，也叫**软中断信号**。既然是通信机制，那么就是传递信息用的，信号传递的信息很简单，就是一个整数，一般用于配合系统管理任务，比如进程的终结、恢复、热加载等。

信号都用整数常量表示，命名以 SIG 未前缀，比如 SIGINT（ ctrl-c 触发），SIGKILL（ kill -9 触发 ）。

**信号一般怎么产生？**

- 由内核产生，比如内存错误，除 0 等错误，内核通过信号通知到相应的进程；
- 可以由其他进程传递给目标进程，比如 kill 命令就是专门干这个事情的；

**信号处理分为两个阶段**：

- 发送阶段：内核将信号（signal）放到对应的 pending 队列中；
- 传递阶段：也叫做处理阶段，内核将信号从 pending 队列中取出来，并且进行处理，一般是调用相应的回调函数（处理方式有三种：用户定义、内核默认定义 SIG_DEL、忽略 SIG_IGN）；

了解了什么是信号（ signal ），那 signalfd 又会是什么呢？

是一个跟信号关联的**文件描述符**，能够以 io 的行为获取到系统信号，属性上来讲 signalfd 也是一个匿名 fd 类型。

```c
#include <sys/signalfd.h>

int signalfd(int fd, const sigset_t *mask, int flags);
```

返回该信号调用的fd

读一个 signalfd 的操作非常简单，主要逻辑：

1. 查看当前队列中是否有信号，有的话就取出来，填充到用户给的结构体中；
2. 如果句柄是阻塞类型的，在没有信号的时候，会切走 cpu，等到有信号的时候切回来。如果是非阻塞类型的，直接报错，返回 EAGAIN ；

**进程有信号的时候，signalfd 句柄就是可读的**。

信号也实现了poll语句，因此可以和epoll进行关联

`epoll_ctl` 注册 signalfd 的时候，调用 `signalfd_poll` ，`signalfd_poll` 会把 epoll 创建的 wait entry 挂到 `current->sighand` 上。唤醒的时候调用这个 wait 链表的回调。

所有的信号发送都会调用到 `send_signal` ，在这个里面实现了唤醒 `sighand->signalfd_wqh` 链表的操作。从而使得 epoll 感知到 signalfd 可读了（因为来信号了），使得 epoll 从 epoll_wait 出唤醒，然后调用 read 操作，把信号的相关信息从句柄中读出来。

```text
signalfd_notify
    -> wake_up （唤醒等待队列，也就是 epoll）
        -> ep_poll_callback
```

wait唤醒的时机在**信号发送**的过程。

**总结**

1. 信号能够像文件一样 read 出来，这种优雅的信号处理方式得益于 signalfd 的封装；
2. 信号是挂在在进程 task_struct 结构体上的，信号队列非空的时候 signalfd 句柄可读；
3. 和 epoll 池的配合同样还是老套路，epoll_ctl 注册的时候调用 `.poll` 接口挂载 epoll 的 wait entry 到 `sighand->signalfd_wqh` 之上，信号发送时（）唤醒 epoll ；
4. signalfd 是一种匿名 fd 类型；

### **Timer fd **

什么是 timerfd ？这是一个跟时间有关系的 fd 类型，通常叫做定时器 fd ，先去看一下 timerfd 的样子吧。奇伢在 Linux 的机器上找了一个 open 了 timerfd 的进程，如下：

```text
root@ubuntu:~# ll /proc/6997/fd/
...
lrwx------ 1 root root 64 Aug 10 14:13 3 -> anon_inode:[timerfd]

root@ubuntu:~# cat /proc/6997/fdinfo/3 
pos: 0
flags: 02
mnt_id: 11
clockid: 0
ticks: 0
settime flags: 01
it_value: (0, 969820149)
it_interval: (1, 0)
```

通过 proc fs 通过 `/proc/${pid}/fd/` 可以看到进程打开的句柄。这里看到挺关键的信息：`anon_inode:[timerfd]`，说明 **timerfd 绑定的是匿名 inode**。

通过 `/proc/${pid}/fdinfo/` 可以看到句柄的展示信息。

- clockid：时钟类型；
- ticks：超时次数；
- settime flags：这个是 `timerfd_settime` 的参数；
- it_value：定时器到期还剩多少时间；
- it_interval：超时间隔；

timerfd 这个名字拆开来看，就是 timer fd，所谓定时器 fd 类型，那么它的可读可写事件一定是跟时间有关系。timerfd 被 new 出来之后 （ `timerfd_create` ），可以设置超时时间（ `timerfd_setting` ），超时之后，该句柄可读，读出来的是**超时的次数**。

文件句柄，网络句柄都是可以 `read`/`write`/`close` 的，timerfd 可以做什么？

timerfd 可以 `read`，`poll`，`close` ，这个从内核实现的接口可知：

```text
// fs/timerfd.c
static const struct file_operations timerfd_fops = { 
    .release    = timerfd_release,
    .poll       = timerfd_poll,
    .read       = timerfd_read,
    .show_fdinfo    = timerfd_show,
    // ...
};
```

定时器句柄 timerfd 的实现就内聚在 `fs/timerfd.c` 一个文件。

还记得上面 `cat /proc/${pid}/fdinfo/` 里面展示的信息吗？就是 `timerfd_show` 负责展示的。

timerfd 常用来做定时器的使用，设置超时时间之后，每隔一段时间 timerfd 就是可读的。

1. procfs 是内核提供给用户探视进程细节的接口，非常重要，`/proc/${pid}/fd/` 下有所有打开的句柄， `/proc/${pid}/fdinfo/` 下能看到句柄的详细信息，挂钩的是 `.show_fdinfo` 回调实现；
2. timerfd 的核心结构是 `timerfd_ctx` ，通过 fd 先找到 file 结构体，它就藏在 `file->private_data` 这里；
3. timerfd 是直接复用的 hrtimer 或者 alarm 类型的定时器，timerfd 本身只是对**定时器**做的**文件接口**的封装；
4. 内核提供了一套名叫 **anon_inodefs 的匿名文件系统**。对于想实现文件接口，但又不想实现完整的 inode 功能的句柄类型是福音，timerfd ，eventfd，eventpoll 等类型的 fd 都得益于此；
5. timerfd 句柄 `timerfd_create` 创建的时候准备好等待队列 `ctx->wqh` ，`timerfd_settime` 设置定时回调 `timerfd_tmrproc`，`epoll_ctl` 注册句柄的时候把 `ep_poll_back` 装进 wait 对象并挂到 `ctx->wqh` 链表之上。定时器超时的时候，由 timerfd_tmrproc 遍历 `ctx->wqh` ，调用 `ep_poll_callback` 从而完成事件触发；

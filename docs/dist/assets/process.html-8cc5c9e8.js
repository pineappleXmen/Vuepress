import{_ as n,V as i,W as e,a0 as s}from"./framework-3845b112.js";const t="/os/image-20220901093630759.png",l={},a=s(`<h2 id="_1-进程基础概念" tabindex="-1"><a class="header-anchor" href="#_1-进程基础概念" aria-hidden="true">#</a> 1. 进程基础概念</h2><p>**最简单地说，进程是正在执行的程序的一个实例。**程序执行时，内核将程序的代码加载到虚拟内存中，为程序变量分配空间，并建立内核簿记数据结构来记录各种信息（如进程ID、终止状态、用户ID和组ID） ) 关于过程。从内核的角度来看，进程是内核必须共享计算机各种资源的实体。对于有限的资源，例如内存，内核最初会为进程分配一些资源，并在进程的生命周期内根据进程的需求和对该资源的整体系统需求调整此分配。当进程终止时，所有这些资源都会被释放以供其他进程重用。其他资源，例如 CPU 和网络带宽，是可再生的，但必须在所有进程之间公平共享。</p><p><strong>进程的创建</strong></p><p>进程可以使用 <strong>fork() 系统调用创建新进程</strong>。调用 fork() 的进程称为父进程，新进程称为子进程。内核通过复制父进程来创建子进程。子节点继承父节点的数据、堆栈和堆段的副本，然后它可以独立于父节点的副本进行修改。 （放置在标记为只读的内存中的程序文本由两个进程共享。）</p><p>子进程要么在与父进程相同的代码中执行一组不同的函数，要么经常使用 execve() 系统调用来加载和执行一个全新的程序。 <strong>execve() 调用会破坏现有的文本、数据、堆栈和堆段，并根据新程序的代码将它们替换为新段</strong>。几个相关的 C 库函数位于 execve() 之上，每个函数都为相同的功能提供略有不同的接口。所有这些函数的名称都以字符串 exec 开头，如果区别无关紧要，我们将使用符号 exec() 来泛指这些函数。但是请注意，没有名称为 exec() 的实际函数。通常，我们将使用动词 to exec 来描述执行的操作 execve() 以及在其之上分层的库函数。</p><p><strong>进程ID和父进程ID</strong></p><p>每个进程都有一个唯一的整数进程标识符 (PID)。每个进程也有一个父进程标识符（PPID）属性，它标识请求内核创建这个进程的进程。</p><p><strong>进程终止和终止状态</strong></p><p>进程可以通过以下两种方式之一终止：通过使用 _exit() 系统调用（或相关的 exit() 库函数）请求自己的终止，或通过传递信号而终止。在任何一种情况下，进程都会产生一个终止状态，这是一个小的非负整数值，可供父进程使用 wait() 系统调用进行检查。在调用 _exit() 的情况下，进程显式指定它自己的终止状态。如果进程被信号杀死，则根据导致进程死亡的信号类型设置终止状态。 （有时，我们将传递给 _exit() 的参数称为进程的退出状态，与终止状态不同，终止状态是传递给 _exit() 的值或终止进程的信号的指示.) 按照惯例，终止状态 0 表示进程成功，非零状态表示发生了一些错误。大多数 shell 通过名为 $? 的 shell 变量提供最后执行程序的终止状态。</p><p>**init **进程</p><p>启动系统时，内核会创建一个名为 <strong>init</strong> 的特殊进程，它是“所有进程的父进程”，它源自程序文件 /sbin/init。系统上的所有进程都是由 init 或其后代之一创建（使用 fork()）。 init 进程的进程 ID 始终为 1，并以超级用户权限运行。 <strong>init 进程不能被杀死</strong>（即使是超级用户也不能），它只有在系统关闭时才会终止。 init 的主要任务是创建和监视运行系统所需的一系列进程。</p><p><strong>守护进程</strong></p><p>守护进程是一个特殊用途的进程，它由系统以与其他进程相同的方式创建和处理，但具有以下特点：</p><ul><li>它是长寿命的。守护进程通常在系统启动时启动，并一直存在直到系统关闭。</li><li>它在后台运行，没有可以读取输入或写入输出的控制终端。</li></ul><p>守护进程的示例包括 syslogd，它在系统日志中记录消息，以及 httpd，它通过超文本传输协议 (HTTP) 为网页提供服务。</p><p><strong>环境列表</strong></p><p>每个进程都有一个环境列表，它是一组环境变量，维护在进程的用户空间内存中。此列表的每个元素都包含一个名称和一个关联的值。当通过 fork() 创建一个新进程时，它会继承其父环境的副本。</p><p>因此，环境为父进程提供了一种将信息传递给子进程的机制。当一个进程使用 exec() 替换它正在运行的程序时，新程序要么继承旧程序使用的环境，要么接收指定为 exec() 调用一部分的新环境。</p><p>环境变量是在大多数 shell 中使用 export 命令（或 C shell 中的 setenv 命令）创建的，如下例所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">MYVAR</span><span class="token operator">=</span><span class="token string">&#39;Hello world&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入文本始终为粗体。有时，我们在日志中以斜体文本包含注释，添加有关输入的命令或产生的输出的注释。 C 程序可以使用外部变量 (char **environ) 访问环境，并且各种库函数允许进程检索和修改其环境中的值。环境变量用于多种目的。例如，shell 定义并使用了一系列变量，这些变量可以被从 shell 执行的脚本和程序访问。其中包括变量 HOME，它指定了用户登录目录的路径名，以及变量 PATH，它指定了 shell 在查找与用户输入的命令相对应的程序时应该搜索的目录列表。</p><p><strong>资源限制</strong></p><p>每个进程都会消耗资源，例如打开的文件、内存和 CPU 时间。使用 setrlimit() 系统调用，进程可以建立其各种资源消耗的上限。每个这样的资源限制都有两个相关的值：</p><p>软限制，它限制进程可能消耗的资源量；和一个硬限制，它是软限制可以调整到的值的上限。</p><p>非特权进程可以将其对特定资源的软限制更改为从零到相应硬限制范围内的任何值，但只能降低其硬限制。当使用 fork() 创建新进程时，它会继承其父级资源限制设置的副本。可以使用 ulimit 命令（C shell 中的限制）调整 shell 的资源限制。这些限制设置由 shell 创建以执行命令的子进程继承。</p><p><strong>程序和进程的区别</strong></p><p>程序是包含一系列信息的文件，这些信息描述了如何在运行时构建进程。</p><p>一个程序可以用来构建许多进程，相反，许多进程可能运行同一个程序。我们可以将本节开头给出的进程定义改写如下：**进程是一个抽象实体，由内核定义，为执行程序分配系统资源。从内核的角度来看，一个进程由包含程序代码和该代码使用的变量的用户空间内存，以及一系列维护进程状态信息的内核数据结构组成。**内核数据结构中记录的信息包括与进程相关的各种标识符号（ID）、虚拟内存表、打开文件描述符表、与信号传递和处理有关的信息、进程资源使用和限制、当前工作目录、和许多其他信息。</p><p><strong>PID &amp; PPID</strong></p><p>每个进程都有一个进程 ID (PID)，一个唯一标识系统上进程的正整数。进程 ID 由各种系统调用使用和返回。例如，kill() 系统调用（第 20.5 节）允许调用者向具有特定进程 ID 的进程发送信号。如果我们需要构建一个进程唯一的标识符，进程 ID 也很有用。一个常见的例子是使用进程 ID 作为进程唯一文件名的一部分。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token class-name">pid_t</span> <span class="token function">getpid</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 										Always successfully returns process ID of caller
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Linux 内核将进程 ID 限制为小于或等于 32,767。创建新进程时，会为其分配下一个顺序可用的进程 ID。每次达到 32,767 的限制时，内核都会重置其进程 ID 计数器，以便从低整数值开始分配进程 ID。</p><p>一旦达到 32,767，进程 ID 计数器将重置为 300，而不是 1。这样做是因为许多低编号的进程 ID 被系统进程和守护程序永久使用，因此会浪费时间寻找未使用的进程此范围内的 ID。</p><h2 id="_2-进程的内存结构" tabindex="-1"><a class="header-anchor" href="#_2-进程的内存结构" aria-hidden="true">#</a> 2. 进程的内存结构</h2><p><strong>进程的内存分配</strong></p><p>一个进程在逻辑上分为以下部分，称为段（segment）：</p><ul><li>文本：程序的指令。</li><li>数据：程序使用的静态变量。</li><li>堆：程序可以从中动态分配额外内存的区域。</li><li>栈：随着函数的调用和返回而增长和收缩的一块内存，用于为局部变量和函数调用链接信息分配存储空间。</li></ul><p>文本段(text)包含进程运行的程序的机器语言指令。文本段是只读的，这样进程就不会通过错误的指针值意外修改自己的指令。由于许多进程可能正在运行同一个程序，因此文本段是可共享的，因此程序代码的单个副本可以映射到所有进程的虚拟地址空间。</p><p>初始化数据段包含显式初始化的全局变量和静态变量。这些变量的值是在程序加载到内存时从可执行文件中读取的。</p><p>未初始化的数据段包含未显式初始化的全局变量和静态变量。在启动程序之前，系统会将该段中的所有内存初始化为 0。由于历史原因，这通常被称为 bss 段，这个名称源自一个旧的汇编程序助记符，意思是“由符号开始的块”。将已初始化的全局变量和静态变量与未初始化的变量分开放置的主要原因是，当程序存储在磁盘上时，无需为未初始化的数据分配空间。相反，可执行文件只需要记录未初始化数据段所需的位置和大小，该空间由程序加载器在运行时分配。</p><p>栈是包含栈帧的动态增长和收缩段。为每个当前调用的函数分配一个堆栈帧。框架存储函数的局部变量（所谓的自动变量）、参数和返回值。</p><p>堆是可以在运行时动态分配内存（用于变量）的区域。堆的顶端称为程序中断。</p><p>在Linux中，进程的控制块是通过<code>task_struct</code>来表示的，通过该结构体可以表示一个进程的所有信息。</p><p>在task_struct中有五大结构体，分别为</p><p><strong>file_struct</strong>:打开文件管理系统</p><p><strong>fs_struct</strong>：文件系统</p><p><strong>sighand_struct</strong>：信号处理系统</p><p><strong>signal_struct</strong>：信号系统</p><p><strong>mm_struct</strong>：内存管理系统</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token punctuation">{</span>
<span class="token comment">/* Filesystem information: */</span> 文件系统信息
	<span class="token keyword">struct</span> <span class="token class-name">fs_struct</span>		<span class="token operator">*</span>fs<span class="token punctuation">;</span>

	<span class="token comment">/* Open file information: */</span> 打开文件的管理器
	<span class="token keyword">struct</span> <span class="token class-name">file_struct</span>		<span class="token operator">*</span>files<span class="token punctuation">;</span>
    
    <span class="token comment">/* Signal handlers: */</span> 信号处理单元
	<span class="token keyword">struct</span> <span class="token class-name">signal_struct</span>		<span class="token operator">*</span>signal<span class="token punctuation">;</span>  <span class="token comment">//指向进程的信号描述符</span>
	<span class="token keyword">struct</span> <span class="token class-name">sighand_struct</span> __rcu		<span class="token operator">*</span>sighand<span class="token punctuation">;</span>
    
    <span class="token keyword">struct</span> <span class="token class-name">mm_struct</span>		<span class="token operator">*</span>mm<span class="token punctuation">;</span>   <span class="token comment">//用户态内存描述符</span>
	<span class="token keyword">struct</span> <span class="token class-name">mm_struct</span>		<span class="token operator">*</span>active_mm<span class="token punctuation">;</span>  <span class="token comment">//进程运行时指向的内存描述符</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此以外，task_struct还包括其他内容</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>任务ID
pid_t pid;
pit_t tpid;
struct task_struct *group_leader;

父子关系
struct task_struct __rcu *real_parent;
struct task_struct __rcu *parent;
struct list_head children;
struct list_head sibling;

任务状态
unsigned int	__state;
int 	exit_state;
unsigned int flags;

权限控制
const struct cred __rcu *realcred;
const struct cred __rcu *cred;

运行统计
u64 utime;
u64 stime;
unsigned long nvcsw;
unsigned long nivcsw;
u64 start_time;
u64 real_start_time;

调度系统
int on_rq
int prio;
int static_prio;
int normal_prio;
const struct sched_class *sched_class;
struct sched_entity se;
unsigned int policy;

信号处理
struct signal_struct *signal;
struct sighand__struct *sighand;
struct sigpending pending;

内存管理
struct mm_struct *mm;
struct mm_struct *active_mm;

文件系统
struct fs_struct		*fs;
struct file_struct		*files;

内核栈
struct thread_info thread_info;
void *stack;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-进程的创建" tabindex="-1"><a class="header-anchor" href="#_3-进程的创建" aria-hidden="true">#</a> 3. 进程的创建</h2><p>进程的创建的主题主要是四种系统调用 <strong>fork()</strong>、<strong>exit()</strong>、<strong>wait()</strong> 和 <strong>execve()</strong>。这些系统调用中的每一个都有变体，我们也会看看。现在，我们提供这四个系统调用的概述以及它们通常如何一起使用。</p><ul><li><p>fork() 系统调用允许一个进程，即父进程，创建一个新进程，即子进程。这是通过使新的子进程（几乎）完全复制父进程来完成的：子进程获得父进程的堆栈、数据、堆和文本段的副本（第 6.3 节）。术语 fork 源于这样一个事实，即我们可以将父进程设想为分裂以产生其自身的两个副本。</p></li><li><p>exit(status) 库函数终止进程，使进程使用的所有资源（内存、打开的文件描述符等）可用于内核后续重新分配。 status 参数是一个整数，用于确定进程的终止状态。使用 wait() 系统调用，父级可以检索此状态。 514 Chapter 24</p></li><li><p>exit() 库函数位于_exit() 系统调用之上。在第 25 章中，我们解释了这两个接口之间的区别。同时，我们只需要注意，在 fork() 之后，通常只有父子节点中的一个通过调用 exit() 来终止；另一个进程应该使用 _exit() 终止。</p></li><li><p>wait(&amp;status) 系统调用有两个目的。首先，如果该进程的子进程尚未通过调用 exit() 终止，则 wait() 暂停该进程的执行，直到其中一个子进程终止。其次，子进程的终止状态在 wait() 的 status 参数中返回。</p></li><li><p>execve(pathname, argv, envp) 系统调用将新程序（路径名、参数列表 argv 和环境列表 envp）加载到进程的内存中。现有程序文本被丢弃，堆栈、数据和堆段为新程序重新创建。此操作通常称为执行新程序。稍后，我们将看到几个库函数在 execve() 之上分层，每个库函数都提供了编程接口的有用变化。在我们不关心这些接口变化的地方，我们遵循将这些调用统称为 exec() 的通用约定，但请注意，没有使用此名称的系统调用或库函数。</p></li></ul><figure><img src="`+t+`" alt="image-20220901093630759" tabindex="0" loading="lazy"><figcaption>image-20220901093630759</figcaption></figure><p><strong>创建一个新进程：fork()</strong></p><p>在许多应用程序中，创建多个进程可能是划分任务的有用方式。例如，网络服务器进程可能会监听传入的客户端请求并创建一个新的子进程来处理每个请求；同时，服务器进程继续侦听进一步的客户端连接。以这种方式划分任务通常会使应用程序设计更简单。它还允许更大的并发性（即可以同时处理更多的任务或请求）。 <strong>fork() 系统调用创建了一个新进程，即子进程，它几乎是调用进程（父进程）的复制品。</strong></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token class-name">pid_t</span> <span class="token function">fork</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					In parent<span class="token operator">:</span> returns process ID of child on success<span class="token punctuation">,</span> or –<span class="token number">1</span> on error<span class="token punctuation">;</span>
					in successfully created child<span class="token operator">:</span> always returns <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行该系统调用的时候，调用链为<strong>fork -&gt; sys_call_table -&gt; sys_fork -&gt; _do_fork-&gt;copy_process</strong></p><p>通过上方的调用链，在执行copy_process中，会将刚刚提到的五大核心的结构全部copy一份，从而fork出一个新的进程，这也会造成一些特性。</p><p><strong>父子之间文件共享</strong></p><p>当执行 fork() 时，因为copy了父进程的fs struct和打开文件的file struct，子进程接收到所有父文件描述符的副本。这些副本是以 dup() 的方式进行的，这意味着<strong>父子节点中对应的描述符引用了相同的打开文件描述</strong>。打开文件描述包含当前文件偏移量（由 read()、write() 和 lseek() 修改）和打开文件状态标志（由 open() 设置并由 fcntl 更改） () F_SETFL 操作)。因此，打开文件的这些属性在父级和子级之间共享。</p><p>在父进程和子进程之间共享打开的文件属性通常很有用。例如，如果父进程和子进程都在写入文件，则共享文件偏移量可确保两个进程不会覆盖彼此的输出。但是，它不会阻止两个过程的输出随机混合。如果不希望这样做，则需要某种形式的进程同步。例如，父母可以使用 wait() 系统调用来暂停，直到孩子退出。</p><p><strong>子进程只包含父进程中正在运行的线程</strong></p><p>当多线程进程调用fork()时，只有正在被调用的线程被复制到子进程中。(子线程中的线程ID与父线程中调用fork()的线程ID相同。)所有其他线程在子线程中消失;不会为这些线程执行特定于线程的数据析构函数或清理处理程序。</p><p>尽管在子线程中只复制调用线程，<strong>但全局变量的状态以及所有pthread对象(如互斥和条件变量)的状态都保留在子线程中</strong>。(这是因为这些Pthreads对象是在父进程的内存中分配的，子进程获得了该内存的副本。)这可能会导致一些棘手的情况。例如，假设另一个线程在fork()时锁定了一个互斥锁，并且正在更新全局数据结构。在这种情况下，子进程中的线程将无法解锁互斥锁(因为它不是互斥锁的所有者)，如果它试图获取互斥锁，则会阻塞。此外，全局数据结构的子副本可能处于不一致的状态，因为更新它的线程在更新过程中中途消失了。</p><p>由于没有调用线程特定数据的析构函数和清理处理程序，<strong>所以多线程程序中的fork()可能会导致子程序中的内存泄漏</strong>。此外，由其他线程创建的特定于线程的数据项可能对新子线程中的线程不可访问，因为它没有指向这些项的指针。</p><p>由于这些问题，通常的建议是，在多线程进程中使用fork()的唯一方法应该是紧跟在立即exec()后面的方法。**exec()会导致子进程中的所有Pthreads对象消失，因为新程序会覆盖该进程的内存。**对于必须使用fork()而后面没有exec()的程序，Pthreads API提供了一种定义fork处理程序的机制。使用以下形式的pthread_atfork()调用来建立Fork处理程序:</p><p><strong>内存上语义的fork()</strong></p><p>从概念上讲，我们可以将 fork() 视为创建父进程的文本、数据、堆和堆栈段的副本。 （事实上，在一些早期的 UNIX 实现中，确实执行了这种复制：通过将父进程的内存复制到交换空间来创建一个新的进程映像，并将换出的映像作为子进程，而父进程保留自己的内存。）然而，实际上将父虚拟内存页面的简单副本复制到新的子进程中会很浪费，原因有很多——其中一个原因是 fork() 通常紧跟在立即 exec() 之后，它将进程的文本替换为新程序并重新初始化进程的数据、堆和堆栈段。大多数现代 UNIX 实现，包括 Linux，使用两种技术来避免这种浪费的复制：</p><ul><li>内核将每个进程的文本段标记为只读，这样一个进程就不能修改自己的代码。这意味着<strong>父和子可以共享相同的文本段。</strong> fork() 系统调用通过构建一组每个进程的页表条目来为子进程创建一个文本段，这些页表条目引用父进程已经使用的相同虚拟内存页框。</li><li><strong>对于父进程的数据、堆和堆栈段中的页面，内核采用了一种称为写时复制的技术。</strong> 最初，内核进行设置，以便这些段的页表条目引用相同的物理内存页面作为父页面中的相应页表条目，并且页面本身被标记为只读。在 fork() 之后，内核捕获父或子修改这些页面之一的任何尝试，并复制即将修改的页面。这个新的页面副本被分配给出错进程，并且适当地调整子进程的相应页表条目。从此时起，父子进程都可以修改他们的私有页面副本，而其他进程不会看到这些更改。</li></ul><p><strong>fork()之后的竞态条件</strong></p><p><strong>在 fork() 之后，不确定哪个进程（父进程或子进程）接下来可以访问 CPU。</strong> （在多处理器系统上，它们可能同时访问 CPU。）隐式或显式依赖特定执行序列以获得正确结果的应用程序由于竞争条件而容易失败，我们在第 5.1 节中对此进行了描述.此类错误很难找到，<strong>因为它们的发生取决于内核根据系统负载做出的调度决策。</strong></p><p>根据这些结果，我们可以推测，在 Linux 2.2.19 上，执行总是在 fork() 之后继续执行父进程。孩子偶尔会先打印消息的原因是，在 0.03% 的情况下，父母的 CPU 时间片在它有时间打印消息之前就用完了。换句话说，如果这个例子代表我们依赖父级总是在 fork() 之后首先被调度的情况，那么事情通常会顺利进行，但每 3000 次中就有一次会出错。当然，如果应用程序期望父母应该能够在孩子被安排之前完成更大的工作，那么出错的可能性会更大。尝试在复杂程序中调试此类错误可能很困难。</p><p>从前面的讨论中，很明显我们不能在 fork() 之后假设父子节点的特定执行顺序。如果我们需要保证一个特定的顺序，我们必须使用某种同步技术。我们将在后面的章节中介绍几种同步技术，包括信号量、文件锁以及使用管道在进程之间发送消息。我们接下来描述的另一种方法是使用信号。</p><p><strong>通过与信号同步来避免竞争条件</strong></p><p>在fork()之后，如果任何一个进程需要等待另一个完成一个动作，那么活动进程可以在完成动作后发送一个信号；另一个进程等待信号。清单 24-6 演示了这种技术。在这个程序中，我们假设必须等待孩子执行某些动作的是父母。如果孩子必须等待父母，则可以交换父母和孩子中与信号相关的调用。父母和孩子甚至可以多次相互发出信号以协调他们的行动，尽管在实践中，<strong>这种协调更有可能使用信号量、文件锁或消息传递来完成。</strong></p><h2 id="_4-运行新进程" tabindex="-1"><a class="header-anchor" href="#_4-运行新进程" aria-hidden="true">#</a> 4. 运行新进程</h2><p>execve() 系统调用将新程序加载到进程的内存中。在此操作期间，**旧程序被丢弃，进程的堆栈、数据和堆被新程序的替换。**在执行各种 C 库运行时启动代码和程序初始化代码（例如，C++ 静态构造函数或使用第 42.4 节中描述的 gcc 构造函数属性声明的 C 函数）后，新程序开始执行其 main() 函数。 execve() 最常用于由 fork() 生成的子进程中，尽管它也偶尔用于没有前面 fork() 的应用程序中。名称以 exec 开头的各种库函数都位于 execve() 系统调用之上。这些功能中的每一个都为相同的功能提供不同的接口。通过任何这些调用加载新程序通常称为 exec 操作，或简称为 exec()。我们从 execve() 的描述开始，然后描述库函数。</p><p><strong>使用 execve()，一个进程可以用一个新程序替换它当前正在运行的程序。</strong> execve() 调用的参数允许为新程序指定参数列表 (argv) 和环境列表。各种类似命名的库函数分层在 execve() 之上，并为相同的功能提供不同的接口。所有 exec() 函数都可用于加载二进制可执行文件或执行解释器脚本。当一个进程执行一个脚本时，该脚本的解释器程序将替换该进程当前正在执行的程序。脚本的解释器通常由脚本中指定解释器路径名的初始行（以字符 #! 开头）标识。如果不存在这样的行，则脚本只能通过 execlp() 或 execvp() 执行，并且这些函数将 shell 作为脚本解释器执行。我们展示了如何组合 fork()、exec()、exit() 和 wait() 来实现 system() 函数，该函数可用于执行任意 shell 命令。</p><h2 id="_5-进程终止" tabindex="-1"><a class="header-anchor" href="#_5-进程终止" aria-hidden="true">#</a> 5. 进程终止</h2><p>一个进程可以以两种一般方式终止。<strong>其中之一是异常终止</strong>，由传递默认操作是终止进程（有或没有核心转储）的信号引起，如第 20.1 节所述。或者**，进程可以正常终止，使用 _exit() 系统调用。**</p><p>在进程正常和异常终止期间，会发生以下操作：</p><ul><li>打开文件描述符、目录流（第 18.8 节）、消息目录描述符（参见 catopen(3) 和 catgets(3) 手册页）和转换描述符（参见 iconv_open(3) 手册页）被关闭。</li><li>作为关闭文件描述符的结果，该进程持有的任何文件锁（第 55 章）都会被释放。</li><li>任何附加的 System V 共享内存段都被分离，每个段对应的 shm_nattch 计数器减一。 （请参阅第 48.8 节。）</li><li>对于进程已为其设置 semadj 值的每个 System V 信号量，该 semadj 值被添加到信号量值中。 （请参阅第 47.8 节。）</li><li>如果这是控制终端的控制进程，则向控制终端的前台进程组中的每个进程发送 SIGHUP 信号，并且终端与会话解除关联。我们将在第 34.6 节中进一步考虑这一点。</li><li>在调用进程中打开的任何 POSIX 命名信号量都将关闭，就像调用了 sem_close() 一样。</li><li>在调用进程中打开的任何 POSIX 消息队列都将关闭，就像调用了 mq_close() 一样。</li><li>如果由于该进程退出，一个进程组成为孤立的并且该组中有任何停止的进程，则该组中的所有进程都将收到一个 SIGHUP 信号，然后是一个 SIGCONT 信号。我们将在第 34.7.4 节中进一步考虑这一点。</li><li>此进程使用 mlock() 或 mlockall()（第 50.2 节）建立的任何内存锁都将被删除。</li><li>此进程使用 mmap() 建立的任何内存映射都被终止映射。</li></ul><p><strong>退出处理</strong></p><p>有时，应用程序需要在进程终止时自动执行一些操作。考虑一个应用程序库的示例，如果在进程的生命周期中使用该应用程序库，则需要在进程退出时自动执行一些清理操作。由于库无法控制进程退出的时间和方式，并且不能强制主程序在退出之前调用库特定的清理函数，因此无法保证会发生清理。在这种情况下，一种方法是使用退出处理程序（旧的 System V 手册使用术语程序终止例程）。</p><p>退出处理程序是程序员提供的函数，它在进程生命周期的某个时间点注册，然后在正常进程终止期间通过 exit() 自动调用。如果程序直接调用 _exit() 或进程被信号异常终止，则不会调用退出处理程序。</p><p>进程可以异常终止或正常终止。在传递某些信号时会发生异常终止，其中一些信号还会导致进程生成核心转储文件。正常终止是通过调用 _exit() 或更常见的 exit() 来完成的，它位于 _exit() 之上。 _exit() 和 exit() 都采用整数参数，其最低有效 8 位定义进程的终止状态。按照惯例，状态为 0 表示终止成功，非零状态表示终止不成功。作为正常和异常进程终止的一部分，内核执行各种清理步骤。通过调用 exit() 正常终止进程还会导致使用 atexit() 和 on_exit() 注册的退出处理程序被调用（以注册的相反顺序），并导致 stdio 缓冲区被刷新。</p><h2 id="_6-监控子进程" tabindex="-1"><a class="header-anchor" href="#_6-监控子进程" aria-hidden="true">#</a> 6. 监控子进程</h2><p>wait() 系统调用执行以下操作：</p><ol><li>如果调用进程的（先前未等待的）子进程尚未终止，则调用阻塞，直到其中一个子进程终止。如果孩子在调用时已经终止，则 wait() 立即返回。</li><li>如果status 不为NULL，则以status 指向的整数形式返回有关孩子如何终止的信息。我们在第 26.1.3 节中描述了 status 中返回的信息。</li><li>内核将进程 CPU 时间（第 10.7 节）和资源使用统计（第 36.1 节）添加到该父进程的所有子进程的运行总数中。</li><li>作为其函数结果，wait() 返回已终止子进程的进程 ID。</li></ol><h2 id="_7-孤儿进程和僵尸进程" tabindex="-1"><a class="header-anchor" href="#_7-孤儿进程和僵尸进程" aria-hidden="true">#</a> 7. <strong>孤儿进程和僵尸进程</strong></h2><p>父进程和子进程的生命周期通常不相同——父进程比子进程寿命长，反之亦然。这提出了两个问题：</p><p>谁成为孤儿的父母？**孤儿被 init 收养，init 是所有进程的祖先，进程 ID 为 1。换句话说，在一个子进程的父进程终止后，调用 getppid() 将返回值 1。**这可以用作确定孩子的真正父母是否还活着（假设孩子是由除 init 以外的进程创建的）。</p><p>在其父级有机会执行 wait() 之前终止的子级会发生什么？这里的要点是，尽管子进程已经完成了它的工作，但仍然应该允许父进程在稍后的某个时间执行 wait() 以确定子进程是如何终止的。**内核通过将孩子变成僵尸来处理这种情况。这意味着子进程持有的大部分资源都被释放回系统以供其他进程重用。**进程中唯一剩下的部分是内核进程表中的一个条目，记录（除其他外）子进程 ID、终止状态和资源使用统计信息（第 36.1 节）。</p><p>关于僵尸，UNIX 系统模仿电影——僵尸进程不能被信号杀死，甚至（银弹）SIGKILL 也不能。这确保了父级总是可以最终执行 wait()。当父进程确实执行了 wait() 时，内核会移除僵尸，因为不再需要关于子进程的最后剩余信息。另一方面，如果父进程没有执行wait()就终止了，那么init进程会采用子进程并自动执行wait()，从而将僵尸进程从系统中移除。如果父进程创建了一个子进程，但未能执行 wait()，则僵尸子进程的条目将无限期地保留在内核的进程表中。如果创建了大量这样的僵尸子进程，它们最终会填满内核进程表，从而阻止新进程的创建。由于僵尸无法被信号杀死，因此将它们从系统中移除的唯一方法是杀死它们的父级（或等待它退出），此时僵尸会被 init 采用并等待，因此从系统中删除。</p><p>这些语义对于创建大量子进程的长期父进程（例如网络服务器和 shell）的设计具有重要意义。换句话说，在这样的应用程序中，父进程应该执行 wait() 调用，以确保死去的子进程总是从系统中移除，而不是成为长寿的僵尸。父进程可以同步或异步执行这样的 wait() 调用，以响应 SIGCHLD 信号的传递，如第 26.3.1 节所述。示例 26-4 演示了僵尸的创建，并且僵尸不能被 SIGKILL 杀死。当我们运行这个程序时，我们会看到以下输出：</p><p><strong>SIGCHLD 信号</strong></p><p>子进程的终止是异步发生的事件。父母无法预测其中一个孩子何时会终止。 （即使父级向子级发送 SIGKILL 信号，终止的确切时间仍然取决于子级下一次计划使用 CPU 的时间。）我们已经看到父级应该使用 wait() （或类似的) 以防止僵尸子节点的积累，并研究了两种可以做到这一点的方法：如果孩子尚未终止。</p><p>父母可以通过调用指定 WNOHANG 标志的 waitpid() 定期对死去的孩子执行非阻塞检查（轮询）。这两种方法都可能不方便。</p><p>一方面，我们可能不希望父进程被阻塞等待子进程终止。另一方面，进行重复的非阻塞 waitpid() 调用会浪费 CPU 时间并增加应用程序设计的复杂性。为了解决这些问题，我们可以为 SIGCHLD 信号使用处理程序。</p><p>每当其子进程之一终止时，SIGCHLD 信号就会发送到父进程。默认情况下，此信号被忽略，但我们可以通过安装信号处理程序来捕获它。在信号处理程序中，我们可以使用 wait() （或类似方法）来获取僵尸子节点。但是，在这种方法中需要考虑一个微妙之处。在第 20.10 节和第 20.12 节中，我们观察到当调用信号处理程序时，导致其调用的信号被暂时阻塞（除非指定了 sigaction() SA_NODEFER 标志），并且标准信号（其中 SIGCHLD 是其中之一）是没有排队。因此，如果第二个和第三个孩子在一个已经终止的孩子执行 SIGCHLD 处理程序时快速连续终止，那么尽管 SIGCHLD 生成两次，但它只在父队列中排队一次。因此，如果父级的 SIGCHLD 处理程序每次调用时只调用一次 wait()，则处理程序可能无法获取一些僵尸子级。解决方案是在 SIGCHLD 处理程序内部循环，重复调用带有 WNOHANG 标志的 waitpid() 直到没有更多死去的孩子可以收割。通常，SIGCHLD 处理程序的主体只包含以下代码，它会在不检查其状态的情况下获取任何死去的孩子</p><p>使用 wait() 和 waitpid()（以及其他相关函数），父进程可以获得其终止和停止子进程的状态。此状态指示子进程是否正常终止（退出状态指示成功或失败）、异常终止、被信号停止或被 SIGCONT 信号恢复。如果子进程的父进程终止，则子进程成为孤儿，并被进程 ID 为 1 的 init 进程收养。**当子进程终止时，它成为僵尸，只有在父进程调用 wait() 时才会从系统中移除（或类似的）来检索孩子的状态。**长时间运行的程序应该被设计成总是获取他们创建的子进程的状态，因为处于僵尸状态的进程无法被内核进程杀死，并且未获得的僵尸最终会阻塞表。一种常见的获取死子进程的方法是为 SIGCHLD 信号建立一个处理程序。每当它的一个子进程终止时，或者当一个子进程被信号停止时，这个信号就会被传递给父进程。或者，但不太便携，进程可以选择将 SIGCHLD 的处置设置为 SIG_IGN，在这种情况下，终止子进程的状态会立即被丢弃（因此以后不能被父进程检索），而子进程不会不会变成僵尸。</p><h2 id="_8-进程组" tabindex="-1"><a class="header-anchor" href="#_8-进程组" aria-hidden="true">#</a> 8. 进程组</h2><p>进程组和会话在进程之间形成了两级层次关系：进程组是相关进程的集合，会话是相关进程组的集合。在本章的过程中，每种情况下相关术语的含义将变得清晰。进程组和会话是为支持 shell 作业控制而定义的抽象，它允许交互式用户在前台或后台运行命令。术语作业通常与术语进程组同义使用。本章描述进程组、会话和作业控制。</p><p>进程组是一组共享相同进程组标识符 (PGID) 的一个或多个进程。进程组 ID 是与进程 ID 具有相同类型 (pid_t) 的数字。一个进程组有一个进程组负责人，它是创建组的进程，其进程 ID 成为该组的进程组 ID。新进程继承其父进程组 ID。进程组具有生命周期，即从领导者创建组开始到最后一个成员进程离开组结束的时间段。一个进程可以通过终止或加入 700 Chapter 34 另一个进程组来离开一个进程组。进程组负责人不必是进程组的最后一个成员。会话是进程组的集合。进程的会话成员身份由其会话标识符 (SID) 确定，与进程组 ID 一样，它是 pid_t 类型的数字。会话领导者是创建新会话的进程，其进程 ID 成为会话 ID。新进程继承其父进程的会话 ID。会话中的所有进程共享一个控制终端。控制终端在会话领导者首次打开终端设备时建立。一个终端最多可以是一个会话的控制终端。在任何时间点，会话中的一个进程组是终端的前台进程组，其他进程组是后台进程组。只有前台进程组中的进程才能从控制终端读取输入。当用户在控制终端上键入一个信号生成终端字符时，将向前台进程组的所有成员发送一个信号。这些字符是产生SIGINT的中断字符（通常是Control-C）；生成 SIGQUIT 的退出字符（通常是 Control-\\）；以及生成 SIGTSTP 的挂起字符（通常是 Control-Z）。作为与控制终端建立连接（即打开）的结果，会话领导者成为终端的控制进程。作为控制进程的主要意义在于，如果发生终端断开连接，内核会向该进程发送 SIGHUP 信号。</p><h2 id="_9-进程的状态" tabindex="-1"><a class="header-anchor" href="#_9-进程的状态" aria-hidden="true">#</a> 9. 进程的状态</h2><p>在上面，我们知道了进程有着「运行 - 暂停 - 运行」的活动规律。一般说来，一个进程并不是自始至终连续不停地运行的，它与并发执行中的其他进程的执行是相互制约的。</p><p>它有时处于运行状态，有时又由于某种原因而暂停运行处于等待状态，当使它暂停的原因消失后，它又进入准备运行状态。</p><p>所以，<strong>在一个进程的活动期间至少具备三种基本状态，即运行状态、就绪状态、阻塞状态。</strong></p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程和线程/7-进程三个基本状态.jpg" alt="进程的三种基本状态" tabindex="0" loading="lazy"><figcaption>进程的三种基本状态</figcaption></figure><p>上图中各个状态的意义：</p><ul><li>运行状态（<em>Running</em>）：该时刻进程占用 CPU；</li><li>就绪状态（<em>Ready</em>）：可运行，由于其他进程处于运行状态而暂时停止运行；</li><li>阻塞状态（<em>Blocked</em>）：该进程正在等待某一事件发生（如等待输入/输出操作的完成）而暂时停止运行，这时，即使给它CPU控制权，它也无法运行；</li></ul><p>当然，进程还有另外两个基本状态：</p><ul><li>创建状态（<em>new</em>）：进程正在被创建时的状态；</li><li>结束状态（<em>Exit</em>）：进程正在从系统中消失时的状态；</li></ul><p>于是，一个完整的进程状态的变迁如下图：</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程和线程/8-进程五个状态.jpg" alt="进程五种状态的变迁" tabindex="0" loading="lazy"><figcaption>进程五种状态的变迁</figcaption></figure><p>再来详细说明一下进程的状态变迁：</p><ul><li><em>NULL -&gt; 创建状态</em>：一个新进程被创建时的第一个状态；</li><li><em>创建状态 -&gt; 就绪状态</em>：当进程被创建完成并初始化后，一切就绪准备运行时，变为就绪状态，这个过程是很快的；</li><li><em>就绪态 -&gt; 运行状态</em>：处于就绪状态的进程被操作系统的进程调度器选中后，就分配给 CPU 正式运行该进程；</li><li><em>运行状态 -&gt; 结束状态</em>：当进程已经运行完成或出错时，会被操作系统作结束状态处理；</li><li><em>运行状态 -&gt; 就绪状态</em>：处于运行状态的进程在运行过程中，由于分配给它的运行时间片用完，操作系统会把该进程变为就绪态，接着从就绪态选中另外一个进程运行；</li><li><em>运行状态 -&gt; 阻塞状态</em>：当进程请求某个事件且必须等待时，例如请求 I/O 事件；</li><li><em>阻塞状态 -&gt; 就绪状态</em>：当进程要等待的事件完成时，它从阻塞状态变到就绪状态；</li></ul><p>如果有大量处于阻塞状态的进程，进程可能会占用着物理内存空间，显然不是我们所希望的，毕竟物理内存空间是有限的，被阻塞状态的进程占用着物理内存就一种浪费物理内存的行为。</p><p>所以，在虚拟内存管理的操作系统中，通常会把阻塞状态的进程的物理内存空间换出到硬盘，等需要再次运行的时候，再从硬盘换入到物理内存。</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程和线程/9-换入换出.jpg" alt="虚拟内存管理-换入换出" tabindex="0" loading="lazy"><figcaption>虚拟内存管理-换入换出</figcaption></figure><p>那么，就需要一个新的状态，来<strong>描述进程没有占用实际的物理内存空间的情况，这个状态就是挂起状态</strong>。这跟阻塞状态是不一样，阻塞状态是等待某个事件的返回。</p><p>另外，挂起状态可以分为两种：</p><ul><li>阻塞挂起状态：进程在外存（硬盘）并等待某个事件的出现；</li><li>就绪挂起状态：进程在外存（硬盘），但只要进入内存，即刻立刻运行；</li></ul><p>这两种挂起状态加上前面的五种状态，就变成了七种状态变迁（留给我的颜色不多了），见如下图：</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程和线程/10-进程七中状态.jpg" alt="七种状态变迁" tabindex="0" loading="lazy"><figcaption>七种状态变迁</figcaption></figure><p>导致进程挂起的原因不只是因为进程所使用的内存空间不在物理内存，还包括如下情况：</p><ul><li>通过 sleep 让进程间歇性挂起，其工作原理是设置一个定时器，到期后唤醒进程。</li><li>用户希望挂起一个程序的执行，比如在 Linux 中用 <code>Ctrl+Z</code> 挂起进程；</li></ul><h2 id="_10-进程的控制结构" tabindex="-1"><a class="header-anchor" href="#_10-进程的控制结构" aria-hidden="true">#</a> 10. 进程的控制结构</h2><p><strong>PCB 是进程存在的唯一标识</strong>，这意味着一个进程的存在，必然会有一个 PCB，如果进程消失了，那么 PCB 也会随之消失。</p><blockquote><p>PCB 具体包含什么信息呢？</p></blockquote><p><strong>进程描述信息：</strong></p><ul><li>进程标识符：标识各个进程，每个进程都有一个并且唯一的标识符；</li><li>用户标识符：进程归属的用户，用户标识符主要为共享和保护服务；</li></ul><p><strong>进程控制和管理信息：</strong></p><ul><li>进程当前状态，如 new、ready、running、waiting 或 blocked 等；</li><li>进程优先级：进程抢占 CPU 时的优先级；</li></ul><p><strong>资源分配清单：</strong></p><ul><li>有关内存地址空间或虚拟地址空间的信息，所打开文件的列表和所使用的 I/O 设备信息。</li></ul><p><strong>CPU 相关信息：</strong></p><ul><li>CPU 中各个寄存器的值，当进程被切换时，CPU 的状态信息都会被保存在相应的 PCB 中，以便进程重新执行时，能从断点处继续执行。</li></ul><p>可见，PCB 包含信息还是比较多的。</p><blockquote><p>每个 PCB 是如何组织的呢？</p></blockquote><p>通常是通过<strong>链表</strong>的方式进行组织，把具有<strong>相同状态的进程链在一起，组成各种队列</strong>。比如：</p><ul><li>将所有处于就绪状态的进程链在一起，称为<strong>就绪队列</strong>；</li><li>把所有因等待某事件而处于等待状态的进程链在一起就组成各种<strong>阻塞队列</strong>；</li><li>另外，对于运行队列在单核 CPU 系统中则只有一个运行指针了，因为单核 CPU 在某个时间，只能运行一个程序。</li></ul><p>那么，就绪队列和阻塞队列链表的组织形式如下图：</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程和线程/12-PCB状态链表组织.jpg" alt="就绪队列和阻塞队列" tabindex="0" loading="lazy"><figcaption>就绪队列和阻塞队列</figcaption></figure><p>除了链接的组织方式，还有索引方式，它的工作原理：将同一状态的进程组织在一个索引表中，索引表项指向相应的 PCB，不同状态对应不同的索引表。</p><p>一般会选择链表，因为可能面临进程创建，销毁等调度导致进程状态发生变化，所以链表能够更加灵活的插入和删除。</p><h2 id="_11-进程的上下文切换" tabindex="-1"><a class="header-anchor" href="#_11-进程的上下文切换" aria-hidden="true">#</a> 11. 进程的上下文切换</h2><p>各个进程之间是共享 CPU 资源的，在不同的时候进程之间需要切换，让不同的进程可以在 CPU 执行，那么这个<strong>一个进程切换到另一个进程运行，称为进程的上下文切换</strong>。</p><blockquote><p>在详细说进程上下文切换前，我们先来看看 CPU 上下文切换</p></blockquote><p>任务是交给 CPU 运行的，那么在每个任务运行前，CPU 需要知道任务从哪里加载，又从哪里开始运行。</p><p>所以，操作系统需要事先帮 CPU 设置好 <strong>CPU 寄存器和程序计数器</strong>。</p><p>所以说，CPU 寄存器和程序计数是 CPU 在运行任何任务前，所必须依赖的环境，这些环境就叫做 <strong>CPU 上下文</strong>。</p><p>CPU 上下文切换就是先把前一个任务的 CPU 上下文（CPU 寄存器和程序计数器）保存起来，然后加载新任务的上下文到这些寄存器和程序计数器，最后再跳转到程序计数器所指的新位置，运行新任务。</p><p>系统内核会存储保持下来的上下文信息，当此任务再次被分配给 CPU 运行时，CPU 会重新加载这些上下文，这样就能保证任务原来的状态不受影响，让任务看起来还是连续运行。</p><p>上面说到所谓的「任务」，主要包含进程、线程和中断。所以，可以根据任务的不同，把 CPU 上下文切换分成：<strong>进程上下文切换、线程上下文切换和中断上下文切换</strong>。</p><blockquote><p>进程的上下文切换到底是切换什么呢？</p></blockquote><p>进程是由内核管理和调度的，所以进程的切换只能发生在内核态。</p><p>所以，<strong>进程的上下文切换不仅包含了虚拟内存、栈、全局变量等用户空间的资源，还包括了内核堆栈、寄存器等内核空间的资源。</strong></p><p>通常，会把交换的信息保存在进程的 PCB，当要运行另外一个进程的时候，我们需要从这个进程的 PCB 取出上下文，然后恢复到 CPU 中，这使得这个进程可以继续执行，如下图所示：</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程和线程/13-进程上下文切换.jpg" alt="进程上下文切换" tabindex="0" loading="lazy"><figcaption>进程上下文切换</figcaption></figure><p>大家需要注意，进程的上下文开销是很关键的，我们希望它的开销越小越好，这样可以使得进程可以把更多时间花费在执行程序上，而不是耗费在上下文切换。</p><blockquote><p>发生进程上下文切换有哪些场景？</p></blockquote><ul><li>为了保证所有进程可以得到公平调度，CPU 时间被划分为一段段的时间片，这些时间片再被轮流分配给各个进程。这样，当某个进程的时间片耗尽了，进程就从运行状态变为就绪状态，系统从就绪队列选择另外一个进程运行；</li><li>进程在系统资源不足（比如内存不足）时，要等到资源满足后才可以运行，这个时候进程也会被挂起，并由系统调度其他进程运行；</li><li>当进程通过睡眠函数 sleep 这样的方法将自己主动挂起时，自然也会重新调度；</li><li>当有优先级更高的进程运行时，为了保证高优先级进程的运行，当前进程会被挂起，由高优先级进程来运行；</li><li>发生硬件中断时，CPU 上的进程会被中断挂起，转而执行内核中的中断服务程序；</li></ul><p>以上，就是发生进程上下文切换的常见场景了。</p><h2 id="_12-进程间的通信方式" tabindex="-1"><a class="header-anchor" href="#_12-进程间的通信方式" aria-hidden="true">#</a> 12. 进程间的通信方式</h2><p>因此，Linux 与所有现代 UNIX 实现一样，提供了一套丰富的进程间通信（IPC）机制，包括以下内容：</p><ul><li>信号，用于指示事件已发生；</li><li>管道（shell 用户熟悉为 | 操作符）和 FIFO，可用于在进程之间传输数据；</li><li>套接字，可用于将数据从一个进程传输到另一个进程，无论是在同一主机上，还是在通过网络连接的不同主机上；</li><li>文件锁定，允许进程锁定文件的区域，以防止其他进程读取或更新文件内容；</li><li>消息队列，用于在进程之间交换消息（数据包）；</li><li>信号量，用于同步进程的动作</li><li>共享内存，允许两个或多个进程共享一块内存。当一个进程更改共享内存的内容时，所有其他进程都可以立即看到更改。</li></ul><p>UNIX 系统上种类繁多的 IPC 机制，有时具有重叠的功能，部分原因在于它们在 UNIX 系统的不同变体和各种标准的要求下的演变。例如，FIFO 和 UNIX 域套接字本质上执行相同的功能，即允许同一系统上的不相关进程交换数据。两者都存在于现代 UNIX 系统中，因为 FIFO 来自 System V，而套接字来自 BSD。</p><p>如果你学过 Linux 命令，那你肯定很熟悉「<code>|</code>」这个竖线。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ps</span> auxf <span class="token operator">|</span> <span class="token function">grep</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令行里的「<code>|</code>」竖线就是一个<strong>管道</strong>，它的功能是将前一个命令（<code>ps auxf</code>）的输出，作为后一个命令（<code>grep mysql</code>）的输入，从这功能描述，可以看出<strong>管道传输数据是单向的</strong>，如果想相互通信，我们需要创建两个管道才行。</p><p>同时，我们得知上面这种管道是没有名字，所以「<code>|</code>」表示的管道称为<strong>匿名管道</strong>，用完了就销毁。</p><p>管道还有另外一个类型是<strong>命名管道</strong>，也被叫做 <code>FIFO</code>，因为数据是先进先出的传输方式。</p><p>在使用命名管道前，先需要通过 <code>mkfifo</code> 命令来创建，并且指定管道名字：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">mkfifo</span> myPipe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>myPipe 就是这个管道的名称，基于 Linux 一切皆文件的理念，所以管道也是以文件的方式存在，我们可以用 ls 看一下，这个文件的类型是 p，也就是 pipe（管道） 的意思：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token parameter variable">-l</span>
prw-r--r--. <span class="token number">1</span> root    root         <span class="token number">0</span> Jul <span class="token number">17</span> 02:45 myPipe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们往 myPipe 这个管道写入数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;hello&quot;</span> <span class="token operator">&gt;</span> myPipe  // 将数据写进管道
                         // 停住了 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>你操作了后，你会发现命令执行后就停在这了，这是因为管道里的内容没有被读取，只有当管道里的数据被读完后，命令才可以正常退出。</p><p>于是，我们执行另外一个命令来读取这个管道里的数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> <span class="token operator">&lt;</span> myPipe  // 读取管道里的数据
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，管道里的内容被读取出来了，并打印在了终端上，另外一方面，echo 那个命令也正常退出了。</p><p>我们可以看出，<strong>管道这种通信方式效率低，不适合进程间频繁地交换数据</strong>。当然，它的好处，自然就是简单，同时也我们很容易得知管道里的数据已经被另一个进程读取了。</p><blockquote><p>那管道如何创建呢，背后原理是什么？</p></blockquote><p>匿名管道的创建，需要通过下面这个系统调用：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">pipe</span><span class="token punctuation">(</span><span class="token keyword">int</span> fd<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里表示创建一个匿名管道，并返回了两个描述符，一个是管道的读取端描述符 <code>fd[0]</code>，另一个是管道的写入端描述符 <code>fd[1]</code>。注意，这个匿名管道是特殊的文件，只存在于内存，不存于文件系统中。</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/5-管道-pipe.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>其实，<strong>所谓的管道，就是内核里面的一串缓存</strong>。从管道的一段写入的数据，实际上是缓存在内核中的，另一端读取，也就是从内核中读取这段数据。另外，管道传输的数据是无格式的流且大小受限。</p><p>看到这，你可能会有疑问了，这两个描述符都是在一个进程里面，并没有起到进程间通信的作用，怎么样才能使得管道是跨过两个进程的呢？</p><p>我们可以使用 <code>fork</code> 创建子进程，<strong>创建的子进程会复制父进程的文件描述符</strong>，这样就做到了两个进程各有两个「 <code>fd[0]</code> 与 <code>fd[1]</code>」，两个进程就可以通过各自的 fd 写入和读取同一个管道文件实现跨进程通信了。</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/6-管道-pipe-fork.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>管道只能一端写入，另一端读出，所以上面这种模式容易造成混乱，因为父进程和子进程都可以同时写入，也都可以读出。那么，为了避免这种情况，通常的做法是：</p><ul><li>父进程关闭读取的 fd[0]，只保留写入的 fd[1]；</li><li>子进程关闭写入的 fd[1]，只保留读取的 fd[0]；</li></ul><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/7-管道-pipe-fork-单向通信.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所以说如果需要双向通信，则应该创建两个管道。</p><p>到这里，我们仅仅解析了使用管道进行父进程与子进程之间的通信，但是在我们 shell 里面并不是这样的。</p><p>在 shell 里面执行 <code>A | B</code>命令的时候，A 进程和 B 进程都是 shell 创建出来的子进程，A 和 B 之间不存在父子关系，它俩的父进程都是 shell。</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/8-管道-pipe-shell.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所以说，在 shell 里通过「<code>|</code>」匿名管道将多个命令连接在一起，实际上也就是创建了多个子进程，那么在我们编写 shell 脚本时，能使用一个管道搞定的事情，就不要多用一个管道，这样可以减少创建子进程的系统开销。</p><p>我们可以得知，<strong>对于匿名管道，它的通信范围是存在父子关系的进程</strong>。因为管道没有实体，也就是没有管道文件，只能通过 fork 来复制父进程 fd 文件描述符，来达到通信的目的。</p><p>另外，<strong>对于命名管道，它可以在不相关的进程间也能相互通信</strong>。因为命令管道，提前创建了一个类型为管道的设备文件，在进程里只要使用这个设备文件，就可以相互通信。</p><p>不管是匿名管道还是命名管道，进程写入的数据都是缓存在内核中，另一个进程读取数据时候自然也是从内核中获取，同时通信数据都遵循<strong>先进先出</strong>原则，不支持 lseek 之类的文件定位操作。</p><hr><h3 id="消息队列" tabindex="-1"><a class="header-anchor" href="#消息队列" aria-hidden="true">#</a> 消息队列</h3><p>前面说到管道的通信方式是效率低的，因此管道不适合进程间频繁地交换数据。</p><p>对于这个问题，<strong>消息队列</strong>的通信模式就可以解决。比如，A 进程要给 B 进程发送消息，A 进程把数据放在对应的消息队列后就可以正常返回了，B 进程需要的时候再去读取数据就可以了。同理，B 进程要给 A 进程发送消息也是如此。</p><p>再来，<strong>消息队列是保存在内核中的消息链表</strong>，在发送数据时，会分成一个一个独立的数据单元，也就是消息体（数据块），消息体是用户自定义的数据类型，消息的发送方和接收方要约定好消息体的数据类型，所以每个消息体都是固定大小的存储块，不像管道是无格式的字节流数据。如果进程从消息队列中读取了消息体，内核就会把这个消息体删除。</p><p>消息队列生命周期随内核，如果没有释放消息队列或者没有关闭操作系统，消息队列会一直存在，而前面提到的匿名管道的生命周期，是随进程的创建而建立，随进程的结束而销毁。</p><p>消息这种模型，两个进程之间的通信就像平时发邮件一样，你来一封，我回一封，可以频繁沟通了。</p><p>但邮件的通信方式存在不足的地方有两点，<strong>一是通信不及时，二是附件也有大小限制</strong>，这同样也是消息队列通信不足的点。</p><p><strong>消息队列不适合比较大数据的传输</strong>，因为在内核中每个消息体都有一个最大长度的限制，同时所有队列所包含的全部消息体的总长度也是有上限。在 Linux 内核中，会有两个宏定义 <code>MSGMAX</code> 和 <code>MSGMNB</code>，它们以字节为单位，分别定义了一条消息的最大长度和一个队列的最大长度。</p><p><strong>消息队列通信过程中，存在用户态与内核态之间的数据拷贝开销</strong>，因为进程写入数据到内核中的消息队列时，会发生从用户态拷贝数据到内核态的过程，同理另一进程读取内核中的消息数据时，会发生从内核态拷贝数据到用户态的过程。</p><hr><h3 id="共享内存" tabindex="-1"><a class="header-anchor" href="#共享内存" aria-hidden="true">#</a> 共享内存</h3><p>消息队列的读取和写入的过程，都会有发生用户态与内核态之间的消息拷贝过程。那<strong>共享内存</strong>的方式，就很好的解决了这一问题。</p><p>现代操作系统，对于内存管理，采用的是虚拟内存技术，也就是每个进程都有自己独立的虚拟内存空间，不同进程的虚拟内存映射到不同的物理内存中。所以，即使进程 A 和 进程 B 的虚拟地址是一样的，其实访问的是不同的物理内存地址，对于数据的增删查改互不影响。</p><p><strong>共享内存的机制，就是拿出一块虚拟地址空间来，映射到相同的物理内存中</strong>。这样这个进程写入的东西，另外一个进程马上就能看到了，都不需要拷贝来拷贝去，传来传去，大大提高了进程间通信的速度。</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/9-共享内存.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><hr><h3 id="信号量" tabindex="-1"><a class="header-anchor" href="#信号量" aria-hidden="true">#</a> 信号量</h3><p>用了共享内存通信方式，带来新的问题，那就是如果多个进程同时修改同一个共享内存，很有可能就冲突了。例如两个进程都同时写一个地址，那先写的那个进程会发现内容被别人覆盖了。</p><p>为了防止多进程竞争共享资源，而造成的数据错乱，所以需要保护机制，使得共享的资源，在任意时刻只能被一个进程访问。正好，<strong>信号量</strong>就实现了这一保护机制。</p><p><strong>信号量其实是一个整型的计数器，主要用于实现进程间的互斥与同步，而不是用于缓存进程间通信的数据</strong>。</p><p>信号量表示资源的数量，控制信号量的方式有两种原子操作：</p><ul><li>一个是 <strong>P 操作</strong>，这个操作会把信号量减去 1，相减后如果信号量 &lt; 0，则表明资源已被占用，进程需阻塞等待；相减后如果信号量 &gt;= 0，则表明还有资源可使用，进程可正常继续执行。</li><li>另一个是 <strong>V 操作</strong>，这个操作会把信号量加上 1，相加后如果信号量 &lt;= 0，则表明当前有阻塞中的进程，于是会将该进程唤醒运行；相加后如果信号量 &gt; 0，则表明当前没有阻塞中的进程；</li></ul><p>P 操作是用在进入共享资源之前，V 操作是用在离开共享资源之后，这两个操作是必须成对出现的。</p><p>接下来，举个例子，如果要使得两个进程互斥访问共享内存，我们可以初始化信号量为 <code>1</code>。</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/10-信号量-互斥.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>具体的过程如下：</p><ul><li>进程 A 在访问共享内存前，先执行了 P 操作，由于信号量的初始值为 1，故在进程 A 执行 P 操作后信号量变为 0，表示共享资源可用，于是进程 A 就可以访问共享内存。</li><li>若此时，进程 B 也想访问共享内存，执行了 P 操作，结果信号量变为了 -1，这就意味着临界资源已被占用，因此进程 B 被阻塞。</li><li>直到进程 A 访问完共享内存，才会执行 V 操作，使得信号量恢复为 0，接着就会唤醒阻塞中的线程 B，使得进程 B 可以访问共享内存，最后完成共享内存的访问后，执行 V 操作，使信号量恢复到初始值 1。</li></ul><p>可以发现，信号初始化为 <code>1</code>，就代表着是<strong>互斥信号量</strong>，它可以保证共享内存在任何时刻只有一个进程在访问，这就很好的保护了共享内存。</p><p>另外，在多进程里，每个进程并不一定是顺序执行的，它们基本是以各自独立的、不可预知的速度向前推进，但有时候我们又希望多个进程能密切合作，以实现一个共同的任务。</p><p>例如，进程 A 是负责生产数据，而进程 B 是负责读取数据，这两个进程是相互合作、相互依赖的，进程 A 必须先生产了数据，进程 B 才能读取到数据，所以执行是有前后顺序的。</p><p>那么这时候，就可以用信号量来实现多进程同步的方式，我们可以初始化信号量为 <code>0</code>。</p><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/11-信号量-同步.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>具体过程：</p><ul><li>如果进程 B 比进程 A 先执行了，那么执行到 P 操作时，由于信号量初始值为 0，故信号量会变为 -1，表示进程 A 还没生产数据，于是进程 B 就阻塞等待；</li><li>接着，当进程 A 生产完数据后，执行了 V 操作，就会使得信号量变为 0，于是就会唤醒阻塞在 P 操作的进程 B；</li><li>最后，进程 B 被唤醒后，意味着进程 A 已经生产了数据，于是进程 B 就可以正常读取数据了。</li></ul><p>可以发现，信号初始化为 <code>0</code>，就代表着是<strong>同步信号量</strong>，它可以保证进程 A 应在进程 B 之前执行。</p><hr><h3 id="信号" tabindex="-1"><a class="header-anchor" href="#信号" aria-hidden="true">#</a> 信号</h3><p>上面说的进程间通信，都是常规状态下的工作模式。<strong>对于异常情况下的工作模式，就需要用「信号」的方式来通知进程。</strong></p><p>信号跟信号量虽然名字相似度 66.66%，但两者用途完全不一样，就好像 Java 和 JavaScript 的区别。</p><p>在 Linux 操作系统中， 为了响应各种各样的事件，提供了几十种信号，分别代表不同的意义。我们可以通过 <code>kill -l</code> 命令，查看所有的信号：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">kill</span> <span class="token parameter variable">-l</span>
 <span class="token number">1</span><span class="token punctuation">)</span> SIGHUP       <span class="token number">2</span><span class="token punctuation">)</span> SIGINT       <span class="token number">3</span><span class="token punctuation">)</span> SIGQUIT      <span class="token number">4</span><span class="token punctuation">)</span> SIGILL       <span class="token number">5</span><span class="token punctuation">)</span> SIGTRAP
 <span class="token number">6</span><span class="token punctuation">)</span> SIGABRT      <span class="token number">7</span><span class="token punctuation">)</span> SIGBUS       <span class="token number">8</span><span class="token punctuation">)</span> SIGFPE       <span class="token number">9</span><span class="token punctuation">)</span> SIGKILL     <span class="token number">10</span><span class="token punctuation">)</span> SIGUSR1
<span class="token number">11</span><span class="token punctuation">)</span> SIGSEGV     <span class="token number">12</span><span class="token punctuation">)</span> SIGUSR2     <span class="token number">13</span><span class="token punctuation">)</span> SIGPIPE     <span class="token number">14</span><span class="token punctuation">)</span> SIGALRM     <span class="token number">15</span><span class="token punctuation">)</span> SIGTERM
<span class="token number">16</span><span class="token punctuation">)</span> SIGSTKFLT   <span class="token number">17</span><span class="token punctuation">)</span> SIGCHLD     <span class="token number">18</span><span class="token punctuation">)</span> SIGCONT     <span class="token number">19</span><span class="token punctuation">)</span> SIGSTOP     <span class="token number">20</span><span class="token punctuation">)</span> SIGTSTP
<span class="token number">21</span><span class="token punctuation">)</span> SIGTTIN     <span class="token number">22</span><span class="token punctuation">)</span> SIGTTOU     <span class="token number">23</span><span class="token punctuation">)</span> SIGURG      <span class="token number">24</span><span class="token punctuation">)</span> SIGXCPU     <span class="token number">25</span><span class="token punctuation">)</span> SIGXFSZ
<span class="token number">26</span><span class="token punctuation">)</span> SIGVTALRM   <span class="token number">27</span><span class="token punctuation">)</span> SIGPROF     <span class="token number">28</span><span class="token punctuation">)</span> SIGWINCH    <span class="token number">29</span><span class="token punctuation">)</span> SIGIO       <span class="token number">30</span><span class="token punctuation">)</span> SIGPWR
<span class="token number">31</span><span class="token punctuation">)</span> SIGSYS      <span class="token number">34</span><span class="token punctuation">)</span> SIGRTMIN    <span class="token number">35</span><span class="token punctuation">)</span> SIGRTMIN+1  <span class="token number">36</span><span class="token punctuation">)</span> SIGRTMIN+2  <span class="token number">37</span><span class="token punctuation">)</span> SIGRTMIN+3
<span class="token number">38</span><span class="token punctuation">)</span> SIGRTMIN+4  <span class="token number">39</span><span class="token punctuation">)</span> SIGRTMIN+5  <span class="token number">40</span><span class="token punctuation">)</span> SIGRTMIN+6  <span class="token number">41</span><span class="token punctuation">)</span> SIGRTMIN+7  <span class="token number">42</span><span class="token punctuation">)</span> SIGRTMIN+8
<span class="token number">43</span><span class="token punctuation">)</span> SIGRTMIN+9  <span class="token number">44</span><span class="token punctuation">)</span> SIGRTMIN+10 <span class="token number">45</span><span class="token punctuation">)</span> SIGRTMIN+11 <span class="token number">46</span><span class="token punctuation">)</span> SIGRTMIN+12 <span class="token number">47</span><span class="token punctuation">)</span> SIGRTMIN+13
<span class="token number">48</span><span class="token punctuation">)</span> SIGRTMIN+14 <span class="token number">49</span><span class="token punctuation">)</span> SIGRTMIN+15 <span class="token number">50</span><span class="token punctuation">)</span> SIGRTMAX-14 <span class="token number">51</span><span class="token punctuation">)</span> SIGRTMAX-13 <span class="token number">52</span><span class="token punctuation">)</span> SIGRTMAX-12
<span class="token number">53</span><span class="token punctuation">)</span> SIGRTMAX-11 <span class="token number">54</span><span class="token punctuation">)</span> SIGRTMAX-10 <span class="token number">55</span><span class="token punctuation">)</span> SIGRTMAX-9  <span class="token number">56</span><span class="token punctuation">)</span> SIGRTMAX-8  <span class="token number">57</span><span class="token punctuation">)</span> SIGRTMAX-7
<span class="token number">58</span><span class="token punctuation">)</span> SIGRTMAX-6  <span class="token number">59</span><span class="token punctuation">)</span> SIGRTMAX-5  <span class="token number">60</span><span class="token punctuation">)</span> SIGRTMAX-4  <span class="token number">61</span><span class="token punctuation">)</span> SIGRTMAX-3  <span class="token number">62</span><span class="token punctuation">)</span> SIGRTMAX-2
<span class="token number">63</span><span class="token punctuation">)</span> SIGRTMAX-1  <span class="token number">64</span><span class="token punctuation">)</span> SIGRTMAX
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行在 shell 终端的进程，我们可以通过键盘输入某些组合键的时候，给进程发送信号。例如</p><ul><li>Ctrl+C 产生 <code>SIGINT</code> 信号，表示终止该进程；</li><li>Ctrl+Z 产生 <code>SIGTSTP</code> 信号，表示停止该进程，但还未结束；</li></ul><p>如果进程在后台运行，可以通过 <code>kill</code> 命令的方式给进程发送信号，但前提需要知道运行中的进程 PID 号，例如：</p><ul><li>kill -9 1050 ，表示给 PID 为 1050 的进程发送 <code>SIGKILL</code> 信号，用来立即结束该进程；</li></ul><p>所以，信号事件的来源主要有硬件来源（如键盘 Cltr+C ）和软件来源（如 kill 命令）。</p><p>信号是进程间通信机制中<strong>唯一的异步通信机制</strong>，因为可以在任何时候发送信号给某一进程，一旦有信号产生，我们就有下面这几种，用户进程对信号的处理方式。</p><p><strong>1.执行默认操作</strong>。Linux 对每种信号都规定了默认操作，例如，上面列表中的 SIGTERM 信号，就是终止进程的意思。</p><p><strong>2.捕捉信号</strong>。我们可以为信号定义一个信号处理函数。当信号发生时，我们就执行相应的信号处理函数。</p><p><strong>3.忽略信号</strong>。当我们不希望处理某些信号的时候，就可以忽略该信号，不做任何处理。有两个信号是应用进程无法捕捉和忽略的，即 <code>SIGKILL</code> 和 <code>SEGSTOP</code>，它们用于在任何时候中断或结束某一进程。</p><hr><h3 id="socket" tabindex="-1"><a class="header-anchor" href="#socket" aria-hidden="true">#</a> Socket</h3><p>前面提到的管道、消息队列、共享内存、信号量和信号都是在同一台主机上进行进程间通信，那要想<strong>跨网络与不同主机上的进程之间通信，就需要 Socket 通信了。</strong></p><p>实际上，Socket 通信不仅可以跨网络与不同主机的进程间通信，还可以在同主机上进程间通信。</p><p>我们来看看创建 socket 的系统调用：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">socket</span><span class="token punctuation">(</span><span class="token keyword">int</span> domain<span class="token punctuation">,</span> <span class="token keyword">int</span> type<span class="token punctuation">,</span> <span class="token keyword">int</span> protocal<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>三个参数分别代表：</p><ul><li>domain 参数用来指定协议族，比如 AF_INET 用于 IPV4、AF_INET6 用于 IPV6、AF_LOCAL/AF_UNIX 用于本机；</li><li>type 参数用来指定通信特性，比如 SOCK_STREAM 表示的是字节流，对应 TCP、SOCK_DGRAM 表示的是数据报，对应 UDP、SOCK_RAW 表示的是原始套接字；</li><li>protocal 参数原本是用来指定通信协议的，但现在基本废弃。因为协议已经通过前面两个参数指定完成，protocol 目前一般写成 0 即可；</li></ul><p>根据创建 socket 类型的不同，通信的方式也就不同：</p><ul><li>实现 TCP 字节流通信： socket 类型是 AF_INET 和 SOCK_STREAM；</li><li>实现 UDP 数据报通信：socket 类型是 AF_INET 和 SOCK_DGRAM；</li><li>实现本地进程间通信： 「本地字节流 socket 」类型是 AF_LOCAL 和 SOCK_STREAM，「本地数据报 socket 」类型是 AF_LOCAL 和 SOCK_DGRAM。另外，AF_UNIX 和 AF_LOCAL 是等价的，所以 AF_UNIX 也属于本地 socket；</li></ul><p>接下来，简单说一下这三种通信的编程模式。</p><blockquote><p>针对 TCP 协议通信的 socket 编程模型</p></blockquote><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/12-TCP编程模型.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>服务端和客户端初始化 <code>socket</code>，得到文件描述符；</li><li>服务端调用 <code>bind</code>，将绑定在 IP 地址和端口;</li><li>服务端调用 <code>listen</code>，进行监听；</li><li>服务端调用 <code>accept</code>，等待客户端连接；</li><li>客户端调用 <code>connect</code>，向服务器端的地址和端口发起连接请求；</li><li>服务端 <code>accept</code> 返回用于传输的 <code>socket</code> 的文件描述符；</li><li>客户端调用 <code>write</code> 写入数据；服务端调用 <code>read</code> 读取数据；</li><li>客户端断开连接时，会调用 <code>close</code>，那么服务端 <code>read</code> 读取数据的时候，就会读取到了 <code>EOF</code>，待处理完数据后，服务端调用 <code>close</code>，表示连接关闭。</li></ul><p>这里需要注意的是，服务端调用 <code>accept</code> 时，连接成功了会返回一个已完成连接的 socket，后续用来传输数据。</p><p>所以，监听的 socket 和真正用来传送数据的 socket，是「<strong>两个</strong>」 socket，一个叫作<strong>监听 socket</strong>，一个叫作<strong>已完成连接 socket</strong>。</p><p>成功连接建立之后，双方开始通过 read 和 write 函数来读写数据，就像往一个文件流里面写东西一样。</p><blockquote><p>针对 UDP 协议通信的 socket 编程模型</p></blockquote><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/操作系统/进程间通信/13-UDP编程模型.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>UDP 是没有连接的，所以不需要三次握手，也就不需要像 TCP 调用 listen 和 connect，但是 UDP 的交互仍然需要 IP 地址和端口号，因此也需要 bind。</p><p>对于 UDP 来说，不需要要维护连接，那么也就没有所谓的发送方和接收方，甚至都不存在客户端和服务端的概念，只要有一个 socket 多台机器就可以任意通信，因此每一个 UDP 的 socket 都需要 bind。</p><p>另外，每次通信时，调用 sendto 和 recvfrom，都要传入目标主机的 IP 地址和端口。</p><blockquote><p>针对本地进程间通信的 socket 编程模型</p></blockquote><p>本地 socket 被用于在<strong>同一台主机上进程间通信</strong>的场景：</p><ul><li>本地 socket 的编程接口和 IPv4 、IPv6 套接字编程接口是一致的，可以支持「字节流」和「数据报」两种协议；</li><li>本地 socket 的实现效率大大高于 IPv4 和 IPv6 的字节流、数据报 socket 实现；</li></ul><p>对于本地字节流 socket，其 socket 类型是 AF_LOCAL 和 SOCK_STREAM。</p><p>对于本地数据报 socket，其 socket 类型是 AF_LOCAL 和 SOCK_DGRAM。</p><p>本地字节流 socket 和 本地数据报 socket 在 bind 的时候，不像 TCP 和 UDP 要绑定 IP 地址和端口，而是<strong>绑定一个本地文件</strong>，这也就是它们之间的最大区别。</p><p>由于每个进程的用户空间都是独立的，不能相互访问，这时就需要借助内核空间来实现进程间通信，原因很简单，每个进程都是共享一个内核空间。</p><p>Linux 内核提供了不少进程间通信的方式，其中最简单的方式就是管道，管道分为「匿名管道」和「命名管道」。</p><p><strong>匿名管道</strong>顾名思义，它没有名字标识，匿名管道是特殊文件只存在于内存，没有存在于文件系统中，shell 命令中的「<code>|</code>」竖线就是匿名管道，通信的数据是<strong>无格式的流并且大小受限</strong>，通信的方式是<strong>单向</strong>的，数据只能在一个方向上流动，如果要双向通信，需要创建两个管道，再来<strong>匿名管道是只能用于存在父子关系的进程间通信</strong>，匿名管道的生命周期随着进程创建而建立，随着进程终止而消失。</p><p><strong>命名管道</strong>突破了匿名管道只能在亲缘关系进程间的通信限制，因为使用命名管道的前提，需要在文件系统创建一个类型为 p 的设备文件，那么毫无关系的进程就可以通过这个设备文件进行通信。另外，不管是匿名管道还是命名管道，进程写入的数据都是<strong>缓存在内核</strong>中，另一个进程读取数据时候自然也是从内核中获取，同时通信数据都遵循<strong>先进先出</strong>原则，不支持 lseek 之类的文件定位操作。</p><p><strong>消息队列</strong>克服了管道通信的数据是无格式的字节流的问题，消息队列实际上是保存在内核的「消息链表」，消息队列的消息体是可以用户自定义的数据类型，发送数据时，会被分成一个一个独立的消息体，当然接收数据时，也要与发送方发送的消息体的数据类型保持一致，这样才能保证读取的数据是正确的。消息队列通信的速度不是最及时的，毕竟<strong>每次数据的写入和读取都需要经过用户态与内核态之间的拷贝过程。</strong></p><p><strong>共享内存</strong>可以解决消息队列通信中用户态与内核态之间数据拷贝过程带来的开销，<strong>它直接分配一个共享空间，每个进程都可以直接访问</strong>，就像访问进程自己的空间一样快捷方便，不需要陷入内核态或者系统调用，大大提高了通信的速度，享有<strong>最快</strong>的进程间通信方式之名。但是便捷高效的共享内存通信，<strong>带来新的问题，多进程竞争同个共享资源会造成数据的错乱。</strong></p><p>那么，就需要<strong>信号量</strong>来保护共享资源，以确保任何时刻只能有一个进程访问共享资源，这种方式就是互斥访问。<strong>信号量不仅可以实现访问的互斥性，还可以实现进程间的同步</strong>，信号量其实是一个计数器，表示的是资源个数，其值可以通过两个原子操作来控制，分别是 <strong>P 操作和 V 操作</strong>。</p><p>与信号量名字很相似的叫<strong>信号</strong>，它俩名字虽然相似，但功能一点儿都不一样。信号是<strong>异步通信机制</strong>，信号可以在应用进程和内核之间直接交互，内核也可以利用信号来通知用户空间的进程发生了哪些系统事件，信号事件的来源主要有硬件来源（如键盘 Cltr+C ）和软件来源（如 kill 命令），一旦有信号发生，<strong>进程有三种方式响应信号 1. 执行默认操作、2. 捕捉信号、3. 忽略信号</strong>。有两个信号是应用进程无法捕捉和忽略的，即 <code>SIGKILL</code> 和 <code>SIGSTOP</code>，这是为了方便我们能在任何时候结束或停止某个进程。</p><p>前面说到的通信机制，都是工作于同一台主机，如果<strong>要与不同主机的进程间通信，那么就需要 Socket 通信了</strong>。Socket 实际上不仅用于不同的主机进程间通信，还可以用于本地主机进程间通信，可根据创建 Socket 的类型不同，分为三种常见的通信方式，一个是基于 TCP 协议的通信方式，一个是基于 UDP 协议的通信方式，一个是本地进程间通信方式。</p><p>以上，就是进程间通信的主要机制了。你可能会问了，那线程通信间的方式呢？</p><p>同个进程下的线程之间都是共享进程的资源，只要是共享变量都可以做到线程间通信，比如全局变量，所以对于线程间关注的不是通信方式，而是关注多线程竞争共享资源的问题，信号量也同样可以在线程间实现互斥与同步：</p><ul><li>互斥的方式，可保证任意时刻只有一个线程访问共享资源；</li><li>同步的方式，可保证线程 A 应在线程 B 之前执行；</li></ul><h2 id="_13-进程调度" tabindex="-1"><a class="header-anchor" href="#_13-进程调度" aria-hidden="true">#</a> 13.进程调度</h2><p>如今的操作系统都是多任务的，为了能让很多其它的任务能同一时候在系统上更好的执行，需要一个管理程序来管理计算机上同一时候执行的各个任务（也就是进程）。</p><p>这个管理程序就是调度程序，它的功能说起来非常easy：</p><p>1.决定哪些进程执行，哪些进程等待</p><p>2.决定每一个进程执行多长时间</p><p>此外，为了获得更好的用户体验，执行中的进程还可以马上被其它更紧急的进程打断。总之，调度是一个平衡的过程。一方面，它要保证各个执行的进程可以最大限度的使用CPU(即尽量少的切换进程，进程切换过多，CPU的时间会浪费在切换上)；还有一方面，保证各个进程能公平的使用CPU(即防止一个进程长时间独占CPU的情况)。</p><p><strong>进程调度的时机</strong></p><ul><li><p>系统调用 <code>yield</code>、<code>pause</code> 会使得当前进程让出 CPU，随后进行一次进程调度。</p></li><li><p>系统调用 <code>futex（wait）</code> 等待某个信号量，将进程设置为 <code>TASK_INTERRUPTIBLE</code> 状态，然后进行一次进程调度。</p></li><li><p>进程在退出的时候，会系统调用到 <code>exit</code> 方法，将当前进程设置为 <code>TASK_DEAD</code> 之后，进行一次进程调度。</p></li><li><p>在创建新进程、唤醒进程、周期调度过程中，内核会给当前进程设置一个需要调度的标志，然后在下一次中断返回到用户空间时，进行一次调度。</p></li><li><p>每颗 CPU 都会绑定一个 IDLE 进程，没事就在 CPU 上空转，偶尔进行一次进程调度。</p><p>除了上述调度时机，还有一类调度时机是中断返回的时候。</p><p>介绍中断之前，先描述一下什么是异常：进程的指令按照程序正常流程一直在 CPU 上跑，系统突然发生了一个带有异常号的异常，强迫 CPU 停止执行当前的指令，CPU 随后会在执行完当前指令之后，保存现场，根据异常号跳转到异常处理程序，处理完之后，回到被异常终止的下一条机器指令继续执行。</p><p>系统调用是常见一种类型的异常，也是应用代码从用户空间主动进入内核空间的唯一方式。另外一种常见的异常就是硬件中断，比如我们点下鼠标、按下键盘、网卡接收到数据、磁盘数据读写完毕等，都会触发一次硬件中断，运行在用户空间的进程会被动陷入到内核空间，进行中断处理程序的处理。</p><p>而中断处理程序处理完之后，势必要返回到用户空间，在返回至用户空间之前，会顺带做一件事情，判断是否要进行进程调度，如果需要，则顺带做一次进程调度。我们通过调用链来分析一下这个过程。</p><p>我们拿 arm64 处理器为例，中断处理程序的的入口是 <code>el0_irq</code>，这里看不懂汇编没有关系，我们抓关键部分即可。</p></li></ul><p><strong>内核支持调度策略</strong></p><p><strong>完全公平调度CFS</strong>：</p><p>SCHED_NORMAL ：用于普通进程,CFS</p><p>SCHED_BATCH :相当于SCHED_NORMAL分化版本，采用分时策略，根据动态优先级，分配CPU运行需要资源</p><p>SCHED_IDLE：优先级最低，在系统空闲时间才执行</p><p>CFS允许每个进程运行一段时间、循环轮转、选择运行最少的进程作为下一个运行进程，而不再采用分配给每个进程时间片的做法了，CFS在所有可运行进程总数基础上计算出一个进程应该运行多久，而不是依靠nice值来计算时间片。nice值在CFS中被作为进程获得的处理器运行比的权重：越高的nice值（越低的优先级）进程获得更低的处理器使用权重，这是相对默认nice值进程的进程而言的；相反，更低的nice值（越高的优先级）的进程获得更高的处理器使用权重。</p><p>CFS调度运行队列采用红黑树方式组织，红黑树种的key值以vruntime排序。每次选择下一个进程运行时即是选择最左边的一个进程运行。而对于入队和处队都会更新调度队列、调度实体的相关信息。</p><p>**实时调度算法 **：</p><p>SCHED_RR：轮流调度算法</p><p>SCHED_FIFO：先进先出，相同优先级任务先到先服务，高优先级任务可以抢占低优先级任务。</p><p>linux内核中提供了两种实时调度策略：SCHED_FIFO和SCHED_RR，其中RR是带有时间片的FIFO。这两种调度算法实现的都是静态优先级。内核不为实时进程计算动态优先级。这能保证给定优先级别的实时进程总能抢占优先级比他低得进程。linux的实时调度算法提供了一种软实时工作方式。实时优先级范围从0到MAX_RT_PRIO减一。默认情况下，MAX_RT_PRIO为100，所以默认的实时优先级范围是从0到99.SCHED_NORMAL级进程的nice值共享了这个取值空间；他的取值范围是从MAX_RT_PRIO到MAX_RT_PRIO+40.也就是说，在默认情况下，nice值从-20到19直接对应的是从100到139的实时优先级范围。</p><p>总结：对于实时调度，基于linux内核调度框架下作的工作比较简单，把所有的运行进程根据优先级放到不用的队列里面，采用位图方式进行使用记录。进队列仅仅是删除原来队列里面的本进程，然后将他挂到队列尾部；而对于“移除”操作，也仅仅是从队列里面移除后添加到运行队列尾部。</p><h2 id="_14-进程的底层实现" tabindex="-1"><a class="header-anchor" href="#_14-进程的底层实现" aria-hidden="true">#</a> 14.进程的底层实现</h2><p>在Linux内核中，进程是由PCB（进程控制块）来进行控制的。这个PCB具体而言就是结构体task_struct</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>struct task_struct {
	struct thread_info		thread_info; //线程描述符 提供指向
	unsigned int			__state;  //进程状态
	/* saved state for &quot;spinlock sleepers&quot; */
	unsigned int			saved_state;

	/*
	 * This begins the randomizable portion of task_struct. Only
	 * scheduling-critical items should be added above here.
	 * 通过随机替换字段的位置避免被黑客攻击后 可以通过位置获取内核信息
	 */
	randomized_struct_fields_start
	
	void				*stack;  //进程内核栈 每个进程私有 用于cpu上下文切换时 保存寄存器信息
	refcount_t			usage;  //引用计数器 是一个原子变量
	/* Per task flags (PF_*), defined further below: */
	unsigned int			flags;   //反应进程状态的信息，但不是运行状态，用于内核识别进程当前的状态，以备下一步操作
	unsigned int			ptrace;
	//它提供了父进程可以观察和控制其子进程执行的能力，并允许父进程检查和替换子进程的内核镜像(包括寄存器)的值。其基本原理是: 当使用了ptrace跟踪后，所有发送给被跟踪的子进程的信号(除了SIGKILL)，都会被转发给父进程，而子进程则会被阻塞，这时子进程的状态就会被系统标注为TASK_TRACED。而父进程收到信号后，就可以对停止下来的子进程进行检查和修改，然后让子进程继续运行。    

	int				on_cpu;
	struct __call_single_node	wake_entry;
	unsigned int			wakee_flips;
	unsigned long			wakee_flip_decay_ts;
	struct task_struct		*last_wakee;

	/*
	 * recent_used_cpu is initially set as the last CPU used by a task
	 * that wakes affine another task. Waker/wakee relationships can
	 * push tasks around a CPU where each wakeup moves to the next one.
	 * Tracking a recently used CPU allows a quick search for a recently
	 * used CPU that may be idle.
	 */
	 //recent_used_cpu帮助找到最近使用的空闲的cpu 初始化为最后使用的cpu 
	int				recent_used_cpu;        //最近使用的cpu
	int				wake_cpu;
#endif
	int				on_rq;      //是否在运行队列上

	int				prio;       //动态优先级
	int				static_prio; //进程的静态优先级 可以通过nice系统调用更改
	int				normal_prio;  //取决于静态优先级和调度的策略
	unsigned int			rt_priority; //实时的优先级

	struct sched_entity		se;    //被调度的实体
	struct sched_rt_entity		rt;     //实时进程的调用实体
	struct sched_dl_entity		dl;
	const struct sched_class	*sched_class;

	struct rb_node			core_node;
	unsigned long			core_cookie;
	unsigned int			core_occupation;

	struct task_group		*sched_task_group; //任务组


#ifdef CONFIG_UCLAMP_TASK
	/*
	 * Clamp values requested for a scheduling entity.
	 * Must be updated with task_rq_lock() held.
	 */
	struct uclamp_se		uclamp_req[UCLAMP_CNT];
	/*
	 * Effective clamp values used for a scheduling entity.
	 * Must be updated with task_rq_lock() held.
	 */
	struct uclamp_se		uclamp[UCLAMP_CNT];
#endif

	struct sched_statistics         stats;

#ifdef CONFIG_PREEMPT_NOTIFIERS
	/* List of struct preempt_notifier: */
	struct hlist_head		preempt_notifiers;
#endif

#ifdef CONFIG_BLK_DEV_IO_TRACE
	unsigned int			btrace_seq;
#endif

	unsigned int			policy;    //调度策略
	int				nr_cpus_allowed;   
	const cpumask_t			*cpus_ptr;
	cpumask_t			*user_cpus_ptr;
	cpumask_t			cpus_mask;
	void				*migration_pending;
#ifdef CONFIG_SMP
	unsigned short			migration_disabled;
#endif
	unsigned short			migration_flags;

#ifdef CONFIG_PREEMPT_RCU
	int				rcu_read_lock_nesting;
	union rcu_special		rcu_read_unlock_special;
	struct list_head		rcu_node_entry;
	struct rcu_node			*rcu_blocked_node;
#endif /* #ifdef CONFIG_PREEMPT_RCU */

#ifdef CONFIG_TASKS_RCU
	unsigned long			rcu_tasks_nvcsw;
	u8				rcu_tasks_holdout;
	u8				rcu_tasks_idx;
	int				rcu_tasks_idle_cpu;
	struct list_head		rcu_tasks_holdout_list;
#endif /* #ifdef CONFIG_TASKS_RCU */

#ifdef CONFIG_TASKS_TRACE_RCU
	int				trc_reader_nesting;
	int				trc_ipi_to_cpu;
	union rcu_special		trc_reader_special;
	struct list_head		trc_holdout_list;
	struct list_head		trc_blkd_node;
	int				trc_blkd_cpu;
#endif /* #ifdef CONFIG_TASKS_TRACE_RCU */

	struct sched_info		sched_info;

	struct list_head		tasks;  //任务队列队头
#ifdef CONFIG_SMP
	struct plist_node		pushable_tasks;
	struct rb_node			pushable_dl_tasks;
#endif

	struct mm_struct		*mm;   //用户态内存描述符
	struct mm_struct		*active_mm;  //进程运行时指向的内存描述符

	/* Per-thread vma caching: */
	struct vmacache			vmacache;

#ifdef SPLIT_RSS_COUNTING
	struct task_rss_stat		rss_stat;
#endif
	int				exit_state;   
	int				exit_code;    //设置进程的终止代号
	int				exit_signal;//当线程组最后一个成员终止时，产生一个信号，通知线程组领头进程的父进程
	/* The signal sent when the parent dies: */
	int				pdeath_signal;   //父进程终止时发送信号
	/* JOBCTL_*, siglock protected: */
	unsigned long			jobctl;

	/* Used for emulating ABI behavior of previous Linux versions: */
	unsigned int			personality;  

	/* Scheduler bits, serialized by scheduler locks: */
	unsigned			sched_reset_on_fork:1;
	unsigned			sched_contributes_to_load:1;
	unsigned			sched_migrated:1;
#ifdef CONFIG_PSI
	unsigned			sched_psi_wake_requeue:1;
#endif

	/* Force alignment to the next boundary: */
	unsigned			:0;

	/* Unserialized, strictly &#39;current&#39; */

	/*
	 * This field must not be in the scheduler word above due to wakelist
	 * queueing no longer being serialized by p-&gt;on_cpu. However:
	 *
	 * p-&gt;XXX = X;			ttwu()
	 * schedule()			  if (p-&gt;on_rq &amp;&amp; ..) // false
	 *   smp_mb__after_spinlock();	  if (smp_load_acquire(&amp;p-&gt;on_cpu) &amp;&amp; //true
	 *   deactivate_task()		      ttwu_queue_wakelist())
	 *     p-&gt;on_rq = 0;			p-&gt;sched_remote_wakeup = Y;
	 *
	 * guarantees all stores of &#39;current&#39; are visible before
	 * -&gt;sched_remote_wakeup gets used, so it can be in this word.
	 */
	unsigned			sched_remote_wakeup:1;

	/* Bit to tell LSMs we&#39;re in execve(): */
	unsigned			in_execve:1;
	unsigned			in_iowait:1;
#ifndef TIF_RESTORE_SIGMASK
	unsigned			restore_sigmask:1;
#endif
#ifdef CONFIG_MEMCG
	unsigned			in_user_fault:1;
#endif
#ifdef CONFIG_COMPAT_BRK
	unsigned			brk_randomized:1;
#endif
#ifdef CONFIG_CGROUPS
	/* disallow userland-initiated cgroup migration */
	unsigned			no_cgroup_migration:1;
	/* task is frozen/stopped (used by the cgroup freezer) */
	unsigned			frozen:1;
#endif
#ifdef CONFIG_BLK_CGROUP
	unsigned			use_memdelay:1;
#endif
#ifdef CONFIG_PSI
	/* Stalled due to lack of memory */
	unsigned			in_memstall:1;
#endif
#ifdef CONFIG_PAGE_OWNER
	/* Used by page_owner=on to detect recursion in page tracking. */
	unsigned			in_page_owner:1;
#endif
#ifdef CONFIG_EVENTFD
	/* Recursion prevention for eventfd_signal() */
	unsigned			in_eventfd_signal:1;
#endif
#ifdef CONFIG_IOMMU_SVA
	unsigned			pasid_activated:1;
#endif
#ifdef	CONFIG_CPU_SUP_INTEL
	unsigned			reported_split_lock:1;
#endif

	unsigned long			atomic_flags; /* Flags requiring atomic access. */

	struct restart_block		restart_block;

	pid_t				pid;  //唯一进程标识符
	pid_t				tgid;  //线程组ID，同一进程的线程tgid相同

#ifdef CONFIG_STACKPROTECTOR
	/* Canary value for the -fstack-protector GCC feature: */
	unsigned long			stack_canary;
#endif
	/*
	 * Pointers to the (original) parent process, youngest child, younger sibling,
	 * older sibling, respectively.  (p-&gt;father can be replaced with
	 * p-&gt;real_parent-&gt;pid)
	 */

	/* Real parent process: */
	struct task_struct __rcu	*real_parent;    //指向父进程，如果父进程不存在指向初始进程

	/* Recipient of SIGCHLD, wait4() reports: */
	struct task_struct __rcu	*parent;   //指向父进程 子进程结束会给父进程发信号

	/*
	 * Children/sibling form the list of natural children:
	 */
	struct list_head		children;   //指向子进程的链表头部
	struct list_head		sibling;   //用于添加子进程
	struct task_struct		*group_leader;   //指向进程组的leader进程

	/*
	 * &#39;ptraced&#39; is the list of tasks this task is using ptrace() on.
	 *
	 * This includes both natural children and PTRACE_ATTACH targets.
	 * &#39;ptrace_entry&#39; is this task&#39;s link on the p-&gt;parent-&gt;ptraced list.
	 */
	struct list_head		ptraced;
	struct list_head		ptrace_entry;

	/* PID/PID hash table linkage. */
	struct pid			*thread_pid;
	struct hlist_node		pid_links[PIDTYPE_MAX];
	struct list_head		thread_group;
	struct list_head		thread_node;

	struct completion		*vfork_done;

	/* CLONE_CHILD_SETTID: */
	int __user			*set_child_tid;

	/* CLONE_CHILD_CLEARTID: */
	int __user			*clear_child_tid;

	/* PF_KTHREAD | PF_IO_WORKER */
	void				*worker_private;

	u64				utime; //记录在用户态经过的节拍数
	u64				stime;  //内核态经过的节拍数
#ifdef CONFIG_ARCH_HAS_SCALED_CPUTIME
	u64				utimescaled;   //用户态运行时间 以处理器频率为刻度
	u64				stimescaled;   //内核态运行时间
#endif
	u64				gtime;			//以节拍计数器虚拟机运行的时间
	struct prev_cputime		prev_cputime;
#ifdef CONFIG_VIRT_CPU_ACCOUNTING_GEN
	struct vtime			vtime;
#endif

#ifdef CONFIG_NO_HZ_FULL
	atomic_t			tick_dep_mask;
#endif
	/* Context switch counts: */
	unsigned long			nvcsw;   //自愿上下文切换计数
	unsigned long			nivcsw;  //非自愿上下文切换计数

	/* Monotonic time in nsecs: */
	u64				start_time;

	/* Boot based time in nsecs: */
	u64				start_boottime;

	/* MM fault and swap info: this can arguably be seen as either mm-specific or thread-specific: */
	unsigned long			min_flt;
	unsigned long			maj_flt;

	/* Empty if CONFIG_POSIX_CPUTIMERS=n */
	struct posix_cputimers		posix_cputimers;

#ifdef CONFIG_POSIX_CPU_TIMERS_TASK_WORK
	struct posix_cputimers_work	posix_cputimers_work;
#endif

	/* Process credentials: */

	/* Tracer&#39;s credentials at attach: */
	const struct cred __rcu		*ptracer_cred;

	/* Objective and real subjective task credentials (COW): */
	const struct cred __rcu		*real_cred;

	/* Effective (overridable) subjective task credentials (COW): */
	const struct cred __rcu		*cred;

#ifdef CONFIG_KEYS
	/* Cached requested key. */
	struct key			*cached_requested_key;
#endif

	/*
	 * executable name, excluding path.
	 *
	 * - normally initialized setup_new_exec()
	 * - access it with [gs]et_task_comm()
	 * - lock it with task_lock()
	 */
	char				comm[TASK_COMM_LEN];

	struct nameidata		*nameidata;

#ifdef CONFIG_SYSVIPC
	struct sysv_sem			sysvsem;   //用于进程通信
	struct sysv_shm			sysvshm;
#endif
#ifdef CONFIG_DETECT_HUNG_TASK
	unsigned long			last_switch_count;
	unsigned long			last_switch_time;
#endif
	/* Filesystem information: */ 文件系统信息
	struct fs_struct		*fs;

	/* Open file information: */ 打开文件的管理器
	struct file_struct		*files;

#ifdef CONFIG_IO_URING
	struct io_uring_task		*io_uring;
#endif

	/* Namespaces: */ 命名空间
	struct nsproxy			*nsproxy;

	/* Signal handlers: */ 信号处理单元
	struct signal_struct		*signal;  //指向进程的信号描述符
	struct sighand_struct __rcu		*sighand;  //指向进程的信号处理程序的描述符
	sigset_t			blocked;     //被阻塞信号的掩码
	sigset_t			real_blocked;  
	/* Restored if set_restore_sigmask() was used: */
	sigset_t			saved_sigmask;
	struct sigpending		pending;   //存放私有挂起信号的数据结构
	unsigned long			sas_ss_sp;
	size_t				sas_ss_size;
	unsigned int			sas_ss_flags;

	struct callback_head		*task_works;

#ifdef CONFIG_AUDIT
#ifdef CONFIG_AUDITSYSCALL
	struct audit_context		*audit_context;
#endif
	kuid_t				loginuid;
	unsigned int			sessionid;
#endif
	struct seccomp			seccomp;
	
	struct syscall_user_dispatch	syscall_dispatch;

	/* Thread group tracking: */
	u64				parent_exec_id;
	u64				self_exec_id;

	/* Protection against (de-)allocation: mm, files, fs, tty, keyrings, mems_allowed, mempolicy: */
	spinlock_t			alloc_lock;

	/* Protection of the PI data structures: */
	raw_spinlock_t			pi_lock;

	struct wake_q_node		wake_q;

#ifdef CONFIG_RT_MUTEXES
	/* PI waiters blocked on a rt_mutex held by this task: */
	struct rb_root_cached		pi_waiters;
	/* Updated under owner&#39;s pi_lock and rq lock */
	struct task_struct		*pi_top_task;
	/* Deadlock detection and priority inheritance handling: */
	struct rt_mutex_waiter		*pi_blocked_on;
#endif

#ifdef CONFIG_DEBUG_MUTEXES
	/* Mutex deadlock detection: */
	struct mutex_waiter		*blocked_on;
#endif

#ifdef CONFIG_DEBUG_ATOMIC_SLEEP
	int				non_block_count;
#endif

#ifdef CONFIG_TRACE_IRQFLAGS
	struct irqtrace_events		irqtrace;
	unsigned int			hardirq_threaded;
	u64				hardirq_chain_key;
	int				softirqs_enabled;
	int				softirq_context;
	int				irq_config;
#endif
#ifdef CONFIG_PREEMPT_RT
	int				softirq_disable_cnt;
#endif

#ifdef CONFIG_LOCKDEP
# define MAX_LOCK_DEPTH			48UL
	u64				curr_chain_key;
	int				lockdep_depth;
	unsigned int			lockdep_recursion;
	struct held_lock		held_locks[MAX_LOCK_DEPTH];
#endif

#if defined(CONFIG_UBSAN) &amp;&amp; !defined(CONFIG_UBSAN_TRAP)
	unsigned int			in_ubsan;
#endif

	/* Journalling filesystem info: */
	void				*journal_info;

	/* Stacked block device info: */
	struct bio_list			*bio_list;

	/* Stack plugging: */
	struct blk_plug			*plug;

	/* VM state: */
	struct reclaim_state		*reclaim_state;

	struct backing_dev_info		*backing_dev_info;

	struct io_context		*io_context;

#ifdef CONFIG_COMPACTION
	struct capture_control		*capture_control;
#endif
	/* Ptrace state: */
	unsigned long			ptrace_message;
	kernel_siginfo_t		*last_siginfo;

	struct task_io_accounting	ioac;
#ifdef CONFIG_PSI
	/* Pressure stall state */
	unsigned int			psi_flags;
#endif
#ifdef CONFIG_TASK_XACCT
	/* Accumulated RSS usage: */
	u64				acct_rss_mem1;
	/* Accumulated virtual memory usage: */
	u64				acct_vm_mem1;
	/* stime + utime since last update: */
	u64				acct_timexpd;
#endif
#ifdef CONFIG_CPUSETS
	/* Protected by -&gt;alloc_lock: */
	nodemask_t			mems_allowed;
	/* Sequence number to catch updates: */
	seqcount_spinlock_t		mems_allowed_seq;
	int				cpuset_mem_spread_rotor;
	int				cpuset_slab_spread_rotor;
#endif
#ifdef CONFIG_CGROUPS
	/* Control Group info protected by css_set_lock: */
	struct css_set __rcu		*cgroups;
	/* cg_list protected by css_set_lock and tsk-&gt;alloc_lock: */
	struct list_head		cg_list;
#endif
#ifdef CONFIG_X86_CPU_RESCTRL
	u32				closid;
	u32				rmid;
#endif
#ifdef CONFIG_FUTEX
	struct robust_list_head __user	*robust_list;
#ifdef CONFIG_COMPAT
	struct compat_robust_list_head __user *compat_robust_list;
#endif
	struct list_head		pi_state_list;
	struct futex_pi_state		*pi_state_cache;
	struct mutex			futex_exit_mutex;
	unsigned int			futex_state;
#endif
#ifdef CONFIG_PERF_EVENTS
	struct perf_event_context	*perf_event_ctxp[perf_nr_task_contexts];
	struct mutex			perf_event_mutex;
	struct list_head		perf_event_list;
#endif
#ifdef CONFIG_DEBUG_PREEMPT
	unsigned long			preempt_disable_ip;
#endif
#ifdef CONFIG_NUMA
	/* Protected by alloc_lock: */
	struct mempolicy		*mempolicy;
	short				il_prev;
	short				pref_node_fork;
#endif
#ifdef CONFIG_NUMA_BALANCING
	int				numa_scan_seq;
	unsigned int			numa_scan_period;
	unsigned int			numa_scan_period_max;
	int				numa_preferred_nid;
	unsigned long			numa_migrate_retry;
	/* Migration stamp: */
	u64				node_stamp;
	u64				last_task_numa_placement;
	u64				last_sum_exec_runtime;
	struct callback_head		numa_work;

	/*
	 * This pointer is only modified for current in syscall and
	 * pagefault context (and for tasks being destroyed), so it can be read
	 * from any of the following contexts:
	 *  - RCU read-side critical section
	 *  - current-&gt;numa_group from everywhere
	 *  - task&#39;s runqueue locked, task not running
	 */
	struct numa_group __rcu		*numa_group;

	/*
	 * numa_faults is an array split into four regions:
	 * faults_memory, faults_cpu, faults_memory_buffer, faults_cpu_buffer
	 * in this precise order.
	 *
	 * faults_memory: Exponential decaying average of faults on a per-node
	 * basis. Scheduling placement decisions are made based on these
	 * counts. The values remain static for the duration of a PTE scan.
	 * faults_cpu: Track the nodes the process was running on when a NUMA
	 * hinting fault was incurred.
	 * faults_memory_buffer and faults_cpu_buffer: Record faults per node
	 * during the current scan window. When the scan completes, the counts
	 * in faults_memory and faults_cpu decay and these values are copied.
	 */
	unsigned long			*numa_faults;
	unsigned long			total_numa_faults;

	/*
	 * numa_faults_locality tracks if faults recorded during the last
	 * scan window were remote/local or failed to migrate. The task scan
	 * period is adapted based on the locality of the faults with different
	 * weights depending on whether they were shared or private faults
	 */
	unsigned long			numa_faults_locality[3];

	unsigned long			numa_pages_migrated;
#endif /* CONFIG_NUMA_BALANCING */

#ifdef CONFIG_RSEQ
	struct rseq __user *rseq;
	u32 rseq_sig;
	/*
	 * RmW on rseq_event_mask must be performed atomically
	 * with respect to preemption.
	 */
	unsigned long rseq_event_mask;
#endif

	struct tlbflush_unmap_batch	tlb_ubc;

	union {
		refcount_t		rcu_users;
		struct rcu_head		rcu;
	};

	/* Cache last used pipe for splice(): */
	struct pipe_inode_info		*splice_pipe;

	struct page_frag		task_frag;

#ifdef CONFIG_TASK_DELAY_ACCT
	struct task_delay_info		*delays;
#endif

#ifdef CONFIG_FAULT_INJECTION
	int				make_it_fail;
	unsigned int			fail_nth;
#endif
	/*
	 * When (nr_dirtied &gt;= nr_dirtied_pause), it&#39;s time to call
	 * balance_dirty_pages() for a dirty throttling pause:
	 */
	int				nr_dirtied;
	int				nr_dirtied_pause;
	/* Start of a write-and-pause period: */
	unsigned long			dirty_paused_when;

#ifdef CONFIG_LATENCYTOP
	int				latency_record_count;
	struct latency_record		latency_record[LT_SAVECOUNT];
#endif
	/*
	 * Time slack values; these are used to round up poll() and
	 * select() etc timeout values. These are in nanoseconds.
	 */
	u64				timer_slack_ns;
	u64				default_timer_slack_ns;

#if defined(CONFIG_KASAN_GENERIC) || defined(CONFIG_KASAN_SW_TAGS)
	unsigned int			kasan_depth;
#endif

#ifdef CONFIG_KCSAN
	struct kcsan_ctx		kcsan_ctx;
#ifdef CONFIG_TRACE_IRQFLAGS
	struct irqtrace_events		kcsan_save_irqtrace;
#endif
#ifdef CONFIG_KCSAN_WEAK_MEMORY
	int				kcsan_stack_depth;
#endif
#endif

#if IS_ENABLED(CONFIG_KUNIT)
	struct kunit			*kunit_test;
#endif

#ifdef CONFIG_FUNCTION_GRAPH_TRACER
	/* Index of current stored address in ret_stack: */
	int				curr_ret_stack;
	int				curr_ret_depth;

	/* Stack of return addresses for return function tracing: */
	struct ftrace_ret_stack		*ret_stack;

	/* Timestamp for last schedule: */
	unsigned long long		ftrace_timestamp;

	/*
	 * Number of functions that haven&#39;t been traced
	 * because of depth overrun:
	 */
	atomic_t			trace_overrun;

	/* Pause tracing: */
	atomic_t			tracing_graph_pause;
#endif

#ifdef CONFIG_TRACING
	/* State flags for use by tracers: */
	unsigned long			trace;

	/* Bitmask and counter of trace recursion: */
	unsigned long			trace_recursion;
#endif /* CONFIG_TRACING */

#ifdef CONFIG_KCOV
	/* See kernel/kcov.c for more details. */

	/* Coverage collection mode enabled for this task (0 if disabled): */
	unsigned int			kcov_mode;

	/* Size of the kcov_area: */
	unsigned int			kcov_size;

	/* Buffer for coverage collection: */
	void				*kcov_area;

	/* KCOV descriptor wired with this task or NULL: */
	struct kcov			*kcov;

	/* KCOV common handle for remote coverage collection: */
	u64				kcov_handle;

	/* KCOV sequence number: */
	int				kcov_sequence;

	/* Collect coverage from softirq context: */
	unsigned int			kcov_softirq;
#endif

#ifdef CONFIG_MEMCG
	struct mem_cgroup		*memcg_in_oom;
	gfp_t				memcg_oom_gfp_mask;
	int				memcg_oom_order;

	/* Number of pages to reclaim on returning to userland: */
	unsigned int			memcg_nr_pages_over_high;

	/* Used by memcontrol for targeted memcg charge: */
	struct mem_cgroup		*active_memcg;
#endif

#ifdef CONFIG_BLK_CGROUP
	struct request_queue		*throttle_queue;
#endif

#ifdef CONFIG_UPROBES
	struct uprobe_task		*utask;
#endif
#if defined(CONFIG_BCACHE) || defined(CONFIG_BCACHE_MODULE)
	unsigned int			sequential_io;
	unsigned int			sequential_io_avg;
#endif
	struct kmap_ctrl		kmap_ctrl;
#ifdef CONFIG_DEBUG_ATOMIC_SLEEP
	unsigned long			task_state_change;
# ifdef CONFIG_PREEMPT_RT
	unsigned long			saved_state_change;
# endif
#endif
	int				pagefault_disabled;
#ifdef CONFIG_MMU
	struct task_struct		*oom_reaper_list;
	struct timer_list		oom_reaper_timer;
#endif
#ifdef CONFIG_VMAP_STACK
	struct vm_struct		*stack_vm_area;
#endif
#ifdef CONFIG_THREAD_INFO_IN_TASK
	/* A live task holds one reference: */
	refcount_t			stack_refcount;
#endif
#ifdef CONFIG_LIVEPATCH
	int patch_state;
#endif
#ifdef CONFIG_SECURITY
	/* Used by LSM modules for access restriction: */
	void				*security;
#endif
#ifdef CONFIG_BPF_SYSCALL
	/* Used by BPF task local storage */
	struct bpf_local_storage __rcu	*bpf_storage;
	/* Used for BPF run context */
	struct bpf_run_ctx		*bpf_ctx;
#endif

#ifdef CONFIG_GCC_PLUGIN_STACKLEAK
	unsigned long			lowest_stack;
	unsigned long			prev_lowest_stack;
#endif

#ifdef CONFIG_X86_MCE
	void __user			*mce_vaddr;
	__u64				mce_kflags;
	u64				mce_addr;
	__u64				mce_ripv : 1,
					mce_whole_page : 1,
					__mce_reserved : 62;
	struct callback_head		mce_kill_me;
	int				mce_count;
#endif

#ifdef CONFIG_KRETPROBES
	struct llist_head               kretprobe_instances;
#endif
#ifdef CONFIG_RETHOOK
	struct llist_head               rethooks;
#endif

#ifdef CONFIG_ARCH_HAS_PARANOID_L1D_FLUSH
	/*
	 * If L1D flush is supported on mm context switch
	 * then we use this callback head to queue kill work
	 * to kill tasks that are not running on SMT disabled
	 * cores
	 */
	struct callback_head		l1d_flush_kill;
#endif

#ifdef CONFIG_RV
	/*
	 * Per-task RV monitor. Nowadays fixed in RV_PER_TASK_MONITORS.
	 * If we find justification for more monitors, we can think
	 * about adding more or developing a dynamic method. So far,
	 * none of these are justified.
	 */
	union rv_task_monitor		rv[RV_PER_TASK_MONITORS];
#endif

	/*
	 * New fields for task_struct should be added above here, so that
	 * they are included in the randomized portion of task_struct.
	 */
	randomized_struct_fields_end

	/* CPU-specific state of this task: */
	struct thread_struct		thread;

	/*
	 * WARNING: on x86, &#39;thread_struct&#39; contains a variable-sized
	 * structure.  It *MUST* be at the end of &#39;task_struct&#39;.
	 *
	 * Do not put anything below here!
	 */
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,321),d=[a];function c(r,u){return i(),e("div",null,d)}const o=n(l,[["render",c],["__file","process.html.vue"]]);export{o as default};

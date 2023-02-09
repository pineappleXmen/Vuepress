<template><div><h1 id="chapter-17-threads-and-locks" tabindex="-1"><a class="header-anchor" href="#chapter-17-threads-and-locks" aria-hidden="true">#</a> Chapter 17. Threads and Locks</h1>
<p>While most of the discussion in the preceding chapters is concerned only with the behavior of code as executed a single statement or expression at a time, that is, by a single <em>thread</em>, the Java Virtual Machine can support many threads of execution at once. These threads independently execute code that operates on values and objects residing in a shared main memory. Threads may be supported by having many hardware processors, by time-slicing a single hardware processor, or by time-slicing many hardware processors.</p>
<p>Threads are represented by the <code v-pre>Thread</code> class. The only way for a user to create a thread is to create an object of this class; each thread is associated with such an object. A thread will start when the <code v-pre>start()</code> method is invoked on the corresponding <code v-pre>Thread</code> object.</p>
<p>The behavior of threads, particularly when not correctly synchronized, can be confusing and counterintuitive. This chapter describes the semantics of multithreaded programs; it includes rules for which values may be seen by a read of shared memory that is updated by multiple threads. As the specification is similar to the <em>memory models</em> for different hardware architectures, these semantics are known as the <em>Java programming language memory model</em>. When no confusion can arise, we will simply refer to these rules as &quot;the memory model&quot;.</p>
<p>These semantics do not prescribe how a multithreaded program should be executed. Rather, they describe the behaviors that multithreaded programs are allowed to exhibit. Any execution strategy that generates only allowed behaviors is an acceptable execution strategy.</p>
<h2 id="_17-1-synchronization" tabindex="-1"><a class="header-anchor" href="#_17-1-synchronization" aria-hidden="true">#</a> 17.1. Synchronization</h2>
<p>The Java programming language provides multiple mechanisms for communicating between threads. The most basic of these methods is <em>synchronization</em>, which is implemented using <em>monitors</em>. Each object in Java is associated with a monitor, which a thread can <em>lock</em> or <em>unlock</em>. Only one thread at a time may hold a lock on a monitor. Any other threads attempting to lock that monitor are blocked until they can obtain a lock on that monitor. A thread <em>t</em> may lock a particular monitor multiple times; each unlock reverses the effect of one lock operation.</p>
<p>The <code v-pre>synchronized</code> statement (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html#jls-14.19" target="_blank" rel="noopener noreferrer">§14.19<ExternalLinkIcon/></a>) computes a reference to an object; it then attempts to perform a lock action on that object's monitor and does not proceed further until the lock action has successfully completed. After the lock action has been performed, the body of the <code v-pre>synchronized</code> statement is executed. If execution of the body is ever completed, either normally or abruptly, an unlock action is automatically performed on that same monitor.</p>
<p>A <code v-pre>synchronized</code> method (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.4.3.6" target="_blank" rel="noopener noreferrer">§8.4.3.6<ExternalLinkIcon/></a>) automatically performs a lock action when it is invoked; its body is not executed until the lock action has successfully completed. If the method is an instance method, it locks the monitor associated with the instance for which it was invoked (that is, the object that will be known as <code v-pre>this</code> during execution of the body of the method). If the method is <code v-pre>static</code>, it locks the monitor associated with the <code v-pre>Class</code> object that represents the class in which the method is defined. If execution of the method's body is ever completed, either normally or abruptly, an unlock action is automatically performed on that same monitor.</p>
<p>The Java programming language neither prevents nor requires detection of deadlock conditions. Programs where threads hold (directly or indirectly) locks on multiple objects should use conventional techniques for deadlock avoidance, creating higher-level locking primitives that do not deadlock, if necessary.</p>
<p>Other mechanisms, such as reads and writes of <code v-pre>volatile</code> variables and the use of classes in the <code v-pre>java.util.concurrent</code> package, provide alternative ways of synchronization.</p>
<h2 id="_17-2-wait-sets-and-notification" tabindex="-1"><a class="header-anchor" href="#_17-2-wait-sets-and-notification" aria-hidden="true">#</a> 17.2. Wait Sets and Notification</h2>
<p>Every object, in addition to having an associated monitor, has an associated <em>wait set</em>. A wait set is a set of threads.</p>
<p>When an object is first created, its wait set is empty. Elementary actions that add threads to and remove threads from wait sets are atomic. Wait sets are manipulated solely through the methods <code v-pre>Object``.``wait</code>, <code v-pre>Object``.``notify</code>, and <code v-pre>Object``.``notifyAll</code>.</p>
<p>Wait set manipulations can also be affected by the interruption status of a thread, and by the <code v-pre>Thread</code> class's methods dealing with interruption. Additionally, the <code v-pre>Thread</code> class's methods for sleeping and joining other threads have properties derived from those of wait and notification actions.</p>
<h3 id="_17-2-1-wait" tabindex="-1"><a class="header-anchor" href="#_17-2-1-wait" aria-hidden="true">#</a> 17.2.1. Wait</h3>
<p><em>Wait actions</em> occur upon invocation of <code v-pre>wait()</code>, or the timed forms <code v-pre>wait(long millisecs)</code> and <code v-pre>wait(long millisecs, int nanosecs)</code>.</p>
<p>A call of <code v-pre>wait(long millisecs)</code> with a parameter of zero, or a call of <code v-pre>wait(long millisecs, int nanosecs)</code> with two zero parameters, is equivalent to an invocation of <code v-pre>wait()</code>.</p>
<p>A thread <em>returns normally</em> from a wait if it returns without throwing an <code v-pre>InterruptedException</code>.</p>
<p>Let thread <em>t</em> be the thread executing the <code v-pre>wait</code> method on object <em>m</em>, and let <em>n</em> be the number of lock actions by <em>t</em> on <em>m</em> that have not been matched by unlock actions. One of the following actions occurs:</p>
<ul>
<li>
<p>If <em>n</em> is zero (i.e., thread <em>t</em> does not already possess the lock for target <em>m</em>), then an <code v-pre>IllegalMonitorStateException</code> is thrown.</p>
</li>
<li>
<p>If this is a timed wait and the <code v-pre>nanosecs</code> argument is not in the range of <code v-pre>0-999999</code> or the <code v-pre>millisecs</code> argument is negative, then an <code v-pre>IllegalArgumentException</code> is thrown.</p>
</li>
<li>
<p>If thread <em>t</em> is interrupted, then an <code v-pre>InterruptedException</code> is thrown and <em>t</em>'s interruption status is set to false.</p>
</li>
<li>
<p>Otherwise, the following sequence occurs:</p>
<ol>
<li>
<p>Thread <em>t</em> is added to the wait set of object <em>m</em>, and performs <em>n</em> unlock actions on <em>m</em>.</p>
</li>
<li>
<p>Thread <em>t</em> does not execute any further instructions until it has been removed from <em>m</em>'s wait set. The thread may be removed from the wait set due to any one of the following actions, and will resume sometime afterward:</p>
<ul>
<li>
<p>A <code v-pre>notify</code> action being performed on <em>m</em> in which <em>t</em> is selected for removal from the wait set.</p>
</li>
<li>
<p>A <code v-pre>notifyAll</code> action being performed on <em>m</em>.</p>
</li>
<li>
<p>An <code v-pre>interrupt</code> action being performed on <em>t</em>.</p>
</li>
<li>
<p>If this is a timed wait, an internal action removing <em>t</em> from <em>m</em>'s wait set that occurs after at least <code v-pre>millisecs</code> milliseconds plus <code v-pre>nanosecs</code> nanoseconds elapse since the beginning of this wait action.</p>
</li>
<li>
<p>An internal action by the implementation. Implementations are permitted, although not encouraged, to perform &quot;spurious wake-ups&quot;, that is, to remove threads from wait sets and thus enable resumption without explicit instructions to do so.</p>
<p>Notice that this provision necessitates the Java coding practice of using <code v-pre>wait</code> only within loops that terminate only when some logical condition that the thread is waiting for holds.</p>
</li>
</ul>
<p>Each thread must determine an order over the events that could cause it to be removed from a wait set. That order does not have to be consistent with other orderings, but the thread must behave as though those events occurred in that order.</p>
<p>For example, if a thread <em>t</em> is in the wait set for <em>m</em>, and then both an interrupt of <em>t</em> and a notification of <em>m</em> occur, there must be an order over these events. If the interrupt is deemed to have occurred first, then <em>t</em> will eventually return from <code v-pre>wait</code> by throwing <code v-pre>InterruptedException</code>, and some other thread in the wait set for <em>m</em> (if any exist at the time of the notification) must receive the notification. If the notification is deemed to have occurred first, then <em>t</em> will eventually return normally from <code v-pre>wait</code> with an interrupt still pending.</p>
</li>
<li>
<p>Thread <em>t</em> performs <em>n</em> lock actions on <em>m</em>.</p>
</li>
<li>
<p>If thread <em>t</em> was removed from <em>m</em>'s wait set in step 2 due to an interrupt, then <em>t</em>'s interruption status is set to false and the <code v-pre>wait</code> method throws <code v-pre>InterruptedException</code>.</p>
</li>
</ol>
</li>
</ul>
<h3 id="_17-2-2-notification" tabindex="-1"><a class="header-anchor" href="#_17-2-2-notification" aria-hidden="true">#</a> 17.2.2. Notification</h3>
<p>Notification actions occur upon invocation of methods <code v-pre>notify</code> and <code v-pre>notifyAll</code>.</p>
<p>Let thread <em>t</em> be the thread executing either of these methods on object <em>m</em>, and let <em>n</em> be the number of lock actions by <em>t</em> on <em>m</em> that have not been matched by unlock actions. One of the following actions occurs:</p>
<ul>
<li>
<p>If <em>n</em> is zero, then an <code v-pre>IllegalMonitorStateException</code> is thrown.</p>
<p>This is the case where thread <em>t</em> does not already possess the lock for target <em>m</em>.</p>
</li>
<li>
<p>If <em>n</em> is greater than zero and this is a <code v-pre>notify</code> action, then if <em>m</em>'s wait set is not empty, a thread <em>u</em> that is a member of <em>m</em>'s current wait set is selected and removed from the wait set.</p>
<p>There is no guarantee about which thread in the wait set is selected. This removal from the wait set enables <em>u</em>'s resumption in a wait action. Notice, however, that <em>u</em>'s lock actions upon resumption cannot succeed until some time after <em>t</em> fully unlocks the monitor for <em>m</em>.</p>
</li>
<li>
<p>If <em>n</em> is greater than zero and this is a <code v-pre>notifyAll</code> action, then all threads are removed from <em>m</em>'s wait set, and thus resume.</p>
<p>Notice, however, that only one of them at a time will lock the monitor required during the resumption of wait.</p>
</li>
</ul>
<h3 id="_17-2-3-interruptions" tabindex="-1"><a class="header-anchor" href="#_17-2-3-interruptions" aria-hidden="true">#</a> 17.2.3. Interruptions</h3>
<p>Interruption actions occur upon invocation of <code v-pre>Thread.interrupt</code>, as well as methods defined to invoke it in turn, such as <code v-pre>ThreadGroup.interrupt</code>.</p>
<p>Let <em>t</em> be the thread invoking <em>u</em><code v-pre>.interrupt</code>, for some thread <em>u</em>, where <em>t</em> and <em>u</em> may be the same. This action causes <em>u</em>'s interruption status to be set to true.</p>
<p>Additionally, if there exists some object <em>m</em> whose wait set contains <em>u</em>, then <em>u</em> is removed from <em>m</em>'s wait set. This enables <em>u</em> to resume in a wait action, in which case this wait will, after re-locking <em>m</em>'s monitor, throw <code v-pre>InterruptedException</code>.</p>
<p>Invocations of <code v-pre>Thread.isInterrupted</code> can determine a thread's interruption status. The <code v-pre>static</code> method <code v-pre>Thread.interrupted</code> may be invoked by a thread to observe and clear its own interruption status.</p>
<h3 id="_17-2-4-interactions-of-waits-notification-and-interruption" tabindex="-1"><a class="header-anchor" href="#_17-2-4-interactions-of-waits-notification-and-interruption" aria-hidden="true">#</a> 17.2.4. Interactions of Waits, Notification, and Interruption</h3>
<p>The above specifications allow us to determine several properties having to do with the interaction of waits, notification, and interruption.</p>
<p>If a thread is both notified and interrupted while waiting, it may either:</p>
<ul>
<li>return normally from <code v-pre>wait</code>, while still having a pending interrupt (in other words, a call to <code v-pre>Thread.interrupted</code> would return true)</li>
<li>return from <code v-pre>wait</code> by throwing an <code v-pre>InterruptedException</code></li>
</ul>
<p>The thread may not reset its interrupt status and return normally from the call to <code v-pre>wait</code>.</p>
<p>Similarly, notifications cannot be lost due to interrupts. Assume that a set <em>s</em> of threads is in the wait set of an object <em>m</em>, and another thread performs a <code v-pre>notify</code> on <em>m</em>. Then either:</p>
<ul>
<li>at least one thread in <em>s</em> must return normally from <code v-pre>wait</code>, or</li>
<li>all of the threads in <em>s</em> must exit <code v-pre>wait</code> by throwing <code v-pre>InterruptedException</code>.</li>
</ul>
<p>Note that if a thread is both interrupted and woken via <code v-pre>notify</code>, and that thread returns from <code v-pre>wait</code> by throwing an <code v-pre>InterruptedException</code>, then some other thread in the wait set must be notified.</p>
<h2 id="_17-3-sleep-and-yield" tabindex="-1"><a class="header-anchor" href="#_17-3-sleep-and-yield" aria-hidden="true">#</a> 17.3. Sleep and Yield</h2>
<p><code v-pre>Thread.sleep</code> causes the currently executing thread to sleep (temporarily cease execution) for the specified duration, subject to the precision and accuracy of system timers and schedulers. The thread does not lose ownership of any monitors, and resumption of execution will depend on scheduling and the availability of processors on which to execute the thread.</p>
<p>It is important to note that neither <code v-pre>Thread.sleep</code> nor <code v-pre>Thread.yield</code> have any synchronization semantics. In particular, the compiler does not have to flush writes cached in registers out to shared memory before a call to <code v-pre>Thread.sleep</code> or <code v-pre>Thread.yield</code>, nor does the compiler have to reload values cached in registers after a call to <code v-pre>Thread.sleep</code> or <code v-pre>Thread.yield</code>.</p>
<p>For example, in the following (broken) code fragment, assume that <code v-pre>this.done</code> is a non-<code v-pre>volatile boolean</code> field:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>while (!this.done)
    Thread.sleep(1000);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>The compiler is free to read the field <code v-pre>this.done</code> just once, and reuse the cached value in each execution of the loop. This would mean that the loop would never terminate, even if another thread changed the value of <code v-pre>this.done</code>.</p>
<h2 id="_17-4-memory-model" tabindex="-1"><a class="header-anchor" href="#_17-4-memory-model" aria-hidden="true">#</a> 17.4. Memory Model</h2>
<p>A <em>memory model</em> describes, given a program and an execution trace of that program, whether the execution trace is a legal execution of the program. The Java programming language memory model works by examining each read in an execution trace and checking that the write observed by that read is valid according to certain rules.</p>
<p>The memory model describes possible behaviors of a program. An implementation is free to produce any code it likes, as long as all resulting executions of a program produce a result that can be predicted by the memory model.</p>
<p>This provides a great deal of freedom for the implementor to perform a myriad of code transformations, including the reordering of actions and removal of unnecessary synchronization.</p>
<p><strong>Example 17.4-1. Incorrectly Synchronized Programs May Exhibit Surprising Behavior</strong></p>
<p>The semantics of the Java programming language allow compilers and microprocessors to perform optimizations that can interact with incorrectly synchronized code in ways that can produce behaviors that seem paradoxical. Here are some examples of how incorrectly synchronized programs may exhibit surprising behaviors.</p>
<p>Consider, for example, the example program traces shown in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4-A" target="_blank" rel="noopener noreferrer">Table 17.4-A<ExternalLinkIcon/></a>. This program uses local variables <code v-pre>r1</code> and <code v-pre>r2</code> and shared variables <code v-pre>A</code> and <code v-pre>B</code>. Initially, <code v-pre>A == B == 0</code>.</p>
<p><strong>Table 17.4-A. Surprising results caused by statement reordering - original code</strong></p>
<table>
<thead>
<tr>
<th>Thread 1</th>
<th>Thread 2</th>
</tr>
</thead>
<tbody>
<tr>
<td>1: <code v-pre>r2 = A;</code></td>
<td>3: <code v-pre>r1 = B;</code></td>
</tr>
<tr>
<td>2: <code v-pre>B = 1;</code></td>
<td>4: <code v-pre>A = 2;</code></td>
</tr>
</tbody>
</table>
<p>It may appear that the result <code v-pre>r2 == 2</code> and <code v-pre>r1 == 1</code> is impossible. Intuitively, either instruction 1 or instruction 3 should come first in an execution. If instruction 1 comes first, it should not be able to see the write at instruction 4. If instruction 3 comes first, it should not be able to see the write at instruction 2.</p>
<p>If some execution exhibited this behavior, then we would know that instruction 4 came before instruction 1, which came before instruction 2, which came before instruction 3, which came before instruction 4. This is, on the face of it, absurd.</p>
<p>However, compilers are allowed to reorder the instructions in either thread, when this does not affect the execution of that thread in isolation. If instruction 1 is reordered with instruction 2, as shown in the trace in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4-B" target="_blank" rel="noopener noreferrer">Table 17.4-B<ExternalLinkIcon/></a>, then it is easy to see how the result <code v-pre>r2 == 2</code> and <code v-pre>r1 == 1</code> might occur.</p>
<p><strong>Table 17.4-B. Surprising results caused by statement reordering - valid compiler transformation</strong></p>
<table>
<thead>
<tr>
<th>Thread 1</th>
<th>Thread 2</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>B = 1;</code></td>
<td><code v-pre>r1 = B;</code></td>
</tr>
<tr>
<td><code v-pre>r2 = A;</code></td>
<td><code v-pre>A = 2;</code></td>
</tr>
</tbody>
</table>
<p>To some programmers, this behavior may seem &quot;broken&quot;. However, it should be noted that this code is improperly synchronized:</p>
<ul>
<li>there is a write in one thread,</li>
<li>a read of the same variable by another thread,</li>
<li>and the write and read are not ordered by synchronization.</li>
</ul>
<p>This situation is an example of a <em>data race</em> (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.5" target="_blank" rel="noopener noreferrer">§17.4.5<ExternalLinkIcon/></a>). When code contains a data race, counterintuitive results are often possible.</p>
<p>Several mechanisms can produce the reordering in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4-B" target="_blank" rel="noopener noreferrer">Table 17.4-B<ExternalLinkIcon/></a>. A Just-In-Time compiler in a Java Virtual Machine implementation may rearrange code, or the processor. In addition, the memory hierarchy of the architecture on which a Java Virtual Machine implementation is run may make it appear as if code is being reordered. In this chapter, we shall refer to anything that can reorder code as a <em>compiler</em>.</p>
<p>Another example of surprising results can be seen in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4-C" target="_blank" rel="noopener noreferrer">Table 17.4-C<ExternalLinkIcon/></a>. Initially, <code v-pre>p == q</code> and <code v-pre>p.x == 0</code>. This program is also incorrectly synchronized; it writes to shared memory without enforcing any ordering between those writes.</p>
<p><strong>Table 17.4-C. Surprising results caused by forward substitution</strong></p>
<table>
<thead>
<tr>
<th>Thread 1</th>
<th>Thread 2</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>r1 = p;</code></td>
<td><code v-pre>r6 = p;</code></td>
</tr>
<tr>
<td><code v-pre>r2 = r1.x;</code></td>
<td><code v-pre>r6.x = 3;</code></td>
</tr>
<tr>
<td><code v-pre>r3 = q;</code></td>
<td></td>
</tr>
<tr>
<td><code v-pre>r4 = r3.x;</code></td>
<td></td>
</tr>
<tr>
<td><code v-pre>r5 = r1.x;</code></td>
<td></td>
</tr>
</tbody>
</table>
<p>One common compiler optimization involves having the value read for <code v-pre>r2</code> reused for <code v-pre>r5</code>: they are both reads of <code v-pre>r1.x</code> with no intervening write. This situation is shown in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4-D" target="_blank" rel="noopener noreferrer">Table 17.4-D<ExternalLinkIcon/></a>.</p>
<p><strong>Table 17.4-D. Surprising results caused by forward substitution</strong></p>
<table>
<thead>
<tr>
<th>Thread 1</th>
<th>Thread 2</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>r1 = p;</code></td>
<td><code v-pre>r6 = p;</code></td>
</tr>
<tr>
<td><code v-pre>r2 = r1.x;</code></td>
<td><code v-pre>r6.x = 3;</code></td>
</tr>
<tr>
<td><code v-pre>r3 = q;</code></td>
<td></td>
</tr>
<tr>
<td><code v-pre>r4 = r3.x;</code></td>
<td></td>
</tr>
<tr>
<td><code v-pre>r5 = r2;</code></td>
<td></td>
</tr>
</tbody>
</table>
<p>Now consider the case where the assignment to <code v-pre>r6.x</code> in Thread 2 happens between the first read of <code v-pre>r1.x</code> and the read of <code v-pre>r3.x</code> in Thread 1. If the compiler decides to reuse the value of <code v-pre>r2</code> for the <code v-pre>r5</code>, then <code v-pre>r2</code> and <code v-pre>r5</code> will have the value <code v-pre>0</code>, and <code v-pre>r4</code> will have the value <code v-pre>3</code>. From the perspective of the programmer, the value stored at <code v-pre>p.x</code> has changed from <code v-pre>0</code> to <code v-pre>3</code> and then changed back.</p>
<p>The memory model determines what values can be read at every point in the program. The actions of each thread in isolation must behave as governed by the semantics of that thread, with the exception that the values seen by each read are determined by the memory model. When we refer to this, we say that the program obeys <em>intra-thread semantics</em>. Intra-thread semantics are the semantics for single-threaded programs, and allow the complete prediction of the behavior of a thread based on the values seen by read actions within the thread. To determine if the actions of thread <em>t</em> in an execution are legal, we simply evaluate the implementation of thread <em>t</em> as it would be performed in a single-threaded context, as defined in the rest of this specification.</p>
<p>Each time the evaluation of thread <em>t</em> generates an inter-thread action, it must match the inter-thread action <em>a</em> of <em>t</em> that comes next in program order. If <em>a</em> is a read, then further evaluation of <em>t</em> uses the value seen by <em>a</em> as determined by the memory model.</p>
<p>This section provides the specification of the Java programming language memory model except for issues dealing with <code v-pre>final</code> fields, which are described in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.5" target="_blank" rel="noopener noreferrer">§17.5<ExternalLinkIcon/></a>.</p>
<p>The memory model specified herein is not fundamentally based in the object-oriented nature of the Java programming language. For conciseness and simplicity in our examples, we often exhibit code fragments without class or method definitions, or explicit dereferencing. Most examples consist of two or more threads containing statements with access to local variables, shared global variables, or instance fields of an object. We typically use variables names such as <code v-pre>r1</code> or <code v-pre>r2</code> to indicate variables local to a method or thread. Such variables are not accessible by other threads.</p>
<h3 id="_17-4-1-shared-variables" tabindex="-1"><a class="header-anchor" href="#_17-4-1-shared-variables" aria-hidden="true">#</a> 17.4.1. Shared Variables</h3>
<p>Memory that can be shared between threads is called <em>shared memory</em> or <em>heap memory</em>.</p>
<p>All instance fields, <code v-pre>static</code> fields, and array elements are stored in heap memory. In this chapter, we use the term <em>variable</em> to refer to both fields and array elements.</p>
<p>Local variables (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html#jls-14.4" target="_blank" rel="noopener noreferrer">§14.4<ExternalLinkIcon/></a>), formal method parameters (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.4.1" target="_blank" rel="noopener noreferrer">§8.4.1<ExternalLinkIcon/></a>), and exception handler parameters (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html#jls-14.20" target="_blank" rel="noopener noreferrer">§14.20<ExternalLinkIcon/></a>) are never shared between threads and are unaffected by the memory model.</p>
<p>Two accesses to (reads of or writes to) the same variable are said to be <em>conflicting</em> if at least one of the accesses is a write.</p>
<h3 id="_17-4-2-actions" tabindex="-1"><a class="header-anchor" href="#_17-4-2-actions" aria-hidden="true">#</a> 17.4.2. Actions</h3>
<p>An <em>inter-thread action</em> is an action performed by one thread that can be detected or directly influenced by another thread. There are several kinds of inter-thread action that a program may perform:</p>
<ul>
<li>
<p><em>Read</em> (normal, or non-volatile). Reading a variable.</p>
</li>
<li>
<p><em>Write</em> (normal, or non-volatile). Writing a variable.</p>
</li>
<li>
<p><em>Synchronization actions</em>, which are:</p>
<ul>
<li><em>Volatile read</em>. A volatile read of a variable.</li>
<li><em>Volatile write</em>. A volatile write of a variable.</li>
<li><em>Lock</em>. Locking a monitor</li>
<li><em>Unlock</em>. Unlocking a monitor.</li>
<li>The (synthetic) first and last action of a thread.</li>
<li>Actions that start a thread or detect that a thread has terminated (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.4" target="_blank" rel="noopener noreferrer">§17.4.4<ExternalLinkIcon/></a>).</li>
</ul>
</li>
<li>
<p><em>External Actions</em>. An external action is an action that may be observable outside of an execution, and has a result based on an environment external to the execution.</p>
</li>
<li>
<p><em>Thread divergence actions</em> (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.9" target="_blank" rel="noopener noreferrer">§17.4.9<ExternalLinkIcon/></a>). A thread divergence action is only performed by a thread that is in an infinite loop in which no memory, synchronization, or external actions are performed. If a thread performs a thread divergence action, it will be followed by an infinite number of thread divergence actions.</p>
<p>Thread divergence actions are introduced to model how a thread may cause all other threads to stall and fail to make progress.</p>
</li>
</ul>
<p>This specification is only concerned with inter-thread actions. We do not need to concern ourselves with intra-thread actions (e.g., adding two local variables and storing the result in a third local variable). As previously mentioned, all threads need to obey the correct intra-thread semantics for Java programs. We will usually refer to inter-thread actions more succinctly as simply <em>actions</em>.</p>
<p>An action <em>a</em> is described by a tuple &lt; <em>t</em>, <em>k</em>, <em>v</em>, <em>u</em> &gt;, comprising:</p>
<ul>
<li>
<p><em>t</em> - the thread performing the action</p>
</li>
<li>
<p><em>k</em> - the kind of action</p>
</li>
<li>
<p><em>v</em> - the variable or monitor involved in the action.</p>
<p>For lock actions, <em>v</em> is the monitor being locked; for unlock actions, <em>v</em> is the monitor being unlocked.</p>
<p>If the action is a (volatile or non-volatile) read, <em>v</em> is the variable being read.</p>
<p>If the action is a (volatile or non-volatile) write, <em>v</em> is the variable being written.</p>
</li>
<li>
<p><em>u</em> - an arbitrary unique identifier for the action</p>
</li>
</ul>
<p>An external action tuple contains an additional component, which contains the results of the external action as perceived by the thread performing the action. This may be information as to the success or failure of the action, and any values read by the action.</p>
<p>Parameters to the external action (e.g., which bytes are written to which socket) are not part of the external action tuple. These parameters are set up by other actions within the thread and can be determined by examining the intra-thread semantics. They are not explicitly discussed in the memory model.</p>
<p>In non-terminating executions, not all external actions are observable. Non-terminating executions and observable actions are discussed in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.9" target="_blank" rel="noopener noreferrer">§17.4.9<ExternalLinkIcon/></a>.</p>
<h3 id="_17-4-3-programs-and-program-order" tabindex="-1"><a class="header-anchor" href="#_17-4-3-programs-and-program-order" aria-hidden="true">#</a> 17.4.3. Programs and Program Order</h3>
<p>Among all the inter-thread actions performed by each thread <em>t</em>, the <em>program order</em> of <em>t</em> is a total order that reflects the order in which these actions would be performed according to the intra-thread semantics of <em>t</em>.</p>
<p>A set of actions is <em>sequentially consistent</em> if all actions occur in a total order (the execution order) that is consistent with program order, and furthermore, each read <em>r</em> of a variable <em>v</em> sees the value written by the write <em>w</em> to <em>v</em> such that:</p>
<ul>
<li><em>w</em> comes before <em>r</em> in the execution order, and</li>
<li>there is no other write <em>w</em>' such that <em>w</em> comes before <em>w</em>' and <em>w</em>' comes before <em>r</em> in the execution order.</li>
</ul>
<p>Sequential consistency is a very strong guarantee that is made about visibility and ordering in an execution of a program. Within a sequentially consistent execution, there is a total order over all individual actions (such as reads and writes) which is consistent with the order of the program, and each individual action is atomic and is immediately visible to every thread.</p>
<p>If a program has no data races, then all executions of the program will appear to be sequentially consistent.</p>
<p>Sequential consistency and/or freedom from data races still allows errors arising from groups of operations that need to be perceived atomically and are not.</p>
<p>If we were to use sequential consistency as our memory model, many of the compiler and processor optimizations that we have discussed would be illegal. For example, in the trace in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4-C" target="_blank" rel="noopener noreferrer">Table 17.4-C<ExternalLinkIcon/></a>, as soon as the write of <code v-pre>3</code> to <code v-pre>p.x</code> occurred, subsequent reads of that location would be required to see that value.</p>
<h3 id="_17-4-4-synchronization-order" tabindex="-1"><a class="header-anchor" href="#_17-4-4-synchronization-order" aria-hidden="true">#</a> 17.4.4. Synchronization Order</h3>
<p>Every execution has a <em>synchronization order</em>. A synchronization order is a total order over all of the synchronization actions of an execution. For each thread <em>t</em>, the synchronization order of the synchronization actions (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.2" target="_blank" rel="noopener noreferrer">§17.4.2<ExternalLinkIcon/></a>) in <em>t</em> is consistent with the program order (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.3" target="_blank" rel="noopener noreferrer">§17.4.3<ExternalLinkIcon/></a>) of <em>t</em>.</p>
<p>Synchronization actions induce the <em>synchronized-with</em> relation on actions, defined as follows:</p>
<ul>
<li>
<p>An unlock action on monitor <em>m</em> <em>synchronizes-with</em> all subsequent lock actions on <em>m</em> (where &quot;subsequent&quot; is defined according to the synchronization order).</p>
</li>
<li>
<p>A write to a volatile variable <em>v</em> (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.3.1.4" target="_blank" rel="noopener noreferrer">§8.3.1.4<ExternalLinkIcon/></a>) <em>synchronizes-with</em> all subsequent reads of <em>v</em> by any thread (where &quot;subsequent&quot; is defined according to the synchronization order).</p>
</li>
<li>
<p>An action that starts a thread <em>synchronizes-with</em> the first action in the thread it starts.</p>
</li>
<li>
<p>The write of the default value (zero, <code v-pre>false</code>, or <code v-pre>null</code>) to each variable <em>synchronizes-with</em> the first action in every thread.</p>
<p>Although it may seem a little strange to write a default value to a variable before the object containing the variable is allocated, conceptually every object is created at the start of the program with its default initialized values.</p>
</li>
<li>
<p>The final action in a thread <code v-pre>T1</code> <em>synchronizes-with</em> any action in another thread <code v-pre>T2</code> that detects that <code v-pre>T1</code> has terminated.</p>
<p><code v-pre>T2</code> may accomplish this by calling <code v-pre>T1``.isAlive()</code> or <code v-pre>T1``.join()</code>.</p>
</li>
<li>
<p>If thread <code v-pre>T1</code> interrupts thread <code v-pre>T2</code>, the interrupt by <code v-pre>T1</code> <em>synchronizes-with</em> any point where any other thread (including <code v-pre>T2</code>) determines that <code v-pre>T2</code> has been interrupted (by having an <code v-pre>InterruptedException</code> thrown or by invoking <code v-pre>Thread.interrupted</code> or <code v-pre>Thread.isInterrupted</code>).</p>
</li>
</ul>
<p>The source of a <em>synchronizes-with</em> edge is called a <em>release</em>, and the destination is called an <em>acquire</em>.</p>
<h3 id="_17-4-5-happens-before-order" tabindex="-1"><a class="header-anchor" href="#_17-4-5-happens-before-order" aria-hidden="true">#</a> 17.4.5. Happens-before Order</h3>
<p>Two actions can be ordered by a <em>happens-before</em> relationship. If one action <em>happens-before</em> another, then the first is visible to and ordered before the second.</p>
<p>If we have two actions <em>x</em> and <em>y</em>, we write <em>hb(x, y)</em> to indicate that <em>x happens-before y</em>.</p>
<ul>
<li>If <em>x</em> and <em>y</em> are actions of the same thread and <em>x</em> comes before <em>y</em> in program order, then <em>hb(x, y)</em>.</li>
<li>There is a <em>happens-before</em> edge from the end of a constructor of an object to the start of a finalizer (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.6" target="_blank" rel="noopener noreferrer">§12.6<ExternalLinkIcon/></a>) for that object.</li>
<li>If an action <em>x</em> <em>synchronizes-with</em> a following action <em>y</em>, then we also have <em>hb(x, y)</em>.</li>
<li>If <em>hb(x, y)</em> and <em>hb(y, z)</em>, then <em>hb(x, z)</em>.</li>
</ul>
<p>The <code v-pre>wait</code> methods of class <code v-pre>Object</code> (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.2.1" target="_blank" rel="noopener noreferrer">§17.2.1<ExternalLinkIcon/></a>) have lock and unlock actions associated with them; their <em>happens-before</em> relationships are defined by these associated actions.</p>
<p>It should be noted that the presence of a <em>happens-before</em> relationship between two actions does not necessarily imply that they have to take place in that order in an implementation. If the reordering produces results consistent with a legal execution, it is not illegal.</p>
<p>For example, the write of a default value to every field of an object constructed by a thread need not happen before the beginning of that thread, as long as no read ever observes that fact.</p>
<p>More specifically, if two actions share a <em>happens-before</em> relationship, they do not necessarily have to appear to have happened in that order to any code with which they do not share a <em>happens-before</em> relationship. Writes in one thread that are in a data race with reads in another thread may, for example, appear to occur out of order to those reads.</p>
<p>The <em>happens-before</em> relation defines when data races take place.</p>
<p>A set of synchronization edges, <em>S</em>, is <em>sufficient</em> if it is the minimal set such that the transitive closure of <em>S</em> with the program order determines all of the <em>happens-before</em> edges in the execution. This set is unique.</p>
<p>It follows from the above definitions that:</p>
<ul>
<li>An unlock on a monitor <em>happens-before</em> every subsequent lock on that monitor.</li>
<li>A write to a <code v-pre>volatile</code> field (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.3.1.4" target="_blank" rel="noopener noreferrer">§8.3.1.4<ExternalLinkIcon/></a>) <em>happens-before</em> every subsequent read of that field.</li>
<li>A call to <code v-pre>start()</code> on a thread <em>happens-before</em> any actions in the started thread.</li>
<li>All actions in a thread <em>happen-before</em> any other thread successfully returns from a <code v-pre>join()</code> on that thread.</li>
<li>The default initialization of any object <em>happens-before</em> any other actions (other than default-writes) of a program.</li>
</ul>
<p>When a program contains two conflicting accesses (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.1" target="_blank" rel="noopener noreferrer">§17.4.1<ExternalLinkIcon/></a>) that are not ordered by a happens-before relationship, it is said to contain a <em>data race</em>.</p>
<p>The semantics of operations other than inter-thread actions, such as reads of array lengths (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-10.html#jls-10.7" target="_blank" rel="noopener noreferrer">§10.7<ExternalLinkIcon/></a>), executions of checked casts (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-5.html#jls-5.5" target="_blank" rel="noopener noreferrer">§5.5<ExternalLinkIcon/></a>, <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.16" target="_blank" rel="noopener noreferrer">§15.16<ExternalLinkIcon/></a>), and invocations of virtual methods (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.12" target="_blank" rel="noopener noreferrer">§15.12<ExternalLinkIcon/></a>), are not directly affected by data races.</p>
<p>Therefore, a data race cannot cause incorrect behavior such as returning the wrong length for an array.</p>
<p>A program is <em>correctly synchronized</em> if and only if all sequentially consistent executions are free of data races.</p>
<p>If a program is correctly synchronized, then all executions of the program will appear to be sequentially consistent (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.3" target="_blank" rel="noopener noreferrer">§17.4.3<ExternalLinkIcon/></a>).</p>
<p>This is an extremely strong guarantee for programmers. Programmers do not need to reason about reorderings to determine that their code contains data races. Therefore they do not need to reason about reorderings when determining whether their code is correctly synchronized. Once the determination that the code is correctly synchronized is made, the programmer does not need to worry that reorderings will affect his or her code.</p>
<p>A program must be correctly synchronized to avoid the kinds of counterintuitive behaviors that can be observed when code is reordered. The use of correct synchronization does not ensure that the overall behavior of a program is correct. However, its use does allow a programmer to reason about the possible behaviors of a program in a simple way; the behavior of a correctly synchronized program is much less dependent on possible reorderings. Without correct synchronization, very strange, confusing and counterintuitive behaviors are possible.</p>
<p>We say that a read <em>r</em> of a variable <em>v</em> is allowed to observe a write <em>w</em> to <em>v</em> if, in the <em>happens-before</em> partial order of the execution trace:</p>
<ul>
<li><em>r</em> is not ordered before <em>w</em> (i.e., it is not the case that <em>hb(r, w)</em>), and</li>
<li>there is no intervening write <em>w</em>' to <em>v</em> (i.e. no write <em>w</em>' to <em>v</em> such that <em>hb(w, w')</em> and <em>hb(w', r)</em>).</li>
</ul>
<p>Informally, a read <em>r</em> is allowed to see the result of a write <em>w</em> if there is no <em>happens-before</em> ordering to prevent that read.</p>
<p>A set of actions <em>A</em> is <em>happens-before consistent</em> if for all reads <em>r</em> in <em>A</em>, where <em>W(r)</em> is the write action seen by <em>r</em>, it is not the case that either <em>hb(r, W(r))</em> or that there exists a write <em>w</em> in <em>A</em> such that <em>w.v</em> = <em>r.v</em> and <em>hb(W(r), w)</em> and <em>hb(w, r)</em>.</p>
<p>In a <em>happens-before consistent</em> set of actions, each read sees a write that it is allowed to see by the <em>happens-before</em> ordering.</p>
<p><strong>Example 17.4.5-1. Happens-before Consistency</strong></p>
<p>For the trace in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.5-A" target="_blank" rel="noopener noreferrer">Table 17.4.5-A<ExternalLinkIcon/></a>, initially <code v-pre>A == B == 0</code>. The trace can observe <code v-pre>r2 == 0</code> and <code v-pre>r1 == 0</code> and still be <em>happens-before consistent</em>, since there are execution orders that allow each read to see the appropriate write.</p>
<p><strong>Table 17.4.5-A. Behavior allowed by happens-before consistency, but not sequential consistency.</strong></p>
<table>
<thead>
<tr>
<th>Thread 1</th>
<th>Thread 2</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>B = 1;</code></td>
<td><code v-pre>A = 2;</code></td>
</tr>
<tr>
<td><code v-pre>r2 = A;</code></td>
<td><code v-pre>r1 = B;</code></td>
</tr>
</tbody>
</table>
<p>Since there is no synchronization, each read can see either the write of the initial value or the write by the other thread. An execution order that displays this behavior is:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1: B = 1;
3: A = 2;
2: r2 = A;  // sees initial write of 0
4: r1 = B;  // sees initial write of 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Another execution order that is happens-before consistent is:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1: r2 = A;  // sees write of A = 2
3: r1 = B;  // sees write of B = 1
2: B = 1;
4: A = 2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this execution, the reads see writes that occur later in the execution order. This may seem counterintuitive, but is allowed by <em>happens-before</em> consistency. Allowing reads to see later writes can sometimes produce unacceptable behaviors.</p>
<h3 id="_17-4-6-executions" tabindex="-1"><a class="header-anchor" href="#_17-4-6-executions" aria-hidden="true">#</a> 17.4.6. Executions</h3>
<p>An execution <em>E</em> is described by a tuple &lt; <em>P, A, po, so, W, V, sw, hb</em> &gt;, comprising:</p>
<ul>
<li><em>P</em> - a program</li>
<li><em>A</em> - a set of actions</li>
<li><em>po</em> - program order, which for each thread <em>t</em>, is a total order over all actions performed by <em>t</em> in <em>A</em></li>
<li><em>so</em> - synchronization order, which is a total order over all synchronization actions in <em>A</em></li>
<li><em>W</em> - a write-seen function, which for each read <em>r</em> in <em>A</em>, gives <em>W(r)</em>, the write action seen by <em>r</em> in <em>E</em>.</li>
<li><em>V</em> - a value-written function, which for each write <em>w</em> in <em>A</em>, gives <em>V(w)</em>, the value written by <em>w</em> in <em>E</em>.</li>
<li><em>sw</em> - synchronizes-with, a partial order over synchronization actions</li>
<li><em>hb</em> - happens-before, a partial order over actions</li>
</ul>
<p>Note that the synchronizes-with and happens-before elements are uniquely determined by the other components of an execution and the rules for well-formed executions (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.7" target="_blank" rel="noopener noreferrer">§17.4.7<ExternalLinkIcon/></a>).</p>
<p>An execution is <em>happens-before consistent</em> if its set of actions is <em>happens-before consistent</em> (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.5" target="_blank" rel="noopener noreferrer">§17.4.5<ExternalLinkIcon/></a>).</p>
<h3 id="_17-4-7-well-formed-executions" tabindex="-1"><a class="header-anchor" href="#_17-4-7-well-formed-executions" aria-hidden="true">#</a> 17.4.7. Well-Formed Executions</h3>
<p>We only consider well-formed executions. An execution <em>E</em> = &lt; <em>P, A, po, so, W, V, sw, hb</em> &gt; is well formed if the following are true:</p>
<ol>
<li>
<p>Each read sees a write to the same variable in the execution.</p>
<p>All reads and writes of volatile variables are volatile actions. For all reads <em>r</em> in <em>A</em>, we have <em>W(r)</em> in <em>A</em> and <em>W(r).v</em> = <em>r.v</em>. The variable <em>r.v</em> is volatile if and only if <em>r</em> is a volatile read, and the variable <em>w.v</em> is volatile if and only if <em>w</em> is a volatile write.</p>
</li>
<li>
<p>The happens-before order is a partial order.</p>
<p>The happens-before order is given by the transitive closure of synchronizes-with edges and program order. It must be a valid partial order: reflexive, transitive and antisymmetric.</p>
</li>
<li>
<p>The execution obeys intra-thread consistency.</p>
<p>For each thread <em>t</em>, the actions performed by <em>t</em> in <em>A</em> are the same as would be generated by that thread in program-order in isolation, with each write <em>w</em> writing the value <em>V(w)</em>, given that each read <em>r</em> sees the value <em>V(W(r))</em>. Values seen by each read are determined by the memory model. The program order given must reflect the program order in which the actions would be performed according to the intra-thread semantics of <em>P</em>.</p>
</li>
<li>
<p>The execution is <em>happens-before consistent</em> (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.6" target="_blank" rel="noopener noreferrer">§17.4.6<ExternalLinkIcon/></a>).</p>
</li>
<li>
<p>The execution obeys synchronization-order consistency.</p>
<p>For all volatile reads <em>r</em> in <em>A</em>, it is not the case that either <em>so(r, W(r))</em> or that there exists a write <em>w</em> in <em>A</em> such that <em>w.v</em> = <em>r.v</em> and <em>so(W(r), w)</em> and <em>so(w, r)</em>.</p>
</li>
</ol>
<h3 id="_17-4-8-executions-and-causality-requirements" tabindex="-1"><a class="header-anchor" href="#_17-4-8-executions-and-causality-requirements" aria-hidden="true">#</a> 17.4.8. Executions and Causality Requirements</h3>
<p>We use <em>f</em>|<em>d</em> to denote the function given by restricting the domain of <em>f</em> to <em>d</em>. For all <em>x</em> in <em>d</em>, <em>f</em>|<em>d</em>(<em>x</em>) = <em>f</em>(<em>x</em>), and for all <em>x</em> not in <em>d</em>, <em>f</em>|<em>d</em>(<em>x</em>) is undefined.</p>
<p>We use <em>p</em>|<em>d</em> to represent the restriction of the partial order <em>p</em> to the elements in <em>d</em>. For all <em>x</em>,<em>y</em> in <em>d</em>, <em>p</em>(<em>x</em>,<em>y</em>) if and only if <em>p</em>|<em>d</em>(<em>x</em>,<em>y</em>). If either <em>x</em> or <em>y</em> are not in <em>d</em>, then it is not the case that <em>p</em>|<em>d</em>(<em>x</em>,<em>y</em>).</p>
<p>A well-formed execution <em>E</em> = &lt; <em>P, A, po, so, W, V, sw, hb</em> &gt; is validated by <em>committing</em> actions from <em>A</em>. If all of the actions in <em>A</em> can be committed, then the execution satisfies the causality requirements of the Java programming language memory model.</p>
<p>Starting with the empty set as <em>C0</em>, we perform a sequence of steps where we take actions from the set of actions <em>A</em> and add them to a set of committed actions <em>Ci</em> to get a new set of committed actions <em>Ci+1</em>. To demonstrate that this is reasonable, for each <em>Ci</em> we need to demonstrate an execution <em>E</em> containing <em>Ci</em> that meets certain conditions.</p>
<p>Formally, an execution <em>E satisfies the causality requirements of the Java programming language memory model</em> if and only if there exist:</p>
<ul>
<li>
<p>Sets of actions <em>C0</em>, <em>C1</em>, ... such that:</p>
<ul>
<li><em>C0</em> is the empty set</li>
<li><em>Ci</em> is a proper subset of <em>Ci+1</em></li>
<li><em>A</em> = ∪ (<em>C0</em>, <em>C1</em>, ...)</li>
</ul>
<p>If <em>A</em> is finite, then the sequence <em>C0</em>, <em>C1</em>, ... will be finite, ending in a set <em>Cn</em> = <em>A</em>.</p>
<p>If <em>A</em> is infinite, then the sequence <em>C0</em>, <em>C1</em>, ... may be infinite, and it must be the case that the union of all elements of this infinite sequence is equal to <em>A</em>.</p>
</li>
<li>
<p>Well-formed executions <em>E1</em>, ..., where <em>Ei</em> = &lt; <em>P, Ai, poi, soi, Wi, Vi, swi, hbi</em> &gt;.</p>
</li>
</ul>
<p>Given these sets of actions <em>C0</em>, ... and executions <em>E1</em>, ... , every action in <em>Ci</em> must be one of the actions in <em>Ei</em>. All actions in <em>Ci</em> must share the same relative happens-before order and synchronization order in both <em>Ei</em> and <em>E</em>. Formally:</p>
<ol>
<li><em>Ci</em> is a subset of <em>Ai</em></li>
<li><em>hbi</em>|<em>Ci</em> = <em>hb</em>|<em>Ci</em></li>
<li><em>soi</em>|<em>Ci</em> = <em>so</em>|<em>Ci</em></li>
</ol>
<p>The values written by the writes in <em>Ci</em> must be the same in both <em>Ei</em> and <em>E</em>. Only the reads in <em>Ci-1</em> need to see the same writes in <em>Ei</em> as in <em>E</em>. Formally:</p>
<ol>
<li><em>Vi</em>|<em>Ci</em> = <em>V</em>|<em>Ci</em></li>
<li><em>Wi</em>|<em>Ci-1</em> = <em>W</em>|<em>Ci-1</em></li>
</ol>
<p>All reads in <em>Ei</em> that are not in <em>Ci-1</em> must see writes that happen-before them. Each read <em>r</em> in <em>Ci</em> - <em>Ci-1</em> must see writes in <em>Ci-1</em> in both <em>Ei</em> and <em>E</em>, but may see a different write in <em>Ei</em> from the one it sees in <em>E</em>. Formally:</p>
<ol>
<li>For any read <em>r</em> in <em>Ai</em> - <em>Ci-1</em>, we have <em>hbi(Wi(r), r)</em></li>
<li>For any read <em>r</em> in (<em>Ci</em> - <em>Ci-1</em>), we have <em>Wi(r)</em> in <em>Ci-1</em> and <em>W(r)</em> in <em>Ci-1</em></li>
</ol>
<p>Given a set of sufficient synchronizes-with edges for <em>Ei</em>, if there is a release-acquire pair that happens-before (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.5" target="_blank" rel="noopener noreferrer">§17.4.5<ExternalLinkIcon/></a>) an action you are committing, then that pair must be present in all <em>Ej</em>, where <em>j</em> ≥ <em>i</em>. Formally:</p>
<ol>
<li>
<p>Let <em>sswi</em> be the <em>swi</em> edges that are also in the transitive reduction of <em>hbi</em> but not in <em>po</em>. We call <em>sswi</em> the <em>sufficient synchronizes-with edges for *Ei</em>*. If <em>sswi(x, y)</em> and <em>hbi(y, z)</em> and <em>z</em> in <em>Ci</em>, then <em>swj(x, y)</em> for all <em>j</em> ≥ <em>i</em>.</p>
<p>If an action <em>y</em> is committed, all external actions that happen-before <em>y</em> are also committed.</p>
</li>
<li>
<p>If <em>y</em> is in <em>Ci</em>, <em>x</em> is an external action and <em>hbi(x, y)</em>, then <em>x</em> in <em>Ci</em>.</p>
</li>
</ol>
<p><strong>Example 17.4.8-1. Happens-before Consistency Is Not Sufficient</strong></p>
<p>Happens-before consistency is a necessary, but not sufficient, set of constraints. Merely enforcing happens-before consistency would allow for unacceptable behaviors - those that violate the requirements we have established for programs. For example, happens-before consistency allows values to appear &quot;out of thin air&quot;. This can be seen by a detailed examination of the trace in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.8-A" target="_blank" rel="noopener noreferrer">Table 17.4.8-A<ExternalLinkIcon/></a>.</p>
<p><strong>Table 17.4.8-A. Happens-before consistency is not sufficient</strong></p>
<table>
<thead>
<tr>
<th>Thread 1</th>
<th>Thread 2</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>r1 = x;</code></td>
<td><code v-pre>r2 = y;</code></td>
</tr>
<tr>
<td><code v-pre>if (r1 != 0) y = 1;</code></td>
<td><code v-pre>if (r2 != 0) x = 1;</code></td>
</tr>
</tbody>
</table>
<p>The code shown in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.8-A" target="_blank" rel="noopener noreferrer">Table 17.4.8-A<ExternalLinkIcon/></a> is correctly synchronized. This may seem surprising, since it does not perform any synchronization actions. Remember, however, that a program is correctly synchronized if, when it is executed in a sequentially consistent manner, there are no data races. If this code is executed in a sequentially consistent way, each action will occur in program order, and neither of the writes will occur. Since no writes occur, there can be no data races: the program is correctly synchronized.</p>
<p>Since this program is correctly synchronized, the only behaviors we can allow are sequentially consistent behaviors. However, there is an execution of this program that is happens-before consistent, but not sequentially consistent:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>r1 = x;  // sees write of x = 1
y = 1;
r2 = y;  // sees write of y = 1
x = 1; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This result is happens-before consistent: there is no happens-before relationship that prevents it from occurring. However, it is clearly not acceptable: there is no sequentially consistent execution that would result in this behavior. The fact that we allow a read to see a write that comes later in the execution order can sometimes thus result in unacceptable behaviors.</p>
<p>Although allowing reads to see writes that come later in the execution order is sometimes undesirable, it is also sometimes necessary. As we saw above, the trace in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.5-A" target="_blank" rel="noopener noreferrer">Table 17.4.5-A<ExternalLinkIcon/></a> requires some reads to see writes that occur later in the execution order. Since the reads come first in each thread, the very first action in the execution order must be a read. If that read cannot see a write that occurs later, then it cannot see any value other than the initial value for the variable it reads. This is clearly not reflective of all behaviors.</p>
<p>We refer to the issue of when reads can see future writes as <em>causality</em>, because of issues that arise in cases like the one found in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.8-A" target="_blank" rel="noopener noreferrer">Table 17.4.8-A<ExternalLinkIcon/></a>. In that case, the reads cause the writes to occur, and the writes cause the reads to occur. There is no &quot;first cause&quot; for the actions. Our memory model therefore needs a consistent way of determining which reads can see writes early.</p>
<p>Examples such as the one found in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.8-A" target="_blank" rel="noopener noreferrer">Table 17.4.8-A<ExternalLinkIcon/></a> demonstrate that the specification must be careful when stating whether a read can see a write that occurs later in the execution (bearing in mind that if a read sees a write that occurs later in the execution, it represents the fact that the write is actually performed early).</p>
<p>The memory model takes as input a given execution, and a program, and determines whether that execution is a legal execution of the program. It does this by gradually building a set of &quot;committed&quot; actions that reflect which actions were executed by the program. Usually, the next action to be committed will reflect the next action that can be performed by a sequentially consistent execution. However, to reflect reads that need to see later writes, we allow some actions to be committed earlier than other actions that happen-before them.</p>
<p>Obviously, some actions may be committed early and some may not. If, for example, one of the writes in <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.8-A" target="_blank" rel="noopener noreferrer">Table 17.4.8-A<ExternalLinkIcon/></a> were committed before the read of that variable, the read could see the write, and the &quot;out-of-thin-air&quot; result could occur. Informally, we allow an action to be committed early if we know that the action can occur without assuming some data race occurs. In <a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4.8-A" target="_blank" rel="noopener noreferrer">Table 17.4.8-A<ExternalLinkIcon/></a>, we cannot perform either write early, because the writes cannot occur unless the reads see the result of a data race.</p>
<h3 id="_17-4-9-observable-behavior-and-nonterminating-executions" tabindex="-1"><a class="header-anchor" href="#_17-4-9-observable-behavior-and-nonterminating-executions" aria-hidden="true">#</a> 17.4.9. Observable Behavior and Nonterminating Executions</h3>
<p>For programs that always terminate in some bounded finite period of time, their behavior can be understood (informally) simply in terms of their allowable executions. For programs that can fail to terminate in a bounded amount of time, more subtle issues arise.</p>
<p>The observable behavior of a program is defined by the finite sets of external actions that the program may perform. A program that, for example, simply prints &quot;Hello&quot; forever is described by a set of behaviors that for any non-negative integer <em>i</em>, includes the behavior of printing &quot;Hello&quot; <em>i</em> times.</p>
<p>Termination is not explicitly modeled as a behavior, but a program can easily be extended to generate an additional external action <em>executionTermination</em> that occurs when all threads have terminated.</p>
<p>We also define a special <em>hang</em> action. If behavior is described by a set of external actions including a <em>hang</em> action, it indicates a behavior where after the external actions are observed, the program can run for an unbounded amount of time without performing any additional external actions or terminating. Programs can hang if all threads are blocked or if the program can perform an unbounded number of actions without performing any external actions.</p>
<p>A thread can be blocked in a variety of circumstances, such as when it is attempting to acquire a lock or perform an external action (such as a read) that depends on external data.</p>
<p>An execution may result in a thread being blocked indefinitely and the execution's not terminating. In such cases, the actions generated by the blocked thread must consist of all actions generated by that thread up to and including the action that caused the thread to be blocked, and no actions that would be generated by the thread after that action.</p>
<p>To reason about observable behaviors, we need to talk about sets of observable actions.</p>
<p>If <em>O</em> is a set of observable actions for an execution <em>E</em>, then set <em>O</em> must be a subset of <em>E</em>'s actions, <em>A</em>, and must contain only a finite number of actions, even if <em>A</em> contains an infinite number of actions. Furthermore, if an action <em>y</em> is in <em>O</em>, and either <em>hb(x, y)</em> or <em>so(x, y)</em>, then <em>x</em> is in <em>O</em>.</p>
<p>Note that a set of observable actions are not restricted to external actions. Rather, only external actions that are in a set of observable actions are deemed to be observable external actions.</p>
<p>A behavior <em>B</em> is an allowable behavior of a program <em>P</em> if and only if <em>B</em> is a finite set of external actions and either:</p>
<ul>
<li>There exists an execution <em>E</em> of <em>P</em>, and a set <em>O</em> of observable actions for <em>E</em>, and <em>B</em> is the set of external actions in <em>O</em> (If any threads in <em>E</em> end in a blocked state and <em>O</em> contains all actions in <em>E</em>, then <em>B</em> may also contain a <em>hang</em> action); or</li>
<li>There exists a set <em>O</em> of actions such that <em>B</em> consists of a <em>hang</em> action plus all the external actions in <em>O</em> and for all <em>k</em> ≥ | <em>O</em> |, there exists an execution <em>E</em> of <em>P</em> with actions <em>A</em>, and there exists a set of actions <em>O</em>' such that:
<ul>
<li>Both <em>O</em> and <em>O</em>' are subsets of <em>A</em> that fulfill the requirements for sets of observable actions.</li>
<li><em>O</em> ⊆ <em>O</em>' ⊆ <em>A</em></li>
<li>| <em>O</em>' | ≥ <em>k</em></li>
<li><em>O</em>' - <em>O</em> contains no external actions</li>
</ul>
</li>
</ul>
<p>Note that a behavior <em>B</em> does not describe the order in which the external actions in <em>B</em> are observed, but other (internal) constraints on how the external actions are generated and performed may impose such constraints.</p>
<h2 id="_17-5-final-field-semantics" tabindex="-1"><a class="header-anchor" href="#_17-5-final-field-semantics" aria-hidden="true">#</a> 17.5. <code v-pre>final</code> Field Semantics</h2>
<p>Fields declared final are initialized once, but never changed under normal circumstances. The detailed semantics of <code v-pre>final</code> fields are somewhat different from those of normal fields. In particular, compilers have a great deal of freedom to move reads of <code v-pre>final</code> fields across synchronization barriers and calls to arbitrary or unknown methods. Correspondingly, compilers are allowed to keep the value of a <code v-pre>final</code> field cached in a register and not reload it from memory in situations where a non-<code v-pre>final</code> field would have to be reloaded.</p>
<p><code v-pre>final</code> fields also allow programmers to implement thread-safe immutable objects without synchronization. A thread-safe immutable object is seen as immutable by all threads, even if a data race is used to pass references to the immutable object between threads. This can provide safety guarantees against misuse of an immutable class by incorrect or malicious code. <code v-pre>final</code> fields must be used correctly to provide a guarantee of immutability.</p>
<p>An object is considered to be <em>completely initialized</em> when its constructor finishes. A thread that can only see a reference to an object after that object has been completely initialized is guaranteed to see the correctly initialized values for that object's <code v-pre>final</code> fields.</p>
<p>The usage model for <code v-pre>final</code> fields is a simple one: Set the <code v-pre>final</code> fields for an object in that object's constructor; and do not write a reference to the object being constructed in a place where another thread can see it before the object's constructor is finished. If this is followed, then when the object is seen by another thread, that thread will always see the correctly constructed version of that object's <code v-pre>final</code> fields. It will also see versions of any object or array referenced by those <code v-pre>final</code> fields that are at least as up-to-date as the <code v-pre>final</code> fields are.</p>
<p><strong>Example 17.5-1. <code v-pre>final</code> Fields In The Java Memory Model</strong></p>
<p>The program below illustrates how <code v-pre>final</code> fields compare to normal fields.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class FinalFieldExample { 
    final int x;
    int y; 
    static FinalFieldExample f;

    public FinalFieldExample() {
        x = 3; 
        y = 4; 
    } 

    static void writer() {
        f = new FinalFieldExample();
    } 

    static void reader() {
        if (f != null) {
            int i = f.x;  // guaranteed to see 3  
            int j = f.y;  // could see 0
        } 
    } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The class <code v-pre>FinalFieldExample</code> has a <code v-pre>final</code> <code v-pre>int</code> field <code v-pre>x</code> and a non-<code v-pre>final</code> <code v-pre>int</code> field <code v-pre>y</code>. One thread might execute the method <code v-pre>writer</code> and another might execute the method <code v-pre>reader</code>.</p>
<p>Because the <code v-pre>writer</code> method writes <code v-pre>f</code> <em>after</em> the object's constructor finishes, the <code v-pre>reader</code> method will be guaranteed to see the properly initialized value for <code v-pre>f.x</code>: it will read the value <code v-pre>3</code>. However, <code v-pre>f.y</code> is not <code v-pre>final</code>; the <code v-pre>reader</code> method is therefore not guaranteed to see the value <code v-pre>4</code> for it.</p>
<p><strong>Example 17.5-2. <code v-pre>final</code> Fields For Security</strong></p>
<p><code v-pre>final</code> fields are designed to allow for necessary security guarantees. Consider the following program. One thread (which we shall refer to as thread 1) executes:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Global.s = "/tmp/usr".substring(4);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>while another thread (thread 2) executes</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>String myS = Global.s; 
if (myS.equals("/tmp"))System.out.println(myS);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>String</code> objects are intended to be immutable and string operations do not perform synchronization. While the <code v-pre>String</code> implementation does not have any data races, other code could have data races involving the use of <code v-pre>String</code> objects, and the memory model makes weak guarantees for programs that have data races. In particular, if the fields of the <code v-pre>String</code> class were not <code v-pre>final</code>, then it would be possible (although unlikely) that thread 2 could initially see the default value of <code v-pre>0</code> for the offset of the string object, allowing it to compare as equal to &quot;<code v-pre>/tmp</code>&quot;. A later operation on the <code v-pre>String</code> object might see the correct offset of <code v-pre>4</code>, so that the <code v-pre>String</code> object is perceived as being &quot;<code v-pre>/usr</code>&quot;. Many security features of the Java programming language depend upon <code v-pre>String</code> objects being perceived as truly immutable, even if malicious code is using data races to pass <code v-pre>String</code> references between threads.</p>
<h3 id="_17-5-1-semantics-of-final-fields" tabindex="-1"><a class="header-anchor" href="#_17-5-1-semantics-of-final-fields" aria-hidden="true">#</a> 17.5.1. Semantics of <code v-pre>final</code> Fields</h3>
<p>Let <em>o</em> be an object, and <em>c</em> be a constructor for <em>o</em> in which a <code v-pre>final</code> field <em>f</em> is written. A <em>freeze</em> action on <code v-pre>final</code> field <em>f</em> of <em>o</em> takes place when <em>c</em> exits, either normally or abruptly.</p>
<p>Note that if one constructor invokes another constructor, and the invoked constructor sets a <code v-pre>final</code> field, the freeze for the <code v-pre>final</code> field takes place at the end of the invoked constructor.</p>
<p>For each execution, the behavior of reads is influenced by two additional partial orders, the dereference chain <em>dereferences()</em> and the memory chain <em>mc()</em>, which are considered to be part of the execution (and thus, fixed for any particular execution). These partial orders must satisfy the following constraints (which need not have a unique solution):</p>
<ul>
<li>Dereference Chain: If an action <em>a</em> is a read or write of a field or element of an object <em>o</em> by a thread <em>t</em> that did not initialize <em>o</em>, then there must exist some read <em>r</em> by thread <em>t</em> that sees the address of <em>o</em> such that <em>r</em> <em>dereferences(r, a)</em>.</li>
<li>Memory Chain: There are several constraints on the memory chain ordering:
<ul>
<li>If <em>r</em> is a read that sees a write <em>w</em>, then it must be the case that <em>mc(w, r)</em>.</li>
<li>If <em>r</em> and <em>a</em> are actions such that <em>dereferences(r, a)</em>, then it must be the case that <em>mc(r, a)</em>.</li>
<li>If <em>w</em> is a write of the address of an object <em>o</em> by a thread <em>t</em> that did not initialize <em>o</em>, then there must exist some read <em>r</em> by thread <em>t</em> that sees the address of <em>o</em> such that <em>mc(r, w)</em>.</li>
</ul>
</li>
</ul>
<p>Given a write <em>w</em>, a freeze <em>f</em>, an action <em>a</em> (that is not a read of a <code v-pre>final</code> field), a read <em>r1</em> of the <code v-pre>final</code> field frozen by <em>f</em>, and a read <em>r2</em> such that <em>hb(w, f)</em>, <em>hb(f, a)</em>, <em>mc(a, r1)</em>, and <em>dereferences(r1, r2)</em>, then when determining which values can be seen by <em>r2</em>, we consider <em>hb(w, r2)</em>. (This <em>happens-before</em> ordering does not transitively close with other <em>happens-before</em> orderings.)</p>
<p>Note that the <em>dereferences</em> order is reflexive, and <em>r1</em> can be the same as <em>r2</em>.</p>
<p>For reads of <code v-pre>final</code> fields, the only writes that are deemed to come before the read of the <code v-pre>final</code> field are the ones derived through the <code v-pre>final</code> field semantics.</p>
<h3 id="_17-5-2-reading-final-fields-during-construction" tabindex="-1"><a class="header-anchor" href="#_17-5-2-reading-final-fields-during-construction" aria-hidden="true">#</a> 17.5.2. Reading <code v-pre>final</code> Fields During Construction</h3>
<p>A read of a <code v-pre>final</code> field of an object within the thread that constructs that object is ordered with respect to the initialization of that field within the constructor by the usual <em>happens-before</em> rules. If the read occurs after the field is set in the constructor, it sees the value the <code v-pre>final</code> field is assigned, otherwise it sees the default value.</p>
<h3 id="_17-5-3-subsequent-modification-of-final-fields" tabindex="-1"><a class="header-anchor" href="#_17-5-3-subsequent-modification-of-final-fields" aria-hidden="true">#</a> 17.5.3. Subsequent Modification of <code v-pre>final</code> Fields</h3>
<p>In some cases, such as deserialization, the system will need to change the <code v-pre>final</code> fields of an object after construction. <code v-pre>final</code> fields can be changed via reflection and other implementation-dependent means. The only pattern in which this has reasonable semantics is one in which an object is constructed and then the <code v-pre>final</code> fields of the object are updated. The object should not be made visible to other threads, nor should the <code v-pre>final</code> fields be read, until all updates to the <code v-pre>final</code> fields of the object are complete. Freezes of a <code v-pre>final</code> field occur both at the end of the constructor in which the <code v-pre>final</code> field is set, and immediately after each modification of a <code v-pre>final</code> field via reflection or other special mechanism.</p>
<p>Even then, there are a number of complications. If a <code v-pre>final</code> field is initialized to a constant expression (<a href="https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.29" target="_blank" rel="noopener noreferrer">§15.29<ExternalLinkIcon/></a>) in the field declaration, changes to the <code v-pre>final</code> field may not be observed, since uses of that <code v-pre>final</code> field are replaced at compile time with the value of the constant expression.</p>
<p>Another problem is that the specification allows aggressive optimization of <code v-pre>final</code> fields. Within a thread, it is permissible to reorder reads of a <code v-pre>final</code> field with those modifications of a <code v-pre>final</code> field that do not take place in the constructor.</p>
<p><strong>Example 17.5.3-1. Aggressive Optimization of <code v-pre>final</code> Fields</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class A {
    final int x;
    A() { 
        x = 1; 
    } 

    int f() { 
        return d(this,this); 
    } 

    int d(A a1, A a2) { 
        int i = a1.x; 
        g(a1); 
        int j = a2.x; 
        return j - i; 
    }

    static void g(A a) { 
        // uses reflection to change a.x to 2 
    } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the <code v-pre>d</code> method, the compiler is allowed to reorder the reads of <code v-pre>x</code> and the call to <code v-pre>g</code> freely. Thus, <code v-pre>new A().f()</code> could return <code v-pre>-1</code>, <code v-pre>0</code>, or <code v-pre>1</code>.</p>
<p>An implementation may provide a way to execute a block of code in a <em><code v-pre>final</code>-field-safe context</em>. If an object is constructed within a <code v-pre>final</code>-field-safe context, the reads of a <code v-pre>final</code> field of that object will not be reordered with modifications of that <code v-pre>final</code> field that occur within that <code v-pre>final</code>-field-safe context.</p>
<p>A <code v-pre>final</code>-field-safe context has additional protections. If a thread has seen an incorrectly published reference to an object that allows the thread to see the default value of a <code v-pre>final</code> field, and then, within a <code v-pre>final</code>-field-safe context, reads a properly published reference to the object, it will be guaranteed to see the correct value of the <code v-pre>final</code> field. In the formalism, code executed within a <code v-pre>final</code>-field-safe context is treated as a separate thread (for the purposes of <code v-pre>final</code> field semantics only).</p>
<p>In an implementation, a compiler should not move an access to a <code v-pre>final</code> field into or out of a <code v-pre>final</code>-field-safe context (although it can be moved around the execution of such a context, so long as the object is not constructed within that context).</p>
<p>One place where use of a <code v-pre>final</code>-field-safe context would be appropriate is in an executor or thread pool. By executing each <code v-pre>Runnable</code> in a separate <code v-pre>final</code>-field-safe context, the executor could guarantee that incorrect access by one <code v-pre>Runnable</code> to a object <em>o</em> will not remove <code v-pre>final</code> field guarantees for other <code v-pre>Runnable</code>s handled by the same executor.</p>
<h3 id="_17-5-4-write-protected-fields" tabindex="-1"><a class="header-anchor" href="#_17-5-4-write-protected-fields" aria-hidden="true">#</a> 17.5.4. Write-Protected Fields</h3>
<p>Normally, a field that is <code v-pre>final</code> and <code v-pre>static</code> may not be modified. However, <code v-pre>System.in</code>, <code v-pre>System.out</code>, and <code v-pre>System.err</code> are <code v-pre>static</code> <code v-pre>final</code> fields that, for legacy reasons, must be allowed to be changed by the methods <code v-pre>System.setIn</code>, <code v-pre>System.setOut</code>, and <code v-pre>System.setErr</code>. We refer to these fields as being <em>write-protected</em> to distinguish them from ordinary <code v-pre>final</code> fields.</p>
<p>The compiler needs to treat these fields differently from other <code v-pre>final</code> fields. For example, a read of an ordinary <code v-pre>final</code> field is &quot;immune&quot; to synchronization: the barrier involved in a lock or volatile read does not have to affect what value is read from a <code v-pre>final</code> field. Since the value of write-protected fields may be seen to change, synchronization events should have an effect on them. Therefore, the semantics dictate that these fields be treated as normal fields that cannot be changed by user code, unless that user code is in the <code v-pre>System</code> class.</p>
<h2 id="_17-6-word-tearing" tabindex="-1"><a class="header-anchor" href="#_17-6-word-tearing" aria-hidden="true">#</a> 17.6. Word Tearing</h2>
<p>One consideration for implementations of the Java Virtual Machine is that every field and array element is considered distinct; updates to one field or element must not interact with reads or updates of any other field or element. In particular, two threads that update adjacent elements of a byte array separately must not interfere or interact and do not need synchronization to ensure sequential consistency.</p>
<p>Some processors do not provide the ability to write to a single byte. It would be illegal to implement byte array updates on such a processor by simply reading an entire word, updating the appropriate byte, and then writing the entire word back to memory. This problem is sometimes known as <em>word tearing</em>, and on processors that cannot easily update a single byte in isolation some other approach will be required.</p>
<p><strong>Example 17.6-1. Detection of Word Tearing</strong></p>
<p>The following program is a test case to detect word tearing:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class WordTearing extends Thread { 
    static final int LENGTH = 8;
    static final int ITERS  = 1000000; 
    static byte[] counts    = new byte[LENGTH]; 
    static Thread[] threads = new Thread[LENGTH]; 

    final int id; 
    WordTearing(int i) { 
        id = i; 
    }

    public void run() { 
        byte v = 0; 
        for (int i = 0; i &lt; ITERS; i++) { 
            byte v2 = counts[id]; 
            if (v != v2) { 
                System.err.println("Word-Tearing found: " + 
                              "counts[" + id + "] = "+ v2 +
                              ", should be " + v); 
                return; 
            } 
            v++; 
            counts[id] = v; 
        } 
    }

    public static void main(String[] args) { 
        for (int i = 0; i &lt; LENGTH; ++i) 
            (threads[i] = new WordTearing(i)).start(); 
    } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This makes the point that bytes must not be overwritten by writes to adjacent bytes.</p>
<h2 id="_17-7-non-atomic-treatment-of-double-and-long" tabindex="-1"><a class="header-anchor" href="#_17-7-non-atomic-treatment-of-double-and-long" aria-hidden="true">#</a> 17.7. Non-Atomic Treatment of <code v-pre>double</code> and <code v-pre>long</code></h2>
<p>For the purposes of the Java programming language memory model, a single write to a non-volatile <code v-pre>long</code> or <code v-pre>double</code> value is treated as two separate writes: one to each 32-bit half. This can result in a situation where a thread sees the first 32 bits of a 64-bit value from one write, and the second 32 bits from another write.</p>
<p>Writes and reads of volatile <code v-pre>long</code> and <code v-pre>double</code> values are always atomic.</p>
<p>Writes to and reads of references are always atomic, regardless of whether they are implemented as 32-bit or 64-bit values.</p>
<p>Some implementations may find it convenient to divide a single write action on a 64-bit <code v-pre>long</code> or <code v-pre>double</code> value into two write actions on adjacent 32-bit values. For efficiency's sake, this behavior is implementation-specific; an implementation of the Java Virtual Machine is free to perform writes to <code v-pre>long</code> and <code v-pre>double</code> values atomically or in two parts.</p>
<p>Implementations of the Java Virtual Machine are encouraged to avoid splitting 64-bit values where possible. Programmers are encouraged to declare shared 64-bit values as <code v-pre>volatile</code> or synchronize their programs correctly to avoid possible complications.</p>
</div></template>



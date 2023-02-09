<template><div><h1 id="redis源码剖析" tabindex="-1"><a class="header-anchor" href="#redis源码剖析" aria-hidden="true">#</a> Redis源码剖析</h1>
<h2 id="_1-数据类型篇" tabindex="-1"><a class="header-anchor" href="#_1-数据类型篇" aria-hidden="true">#</a> 1.数据类型篇</h2>
<h3 id="_1-1-sds" tabindex="-1"><a class="header-anchor" href="#_1-1-sds" aria-hidden="true">#</a> 1.1 SDS</h3>
<blockquote>
<p><strong>C语言的字符串有很多问题</strong></p>
<p>获取字符串长度需要O(n)</p>
<p>二进制不安全</p>
<p>不可以动态修改</p>
</blockquote>
<p>SDS就是为了解决该问题而设计的</p>
<p>SDS优点</p>
<p><strong>1）常数复杂度获取字符串长度：O(1)</strong></p>
<p>C字符串获取字符串长度时间复杂度为O(N),使用SDS可以确保获取字符串长度的操作不会成为Redis的性能瓶颈</p>
<p><strong>2）杜绝缓冲区溢出</strong></p>
<p>C字符串不记录自身长度和空闲空间，容易造成缓冲区溢出，使用SDS则不会，SDS拼接字符串之前会先通过free字段检测剩余空间能否满足需求，不能满足需求的就会扩容</p>
<p><strong>3）减少修改字符串时带来的内存重分配次数</strong></p>
<p>使用C字符串的话：</p>
<p>每次对一个C字符串进行增长或缩短操作，长度都需要对这个C字符串数组进行一次内存重分配，比如C字符串的拼接，程序要先进行内存重分配来扩展字符串数组的大小，避免缓冲区溢出，又比如C字符串的缩短操作，程序需要通过内存重分配来释放不再使用的那部分空间，避免内存泄漏</p>
<p>使用SDS的话：</p>
<p>通过SDS的len属性和free属性可以实现两种内存分配的优化策略：<strong>空间预分配和惰性空间释放</strong></p>
<blockquote>
<p><strong>1.针对内存分配的策略：空间预分配</strong></p>
<p>在对SDS的空间进行扩展的时候，程序不仅会为SDS分配修改所必须的空间，还会为SDS分配额外的未使用的空间</p>
<p>这样可以减少连续执行字符串增长操作所需的内存重分配次数，通过这种预分配的策略，SDS将连续增长N次字符串所需的内存重分配次数从必定N次降低为最多N次，这是个很大的性能提升！</p>
<p><strong>2.针对内存释放的策略：惰性空间释放</strong></p>
<p>在对SDS的字符串进行缩短操作的时候，程序并不会立刻使用内存重分配来回收缩短之后多出来的字节，而是使用free属性将这些字节的数量记录下来等待将来使用，通过惰性空间释放策略，SDS避免了缩短字符串时所需的内存重分配次数，并且为将来可能有的增长操作提供了优化！</p>
</blockquote>
<p><strong>4）二进制安全</strong></p>
<p>为了确保数据库可以二进制数据（图片，视频等），SDS的API都是二进制安全的，所有的API都会以处理二进制的方式来处理存放在SDS的buf数组里面的数据，程序不会对其中的数据做任何的限制，过滤，数据存进去是什么样子，读出来就是什么样子，这也是buf数组叫做字节数组而不是叫字符数组的原因，以为它是用来保存一系列二进制数据的</p>
<p>通过二进制安全的SDS，Redis不仅可以保存文本数据，还可以保存任意格式是二进制数</p>
<p><strong>SDS结构体定义</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">char</span> <span class="token operator">*</span>sds<span class="token punctuation">;</span>
<span class="token comment">/* Note: sdshdr5 is never used, we just access the flags byte directly.
 * However is here to document the layout of type 5 SDS strings. */</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr5</span> <span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, and 5 msb of string length */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr8</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint8_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span><span class="token comment">//记录结构体的长度</span>
    <span class="token class-name">uint8_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span> <span class="token comment">//记录申请的空间</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span> <span class="token comment">//记录</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr16</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint16_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span>
    <span class="token class-name">uint16_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr32</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span>
    <span class="token class-name">uint32_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr64</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint64_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span>
    <span class="token class-name">uint64_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在定义结构体的时候声明_attribute_((<strong>packed</strong>)采用紧凑的编码形式 避免结构体编译的时候产生多余的空间</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/* sdsalloc() = sdsavail() + sdslen() */  len alloc avail 之间的关系
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>构建一个新的sds</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>sds sdsnew(const char *init) {
    size_t initlen = (init == NULL) ? 0 : strlen(init);
    return sdsnewlen(init, initlen);
}
 
 
sds sdsnewlen(const void *init, size_t initlen) {
    void *sh;
    sds s;
    char type = sdsReqType(initlen);//根据长度确定类型 
    /*空字符串，用sdshdr8，这边是经验写法，当想构造空串是为了放入超过32长度的字符串 */
    if (type == SDS_TYPE_5 &amp;&amp; initlen == 0) type = SDS_TYPE_8;
    int hdrlen = sdsHdrSize(type);//到下一个方法，已经把他们放在一起了
    unsigned char *fp; /* flags pointer. */
 
	//分配内存 
    sh = s_malloc(hdrlen+initlen+1);
    if (!init)
        memset(sh, 0, hdrlen+initlen+1);
    if (sh == NULL) return NULL;
    s = (char*)sh+hdrlen;
    fp = ((unsigned char*)s)-1;
    //根据不同的类型，创建不同结构体，调用SDS_HDR_VAR函数
	//为不同的结构体赋值,如已用长度len,总长度alloc 
    switch(type) {
        case SDS_TYPE_5: {
            *fp = type | (initlen &lt;&lt; SDS_TYPE_BITS);
            break;
        }
        case SDS_TYPE_8: {
            SDS_HDR_VAR(8,s);
            sh->len = initlen;
            sh->alloc = initlen;
            *fp = type;
            break;
        }
        case SDS_TYPE_16: {
            SDS_HDR_VAR(16,s);
            sh->len = initlen;
            sh->alloc = initlen;
            *fp = type;
            break;
        }
        case SDS_TYPE_32: {
            SDS_HDR_VAR(32,s);
            sh->len = initlen;
            sh->alloc = initlen;
            *fp = type;
            break;
        }
        case SDS_TYPE_64: {
            SDS_HDR_VAR(64,s);
            sh->len = initlen;
            sh->alloc = initlen;
            *fp = type;
            break;
        }
    }
    if (initlen &amp;&amp; init)
        memcpy(s, init, initlen);
    //最后追加'\0' 
    s[initlen] = '\0';
    return s;
}
 
 
//根据实际字符长度确定类型 
static inline char sdsReqType(size_t string_size) {
    if (string_size &lt; 1&lt;&lt;5)
        return SDS_TYPE_5;
    if (string_size &lt; 1&lt;&lt;8)
        return SDS_TYPE_8;
    if (string_size &lt; 1&lt;&lt;16)
        return SDS_TYPE_16;
#if (LONG_MAX == LLONG_MAX)
    if (string_size &lt; 1ll&lt;&lt;32)
        return SDS_TYPE_32;
#endif
    return SDS_TYPE_64;
}
删除
String类型的删除并不是直接回收内存，而是修改字符，让其为空字符，这其实是惰性释放，等待将来使用。在调用sdsempty方法时，再次调用上面的sdsnewlen方法。
 
/*修改sds字符串使其为空（零长度）。
*但是，所有现有缓冲区不会被丢弃，而是设置为可用空间
*这样，下一个append操作将不需要分配到
*当要缩短SDS保存的字符串时，程序并不立即使用内存充分配来回收缩短后多出来的字节，并等待将来使用。
void sdsclear(sds s) {
    sdssetlen(s, 0);
    s[0] = '\0';
}
sds sdsempty(void) {
    return sdsnewlen("",0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩容机制</strong></p>
<p>添加字符串，sdscat输入参数为sds和字符串t，首先调用sdsMakeRoomFor扩容方法，再追加新的字符串，最后添加上结尾符'\0'。</p>
<p>第一步先调用常见方法中的sdsavail方法，获取还剩多少空闲空间。如果空闲空间大于要添加的字符串t的长度，则直接返回，不想要扩容。如果空闲空间不够，则想要扩容。</p>
<p>第二步判断想要扩容多大，这边有分情况，如果目前的字符串小于1M，则直接扩容双倍，如果目前的字符串大于1M，则直接添加1M。</p>
<p>第三步判断添加字符串之后的数据类型还是否和原来的一致，如果一致，则没啥事。如果不一致，则想要新建一个sdshdr，把现有的数据都挪过去。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>sds <span class="token function">sdscat</span><span class="token punctuation">(</span>sds s<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">sdscatlen</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> t<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
sds <span class="token function">sdscatlen</span><span class="token punctuation">(</span>sds s<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>t<span class="token punctuation">,</span> <span class="token class-name">size_t</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//调用sds.h里面的sdslen，即取已用长度 </span>
    <span class="token class-name">size_t</span> curlen <span class="token operator">=</span> <span class="token function">sdslen</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">//扩容方法 </span>
    s <span class="token operator">=</span> <span class="token function">sdsMakeRoomFor</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token function">memcpy</span><span class="token punctuation">(</span>s<span class="token operator">+</span>curlen<span class="token punctuation">,</span> t<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sdssetlen</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> curlen<span class="token operator">+</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    s<span class="token punctuation">[</span>curlen<span class="token operator">+</span>len<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">'\0'</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
sds <span class="token function">sdsMakeRoomFor</span><span class="token punctuation">(</span>sds s<span class="token punctuation">,</span> <span class="token class-name">size_t</span> addlen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>sh<span class="token punctuation">,</span> <span class="token operator">*</span>newsh<span class="token punctuation">;</span>
    <span class="token comment">//调用sds.h，获取空闲长度alloc </span>
    <span class="token class-name">size_t</span> avail <span class="token operator">=</span> <span class="token function">sdsavail</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">size_t</span> len<span class="token punctuation">,</span> newlen<span class="token punctuation">;</span>
    <span class="token keyword">char</span> type<span class="token punctuation">,</span> oldtype <span class="token operator">=</span> s<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> SDS_TYPE_MASK<span class="token punctuation">;</span>
    <span class="token keyword">int</span> hdrlen<span class="token punctuation">;</span>
 
   <span class="token comment">//空闲长度大于需要增加的，不需要扩容，直接返回 </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>avail <span class="token operator">>=</span> addlen<span class="token punctuation">)</span> <span class="token keyword">return</span> s<span class="token punctuation">;</span>
 
<span class="token comment">//调用sds.h里面的sdslen，即取可用长度 </span>
    len <span class="token operator">=</span> <span class="token function">sdslen</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    sh <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span>s<span class="token operator">-</span><span class="token function">sdsHdrSize</span><span class="token punctuation">(</span>oldtype<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//len加上要添加的大小 </span>
    newlen <span class="token operator">=</span> <span class="token punctuation">(</span>len<span class="token operator">+</span>addlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">//#define SDS_MAX_PREALLOC (1024*1024) </span>
    <span class="token comment">//当新长度小于 1024*1024，直接扩容两倍 </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newlen <span class="token operator">&lt;</span> SDS_MAX_PREALLOC<span class="token punctuation">)</span>
        newlen <span class="token operator">*=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token comment">//当新长度大于 1024*1024，加2014*1024 </span>
        newlen <span class="token operator">+=</span> SDS_MAX_PREALLOC<span class="token punctuation">;</span>
 
<span class="token comment">//根据长度计算新的类型 </span>
    type <span class="token operator">=</span> <span class="token function">sdsReqType</span><span class="token punctuation">(</span>newlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">/* Don't use type 5: the user is appending to the string and type 5 is
     * not able to remember empty space, so sdsMakeRoomFor() must be called
     * at every appending operation. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> SDS_TYPE_5<span class="token punctuation">)</span> type <span class="token operator">=</span> SDS_TYPE_8<span class="token punctuation">;</span>
 
<span class="token comment">//获取不同结构提的头部大小 </span>
    hdrlen <span class="token operator">=</span> <span class="token function">sdsHdrSize</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//如果类型一样，直接使用原地址，长度加上就行 </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldtype<span class="token operator">==</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        newsh <span class="token operator">=</span> <span class="token function">s_realloc</span><span class="token punctuation">(</span>sh<span class="token punctuation">,</span> hdrlen<span class="token operator">+</span>newlen<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newsh <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        s <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span>newsh<span class="token operator">+</span>hdrlen<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span><span class="token comment">//如果类型不一样，重新开辟内存，把原来的数据复制过去 </span>
        newsh <span class="token operator">=</span> <span class="token function">s_malloc</span><span class="token punctuation">(</span>hdrlen<span class="token operator">+</span>newlen<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newsh <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        <span class="token function">memcpy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span>newsh<span class="token operator">+</span>hdrlen<span class="token punctuation">,</span> s<span class="token punctuation">,</span> len<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">s_free</span><span class="token punctuation">(</span>sh<span class="token punctuation">)</span><span class="token punctuation">;</span>
        s <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span>newsh<span class="token operator">+</span>hdrlen<span class="token punctuation">;</span>
        s<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> type<span class="token punctuation">;</span>
        <span class="token function">sdssetlen</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//设置新的总长度 </span>
    <span class="token function">sdssetalloc</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> newlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token comment">//计算不同类型的结构体的大小 </span>
<span class="token keyword">static</span> <span class="token keyword">inline</span> <span class="token keyword">int</span> <span class="token function">sdsHdrSize</span><span class="token punctuation">(</span><span class="token keyword">char</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>type<span class="token operator">&amp;</span>SDS_TYPE_MASK<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> SDS_TYPE_5<span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdshdr5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> SDS_TYPE_8<span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdshdr8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> SDS_TYPE_16<span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdshdr16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> SDS_TYPE_32<span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdshdr32</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> SDS_TYPE_64<span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdshdr64</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-intset" tabindex="-1"><a class="header-anchor" href="#_1-2-intset" aria-hidden="true">#</a> 1.2 intset</h3>
<p>结构体定义</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">intset</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> encoding<span class="token punctuation">;</span>
    <span class="token class-name">uint32_t</span> length<span class="token punctuation">;</span>
    <span class="token class-name">int8_t</span> contents<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> intset<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/redis/image-20220818235521787.png" alt="image-20220818235521787" tabindex="0" loading="lazy"><figcaption>image-20220818235521787</figcaption></figure>
<p><strong>创建一个新的intset</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>intset <span class="token operator">*</span><span class="token function">intsetNew</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    intset <span class="token operator">*</span>is <span class="token operator">=</span> <span class="token function">zmalloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>intset<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    is<span class="token operator">-></span>encoding <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>INTSET_ENC_INT16<span class="token punctuation">)</span><span class="token punctuation">;</span>
    is<span class="token operator">-></span>length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> is<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>升级</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Upgrades the intset to a larger encoding and inserts the given integer. */</span>
<span class="token keyword">static</span> intset <span class="token operator">*</span><span class="token function">intsetUpgradeAndAdd</span><span class="token punctuation">(</span>intset <span class="token operator">*</span>is<span class="token punctuation">,</span> <span class="token class-name">int64_t</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//获取当前编码</span>
    <span class="token class-name">uint8_t</span> curenc <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>encoding<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//新编码</span>
    <span class="token class-name">uint8_t</span> newenc <span class="token operator">=</span> <span class="token function">_intsetValueEncoding</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//元素个数</span>
    <span class="token keyword">int</span> length <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//大于零还是小于0 大于队尾 小于队首</span>
    <span class="token keyword">int</span> prepend <span class="token operator">=</span> value <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">/* First set new encoding and resize */</span>重置编码
    is<span class="token operator">-></span>encoding <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>newenc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//重置大小</span>
    is <span class="token operator">=</span> <span class="token function">intsetResize</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* Upgrade back-to-front so we don't overwrite values. 倒序遍历 查询旧数据
     * Note that the "prepend" variable is used to make sure we have an empty
     * space at either the beginning or the end of the intset. */</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>length<span class="token operator">--</span><span class="token punctuation">)</span>
        <span class="token function">_intsetSet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>length<span class="token operator">+</span>prepend<span class="token punctuation">,</span><span class="token function">_intsetGetEncoded</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>length<span class="token punctuation">,</span>curenc<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* Set the value at the beginning or the end. */</span>
    <span class="token comment">//插入新元素</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prepend<span class="token punctuation">)</span>
        <span class="token function">_intsetSet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token function">_intsetSet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token comment">//修改长度</span>
    is<span class="token operator">-></span>length <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> is<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/redis/image-20220818235812987.png" alt="image-20220818235812987" tabindex="0" loading="lazy"><figcaption>image-20220818235812987</figcaption></figure>
<p><strong>用二分法查询数据插入点</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">static</span> <span class="token class-name">uint8_t</span> <span class="token function">intsetSearch</span><span class="token punctuation">(</span>intset <span class="token operator">*</span>is<span class="token punctuation">,</span> <span class="token class-name">int64_t</span> value<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> <span class="token operator">*</span>pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> min <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> max <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> mid <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token class-name">int64_t</span> cur <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">/* The value can never be found when the set is empty */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">/* Check for the case where we know we cannot find the value,
         * but do know the insert position. */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> <span class="token function">_intsetGet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>max<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> <span class="token function">_intsetGet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>max <span class="token operator">>=</span> min<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mid <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span>min <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span>max<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">;</span>
        cur <span class="token operator">=</span> <span class="token function">_intsetGet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>mid<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            min <span class="token operator">=</span> mid<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            max <span class="token operator">=</span> mid<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> mid<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> min<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3dict" tabindex="-1"><a class="header-anchor" href="#_1-3dict" aria-hidden="true">#</a> 1.3Dict</h3>
<p>结构体定义</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">dict</span> <span class="token punctuation">{</span>
    dictType <span class="token operator">*</span>type<span class="token punctuation">;</span>
	<span class="token comment">//保存指向dictentry的指针</span>
    dictEntry <span class="token operator">*</span><span class="token operator">*</span>ht_table<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//rehash使用</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> ht_used<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> rehashidx<span class="token punctuation">;</span> <span class="token comment">/* rehashing not in progress if rehashidx == -1 */</span>

    <span class="token comment">/* Keep small vars at end for optimal (minimal) struct padding */</span>
    <span class="token class-name">int16_t</span> pauserehash<span class="token punctuation">;</span> <span class="token comment">/* If >0 rehashing is paused (&lt;0 indicates coding error) */</span>
    <span class="token keyword">signed</span> <span class="token keyword">char</span> ht_size_exp<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">/* exponent of size. (size = 1&lt;&lt;exp) */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">dictEntry</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>key<span class="token punctuation">;</span> <span class="token comment">//key</span>
    <span class="token keyword">union</span> <span class="token punctuation">{</span>
        <span class="token keyword">void</span> <span class="token operator">*</span>val<span class="token punctuation">;</span>
        <span class="token class-name">uint64_t</span> u64<span class="token punctuation">;</span>
        <span class="token class-name">int64_t</span> s64<span class="token punctuation">;</span>
        <span class="token keyword">double</span> d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> v<span class="token punctuation">;</span><span class="token comment">//value</span>
    <span class="token keyword">struct</span> <span class="token class-name">dictEntry</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>     <span class="token comment">/* Next entry in the same hash bucket. */</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>metadata<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>           <span class="token comment">/* An arbitrary number of bytes (starting at a
                                 * pointer-aligned address) of size as returned
                                 * by dictType's dictEntryMetadataBytes(). */</span>
<span class="token punctuation">}</span> dictEntry<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个新的哈希表</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Create a new hash table */</span>
dict <span class="token operator">*</span><span class="token function">dictCreate</span><span class="token punctuation">(</span>dictType <span class="token operator">*</span>type<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    dict <span class="token operator">*</span>d <span class="token operator">=</span> <span class="token function">zmalloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token operator">*</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">_dictInit</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> d<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Initialize the hash table */</span>
<span class="token keyword">int</span> <span class="token function">_dictInit</span><span class="token punctuation">(</span>dict <span class="token operator">*</span>d<span class="token punctuation">,</span> dictType <span class="token operator">*</span>type<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">_dictReset</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">_dictReset</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    d<span class="token operator">-></span>type <span class="token operator">=</span> type<span class="token punctuation">;</span>
    d<span class="token operator">-></span>rehashidx <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    d<span class="token operator">-></span>pauserehash <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> DICT_OK<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩容</strong></p>
<p><em>负载因子 = 哈希表已保存节点数量 / 哈希表大小</em></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">_dictExpandIfNeeded</span><span class="token punctuation">(</span>dict <span class="token operator">*</span>d<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* Incremental rehashing already in progress. Return. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">dictIsRehashing</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> DICT_OK<span class="token punctuation">;</span>

    <span class="token comment">/* If the hash table is empty expand it to the initial size. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">DICTHT_SIZE</span><span class="token punctuation">(</span>d<span class="token operator">-></span>ht_size_exp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">dictExpand</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> DICT_HT_INITIAL_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* If we reached the 1:1 ratio, and we are allowed to resize the hash
     * table (global setting) or we should avoid it but the ratio between
     * elements/buckets is over the "safe" threshold, we resize doubling
     * the number of buckets. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">>=</span> <span class="token function">DICTHT_SIZE</span><span class="token punctuation">(</span>d<span class="token operator">-></span>ht_size_exp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span>dict_can_resize <span class="token operator">||</span>
         d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">/</span> <span class="token function">DICTHT_SIZE</span><span class="token punctuation">(</span>d<span class="token operator">-></span>ht_size_exp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">></span> dict_force_resize_ratio<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token function">dictTypeExpandAllowed</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">dictExpand</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> DICT_OK<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩容代码</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Expand or create the hash table,
 * when malloc_failed is non-NULL, it'll avoid panic if malloc fails (in which case it'll be set to 1).
 * Returns DICT_OK if expand was performed, and DICT_ERR if skipped. */</span>
<span class="token keyword">int</span> <span class="token function">_dictExpand</span><span class="token punctuation">(</span>dict <span class="token operator">*</span>d<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> size<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> malloc_failed<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>malloc_failed<span class="token punctuation">)</span> <span class="token operator">*</span>malloc_failed <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">/* the size is invalid if it is smaller than the number of
     * elements already inside the hash table */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">dictIsRehashing</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token operator">||</span> d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">></span> size<span class="token punctuation">)</span>
        <span class="token keyword">return</span> DICT_ERR<span class="token punctuation">;</span>

    <span class="token comment">/* the new hash table */</span>
    dictEntry <span class="token operator">*</span><span class="token operator">*</span>new_ht_table<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> new_ht_used<span class="token punctuation">;</span>
    <span class="token keyword">signed</span> <span class="token keyword">char</span> new_ht_size_exp <span class="token operator">=</span> <span class="token function">_dictNextExp</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* Detect overflows */</span>
    <span class="token class-name">size_t</span> newsize <span class="token operator">=</span> <span class="token number">1ul</span><span class="token operator">&lt;&lt;</span>new_ht_size_exp<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newsize <span class="token operator">&lt;</span> size <span class="token operator">||</span> newsize <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>dictEntry<span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> newsize<span class="token punctuation">)</span>
        <span class="token keyword">return</span> DICT_ERR<span class="token punctuation">;</span>

    <span class="token comment">/* Rehashing to the same table size is not useful. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>new_ht_size_exp <span class="token operator">==</span> d<span class="token operator">-></span>ht_size_exp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span> DICT_ERR<span class="token punctuation">;</span>

    <span class="token comment">/* Allocate the new hash table and initialize all pointers to NULL */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>malloc_failed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        new_ht_table <span class="token operator">=</span> <span class="token function">ztrycalloc</span><span class="token punctuation">(</span>newsize<span class="token operator">*</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>dictEntry<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token operator">*</span>malloc_failed <span class="token operator">=</span> new_ht_table <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>malloc_failed<span class="token punctuation">)</span>
            <span class="token keyword">return</span> DICT_ERR<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span>
        new_ht_table <span class="token operator">=</span> <span class="token function">zcalloc</span><span class="token punctuation">(</span>newsize<span class="token operator">*</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>dictEntry<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    new_ht_used <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">/* Is this the first initialization? If so it's not really a rehashing
     * we just set the first hash table so that it can accept keys. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d<span class="token operator">-></span>ht_table<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        d<span class="token operator">-></span>ht_size_exp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> new_ht_size_exp<span class="token punctuation">;</span>
        d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> new_ht_used<span class="token punctuation">;</span>
        d<span class="token operator">-></span>ht_table<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> new_ht_table<span class="token punctuation">;</span>
        <span class="token keyword">return</span> DICT_OK<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* Prepare a second hash table for incremental rehashing */</span>
    d<span class="token operator">-></span>ht_size_exp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> new_ht_size_exp<span class="token punctuation">;</span>
    d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> new_ht_used<span class="token punctuation">;</span>
    d<span class="token operator">-></span>ht_table<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> new_ht_table<span class="token punctuation">;</span>
    d<span class="token operator">-></span>rehashidx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> DICT_OK<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* return DICT_ERR if expand was not performed */</span>
<span class="token keyword">int</span> <span class="token function">dictExpand</span><span class="token punctuation">(</span>dict <span class="token operator">*</span>d<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">_dictExpand</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> size<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>收缩</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Resize the table to the minimal size that contains all the elements,
 * but with the invariant of a USED/BUCKETS ratio near to &lt;= 1 */</span>
<span class="token keyword">int</span> <span class="token function">dictResize</span><span class="token punctuation">(</span>dict <span class="token operator">*</span>d<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> minimal<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dict_can_resize <span class="token operator">||</span> <span class="token function">dictIsRehashing</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> DICT_ERR<span class="token punctuation">;</span>
    minimal <span class="token operator">=</span> d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>minimal <span class="token operator">&lt;</span> DICT_HT_INITIAL_SIZE<span class="token punctuation">)</span>
        minimal <span class="token operator">=</span> DICT_HT_INITIAL_SIZE<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">dictExpand</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> minimal<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>rehash</strong></p>
<figure><img src="/redis/image-20220819002941258.png" alt="image-20220819002941258" tabindex="0" loading="lazy"><figcaption>image-20220819002941258</figcaption></figure>
<figure><img src="/redis/image-20220819003054848.png" alt="image-20220819003054848" tabindex="0" loading="lazy"><figcaption>image-20220819003054848</figcaption></figure>
<p><strong>渐进式rehash</strong></p>
<figure><img src="/redis/image-20220819003352662.png" alt="image-20220819003352662" tabindex="0" loading="lazy"><figcaption>image-20220819003352662</figcaption></figure>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Low level add or find:
 * This function adds the entry but instead of setting a value returns the
 * dictEntry structure to the user, that will make sure to fill the value
 * field as they wish.
 *
 * This function is also directly exposed to the user API to be called
 * mainly in order to store non-pointers inside the hash value, example:
 *
 * entry = dictAddRaw(dict,mykey,NULL);
 * if (entry != NULL) dictSetSignedIntegerVal(entry,1000);
 *
 * Return values:
 *
 * If key already exists NULL is returned, and "*existing" is populated
 * with the existing entry if existing is not NULL.
 *
 * If key was added, the hash entry is returned to be manipulated by the caller.
 */</span>
dictEntry <span class="token operator">*</span><span class="token function">dictAddRaw</span><span class="token punctuation">(</span>dict <span class="token operator">*</span>d<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>key<span class="token punctuation">,</span> dictEntry <span class="token operator">*</span><span class="token operator">*</span>existing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">long</span> index<span class="token punctuation">;</span>
    dictEntry <span class="token operator">*</span>entry<span class="token punctuation">;</span>
    <span class="token keyword">int</span> htidx<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">dictIsRehashing</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">_dictRehashStep</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* Get the index of the new element, or -1 if
     * the element already exists. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>index <span class="token operator">=</span> <span class="token function">_dictKeyIndex</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token function">dictHashKey</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> existing<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

    <span class="token comment">/* Allocate the memory and store the new entry.
     * Insert the element in top, with the assumption that in a database
     * system it is more likely that recently added entries are accessed
     * more frequently. */</span>
    htidx <span class="token operator">=</span> <span class="token function">dictIsRehashing</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">size_t</span> metasize <span class="token operator">=</span> <span class="token function">dictMetadataSize</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>
    entry <span class="token operator">=</span> <span class="token function">zmalloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token operator">*</span>entry<span class="token punctuation">)</span> <span class="token operator">+</span> metasize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>metasize <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">memset</span><span class="token punctuation">(</span><span class="token function">dictMetadata</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> metasize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    entry<span class="token operator">-></span>next <span class="token operator">=</span> d<span class="token operator">-></span>ht_table<span class="token punctuation">[</span>htidx<span class="token punctuation">]</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
    d<span class="token operator">-></span>ht_table<span class="token punctuation">[</span>htidx<span class="token punctuation">]</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> entry<span class="token punctuation">;</span>
    d<span class="token operator">-></span>ht_used<span class="token punctuation">[</span>htidx<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>

    <span class="token comment">/* Set the hash entry fields. */</span>
    <span class="token function">dictSetKey</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> entry<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> entry<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-quicklist" tabindex="-1"><a class="header-anchor" href="#_1-4-quicklist" aria-hidden="true">#</a> 1.4 QuickList</h3>
<p>数据结构</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklist</span> <span class="token punctuation">{</span>
    quicklistNode <span class="token operator">*</span>head<span class="token punctuation">;</span>
    quicklistNode <span class="token operator">*</span>tail<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> count<span class="token punctuation">;</span>        <span class="token comment">/* total count of all entries in all listpacks */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> len<span class="token punctuation">;</span>          <span class="token comment">/* number of quicklistNodes */</span>
    <span class="token keyword">signed</span> <span class="token keyword">int</span> fill <span class="token operator">:</span> QL_FILL_BITS<span class="token punctuation">;</span>       <span class="token comment">/* fill factor for individual nodes */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> compress <span class="token operator">:</span> QL_COMP_BITS<span class="token punctuation">;</span> <span class="token comment">/* depth of end nodes not to compress;0=off */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> bookmark_count<span class="token operator">:</span> QL_BM_BITS<span class="token punctuation">;</span>
    quicklistBookmark bookmarks<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklist<span class="token punctuation">;</span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistIter</span> <span class="token punctuation">{</span>
    quicklist <span class="token operator">*</span>quicklist<span class="token punctuation">;</span>
    quicklistNode <span class="token operator">*</span>current<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>zi<span class="token punctuation">;</span> <span class="token comment">/* points to the current element */</span>
    <span class="token keyword">long</span> offset<span class="token punctuation">;</span> <span class="token comment">/* offset in current listpack */</span>
    <span class="token keyword">int</span> direction<span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklistIter<span class="token punctuation">;</span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistEntry</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> quicklist <span class="token operator">*</span>quicklist<span class="token punctuation">;</span>
    quicklistNode <span class="token operator">*</span>node<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>zi<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>value<span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token keyword">long</span> longval<span class="token punctuation">;</span>
    <span class="token class-name">size_t</span> sz<span class="token punctuation">;</span>
    <span class="token keyword">int</span> offset<span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklistEntry<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>quicklist 的结构体跟链表的结构体类似，都包含了表头和表尾，区别在于 quicklist 的节点是 quicklistNode。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklist</span> <span class="token punctuation">{</span>
    <span class="token comment">//quicklist的链表头</span>
    quicklistNode <span class="token operator">*</span>head<span class="token punctuation">;</span>      <span class="token comment">//quicklist的链表头</span>
    <span class="token comment">//quicklist的链表头</span>
    quicklistNode <span class="token operator">*</span>tail<span class="token punctuation">;</span> 
    <span class="token comment">//所有压缩列表中的总元素个数</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> count<span class="token punctuation">;</span>
    <span class="token comment">//quicklistNodes的个数</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> len<span class="token punctuation">;</span>       
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span> quicklist<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来看看，quicklistNode 的结构定义：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token punctuation">{</span>
    <span class="token comment">//前一个quicklistNode</span>
    <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token operator">*</span>prev<span class="token punctuation">;</span>     <span class="token comment">//前一个quicklistNode</span>
    <span class="token comment">//下一个quicklistNode</span>
    <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>     <span class="token comment">//后一个quicklistNode</span>
    <span class="token comment">//quicklistNode指向的压缩列表</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>zl<span class="token punctuation">;</span>              
    <span class="token comment">//压缩列表的的字节大小</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> sz<span class="token punctuation">;</span>                
    <span class="token comment">//压缩列表的元素个数</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> count <span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">;</span>        <span class="token comment">//ziplist中的元素个数 </span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span> quicklistNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，quicklistNode 结构体里包含了前一个节点和下一个节点指针，这样每个 quicklistNode 形成了一个双向链表。但是链表节点的元素不再是单纯保存元素值，而是保存了一个压缩列表，所以 quicklistNode 结构体里有个指向压缩列表的指针 *zl。</p>
<p>我画了一张图，方便你理解 quicklist 数据结构。</p>
<figure><img src="https://img-blog.csdnimg.cn/img_convert/f46cbe347f65ded522f1cc3fd8dba549.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>在向 quicklist 添加一个元素的时候，不会像普通的链表那样，直接新建一个链表节点。而是会检查插入位置的压缩列表是否能容纳该元素，如果能容纳就直接保存到 quicklistNode 结构里的压缩列表，如果不能容纳，才会新建一个新的 quicklistNode 结构。</p>
<p>quicklist 会控制 quicklistNode 结构里的压缩列表的大小或者元素个数，来规避潜在的连锁更新的风险，但是这并没有完全解决连锁更新的问题。</p>
<h3 id="_1-5-skiplist" tabindex="-1"><a class="header-anchor" href="#_1-5-skiplist" aria-hidden="true">#</a> 1.5 SkipList</h3>
<p>数据结构</p>
<div class="language-C line-numbers-mode" data-ext="C"><pre v-pre class="language-C"><code>typedef struct zskiplistNode {
    //value值
    sds ele;
    //权重值
    double score;
    //后向指针
    struct zskiplistNode *backward;
    //节点的level数组 保存前向指针和跨度
    struct zskiplistLevel {
        struct zskiplistNode *forward;
        unsigned long span;
    } level[];
} zskiplistNode;

typedef struct zskiplist {
    struct zskiplistNode *header, *tail;
    unsigned long length;
    int level;
} zskiplist;

typedef struct zset {
    dict *dict;
    zskiplist *zsl;
} zset;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Zset 对象在执行数据插入或是数据更新的过程中，会依次在跳表和哈希表中插入或更新相应的数据，从而保证了跳表和哈希表中记录的信息一致。</p>
<p>Zset 对象能支持范围查询（如 ZRANGEBYSCORE 操作），这是因为它的数据结构设计采用了跳表，而又能以常数复杂度获取元素权重（如 ZSCORE 操作），这是因为它同时采用了哈希表进行索引。</p>
<p>可能很多人会奇怪，为什么我开头说 Zset 对象的底层数据结构是「压缩列表」或者「跳表」，而没有说哈希表呢？</p>
<p>Zset 对象在使用跳表作为数据结构的时候，是使用由「哈希表+跳表」组成的 struct zset，但是我们讨论的时候，都会说跳表是 Zset 对象的底层数据结构，而不会提及哈希表，是因为 struct zset 中的哈希表只是用于以常数复杂度获取元素权重，大部分操作都是跳表实现的。</p>
<p>接下来，详细的说下跳表。</p>
<h3 id="跳表结构设计" tabindex="-1"><a class="header-anchor" href="#跳表结构设计" aria-hidden="true">#</a> <a href="https://xiaolincoding.com/redis/data_struct/data_struct.html#%E8%B7%B3%E8%A1%A8%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1" target="_blank" rel="noopener noreferrer">#<ExternalLinkIcon/></a>跳表结构设计</h3>
<p>链表在查找元素的时候，因为需要逐一查找，所以查询效率非常低，时间复杂度是O(N)，于是就出现了跳表。<strong>跳表是在链表基础上改进过来的，实现了一种「多层」的有序链表</strong>，这样的好处是能快读定位数据。</p>
<p>那跳表长什么样呢？我这里举个例子，下图展示了一个层级为 3 的跳表。</p>
<figure><img src="https://img-blog.csdnimg.cn/img_convert/2ae0ed790c7e7403f215acb2bd82e884.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>图中头节点有 L0~L2 三个头指针，分别指向了不同层级的节点，然后每个层级的节点都通过指针连接起来：</p>
<ul>
<li>L0 层级共有 5 个节点，分别是节点1、2、3、4、5；</li>
<li>L1 层级共有 3 个节点，分别是节点 2、3、5；</li>
<li>L2 层级只有 1 个节点，也就是节点 3 。</li>
</ul>
<p>如果我们要在链表中查找节点 4 这个元素，只能从头开始遍历链表，需要查找 4 次，而使用了跳表后，只需要查找 2 次就能定位到节点 4，因为可以在头节点直接从 L2 层级跳到节点 3，然后再往前遍历找到节点 4。</p>
<p>可以看到，这个查找过程就是在多个层级上跳来跳去，最后定位到元素。当数据量很大时，跳表的查找复杂度就是 O(logN)。</p>
<p>那跳表节点是怎么实现多层级的呢？这就需要看「跳表节点」的数据结构了，如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token punctuation">{</span>
    <span class="token comment">//Zset 对象的元素值</span>
    sds ele<span class="token punctuation">;</span>
    <span class="token comment">//元素权重值</span>
    <span class="token keyword">double</span> score<span class="token punctuation">;</span>
    <span class="token comment">//后向指针</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>backward<span class="token punctuation">;</span>
  
    <span class="token comment">//节点的level数组，保存每层上的前向指针和跨度</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistLevel</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>forward<span class="token punctuation">;</span>
        <span class="token keyword">unsigned</span> <span class="token keyword">long</span> span<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> level<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> zskiplistNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Zset 对象要同时保存「元素」和「元素的权重」，对应到跳表节点结构里就是 sds 类型的 ele 变量和 double 类型的 score 变量。每个跳表节点都有一个后向指针（struct zskiplistNode *backward），指向前一个节点，目的是为了方便从跳表的尾节点开始访问节点，这样倒序查找时很方便。</p>
<p>跳表是一个带有层级关系的链表，而且每一层级可以包含多个节点，每一个节点通过指针连接起来，实现这一特性就是靠跳表节点结构体中的<strong>zskiplistLevel 结构体类型的 level 数组</strong>。</p>
<p>level 数组中的每一个元素代表跳表的一层，也就是由 zskiplistLevel 结构体表示，比如 leve[0] 就表示第一层，leve[1] 就表示第二层。zskiplistLevel 结构体里定义了「指向下一个跳表节点的指针」和「跨度」，跨度时用来记录两个节点之间的距离。</p>
<p>比如，下面这张图，展示了各个节点的跨度。</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/redis/数据类型/3层跳表-跨度.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>第一眼看到跨度的时候，以为是遍历操作有关，实际上并没有任何关系，遍历操作只需要用前向指针（struct zskiplistNode *forward）就可以完成了。</p>
<p><strong>跨度实际上是为了计算这个节点在跳表中的排位</strong>。具体怎么做的呢？因为跳表中的节点都是按序排列的，那么计算某个节点排位的时候，从头节点点到该结点的查询路径上，将沿途访问过的所有层的跨度累加起来，得到的结果就是目标节点在跳表中的排位。</p>
<p>举个例子，查找图中节点 3 在跳表中的排位，从头节点开始查找节点 3，查找的过程只经过了一个层（L2），并且层的跨度是 3，所以节点 3 在跳表中的排位是 3。</p>
<p>另外，图中的头节点其实也是 zskiplistNode 跳表节点，只不过头节点的后向指针、权重、元素值都没有用到，所以图中省略了这部分。</p>
<p>问题来了，由谁定义哪个跳表节点是头节点呢？这就介绍「跳表」结构体了，如下所示：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">zskiplist</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>header<span class="token punctuation">,</span> <span class="token operator">*</span>tail<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> length<span class="token punctuation">;</span>
    <span class="token keyword">int</span> level<span class="token punctuation">;</span>
<span class="token punctuation">}</span> zskiplist<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跳表结构里包含了：</p>
<ul>
<li>跳表的头尾节点，便于在O(1)时间复杂度内访问跳表的头节点和尾节点；</li>
<li>跳表的长度，便于在O(1)时间复杂度获取跳表节点的数量；</li>
<li>跳表的最大层数，便于在O(1)时间复杂度获取跳表中层高最大的那个节点的层数量；</li>
</ul>
<h3 id="跳表节点查询过程" tabindex="-1"><a class="header-anchor" href="#跳表节点查询过程" aria-hidden="true">#</a> <a href="https://xiaolincoding.com/redis/data_struct/data_struct.html#%E8%B7%B3%E8%A1%A8%E8%8A%82%E7%82%B9%E6%9F%A5%E8%AF%A2%E8%BF%87%E7%A8%8B" target="_blank" rel="noopener noreferrer">#<ExternalLinkIcon/></a>跳表节点查询过程</h3>
<p>查找一个跳表节点的过程时，跳表会从头节点的最高层开始，逐一遍历每一层。在遍历某一层的跳表节点时，会用跳表节点中的 SDS 类型的元素和元素的权重来进行判断，共有两个判断条件：</p>
<ul>
<li>如果当前节点的权重「小于」要查找的权重时，跳表就会访问该层上的下一个节点。</li>
<li>如果当前节点的权重「等于」要查找的权重时，并且当前节点的 SDS 类型数据「小于」要查找的数据时，跳表就会访问该层上的下一个节点。</li>
</ul>
<p>如果上面两个条件都不满足，或者下一个节点为空时，跳表就会使用目前遍历到的节点的 level 数组里的下一层指针，然后沿着下一层指针继续查找，这就相当于跳到了下一层接着查找。</p>
<p>举个例子，下图有个 3 层级的跳表。</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/redis/数据类型/3层跳表-跨度.drawio.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>如果要查找「元素：abcd，权重：4」的节点，查找的过程是这样的：</p>
<ul>
<li>先从头节点的最高层开始，L2 指向了「元素：abc，权重：3」节点，这个节点的权重比要查找节点的小，所以要访问该层上的下一个节点；</li>
<li>但是该层的下一个节点是空节点（ leve[2]指向的是空节点），于是就会跳到「元素：abc，权重：3」节点的下一层去找，也就是 leve[1];</li>
<li>「元素：abc，权重：3」节点的 leve[1] 的下一个指针指向了「元素：abcde，权重：4」的节点，然后将其和要查找的节点比较。虽然「元素：abcde，权重：4」的节点的权重和要查找的权重相同，但是当前节点的 SDS 类型数据「大于」要查找的数据，所以会继续跳到「元素：abc，权重：3」节点的下一层去找，也就是 leve[0]；</li>
<li>「元素：abc，权重：3」节点的 leve[0] 的下一个指针指向了「元素：abcd，权重：4」的节点，该节点正是要查找的节点，查询结束。</li>
</ul>
<h3 id="跳表节点层数设置" tabindex="-1"><a class="header-anchor" href="#跳表节点层数设置" aria-hidden="true">#</a> <a href="https://xiaolincoding.com/redis/data_struct/data_struct.html#%E8%B7%B3%E8%A1%A8%E8%8A%82%E7%82%B9%E5%B1%82%E6%95%B0%E8%AE%BE%E7%BD%AE" target="_blank" rel="noopener noreferrer">#<ExternalLinkIcon/></a>跳表节点层数设置</h3>
<p>跳表的相邻两层的节点数量的比例会影响跳表的查询性能。</p>
<p>举个例子，下图的跳表，第二层的节点数量只有 1 个，而第一层的节点数量有 6 个。</p>
<figure><img src="https://img-blog.csdnimg.cn/img_convert/2802786ab4f52c1e248904e5cef33a74.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>这时，如果想要查询节点 6，那基本就跟链表的查询复杂度一样，就需要在第一层的节点中依次顺序查找，复杂度就是 O(N) 了。所以，为了降低查询复杂度，我们就需要维持相邻层结点数间的关系。</p>
<p><strong>跳表的相邻两层的节点数量最理想的比例是 2:1，查找复杂度可以降低到 O(logN)</strong>。</p>
<p>下图的跳表就是，相邻两层的节点数量的比例是 2 : 1。</p>
<figure><img src="https://img-blog.csdnimg.cn/img_convert/cdc14698f629c74bf5a239cc8a611aeb.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<blockquote>
<p>那怎样才能维持相邻两层的节点数量的比例为 2 : 1 呢？</p>
</blockquote>
<p>如果采用新增节点或者删除节点时，来调整跳表节点以维持比例的方法的话，会带来额外的开销。</p>
<p>Redis 则采用一种巧妙的方法是，<strong>跳表在创建节点的时候，随机生成每个节点的层数</strong>，并没有严格维持相邻两层的节点数量比例为 2 : 1 的情况。</p>
<p>具体的做法是，<strong>跳表在创建节点时候，会生成范围为[0-1]的一个随机数，如果这个随机数小于 0.25（相当于概率 25%），那么层数就增加 1 层，然后继续生成下一个随机数，直到随机数的结果大于 0.25 结束，最终确定该节点的层数</strong>。</p>
<p>这样的做法，相当于每增加一层的概率不超过 25%，层数越高，概率越低，层高最大限制是 64。</p>
<h3 id="为什么用跳表而不用平衡树" tabindex="-1"><a class="header-anchor" href="#为什么用跳表而不用平衡树" aria-hidden="true">#</a> <a href="https://xiaolincoding.com/redis/data_struct/data_struct.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8%E8%B7%B3%E8%A1%A8%E8%80%8C%E4%B8%8D%E7%94%A8%E5%B9%B3%E8%A1%A1%E6%A0%91" target="_blank" rel="noopener noreferrer">#<ExternalLinkIcon/></a>为什么用跳表而不用平衡树？</h3>
<p>这里插一个常见的面试题：为什么 Zset 的实现用跳表而不用平衡树（如 AVL树、红黑树等）？</p>
<p>对于<a href="https://news.ycombinator.com/item?id=1171423" target="_blank" rel="noopener noreferrer">这个问题 (opens new window)<ExternalLinkIcon/></a>，Redis的作者 @antirez 是怎么说的：</p>
<blockquote>
<p>There are a few reasons:</p>
<ol>
<li>They are not very memory intensive. It's up to you basically. Changing parameters about the probability of a node to have a given number of levels will make then less memory intensive than btrees.</li>
<li>A sorted set is often target of many ZRANGE or ZREVRANGE operations, that is, traversing the skip list as a linked list. With this operation the cache locality of skip lists is at least as good as with other kind of balanced trees.</li>
<li>They are simpler to implement, debug, and so forth. For instance thanks to the skip list simplicity I received a patch (already in Redis master) with augmented skip lists implementing ZRANK in O(log(N)). It required little changes to the code.</li>
</ol>
</blockquote>
<p>简单翻译一下，主要是从内存占用、对范围查找的支持、实现难易程度这三方面总结的原因：</p>
<ul>
<li>它们不是非常内存密集型的。基本上由你决定。改变关于节点具有给定级别数的概率的参数将使其比 btree 占用更少的内存。</li>
<li>Zset 经常需要执行 ZRANGE 或 ZREVRANGE 的命令，即作为链表遍历跳表。通过此操作，跳表的缓存局部性至少与其他类型的平衡树一样好。</li>
<li>它们更易于实现、调试等。例如，由于跳表的简单性，我收到了一个补丁（已经在Redis master中），其中扩展了跳表，在 O(log(N) 中实现了 ZRANK。它只需要对代码进行少量修改。</li>
</ul>
<p>我再详细补充点：</p>
<ul>
<li><strong>从内存占用上来比较，跳表比平衡树更灵活一些</strong>。平衡树每个节点包含 2 个指针（分别指向左右子树），而跳表每个节点包含的指针数目平均为 1/(1-p)，具体取决于参数 p 的大小。如果像 Redis里的实现一样，取 p=1/4，那么平均每个节点包含 1.33 个指针，比平衡树更有优势。</li>
<li><strong>在做范围查找的时候，跳表比平衡树操作要简单</strong>。在平衡树上，我们找到指定范围的小值之后，还需要以中序遍历的顺序继续寻找其它不超过大值的节点。如果不对平衡树进行一定的改造，这里的中序遍历并不容易实现。而在跳表上进行范围查找就非常简单，只需要在找到小值之后，对第 1 层链表进行若干步的遍历就可以实现。</li>
<li><strong>从算法实现难度上来比较，跳表比平衡树要简单得多</strong>。平衡树的插入和删除操作可能引发子树的调整，逻辑复杂，而跳表的插入和删除只需要修改相邻节点的指针，操作简单又快速。</li>
</ul>
</div></template>



import{_ as e,V as o,W as c,a0 as d}from"./framework-3845b112.js";const r="/distrubutedsystem/rpc/image-20221021203931934.png",t="/distrubutedsystem/rpc/image-20221031212018616.png",i={},n=d('<h1 id="rpc框架" tabindex="-1"><a class="header-anchor" href="#rpc框架" aria-hidden="true">#</a> RPC框架</h1><h2 id="_1-rpc简介" tabindex="-1"><a class="header-anchor" href="#_1-rpc简介" aria-hidden="true">#</a> 1.RPC简介</h2><figure><img src="'+r+'" alt="image-20221021203931934" tabindex="0" loading="lazy"><figcaption>image-20221021203931934</figcaption></figure><p>RPC是不同JVM之间的方法调用过程。</p><p>通过RPC将调用过程封装为黑盒，供服务使用方使用。</p><p>为了达到最终的调用目的，需要具体实现几个模块</p><p>序列化模块：将java pojo对象转化为json格式 字节数组，或其他的方便</p><h3 id="_1-1-dubbo如何实现rpc" tabindex="-1"><a class="header-anchor" href="#_1-1-dubbo如何实现rpc" aria-hidden="true">#</a> 1.1 Dubbo如何实现RPC</h3><figure><img src="'+t+'" alt="image-20221031212018616" tabindex="0" loading="lazy"><figcaption>image-20221031212018616</figcaption></figure><ul><li><strong>Config 配置层</strong>：对外配置接口，以 <code>ServiceConfig</code>, <code>ReferenceConfig</code> 为中心，可以直接初始化配置类，也可以通过 spring 解析配置生成配置类</li><li><strong>Proxy 服务代理层</strong>：服务接口透明代理，生成服务的客户端 Stub 和服务器端 Skeleton, 以 <code>ServiceProxy</code> 为中心，扩展接口为 <code>ProxyFactory</code></li><li><strong>Registry 注册中心层</strong>：封装服务地址的注册与发现，以服务 URL 为中心，扩展接口为 <code>RegistryFactory</code>, <code>Registry</code>, <code>RegistryService</code></li><li><strong>Cluster 路由层</strong>：封装多个提供者的路由及负载均衡，并桥接注册中心，以 <code>Invoker</code> 为中心，扩展接口为 <code>Cluster</code>, <code>Directory</code>, <code>Router</code>, <code>LoadBalance</code></li><li><strong>Monitor 监控层</strong>：RPC 调用次数和调用时间监控，以 <code>Statistics</code> 为中心，扩展接口为 <code>MonitorFactory</code>, <code>Monitor</code>, <code>MonitorService</code></li><li><strong>Protocol 远程调用层</strong>：封装 RPC 调用，以 <code>Invocation</code>, <code>Result</code> 为中心，扩展接口为 <code>Protocol</code>, <code>Invoker</code>, <code>Exporter</code></li><li><strong>Exchange 信息交换层</strong>：封装请求响应模式，同步转异步，以 <code>Request</code>, <code>Response</code> 为中心，扩展接口为 <code>Exchanger</code>, <code>ExchangeChannel</code>, <code>ExchangeClient</code>, <code>ExchangeServer</code></li><li><strong>Transport 网络传输层</strong>：抽象 mina 和 netty 为统一接口，以 <code>Message</code> 为中心，扩展接口为 <code>Channel</code>, <code>Transporter</code>, <code>Client</code>, <code>Server</code>, <code>Codec</code></li><li><strong>Serialize 数据序列化层</strong>：可复用的一些工具，扩展接口为 <code>Serialization</code>, <code>ObjectInput</code>, <code>ObjectOutput</code>, <code>ThreadPool</code></li></ul>',10),a=[n];function s(g,l){return o(),c("div",null,a)}const h=e(i,[["render",s],["__file","rpc.html.vue"]]);export{h as default};
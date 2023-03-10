---
lang: zh-CN
title: RPC
description: 计算机网络
category: 
 - Network
tag:
 - 计算机网络
---

## 1.常见的RPC框架

RPC 框架说白了就是让你可以像调用本地方法一样调用远程服务提供的方法，而不需要关心底层的通信细节。简单地说就让远程服务调用更加简单、透明。 RPC包含了客户端（Client）和服务端（Server）

业界主流的 RPC 框架整体上分为三类：

- 支持多语言的 RPC 框架，比较成熟的有 Google 的 gRPC、Apache（Facebook）的 Thrift；
- 只支持特定语言的 RPC 框架，例如新浪微博的 Motan；
- 支持服务治理等服务化特性的分布式服务框架，其底层内核仍然是 RPC 框架, 例如阿里的 Dubbo。

## 2.gRPC

- grpc可以跨语言使用。支持多种语言 支持C++、Java、Go、Python、Ruby、C#、Node.js、Android Java、Objective-C、PHP等编程语言
- 基于 IDL ( 接口定义语言（Interface Define Language）)文件定义服务，通过 proto3 工具生成指定语言的数据结构、服务端接口以及客户端 Stub；
- 通信协议基于标准的 HTTP/2 设计，支持·双向流、消息头压缩、单 TCP 的多路复用、服务端推送等特性，这些特性使得 gRPC 在移动端设备上更加省电和节省网络流量；
- 序列化支持 PB（Protocol Buffer）和 JSON，PB 是一种语言无关的高性能序列化框架，基于 HTTP/2 + PB, 保障了 RPC 调用的高性能。
- 安装简单，扩展方便（用该框架每秒可达到百万个RPC）

gRPC消息使用一种有效的二进制消息格式protobuf进行序列化。Protobuf在服务器和客户机上的序列化非常快。Protobuf序列化后的消息体积很小，能够有效负载，在移动应用程序等有限带宽场景中显得很重要。与采用文本格式的JSON相比，采用二进制格式的protobuf在速度上可以达到前者的5倍！Auth0网站所做的性能测试结果显示，protobuf和JSON的优势差异在Java、Python等环境中尤为明显。下图是Auth0在两个Spring Boot应用程序间所做的对比测试结果。

- gRPC是为HTTP/2而设计的，它是HTTP的一个主要版本，与HTTP 1.x相比具有显著的性能优势：：
- 二进制框架和压缩。HTTP/2协议在发送和接收方面都很紧凑和高效。通过单个TCP连接复用多个HTTP/2调用。多路复用消除了线头阻塞。

### **代码生成**

- 所有gRPC框架都为代码生成提供了一流的支持。gRPC开发的核心文件是*.proto文件 ，它定义了gRPC服务和消息的约定。根据这个文件，gRPC框架将生成服务基类，消息和完整的客户端代码。
- 通过在服务器和客户端之间共享*.proto文件，可以从端到端生成消息和客户端代码。客户端的代码生成消除了客户端和服务器上的重复消息，并为您创建了一个强类型的客户端。无需编写客户端代码，可在具有许多服务的应用程序中节省大量开发时间。

### **严格的规范**

- 不存在具有JSON的HTTP API的正式规范。开发人员不需要讨论URL，HTTP动词和响应代码的最佳格式。（想想，是用Post还是Get好？使用Get还是用Put好？一想到有选择恐惧症的你是不是又开了纠结，然后浪费了大量的时间）
- 该gRPC规范是规定有关gRPC服务必须遵循的格式。gRPC消除了争论并节省了开发人员的时间，因为gPRC在各个平台和实现之间是一致的。

### **流**

HTTP/2为长期的实时通信流提供了基础。gRPC通过HTTP/2为流媒体提供一流的支持。

gRPC**服务支持**所有流组合：

- 一元（没有流媒体）： 简单rpc 这就是一般的rpc调用，一个请求对象对应一个返回对象。客户端发起一次请求，服务端响应一个数据，即标准RPC通信。
- 服务器到客户端流：客户端流式rpc 客户端传入多个请求对象，服务端返回一个响应结果。**应用场景：物联网终端向服务器报送数据。**
- 客户端到服务器流：服务端流式rpc 一个请求对象，服务端可以传回多个结果对象。服务端流 RPC 下，客户端发出一个请求，但不会立即得到一个响应，而是在服务端与客户端之间建立一个单向的流，服务端可以随时向流中写入多个响应消息，最后主动关闭流，而客户端需要监听这个流，不断获取响应直到流关闭。**应用场景举例：典型的例子是客户端向服务端发送一个股票代码，服务端就把该股票的实时数据源源不断的返回给客户端。**
- 双向流媒体：双向流式rpc 结合客户端流式rpc和服务端流式rpc，可以传入多个对象，返回多个响应对象。**应用场景：聊天应用。**

### **截至时间/超时和取消**

- gRPC允许客户端指定他们愿意等待RPC完成的时间。该期限被发送到服务端，服务端可以决定在超出了限期时采取什么行动。例如，服务器可能会在超时时取消正在进行的gRPC / HTTP /数据库请求。
- 通过子gRPC调用截至时间和取消操作有助于实施资源使用限制。

### **劣势**

### **浏览器支持有限**

当下，不可能直接从浏览器调用gRPC服务。**gRPC大量使用HTTP/2功能，没有浏览器提供支持gRPC客户机的Web请求所需的控制级别**。例如，浏览器不允许调用者要求使用的HTTP/2，或者提供对底层HTTP/2框架的访问。

gRPC Web是gRPC团队的一项附加技术，它在浏览器中提供有限的gRPC支持。gRPC Web由两部分组成：支持所有现代浏览器的JavaScript客户端和服务器上的gRPC Web代理。gRPC Web客户端调用代理，代理将在gRPC请求上转发到gRPC服务器。

gRPC Web并非支持所有gRPC功能。不支持客户端和双向流，并且对服务器流的支持有限。

### **不是人类可读的**

HTTP API请求以文本形式发送，可以由人读取和创建。

默认情况下，gRPC消息使用protobuf编码。**虽然protobuf的发送和接收效率很高，但它的二进制格式是不可读的*8。protobuf需要在*.proto文件中指定的消息接口描述才能正确反序列化。需要额外的工具来分析线路上的Protobuf有效负载，并手工编写请求。

存在诸如服务器反射和gRPC命令行工具等功能，以帮助处理二进制protobuf消息。另外，Protobuf消息支持与JSON之间的转换。内置的JSON转换提供了一种有效的方法，可以在调试时将Protobuf消息转换为可读的形式。

## **gRPC场景**

### **适合场景**

gRPC非常适合以下场景：

- 微服务 - gRPC设计为低延迟和高吞吐量通信。gRPC非常适用于效率至关重要的轻型微服务。
- 点对点实时通信 - gRPC对双向流媒体提供出色的支持。gRPC服务可以实时推送消息而无需轮询。
- 多语言混合开发环境 - gRPC工具支持所有流行的开发语言，使gRPC成为多语言开发环境的理想选择。
- 网络受限环境 - 使用Protobuf（一种轻量级消息格式）序列化gRPC消息。gRPC消息始终小于等效的JSON消息。

### **不建议使用场景**

在以下场景中，建议使用其他框架而不是gRPC：

- 浏览器可访问的API - 浏览器不完全支持gRPC。gRPC-Web可以提供浏览器支持，但它有局限性并引入了服务器代理。
- 广播实时通信 - gRPC支持通过流媒体进行实时通信，但不存在向已注册连接广播消息的概念。例如，在应该将新聊天消息发送到聊天室中的所有客户端的聊天室场景中，需要每个gRPC呼叫以单独地将新的聊天消息流传输到客户端。对于这种场景，SignalR是这种情况的有用框架。SignalR具有持久连接的概念和对广播消息的内置支持。
- 进程间通信 - 进程必须承载HTTP/2服务才能接受传入的gRPC调用。对于Windows，进程间通信管道是一种快速，轻量级的通信方法。

## 3.Thrift

Thrift最初由Facebook研发，主要用于各个服务之间的RPC通信，支持跨语言，常用的语言比如C++, Java, Python, PHP, Ruby, Erlang, Perl, Haskell, C#, Cocoa, JavaScript, Node.js, Smalltalk, and OCaml都支持。Thrift是一个典型的CS（客户端/服务端）结构，客户端和服务端可以使用不同的语言开发。既然客户端和服务端能使用不同的语言开发，那么一定就要有一种中间语言来关联客户端和服务端的语言，没错，这种语言就是IDL（Interface Description Language）。

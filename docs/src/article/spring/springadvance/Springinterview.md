---
lang: zh-CN
title: Spring面试常考题目
description: Spring解析
category: Spring
tag: 
 - Spring
 - Advanced
---

## 1.ApplicationContext的refresh方法干了什么？

### 1.1prepareRefresh

创建准备Environment环境

systemProperties、systemEnvironment、PropertySource里的键值信息

### 1.2 obtainFreshBeanFactory

![image-20220825123019978](/spring/springadvance/image-20220825123019978.png)

获取创建BeanFactory、从xml 注解等地方拿到BeanDefinition

### 1.3 prepareBeanFactory

完善BeanFactory

beanExpressionResolver：解析表达式

prepertyEditoregistrars：类型装换

resolvableDependencies：管理特殊的bean：容器 beanfactory等

beanPostProcessors：bean后处理器：ApplicationContextAwareProcessor

### 1.4 postProcessorBeanFactory

模板方法设计模式

留给子类扩展

如web环境的需要利用他注册新的Scope 完善beanFactory

### 1.5 invokeBeanFactoryPostProcessors

充当beanfactory后处理器扩展beandefinition

如configurationclasspostProcessors 解析@configuration @Bean @Import @Propertysource

### 1.6 registerBeanPostProcessors

充当bean的扩展点 可以在实例化阶段 依赖注入 初始化阶段扩展

AutowiredAnnotationBeanPostProcessors @Autowired @ Value

### 1.7 initMessageSource

实现国际化功能

找单例池有无messageSource实现单例 如果没有就用默认的

### 1.8 initApplicationEventMulticaster

事件处理的步骤 发布事件给监听器

找是否有multicaster 如果没有就用默认

![image-20220825124448297](/spring/springadvance/image-20220825124448297.png)

### 1.9 onRefresh

Boot子类可以在这一步准备webserver 内嵌web容器

模板方法设计模式

### 1.10 registerListeners

注册监听器到map 有事件来的时候到map里找感兴趣的事件

实现了ApplicationListener接口

或者编程添加的监听器@EventListener

接受事件

### 1.11 finishBeanFactoryInitialization

conversionService 对propertyEditorRegistrars补充

embeddedValueResolvers 对${}进行解析

singletonObjects：根据beandefinition 创建出来 保存单例对象

### 1.12 finishRefresh

注册lifeCycleProcessor 注册bean单例的生命周期管理

![image-20220825125148601](/spring/springadvance/image-20220825125148601.png)





## 2.Bean的生命周期

### 2.1处理名称，检查缓存

如果缓存中有Bean 那么从缓存中取得bean

### 2.2处理父子容器

如果缓存中没有去父容器找

### 2.3 dependsOn

dependsOn用于没有依赖关系的bean创建的顺序管理

### 2.4按Scope创建Bean

单例bean从容器refresh的时候创建 close的时候销毁 beanfactory会记录谁要调用销毁方法

多例bean从首次getbean的时候被创建 调用beanfactory的destroybean来销毁 

request从首次调用request创建 关闭request时被销毁

singleton会缓存bean 

prototype不会缓存 每次创建新的

### 2.5创建Bean

![image-20220825130540338](/spring/springadvance/image-20220825130540338.png)

#### 5.1 创建bean实例

**有自定义TargetSource的情况**   

由AnnotationAwareAspectJAutoProxyCreator创建代理返回

**Supplier方式创建bean实例**    

supplier不需要通过反射，而是在supplierFactory中直接实例化对象，所以supplier的效率比其他方式要高。

**FactoryMethod方式创建**

静态工厂和实例工厂 有参数需参数解析 多个工厂方法 还需权重筛选

**AntowiredAnnotationBeanPostProcessor创建**

优先选择@autowired注解的构造

若有唯一的带参构造 也会入选

**默认构造**

没找到合适的 采用默认的构造



#### 5.2 依赖注入

**AutowiredAnnotationBeanPostProcessor** 

@Autowired @Value 封装为injectionMetadata

**CommonAnnotationBeanPostProcessor**  

 @Resource

**resolveDependency**

解析Optional包裹的值

ObjectFactory 

@Lazy

集合 数组

泛型 @Qualifier

**AUTOWIRE_BY_NAME**

根据set方法名后的名字  名字来匹配 修改mbd的propertyvalues

**AUTOWIRE_BY_TYPE**

根据类型匹配

**applypropertyValues** 

根据mbd的propertyvalues精确匹配

#### 依赖注入优先级

@Autowired 最低

AUTOWIRE_BY_NAME/TYPE 次之

精确注入 最高





#### 5.3 初始化

实现Aware接口

@PostCounstruct

由CommonAnnotationBeanpostProcessor解析 

initializingbean接口回调执行初始化

initmethod指定 或@Bean（init）

创建aop代理

#### **初始化优先级**

1.Aware接口

@Postconstruct

initializingBean

指定initmethod



#### 5.4注册和销毁bean

实现了disposablebean接口autocloseable接口为可销毁bena

自定义了destroymethod 为可销毁bean

@Bean close

@Predestroy

singleton 存在beanfactory 的对象

自定义scope 存在该域对象中

prototype不会存储

存的时候会封装为disposablebeanadapter  适配器模式

### 2.6 类型转换

getbean的requiretype不是真的类型 需要转换

### 2.7 销毁bean

singleton bean的销毁在applicationcontext是 逐一找到disposablebean的名字 逐一销毁

#### 优先级

@predestroy

disposablebean

destroymethod

![image-20220825135823899](/spring/springadvance/image-20220825135823899.png)



## 3.Spring事务失效场景

#### 3.1 检查异常不会回滚（默认只会检查error、runtimeexception 等非检查异常）

解决方法：@Transactional(rollbackfor = Exception.class)

#### 3.2 没有把错误抛出到外层

外层事务控制不知道发生异常

#### 3.3 aop切面顺序 @Around包裹后 如果@Around没有把异常抛出 会有异常

调整切面的@Order

切面类抛出异常

#### 3.4 @transactional 加在了非public 方法上

#### 3.5 父子容器导致失效

子容器扫描范围过大 如果找不到 会往父容器去找 子容器有 不回去拿父容器的

#### 3.6 在一个方法内调另一个方法时 不会走代理 导致事务失效

把proxy注入依赖 通过proxy调另外一个方法

#### 3.7 多线程无法保证原子性

synchronized范围太小 没有覆盖commit

没包括代理的问题

可以在数据库的层面做控制 for update



## 4.SpringMVC执行流程

![image-20220825145442932](/spring/springadvance/image-20220825145442932.png)

![image-20220825145537481](/spring/springadvance/image-20220825145537481.png)

![image-20220825145655091](/spring/springadvance/image-20220825145655091.png)

## 5.Spring常见注解

- lang

  - @nonnull

  - @nonnullapi

  - @nonnullfields

  - @nullable

  - @usessunmisc

- 事务

  - @EnabletransactionManagement：启用声明式管理

  - @transactional:   public类的方法是受事务控制类的公共方法受到控制

- 核心

  - @aliasFor：别名

  - @Order：bean执行的顺序、数字越小优先级越高

- 切面

  - @EnableAspectJAutoProxy：启用AOP自动代理

- 组件扫描和配置类

  - @Component：标注了的类 被纳入spring容器管理

  - @Controller：

  - @Service：

  - @Repository：
  - @Indexed： 

  - @ComponentScan：进行扫描的包

  - @Conditional：组件扫描做条件装配 符合条件加入

  - @Configuration：加配置类 其实是一个工厂
  - @DependsOn：无明显依赖关系的bean的实例化优先级
  - @Description

  - @Bean：标注配置类的方法作为Bean的定义 其实是工厂里的工厂方法

  - @Import：导入其他的配置类 或其他的selector

  - @Lazy：标注在类上 表示是延时实例化初始化 ；加在成员变量 方法参数 解决循环依赖 注入推迟进行

  - @PropertySource：读取外部的键值对文件

- 依赖注入

  - @Autowired：依赖注入

  - @Qualifier：同一个Bean有多个名字 用来区分

  - @Value：解释值
  - @Lookup：

- mapping

  - @RequestMapping：请求的路径与控制器的路径的键值关系
  - @GetMapping：请求方式只能为get
  - @PostMapping
  - @PutMapping
  - @DeleteMapping
  - @PatchMapping
  - @Mapping

- rest

  - @RequestBody：处理json数据转为java对象

  - @ResponseStatus:处理java对象转换为json

  - @ResponseStatus：响应的状态
  - @RestController：

- 统一处理

  - ControllerAdvice：统一处理的异常放进去

  - ExceptionHandler：处理异常

- 参数

  - @PathVariable：获取请求路径中的参数
  - @RequestHeader:请求头参数值
  - @RequestParam：请求参数

  - @CookieValue

- 转换

  - datetimeformat 日期

- validation

  - @validation

- ajax

  - @CrossOrigin：解决ajax跨域问题

- boot

  - properties

    - @ConfigurationProperties

    - @EnableConfigurationProperties

  - auto
    - @SpringBootApplication
    - @EnableAutoConfiguration:自动配置类的东西都加进来
    - @
  - condition
    - @ConditionOnClass：只有内部包含该类的时候 条件就成立 执行后续装配
    - @ConditionOnMissingBean：缺失某个bean的时候 条件成立
    - @ConditionalOnproperty：根据键值信息 看是否一样 条件成立
  - 其它
    - @EnableConfigurationProperties
    - @ConfigurationProperties

​			

### 深入理解@Configuration

配置类其实相当于一个工厂 标注@bean相当于工厂方法

@Bean 不支持方法重载 如果有多个 只能有一个工厂方法 保证@Bean的单例特性

@Configuration会为标注的类生成代理 保证@Bean相互调用时 保证单例特性

bean工厂后处理器配置在config中时  会导致config类提前创建 而解析成员变量的bean后处理器还没有加载 所以会导致@Value解析失败

解决方法 把beanFactoryPostProcessor设置为static 不要用成员变量 而是作为方法的局部变量

@Import先解析 @Bean后解析 如果有同名 会覆盖前面的



### 理解@SpringBootApplication

@SpringBootConfiguration：只有一个配置类

@ComponentScan

@EnableAutoConfiguration



## 6.Spring中的设计模式

### 6.1单例模式

singletonbean并非单例模式

### 6.2建造器模式

链式调用

beandefinitionbuilder

headersbuilder

### 6.3 工厂方法模式

降低耦合

getbean工厂方法 隐藏了产品的创建过程

### 6.4 adapter适配器模式

handleradapter

控制器实现多种多样 调用时统一成handleadapter 统一调用

销毁bean的时候 disposablebeanadapter 销毁方法适配为 disposablebean 统一销毁

### 6.5composite组合模式

将分散的调用集中起来 统一调用入口  交给具体的实现取做事

### 6.6.decorator 装饰器模式

注重功能增强

### 6.7代理模式

注重控制目标的访问

jdkdynamicapoproxy

objenesiscglibaopproxy

### 6.8责任链模式

对多个请求对象串成链 依次请求 直到遇到可以

handlerinterceptor 拦截器

### 6.9观察者模式

事件的实现

### 6.10 strategy 策略模式

提供多种策略方式 父子容器搜索策略等

实例化策略

### 6.11 模板模式

bean的生命流程

jdbc模板

transaction模板

## 7.循环依赖解决方式


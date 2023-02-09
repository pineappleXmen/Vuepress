---
lang: zh-CN
title: 快速幂
description: 快速幂算法
category: 
 - 算法
tag:
 - 快速幂
---



::: code-tabs#shell

@tab python

```python
def binpow(a, b):
    res = 1
    while b > 0:
        if (b & 1):
            res = res * a
        a = a * a
        b >>= 1
    return res
```

:::
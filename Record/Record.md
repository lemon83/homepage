* ssh_Connection_refused解决方法

查看本机是否设置istables规则 禁止ssh的连入/连出
```
sudo iptables -L
```

若没有看到被允许
```

sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT
```

* 查看ssh用户登录日志
```
cd /var/log
less secure
```
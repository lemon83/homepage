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

* 更改ssh配置文件
```
vi /etc/ssh/sshd_config
```
保存后重启OpenSSH服务器
```
/etc/init.d/sshd restart
```
* 查询公网ip
```
curl ifconfig.me
```

* 服务器环境下直接访问路由404问题原因以及解决方法[http://www.cnblogs.com/kevingrace/p/6126762.html]
  ```
  原因:
  刷新页面时访问的资源在服务端找不到，因为vue-router设置的路径不是真实存在的路径。
  这些资源都是在js里渲染
  服务端nginx配置如下
  server {
        listen 80;

        server_name testwx.wangshibo.com;
        root /Data/app/xqsj_wx/dist;
        index index.html;

        access_log /var/log/testwx.log main;

}
  解决:
  在nginx配置里添加vue-route的跳转设置（这里首页是index.html，如果是index.php就在下面对应位置替换），正确配置如下（添加下面标红内容）：
  server {
    listen 80;

    server_name testwx.wangshibo.com;
    root /Data/app/xqsj_wx/dist;
    index index.html;
    access_log /var/log/testwx.log main;

    location / {
        try_files $uri $uri/ @router;
        index index.html;
    }

    location @router {
       rewrite ^.*$ /index.html last;
    }

  }
  ```

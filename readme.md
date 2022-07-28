### PS: 本项目仅供学习交流，严禁用于任何商业和非法用途，非本人使用而产生的纠纷与一切后果均与本人无关。如有侵权，可联系本人删除（微信: `18839782321`）！

***

### 关于js逆向的一些加密参数的定位技巧，可以参考 [Boris](https://github.com/Boris-code) 大佬的这篇文章

> [js逆向技巧分析](https://zhuanlan.zhihu.com/p/108207751)

***

- <big>生成 `requirements.txt`</big>
  ```
  pipreqs reverse_practice --encoding=utf8 --force
  ```

***

### 从202207开始整理爬虫的一些逆向案例，不定时更新

web_name  |web_url|  document  |  project_name
---|---|---|---
欧科云链  |  [链接](https://www.oklink.com/zh-cn/btc/tx-list?limit=20&pageNum=1)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125619096?spm=1001.2014.3001.5501)  | oklink
房天下  |  [链接](https://passport.fang.com/)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125658235?spm=1001.2014.3001.5501)  |  passport_fang
企名片  |  [链接](https://www.qimingpian.cn/finosda/project/pinvestment)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125782518?spm=1001.2014.3001.5502)  |  qimingpian
天翼云  |  [链接](https://m.ctyun.cn/wap/main/auth/login)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125867236?spm=1001.2014.3001.5501)  |  ctyun
猿人学  | [链接](https://www.python-spider.com/challenge/)  |    |  yaunrenxue

***

### 钩子函数

- <big>cookie钩子

  ```javascript
  var code = function () {
      var org = document.cookie.__lookupSetter__('cookie');
      document.__defineSetter__("cookie", function (cookie) {
          if (cookie.indexOf('TSdc75a61a') > -1) {
              debugger;
          }
          org = cookie;
      });
      document.__defineGetter__("cookie", function () {
          return org;
      });
  }
  var script = document.createElement('script');
  script.textContent = '(' + code + ')()';
  (document.head || document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
  ```

- <big>header钩子

  ```javascript
  var code = function () {
      var open = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function (method, url, async) {
          if (url.indexOf("MmEwMD") > -1) {
              debugger;
          }
          return open.apply(this, arguments);
      };
  }
  var script = document.createElement('script');
  script.textContent = '(' + code + ')()';
  (document.head || document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
  ```

***

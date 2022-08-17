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

网站名称  |  网站url地址  |  文档  |  项目名称
---|---|---|---
欧科云链  |  [链接](https://www.oklink.com/zh-cn/btc/tx-list?limit=20&pageNum=1)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125619096?spm=1001.2014.3001.5501)  | oklink
房天下  |  [链接](https://passport.fang.com/)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125658235?spm=1001.2014.3001.5501)  |  passport_fang
企名片  |  [链接](https://www.qimingpian.cn/finosda/project/pinvestment)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125782518?spm=1001.2014.3001.5502)  |  qimingpian
天翼云  |  [链接](https://m.ctyun.cn/wap/main/auth/login)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125867236?spm=1001.2014.3001.5501)  |  ctyun
猿人学  | [链接](https://www.python-spider.com/challenge/)  |    |  yaunrenxue
巨潮资讯-数据中心  |  [链接](https://webapi.cninfo.com.cn/#/aiInfos)  |   |  webapi
MyToken  | [链接](https://www.mytokencap.com/)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/126285221?spm=1001.2014.3001.5501)  |  mytokencap
新榜资讯  |  [链接](https://www.newrank.cn/public/news.html)  |    |  newrank
粉笔网  |  [链接](https://fenbi.com/page/home)  |    |  fenbi

***

### 钩子函数

> 以下汇总常用的hook代码，来源于公众号文章 [JS 逆向之 Hook，吃着火锅唱着歌，突然就被麻匪劫了！](https://mp.weixin.qq.com/s/IYFyjVrVkHtUdCzn9arkJQ)

- <big>hook cookie</big>
  ```javascript
  (function () {
    'use strict';
    var cookieTemp = '';
    Object.defineProperty(document, 'cookie', {
      set: function (val) {
        if (val.indexOf('__dfp') != -1) {
          debugger;
        }
        console.log('Hook捕获到cookie设置->', val);
        cookieTemp = val;
        return val;
      },
      get: function () {
        return cookieTemp;
      },
    });
  })();

  ```

- <big>hook header</big>
  ```javascript
  (function () {
      var org = window.XMLHttpRequest.prototype.setRequestHeader;
      window.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
          if (key == 'safe') {
              debugger;
          }
          return org.apply(this, arguments);
      };
  })();
  ```

- </big>hook URL</big>
  ```javascript
  (function () {
      var open = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function (method, url, async) {
          if (url.indexOf("login") != -1) {
              debugger;
          }
          return open.apply(this, arguments);
      };
  })();
  ```

- <big>hook JSON.stringify</big>
  ```javascript
  (function() {
      var stringify = JSON.stringify;
      JSON.stringify = function(params) {
          console.log("Hook JSON.stringify ——> ", params);
          debugger;
          return stringify(params);
      }
  })();
  ```

- <big>hook JSON.parse</big>
  ```javascript
  (function() {
      var parse = JSON.parse;
      JSON.parse = function(params) {
          console.log("Hook JSON.parse ——> ", params);
          debugger;
          return parse(params);
      }
  })();
  ```

- <big>hook eval</big>
  ```javascript
  (function() {
      // 保存原始方法
      window.__cr_eval = window.eval;
      // 重写 eval
      var myeval = function(src) {
          console.log(src);
          console.log("=============== eval end ===============");
          debugger;
          return window.__cr_eval(src);
      }
      // 屏蔽 JS 中对原生函数 native 属性的检测
      var _myeval = myeval.bind(null);
      _myeval.toString = window.__cr_eval.toString;
      Object.defineProperty(window, 'eval', {
          value: _myeval
      });
  })();
  ```

***

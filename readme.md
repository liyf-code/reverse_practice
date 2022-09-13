### PS: 本项目仅供学习交流，严禁用于任何商业和非法用途，非本人使用而产生的纠纷与一切后果均与本人无关。如有侵权，可联系本人删除（微信: `wojiaoliyf`）！

***

### 关于js逆向的一些加密参数的定位技巧，可以参考 [Boris](https://github.com/Boris-code) 大佬的这篇文章

> [js逆向技巧分析](https://zhuanlan.zhihu.com/p/108207751)

***

- <big>生成 `requirements.txt`</big>
  ```
  pipreqs reverse_practice --encoding=utf8 --force
  ```

***

### 辅助工具

- 把curl转换成python代码: [curlconverter](https://curlconverter.com/)
- 1024程序员开发工具箱: [1024tools](https://1024tools.com/)

***

### 从202207开始整理爬虫的一些逆向案例，不定时更新

> <big>个别网站的逆向思路及步骤，记录在py文件中</big>

网站名称  |  网站url地址  |  文档  |  项目位置
---|---|---|---
欧科云链  |  [链接](https://www.oklink.com/zh-cn/btc/tx-list?limit=20&pageNum=1)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125619096?spm=1001.2014.3001.5501)  | [oklink](oklink)
房天下  |  [链接](https://passport.fang.com/)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125658235?spm=1001.2014.3001.5501)  |  [passport_fang](passport_fang)
企名片  |  [链接](https://www.qimingpian.cn/finosda/project/pinvestment)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125782518?spm=1001.2014.3001.5502)  |  [qimingpian](qimingpian)
天翼云  |  [链接](https://m.ctyun.cn/wap/main/auth/login)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125867236?spm=1001.2014.3001.5501)  |  [ctyun](ctyun)
猿人学  | [链接](https://www.python-spider.com/challenge/)  |    |  [yuanrenxue](yuanrenxue)
巨潮资讯-数据中心  |  [链接](https://webapi.cninfo.com.cn/#/aiInfos)  |   |  [webapi](webapi)
MyToken  | [链接](https://www.mytokencap.com/)  |  [点击跳转](https://blog.csdn.net/qq_42598133/article/details/126285221?spm=1001.2014.3001.5501)  |  [mytokencap](mytokencap)
新榜资讯  |  [链接](https://www.newrank.cn/public/news.html)  |    |  [newrank](newrank)
粉笔网  |  [链接](https://fenbi.com/page/home)  |    |  [fenbi](fenbi)
福建省公共资源交易-交易信息  | [链接](https://ggzyfw.fujian.gov.cn/web/index.html#/business/list)  |  [点击跳转](ggzyfw_fujian/demo.py)  |  [ggzyfw_fujian](ggzyfw_fujian)
犀牛数据  | [链接](https://www.xiniudata.com/industry/newest?from=data)  |  [点击跳转](xiniu/demo.py)  |  [xiniu](xiniu)
全国建筑市场监管公共服务平台  |  [链接](http://jzsc.mohurd.gov.cn/data/company)  |  [点击跳转](jzsc/demo.py)  |  [jzsc](jzsc)
得物(m.poizon.com)  |  [链接](https://m.poizon.com/router/)  |  [点击跳转](dewu/demo.py)  |  [dewu](dewu)
网易云  |  [链接](https://music.163.com/)  |    |  [music163](music163)
易车网  |  [链接](https://car.yiche.com/yunqueq1/peizhi/)  |  [点击跳转](yiche/demo.py)  |  [yiche](yiche)
巴比特-快讯  |  [链接](https://www.8btc.com/flash)  |  [点击跳转](8btc/docs/readme.md)  |  [8btc](8btc)
加密解密-APP喵  |  [链接](https://www.appmiu.com/key/)  |    |  [appmiu](appmiu)
艺恩  |  [链接](https://www.endata.com.cn/BoxOffice/BO/Month/oneMonth.html)  |    |  [endata](endata)
中国招投标公共服务平台  |  [链接](http://ctbpsp.com/#/)  |    |  [ctbpsp](ctbpsp)
37网手游  |  [链接](https://my.37.com/login.html?url=//my.37.com/)  |  [点击跳转](my_37/demo.js)  |  [my_37](my_37)
中国·国家地名信息库  |  [链接](https://dmfw.mca.gov.cn/online/map.html)  |    |  [dmfw_mca](dmfw_mca)

***

### 一些常用的hook代码

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

### PS: 从202207开始整理爬虫的一些逆向案例，不定时更新。本项目仅供学习交流，严禁用于任何商业和非法用途，非本人使用而产生的纠纷与一切后果均与本人无关。如有侵权，可联系本人删除（微信:

`wojiaoliyf`）！

***

### 个人接单，有需要可联系微信 `wojiaoliyf`。另需要工商数据、专利数据以及裁判文书数据，可联系本人。

***

### 不定期记录网站的反爬措施是否变化，记录在 [CHANGELOG](changelog.md) 中

- <big>[一些其他的文档](remark.md)</big>
- 爬虫工具库: [spidertools](https://spidertools.cn/#/)

***

### <big>如果该项目对你有用的话，请点个star，谢谢！</big>

***

- 神兽来源于[企查猫](https://www.qichamao.com)

          ┏┓　　　┏┓
         ┏┛┻━━━┛┻┓
         ┃　　　　　　　┃ 　
         ┃　　　━　　　┃
         ┃　┳┛　┗┳　┃
         ┃　　　　　　　┃
         ┃　　　┻　　　┃
         ┃　　　　　　　┃
         ┗━┓　　　┏━┛
             ┃　　　┃   教授保佑
             ┃　　　┃   代码无BUG！
             ┃　　　┗━━━┓
             ┃　　　　　　┣┓
             ┃　　　　　　┏┛
             ┗┓ ┓┏━┳┓ ┏┛
              ┃┫┫　 ┃┫┫
              ┗┻┛　 ┗┻┛

***

### 文章推荐

- [js逆向技巧分析](https://zhuanlan.zhihu.com/p/108207751)
- [Js逆向の参数定位方法](https://blog.csdn.net/weixin_43582101/article/details/112663900)
- [爬虫：JavaScript 逆向过程中无限 Debug 的绕过方案](https://mp.weixin.qq.com/s/MgKCZTnzS1M13ifvuuOYAQ)
- [[007]爬虫系列 | 没有油候&Fiddler如何Hook？！！！](https://blog.csdn.net/weixin_41593408/article/details/119640939)
- [CTF&爬虫：掌握这些特征，一秒识别密文加密方式](https://mp.weixin.qq.com/s/J7PTogOtVIQhUH204Qt3fA)
- [JS 逆向之 Hook，吃着火锅唱着歌，突然就被麻匪劫了！](https://mp.weixin.qq.com/s/IYFyjVrVkHtUdCzn9arkJQ)

***

### download this repository

- 克隆本项目至本地
  > - git clone git@github.com:liyf-code/reverse_practice.git
- 准备 `python` 运行环境（version: 3.9.1）
  > - cd reverse_practice
  > - pip3 install -r requirements.txt
- 准备 `nodejs` 运行环境（version: 14.17.3）
  > - cd reverse_practice
  > - npm install

***

### 文档

> ***个别网站的逆向思路及步骤，记录在py文件中***

 网站名称             | 网站url地址                                                                                                                                      | 文档                                                                                          | 项目位置                                  
------------------|----------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|---------------------------------------
 欧科云链             | [链接](https://www.oklink.com/zh-cn/btc/tx-list?limit=20&pageNum=1)                                                                            | [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125619096?spm=1001.2014.3001.5501) | [oklink](oklink)                      
 房天下              | [链接](https://passport.fang.com/)                                                                                                             | [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125658235?spm=1001.2014.3001.5501) | [passport_fang](passport_fang)        
 企名片              | [链接](https://www.qimingpian.cn/finosda/project/pinvestment)                                                                                  | [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125782518?spm=1001.2014.3001.5502) | [qimingpian](qimingpian)              
 天翼云              | [链接](https://m.ctyun.cn/wap/main/auth/login)                                                                                                 | [点击跳转](https://blog.csdn.net/qq_42598133/article/details/125867236?spm=1001.2014.3001.5501) | [ctyun](ctyun)                        
 猿人学              | [链接](https://www.python-spider.com/challenge/)                                                                                               | 暂无                                                                                          | [yuanrenxue](yuanrenxue)              
 巨潮资讯-数据中心        | [链接](https://webapi.cninfo.com.cn/#/aiInfos)                                                                                                 | 暂无                                                                                          | [webapi](webapi)                      
 MyToken          | [链接](https://www.mytokencap.com/)                                                                                                            | [点击跳转](https://blog.csdn.net/qq_42598133/article/details/126285221?spm=1001.2014.3001.5501) | [mytokencap](mytokencap)              
 新榜资讯             | [链接](https://www.newrank.cn/public/news.html)                                                                                                | 暂无                                                                                          | [newrank](newrank)                    
 粉笔网              | [链接](https://fenbi.com/page/home)                                                                                                            | 暂无                                                                                          | [fenbi](fenbi)                        
 福建省公共资源交易-交易信息   | [链接](https://ggzyfw.fujian.gov.cn/web/index.html#/business/list)                                                                             | [点击跳转](ggzyfw_fujian/demo.py)                                                               | [ggzyfw_fujian](ggzyfw_fujian)        
 犀牛数据             | [链接](https://www.xiniudata.com/industry/newest?from=data)                                                                                    | [点击跳转](xiniu/demo.py)                                                                       | [xiniu](xiniu)                        
 全国建筑市场监管公共服务平台   | [链接](http://jzsc.mohurd.gov.cn/data/company)                                                                                                 | [点击跳转](jzsc/demo.py)                                                                        | [jzsc](jzsc)                          
 得物(m.poizon.com) | [链接](https://m.poizon.com/router/)                                                                                                           | [点击跳转](dewu/demo.py)                                                                        | [dewu](dewu)                          
 网易云              | [链接](https://music.163.com/)                                                                                                                 | 暂无                                                                                          | [music163](music163)                  
 易车网              | [链接](https://car.yiche.com/yunqueq1/peizhi/)                                                                                                 | [点击跳转](yiche/demo.py)                                                                       | [yiche](yiche)                        
 巴比特-快讯           | [链接](https://www.8btc.com/flash)                                                                                                             | [点击跳转](8btc/docs/readme.md)                                                                 | [8btc](8btc)                          
 加密解密-APP喵        | [链接](https://www.appmiu.com/key/)                                                                                                            | 暂无                                                                                          | [appmiu](appmiu)                      
 艺恩               | [链接](https://www.endata.com.cn/BoxOffice/BO/Month/oneMonth.html)                                                                             | 暂无                                                                                          | [endata](endata)                      
 中国招投标公共服务平台      | [链接](http://ctbpsp.com/#/)                                                                                                                   | 暂无                                                                                          | [ctbpsp](ctbpsp)                      
 37网手游            | [链接](https://my.37.com/login.html?url=//my.37.com/)                                                                                          | [点击跳转](my_37/demo.js)                                                                       | [my_37](my_37)                        
 中国·国家地名信息库       | [链接](https://dmfw.mca.gov.cn/search.html)                                                                                                    | 暂无                                                                                          | [dmfw_mca](dmfw_mca)                  
 看准网              | [链接](https://www.kanzhun.com/firm/wage/1HV52g~~/p1.html)                                                                                     | 暂无                                                                                          | [kanzhun](kanzhun)                    
 崔佬搭建的练习网站        | [链接](https://spa2.scrape.center/page/1)                                                                                                      | 暂无                                                                                          | [scrape_spa2](yuanrenxue/scrape_spa2) 
 浙江省核酸采样点查询       | [链接](https://hsddcx.wsjkw.zj.gov.cn/webapp/app-mobile/epidMap)                                                                               | [点击跳转](https://blog.csdn.net/qq_42598133/article/details/127225552?spm=1001.2014.3001.5501) | [hsddcx](hsddcx)                      
 酷我音乐             | [链接](http://www.kuwo.cn/search/list?key=%E4%B8%8B%E5%B1%B1)                                                                                  | 暂无                                                                                          | [music_kuwo](music_kuwo)              
 领导留言板            | [链接](http://liuyan.people.com.cn/messageSearch)                                                                                              | [点击跳转](liuyan/demo.py)                                                                      | [liuyan](liuyan)                      
 全国核酸检测机构查询       | [链接](http://bmfw.www.gov.cn/hsjcjgcx/index.html?ADTAG=feiyanh5&adcode=440000)                                                                | [点击跳转](bmfw/demo.py)                                                                        | [bmfw](bmfw)                          
 美食优惠聚合           | [链接](https://static.waitwaitpay.com/web/sd_se/index.html#/)                                                                                  | [点击跳转](waitpay/demo.py)                                                                     | [waitpay](waitpay)                    
 查策网              | [链接](https://www.chacewang.com/chanye/index#)                                                                                                | 暂无                                                                                          | [chacewang](chacewang)                
 裁判文书响应数据解密       | [链接](https://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html?pageId=4c80b947ecca9eee0d410a2a65ef5e72&s8=02)                   | 暂无                                                                                          | [cpws](cpws)                          
 搜狐详情页图片地址解密      | [链接](https://www.sohu.com/a/611710835_123753)                                                                                                | [点击跳转](souhu/demo.js)                                                                       | [souhu](souhu)                        
 黑猫投诉             | [链接](https://tousu.sina.com.cn/company/view/?couid=6384912431)                                                                               | 暂无                                                                                          | [tousu_sign](tousu_sign)              
 猎聘               | [链接](https://www.liepin.com/zhaopin/?inputFrom=www_index&workYearCode=0&key=&scene=input&ckId=cei1lxwcgvjwp0v613z0tdqvn0ziea1b&dq=)          | [点击跳转](liepin/demo.js)                                                                      | [liepin](liepin)                      
 阿里文学             | [链接](https://www.aliwx.com.cn/reader?bid=6813923&cid=674174)                                                                                 | 暂无                                                                                          | [aliwx](aliwx)                        
 当乐网              | [链接](https://oauth.d.cn/auth/goLogin.html)                                                                                                   | [点击跳转](oauth/demo.js)                                                                       | [oauth](oauth)                        
 一品威客             | [链接](https://www.epwk.com/login.html)                                                                                                        | [点击跳转](ypwk/demo.js)                                                                        | [ypwk](ypwk)                          
 喜马拉雅             | [链接](https://www.ximalaya.com/)                                                                                                              | [点击跳转](https://mp.weixin.qq.com/s/2jYLbETc9jiq9YvnlOH72g)                                   | [xmly_login](xmly_login)              
 滴滴外卖             | [链接](https://passport.didichuxing.com/#/)                                                                                                    | [点击跳转](didiwaimai/demo.py)                                                                  | [didiwaimai](didiwaimai)              
 红人点集             | [链接](http://www.hh1024.com/#/login?redirect=%2FrealTimeLiving)                                                                               | [点击跳转](hh1024/demo.py)                                                                      | [hh1024](hh1024)                      
 毛毛租              | [链接](https://www.maomaozu.com/#/build)                                                                                                       | [点击跳转](https://blog.csdn.net/qq_42598133/article/details/129686781?spm=1001.2014.3001.5501) | [maomaozu](maomaozu)                  
 惠金所登录破解          | [链接](https://www.hfax.com/login.html#/?rsrc=https%3A%2F%2Fwww.hfax.com%2Fabout.html%23%2Fquestions)                                          | [点击跳转](hjs/demo.py)                                                                         | [hjs](hjs)                            
 同花顺              | [链接](http://q.10jqka.com.cn/)                                                                                                                | 暂无                                                                                          | [tonghuashun](tonghuashun)            
 西域MRO商城          | [链接](https://m.ehsy.com/#/pages/categoryList/index?catId=16474&parentId=5721&name=%E5%A4%8D%E5%90%88%E6%9C%BA%2F%E6%89%93%E5%8D%B0%E6%9C%BA) | [点击跳转](ehsy/demo.js)                                                                        | [ehsy](ehsy)                          
 上海剑桥学院登录         | [链接](https://cas.gench.edu.cn/cas/login)                                                                                                     | [点击跳转](cas_gench/demo.py)                                                                   | [cas_gench](cas_gench)                
 新华社              | [链接](https://xhpfmapi.zhongguowangshi.com/vh512/account/25295)                                                                               | [点击跳转](xhpfmapi/demo.py)                                                                    | [xhpfmapi](xhpfmapi)                  
 甘肃医保公共服务         | [链接](https://ybdzpz.ylbz.gansu.gov.cn/hsa-local-prod/web/hallEnter/#/search/Drugstore)                                                       | [点击跳转](ybdzpz/demo.py)                                                                      | [ybdzpz](ybdzpz)                      
 远川研究所            | [链接](https://stream-capital.com/search)                                                                                                      | 暂无                                                                                          | [stream_capital](stream_capital)      
 热搜时光机            | [链接](https://www.weibotop.cn/2.0/)                                                                                                           | 暂无                                                                                          | [weibotop](weibotop)                  
 凤凰云智             | [链接](https://www.iyunzhi.com/)                                                                                                               | 暂无                                                                                          | [iyunzhi](iyunzhi)                    
 中国高校IT实力排行榜      | [链接](https://bbs.csdn.net/college?utm_source=csdn_bbs_toolbar&spm=1035.2022.3001.8850&category=37)                                           | [点击跳转](bbs_csdn/demo.py)                                                                    | [bbs_csdn](bbs_csdn)                  
 行业动态_全国新书目平台     | [链接](https://cnpub.com.cn/information.html#/search?nav=1)                                                                                    | 暂无                                                                                          | [cnpub](cnpub)                        
 天津市公共资源交易平台      | [链接](ggzy.zwfwb.tj.gov.cn)                                                                                                                   | 暂无                                                                                          | [zyfuw](zyfuw)                        
 华中科技大学协和深圳医院招采系统 | [链接](https://zbcg.sznsyy.cn/homeNotice)                                                                                                      | 暂无                                                                                          | [zbcg_sznsyy](zbcg_sznsyy)            
 中国土地市场网          | [连接](https://www.landchina.com/#/supplyPlan)                                                                                                 | [点击跳转](landchina/demo.py)                                                                   | [landchina](landchina)                

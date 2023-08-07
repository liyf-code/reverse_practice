### 生成 `requirements.txt`

  ```
  pipreqs reverse_practice --encoding=utf8 --force
  ```

***

### [CHANGELOG](changelog.md)

***

### 一些常见的乱码

- 数据来源于爬虫交流群里边，一个大佬发的，如有侵权，请联系本人删除。
  ![常见的乱码](images/response_type.png)

***

### 关于chrome浏览器

- 逆向定位关键参数时，source面板不显示行号。[解决办法](chrome.md)

***

### 关于 `pycharm激活码` 和 `chromedriver` 环境的配置

- [chromedriver](chromedriver.md)
- [pycharm激活码配置](pycharm激活方案汇总)

***

### 忽略某个目录或者文件

- 由于 `node_modules` 太大，且默认是可以被上传的。所以我们需要创建一个 `.gitignore` 文件，目的是忽略上传某个文件或者文件夹。
- 步骤如下:
  > 创建 `.gitignore` 文件
    ```text
        cd reverse_practice
        touch .gitignore
    ```
  > 创建好文件之后，在里边添加需要忽略的目录和文件即可
- 忽略规则如下:
  ```text
      target          // 忽略这个target目录
      angular.json    // 忽略这个angular.json文件
      log/*           // 忽略log下的所有文件
      css/*.css       // 忽略css目录下的.css文件
  ```

***

### 爬虫辅助工具

- 爬虫工具库: [spidertools](https://spidertools.cn/#/)

***

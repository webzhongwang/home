# 说明文档

## 基于gulp 的前端工作流

### 简介

* 每次更新后，执行 > npm install  安装必要依赖包，

* 开发过程中，执行 > gulp dev 启动。

* 上测试环境
* 1.执行 > gulp build  生成dist包
* 2.执行 > gulp up83  

* 上线 
* 1.执行 > gulp build  生成dist包
* 2.执行 > gulp online --version v1.0 
* 3.执行 > gulp upload --version v1.0 

* 项目负责人
	fe: 钟望
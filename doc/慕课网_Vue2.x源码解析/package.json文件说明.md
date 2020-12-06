## package.json

### 概述

一个基于`Node.js`的前端项目，项目的根目录下都有一个`package.json`文件 ，这个文件定义了项目所需的各种模块，以及项目配置信息（例如：项目名称，版本，许可证等元素）；

当开发者执行`npm install`命令时，会根据这个配置文件，自动下载所需的模块

`package.json`是一个`JSON`对象，这个对象中的每一个成员就是目标项目的一个配置项

#### 生成package.json文件

执行命令`npm init -y`,`-y`表示使用默认配置

### package.json中成员说明

#### 基本字段

`name`: 包名称

`version`：包的版本号

`description`: 包描述信息

`homepage`:报官网URL

`author`: 包的作者，值可以是开发者在http://npmjs.org网站的有效账户名，遵循"账户名<邮件>"的规则

`contributors`:包的贡献者

`keywords`： 关键字

`repository`: 包代码的代码仓库信息，包括`type，URL`,`type`是`git|svn`,`URL`则是报的`代码仓库地址`

#### scripts字段

配置需要运行的脚本的执行命令,例如

```json
"scripts":{
	"flow": "flow"
}
```

#### dependencies & devDependencies

`dependencies `: 指定了项目运行所依赖的模块

`devDependencies`：指定了项目开发所依赖的模块

它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围

```json
 "dependencies": {
    "snabbdom": "^2.1.0"
  },
  "devDependencies": {
    "parcel-bundler": "^1.12.4"
  }
```

##### 版本号限定规则

`npm`中模块的完整版本号规则一般是: `主版本.次要版本.补丁版本`，一般情况下，次要版本号发生变化，表示程序有重大更新；

* 指定特定的版本，例如`1.1.1`,遵循规则为`主版本.次要版本.补丁版本`的格式，安装时只需要安装指定的版本,例如`npm install jquery@3.0.0 --save`
* 波浪号(`tilde`)+指定版本：例如`~1.1.1`,表示安装`1.1.x`的最新版本(不低于`1.1.1`),但不是安装`1.2.x`，即是安装时不改变主版本号和次要版本号
* 插入号(`caret`)+指定版本：例如`^1.1.0`,表示安装`1.x.x`的最新版本(不低于`1.1.0`),但不是安装`2.x.x`，即是安装时不改变主版本号，注意如果主版本号是0，则插入号的行为与波浪号一致，因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容；
* latest: 安装最新版

#### peerDependencies

供插件指定其所需要的主工具的版本

注意，从`npm 3.0`版开始，`peerDependencies`不再会默认安装了

#### bin

`bin`项用来指定各个内部命令对应的可执行文件的位置

```json
"bin": {
  "someTool": "./bin/someTool.js"
}
```

上面代码指定，`someTool` 命令对应的可执行文件为 `bin` 子目录下的 `someTool.js`。`npm`会寻找这个文件，在`node_modules/.bin/`目录下建立符号链接。在上面的例子中，`someTool.js`会建立符号链接`node_modules/.bin/someTool`。由于`node_modules/.bin/`目录会在运行时加入系统的`PATH`变量，因此在运行`npm`时，就可以不带路径，直接通过命令来调用这些脚本。

此，像下面这样的写法可以采用简写。

```json
scripts: {  
  start: './node_modules/bin/someTool.js build'
}

// 简写为

scripts: {  
  start: 'someTool build'
}
```

所有`node_modules/.bin/`目录下的命令，都可以用`npm run [命令]`的格式运行。在命令行下，键入`npm run`，然后按tab键，就会显示所有可以使用的命令。

#### main

`main`字段指定了加载的入口文件（包的入口），`require('moduleName')`就会加载这个文件。这个字段的默认值是模块根目录下面的`index.js`。



#### config

`config`字段用于添加命令行的环境变量

```json
{
  "name" : "test",
  "config" : { "port" : "9527" },
  "scripts" : { "start" : "node server.js" }
}
```

然后再`server.js`中引用`config`字段的值

```js
http.createServer((req,res) => {}).listen(process.env.npm_package_config_port)
```

执行`npm run start`就可以得到这个值

用户也也可以修改这个值

`npm config set test:port:9528`



#### browser

`browser`指定该模板供浏览器使用的版本。`Browserify`这样的浏览器打包工具，通过它就知道该打包那个文件。

#### engines 字段

`engines`字段指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。

```json
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
```



## 参考资料

[package.json-npm](http://caibaojian.com/npm/files/package.json.html)

[package.json文件--阮一峰](https://javascript.ruanyifeng.com/nodejs/packagejson.html#toc1)
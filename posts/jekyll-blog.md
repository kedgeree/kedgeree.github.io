---
layout: post
title: 用jeklly在github上搭建博客
tags: jekyll blog
---
用jekyll搭建博客过程中遇到了很多的问题；特别是jekyll的使用，文档写得不够详细；网上很多教程照着做下来也徒劳无功，后来边猜边摸索才把这么简陋的页面写出来了，于是也想写个攻略mark之。下面开始攻略：

大致的步骤就是： 买域名->域名设置->github帐号->建立名为username.github.io的repository->安装linux, jekyll,git等环境->开始搭建博客。

#### 关于域名
上 [GoDaddy](http://www.godaddy.com/)买个域名，涉及到钱的事儿一般都比较简单，按着提示购买就行了。不过godaddy不够稳定，刚买完域名就登不上godaddy了, 而且域名开启后，DNS解析速度也十分慢。
为了获得较快的、稳定的DNS解析，注册一个[DNSPOD](www.dnspod.cn)帐号来进行DNS解析。注册过后需要干两件事情：一个是更改域名的DNS设置，这个可以参考dnspod的帮助文档。
>dnspod帮助:
>https://support.dnspod.cn/Kb/showarticle/tsid/42/
>https://support.dnspod.cn/Kb/showarticle/tsid/30/

另一件事情是在DNSpod里插入指向github的A记录，IP为192.30.252.154,下面是我的DNSpod配置，除了配置了顶级域名的A记录，还为www的二级域名配置了CNAME记录。(配置二级域名留着以后再说吧，嘿嘿)
![dnspod记录][1]
#### github
注册一个github帐号，并创建一个名为username.github.io(username为自己的用户名)的repository，再创建master分支(一般默认为master)。
这是github为我们提供的用户页面，每个项目页可以建立自己的项目页面以介绍项目。不同的地方在于用户页面在master分支下提交，而项目页面在gh-pages分支下提交。用户页面的访问路径为username/username.github.io, 项目页面的访问地址为username.github.io/projectname.
刚刚虽然我们配好了域名，但还是无法正常访问，需要在这个新的repository的根目录下加入一个名为CNAME的文件，并在文件里加入自己的域名。例如我的:

![github cname][2]
  
现在你可以在根目录放一个index.html，随便写点什么，再访问下自己的域名检查下是否能够访问了。
  
index.html:

```html
    <html>
        <head>
            <title>my blog</title>
        </head>
        <body>
            <h1>Hello World!</h1> 
        </dody>
    </html>
```

#### git
git的安装和github密钥的配置略去，记录常用命令：

 	初始化：　
	$ git init
	建立一个master分支, 并且为独立的孤儿分支:
	git checkout --orphan master
	将变化的文件添加到缓冲区:
	git add filename
	git add *
	提交变化到本地仓库(从缓冲区):
	git commit -m "版本的备注"
	如果不是clone的项目，则需要现在远端服务器add:
	git remote add origin https://github.com/username/projectname.git
	最后推送到远端服务器的master分支上:
	git push origin master

### 使用jekyll
jekyll的安装：
需要先安装ruby, rubygem等，基本在ubuntu下都能通过yum install命令安装完成。安装好后执行:

	gem install jekyll

在命令行输入jekyll，出来帮助就表示安装好了～
1. 目录
在本地建立目录username.github.io，然后

	cd username.github.io
	顺手配置下git啦:
	git init
	git checkout --orphan master
   
建立如下的目录结构:

	.
	|--- _config.yml
	|--- index.html
	|--- _posts
	|--- _layouts
	|--- _includes
	|--- _plugins
	|--- image
	|--- css
	|--- js
	|--- _sites
    
当然我自己为这个添加了一些目录，你可以参考[jekyll的帮助](http://jekyllcn.com/docs/structure/)建立目录结构就够了
在_config.yml里添加基本的设置:

	baseurl:http://kedgeree.me
    
这是为了在真实环境里能正常访问，而在调试的时候则需要使用在启动jeklly时用下面命令:

	jekyll server --baseurl='' --watch
	--watch为调试模式，在本机调试时做了修改不需要重新启动jeklly
    
觉得jekyll的帮助对这些目录解释得挺简单的，自己试着对各目录进行理解:
1) index.html: 主页，默认会访问的页面。
2) _config.yml: 配置，可以参考jekyll的配置说明，或者自己定义变量，在任意页面都可以用了。通过site.变量名访问。
3) _layouts: 个人觉得jekyll的一个重要概念就是将静态页面做的可配置化。通过在_layouts里写一系列的模板来把外观可配置化。而在写博客的时候只需要关注内容而不需要关注展示。但个人觉得_layouts正如他的名字一样，主要关注布局， 只放主干的内容即可。
4) _includes: 这个目录主要用来放置一些公共的模板模块页面，这样在布局变化的时候可以很轻松的引入以前的公共代码。所以这也是_layouts只放主干布局的原因。
5) _plugins: 放置所有的插件，这些可以用来动态的生成一些数据。因为jekyll在运行前会先运行该目录下所有的以.rb结尾的文件。
6) _posts: 扔文章的地方，命名方式参考[jekyll帮助](http://jekyllcn.com/docs/structure/)
7) _site: jekyll编译后生成的真实网站，这就相当于把_layouts,_includes,index.html等合在了一起，生成了可以被浏览器解析的网页，真正需要放在github上其实只需要该目录。所以我的github上有两个项目，一个用来保存上面那些开发过程的产物；另一个用来放这个_site里的内容，对应的项目则为上面建立的username.github.io.

废话太多，贴一点简单的代码:
default.html:

```html
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>{{ page.title }}</title>
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
	</head>
	<body>
		<div id="wrapper">
			<header>
				<h1><a href="{{ site.url }}/" title="welcome to {{ site.sitename }}" class="home">{{ site.sitename }}</a>:~{{ page.url }}</h1>
			</header>
			<section id="content">
				{{ content }}
			</section>
			<section id="tags_cloud">
				{% include sidebar_tagcloud.html %}             
			</section>
		</div>
		<footer>
			{% include footer.html %}
		</footer>
	</body>
	</html>
```

在content这个section里, {{ content }}这个变量代表着index.html里的内容。其他的section主要是一些样式上的控制，不详细展开了。
再看看index.html：

```html
    ---
    layout: default
    title:  kedgeree@live home
    ---
    <ul>
       {% capture year %}{% endcapture %}
       {% capture month %}{% endcapture %}
       {% for post in site.posts %}
           {% include post_item1.html %}
       {% endfor %}
    </ul>
```

一开始的头信息指名了使用_layout目录里的default.html来作为该页面的模板，并声明了一个变量title，可以通过page.title来访问。
代码的功能为循环遍历所有文章，将_include/post_item1.html里的内容展示出来。
post_item1.html:

```html
	{% capture new_year %}{{ post.date | date: "%Y" }}{% endcapture %}
	{% capture new_month %}{{ post.date | date: "%m" }}{% endcapture %}
	{% if new_year != year or  new_month != month %}
	{% capture output %}{{ post.date | date: "%B %Y" }}{% endcapture %}
	{% capture year %}{{ new_year }}{% endcapture %}
	{% capture month %}{{ new_month }}{% endcapture %}
	{% else %}
	{% capture output %}{% endcapture %}
	{% endif %}
	<span>{{ output }}</span><li>&raquo;&nbsp;<a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
```

前面一段为找出年月相同的文章在前面显示出年月，最后展示一个标题并给出文章的链接。如上面的代码，jekyll支持liquid语言，所以可以用[liquid语言](http://docs.shopify.com/themes/liquid-basics)写一些动态生成的东西。
同时这里也能看出来_include里面的文件就是直接原样的嵌套进了引用的地方，你甚至可以在外面声明变量，然后在include里使用。当然这样的确不便于理解，尽量还是不要这样写比较好。

大致的解释久到此为止了。
2. 添加标签云
因为我想做得比较简单，也没有任何导航，于是就只想添加一个标签云，方便进行分类。使用了网上提供的js和ruby脚本来生成标签云。
[js在这里](https://github.com/addywaddy/jquery.tagcloud.js/):js的作用是生成标签云；
[ruby脚本在这里](https://github.com/kedgeree/dev.kedgeree.me/blob/master/_plugins/tag_page.r): ruby脚本的作用是生成标签页，就是单个标签所对应文章的列表;
ruby脚本里需要用到 _layouts/tag_index.html来当作模板，最后会生成对应的标签页到_site/tag/tagname/index.html里。
所以添加一个tag_index.html到_layouts里：

```html
	---
	layout: default
	---
	<div id="tag_home" class="tag {{page.tag}}">
	<ul class="posts">
	{% for post in site.tags[page.tag] %}
	{% include post_item1.html %}
	{% endfor %}
	</ul>
	</div>

相信简单看过jekyll文档的人都能轻松看懂这段代码了，就不解释了。其实到这里基本标签云就添加好了。
但是还有一个重要的配置需要在_config.yml里添加：

	plugins:  ./_plugins
    
让jekyll能顺利的找到plugins的目录，这样才算完成了。

总结得有点混乱，不过发现搭建这个博客的确不易，希望能因为不易坚持用下来。

[1]: http://kedgeree.me/image/dnspod_1.png
[2]: http://kedgeree.me/image/cname.png



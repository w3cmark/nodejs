var fs = require('fs'),
	express = require('express'),
	bodyParser = require('body-parser'),
	path =  require('path'),
	app = express(),
	port = process.env.POTR || 3000;
 
 app.set('views', './views')
 app.set('view engine', 'jade')
 app.use(bodyParser.urlencoded({extended: false}))
 app.use(express.static(path.join(__dirname, 'public')))
 app.listen(port)

 console.log('start on port '+ port)


// index page
app.get('/', function(req, res){

	res.render('index',{
		title: '首页',
		config: {
			domainName: ' '
		}
	})
	
})

// post
app.get('/getCopyright', function(req, res){
	var config = req.query,
		domainName = config.domainName,
		data;
	if(domainName){
		data = {
			"success": 200,
			"result":{
				 "logo":[
			        {//大网易logo
			            "href":"http://www.163.com",
					    "blackSrc":"http://res.nie.netease.com/comm/NIE_copyRight/images/netease.1.png",
					    "whiteSrc":"http://res.nie.netease.com/comm/NIE_copyRight/images/netease.2.png"
			        },
			        {//网易游戏logo
			    		"href":"http://game.163.com",
			    		"blackSrc":"http://res.nie.netease.com/comm/NIE_copyRight/images/nie.1.png",
			    		"whiteSrc":"http://res.nie.netease.com/comm/NIE_copyRight/images/nie.2.png"
			    	},
			    	{//文字logo
			    		"href":"http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/5F3BB7FDD27D4B01964F56E1FFBADD53",
			    		"blackSrc":"http://res.nie.netease.com/comm/NIE_copyRight/images/wen.png",
			    		"whiteSrc":" "
			    	},
			    	{//雷火logo
			    		"href":"http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/700E4EB3C85B469E84A28595D0F16CFC",
			    		"blackSrc":"http://res.nie.netease.com/comm/NIE_copyRight/images/wen.png",
			    		"whiteSrc":" "
			    	},
			    	{//盘古logo
			    		"href":"http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/gameNetTag/4028c08c4b4e62fe014b523d7ba00a15",
			    		"blackSrc":"http://res.nie.netease.com/comm/NIE_copyRight/images/wen.png",
			    		"whiteSrc":" "
			    	},
			    ],
				"nav":[
				    {
				        "txt":"公司简介",
				        "href":"http://gb.corp.163.com/gb/about/overview.html"
				    },
				    {
				        "txt":"客户服务",
				        "href":"http://help.163.com/"
				    },
				    {
				        "txt":"相关法律",
				        "href":"http://gb.corp.163.com/gb/legal.html"
				    },
				    {
				        "txt":"网易游戏",
				        "href":"http://game.163.com/about/about.html"
				    },
				    {
				        "txt":"联系我们",
				        "href":"http://game.163.com/about/contactus.html"
				    },
				    {
				        "txt":"商务合作",
				        "href":"http://game.163.com/bs/business.html"
				    },
				    {
				        "txt":"联运推广",
				        "href":"http://game.163.com/bs/ca_lianyun.html"
				    },
				    {
				        "txt":"加入我们",
				        "href":"http://game.163.com/job/"
				    },
				    {
				        "txt":"用户协议",
				        "href":"http://game.163.com/sy/client/userAgreement2.html"
				    }
				],
				"company": "网易公司版权所有", //公司
				"time": "1997-2016",//时间（待定，可以用js获取当前年份）
				"reportCenter":{
				    "txt":"中国网络游戏版权保护联盟举报中心",
				    "href":"http://www.cogcpa.org"
				},
				"guardianship":{
				    "txt":"点击查看家长监护工程",
				    "href":"http://www.leihuo.net/jiazhang.html"
				},
				"tempCopyrightHtml":"<a href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602000260' target='_blank'><img src='http://res.nie.netease.com/comm/NIE_copyRight/images/beian.png'>粤公网安备 44010602000260号</a>",
				"agePermision":"本游戏适合16岁以上的玩家进入。", //适合年龄
				"suggestion": "积极健康的游戏心态是健康游戏的开端，本游戏故事情节设置紧凑，请您合理控制游戏时间，避免沉溺游戏影响生活，注意自我保护，防范网络陷阱。", //建议
				"reportInfoHtml":'全国文化市场统一举报电话：12318　文化部网络游戏举报和联系电子邮箱：<a href="mailto:wlwh@vip.sina.com">wlwh@vip.sina.com</a>',
				"record":[//备案
				    {
				        "txt":"《网络游戏管理暂行办法》",
				        "href":"http://game.163.com/news/2010/6/9/442_216957.html"
				    },
				    {
				        "txt":"文网游备字【2005】017号（2011）C-RPG042号",
				        "href":""
				    },
				    {
				        "txt":"《网络文化经营许可证》",
				        "href":""
				    },
				    {
				        "txt":"粤网文[2014]0636-236号",
				        "href":""
				    },
				    {
				        "txt":"文网文[2009]156号",
				        "href":""
				    },
				    {
				        "txt":"浙网文[2016]0155-055号",
				        "href":""
				    },
				    {
				        "txt":"粤ICP备B2-20090191",
				        "href":"http://www.miibeian.gov.cn/"
				    }
				],
				"otherHtml":"tx3.163.com由广州网易计算机系统有限公司授权杭州网易雷火科技有限公司使用"
			}
		}
	}else{
		data = {
			"success": 401,
			"mess": "参数不能为空！"
		}
	}
	
	res.send(config.callback+'('+ JSON.stringify(data) +')');
	// res.send(config.callback+'({success: 1})');
})

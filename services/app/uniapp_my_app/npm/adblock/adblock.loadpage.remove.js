// 这个文件的作用是在页面加载完成后，通过一些技术手段来移除已经加载的广告元素，或者通过修改页面样式等方式隐藏广告内容，从而实现去除广告的效果。

$(function() {
	var removeAd = {
		checkUrl: function() {
			this.findSomeAdPossible();
			this.blockAds();
		},
		
		// 移除广告
		blockAds: function() {
			console.log('blockAds Start'); 			
			console.log(window.location.href);			
			if (window.location.href.includes("iqiyi")) {
				// 继续浏览精彩内容
				document.querySelectorAll('.cover').forEach((element) => {
				  element.parentNode.removeChild(element);
				});
				document.querySelectorAll('.iqyGuide-content').forEach((element) => {
				  element.style.display = 'none';
				});
				// 打开 iqiyi APP，看精彩视频
				document.querySelector('.ChannelHomeBanner_mbox_2Q4aQ').remove();
			}
			if (window.location.href.includes("qq")) {
				// 继续使用浏览器
				document.querySelector('.at-app-banner__open-method.at-app-banner--button').click();
				// 打开APP看海量高清内容
				document.querySelector('.at-app-banner__main-btn.at-app-banner--button').remove();
			}
			if (window.location.href.includes("youku")) {
				// 继续使用浏览器
				document.querySelectorAll('.callEnd_box ').forEach((element) => {
				  element.style.display = 'none';
				});
			}
			if (window.location.href.includes("anfuns")) {
				// 移除弹框
				document.querySelectorAll('div.hl-poptips-wrap.hl-bg-site').forEach((element) => {
				  element.parentNode.removeChild(element);
				});
				// 移除置灰背景
				document.querySelectorAll('div.hl-pops-bg.hl-pops-bg-active').forEach((element) => {
				  element.parentNode.removeChild(element);
				});
			}
			if (window.location.href.includes("yemu")) {
				// 头部广告
				document.querySelector('.t_close').click();
			}
		},
		
		//简单的智能算法
		findSomeAdPossible: function() {
			var sap = $('div iframe'),
				ad_img = $('div script').parent().find('img,embed'),
				float_img = $('div object').parent().find('img,embed');
			this.arrayDel(sap, 360, 200);
			this.arrayDel(ad_img, 350, 150);
			this.arrayDel(float_img, 350, 150);
		},
		arrayDel: function(arr, conWidth, conHeight) {
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				var self = arr.eq(i);
				if (self.width() <= conWidth || self.height() <= conHeight) {
					self.remove();
				}
			}
		},
		
		// 初始化
		init: function() {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js';
			document.head.appendChild(script);
			
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js';
			document.head.appendChild(script);	
			
			this.checkUrl();
		}
	}
	$(document).ready(function() {
		removeAd.init();
		//为防ajax异步延时加载的告隔4s再清除次
		setTimeout(function() {
			removeAd.init();
		}, 4000)
	});
})
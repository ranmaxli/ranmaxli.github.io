// 加载页面前去广告.js：这个文件的作用是在页面加载之前，通过一些技术手段来阻止或过滤广告内容的加载，从而达到去除广告的效果。

$(function() {
	var balckAd = {
		checkUrl: function() {
			this.checkIsFullScreen();
			this.parseNextUrl();
		},
		
		// Video全屏监听
		checkIsFullScreen: function() {
			console.log('checkIsFullScreen Start');
			
			//jQuery监听事件(窗口状态改变)
			var lastOrientation = '';						
			$(window).on('resize', function() {
			  setTimeout(function() {
				var isFullScreen = checkIsFullScreen();
				var orientation = getOrientation(isFullScreen);
				if (orientation !== '') {
					// webview 发送消息给 uniapp
					uni.postMessage({
						data: {
							info: {
							  orientation: orientation
							}
						}
					});
				}
			  }, 5000);
			});
			
			// 检查是否处于全屏状态，返回一个布尔值
			function checkIsFullScreen() {
			  var isFullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
			  return isFullScreen == undefined ? false : isFullScreen;
			}
			
			// 返回全屏状态
			function getOrientation(isFullScreen) {
			  var orientation = isFullScreen ? '进入全屏' : '退出全屏';
			  if (lastOrientation !== orientation) {
				lastOrientation = orientation;
				return orientation;
			  } else {
				return '';
			  }
			}
		},
		
		// 解析下一个跳转的url地址
		parseNextUrl: function() {
			console.log('parseNextUrl Start');				
			
			// 监听事件用于下一跳连接的获取
			$(document).ready(function() {
			  $('a').click(function(event) {
				event.preventDefault(); // 阻止链接的默认行为
				var href = $(this).attr('href'); // 获取链接的 href 属性
				var pageTitle = document.title; // 获取链接的 title 属性
				
				if (href.indexOf('http') === -1) { // 如果 href 不包含 http
					href = window.location.protocol + '//' + window.location.host + href; // 获取当前页面的域名并拼接 href
				}							
				if (href.indexOf('?') !== -1) { // 如果链接已经包含参数
					href += '&pageTitle=' + pageTitle; // 使用 & 符号添加标题信息
				} else { // 如果链接没有包含参数
					href += '?pageTitle=' + pageTitle; // 添加参数并添加标题信息
				}															
				
				// webview 发送消息给 uniapp
				uni.postMessage({
				  data: {
					info: {
					  href: href,
					  title: pageTitle
					}
				  }
				})								
			  });
			});
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
			
			// 备用地址
			// 'https://ranmaxli.gitee.io/blog/services/app/uniapp_my_app/npm/jquery/jquery-3.5.1.min.js'
			// 'https://ranmaxli.gitee.io/blog/services/app/uniapp_my_app/npm/uni.webview/uni.webview.1.5.2.js'	
			
			this.checkUrl();
		}
	}
	$(document).ready(function() {
		balckAd.init();
	});
})
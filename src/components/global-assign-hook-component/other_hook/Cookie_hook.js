(function() {
    //严谨模式 检查所有错误
    'use strict';
    //document 为要hook的对象   这里是hook的cookie
	var cookieTemp = "";
    Object.defineProperty(document, 'cookie', {
		//hook set方法也就是赋值的方法 
		set: function(val) {
				//这样就可以快速给下面这个代码行下断点
				//从而快速定位设置cookie的代码
				console.log('Hook捕获到cookie设置->', val);
				cookieTemp = val;
				return val;
		},
		//hook get方法也就是取值的方法 
		get: function()
		{
			return cookieTemp;
		}
    });
})();
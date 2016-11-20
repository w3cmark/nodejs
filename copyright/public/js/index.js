$.ajax({
	type: 'get',
	url: 'getCopyright',
	dataType: 'jsonp',
	data: {
		'domainName': 'xyq'
	},
	success: function(results){	
		if(results.success === 1){
			$('#Jresult').prepend('<p>'+ results.mess +'</p>');
			$('#Jresult').prepend('<p>共'+ results.suc +'张图片裁剪成功，共'+ results.err +'张图片裁剪失败</p>');
		}
	},
	error: function(){
		alert('请稍后再试！');
	}
})
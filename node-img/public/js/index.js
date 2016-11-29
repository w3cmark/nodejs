$('#Jbtn').bind('click', function(){
	$('#Jresult').html('');
	var $cropform = $('#Jcropform'),
		inputdir = $cropform.find('input[name="config[inputdir]"]').val(),
		outputdir = $cropform.find('input[name="config[outputdir]"]').val(),
		format = $cropform.find('input[name="config[format]"]').val(),
		size = $cropform.find('input[name="config[size]"]').val(),
		startpoint = $cropform.find('input[name="config[startpoint]"]').val(),
		space = $cropform.find('input[name="config[space]"]').val();

	if(space && !checkInput(space)){
		alert('请填写正确的坐标递增值！');
		return false;
	}
	if(startpoint && !checkInput(startpoint)){
		alert('请填写正确的起点坐标！');
		return false;
	}
	if(!checkInput(size)){
		alert('请填写正确的裁剪尺寸！');
		return false;
	}
	
	// if(!checkInput(startpoint)){
	// 	alert('请填写正确的裁剪起点坐标！');
	// 	return false;
	// }
	$('#Jresult').prepend('<p>正在裁剪...</p>');

	$.ajax({
		type: 'get',
		url: 'crop',
		dataType: 'jsonp',
		data: {
			'inputdir': inputdir,
			'outputdir': outputdir,
			'format': format,
			'size': size,
			'startpoint': startpoint,
			'space': space
		},
		success: function(results){
			$('#Jresult').html('');			
			if(results.success === 1){
				$('#Jresult').prepend('<p>'+ results.mess +'</p>');
				$('#Jresult').prepend('<p>共'+ results.suc +'张图片裁剪成功，共'+ results.err +'张图片裁剪失败</p>');
			}
		},
		error: function(){
			alert('请稍后再试！');
		}
	})
})

function checkInput(val){
	if(val && val.indexOf('，') == -1){
		if(val.indexOf(',') > -1){
			var vals = val.split(',');
			if(vals.length != 2 || (vals[0]!= 0 && !parseInt(vals[0])) || (vals[1]!= 0 && !parseInt(vals[1]))) {
				return false;
			}
		}else if(!parseInt(val)){
			return false;
		}
	}else{
		return false;
	}
	return true;
}
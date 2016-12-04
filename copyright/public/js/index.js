// if($('Jglobalconfig')[0]){
// 	$.ajax({
// 		type: 'get',
// 		url: '/getCopyright',
// 		dataType: 'jsonp',
// 		data: {
// 			'domainName': 'global'
// 		},
// 		success: function(results){	
// 			if(results.success === 1){
				
// 			}
// 		},
// 		error: function(){
// 			alert('请稍后再试！');
// 		}
// 	})
// }
$('input[type=submit]').click(function(){
	// $.ajax({
	// 	type: 'POST',
	// 	url: '/global/new',
	// 	dataType: 'jsonp',
	// 	data: {
	// 		'domainName': 'xyq'
	// 	},
	// 	success: function(results){	
	// 		if(results.success === 1){
	// 			alert('添加成功！');
	// 		}
	// 	},
	// 	error: function(){
	// 		alert('请稍后再试！');
	// 	}
	// })
})

$('.del').click(function(e){		
	var target = $(e.target),
		id = target.data('id'),
		tr = $('.item-id-' + id);
	if(confirm('确定删除此配置？')){
		$.ajax({
			type: 'DELETE',
			url: '/?id='+ id
		})
		.done(function(results){
			if(results.success === 1 && tr.length > 0){
				tr.remove();
				alert('删除成功')
			}
		})
	}
	
})
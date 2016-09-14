//On Load

$.getJson('/admin', function (data){
	for (var i = 0; i<data.length; i++){
		$('#results').append('<tr><td>' + data[i].firstName + data[i].lastName +'</td'>
			'<td>'+ data[i].positon + '</td>' + 
                         '<td>'+ data[i].table + '</td></tr>');
      }
});
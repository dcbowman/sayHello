$('#addGuest').on('click', function(){
  $.ajax({
    type: "POST",
    url: '/submit',
    dataType: 'json',
    data: {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val(),
      position: $('#position').val(),
      table: $('#table').val(),
      linkedin: $('#linkedin').val(),
      imagePath: $('#image').val()

    }
  })
  .done(function(data){
    console.log(data);
    getGuests();
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#position').val("");
    $('#table').val("");
    $('#linkedin').val("");
    $('#image').val("");
  }
  );
 });


function getGuests(){
  $('#masterList').empty();
  $.getJSON('/all', function(data) {
    for (var i = 0; i<data.length; i++){
      $('#masterList').prepend('<tr><td>' + data[i].firstName + '</td>' + '<td>' + data[i].lastName + '</td>' + '<td>'+ data[i].position + '</td>' + '<td>' + data[i].table + '</td></tr>');
    }
    $('#masterList').prepend('<tr><th>First Name</th><th>Last Name</th><th>Position</th><th>Table</th></tr>');
  });
}

  


getGuests();


$(document).ready(function(){
    $('#editvoucherform').on('submit', function() {
      if(document.getElementById("statuscheck").checked) {
      document.getElementById('statushidden').disabled = true;
      }
    })
    $('.trashlink').click( function() {
        let $row = $(this).closest('tr');
        let id = $row.find('.vid').text();
        $.ajax({
            url: "/admin/delete/"+ id,
            type: 'DELETE',
        }).done(function(){
            location.reload();
        })
        })
})
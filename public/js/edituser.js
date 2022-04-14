$(document).ready(function(){
    $('.statbut').click(function() {
        let $row = $(this).closest('tr');
        let id = $row.find('.userid').text();
        $.ajax({
            url: "/admin/ban/"+ id,
            type: 'POST',
            error: function(data, err){ console.log('my message' + err); }
        }).done(function(){
            location.reload();
        })
    })
})
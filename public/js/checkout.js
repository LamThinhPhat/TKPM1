function ShowHideDiv() {
    var chkYes = document.getElementById("chkYes");
    var dvtext = document.getElementById("dvtext");
    dvtext.style.display = chkYes.checked ? "block" : "none";
}

function applyVoucher(e){
    const voucher_name=document.getElementById('voucher_id').value;
    const userid=e.target.getAttribute("data-userid");
    const url = window.location.origin + `/user/checkout/applyvoucher/${userid}`;
  
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        voucher_name
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)),
      function(){
        location.reload();

      }
    )
    .catch(err => console.log(err))
}
    



$("input:radio").change(function () {$("#confirm").prop("disabled", false);});


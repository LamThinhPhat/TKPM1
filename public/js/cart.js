/* Set rates + misc */
var taxRate = 0.05;
var fadeTime = 300;


/* Recalculate cart */
function recalculateCart() {
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var total = subtotal + tax;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function () {
    $('#cart-subtotal').html(subtotal);
    $('#cart-tax').html(tax);
    $('#cart-total').html(total);
    if (total == 0) {
      $('.checkout').fadeOut(fadeTime);
    } else {
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(e) {

  /* Calculate line price */
  var productRow = $(e.target).parent().parent();
  var vendorRow = productRow.parent()[0];
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(e.target).val();
  var linePrice = price * quantity;

  const bookID = e.target.getAttribute("data-bookid");
  const vendorID = vendorRow.getAttribute("data-vendorid");
  const userID = document.getElementById('user-id').getAttribute("data-userid");

  const url = window.location.origin + `/user/cart/${bookID}`;
  fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        userID,
        vendorID,
        bookID,
        quantity
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)),
      /* Update line price display and recalc cart totals */
      productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
          $(this).text(linePrice);
          recalculateCart();
          $(this).fadeIn(fadeTime);
        });
      })
    )

}

$(document).ready(function () {
  recalculateCart();
});

/* Remove item from cart */
function removeItem(e) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(e.target).parent().parent();
  var vendorRow = productRow.parent()[0];
  const bookID = e.target.getAttribute("data-bookid");
  const vendorID = vendorRow.getAttribute("data-vendorid");
  const userID = document.getElementById('user-id').getAttribute("data-userid");
  const url = window.location.origin + `/user/cart/${bookID}`;

  fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        userID,
        vendorID,
        bookID
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)),
      productRow.slideUp(fadeTime, function () {
        console.log("Success");
        productRow.remove();
        if (!vendorRow.querySelector("#product")) vendorRow.remove();
        recalculateCart();
      })
    )
}

function addCart(e){
  const bookid = e.target.getAttribute("data-bookid");
  const quantity=document.getElementById('qty').value;
  const url = window.location.origin + `/user/cart/${bookid}`;
  const noticeText = document.getElementById('add-cart-notice');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      bookid,
      quantity
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)),
      function(){
        noticeText.innerText = '+ 1';
        setTimeout(() => noticeText.innerText = '', 1000);

      }
    )
}
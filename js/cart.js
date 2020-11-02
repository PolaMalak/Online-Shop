window.addEventListener('load',function addtocart(){
    var logined = document.getElementById('loginlink')
    
    logined.style.display = 'none';
    
    var retrievedData = localStorage.getItem("products");
    var productsarray = JSON.parse(retrievedData);
    for(var i=0 ; i < productsarray.length;i++){
    addItemToCart(productsarray[i].productId, productsarray[i].price, productsarray[i].image,productsarray[i].quantity)
    }
})

function addItemToCart(title, price, imageSrc,quantity) {
    var cartRow = document.createElement('div')
    var cartnum = document.getElementById('nav-cart-number')
    cartnum.innerHTML = JSON.parse(localStorage.getItem('quantity'))
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal();
}
function purchase(){
    alert('Thanks for purchase');
    localStorage.removeItem('products');
    localStorage.removeItem('quantity');
    window.open('/cart.html','_self')
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    var productname = event.target.parentElement.parentElement.childNodes[1].innerText;
    var trimmed = productname.trim()
    var values = 0
    var pArr = JSON.parse(localStorage.getItem('products'));
    $(pArr).each(function(i,value){
        if(trimmed == pArr[i].productId){
        console.log( pArr[i].productId);
        values = i;
        console.log(values);    
        }
    });
    pArr.splice(values,1);
    localStorage.setItem('products', JSON.stringify(pArr));
    updateCartTotal()
}
function quantityChanged(event) {
      var input = event.target
    // if (isNaN(input.value) || input.value <= 0) {
    //     input.value = 1
    // }
    if(input.value == 0){
        removeCartItem(event);
    }
    var productname = event.target.parentElement.parentElement.childNodes[1].innerText;
    var productarrays = JSON.parse(localStorage.getItem('products'));
    $(productarrays).each(function(i,value){
        if(productname == productarrays[i].productId){
            productarrays[i].quantity = input.value;
           
        }
    })
    localStorage.setItem('products', JSON.stringify(productarrays));

    updateCartTotal()
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var cartnum = document.getElementById('nav-cart-number')
    // cartnum = JSON.parse(localStorage.getItem('quantity'))
    // console.log(cartnum)
    var qinP =0
    var test =0
    total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var cartProductName = cartRow.getElementsByClassName('cart-item')[0]
        quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        
        var productsarr = JSON.parse(localStorage.getItem('products'));
         $(productsarr).each(function(i,value){
             qinP += parseInt(productsarr[i].quantity);
             var test =cartProductName.innerText
             var currentname = productsarr[i].productId 
             if (currentname == test ){
                //  localStorage.setItem('quantity' , quantity)

             }else{
             }
         })
        total = total + (price * quantity)
        test += parseInt(quantity) 
        localStorage.setItem('quantity',test)
    }
    cartnum.innerHTML = test;
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


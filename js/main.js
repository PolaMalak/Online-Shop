if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    if (sessionStorage.getItem('AuthenticationState') === null) {
        var cart = document.getElementById('cartlink')
            cart.style.display = 'none';
        }else{
            var logined = document.getElementById('loginlink')
            var logout = document.getElementById('logoutlink')
            logined.style.display = 'none';
            logout.style.display = 'inline';
        }
    
    addnewproduct();

}
window.addEventListener('load',function(){
    
})
function logout(){
    sessionStorage.removeItem('AuthenticationState');
    localStorage.removeItem('products');
    localStorage.removeItem('quantity');
    window.open('/main.html','_self');
}
function addnewproduct(){
    $(function() {  
          $.getJSON('data.json', function(data){
            /* console.log(data); */
          $(data).each(function(i,value){
            $('.shop').append($(`<div class="col-md-6 col-sm-12 float-left mt-3">`)
            .append($(`<div class="card ">`)
            .append($("<div class=card-header>")
            .append($("<p id=item-name>").append(data[i].productName)))
            .append($("<div class=card-body>")
            .append($(`<img id=item-image src='${data[i].productImg}'>`))
            )
            .append($("<div class=card-footer>")
            .append($("<p id=item-price>").append(data[i].productPrice))
            .append($("<p id=item-price-tag>").append("Price : $"))
            .append($(`<button class="btn btn-dark add-cart">`).append("Add to Cart"))
            )
            )
            )
            
          });
          
      })

});
assignbtn();
}
function assignbtn(){
  var cartnum = document.getElementById('nav-cart-number')
    cartnum.innerHTML = localStorage.getItem('quantity') 

    var addToCartButtons = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    var addproduct = document.getElementsByClassName('add-new')
    console.log(addproduct)
    var addbtn = addproduct[0]
}

            
function addToCartClicked(event) {
    
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('card-header')[0].innerText
    var price = shopItem.getElementsByClassName('card-footer')[0].innerText.slice(0, 3)
    var imageSrc = shopItem.getElementsByClassName('card-body')[0].childNodes[1].src
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push({'productId' : title , 'image' : imageSrc , 'price':price});
    localStorage.setItem('products', JSON.stringify(products));
    
}
function changepage(){
    window.open('/shop.html','_self');
}
function contactform(event){
    event.preventDefault();
    alert("you message have been sent thank you.");
    var firstname = $("#fname")[0].value;
    var lastname = $("#lname")[0].value;
    var email = $("#email")[0].value;
    var country = $("#country")[0].value;
    var subject = $("#subject")[0].value;
    var feedback = [];

    if(localStorage.getItem('feedback'))
    {
        feedback = JSON.parse(localStorage.getItem('feedback'))
    }
    feedback.push({'firstname' : firstname , 'lastname' : lastname , 'email':email ,'country' : country ,'subject':subject});
    localStorage.setItem('feedback',JSON.stringify(feedback));
    window.open('/main.html','_self')
}
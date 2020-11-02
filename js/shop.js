if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    
    var logined = document.getElementById('loginlink')
    logined.style.display = 'none';
    addnewproduct();

}
window.addEventListener('load',function(){
    
})
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
}


$('body').on('click', '.add-cart', function (e) {
    console.log(e)
    var flag = 0;
    var button = e.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('card-header')[0].innerText
    var price = parseInt(shopItem.getElementsByClassName('card-footer')[0].innerText.slice(0, 4))
    var imageSrc = shopItem.getElementsByClassName('card-body')[0].childNodes[0].src
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    $(products).each(function(i,value) {
        if(title == products[i].productId){
            alert("you already added this product to cart");
            flag ++;
        }
    });
    if(flag != 1){
    products.push({'productId' : title , 'image' : imageSrc , 'price':price ,'quantity' : 1});
    var itemquantity = products.length
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('quantity',JSON.stringify(itemquantity));
    }
    
});
       




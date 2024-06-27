"use strict"; // Applies strict mode globally

function validateForm(event){
    event.preventDefault(); // Prevents default form submission
    
    // My inputs
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("myEmail");
    let phone = document.getElementById("myPhone");
    let fieldset = document.querySelector("fieldset");
    let agree = document.getElementById("agree");
    
    // this is where we'll display a message if they haven't entered a comment
    let message = document.getElementById("messageError");
    
    // containers for display to user
    let confirm = document.getElementById("confirm");
    // re-hides the output paragraph
    confirm.classList.add("hidden");
    
    // regular expressions pulled from regexr.com
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]\d{3}[\s-]\d{4}$/;
  
    // reset the border styles on the inputs
    firstName.classList.remove("error");
    lastName.classList.remove("error");
    email.classList.remove("error");
    phone.classList.remove("error");
    agree.classList.remove("error");
    
    // hide any previous error messages/empty output containers
    firstName.nextElementSibling.classList.add("hidden");
    lastName.nextElementSibling.classList.add("hidden");
    email.nextElementSibling.classList.add("hidden");
    phone.nextElementSibling.classList.add("hidden");
    message.classList.add("hidden");
    confirm.innerHTML = "";
    
    // string to build my output error list
    let errors = "<ul>";
  
    // variable to track whether or not the form is valid
    let isValid = true;
  
    // validation of inputs
    if(!(emailRegex.test(email.value))){
      // change our boolean flag because the form is not valid
      isValid = false;
      // add error class to input
      email.classList.add("error");
      // display error message for user about this input
      email.nextElementSibling.classList.remove("hidden");
      // errors += "<li>Please enter a valid email address</li>";
    }
    if(!(phoneRegex.test(phone.value))){
        // change our boolean flag because the form is not valid
        isValid = false;
        // add error class to input
        phone.classList.add("error");
        // display error message for user about this input
        phone.nextElementSibling.classList.remove("hidden");
        // errors += "<li>Please enter a valid phone number</li>";
      }
  
    
    // if the user doesn't enter any comment, display a message
    if(!agree.checked){
      // change our boolean flag because the form is not valid
      isValid = false;
      // add the error class to the input
      message.classList.remove("hidden");
      // errors += "<li>You must enter a comment above to submit</li>";
    }
  
    // if the form is valid, submit it after displaying the user's info to them and clearing the form for new input
    if(isValid){
      // remove the hidden class from the output paragraph
      confirm.classList.remove("hidden");
      
      // display the user's input to them in the paragraph for output
      confirm.innerHTML = "<strong>You Entered:</strong><br>Full Name: " + firstName.value + lastName.value + "<br>Email: " + email.value + "<br>Phone Number: " + phone.value + "<br>Preferred Contact: " + snack;
      
      // code that submits to the server 
      document.getElementById("newMessage").submit();
  
      // reset values of inputs/clear them out
      firstName.value = "";
      lastName.value = "";
      phone.value = "";
      email.checked = true;
      phone.checked = false;
  
      // hides any error messages
      firstName.nextElementSibling.classList.add("hidden");
      email.nextElementSibling.classList.add("hidden");
      phone.nextElementSibling.classList.add("hidden");
      agree.nextElementSibling.classList.add("hidden");
    }
}

// event listeners
document.getElementById("newMessage").addEventListener("submit", validateForm);

  
// 
var taxRate = 0.06;
var shippingRate = 15.00; 
var fadeTime = 300;
  
function recalculateCart(){
    var subtotal = 0;
    
    /* Adds row totals */
    $('.product').each(function () {
      subtotal += parseFloat($(this).children('.product-line-price').text());
    });
    
    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;
    
    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
      $('#cart-subtotal').html(subtotal.toFixed(2));
      $('#cart-tax').html(tax.toFixed(2));
      $('#cart-shipping').html(shipping.toFixed(2));
      $('#cart-total').html(total.toFixed(2));
      if(total == 0){
        $('.checkout').fadeOut(fadeTime);
      }else{
        $('.checkout').fadeIn(fadeTime);
      }
      $('.totals-value').fadeIn(fadeTime);
    });
  }
  
  
  /* Update quantity */
  function updateQuantity(quantityInput)
  {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;
    
    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
      $(this).fadeOut(fadeTime, function() {
        $(this).text(linePrice.toFixed(2));
        recalculateCart();
        $(this).fadeIn(fadeTime);
      });
    });  
  }
  
  
  /* Remove item from cart */
  function removeItem(removeButton)
  {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
      productRow.remove();
      recalculateCart();
    });
  }


// ----------------------------- SIDE NAV BAR INITIALIZATION
// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});


// ----------------------------- Or with jQuery
$(document).ready(function () {
    $('.sidenav').sidenav();
});

instance.open();


// ----------------------------- SIDE NAV BAR METHODS
var instance = M.Sidenav.getInstance(elem);
// jQuery Method Calls
//   You can still use the old jQuery plugin method calls.
//   But you won't be able to access instance properties.
 $('.sidenav').sidenav('methodName');
 $('.sidenav').sidenav('methodName', paramName);


// ----------------------------- SLIDESHOW INITIALIZATION
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
    $('.slider').slider();
});

// ----------------------------- METHODS FOR SLIDESHOW
var instance = M.Slider.getInstance(elem);
// jQuery Method Calls
//   You can still use the old jQuery plugin method calls.
//   But you won't be able to access instance properties.

//   $('.slider').slider('methodName');
//   $('.slider').slider('methodName', paramName);

// ----------------------------- MOVE TO NEXT SLIDER
instance.next();
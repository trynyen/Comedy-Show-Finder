// ----------------------------- FUNCTIONS


// Seach function by performer and city
function search(city, comedian) {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlelGSzA9lSOeg1ZgZwKBzUyhlQO1CvD&classificationName=comedy&city=" + city + "&keyword=" + comedian;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //If shows are available, display show info
        if (response._embedded != null) {
            for (var i = 0; i < response._embedded.events.length; i++) {
                var eventName = $("<h2>").text(JSON.stringify(response._embedded.events[i].name));

                //Store event image in a variable, and add a class to adjust the image size
                var eventImage = $("<img>").attr("src", response._embedded.events[i].images[0].url);
                eventImage.addClass("r-img");

                //Changed the date format and print event date out on page
                eventDateFormat = moment(JSON.stringify(response._embedded.events[i].dates.start.localDate),'"YYYY-MM-DD"').format("dddd MMM DD")
                var eventDate = $("<p>").text("Show date: " + eventDateFormat);

                //Changed the date format and print event date out on page
                eventTimeFormat = moment(JSON.stringify(response._embedded.events[i].dates.start.localTime),"HH:mm:ss").format("hh:mm A");
                var eventTime = $("<p>").text("Showtime: " + eventTimeFormat);

                //Store event venue and city in variables
                var eventVenue = $("<p>").text("Venue: " + JSON.stringify(response._embedded.events[i]._embedded.venues[0].name));
                var eventCity = $("<p>").text("City: " + JSON.stringify(response._embedded.events[i]._embedded.venues[0].city.name));

                //Store event ticket url in a variable, and print out on page
                var eventTicket = $("<a>").attr("href", response._embedded.events[i].url);
                eventTicket.text("See Tickets")
                $("#display").append(eventName, eventImage, eventDate, eventTime, eventVenue, eventCity, eventTicket);
            }
        }

        //If shows are not available, show an alert on page
        else {
            var errorMessage = $("<h2>").text("BUMMER, the performer you searched doesn't have any shows available at the moment")
            $("#display").append(errorMessage);
        }

    });
};

//When submit button is clicked
$("#submit").click(function (event) {

    //Empty out previous search
    $("#display").empty();

    //Prevent auto submit
    event.preventDefault();

    //Store City and Performer input into variables
    var city = $("#city").val().trim();
    var comedian = $("#comedian").val().trim();

    //If the input search boxes are NOT empty, search function is called
    if (city !== "" || comedian !== "") {
        search(city, comedian);
    }

    // If the search boxes are empty, display empty search error message
    else {
        var emptySearch = $("<h2>").text("Please enter Performer or City")
        $("#display").append(emptySearch);
    }
});




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
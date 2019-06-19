// ----------------------------- FUNCTIONS
let ticketmasterResp;

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
                ticketmasterResp = response._embedded.events;
                var eventNameDiv = $("<div>");
                eventNameDiv.addClass("event-name-div");

                var eventName = $("<a>").text(JSON.stringify(response._embedded.events[i].name));
                eventName.attr("href", "#");
                eventName.attr("data", i);
                eventName.addClass("event-link");
                eventNameDiv.append(eventName);


                var eventImage = $("<img>").attr("src", response._embedded.events[i].images[0].url);
                eventImage.addClass("r-img");

                //Changed the date format and print event date out on page
                eventDateFormat = moment(JSON.stringify(response._embedded.events[i].dates.start.localDate), '"YYYY-MM-DD"').format("dddd MMM DD")
                var eventDate = $("<p>").text("Show date: " + eventDateFormat);

                //Changed the date format and print event date out on page
                eventTimeFormat = moment(JSON.stringify(response._embedded.events[i].dates.start.localTime), "HH:mm:ss").format("hh:mm A");
                var eventTime = $("<p>").text("Showtime: " + eventTimeFormat);

                //Store event venue and city in variables
                var eventVenue = $("<p>").text("Venue: " + JSON.stringify(response._embedded.events[i]._embedded.venues[0].name));
                var eventCity = $("<p>").text("City: " + JSON.stringify(response._embedded.events[i]._embedded.venues[0].city.name));

                var eventTicket = $("<a>").attr("href", response._embedded.events[i].url);
                eventTicket.text("See Tickets").addClass("ticket-url");
                $("#display").append(eventNameDiv, eventImage, eventDate, eventTime, eventVenue, eventCity, eventTicket);
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
    
    $("#commedian-info").css("display", "none");
    $("#results").css("display", "block");


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

//When A show Title Link is clicked
$(document).on('click', '.event-link', function(e) {
    console.log("clicked event title");
    $("#results").css("display", "none");
    $("#commedian-info").empty();
    $("#commedian-info").css("display", "block");
    var eventNum = $(this).attr("data");
    var eventImageUrl = ticketmasterResp[eventNum].images[0].url;
    var image = $('<img class="event-image">');
    image.attr("src", eventImageUrl);
    $("#commedian-info").append(image);
  
    var performer = ticketmasterResp[eventNum]._embedded.attractions[0].name;
    var youtubeSearch = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+performer+'+comedy&key=AIzaSyAtIQuhUzQGsQ8yzMwI0uWQdrJAuh4rcl4&type=video&order=viewCount';



    var subject = performer.split(" ").join("%20");



    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&titles="+subject+"&prop=revisions&rvprop=content&rvslots=main&rvsection=0&origin=*";

    var queryURL2 = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+subject+"&origin=*";


    let ast = "*";

    var pageId ='';
    $.ajax({
    url: queryURL2,
    method: 'GET',
    }).then(function(response) {
    
    pageId = response.query.search[0].pageid;
    console.log(response.query.search[0].pageid)

    $.ajax({
        url: queryURL,
        method: 'GET',
        }).then(function(response) {
        console.log(response.query.pages[pageId].revisions[0].slots.main[ast]);

        var commedyGenres, commedyGenres, website;
        

      if(response.query.pages[pageId].revisions[0].slots.main[ast].indexOf("subject")>0) {
        commedySubjects = response.query.pages[pageId].revisions[0].slots.main[ast].split("subject")[1].split("=")[1].split("[[").join('').split("]]").join('').split("*").join('').split("{{").join('').split("}}").join('').split("spouse").join('').split("|").join(",");
        }

     if(response.query.pages[pageId].revisions[0].slots.main[ast].indexOf("genre")>0) {
        commedyGenres = response.query.pages[pageId].revisions[0].slots.main[ast].split("genre")[1].split("=")[1].split("[[").join('').split("]]").join('').split("*").join('').split("{{").join('').split("}}").join('').split("spouse").join('').split("|").join(",").split("<").join("");
    }

    if(response.query.pages[pageId].revisions[0].slots.main[ast].indexOf("website")>0) {
        if(response.query.pages[pageId].revisions[0].slots.main[ast].split("website")[1].split("=")[1].split("}")[0].indexOf("URL|")>0) {
            console.log("trigger 1");
            website =  response.query.pages[pageId].revisions[0].slots.main[ast].split("website")[1].split("=")[1].split("|")[1].split("}")[0];
            console.log(website);
        }else if (response.query.pages[pageId].revisions[0].slots.main[ast].split("website")[1].split("=")[1].split("}")[0].indexOf("url|")>0) {
            website =  response.query.pages[pageId].revisions[0].slots.main[ast].split("website")[1].split("=")[1].split("|")[1].split("}")[0];
        } else if (response.query.pages[pageId].revisions[0].slots.main[ast].split("website")[1].split("=")[1].split("}")[0].indexOf("http")>0) {
            website =  response.query.pages[pageId].revisions[0].slots.main[ast].split("website")[1].split("=")[1].split("[")[1].split("|")[0];
        } 
        
        // else {
        //     var website =  response.query.pages[pageId].revisions[0].slots.main[ast].split("website")[1].split("=")[1].split("[")[1].split("]")[0];
        // }

      if (website.length > 5) {
        if(website.indexOf("https://")  < 0  && website.indexOf("http://")  < 0) {
            website = "https://" +website
        }
         var websiteDiv = $("<div>");
         websiteDiv.html("<h6>Website: </h6>");
         var websiteLink = $("<a>").attr("href", website);
         websiteLink.text(website);
         websiteDiv.append(websiteLink) 
        $('#commedian-info').append(websiteDiv);
      }
    }
            

      if(commedySubjects.length > 15 && commedyGenres.length > 15){
        var textDiv = $("<div>");
        textDiv.addClass("commedian-bio");
        textDiv.html("<h4>Subjects of Comedy:</h4><p>"+commedySubjects + "</p><h4>Genres:</h4><<p>" + commedyGenres+"</p>");
        $('#commedian-info').append(textDiv);
      } else if(commedySubjects.length > 15) {
        var textDiv = $("<div>");
        textDiv.addClass("commedian-bio");
        textDiv.html("<h4>Subjects of Comedy:</h4><p>"+commedySubjects + "</p>");
      } else if(commedyGenres.length > 15) {
        var textDiv = $("<div>");
        textDiv.addClass("commedian-bio");
        textDiv.html("<h4>Genres:</h4><p>"+commedyGenres + "</p>");
      }




      //  console.log(response.query.pages[pageId].revisions[0].slots.main[ast].split("subject")[1].split("=")[1].split("[[").join('').split("]]").join('').split("*").join('').split("{{").join('').split("}}").join('').split("spouse").join('').split("|").join(","));

      //  response.query.pages[pageId].revisions[0].slots.main[ast].split("| subject")[1].split("=")[1]
      //  response.query.pages[pageId].revisions[0].slots.main[ast].indexOf("|subject");

      
    }).catch(function(err) {
      console.log(err);
    });
    

  
  });

  $.ajax({
    url: youtubeSearch,
    method: 'GET'
  }).then(function(response) {
    var videoDiv = $("<div>");
    videoDiv.addClass("video-div");
    var videoId = response.items[0].id.videoId;
    var iframe = $('<iframe  class ="video" src="https://www.youtube.com/embed/'+videoId+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    videoDiv.append(iframe);
    $("#commedian-info").append(videoDiv);
  });





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
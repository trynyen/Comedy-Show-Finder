  /**
   * Sample JavaScript code for youtube.search.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

//   function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey("AIzaSyAtIQuhUzQGsQ8yzMwI0uWQdrJAuh4rcl4");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.youtube.search.list({
//       "part": "snippet",
//       "order": "viewCount",
//       "q": "dave chappelle"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "844678775810-l6hh7q1sah8rlm9983en43ipi9tnldci.apps.googleusercontent.com"});
//   });


//   authenticate().then(loadClient).then(execute);
//   /* <button onclick="authenticate().then(loadClient)">authorize and load</button>
// <button onclick="execute()">execute</button> */















var subject = 'Trevor%20Noah';

var queryURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&titles="+subject+"&prop=revisions&rvprop=content&rvslots=main&rvsection=0&origin=*";

var queryURL2 = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+subject+"&origin=*";


var ast = "*";

var pageId ='';
$.ajax({
  url: queryURL2,
  method: 'GET',
  }).then(function(response) { console.log(response.query.search[0].pageid)
  
  pageId = response.query.search[0].pageid;

  $.ajax({
    url: queryURL,
    method: 'GET',
    }).then(function(response) {
       console.log(response.query.pages[pageId].revisions[0].slots.main[ast]);



      //  console.log(response.query.pages[pageId].revisions[0].slots.main[ast].split("subject")[1].split("=")[1].split("[[").join('').split("]]").join('').split("*").join('').split("{{").join('').split("}}").join('').split("spouse").join('').split("|").join(","));

      //  response.query.pages[pageId].revisions[0].slots.main[ast].split("| subject")[1].split("=")[1]
      //  response.query.pages[pageId].revisions[0].slots.main[ast].indexOf("|subject");
    });
    

  
  });




    //  action=centralauthtoken
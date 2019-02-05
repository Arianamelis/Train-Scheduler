
  // Initialize Firebase

  // Initialize Firebase
 
  var config = {
    apiKey: "AIzaSyCA-KBVwbhDCEMcuO6KtBxo-xcoluF2rf0",
    authDomain: "train-schedule-ef52b.firebaseapp.com",
    databaseURL: "https://train-schedule-ef52b.firebaseio.com",
    // projectId: "train-schedule-ef52b",
    storageBucket: "train-schedule-ef52b.appspot.com",
    // messagingSenderId: "806440869096"
  };
  firebase.initializeApp(config);

  


var trainBase = firebase.database();

// var name = "";
// var dest = "";
// var first = "";
// var freq = "";

$("#train-btn").on("click", function(event){
  

    event.preventDefault();
    
     var newTrain = $("#train-name-input").val().trim();
     var destTrain = $("#dest-input").val().trim();
    var firstTime = moment($("#first-time-input").val().trim(),"HH:mm").subtract(10, "years").format("X");
     var freqTime = $("#freq-input").val().trim();
    
     var findTrain = {
      name: newTrain,
      destination: destTrain,
      firstTime: firstTime,
      frequency: freqTime
    };


      trainBase.ref().push(findTrain);


    


      alert("Train successfully added");
   
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#first-time-input").val("");
    $("#freq-input").val("");
  });
  
  trainBase.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
var newTrain = childSnapshot.val().name;
var destTrain = childSnapshot.val().destination;
var firstTime = childSnapshot.val().time;
var freqTime = childSnapshot.val().frequency;

var remainder = moment().diff(moment.unix(firstTime),"minutes")%freqTime;
          var minutes = freqTime - remainder;
          var arrival = moment().add(minutes,"m").format("hh:mm A");
          $("#trainTable > tbody").append("<tr><td>"+newTrain+"</td><td>"+destTrain+"</td><td>"+freqTime+"</td><td>"+arrival+"</td><td>"+minutes+"</td><tr>");


// var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
// what the fuck does prettify mean ?
  });


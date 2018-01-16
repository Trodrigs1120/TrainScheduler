
$(document).ready(function () {
var config = {
    apiKey: "AIzaSyDecDNMTgc-u2YuNPnsrpoRQ2lOk035P-Y",
    authDomain: "jan9th-proj.firebaseapp.com",
    databaseURL: "https://jan9th-proj.firebaseio.com",
    projectId: "jan9th-proj",
    storageBucket: "jan9th-proj.appspot.com",
    messagingSenderId: "604075862601"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

//  database.ref().on("value", function(snapshot) {


$("#submit").on("click", function() {
    var Train = $("#Train-Name").val().trim();
    var Destination = $("#Destination").val().trim();
    var Departure = $("#Train-Start").val().trim();
    var Frequency = $("#Frequency").val().trim();

  var NewRoute = {
    TrainName: Train,
    TrainDestination: Destination,
    DepartureTime: Departure,
    Frequency: Frequency
  }

  database.ref().push(NewRoute);

    // Clear some Text Boxes
    $("#Train-Name").val("");
    $("#Destination").val("");
    $("#Train-Start").val("");
    $("#Frequency").val("");
  });
  database.ref().on("child_added", function(childSnapshot, prevChildKey){


var Train = childSnapshot.val().TrainName;
  var Destination = childSnapshot.val().TrainDestination;
  var Departure = childSnapshot.val().DepartureTime;
  var Frequency = childSnapshot.val().Frequency;

  
  var  DepartureConverted = moment(Departure, "hh:mm").subtract(1, "years");
  // Obtaining Current Time
  var currentTime = moment();
  // Difference between the times
  var difference = moment().diff(moment(DepartureConverted), "minutes");
  // Time apart (remainder)
  var Remainder = difference % Frequency;
  // Minute Until Train
  var TimeUntilNextTrain = Frequency - Remainder;
  // Next Train
  var nextTrain = moment().add(TimeUntilNextTrain, "minutes");
  
  $("#Train-Table > tbody").append("<tr><td>" + Train + "</td><td>" + Destination + "</td><td>" + "Every " +Frequency + " minutes"
   + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + TimeUntilNextTrain);
  });
});

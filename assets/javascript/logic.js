  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJsVQFE7WNBjvF-KmNby6bchnm2LGNir0",
    authDomain: "train-scheduler-app-e9373.firebaseapp.com",
    databaseURL: "https://train-scheduler-app-e9373.firebaseio.com",
    projectId: "train-scheduler-app-e9373",
    storageBucket: "",
    messagingSenderId: "656788805384"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFreq = $("#freq-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDest,
      first: trainFirst,
      frequency: trainFreq
    }

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Train successfully added.");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#freq-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);

    var minutesAway = moment(trainFirst, "hh:mm").fromNow();
    console.log(minutesAway);
  })
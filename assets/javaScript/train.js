
  // Initialize Firebase

  

  var config = {
    apiKey: "AIzaSyC6al9VoMnGoNCw474V3jmrz0ijp81GQMU",
    authDomain: "train-cf625.firebaseapp.com",
    databaseURL: "https://train-cf625.firebaseio.com",
    projectId: "train-cf625",
    storageBucket: "train-cf625.appspot.com",
    messagingSenderId: "199908478983"
};

firebase.initializeApp(config);

var database = firebase.database();


$(".submit").on('click', function (event) {
    event.preventDefault()
    var trainNam = $("#inputTrain").val();
    var destinationNam = $("#inputDestination").val();
    var firstTrain = $('#inputTrainTime').val();
    var frequencyTime = $('#inputFrequency').val();

    console.log(trainNam)
    console.log(destinationNam)
    console.log(firstTrain)
    console.log(frequencyTime)

    database.ref().push({
        train: trainNam,
        destination: destinationNam,
        firstTrain: firstTrain,
        frequency: frequencyTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
})

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val().train);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    var tempTime = snapshot.val().firstTrain;
    var tFrequency = snapshot.val().frequency;

    console.log(tempTime);

    var firstTimeConverted = moment(tempTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);


    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var minutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));
    var arrivalTime = moment(nextArrival).format("HH:mm");
    console.log(arrivalTime);

    $("table").append("<tr><td>" +
        snapshot.val().train + "</td><td>" + snapshot.val().destination +
        "</td><td>" + snapshot.val().frequency + "</td><td>" + arrivalTime + "</td><td>" +
        minutesAway + "</td><td>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});



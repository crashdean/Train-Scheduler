
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqCS3v96_EwyzI_gHQEZEQFCObA4Jtl90",
    authDomain: "train-scheduler-ce7ab.firebaseapp.com",
    databaseURL: "https://train-scheduler-ce7ab.firebaseio.com",
    projectId: "train-scheduler-ce7ab",
    storageBucket: "",
    messagingSenderId: "17437625324"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
 
    $(".submit").on('click', function (event) {
      event.preventDefault()
      var trainNam = $("#inputTrain").val()
      var destinationNam = $("#inputDestination").val();
      var firstTrainNam = $('#inputTrainTime').val()
      var frequencyTime = $('#inputFrequency').val()

      console.log(trainNam)
      console.log(destinationNam)
      console.log(firstTrainNam)
      console.log(frequencyTime)

      database.ref().push({
        name: empName,
        role: empRole,
        startDate: empStartDate,
        monthlyRate: empMonthRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    })

    database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val().name);
      console.log(snapshot.val().role);
      console.log(snapshot.val().startDate);
      console.log(snapshot.val().monthlyRate);

    var tempDate = snapshot.val().startDate;
    var tempFormat = "MM/DD/YYYY";
    var convertedDate = moment(tempDate, tempFormat);

    console.log(moment().diff(convertedDate, "months"));
    var monthsWorked = moment().diff(convertedDate, "months");
    var totalBilled = monthsWorked * snapshot.val().monthlyRate;

    $("table").append("<tr><td>" +
      snapshot.val().name + "</td><td>" + snapshot.val().role + "</td><td>" + snapshot.val().startDate + "</td><td>" + monthsWorked + "</td><td>" + snapshot.val().monthlyRate + "</td><td>$" + totalBilled + "</td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

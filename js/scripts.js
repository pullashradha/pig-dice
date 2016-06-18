// Business End Logic
function Player (playerName) {
  this.totalScore = 0;
  this.turnScore = 0;
  this.diceBox = document.getElementById("dieBox");
  this.playerName = playerName;
}
Player.prototype.pName = function () {
  this.name1 = $("input#p1input-name").val();
  this.name2 = $("input#p2input-name").val();
}
Player.prototype.rollDice = function () {
  var diceOutput = Math.floor(Math.random() * 6) + 1;
  this.diceBox.innerHTML = diceOutput;
  if (diceOutput === 1) {
    alert("You lost this turn, switch players!");
    this.turnScore = 0;
    this.diceBox.innerHTML = 0;
  } else {
    this.turnScore += diceOutput;
  }
}
Player.prototype.hold = function () {
  this.totalScore += this.turnScore;
  this.turnScore = 0; //Fix bug, resets turnScore value at the end of each turn
  this.diceBox.innerHTML = 0;
}
Player.prototype.restart = function () {
  this.totalScore = 0;
  this.turnScore = 0;
  this.diceBox.innerHTML = 0;
}



//User Interface Logic
$(document).ready(function() {
  var newPlayer1 = new Player ();
  var newPlayer2 = new Player ();
  var newPlayerName = new Player ();
  $("#startgame-btn").click(function(event) {
    newPlayerName.pName();
    $("#p1-name").text(newPlayerName.name1);
    $("#p2-name").text(newPlayerName.name2);
    $("#intro-content").hide();
    $("#content").show();
  });
  $("#p1-roll").click(function(event) {
    newPlayer1.rollDice();
    $("#p1-turnscore").text(newPlayer1.turnScore);
  });
  $("#p1-hold").click(function(event) {
    newPlayer1.hold();
    newPlayerName.pName();
    $("#p1-score").text(newPlayer1.totalScore);
    $("#p1-turnscore").text(0);
    if (newPlayer1.totalScore >= 10) {
      $("#winner-name").text(newPlayerName.name1 + " Wins!");
      $("#win").fadeToggle();
      $("#content").fadeToggle();
    } else {
      alert("It's the next player's turn");
    }
  });
  $("#p2-roll").click(function(event) {
    newPlayer2.rollDice();
    $("#p2-turnscore").text(newPlayer2.turnScore);
  });
  $("#p2-hold").click(function(event) {
    newPlayer2.hold();
    newPlayerName.pName();
    $("#p2-score").text(newPlayer2.totalScore);
    $("#p2-turnscore").text(0);
    if (newPlayer2.totalScore >= 10) {
      $("#winner-name").text(newPlayerName.name2 + " Wins!");
      $("#win").fadeToggle();
      $("#content").fadeToggle();
    } else {
      alert("It's the next player's turn");
    }
  });
  $("#restart-btn").click(function(event) {
    var restartQuestion = confirm("Are you sure you want to RESTART the game? This will make both the players' scores = 0.");
    if (restartQuestion === true) {
      newPlayer1.restart();
      newPlayer2.restart();
      $("#p1-score").text(0);
      $("#p2-score").text(0);
      $("#p1-turnscore").text(0);
      $("#p2-turnscore").text(0);
    }
  });
  $("#reset-gamepage").click(function(event) {
    var resetQuestion = confirm("Are you sure you want to RESET the game? This will take you back to the rules page.")
    if (resetQuestion === true) {
      location.reload();  //location refers to current page which is the intro-content
    }
  });
  $("#reset-winpage").click(function(event) {
    location.reload();
  });
});

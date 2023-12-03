function setTrip(message, targetCell) {
  try {
    var replyText = message.reply_to_message.text;
    const idRegex = /ID:\s+(\d+)/;
    const match = replyText.match(idRegex);

    if (match) {
      const id = match[1];
      SUMMARY.getRange(targetCell).setValue(id);
    }
  } catch (error) {
    Logger.log(`Error in setTrip: ${error}`);
    SUMMARY.getRange(targetCell).setValue(SUMMARY.getRange('A78').getValue());
  }
}

function getTrip(range, tripText) {
  try {
    var tripData = SUMMARY.getRange(range).getValues()[0];
    if (tripData[1] > 0) {
      var message =
        '<b>🛵 Trip ' +
        tripText +
        ' Details</b>\n' +
        '\n<code>----------:TRIP INFO:---------</code>' +
        '\nDate: ' +
        formatDateTime(tripData[25]) +
        '\nID: ' +
        tripData[0] +
        '\n\n<code>----------:DISTANCE:----------</code>' +
        '\nDistance: ' +
        tripData[1].toFixed(1) +
        ' Km' +
        getRideModeData(tripData) +
        '\nBraking: ' +
        tripData[10].toFixed(1) +
        ' Km' +
        '\nCoasting: ' +
        tripData[14].toFixed(1) +
        ' Km' +
        '\n\n<code>-------:OTHER METRICS:--------</code>' +
        '\nDuration: ' +
        (tripData[2] * 24 * 60).toFixed(0) +
        ' mins' +
        '\nEfficiency: ' +
        tripData[3].toFixed(1) +
        ' Wh/km' +
        '\nFuel Savings: ₹' +
        tripData[24].toFixed(2) +
        '\nRange: ' +
        tripData[5].toFixed(1) +
        ' Km' +
        '\nTop Speed: ' +
        tripData[4].toFixed(1) +
        ' Km/h' +
        '\nAvg Speed: ' +
        tripData[6].toFixed(1) +
        ' Km/h' +
        '\nSOC: ' +
        (tripData[8] * 100).toFixed(2) +
        '%' +
        '\nSOC/Km: ' +
        (tripData[9] * 100).toFixed(2) +
        '%' +
        '\nHorn Count: ' +
        tripData[23].toFixed(0);
    }
  } catch (error) {
    Logger.log(`Error in getTrip: ${error}`);
    var message = "❌ There's nothing found for this trip.\nPlease set the trip first!";
  }
  sendToTelegram(ADMIN, message);
}

function setTripA(message) {
  setTrip(message, 'A75');
  sendToTelegram(ADMIN, '✅ Trip A is set');
}

function setTripB(message) {
  setTrip(message, 'A76');
  sendToTelegram(ADMIN, '✅ Trip B is set');
}

function setTripC(message) {
  setTrip(message, 'A77');
  sendToTelegram(ADMIN, '✅ Trip C is set');
}

function getTripA() {
  getTrip('A75:Z75', 'A');
}

function getTripB() {
  getTrip('A76:Z76', 'B');
}

function getTripC() {
  getTrip('A77:Z77', 'C');
}

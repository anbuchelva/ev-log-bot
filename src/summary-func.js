function dailySummary() {
  var dailyData = SUMMARY.getRange('B2:Y2').getValues()[0];
  if (dailyData[1] > 0) {
    var message =
      '<b>🕙 Daily Summary</b>\n' +
      '\n<code>----------:DISTANCE:----------</code>' +
      '\nDistance: ' +
      dailyData[0].toFixed(1) +
      ' Km' +
      getRideModeData(dailyData) +
      '\nBraking: ' +
      dailyData[9].toFixed(1) +
      ' Km' +
      '\nCoasting: ' +
      dailyData[13].toFixed(1) +
      ' Km' +
      '\n\n<code>-------:OTHER METRICS:--------</code>' +
      '\nDuration: ' +
      (dailyData[1] * 24 * 60).toFixed(0) +
      ' mins' +
      '\nEfficiency: ' +
      dailyData[2].toFixed(1) +
      ' Wh/km' +
      '\nFuel Savings: ₹' +
      dailyData[23].toFixed(2) +
      '\nRange: ' +
      dailyData[4].toFixed(1) +
      ' Km' +
      '\nTop Speed: ' +
      dailyData[3].toFixed(1) +
      ' Km/h' +
      '\nAvg Speed: ' +
      dailyData[5].toFixed(1) +
      ' Km/h' +
      '\nSOC: ' +
      (dailyData[7] * 100).toFixed(2) +
      '%' +
      '\nSOC/Km: ' +
      (dailyData[8] * 100).toFixed(2) +
      '%' +
      '\nHorn Count: ' +
      dailyData[22].toFixed(0);
  } else {
    var message = 'You and your vehicle took rest today!';
  }
  sendToTelegram(ADMIN, message);
}

function weeklySummary() {
  var weeklyData = SUMMARY.getRange('B34:Y34').getValues()[0];
  if (weeklyData[1] > 0) {
    var message =
      '<b>📅 Weekly Summary</b>\n' +
      '\n<code>----------:DISTANCE:----------</code>' +
      '\nDistance: ' +
      weeklyData[0].toFixed(1) +
      ' Km' +
      getRideModeData(weeklyData) +
      '\nBraking: ' +
      weeklyData[9].toFixed(1) +
      ' Km' +
      '\nCoasting: ' +
      weeklyData[13].toFixed(1) +
      ' Km' +
      '\n\n<code>-------:OTHER METRICS:--------</code>' +
      '\nDuration: ' +
      (weeklyData[1] * 24 * 60).toFixed(0) +
      ' mins' +
      '\nEfficiency: ' +
      weeklyData[2].toFixed(1) +
      ' Wh/km' +
      '\nFuel Savings: ₹' +
      weeklyData[23].toFixed(2) +
      '\nRange: ' +
      weeklyData[4].toFixed(1) +
      ' Km' +
      '\nTop Speed: ' +
      weeklyData[3].toFixed(1) +
      ' Km/h' +
      '\nAvg Speed: ' +
      weeklyData[5].toFixed(1) +
      ' Km/h' +
      '\nSOC: ' +
      (weeklyData[7] * 100).toFixed(2) +
      '%' +
      '\nSOC/Km: ' +
      (weeklyData[8] * 100).toFixed(2) +
      '%' +
      '\nHorn Count: ' +
      weeklyData[22].toFixed(0);
  } else {
    var message = 'Oh! How come you did not use your vehicle for a week?';
  }
  sendToTelegram(ADMIN, message);
}

function monthlySummary() {
  var monthlyData = SUMMARY.getRange('B49:Y60').getValues()[0];
  if (monthlyData[1] > 0) {
    var message =
      '<b>🗓️ Monthly Summary</b>\n' +
      '\n<code>----------:DISTANCE:----------</code>' +
      '\nDistance: ' +
      monthlyData[0].toFixed(1) +
      ' Km' +
      getRideModeData(monthlyData) +
      '\nBraking: ' +
      monthlyData[9].toFixed(1) +
      ' Km' +
      '\nCoasting: ' +
      monthlyData[13].toFixed(1) +
      ' Km' +
      '\n\n<code>-------:OTHER METRICS:--------</code>' +
      '\nDuration: ' +
      (monthlyData[1] * 24 * 60).toFixed(0) +
      ' mins' +
      '\nEfficiency: ' +
      monthlyData[2].toFixed(1) +
      ' Wh/km' +
      '\nFuel Savings: ₹' +
      monthlyData[23].toFixed(2) +
      '\nRange: ' +
      monthlyData[4].toFixed(1) +
      ' Km' +
      '\nTop Speed: ' +
      monthlyData[3].toFixed(1) +
      ' Km/h' +
      '\nAvg Speed: ' +
      monthlyData[5].toFixed(1) +
      ' Km/h' +
      '\nSOC: ' +
      (monthlyData[7] * 100).toFixed(2) +
      '%' +
      '\nSOC/Km: ' +
      (monthlyData[8] * 100).toFixed(2) +
      '%' +
      '\nHorn Count: ' +
      monthlyData[22].toFixed(0);
  } else {
    var message = 'Oh! How come you did not use your vehicle for a month?';
  }
  sendToTelegram(ADMIN, message);
}

function getRideModeData(data) {
  var rideData = '';
  if (data[17] > 0) {
    rideData = '\nEco: ' + data[17].toFixed(1) + ' Km';
  }
  if (data[18] > 0) {
    rideData += '\nSmart Eco: ' + data[18].toFixed(1) + ' Km';
  }
  if (data[19] > 0) {
    rideData += '\nRide: ' + data[19].toFixed(1) + ' Km';
  }
  if (data[20] > 0) {
    rideData += '\nSport: ' + data[20].toFixed(1) + ' Km';
  }
  if (data[21] > 0) {
    rideData += '\nWarp: ' + data[21].toFixed(1) + ' Km';
  }
  return rideData;
}

function costSavingsSummary() {
  var savingsData = SUMMARY.getRange('Y1:Y73').getValues();
  var message =
    '<b>⛽ Fuel Savings 💰</b>\n' +
    '\nLast 30 Days: ₹' +
    savingsData[31][0].toFixed(0) +
    '\nLast 13 Weeks: ₹' +
    savingsData[46][0].toFixed(0) +
    '\nLast 12 Months: ₹' +
    savingsData[60][0].toFixed(0) +
    '\nOverall Savings: ₹' +
    savingsData[72][0].toFixed(0) +
    '\n<code>----------------------------</code>' +
    "\nToday's Savings: ₹" +
    savingsData[1][0].toFixed(0) +
    "\nYesterday's Savings: ₹" +
    savingsData[2][0].toFixed(0) +
    '\n<code>----------------------------</code>' +
    "\nThis week's Savings: ₹" +
    savingsData[33][0].toFixed(0) +
    "\nLast week's Savings: ₹" +
    savingsData[34][0].toFixed(0) +
    '\n<code>----------------------------</code>' +
    "\nThis Month's Savings: ₹" +
    savingsData[48][0].toFixed(0) +
    "\nLast Month's Savings: ₹" +
    savingsData[49][0].toFixed(0) +
    '\n<code>----------------------------</code>' +
    "\nThis Year's Savings: ₹" +
    savingsData[62][0].toFixed(0) +
    "\nLast Year's Savings: ₹" +
    savingsData[63][0].toFixed(0);
  sendToTelegram(ADMIN, message);
}

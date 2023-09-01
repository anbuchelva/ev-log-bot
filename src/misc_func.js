// const time_now = new Date().toLocaleString().slice(0, 18);
const time_now = new Date();

// Write data into Google Sheets
function appendData(targetSheet, value) {
  targetSheet.appendRow(value);
}

// Log messages in sheet
function logMessage(request) {
  if ((LOG = true)) {
    appendData(REQUESTS, [time_now, JSON.stringify(request, null, 4)]);
  }
}

// Identify if there is any duplicate entry.
function findDuplicates(activeRow, chatId) {
  var dateTime = DATA.getRange(activeRow, 2).getValue().toString();
  if (activeRow > 250) {
    dateRange = DATA.getRange(activeRow - 250, 2, 250, 1).getValues();
    idRange = DATA.getRange(activeRow - 250, 18, 250, 1).getValues();
  } else if (activeRow > 2) {
    dateRange = DATA.getRange(2, 2, activeRow - 2, 1).getValues();
    idRange = DATA.getRange(2, 18, activeRow - 2, 1).getValues();
  } else {
    return false;
  }
  var dates = dateRange.flat();
  var ids = idRange.flat();
  for (var i = dates.length - 1; i >= 0; i--) {
    // Logger.log(dates[i].toString() + "|" + dateTime + "|" + ids[i] + "|" + telegramId )
    if (dates[i].toString() === dateTime && ids[i] == chatId) {
      Logger.log('is duplicate? ' + true);
      return true;
    }
  }
}

function getMessageId(responseText) {
  jsonResponse = JSON.parse(responseText);
  var messageID = jsonResponse.result.message_id;
  return messageID;
}

function chartToImage(chart) {
  // var imageBlob = chart.getBlob(); this line doesn't work for some reason.
  const slides = SlidesApp.openById(SLIDE_ID);
  slides.getSlides()[0].remove();
  const newSlide = slides.appendSlide();
  const imageBlob = newSlide.insertSheetsChartAsImage(chart).getAs('image/jpeg');
  return imageBlob;
}

function updateActiveUser(chatId) {
  var lockStatusCell = OPTIONS.getRange('B4');
  var lockStatus = lockStatusCell.getValue();
  if (!lockStatus) {
    OPTIONS.getRange('B3:B4').setValues([[chatId], [true]]);
  } else {
    while (lockStatus) {
      Utilities.sleep(1000);
      lockStatus = lockStatusCell.getValue();
    }
    OPTIONS.getRange('B3:B4').setValues([[chatId], [true]]);
    // sendToTelegram(chatId,'the status is true')
  }
}

function updateLockToFalse() {
  OPTIONS.getRange('B4').setValue(false);
}

function sendDistanceRange(chatId) {
  updateActiveUser(chatId);
  var chart = DISTANCE_RANGE.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Daily');
  updateLockToFalse();
}

function sendDistanceRangeMon(chatId) {
  updateActiveUser(chatId);
  var chart = DISTANCE_RANGE_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Monthly');
  updateLockToFalse();
}

function sendDistanceEfficiency(chatId) {
  updateActiveUser(chatId);
  var chart = DISTANCE_EFFICIENCY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Daily');
  updateLockToFalse();
}

function sendDistanceEfficiencyMon(chatId) {
  updateActiveUser(chatId);
  var chart = DISTANCE_EFFICIENCY_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Monthly');
  updateLockToFalse();
}

function sendDistanceBatteryKm(chatId) {
  updateActiveUser(chatId);
  var chart = DISTANCE_BATTERY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Daily');
  updateLockToFalse();
}

function sendDistanceBatteryKmMon(chatId) {
  updateActiveUser(chatId);
  var chart = DISTANCE_BATTERY_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Monthly');
  updateLockToFalse();
}

function sendBatteryUsagePerDay(chatId) {
  updateActiveUser(chatId);
  var chart = BATTERY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Day');
  updateLockToFalse();
}

function sendBatteryUsagePerMon(chatId) {
  updateActiveUser(chatId);
  var chart = BATTERY_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Month');
  updateLockToFalse();
}

function sendTopAverageSpeedDay(chatId) {
  updateActiveUser(chatId);
  var chart = TOP_AVG_SPEED.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Daily');
  updateLockToFalse();
}

function sendTopAverageSpeedMon(chatId) {
  updateActiveUser(chatId);
  var chart = TOP_AVG_SPEED_MON.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Monthly');
  updateLockToFalse();
}

function deleteEntry(chatId, messageId) {
  var lastRow = DATA.getLastRow();
  if (lastRow > 50) {
    var firstRow = lastRow - 49;
    values = DATA.getRange(firstRow, 17, 50, 1).getValues();
  } else if (lastRow > 2) {
    var firstRow = 2;
    values = DATA.getRange(2, 17, lastRow - 1, 1).getValues();
  } else {
    return false;
  }
  for (var i = values.length - 1; i >= 0; i--) {
    if (values[i][0] === messageId) {
      revertChanges(i + firstRow, DATA.getRange(i + firstRow, 1).getValue());
      return sendToTelegram(chatId, '✅ The selected entry has been deleted', null, messageId);
    } else {
      return sendToTelegram(chatId, '❌ Unable to find this entry in the database.', null, messageId);
    }
  }
}

function sendApproval(firstName, chatId, username){
  var approveRequests = {
    inline_keyboard: [
      [
        { text: '✅', callback_data: 'registration_approve_' + chatId },
        { text: '🟠', callback_data: 'registration_waitlist_' + chatId },
        { text: '❌', callback_data: 'registration_deny_' + chatId },
      ],
    ],
    resize_keyboard: true,
  };
    sendToTelegram(ADMIN_ID, 'An user has requested access to the bot.\nUser Name: @' + username + '\nFirst Name: ' + firstName + '\nID :' + chatId, approveRequests)
}
// function editMessage(chatId, initialMessage, updatedMessage) {
//   var response = sendToTelegram(chatId, initialMessage);
//   var jsonResponse = JSON.parse(response.getContentText());
//   var messageID = jsonResponse.result.message_id;

//   // Wait for a while to simulate processing
//   Utilities.sleep(5000); // Simulate 5 seconds of processing time

//   // Update the initial message with the new content
//   sendToTelegram(chatId, updatedMessage, null, messageID);
// }

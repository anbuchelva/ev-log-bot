// const time_now = new Date().toLocaleString().slice(0, 18);
const time_now = new Date();

// Write data into Google Sheets
function appendData(targetSheet, value) {
  targetSheet.appendRow(value);
}

// Log messages in sheet
function logMessage(request) {
  if (LOG === 'true') {
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
    return true;
  } else {
    // while (lockStatus) {
    //   Utilities.sleep(1000);
    //   lockStatus = lockStatusCell.getValue();
    // }
    // OPTIONS.getRange('B3:B4').setValues([[chatId], [false]]);
    sendToTelegram(chatId, 'Someone else is running a query now and the app is currently busy. Please try after some time!');
    return false;
  }
}

function updateLockToFalse() {
  OPTIONS.getRange('B4').setValue(false);
}

function sendDistanceRange(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_RANGE.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Daily');
    updateLockToFalse();
  }
}

function sendDistanceEfficiency(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_EFFICIENCY.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Daily');
    updateLockToFalse();
  }
}

function sendDistanceBatteryKm(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_BATTERY.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Daily');
    updateLockToFalse();
  }
}

function sendBatteryUsagePerDay(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = BATTERY.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Day');
    updateLockToFalse();
  }
}

function sendTopAverageSpeedDay(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = TOP_AVG_SPEED.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Daily');
    updateLockToFalse();
  }
}

function sendDistanceRangeMon(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_RANGE_MONTH.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Monthly');
    updateLockToFalse();
  }
}

function sendDistanceEfficiencyMon(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_EFFICIENCY_MONTH.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Monthly');
    updateLockToFalse();
  }
}

function sendDistanceBatteryKmMon(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_BATTERY_MONTH.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Monthly');
    updateLockToFalse();
  }
}

function sendBatteryUsagePerMon(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = BATTERY_MONTH.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Month');
    updateLockToFalse();
  }
}

function sendTopAverageSpeedMon(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = TOP_AVG_SPEED_MONTH.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Monthly');
    updateLockToFalse();
  }
}

function sendDistanceRangeWk(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_RANGE_WK.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Weekly');
    updateLockToFalse();
  }
}

function sendDistanceEfficiencyWk(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_EFFICIENCY_WK.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Weekly');
    updateLockToFalse();
  }
}

function sendDistanceBatteryKmWk(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = DISTANCE_BATTERY_WK.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Weekly');
    updateLockToFalse();
  }
}

function sendBatteryUsagePerWk(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = BATTERY_WK.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Week');
    updateLockToFalse();
  }
}

function sendTopAverageSpeedWk(chatId) {
  if (updateActiveUser(chatId)) {
    var chart = TOP_AVG_SPEED_WK.getCharts()[0];
    var imageBlob = chartToImage(chart);
    sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Weekly');
    updateLockToFalse();
  }
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

function editEntry(chatId, messageId, callbackText) {
  resultArray = parseRideLogMsg(callbackText);
  var logData = JSON.stringify(resultArray);
  var parametersEdit = {
    keyboard: [
      [
        {
          text: '✏️ Edit',
          web_app: { url: 'https://anbuchelva.in/ev-log-bot/edit?data=' + encodeURIComponent(logData) + '&cid=' + chatId + '&mid=' + messageId },
        },
        { text: '✖️ Cancel Edit' },
      ],
    ],
    is_persistent: false,
    resize_keyboard: true,
    one_time_keyboard: true,
  };
  sendToTelegram(chatId, '⬇️ Click the edit button to edit the stats.', parametersEdit, messageId);
}

function sendApproval(firstName, chatId, username) {
  USERS.appendRow([new Date(), chatId, 'Registered']);
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
  sendToTelegram(
    ADMIN_ID,
    'An user has requested access to the bot.\nUser Name: @' + username + '\nFirst Name: ' + firstName + '\nID :' + chatId,
    approveRequests
  );
}

function updateUserApproval(chatId, newStatus) {
  var allUsers = USERS.getDataRange().getValues();
  var userNotRegistered = true;
  for (var i = 1; i < allUsers.length; i++) {
    if (allUsers[i][1] == chatId) {
      userNotRegistered = false;
      data = [[new Date(), chatId, newStatus]];
      USERS.getRange(i + 1, 1, 1, 3).setValues(data);
      USERS.getRange(2, 1, allUsers.length - 1, 3).sort({ column: 1, ascending: true });
    }
  }
  if (userNotRegistered) {
    sendToTelegram(ADMIN_ID, chatId + ' has not registered yet.');
  }
}

function downloadData(chatId) {
  var allData = DATA.getDataRange().getValues();
  var userData = [allData[0]]; // Copy the header row
  var timestamp = new Date().toLocaleString().replace(/[:.]/g, ':');
  for (var i = 1; i < allData.length; i++) {
    if (allData[i][17] === Number(chatId)) {
      userData.push(allData[i]);
    }
  }
  if (userData.length > 1) {
    userDataFileID = saveCSVToFile(userData, chatId, timestamp);
    var file = DriveApp.getFileById(userDataFileID);
    var fileBlob = file.getBlob();
    sendDocToTelegram(chatId, fileBlob, '✅ Data Extracted at\n' + timestamp);
    Drive.Files.remove(userDataFileID);
  } else {
    sendToTelegram(chatId, "❌ There's no data found for your Telegram ID.");
  }
}

function convertToCSV(data) {
  var csv = '';
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    for (var j = 0; j < row.length; j++) {
      if (j > 0) {
        csv += ',';
      }
      var cellValue = String(row[j]).replace(/"/g, '""');
      csv += '"' + cellValue + '"';
    }
    csv += '\n';
  }
  return csv;
}

function saveCSVToFile(data, chatId) {
  var csv = convertToCSV(data);
  var folder = DriveApp.getFolderById(DRIVE_ID_USER_DATA);
  var file = folder.createFile(chatId + ' ' + getDateVal(new Date()) + '.csv', csv, MimeType.CSV);
  return file.getId();
}

function deleteData(chatId) {
  var allData = DATA.getDataRange().getValues();
  var rowsToDelete = [];

  for (var i = allData.length - 1; i >= 0; i--) {
    if (allData[i][17] === Number(chatId)) {
      rowsToDelete.push(i + 1);
    }
  }
  if (rowsToDelete.length > 0) {
    rowsToDelete.sort(function (a, b) {
      return b - a;
    });
    for (var i = 0; i < rowsToDelete.length; i++) {
      DATA.deleteRow(rowsToDelete[i]);
    }
    deleteImages(chatId);
    sendToTelegram(chatId, '✅ ' + rowsToDelete.length + ' row(s) were deleted.\nDo you want to unregister from the bot?', deRegister);
  } else {
    sendToTelegram(
      chatId,
      '🟠 ' + 'There are no rows found matching with your Telegram ID ' + chatId + '\nDo you want to unregister from the bot?',
      deRegister
    );
  }
}

function deleteImages(chatId) {
  var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getName().startsWith(chatId)) {
      file.setTrashed(true);
      Logger.log('Deleted file: ' + file.getName());
    }
  }
}

function parseRideLogMsg(text) {
  const rideLog = {};

  // Extract the date and time
  const dateTimeRegex = /📆 (.+?)\n/;
  const dateTimeMatch = text.match(dateTimeRegex);
  const dateTime = dateTimeMatch ? dateTimeMatch[1] : null;

  // Extract other values using regular expressions
  const distanceRegex = /Distance: ([\d.]+) km/;
  const durationRegex = /Duration: (\d+) mins/;
  const efficiencyRegex = /Efficiency: ([\d.]+) Wh\/km/;
  const topSpeedRegex = /Top Speed: ([\d.]+) km\/h/;
  const avgSpeedRegex = /Avg Speed: ([\d.]+) km\/h/;
  const projRangeRegex = /Proj Range: ([\d.]+) km/;

  const distanceMatch = text.match(distanceRegex);
  const durationMatch = text.match(durationRegex);
  const efficiencyMatch = text.match(efficiencyRegex);
  const topSpeedMatch = text.match(topSpeedRegex);
  const avgSpeedMatch = text.match(avgSpeedRegex);
  const projRangeMatch = text.match(projRangeRegex);

  rideLog['dt'] = dateTime;
  rideLog['di'] = distanceMatch ? parseFloat(distanceMatch[1]) : null;
  rideLog['du'] = durationMatch ? parseInt(durationMatch[1]) : null;
  rideLog['ef'] = efficiencyMatch ? parseFloat(efficiencyMatch[1]) : null;
  rideLog['ts'] = topSpeedMatch ? parseFloat(topSpeedMatch[1]) : null;
  rideLog['as'] = avgSpeedMatch ? parseFloat(avgSpeedMatch[1]) : null;
  rideLog['pr'] = projRangeMatch ? parseFloat(projRangeMatch[1]) : null;

  return rideLog;
}

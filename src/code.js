// doPost is for Post requests
function doPost(request) {
  var runtimeCountStart = new Date();
  try {
    var requestBody = JSON.parse(request.postData.contents);
    var { message, callback_query } = requestBody;
    var chatId, messageId, text, photo, webAppData, callbackType, delTransactionId;
    logMessage(requestBody);
    if (message !== undefined) {
      // Check if the message contains text or photo
      if (message.text !== undefined) {
        var {
          from: { id: userId, username: username },
          chat: { id: chatId, first_name: firstName },
          text,
          message_id: messageId,
          web_app_data: webAppData,
        } = message;
      } else if (message.photo !== undefined) {
        var {
          from: { id: userId, username: username },
          chat: { id: chatId, first_name: firstName },
          photo,
          message_id: messageId,
        } = message;
      }
    } else if (callback_query !== undefined) {
      var {
        from: { id: chatId },
        message: { message_id: messageId },
        data,
      } = callback_query;
    }

    if (ALLOWED_USER_IDS.includes(chatId)) {
      if (photo !== undefined) {
        processPhoto(message, chatId, messageId);
      } else if (text !== undefined) {
        processText(message, chatId);
      } else if (callback_query !== undefined) {
        processCallback(data, chatId, messageId);
      }
    } else {
      if (message.text === '/register') {
        sendToTelegram(
          chatId,
          'A message has been sent to the bot admin on your registration request. \n\nPlease wait till the request is actioned. You will get a notification on the approval or waiting list or denial of the request. ETA 24 hours. \n\nDo not clear the history or block the bot till the time.'
        );
      } else {
        // Logger.log(`${username} (${userId}) was trying to access the bot. Access denied.`);
        logMessage(username + ' ' + userId + ' Denied access');
        sendToTelegram(
          chatId,
          `Hey ${firstName}! Thank you for the interest in using this bot.\n\nYou must join @ather_india group and use the /register option to get access to the bot.\n\n` +
            'Also read the <a href="https://telegra.ph/Terms-and-Conditions-09-01">terms and conditions</a> before doing it.'
        );
      }
    }
  } catch (error) {
    sendToTelegram(ADMIN_ID, `Error in doPost(): ${error.message}`);
  }
  runtimeCountStop(runtimeCountStart);
}

// Function to process callbacks
function processCallback(data, chatId, messageId) {
  if (data == 'distance_vs_range') {
    sendDistanceRange(chatId);
  } else if (data === 'distance_vs_efficiency') {
    sendDistanceEfficiency(chatId);
  } else if (data === 'distance_vs_battery_km') {
    sendDistanceBatteryKm(chatId);
  } else if (data === 'battery_per_day') {
    sendBatteryUsagePerDay(chatId);
  } else if (data === 'distance_vs_range_mon') {
    sendDistanceRangeMon(chatId);
  } else if (data === 'distance_vs_efficiency_mon') {
    sendDistanceEfficiencyMon(chatId);
  } else if (data === 'distance_vs_battery_km_mon') {
    sendDistanceBatteryKmMon(chatId);
  } else if (data === 'battery_per_mon') {
    sendBatteryUsagePerMon(chatId);
  } else if (data === 'top_vs_avg_speed') {
    sendTopAverageSpeedDay(chatId);
  } else if (data === 'top_vs_avg_speed_mon') {
    sendTopAverageSpeedMon(chatId);
  } else if (data == 'delete_entry') {
    deleteEntry(chatId, messageId);
  }
}

// Function to process text messages
function processText(message, chatId) {
  if (message.text === '/start') {
    sendToTelegram(
      chatId,
      '🙏 <b>Welcome to EV Log Bot</b> 🙏\n\nYou need agree to the <a href="https://telegra.ph/Terms-and-Conditions-09-01">terms and conditions</a> in order to use this bot. \n\nYou can just delete and block the bot, if you don\'t agree to the conditions.\n\nYou need to be part of @ather_india group to start using the bot.\n'
    );
  } else if (message.text === '/register') {
    sendToTelegram(chatId, 'You are a registered member. Try using other commands.');
  } else if (message.text === '/download_data') {
    sendToTelegram(chatId, 'Your request has been submitted. Please wait for a response, until then do not block the bot.');
  } else if (message.text === '/delete_data') {
    sendToTelegram(chatId, 'This will delete the data for telegram user id ' + chatId + '.  Are you sure?', deleteData);
  } else if (message.text === '/daily_charts') {
    sendToTelegram(chatId, '👇 Pick a chart for daily ride stats 📅', chartsDailyKeyboard);
  } else if (message.text === '/monthly_charts') {
    sendToTelegram(chatId, '👇 Pick a chart for monthly ride stats 🗓️', chartsMonthlyKeyboard);
  } else if (message.text === '/help') {
    sendToTelegram(chatId, 'Get help from <a href="https://t.me/ather_india/113">Ather India Group</a>');
  } else {
    sendToTelegram(chatId, '❌ Unknown command.\n\n✅ Get support from <a href="https://t.me/ather_india/113">Ather India Group</a>');
  }
}

// Function to process a photo
function processPhoto(message, chatId, messageId) {
  var fileId = message.photo[message.photo.length - 1].file_id;
  var timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  var filename = `${chatId}_${timestamp}.jpg`;
  var response = UrlFetchApp.fetch(TELEGRAM_URL + 'getFile?file_id=' + fileId);
  var urlphoto = TELEGRAM_FILE_URL + JSON.parse(response.getContentText()).result.file_path;
  var resa = UrlFetchApp.fetch(urlphoto);
  var imageBlob = resa.getBlob();
  var driveFile = DriveApp.getFolderById(DRIVE_FOLDER_ID).createFile(imageBlob.setName(filename));
  var driveFileId = driveFile.getId();
  if (driveFileId) {
    var imageProcessMsg = sendToTelegram(chatId, 'Image is being processed. \n\nPlease wait...', null, messageId);
    var imageProcessMsgId = getMessageId(imageProcessMsg);
    var lastRow = DATA.getLastRow() + 1;

    // set hyperlink of the image.
    var url = 'https://drive.google.com/file/d/' + driveFileId + '/view';
    var richTextValue = SpreadsheetApp.newRichTextValue().setText(driveFileId).setLinkUrl(url).build();
    DATA.getRange(lastRow, 1).setRichTextValue(richTextValue);

    var result = OCRImage(lastRow);
    if (result) {
      if (findDuplicates(lastRow, chatId)) {
        replaceMessage(chatId, imageProcessMsgId, messageId, '😮 uh oh! It looks like a duplicate entry!');
        revertChanges(lastRow, driveFileId);
      } else {
        var formattedDateTime = formatDateTime(result[0][0]);
        var formattedDrain = formatPercentage(result[0][6]);

        var messageBody =
          '🛵 Ride log is updated for this trip\n' +
          '\n📆 ' +
          formattedDateTime +
          '\nDistance: ' +
          result[0][1] +
          ' km' +
          '\nDuration: ' +
          result[0][2] +
          ' mins' +
          '\nEfficiency: ' +
          result[0][3] +
          ' Wh/km' +
          '\nTop Speed: ' +
          result[0][4] +
          ' km/h' +
          '\nAvg Speed: ' +
          result[0][7] +
          ' km/h' +
          '\nProj Range: ' +
          result[0][5] +
          ' km' +
          '\nBattery Usage: ' +
          formattedDrain;
        // var response = sendToTelegram(chatId, messageBody);
        var response = replaceMessage(chatId, imageProcessMsgId, messageId, messageBody, editEntry);
        var jsonResponse = JSON.parse(response.getContentText());
        var messageID = jsonResponse.result.message_id;
        DATA.getRange(lastRow, 17, 1, 3).setValues([[messageID, chatId, time_now]]);
      }
    } else {
      replaceMessage(chatId, imageProcessMsgId, messageId, "❌ This image doens't have the required content!");
      revertChanges(lastRow, driveFileId);
    }
  } else {
    sendToTelegram(chatId, '❌ Error processing image.');
  }
}

function formatDateTime(dateTimeStr) {
  var date = new Date(dateTimeStr);
  var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleString('en-US', options);
}

function formatPercentage(percentage) {
  var formatted = (percentage * 100).toFixed(2);
  return formatted + '%';
}

function revertChanges(row, driveFileId) {
  DATA.deleteRow(row);
  DriveApp.getFileById(driveFileId).setTrashed(true);
}

function doGet(e) {
  const message = 'Hello World! This feature is not live yet!';
  return ContentService.createTextOutput(message);
}

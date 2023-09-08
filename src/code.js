// doPost is for Post requests
function doPost(request) {
  var runtimeCountStart = new Date();
  try {
    var requestBody = JSON.parse(request.postData.contents);
    Logger.log(requestBody);
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
      } else if (message.web_app_data !== undefined) {
        var {
          from: { id: userId, username: username },
          chat: { id: chatId, first_name: firstName },
          web_app_data: webAppData,
        } = message;
      }
    } else if (callback_query !== undefined) {
      var {
        from: { id: chatId },
        message: { message_id: messageId, text: callbackText },
        data,
      } = callback_query;
    }

    if (chatId == Number(TELEGRAM_GROUP_ID)) {
      Logger.log(message);
    } else if (ALLOWED_USER_IDS.includes(chatId)) {
      if (checkUserInGroup(chatId)) {
        if (photo !== undefined) {
          processPhoto(message, chatId, messageId);
        } else if (text !== undefined) {
          processText(message, chatId, messageId);
        } else if (webAppData !== undefined) {
          logMessage(webAppData);
          processWebAppData(chatId, webAppData);
        } else if (callback_query !== undefined) {
          processCallback(data, chatId, messageId, callbackText);
        }
      } else {
        sendToTelegram(chatId, '❌ You must be part of the @ather_india group to use this bot.');
      }
    } else {
      if (message.text === '/register') {
        sendToTelegram(
          chatId,
          'A message has been sent to the bot admin on your registration request. \n\nPlease wait till the request is actioned. You will get a notification on the approval or waiting list or denial of the request. ETA 24 hours. \n\nDo not clear the history or block the bot till the time.'
        );
        Utilities.sleep(1000);
        sendApproval(firstName, chatId, username);
      } else {
        // Logger.log(`${username} (${userId}) was trying to access the bot. Access denied.`);
        logMessage(username + ' ' + userId + ' Denied access');
        sendToTelegram(
          chatId,
          `Hey ${firstName}! Thank you for the interest in using this bot.` +
            '\n\n<b>You must follow these steps to use the bot.</b>' +
            '\n1. Read the <a href="https://telegra.ph/Terms-and-Conditions-09-01">terms and conditions</a>.' +
            '\n2. Send /register command to register yourself, if you agree to the Terms and Conditions.' +
            '\n3. Join @ather_india group.' +
            '\n4. Wait for the registration request to be actioned.' +
            '\n\nYour numeric Telegram ID is ' +
            chatId +
            '. The telegram ID is for reference, if you are going to contact the bot admin.\n' +
            '\n<code>-------------------------------</code>'
        );
      }
    }
  } catch (error) {
    sendToTelegram(ADMIN_ID, `Error in doPost(): ${error.message}`);
  }
  runtimeCountStopPerRequst(runtimeCountStart);
  runtimeCountStop(runtimeCountStart);
}

// Function to process callbacks
function processCallback(data, chatId, messageId, callbackText) {
  if (data === 'distance_vs_range') {
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
  } else if (data === 'delete_entry') {
    deleteEntry(chatId, messageId);
  } else if (data === 'edit_entry') {
    editEntry(chatId, messageId, callbackText);
  } else if (data.split('_')[0] === 'registration') {
    var regApproval = data.split('_')[1];
    var regUser = data.split('_')[2];
    if (regApproval === 'approve') {
      approveUser(regUser);
    } else if (regApproval === 'deny') {
      denyUser(regUser);
    } else if (regApproval === 'waitlist') {
      addUserToWaitList(regUser);
    }
  } else if (data === 'download_all') {
    downloadData(chatId);
  } else if (data === 'delete_all') {
    sendToTelegram(chatId, 'This will delete all the data stored against your telegram id ' + chatId + '.\n\nDo you want to continue?', deleteDataKeyboard);
  } else if (data === 'delete_yes') {
    deleteData(chatId);
  } else if (data === 'deregister_yes') {
    removeUser(chatId);
  } else if (data === 'deregister_no' || data == 'delete_none') {
    sendToTelegram(chatId, '✅ No changes were done.');
  }
}

// Function to process text messages
function processText(message, chatId, messageId) {
  if (message.text === '/start') {
    sendToTelegram(
      chatId,
      '🙏 <b>Welcome to EV Log Bot</b> 🙏\n\nYou need agree to the <a href="https://telegra.ph/Terms-and-Conditions-09-01">terms and conditions</a> in order to use this bot. \n\nYou can just delete and block the bot, if you don\'t agree to the conditions.\n\nYou need to be part of @ather_india group to start using the bot.\n'
    );
  } else if (message.text === '/register') {
    sendToTelegram(chatId, 'You are a registered member. Try using other commands.');
  } else if (message.text === '/manage_data') {
    sendToTelegram(chatId, 'You can download and delete your data from this app. Choose an option', manageData);
    // } else if (message.text === '/delete_data') {
    //   sendToTelegram(chatId, 'This will delete all the data stored against your telegram id ' + chatId + '.\n\nDo you want to continue?', deleteDataKeyboard);
  } else if (message.text === '/daily_charts') {
    sendToTelegram(chatId, '👇 Pick a chart for daily ride stats 📅', chartsDailyKeyboard);
  } else if (message.text === '/monthly_charts') {
    sendToTelegram(chatId, '👇 Pick a chart for monthly ride stats 🗓️', chartsMonthlyKeyboard);
  } else if (message.text === '✖️ Cancel Edit') {
    sendToTelegram(chatId, 'Edit Cancelled', null, messageId);
    // } else if (message.text === '/help') {
    //   sendToTelegram(chatId, 'Get help from <a href="https://t.me/ather_india/113">Ather India Group</a>');
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
        var formattedDrain = formatPercentage(result[0][7]);

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
          result[0][6] +
          ' km/h' +
          '\nProj Range: ' +
          result[0][5] +
          ' km' +
          '\nBattery Usage: ' +
          formattedDrain;
        // var response = sendToTelegram(chatId, messageBody);
        var response = replaceMessage(chatId, imageProcessMsgId, messageId, messageBody, editEntryKeyboard);
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

function processWebAppData(chatId, webAppData) {
  if (webAppData) {
    var data = JSON.parse(webAppData.data);
    var dateTime = new Date(data['date_time']);
    var distance = Number(data['distance']);
    var duration = Number(data['duration']);
    var efficiency = Number(data['efficiency']);
    var top_speed = Number(data['top_speed']);
    var range = Number(data['range']);
    var avg_speed = Number(data['avg_speed']);
    var source = data['source'];
    var destination = data['destination'];
    var messageId = Number(data['message_id']);
    var chat_id = Number(data['chat_id']);
    var locationData = '';

    if (chat_id == chatId) {
      var revisedData = [[dateTime, distance, duration, efficiency, top_speed, range, avg_speed]];
      TEMP.getRange('G4:M4').setValues(revisedData);
      if (source && destination) {
        locationData = [[source, destination]];
        TEMP.getRange('T4:U4').setValues(locationData);
      }
      var revisedDataAll = TEMP.getRange('G4:U4').getValues();
      var lastRow = DATA.getLastRow();
      values = DATA.getRange(2, 17, lastRow - 1, 1).getValues();
      for (var i = values.length - 1; i >= 0; i--) {
        if (values[i][0] === messageId) {
          DATA.getRange(i, 2, 1, 15).setValues(revisedDataAll);
          var formattedDateTime = formatDateTime(dateTime);
          var formattedDrain = formatPercentage((distance / range) * 60);
          var messageBody =
            '✏️ Your edits are live\n' +
            '\n📆 ' +
            formattedDateTime +
            '\nDistance: ' +
            distance +
            ' km' +
            '\nDuration: ' +
            duration +
            ' mins' +
            '\nEfficiency: ' +
            efficiency +
            ' Wh/km' +
            '\nTop Speed: ' +
            top_speed +
            ' km/h' +
            '\nAvg Speed: ' +
            avg_speed +
            ' km/h' +
            '\nProj Range: ' +
            range +
            ' km' +
            '\nBattery Usage: ' +
            formattedDrain;
          if (locationData) {
            messageBody = messageBody + '\nSource: ' + source + '\nDestination: ' + destination;
          }
          sendToTelegram(chatId, messageBody, null, messageId);
        }
      }
    }
  } else {
    sendToTelegram(chatId, 'Unable to process the edits!');
  }
}

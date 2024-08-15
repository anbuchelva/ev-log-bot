// doPost is for Post requests
function doPost(request) {
  // getIPAddress()
  try {
    var requestBody = JSON.parse(request.postData.contents);
    Logger.log(requestBody);
    var { message, callback_query } = requestBody;
    var chatId, messageId, text, callbackType;
    if (message !== undefined) {
      // Check if the message contains text or photo
      if (message.text !== undefined) {
        var {
          from: { id: userId, username: username },
          chat: { id: chatId, first_name: firstName },
          text,
          message_id: messageId,
        } = message;
      }
    } else if (callback_query !== undefined) {
      var {
        from: { id: chatId },
        message: { message_id: messageId, text: callbackText },
        data,
      } = callback_query;
    }
    if (ADMIN.includes(chatId)) {
      if (text !== undefined) {
        processText(message, chatId);
      } else if (callback_query !== undefined) {
        processCallback(data, chatId, messageId, callbackText);
      }
    } else {
      sendToTelegram(
        chatId,
        `Hey ${firstName}! This bot is only for personal use. You may checkout @ather_india if you wish to setup for your own.`
      );
    }
  } catch (error) {
    sendToTelegram(ADMIN, `Error in doPost(): ${error.message}`);
  }
}

function doGet(request) {
  if (request.parameter.id) {
    var id = request.parameter.id;
    return fetchMapsData(id);
  } else {
    return HtmlService.createHtmlOutput('Invalid request. No valid parameters provided.');
  }
}

// Function to process callbacks
function processCallback(data, chatId, messageId, callbackText) {
  if (data === 'distance_vs_range') {
    sendDistanceRange(chatId);
  } else if (data === 'distance_vs_efficiency') {
    sendDistanceEfficiency(chatId);
  } else if (data === 'mileage_day') {
    sendDistanceBatteryKm(chatId);
  } else if (data === 'battery_per_day') {
    sendBatteryUsagePerDay(chatId);
  } else if (data === 'battery_drain_day') {
    sendBatteryDrainPerDay(chatId);
  } else if (data === 'top_vs_avg_speed') {
    sendTopAverageSpeedDay(chatId);
  } else if (data === 'savings') {
    sendSavings(chatId);
    costSavingsSummary();
  } else if (data === 'ride_pattern') {
    sendRidePattern(chatId);
  } else if (data === 'driving_mode') {
    sendDrivingMode(chatId);
  } else if (data === 'horn_count') {
    sendHornCount(chatId);
  } else if (data === 'daily_summary') {
    sendSummary(chatId);
  } else if (data === 'distance_vs_range_mon') {
    sendDistanceRangeMon(chatId);
  } else if (data === 'distance_vs_efficiency_mon') {
    sendDistanceEfficiencyMon(chatId);
  } else if (data === 'mileage_mon') {
    sendDistanceBatteryKmMon(chatId);
  } else if (data === 'battery_per_mon') {
    sendBatteryUsagePerMon(chatId);
  } else if (data === 'battery_drain_mon') {
    sendBatteryDrainPerMon(chatId);
  } else if (data === 'top_vs_avg_speed_mon') {
    sendTopAverageSpeedMon(chatId);
  } else if (data === 'savings_mon') {
    sendSavingsMon(chatId);
    costSavingsSummary();
  } else if (data === 'ride_pattern_mon') {
    sendRidePatternMon(chatId);
  } else if (data === 'driving_mode_mon') {
    sendDrivingModeMon(chatId);
  } else if (data === 'horn_count_mon') {
    sendHornCountMon(chatId);
  } else if (data === 'monthly_summary') {
    sendSummaryMon(chatId);
  } else if (data === 'distance_vs_range_wk') {
    sendDistanceRangeWk(chatId);
  } else if (data === 'distance_vs_efficiency_wk') {
    sendDistanceEfficiencyWk(chatId);
  } else if (data === 'mileage_wk') {
    sendDistanceBatteryKmWk(chatId);
  } else if (data === 'battery_per_wk') {
    sendBatteryUsagePerWk(chatId);
  } else if (data === 'battery_drain_wk') {
    sendBatteryDrainPerWk(chatId);
  } else if (data === 'top_vs_avg_speed_wk') {
    sendTopAverageSpeedWk(chatId);
  } else if (data === 'savings_wk') {
    sendSavingsWk(chatId);
    costSavingsSummary();
  } else if (data === 'ride_pattern_wk') {
    sendRidePatternWk(chatId);
  } else if (data === 'driving_mode_wk') {
    sendDrivingModeWk(chatId);
  } else if (data === 'horn_count_wk') {
    sendHornCountWk(chatId);
  } else if (data === 'weekly_summary') {
    sendSummaryWk(chatId);
  } else if (data === 'best_mode') {
    sendBestMode(chatId);
  } else if (data === 'set_battery_alert_pct') {
    sendToTelegram(ADMIN, "Send the target percentage for receiving alerts using the following syntax:\n\n<code>SOC value</code>" +
      "\n\nFor example, type <code>SOC 50</code> to receive alerts when the battery level falls below 50%.");
  } else if (data === 'skip_battery_alert') {
    setBatteryAlert('false');
  }
}

// Function to process text messages
function processText(message, chatId) {
  if (message.text === '/start') {
    sendToTelegram(
      chatId,
      '🙏 <b>Welcome to Ride Log Bot</b> 🙏' +
      '\n\nRemember the command letters:' +
      '\n<code>D</code> - Daily Charts' +
      '\n<code>W</code> - Weekly Charts' +
      '\n<code>M</code> - Monthly Charts' +
      '\n<code>T</code> - Trigger API & enable Triggers' +
      '\n<code>G</code> - Get API Status' +
      '\n<code>O</code> - Toggele Triggers ON or OFF' +
      '\n<code>DS</code> - Daily Summary' +
      '\n<code>WS</code> - Weekly Summary' +
      '\n<code>MS</code> - Monthly Summary' +
      '\n<code>set A/B/C</code> - Set Trip A/B/C' +
      '\n<code>get A/B/C</code> - Get Trip A/B/C info' +
      '\n<code>AT new-token</code> - will replace the Ather token'
    );
  } else if (message.text.toUpperCase() === 'D') {
    sendToTelegram(chatId, '👇 Pick a chart for daily ride stats 📅', chartsDailyKeyboard);
  } else if (message.text.toUpperCase() === 'W') {
    sendToTelegram(chatId, '👇 Pick a chart for weekly ride stats 📅', chartsWeeklyKeyboard);
  } else if (message.text.toUpperCase() === 'M') {
    sendToTelegram(chatId, '👇 Pick a chart for monthly ride stats 🗓️', chartsMonthlyKeyboard);
  } else if (message.text.toUpperCase() === 'SET A') {
    setTripA(message);
  } else if (message.text.toUpperCase() === 'SET B') {
    setTripB(message);
  } else if (message.text.toUpperCase() === 'SET C') {
    setTripC(message);
  } else if (message.text.toUpperCase() === 'GET A') {
    getTripA();
  } else if (message.text.toUpperCase() === 'GET B') {
    getTripB();
  } else if (message.text.toUpperCase() === 'GET C') {
    getTripC();
  } else if (message.text.toUpperCase() === 'DS') {
    dailySummary();
  } else if (message.text.toUpperCase() === 'WS') {
    weeklySummary();
  } else if (message.text.toUpperCase() === 'MS') {
    monthlySummary();
  } else if (message.text.toUpperCase() === 'T') {
    var newTrigger = { 'AUTO_TRIGGER': 'true' }
    USER_PROPERTIES.setProperties(newTrigger);
    AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    triggerApiManually();
    sendToTelegram(chatId, '🌀 API trigger is initiated, wait for a minute to complete.')
  } else if (message.text.toUpperCase() === 'O') {
    if (AUTO_TRIGGER === 'true') {
      var newTrigger = { 'AUTO_TRIGGER': 'false' }
      USER_PROPERTIES.setProperties(newTrigger);
      sendToTelegram(chatId, '❌ Auto Trigger is disabled.')
      AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    } else {
      var newTrigger = { 'AUTO_TRIGGER': 'true' }
      USER_PROPERTIES.setProperties(newTrigger);
      sendToTelegram(chatId, '✅ Auto Trigger is enabled.')
      AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    }
  } else if (message.text === 'G') {
    AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    sendToTelegram(chatId, 'Auto Trigger is currently set to ' + AUTO_TRIGGER + '.')
  } else if (message.text.match(/AT\s/i)) {
    var oldToken = TOKEN
    const tokenRegex = /AT\s+(.*)/i;
    const match = message.text.match(tokenRegex);
    if (match && match.length > 1) {
      var newAtherToken = { TOKEN: match[1] };
      USER_PROPERTIES.setProperties(newAtherToken);
      OPTIONS.getRange('B5').setValue(match[1]);
      sendToTelegram(chatId, "✅ The ather token has been replaced successfully!\n\n" +
        "Old Token: <code>" + oldToken + "</code>\n\n" +
        "New Token: <code>" + match[1] + "</code>");
      ATHER_TOKEN = USER_PROPERTIES.getProperty('TOKEN');
    } else {
      sendToTelegram(chatId, "❌ Token update failed");
    }
  } else if (message.text.match(/SOC\s/i)) {
    const socRegex = /SOC\s+(\d+)/i;
    const match = message.text.match(socRegex);
    if (match && match.length > 1) {
      const socValue = parseInt(match[1], 10);
      if (socValue >= 0 && socValue <= 100) {
        setBatteryAlertCapacity(socValue);
        sendToTelegram(chatId, '✅ <b>Target SOC is set for alerts</b> ✅\n\nYou will receive alerts when the battery drops below ' + socValue + '%.' +
          "\n\nThe bot doesn't have access to fetch the current SOC from your vehicle.  " +
          "It uses SOC % from the last ride; any idle drain after taking the ride is not considered.");
      } else {
        sendToTelegram(chatId, '❌ SOC value must be between 0 and 100.');
      }
    } else {
      sendToTelegram(chatId, '❌ Invalid SOC command format.');
    }
  } else {
    sendToTelegram(chatId, '❌ Unknown command.');
  }
}
function logMessage(request) {
  // if (LOG === 'true') {
  appendData(LOG, [Date(), JSON.stringify(request, null, 4)]);
  // appendData(LOG, [Date(), request]);
  // }
}


// function appHomeDetails(rawString) {    
//   logMessage(rawString)
//   var lastSyncedTimeRegex = /lastSyncedTime=(\d+)/;  
//   var bikeRegex = /speed=(\d+), mode=(\w+), batterySOC=(\d+\.\d+), range=(\d+), vehicleState=(\w+), bikeType=(\w+), otaAvailable=(\w*), softwareVersion=(.*)/;
//   var lastSyncedTimeMatch = rawString.match(lastSyncedTimeRegex);
//   var bikeMatch = rawString.match(bikeRegex);
//   logMessage(lastSyncedTimeMatch)
//   logMessage(bikeMatch)
//   if (bikeMatch) {    
//       var lastSyncedTime= convertEpohToIST(parseInt(lastSyncedTimeMatch[1]))
//       var speed= parseInt(bikeMatch[1])
//       var mode= bikeMatch[2]
//       var batterySOC= parseFloat(bikeMatch[3])
//       var range= parseInt(bikeMatch[4])
//       var vehicleState = bikeMatch[5]
//       var bikeType= bikeMatch[6]
//       var otaAvailable= bikeMatch[7]
//       var softwareVersion= bikeMatch[8]      
//     APP_HOME.appendRow([Date(), lastSyncedTime, batterySOC, vehicleState, bikeType, softwareVersion, otaAvailable, range, speed, mode])
//     // var message = "Battery %: " + batterySOC + "\nAs of: " + lastSyncedTime
//     // sendToTelegram(ADMIN, message)
//   } 
// }


function fetchMapsData(id) {
  // var data = fetchMapsData(id);
  var data = null;
  var dataRange = DATA.getDataRange();
  var values = dataRange.getValues();
  for (var i = values.length - 1; i > 0; i--) {
    if (values[i][0] === Number(id)) {
      var coordinates = values[i][63];
      var speed = values[i][64];
      data = { coordinates: coordinates, speed: speed };
    }
  }
  if (!data) {
    return HtmlService.createHtmlOutput(
      '<h1>Unable to generate map</h1>' +
      '<body>' +
      '<p>Check if the id ' + id + ' is available on the Google Sheets, data tab.</p>' +
      '<p>Please contact the <a href="https://t.me/ather_india">the group</a> with the error screenshot that includes the url and the specifc ride details from "data" sheet.</p>' +
      '</body>');
  }
  var template = HtmlService.createTemplateFromFile('map');
  template.coordinates = data.coordinates;
  template.speed = data.speed;
  var htmlOutput = template.evaluate();
  htmlOutput.setTitle('Ride Map for ID: ' + id);
  return htmlOutput;
}



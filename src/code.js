var sheet = SpreadsheetApp.openById(SSID).getSheetByName('data');

// doPost is for Post requests
function doPost(request) {
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
    if (ALLOWED_USER_IDS.includes(chatId)) {
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
  } else if (data === 'top_vs_avg_speed') {
    sendTopAverageSpeedDay(chatId);
  } else if (data === 'savings') {
    sendSavings(chatId);
    costSavingsSummary();
  } else if (data === 'brake_non') {
    sendBrakeNon(chatId);
  } else if (data === 'coasting_non') {
    sendCoastingNon(chatId);
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
  } else if (data === 'distance_vs_battery_km_mon') {
    sendDistanceBatteryKmMon(chatId);
  } else if (data === 'battery_per_mon') {
    sendBatteryUsagePerMon(chatId);
  } else if (data === 'top_vs_avg_speed_mon') {
    sendTopAverageSpeedMon(chatId);
  } else if (data === 'savings_mon') {
    sendSavingsMon(chatId);
    costSavingsSummary();
  } else if (data === 'brake_non_mon') {
    sendBrakeNonMon(chatId);
  } else if (data === 'coasting_non_mon') {
    sendCoastingNonMon(chatId);
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
  } else if (data === 'distance_vs_battery_km_wk') {
    sendDistanceBatteryKmWk(chatId);
  } else if (data === 'battery_per_wk') {
    sendBatteryUsagePerWk(chatId);
  } else if (data === 'top_vs_avg_speed_wk') {
    sendTopAverageSpeedWk(chatId);
  } else if (data === 'savings_wk') {
    sendSavingsWk(chatId);
    costSavingsSummary();
  } else if (data === 'brake_non_wk') {
    sendBrakeNonWk(chatId);
  } else if (data === 'coasting_non_wk') {
    sendCoastingNonWk(chatId);
  } else if (data === 'driving_mode_wk') {
    sendDrivingModeWk(chatId);
  } else if (data === 'horn_count_wk') {
    sendHornCountWk(chatId);
  } else if (data === 'weekly_summary') {
    sendSummaryWk(chatId);
  } else if (data === 'best_mode') {
    sendBestMode(chatId);
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
      '\n<code>get A/B/C</code> - Get Trip A/B/C info'
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
    var newTrigger = { AUTO_TRIGGER: 'true' };
    USER_PROPERTIES.setProperties(newTrigger);
    AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    getDataFromApi();
    sendToTelegram(chatId, '✅ API trigger is completed.');
  } else if (message.text.toUpperCase() === 'O') {
    if (AUTO_TRIGGER === 'true') {
      var newTrigger = { AUTO_TRIGGER: 'false' };
      USER_PROPERTIES.setProperties(newTrigger);
      sendToTelegram(chatId, '❌ Auto Trigger is disabled.');
      AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    } else {
      var newTrigger = { AUTO_TRIGGER: 'true' };
      USER_PROPERTIES.setProperties(newTrigger);
      sendToTelegram(chatId, '✅ Auto Trigger is enabled.');
      AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    }
  } else if (message.text === 'G') {
    AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
    sendToTelegram(chatId, 'Auto Trigger is currently set to ' + AUTO_TRIGGER + '.');
  } else {
    sendToTelegram(chatId, '❌ Unknown command.');
  }
}

function appendData(var_sheetname, value) {
    var_sheetname.appendRow(value);
}

function getIPAddress() {
    var response = UrlFetchApp.fetch('https://api64.ipify.org?format=json');
    var data = JSON.parse(response.getContentText());
    var ipAddress = data.ip;
    appendData(LOG, [new Date(), ipAddress])
    Logger.log("Client's IP address: " + ipAddress);
    return ipAddress;
}

function triggerApiManually() {
    var delayInSeconds = 61;
    var futureTime = new Date(new Date().getTime() + delayInSeconds * 1000);
    var trigger = ScriptApp.newTrigger('triggerApi')
        .timeBased()
        .at(futureTime)
        .create();
}

// Function to update script properties automatically.
function updatedScriptProperties() {
    var userInputs = OPTIONS.getRange('A2:B9').getValues();
    userInputs.push(['AUTO_TRIGGER', 'TRUE']);
    for (var i = 0; i < userInputs.length; i++) {
        var key = userInputs[i][0];
        var value = String(userInputs[i][1]);

        if (value === null || value === '') {
            throw new Error('Please fill in all the cells in the range B2:B9');
        } else {
            PropertiesService.getScriptProperties().setProperty(key, value);
        }
    }
    Logger.log('Script Properties are updated!')
    deleteWebhook()
    setWebhook();
}

function batteryAlert(soc) {
    var batteryAlertCapacity = getBatteryAlertCapacity()
    var batteryAlert = getBatteryAlert()
    if (soc < batteryAlertCapacity && batteryAlert == 'true') {
        sendToTelegram(ADMIN, '⚠️ <b>Low Battery Alert</b> ⚠️\n\nYour current SOC is ' + soc + '%.\nYour Target is set to ' + batteryAlertCapacity + '%.\n\nEnsure to recharge your vehicle to prevent any unexpected situations.', batteryAlertKeyboard)
    }
}

function getBatteryAlertCapacity() {
    var BATTERY_ALERT_CAPACITY = USER_PROPERTIES.getProperty('BATTERY_ALERT_CAPACITY');
    if (BATTERY_ALERT_CAPACITY === null) {
        BATTERY_ALERT_CAPACITY = 30;
        USER_PROPERTIES.setProperty('BATTERY_ALERT_CAPACITY', BATTERY_ALERT_CAPACITY);
    } else {
        BATTERY_ALERT_CAPACITY = parseInt(BATTERY_ALERT_CAPACITY);
    }
    setBatteryAlert('true')
    return BATTERY_ALERT_CAPACITY;
}

function getBatteryAlert() {
    var BATTERY_ALERT = USER_PROPERTIES.getProperty('BATTERY_ALERT');
    if (BATTERY_ALERT === null) {
        BATTERY_ALERT = 'true';
        USER_PROPERTIES.setProperty('BATTERY_ALERT', BATTERY_ALERT);
    } else {
        BATTERY_ALERT = BATTERY_ALERT;
    }
    return BATTERY_ALERT;
}

function setBatteryAlertCapacity(value) {
    PropertiesService.getScriptProperties().setProperty('BATTERY_ALERT_CAPACITY', value);
    setBatteryAlert('true');
}

function setBatteryAlert(value) {
    PropertiesService.getScriptProperties().setProperty('BATTERY_ALERT', value);
    if (value == 'false') {
        sendToTelegram(ADMIN, "✅ <b>Low Battery Alert - Disabled</b> ✅\n\nThe low battery alert is disabled for now.  However it will be enabled automatically when you take a next ride.")
    }
}

function convertEpochToIST(epohTime) {
    // var epohTime= 1718546437556
    var istTime = Utilities.formatDate(new Date(epohTime), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    Logger.log(istTime)
    return istTime;
}

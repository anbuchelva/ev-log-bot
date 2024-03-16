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
    logMessage('Script Properties are updated!');
}
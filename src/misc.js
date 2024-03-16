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

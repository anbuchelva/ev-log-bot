function doGet(request) {
    try {
        if (!request) {
            throw new Error('Request object is undefined.');
        }

        var functionName = request.parameter && request.parameter.function;

        if (!functionName) {
            throw new Error('Function name is not provided in the request.');
        }

        if (functionName === 'triggerApi') {
            return ContentService.createTextOutput(triggerApi());
        } else {
            throw new Error('Invalid function name: ' + functionName);
        }
    } catch (error) {
        Logger.log(error.message);
        sendToTelegram(ADMIN, 'Error in doGet(): ' + error.message);
        appendData(LOG, [111, 222, error.message]);

        // Return an error response
        return ContentService.createTextOutput('Error: ' + error.message);
    }
}

function trigger4SendMediaGroup(event) {

    var triggerUid = event.triggerUid;
    var triggers = ScriptApp.getProjectTriggers();
    if (triggers && triggers.length > 0) {
        triggers.forEach(item => {
            if (item.getUniqueId() == triggerUid) {
                // ScriptApp.deleteTrigger(item);
                Logger.log(triggerUid)
            }
        })
    }
}

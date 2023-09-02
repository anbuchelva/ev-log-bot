// Get the details of the bot
function getMe() {
  var response = UrlFetchApp.fetch(TELEGRAM_URL + 'getMe');
  Logger.log(response.getContentText());
}

// get webhoot info
function getWebhookInfo() {
  var response = UrlFetchApp.fetch(TELEGRAM_URL + 'getWebhookInfo');
  Logger.log(response.getContentText());
}

// Set the webhook using WEBHOOK_URL
function setWebhook() {
  var response = UrlFetchApp.fetch(TELEGRAM_URL + 'setWebhook?url=' + WEBHOOK_URL);
  Logger.log(response.getContentText());
}

// Delete Webhook
function deleteWebhook() {
  var response = UrlFetchApp.fetch(TELEGRAM_URL + 'deleteWebhook');
  Logger.log(response.getContentText());
}

// Send message with inline buttons
function sendToTelegram(chatId, message, keyboard, messageId) {
  var payload = {
    method: 'sendMessage',
    chat_id: String(chatId),
    text: message,
    parse_mode: 'HTML',
  };

  if (keyboard) {
    payload.reply_markup = JSON.stringify(keyboard);
  }

  if (messageId) {
    payload.reply_to_message_id = messageId;
    // payload.message_id = messageId;
  }

  var data = {
    method: 'post',
    payload: payload,
  };
  var response = UrlFetchApp.fetch(TELEGRAM_URL, data);
  //  logMessage(response)
  return response;
}

function deleteMessage(chatId, messageId) {
  var payload = {
    method: 'deleteMessage',
    chat_id: String(chatId),
    message_id: String(messageId),
  };

  var data = {
    method: 'post',
    payload: payload,
  };

  var response = UrlFetchApp.fetch(TELEGRAM_URL, data);
  Logger.log(response.getContentText());
  return response;
}

function replaceMessage(chatId, messageIdToDelete, messageIdToReply, messageBody, keyboard) {
  deleteMessage(chatId, messageIdToDelete);
  return sendToTelegram(chatId, messageBody, keyboard, messageIdToReply);
}

function sendPhotoToTelegram(chatId, photoBlob, caption) {
  var payload = {
    method: 'sendPhoto',
    chat_id: String(chatId),
    caption: caption,
    photo: photoBlob,
  };
  var data = {
    method: 'post',
    payload: payload,
  };

  var response = UrlFetchApp.fetch(TELEGRAM_URL, data);
  // var response = UrlFetchApp.fetch(TELEGRAM_URL + 'sendPhoto', payload);
  Logger.log(response.getContentText()); // Log the response content
  return response;
}

function sendDocToTelegram(chatId, fileBlob, caption) {
  var payload = {
    method: 'sendDocument',
    chat_id: String(chatId),
    caption: caption,
    document: fileBlob,
  };
  var data = {
    method: 'post',
    payload: payload,
  };

  var response = UrlFetchApp.fetch(TELEGRAM_URL, data);
  Logger.log(response.getContentText());
  return response;
}

function checkUserInApprovedList(chatId) {
  var currentApprovedUsers = ALLOWED_USER_IDS;
  try {
    Logger.log(ALLOWED_USER_IDS);
    const index = currentApprovedUsers.indexOf(chatId);
    Logger.log('Index: ' + index);
    if (index > 0) {
      return currentApprovedUsers;
    }
  } catch (error) {
    sendToTelegram(ADMIN_ID, `Error in doPost(): ${error.message}`);
  }
}

function approveUser(chatId) {
  var currentApprovedUsers = checkUserInApprovedList(chatId);
  if (currentApprovedUsers) {
    sendToTelegram(ADMIN_ID, chatId + ' is already in the approved user list.');
  } else {
    var currentApprovedUsers = ALLOWED_USER_IDS;
    currentApprovedUsers.push(chatId);
    USER_PROPERTIES.setProperty('ALLOWED_USER_IDS', currentApprovedUsers.toString());
    updateUserApproval(chatId, 'Approved');
    sendToTelegram(ADMIN_ID, chatId + " has been added to the approved user's list.");
    Utilities.sleep(1000);
    sendToTelegram(chatId, '✅ Your registration request has been approved. You can start using the bot with /start command!');
  }
}

function removeUser(chatId) {
  var currentApprovedUsers = checkUserInApprovedList(chatId);
  if (currentApprovedUsers) {
    const index = currentApprovedUsers.indexOf(chatId);
    Logger.log('Existing Users: ' + currentApprovedUsers);
    currentApprovedUsers.splice(index, 1);
    Logger.log('Updated list of Users: ' + currentApprovedUsers);
    USER_PROPERTIES.setProperty('ALLOWED_USER_IDS', currentApprovedUsers.toString());
    updateUserApproval(chatId, 'Unregistered');
    sendToTelegram(ADMIN_ID, chatId + " has been removed from the approved user's list.");
    Utilities.sleep(1000);
    sendToTelegram(
      chatId,
      "❌ You have been removed from the approved user's list. You cannot access the bot anymore. If you want to get help contact @ather_india."
    );
  }
}

function addUserToWaitList(chatId) {
  var currentApprovedUsers = checkUserInApprovedList(chatId);
  if (currentApprovedUsers) {
    sendToTelegram(ADMIN_ID, chatId + ' is already in the approved user list.');
  } else {
    updateUserApproval(chatId, 'Waitlisted');
    sendToTelegram(ADMIN_ID, chatId + ' has been added to the waiting list.');
    Utilities.sleep(1000);
    sendToTelegram(chatId, '🟠 Your registration request is in waiting list. It looks like you need to wait for some time.');
  }
}

function denyUser(chatId) {
  var currentApprovedUsers = checkUserInApprovedList(chatId);
  if (currentApprovedUsers) {
    sendToTelegram(ADMIN_ID, chatId + ' is already in the approved user list.');
  } else {
    updateUserApproval(chatId, 'Denied');
    sendToTelegram(ADMIN_ID, chatId + ' has been denied.');
    Utilities.sleep(1000);
    sendToTelegram(chatId, '❌ Your registration request has been denied. Contact @ather_india for more information.');
  }
}

function checkUserInGroup(chatId) {
  if (GROUP_CHECK === 'false') {
    return true; // if GROUP CHECK is set to false, don't check the group.
  } else {
    var url = TELEGRAM_URL + 'getChatMember?chat_id=' + TELEGRAM_GROUP_ID + '&user_id=' + chatId;
    try {
      var response = UrlFetchApp.fetch(url);
      var data = JSON.parse(response.getContentText());
      if (data.result.status !== 'left') {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      Logger.log('Error: ' + e);
      return false;
    }
  }
}

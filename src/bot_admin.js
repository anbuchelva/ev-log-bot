function approveUser(chatId){
  var currentApprovedUsers = ALLOWED_USER_IDS;
  currentApprovedUsers.push(chatId)  
  USER_PROPERTIES.setProperty('ALLOWED_USER_IDS', currentApprovedUsers.toString());
  USERS.appendRow([new Date(), chatId, 'Approved']);
  sendToTelegram(ADMIN_ID, chatId + " has been added to the approved user's list.")
  Utilities.sleep(1000);
  sendToTelegram(chatId,"✅ Your registration request has been approved. You can start using the bot with /start command!")
}

function removeUser(chatId){
  var currentApprovedUsers = ALLOWED_USER_IDS;
  currentApprovedUsers.push(chatId) 
  try{
    const index = currentApprovedUsers.indexOf(chatId);
    if (index){
      currentApprovedUsers.splice(index, 1);
      USER_PROPERTIES.setProperty('ALLOWED_USER_IDS', currentApprovedUsers.toString());
      USERS.appendRow([new Date(), chatId, 'Removed']);
      sendToTelegram(ADMIN_ID, chatId + " has been removed from the approved user's list.")
      Utilities.sleep(1000);
      sendToTelegram(chatId,"❌ You have been removed from the approved user's list. You cannot access the bot anymore. If you want to get help contact @ather_india.")
    }
  } catch (error) {
    sendToTelegram(ADMIN_ID, `Error in doPost(): ${error.message}`);
  }
}

function addUserToWaitList(chatId){  
  USERS.appendRow([new Date(), chatId, 'Waitlisted']);
  sendToTelegram(ADMIN_ID, chatId + " has been added to the waiting list.")
  Utilities.sleep(1000);
  sendToTelegram(chatId,"🟠 Your registration request is in waiting list. It looks like you need to wait for some time.")
}

function denyUser(chatId){    
  USERS.appendRow([new Date(), chatId, 'Denied']);
  sendToTelegram(ADMIN_ID, chatId + " has been denied.")
  Utilities.sleep(1000);
  sendToTelegram(chatId,"❌ Your registration request has been denied. Contact @ather_india for more information.")
}

function checkUserInGroup(chatId=ADMIN_ID) {
  Logger.log(GROUP_CHECK)
  if (GROUP_CHECK === 'false'){
    return true // if GROUP CHECK is set to false, don't check the group.
  } else {    
    var url = TELEGRAM_URL + 'getChatMember?chat_id=' + TELEGRAM_GROUP_ID + "&user_id=" + chatId;  
    try {
      var response = UrlFetchApp.fetch(url);
      var data = JSON.parse(response.getContentText());      
      if (data.result.status !== 'left') {  // if the result is not equalt to 'left' then the user is part of the group.
        // Logger.log(chatId + ' is part of the group')
        return true;
      } else {
        // Logger.log(chatId + ' is not in the group')
        return false;
      }
    } catch (e) {
      Logger.log('Error: ' + e);    
      return false;
    }
  }
}


function sendScheduledReminders() {
  if (GROUP_CHECK !== 'NA') {
    sendToTelegram(TELEGRAM_GROUP_ID, 'Reminder: Its time to update your ride! 🛵');
  } else {
    sendToTelegram(ADMIN_ID, 'Reminder: Its time to update your ride! 🛵');
  }
}

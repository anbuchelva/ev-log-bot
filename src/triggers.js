function sendScheduledReminders() {
  sendToTelegram(TELEGRAM_GROUP_ID, 'Reminder: Its time to update your ride! 🛵');
}

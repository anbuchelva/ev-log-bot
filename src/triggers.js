function sendScheduledReminders() {
  if (SUMMARY.getRange('B2').getValue() == 0) {
    sendToTelegram(ADMIN_ID, 'Its time to update your ride! 🛵');
  }
}

function getMessageId(responseText) {
  jsonResponse = JSON.parse(responseText);
  var messageID = jsonResponse.result.message_id;
  return messageID;
}

function chartToImage(chart) {
  // var imageBlob = chart.getBlob(); this line doesn't work for some reason.
  const slides = SlidesApp.openById(SLIDE_ID);
  slides.getSlides()[0].remove();
  const newSlide = slides.appendSlide();
  const imageBlob = newSlide.insertSheetsChartAsImage(chart).getAs('image/jpeg');
  return imageBlob;
}

function sendDistanceRange(chatId) {
  var chart = DISTANCE_RANGE.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Daily');
}

function sendDistanceEfficiency(chatId) {
  var chart = DISTANCE_EFFICIENCY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Daily');
}

function sendDistanceBatteryKm(chatId) {
  var chart = DISTANCE_BATTERY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Daily');
}

function sendBatteryUsagePerDay(chatId) {
  var chart = BATTERY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Day');
}

function sendTopAverageSpeedDay(chatId) {
  var chart = TOP_AVG_SPEED.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Daily');
}

function sendSavings(chatId) {
  var chart = SAVINGS.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Savings - Daily');
}

function sendRidePattern(chatId) {
  var chart = RIDE_PATTERN.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Ride Pattern - Daily');
}

function sendDrivingMode(chatId) {
  var chart = DRIVING_MODE.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Driving Mode - Daily');
}

function sendHornCount(chatId) {
  var chart = HORN_COUNT.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Horn Count - Daily');
}

function sendSummary(chatId) {
  var chart = DAILY_SUMMARY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Daily Summary');
}

function sendDistanceRangeMon(chatId) {
  var chart = DISTANCE_RANGE_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Monthly');
}

function sendDistanceEfficiencyMon(chatId) {
  var chart = DISTANCE_EFFICIENCY_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Monthly');
}

function sendDistanceBatteryKmMon(chatId) {
  var chart = DISTANCE_BATTERY_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Monthly');
}

function sendBatteryUsagePerMon(chatId) {
  var chart = BATTERY_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Month');
}

function sendTopAverageSpeedMon(chatId) {
  var chart = TOP_AVG_SPEED_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Monthly');
}

function sendSavingsMon(chatId) {
  var chart = SAVINGS_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Savings - Monthly');
}

function sendRidePatternMon(chatId) {
  var chart = RIDE_PATTERN_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Ride Pattern - Monthly');
}

function sendDrivingModeMon(chatId) {
  var chart = DRIVING_MODE_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Driving Mode - Monthly');
}

function sendHornCountMon(chatId) {
  var chart = HORN_COUNT_MONTH.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Horn Count - Monthly');
}

function sendSummaryMon(chatId) {
  var chart = MONTHLY_SUMMARY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Monthly Summary');
}

function sendDistanceRangeWk(chatId) {
  var chart = DISTANCE_RANGE_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Range - Weekly');
}

function sendDistanceEfficiencyWk(chatId) {
  var chart = DISTANCE_EFFICIENCY_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Efficiency - Weekly');
}

function sendDistanceBatteryKmWk(chatId) {
  var chart = DISTANCE_BATTERY_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Distance vs. Battery % / Km - Weekly');
}

function sendBatteryUsagePerWk(chatId) {
  var chart = BATTERY_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Battery Usage per Week');
}

function sendTopAverageSpeedWk(chatId) {
  var chart = TOP_AVG_SPEED_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Top speed vs. Average Speed - Weekly');
}

function sendSavingsWk(chatId) {
  var chart = SAVINGS_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Savings - Weekly');
}

function sendRidePatternWk(chatId) {
  var chart = RIDE_PATTERN_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Ride Pattern - Weekly');
}

function sendDrivingModeWk(chatId) {
  var chart = DRIVING_MODE_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Driving Mode - Weekly');
}

function sendHornCountWk(chatId) {
  var chart = HORN_COUNT_WK.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Horn Count - Weekly');
}

function sendBestMode(chatId) {
  var chart = BEST_MODE.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Best Driving Mode');
}

function sendSummaryWk(chatId) {
  var chart = WEEKLY_SUMMARY.getCharts()[0];
  var imageBlob = chartToImage(chart);
  sendPhotoToTelegram(chatId, imageBlob, 'Weekly Summary');
}

function sendTripSpeed(chatId, caption) {
  var chart = TRIP_SPEED.getCharts()[0];
  var imageBlob = chartToImage(chart);
  var response = sendPhotoToTelegram(chatId, imageBlob, caption);
  return response.result.message_id;
}
function runtimeCountStop(start) {
  var updatedDate = Date(RUN_DATE_UPDATED);
  var stop = new Date();
  var currentDate = Date(getDateVal(stop));
  Logger.log(currentDate + updatedDate);
  if (currentDate > updatedDate) {
    recordRuntime();
  }
  var newRuntime = Number(stop) - Number(start) + Number(RUN_TIME_MSEC);
  var newRunCount = Number(RUN_TIME_COUNT) + 1;
  var newData = {
    RUN_TIME_MSEC: newRuntime,
    RUN_TIME_COUNT: newRunCount,
    RUN_DATE_UPDATED: getDateVal(stop),
  };
  USER_PROPERTIES.setProperties(newData);
}

function getDateVal(date) {
  var formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return formattedDate;
}

function recordRuntime() {
  RUN_TIME_DATA.appendRow([RUN_DATE_UPDATED, RUN_TIME_COUNT, RUN_TIME_MSEC]);
  // var currentDate = getDateVal(new Date());
  var newData = {
    RUN_TIME_MSEC: 0,
    RUN_TIME_COUNT: 0,
    // RUN_DATE_UPDATED: currentDate
  };
  USER_PROPERTIES.setProperties(newData);
}

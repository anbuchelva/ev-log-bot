function getDataFromApi(limitVal, telegramAlert) {
  if (AUTO_TRIGGER.toLowerCase() === 'true') {
    var url =
      'https://cerberus.ather.io/api/v1/triplogs?scooter=' +
      VIN +
      '&limit=' +
      limitVal +
      '&select=distance_m%2Cefficiency_whpkm%2Ctime_s%2Cstart_loc_text%2Cend_loc_text%2Cend_time_tz%2Cmax_display_speed_kmph%2Cstart_time_tz%2Cexpected_range_kms%2Cdetails%2Cexternal_charge_consumed_kwh%2Cend_loc_long%2Cend_loc_lat%2Csaving_tracker%2Cstart_loc_long%2Cstart_loc_lat%2Cmoving_trip_duration_s%2Ccoasting_distance_m%2Cinternal_charge_consumed_kwh%2Cbraking_distance_m%2Cmini_sessions%2Cscooter_state%2CupdatedAt%2CcreatedAt&sort=start_time_tz%20desc&populate=false&is_deleted=false';

    // Set the headers
    var headers = {
      Authorization: 'Bearer ' + TOKEN,
      'Content-Type': 'application/json', // Set the content type to JSON
      'cache-control': 'max-stale=120',
      'accept-encoding': 'gzip',
      'user-agent': 'okhttp/4.10.0',
    };

    // Define the options
    var options = {
      method: 'get',
      headers: headers,
    };

    try {
      // Make the HTTP request
      var response = UrlFetchApp.fetch(url, options);
      var statusCode = response.getResponseCode();

      if (statusCode === 200) {
        var data = JSON.parse(response.getContentText());
        insertDataIntoSheet(data, telegramAlert);
      } else {
        Logger.log('Request failed with status code ' + statusCode);
        sendToTelegram(ADMIN, 'Request failed with status code ' + statusCode);
        Logger.log(response.getContentText());
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('403') && telegramAlert) {
        Logger.log('Access Forbidden (403 Error): Ather disabled this operation.')
        sendToTelegram(ADMIN, '❌ Access Forbidden (403 Error): Ather disabled this operation.');
      } else {
        Logger.log('Error in getDataFromApi:', error);
        sendToTelegram(ADMIN, '❌ Error in getDataFromApi: ' + error.message);
      }
    }
  }
}

function insertDataIntoSheet(data, telegramAlert) {
  data.reverse();
  // Get all existing IDs from the sheet
  var existingIds = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, 1)
    .getValues()
    .map(function (row) {
      return row[0];
    });

  for (var i = 0; i < data.length; i++) {
    var tripData = data[i];
    var id = tripData.id;

    // Check if the ID already exists in the sheet
    if (existingIds.indexOf(id) === -1) {
      var details = tripData.details;

      // time
      var start_time_tz = tripData.start_time_tz;
      var end_time_tz = tripData.end_time_tz;
      var createdAt = tripData.createdAt;
      var updatedAt = tripData.updatedAt;

      // start loc
      var start_loc_text = tripData.start_loc_text;
      var start_loc_lat = tripData.start_loc_lat;
      var start_loc_long = tripData.start_loc_long;

      // end loc
      var end_loc_text = tripData.end_loc_text;
      var end_loc_lat = tripData.end_loc_lat;
      var end_loc_long = tripData.end_loc_long;

      // efficiency, range, savings
      var efficiency_whpkm = tripData.efficiency_whpkm;
      var expected_range_kms = tripData.expected_range_kms;
      var saving_tracker = tripData.saving_tracker;
      var energy_consumed_wh = details.energy_consumed_wh;
      var horn_count = details.horn_count;

      // charge
      var external_charge_consumed_kwh = tripData.external_charge_consumed_kwh;
      var internal_charge_consumed_kwh = tripData.internal_charge_consumed_kwh;

      // predicted range
      var predictedrange_eco = details.predictedrange_eco;
      var predictedrange_smart_eco = details.predictedrange_smart_eco;
      var predictedrange_ride = details.predictedrange_ride;
      var predictedrange_sport = details.predictedrange_sport;
      var predictedrange_warp = details.predictedrange_warp;

      // distance in m
      var distance_m = tripData.distance_m;
      var braking_distance_m = tripData.braking_distance_m;
      var coasting_distance_m = tripData.coasting_distance_m;
      var eco_mode_distance_m = details.eco_mode_distance_m;
      var smart_eco_mode_distance_m = details.smart_eco_mode_distance_m;
      var ride_mode_distance_m = details.ride_mode_distance_m;
      var sport_mode_distance_m = details.sport_mode_distance_m;
      var warp_mode_distance_m = details.warp_mode_distance_m;

      // distance in pct
      var braking_distance_pct = details.braking_distance_pct;
      var coasting_distance_pct = details.coasting_distance_pct;
      var eco_mode_distance_pct = details.eco_mode_distance_pct;
      var smart_eco_mode_distance_pct = details.smart_eco_mode_distance_pct;
      var ride_mode_distance_pct = details.ride_mode_distance_pct;
      var sport_mode_distance_pct = details.sport_mode_distance_pct;
      var warp_mode_distance_pct = details.warp_mode_distance_pct;

      // Speed
      var max_display_speed_kmph = tripData.max_display_speed_kmph;
      var avg_display_speed_kmph = details.avg_display_speed_kmph;

      // duration in seconds
      var time_s = tripData.time_s;
      var moving_trip_duration_s = tripData.moving_trip_duration_s;
      var eco_mode_duration_s = details.eco_mode_duration_s;
      var smart_eco_mode_duration_s = details.smart_eco_mode_duration_s;
      var ride_mode_duration_s = details.ride_mode_duration_s;
      var sport_mode_duration_s = details.sport_mode_duration_s;
      var warp_mode_duration_s = details.warp_mode_duration_s;

      // duration in pct
      var eco_mode_duration_pct = details.eco_mode_duration_pct;
      var smart_eco_mode_duration_pct = details.smart_eco_mode_duration_pct;
      var ride_mode_duration_pct = details.ride_mode_duration_pct;
      var sport_mode_duration_pct = details.sport_mode_duration_pct;
      var warp_mode_duration_pct = details.warp_mode_duration_pct;

      // Misc
      var scooter_state = tripData.scooter_state;
      var status = details.status;
      // var ride_crumbs = details.ride_crumbs;
      var polyline = details.polyline_with_speed;
      var ride_crumbs = polyline.ply;
      var spd = polyline.spd;
      var speedString = JSON.stringify(spd);
      var speedBase64String = Utilities.base64Encode(speedString);

      // Extract and store the children of top_speed_vs_distance in separate columns
      // var top_speed_vs_distance = details.top_speed_vs_distance;
      // var sampling_frequency_in_kms
      // if (top_speed_vs_distance && top_speed_vs_distance.sampling_frequency_in_kms) {
      //   sampling_frequency_in_kms = top_speed_vs_distance.sampling_frequency_in_kms;
      // } else {
      //   sampling_frequency_in_kms = '';
      // }

      // var top_speed_vs_distance_values
      // if (top_speed_vs_distance && top_speed_vs_distance.value) {
      //   top_speed_vs_distance_values = top_speed_vs_distance.value[0];
      // } else {
      //   top_speed_vs_distance_values = '';
      // }

      var start_time_ist = convertToIST(start_time_tz);
      var end_time_ist = convertToIST(end_time_tz);
      var createdAtist = convertToIST(createdAt);
      var updatedAtist = convertToIST(updatedAt);
      var yearValue = extractDate(end_time_ist).year;
      var monthValue = extractDate(end_time_ist).month;
      var dateValue = extractDate(end_time_ist).date;
      // if ather api doesn't bring any output
      if (!end_loc_text) {
        end_loc_text = getLocationName(end_loc_lat, end_loc_long);
        // if bing maps doesn't bring any output
        if (!end_loc_text) {
          end_loc_text = 'End Location';
        }
      }
      // Utilities.sleep(1000);
      // if ather api doesn't bring any output
      if (!start_loc_text) {
        start_loc_text = getLocationName(start_loc_lat, start_loc_long);
        if (!start_loc_text) {
          // if bing maps doesn't bring any output
          start_loc_text = 'Start Location';
        }
      }

      // Insert the data into the sheet
      sheet.appendRow([
        id,
        start_time_tz,
        end_time_tz,
        start_time_ist,
        end_time_ist,
        createdAt,
        updatedAt,
        createdAtist,
        updatedAtist,
        yearValue,
        monthValue,
        dateValue,
        start_loc_text,
        end_loc_text,
        start_loc_lat,
        start_loc_long,
        end_loc_lat,
        end_loc_long,
        efficiency_whpkm,
        expected_range_kms,
        horn_count,
        saving_tracker,
        energy_consumed_wh,
        energy_consumed_wh / 3240,
        external_charge_consumed_kwh,
        internal_charge_consumed_kwh,
        predictedrange_eco,
        predictedrange_smart_eco,
        predictedrange_ride,
        predictedrange_sport,
        predictedrange_warp,
        distance_m,
        braking_distance_m,
        coasting_distance_m,
        eco_mode_distance_m,
        smart_eco_mode_distance_m,
        ride_mode_distance_m,
        sport_mode_distance_m,
        warp_mode_distance_m,
        braking_distance_pct,
        coasting_distance_pct,
        eco_mode_distance_pct,
        smart_eco_mode_distance_pct,
        ride_mode_distance_pct,
        sport_mode_distance_pct,
        warp_mode_distance_pct,
        max_display_speed_kmph,
        avg_display_speed_kmph,
        time_s,
        (distance_m / 1000 / avg_display_speed_kmph) * 60,
        moving_trip_duration_s,
        eco_mode_duration_s,
        smart_eco_mode_duration_s,
        ride_mode_duration_s,
        sport_mode_duration_s,
        warp_mode_duration_s,
        eco_mode_duration_pct,
        smart_eco_mode_duration_pct,
        ride_mode_duration_pct,
        sport_mode_duration_pct,
        warp_mode_duration_pct,
        scooter_state,
        status,
        ride_crumbs,
        speedString,
        // sampling_frequency_in_kms,
        // top_speed_vs_distance_values,
      ]);
      if (telegramAlert) {
        var modeData = '';
        var hornData = 0;
        var locationData = '';
        if (eco_mode_distance_m) {
          modeData += '\nEco Mode: ' + eco_mode_distance_pct.toFixed(1) + '%';
        }
        if (smart_eco_mode_distance_m) {
          modeData += '\nSmart Eco Mode: ' + smart_eco_mode_distance_pct.toFixed(1) + '%';
        }
        if (ride_mode_distance_m) {
          modeData += '\nRide Mode: ' + ride_mode_distance_pct.toFixed(1) + '%';
        }
        if (sport_mode_distance_m) {
          modeData += '\nSport Mode: ' + sport_mode_distance_pct.toFixed(1) + '%';
        }
        if (warp_mode_distance_m) {
          modeData += '\nWarp Mode: ' + warp_mode_distance_pct.toFixed(1) + '%';
        }
        if (horn_count) {
          hornData = horn_count.toFixed(0);
        }
        // if (start_loc_text ){
        //   telegramSendVenue(ADMIN, start_loc_lat, start_loc_long, 'Start Location', start_loc_text)
        // } else {
        //   telegramSendVenue(ADMIN, start_loc_lat, start_loc_long, 'Start Location', 'Name not available')
        // }
        // if (end_loc_text){
        //   telegramSendVenue(ADMIN, end_loc_lat, end_loc_long, 'End Location', end_loc_text)
        // } else {
        //   telegramSendVenue(ADMIN, end_loc_lat, end_loc_long, 'End Location', 'Name not available')
        // }
        var message =
          '<b>A new 🛵 <a href="https://anbuchelva.github.io/ev-log-bot/map?coordinates=' + ride_crumbs + '&speed=' + speedBase64String + '">ride entry</a> has been added.</b>\n' +
          '\nStart Time: ' + formatDateTime(start_time_ist) +
          '\nLocation: <a href=\"https://www.google.com/maps/search/?api=1&query=' + start_loc_lat + '%2C' + start_loc_long + '\">' + start_loc_text + '</a>' +
          '\n\nEnd Time: ' + formatDateTime(end_time_ist) +
          '\nLocation: <a href=\"https://www.google.com/maps/search/?api=1&query=' + end_loc_lat + '%2C' + end_loc_long + '\">' + end_loc_text + '</a>' +

          // locationData +
          '\n\nDuration: ' + Math.floor(time_s / 60) + ' mins' +
          '\nRange: ' + (expected_range_kms).toFixed(1) + ' Km' +
          '\nEfficiency: ' + (efficiency_whpkm).toFixed(1) + ' Wh/km' +
          '\nSOC: ' + (energy_consumed_wh / 3240 * 100).toFixed(2) + '%' +
          '\nFuel Savings: ₹' + (saving_tracker).toFixed(2) +
          '\nHorn Count: ' + hornData + modeData +

          '\n\nDistance: ' + (distance_m / 1000).toFixed(1) + ' Km' +
          '\nBraking Dist: ' + (braking_distance_m / 1000).toFixed(1) + ' Km' +
          '\nCoasting Dist: ' + (coasting_distance_m / 1000).toFixed(1) + ' Km' +
          '\nTop Speed: ' + (max_display_speed_kmph).toFixed(1) + ' Km/h' +
          '\nAvg Speed: ' + (avg_display_speed_kmph).toFixed(1) + ' Km/h' +
          '\n\nID:  <code>' + id + '</code>';
        sendToTelegram(ADMIN, message);
      }
      Logger.log('Updating ' + Number(i + 1) + ' of ' + data.length + ' records.');
    }
  }
  // calculate formula
  // calculateFormulaCols();
  // sort sheet as we fetch the data in descending order
  sheet.sort(1);
}

// function calculateFormulaCols() {
//   var sourceRange = sheet.getRange(2, 25, 1, 9);
//   var targetRange = sheet.getRange(1001, 25, sheet.getLastRow() - 1000, 9);
//   sourceRange.copyTo(targetRange, SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
// }

function convertToIST(dateTimeString) {
  // Parse the input date string into a Date object (assumes it's in ISO 8601 format)
  var date = new Date(dateTimeString);

  // Adjust the date to IST (UTC+5:30)
  date.setUTCHours(date.getUTCHours() + 5); // Add 5 hours for IST
  date.setUTCMinutes(date.getUTCMinutes() + 30); // Add 30 minutes for IST

  // Format the date in "YYYY-MM-DD HH:MM:SS" format
  var year = date.getUTCFullYear();
  var month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  var day = date.getUTCDate().toString().padStart(2, '0');
  var hours = date.getUTCHours().toString().padStart(2, '0');
  var minutes = date.getUTCMinutes().toString().padStart(2, '0');
  var seconds = date.getUTCSeconds().toString().padStart(2, '0');

  var ISTDateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  return ISTDateString;
}

function extractDate(dateString) {
  var date = new Date(dateString);
  var year = date.getUTCFullYear();
  var month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  var day = date.getUTCDate().toString().padStart(2, '0');
  var yearResult = year;
  var monthResult = year + '-' + month + '-' + 1;
  var dateResult = year + '-' + month + '-' + day;
  return {
    year: yearResult,
    month: monthResult,
    date: dateResult,
  };
}

function formatDateTime(dateTimeStr) {
  var date = new Date(dateTimeStr);
  var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleString('en-US', options);
}

// function getLocationName(latitude, longitude) {
//   var apiUrl = 'https://nominatim.openstreetmap.org/reverse' +
//     '?lat=' + latitude +
//     '&lon=' + longitude +
//     '&format=json';
//   try {
//     var response = UrlFetchApp.fetch(apiUrl);
//     var data = JSON.parse(response.getContentText());
//     var displayName = data.display_name;
//     var parts = displayName.split(',');
//     var locationName = parts[0].trim();
//     return locationName
//   } catch (error) {
//     Logger.log('Error:', error);
//   }
// }

function getLocationName(latitude, longitude) {
  var apiUrl = 'http://dev.virtualearth.net/REST/v1/Locations/' + latitude + ',' + longitude + '?includeEntityTypes=Address&key=' + MAPS_KEY;
  try {
    var response = UrlFetchApp.fetch(apiUrl);
    var data = JSON.parse(response.getContentText());
    var name = data.resourceSets[0].resources[0].name;
    // var parts = name.split(',');
    // var locationName = parts[0].trim() + ', ' + parts[1].trim();
    // return locationName
    return name;
  } catch (error) {
    Logger.log('Error:', error);
  }
}

function testApiTrigger() {
  var url = 'https://cerberus.ather.io/api/v1/self-serve/status';

  // Set the headers
  var headers = {
    Authorization: 'Bearer ' + TOKEN,
    'Content-Type': 'application/json', // Set the content type to JSON
    'cache-control': 'max-stale=120',
    'accept-encoding': 'gzip',
    'user-agent': 'okhttp/4.10.0',
  };

  // Define the options
  var options = {
    method: 'get',
    headers: headers,
  };

  // Make the HTTP request
  var response = UrlFetchApp.fetch(url, options);
  var statusCode = response.getResponseCode();

  if (statusCode === 200) {
    var data = JSON.parse(response.getContentText());
    Logger.log(data);
    // insertDataIntoSheet(data);
  } else {
    Logger.log('Request failed with status code ' + statusCode);
    Logger.log(response.getContentText());
  }
}

function firstRun() {
  getDataFromApi(500000, false);
}

function triggerApi() {
  if (ADMIN == 'NA') {
    getDataFromApi(20, false);
  } else {
    getDataFromApi(20, true);
  }
}

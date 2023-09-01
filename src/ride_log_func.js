// -------------------------------------------------------------------------------------------------------------------
// Function to download a file from Telegram
// -------------------------------------------------------------------------------------------------------------------
function OCRImage(activeRow) {
  TEMP.getRange('A:A').clearContent();
  var fileId = DATA.getRange(activeRow, 1).getValue();
  var image = DriveApp.getFileById(fileId).getBlob();
  var file = { title: 'OCR', mimeType: 'image/png' };
  file = Drive.Files.update(file, DOC_ID, image, { ocr: true });
  doc = DocumentApp.openById(DOC_ID);
  var ocrText = doc.getBody().getText();
  var lines = ocrText.split('\n');
  var data = lines.map((line) => [line]);
  TEMP.getRange(1, 1, data.length, 1).setValues(data);
  doc.saveAndClose();
  var extractedData = TEMP.getRange('F3:R3').getValues();
  if (extractedData[0][0] != '#N/A') {
    extractedData[0].shift();
    DATA.getRange(activeRow, 2, 1, 12).setValues(extractedData);
    return extractedData;
  }
  // var dateValue = ocrText.match(/(\d{1,2} \w+, \d{2}:\d{2} [APap][Mm])/)[1]
  // DATA.getRange(activeRow, 2).setValue(dateValue)
  // extractAndSetValues(activeRow);
}

// // All these functions are replaced by excel functions to make it fast
// // -------------------------------------------------------------------------------------------------------------------
// // Function to get projected range
// // -------------------------------------------------------------------------------------------------------------------
// function getProjectedRange(cellValue) {
//   cellValue = String(cellValue);
//   if (!cellValue.includes('min') && !cellValue.includes('\h') && !cellValue.includes('Wh') && cellValue.includes('km')) {
//     var matches = cellValue.match(/\d+/);
//     if (matches) {
//       return matches[0];
//     }
//   }
// }

// // -------------------------------------------------------------------------------------------------------------------
// // Function to get efficiency
// // -------------------------------------------------------------------------------------------------------------------
// function getEfficiency(cellValue) {
//   cellValue = String(cellValue);
//   if (cellValue.includes(' Wh/km')) {
//     var matches = cellValue.match(/\d+(\.\d+)?/);
//     if (matches) {
//       return matches[0];
//     }
//   }
// }

// // -------------------------------------------------------------------------------------------------------------------
// // Function to get ride time
// // -------------------------------------------------------------------------------------------------------------------
// function getRideDuration(cellValue) {
//   cellValue = String(cellValue);
//   var minutesRegex = /(\d+)mins/;
//   var matches = cellValue.match(minutesRegex);
//   if (matches) {
//     return matches[1];
//   }
// }

// // -------------------------------------------------------------------------------------------------------------------
// // Function to get ride distance
// // -------------------------------------------------------------------------------------------------------------------
// function getDistance(cellValue) {
//   cellValue = String(cellValue);
//   var valueRegex = /(\d+\.\d+)\s?km(?!\/h)/;
//   var matches = cellValue.match(valueRegex);
//   if (matches) {
//     return matches[1];
//   }
// }

// // -------------------------------------------------------------------------------------------------------------------
// // Function to get top speed
// // -------------------------------------------------------------------------------------------------------------------
// function getTopSpeed(cellValue) {
//   cellValue = String(cellValue);
//   var valueRegex = /(\d+)\s?km\/h/;
//   var matches = cellValue.match(valueRegex);
//   if (matches) {
//     return matches[1];
//   }
// }

// // -------------------------------------------------------------------------------------------------------------------
// // Function to extract the text contents from the image and store in Temp sheet
// // -------------------------------------------------------------------------------------------------------------------
// function extractAndSetValues(lastRowData) {
//   var lastRowTemp = TEMP.getLastRow();
//   for (var i = 1; i <= lastRowTemp; i++) {
//     var cellValue = TEMP.getRange(i, 1).getValue();

//     var distance = getDistance(cellValue);
//     if (distance){DATA.getRange(lastRowData, 3).setValue(distance);}

//     var rideDuration = getRideDuration(cellValue);
//     if (rideDuration){DATA.getRange(lastRowData, 4).setValue(rideDuration);}

//     var efficiency = getEfficiency(cellValue);
//     if (efficiency){DATA.getRange(lastRowData, 5).setValue(efficiency);}

//     var topSpeed = getTopSpeed(cellValue);
//     if (topSpeed){DATA.getRange(lastRowData, 6).setValue(topSpeed);}

//     var projectedRange = getProjectedRange(cellValue);
//     if (projectedRange){DATA.getRange(lastRowData, 7).setValue(projectedRange);
//     }

//     // Battery usage
//     DATA.getRange(lastRowData, 8).setFormula('=C' + lastRowData + '/G' + lastRowData);
//     // Average Speed - this will vary from what Ather shows on the app
//     DATA.getRange(lastRowData, 9).setFormula('=round(C' + lastRowData + '/D' + lastRowData + '*60,2)');
//     // Range factor - to calculate weighted average range at day / month / year level
//     DATA.getRange(lastRowData, 10).setFormula('=C' + lastRowData + '*G' + lastRowData);
//     // Efficiency Factor - to calculate weighted average range at day / month / year level
//     DATA.getRange(lastRowData, 11).setFormula('=C' + lastRowData + '*E' + lastRowData);
//     // Year
//     DATA.getRange(lastRowData, 12).setFormula('=Year(B'+ lastRowData + ')');
//     // Month
//     DATA.getRange(lastRowData, 13).setFormula('=DATE(YEAR(B'+ lastRowData +'),MONTH(B'+ lastRowData +'),1)');
//     // Date
//     DATA.getRange(lastRowData, 14).setFormula('=DATE(YEAR(B'+ lastRowData +'),MONTH(B'+ lastRowData +'),DAY(B'+ lastRowData +'))');
//   }
// }

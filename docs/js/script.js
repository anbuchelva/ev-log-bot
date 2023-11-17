function validateForm(formName) {
  const form = document.getElementById(formName);
  const inputs = form.querySelectorAll('input, select, textarea');
  let isFormValid = true;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.required && !input.value) {
      isFormValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  }

  if (!isFormValid) {
    document.getElementById('alert').classList.remove('visually-hidden');
    return;
  }

  return 'true';
}

Telegram.WebApp.MainButton.onClick(() => {
  // console.log(title);
  if (title == 'Edit_Ride_Log') {
    var validationStatus = validateForm('edit-ride-log');
    if (validationStatus) {
      var rideLogDataEdited = {
        date_time: dt.value,
        distance: di.value,
        duration: du.value,
        efficiency: ef.value,
        top_speed: ts.value,
        avg_speed: as.value,
        range: pr.value,
        source: sr.value,
        destination: de.value,
        chat_id: cid.value,
        message_id: mid.value,
      };
      Telegram.WebApp.sendData(JSON.stringify(rideLogDataEdited));
    }
  } else if (title == 'Add_Ride_Log') {
    var validationStatus = validateForm('add-ride-log');
    if (validationStatus) {
      var rideLogDataNew = {
        date_time: dt.value,
        distance: di.value,
        duration: du.value,
        efficiency: ef.value,
        top_speed: ts.value,
        avg_speed: as.value,
        range: pr.value,
        source: sr.value,
        destination: de.value,
      };
      Telegram.WebApp.sendData(JSON.stringify(rideLogDataNew));
    }
  }
});

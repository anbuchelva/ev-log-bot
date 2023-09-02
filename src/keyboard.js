var chartsDailyKeyboard = {
  inline_keyboard: [
    [
      { text: '↔️ 🆚 ➡️', callback_data: 'distance_vs_range' },
      { text: '↔️ 🆚 🎯', callback_data: 'distance_vs_efficiency' },
      { text: '↔️ 🆚 🔋', callback_data: 'distance_vs_battery_km' },
    ],
    [
      { text: '🪫 / 📅', callback_data: 'battery_per_day' },
      { text: '🚀 🆚 🛵', callback_data: 'top_vs_avg_speed' },
    ],
  ],
};

var chartsMonthlyKeyboard = {
  inline_keyboard: [
    [
      { text: '↔️ 🆚 ➡️ ', callback_data: 'distance_vs_range_mon' },
      { text: '↔️ 🆚 🎯', callback_data: 'distance_vs_efficiency_mon' },
      { text: '↔️ 🆚 🔋', callback_data: 'distance_vs_battery_km_mon' },
    ],
    [
      { text: '🪫 / 🗓️', callback_data: 'battery_per_mon' },
      { text: '🚀 🆚 🛵', callback_data: 'top_vs_avg_speed_mon' },
    ],
  ],
};

var editEntry = {
  inline_keyboard: [
    [
      { text: '✏️ Edit', callback_data: 'edit_entry' },
      { text: '🗑️ Delete', callback_data: 'delete_entry' },
    ],
  ],
  resize_keyboard: true,
};

var deleteDataKeyboard = {
  inline_keyboard: [
    [
      { text: '✅ Yes', callback_data: 'delete_all' },
      { text: '❌ No', callback_data: 'delete_none' },
    ],
  ],
  resize_keyboard: true,
};

var manageData = {
  inline_keyboard: [
    [
      { text: '⬇️ Download', callback_data: 'download_all' },
      { text: '🗑️ Delete', callback_data: 'delete_all' },
    ],
  ],
  resize_keyboard: true,
};

var deRegister = {
  inline_keyboard: [
    [
      { text: '✅ Yes', callback_data: 'deregister_yes' },
      { text: '❌ No', callback_data: 'deregister_no' },
    ],
  ],
  resize_keyboard: true,
};

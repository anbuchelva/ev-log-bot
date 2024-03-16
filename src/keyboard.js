var chartsDailyKeyboard = {
  inline_keyboard: [
    [
      { text: '➡️ Range', callback_data: 'distance_vs_range' },
      { text: '🎯 Efficiency', callback_data: 'distance_vs_efficiency' },
      { text: '🔋 SOC%/Km', callback_data: 'distance_vs_battery_km' },
    ],
    [
      { text: '🪫 SOC%/Day', callback_data: 'battery_per_day' },
      { text: '🚀 Speed', callback_data: 'top_vs_avg_speed' },
      { text: '💰 Savings', callback_data: 'savings' },
    ],
    [
      { text: '🏁 Ride Pattern', callback_data: 'ride_pattern' },
      { text: '📯 Horn', callback_data: 'horn_count' },
    ],
    [
      { text: '⚡ Drive Mode', callback_data: 'driving_mode' },
      { text: '🛵 Best Mode', callback_data: 'best_mode' },
      { text: '📆 Summary', callback_data: 'daily_summary' },
    ],
  ],
};

var chartsWeeklyKeyboard = {
  inline_keyboard: [
    [
      { text: '➡️ Range', callback_data: 'distance_vs_range_wk' },
      { text: '🎯 Efficiency', callback_data: 'distance_vs_efficiency_wk' },
      { text: '🔋 SOC%/Km', callback_data: 'distance_vs_battery_km_wk' },
    ],
    [
      { text: '🪫 SOC%/Wk', callback_data: 'battery_per_wk' },
      { text: '🚀 Speed', callback_data: 'top_vs_avg_speed_wk' },
      { text: '💰 Savings', callback_data: 'savings_wk' },
    ],
    [
      { text: '🏁 Ride Pattern', callback_data: 'ride_pattern_wk' },
      { text: '📯 Horn', callback_data: 'horn_count_wk' },
    ],
    [
      { text: '⚡ Drive Mode', callback_data: 'driving_mode_wk' },
      { text: '🛵 Best Mode', callback_data: 'best_mode' },
      { text: '📆 Summary', callback_data: 'weekly_summary' },
    ],
  ],
};

var chartsMonthlyKeyboard = {
  inline_keyboard: [
    [
      { text: '➡️ Range', callback_data: 'distance_vs_range_mon' },
      { text: '🎯 Efficiency', callback_data: 'distance_vs_efficiency_mon' },
      { text: '🔋 SOC%/Km', callback_data: 'distance_vs_battery_km_mon' },
    ],
    [
      { text: '🪫 SOC%/Mon', callback_data: 'battery_per_mon' },
      { text: '🚀 Speed', callback_data: 'top_vs_avg_speed_mon' },
      { text: '💰 Savings', callback_data: 'savings_mon' },
    ],
    [
      { text: '🏁 Ride Pattern', callback_data: 'ride_pattern_mon' },
      { text: '📯 Horn', callback_data: 'horn_count_mon' },
    ],
    [
      { text: '⚡ Drive Mode', callback_data: 'driving_mode_mon' },
      { text: '🛵 Best Mode', callback_data: 'best_mode' },
      { text: '📆 Summary', callback_data: 'monthly_summary' },
    ],
  ],
};

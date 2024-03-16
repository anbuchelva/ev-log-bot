const USER_PROPERTIES = PropertiesService.getScriptProperties();
const VIN = USER_PROPERTIES.getProperty('VIN');
const TOKEN = USER_PROPERTIES.getProperty('TOKEN');
const SSID = USER_PROPERTIES.getProperty('SSID');
const SLIDE_ID = USER_PROPERTIES.getProperty('SLIDE_ID');
const BOT_TOKEN = USER_PROPERTIES.getProperty('BOT_TOKEN');
const MAPS_KEY = USER_PROPERTIES.getProperty('MAPS_KEY');
const ADMIN = USER_PROPERTIES.getProperty('ADMIN');
const TELEGRAM_URL = 'https://api.telegram.org/bot' + BOT_TOKEN + '/';
const WEBHOOK_URL = USER_PROPERTIES.getProperty('WEBHOOK_URL');
const ALLOWED_USER_IDS = USER_PROPERTIES.getProperty('ALLOWED_USER_IDS');
const GSHEETS = SpreadsheetApp.openById(SSID);
var AUTO_TRIGGER = USER_PROPERTIES.getProperty('AUTO_TRIGGER');
const SOC_CAPACITY = parseInt(USER_PROPERTIES.getProperty('SOC_CAPACITY'));

const DATA = GSHEETS.getSheetByName('data');
const SUMMARY = GSHEETS.getSheetByName('summary');
const BEST_MODE = GSHEETS.getSheetByName('BM');
const LOG = GSHEETS.getSheetByName('logs');
const OPTIONS = GSHEETS.getSheetByName('options');
const TRIP_SPEED = GSHEETS.getSheetByName('TS');


const DISTANCE_RANGE = GSHEETS.getSheetByName('D_DR');
const DISTANCE_EFFICIENCY = GSHEETS.getSheetByName('D_DE');
const DISTANCE_BATTERY = GSHEETS.getSheetByName('D_DSK');
const BATTERY = GSHEETS.getSheetByName('D_DS');
const TOP_AVG_SPEED = GSHEETS.getSheetByName('D_TA');
const BRAKING_NON = GSHEETS.getSheetByName('D_DB');
const RIDE_PATTERN = GSHEETS.getSheetByName('D_RP');
const HORN_COUNT = GSHEETS.getSheetByName('D_DH');
const SAVINGS = GSHEETS.getSheetByName('D_S');
const DAILY_SUMMARY = GSHEETS.getSheetByName('DS');

const DISTANCE_RANGE_MONTH = GSHEETS.getSheetByName('M_DR');
const DISTANCE_EFFICIENCY_MONTH = GSHEETS.getSheetByName('M_DE');
const DISTANCE_BATTERY_MONTH = GSHEETS.getSheetByName('M_DSK');
const BATTERY_MONTH = GSHEETS.getSheetByName('M_DS');
const TOP_AVG_SPEED_MONTH = GSHEETS.getSheetByName('M_TA');
const RIDE_PATTERN_MONTH = GSHEETS.getSheetByName('M_RP');
const DRIVING_MODE_MONTH = GSHEETS.getSheetByName('M_DM');
const HORN_COUNT_MONTH = GSHEETS.getSheetByName('M_DH');
const SAVINGS_MONTH = GSHEETS.getSheetByName('M_S');
const MONTHLY_SUMMARY = GSHEETS.getSheetByName('MS');

const DISTANCE_RANGE_WK = GSHEETS.getSheetByName('W_DR');
const DISTANCE_EFFICIENCY_WK = GSHEETS.getSheetByName('W_DE');
const DISTANCE_BATTERY_WK = GSHEETS.getSheetByName('W_DSK');
const BATTERY_WK = GSHEETS.getSheetByName('W_DS');
const TOP_AVG_SPEED_WK = GSHEETS.getSheetByName('W_TA');
const RIDE_PATTERN_WK = GSHEETS.getSheetByName('W_RP');
const DRIVING_MODE_WK = GSHEETS.getSheetByName('W_DM');
const HORN_COUNT_WK = GSHEETS.getSheetByName('W_DH');
const SAVINGS_WK = GSHEETS.getSheetByName('W_S');
const WEEKLY_SUMMARY = GSHEETS.getSheetByName('WS');

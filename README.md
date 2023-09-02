# ev-log-bot

bot link: https://t.me/ev_log_bot

1. A sample google sheet is available in this path: https://docs.google.com/spreadsheets/d/1O3M90Cxz9u4Rpoqn0gc0zX4f9UdTjii80s8wr0eNSxs/edit?usp=sharing
2. Instructions to setup the bot is given here: https://blog.anbuchelva.in/blog/collect-ather-logs-to-google-sheets/
3. There are few changes compared to the above instructions, especially on the **Script Properties**

## Script Properties

The following Script Properties to be set on the demo file.

| Variable / Property | Value                                                             | Remarks                                                    |
| :------------------ | :---------------------------------------------------------------- | :----------------------------------------------------------|
| ADMIN               | Your Telegram ID                                                  | A numeric Value                                            |
| ALLOWED_USER_IDS    | Your Telegram ID + If you want someone else to access your bot    | A numeric Value                                            |
| SSID                | ID of the sample google sheet after making a copy                 | Get it from Address bar. Only the ID not the URL           |
| DRIVE_FOLDER_ID     | Create a folder in Google Drive and update the ID here            | Get it from Address bar. Only the ID not the URL           |
| DOC_ID              | Create a Doc file in Google Drive and update the ID here          | Get it from Address bar. Only the ID not the URL           |
| SLIDE_ID            | Create a slide from Google Drive and update the ID here           | Get it from Address bar. Only the ID not the URL           |
| WEBHOOK_URL         | Read the instructions from blog post                              | Keep it safe, do not share it with anyone.                 |
| bot_token           | Your telegram bot token form BotFather                            | Keep it safe, don't share it withanyone.                   |
| GROUP_CHECK         | false                                                             | Not required if you are not mainting a group               |
| GROUP_ID            | NA                                                                | Not required if you are not mainting a group               |
| DRIVE_ID_USER_DATA  | NA                                                                | Not required if you are not mainting a group               |
| LOG                 | false                                                             | It will fill up the sheets, used only for debugging purpose|
| RUN_DATE_UPDATED    | 0                                                                 | This will get updated automatically                        |
| RUN_TIME_COUNT      | 0                                                                 | This will get updated automatically                        |
| RUN_TIME_MSEC       | 0                                                                 | This will get updated automatically                        |

for any help contact https://t.me/ather_india (not affiliated with Ather Energy).

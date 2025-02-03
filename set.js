const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEIvaWtlRFc0MU0zT0NGdGJsVk14UnZ6NTk0bFB2d2JvT0cxSHBwaGFraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibE96U3NoYUd3Vm1Fa3pxYmM3RUkwdzdhdUZieHhLRVh5UlRBeHM0WnRnYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRlVTay90WC95Mmt2YW81amw0UlhMVVhHckVnR1U3RW1wWi9Sd2hvVDBJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJERHI2MnhqVVhlSUx6Q2RudXdXeWpaY25BYW04VURmaWtmczVyUzl3SXhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNISXRRUzNEU3Q0N2tSbmFSeG1qTy9GTm02N3IzQjZRWnlBQjc1RCtDbDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhnZldnSlljRmsvOFgzdDNTM2wwTHhaSTR6aTBDaDRnWW5jOTM3dHZ4WE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0lQVjNVWTJzYmpsRUhXRXFJWFRDbVBNRE1TU2l5MlFUQUJOKzREQm9rdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUZQSm1IVE42Y2FrSFIrTEU1eW9SYXdPaXpOZWV2NnNKUjM4UWlBSU5CZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldxeFVvQ3VQOCtoaXhxcDJsOEtVQVBxVkZDeGF3VzkvQStBcmlkRlMxM2dVa0hwdGRKai9VcWkzbXlKTFc5TDBOY0IzdjhmVG8wL0lOMm1Ka2RSWkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA2LCJhZHZTZWNyZXRLZXkiOiJZbERTa3JrK3hXYmtUZnoya3N6M0lhN2ZydmFkUkFiQUpCQXZGYTFFK2RzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUZ3dCTl9oRVFmR1NWUkRXLWtpY2tnIiwicGhvbmVJZCI6IjdlYmNjNTk5LWZmZTMtNGExZC04ZThhLTEzYzE0N2VjNjE3OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYOTlTVStLeVB2bzZiakxvZkk0YlpqQTBDMGc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2JmV1Z3SjFmOWltejhrSTVFQyt0RW1NSHJvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZCVjZWRjRSIiwibWUiOnsiaWQiOiIyNTQ3MDgyNzI2NDQ6NjVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ttam9PRURFTWZzaEwwR0dCOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImNoRSt3YjRPSEdvNkhBQXQ5L0F1cHQwUThhS0lnMVVUSDlwN0hWWjVXd2c9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImFxaStKKy9oQUliRk5TS2s4cURqZmJoRW5CcUQ5bDBISk5TSmlCVDFIVis5Q1JRRzc3dkNmcUVwNWtIdDhBZ250MlZvUXNKV01WdFpNVVpoY3NScENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJmOEhBeUpCVWc2RnNNQU9icTh6TGwrMTRhSC9tM080WjhNNWpMVEJqcitKNFJscFdGZFR0eG56ZXAxQUF4NXhuVTRvOWY5akVjSVZwZGt6bDFOSmFEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwODI3MjY0NDo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYSVJQc0crRGh4cU9od0FMZmZ3THFiZEVQR2lpSU5WRXgvYWV4MVdlVnNJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4NjE4NDUzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1RYyJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Khalik",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254708272644",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

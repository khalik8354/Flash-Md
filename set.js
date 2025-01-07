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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0t1VEZaaUFqTGNlSmU1aklUV0lNM29xbmI0ZmowTjdiZllpOXNXcVFWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEdmZjhGaW43QVRRSXhDWlh4TWNFeTFNb2JpeFgydGJqK3ZHZkV5R2FtMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTUpNaE92UytMN1ZUeUIyQkVDZjhDN1l6S3pXMUZ6cWFkTmM2QWx5TkhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJueGpuWkEzYkZLc3pnejkza1lUSHN6S2tQSnNqdCtEVDFQZGRpMmVnN25BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9Oa01xYmc0WXhvZ3RBdjNtN0tXOVR0REVsc2dscVJHWU41Mi9mS1lPM2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQvNW9KazZHSHN2YTVlTUtQeE1sZDR3MUxuWWhxMjhVeURqYUJaZXI4QW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUNrTi9OcmFIYkFTUllRaTZqNTZnaWNQYWI5Yi9QZkpvd2JLdDNhQkYyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHpqeFBXYXFDc1lLV3V1S2V1bG1DWFdiV0J2dXVCMVduTmovMFBSZk9sdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk2MHZVZTFONE9Rb2hsMGhWZndvV0xzL0dMNE53TThpWUJ5Z3NpVVJjMEZMYmxPZkhyeEh3ZzFXc1c5a0RIVmZSRzlRWVBSNHFpNjZLalVoRVM3VUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJoN2ZyZXNUNmV4QjNKb1drbzV4QThVZmw2THNmakt4Vm5GVms3SjJTK1RFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcwODI3MjY0NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJERTc1RTFBRkVFQzVCNzVBNDBEQTNCRjI5NEU4NDBCMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM2MjMyODA3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MDgyNzI2NDRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTUzMjczRUMzQjlCMTMyOTVEMDA1OUI2QTlFRDU0NkIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNjIzMjgwN31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibkZPRHlVa2VRTUdycHFlLU9fVUtKQSIsInBob25lSWQiOiI1OWI1MTcxNS03NjU5LTQwOGItOTNkZS1lMWFiZGYxNGM2MjQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWZvdXBDa3J5VHNya0d2VGZRbEJQQWpUYVVnPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZyK0RNakt1T2N3M2I2WDZJNGNsdGNMdjB2ST0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJSMUtIMkNKTSIsIm1lIjp7ImlkIjoiMjU0NzA4MjcyNjQ0OjUzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IktoYWxpayJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS21qb09FREVOU2U4N3NHR0JNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiY2hFK3diNE9IR282SEFBdDkvQXVwdDBROGFLSWcxVVRIOXA3SFZaNVd3Zz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicllNa3BkSnpIZVNLZTZNNFFkYi9CaUxxUTBoRjNwaHdOd1RTTjNzMkRNOStRWkNKNytxWmNud0p1WFZOeUJaelY0ZXVCc3BiTitWSjIvVm1zMVhWREE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVVT3ZDS0JhcUZRNjk3SWxKRkZHbjEwTzdQZU5xc243VGdwTVVvYzFYN1BZekk2YUpxTXJIMVdLamF1b1pad3JGRk9uT0xSV0QzYkI2R0w5cXFQYkJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzA4MjcyNjQ0OjUzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhJUlBzRytEaHhxT2h3QUxmZndMcWJkRVBHaWlJTlZFeC9hZXgxV2VWc0kifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzYyMzI4MDEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTVFjIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Khalik🧡",
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

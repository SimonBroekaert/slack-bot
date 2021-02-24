"use strict";

require('dotenv').config();

const cronHandler = require('./_cronHandler');
const postController = require('./_postController');

cronHandler.schedule().then(() => {
    console.log('[TASK] Scheduled cron jobs successfully');
}).catch((error) => {
    console.error("an error occured");
});

postController.create().catch((error) => {
    console.warn(error);
});
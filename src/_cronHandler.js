const cron = require("node-cron");
const postController = require('./_postController');

module.exports = {
    schedule() {
        return new Promise((resolve, reject) =>{
            try {
                // Schedule for 11:00
                cron.schedule("0 11 * * *", () => {
                    postController.create().catch((error) => {
                        console.warn(error);
                    });
                });
            
                // Schedule for 15:30
                cron.schedule("30 15 * * *", () => {
                    postController.create().catch((error) => {
                        console.warn(error);
                    });
                });
        
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
};
const axios = require('axios').default;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = {
    create() {
        return new Promise(() => {
            return this.fetch().then((response) => {
                return this.handle(response.data);
            }).then((post) => {
                return this.post(post);
            });
        });
    },

    fetch() {
        return axios.get(process.env.POST_SOURCE);
    },

    handle(html) {
        return new Promise((resolve, reject) => {
            const dom = new JSDOM(html);
            const document = dom.window.document;
            const article = document.querySelector(`article.${process.env.POST_HTML_CLASS}`);
            const title = article.querySelector(`.${process.env.POST_HTML_TITLE_CLASS}`);
            const media = article.querySelector('video');

            if (media == null || title == null) {
                reject('No good post found');
            }

            let gif = null;
            media.querySelectorAll('object').forEach((object) => {
                if (object.getAttribute('type') == 'image/gif') {
                    gif = object.getAttribute('data');
                }
            });

            resolve({
                title: title.textContent,
                gif,
            });
        });
    },

    post(post) {
        return axios.post(process.env.SLACK_API_ENDPOINT, {
            text: 'Random programming image/GIF of the day',
            blocks: [
                {
                    type: 'image',
                    title: {
                        type: 'plain_text',
                        text: post.title,
                    },
                    image_url: post.gif,
                    alt_text: post.title,
                }
            ],
        })
    }
};
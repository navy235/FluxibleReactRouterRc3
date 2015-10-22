var createStore = require('fluxible/addons/createStore');
var NewsStore = createStore({
    storeName: 'NewsStore',
    handlers: {
        'LOAD_NEWS': 'loadNews',
    },
    initialize: function () {
        this.news = [];
    },
    loadNews: function (res) {
        this.news = res.data;
        this.emitChange();
    },
    getNews: function () {
        return this.news;
    },
    dehydrate: function () {
        return {
            news: this.news,
        };
    },
    rehydrate: function (state) {
        this.news = state.news;
    }
});

module.exports = NewsStore;

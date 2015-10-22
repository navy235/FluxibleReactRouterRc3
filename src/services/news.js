var news = [
    {title: 'News title 0', content: 'News Content0'},
    {title: 'News title 1', content: 'News Content1'},
    {title: 'News title 2', content: 'News Content2'},
    {title: 'News title 3', content: 'News Content3'}
];

var NewsService = {
    name: 'news',
    read: function (req, resource, params, config, callback) {
        callback(null, news);
    }
}

module.exports = NewsService
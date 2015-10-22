var NewsActions = {};
NewsActions.LoadNews = function (context, payload, done) {
    var endpoint = 'news';
    console.log('LOAD_NEWS');
    context.service.read(endpoint, payload, {}, function (err, res) {
        context.dispatch('LOAD_NEWS', {
            data: res,
        });
        done();
    });
};

module.exports = NewsActions;
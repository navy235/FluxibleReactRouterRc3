var AuthStore = require('../stores/AuthStore')
var AuthActions = {};
AuthActions.LoadSession = function (context, payload, done) {
    var endpoint = 'user';
    context.service.read(endpoint, payload, {}, function (err, res) {
        context.dispatch('LOAD_SESSION', {
            data: res,
            save: saveOpts
        });
        done();
    });
};
AuthActions.SignIn = function (context, payload, done) {
    context.dispatch('SIGN_IN_START');
    context.service.update('user', payload, {}, function (err, user) {
        if (user == null || err) {
            context.dispatch('SIGN_IN_FAILURE', err);
            done();
            return;
        }
        context.dispatch('SIGN_IN_SUCCESS', user);
        done();
    });
};
module.exports = AuthActions;
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: require('./routes')
});

app.plug(fetchrPlugin({
    xhrPath: '/api',
    xhrTimeout:30000
}));

app.registerStore(require('./stores/AuthStore'))
app.registerStore(require('./stores/NewsStore'))

module.exports = app;

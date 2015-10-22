var concurrent = require('contra').concurrent;
var Promise = require("bluebird");
var _ = require('lodash');

function fetchData(context, routerState, cb) {
    cb = cb || function noop() {
        };
    var fetchDataRoutes = _.filter(routerState.components, function (component) {
        return component.fetchData;
    });
    if (fetchDataRoutes.length === 0) {
        return cb();
    }
    var dataFetchers = _.reduce(fetchDataRoutes, function (result, component) {
        var fetcher = component.fetchData
            .bind(null, context, routerState.params, routerState.location.query);
        var name = component.name || component.displayName;
        result[name] = fetcher;
        return result;
    }, {});

    //var dataFetchers = fetchDataRoutes.map(function (component) {
    //    return component.fetchData(context, routerState.params, routerState.location.query);
    //});
    ////console.log(dataFetchers);
    //Promise.all(dataFetchers).then(cb);
    concurrent(dataFetchers, cb);
}

module.exports = fetchData;

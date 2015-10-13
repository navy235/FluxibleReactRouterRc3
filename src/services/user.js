/**
 * Created by navy on 2015/10/12.
 */

var UserService = {
    name: 'user',
    read: function (req, resource, params, config, callback) {
        var user = {
            username: 'admin'
        }
        callback(null, null);
    },
    update: function (req, resource, params, body, config, callback) {
        var account = `${params.username},${params.password}`;
        if (account == 'admin,admin') {
            callback(null, {
                username: params.username
            });
        }
        else {
            callback(null, null);
        }
    }
}

module.exports = UserService
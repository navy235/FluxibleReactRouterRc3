var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({
    storeName: 'AuthStore',

    handlers: {
        'LOAD_SESSION': 'loadSession',
        'SIGN_IN_START': 'signInStart',
        'SIGN_IN_FAILURE': 'signInFailure',
        'SIGN_IN_SUCCESS': 'signIn',
    },
    initialize: function () {
        this.userProfile = null;
        this.signingIn = false;
        this.signInError = false;
    },
    loadSession: function (res) {
        this.userProfile = res.data;
        this.emitChange();
    },
    signInStart: function () {
        this.signingIn = true;
        this.signInError = false;
        this.userProfile = null;
        this.emitChange();
    },
    signInFailure: function (error) {
        this.signingIn = false;
        this.signInError = true;
        this.emitChange();
    },

    signIn: function (userProfile) {
        this.signingIn = false;
        this.signInError = false;
        this.userProfile = userProfile;
        this.emitChange();
    },
    isAuthenticated: function () {
        return this.userProfile != null;
    },
    getUserProfile: function () {
        return this.userProfile;
    },
    getSignInError: function () {
        return this.signInError;
    },

    isSigningIn: function () {
        return this.signingIn;
    },

    dehydrate: function () {
        return {
            userProfile: this.userProfile,
            signingIn: this.signingIn,
            signInError: this.signInError,
        };
    },
    rehydrate: function (state) {
        this.userProfile = state.userProfile;
        this.signingIn = state.signingIn;
        this.signInError = state.signInError;
    }
});

module.exports = AuthStore;

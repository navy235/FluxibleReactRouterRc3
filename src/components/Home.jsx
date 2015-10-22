import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
import {concurrent} from 'contra';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import AuthStore from '../stores/AuthStore';
import NewsStore from '../stores/NewsStore';
import AuthActions from '../actions/AuthActions';
import NewsActions from '../actions/NewsActions';


let Home = React.createClass({

    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [
            NewsStore
        ],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, NewsActions.LoadNews, {})
            ], done)
        }
    },
    getInitialState() {
        return this.getStateFromStores();
    },
    getStateFromStores() {
        var newsStore = this.getStore(NewsStore);
        return {
            news: newsStore.getNews()
        };
    },
    onChange: function () {
        var states = this.getStateFromStores();
        this.setState(states);
    },
    render() {
        return (
            <div id="home">
                <h3>Home Page</h3>
                <ul>
                    {this.state.news.map((item, index)=> {
                        return <li key={index}>{item.title}</li>
                    })}
                </ul>
            </div>
        )
    }
})

export default  Home;
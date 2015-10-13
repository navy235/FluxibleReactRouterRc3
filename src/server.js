import express from 'express'
import session from 'express-session'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import serialize from 'serialize-javascript'
import cors from 'cors'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString,renderToStaticMarkup } from 'react-dom/server'
import { match, RoutingContext,Router } from 'react-router'
import assets from './utils/assets'
import Html from './components/Html'
import createRoutes from './routes';
import app from './app';
import apiService  from './services';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import AuthActions from './actions/AuthActions';

let server = express();

let fetchrPlugin = app.getPlugin('FetchrPlugin');

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(cors());

server.use(express.static(path.join(__dirname, 'public')));

fetchrPlugin.registerService(apiService.user);
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use((req, res) => {

    var context = app.createContext({
        req: req,
        res: res
    });

    let routes = createRoutes(null, context);
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    context.getActionContext().executeAction(AuthActions.LoadSession, {}, ()=>{
        match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
            if (error) {
                res.send(500, error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                var exposed = 'window.__DATA__=' + serialize(app.dehydrate(context));
                var doctype = '<!DOCTYPE html>';
                var markup = renderToString(React.createElement(
                    FluxibleComponent,
                    {context: context.getComponentContext()},
                    <RoutingContext {...renderProps} />
                ));
                var html = renderToStaticMarkup(<Html assets={assets} markup={markup} exposed={exposed}/>)
                res.send(doctype + html);
            } else {
                res.send(404, 'Not found')
            }
        })
    })

})

export default server

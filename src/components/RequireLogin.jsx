import {Component} from 'react';

export default class RequireLogin extends Component {
    static onEnter(store) {
        return (nextState, replaceState) => {
            console.log(replaceState);
            replaceState(null, '/')
        };
    }
    render() {
        return this.props.children;
    }
}

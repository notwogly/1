import * as React from 'react';
import { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { WrappedLoginForm } from './LoginForm';

export default class LoginPageComponent extends Component<{ dispatch: any }> {
    render() {
        return (
            <div>
                <WrappedLoginForm dispatch={this.props.dispatch} />
            </div>
        );
    }
};

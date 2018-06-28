import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { WrappedRegisterForm } from './RegisterForm';
import { Link } from 'dva/router';

export default class RegisterPageComponent extends Component<any> {
    render() {
        return (
            <div>
                <WrappedRegisterForm dispatch={this.props.dispatch} />
            </div>
        );
    }
}

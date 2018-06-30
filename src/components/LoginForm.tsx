import {Component, FormEvent} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';
import { Link } from 'dva/router';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
}

export class LoginFormData {
    email: string;
    pwd: string;
}

export class LoginForm extends Component<FormProps, LoginFormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: LoginFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            this.props.dispatch({type:'login/login', payload: values});
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 20},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
        };
        return (
            <Form  style ={{textAlign: 'center', height: '100%'}}
                onSubmit={this.handleSubmit}>
                <FormItem label="邮箱"  style={{ paddingTop: '100px'}}{...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('email', {
                            rules: [
                                {required: true, message: '请输入邮箱'}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 20}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="密码" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('pwd', {
                            rules: [
                                {required: true, message: '请输入密码'}
                            ]
                        })(
                            <Input type="password" prefix={<Icon type="unlock" style={{fontSize: 20}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem >
                    <Button icon="copy" type="primary" htmlType="submit" style={{alignItems: 'center'}}>登录</Button>
                </FormItem>
                <FormItem >没有账号？
                    <Link to="/register" style={{alignItems: 'center'}}>注册新账号</Link>
                </FormItem>
            </Form>
        );
    }
}

const WrappedLoginForm: any = Form.create({})(LoginForm);

export {WrappedLoginForm};

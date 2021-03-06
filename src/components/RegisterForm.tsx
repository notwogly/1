
import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Select} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
}

export class RegisterFormData {
    email: string;
    pwd: string;
}

export default class RegisterForm extends Component<FormProps, RegisterFormData> {

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: RegisterFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            this.props.dispatch({type:'register/register', payload: values});
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Form style={{marginTop: '100px', textAlign: 'center'}} onSubmit={this.handleSubmit}>
                <FormItem label="邮箱" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('email', {
                            rules: [
                                {required: true, message: '请输入邮箱'},
                                {pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/, message:'请输入符合格式要求的邮箱'}
                            ]
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="密码" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('pwd', {
                            rules: [
                                {required: true, message: '请输入密码'},
                                {pattern: /^[a-zA-Z0-9]{6}[a-zA-Z0-9]?$/, message:'请输入至少六个字符'}
                            ]
                        })(
                            <Input prefix={<Icon type="unlock" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">注册</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegisterForm: any = Form.create({})(RegisterForm);

export {WrappedRegisterForm};

import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Form, Input, Button, Select, Checkbox, Radio, Tooltip, Icon,} from 'antd';
import DvaProps from '../types/DvaProps';
import { Link } from 'dva/router';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

interface SettingFormProps extends DvaProps {
    form: any;
    dataSource: any;
}

export  class VocabSettingForm extends Component<SettingFormProps> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Form layout={"horizontal"} onSubmit={this.handleSubmit} style={{margin: 'auto'}}>
                    <FormItem
                        {...formItemLayout}
                        label="正在学习： "
                        style={{marginTop:'30px'}}
                    >
                        <p className="ant-form-text" id="bookName">六级词汇</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="每日学习量： "
                        help ="每天学习的单词数"
                    >
                        {getFieldDecorator('dailyNum', {initialValue: '50'})(
                            <Select  style={{width: 200}} >
                                <Option value= {20}>20</Option>
                                <Option value= {50}>50</Option>
                                <Option value= {60}>60</Option>
                                <Option value= {70}>70</Option>
                                <Option value= {80}>80</Option>
                                <Option value= {90}>90</Option>
                                <Option value= {100}>100</Option>
                                <Option value= {200}>200</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedVocabSettingForm: any = Form.create({})(VocabSettingForm);

export {WrappedVocabSettingForm};

export  class UserSettingForm extends Component<SettingFormProps> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    };

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Form layout={"horizontal"} onSubmit={this.handleSubmit} style={{margin: 'auto'}}>
                    <FormItem
                        {...formItemLayout}
                        style={{marginTop:'30px'}}
                        label="用户名">3111111@123.com
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="昵称">
                        <Input
                            {...getFieldProps('name', { initialValue: '小黄人' })}
                            placeholder="请输入昵称" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别">
                        <RadioGroup {...getFieldProps('gender', { initialValue: 'female' })}>
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="个人简介"
                        help="介绍一下你自己"
                    >
                        <Input type="textarea" placeholder="我爱背单词..." {...getFieldProps('introduce', { initialValue: '' })} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedUserSettingForm: any = Form.create({})(UserSettingForm);

export {WrappedUserSettingForm};
import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Form, Input, Button, Card, } from 'antd';
import DvaProps from '../types/DvaProps';
import { Link } from 'dva/router';
import {NavigationBar} from './PublicComponents';

const FormItem = Form.Item;

export interface VocabDetailFormProps extends DvaProps {
    form: any;
    vocabDetail: any;
    location: any;
}

export  class SettingForm extends Component<VocabDetailFormProps> {
    constructor(props) {
        super(props);
        //console.log(this.props.location.query);
        this.props.dispatch({type: "study/getVocabDetail", payload: this.props.location.query})
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <NavigationBar current={"study"} dispatch={this.props.dispatch}/>
                <Form layout={"horizontal"} style={{margin: 'auto'}}>
                    <FormItem
                        {...formItemLayout}
                        label="正在学习： "
                        style={{marginTop:'30px'}}>
                        <p className="ant-form-text" id="bookName">{this.props.vocabDetail.word}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="单词解释： ">
                        <Card style={{ width: 300 }}>
                            <p>{this.props.vocabDetail.interpretation}</p>
                        </Card>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="例句： ">
                        <Card style={{ width: 300 }}>
                            <p>{this.props.vocabDetail.exampleSen}</p>
                        </Card>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Link to="study">
                            <Button htmlType="submit" icon="right">下一个</Button>
                        </Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedDetailForm: any = Form.create({})(SettingForm);

export {WrappedDetailForm};
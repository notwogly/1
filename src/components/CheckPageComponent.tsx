import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import {Button, message, Modal, Progress} from 'antd';
import DvaProps from '../types/DvaProps';
import { Row, Col } from 'antd';
import {NavigationBar} from './PublicComponents';

interface CheckProps extends DvaProps {
    vocabDetail: any;
    dataSource: any;
    rightSelection: number;
}

interface ViewState {
    refresh: boolean;
}

export  default class CheckComponent extends Component<CheckProps, ViewState> {
    constructor(props) {
        super(props);
        this.state = {
            refresh : false,
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);
        this.handleSubmit4 = this.handleSubmit4.bind(this);
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        if(this.props.rightSelection == 0)
            message.success('选择正确');
        else
            message.error('选择错误');
        this.props.dispatch({type:'check/getUserCheckInfo'});
        this.setState({refresh: true});
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        if(this.props.rightSelection == 1)
            message.success('选择正确');
        else
            message.error('选择错误');
        this.props.dispatch({type:'check/getUserCheckInfo'});
        this.setState({refresh: true});
    }

    handleSubmit3 = (e) => {
        e.preventDefault();
        if(this.props.rightSelection == 2)
            message.success('选择正确');
        else
            message.error('选择错误');
        this.props.dispatch({type:'check/getUserCheckInfo'});
        this.setState({refresh: true});
    }

    handleSubmit4 = (e) => {
        e.preventDefault();
        if(this.props.rightSelection == 3)
            message.success('选择正确');
        else
            message.error('选择错误');
        this.props.dispatch({type:'check/getUserCheckInfo'});
        this.setState({refresh: true});
    }

    render() {
        return (
            <div>
                <NavigationBar current={"check"} dispatch={this.props.dispatch}/>
                <div style={{ margin: 'auto', backgroundColor: '#ffffff'}}>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{ marginTop: '30px' }}>
                            <div style={{ textAlign: 'center',fontSize: '100px', color: 'Navy' }}>{this.props.vocabDetail.word}</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col><Button
                                icon="check"
                                htmlType="submit"
                                style={{width: '400px'}}
                                onClick={this.handleSubmit1}>{this.props.dataSource[0]}
                            </Button></Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col><Button
                            icon="check"
                            htmlType="submit"
                            style={{width: '400px'}}
                            onClick={this.handleSubmit2}>{this.props.dataSource[1]}
                        </Button></Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col><Button
                            icon="check"
                            htmlType="submit"
                            style={{width: '400px'}}
                            onClick={this.handleSubmit3}>{this.props.dataSource[2]}
                        </Button></Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{marginBottom: '10px'}}><Button
                            icon="check"
                            htmlType="submit"
                            style={{width: '400px'}}
                            onClick={this.handleSubmit4}>{this.props.dataSource[3]}
                        </Button></Col>
                    </Row>
                    <br/>
                </div>
            </div>
        );
    }
}

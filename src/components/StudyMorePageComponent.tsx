import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Icon, Form, Button, Input, message, Progress } from 'antd';
import DvaProps from '../types/DvaProps';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';
import {NavigationBar} from './PublicComponents';

interface StudyMoreProps extends DvaProps {
    dataSource: any;
    location: any;
}

export  default class StudyComponent extends Component<StudyMoreProps> {
    constructor(props) {
        super(props);
        console.log(this.props.location.query);
        this.props.dispatch({type: "study/getVocabDetail", payload: this.props.location.query})
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch({type:'study/jumpDetail',payload:'activity'});
    };

    render() {
        return (
            <div>
                <NavigationBar current={"study"} dispatch={this.props.dispatch}/>
                <div style={{ margin: 'auto', backgroundColor: '#ffffff'}}>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{ marginTop: '30px' }}>
                            <div style={{ textAlign: 'center',fontSize: '100px', color: 'Navy' }}>{this.props.dataSource.word}</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col>
                            <div style={{ textAlign: 'center'}}><span>例句： </span>{this.props.dataSource.exampleSen}</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col><Button
                            icon="check"
                            htmlType="submit"
                            style={{width: '200px'}}
                            onClick={this.handleSubmit}>认识了
                        </Button></Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{marginBottom: '10px'}}><Button
                                icon="cross"
                                htmlType="submit"
                                style={{width: '200px'}}
                                onClick={this.handleSubmit}>依旧不认识
                            </Button></Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{marginBottom: '30px', marginTop: '30px'}}>
                            <div style={{ textAlign: 'center'}}>学习进度: </div>
                            <div><Progress percent={70} style={{width: '300px'}}/></div>
                        </Col>
                    </Row>
                    <br/>
                </div>
            </div>
        );
    }
}

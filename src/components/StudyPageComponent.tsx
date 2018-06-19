import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Icon, Form, Button, Input, message, Progress } from 'antd';
import DvaProps from '../types/DvaProps';
import { Row, Col } from 'antd';
import {NavigationBar} from './PublicComponents';

interface StudyProps extends DvaProps {
    dataSource: any;
}

export  default class StudyComponent extends Component<StudyProps> {
    constructor(props) {
        super(props);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'study/jumpDetail',payload:'activity'});
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'study/jumpMore',payload:'activity'});
    }

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
                        {/*<Link to="vocabDetail">*/}
                            {/*<Button*/}
                                {/*icon="check"*/}
                                {/*htmlType="submit"*/}
                                {/*style={{width: '200px'}}>认识*/}
                            {/*</Button>*/}
                        {/*</Link>*/}
                        <Col><Button
                                icon="check"
                                htmlType="submit"
                                style={{width: '200px'}}
                                onClick={this.handleSubmit1}>认识
                            </Button></Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{marginBottom: '10px'}}><Button
                                icon="cross"
                                htmlType="submit"
                                style={{width: '200px'}}
                                onClick={this.handleSubmit2}>不认识
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

import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Button, Modal, Progress } from 'antd';
import DvaProps from '../types/DvaProps';
import { Row, Col } from 'antd';
import {NavigationBar} from './PublicComponents';

interface StudyProps extends DvaProps {
    dataSource: any;
    todayVocabNum: any;
}

interface ViewState {
    refresh: boolean;
}

export  default class LearningCheckComponent extends Component<StudyProps, ViewState> {
    constructor(props) {
        super(props);
        this.state = {
            refresh : false,
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'study/changeVocabFromLearningToMastered',payload: (this.props.dataSource.id)});
        this.props.dispatch({type:'vocablearninginfo/getTodayVocabNum',payload: true});
        this.props.dispatch({type:'study/jumpDetail',payload: {vocabId:this.props.dataSource.id}});
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'study/jumpDetail',payload: {vocabId:this.props.dataSource.id}});
    }

    render() {
        return (
            <div>
                <NavigationBar current={"learningCheck"} dispatch={this.props.dispatch}/>
                <div style={{ margin: 'auto', backgroundColor: '#ffffff'}}>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{ marginTop: '30px' }}>
                            <div style={{ textAlign: 'center',fontSize: '100px', color: 'Navy' }}>{this.props.dataSource.word}</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
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
                    <br/>
                </div>
            </div>
        );
    }
}

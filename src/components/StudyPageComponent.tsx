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
    modalState: boolean;
    refresh: boolean;
}

var learningNum = -1;
var percent = 0;
export  default class StudyComponent extends Component<StudyProps, ViewState> {
    constructor(props) {
        super(props);
        this.state = {
            modalState: false,
            refresh : false,
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'study/changeVocabFromNewVocabToMastered',payload: (this.props.dataSource.id)});
        this.props.dispatch({type:'vocablearninginfo/getTodayVocabNum',payload: true});
        this.props.dispatch({type:'study/jumpDetail',payload: {vocabId:this.props.dataSource.id, vocabState: true}});
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.setState({modalState: true,});
    }

    handleOk() {
        this.setState({modalState: false,});
        this.props.dispatch({type:'study/changeVocabFromNewVocabToMastered',payload: (this.props.dataSource.id)});
        this.props.dispatch({type:'study/jumpDetail',payload:{vocabId:this.props.dataSource.id, vocabState: true}});
    };

    handleCancel(e) {
        this.setState({modalState: false,});
        this.props.dispatch({type:'study/changeVocabFromNewVocabToLearning',payload: (this.props.dataSource.id)});
        this.props.dispatch({type:'study/jumpDetail',payload:{vocabId:this.props.dataSource.id, vocabState: false}});
    };

    render() {
        learningNum = this.props.todayVocabNum.learning;
        percent = (this.props.todayVocabNum.learning+this.props.todayVocabNum.mastered)*100/this.props.todayVocabNum.dailyNum;
        return (
            <div>
                <NavigationBar current={"study"} dispatch={this.props.dispatch}/>
                <div style={{ margin: 'auto', backgroundColor: '#ffffff'}}>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{ marginTop: '30px' }}>
                            <div style={{ textAlign: 'center',fontSize: '100px', color: 'Navy' }}>{this.props.dataSource.word}</div>
                        </Col>
                    </Row>
                    <Modal title="例句" visible={this.state.modalState}
                           onOk={this.handleOk} onCancel={this.handleCancel}
                           footer={[
                               <Button key="backDetail" type="ghost" size="large" onClick={this.handleCancel}>还是不知道</Button>,
                               <Button key="known" type="primary" size="large" onClick={this.handleOk}>我知道了</Button>,
                           ]}
                    >
                        <Row type="flex" justify="center" style={{ margin: '12px' }}>
                            <Col>
                                <div style={{fontSize: '30px', textAlign: 'center'}}>{this.props.dataSource.exampleSen}</div>
                            </Col>
                        </Row>
                    </Modal>
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
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{marginBottom: '30px', marginTop: '30px'}}>
                            <div style={{ textAlign: 'center'}}>学习进度: </div>
                            <div><Progress percent={ parseInt(percent.toString())} style={{width: '300px'}}/></div>
                        </Col>
                    </Row>
                    <br/>
                </div>
            </div>
        );
    }
}

import * as React from 'react';
import { Component } from 'react';
import { Layout, Row, Col, Button, Carousel, Progress } from 'antd';
import { Link } from 'dva/router';
import {NavigationBar} from "./PublicComponents";
import DvaProps from "../types/DvaProps";

interface VocabProgressProps extends DvaProps {
    dataSource: any;
    bookName: string;
}

export default class VocabProgressPageComponent extends Component<VocabProgressProps> {
    render() {
        return (
            <div >
                <NavigationBar current={"vocabProgress"} dispatch={this.props.dispatch}/>
                <br/>
                <div style={{ margin: 'auto'}}>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{ marginTop: '30px' }}>
                            <div style={{ textAlign: 'center' }}>单词总数</div>
                            <div><span style={{ fontSize: '100px', color: 'Navy' }}>{this.props.dataSource.totalNum}</span>个</div>
                        </Col>
                        <Col style={{ marginTop: '30px', marginLeft: '50px'}}>
                            <div style={{ textAlign: 'center' }}>已掌握</div>
                            <div><span style={{ fontSize: '100px', color: 'Navy' }}>{this.props.dataSource.mastered}</span>个</div>
                        </Col>
                        <Col style={{ marginTop: '30px', marginLeft: '50px'}}>
                            <div style={{ textAlign: 'center' }}>正在学</div>
                            <div><span style={{ fontSize: '100px', color: 'Navy' }}>{this.props.dataSource.learning}</span>个</div>
                        </Col>
                        <Col style={{ marginTop: '30px', marginLeft: '50px'}}>
                            <div style={{ textAlign: 'center' }}>新词</div>
                            <div><span style={{ fontSize: '100px', color: 'Navy' }}>{this.props.dataSource.newVocab}</span>个</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ margin: '12px' }}>
                        <Col style={{marginBottom: '10px'}}>
                            <div style={{ fontSize: '30px'}}><span>当前词汇书 ：</span>{this.props.bookName}</div>
                        </Col>
                    </Row>
                    <br/>
                </div>
            </div>
        );
    }
};

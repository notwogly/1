import * as React from 'react';
import { Component } from 'react';
import { Layout, Row, Col, Button, Carousel, Progress } from 'antd';
import { Link } from 'dva/router';
import {NavigationBar} from "./PublicComponents";

export default class DashboardPageComponent extends Component<any> {
    render() {
        return (
            <div >
                <NavigationBar current={"Dashboard"} dispatch={this.props.dispatch}/>
                <br/>
                <Carousel >
                    <div style={{ margin: 'auto'}}>
                        <Row type="flex" justify="center" style={{ margin: '12px' }}>
                            <Col style={{ marginTop: '30px' }}>
                                <div style={{ textAlign: 'center' }}>今日单词</div>
                                <div><span style={{ fontSize: '100px', color: 'Navy' }}>89</span>个</div>
                            </Col>
                            <Col style={{ marginTop: '30px', marginLeft: '50px'}}>
                                <div style={{ textAlign: 'center' }}>新词</div>
                                <div><span style={{ fontSize: '100px', color: 'Navy' }}>79</span>个</div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" style={{ margin: '12px' }}>
                            <Col style={{marginBottom: '10px'}}>
                                <div><span >当前词汇书 ：</span>六级词汇</div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" style={{ margin: '12px'}}>
                            <Col style={{ marginRight : '30px'}}>
                                <div style={{ textAlign: 'center' }}>学习进度: </div>
                            </Col>
                            <Col style={{marginBottom: '30px'}}>
                                <div><Progress percent={70} style={{width: '200px'}}/></div>
                            </Col>
                        </Row>
                        <br/>
                    </div>


                    <div style={{ margin: 'auto'}}>
                        <Row type="flex" justify="center" style={{ margin: '12px' }}>
                            <Col style={{ marginTop: '30px' }}>
                                <div style={{ textAlign: 'center' }}>我的打卡天数</div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" style={{ margin: '12px' }}>
                            <Col style={{ marginBottom: '30px' }}>
                                <div><span style={{ fontSize: '100px', color: 'Navy' }}>44</span>天</div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" style={{ margin: '12px' }}>
                            <Col style={{marginBottom: '10px'}}>
                                <div><span >当前词汇书 ：</span>六级词汇</div>
                            </Col>
                        </Row>
                        <br/>
                    </div>
                </Carousel>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Link to="study">
                        <Button size="large" type="primary" style={{ width: '300px' }}>开始学习</Button>
                    </Link>
                </Row>
            </div>
        );
    }
};

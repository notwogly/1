import * as React from 'react';
import { Component} from 'react';
import { Link } from 'dva/router';
import { WrappedLoginForm } from './LoginForm';
import {Row, Col, Carousel} from "antd"

export default class LoginPageComponent extends Component<{ dispatch: any }> {
    render() {
        var img = require('../images/vocab.png');
        return (
            <div style={{alignContent: 'center'}}>
                <Row justify="space-around" align="middle">
                    <Col span={14} style={{padding: 30}}>
                        <Carousel autoplay>
                            <div>
                                <img
                                    src = {require("../images/vocab.png")}
                                    width = "90%"
                                    height = "80%"
                                    alt = "indicator"/>
                            </div>
                            <div>
                                <img
                                    src = {require("../images/vocab3.png")}
                                    width = "90%"
                                    height = "80%"
                                    alt = "indicator"/>
                            </div>
                        </Carousel>
                    </Col>
                    <Col span={10}>
                        <WrappedLoginForm dispatch={this.props.dispatch} />
                    </Col>
                </Row>
            </div>
        );
    }
};

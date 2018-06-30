import { Component } from 'react';
import * as React from 'react';
import {Layout, Menu, Icon, Button, Row, Col} from 'antd';
import DvaProps from '../types/DvaProps';

const { Header, Footer } = Layout;

export class PublicHeader extends Component {
    render() {
        return (
            <Header>
                <h1 style={{ color: 'white' }}>Vocabular</h1>
            </Header>
        );
    }
}

export class PublicFooter extends Component {
    render() {
        return (
            <Footer>
                <div style={{ textAlign: 'center' }}>&copy;2018 gly</div>
            </Footer>
        );
    }
}

interface BarProps extends DvaProps {
    current: string;
}

export class NavigationBar extends Component<BarProps> {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    };
    handleClick(e) {
        if(e.key !== this.props.current)this.props.dispatch({type:'vocablearninginfo/jump', payload: {direction: e.key}});
    };

    render() {
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.props.current]}
                  mode="horizontal">
                <Menu.Item key="dashboard">
                    <Icon type="pushpin-o" />首页
                </Menu.Item>
                <Menu.Item key="study">
                    <Icon type="eye-o" />单词学习
                </Menu.Item>
                <Menu.Item key="learningCheck">
                    <Icon type="check-circle-o" />复习
                </Menu.Item>
                <Menu.Item key="check">
                    <Icon type="check-circle" />考核
                </Menu.Item>
                <Menu.Item key="vocabBook">
                    <Icon type="book" />单词书
                </Menu.Item>
                <Menu.Item key="myVocab">
                    <Icon type="file-text" />我的词库
                </Menu.Item>
                <Menu.Item key="vocabProgress">
                    <Icon type="line-chart" />单词进度
                </Menu.Item>
                <Menu.Item key="setting">
                    <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Item key="login">
                    <Icon type="login" />退出登陆
                </Menu.Item>
            </Menu>
        );
    };
}
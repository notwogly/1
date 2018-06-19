import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Icon, Form, Tabs, Button, Table} from 'antd';
import DvaProps from '../types/DvaProps';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';
import {NavigationBar} from './PublicComponents';
import {type} from "os";


interface MyVocabProps extends DvaProps {
    dataSource: any;
}

interface viewState {
    refresh: boolean;
    selectedRowKeys: any;
}
export class vocabData{
    id: number;
    word: string;
    interpretation: any;
}

const TabPane = Tabs.TabPane;
const columns = [
    {title: '单词', dataIndex: 'word', key: 'word'},
    {title: '释义', dataIndex: 'interpretation', key: 'interpretation'},
];
var nowKey = 1;
var selectedVocab = {};

export  default class MyVocabComponent extends Component<MyVocabProps, viewState> {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            selectedRowKeys: [],
        }
        this.callback = this.callback.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    callback(key) {
        this.props.dispatch({type: 'myvocab/getMyVocab', payload: key});
        this.setState({refresh: true});
        nowKey = key;
    };

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.dispatch({type: 'myvocab/deleteVocab', payload: {key: nowKey, value: selectedVocab }});
        this.setState({ selectedRowKeys:[]});
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.dispatch({type: 'myvocab/clearMyVocab', payload: true});
        this.setState({refresh: true});

    }

    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }

    render() {
        const { refresh, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect(record, selected, selectedRows) {
                selectedVocab = record;
            },
        };
        return (
            <div>
                <NavigationBar current={"myVocab"} dispatch={this.props.dispatch}/>
                <Tabs defaultActiveKey="1" onChange={this.callback} style={{margin:'auto', marginTop: '20px'}}>
                    <TabPane tab="今日单词" key="1">
                        <div>
                            <Table
                                style={{width: "100%", background: "#ffffff"}}
                                columns={columns}
                                rowKey="id"
                                rowSelection={rowSelection}
                                dataSource={this.props.dataSource}/>
                        </div>
                    </TabPane>
                    <TabPane tab="新的单词" key="2">
                        <div>
                            <Table
                                style={{width: "100%", background: "#ffffff"}}
                                columns={columns}
                                rowKey="id"
                                rowSelection={rowSelection}
                                dataSource={this.props.dataSource}/>
                        </div>
                    </TabPane>
                    <TabPane tab="正在学习" key="3">
                        <div>
                            <Table
                                style={{width: "100%", background: "#ffffff"}}
                                columns={columns}
                                rowKey="id"
                                rowSelection={rowSelection}
                                dataSource={this.props.dataSource}/>
                        </div>
                    </TabPane>
                    <TabPane tab="已掌握单词" key="4">
                        <div>
                            <Table
                                style={{width: "100%", background: "#ffffff"}}
                                columns={columns}
                                rowKey="id"
                                rowSelection={rowSelection}
                                dataSource={this.props.dataSource}/>
                        </div>
                    </TabPane>
                </Tabs>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Col style={{marginBottom: '10px'}}>
                        <Button
                            icon="cross"
                            htmlType="submit"
                            onClick={this.handleSubmit1}>删除
                        </Button>
                        <Button
                            icon="frown"
                            htmlType="submit"
                            onClick={this.handleSubmit2}>清空单词库
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Modal,message, Input, Row, Col} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from "./PublicComponents";
import {FormEvent} from "react";

const columns = [
    {title: '单词', dataIndex: 'word', key: 'word'},
    {title: '释义', dataIndex: 'interpretation', key: 'interpretation'},
    {title: '例句', dataIndex: 'exampleSen', key: 'exampleSen'}
];

var initData = [{id: '', word:'', interpretation:'', exampleSen:''},];
var initBookName = '';

interface BookDetailProps extends DvaProps {
    dataSource: any;
    bookName: any;
}

interface ViewState {
    refresh: boolean;
}

class BookDetailForm extends Component<BookDetailProps,ViewState> {
    constructor(props){
        super(props);
        this.state = {
            refresh : false,
        }
        initBookName = this.props.bookName;
    }

    render() {
        initBookName = this.props.bookName;
        initData = this.props.dataSource;
        return (
            <div>
                <div style={{ margin: 'auto'}}>
                    <Row type="flex" justify="center" style={{ margin: '12px'}}>
                        <Col style={{width: '300px', textAlign: 'center'}}>
                            <div ><span >单词集 ：</span></div>
                            <div ><span style={{marginBottom: '10px', fontSize: '30px'}}>{initBookName}</span></div>
                        </Col>
                    </Row>
                </div>
                <Table
                    style={{width: "100%", background: "#ffffff"}}
                    columns={columns}
                    rowKey="id"
                    dataSource={initData}/>
                <br/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(BookDetailForm);

export default class BookDetailComponent extends Component<BookDetailProps> {
    constructor(props,context) {
        super(props,context);
    }

    render() {
        return (
            <div>
                <NavigationBar current={"vocabBook"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource} bookName={this.props.bookName}/>
                </div>
            </div>
        );
    }
}


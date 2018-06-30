import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Modal,message, Input, Row, Col} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from "./PublicComponents";
import {FormEvent} from "react";

const FormItem = Form.Item;
const columns = [
    {title: '书号', dataIndex: 'id', key: 'id'},
    {title: '书名', dataIndex: 'bookName', key: 'bookName'},
    {title: '单词数', dataIndex: 'totalVocabNumber', key: 'totalVocabNumber'},
];

var initData = [{id: '', bookName: '',totalVocabNumber: ''},];
var initBookName = '';
var initBookIntro = '';
var confirmData = {id: '', bookName: '',totalVocabNumber: ''};

interface VocabBookProps extends DvaProps {
    learningBook: any;
    dataSource: any;
}

interface ViewState {
    modalState: boolean;
    refresh: boolean;
}

class SearchForm extends Component<VocabBookProps,ViewState> {
    constructor(props){
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
        this.props.dispatch({type: 'vocablearninginfo/getBookVocabs', payload: confirmData});
        this.props.dispatch({type: 'vocablearninginfo/jump',payload:{direction:'bookDetail'}});
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.setState({modalState: true,});
        this.props.dispatch({type: 'vocablearninginfo/modifyLearningBook',payload:confirmData});
        this.props.dispatch({type: 'vocablearninginfo/getLearningBook', payload: true});
    }

    handleOk() {
        this.setState({modalState: false,});
    };

    handleCancel(e) {
        this.setState({modalState: false,});
    };

    render() {
        initBookIntro = this.props.learningBook.bookIntro;
        initBookName = this.props.learningBook.bookName;
        initData = this.props.dataSource;
        return (
            <div>
                <div style={{ margin: 'auto'}}>
                    <Row type="flex" justify="center" style={{ margin: '12px'}}>
                        <Col style={{width: '300px', textAlign: 'center'}}>
                            <div ><span >正在学习的词汇书 ：</span></div>
                            <div ><span style={{marginBottom: '10px', fontSize: '30px'}}>{initBookName}</span></div>
                            <div ><span style={{marginBottom: '30px'}}>{initBookIntro}</span></div>
                        </Col>
                    </Row>
                </div>
                <Table
                    style={{width: "100%", background: "#ffffff"}}
                    columns={columns}
                    rowKey="id"
                    rowSelection={{
                        type: 'radio',
                        onSelect(record, selected, selectedRows) {
                            confirmData = record;
                            //console.log(record);
                        },
                    }}
                    dataSource={initData}/>
                <Form layout={"inline"} style={{background: "#ffffff", paddingLeft: 20, textAlign: 'center'}}>
                    {/*<FormItem label="搜索单词书">*/}
                    {/*{*/}
                    {/*getFieldDecorator('bookName', {})(*/}
                    {/*<Input placeholder="请输入单词书" style={{width: 200}}/>)*/}
                    {/*}*/}
                    {/*</FormItem>*/}
                    {/*<FormItem>*/}
                    {/*<Button*/}
                    {/*icon="search"*/}
                    {/*type="primary"*/}
                    {/*htmlType="submit"*/}
                    {/*onClick={this.handleSubmit1}>搜索*/}
                    {/*</Button>*/}
                    {/*</FormItem>*/}
                    <FormItem>
                        <Button
                            icon="book"
                            htmlType="submit"
                            onClick={this.handleSubmit1}>查看详情
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button
                            icon="edit"
                            htmlType="submit"
                            onClick={this.handleSubmit2}>修改至该单词集
                        </Button>
                    </FormItem>
                    <Modal title="修改成功" visible={this.state.modalState}
                           onOk={this.handleOk} onCancel={this.handleCancel}>
                        <br/>
                        <p> 书名: {confirmData.bookName}</p>
                        <br/>
                        <p> 单词数: {confirmData.totalVocabNumber}</p>
                        <br/>
                    </Modal>
                </Form>
                <br/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class VocabBookComponent extends Component<VocabBookProps> {
    constructor(props,context) {
        super(props,context);
    }

    render() {
        return (
            <div>
                <NavigationBar current={"vocabBook"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource} learningBook = {this.props.learningBook}/>
                </div>
            </div>
        );
    }
}


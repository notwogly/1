import * as React from 'react';
import { Component } from 'react';
import { Layout, Row, Col, Tooltip } from 'antd';
import { Link } from 'dva/router';
import {NavigationBar} from "./PublicComponents";
import DvaProps from "../types/DvaProps";
import Table from "antd/lib/table/Table";
import 'ant-design-pro/dist/ant-design-pro.css';
import {TimelineChart,ChartCard, MiniBar, Field} from 'ant-design-pro/lib/Charts';

interface VocabProgressProps extends DvaProps {
    dataSource: any;
    bookName: string;
    userDailyRecord: any;
}

const columns = [
    {title: '日期', dataIndex: 'day', key: 'day'},
    {title: '当日预计学习单词数', dataIndex: 'dailyNum', key: 'dailyNum'},
    {title: '正在学习', dataIndex: 'learning', key: 'learning'},
    {title: '已掌握', dataIndex: 'mastered', key: 'mastered'},
    {title: '剩余新单词数', dataIndex: 'newVocab', key: 'newVocab'},
];
var initData = [{id: '', day:'', dailyNum: '',learning: '', mastered: '', newVocab: ''},];

export default class VocabProgressPageComponent extends Component<VocabProgressProps> {
    render() {
        initData = this.props.userDailyRecord;
        const beginDay = new Date().getTime();
        var chartData = new Array();
        chartData.push({x:1,y:0});
        for(let i = 0; i<initData.length; i++){
            var data = initData.pop();
            console.log(data);
            if(data != null)
            {
                if(data.day.length != 0)
                    chartData.push({
                        x: new Date(beginDay + (1000 * 60 * 60 * 24 * i)),
                        y: Math.floor(Math.random() * 100) + 10,
                    });
            }
        }
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
                    {/*<div>*/}
                        {/*<ChartCard*/}
                            {/*title="访问量"*/}
                            {/*contentHeight={46}*/}
                        {/*>*/}
                            {/*<MiniBar*/}
                                {/*height={46}*/}
                                {/*data={chartData}*/}
                            {/*/>*/}
                        {/*</ChartCard>*/}
                        {/*/!*<TimelineChart*!/*/}
                            {/*/!*height={200}*!/*/}
                            {/*/!*data={chartData}*!/*/}
                            {/*/!*titleMap={{ y1: '总单词数', y2: '学习单词数' }}*!/*/}
                    <div style={{padding: 30 }}>当本月打卡记录：</div>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        columns={columns}
                        rowKey="id"
                        dataSource={this.props.userDailyRecord}/>
                </div>
            </div>
        );
    }
};

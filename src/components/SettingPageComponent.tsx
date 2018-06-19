import * as React from 'react';
import { Component} from 'react';
import { Tabs} from 'antd';
import { Link } from 'dva/router';
import {NavigationBar} from './PublicComponents';
import {WrappedUserSettingForm, WrappedVocabSettingForm} from "./SettingForm";
import  {SettingFormProps} from "./SettingForm";

const TabPane = Tabs.TabPane;

export  default class SettingComponent extends Component<SettingFormProps> {
    render() {
        return (
            <div>
                <NavigationBar current={"setting"} dispatch={this.props.dispatch}/>
                <div>
                    <Tabs defaultActiveKey="1" style={{margin:'auto', marginTop: '20px'}}>
                        <TabPane tab="账号设置" key="1">
                            <div>
                                <WrappedUserSettingForm dispatch={this.props.dispatch} userInfo={this.props.userInfo}/>
                            </div>
                        </TabPane>
                        <TabPane tab="单词设置" key="2">
                            <div>
                                <WrappedVocabSettingForm dispatch={this.props.dispatch} bookName={this.props.bookName} dailyNum={this.props.dailyNum}/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

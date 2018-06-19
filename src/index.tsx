import dva, { connect } from 'dva';
import { Layout } from 'antd';
import { browserHistory, Router, Route, Switch, Redirect } from 'dva/router';
import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import LoginModel from './models/LoginModel';
import RegisterModel from './models/RegisterModel';
import DashboardModel from './models/DashboardModel';
import MyVocabModel from './models/MyVocabModel';
import StudyModel from './models/StudyModel';
import VocabSetting from './models/VocabSettingModel';
import MySetting from './models/MySettingModel';

import AuthRoute from './components/AuthRoute';
import { PublicHeader, PublicFooter } from './components/PublicComponents';
import LoginPageComponent from './components/LoginPageComponent';
import RegisterPageComponent from './components/RegisterPageComponent';
import DashboardPageComponent from './components/DashboardPageComponent';
import StudyPageComponent from './components/StudyPageComponent';
import VocabProgressPageCompoent from './components/VocabProgressPageComponent';
import SettingPageComponent from './components/SettingPageComponent';
import VocabBookComponent from './components/VocabBookComponent';
import MyVocabComponent from './components/MyVocabPageComponent';
import VocabDetailComponent from './components/VocabDetailPageComponent';

const { Content } = Layout;

const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(RegisterModel);
app.model(DashboardModel);
app.model(MyVocabModel);
app.model(StudyModel);
app.model(VocabSetting);
app.model(MySetting);

const LoginPage = connect(state => { return {}; })(LoginPageComponent);
const RegisterPage = connect(state => { return {}; })(RegisterPageComponent);
const DashboardPage = connect(state => { return {
    ...state.dashboard
}; })(DashboardPageComponent);
const StudyPage = connect(state => {
    return {dataSource:state.study.vocabDetail, studyVocabNum: state.study.studyVocabNum, dailyNum: state.mysetting.dailyNum};
})(StudyPageComponent);
const VocabDetail = connect(state => {
    return {vocabDetail: state.study.vocabDetail};
})(VocabDetailComponent);
const VocabProgressPage = connect(state => {
    return {dataSource: state.vocabsetting.vocabNum, bookName: state.vocabsetting.bookName};
})(VocabProgressPageCompoent);
const Setting = connect(state => {
    return {userInfo: state.mysetting.userInfo, bookName: state.vocabsetting.bookName, dailyNum: state.mysetting.dailyNum};
})(SettingPageComponent);
const VocabBook = connect(state => {
    return {bookName: state.vocabsetting.bookName, bookIntro: state.vocabsetting.bookIntro, dataSource: state.vocabsetting.vocabBook};
})(VocabBookComponent);
const MyVocab = connect(state => {
    return {dataSource: state.myvocab.dataSource};
})(MyVocabComponent);

app.router(({ history }) => (
    <Router history={history}>
        <Layout style={{ minHeight: '600px' }}>
            <PublicHeader />
            <Content style={{ minHeight: '100%' }}>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="/login" />} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />

                    <AuthRoute path="/dashboard" component={DashboardPage} />
                    <AuthRoute path="/study" component={StudyPage} />
                    <AuthRoute path="/vocabDetail" component={VocabDetail} />
                    <AuthRoute path="/vocabProgress" component={VocabProgressPage} />
                    <AuthRoute path="/setting" component={Setting} />
                    <AuthRoute path="/vocabBook" component={VocabBook} />
                    <AuthRoute path="/myVocab" component={MyVocab} />

                </Switch>
            </Content>
            <PublicFooter />
        </Layout>
    </Router>
));

app.start('#root');

registerServiceWorker();

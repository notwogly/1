import dva, { connect } from 'dva';
import { browserHistory, Router, Route, Switch } from 'dva/router';
import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import LoginModel from './models/login';
import LoginPageComponent from './components/LoginPageComponent';
import { PublicHeader, PublicFooter } from './components/PublicComponents';
import { Layout } from 'antd';

const { Content } = Layout;

const app = dva({
    history: browserHistory
});

app.model(LoginModel);

const LoginPage = connect(state => { })(LoginPageComponent);

app.router(({ history }) => (
    <Router history={history}>
        <Layout style={{ minHeight: '600px' }}>
            <PublicHeader />
            <Content style={{ minHeight: '100%' }}>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                </Switch>
            </Content>
            <PublicFooter />
        </Layout>
    </Router>
));

app.start('#root');

registerServiceWorker();

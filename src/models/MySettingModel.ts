import {routerRedux} from 'dva/router';
import {authFetch} from "../utils/auth";
import {message} from "antd";
import {loadSession} from "../utils/localStorage";

const MySettingModel = {
    namespace: 'mysetting',
    state: {
        userInfo:{id: '', email:'', username: '',gender: '', intro: '', recordDay: ''},
        dailyNum: '',
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateDailyNum(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/setting') {
                    dispatch({ type: 'getUserInfo', payload: '' });
                    dispatch({ type: 'getDailyNum', payload: true });
                };
                if (pathname === '/dashboard') {
                    dispatch({ type: 'getUserInfo', payload: '' });
                }
            });
        }
    },
    effects: {
        * getUserInfo(payload: {payload: string}, {call, put}) {
            var email = (yield  call(loadSession)).email;
            const response = yield call(authFetch, '/user/email/'+email, 'GET');
            if(response.status === 400){
                message.error('查询用户信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('查询用户信息失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'updateUserInfo',
                payload: {userInfo: body,}
            });
            return;
        },
        * getDailyNum(payload: {payload: boolean}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/getBook/'+userId, 'GET');
            if(response.status === 400){
                message.error('查询用户信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('查询用户信息失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            var dailyNum = body.dailyNum;
            //console.log(dailyNum);
            yield put({
                type: 'updateDailyNum',
                payload: {dailyNum: dailyNum}
            });
            return;
        },
        * modifyDailyNum(payload: {payload: number}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/dailyLearning/setDailyNum/'+userId, 'POST', payload.payload);
            if(response.status === 400){
                message.error('修改用户信息失败');
                return;
            }
            yield put({
                type: 'updateDailyNum',
                payload: {dailyNum: payload.payload,}
            });
            return;
        },
        * modifyUserInfo(payload: {payload:{username: string, gender: string, intro: string}}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/'+userId+'/userInfo', 'POST', payload.payload);
            if(response.status === 400){
                message.error('修改用户信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('用户名被占用');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateUserInfo',
                payload: {userInfo: body}
            });
            return;
        },
    }
};

export default MySettingModel;

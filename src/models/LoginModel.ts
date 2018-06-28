import { sessionStorageKey } from '../configs/config';
import { LoginFormData } from '../components/LoginForm';
import { authFetch } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export interface LoginState {
    email: string;
    id: string;
};

export interface ILoginModel {
    state: LoginState;
};

const LoginModel = {
    namespace: 'login',
    state: {
        email: '',
        id: -1
    },
    effects: {
        * login(payload: { payload: LoginFormData }, { call, put }) {
            const msg = payload.payload;
            const response = yield call(authFetch, '/user/login', 'POST', msg);
            if (response.status === 400) {
                message.error('用户名或密码错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0){
                message.error('用户名或密码错误');
                return;
            }
            const body = JSON.parse(jsonBody);
            yield put({ type: 'updateSession', payload: { email: body.email, id: body.id} });
            message.success('登录成功');
            yield put({ type: 'saveSession' });
            yield put(routerRedux.push('/dashboard'));
            return;
        },
        * logout() { }
    },
    reducers: {
        saveSession(state: LoginState): null {
            const { email, id } = state;
            const values = JSON.stringify({ email, id });
            localStorage.setItem(sessionStorageKey, values);
            return null;
        },
        loadSession(state: LoginState): LoginState {
            const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
            return { ...state, ...values };
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        }
    }
};

export default LoginModel;

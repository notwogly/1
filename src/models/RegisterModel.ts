import { RegisterFormData } from '../components/RegisterForm';
import { authFetch } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

const RegisterModel = {
    namespace: 'register',
    state: {},
    effects: {
        * register(payload: {payload: RegisterFormData}, { call, put }): {} {
            const requestBody = payload.payload;
            console.log(requestBody);
            const result = yield call(authFetch, '/user/register', 'POST', requestBody);
            if (result.status === 400) {
                message.error('注册失败，邮箱已被注册！');
                return;
            }
            if (result.status !== 201) {
                message.error('未知错误！');
                return;
            }
            const jsonBody = yield call(result.text.bind(result));
            const response = JSON.parse(jsonBody);
            const body = JSON.parse(jsonBody);
            if(body === false){
                message.error('注册失败，邮箱已被注册！');
                return;
            }
            message.success('注册成功！');
            yield put(routerRedux.push('/login'));
        }
    },
    reducers: {}
};

export default RegisterModel;

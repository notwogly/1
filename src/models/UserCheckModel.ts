import {routerRedux} from 'dva/router';
import {authFetch} from "../utils/auth";
import {message} from "antd";
import {loadSession} from "../utils/localStorage";

const UserCheckModel = {
    namespace: 'check',
    state: {
        checkVocabDetail:{id: '', word: '',interpretation: '', exampleSen:''},
        rightNum: 0,
        userCheck:['asdf',],
    },
    reducers: {
        updateCheckInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/check') {
                    dispatch({ type: 'getUserCheckInfo'});
                };
            });
        }
    },
    effects: {
        * getUserCheckInfo(payload: {}, {call, put}) {
            const response = yield call(authFetch, '/user/getCheckVocab', 'GET');
            if(response.status === 400){
                message.error('获取考核信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('获取考核信息失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateCheckInfo',
                payload: {
                    checkVocabDetail:body.vocabDetail,
                    rightNum: body.right,
                    userCheck: body.selection}
            });
            return;
        },
    }
};

export default UserCheckModel;

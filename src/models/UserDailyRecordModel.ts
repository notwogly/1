import {routerRedux} from 'dva/router';
import {authFetch} from "../utils/auth";
import {message} from "antd";
import {loadSession} from "../utils/localStorage";

const UserDailyRecordModel = {
    namespace: 'dailyRecord',
    state: {
        userDailyRecord:[{id: '', day:'', dailyNum: '',learning: '', mastered: '', newVocab: ''},],
    },
    reducers: {
        updateUserDailyRecord(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/vocabProgress') {
                    dispatch({ type: 'getUserDailyRecordInfo'});
                };
            });
        }
    },
    effects: {
        * getUserDailyRecordInfo(payload: {}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/getMonthDailyLearning/'+userId, 'GET');
            if(response.status === 400){
                message.error('修改用户信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('本月无学习记录');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateUserDailyRecord',
                payload: {userDailyRecord: body}
            });
            return;
        },
    }
};

export default UserDailyRecordModel;

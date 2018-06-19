import {routerRedux} from 'dva/router';

const MyVocabModel = {
    namespace: 'mysetting',
    state: {
        userInfo:{id: '', name: '',gender: '', introduce: ''},
        dailyNum: '',
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateVocabInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/setting') {
                    dispatch({ type: 'getUserSetting', payload: '' });
                    dispatch({ type: 'getVocabSetting', payload: '' });
                }
            });
        }
    },
    effects: {
        * getUserSetting(payload: {payload: string}, {call, put}) {
            yield put({
                type: 'updateUserInfo',
                payload: {userInfo: {id: '3111@123.com', name: '小黄人',gender: 'female', introduce:'我爱背单词...'},}
            });
            return;
        },
        * getVocabSetting(payload: {payload: string}, {call, put}) {
            yield put({
                type: 'updateVocabInfo',
                payload: {dailyNum:'50',}
            });
            return;
        },
        * modifyDailyNum(payload: {payload: number}, {call, put}) {
            yield put({
                type: 'updateVocabInfo',
                payload: {dailyNum: payload.payload,}
            });
            return;
        },
        * modifyUserInfo(payload: {payload:{name: string, gender: string, introduce: string}}, {call, put}) {
            //console.log(payload.payload);
            yield put({
                type: 'updateUserInfo',
                payload: {userInfo: {id: '3111@123.com', name: payload.payload.name,gender: payload.payload.gender, introduce: payload.payload.introduce},}
            });
            return;
        },
    }
};

export default MyVocabModel;

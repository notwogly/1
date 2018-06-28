import {routerRedux} from 'dva/router';
import {authFetch} from "../utils/auth";
import {message} from "antd";
import {loadSession} from "../utils/localStorage";

const StudyModel = {
    namespace: 'study',
    state: {
        vocabDetail:{id: '', word: '',interpretation: '', exampleSen:''},
    },
    reducers: {
        updateVocabDetail(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/study') {
                    dispatch({ type: 'getVocabDetail', payload: '' });
                }
            });
        }
    },
    effects: {
        * getVocabDetail(payload: {payload: string}, {call, put}) {
            //console.log(payload.payload);
            var userId = (yield  call(loadSession)).id;
            if(payload.payload.length == 0)
            {
                const response = yield call(authFetch, '/user/getVocabDetail/'+userId, 'GET');
                if(response.status === 400){
                    message.error('获取单词信息失败');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                if(jsonBody.length === 0)
                {
                    message.info('获取单词信息失败您或许已经完成今日学习');
                    return;
                }
                //将字符串转换为json对象
                const body = JSON.parse(jsonBody);
                yield put({
                    type: 'updateVocabDetail',
                    payload: {vocabDetail: body,}
                });
            }
            return;
        },
        * changeVocabFromNewVocabToMastered(payload: {payload: number}, {call, put}) {
            //console.log(payload.payload);
            var userId = (yield  call(loadSession)).id;
            var msg = { vocabId: payload.payload, type: 4, oldType: 2};
            const response = yield call(authFetch, '/user/changeVocabs/'+userId, 'POST',msg);
            if(response.status === 400){
                message.error('获取词库失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('删除失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);

            return;
        },
        * changeVocabFromNewVocabToLearning(payload: {payload: number}, {call, put}) {
            //console.log(payload.payload);
            var userId = (yield  call(loadSession)).id;
            var msg = { vocabId: payload.payload, type: 3, oldType: 2};
            const response = yield call(authFetch, '/user/changeVocabs/'+userId, 'POST',msg);
            if(response.status === 400){
                message.error('获取词库失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('删除失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);

            return;
        },
        * jumpDetail(payload: { payload: { vocabId:number, vocabState: boolean}}, {call, put}) {
            //console.log(payload.payload);
            //fetch the data of the case and add to the query
            // if(payload.payload.vocabState)
            // {
            //     //如果这个单词标记为认识
            //     yield put({
            //         type: 'changeVocabFromNewVocabToMastered',
            //         payload: payload.payload.vocabId
            //     })
            // }
            // else
            // {
            //     //如果这个单词标记为不认识
            //     yield put({
            //         type: 'changeVocabFromNewVocabToLearning',
            //         payload: payload.payload.vocabId
            //     })
            // }
            yield put(routerRedux.push({pathname:'/vocabDetail',query: payload.payload.vocabId,}));
            return;
        },
    }
};

export default StudyModel;

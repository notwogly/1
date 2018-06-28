import {routerRedux} from 'dva/router';
import {authFetch} from "../utils/auth";
import {message} from "antd";
import {vocabData} from "../components/MyVocabPageComponent";
import {loadSession} from "../utils/localStorage";

const MyVocabModel = {
    namespace: 'myvocab',
    state: {
        dataSource: [{id: '', word: '',interpretation: ''},],
    },
    reducers: {
        updateVocabInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/myVocab') {
                    dispatch({ type: 'getMyVocab', payload: 1 });
                }
            });
        }
    },
    effects: {
        *  getMyVocab(payload: {payload: number}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/getVocab/'+userId+'/'+payload.payload, 'GET');
            if(response.status === 400){
                message.error('获取词库失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('获取词库失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'updateVocabInfo',
                payload: {dataSource: body,}
            });
            return;
        },
        *  clearMyVocab(payload: {payload: boolean}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/clearVocabs/'+userId, 'DELETE');
            if(response.status === 400){
                message.error('清空词库失败');
                return;
            }
            message.success('清空成功');

            return;
        },
        *  deleteVocab(payload: {payload: {key:number, value: vocabData}}, {call, put}) {
            //console.log(payload.payload);
            var userId = (yield  call(loadSession)).id;
            var  vocabId = payload.payload.value.id;
            var  type = payload.payload.key;
            if(type == 2)
            {
                const response = yield call(authFetch, '/user/deleteVocab/'+userId, 'DELETE',{ vocabId: vocabId, type: parseInt(type.toString())} );
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
                if(body === false) {
                    message.error('修改词库失败');
                    return;
                }
            }else
            {
                var msg = { vocabId: vocabId, type: 2, oldType: parseInt(type.toString())};
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
                if(body === false)
                {
                    message.error('修改失败');
                    return;
                }
            }
            yield put({
                type: 'getMyVocab',
                payload: type
            });

            return;
        }
    }
};

export default MyVocabModel;

import {routerRedux} from 'dva/router';
import vocabData from '../components/MyVocabPageComponent';

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
        * getMyVocab(payload: {payload: number}, {call, put}) {
            if( payload.payload == 1)
            {
                yield put({
                    type: 'updateVocabInfo',
                    payload: {dataSource: [{id: 1, word: 'my1',interpretation: '我的'},
                            {id: 2, word: 'your1',interpretation: '你的'},],}
                });
            }
            else if( payload.payload == 2)
            {
                yield put({
                    type: 'updateVocabInfo',
                    payload: {dataSource: [{id: 1, word: 'my2',interpretation: '我的2'},
                            {id: 2, word: 'your2',interpretation: '你的2'},],}
                });
            }
            else if( payload.payload == 3)
            {
                yield put({
                    type: 'updateVocabInfo',
                    payload: {dataSource: [{id: 1, word: 'my3',interpretation: '我的3'},
                            {id: 2, word: 'your3',interpretation: '你的3'},],}
                });
            }
            else if( payload.payload == 4)
            {
                yield put({
                    type: 'updateVocabInfo',
                    payload: {dataSource: [{id: 1, word: 'my4',interpretation: '我的4'},
                            {id: 2, word: 'your4',interpretation: '你的4'},],}
                });
            }
            else
            {
                yield put({
                    type: 'updateVocabInfo',
                    payload: {dataSource: [{id: 1, word: '',interpretation: ''},],}
                });
            }
            return;
        },
        *  clearMyVocab(payload: {payload: boolean}, {call, put}) {
            yield put({
                type: 'updateVocabInfo',
                payload: {dataSource: [{id: 1, word: '空',interpretation: '空'},],}
            });
            return;
        },
        *  deleteVocab(payload: {payload: {key:number, selectedVocab:vocabData}}, {call, put}) {
            console.log(payload.payload);
            yield put({
                type: 'updateVocabInfo',
                payload: {dataSource: [{id: 1, word: '空',interpretation: '空'},],}
            });
            return;
        }
    }
};

export default MyVocabModel;

import {routerRedux} from 'dva/router';

const MyVocabModel = {
    namespace: 'study',
    state: {
        vocabDetail:{id: '', word: 'acti',interpretation: 'afa', exampleSen:'vvfs'},
    },
    reducers: {
        updateStudyInfo(st, payload) {
            return {...st, ...payload.payload};
        },
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
            yield put({
                type: 'updateVocabDetail',
                payload: {vocabDetail: {id: '', word: 'acti',interpretation: 'afa', exampleSen:'vvfs'},}
            });
            return;
        },
        * jumpDetail(payload: { payload: string }, {call, put}) {
            console.log(payload.payload);
            //fetch the data of the case and add to the query
            yield put(routerRedux.push({pathname:'/vocabDetail',query: payload.payload,}));
            return;
        },
        * jumpMore(payload: { payload: string }, {call, put}) {
            console.log(payload.payload);
            //fetch the data of the case and add to the query
            yield put(routerRedux.push({pathname:'/studyMore',query: payload.payload,}));
            return;
        },
    }
};

export default MyVocabModel;

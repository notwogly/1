import {routerRedux} from 'dva/router';

const MyVocabModel = {
    namespace: 'study',
    state: {
        vocabDetail:{id: '', word: 'acti',interpretation: 'afa', exampleSen:'vvfs'},
        studyVocabNum: 60,
    },
    reducers: {
        updateStudyVocabNum(st, payload) {
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
                    dispatch({ type: 'getStudyVocabNum', payload: false});
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
        * getStudyVocabNum(payload: {payload: boolean}, {call, put}) {
            yield put({
                type: 'updateStudyVocabNum',
                payload: {studyVocabNum: 12,}
            });
            return;
        },
        * addStudyVocabNum(payload: {payload: number}, {call, put}) {
            yield put({
                type: 'updateStudyVocabNum',
                payload: {studyVocabNum: payload.payload,}
            });
            return;
        },
        * jumpDetail(payload: { payload: { word:string, vocabState: boolean}}, {call, put}) {
            console.log(payload.payload);
            //fetch the data of the case and add to the query
            if(payload.payload.vocabState)
            {
                //如果这个单词标记为认识
            }
            else
            {
                //如果这个单词标记为不认识
            }
            yield put(routerRedux.push({pathname:'/vocabDetail',query: payload.payload,}));
            return;
        },
    }
};

export default MyVocabModel;

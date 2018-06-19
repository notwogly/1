import {routerRedux} from 'dva/router';

const MyVocabModel = {
    namespace: 'vocabsetting',
    state: {
        vocabBook: [{id: '', bookName: '',vocabNumber: ''},],
        bookName: '',
        bookIntro: '',
        vocabNum: {totalNum: 100, mastered: 0, learning: 79, newVocab: 10},
    },
    reducers: {
        updateVocabNumInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateVocabBookInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateVocabInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/vocabProgress') {
                    dispatch({ type: 'getVocabNum', payload: true});
                    dispatch({ type: 'vocabBook', payload: true});
                };
                if (pathname === '/vocabBook') {
                    dispatch({ type: 'vocabBook', payload: true});
                }
            });
        }
    },
    effects: {
        * getVocabNum(payload: {payload: boolean}, {call, put}) {
            yield put({
                type: 'updateVocabNumInfo',
                payload: {vocabNum: {totalNum: 101, mastered: 1, learning: 80, newVocab: 11},}
            });
            return;
        },
        * vocabBook(payload: {payload: boolean}, {call, put}) {
            //console.log('this is the vocabBook');
            yield put({
                type: 'updateVocabBookInfo',
                payload: {bookName: '六级词汇', bookIntro:'关于六级的词汇书'}
            });
            return;
        },
        * getVocabBook(payload: {payload: string }, {call, put}) {
            console.log(payload.payload);
            yield put({
                type: 'updateVocabInfo',
                payload: {vocabBook: [{id: 10001, bookName: '六级词汇',vocabNumber: '1003'},],}
            });
            return;
        },
        * modifyVocabBook(payload: {payload: {id:number, bookName: string} }, {call, put}) {
            console.log(payload.payload);
            // yield put({
            //     type: 'updateVocabInfo',
            //     payload: {vocabBook: [{id: 10001, bookName: '六级词汇',vocabNumber: '1003'},],}
            // });
            return;
        },
    }
};

export default MyVocabModel;
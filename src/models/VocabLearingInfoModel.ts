import {routerRedux} from 'dva/router';
import {authFetch} from "../utils/auth";
import {message} from "antd";
import {ILoginModel} from "./LoginModel";
import {loadSession} from "../utils/localStorage";

const VocabLearningInfoModel = {
    namespace: 'vocablearninginfo',
    state: {
        vocabBooks: [{id: '', bookName: '',totalVocabNumber: ''},],
        bookName:'',
        book_vocabs: [{id: '', word:'', interpretation:'', exampleSen:''},],
        learningBook: { id: '', bookName: '',  bookIntro: '',},
        UserVocabNum: { totalNum: '', mastered: '', learning: '', newVocab: '', dailyNum: ''},
        todayVocabNum: { dailyNum: '', newVocab: '', learning:'', mastered:'' },
    },
    reducers: {
        updateLearningBookInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateVocabBooksInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateUserVocabNumInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateTodayVocabNumInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateBookVocabsInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/dashboard') {
                    dispatch({ type: 'getTodayVocabNum', payload: true});
                    dispatch({ type: 'getLearningBook', payload: true});
                };
                if (pathname === '/study') {
                    dispatch({ type: 'getTodayVocabNum', payload: true});
                };
                if (pathname === '/vocabProgress') {
                    dispatch({ type: 'getUserVocabNum', payload: true});
                    dispatch({ type: 'getLearningBook', payload: true});
                };
                if (pathname === '/setting') {
                    dispatch({ type: 'getLearningBook', payload: true});
                };
                if (pathname === '/vocabBook') {
                    dispatch({ type: 'getVocabBooks', payload: ''});
                    dispatch({ type: 'getLearningBook', payload: true});
                };
            });
        }
    },
    effects: {
        * getVocabBooks(payload: {payload: string}, {call, put}) {
            //console.log(payload.payload);
            const response = yield call(authFetch, '/book', 'GET');
            if(response.status === 400){
                message.error('获取所有单词书失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('获取所有单词书失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'updateVocabBooksInfo',
                payload: {vocabBooks: body,}
            });
            return;
        },
        * getLearningBook(payload: {payload: boolean}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/getBook/'+userId, 'GET');
            if(response.status === 400){
                message.error('获取正在学习的单词书失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('获取正在学习的单词书失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateLearningBookInfo',
                payload: {learningBook: body,}
            });
            return;
        },
        * getUserVocabNum(payload: {payload: boolean}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/getBook/'+userId, 'GET');
            if(response.status === 400){
                message.error('获取当前学习信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('获取当前学习信息失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'updateUserVocabNumInfo',
                payload: {UserVocabNum: body,}
            });
            return;
        },
        * getTodayVocabNum(payload: {payload: boolean}, {call, put}) {
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/getDailyLearning/'+userId, 'GET');
            if(response.status === 400){
                message.error('获取本日学习信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.info('无正在学习的书，请先设置');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
           // console.log(body);
            yield put({
                type: 'updateTodayVocabNumInfo',
                payload: {todayVocabNum: body,}
            });
            return;
        },
        //修改正在学习的词汇书
        * modifyLearningBook(payload: {payload: {id:number, bookName: string} }, {call, put}) {
            //console.log(payload.payload);
            var userId = (yield  call(loadSession)).id;
            const response = yield call(authFetch, '/user/addBook/'+userId+'/'+payload.payload.id, 'POST');
            if(response.status === 400){
                message.error('增加书本学习信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('增加书本学习信息失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'getLearningBook',
                payload: true,
            });
            return;
        },
        * getBookVocabs(payload: {payload:{id:number, bookName: string} }, {call, put}) {
            console.log(payload.payload);
            if(payload.payload.id <0 )
            {
                yield put({
                    type: 'updateBookVocabsInfo',
                    payload: {book_vocabs: [{},]}
                });
                return;
            }
            const response = yield call(authFetch, '/book/vocabs/'+payload.payload.id, 'GET');
            if(response.status === 400){
                message.error('获取书中所有单词失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            if(jsonBody.length === 0)
            {
                message.error('获取书中所有单词失败');
                return;
            }
            //将字符串转换为json对象
            const body = JSON.parse(jsonBody);
            //console.log(body);
            yield put({
                type: 'updateBookVocabsInfo',
                payload: {book_vocabs: body,bookName: payload.payload.bookName}
            });
            return;
        },
        *jump(payload: {payload:{direction: string}},{call,put}){
            const direction = payload.payload.direction;
            //console.log(direction);
            yield put(routerRedux.push("/"+direction));
            return;
        }
    }
};

export default VocabLearningInfoModel;

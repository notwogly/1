import {routerRedux} from 'dva/router';

const DashboardModel = {
    namespace: 'dashboard',
    state: {
        recordDays: 42,
        todayToStudy: 23,
        totalStudied: 233
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            yield put(routerRedux.push("/"+direction));
            return;
        }
    }
};

export default DashboardModel;

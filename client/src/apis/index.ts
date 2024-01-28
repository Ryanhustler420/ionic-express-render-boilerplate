import _ from 'lodash';
import { routes } from './routes';
import Capacitor from '../utils/Capacitor';
import AuthState from '../utils/common/auth-state';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

const authState = new AuthState();

const handle = (response: HttpResponse, cb: (response: HttpResponse) => void) => {
    const statusCode = response.status;
    if (statusCode >= 200 && statusCode <= 399) return cb(response);
    else if (statusCode >= 400 && statusCode <= 499) throw { response };
    else if (statusCode >= 500 && statusCode <= 599) throw { response };
    throw { response };
};

export const getCurrentUser = _.debounce((cb: (response: HttpResponse) => void, err: (e: any) => void) => {
    CapacitorHttp.get({
        url: routes.GET_CURRENT_USER,
        headers: commonHeader(),
    }).then(e => handle(e, cb)).catch(err);
});

export const errorToast = _.debounce((error: any) => {
    // @ts-ignore
    const message = _.first(error.response?.data.errors)?.message;
    if (message) Capacitor.toast(message, "long");
});

const commonHeader = () => {
    return {
        'Content-Type': 'application/json',
        'base64': authState.getToken() || '',
    };
}
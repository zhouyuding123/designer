import config from "../config/config.js"
import { makeAutoObservable } from './mobx';
const { imAccid, imToken, imVersion } = config;


export const authStore = () => {
    let zxc = {
        imAccid :imAccid,
        imToken : imToken,
        imVersion : imVersion,
    }
    return makeAutoObservable(zxc)
}
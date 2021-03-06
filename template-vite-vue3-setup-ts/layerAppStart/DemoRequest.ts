import {LoadingRequest} from "layer-app";
import axios, {Cancel} from "axios";


export default class DemoRequest extends LoadingRequest {
    protected requestHandle() {
        //请求必要参数处理
        let {config} = this;
        if (!config.headers) {
            config.headers = {};
        }
        //token设置
        config.headers['token'] = 'token'
    }

    protected responseHandle() {
        const {response} = this;
        if (!response) {
            // 不符合要求,抛出异常
            throw response;
        }
        const responseData = response.data;
        //假定 接口格式  {code:0,msg:"成功",data:'接口数据,任意内容'}
        //code 1  未登录
        //code 2  必须注册手机号才能访问 等
        if (responseData.code !== 0) {
            //  todo 业务异常处理
            //    这里异常 使用 抛出  throw
        }
        return response.data.data;
    }

    protected errorHandle():Error {
        let errorTip = "未知错误";
        if (axios.isAxiosError(this.error)) {
            const response = this.error.response;
            if (response) {
                if (response.status = 404) {
                    // 发起提示, 如 element.message
                    // 网络请求不存在
                    throw this.error
                }
            }
        } else if (axios.isCancel(this.error)) {
            throw new Error("取消请求：" + (<Cancel>this.error).message)
        }

        //抛出其他异常，可根据error 类型返回
        throw new Error('未知异常');
        // return this.error;
    }
}

//直接使用 请求类 示例,每次请求都需要示例一个请求类
class UserApi extends DemoRequest {
    getList() {
        return this.setGet('url', {}).request()
    }

    static getList1() {
        return (new this).setLoading({}, 'default').setGet('url').request()
    }
}

// (new UserApi).setLoading().getList().then(res => {
// })
// UserApi.getList1().then(res=>{})

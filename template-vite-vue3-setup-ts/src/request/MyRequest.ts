import {LoadingRequest} from "layer-app";
import axios, {Cancel} from "axios";
import {ElMessage} from "element-plus";


export default class MyRequest extends LoadingRequest {

    protected requestHandle() {
        this.setConfig({
            timeout: 300000,
            baseURL: `/mock`,
            withCredentials: true
        });

        //请求必要参数处理
        let {config} = this;
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.token = 'token'
    }

    protected async responseHandle() {
        const {response} = this;
        if (!response) {
            // 不符合要求,抛出异常
            throw response;
        }
        const {data: res} = response;

        if (
            res &&
            res.returnStatus == 1 &&
            "SUC1000N" === res.returnCode
        ) {
            return res.returnContent;
        }

        let errorTip = "";
        if (!res) {
            throw response;
        } else if (res.returnStatus != 1) {
            const errorTipMap = <{
                [key: string]: string
            }>{
                WARN1000N: "警告提示",
                ERR1000N: "接口返回请求失败的提示",
                ERR1001N: "系统错误",
                ERR1002N: "数据库错误",
                ERR1003N: "服务器未能识别请求",
                ERR1004N: "请求参数不合法",
                BAN1000N: "未登录",
                BAN1001N: "无请求权限",
                BAN1002N: "数据库错误"
            };

            errorTip = errorTipMap[res.returnCode] || "未定义的错误";

            if (res.returnContent) {
                errorTip = res.returnContent.tips || errorTip;
            }
        }


        let messageType: "error" | "info" = "error";
        if (res.returnCode === "WARN1000N") {
            messageType = "info";
        }
        ElMessage({
            type: messageType,
            showClose: true,
            message: errorTip
        });
        throw response;
    }


    protected errorHandle(): Error {
        if (axios.isAxiosError(this.error)) {
            const response = this.error.response;
            let errorTip = "未知错误";
            if (response) {
                const httpCode = response.status;
                const errorHttpCodeTipsMap: { [key: number]: string } = {
                    404: "网络请求不存在"
                };
                if (!errorTip) {
                    errorTip = errorHttpCodeTipsMap[httpCode] || `网络 ${httpCode}错误！`;
                }
            }
            ElMessage({
                type: "error",
                showClose: true,
                message: errorTip
            });
            throw this.error;
        } else if (axios.isCancel(this.error)) {
            throw new Error("取消请求：" + (<Cancel>this.error).message);
        }
        throw new Error("未知异常");
    }
}

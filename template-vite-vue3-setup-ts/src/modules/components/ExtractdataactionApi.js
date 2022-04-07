import MyRequest from "@/request/MyRequest.ts";

const _uri = "/index-service-desk/potal/tools/extractdataaction/";

/**
 * 自助数据报表接口
 */
class extractdataactionApi extends MyRequest {
    async getTemp(url, params = {}) {
        return (new (this.constructor)).setGet(url, params).request();
    }

    async post(url, data = {}, params = {}) {
        return (new (this.constructor)).setPost(url, data, params).request();
    }

    /**
     * 8.2.1 “近期提取”分页列表查询接口
     * @param page
     * rows
     * @returns {String|Promise<AxiosResponse<any>>}
     */
    getDataSetList(pageInfo) {
        return this.getTemp(_uri + "getDataSetList.do", pageInfo);
    }

    /**
     * 8.2.3 “近期提取”数据集导出接口
     * @param data
     * @param rtRul
     * @returns {String|Promise<AxiosResponse<any>>}
     */
    downTableDataForExcel(data = {}) {
        return this.post(_uri + "getDataSetExcel.do", data);
    }

    /**
     * 8.2.4 “近期提取”数据集删除接口
     * @param data
     * @returns {String|Promise<AxiosResponse<any>>}
     */
    removeDataSet(data) {
        return this.post(_uri + "removeDataSet.do", data);
    }

    /**
     * 8.2.21 “极速发布”报表概要列表查询接口
     * @returns {String|Promise<AxiosResponse<any>>}
     */
    getReleaseReportNewlyList() {
        return this.getTemp(_uri + "getReleaseReportNewlyList.do");
    }

    /**
     * 8.2.22 “极速发布”报表树形列表查询接口
     * @returns {String|Promise<AxiosResponse<any>>}
     */
    getReleaseReportTreeList() {
        return this.getTemp(_uri + "getReleaseReportTreeList.do");
    }

    /**
     * 8.2.23 “极速发布”报表收藏/撤销收藏接口
     * datasetId 报表ID
     * collectFlag 关注标识（1表示关注、0表示取消关注）
     * @returns {String|Promise<AxiosResponse<any>>}
     */
    collectReport(datasetId, collectFlag) {
        return this.post(_uri + "collectReport.do", {datasetId, collectFlag});
    }

    /**
     * 8.2.28 “极速发布”报表发布撤回
     * datasetId 报表ID
     * @returns {String|Promise<AxiosResponse<any>>}
     */
    revokeReleaseReport(datasetId) {
        return this.post(_uri + "revokeReleaseReport.do", {datasetId});
    }

    //  数据提取相关接口 start  -------------------------------------------------

    sourceList() {
        return this.getTemp(_uri + "getDataSourceLinkList.do");
    }

    tableListBySource(datasourceId, keyword = "") {
        return this.getTemp(_uri + "getDataTableOptional.do", {
            datasourceId,
            keyword
        });
    }

    //获取数据表信息
    getTableInfo(datasourceId, tableName) {
        return this.getTemp(_uri + "getDataTableDetails.do", {
            datasourceId,
            tableName
        });
    }

    /**
     * 保存表关系
     * @param data
     * @return {Promise<AxiosResponse<any>>}
     */
    saveTableRelation(
        data = {
            datasetId: "",
            datasetName: "",
            processLogic: {
                datasourceId: "",
                datasetView: "",
                processLogicDefined: {
                    tableType: "",
                    realityTableName: "",
                    virtualTableDefined: {}
                }
            }
        }
    ) {
        return this.post(_uri + "submitDataSetProcessLogicConfigure.do", data);
    }

    /**
     * 查询表关系
     * @param datasetId
     * @return {Promise<AxiosResponse<*>>|*}
     */
    getTableRelation(datasetId) {
        return this.getTemp(_uri + "getDataSetProcessLogic.do", {datasetId});
    }

    /**
     * diy表字段配置获取
     * @param datasetId
     * @param isOverload  更新字段标志（true表示重载、false表示不重载）
     * @return {Promise<AxiosResponse<*>>|*}
     */
    getFieldConfig(datasetId, isOverload = false, isDistinct = false) {
        return this.getTemp(_uri + "getDataSetFieldConfigure.do", {
            datasetId,
            isOverload,
            isDistinct
        });
    }

    /**
     * diy表字段配置保存
     * @param datasetId {string}
     * @param datasetNote  {{notetext:string,notfilepath:string}}
     * @param fieldConfigure {[{}]}
     * @return {Promise<AxiosResponse<*>>|*}
     */
    saveFieldConfig({datasetId, datasetNote, fieldConfigure}) {
        return this.post(_uri + "submitDataSetFieldConfigure.do", {
            datasetId,
            datasetNote,
            fieldConfigure
        });
    }

    /**
     * 急速报表
     * @param datasetId
     * @return {Promise<AxiosResponse<any>>}
     */
    dataList(datasetId) {
        return this.getTemp(_uri + "getDataSetPreviewInfo.do", {datasetId});
    }

    //  数据提取相关接口 end  -------------------------------------------------------------

    /**
     * 急速报表数据
     * @param datasetId {string}
     * @param fieldSelect {[]}
     * @param filterWhere {[]}
     * @param page
     * @param rows
     * @return {Promise<AxiosResponse<*>>|*}
     */
    getSpeedReportTableData({
                                datasetId,
                                fieldSelect,
                                filterWhere,
                                page = 1,
                                rows = 20
                            }) {
        return this.post(_uri + "getReleaseReportTableData.do", {
            datasetId,
            fieldSelect,
            filterWhere,
            page,
            rows
        });
    }

    /**
     * 急速报表发布配置
     * @param datasetId
     * @return {Promise<AxiosResponse<*>>|*}
     */
    getSpeedReportReleaseConfig(datasetId) {
        return this.getTemp(_uri + "getReleaseReportDefined.do", {
            datasetId
        });
    }

    /**
     * 保存急速报表发布配置
     * @param data
     * @return {Promise<AxiosResponse<any>>}
     */
    saveSpeedReportReleaseConfig(data) {
        return this.post(_uri + "submitReleaseReportDefined.do", data);
    }

    /**
     * 报表口径文件上传
     * @param file
     * @return {Promise<AxiosResponse<any>>}
     */
    uploadNotFile(file) {
        return this.post(`${_uri}importDataSetNoteFile.do`, file);
    }


    /**
     *  脱敏规则列表
     * @return {Promise<any>}
     */
    getFilterRules() {
        return this.getTemp(`${_uri}getMaskingRuleCodeByRuleCode.do`);
    }


    /**
     * 字段选项列表
     * @param datasetId
     * @param fieldSelect
     * @return {Promise<any>}
     */
    fieldSelection({datasetId, fieldSelect = []}) {
        return this.post(`${_uri}getDataSetFieldSelection.do`, {
            datasetId, fieldSelect
        });
    }

    /**
     * 提交模板
     */
    saveTemplate(
        {
            templateId = "",
            templateName,
            datasetId,
            checkLogic = {
                filterWhere: [{}],
                fieldSelect: [""]
            }
        }) {
        return this.post(`${_uri}submitDataSetTemplate.do`, {
            templateId, templateName, datasetId, checkLogic
        });
    }

    /**
     * 模板列表
     */
    getTemplateList({datasetId, type, text = "", page = 1, rows = 20}) {
        return this.getTemp(`${_uri}getDataSetTemplate.do`, {
            datasetId, type, text, page, rows
        });
    }

    /**
     * 模板详情
     */
    getTemplateInfo({datasetId, templateId}) {
        return this.getTemp(`${_uri}getDataSetTemplateById.do`, {
            datasetId, templateId
        });
    }

    //删除模板
    delTemplate({datasetId, templateId}) {
        return this.getTemp(`${_uri}delDataSetTemplate.do`, {
            datasetId, templateId
        });
    }

    //获取字段是否能设置下拉
    checkFieldSelection({datasetId, field}) {
        return this.getTemp(`${_uri}getDataSetCheckField.do`, {
            datasetId, field
        });
    }


    //获取字段值列表
    getFieldValuesByKeyWord({datasetId = "", fieldName = "", keyWord = "", page = 1, rows = 20}) {
        return this.post(`${_uri}getDataSetFieldByQuery.do`, {
            datasetId, fieldName, keyWord, page, rows
        });
    }
}

export default new extractdataactionApi();

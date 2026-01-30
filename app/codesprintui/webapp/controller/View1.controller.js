sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "con/olamagri/codesprintui/model/formatter",
     "sap/m/BusyDialog"
], (Controller, formatter, BusyDialog) => {
    "use strict";

    return Controller.extend("con.olamagri.codesprintui.controller.View1", {
        formatter: formatter,
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/odata/v4/dashboard/"
            });
            this.getView().setModel(oModel);
            this.getOwnerComponent().getModel("codesprintMainModel").setData(oModel.oData);
            // this.byId("id_PriorityBreakDown").bindElement("/PriorityBreakdown");
            // this.byId("id_Remediation").bindElement("/Remediation");

                this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            this.BusyDialog = new BusyDialog();
            this.BusyDialog.open();
            const oModel = this.getView().getModel();

            const aPaths = [
                "/ScanSummary",
                "/PriorityBreakdown",
                "/Remediation"
            ];

            Promise.all(
                aPaths.map(sPath =>
                    oModel.bindContext(sPath).requestObject()
                )
            ).then(aResults => {
                // let resolved = 0;
                // let inProgress = 0;
                // let pending = 0;
                // let progressSum = 0;

                // aResults.forEach(o => {
                //     resolved += o.value[0].resolved;
                //     inProgress += o.value[0].inProgress;
                //     pending += o.value[0].pending;
                //     progressSum += o.value[0].progress;
                // });

                const codesprintMainModel = new sap.ui.model.json.JSONModel();
              //  this.getOwnerComponent().getModel("codesprintMainModel").setData(codesprintMainModel.getData());
                 this.getOwnerComponent().getModel("codesprintMainModel").setData(aResults);
                 this.BusyDialog.close();
            });
            //  this.getOwnerComponent().getModel("LineofBusinessModel").setData(oFooterModel.getData());
        
        },
        onUpdateFinished: function (oEvent) {
            debugger;
        },
        onTilePress: function(oEvent){
            debugger;
            this.getOwnerComponent().getRouter().navTo("LineOfBusinessProgress");
        },
        onExportPress: function(oEvent){
            debugger;
        }
    });
});
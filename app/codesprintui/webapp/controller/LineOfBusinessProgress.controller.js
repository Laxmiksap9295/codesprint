sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "con/olamagri/codesprintui/model/formatter",
    "sap/m/BusyDialog"
], (Controller, formatter, BusyDialog) => {
    "use strict";

    return Controller.extend("con.olamagri.codesprintui.controller.LineOfBusinessProgress", {
        formatter: formatter,
        onInit() {
            const oBusinessModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/odata/v4/dashboard/"
            });
            this.getView().setModel(oBusinessModel);
            // this.getView().bindElement("/Finance");
            // this.getView().bindElement("/Materials");
            this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            this.BusyDialog = new BusyDialog();
            this.BusyDialog.open();
            const oModel = this.getView().getModel();

            const aPaths = [
                "/Finance",
                "/Materials",
                "/Sales",
                "/Controlling",
                "/Human",
                "/Production",
                "/Quality",
                "/Others"
            ];

            Promise.all(
                aPaths.map(sPath =>
                    oModel.bindContext(sPath).requestObject()
                )
            ).then(aResults => {
                let resolved = 0;
                let inProgress = 0;
                let pending = 0;
                let progressSum = 0;

                aResults.forEach(o => {
                    resolved += o.value[0].resolved;
                    inProgress += o.value[0].inProgress;
                    pending += o.value[0].pending;
                    progressSum += o.value[0].progress;
                });

                const oFooterModel = new sap.ui.model.json.JSONModel({
                    avgProgress: Math.round(progressSum / aResults.length),
                    resolved,
                    inProgress,
                    pending
                });

                this.getView().setModel(oFooterModel, "footer");
                this.getOwnerComponent().getModel("LineofBusinessModel").setData(oFooterModel.getData());
                this.BusyDialog.close();
            });
            //  this.getOwnerComponent().getModel("LineofBusinessModel").setData(oFooterModel.getData());
        },

        onBackPage: function (oEvent) {
            debugger;
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        onAfterRendering: function (oEvent) {
            debugger;
        },
        onBeforeRendering: function (oEvent) {
            debugger;
        }

    });
});
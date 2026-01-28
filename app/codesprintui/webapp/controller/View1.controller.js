sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "con/olamagri/codesprintui/model/formatter"
], (Controller, formatter) => {
    "use strict";

    return Controller.extend("con.olamagri.codesprintui.controller.View1", {
        formatter: formatter,
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/odata/v4/dashboard/"
            });
            this.getView().setModel(oModel);
            // this.byId("id_PriorityBreakDown").bindElement("/PriorityBreakdown");
            // this.byId("id_Remediation").bindElement("/Remediation");
        },
        onUpdateFinished: function (oEvent) {
            debugger;
        },
        onTilePress: function(oEvent){
            debugger;
            this.getOwnerComponent().getRouter().navTo("LineOfBusinessProgress");
        }
    });
});
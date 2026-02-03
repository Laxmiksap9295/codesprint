sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "con/olamagri/codesprintui/model/formatter",
    "sap/m/BusyDialog",
    "sap/m/MessageBox"
], (Controller, formatter, BusyDialog, MessageBox) => {
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
        onTilePress: function (oEvent) {
            debugger;
            this.getOwnerComponent().getRouter().navTo("LineOfBusinessProgress");
        },
        onExportPress: function (oEvent) {
            debugger;
            this.SelectdBtn = "";
            this.exportDialog = new sap.m.Dialog({
                title: "Export Data",
                type: "Message",
                content: [
                    new sap.m.RadioButton({
                        text: "Main Status Data",
                        selected: false,
                        select: function (RBtn) {
                            debugger;
                            this.SelectdBtn = RBtn.getSource().getText();
                        }.bind(this)
                    }),
                    new sap.m.RadioButton({
                        text: "Priority BreakDown",
                        selected: false,
                        select: function (RBtn) {
                            debugger;
                            this.SelectdBtn = RBtn.getSource().getText();
                        }.bind(this)
                    }),
                    new sap.m.RadioButton({
                        text: "Remediation Strategy",
                        selected: false,
                        select: function (RBtn) {
                            debugger;
                            this.SelectdBtn = RBtn.getSource().getText();
                        }.bind(this)
                    })

                ],
                beginButton: new sap.m.Button({
                    text: "OK",
                    press: function (Actions) {
                        debugger;
                        if (this.SelectdBtn) {
                            if (this.SelectdBtn === "Main Status Data") {
                                // Convert JSON to CSV
                                var csvContent = "data:text/csv;charset=utf-8,";
                                csvContent += "ID,Issues Found,Lines Of Code,Scan Duration,Total Packages\n"; // Header row
                                if (this.getOwnerComponent().getModel("codesprintMainModel")) {
                                    // this.getOwnerComponent().getModel("codesprintMainModel").getData().forEach(function (rows) {
                                    //     csvContent += rows.ID + "," + rows.issuesFound + "," + rows.linesOfCode + "," + rows.scanDuration + "," + rows.totalPackages + "\n";
                                    // })
                                    var rows = this.getOwnerComponent().getModel("codesprintMainModel").getData()[0];
                                    csvContent += rows.ID + "," + rows.issuesFound + "," + rows.linesOfCode + "," + rows.scanDuration + "," + rows.totalPackages + "\n";
                                    // Create a download link and trigger the download
                                    var encodedUri = encodeURI(csvContent);
                                    var link = document.createElement("a");
                                    link.setAttribute("href", encodedUri);
                                    link.setAttribute("download", "CodeSprintData.csv");
                                    document.body.appendChild(link); // Required for FF
                                    link.click(); // This will download the data file named "data.csv"
                                    document.body.removeChild(link); // Clean up
                                } else {
                                    sap.m.MessageToast.show("No Data...");
                                }
                            } else if (this.SelectdBtn === "Priority BreakDown") {
                                // Convert JSON to CSV
                                var csvContent = "data:text/csv;charset=utf-8,";
                                csvContent += "ID,High Priority,Medium Priority, Low Priority \n"; // Header row
                                if (this.getOwnerComponent().getModel("codesprintMainModel")) {
                                    // this.getOwnerComponent().getModel("codesprintMainModel").getData().forEach(function (rows) {
                                    //     csvContent += rows.ID + "," + rows.issuesFound + "," + rows.linesOfCode + "," + rows.scanDuration + "," + rows.totalPackages + "\n";
                                    // })
                                    var rows = this.getOwnerComponent().getModel("codesprintMainModel").getData()[1].value[0];
                                    csvContent += rows.ID + "," + rows.highPriority + "," + rows.mediumPriority + "," + rows.lowPriority + "\n";
                                    // Create a download link and trigger the download
                                    var encodedUri = encodeURI(csvContent);
                                    var link = document.createElement("a");
                                    link.setAttribute("href", encodedUri);
                                    link.setAttribute("download", "PriorityBreakDown.csv");
                                    document.body.appendChild(link); // Required for FF
                                    link.click(); // This will download the data file named "data.csv"
                                    document.body.removeChild(link); // Clean up
                                } else {
                                    sap.m.MessageToast.show("No Data...");
                                }
                            } else {
                                // Convert JSON to CSV
                                var csvContent = "data:text/csv;charset=utf-8,";
                                csvContent += "ID,Automatic Count,Manual Count,Auto Fix Coverage,Auto Coverage\n"; // Header row
                                if (this.getOwnerComponent().getModel("codesprintMainModel")) {
                                    // this.getOwnerComponent().getModel("codesprintMainModel").getData().forEach(function (rows) {
                                    //     csvContent += rows.ID + "," + rows.issuesFound + "," + rows.linesOfCode + "," + rows.scanDuration + "," + rows.totalPackages + "\n";
                                    // })
                                    var rows = this.getOwnerComponent().getModel("codesprintMainModel").getData()[2].value[0];
                                    csvContent += rows.ID + "," + rows.automaticCount + "," + rows.manualCount + "," + rows.autoFixCoverage + "," + rows.autoCoverage + "\n";
                                    // Create a download link and trigger the download
                                    var encodedUri = encodeURI(csvContent);
                                    var link = document.createElement("a");
                                    link.setAttribute("href", encodedUri);
                                    link.setAttribute("download", "RemidiationStrategy.csv");
                                    document.body.appendChild(link); // Required for FF
                                    link.click(); // This will download the data file named "data.csv"
                                    document.body.removeChild(link); // Clean up
                                } else {
                                    sap.m.MessageToast.show("No Data...");
                                }
                            }
                        } else {
                            MessageBox.error("Please select atleast one...");
                            return;
                        }
                        this.exportDialog.close();
                    }.bind(this),
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: function (Actions) {
                        this.exportDialog.close();
                    }.bind(this),
                }),

            });
            this.exportDialog.open();

            // // Convert JSON to CSV
            // var csvContent = "data:text/csv;charset=utf-8,";
            // csvContent += "ID,Issues Found,Lines Of Code,Scan Duration,Total Packages\n"; // Header row

            // // aData.forEach(function(row) {
            // //     csvContent1 += row.Name + "," + row.Age + "," + row.City + "\n";
            // // });
            // if (this.getOwnerComponent().getModel("codesprintMainModel")) {
            //     this.getOwnerComponent().getModel("codesprintMainModel").getData().forEach(function (rows) {
            //         csvContent += rows.ID + "," + rows.issuesFound + "," + rows.linesOfCode + "," + rows.scanDuration + "," + rows.totalPackages + "\n";
            //     })
            //     // Create a download link and trigger the download
            //     var encodedUri = encodeURI(csvContent);
            //     var link = document.createElement("a");
            //     link.setAttribute("href", encodedUri);
            //     link.setAttribute("download", "CodeSprintData.csv");
            //     document.body.appendChild(link); // Required for FF

            //     link.click(); // This will download the data file named "data.csv"
            //     document.body.removeChild(link); // Clean up
            // } else {
            //     sap.m.MessageToast.show("No Data...");
            // }

        }
    });
});
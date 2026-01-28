sap.ui.define([], function () {
    "use strict";

    return {

        getVisible: function (oVal) {
            if (oVal === "E") {
                return true;
            } else {
                return false;
            }
        },
        fnRemoveSpace: function (vValue) {
            if (vValue && !isNaN(vValue)) {
                vValue = vValue.replace(/[^ -~]+/g, "");
                vValue = Number(vValue).toFixed(2);
            } else {
                vValue = "0.00";
            }
            return vValue;
        },
        getVisible1: function (oVal) {
            if (oVal === "X") {
                return true;
            } else {
                return false;
            }
        },
        getVisible2: function (oVal) {
            if (oVal === "X") {
                return false;
            } else {
                return true;
            }
        },
        fnRemoveZero: function (sValue) {
            if (sValue !== null && sValue !== undefined && sValue !== "" && Number(sValue)) {
                return Number(sValue);
            }
            else return sValue;
        },
        Flag: function (oValue) {
            if (oValue === "X") { return "Yes"; } else { return "No"; }
        },
        trimShortText: function (oValue) {
            if (oValue) {
                return oValue.split("-MOB")[0];
            }
            else return oValue;
        },

        getType: function (oVal) {
            if (oVal >= 80 ) {
                return "Success";
            } else if (oVal < 80 && oVal >= 60) {
                return "Information";
            } else if (oVal < 60 && oVal >= 40) {
                return "Warning";
            } else if (oVal < 40) {
                return "Error";
            }
        },

        getIcon: function (oVal) {
            if (oVal === "S") {
                return "sap-icon://message-success";
            } else if (oVal === "E") {
                return "sap-icon://message-error";
            } else if (oVal === "W") {
                return "sap-icon://message-warning";
            } else if (oVal === "I") {
                return "sap-icon://message-information";
            }
        },
        getClass: function (oVal, oVal1) {
            debugger
            if (oVal === "S") { return oVal1; } else {
                return oVal1;
            }
        },

        getVisibleHBox: function () {

        },

        getHoursMinsformat: function (total_minutes) {
            if (total_minutes) {
                total_minutes = Number(total_minutes);
                var total_hours = parseInt(Math.floor(total_minutes / 60));
                var minutes = parseInt(total_minutes % 60);
                return total_hours + "hrs " + minutes + "mins";
            } else {
                return "0 hrs 0 mins";
            }
        },

        getCheckMark: function (oValue) {
            if (oValue) {
                return "X";
            } else {
                return "";
            }
        },
        getDateValue_Cl: function (oValue) {
            if (oValue) {
                var oDateOutputFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattren: "dd/MM/YYYY"
                });
                //	var odateVal = new Date(oValue);
                return oDateOutputFormat.format(oValue);
            } else {
                return "";
            }
        },
        getTimeValue_Cl: function (oValue) {
            debugger
            if (oValue) {
                return oValue.slice(2, 4) + ":" + oValue.slice(5, 7) + ":" + oValue.slice(8, 10)
            } else {
                return "";
            }

        }





    }







});

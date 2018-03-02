﻿
function newFileCursorCache() {

    let fileCursorCache = {
        getFileCursor: getFileCursor,
        setDatetime: setDatetime,
        setTimePeriod: setTimePeriod,
        initialize: initialize
    }

    let fileCloud;

    let marketFiles = new Map;
    let fileCursors = new Map;

    return fileCursorCache;

    function initialize(pTeamCodeName, pBotCodeName, pProductCodeName, pSetCodeName, pExchange, pMarket, pDatetime, pTimePeriod, callBackFunction) {

        let product = ecosystem.getProduct(ecosystem.getBot(ecosystem.getTeam(pTeamCodeName), pBotCodeName), pProductCodeName);

        if (product === undefined) {

            throw "Product not found at this bot of the ecosystem! - pTeamCodeName = " + pTeamCodeName + ", pBotCodeName = " + pBotCodeName + ", pProductCodeName = " + pProductCodeName;

        }

        let exchange = ecosystem.getExchange(product, pExchange);

        if (exchange === undefined) {

            throw "Exchange not supoorted by this product of the ecosystem! - pTeamCodeName = " + pTeamCodeName + ", pBotCodeName = " + pBotCodeName + ", pProductCodeName = " + pProductCodeName + ", pExchange = " + pExchange;

        }

        let productSet = ecosystem.getSet(product, pSetCodeName);

        if (productSet === undefined) {

            throw "Set not found at this product of the ecosystem! - pTeamCodeName = " + pTeamCodeName + ", pBotCodeName = " + pBotCodeName + ", pProductCodeName = " + pProductCodeName + ", pSetCodeName = " + pSetCodeName;

        }

        fileCloud = newFileCloud();
        fileCloud.initialize(pTeamCodeName, pBotCodeName);

        /* Now we will get the daily files */

        for (i = 0; i < dailyFilePeriods.length; i++) {

            let periodTime = dailyFilePeriods[i][0];
            let periodName = dailyFilePeriods[i][1];

            if (productSet.validPeriods.includes(periodName) === true) {

                let fileCursor = newFileCursor();
                fileCursor.initialize(fileCloud, productSet, exchange, pMarket, periodName, periodTime, pDatetime, pTimePeriod, onFileReceived);

                fileCursors.set(periodTime, fileCursor);

                function onFileReceived() {

                    callBackFunction(); // Note that the call back is called for every file loaded at each cursor.

                }
            }
        }
    }

    function getFileCursor(pPeriod) {

        return fileCursors.get(pPeriod);

    }

    function setDatetime(pDatetime) {

        fileCursors.forEach(setDatetimeToEach)

        function setDatetimeToEach(value, key, map) {

            value.setDatetime(pDatetime);

        }
    }

    function setTimePeriod(pTimePeriod) {

        fileCursors.forEach(setTimePeriodToEach)

        function setTimePeriodToEach(value, key, map) {

            value.setTimePeriod(pTimePeriod);

        }
    }
}
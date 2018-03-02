﻿
function newEcosystem() {

    let ecosystem = {
        getTeam: getTeam,
        getTeams: getTeams,
        getBot: getBot,
        getProduct: getProduct,
        getSet: getSet,
        getExchange: getExchange, 
        initialize: initialize
    }
 
    const ECOSYSTEM = "@ecosystem.json@";

    return ecosystem;


    function initialize() {


    }


    function getTeams() {

        return ECOSYSTEM.devTeams;

    }

    function getTeam(pTeamCodeName) {

        for (let i = 0; i < ECOSYSTEM.devTeams.length; i++) {

            if (ECOSYSTEM.devTeams[i].codeName === pTeamCodeName) {

                return ECOSYSTEM.devTeams[i];
            }
        }
    }

    function getBot(pTeam, pBotCodeName) {

        for (let i = 0; i < pTeam.bots.length; i++) {

            if (pTeam.bots[i].codeName === pBotCodeName) {

                return pTeam.bots[i];
            }
        }
    }

    function getProduct(pBot, pProductCodeName) {

        for (let i = 0; i < pBot.products.length; i++) {

            if (pBot.products[i].codeName === pProductCodeName) {

                return pBot.products[i];
            }
        }
    }

    function getSet(pProduct, pSetCodeName) {

        for (let i = 0; i < pProduct.sets.length; i++) {

            if (pProduct.sets[i].codeName === pSetCodeName) {

                return pProduct.sets[i];
            }
        }
    }

    function getExchange(pProduct, pName) {

        for (let i = 0; i < pProduct.exchangeList.length; i++) {

            if (pProduct.exchangeList[i].name === pName) {

                return pProduct.exchangeList[i];
            }
        }
    }



    return false;
}


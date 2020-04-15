export default {
    getIdCard(idCardResult) {
        let idCard = {
            idNum: ""
        };
        let resultStr = "";
        for (let i = 0; i < idCardResult.length; i += 2) {
            resultStr += String.fromCharCode(parseInt(idCardResult[i] + idCardResult[i + 1], 16));
        }
        let idNumStr = resultStr.substring(122, 158);
        for (let i = 0; i < idNumStr.length; i += 2) {
            idCard.idNum += idNumStr[i];
        }
        return idCard;
    },
    readQrCode(ticket) {
        if (process.env.NODE_ENV === "production") {
            window.bridge.webAPI_readTicket(0x02, function (res) {
                ticket.qrCode = res.code;
            });
        } else {
            ticket.qrCode = "aasdfasdf";
        }
    },
    readIdCard(idCard) {
        let self = this;
        if (process.env.NODE_ENV === "production") {
            window.bridge.webAPI_readTicket(0x04, function (res) {
                if (res.IDCard) {
                    let idCardReturn = self.getIdCard(res.IDCard);
                    idCard.idNum = idCardReturn.idNum;
                }
            });
        } else {
            idCard.idNum = "4302346234";
        }
    },
    playVideo(fileName) {
        if (process.env.NODE_ENV === "production") {
            window.bridge.webAPI_Audio(fileName);
        }
    }
}
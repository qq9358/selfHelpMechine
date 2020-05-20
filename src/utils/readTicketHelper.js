export default {
    getIdCard(idCardByte) {
        let idCard = {
            idNum: "",
            name: ""
        };
        let resultStr = "";
        for (let i = 0; i < idCardByte.length; i += 2) {
            resultStr += String.fromCharCode(parseInt(idCardByte[i] + idCardByte[i + 1], 16));
        }
        for (let i = 0; i < 60; i += 4) {
            let num = parseInt(idCardByte[i] + idCardByte[i + 1], 16) + parseInt(idCardByte[i + 2] + idCardByte[i + 3], 16) * 256;
            if (num > 256) {
                idCard.name += String.fromCharCode(num);
            }
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
            ticket.qrCode = "J1200511000001686";
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
            let idResult = "68543F65436720002000200020002000200020002000200020002000200031003000310031003900380031003000380032003500566E57530177496CFF5BBF53999F3396479527595753E89537003400F75320002000200020002000200020002000200020002000200020002000200020002000200020002000340033003000370032003200310039003800310030003800320035003000300031003300496CFF5BBF536C51895B405C2000200020002000200020002000200020003200300030003500310032003100340032003000310035003100320031003400574C66007E00320000FF851B5151513E710DD564F336A76921E5AE51D42608DD562223BBA0C4F277776A26CA79FE0DEF1275606D4ACD9FC49FD1EA0317F4BC68EF009D804A36C83C8690CF83B11F7C5EEE18CE75C4C2C651AED85251515A3E9C6197C95F0B20EEE06CBCB1A098C75DD78B51ABCDBC263C28E3EDD175B065ADEEA8201EEC0F1A274D51FA2186B76ACD691C020D69F599E9B300B1CDF303A741D1D30B71212C7AA77E19AF402E9FB88AD0514798CC9846793EFC1C28B48722DBF16A072C428E43E7DB3927C06FE3050138C8764C6AAC49FE74F3CABCAD18F9E6D9C31C5BA8909D7F4FD874B2E8E18F6C593B9D07B08C9BF88FC5F1B7CA12C5D6ED7A30E13674BE2C5D44EB5B3C1878AB8C69A38CCE45C707D7DFDF11FB5AC2695835B9C0BCC6E419B05525271D205565492D051756EE841C06C696927A9247AAC8225085C644B640DC722916F372DE24A66DEC6208C2C9C8775CD1890042C9A42437C5C8290ED8ABE33315D27139AF94410FF4C2DE6100DA939F6F94A5EA9030D8014C645986C0C0C4499C71E2AE51409C92E55F78939C749715BDDD38A82D4650C44B14724A6B014CDA27AF08BC7ACD267B7CF833D8B5EAD17219AC084CE437305A7C1732129D43BD1009073D9FF9B37C8537C0A75D9124D1A95AEFC14266C6C59A72AB9DA563B65AAAE82BA0C656A1F73437CC599DEC9CBF06BE6AE1942EDDF14EB23B020F8F8BD7BFAA70C91086C1815D5295BB9BD02132C39CBF9F04DB00EFF2E05FEB3CE57006B3341B433B83CFB7DC04ABBD6037D5A87B0D244278AF5CFF7E6BFD85FF7E05B051FF8A3C6E668B920BCD96079D4264B801BE1502C2CEA28E0A90CE3E888C93871D1A2668A182609C0941E36DA8015B817D87A71D5094F8F5BE3379362644C22252CBF033531128375E177470D93F97B23C265C1659A82661768A42FB849C3BD292F8EBECBDF638DD475278C4ACCD45BFCC19AE51E82977C36DDE9013692BA0DDD6E6FD832BA93BAD46F52F297ACD4EC1599BCF60D3B8CFDC5F9F3CEEDAA2820DA170182CCD0EF29162568F3E99B2BDA5A43C7519DA89601151E414A6680F9BCF14F7B9AF4F3D1E4854DEAF21AC06E2604DBD6B28D704464DD9FE772F816675CDF7AA29EF11FFC50EC6B4FF0DF370A40C42E2C6E1B8F1756E6CDE831FE48F60A5B7B3596EDE0387B446A50B141A81C3F9FA098322555713CF24245FD55A3E090A2BEC30AABE2BEEB5842EABC0020115D7C387DB330A16FDBC71325F5395E565D3D6062236D2EDB2FCB4C662C2F4ECB8B6F403A14E912456C0502DF9401F0966E98C3130DC3C2F3524844348C772CC5A3E80F1A0C9E2201311A6EF8DA5AA5F3D34E2F081EA3A3789B3AE516ADD849BD6E0665624FD2248AA13CCA0B573C37530AE51A9AE5156A211B09B8F64149C20F43665787F95FF67E3D6";
            let idCardObj = this.getIdCard(idResult);
            idCard.idNum = idCardObj.idNum;
            idCard.name = idCardObj.name;
        }
    },
    playVideo(fileName) {
        if (process.env.NODE_ENV === "production") {
            window.bridge.webAPI_Audio(fileName);
        }
    },
    getIdNumAge(idNum){
        const birth = idNum.substring(6,10) + "-" + idNum.substring(10,12) + "-" + idNum.substring(12,14);
        const age = this.jsGetAge(birth);
        return age;
    },
    jsGetAge(strBirthday) { //传入形式yyyy-MM-dd
        //strBirthday = util.formatTime(strBirthday);转换成yyyy-MM-dd形式
        let returnAge
        let strBirthdayArr = strBirthday.split('-')
        let birthYear = strBirthdayArr[0]
        let birthMonth = strBirthdayArr[1]
        let birthDay = strBirthdayArr[2]
        let d = new Date()
        let nowYear = d.getFullYear()
        let nowMonth = d.getMonth() + 1
        let nowDay = d.getDate()
        if (nowYear == birthYear) {
            returnAge = 0 //同年 则为0岁
        } else {
            let ageDiff = nowYear - birthYear //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    let dayDiff = nowDay - birthDay //日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1
                    } else {
                        returnAge = ageDiff
                    }
                } else {
                    let monthDiff = nowMonth - birthMonth //月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1
                    } else {
                        returnAge = ageDiff
                    }
                }
            } else {
                returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge //返回周岁年龄
    }
}
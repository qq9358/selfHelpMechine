import qrCodeHelper from "@/utils/qrCodeHelper.js";
import printTicketService from "@/services/printTicketService.js";

export default {
    async setCanvas(myCanvas, ticket) {
        myCanvas.width = 1200; // 不可在css或者标签上直接设置画布大小，这样展示的图片会进行拉伸收缩，效果很差
        myCanvas.height = 560;
        let qrCodeImg = new Image();
        qrCodeImg.src = await qrCodeHelper.createQrCodeAsync(ticket.ticketCode, 240);
        var image = new Image();

        await this.drawCanvas(qrCodeImg, myCanvas, ticket);

        image.src = myCanvas.toDataURL("image/jpeg", 1.0);

        await this.rotateImage(image)

        return image.src;
    },
    async drawCanvas(qrCodeImg, myCanvas, ticket) {
        let promise = new Promise(reslove => {
            qrCodeImg.onload = async function () {
                let canvasSet = myCanvas.getContext("2d");
                // let imageData = canvasSet.getImageData(0, 0, myCanvas.width, myCanvas.height);
                // for (let i = 0; i < imageData.data.length; i += 4) {
                //     // 当该像素是透明的，则设置成白色
                //     if (imageData.data[i + 3] == 0) {
                //         imageData.data[i] = 255;
                //         imageData.data[i + 1] = 255;
                //         imageData.data[i + 2] = 255;
                //         imageData.data[i + 3] = 255;
                //     }
                // }
                // canvasSet.putImageData(imageData, 0, 0);
                canvasSet.fillStyle = "#ffffff";
                canvasSet.fillRect(0, 0, myCanvas.width, myCanvas.height);

                // canvasSet.rotate(45 * Math.PI / 180); 
                canvasSet.fillStyle = "#00ff00";
                canvasSet.font = "38px myFont";
                canvasSet.fillText("副    卷", 140, 40);
                canvasSet.font = "23px myFont";
                canvasSet.fillText("票    类:", 20, 120);
                canvasSet.fillText(ticket.ticketTypeName, 20, 160);
                canvasSet.fillText("有效期至：", 20, 200);
                canvasSet.fillText(
                    ticket.eTime.substring(0, ticket.eTime.length - 3),
                    20,
                    240
                );
                canvasSet.fillText("人    次：", 20, 280);

                canvasSet.drawImage(this, 17, 310);
                canvasSet.fillText(ticket.personNum, 20, 320);
                canvasSet.fillText(ticket.ticketCode, 20, 550);
                canvasSet.font = "40px myFont";
                canvasSet.fillText(ticket.companyName, 430, 40);
                canvasSet.font = "34px myFont";
                canvasSet.fillText("购票时间：" + ticket.cTime, 430, 120);
                canvasSet.fillText("有效期至：" + ticket.eTime, 430, 180);
                canvasSet.fillText("分 销 商：" + ticket.distributorName, 430, 240);
                canvasSet.fillText("票    类：" + ticket.ticketTypeName, 430, 300);
                canvasSet.fillText("总    价：" + ticket.reaMoney + "元", 430, 360);
                canvasSet.fillText("人    次：" + ticket.personNum, 430, 420);
                canvasSet.fillText("票    号：" + ticket.ticketCode, 430, 480);
                canvasSet.fillText("售 票 点：" + ticket.salePointName, 430, 540);

                reslove();
            }
        });

        await promise;
    },
    async rotateImage(image) {
        let rotateImg = new Image();
        rotateImg.src = image.src;
        let imgCanvas = document.createElement("canvas");
        let promise = new Promise(reslove => {
            rotateImg.onload = async function () {
                // imgCanvas.width = rotateImg.height;
                // imgCanvas.height = rotateImg.width;
                imgCanvas.width = 560;
                imgCanvas.height = 1200;
                let ctx = imgCanvas.getContext("2d");
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, imgCanvas.width, imgCanvas.height);
                ctx.rotate((90 * Math.PI) / 180);
                ctx.drawImage(rotateImg, 0, -rotateImg.height);
                reslove();
            };
        });
        await promise;

        image.src = imgCanvas.toDataURL("image/jpeg", 1.0);
        promise = new Promise(reslove => {
            image.onload = function () {
                reslove();
            }
        });
        await promise;
    },
    base64ToBlob(base64, type) {
        // 将base64转为Unicode规则编码
        let bstr = window.atob(base64, type),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n); // 转换编码后才可以使用charCodeAt 找到Unicode编码
        }
        return new Blob([u8arr], {
            type
        });
    },
    async blobToBytes(blob) {
        //将Blob 对象转换成 ArrayBuffer
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        let buf = [];
        let promise = new Promise(reslove => {
            reader.onload = async function () {
                buf = new Uint8Array(reader.result);
                reslove();
            };
        });
        await promise;

        return buf;
    },
    base64ToNumberArray(base64Data, type) {
        let numberArray = [];
        let bstr = window.atob(base64Data, type);
        for (let i = 0; i < bstr.length; i++) {
            numberArray.push(parseInt(bstr.charCodeAt(i)));
        }
        return numberArray;
    },
    async getPrinterArray(ticket) {
        let result = await printTicketService.print(ticket);
        let bytesToImage = this.bytesToImage(result);
        this.iFfSrc = bytesToImage.src;
        await this.rotateImage(bytesToImage);

        let base64Data = bytesToImage.src.replace(/^data:image\/(png|jpeg);base64,/, "");
        return this.base64ToNumberArray(base64Data, "image/jpeg");
    },
    imageToNumberArray(image) {
        let base64Data = image.src.replace(/^data:image\/(png|jpeg);base64,/, "");
        return this.base64ToNumberArray(base64Data, "image/jpeg");
    },
    bytesToImage(bytes) {
        let binary = "";
        let unit8Array = new Uint8Array(bytes);
        for (let i = 0; i < unit8Array.byteLength; i++) {
            binary += String.fromCharCode(unit8Array[i]);
        }
        let btoaStr = window.btoa(binary);
        let image = new Image();
        image.src = 'data:image/jpeg;base64,' + btoaStr;
        return image;
    }
}

import QrCode from "qrcode";

export default {
    async createQrCodeAsync(value,width) {
        try {
            return await QrCode.toDataURL(value, {
                width: width
            });
        } catch (ex) {
            console.log(ex);
        }
    }
}
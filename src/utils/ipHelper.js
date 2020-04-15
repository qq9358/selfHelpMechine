export default {
  /**
   * 是否是内网IP
   * @return {Boolse} true|false
   */
  isIntranetIp(url) {
    // 获取当前页面url
    let curPageUrl = url;

    //去掉前缀
    const reg1 = /(http|ftp|https|www):\/\//g;
    curPageUrl = curPageUrl.replace(reg1, "");

    //替换冒号为一点
    curPageUrl = curPageUrl.replace(/:+/g, ".");

    if (/^localhost+/.test(curPageUrl.toLowerCase())) return true;

    //通过一点来划分数组
    curPageUrl = curPageUrl.split(".");

    if (!/^\d{1,3}$/.test(curPageUrl[0])) return false;

    const ipAddress =
      curPageUrl[0] + "." + curPageUrl[1] + "." + curPageUrl[2] + "." + curPageUrl[3];

    let isIntranetIp = false;
    const ipNum = this.getIpNum(ipAddress);

    /**
     *私有IP： A类  10.0.0.0    -10.255.255.255
     *        B类  172.16.0.0  -172.31.255.255
     *        C类  192.168.0.0 -192.168.255.255
     *        D类  127.0.0.0   -127.255.255.255(环回地址)
     **/
    const aBegin = this.getIpNum("10.0.0.0");
    const aEnd = this.getIpNum("10.255.255.255");
    const bBegin = this.getIpNum("172.16.0.0");
    const bEnd = this.getIpNum("172.31.255.255");
    const cBegin = this.getIpNum("192.168.0.0");
    const cEnd = this.getIpNum("192.168.255.255");
    const dBegin = this.getIpNum("127.0.0.0");
    const dEnd = this.getIpNum("127.255.255.255");
    isIntranetIp =
      this.isInner(ipNum, aBegin, aEnd) ||
      this.isInner(ipNum, bBegin, bEnd) ||
      this.isInner(ipNum, cBegin, cEnd) ||
      this.isInner(ipNum, dBegin, dEnd);

    return isIntranetIp;
  },

  getIpNum(ipAddress) {
    /*获取IP数*/
    const ip = ipAddress.split(".");
    const a = parseInt(ip[0]);
    const b = parseInt(ip[1]);
    const c = parseInt(ip[2]);
    const d = parseInt(ip[3]);
    const ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;

    return ipNum;
  },

  isInner(userIp, begin, end) {
    return userIp >= begin && userIp <= end;
  }
};

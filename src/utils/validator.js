let strategies = {
    required: function (val, name) {
        let result = new ValidateResult();
        if (isNullOrEmpty(val)) {
            result.success = false;
            result.message = name + "不能为空";
            return result;
        }

        return result;
    },
    minLength: function (val, len, name) {
        let result = new ValidateResult();
        if (isNullOrEmpty(val)) {
            return result;
        }

        if (val.length < len) {
            result.success = false;
            result.message = name + "长度不能小于" + len;
            return result;
        }

        return result;
    },
    maxLength: function (val, len, name) {
        let result = new ValidateResult();
        if (isNullOrEmpty(val)) {
            return result;
        }

        if (val.length > len) {
            result.success = false;
            result.message = name + "长度不能大于" + len;
            return result;
        }

        return result;
    },
    minNum: function (val, num, name) {
        let result = new ValidateResult();
        if (isNullOrEmpty(val)) {
            return result;
        }
        if (parseInt(val) < parseInt(num)) {
            result.success = false;
            result.message = name + "数值不能小于" + num;
            return result;
        }

        return result;
    },
    maxNum: function (val, num, name) {
        let result = new ValidateResult();
        if (isNullOrEmpty(val)) {
            return result;
        }
        if (parseInt(val) > parseInt(num)) {
            result.success = false;
            result.message = name + "数值不能大于" + num;
            return result;
        }

        return result;
    },
    isMobile: function (val, name) {
        let result = new ValidateResult();
        if (isNullOrEmpty(val)) {
            return result;
        }

        let pattern = /^1\d{10}$/;
        if (!pattern.test(val)) {
            result.success = false;
            result.message = name + "格式不正确";
            return result;
        }

        return result;
    },
    isIdCard: function (val, name) {
        let result = new ValidateResult();
        if (isNullOrEmpty(val)) {
            return result;
        }

        let failResult = {
            success: false,
            message: name + "格式不正确"
        };
        if (val.length != 15 && val.length != 18) {
            return failResult;
        }

        let pattern =
            val.length === 15
                ? /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
                : /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!pattern.test(val)) {
            return failResult;
        }

        if (val.length === 18) {
            let weightingFactor = [
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
                6,
                3,
                7,
                9,
                10,
                5,
                8,
                4,
                2
            ];
            let total = 0;
            for (let i = 0; i < weightingFactor.length; i++) {
                total += weightingFactor[i] * val[i];
            }
            let code = "10X98765432";
            if (code[total % 11] != val[val.length - 1].toUpperCase()) {
                return failResult;
            }
        }

        return result;
    },

};

function isNullOrEmpty(val) {
    if (val === undefined || val === null || val === "") {
        return true;
    }

    return false;
}

function ValidateResult() {
    this.success = true;
    this.message = "";
}

/* 接受验证的数组
    [{
        value: "test",
        name: "关键词",
        rules: [{
            rule: 'required',
            msg: '关键词不能为空'
        }]
    }] */

export default {
    errorMessage(message) {
        return {
            message: message,
            type: "warning",
            offset: 400,
            center: true,
            customClass: "self-message"
        }
    },
    validate(arr) {
        let result = new ValidateResult();
        for (let i = 0, l1 = arr.length; i < l1; i++) {
            let item = arr[i];
            let stop = false;
            for (let k = 0, l2 = item.rules.length; k < l2; k++) {
                let r = item.rules[k];
                let arg = r.rule.split(":");
                let rule = arg.shift();
                if (r.type) {
                    arg.unshift(r.type);
                }
                arg.unshift(item.value);
                arg.push(item.name);
                let status = strategies[rule].apply(null, arg);
                if (!status.success) {
                    result = status;
                    if (r.msg) {
                        result.message = r.msg;
                    }
                    stop = true;
                    break;
                }
            }
            if (stop) break;
        }
        return result;
    }
}
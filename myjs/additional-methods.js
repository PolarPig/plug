//身份证正则表达式校验
jQuery.validator.addMethod("regexIdCard", function(value, element, params) {
	var regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	var flag = true;
	
	if (value.length == 18) {
		if (parseInt(value.substr(10, 2)) > 12 || parseInt(value.substr(10, 2)) <= 0 
				|| parseInt(value.substr(12, 2)) > 31 || parseInt(value.substr(12, 2)) <= 0) {
			flag = false;
		}
	} else {
		if (parseInt(value.substr(9, 2)) > 12 || parseInt(value.substr(9, 2)) <= 0 
				|| parseInt(value.substr(11, 2)) > 31 || parseInt(value.substr(11, 2)) <= 0) {
			flag = false;
		}
	}
	
	return this.optional(element) || (regex.test(value) && flag);
}, "身份证不存在!");
	
//电话正则表达式校验
jQuery.validator.addMethod("regexMobile", function(value, element, params) {
	var regex = /^\(?0[1-9]\d{1,3}\)?[-]?[2-9]\d{2,3}[-]?\d{4}$|^1[34578]\d{9}$/;
	return this.optional(element) || regex.test(value);
}, "电话号码格式不正确");

//医保卡号正则表达式校验
jQuery.validator.addMethod("regexCarteVital", function(value, element, params) {
	
	return this.optional(element) || (value.length <= 18);
}, "医保卡号格式错误!");

//小数正则表达式校验
jQuery.validator.addMethod("regexDecimal", function(value, element, params) {
	var regex = /^([1-9][0-9]{0,2})(\.[0-9]{1,2})?$/;
	return this.optional(element) || regex.test(value);
}, "数据必须小于1000,且最多保留2位小数!");

jQuery.validator.addMethod("regexTODeath", function(value, element, params) {
	var regex = /^(([0-1]{0,1}[0-9]{0,1}[0-9]{0,1}?)(\.[0-9]{0,1})?|([2][0][0]{1}))$/;
	return this.optional(element) || regex.test(value);
}, "数据必须小于200,且最多保留1位小数!");

jQuery.validator.addMethod("regexNumber32", function(value, element, params) {
	var regex = /^\d{1,3}(\.\d{1,2})?$/;
	return this.optional(element) || regex.test(value);
}, "范围在0~999.99之间!");

//体温正则表达式校验
jQuery.validator.addMethod("regexTemperature", function(value, element, params) {
	var regex = /^([1-9][0-9]?)(\.[0-9])?$/;
	return this.optional(element) || regex.test(value);
}, "体温必须小于100,且最多保留1位小数!");

//+-或者小数正则表达式校验
jQuery.validator.addMethod("regexSpecialCharacters", function(value, element, params) {
	var regex = /^([+-]{0,4}|\d{1,2}(\.\d{1,2})?)$/;
	return this.optional(element) || regex.test(value);
}, "所填项必须是'+'或'-'或者数字,且最多保留2位小数!");

/*//现居住地址校验
jQuery.validator.addMethod("validateCrRegionName", function(value, element, params) {
	var crRegionCode = $("#form-residentInfo-add input[name='crRegionName']").data('citypicker').getCode("xnext");
	console.log("crRegionCode:"+crRegionCode);
	
	var flag = true;
	
	if (isNull(crRegionCode)) {
		flag = false;
	}
	
	console.log(flag);
	
	return this.optional(element) || flag;
}, "现居住地址格式错误：请填写到村级别！");

//户籍地址校验
jQuery.validator.addMethod("validateRprRegionName", function(value, element, params) {
	var rprRegionCode = $("#form-residentInfo-add input[name='rprRegionName']").data('citypicker').getCode("xnext");
	console.log("rprRegionCode:"+rprRegionCode);
	var flag = true;
	
	if (isNull(rprRegionCode)) {
		flag = false;
	}
	
	return this.optional(element) || flag;
}, "户籍地址格式错误：请填写到村级别！");*/

/**
 * autor:shenxc
 * 验证是否是一个正整数
 */
jQuery.validator.addMethod("positiveInteger", function(value, element, params) {
	var regex = /^(0|[1-9]\d*)$/;
	return this.optional(element) || regex.test(value);
}, "格式不正确,请输入一个正整数");
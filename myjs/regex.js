jQuery.validator.addMethod("positiveInteger", function(value, element, params) {
	var regex = /^(0|[1-9]\d*)$/;
	return this.optional(element) || regex.test(value);
}, "格式不正确,请输入一个正整数");

jQuery.validator.addMethod("regexDecimal", function(value, element, params) {
	var regex = /^([1-9][0-9]{0,2})(\.[0-9]{1,2})?$/;
	return this.optional(element) || regex.test(value);
}, "数据必须小于1000,且最多保留2位小数!");

jQuery.validator.addMethod("regexNumber32", function(value, element, params) {
	var regex = /^\d{1,3}(\.\d{1,2})?$/;
	return this.optional(element) || regex.test(value);
}, "范围在0~999.99之间!");

jQuery.validator.addMethod("regexNumber22", function(value, element, params) {
	var regex = /^\d{1,2}(\.\d{1,2})?$/;
	return this.optional(element) || regex.test(value);
}, "范围在0~99.99之间!");

jQuery.validator.addMethod("zregexNumber", function(value, element, params) {
	var regex = /^(0|[1-9][0-9]*)$/;
	return this.optional(element) || regex.test(value);
}, "只能为正整数!");

jQuery.validator.addMethod("regexNumber0t10000", function(value, element, params) {
	var regex = /^(0|10000|[1-9]\d{0,3}?)$/;
	return this.optional(element) || regex.test(value);
}, "范围在0~10000之间!");

jQuery.validator.addMethod("regexNumber0t1000", function(value, element, params) {
	var regex = /^(0|1000|[1-9]\d{0,2}?)$/;
	return this.optional(element) || regex.test(value);
}, "范围在0~1000之间!");

jQuery.validator.addMethod("regexNumber0t200", function(value, element, params) {
	var regex = /^(0|200|1\d{2}|[1-9]\d?)$/;
	return this.optional(element) || regex.test(value);
}, "范围在0~200之间!");

jQuery.validator.addMethod("regexNumber", function(value, element, params) {
	var regex = /^[0-9]*$/;
	return this.optional(element) || regex.test(value);
}, "只能输入数字!");

jQuery.validator.addMethod("decimal52", function(value, element, params) {
	var regex = /^\d{1,3}(\.\d{1,2})?$/;
	return this.optional(element) || regex.test(value);
}, "小于且不等于1000,最多保留2位小数");

jQuery.validator.addMethod("decimal41", function(value, element, params) {
	var regex = /^\d{1,3}(\.\d)?$/;
	return this.optional(element) || regex.test(value);
}, "小于且不等于1000,最多保留1位小数");

jQuery.validator.addMethod("decimal31", function(value, element, params) {
	var regex = /^\d{1,2}(\.\d)?$/;
	return this.optional(element) || regex.test(value);
}, "小于且不等于100,最多保留1位小数");

jQuery.validator.addMethod("decimal53", function(value, element, params) {
	var regex = /^\d{1,2}(\.\d{1,3})?$/;
	return this.optional(element) || regex.test(value);
}, "小于且不等于100,最多保留3位小数");

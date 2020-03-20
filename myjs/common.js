var TypeUtil = function() {
	var isNull = function(obj) {
		return (obj == undefined || null == obj);
	}
	
	var isBlank = function(str) {
		return (isNull(str) || $.trim(str).length == 0);
	}
	
	var isArray = function(v){
		if (typeof Array.isArray === "function") {
			return Array.isArray(v);
		} else {
			return Object.prototype.toString.call(v) === "[object Array]";
		}
	}
	
	var isEmptyArray = function(arr) {
		return (isNull(arr) || (1 > arr.length));
	}
	
	var isObject = function(v) {
		var type = Object.prototype.toString.call(v);
		var rst = false;
		
		if(type == '[object Object]') {
			rst = true;
		}
		
		return rst;
	}
	
	var isExistFunc = function(funcName) {
		try {
			if (typeof (eval(funcName)) == "function") {
				return true;
			}
		} catch (e) {

		}

		return false;
	}
	
	var isExistVar = function(varName) {
		try {
			if (typeof (varName) == "undefined") {
				return false;
			} else {
				return true;
			}
		} catch (e) {

		}

		return false;
	}
	
	var callFunc = function(funcName, param) {
		if (isNull(funcName) || 1 > funcName.length || !isExistFunc(funcName)) {
			return null;
		}

		if (param == undefined) {
			return eval(funcName + "()");
		} else {
			return eval(funcName)(param);
		}
	}
	
	var getVar = function(varName) {
		if (isBlank(varName) || isExistVar(varName)) {
			return null;
		}

		return eval(varName);
	}
	
	return {
		isNull: function(v) {
			return isNull(v);
		},
		isBlank: function(v) {
			return isBlank(v);
		},
		isArray: function(v) {
			return isArray(v);
		},
		isObject: function(v) {
			return isObject(v);
		},
		isEmptyArray: function(v) {
			return isEmptyArray(v);
		},
		isExistFunc: function(funcName) {
			return isExistFunc(funcName);
		},
		isExistVar: function(varName) {
			return isExistVar(varName);
		},
		callFunc: function(funcName, param) {
			return callFunc(funcName, param);
		},
		getVar: function(varName) {
			return getVar(varName);
		}
	};
}();

function isNull(obj) {
	return TypeUtil.isNull(obj);
}

function isBlank(str) {
	return TypeUtil.isBlank(str);
}

function isEmptyArray(arr) {
	return TypeUtil.isEmptyArray(arr);
}
// 全局ajax登陆超时接收验证
$.ajaxSetup({
    complete:function(XMLHttpRequest, textStatus) {
    	if(!TypeUtil.isNull(XMLHttpRequest["responseJSON"])) {
    		var rst = XMLHttpRequest["responseJSON"];
    		
    		if(!TypeUtil.isNull(rst["code"]) && 105 == rst["code"]) {
    			window.location.href = getFullUrl("/");
    		}
    	}
    }
})

function wmAjax(d) {
	d.contentType = 'application/json';
	d.dataType = 'json';
	d.data = JSON.stringify(d.data);
	d.error = function(jqXHR, textStatus, errorThrown) {
		if(!TypeUtil.isNull(jqXHR.status) && 200 == jqXHR.status) {
			return ;
		}
		
		if(0 != jqXHR.status) {
			alertError({msg: "服务端出错，状态码：" + jqXHR.status});
		}
	}
	
	$.ajax(d);
}

function asyncGet(d) {
	d.type = 'GET';
	d.async = true;
	
	wmAjax(d);
}

function asyncPost(d) {
	d.type = 'POST';
	d.async = true;
	
	wmAjax(d);
}

function asyncPut(d) {
	d.type = 'PUT';
	d.async = true;
	
	wmAjax(d);
}

function asyncDel(d) {
	d.type = 'DELETE';
	d.async = true;
	
	wmAjax(d);
}

function syncGet(d) {
	d.type = 'GET';
	d.async = false;
	
	wmAjax(d);
}

function syncPost(d) {
	d.type = 'POST';
	d.async = false;
	
	wmAjax(d);
}

function syncPut(d) {
	d.type = 'PUT';
	d.async = false;
	
	wmAjax(d);
}

function syncDel(d) {
	d.type = 'DELETE';
	d.async = false;
	
	wmAjax(d);
}

function getPageNum(params) {
	return parseInt(params.offset / params.limit) + 1;
}

function initTable(param) {
	if(isNull(param) || isNull(param.id)) {
		return ;
	}

	var temp = getTableConf();
	
	for(var field in param) {
		if(field === 'toolbar') {
			temp.toolbar = '#' + param.toolbar;
		} else if(!isNull(param[field]) && "onLoadSuccess" != field) {
			temp[field] = param[field];
		}
	}
	
	temp["onLoadSuccess"] = function(rst) {
		if(isNull(rst.code)) {
			if(!isNull(param["onLoadSuccess"])) {
				param.onLoadSuccess(rst);
			}
		} else {
			if("105" == rst.code) {
				window.location.href = getFullUrl('');
			}
		}
	};
	
	$('#' + param.id).bootstrapTable(temp);
}

function toJsonObject(form) {
	var arr = form.serializeArray();
	var obj = {};
	
	if(isEmptyArray(arr)) {
		return obj;
	}
	
	for (var i = 0; i < arr.length; i++) {
		var t = arr[i];
		
		if(isNull(t) || isNull(t.name)) {
			continue;
		}
		
		if(obj[t.name]){
            obj[t.name]=""+[obj[t.name],t.value];   
        }else{
            obj[t.name]=t.value;   
        }
	}  
	//alert(JSON.stringify(obj));
    return obj;
}

function toJsonObject2(form) {
	toJsonObject(form);
}

function getTableConf() {
	return {
	        method: 'post',                     //请求方式（*）
	        striped: true,                      //是否显示行间隔色
	        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        pagination: true,                   //是否显示分页（*）
	        sortable: false,                    //是否启用排序
	        sortOrder: "asc",                   //排序方式
	        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	        pageNumber:1,                       //初始化加载第一页，默认第一页
	        pageSize: 20,                       //每页的记录行数（*）
	        pageList: [5, 10, 20, 50, 100],        //可供选择的每页的行数（*）
	        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	        strictSearch: true,
	        showColumns: true,                  //是否显示所有的列
	        showRefresh: true,                  //是否显示刷新按钮
	        minimumCountColumns: 2,             //最少允许的列数
	        clickToSelect: true,                //是否启用点击选中行
	        height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
	        cardView: false,                    //是否显示详细视图
	        detailView: false,                  //是否显示父子表
	        onLoadError: function (status) {
		    	alertError({msg: status + "：数据加载失败！"});
	        }
		};
}

function alertSuccess(data) {
	if(isNull(data.msg)) {
		toastr.success(data);
	} else {
		toastr.success(data.msg);
	}
}

function alertError(data) {
	if(isNull(data.msg)) {
		toastr.error(data);
	} else {
		toastr.error(data.msg);
	}
}

function initToastr() {
	toastr.options = {
	    "closeButton":false,//显示关闭按钮
	    "debug":false,//启用debug
	    "positionClass":"toast-bottom-right",//弹出的位置
	    "showDuration":"1000",//显示的时间
	    "hideDuration":"1000",//消失的时间
	    "timeOut":"5000",//停留的时间
	    "extendedTimeOut":"1000",//控制时间
	    "showEasing":"swing",//显示时的动画缓冲方式
	    "hideEasing":"linear",//消失时的动画缓冲方式
	    "showMethod":"fadeIn",//显示时的动画方式
	    "hideMethod":"fadeOut"//消失时的动画方式
	};
}

function initBootstrapValidator(data) {
	var op = $('#' + data.id).bootstrapValidator('getOptions');
	
	if (!isNull(op)) {
		$('#' + data.id).data('bootstrapValidator').destroy();
	}
	
	$('#' + data.id).bootstrapValidator({
		message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: data.fields
	});
}

var ValidatorComp = function() {
	var createOptions = function(textAlign) {
		return {
	        debug: false,
	        useTooltip: false,
	        preventDuplicates: true,
	        errorElement: 'span', //default input error message container
	        focusInvalid: false, // do not focus the last invalid input
	        ignore: "",
	        errorPlacement: function (error, element) {
	            if (element.is(':radio') || element.is(':checkbox')) {
	                var e = element.parent().parent().parent();
	                var errorstr = error.get(0).innerHTML;
	                if (errorstr != "") {
	                    $(e).popover('destroy');
	                    var validContent = "<font color='red' style='white-space:nowrap'>" + errorstr + "</font>";
	                    $(e).popover({
	                        html: true,
	                        content: validContent,
	                        trigger: "focus",
	                        placement: textAlign,
	                        animation: true
	                    });
	                    $(e).popover('show');
	                }
	            } else {
	                var errorstr = error.get(0).innerHTML;
	                if (errorstr != "") {
	                    $(element).popover('destroy');
	                    var validContent = "<font color='red' style='white-space:nowrap'>" + errorstr + "</font>";
	                    $(element).popover({
	                        html: true,
	                        content: validContent,
	                        trigger: "focus",
	                        placement: textAlign
	                    });
	                    $(element).popover('show');
	                }
	            }
	        },
	        success: function (element) {
	            if (element.is(':radio') || element.is(':checkbox')) {
	                var e = element.parent().parent().parent();
	                $(e).popover('destroy');
	            } else {
	                $(element).popover('destroy');
	            }
	        }
	    };
	}
	
	var initOptions = function(inOptions) {
		if(isNull(inOptions['textAlign'])) {
			inOptions['textAlign'] = 'top';
		}

		var options = createOptions(inOptions['textAlign']);
		
		for(var field in inOptions) {
			if(!isNull(inOptions[field])) {
				options[field] = inOptions[field];
			}
		}
		
		return $('#' + inOptions.id).validate(options);
	}
	
	return {
		getValidator: function(options) {
			return initOptions(options);
		}
	};
}();

//表单数据转json对象及表单数据回显工具类
var FormUtil = function() {
	var getMetadata = function(name) {
		var start = name.indexOf("[");
		var end = name.indexOf("]");
		var rst = {isArr: false};

		if(start != -1 && end != -1) {
			rst.isArr = true;
			rst.field = name.substring(0, start);
			rst.index = parseInt(name.substring((start + 1), end));
		} else {
			rst.field = name;
		}

		return rst;
	}

	var buildInputParam = function(obj, name, value) {
		var paths = name.split(".");
		var len = paths.length;
		
		for(var i = 0; i < len; i++) {
			var fdm = getMetadata(paths[i]);
			var f = fdm.field;

			if (i == (len - 1)) {
				if (fdm.isArr) {
					if (obj[f]) {
						obj[f].push(value || '');
					} else {
						obj[f] = [ value || '' ];
					}
				} else {
					if (obj[f]) {
						if (!obj[f].push) {
							obj[f] = [ obj[f] ];
						}
						
						obj[f].push(value || '');
					} else {
						obj[f] = value || '';
					}
				}
			} else {
				if (fdm.isArr) {
					if (obj[f]) {
						if (!obj[f][fdm.index]) {
							obj[f].push({});
						}
					} else {
						obj[f] = [{}];
					}

					var arr = obj[f];
					
					obj = arr[arr.length - 1];
					
					continue;
				} else {
					if (!obj[f]) {
						obj[f] = {};
					}
				}
			}

			obj = obj[f];
		}
	}
	
	var buildInputParam2 = function(obj, name, value) {
		var paths = name.split(".");
		var len = paths.length;
		
		for(var i = 0; i < len; i++) {
			var fdm = getMetadata(paths[i]);
			var f = fdm.field;

			if (i == (len - 1)) {
				if (fdm.isArr) {
					if (obj[f]) {
						obj[f].push(value || '');
					} else {
						obj[f] = [ value || '' ];
					}
				} else {
					if (obj[f]) {
						/*if (!obj[f].push) {
							obj[f] = [ obj[f] ];
						}
						
						obj[f].push(value || '');*/
						obj[f]=""+[obj[f],value]; 
						
					} else {
						obj[f] = value || '';
					}
				}
			} else {
				if (fdm.isArr) {
					if (obj[f]) {
						if (!obj[f][fdm.index]) {
							obj[f].push({});
						}
					} else {
						obj[f] = [{}];
					}

					var arr = obj[f];
					
					obj = arr[arr.length - 1];
					
					continue;
				} else {
					if (!obj[f]) {
						obj[f] = {};
					}
				}
			}

			obj = obj[f];
		}
	}
	
	var serializeObject = function(form) {
		var obj = {};
		var formEL = $(form);
		var arr = formEL.serializeArray();
		
		$.each(arr, function() {
			if(obj[this.name]) {
				if(!obj[this.name].push) {
					obj[this.name] = [obj[this.name]];
				}
				
				obj[this.name].push(this.value || '');
			} else {
				obj[this.name] = this.value || '';
			}
		});
		
		return obj;
	}
	
	var serializeNesting = function(form) {    
		var formEL = $(form);
		var o = {};    
		var arr = formEL.serializeArray(); 

		$.each(arr, function() {
			buildInputParam(o, this.name, this.value);
		});
		
		return hanldleInParams(o);    
    };
    
    var serializeNesting2 = function(form) {    
		var formEL = $(form);
		var o = {};    
		var arr = formEL.serializeArray(); 
		
		$.each(arr, function() {
			buildInputParam2(o, this.name, this.value);
		});
		
		return hanldleInParams(o);    
    };
    
    var serializeNestingVacc = function(form) {    
    	var formEL = $(form);
		var o = {};    
		var arr = formEL.serializeArray(); 

		$.each(arr, function() {
			var name = this.name;
			var value = this.value;
			var paths = this.name.split(".");
			var len = paths.length;
			var obj = o;
			
			$.each(paths, function(i, e) {
				if (i == len - 1) {
					if (obj[e]) {
						if (!obj[e].push) {
							obj[e] = [ obj[e] ];
						}
						
						obj[e].push(value || '');
					} else {
						obj[e] = value || '';
					}
				} else {
					if (!obj[e]) {
						obj[e] = {};
					}
				}
				
				obj = o[e];
			});
		});
		
		return hanldleInParams(o);    
    };
    
    var hanldleInParams = function(inParams) {
    	if(isNull(inParams)) {
    		return null;
    	}
    	
    	var delList = [];
    	
    	for(var field in inParams) {
    		var start = field.indexOf("[");
			var end = field.indexOf("]");
			
			if(start != -1 && end != -1) {
				var k = field.substring(0, start);
				
				if(isNull(inParams[k])) {
					inParams[k] = [];
				}
				
				delList.push(field);
				inParams[k].push(inParams[field]);
			}
    	}
    	
    	for(var i = 0; i < delList.length; i++) {
    		delete inParams[delList[i]];
    	}
    	
		return inParams;
    }

	var fillFormData = function(form, data) {
		var formEL = $(form);
		
		if(!isNull(data)) {
			setFormValues(formEL, null, data);
		}
	}
	
	var fillFormData2 = function(form, data) {
		var formEL = $(form);
		
		if(!isNull(data)) {
			setFormValues2(formEL, null, data);
		}
	}
	
	var setFormValues = function(formEL, prefix, data) {
		$.each(data, function(f, value) {
			var field = null;
			
			if(isNull(prefix)) {
				field = f;
			} else {
				field = prefix + '.' + f;
			}
			
			if(TypeUtil.isObject(value)) {
				setFormValues(formEL, field, value);
			} else if(TypeUtil.isArray(value)) {
				if(TypeUtil.isObject(value[0])) {
					$.each(value, function(i, v) {
						setFormValues(formEL, field + "[" + i + "]", v);
					});
				} else {
					setFieldValue(formEL, field, value);
				}
			} else {
				setFieldValue(formEL, field, value);
			}
		});
	}

	var setFieldValue = function(formEL, field, value) {
		var ele = formEL.find("[name='" + field + "']");
		var fv = null;
		
		if((!isNull(value)) && (typeof(value) === 'boolean')) {
			fv = '' + value + '';
		} else {
			fv = value;
		}
		
		if(1 == ele.length) {
			ele.val(fv);
		} else if(1 < ele.length) {
			var ty = ele.attr('type');
			
			if("radio" == ty) {
				formEL.find("[name='" + field + "'][value=" + fv + "]").prop("checked", "checked");
			} else if("checkbox" == ty) {
				$.each(value, function(i, v) {
					var cv = null;
					
					if((!isNull(v)) && (typeof(v) === 'boolean')) {
						cv = '' + cv + '';
					} else {
						cv = v;
					}
					
					formEL.find("[name='" + field + "'][value=" + cv + "]").prop("checked", "checked");
				});
			}
		}
	}
	
	var setFormValues2 = function(formEL, prefix, data) {
		$.each(data, function(f, value) {
			var field = null;
			
			if(isNull(prefix)) {
				field = f;
			} else {
				field = prefix + '.' + f;
			}
			
			if(TypeUtil.isObject(value)) {
				setFormValues2(formEL, field, value);
			} else {
				setFieldValue2(formEL, field, value);
			}
		});
	}

	var setFieldValue2 = function(formEL, field, value) {
		var ele = formEL.find("[name='" + field + "']");
		var fv = null;
		
		if((!isNull(value)) && (typeof(value) === 'boolean')) {
			fv = '' + value + '';
		} else {
			fv = value;
		}
		
		if(1 == ele.length) {
			ele.val(fv);
		} else if(1 < ele.length) {
			var ty = ele.attr('type');
			if("radio" == ty) {
				if(!isBlank(fv) )
				formEL.find("[name='" + field + "'][value=" + fv + "]").prop("checked", "checked");
			} else if("checkbox" == ty) {
				if(!isBlank(value)){
					var arr = value.split(",");
					for(var j=0 ; j<arr.length ; j++){
						formEL.find("[name='" + field + "'][value=" + arr[j] + "]").prop("checked", "checked");
					}
					
				}
			}
		}
	
	}
	
	var enAndDis = function(form, isDisabled) {
		var attr = "disable";  
	    if (!isDisabled) {  
	    	attr = "enable";  
	    }  
	    
	    $(form + " input").attr("disabled", isDisabled);
	    $(form + " textarea").attr("disabled", isDisabled);
	    $(form + " select").attr("disabled", isDisabled);
	}
	
	var disable = function(form) {
		enAndDis(form, true);
	}
	
	var enable = function(form) {
		enAndDis(form, false);
	}
	
	return {
		seria: function(form) {
			return serializeObject(form);
		},
		seriaNesting: function(form) {
			return serializeNesting(form);
		},
		seriaNesting2: function(form) {
			return serializeNesting2(form);
		},
		seriaNestingVacc: function(form) {
			return serializeNestingVacc(form);
		},
		loadData: function(form, data) {
			fillFormData(form, data);
		},
		loadData2: function(form, data) {
			fillFormData2(form, data);
		},
		reset: function(id) {
			document.getElementById(id).reset(); 
		},
		disable: function(form) {
			return disable(form);
		},
		enable: function(form) {
			return enable(form);
		}
	};
}();

function initDatetimepicker(id, data) {
	var param = DatetimeComp.getOptions();
	
	if(!isNull(data)) {
		for(var field in data) {
			if(!isNull(data[field])) {
				param[field] = data[field];
			}
		}
	}

	$('#' + id).datetimepicker(param);
}

var DatetimeComp = function() {
	var getOptions = function(data) {
		var options = {
			pickerPosition: 'bottom-right',
			language: 'zh-CN',
			minView : 'month',
			format : 'yyyy-mm-dd',
			autoclose : 1,
			todayBtn : 1
		};
		
		if(!isNull(data)) {
			for(var field in data) {
				if(!isNull(data[field])) {
					options[field] = data[field];
				}
			}
		}
		
		return options;
	}
	
	var initById = function(id, data) {
		$('#' + id).datetimepicker(getOptions(data));
	}
	
	var initByFormId = function(formId, data) {
		$('#' + formId + " .date-picker").datetimepicker(getOptions(data));
	}
	
	var initDatepicker = function(data) {
		$(".date-picker").datetimepicker(getOptions(data));
	}
	
	return {
		getOptions: function(data) {
			return getOptions(data);
		},
		initById: function(id, data) {
			initById(data);
		},
		initByFormId: function(formId, data) {
			initByFormId(data);
		},
		initDatepicker: function(data) {
			initDatepicker(data);
		}
	};
}();

/*拼接复选框*/
function checkboxStr(name){
	var codes =  document.getElementsByName(name);
    var codeStr = "";
    for(var i = 0; i<codes.length ;i++){
    	if(codes[i].checked == true){
    		codeStr += codes[i].value;
    		codeStr += ",";
    	}
    }
    return codeStr;
}

/*回显复选框
data1表示复选框字符串
data2表示其他描述的信息
checkboxId表示复选框的name属性
value表示其他属性代表的value*/
function showCheckbox(data1,data2,checkboxName,value){
	//复选框处理
	var codeStr = data1;
	//分割
	var codes = codeStr.split(",");
	for(var i = 0;i<codes.length;i++){
		if(null != codes[i] && "" != codes[i]){
			$("#" + checkboxName + codes[i]).attr("checked",'checked');
			if(codes[i] == value){
				$("#" + checkboxName + "-other").attr("checked",'checked');
				$("#" + checkboxName + "-othertext").css('display','');
				$("#" + checkboxName + "-othertext").val(data2);
			}
		}
	}
}

/*
 * 从服务器端获取数据加载下拉列表框
 * 初始化参数options属性介绍：
 * url：获取下拉列表的url
 * id:下拉列表框ID；
 * textField：选项的值字段；
 * textField：选项的文本字段；
 * isAppend：是否将select清空再追加；
 * callback: 数据加载完成以后要执行的方法
 * includeEmpty: 是否包含空项，如：首选项默认是请选择，其值为空
 * data：选项数据集合
 */
var SelectComp = function() {
	/*
	 * 生成select下拉列表框选项的方法
	 * 初始化参数options属性介绍：
	 * selectId:下拉列表框ID；
	 * textField：选项的值字段；
	 * textField：选项的文本字段；
	 * isAppend：是否将select清空再追加；
	 * data：选项数据集合
	 */
	var buildSelectItems = function(options) {
		if(isNull(options.element)) {
			options.element = $("#" + options.id);
		}
		
		var valueField = options.valueField;
		var textField = options.textField;
		var data = options.data;
		
		if(isNull(options.isAppend) || !options.isAppend) {
			options.element.empty();
		}
		
		if(options.includeEmpty) {
			options.element.append('<option value="">请选择</option>');
		}

		if (!isEmptyArray(data)) {			
			var v = null;
			
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var value = item[valueField];
				var text = item[textField];
				var selected = '';
				
				if((!isNull(options['defaultValue']) && value === options['defaultValue']) 
						|| (!isNull(options.selectedFirst) && options.selectedFirst && (i == 0))) {
					selected = " selected";
					v = value;
				}
				
				if(!isNull(options['textFormat'])) {
					text = options.textFormat(text);
				}
				
				if(!isNull(options['prefixField'])) {
					text = item[options.prefixField] + "-" + text;
				}
				
				options.element.append('<option value="' + value + '"' + selected + '>' + text + '</option>');
			}
			
			if(!TypeUtil.isNull(v)) {
				options.element.val(v);
			}
			
			if(!TypeUtil.isNull(options.callback)) {
    			options.callback(v);
    		}
		}else{
			if(!TypeUtil.isNull(options.callback)) {
    			options.callback();
    		}
		}
	}
	
	var load = function(options) {
		if(isNull(options)) {
			return ;
		}
		
		if(isNull(options.type)) {
			options.type = 'GET';
		}
		
		if(isNull(options.includeEmpty)) {
			options.includeEmpty = true;
		}
		
		wmAjax({
	    	url: getFullUrl(options.url),
	    	type: options.type,
	    	async: true,
	    	success: function(data) {
	    		options['data'] = data;
	    		buildSelectItems(options);
	    	}
	    });
	}
	
	return {
		load: function(options) {
			load(options);
		}
	};
}();

var ConfirmComp = function() {
	var create = function(options) {
		bootbox.confirm({
	        title: options.title,
	        message: "<i class='fa fa-exclamation-circle'></i> " + options.msg,
	        buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-primary self-no'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-danger self-yes pull-right'
                }
	        },
	        closeButton: false,
	        callback: options.callback
	    });
	}
	
	return {
		confirm: function(options) {
			create(options);
		}
	};
}();

var delById = function(tableId, msg, url) {
    ConfirmComp.confirm({
		title: '删除',
		msg: '您确定删除' + msg + '吗？',
		callback: function(confirmRst) {
			if(confirmRst) {
				asyncDel({
					url: getFullUrl(url),
					success: function (rst) {
						if(rst.success) {
			    			alertSuccess({msg: rst.msg});
			    			$('#'+tableId).bootstrapTable('refresh');
						} else {
							alertError({msg: rst.msg});
						}
					}
				});
			}
		}
	});
}

var Idcard = function() {
	var flag = "-";
	
	var getBy15 = function(no) {
		var currentYear = new Date().getFullYear();
		var year = "19" + no.substr(6, 2);
		
		return {
			birthday: year + flag + no.substr(8, 2) + flag + no.substr(10, 2),
			sex: no.substr(14, 1) % 2 == 0 ? "2" : "1",
			age: parseInt(currentYear) - parseInt(year)
		};
	}
	
	var getBy18 = function(no) {
		var currentYear = new Date().getFullYear();
		var year = no.substr(6, 4);
		
		return {
			birthday: year + flag + no.substr(10, 2) + flag + no.substr(12, 2),
			sex: no.substr(16, 1) % 2 == 0 ? "2" : "1",
			age: parseInt(currentYear) - parseInt(year)
		};
	}
	
	var get = function(no) {
		if(isNull(no)) {
			return null;
		}
		
		if (no.length == 15) {
			return getBy15(no);
		} else if (no.length == 18 | no.length == 20) {
			return getBy18(no); 
		} else {
            alertError({msg : "身份证格式不正确"});
            return;
		}
	}
	
	return {
		get: function(no) {
			return get(no);
		}
	};
}();

/** 
* *********  操作实例  ************** 
*   var map = new HashMap(); 
*   map.put("key1","Value1"); 
*   map.put("key2","Value2"); 
*   map.put("key3","Value3"); 
*   map.put("key4","Value4"); 
*   map.put("key5","Value5"); 
*   alert("size："+map.size()+" key1："+map.get("key1")); 
*   map.remove("key1"); 
*   map.put("key3","newValue"); 
*   var values = map.values(); 
*   for(var i in values){ 
*       document.write(i+"："+values[i]+"   "); 
*   } 
*   document.write("<br>"); 
*   var keySet = map.keySet(); 
*   for(var i in keySet){ 
*       document.write(i+"："+keySet[i]+"  "); 
*   } 
*   alert(map.isEmpty()); 
*/  
  
function HashMap(){  
    //定义长度  
    var length = 0;  
    //创建一个对象  
    var obj = new Object();  
  
    /** 
    * 判断Map是否为空 
    */  
    this.isEmpty = function(){  
        return length == 0;  
    };  
  
    /** 
    * 判断对象中是否包含给定Key 
    */  
    this.containsKey=function(key){  
        return (key in obj);  
    };  
  
    /** 
    * 判断对象中是否包含给定的Value 
    */  
    this.containsValue=function(value){  
        for(var key in obj){  
            if(obj[key] == value){  
                return true;  
            }  
        }  
        return false;  
    };  
  
    /** 
    *向map中添加数据 
    */  
    this.put=function(key,value){  
        if(!this.containsKey(key)){  
            length++;  
        }  
        obj[key] = value;  
    };  
  
    /** 
    * 根据给定的Key获得Value 
    */  
    this.get=function(key){  
        return this.containsKey(key)?obj[key]:null;  
    };  
  
    /** 
    * 根据给定的Key删除一个值 
    */  
    this.remove=function(key){  
        if(this.containsKey(key)&&(delete obj[key])){  
            length--;  
        }  
    };  
  
    /** 
    * 获得Map中的所有Value 
    */  
    this.values=function(){  
        var _values= new Array();  
        for(var key in obj){  
            _values.push(obj[key]);  
        }  
        return _values;  
    };  
  
    /** 
    * 获得Map中的所有Key 
    */  
    this.keySet=function(){  
        var _keys = new Array();  
        for(var key in obj){  
            _keys.push(key);  
        }  
        return _keys;  
    };  
  
    /** 
    * 获得Map的长度 
    */  
    this.size = function(){  
        return length;  
    };  
  
    /** 
    * 清空Map 
    */  
    this.clear = function(){  
        length = 0;  
        obj = new Object();  
    };  
}

//身份证正则表达式校验
jQuery.validator.addMethod("regexIdCard", function(value, element, params) {
	var regex = /(^\d{15}$)|(^\d{18}$)|(^\d{20}$)|(^\d{17}(\d|X|x)$)/;
	var flag = true;
	
	if (value.length == 18 | value.length == 20) {
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

var RegionComp = function() {
	var getUrl = function(code) {
		return '/sys/region/' + code + '/children';
	}
	
	var pushCode = function(str, arr) {
		if(!isNull(str) && 0 < str.length) {
			arr.push(str);
			
			if(str.length > 6) {
				pushCode(str.substring(0, str.length - 3), arr);
			} else {
				pushCode(str.substring(0, str.length - 2), arr);
			}
		}
	}
	
	var getDefaultValues = function(str) {
		if(TypeUtil.isNull(str)) {
			return null;
		}
		
		var defaultValues = [];
		var arr = [];
		pushCode(str, arr);
		
		for(var i = arr.length; i > 0; i--) {
			defaultValues.push(arr[i - 1]);
		}
		
		return defaultValues;
	}
	
	var drawHtml = function(options) {
		var rootEle = getRoot(options);
		rootEle.empty();
		var s = '<input type="text" class="grhc-input input-bg" readonly>';
		s += '<div class="grhc-city">';
		
		for (var i = 0; i < options.size; i++) {
			s += '<select class="grhc-input" index="' + i + '"></select>';
		}
		
		s += '<a class="btn btn-sm">确定</a>';
		
		s += '</div>';
		
		rootEle.append(s);
	}
	
	var getRoot = function(options) {
		return $('#' + options.id);
	}
	
	var getInput = function(options) {
		return $("#" + options.id + " input[type='text']:eq(0)");
	}
	
	var getSelectDiv = function(options) {
		return $("#" + options.id + " div:eq(0)");
	}
	
	var getSelect = function(options, index) {
		return $("#" + options.id + " div select:eq(" + index + ")");
	}
	
	var getBtn = function(options) {
		return $("#" + options.id + " div a:eq(0)");
	}
	
	var getFullName = function(options) {
		var s = '';
		
		$("#" + options.id + " div select").each(function(i) {
			if(i > 0) {
				s += "/";
			}
			
			s += $(this).find("option:selected").text();
		});
		
		return s;
	}
	
	var close = function(options) {
		var lastSelect = getSelect(options, (options.size - 1));
		
		getRoot(options).attr('value', lastSelect.val());
		getRoot(options).attr('name', lastSelect.find("option:selected").text());
		getInput(options).val(getFullName(options));
		getSelectDiv(options).hide();
	}
	
	var loadSelect = function(options, data) {
		if(options.size <= data.index) {
			close(options);
			return ;
		}
		
		var selectEle = getSelect(options, data.index);
		
		if(TypeUtil.isNull(selectEle)) {
			return ;
		}
		
		var indata = {
    		element: selectEle,
    		url: getUrl(data.pcode),
    		valueField: options.valueField,
    		textField: options.textField,
    		includeEmpty: false,
    		callback: function(value) {
    			loadSelect(options, {
					index: data.index + 1,
					pcode: value,
					values: data.values
				});
    		}
    	};
		
		if(TypeUtil.isEmptyArray(data.values) || data.index >= data.values.length) {
			indata['selectedFirst'] = true;
		} else {
			indata['defaultValue'] = data.values[data.index];
		}

		SelectComp.load(indata);
	}
	
	var loadData = function(options) {
		loadSelect(options, {
			index: 0,
			pcode: '0',
			values: getDefaultValues(options.value)
		});
	}
	
	var initComp = function(options) {
		drawHtml(options);
		getInput(options).on('click', function() {
			getSelectDiv(options).show();
		});
		
		$("#" + options.id + " div select").on('change', function() {
			loadSelect(options, {
				index: parseInt($(this).attr('index')) + 1,
				pcode: $(this).val()
			});
		});
		
		getBtn(options).on('click', function() {
			close(options);
		});
		
		if(!TypeUtil.isNull(options.value)) {
			loadData(options);
		}
		
		//getSelectDiv(options).hide();
	}
	
	var createOptions = function(data, size) {
		var options = {
			id: data.id,
			url: getUrl(data.value),
			valueField: "shortCode",
			textField: "regionName",
			size: size	
		};
		
		if(!TypeUtil.isNull(data.value)) {
			options.value = data.value;
		}
		
		return options;
	}
	
	return {
		init5: function(data) {
			initComp(createOptions(data, 5));
		},
		initList5: function(arr) {
			for(var i = 0; i < arr.length; i++) {
				initComp(createOptions(arr[i], 5));
			}
		},
		load5: function(data) {
			loadData(createOptions(data, 5));
		},
		init4: function(data) {
			initComp(createOptions(data, 4));
		},
		load4: function(data) {
			loadData(createOptions(data, 4));
		},
		init3: function(data) {
			initComp(createOptions(data, 3));
		},
		load3: function(data) {
			loadData(createOptions(data, 3));
		}
	};
}();

var HtmlComp = function() {
	/*关闭当前页*/
	var closeCurrentPage = function() {
	    var userAgent = navigator.userAgent;
	    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
	        window.location.href="about:blank";
	        window.close();
	    } else {
	        window.opener = null;
	        window.open("", "_self");
	        window.close();
	    }
	}
	
	return {
		closeCurrentPage: function() {
			closeCurrentPage();
		}
	};
}();

var NavMenu = function() {
	var getParents = function() {
		var ele = $("li.active:first");
		
		if(isNull(ele)) {
			return null;
		}
		
		var arr = [];
		arr.push(ele.attr('title'));
		
		ele.parents(".classic-menu-dropdown , .dropdown-submenu ").each(function(){
			arr.push($(this).attr('title'));
		});
		
		return arr;
	}

	var init = function() {
		var parents = getParents();
		$('#nav-menu').empty();
		
		if(!TypeUtil.isEmptyArray(parents)) {
			for(var i = parents.length; i > 0; i--) {
				var title = parents[i - 1];
				
				if(i == 1) {
					$('#nav-menu').append('<li><a href="#">' + title + '</a></li>');
				} else {
					$('#nav-menu').append('<li><a href="#">' + title + '</a><i class="fa fa-angle-right"></i></li>');
				}
			}
		}
	}
	
	return {
		init: function() {
			init();
		}
	};
}();

var HighlightComp = function() {
	var init = function() {
		$(':checkbox, :radio').each(function () {
			if ($(this).is(":checked")) {
				$(this).parent().addClass('grhc-sel-sty');
			} else {
				$(this).parent().removeClass('grhc-sel-sty');
			}
		})
	}
	
	return {
		init : function() {
			init();
		}
	};
}();

var MyTree = function() {
	return {
		init: function(option) {
			var conf = {
				"types" : {
					"default" : {
						"icon" : "fa fa-folder icon-state-warning icon-lg"
					},
					"file" : {
						"icon" : "fa fa-file icon-state-warning icon-lg"
					}
				},
	            'core': {
	            	'themes' : {
						"responsive" : false
					}
	            },
	            "plugins" : ["types"]
	        };
			
			$('#jstree_demo_div').on("changed.jstree", function (e, data) {
				//alert(data.selected);
				  console.log(data.selected);
			});
			
			if(!TypeUtil.isNull(option.contextmenu)) {
				conf.plugins.push("contextmenu");
			}
			
			if(!TypeUtil.isNull(option.checkbox) && option.checkbox) {
				conf.plugins.push("checkbox");
				conf.checkbox = {tie_selection: false};
			}
			
			if(!TypeUtil.isNull(option.loadData)) {
				conf.core.data = option.loadData;
			}
			
			if(!TypeUtil.isNull(option.contextmenu)) {
				conf.plugins.push("contextmenu");
				conf.contextmenu = option.contextmenu;
			}
			
			$('#' + option.id).jstree(conf);
			
			if(!TypeUtil.isNull(option.selectNode)) {
				$('#' + option.id).on('select_node.jstree', option.selectNode);
			}
			
			if(!TypeUtil.isNull(option.activateNode)) {
				$('#' + option.id).bind("activate_node.jstree", option.activateNode);
			}
			
			//alert(JSON.stringify(conf));
		}
	};
}();

// 角色类型枚举
var HmsPostTypeEnum = {
		DOCTOR : 1003,// 医生
		SECTION_OFFICER : 1002,// 科室主任
		SOCIAL_OFFICE : 1004 // 医保办
};
// 节点参数枚举
var HmsNdEnum = {
		UP_COMMIT_NODE : 99, // 上转-医生提交
		UP_DEPT_OFFICER_CHECK : 100,// 待科室主任审核
		UP_MEDICARE_OFFICE_CHECK : 101, // 待医保办审核
		UP_HIGH_MEDICARE_OFFICE_CHECK : 102, //待上级机构医保办审核
		UP_HIGH_DOCTOR_CHECK : 103, // 待上级机构医生审核
		DOWN_COMMIT_NODE : 199, // 下转-医生提交
		DOWN_SECTION_OFFICER_CHECK:200,// 待科室主任审核
		DOWN_MEDICARE_OFFICE_CHECK : 201,// 待医保办审核
		DOWN_HIGH_MEDICARE_OFFICE_CHECK : 202, // 待下级机构医保办审核
		DOWN_HIGH_DOCTOR_CHECK : 203 // 待下级机构医生审核
};

/**
 * 异步上传文件
 */
var AjaxUpload = function() {
    var upload = function(options) {
    	var v = $('#' + options.id).val();
    	
    	if (TypeUtil.isBlank(v)) {
            alert("请上传文件");
            
            return false;
        }
    	
    	if (!TypeUtil.isBlank(options.regText)) {
    		
    		if(TypeUtil.isArray(options.regText)) {
	    		var count = 0;

	    		for (var i=0; i<options.regText.length; i++) {
		    		var regExp = new RegExp(options.regText[i]);
		    		
		    		if (regExp.test(v)) {
		    			count++;
		        		break;
		            }
	    		}
	    	
	    		if (count==0) {
	    			var types = ""; 
	    			for (var i=0; i<options.regText.length; i++) {	
	    				types += "、"+options.regText[i];
	    			}
	    			types = types.substring(1);
	    			
	    			alert("文件类型不符合要求,只能是" + types + "文件");
	                $('#' + options.id).val("");
	    			return false;
	    		}
    		}else {
    			var regExp = new RegExp(options.regText);
	    		
	    		if (!regExp.test(v)) {
	        		alert("文件类型不符合要求,只能是" + options.regText + "文件");
	                $('#' + options.id).val("");
	                
	                return false;
	            }
    		}
    	}
    	
    	var param = {
    		url: options.url, //用于文件上传的服务器端请求地址
    		type: 'post',
    		secureuri: false, //是否需要安全协议，一般设置为false
    		dataType: 'json', //返回值类型 一般设置为json
    		fileElementId: options.id, //文件上传域的ID
    		success: function (data, status) {
                var data = eval("(" + data + ")");
                
                if(!TypeUtil.isNull(options.success)) {
                	options.success(data);
                }
            },
            error: function (data, status, e) {
                alert(e);
            }
    	};
    	
    	if(!TypeUtil.isNull(options.data)) {
    		param.data = options.data;
        }
    	
    	$.ajaxFileUpload(param);
    	
    	return true;
    }
    
    return {
    	upload: function(options) {
    		upload(options);
		}
    };
}();
function main(){$fk.config=new Object,$fk.config.verbose=!1,$fk.config.prefix="fk",$fk.config.slide_speed=100,$fk.config.scroll_speed=500,$fk.config.scroll_offset=0,$fk.config.form_query="form",$fk.config.fileapi_use=!(!window.File||!window.FileReader),$fk.config.do_validate=!0,$fk.config.hiddens_vars_key="__vars",$fk.hook=new Object,$fk.hook.on_init_before=function(form){},$fk.hook.on_init_after=function(form){},$fk.hook.on_form_submit_before=function(form){},$fk.hook.on_form_send=function(form){},$fk.hook.on_form_submit_after=function(form){},$fk.hook.on_ajax_before=function(senddata){},$fk.hook.on_ajax_after=function(defer){},$fk.valid=new Object,$fk.valid.data=new Object,$fk.valid.apply=new Object,$fk.valid.names=[],function($){if("function"==typeof formkit_config&&formkit_config(),$fk.hook.on_init_before($($fk.config.form_query).get(0)),$("[data-"+_pf()+"formaction],[formaction]").each(function(){var $element=$(this);$element.on("click",function(){var formaction=$element.fk("formaction");formaction||(formaction=$element.attr("formaction")),$element.getForm().attr("action",formaction)})}),$("[data-"+_pf()+"no-validate]").each(function(){$(this).on("click",function(){$fk.config.do_validate=!1})}),$("input:file").parents("form").length&&"multipart/form-data"!==$("input:file").parents("form").attr("enctype")&&console.warn('enctype="multipart/form-data" is not specified in the form.'),$("[name^=_]:not([type=hidden])").length){var list=new Array;$("[name^=_]:not([type=hidden])").each(function(){list.push(this.name)}),console.warn("An element with a name starting from the underbar exists. "+list.join(","))}$("[data-"+_pf()+"disabled-to]").each(function(){var $element=$(this);$fk('[name="'+$element.attr("name")+'"]').on("change",function(){$element.updateDisabled()})});var element_list=[];$.ajax({type:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},url:url_path+"fk-ajax.php/keys/"+($fk.config_dir?"?fk_config_dir="+$fk.config_dir:""),dataType:"json"}).done(function(json){$fk.valid.names=json.keys,$($fk.config.form_query).find("[data-fk-jsfunc]").each(function(){$fk.valid.names.push($(this).name())}),$($fk.valid.names).each(function(){if("_"===this.toString().charAt(0)){var $point=$("[data-"+_pf()+'marker="'+this.toString()+'"],[data-'+_pf()+'error="'+this.toString()+'"]');$point?$point.eq(0).before($('<input type="hidden" name="'+this.toString()+'">')):$($fk.config.form_query).append($('<input type="hidden" name="'+this.toString()+'">'))}}),$.init_element=function($element){if($fk.isEnableName($element.name())&&($element.on("focus",function(){$element.error()&&$element.fk("old_value",null),"file"!==$element.attr("type")&&($element.status("input"),$element.error(""),$($element.getWith()).each(function(){$fk.getElementByName(this).error("")}))}),!$element.inGroup())){if("TEXTAREA"===$element.get(0).tagName)on="blur";else if("SELECT"===$element.get(0).tagName)on="change blur";else if("INPUT"===$element.get(0).tagName)switch($element.attr("type")){case"text":case"search":case"tel":case"url":case"email":case"password":case"datetime":case"date":case"month":case"week":case"time":case"datetime-local":case"number":on="blur";break;case"range":case"color":on="change";break;case"checkbox":case"radio":on="click";break;case"file":on="change blur";break;default:on="blur"}else on="blur";if($element.fk("ajaxzip")){var az_data=eval("["+$element.fk("ajaxzip")+"]");$element.fk("old-zip",$.getElementByName(az_data[0]).val()+(az_data[1]?$.getElementByName(az_data[1]).val():""))}$element.fk("on")?on=$element.fk("on"):$element.fk("on",on),$element.on(on,function(e,func){if(13!==e.keyCode){var delay=0;$element.fk("on-"+e.type+"-delay")&&(delay=$element.fk("on-"+e.type+"-delay")),$element.fk("tm")&&(clearTimeout($element.fk("tm")),$element.fk("tm",null));var tm=setTimeout(function(){if($element.fk("ajaxzip")&&"keyup"===e.type){if($element.fk("ajaxzip_old_val")==$element.val())return;if(!$element.val().match(/^\d{3}\-?\d{4}$/))return;$element.fk("ajaxzip_old_val",$element.val())}$($fk.valid.names).each(function(){var $elem=$fk.getElementByName(this.toString());$elem&&$elem.addValidateData()}),$element.addValidateData(!0),$fk.validate().done(function(){_info("done"),func&&"function"==typeof func&&(func(),_info("done-func")),$element.fk("ajaxzip")&&$element.doAjaxZip()})},1e3*delay);$element.fk("tm",tm),$element.fk("ajax")&&$element.fk("ajax").abort()}})}},$($fk.config.form_query).find("input,select,textarea").each(function(){$.init_element($(this))}),$($fk.config.form_query).find("[data-"+_pf()+"group]").each(function(){var $group=$(this);$group.on("focusin",function(){$($group.getChildren()).each(function(){this.status(""),this.error("")}),$group.error("")});var on="focusout";$group.fk("on")&&(on=$group.fk("on")),$group.on(on,function(e,func){setTimeout(function(){$group.find("[name]:focus").length||($fk.config.minimum_send||$($fk.valid.names).each(function(){var $elem=$fk.getElementByName(this.toString());$elem&&$elem.addValidateData()}),$($group.getChildren()).each(function(){$(this).addValidateData(!0)}),$group.status("validate"),$fk.validate().done(function(){_info("done-group"),func&&"function"==typeof func&&(func(),_info("done-func")),$group.fk("ajaxzip")&&$group.doAjaxZip()}))},0)})}),$($fk.config.form_query).on("submit.validate",function(){var $form=$(this);return $form.find(":focus").blur(),$fk.hook.on_form_submit_before($form.get(0)),$("body").addClass("fk-sending"),$form.find('input[type="submit"],button').each(function(){$button=$(this),$button.fk("initial-disabled",$button.prop("disabled")),$button.prop("disabled",!0),$("body *").addClass(_pf()+"cursor-progress")}),$fk.config.do_validate?($($fk.valid.names).each(function(){var $elem=$fk.getElementByName(this.toString());$elem&&$elem.addValidateData(!0)}),$fk.validate(!0).done(function(data,textStatus,returnedObject){var error_labels=$("."+_pf()+"error[data-"+_pf()+"error]:visible,."+_pf()+"status-ng[data-"+_pf()+"marker]:visible");if(error_labels.length){var center_px=$(error_labels[0]).offset().top-$(window).height()/2;$("html,body").animate({scrollTop:center_px+$fk.config.scroll_offset},$fk.config.scroll_speed,"swing")}var submit_state_reset=function(){$form.find('input[type="submit"],button').each(function(){$button=$(this),$button.prop("disabled",$button.fk("initial-disabled")),$("body *").removeClass(_pf()+"cursor-progress")}),$("body").removeClass("fk-sending")};if($fk.config.revalidate)return $fk.config.revalidate=!1,void submit_state_reset();var parts=new Array;$fk($fk.config.form_query).find("[name]:not([type=hidden])").each(function(key,elm){parts.push($fk(elm).attr("name"))});var $parts_hidden=$fk($fk.config.form_query).find('[name="__parts"]');if($parts_hidden.length||($fk($fk.config.form_query).prepend('<input type="hidden" name="__parts">'),$parts_hidden=$fk($fk.config.form_query).find('[name="__parts"]')),$parts_hidden.val($fk.unique(parts).join(",")),0==error_labels.length&&0==$form.find("."+_pf()+"status-validate").length)return $form.off("submit.validate"),$fk.hook.on_form_send($form.get(0)),$form.submit(),!1;submit_state_reset()}).fail(function(){alert("入力値チェックの通信中にエラーが発生しました。\nサーバ側で不具合が発生している可能性があります。\n時間を置いてからアクセスするかお問い合せ下さい。")}).always(function(){$fk.hook.on_form_submit_after($form.get(0))}),!1):($form.off("submit.validate"),$fk.hook.on_form_send($form.get(0)),$form.submit(),!1)}),$("[data-fk-disabled-to]").updateDisabled(),$fk.config.revalidate=!!location.search.match(/[\?\&]revalidate\b/),$fk.config.revalidate&&$($fk.config.form_query).submit(),$fk.hook.on_init_after($($fk.config.form_query).get(0))}).fail(function(data,textStatus,errorThrown){_warn("Faild to keys load.")}),$.fn.fk=function(key,value){return key=($fk.config.prefix?$fk.config.prefix+"-":"")+key,2===arguments.length&&$(this).data(key,value),$(this).data(key)},$.fn.name=function(){$element=$(this);var name=$element.attr("name");return name||(name=$element.attr("data-"+_pf()+"marker")),name||(name=$element.attr("data-"+_pf()+"error")),name||(name=$element.attr("data-"+_pf()+"group")),name},$.fn.status=function(status){var $element=$(this);if(0===arguments.length){var status="";return status=$element.hasClass(_pf()+"status-input")?"input":$element.hasClass(_pf()+"status-validate")?"validate":$element.hasClass(_pf()+"status-ng")?"ng":$element.hasClass(_pf()+"status-ok")?"ok":""}if($element.isGroup())return void $("[data-"+_pf()+'marker="'+$element.name()+'"]').each(function(){$(this).switchStatus(status)});var name=$element.name();$element.switchStatus(status),$("[data-"+_pf()+'marker="'+$.removeBrace(name)+'"]').each(function(){$(this).switchStatus(status)});var $group=$element.getGroup();if($group){var group_status="",count={"":0,input:0,validate:0,ok:0,ng:0};$group.getChildren(),$($group.getChildren()).each(function(){count[this.status()]++}),group_status=count.input?"input":count.validate?"validate":count.ng?"ng":count.ok?"ok":"",$group.switchStatus(group_status);var subvali_name=$group.fk("group");subvali_name&&$("[data-"+_pf()+'marker="'+$.removeBrace(subvali_name)+'"]').each(function(){$(this).switchStatus(group_status)})}return this},$.fn.switchStatus=function(new_status){$element=$(this);var old_status=$element.status();new_status&&$(this).addClass(_pf()+"status-"+new_status),old_status!=new_status&&$element.removeClass(_pf()+"status-"+old_status)},$.fn.error=function(error){var $element=$(this),name=$element.name();if(1===arguments.length){$element.fk("error",error);var $error_tag=$("[data-"+_pf()+'error="'+$.removeBrace(name)+'"]');error?($error_tag.find("span").text(error),$error_tag.slideDown($fk.config.slide_speed)):$error_tag.slideUp($fk.config.slide_speed)}return $(this).fk("error")},$.fn.required=function(required){var $element=$(this);$element.name();return 1===arguments.length&&$element.fk("required",required),$(this).fk("required")},$.fn.inGroup=function(){return!!$(this).parents("[data-"+_pf()+"group]").length},$.fn.isGroup=function(){return $(this).is("[data-"+_pf()+"group]")},$.fn.getGroup=function(){var group=$(this).parents("[data-"+_pf()+"group]");if(group.length)return $(group[0]);var named_group=$("[data-"+_pf()+'group="'+$(this).name()+'"]');return!!named_group.length&&$(named_group[0])},$.fn.getChildren=function(selector){var $target=$(this),children=[],selector=selector?"[name]"+selector:"[name]";$target.find(selector).each(function(idx,elm){$fk.isEnableName($(elm).name())&&children.push($(elm))});var subvali_name=$target.fk("group");if(subvali_name){var $subvali=$($fk.config.form_query).find('input[name="'+subvali_name+'"]');$subvali&&children.push($subvali)}return children},$.fn.getWith=function(){var $element=$(this),list=[];$element.fk("with")&&$($element.fk("with").split(/[\, ]+/)).each(function(){var name=this.toString(),$elem=$fk.getElementByName(name);$elem&&"object"==typeof $elem&&list.push(name)});var parents=$element.parents("[data-"+_pf()+"with]");return parents.length&&$($(parents[0]).fk("with").split(/[\, ]+/)).each(function(){var name=this.toString(),$elem=$fk.getElementByName(name);$elem&&"object"==typeof $elem&&list.push(name)}),list},$.fn.addValidateData=function(apply){var $element=$(this),name=$element.name();if(void 0!==name&&(void 0===$fk.valid.data&&($fk.valid.data=new Object),void 0===$fk.valid.apply&&($fk.valid.apply=new Object),$fk.valid.data[name]=!0,apply)){$fk.valid.apply[name]=!0;if($element.getGroup()){var key=$element.getGroup().fk("group");key&&($fk.valid.apply[key]=!0)}var with_list=$element.getWith();with_list.length&&$(with_list).each(function(){var with_key=this.toString();$fk.valid.apply[with_key]=!0})}},$.fn.getForm=function(){return $($(this).parents("form")[0])},$.fn.getValue=function(){var ret,$element=$(this);if("radio"===$element.attr("type"))for(var i=0;i<$element.length;i++)$($element[i]).is(":checked")&&(ret=$($element[i]).val());else if("checkbox"===$element.attr("type")){ret=new Array;for(var i=0;i<$element.length;i++)$($element[i]).is(":checked")&&ret.push($($element[i]).val())}else ret=$element.val();return ret},$.fn.isPositive=function(){var $element=$(this);return"radio"!==$element.attr("type")&&"checkbox"!==$element.attr("type")||$element.is(":checked")},$.fn.isTextInput=function(){var $element=$(this);if("TEXTAREA"===$element.get(0).tagName)return!0;if("INPUT"===$element.get(0).tagName){switch($element.attr("type")){case"radio":case"checkbox":case"file":case"hidden":return!1}return!0}},$.fn.updateDisabled=function(){$(this).each(function(idx,elm){var $element=$(elm);$($fk.config.form_query).find($element.data(_pf()+"disabled-to").split(/\,\s*/).map(function(aname){return'[name="'+aname+'"]'}).join(",")).each(function(){var $target=$(this);if($element.prop("checked")||$element.prop("selected"))$target.prop("disabled",!1),$fk.validate($fk.removeBrace($target.attr("name")));else{$target.prop("disabled",!0),$target.status(""),$target.error("");var $group=$target.getGroup();$group&&($group.switchStatus(""),$group.error(""))}})})},$.fn.doAjaxZip=function(){var $element=$(this);if(!$element.fk("ajaxzip-disabled")){var az_data=eval("["+$element.fk("ajaxzip")+"]"),now_zip=$.getElementByName(az_data[0]).val()+(az_data[1]?$.getElementByName(az_data[1]).val():""),old_zip=$element.fk("old-zip");now_zip!=old_zip&&(AjaxZip3.onSuccess=function(){$fk.validate(az_data[2]),$fk.validate(az_data[3]),$fk.validate(az_data[4]),$fk.validate(az_data[5]),$element.fk("old-zip",now_zip)},AjaxZip3.zip2addr(az_data[0],az_data[1],az_data[2],az_data[3],az_data[4],az_data[5]))}},$.validate=function(){if(is_submit=!1,arguments.length&&!0===arguments[0])is_submit=!0;else if(arguments.length){var name=arguments[0],func=arguments[1];if($fk.isEnableName(name)){var $element=$.getElementByName(name);if($element.fk("on")){var events=$element.fk("on").split(/[\, ]+/);$element.triggerHandler(events[0],func)}else{var group=$element.parents("[data-"+_pf()+"group]")[0];$(group).triggerHandler("focusout",func)}}return!0}var data_count=0;for(name in $fk.valid.data)$fk.valid.apply[name]&&($fk.getElementByName(name)&&!is_submit&&$fk.getElementByName(name).status("validate"),data_count++);var defer=$.Deferred();return data_count?$fk.getValidateData().done(function(dataset){_log(dataset);var senddata={type:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},url:url_path+"fk-ajax.php/validate/"+($fk.config_dir?"?fk_config_dir="+$fk.config_dir:""),data:dataset,dataType:"json",cache:!0};$fk.hook.on_ajax_before(senddata);var $ajax=$.ajax(senddata).done(function(json){for(var key in json.elements){var $element=$fk.getElementByName(key);if($element){if($element.hasClass("disabled")||$element.prop("disabled")){$element.error(""),$element.status("");continue}var jsfunc=$element.attr("data-"+_pf()+"jsfunc"),no_update=!1;if(jsfunc){var result=window[jsfunc]($element);"object"==typeof result?(no_update=!0,result.done(function(){json.elements[key].value=$element.val(),json.elements[key].status=$element.status(),json.elements[key].error=$element.error(),json.elements[key].required=$element.required()})):(json.elements[key].value=$element.val(),json.elements[key].status=$element.status(),json.elements[key].error=$element.error(),json.elements[key].required=$element.required())}if(!no_update&&$element.isTextInput()&&$element.is(":focus")){$element.status("");continue}$element.isTextInput()&&null!=json.elements[key].value&&$element.val(json.elements[key].value),no_update||($element.status(json.elements[key].status),$element.error(json.elements[key].error),$element.fk("required",json.elements[key].required))}else _warn('Element "'+key+'" is not exist!')}}).fail(function(data,textStatus,errorThrown){"abort"!==textStatus&&alert("PHPへの通信に失敗しました。\n\n  - "+url_path+"fk-ajax.php\n\n再度実行しても改善しない場合は、お手数ですがサイト管理者までご連絡下さい。")}).always(function(data,textStatus,returnedObject){for(i in data.elements){var $element=$fk.getElementByName(i);$element&&"object"==typeof $element.fk("ajax")&&$element.fk("ajax","")}$fk.hook.on_ajax_after($ajax),defer.resolve($ajax)});if(1===data_count){var keys=$fk.getArrayKeys($fk.valid.data);$fk.getElementByName(keys[0]).fk("ajax",$ajax)}$fk.clearValidateData()}):defer.resolve(),defer.promise()},$.getValidateData=function(){var dataset=new Object,deferFuncs=new Array;for(name in $fk.valid.data)deferFuncs.push(function(){var defer=$.Deferred(),$element=$fk.getElementByName(name);if($element){var key=$fk.removeBrace(name);if(dataset[key]=$element.getValue(),"file"===$element.attr("type")){var filedata;if($fk.config.fileapi_use&&(filedata=$element.get(0).files[0]),null!==filedata&&void 0!==filedata&&dataset[key].length)if(dataset[key+"[local_name]"]=dataset[key],dataset[key+"[file_size]"]=filedata.size,dataset[key+"[mime_type]"]=filedata.type,filedata.type.match(/^image\//)){var reader=new FileReader;reader.onloadend=function(){var i=$fk("<img>");i.attr("src",reader.result),i.on("load",function(){dataset[key+"[width]"]=i.get(0).width,dataset[key+"[height]"]=i.get(0).height,delete dataset[key],defer.resolve()})},reader.readAsDataURL(filedata)}else defer.resolve();else!$fk.config.fileapi_use&&dataset[key].length?(dataset[key+"[local_name]"]=dataset[key],dataset[key+"[file_size]"]=1,dataset[key+"[mime_type]"]=_get_mime_from_filename(dataset[key]),delete dataset[key],defer.resolve()):$fk.getElementByName(name+"[tmp_name]").val()&&$fk.getElementByName(name+"[org_name]").val()?(dataset[key+"[tmp_name]"]=$fk.getElementByName(name+"[tmp_name]").val(),dataset[key+"[org_name]"]=$fk.getElementByName(name+"[org_name]").val(),delete dataset[key],defer.resolve()):defer.resolve()}else defer.resolve();return defer.promise()}}());var defer=$.Deferred();return $.when.apply($,deferFuncs).done(function(){if(!$fk.config.minimum_send){var dataset_hidden=new Object;$($fk.config.form_query).find("[type=hidden]").each(function(){var $element=$(this),name=$element.name();name.match(/\[\]$/)?(name=$fk.removeBrace(name),dataset_hidden[name]||(dataset_hidden[name]=[]),dataset_hidden[name].push($element.getValue())):dataset_hidden[name]=$element.getValue()}),dataset=$.extend(dataset,dataset_hidden)}var apply=[];for(name in $fk.valid.apply)apply.push($fk.removeBrace(name));dataset.__apply=apply.join(","),delete dataset[$fk.config.hiddens_vars_key],defer.resolve(dataset)}),defer.promise()},$.clearValidateData=function(){$fk.valid.data=new Object,$fk.valid.apply=new Object},$.getElementByName=function(name){var $element="";return $element=$($fk.config.form_query).find('[name="'+$.removeBrace(name)+'"]'),$element.length||($element=$($fk.config.form_query).find('[name="'+$.removeBrace(name)+'[]"]')),$element.length?$($element):null},$.getArrayKeys=function(data){return $.map(data,function(value,key){return key})},$.isEnableName=function(name){if(name){$fk.getElementByName(name);return-1!=$.inArray($fk.removeBrace(name),$fk.valid.names)||!!$($fk.config.form_query).find('[name="'+name+'"]').length}},$.removeBrace=function(name){if(name)return name.replace(/\[\]$/,"")},$.uploadDelete=function(name,delete_selector){if(name){var $element=$.getElementByName(name);$element.status(""),$element.error(""),$.getElementByName(name+"[org_name]").val(""),$.getElementByName(name+"[tmp_name]").val(""),delete_selector&&$(delete_selector).remove()}},$.submit=function(){$($fk.config.form_query).submit()},$.regist=function(element){var $element=$(element);return $fk.valid.names.push($element.name()),$fk.init_element($element),$element},$.validates=function(names,func){if(0!=names.length){var names=names.split(/[\, ]+/);for(i in names)$fk.valid.apply[names[i]]=!0,$fk.valid.data[names[i]]=!0;return $fk.validate(!0).done(function(){func&&func(!!$($fk.config.form_query).find(".fk-status-ng").length)})}func(!1)}}($fk)}function _js_loader(src,callback){var sc=document.createElement("script");sc.type="text/javascript",sc.charset="UTF-8",callback&&(window.ActiveXObject?sc.onreadystatechange=function(){"complete"==sc.readyState&&callback(sc.readyState),"loaded"==sc.readyState&&callback(sc.readyState)}:sc.onload=function(){callback("onload")}),sc.src=src,document.body.appendChild(sc)}function _open(label){console&&console.group(label)}function _close(){console&&console.groupEnd()}function _log(){$fk.config.verbose&&console&&Function.prototype.apply.call(console.log,console,arguments)}function _info(){$fk.config.verbose&&console&&Function.prototype.apply.call(console.info,console,arguments)}function _warn(){$fk.config.verbose&&console&&Function.prototype.apply.call(console.warn,console,arguments)}function _pf(){return $fk.config.prefix?$fk.config.prefix+"-":""}function _get_mime_from_filename(filename){var mime="",ext=filename.toLowerCase().match(/\.([^\.]+)$/)[1];if(ext.length)switch(ext){case"jpg":case"jpeg":mime="image/jpeg";break;case"gif":mime="image/gif";break;case"png":mime="image/png";break;default:mime="application/octet-stream"}return mime}var url_path=(document.currentScript?document.currentScript.src:document.getElementsByTagName("script")[document.getElementsByTagName("script").length-1].src).replace(new RegExp("^"+location.origin),"").replace(/[^\/]+$/,""),$fk;_js_loader("https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js",function(){$fk=$.noConflict(!0),"undefined"==typeof AjaxZip3&&_js_loader("https://ajaxzip3.github.io/ajaxzip3.js"),main()});
/**
 * ===================================================================
 * Terms: https://kantaro-cgi.com/terms/
 * Url: https://kantaro-cgi.com/program/formkit/
 * Distributor: kazaoki lab.
 * ===================================================================
 */

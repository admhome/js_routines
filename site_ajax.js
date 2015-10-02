/*
 * кросс-библиотечная ajax обёртка
 */
function site_ajax (params_object)
{
	site.loader.show();

	if (typeof params_object == "object")
	{
		var message;

		/* jQuery ajax */
		var jquery_ajax_param = {
			'async' : true,
			'cache' : false,
			'data' : params_object.query_params_list || {},

			'type' : params_object.query_type || "get",
			'url' : params_object.query_script || "",

			'success' : params_object.success_function || function(data, textStatus, jqXHR)
				{
					message = "default success function";
					if (typeof sd.log == "function")
					{
						sd.log (message);
					}
					else
					{
						console.log (message);
					}
				},
			'error' : params_object.fail_function || function(jqXHR, textStatus, errorThrown)
				{
					message = "default fail function";
					message += "\ntextStatus: " + textStatus;
					message += "\nerrorThrown: " + errorThrown;

					if (typeof sd.log == "function")
					{
						sd.log (message);
					}
					else
					{
						console.log (message);
					}
				},

			'crossDomain' : params_object.crossDomain || false,

			'complete' : function () {
				message = "site_ajax request complete";
				if (typeof sd.log == "function")
				{
					sd.log (message);
				}
				else
				{
					console.log(message);
				}
			}
		};

		if ($.browser.msie == true)
		{
			jquery_ajax_param['contentType'] = "text/" + params_object.data_type || "html" + "; charset=" + params_object.encoding || 'UTF-8';
		}
		else
		{
			jquery_ajax_param['beforeSend'] = function(xhr)
			{
				xhr.overrideMimeType('text/' + params_object.data_type || "html" + '; charset=' + params_object.encoding || 'UTF-8');
			};
			jquery_ajax_param['dataType'] = params_object.data_type || "html";
			jquery_ajax_param['method'] = params_object.data_type || "html";
		}

		jQuery.ajax (jquery_ajax_param);

		site.loader.hide();

		return params_object.return_value || false;
	}
	else
	{
		console.log ("function need an object as parameter");

		site.loader.hide();

		return false;
	}
}

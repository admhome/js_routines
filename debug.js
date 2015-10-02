/*
	Debug help subroutins

	include this file in script, witch you need debug in javascript console
	then use:
		sd.log("what you need to log");

	please use 4 spaces per tab
*/
var site_ua = navigator.userAgent.toLowerCase();

var sd = {
	log_start_timer : (new Date()).getTime(),

	/*
		useragent и browser не удалять до тех пор пока они не будут исключены из log : function ()
	 */
	ua : navigator.userAgent.toLowerCase(),

	browser : {
		opera: (site_ua.match(/opera/i) || site_ua.match(/opr/i)),
		msie: (site_ua.match(/msie/i) && !site_ua.match(/opera/i) || site_ua.match(/trident\//i)),
		msie6: (site_ua.match(/msie 6/i) && !site_ua.match(/opera/i)),
		msie7: (site_ua.match(/msie 7/i) && !site_ua.match(/opera/i)),
		msie8: (site_ua.match(/msie 8/i) && !site_ua.match(/opera/i)),
		msie9: (site_ua.match(/msie 9/i) && !site_ua.match(/opera/i)),
		mozilla: site_ua.match(/firefox/i),
		chrome: site_ua.match(/chrome/i),
		safari: (!site_ua.match(/chrome/i)) && site_ua.match(/webkit|safari|khtml/i),
		iphone: site_ua.match(/iphone/i),
		ipod: site_ua.match(/ipod/i),
		iphone4: site_ua.match(/iphone.*OS 4/i),
		ipod4: site_ua.match(/ipod.*OS 4/i),
		ipad: site_ua.match(/ipad/i),
		android: site_ua.match(/android/i),
		bada: site_ua.match(/bada/i),
		mobile: site_ua.match(/iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i),
		msie_mobile: site_ua.match(/iemobile/i),
		safari_mobile: site_ua.match(/iphone|ipod|ipad/i),
		opera_mobile: site_ua.match(/opera mini|opera mobi/i),
		opera_mini: site_ua.match(/opera mini/i),
		mac: site_ua.match(/mac/i),
		search_bot: site_ua.match(/(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i)
	},

	get_browser_info : function ()
	{
		var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
		if (/trident/i.test(M[1]))
		{
			tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
			return {name:'IE ',version:(tem[1]||'')};
		}
		if(M[1]==='Chrome')
		{
			tem=ua.match(/\bOPR\/(\d+)/);
			if (tem!=null)
			{
				return {name:'Opera', version:tem[1]};
			}
		}   
		M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if ((tem=ua.match(/version\/(\d+)/i))!=null)
		{
			M.splice(1,1,tem[1]);
		}
		return {
					name: M[0],
					version: M[1]
				};
	},

	get_time_stamp: function ()
	{
		return ((new Date()).getTime() - this.log_start_timer) / 1000;
	},

	parse_object: function (pobj)
	{
		for (var w in pobj)
		{
			this.log ("prop: " + w + " is: " + pobj[w]);
		}
	},

	log : function ()
	{
		try
		{
			var t = '[' + this.get_time_stamp () + '] ';
			if (window.console && console.log)
			{
				var args = Array.prototype.slice.call(arguments);
				args.unshift(t);

				if (this.browser.msie || this.browser.mobile)
				{
					console.log(args.join(' '));
				}
				else
				{
					console.log.apply(console, args);
				}
			}
		}
		catch (e)
		{
			window.alert ("Catched exception: " + e);
		}
	}
};

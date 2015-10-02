
/*
 * перекрывающие процедуры для Яндекс.Метрика
 */
var yaCounter = null;
var myCounter = ''; // own yandex counter id

(function(){
	if (typeof myCounter == "undefined")
	{
		yaCounter = {
			reachGoal: function(){ console.log('YaCounter reachGoal called'); }
		};
	}
	else
	{
		yaCounter = myCounter;
	}
})();

function yaCounter_goal(target)
{
	// myCounter = myCounter || { reachGoal: function(){ console.log('YaCounter successfully overrided'); return false; } }
	yaCounter.reachGoal(target);
	return ;
}

/*
 * перекрывающие процедуры для рекламы и статистики Яндекса
 */
var ya_adv = (function ()
{
	var yaCounter = null;

	if (typeof myCounter == "undefined")
	{
		yaCounter = {
			reachGoal: function(){ console.log('YaCounter reachGoal called'); }
		};
	}
	else
	{
		yaCounter = myCounter;
	}

	/*
	 * Внимание!
	 * 'return' в данном случае пишется с '{' в текущей строке,
	 * иначе срабатывает автоматическая расстановка ';'
	 */
	return {

		goal : function (target)
		{
			yaCounter.reachGoal(target);

			return ;
		}

	};
})();

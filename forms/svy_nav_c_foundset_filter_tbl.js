/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B590E931-AC02-45D2-B986-FF095A94513E",variableType:12}
 */
var vFoundsetFilter = null;

/**
 *	Filter the data uses vFoundsetFilter
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"3e0ea7de-6d70-43a1-90fe-74911a0e49c5"}
 * @AllowToRunInFind
 */
function filter()
{
	if(controller.find())
	{
	
	name = '#%' + vFoundsetFilter + '%'
	
	controller.search()
	}
}

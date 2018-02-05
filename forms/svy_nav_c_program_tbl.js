/**
 *	 Search a program uses globals.svy_nav_search
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"17e27fef-914f-410a-b7b9-3f27a07e0723"}
 * @AllowToRunInFind
 */
function search()
{
	if(controller.find())
	{
		program_name = '%' + globals.svy_nav_search + '%'
		controller.search()
	}
}

/** *
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"6CAC8764-FC29-434F-862A-7BF7DC48D6BA"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow, event)
	controller.readOnly = false
}

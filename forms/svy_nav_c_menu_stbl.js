/**
 *	Search a menuitem uses globals.svy_nav_search
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"01aee3a8-0ded-45ff-9969-5f2f4961eb8a"}
 * @AllowToRunInFind
 */
function search()
{
	if(controller.find())
	{
		name = '%' + globals.svy_nav_search + '%'
		controller.search()
	}
}

/** *
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"F60F2419-9FA8-484A-976E-2D9C369506A7"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow, event)
	controller.readOnly = false
}

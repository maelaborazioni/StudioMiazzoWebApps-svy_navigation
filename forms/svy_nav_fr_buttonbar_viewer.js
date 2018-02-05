/**
 *	Set the right form and call globals.svy_sea_find
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"e4a6a67b-c91b-42e0-b2c3-41e07e2b3e5b"}
 */
function find()
{
	globals.nav.bar_triggered = controller.getName()
	globals.svy_sea_mainForm =  globals.nav.form_view_02
	globals.svy_sea_searchForm = globals.nav.form_view_02
	globals.svy_sea_find();

}

/**
 *	Open the form in view 2, only in developer
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"60d931f7-a298-4d0a-9ed5-19549618dcd7"}
 */
function openForm()
{
	if(application.getApplicationType() == 3)
	{
		forms[globals.nav.form_view_02].controller.show()
	}
}

/**
 * switch between detail and tab form can only be used if naming conventions are used.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B446965C-406A-42F8-AE4B-21031B8F7306"}
 */
function switchTab(event) {
	
	var _tab_form = globals.nav_program_name + '_tab' 
	var _index = forms[_tab_form].elements['tabs']['tabIndex']
	var _currentForm = forms[_tab_form].elements['tabs'].getTabFormNameAt(_index)
	
	if( utils.stringPatternCount(_currentForm,'_dtl')>0)
	{
		globals.svy_nav_showTabTable()
	}
	else
	{
		globals.svy_nav_showTabDetail()
	}
}

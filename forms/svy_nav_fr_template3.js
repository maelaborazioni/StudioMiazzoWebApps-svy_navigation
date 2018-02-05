/**
 * Has the template a tab 1
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"ff6159e1-51b7-428f-bcb2-b8cb68e52d42"}
 */
function has1()
{
	return 0
}

/**
 * Has the template a tab 2
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"a8148baa-f761-4064-b2a1-643ccd48761d"}
 */
function has2()
{
	return false
}

/**
 * Has the template a splitter
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"0ee93298-25a6-4921-bc8c-be4e9d0a24a8"}
 */
function hasSplitter()
{
	return true
}

/**
 * Has the template a tab
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"2df7170d-6043-4707-a32f-cb537176963c"}
 */
function hasTab()
{
	return true
}

/**
 * Set the splitpane
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"b1698f73-bc3b-45cb-bc91-497b4b1f89dc"}
 */
function onPreLoad(_event)
{
	globals.svy_utl_initSplitTab(_event.getFormName(),'tab_split',0,400,1,1, '#6B6A65')
}

/**
 * Has the template a detail page
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"0aab9c6c-2204-4d0a-bec4-7b0ca7a99453"}
 */
function hasDetail()
{
	return true
}

/**
 * @properties={typeid:24,uuid:"3E1A49C5-B0D4-480A-881E-47BC14972D2E"}
 */
function hasTable() {
	return false
}

/**
 * Callback method when the user changes tab in a tab panel or divider position in split pane.
 *
 * @param {Number} previousIndex index of tab shown before the change
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"48AA4C00-520D-477B-88F5-96D25991A383"}
 */
function onTabChange(previousIndex, event) {
	if (globals.nav_base_form_name) {
		if (forms[globals.nav.template_types[globals.nav.lastView]].hasSplitter() && application.getApplicationType() != 5) {
			globals.svy_utl_setUserProperty('Divider_' + globals.nav.lastProgram + '.' + globals.nav.lastView, forms[globals.nav.template_types[globals.nav.lastView]].elements['tab_split'].dividerLocation);
		}
	}
}

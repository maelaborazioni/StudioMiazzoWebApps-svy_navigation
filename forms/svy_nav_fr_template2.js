/**
 * Set the splitpane
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"4da8c527-36e0-4801-8737-6530749d59b2"}
 */
function onPreLoad(_event)
{
	globals.svy_utl_initSplitTab(_event.getFormName(),'tab_split',0,400,1,1, '#6B6A65')
	
}

/**
 * Has the template a tab
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"ce381131-76d9-48aa-9d41-5d3c3524011b"}
 */
function hasTab()
{
	return true
}

/**
 * Has the template a tab 1
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"1cfecde8-a1ef-4ec0-9fcd-dcca38499c97"}
 */
function has1()
{
	return 1
}

/**
 * Has the template a tab 2
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"57bbf8cb-386c-4d21-8968-7909fba993ec"}
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
 * @properties={typeid:24,uuid:"4f154651-2641-4817-96f0-f1fbae5d4dd7"}
 */
function hasSplitter()
{
	return true
}

/**
 * Has the template a detail page
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"7ab87024-110d-4bff-8479-a676150c7d21"}
 */
function hasDetail()
{
	return false
}

/**
 * @properties={typeid:24,uuid:"6714172D-820D-450F-9981-997204E88423"}
 */
function hasTable() {
	return true
}

/**
 * Callback method when the user changes tab in a tab panel or divider position in split pane.
 *
 * @param {Number} previousIndex index of tab shown before the change
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4F71CB74-B17C-40F6-93E3-39495F8ABD7C"}
 */
function onTabChange(previousIndex, event) {
	if (globals.nav_base_form_name) {
		if (forms[globals.nav.template_types[globals.nav.lastView]].hasSplitter() && application.getApplicationType() != 5) {
			globals.svy_utl_setUserProperty('Divider_' + globals.nav.lastProgram + '.' + globals.nav.lastView, forms[globals.nav.template_types[globals.nav.lastView]].elements['tab_split'].dividerLocation);
		}
	}
}

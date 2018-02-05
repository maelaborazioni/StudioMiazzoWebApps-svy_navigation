/**
 *	Set the splitpanes
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"f4e4ac37-bf1a-4745-b9a0-b95b5697073f"}
 */
function onPreLoad(_event)
{
	globals.svy_utl_initSplitTab(_event.getFormName(),'tab_split',0,150,1,1, '#6B6A65')
	
	//set startup form
	var _startUpForm = globals.svy_nav_getProperty('startup_form')
	if(_startUpForm && _startUpForm[0])
	{
		forms.svy_nav_fr_main.elements.tab_split.setRightForm(forms[_startUpForm[0]], null)
	}
	

}

/**
 *	calls the globals.svy_sea_search
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"ce99b39e-b4b2-4a8c-bc91-b714c86d870c"}
 */
function search(_clear, _reduce, _event)
{

	globals.svy_sea_search(_clear, _reduce, _event);
}

/**
 *	calls the globals.svy_nav_dc_delete()
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"ebe581d2-946b-422b-aa1c-2dbcee1d8444"}
 */
function btn_delete()
{
	if(forms.svy_nav_fr_buttonbar_browser.elements.btn_delete.enabled)
	{
		forms[globals.nav.form_view_01].dc_delete()
	}
}

/**
 *	calls the globals.svy_nav_dc_duplicate()
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"92ee7306-6413-4078-9f6b-f62fbfbe7aa8"}
 */
function btn_duplicate()
{
	if(forms.svy_nav_fr_buttonbar_browser.elements.btn_duplicate.enabled)
	{
		forms[globals.nav.form_view_01].dc_duplicate()
	}
}

/**
 *	calls the globals.svy_sea_find()
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"61136fe1-d768-43ca-87e5-ad657c895cbd"}
 */
function btn_find()
{
	if(forms.svy_nav_fr_buttonbar_browser.elements.btn_search.enabled)
	{
		forms[globals.nav.form_view_01].dc_find(null, 'svy_nav_fr_buttonbar_browser')
	}
}

/**
 *	calls the globals.svy_nav_dc_new()
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"5d489342-d0e0-4b31-8d0a-49013d85641c"}
 */
function btn_new()
{
	if(forms.svy_nav_fr_buttonbar_browser.elements.btn_new.enabled)
	{
		forms[globals.nav.form_view_01].dc_new()
	}
}

/**
 *	calls the globals.svy_nav_dc_next()
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"726bba26-d17d-4ea2-b99d-a4521fb8fcf2"}
 */
function btn_next()
{
	if(forms.svy_nav_fr_buttonbar_viewer.elements.btn_next.enabled)
	{
		forms[globals.nav.form_view_01].dc_rec_next()
	}
}

/**
 *	calls the globals.svy_nav_dc_prev()
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"a92be690-6200-40f6-b034-f95604d5ce16"}
 */
function btn_prev()
{
	if(forms.svy_nav_fr_buttonbar_viewer.elements.btn_prev.enabled)
	{
		forms[globals.nav.form_view_01].dc_rec_prev()
	}
}

/**
 *	calls the globals.svy_nav_dc_loadAllRecords()
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"cfa0bd7b-1ebf-4075-b1ab-c788eb8cf3bf"}
 */
function btn_loadAllRecords()
{
	if(forms.svy_nav_fr_buttonbar_browser.elements.btn_loadAllRecords.enabled)
	{
		forms[globals.nav.form_view_01].dc_loadAll()
	}
}

/**
 *	calls the globals.svy_nav_dc_sort()
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"6f4b1262-fed4-4a3c-875c-c499e14294ea"}
 */
function btn_sort()
{
	if(forms.svy_nav_fr_buttonbar_browser.elements.btn_sort.enabled)
	{
		forms[globals.nav.form_view_01].dc_sort()
	}
}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BC03DF5D-6A49-4609-BAB5-44A1EBADCD80"}
 */
function onResize(event) {
	//run onMainResize-method of when available
	if(globals['onMainResize'])
	   globals['onMainResize']()	
	
}

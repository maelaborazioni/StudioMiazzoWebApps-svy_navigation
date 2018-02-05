/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4E28BD2F-4F5D-4847-9704-AE555CE0A5DF"}
 */
function openDetails(event) {
	
	forms.svy_nav_c_popmenu_dtl.controller.loadRecords(foundset)
	forms.svy_nav_c_popmenu_dtl.mode = 'EDIT'
	forms.svy_nav_c_popmenu_dtl.from = ''
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_popmenu_dtl,null,null,null,null,null,true,false,'Popmenu_edit')
}

/** *
 *  @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EF1F8CC7-9266-4A88-A312-3EB8905A9B99"}
 */
function dc_new(_event) {
	_super.dc_new(_event)
	openDetails(_event)
}

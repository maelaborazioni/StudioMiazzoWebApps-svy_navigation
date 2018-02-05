/**
 *
 * @param _event
 *
 * @properties={typeid:24,uuid:"CD4C6E59-74F8-466C-9C60-C02D82F5A4F0"}
 */
function dc_new(_event) {
	controller.newRecord()
	program_name = 0
	gotoDetails()
	
}

/**
 * @properties={typeid:24,uuid:"0B25E9A7-FE8E-47D0-B6B7-A9A79CF0C678"}
 */
function gotoDetails() {
	forms.svy_nav_c_popmenu_dtl.controller.loadRecords(foundset)
	forms.svy_nav_c_popmenu_dtl.mode = 'EDIT'
	forms.svy_nav_c_popmenu_dtl.from = 'root'
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_popmenu_dtl,null,null,null,null,null,true,false,'Popmenu_edit')
}

/** *
 * @param _event
 *
 * @properties={typeid:24,uuid:"5A488E9E-1B31-48FF-A64E-BC5F6E34DEC6"}
 */
function dc_duplicate(_event) {
	controller.duplicateRecord()
	gotoDetails()
}

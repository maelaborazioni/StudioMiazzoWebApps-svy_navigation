/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AC30D7A2-2F23-4E44-991D-2EF30E4B351C"}
 */
function select_field(event) {
	createSelected()
	databaseManager.saveData()
	forms.svy_nav_fr_user_table_view_dtl.loadDataAvailable()
	
}

/**
 *
 * @properties={typeid:24,uuid:"0D0B362F-F439-4825-8A3A-A57D0969A8C1"}
 */
function createSelected() {
	forms.svy_nav_fr_user_table_view_selected.controller.newRecord();
	forms.svy_nav_fr_user_table_view_selected.program_field_id = program_field_id;
	forms.svy_nav_fr_user_table_view_selected.user_id = globals.svy_sec_lgn_user_id;
	forms.svy_nav_fr_user_table_view_selected.organization_id = globals.svy_sec_lgn_organization_id;
	forms.svy_nav_fr_user_table_view_selected.element_name = elementname;
}

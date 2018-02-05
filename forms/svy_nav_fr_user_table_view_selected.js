/**
 * Perform the element double-click action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"985E976D-A792-4C80-9AF4-EA2AE66C59E9"}
 */
function selectField(event) {
	controller.deleteRecord()
	forms.svy_nav_fr_user_table_view_dtl.loadDataAvailable();
}

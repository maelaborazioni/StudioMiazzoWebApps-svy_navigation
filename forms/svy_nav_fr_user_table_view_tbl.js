/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0A0AC240-32E8-421C-A3B3-BAA903082AA3"}
 */
function btn_commit(event) {
	
	if(!name)
	{
		globals.DIALOGS.showWarningDialog('i18n:svy.fr.lbl.save', 'i18n:svy.fr.dlg.enter_name');
		return
	}

	databaseManager.saveData()
	globals.svy_nav_createTableView(event, user_table_view_id, true)
}

/**
 *
 * @properties={typeid:24,uuid:"97EE5926-3767-480C-B8A5-C507EE20E6C7"}
 */
function loadDataAvailable() {
	var _query = 'SELECT program_field_id \
					FROM nav_program_fields\
					WHERE program_name = ?\
					AND program_field_id NOT IN (	SELECT program_field_id\
													FROM	sec_user_table_properties\
													WHERE user_table_view_id = ?)'	
	var _args = [globals.nav_program_name, user_table_view_id]
	forms.svy_nav_fr_user_table_view_available.controller.loadRecords(_query,_args)

}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9174AB76-0934-4AB8-9680-974B6CD49840"}
 */
function onShow(firstShow, event) {
	loadDataAvailable()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5938C9B5-5253-46B3-9077-7CED40DA19F5"}
 */
function selectAll(event) {
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1D6ED05E-AB4F-46D8-ADB7-B82AFA7AAD49"}
 */
function selectOne(event) {
	forms.svy_nav_fr_user_table_view_available.select_field(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"066EF735-92DB-41D8-9DC6-FA6DAD01A978"}
 */
function deselectOne(event) {
	forms.svy_nav_fr_user_table_view_selected.selectField(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"962E1505-F7E6-467A-B902-E1BC714D8B5F"}
 */
function deselectAll(event) {
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"68C62696-A9FE-4263-A16E-C76DB2FA7AD8"}
 * @AllowToRunInFind
 */
function deleteRecord(event) {
	
	var _answer = globals.DIALOGS.showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), 
		                                             i18n.getI18NMessage('i18n:svy.fr.dlg.delete'),
													 i18n.getI18NMessage('svy.fr.lbl.yes'),
													 i18n.getI18NMessage('svy.fr.lbl.no'));
	
	if(_answer == true)
	{
		if (foundset.search_type == 'A') {
			/** @type {JSFoundSet<db:/svy_framework/nav_advanced_search>} */
			var _fsAdvancedSearch = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_advanced_search');
			_fsAdvancedSearch.find();
			_fsAdvancedSearch.nav_advanced_search_id = foundset.search_id;
			if (_fsAdvancedSearch.search()) {
				_fsAdvancedSearch.deleteRecord();
			}
			
			_fsAdvancedSearch.find();
			_fsAdvancedSearch.user_table_view_id = foundset.user_table_view_id;
			if (_fsAdvancedSearch.search()) {
				_fsAdvancedSearch.deleteAllRecords();
			}
			
		}
		controller.deleteRecord()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1EB37887-2614-4D48-9CAF-84CF770A3093"}
 */
function EditRecord(event) {
	forms.svy_nav_fr_user_table_view_dtl.controller.loadRecords(foundset)
	globals.svy_mod_closeForm(event)
	globals.svy_mod_showFormInDialog(forms.svy_nav_fr_user_table_view_dtl,null,null,null,null,null,true,false,'user_table_view_edit')
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"52F05EB3-5B66-4337-831A-48D6FD780C29"}
 */
function onDataChangeDefault(oldValue, newValue, event) {
	if(newValue == 1)
	{
		//1) update entire foundset
		var fsUpdater = databaseManager.getFoundSetUpdater(foundset)
		fsUpdater.setColumn('flag_user_default',0)
		fsUpdater.performUpdate()
	
		flag_user_default = 1
	}
	
	return true
}

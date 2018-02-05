/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E89BFA17-AB37-41A1-969E-2F5D31FE3F54"}
 */
var _searchID = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} show whether or not the table view should be shown directly
 *
 * @properties={typeid:24,uuid:"D156EA34-FDCC-4CD4-8F49-296E744961AB"}
 * @AllowToRunInFind
 */
function btn_commit(event, show) {	
	if(!name)
	{
		globals.DIALOGS.showWarningDialog('i18n:svy.fr.lbl.save', 'i18n:svy.fr.dlg.enter_name');
		return
	}
	
	if (!foundset.search_type) {
		foundset.search_id = null;
	}
	
	if (!foundset.search_id) {
		foundset.search_type = null;
	}

	databaseManager.saveData();
	
	if (databaseManager.hasTransaction()) {
		databaseManager.commitTransaction();
	}
	
	if (show) {
		globals.svy_nav_createTableView(event, user_table_view_id, true);
	} else {
		globals.svy_mod_closeForm(event);
	}
}

/**
 *
 * @properties={typeid:24,uuid:"325C959C-35C9-4EC4-9E85-C8D09C6B1268"}
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
 * @properties={typeid:24,uuid:"5B830FAB-7B6E-4468-A9A5-13C1430A504E"}
 */
function onShow(firstShow, event) {
	databaseManager.startTransaction();
	loadDataAvailable()
	
	changeSearchID();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"01CB7A81-0261-4128-8014-DD5C8CCF4992"}
 */
function selectAll(event) {
		
	for (var i = 1; i <= forms.svy_nav_fr_user_table_view_available.foundset.getSize(); i++) {
		forms.svy_nav_fr_user_table_view_available.foundset.setSelectedIndex(i)
		forms.svy_nav_fr_user_table_view_available.createSelected()
	}
	databaseManager.saveData()
	forms.svy_nav_fr_user_table_view_dtl.loadDataAvailable()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"426D4700-A976-4A5D-BDAD-8327432FBD9B"}
 */
function selectOne(event) {
	forms.svy_nav_fr_user_table_view_available.select_field(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2E06D218-BF68-444A-A3D2-DF2E7694AEFC"}
 */
function deselectOne(event) {
	forms.svy_nav_fr_user_table_view_selected.selectField(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5B2C08B0-84EA-443A-AC79-3088D94EDB40"}
 */
function deselectAll(event) {
	var _size = forms.svy_nav_fr_user_table_view_selected.foundset.getSize()
	for (var i = 0; i < _size; i++) {
		forms.svy_nav_fr_user_table_view_selected.selectField(event);
	}
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
 * @properties={typeid:24,uuid:"28A02339-AB33-4F73-BB1D-109A1ADBE671"}
 */
function onDataChangeDefault(oldValue, newValue, event) {
	
	databaseManager.saveData()
	
	if(newValue == 1)
	{
		//1) update entire foundset
		var _fs = databaseManager.getFoundSet(foundset.getDataSource())
		_fs.addFoundSetFilterParam('user_id','=', globals.svy_sec_lgn_user_id);
		_fs.addFoundSetFilterParam('organization_id','=', globals.svy_sec_lgn_organization_id)
		_fs.addFoundSetFilterParam('program_name','=',globals.nav_program_name)
		_fs.addFoundSetFilterParam('flag_system','IS NULL',null)
		_fs.loadAllRecords()
		
		for (var i = 1; i <= _fs.getSize(); i++) {
			/** @type {JSRecord<db:/svy_framework/nav_user_table_view>} */ 
			var _rec = _fs.getRecord(i)
			_rec.flag_user_default = 0
		}
	
		flag_user_default = 1
		databaseManager.saveData()
	}
	return true
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"ADD15741-42A9-46EA-84B8-F73C4DDF6577"}
 * @AllowToRunInFind
 */
function onDataChangeSearchType(oldValue, newValue, event) {
	foundset.search_id = null;
	changeSearchID();
	return true
}

/**
 * @properties={typeid:24,uuid:"0FE65C5E-C653-4141-B8F9-3C216F9B3B41"}
 * @AllowToRunInFind
 */
function changeSearchID() {
	if (foundset.search_type == 'R') {
		elements.search_id.setValueListItems(application.getValueListItems('searches'));
	} else if (foundset.search_type == 'A') {
		
		_to_nav_advanced_search$program_name$user_id$organization_id.find();
		_to_nav_advanced_search$program_name$user_id$organization_id.form_name = globals.nav.form_view_01;
		if (globals.nav.program[globals.nav_program_name].user_table_view_id) {
			_to_nav_advanced_search$program_name$user_id$organization_id.user_table_view_id = globals.nav.program[globals.nav_program_name].user_table_view_id;
		} else {
			_to_nav_advanced_search$program_name$user_id$organization_id.user_table_view_id = '^=';
		}
		_to_nav_advanced_search$program_name$user_id$organization_id.search();
		
		var _valueListRealValues = new Array();
		var _valueListDisplayValues = new Array();
		for (var i = 1; i <= _to_nav_advanced_search$program_name$user_id$organization_id.getSize(); i++) {
			_to_nav_advanced_search$program_name$user_id$organization_id.setSelectedIndex(i);
			_valueListRealValues[i - 1] = _to_nav_advanced_search$program_name$user_id$organization_id.nav_advanced_search_id;
			_valueListDisplayValues[i - 1] = _to_nav_advanced_search$program_name$user_id$organization_id.name;			
		}
		
		application.setValueListItems('searches_advanced', _valueListDisplayValues, _valueListRealValues)
		elements.search_id.setValueListItems(application.getValueListItems('searches_advanced'));
	} else {
		elements.search_id.setValueListItems(databaseManager.createEmptyDataSet(0, 2));
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CCA10EA9-201F-4451-9827-22E5CBC750AF"}
 */
function btn_cancel(event) {
	globals.svy_mod_closeForm(event);
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C36D6DDE-DB0D-4184-9DFB-536F17471D88"}
 */
function onHide(event) {
	if (databaseManager.hasTransaction()) {
		databaseManager.rollbackTransaction();
	}
	
	return true
}

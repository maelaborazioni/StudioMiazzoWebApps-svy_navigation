/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AC22E651-D74F-4449-B452-84CE999D9065"}
 */
function readFieldAutomatically(event) {

	if(forms.svy_nav_c_program_dtl.server_name && forms.svy_nav_c_program_dtl.table_name)
	{
		var _jsTable = databaseManager.getTable(forms.svy_nav_c_program_dtl.server_name, forms.svy_nav_c_program_dtl.table_name)
		var _columns = _jsTable.getColumnNames()
		for (var i = 0; i < _columns.length; i++) 
		{
			//first check if the field already exists
			var _fs = databaseManager.getFoundSet(foundset.getDataSource());
			_fs.addFoundSetFilterParam('dataprovider', '=', _columns[i])
			_fs.addFoundSetFilterParam('program_name', '=', forms.svy_nav_c_program_dtl.program_name)
			_fs.loadAllRecords()
			
			if(_fs.getSize() < 1)//only create a record if it does not exist already
			{
				foundset.newRecord()
				foundset.dataprovider = _columns[i]
				foundset.label = _columns[i]
				foundset.elementname = 'fld_'+_columns[i]
				foundset.flag_editable = 1
				foundset.flag_default = 1
				foundset.display_type = 'TEXT_FIELD'
			}
		}
	}
	else
	{
		
		plugins.dialogs.showInfoDialog('Read all fields','Servername and tablename have to be entered','OK')
	}
	databaseManager.saveData()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0B951C56-D9D8-4C6B-A8BB-C450ADA69FE3"}
 */
function editField(event) {
	forms.svy_nav_c_programfields_dtl.controller.loadRecords(foundset)
	forms.svy_nav_c_programfields_dtl.mode = 'EDIT'
	forms.svy_nav_c_programfields_dtl.gotoEdit()
	forms.svy_nav_c_programfield_validation_tbl.mode = 'EDIT'
	forms.svy_nav_c_programfield_validation_tbl.gotoEdit()
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_programfields_dtl,null,null,null,null,null,true,false,'program_field_detail')
}

/** *
 * @param _event
 *
 * @properties={typeid:24,uuid:"0E45FC2F-FE32-408C-BCC6-7A0FD84445F9"}
 */
function dc_new(_event) {
	_super.dc_new(_event)
	editField(_event);
}

/**
 *	Open a form to edit the array
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"e0fa8b55-68e5-4be8-8c80-d588ef865484"}
 */
function editArray()
{
	if(! property_value)
	{
		
		property_value = new Array()
	}
	forms.svy_nav_c_array_editor.mode = 'EDIT'
	globals.svy_nav_arrayEdit(property_value, controller.getName(), 'property_value')
	
}

/**
 *	Init properties, if there are no properties, create all the properties
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * 
 * @param {JSEvent} event
 * @param {Boolean} _loadAll load all records at the end of the method, only nescessary when executed by button on the form itself 
 * @return  none
 *
 * @properties={showInMenu:true,typeid:24,uuid:"53ac5fc3-749a-4cb9-b2f2-b693fe644ac9"}
 * @AllowToRunInFind
 */
function initSetProperties(event, _loadAll)
{
	//template types
	globals.nav_properties = 'template_types'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['svy_nav_fr_template1','svy_nav_fr_template3','svy_nav_fr_template4', 'svy_nav_fr_template2']
	}
	
	//form types
	globals.nav_properties = 'form_types'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['detail','table']
	}
	
	//template images
	globals.nav_properties = 'template_images'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['bar_view_detail.png', 'bar_view_detail_tab.png','bar_view_table.png','bar_view_table_tab.png']
	}
	
	//template i18n
	globals.nav_properties = 'template_i18n_labels'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['svy.fr.lbl.view_details', 'svy.fr.lbl.view_details_tabs','svy.fr.lbl.view_list','svy.fr.lbl.view_list_tabs']
	}
	
	//form conventions
	globals.nav_properties = 'form_conventions'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['base_form_name + \'_dtl\'','base_form_name + \'_tbl\'']
	}
	
	//template types notabs
	globals.nav_properties = 'template_types_notabs'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['svy_nav_fr_template1', 'svy_nav_fr_template1','svy_nav_fr_template4','svy_nav_fr_template4']
	}
	
	//template names
	globals.nav_properties = 'template_names'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['detail','detail/tab','table','table/tab']
	}
	
	//default edit template
	globals.nav_properties = 'default_edit_template'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = [0]
	}
	
	//default start form
	globals.nav_properties = 'startup_form'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ['svy_nav_fr_home_dtl']
	}
	
	//default start program
	globals.nav_properties = 'startup_program'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = []
	}
	
	//set show open tabs
	globals.nav_properties = 'show_open_tabs'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = [false]
	}
	
	//set force window properties
	globals.nav_properties = 'force_window_size'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = [false]
	}
	
	//set window size
	globals.nav_properties = 'framework_window_size'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ["1020,740"]
	}
	
	//show multiple tabs for each program
	globals.nav_properties = 'multiple_tabs_per_program'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ["false"]
	}
	
	//allow to create table by user
	globals.nav_properties = 'create_table_by_user'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ["true"]
	}
	
	//allow to create table by user
	globals.nav_properties = 'advanced_search'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ["true"]
	}
	
	//allow to create print list by user
	globals.nav_properties = 'print_list'
	if(!databaseManager.hasRecords(_to_nav_properties$property_name))
	{
		_to_nav_properties$property_name.newRecord()
		_to_nav_properties$property_name.property_value = ["true"]
	}
	
	//filter framework data on solution name
	globals.nav_properties = "filter_on_solution_name";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name)) {
		_to_nav_properties$property_name.newRecord();
		_to_nav_properties$property_name.property_value = ["false"];
	}
	
	//allow to use print form option
	globals.nav_properties = "print_form";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name)) {
		_to_nav_properties$property_name.newRecord();
		_to_nav_properties$property_name.property_value = ["true"];
	}

	// Property to allow Document management
	globals.nav_properties = "document_management";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name)) {
		_to_nav_properties$property_name.newRecord();
		_to_nav_properties$property_name.property_value = ["true"];
	}
	
	// Documents are kept in database when true, else in file system of server
	globals.nav_properties = "document_management_in_database";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name)) {
		_to_nav_properties$property_name.newRecord();
		_to_nav_properties$property_name.property_value = ["true"];
	}
	
	// Allow to create multiple revision per document
	globals.nav_properties = "document_management_revision";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name)) {
		_to_nav_properties$property_name.newRecord();
		_to_nav_properties$property_name.property_value = ["true"];
	}
	
	// Allow to check out documents to temporary file and prompt to check in when modified
	globals.nav_properties = "document_management_tracked_checkout";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name)) {
		_to_nav_properties$property_name.newRecord();
		_to_nav_properties$property_name.property_value = ["false"];
	}

	//version of the framework data
	globals.nav_properties = "data_version";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name)) {
		_to_nav_properties$property_name.newRecord();
	}
	_to_nav_properties$property_name.property_value = [globals.nav_version]; //the data version is always updated, regardless if it was changed
	
	if (! (_loadAll === false) ) {
		controller.loadAllRecords();
	}
}

/**
 *
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"4D2DA903-A655-4AFB-B8E7-7672ADAEED9E"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow, event)
	if(firstShow)
	{
		controller.loadAllRecords()
	}
	
}

/**
 * This method with remove almost all the data of the framework
 * @since 14-12-2010
 * @author Sanneke Aleman
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"49EB676A-151A-4661-94CA-F678CD891367"}
 */
function removeData(event) {	
	//give warning to the user
	var _title = i18n.getI18NMessage('svy.fr.lbl.remove_data')
	var _message = i18n.getI18NMessage('svy.fr.dlg.remove_data')
	var _answer = globals.DIALOGS.showQuestionDialog(_title, _message);
	if(_answer == true)
	{
		var _tables_clean = [ 'log',
							'nav_advanced_search',
							'nav_advanced_search_criteria',
	                      	'nav_bookmarks',
							'nav_foundset_filter',
							'nav_foundset_filter_parameters',
							'nav_help',
							'nav_menu',
							'nav_menu_items',
							'nav_menu_items_context_menu',
							'nav_navigation_keys',
							'nav_popmenu',
							'nav_program',
							'nav_program_fields',
							'nav_programtabs',
							'nav_programtabs_autofill',
							'nav_shortcut',
							'nav_user_table_view',
							'nav_user_required_field',
							'search_criteria',
							'sec_element',
							'sec_group',
							'sec_module',
							'sec_owner',
							'sec_owner_in_module',
							'sec_security_key',
							'sec_table',
							'sec_table_filter',
							'sec_user',
							'sec_user_in_group',
							'sec_user_password',
							'sec_user_right',
							'sec_user_table_properties']
		
		//empty all the tables
		var _fs
		for (var i = 0; i < _tables_clean.length; i++) {
			_fs = databaseManager.getFoundSet(globals.nav_db_framework,_tables_clean[i])
			if(_fs)
			{
				_fs.loadAllRecords()
				_fs.deleteAllRecords()
			}
		}
									
		
		// create new owner
		/** @type {JSFoundset<db:/svy_framework/sec_owner>} */
		var _fs_owner = databaseManager.getFoundSet(globals.nav_db_framework,'sec_owner')	
		_fs_owner.newRecord()
		_fs_owner.license_amount = 5
		_fs_owner.name = 'Servoy'
		_fs_owner.password_renew = 90
		
		//create organization
		_fs_owner.sec_owner_to_sec_organization.newRecord()
		_fs_owner.sec_owner_to_sec_organization.name = 'Servoy NL'
		
		// create new user
		/** @type {JSFoundset<db:/svy_framework/sec_user>} */
		var _fs_user = databaseManager.getFoundSet(globals.nav_db_framework,'sec_user')
		_fs_user.newRecord()
		_fs_user.user_name = 'superuser'
		_fs_user.user_active = 1 
		_fs_user.owner_id = _fs_owner.owner_id
		_fs_user.flag_system_administrator = 1
		_fs_user.flag_super_administrator = 1
		_fs_user.description = 'Default super user of the framework'
		
		//create user org record
		_fs_user.sec_user_to_sec_user_org.newRecord()
		_fs_user.sec_user_to_sec_user_org.organization_id = _fs_owner.sec_owner_to_sec_organization.organization_id
		
		// create new password
		/** @type {JSFoundset<db:/svy_framework/sec_user_password>} */
		var _fs_password = databaseManager.getFoundSet(globals.nav_db_framework,'sec_user_password')	
		_fs_password.newRecord()
		_fs_password.start_date = new Date()
		_fs_password.end_date = new Date().setFullYear(new Date().getFullYear()+1)
		_fs_password.password_value = utils.stringMD5HashBase64('superuser')
		_fs_password.user_id = _fs_user.user_id
					
	}
	databaseManager.saveData()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"42A5B848-6AE4-4B1C-A4A1-57B472403831"}
 */
function removeProperties(event) {
	var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
	var _no = i18n.getI18NMessage('svy.fr.lbl.no')
	var _answer = globals.svy_mod_dialogs_global_showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), i18n.getI18NMessage('svy.fr.dlg.deletes'), _ok, _no);
	if(_answer == _ok)
	{
		controller.deleteAllRecords();
	}
}

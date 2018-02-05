/**
 *	Delete record
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"b3586b62-63df-4a95-bb7d-25a66badfc44"}
 */
function deleteRecord() {
	var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
	var _no = i18n.getI18NMessage('svy.fr.lbl.no')
	var _answer = globals.svy_mod_dialogs_global_showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), i18n.getI18NMessage('svy.fr.dlg.delete'), _ok, _no);
	if (_answer == _ok) {
		controller.deleteRecord()
	}

}

/**
 *	Empty the filter
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"7987e0e6-4bf8-40a5-8d70-ae52bd03dfcd"}
 */
function emptyFilter() {
	nav_foundset_filter_id = null
	databaseManager.saveData()
}

/**
 *	Check if baseForm is entered
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"d1cbc1e8-0c92-493e-9fd3-427b02bb7eac"}
 */
function formCheck() {
	if (!base_form_name) {

		elements.base_form_name.requestFocus()
		application.sleep(250)
		globals.DIALOGS.showWarningDialog('', 'You have to enter the baseformname first',i18n.getI18NMessage('svy.fr.lbl.ok'));
	}
}

/**
 *	Show i18n dialog for the description
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"45002e68-101c-47b4-8a39-b4c713a525a4"}
 */
function getI18nLabel() {
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		globals.svy_mod_dialogs_global_showInfoDialog('i18n:svy.fr.lbl.I18n_key_selector', i18n.getI18NMessage('svy.fr.dlg.I18n_key_selector'), 'i18n:svy.fr.lbl.ok')
		return
	}
	description = application.showI18NDialog()
}

/**
 *	New record
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"6d6b0afc-5ccd-4661-acff-39066ceceeb3"}
 */
function newRecord() {

	tabSwitch(null, 1);

	controller.newRecord();

	//Auto fill base form name with first value of vl to make sure it is always filled.
	var _firstval = "";
	var _vl = application.getValueListItems("nav_base_form_name");
	if (_vl.getMaxRowIndex() > 0) {
		_firstval = _vl.getValue(1, 1);
	}
	base_form_name = _firstval;

	//Auto fill description
	description = i18n.getI18NMessage('svy.fr.lbl.description');

	databaseManager.saveData(foundset.getRecord(foundset.getSelectedIndex()));

}

/**
 *	OndataChange baseformname
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"e658b565-4bd6-4109-a835-0ab38005dc92"}
 */
function onDataChangeBaseFormName() {
	//no forms are used
	if (base_form_name == '-no form-') {
		//get the table and server that the user wants to use
		forms.svy_nav_c_program_dtl_server_table.controller.loadRecords(foundset)
		startup_view = 2
		globals.svy_mod_showFormInDialog(forms.svy_nav_c_program_dtl_server_table)
		
	}
	form_object = null
	forms.svy_nav_c_template_form.onRecordSelection();
	//databaseManager.saveData()
	setTableServer()

}

/**
 *	on Load, set the valuelist of the nav_base_form_name
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"dc41f0e7-4c4e-4129-87d6-6d60050369f9"}
 */
function onLoad() {
	/** @type {Array<String>}*/
	var _forms = solutionModel.getForms().map(function (jsForm) { return jsForm.name });//forms.allnames.sort()
	var _baseNames = new Object()
	var _baseName
	for (var i = 0; i < _forms.length; i++) {
		// if a form end with _dtl or _tbl it can be used in the framework
		if (utils.stringPatternCount(_forms[i], '_dtl') > 0 || utils.stringPatternCount(_forms[i], '_tbl') > 0) {

			if ( (utils.stringPatternCount(_forms[i], '_dtl') > 0)) {
				_baseName = utils.stringReplace(_forms[i], '_dtl', '')
			} else {
				_baseName = utils.stringReplace(_forms[i], '_tbl', '')
			}
			_baseNames[_baseName] = _baseName
		}

	}
	// make a array of the object
	_baseNames = globals.svy_utl_objectArray2JSArray(_baseNames).sort();

	//set the first value to -no form-
	var _noForm = '-no form-'
	_baseNames.unshift(_noForm)

	//set the valuelist
	application.setValueListItems('nav_base_form_name', _baseNames)

	globals.nav_properties = 'form_types'
	var _form_types_save_values = new Array()
	for (var j = 0; j < _to_nav_properties$property_name.property_value.length; j++) {
		_form_types_save_values[j] = j
	}
	application.setValueListItems('nav_form_types', _to_nav_properties$property_name.property_value, _form_types_save_values)

	globals.nav_properties = 'template_names'
	var _template_types_save_values = new Array()
	for (j = 0; j < _to_nav_properties$property_name.property_value.length; j++) {
		_template_types_save_values[j] = j
	}
	application.setValueListItems('nav_template_types', _to_nav_properties$property_name.property_value, _template_types_save_values)

	application.setValueListItems('nav_forms', _forms)
}

/**
 *	 On record selection, set information right for this record
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"521b18fc-eb55-4851-8eda-11bd0a83c4ab"}
 */
function onRecordSelection() {

	// set colors of the buttons
	forms.svy_nav_c_buttons_dtl.setButtonBg();

	var _globals = solutionModel.getRelation(null)// globals.allrelations.sort()
	var _empty = ['']

	var _forms, _relations, _fields
	if (form_name && forms[form_name]) {
		// set relations valuelist
		if(forms[form_name].foundset.allrelations)
		{
			_forms = forms[form_name].foundset.allrelations.sort()
			_relations = _empty.concat(_forms.concat(_globals))
			application.setValueListItems('nav_relations', _relations)
		}
		// set fields valuelist
		if(forms[form_name].foundset.alldataproviders)
		{
			_fields = forms[form_name].foundset.alldataproviders.sort()
			application.setValueListItems('nav_fields', _fields)
		}
	} else if (server_name && table_name && base_form_name == '-no form-') {

		var jsTable = databaseManager.getTable(server_name, table_name)

			// set relations valuelist
		_forms = solutionModel.getRelations(server_name, table_name).sort();
		_relations = _empty.concat(_forms.concat(_globals))
		application.setValueListItems('nav_relations', _relations)

		// set fields valuelist
		_fields = jsTable.getColumnNames().sort()
		application.setValueListItems('nav_fields', _fields)
	} else // do not now form or table, valuelists should be empty
	{
		application.setValueListItems('nav_relations', _empty)
		application.setValueListItems('nav_fields', _empty)
	}

	// show i18n field or normal description
	set_i18n_field();
}

/**
 *	 Calls globals.svy_nav_init()
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"8fe850a9-77ed-4b85-b8f4-f3b80249a1e6"}
 */
function reloadMenu() {
	globals.svy_nav_init();
}

/**
 *	 Opens a form to select a foundset filter
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"0c9b088d-1f44-4f5e-ba00-ed7e97f5a0c6"}
 */
function selectFoundsetFilter() {
	forms.svy_nav_c_foundset_filter_dtl.mode = 'edit'
	forms.svy_nav_c_foundset_filter_parameters_tbl.mode = 'edit'
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_foundset_filter_dtl,null,null,null,null,null,true,false,'Foundset filter')
}

/**
 *	 Show i18n field or normal description
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"6c5ecaeb-a2fb-4674-aa5e-1d2d301b3906"}
 */
function set_i18n_field() {

	if (flag_i18n) {
		elements.Description_i18n.visible = true
		elements.Description.visible = false
		elements.btn_i18n.visible = true
	} else {
		elements.Description_i18n.visible = false
		elements.Description.visible = true
		elements.btn_i18n.visible = false
	}
}

/**
 *	 Determine server and table name with the formname
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"5de14032-7bf0-4265-9926-fbffae4e6a78"}
 */
function setTableServer() {
	
	if (base_form_name && base_form_name != '-no form-') {
		for (var i = 0; i < form_object.length; i++) {
			if (form_object[i][3] && forms[form_object[i][2]]) { // 3-available 2-formname
				form_name = form_object[i][2]
				table_name = databaseManager.getDataSourceTableName(forms[form_object[i][2]].controller.getDataSource())
				server_name = databaseManager.getDataSourceServerName(forms[form_object[i][2]].controller.getDataSource())
				databaseManager.saveData()
			}
		}
	}
	onRecordSelection()
}

/**
 *	 Opens a form where the user can enter the sort values
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"3bbd7225-6b54-4445-9165-b7aeed945aaf"}
 */
function showSortValues() {
	if (!base_form_name) {

		globals.DIALOGS.showWarningDialog('', 'You have to enter the baseformname first',i18n.getI18NMessage('svy.fr.lbl.ok'));
		elements.base_form_name.requestFocus()
		return

	}
	forms.svy_nav_c_sortvalue.mode = 'edit'
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_sortvalue,null,null,null,null,null,true,false,'sort_value')
}

/**
 *	 Warning, don't change programname
 *
 * @author Sanneke Aleman/ Erik kramer
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"e2167d1e-ca0a-45a0-879f-fdc4979d489a"}
 */
function warningProgram() {
	if (program_name) {
		//show warning, changing program name can have consequences
		globals.DIALOGS.showWarningDialog('i18n:svy.fr.lbl.warning', 'i18n:svy.fr.dlg.warning_programname',i18n.getI18NMessage('svy.fr.lbl.ok'));
		elements.program_name.requestFocus(false)
	}
}

/**
 *	Tab switch
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @param {JSEvent} [_event]
 * @param {Number} [_arg] number of the tab you want to navigate to
 * @return  none
 *
 * @properties={typeid:24,uuid:"E8E36906-8AA0-4033-8A95-5F61371D40A3"}
 */
function tabSwitch(_event, _arg) {
	var _tab
	if (_arg == undefined) {
		_tab = _event.getElementName().replace(/[^0-9]/g, "")
	} else {
		_tab = _arg
	}

	//deactivated tabs
	for (var i = 0; i < 6; i++) {
		elements['tab_left_' + (i + 1)].setImageURL('media:///tab_grey_left.png')
		elements['tab_right_' + (i + 1)].setImageURL('media:///tab_grey_right.png')
		elements['tab_' + (i + 1)].setImageURL('media:///tab_grey_btw.png')
		elements['lbl_' + (i + 1)].setFont('Verdana,0,10');
		elements['lbl_' + (i + 1)].fgcolor = '#000000'
	}

	//activated
	elements['tab_left_' + _tab].setImageURL('media:///tab_blue_left.png')
	elements['tab_right_' + _tab].setImageURL('media:///tab_blue_right.png')
	elements['tab_' + _tab].setImageURL('media:///tab_blue_btw.png')
	elements['lbl_' + _tab].setFont('Verdana,1,10');
	elements['lbl_' + _tab].fgcolor = '#ffffff'

	elements.metadata_program_tab.tabIndex = _tab
}

/**
 *
 * @param _event
 *
 * @properties={typeid:24,uuid:"322494E5-DC84-42F6-AE96-3821D071F8CB"}
 */
function dc_new(_event) {
	tabSwitch(null, 1);
	_super.dc_new(_event)
}

/**
 *
 * @param _event
 *
 * @properties={typeid:24,uuid:"78ACA16F-095D-48B3-85DB-64A30F21F863"}
 */
function dc_duplicate(_event) {
	var _rec_from = foundset.getRecord(controller.getSelectedIndex())
	controller.duplicateRecord()
	var _rec_to = foundset.getRecord(controller.getSelectedIndex())
	_rec_to.program_name = plugins.dialogs.showInputDialog('New program', 'Name new program:', _rec_from.program_name + '_copy')

	for (var i = 1; i <= _rec_from.nav_program_to_nav_popmenu.getSize(); i++) {
		_rec_from.nav_program_to_nav_popmenu.setSelectedIndex(i)
		_rec_from.nav_program_to_nav_popmenu.duplicateRecord(i)
		_rec_from.nav_program_to_nav_popmenu.program_name = _rec_to.program_name
		databaseManager.saveData()

	}

	for (var k = 1; k <= _rec_from.nav_program_to_nav_programtabs.getSize(); k++) {
		_rec_from.nav_program_to_nav_programtabs.setSelectedIndex(k)
		_rec_from.nav_program_to_nav_programtabs.duplicateRecord(k)
		_rec_from.nav_program_to_nav_programtabs.program_name = _rec_to.program_name
		databaseManager.saveData()

	}

	// security keys
	for (var j = 1; j <= _rec_from.nav_program_to_nav_navigation_keys.getSize(); j++) {

		_rec_from.nav_program_to_nav_navigation_keys.setSelectedIndex(j)
		_rec_from.nav_program_to_nav_navigation_keys.duplicateRecord(j)
		_rec_from.nav_program_to_nav_navigation_keys.program_name = _rec_to.program_name
		databaseManager.saveData()
	}
}

/** *
 * @param _event
 * @param _all
 *
 * @properties={typeid:24,uuid:"1C2DD0EA-8156-45DF-8BBA-0F1FC76BC56C"}
 */
function dc_save(_event, _all) {

	var _ok;
	if (!program_name || !base_form_name) {
		var _message = i18n.getI18NMessage('svy.fr.dlg.mandatory_fields')
		var _title = i18n.getI18NMessage('svy.fr.lbl.mandatory_fields')
		if (!program_name) {
			_message += '\n' + i18n.getI18NMessage('svy.fr.lbl.program_name')
		}
		if (!base_form_name) {
			_message += '\n' + i18n.getI18NMessage('svy.fr.lbl.base_form_name')
		}		
		_ok = i18n.getI18NMessage('svy.fr.lbl.ok')
		globals.DIALOGS.showWarningDialog(_title, _message, _ok)
		
		
		
		return
	}
	if(/\-no form\-_(dtl|tbl)/.test(forms.svy_nav_c_template_form.form_object[0][2]) || /\-no form\-_(dtl|tbl)/.test(forms.svy_nav_c_template_form.form_object[1][2]) )
	{
		tabSwitch(_event, 2)
		_ok = i18n.getI18NMessage('svy.fr.lbl.ok')
		globals.DIALOGS.showWarningDialog( i18n.getI18NMessage('svy.fr.lbl.excuse_me'),  i18n.getI18NMessage('svy.fr.dlg.notAloud_noForm'), _ok)
		
		return
	}
	_super.dc_save(_event, _all)
}

/**
 * @properties={typeid:24,uuid:"96FD2716-F0F4-42F0-8C2A-DB124B8D958B"}
 */
function gotoBrowse() {
	_super.gotoBrowse.apply(this, arguments)
	elements.btn_sortvalue.enabled = false
	elements.btn_foundsetFilter.enabled = false
	elements.btn_emptyFoundsetFilter.enabled = false
	forms.svy_nav_c_buttons_dtl.gotoBrowse()
	forms.svy_nav_c_template_form.gotoBrowse()
	forms.svy_nav_c_programfields_tbl.gotoBrowse()
	forms.svy_nav_c_help_dtl.gotoBrowse()

	forms.svy_nav_c_buttons_dtl.mode = 'browse'
	forms.svy_nav_c_template_form.mode = 'browse'
	forms.svy_nav_c_programfields_tbl.mode = 'browse'
	forms.svy_nav_c_help_dtl.mode = 'browse'
		
	forms.svy_nav_c_program_tbl.controller.readOnly = false
}

/**
 * @properties={typeid:24,uuid:"625F0323-D34F-4785-991A-9A1EA8FBE95F"}
 */
function gotoEdit() {
	_super.gotoEdit.apply(this, arguments)
	elements.btn_sortvalue.enabled = true
	elements.btn_foundsetFilter.enabled = true
	elements.btn_emptyFoundsetFilter.enabled = true
	forms.svy_nav_c_buttons_dtl.mode = 'edit'
	forms.svy_nav_c_buttons_dtl.gotoEdit()
	forms.svy_nav_c_template_form.mode = 'edit'
	forms.svy_nav_c_template_form.gotoEdit()
	forms.svy_nav_c_programfields_tbl.mode = 'edit'
	forms.svy_nav_c_programfields_tbl.gotoEdit()
	forms.svy_nav_c_help_dtl.mode = 'edit'
	forms.svy_nav_c_help_dtl.gotoEdit()

}

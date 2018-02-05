/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"59012888-749A-4C1B-9E25-A1B1851E215D"}
 */
var nav_version = '6.0.1.86';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"1500F984-F06A-439C-9E56-7485FA749E71",variableType:-4}
 */
var svy_nav_multi_tab_programs = null;

/**
 * MAVariazione : è il parametro che tiene traccia della ditta 'bloccata' sulla quale 
 * svolgere le operazioni senza ogni volta passare dalla selezione
 * 
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9EDC2CE7-E5AC-4518-A323-95FF3F18B4C4",variableType:4}
 */
var _filtroSuDitta = null

/**
 * MAVariazione : è il parametro che distingue se si è in edit mode nella parte 'viewer'
 * per poter utilizzare un'unica toolbar
 * 
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"3B67C395-92E2-4479-9426-2441584D6BE5",variableType:-4}
 */
var _editOnViewer = false

/**
 * MAVariazione : è il nome della particolare form sulla quale si è in edit
 * 
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"798A902E-2E24-4C8D-9C5A-4E95D240249D"}
 */
var _forcedFormOnViewer = null

/**
 * MAVariazione : l'oggetto che tiene traccia dei parametri per i tab di giornaliera aperti
 * 
 * @properties={typeid:35,uuid:"CA2A6692-74E8-483B-A655-9B57E963FCA0",variableType:-4}
 */
var objGiornParams = {};

/**
 *	Opens the configurator screen in a dialog, if you are administrator
 *
 * @author Sanneke Aleman
 * @since 2007-11-04
 *
 * @properties={showInMenu:true,typeid:24,uuid:"edeba2e0-4e6d-4654-8a7f-ba43c5acb034"}
 */
function _1_svy_nav_openNavigationForm() {
	if (_to_sec_user$user_id.flag_system_administrator) {
		var _modal = false
		if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) //non modal dialogs will not always open in WC
		{
			_modal = true
			
			
		}
		globals.svy_mod_showFormInDialog(forms.svy_nav_c_main, -1, -1, -1, -1, null, true, false, 'Configurator', _modal)
	}
}

/**
 *	 Navigates to the main screen
 *
 * @author Sanneke Aleman
 * @since 2007-11-04
 *
 * @properties={showInMenu:true,typeid:24,uuid:"aa42be89-94d5-40cc-9c12-5fa12f64cd35"}
 */
function _2_svy_nav_openMain() {
	forms.svy_nav_fr_main.controller.show()
}

/**
 *	Opens a shortcut dialog, so users can use shortcuts to go to a program
 *
 * @author Sanneke Aleman
 * @since 2007-11-04
 *
 * @properties={showInMenu:true,typeid:24,uuid:"5d8d96db-9a9b-43f1-92f6-a0ad8441f8d4"}
 */
function _3_svy_nav_openShortcutDialog() {
	globals.svy_mod_showFormInDialog(forms.svy_nav_fr_shortcut_dialog)
}

/**
 *	Navigate back from a related record
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 *
 * @properties={typeid:24,uuid:"0b3dcd97-2049-41ba-aea8-30b4053e8cb8"}
 */
function svy_nav_backFormRelated(_event) {
	if (globals.nav.mode != 'browse') return
	if (globals.nav.related_text && globals.nav.stack_position > 0) {
		var _cur_related = globals.nav.stack[globals.nav.stack_position].foundset_related_text
		for (var j = globals.nav.stack_position - 1; j >= 0; j--) {
			if (_cur_related != globals.nav.stack[j].foundset_related_text) {
				globals.svy_nav_history_move(_event, j)
				break
			}
		}
	}
}

/**
 *	 To create a bookmark
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 *
 * @properties={typeid:24,uuid:"96e2b1d9-235e-4930-9dc6-99154505cfbd"}
 */
function svy_nav_bookmarkCreate() {
	// if user has 7 BOOKMARKS, maximum will give a warning and return
	if (databaseManager.hasRecords(_to_nav_bookmarks$user_id$organization_id) && _to_nav_bookmarks$user_id$organization_id.getSize() == 7) {
		globals.svy_mod_dialogs_global_showWarningDialog('', i18n.getI18NMessage('svy.fr.lbl.maximum_bookmarks'), i18n.getI18NMessage('svy.fr.lbl.ok'));
		return
	}

	//Returns an array containing the names of the identifier (PK) column(s)
	var jsTable = databaseManager.getTable(globals.nav.program[globals.nav_program_name].server_name, globals.nav.program[globals.nav_program_name].table_name)

		// save the recordids
	var _record_names = jsTable.getRowIdentifierColumnNames()
	var _record_ids = new Array() //saving array directly to database field doesn't work
	var _record_types = new Array()
	for (var i = 0; i < _record_names.length; i++) {
		// get the record id values
		_record_ids[i] = forms[globals.nav.form_view_01][_record_names[i]]

		// get the column types
		var _jsColumn = jsTable.getColumn(_record_names[i])
		_record_types[i] = _jsColumn.getTypeAsString()

	}

	//check if bookmark is unique
	for (var j = 1; j <= _to_nav_bookmarks$user_id$organization_id.getSize(); j++) {
		/** @type {Array}*/
		var _dbRecord_ids = _to_nav_bookmarks$user_id$organization_id.record_ids
		/** @type {Array}*/
		var _dbRecord_names = _to_nav_bookmarks$user_id$organization_id.record_ids_names
		if (globals.svy_utl_compareArrays(_dbRecord_ids, _record_ids) && globals.svy_utl_compareArrays(_dbRecord_names, _record_names)) {
			return //bookmark already excist
		}
	}
	
	

	// ceate the bookmark record
	_to_nav_bookmarks$user_id$organization_id.newRecord()

	// save the recordids_names
	_to_nav_bookmarks$user_id$organization_id.record_ids_names = _record_names

	//save the record ids
	_to_nav_bookmarks$user_id$organization_id.record_ids = _record_ids

	//save the column types
	_to_nav_bookmarks$user_id$organization_id.record_ids_types = _record_types

	//save the program
	_to_nav_bookmarks$user_id$organization_id.program = globals.nav_program_name

	//save the view
	_to_nav_bookmarks$user_id$organization_id.program_view = globals.nav.program[globals.nav_program_name].view

	//set the right sort order
	var maxReturnedRows = 1;
	var query = 'SELECT MAX(sort_order) FROM nav_bookmarks WHERE user_id = ? AND organization_id = ?';
	var args = new Array();
	args[0] = globals.svy_sec_lgn_user_id;
	args[1] = globals.svy_sec_lgn_organization_id;
	var dataset = databaseManager.getDataSetByQuery(databaseManager.getDataSourceServerName(forms.svy_nav_fr_bookmarks.controller.getDataSource()), query, args, maxReturnedRows);
	if (dataset.getValue(1, 1)) {
		_to_nav_bookmarks$user_id$organization_id.sort_order = dataset.getValue(1, 1) + 1
	} else {
		_to_nav_bookmarks$user_id$organization_id.sort_order = 1
	}
	
	//var _save = 
	databaseManager.saveData(_to_nav_bookmarks$user_id$organization_id.getRecord(1))

	// load the bookmarks to see the new bookmark
	forms.svy_nav_fr_bookmarks.loadBookmarks();
	// show the tab with the bookmarks
	forms.svy_nav_fr_bottom_bkmk_short.onClickBookmark();
}

/**
 *	To delete a bookmark
 * @param {JSEvent} _event
 * @author Sanneke Aleman
 * @since 2008-11-24
 *
 * @properties={typeid:24,uuid:"43d7406f-e55a-4b27-bc0a-f366fdca87e3"}
 * @AllowToRunInFind
 */
function svy_nav_bookmarkDelete(_event) {
	var _button = _event.getElementName();
	// delete the record, if record exist
	if (forms.svy_nav_fr_bookmarks.foundset.find()) {
		forms.svy_nav_fr_bookmarks.bookmark_id = globals.nav.bookmarks[_button.replace(/[^0-9]/g, "")].bookmark_id
		forms.svy_nav_fr_bookmarks.foundset.search()
		forms.svy_nav_fr_bookmarks.foundset.deleteRecord()
		forms.svy_nav_fr_bookmarks.loadBookmarks();
	}

}

/**
 *	To go to the program and record of a bookmark
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 *
 * @param {JSEvent} [_event] that triggered the action
 * @param {String} _program
 * @param {Number}	_pk
 * @param {Number} _view
 * @return  none
 *
 * @properties={typeid:24,uuid:"54af5404-cb70-4519-b7cf-837f8b6c12e0"}
 */
function svy_nav_bookmarkGoto(_event, _program, _pk, _view) {
	if (globals.nav.mode != 'browse') return
	globals.nav.program[_program].view = _view
	var _template = globals.nav.template_types[_view]
	var _form = globals.nav.program[_program].form[forms[_template].has1()][2]

		// show the form
	globals.svy_nav_showForm(_form, _program);
	// navigate to the right record

	var succes = forms[_form].foundset.selectRecord(_pk)

	if (succes == false)// record is not in the first 200 records
	{
		forms[_form].foundset.getRecord(databaseManager.getFoundSetCount(forms[_form].foundset))
		succes = forms[_form].foundset.selectRecord(_pk)
	}
}

/**
 *	Create's  a tab for a program so the framework can show related data easily
 *
 * @author Sanneke Aleman
 * @since 2008-11-04
 * @param {String} _program_name
 * @param {String} _server
 * @param {String} _table
 * @param {Number} _heigt_spliter
 *
 * @return  none
 *
 * @properties={typeid:24,uuid:"672fc79c-eb9c-426b-9483-c538f0963f1d"}
 */
function svy_nav_create_tab(_program_name, _server, _table, _heigt_spliter) {
	if (!_server || !_table) return
	if (_program_name == undefined) return
	var _tab_form = _program_name + '_tab'
	var _width = 50
	var _height = 50

	if (!forms[_tab_form]) {
		var jsForm = solutionModel.newForm(_tab_form, _server, _table, 'main_style', false, _width, _height)
		jsForm.newTabPanel('tabs', 0, 0, _width, _height)
		jsForm.navigator = SM_DEFAULTS.NONE
		jsForm.styleName = 'sampleuse_navigation'
		jsForm.scrollbars = SM_SCROLLBAR.HORIZONTAL_SCROLLBAR_NEVER + SM_SCROLLBAR.VERTICAL_SCROLLBAR_NEVER
		var jsTab = jsForm.getTabPanel('tabs')
		jsTab.anchors = 15
		jsTab.tabOrientation = SM_ALIGNMENT.TOP
		jsTab.transparent = true
	}
}

/**
 *	Get info about the form where the users performs an action
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} _event
 * @param {String}	[_form_trigger] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @return {Array} information _form, _form_to,_program,_base,_form_trigger
 * @properties={typeid:24,uuid:"a88da286-ffef-46a7-9519-c05726728196"}
 */
function svy_nav_dc_getInfo(_event, _form_trigger) {
	
	if (!_form_trigger) {
		_form_trigger = _event.getFormName();
		if (_form_trigger == 'svy_nav_fr_main') {
			_form_trigger = globals.nav.browser_buttonbar
		}
	}

	// MAVariazione: if available, use the main form's name instead of the current form's one
	if(_event && _event.getFormName())
	{
		var _eventForm = null
		var _formContext = forms[_event.getFormName()].controller.getFormContext()
		
		if(_formContext.getMaxRowIndex() > 1 && _formContext.getValue(5,2))
		{
			_eventForm = _formContext.getValue(5,2)				
		}
		else
		{		
			_eventForm = _event.getFormName()
		}
		
		if(_eventForm == globals.nav.form_view_01)
		{
			globals.nav.activeView = 1
		}
		else if(_eventForm == globals.nav.form_view_02)
		{
			globals.nav.activeView = 2
		}
		//daniele: use bottom form if not specified
		else
		{
			globals.nav.activeView = 2
		}
	}
	
	if (_form_trigger != globals.nav.browser_buttonbar && _form_trigger != globals.nav.viewer_buttonbar) {
		if (globals.nav.activeView == 1) {
			_form_trigger = globals.nav.browser_buttonbar
		} else {
			_form_trigger = globals.nav.viewer_buttonbar
		}
	}
	var _form
	var _form_to
	var _base
	var _program
		// on the top form
	if (_form_trigger == globals.nav.browser_buttonbar) {
		_form = globals.nav.form_view_01
		_base = globals.nav.program[globals.nav_program_name].base_form_name
		_program = globals.nav_program_name
	} else if (_form_trigger == globals.nav.viewer_buttonbar) // on the bottom form
	{
		var _tab_form = globals.nav_program_name + '_tab'
		_form = forms[_tab_form].elements['tabs'].getTabFormNameAt(forms[_tab_form].elements['tabs'].tabIndex)
		
		// MAVariazione - if no tab is present, just do nothing
		if(forms[_tab_form].elements.tabs.tabIndex != -1)
		{
			_base = globals.nav.program[globals.nav_program_name].tab[forms[_tab_form].elements.tabs.tabIndex].base_form_name
			_program = globals.nav.program[globals.nav_program_name].tab[forms[_tab_form].elements.tabs.tabIndex].program_name
		}
	}

	var _args = new Array()
	_args[0] = _form
	_args[1] = _form_to
	_args[2] = _program
	_args[3] = _base
	_args[4] = _form_trigger
	return _args
}

/**
 *	Sets the status of a form, different status are find/browse/edit/add
 *	This method is used by a lot of methods like svy_nav_dc_new, svy_nav_dc_save ect.
 *
 * @author Sanneke Aleman
 * @since 2007-07-03
 * @param {String} 	_status can be  [find/browse/edit/add]
 * @param {String}	_form name of the form
 * @param {Boolean} [_currFormOnly] changing only the status of the current form
 * @param {String} [_program] name of the program if you want to override it  
 *
 * @return  none
 *
 * @properties={typeid:24,uuid:"b289aa40-0bfb-4e5f-9e24-59f2090e2601"}
 */
function svy_nav_dc_setStatus(_status, _form, _currFormOnly, _program) {
	if (!_form) return;
	
	globals.nav.mode = _status

	// set _browse and fieldcoloring
	var _browse
	// daniele: allow to override the program to use
	_program = _program ? _program : globals.nav_program_name
	
	/** @type {{required_fields:Object,noreadonly:Number,program_name:String,tab:Array}} */
	var _progObj = globals.nav.program[_program]
	if (_status == 'edit' || _status == 'add' || _status == 'find') {
		forms[_form].controller.readOnly = false
		_browse = false

		if (!globals.nav.related_text) //navigation is navigating to a related form, focus is set in onShow
		{
			forms[_form].controller.focusFirstField()
		} else {
			globals.nav[_form + 'focusFirstField'] = true
		}

	} 
	else if(_status == 'required_fields' && _progObj) // MAVariazione - a program must also be present to use required fields
	{
		_browse = false
//		globals.svy_nav_setRequiredFields(_progObj,_form, 'required_fields')
	}
	else
	{
		// MAVariazione - a program must also be present
		forms[_form].controller.readOnly = !!(_progObj && !_progObj.noreadonly)
//		globals.svy_nav_setFieldsColor(_form, 'browse')
		// MAVariazione - a program must also be present to use required fields
//		if(_progObj)
//			globals.svy_nav_setRequiredFields(_progObj,_form, 'browse')
		_browse = true
	}


	//MAVariazione if _currFormOnly don't update the other forms
	if (!_currFormOnly) {
		// set buttons enabled and disabled top form
		globals.svy_nav_setBrowserbar(_status, _form)
	
		// set buttons enabled and disabled bottom form
		if (_progObj.tab.length > 0) {
			globals.svy_nav_setViewerBar(_status, _form)
		}
	
		/** @type {Array} */
		var _tabs  = _progObj.tab
		
		
		// set tabs enabled/disabled so user can not get to other tab if in edit
		if ( (_tabs.length > 1)) {
			for (var i = 1; i < _tabs.length; i++) {
				var _tab_form = globals.nav_program_name + '_tab'
				if (forms[_tab_form]) {
					if (forms[_tab_form].elements['tabs'].tabIndex == i || _browse) {
						// MAVariazione - skip tabs if already enabled
						if(!forms[_tab_form].elements['tabs'].isTabEnabledAt(i))
							forms[_tab_form].elements['tabs'].setTabEnabledAt(i, true)
					} else {
						forms[_tab_form].elements['tabs'].setTabEnabledAt(i, false)
					}
				}
			}
		}
	
		//set history buttons enbaled/disabled
		globals.svy_nav_setNavigationBar(_status)
		
		// MAVariazione - disable top form if not in find/browse and not the current form
		if(_form !== globals.nav.form_view_01 && _status !== 'browse' && _status !== 'find')
			forms[globals.nav.form_view_01].controller.enabled = false;
		else
			forms[globals.nav.form_view_01].controller.enabled = true;
	}
	
//	if (_browse != false) {
//		forms.svy_nav_base.onRecordSelection(null, _form);
//	}
	
	if (_status != 'find') {
		globals.svy_nav_setFieldsColor(_form, _status);
		if(_progObj)
			globals.svy_nav_setRequiredFields(_progObj,_form, _status)
	}
	
	if(_status == 'browse')
	{
		if (forms[_form].gotoBrowse) {
			forms[_form].gotoBrowse()
		}
			
	}else if(_status == 'edit' || _status == 'add' ) 
	{
		if (forms[_form].gotoEdit) {
			forms[_form].gotoEdit()
		}
	}
}

/**
 *	Set all buttons disabled
 *
 * @author Sanneke Aleman
 * @since 2007-07-03
 *
 * @properties={typeid:24,uuid:"4a898c45-aa3b-4f5e-91b6-3ea37b1fe900"}
 */
function svy_nav_disable_form_funtions() {
	forms.svy_nav_fr_buttonbar_browser.elements.btn_next.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_prev.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_first.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_last.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_cancel.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_save.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_delete.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_duplicate.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_edit.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_new.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_print.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_loadAllRecords.enabled = false
	forms.svy_nav_fr_buttonbar_browser.elements.btn_methods.enabled = false
	
	var _templateImages = globals.svy_nav_getProperty('template_images')
	for (var i = 0; i < _templateImages.length; i++) {
		forms.svy_nav_fr_buttonbar_browser.elements['btn_template'+i].enabled = false
	}
}

/**
 *	Return the path of a menu, used to select the right menu in the tree.
 *
 * @author Sanneke Aleman
 * @since 2007-07-03
 * @param {JSRecord<db:/svy_framework/nav_menu_items>} _rec record of the nav_menu table
 * @return {Array} path of the menu

 * @properties={typeid:24,uuid:"08068150-c45e-4e1f-9bf4-c5435c685f5c"}
 */
function svy_nav_getMenuPath(_rec) {
	if (!_rec.parent_id) {
		return [_rec.menu_item_id];
	} else {
		/** @type {JSRecord<db:/svy_framework/nav_menu_items>} */
		var _childRec = _rec.nav_menu_items_to_nav_menu_items$child_to_parent.getRecord(1)
		return globals.svy_nav_getMenuPath(_childRec).concat([_rec.menu_item_id]);
	}
}

/**
 * @properties={typeid:24,uuid:"5b8e5403-1c9e-45a8-b911-243c40ab144f"}
 */
function svy_nav_getOwner_id() {

	return globals.owner_id

}

/**
 *	Queries the programs where the logged in user had rights for.
 *
 * @author Sanneke Aleman
 * @since 2007-07-03
 * @return {JSDataSet} dataset with the programs and buttons
 *
 * @properties={typeid:24,uuid:"836ce0ff-e4c3-4016-821f-55d1108bb5e2"}
 */
function svy_nav_getPrograms() {
	var _query
	var i
	var _dataset
	var maxReturnedRows = 10000
	
	// array of all the buttons with security rights
	var _array_buttons = ['btn_new', 'btn_edit', 'btn_duplicate', 'btn_delete', 'btn_method', 'btn_print', 'btn_sort', 'btn_rec_nav', 'btn_search', 'btn_search_prop', 'btn_all_records', 'btn_export', 'btn_resettblheader', 'btn_help', 'btn_record_information', 'btn_required_fields']
	if (_to_sec_user$user_id.flag_system_administrator) // administator doesn't have to have rights to the keys
	{
		_query = 'SELECT 	p.program_name, '
		for (i = 0; i < _array_buttons.length; i++) {
			_query += "	p." + _array_buttons[i]
			if (i != (_array_buttons.length - 1)) {
				_query += ","
			}
		}
		_query += " FROM nav_program p order by p.program_name"
	
	} else // get the rights for normal users
	{
		_query = '	SELECT 		p.program_name, '
		for (i = 0; i < _array_buttons.length; i++) {
			_query += "			(	SELECT 	pi." + _array_buttons[i] + "\
									FROM 	nav_program pi\
									WHERE 	(not exists (\
									      	                         	SELECT 	nk.program_name \
									      	                         	FROM	nav_navigation_keys nk \
									      	                         	WHERE	nk.code = '" + _array_buttons[i] + "' and \
									      	                         			nk.program_name  = p.program_name) \
															OR\
											p.program_name IN (\
																		SELECT	nk.program_name\
																		FROM	nav_navigation_keys nk\
																		WHERE	nk.code = '" + _array_buttons[i] + "' and \
																				nk.program_name  = p.program_name and \
																				nk.security_key_id IN (" + globals.nav.keys + "))) and \
											p.program_name = pi.program_name)"
			if (i != (_array_buttons.length - 1)) {
				_query += "	,"
			}
		}
		_query += "				FROM nav_program p \
								WHERE	p.program_name IN (( \
																		SELECT 	nk.program_name \
																		FROM	nav_navigation_keys nk \
																		WHERE	nk.code = 'program' and \
																				p.program_name = nk.program_name and\
																				nk.security_key_id IN (" + globals.nav.keys + "))) order by p.program_name"
	}
	
	_dataset = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, null, maxReturnedRows);
	return _dataset;
}

/**
 *	To step forward, backward or to a position in history, wil reset your form + foundset
 *
 * @author Sanneke Aleman
 * @since 2007-07-03
 * @param {JSEvent} _event
 * @param {Number} [_position] position you want to step to
 * @param {JSFoundset} [_foundset] For back after edit, to load the right foundset
 * @return  none
 *
 * @properties={typeid:24,uuid:"77f34d88-84cb-4009-966a-93cae60edfaa"}
 */
function svy_nav_history_move(_event, _position, _foundset) {
	var _button
	if (_event && _event.getElementName) {
		_button = _event.getElementName();
	}
	if (! (_position == undefined)) {
		globals.nav.stack_position = _position
	} else if (_button == 'btn_his_back' && (globals.nav.stack_position > 0)) {
		globals.nav.stack_position--;
	} else if (_button == 'btn_his_forw' && (globals.nav.stack.length > globals.nav.stack_position + 1)) {
		globals.nav.stack_position++;
	} else {
		return
	}

	globals.nav.noHistory = 1

	/** @type {{view:Number,
	 * 			form:String,
	 * 			sql:String,
	 * 			sql_parameters:Array,
	 * 			rowId:Number,
	 * 			foundset_related_text:String,
	 * 			foundset_related_form:String,
	 * 			tab_form:String,
	 * 			program:String,
	 * 			foundsetfilter:Array,
	 * 			tab_rowId:Number}}*/
	var _his = globals.nav.stack[globals.nav.stack_position]

	/** @type {{view:Number,form:Array}}*/
	var _progObj = globals.nav.program[_his.program]
		// set the right view
	_progObj.view = _his.view
	// show program of history
	globals.svy_nav_showForm(_his.form, _his.program, true);
	
	if(!globals.nav.switchedForEdit || forms[_his.form].controller.getDataSource() != _foundset.getDataSource())//if there is a switch for edit right data should be there
	{
		// set foundset filter if related foundset.
		if (_his.foundsetfilter) {
			_foundset = databaseManager.getFoundSet(forms[_his.form].controller.getDataSource())
	
			for (var j = 0; j < _his.foundsetfilter.length; j++) {
				_foundset.addFoundSetFilterParam(_his.foundsetfilter[j][0], _his.foundsetfilter[j][1], _his.foundsetfilter[j][2])
			}
	
			_foundset.loadAllRecords()
			forms[_his.form].controller.loadRecords(_foundset)
			globals.nav.related_text = _his.foundset_related_text
			globals.nav.related_form = _his.foundset_related_form
			if (globals.nav.related_text) {
				forms.svy_nav_fr_status_bar.elements.form_name.text += ' -> ' + globals.nav.related_text
			}
	
		}
		// load records with the history foundset, if the sql is not already the same on the form
		if (databaseManager.getSQL(forms[_his.form].foundset) != _his.sql || databaseManager.getSQLParameters(forms[_his.form].foundset) != _his.sql_parameters) {
			forms[_his.form].controller.loadRecords(_his.sql, _his.sql_parameters)
		}
		// select the right record, if fails, go to the last record in foundset to select the right one.
		var _select = forms[_his.form].foundset.selectRecord(_his.rowId)
		if (_select == false) //the record is not in the current foundset
		{
			forms[_his.form].foundset.getRecord(databaseManager.getFoundSetCount(forms[_his.form].foundset))
			forms[_his.form].foundset.selectRecord(_his.rowId)
		}
		// if form has tabs, select the right record on the tab
		if (_his.tab_form) // form has tabform
		{
			var _tab_select = forms[_his.tab_form].foundset.selectRecord(_his.tab_rowId)
			if (_tab_select == false) {
				forms[_his.tab_form].foundset.getRecord(databaseManager.getFoundSetCount(forms[_his.tab_form].foundset))
				forms[_his.tab_form].foundset.selectRecord(_his.tab_rowId)
			}
		}
	
		// sinc the foundset
		var _index = forms[_his.form].foundset.getSelectedIndex()
		for (var i = 0; i < _progObj.form.length; i++) {
			if (forms[_progObj.form[i][2]]) {
				forms[_progObj.form[i][2]].controller.loadRecords(forms[_his.form].foundset)
				forms[_progObj.form[i][2]].controller.setSelectedIndex(_index)
			}
	
		}
		forms[globals.nav_program_name + '_tab'].controller.loadRecords(forms[_his.form].foundset)
		forms[globals.nav_program_name + '_tab'].controller.setSelectedIndex(_index)
	
		// load the right records on the tab form
		if (forms[globals.nav.template_types[_progObj.view]].hasTab()) {
			if (forms[globals.nav_program_name + '_tab']) {
				forms[globals.nav_program_name + '_tab'].controller.loadRecords(forms[_his.form].foundset)
			}
		}
	}
	else
	{
		for (var k = 0; k < _progObj.form.length; k++) {
			if (forms[_progObj.form[k][2]]) {
				forms[_progObj.form[k][2]].controller.loadRecords(_foundset)
			}

		}
		forms[globals.nav_program_name + '_tab'].controller.loadRecords(_foundset)
	}
}

/**
 *	To update the history
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {String}	_form name of the form
 * @return  none
 *
 * @properties={typeid:24,uuid:"91099c37-5707-47c8-ad2c-d0d5a6cbc8e9"}
 */
function svy_nav_history_update(_form) {
	// if globals.nav.noHistory is set to 1 there will be no stack update
	if (globals.nav.noHistory == 1) {
		globals.nav.noHistory = 0
		return
	}

	var _program = globals.nav_program_name
	var _view = globals.nav.program[_program].view
		// set al properties for history
	var _form_properties = new Object()
	_form_properties.program = _program
	_form_properties.form = _form
	_form_properties.view = _view
	// if there is a related foundset save it for history
	if (globals.nav.his) {
		
		/** @type {{foundset:String,foundset_related_text:String,foundset_related_form:String}}*/
		var _history = globals.nav.his
		_form_properties.foundsetfilter = _history.foundset
		_form_properties.foundset_related_text = _history.foundset_related_text
		_form_properties.foundset_related_form = _history.foundset_related_form
	}

	// clear the forward stack
	if (globals.nav.stack.length > globals.nav.stack_position + 1) {
		var _ar = new Array();
		for (var i = 0; i <= globals.nav.stack_position; i++) {

			_ar.push(globals.nav.stack[i]);
		}
		globals.nav.stack = _ar;
	}
	// push the properties into the stack and put the stackposition + 1
	globals.nav.stack_position++;
	globals.nav.stack.push(_form_properties);

	// set the history buttons
	forms.svy_nav_fr_tree_top.elements.btn_his_back.enabled = ( (globals.nav.stack_position != 0) && globals.nav.mode == 'browse')
	forms.svy_nav_fr_tree_top.elements.btn_his_forw.enabled = (! (globals.nav.stack.length == globals.nav.stack_position + 1) && globals.nav.mode == 'browse')

	//remove fist stackpos. when there are too much history-entries
	if (globals.nav.stack_position >= globals.nav.his_max_entries) {
		//var _first = 
		globals.nav.stack.shift()
		globals.nav.stack_position--
	}

}

/**
 *	Build the navigation object, globals.nav in memory
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 *
 * @properties={typeid:24,uuid:"9ab87bce-b146-46a7-90a9-90034f9229cf"}
 */
function svy_nav_init() {

	//run onPreInit-method of when available
	if (globals['onPreInit']) {
		globals['onPreInit']()
	}

	//remove tooltips if iphone/ipad
	globals.svy_nav_removeTooltips()
	
	//set template buttons
	globals.svy_nav_setTemplateButtons()
	
	//set the divider properties if user has no divider properties
	if (!globals.svy_utl_getUserProperty(application.getSolutionName() + '.svy_nav_fr_main.tab_split.divLoc')) {
		globals.svy_utl_setUserProperty(application.getSolutionName() + '.svy_nav_fr_main.tab_split.divLoc', '175')
	}
	if (!globals.svy_utl_getUserProperty(application.getSolutionName() + '.svy_nav_fr_menu.tab_split.divLoc')) {
		globals.svy_utl_setUserProperty(application.getSolutionName() + '.svy_nav_fr_menu.tab_split.divLoc', '400')
	}

	// the stack for the history and the position
	globals.nav.stack = new Array()
	globals.nav.stack_position = -1

	//set browser viewer forms
	globals.svy_nav_set_form_names();

	// load all the forms with properties into the object
	var _program_array = globals.svy_nav_init_programs();

	//user has not even the right to see one program
	if (!_program_array && !_to_sec_user$user_id.flag_system_administrator) {
		globals.svy_mod_dialogs_global_showWarningDialog('i18n:svy.fr.lbl.warning', 'i18n:svy.fr.lbl.warning_no_program', 'i18n:svy.fr.lbl.ok')
		security.logout()
	}

	var _function_array = globals.svy_nav_get_functions()
	
	//make sure all nav properties exist
	globals.nav_properties = "data_version";
	if(!databaseManager.hasRecords(_to_nav_properties$property_name) || _to_nav_properties$property_name != globals.nav_version) {
		forms.svy_nav_c_properties.initSetProperties(null, false);
	}
	
	//load the nav properties
	globals.nav.template_types = globals.svy_nav_getProperty('template_types')	
	globals.nav.template_types_notabs = globals.svy_nav_getProperty('template_types_notabs')
	globals.nav.default_edit_template = globals.svy_nav_getProperty('default_edit_template')[0]
	globals.svy_nav_multi_tab_programs = globals.svy_nav_getBooleanProperty('multiple_tabs_per_program')
	
	// load the stucture of the menu into the object
	globals.svy_nav_init_menu_items(_program_array, _function_array);

	// load the functions into the nav object
	globals.svy_nav_init_functions()

	//set nav style form
	if(forms['svy_nav_style_custom'])
	{
		globals.nav_styleForm = 'svy_nav_style_custom'
	}
	
	//load the valuelists
	if (globals.svy_val_startup_setvaluelists) {
		globals.svy_val_startup_setvaluelists();
	}

	//set template images
	globals.svy_nav_init_setTemplateImages()

	// set date
	forms.svy_nav_fr_status_bar.elements.lbl_date.text = utils.dateFormat(new Date(), 'dd-MMM-yyyy') + ' - ' + i18n.getI18NMessage('svy.fr.lbl.week') + ': ' + utils.dateFormat(new Date(), 'w')

	globals.nav.mode = 'browse'

	globals.nav.his = new Object()
	globals.nav.his.foundset = null
	globals.nav.childRelation = null
	globals.nav.his.foundset_related_text = null
	globals.nav.his_max_entries = 20
	globals.nav.related_text = null
	globals.nav.related_form = null
	globals.nav.switchedForEdit = false

	// Webclient and smartclient have different behaviour on clicks if there are layers:
	// in webclient the method has to be on the top layer
	// if the method is in the onAction of the toplayer, the onMouseOver image on the smartclient doesn't look right.
	if (application.getApplicationType() == 5)//webclient
	{
		var jsFormShortcuts = solutionModel.getForm('svy_nav_fr_shortcuts')
		for (var _i = 0; _i < 7; _i++) {
			var jsLabel = jsFormShortcuts.getLabel("shortcutLabel" + _i)
			jsLabel.onAction = solutionModel.getGlobalMethod("globals",'svy_nav_shortcut_goto')
		}
	}

	// load shortcuts/bookmarks
//	forms.svy_nav_fr_shortcuts.loadShortcuts()
//	forms.svy_nav_fr_bookmarks.loadBookmarks()
//	globals.nav.recordHistory = new Array()
//	forms.svy_nav_fr_tree_top.elements.btn_his_forw.enabled = false
//	forms.svy_nav_fr_tree_top.elements.btn_his_back.enabled = false
//	forms.svy_nav_fr_tree_top.elements.btn_shortcut.enabled = false
//	forms.svy_nav_fr_tree_top.elements.btn_bookmark.enabled = false
//	forms.svy_nav_fr_viewCompareTab.setViewButtonsEnabled(false)

	//init shortkeys
	globals.svy_nav_setShortKeys(_function_array)

	//set startup form
	var _startupProgramArray = globals.svy_nav_getProperty('startup_program')
	if(_startupProgramArray && _startupProgramArray[0] && globals.nav.program[_startupProgramArray[0]])
	{
		/** @type {String}*/
		var _program =	_startupProgramArray[0]
		var _template = globals.nav.template_types[globals.nav.program[_program].view]
		/** @type {String}*/
		var _form = globals.nav.program[_program].form[forms[_template].has1()][2]
		globals.svy_nav_showForm(_form, _program);
	}
	
	//	application.setUIProperty("ComboBox.disabledBackground", new Packages.javax.swing.plaf.ColorUIResource(java.awt.Color.GREEN));
	application.putClientProperty("ComboBox.disabledForeground", new Packages.javax.swing.plaf.ColorUIResource(java.awt.Color.BLACK));
	
	//run onPostInit-method of when available
	if (globals['onPostInit']) {
		globals['onPostInit']()
	}
}

/**
 *	Sort the tree menu and hide all the items where the user has no rights for.
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {Array} _program_array array with all the programs available for this user
 * @param {Array} _function_array
 * @param {Boolean} [_reset] true when resetting menu (for example when changing organization
 * 
 * @properties={typeid:24,uuid:"540e7bfa-863b-41b1-be84-e8868faa6bb6"}
 * @AllowToRunInFind
 */
function svy_nav_init_menu_items(_program_array, _function_array, _reset) {
	

	var _query_menus = "SELECT menu_id\
						FROM nav_menu\
						WHERE security_key_id IN (" + globals.nav.keys + ") OR security_key_id is null\
						ORDER BY priority"
	var _answer, _open_config
	var _dataset = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query_menus, null, -1)
	
	if (!_dataset.getValue(1, 1)) {
		if(_to_sec_user$user_id.flag_system_administrator) //if user is admin also show option to open the configurator
		{	
			_open_config = i18n.getI18NMessage('svy.fr.lbl.open_configurator')
			_answer = globals.svy_mod_dialogs_global_showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.warning'), i18n.getI18NMessage('svy.fr.dlg.noMenuWarning'), i18n.getI18NMessage('svy.fr.lbl.logout'),_open_config );
			if(_answer == _open_config)
			{
				globals._1_svy_nav_openNavigationForm()
				return
			}
		}
		else
		{
			globals.svy_mod_dialogs_global_showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.warning'), i18n.getI18NMessage('svy.fr.dlg.noMenuWarning'), i18n.getI18NMessage('svy.fr.lbl.ok'));
			security.logout()
		}
		
		//throw a exeption to let the methods stop
		throw 'User has no menu';
	}

	if(_program_array && _program_array.length < 1)
	{
		if(_to_sec_user$user_id.flag_system_administrator) //if user is admin also show option to open the configurator
		{	
			_open_config = i18n.getI18NMessage('svy.fr.lbl.open_configurator')
			_answer = globals.svy_mod_dialogs_global_showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.warning'), i18n.getI18NMessage('svy.fr.dlg.noMenuWarning'), i18n.getI18NMessage('svy.fr.lbl.logout'),_open_config );
			if(_answer == _open_config)
			{
				globals._1_svy_nav_openNavigationForm()
				return
			}
		}
		throw 'User has no right to programs';
	}
		
	var _program_string = _program_array.join("','")
	var _function_string = ''
	if(_function_array.length > 0) 
	{
		_function_string = _function_array.join(",")
	}

		//some databases don't like in queries on empty strings
	if (_program_string == '') {
		_program_string = '-1'
	}
	if (_function_string == '') {
		_function_string = '-1'
	}

	//set a table filter
	var _query = "	SELECT 	menu_item_id \
					FROM 	nav_menu_items\
					WHERE	menu_id = " + _dataset.getValue(1, 1) + " AND\
							(menuitem_type = 'P' AND \
							program_name in ('" + _program_string + "'))\
					OR 		(menuitem_type = 'F' AND \
							function_id in (" + _function_string + "))\
					OR		(menuitem_type != 'P' AND\
							menu_item_id in (	SELECT 	 parent_id\
							            	FROM 	nav_menu_items\
											WHERE	menu_id = " + _dataset.getValue(1, 1) + " AND\
													(menuitem_type = 'P' AND \
													program_name in ('" + _program_string + "'))\
											OR 		(menuitem_type = 'F' AND \
													function_id in (" + _function_string + "))\
											OR		(menuitem_type != 'P' AND\
													menu_item_id in (	SELECT 	 parent_id\
									            	FROM 	nav_menu_items\
													WHERE	menu_id = " + _dataset.getValue(1, 1) + " AND\
															(menuitem_type = 'P' AND \
															program_name in ('" + _program_string + "'))\
															OR 		(menuitem_type = 'F' AND \
															function_id in (" + _function_string + "))))))"
	if (!_to_sec_user$user_id.flag_system_administrator) 
	{
		//MAVariazione - this won't work in Servoy >= 7
//		databaseManager.addTableFilterParam(globals.nav_db_framework, 'nav_menu_items', 'menu_item_id', 'IN', _query)
		var items = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, null, -1).getColumnAsArray(1);
		databaseManager.addTableFilterParam(globals.nav_db_framework, 'nav_menu_items', 'menu_item_id', 'IN', items);
	}

	forms.svy_nav_fr_tree.controller.find()
	forms.svy_nav_fr_tree.parent_id = '^'
	forms.svy_nav_fr_tree.menu_id = _dataset.getValue(1, 1)
	forms.svy_nav_fr_tree.controller.sort('sort_order asc')
	forms.svy_nav_fr_tree.controller.search()
	
	// check if iPhone is used
	if(!globals.svy_utl_OsIsIphoneIpad())
	{
		forms.svy_nav_fr_tree.init_tree(_reset)
	}
	else
	{
		//mobile menu
		globals.svy_nav_m_init_menu()
	}

}

/**
 *	Init all the programs that are available for the login user, with tabs menu's'.
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @return {Array} programs that the user has rights for
 *
 * @properties={typeid:24,uuid:"b55cf7ac-8092-4ecc-b5c9-84e1c2bfbbee"}
 */
function svy_nav_init_programs() {
	// make a program object in the nav object
	globals.nav.program = new Object()

	var _rec; //, _rec_tab, _rec_button
	var _data_rec = 1

	// get the programs where the user has rights for
	var _dataset = globals.svy_nav_getPrograms();
	var _program_array = _dataset.getColumnAsArray(1)

	if (_dataset.getMaxRowIndex() == 0) {
		return null
	}

	forms.svy_nav_c_program_dtl.foundset.loadRecords(_dataset)

	//set progress bar properties
	var _progress = 60
	var _begin_progress = 5
	
	for (var i = 1; i <= forms.svy_nav_c_program_dtl.controller.getMaxRecordIndex(); i++) {
		_rec = forms.svy_nav_c_program_dtl.foundset.getRecord(i)

		// setting progress bar.
		if (i % 4 == 0) {
			forms.svy_nav_fr_loading.setStatusBar(_begin_progress + ( (_progress / forms.svy_nav_c_program_dtl.controller.getMaxRecordIndex()) * 4))
		}
		if (!security.canRead('db:/'+_rec.server_name+'/'+_rec.table_name) && 
		!((_rec.server_name == null && _rec.table_name == null)))// no security rights so remove from array
		{

			_program_array = _program_array.filter(function(x) {
				return x != _rec.program_name;
			});
		}

		if ( (_rec.program_name == _dataset.getValue(_data_rec, 1) || 
				_to_sec_user$user_id.flag_system_administrator) && 
				_rec.form_object ) {
			// in the dataset are
			// 1. program_name
			// 2. btn_new
			// 3. btn_edit
			// 4. btn_duplicate
			// 5. btn_delete
			// 6. btn_method
			// 7. btn_print
			// 8. btn_sort
			// 9. btn_rec_nav
			// 10. btn_search
			// 11. btn_search_prop
			// 12. btn_all_records
			// 13. btn_export
			// 14. btn_resettblheader
			// 15. btn_help
			// 16. btn_record_information
			// 17. btn_required_fields
			// put record information into the nav object

			var _programObject = globals.nav.program[_rec.program_name] = { };
			_programObject.description = _rec.display_description
			_programObject.program_image = _rec.program_image
			_programObject.program_name = _rec.program_name
			_programObject.delete_mode = _dataset.getValue(_data_rec, 5)
			_programObject.duplicate_mode = _dataset.getValue(_data_rec, 4)
			_programObject.update_mode = _dataset.getValue(_data_rec, 3)
			_programObject.add_mode = _dataset.getValue(_data_rec, 2)
			_programObject.divider_locked = _rec.divider_locked
			_programObject.divider_height = _rec.divider_height
			if (!_programObject.divider_height) _programObject.divider_height = 350
			_programObject.display_field_header = _rec.display_field_header
			_programObject.sort_value = _rec.sort_value
			_programObject.base_form_name = _rec.base_form_name
			_programObject.record_locking = _rec.record_locking
			_programObject.btn_all_records = _dataset.getValue(_data_rec, 12)
			_programObject.btn_method = _dataset.getValue(_data_rec, 6)
			_programObject.btn_print = _dataset.getValue(_data_rec, 7)
			_programObject.btn_search = _dataset.getValue(_data_rec, 10)
			_programObject.btn_search_prop = _dataset.getValue(_data_rec, 11)
			_programObject.btn_sort = _dataset.getValue(_data_rec, 8)
			_programObject.btn_rec_nav = _dataset.getValue(_data_rec, 9)
			_programObject.btn_export = _dataset.getValue(_data_rec, 13)
			_programObject.btn_resettblheader = _dataset.getValue(_data_rec, 14)
			_programObject.btn_help = _dataset.getValue(_data_rec, 15)
			_programObject.btn_record_information = _dataset.getValue(_data_rec, 16)
			_programObject.btn_required_fields = _dataset.getValue(_data_rec, 17)
			_programObject.btn_lookup_new = _rec.btn_lookup_new
			_programObject.btn_lookup_show = _rec.btn_lookup_show
			_programObject.server_name = _rec.server_name
			_programObject.table_name = _rec.table_name
			_programObject.form = _rec.form_object
			_programObject.template = _rec.template_object
			_programObject.view = _rec.startup_view
			_programObject.noreadonly = _rec.noreadonly
			_programObject.nobuttonbar = _rec.flag_no_buttonbar
			_programObject.empty_foundset = _rec.empty_foundset;

			//if program is in the menu, lookup the menu path
			if (utils.hasRecords(_rec.nav_program_to_nav_menu_items)) {
				  /** @type {JSRecord<db:/svy_framework/nav_menu_items>} */
				  var _childRec = _rec.nav_program_to_nav_menu_items.getRecord(1)
				_programObject.path = globals.svy_nav_getMenuPath(_childRec);
			} else {
				_programObject.path = null
			}

			//create the table form
			globals.svy_nav_create_tab(_rec.program_name, _rec.server_name, _rec.table_name, _rec.divider_height)

			// set all the TABS of a program in a array
			_programObject.tab = new Array()
			_programObject.tab.selected = 1
			//			_programObject.tab[0] = 1
			_programObject.table_tab_form = false

			// set all the METHODS of a program in a array
			_programObject.method = new Array()

			// set all the REPORT of a program in a array
			_programObject.report = new Array()

			// set filters
			_programObject.filter = new Array()
		}
		_data_rec++
	}

	//query the tab information
	var _stringPrograms = _program_array.join("','")
	var _queries_tab = "SELECT 	program_name,\
									relation,\
									form_type,\
									display_description,\
									edit_on_tab,\
									default_access,\
									delete_mode,\
									update_mode,\
									add_mode,\
									programtab_id,\
									target_program_name\
						FROM 		nav_programtabs\
						WHERE		program_name IN ('" + _stringPrograms + "')\
									and target_program_name IN ('"+_stringPrograms+"')\
						ORDER BY 	program_name asc, tab_sequence asc "
	var _dataset_tab = databaseManager.getDataSetByQuery(globals.nav_db_framework, _queries_tab, null, -1)

	var _tabIndObj = new Object()
	var _tabIds = _dataset_tab.getColumnAsArray(10)
	for (var j = 1; j <= _dataset_tab.getMaxRowIndex(); j++) {
		if (!globals.nav.program[_dataset_tab.getValue(j, 11)]) continue
		_programObject = globals.nav.program[_dataset_tab.getValue(j, 1)]
		var _tabnr = _programObject.tab.length
		if (_tabnr == 0)_tabnr = 1
		/** @type {{relation:String}} */
		var _tabObject = _programObject.tab[_tabnr] = new Object()
		_tabObject.program_name = _dataset_tab.getValue(j, 11)
		_tabObject.base_form_name = globals.nav.program[_dataset_tab.getValue(j, 11)].base_form_name
		_tabObject.relation = _dataset_tab.getValue(j, 2)
		_tabObject.form_type = _dataset_tab.getValue(j, 3)
		_tabObject.description = _dataset_tab.getValue(j, 4)
		_tabObject.edit_on_tab = _dataset_tab.getValue(j, 5)
		_tabIndObj[_dataset_tab.getValue(j, 10)] = _tabObject
		if (_dataset_tab.getValue(j, 6)) //default access
		{
			_tabObject.delete_mode = globals.nav.program[_dataset_tab.getValue(j, 11)].delete_mode
			_tabObject.update_mode = globals.nav.program[_dataset_tab.getValue(j, 11)].update_mode
			_tabObject.add_mode = globals.nav.program[_dataset_tab.getValue(j, 11)].add_mode
		} else {
			_tabObject.delete_mode = _dataset_tab.getValue(j, 7)
			_tabObject.update_mode = _dataset_tab.getValue(j, 8)
			_tabObject.add_mode = _dataset_tab.getValue(j, 9)
		}
		// set RELATION filters
		_tabObject.relation_filter = new Array()       
		if (_tabObject.relation) {
			var _lastRelation = _tabObject.relation.replace(/(\w+\.)*(\w+)$/, "$2"); //there could be multiple relations joined, in that case whe only need to know the last one for the filter fields.
			var _startRelation = utils.stringReplace(_tabObject.relation,_lastRelation,'')
			var jsRelation = solutionModel.getRelation(_lastRelation)
			if(jsRelation) //relation has to exist
			{
				var jsRelationtitems = jsRelation.getRelationItems()
				for (var q = 0; q < jsRelationtitems.length; q++) {
					_tabObject.relation_filter[q] = new Object()
					_tabObject.relation_filter[q].from_key = _startRelation + jsRelationtitems[q].primaryDataProviderID
					_tabObject.relation_filter[q].to_key = jsRelationtitems[q].foreignColumnName
				}
			}
		}
	}

	if (_tabIds.join(","))//otherwise the are no tabs
	{

		var _stringTabIds = _tabIds.join(",")
		var _query_autofill = "SELECT 	child_field,\
										expression_type,\
										parent_expression,\
										programtab_id\
							FROM 		nav_programtabs_autofill\
							WHERE		programtab_id IN (" + _stringTabIds + ")\
							ORDER BY 	programtab_id  asc "
		var _dataset_autofill = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query_autofill, null, -1)

		var _Id
		var _autofill_array

		for (var k = 1; k <= _dataset_autofill.getMaxRowIndex(); k++) {

			if (_Id != _dataset_autofill.getValue(k, 4)) {
				_tabObject = _tabIndObj[_dataset_autofill.getValue(k, 4)]
				_autofill_array = _tabObject.autofill = new Array()
				_Id = _dataset_autofill.getValue(k, 4)
			}

			var _autofillObj = _autofill_array[_autofill_array.length] = new Object()
			_autofillObj.child_field = _dataset_autofill.getValue(k, 1)
			_autofillObj.expression_type = _dataset_autofill.getValue(k, 2)
			_autofillObj.parent_expression = _dataset_autofill.getValue(k, 3)
		}
	}

	var _query_methods_reports
		//query the REPORTS AND METHODS

	if (_to_sec_user$user_id.flag_system_administrator) // administator doesn't have to have rights to the keys
	{
		_query_methods_reports = "	SELECT 	p.menu_type, \
							p.in_browse, \
							p.nav_popmenu_id, \
							p.in_edit, \
							p.label, \
							p.function_id, \
							p.parent_popmenu_id,\
							p.program_name,\
							p.show_in \
					FROM	nav_popmenu p \
					WHERE	p.program_name  IN ('" + _stringPrograms + "')\
					ORDER BY p.program_name, p.sequence_nr"

	} else {
		_query_methods_reports = "\
			SELECT  p.menu_type,\
					p.in_browse, \
					p.nav_popmenu_id,\
					p.in_edit, \
					p.label, \
					p.function_id, \
					p.parent_popmenu_id, \
					p.program_name, \
					p.show_in \
			FROM nav_popmenu p \
			WHERE p.program_name IN ('" + _stringPrograms + "') \
			AND (\
				p.nav_popmenu_id IN ( \
					SELECT nk.nav_popmenu_id \
					FROM nav_navigation_keys nk \
					WHERE nk.code = p.menu_type and \
					nk.nav_popmenu_id  = p.nav_popmenu_id and \
					nk.security_key_id IN (" + globals.nav.keys + ") \
				)\
				OR NOT EXISTS ( \
					SELECT 	nk.nav_popmenu_id \
					FROM nav_navigation_keys nk \
					WHERE nk.code = p.menu_type and \
					nk.nav_popmenu_id  = p.nav_popmenu_id \
				)\
			)\
			ORDER BY p.program_name, p.sequence_nr";
	}

	var _dataset_popmenu = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query_methods_reports, null, -1);

	var _menu_type
	for (var m = 1; m <= _dataset_popmenu.getMaxRowIndex(); m++) {
		if (_dataset_popmenu.getValue(m, 1) == 'F') // method
		{
			_menu_type = 'method'
		} else if (_dataset_popmenu.getValue(m, 1) == 'R') // report
		{
			_menu_type = 'report'
		}
		var _methodObj = globals.nav.program[_dataset_popmenu.getValue(m, 8)][_menu_type][globals.nav.program[_dataset_popmenu.getValue(m, 8)][_menu_type].length] = new Object()
		_methodObj.in_browse = _dataset_popmenu.getValue(m, 2)
		_methodObj.nav_popmenu_id = _dataset_popmenu.getValue(m, 3)
		_methodObj.in_edit = _dataset_popmenu.getValue(m, 4)
		_methodObj.label = _dataset_popmenu.getValue(m, 5)
		_methodObj.function_id = _dataset_popmenu.getValue(m, 6)
		_methodObj.parent_popmenu_id = _dataset_popmenu.getValue(m, 7)
		_methodObj.show_in = _dataset_popmenu.getValue(m, 9)
	}

	//query the filters
	var _query_filter = " SELECT 	p.program_name,\
									ff.filter_field_name,\
									ff.filter_operator,\
									ff.filter_value\
							FROM	nav_foundset_filter_parameters ff,\
									nav_program p\
							WHERE	ff.nav_foundset_filter_id = p.nav_foundset_filter_id\
							AND		p.program_name IN ('" + _stringPrograms + "')"

	var _dataset_filter = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query_filter, null, -1);
	for (var n = 1; n <= _dataset_filter.getMaxRowIndex(); n++) {
		var _filterObj = globals.nav.program[_dataset_filter.getValue(n, 1)].filter[globals.nav.program[_dataset_filter.getValue(n, 1)].filter.length] = new Object()
		_filterObj.filter_field_name = _dataset_filter.getValue(n, 2)
		_filterObj.filter_operator = _dataset_filter.getValue(n, 3)
		/** @type {String} */
		var _filter_value = _dataset_filter.getValue(n, 4)
		if (/^\[/.test(_filter_value)) {
			_filter_value = _filter_value.substring(1, _filter_value.length - 1).split(",");
		}
		_filterObj.filter_value = _filter_value

	}
	return _program_array
}

/**
 *	Load table view persistance, loads the position of the columns that the user defined
 *	This method works only if you use svy_nav_saveTableViewPersistance to
 *
 * @author Sanneke Aleman/ Joas de Haan
 * @since 2008-11-01
 *
 * @param {String}	[_form] form you want to load the tableview persistance
 * @param {String} [_formSaveName] dynamic created form can work with a form save name
 *
 * @properties={typeid:24,uuid:"cfb0ea3a-9f82-4e02-af6a-c9bd9d2b3702"}
 */
function svy_nav_loadTableViewPersistance(_form, _formSaveName) {
	if(_formSaveName)
	{	
		globals.nav_current_formname =_formSaveName
	}
	else
	{
		globals.nav_current_formname = _form
	}
	
	if (!_form) {
		//there should be a form
		return
	}

	if (forms[_form].controller.view != 3) // view
	{
		return;
	}
	var _width, _height, _x, _y, _rec;
	// loop true all the records for this user and this form
	for (var i = 1; i <= _to_sec_user_table_properties$user_id$organization_id$form_name.getSize(); i++) {
		_rec = _to_sec_user_table_properties$user_id$organization_id$form_name.getRecord(i);
		globals.nav_element_name = _rec.element_name;
		_x = _rec.location_x;
		_y = _rec.location_y;
		_width = _rec.width;
		_height = _rec.height;
		if (forms[_form].elements[globals.nav_element_name]) {
			// set the size and the location
			forms[_form].elements[globals.nav_element_name].setSize(_width, _height);
			if (_y == undefined) _y = 0
			forms[_form].elements[globals.nav_element_name].setLocation(_x, _y);
		}
	}
}

/**
 *	Called by opening the module
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 *
 * @properties={typeid:24,uuid:"6ef62880-dc27-4084-b900-3006a8915350"}
 * @AllowToRunInFind
 */
function svy_nav_onOpen(arg, queryParams) {
	
	if(queryParams && !queryParams.mainform)
		queryParams.mainform = 'svy_nav_fr_main';
	
	forms.svy_nav_fr_postLogin.controller.show()

	// set owner id's
	globals.owner_id = globals.svy_sec_owner_id = globals.svy_sec_lgn_owner_id
	
	//check if we should switch the framework db
	if (globals["svy_nav_getFrameworkDBName"]) {
		//This function is used for people that named their frameworkdb different than "svy_framework"
		globals.nav_db_framework = globals["svy_nav_getFrameworkDBName"]();
		databaseManager.switchServer('svy_framework', globals.nav_db_framework);
		}

	//check if we should switch the user db
	if (_userDB && globals["svy_nav_getUserDBName"] && (_userDB != globals["svy_nav_getUserDBName"]())) {
		//Switch to userdbname that was provided in the deeplink -> overrules userdb set in owner record
		databaseManager.switchServer(globals["svy_nav_getUserDBName"](), _userDB);
	} else {
		//Check if userdb is set in ownerrecord. If so, switch to it. 
		/** @type {JSFoundset<db:/svy_framework/sec_owner>}*/
		var _fs = databaseManager.getFoundSet(globals.nav_db_framework, "sec_owner");
		_fs.loadRecords(databaseManager.convertToDataSet([globals.svy_sec_owner_id]));
		var _userDB = _fs.database_name;
		if (_userDB != null && _userDB != "" && globals["svy_nav_getUserDBName"] && _userDB != globals["svy_nav_getUserDBName"]()) {
			databaseManager.switchServer(globals["svy_nav_getUserDBName"](), _userDB);
		}
	}
	
	//save solution name
	globals.nav_solution_name = application.getSolutionName();
	
	//filter framework_db on solution name if necessary
	if (globals.svy_nav_getBooleanProperty("filter_on_solution_name")) {
		databaseManager.addTableFilterParam(globals.nav_db_framework, null, "solution_name", "=", globals.nav_solution_name, "solution_filter");
	}
	
	//filter data
	/** @type {JSFoundset<db:/svy_framework/sec_user>} */
	var _foundset = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user')
	var _rec
	if(_foundset.find())
	{	
		_foundset.user_id = globals.svy_sec_lgn_user_id;
		if(_foundset.search() == 0)
			throw new Error("User not found. Please contact the administrator.");
		
		_rec = _foundset.getRecord(1);
	}
	
	//MAVariazione - don't filter anything if we're super admin. Also provide the user as a parameter for some filters.
	if(_rec && !_rec.flag_super_administrator)
	{
	    globals.svy_nav_filterOwner(_rec);
		globals.svy_nav_filterOrganization();
	}
	
	databaseManager.setCreateEmptyFormFoundsets()
	
	//run onOpen-method of when available
	if (globals['onOpen']) {
		globals['onOpen']().apply(this, arguments);
	}

	//onPost Login
	if(globals.svy_nav_postLogin(_rec))
	{
		// MAVariazione - allow a custom main form
		//forms.svy_nav_fr_main.controller.show();
		var mainForm = queryParams && queryParams['mainform'];
		if (mainForm)
			forms[mainForm].controller.show();
		
		return true;
	}
		
	return false;
}

/**
 *	Popmenu for the general reports that are not attached to a specific program
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"a6f6a453-b83f-4df2-abc6-cc54d2d994a3"}
 */
function svy_nav_popmenu_main_reports(_event)
{
	var _menu = plugins.window.createPopupMenu()
	var _submenu, _rec, _rec_child, _item

	if (!_to_nav_popmenu$main_report$roots.getSize()) {
		return
	}
	var _keys_ar = [];
	if (globals.nav.keys != -1) {
		/** @type {String} */
		var _keys = globals.nav.keys
		_keys_ar = _keys.split(",").map(function (x) {return x*1;});
	}

	// read the menu out the tables and create a popmenu
	for (var i = 1; i <= _to_nav_popmenu$main_report$roots.getSize(); i++) {
		_rec = _to_nav_popmenu$main_report$roots.getRecord(i)
		
		if (databaseManager.hasRecords(_rec.nav_popmenu_to_nav_navigation_keys$popmenu) &&
			_rec.nav_popmenu_to_nav_navigation_keys$popmenu.security_key_id &&
			_keys_ar.indexOf(_rec.nav_popmenu_to_nav_navigation_keys$popmenu.security_key_id) < 0) 
		{
			continue; //user has no rights for this menu
		}
		
		if(utils.hasRecords(_rec.nav_popmenu_to_nav_popmenu$children))
		{
			_submenu = null;
			for (var j = 1; j <= _rec.nav_popmenu_to_nav_popmenu$children.getSize(); j++) {
				_rec_child = _rec.nav_popmenu_to_nav_popmenu$children.getRecord(j);
						
				if (databaseManager.hasRecords(_rec_child.nav_popmenu_to_nav_navigation_keys$popmenu) &&
					_rec_child.nav_popmenu_to_nav_navigation_keys$popmenu.security_key_id &&
					_keys_ar.indexOf(_rec_child.nav_popmenu_to_nav_navigation_keys$popmenu.security_key_id) < 0) 
				{
					continue; //user has no rights for this menu
				}
				
				if (!_submenu) { //Add parent it it doesn't exist yet. Parent is not added if the user doesn't have rights to any of the children.
					_submenu = _menu.addMenu(_rec.label)
				}
				_item = _submenu.addMenuItem(_rec_child.label, globals.svy_nav_callFunctionFromPopmenu)
				_item.methodArguments = [_rec_child.function_id]
				
			}
		}
		else
		{
			_item  = _menu.addMenuItem(_rec.label, globals.svy_nav_callFunctionFromPopmenu);
			_item.methodArguments = [_rec.function_id]
		}
	}

	/** @type {RuntimeComponent} */
	var _source = _event.getSource()
	if (_source != null) {
		_menu.show(_source);
	}
}

/**
 *	Saves table view persistance, saves the position of the columns that the user defined
 *	This method works only if you use svy_nav_loadTableViewPersistance too
 *
 * @author Sanneke Aleman / Joas de Haan
 * @since 2008-11-24
 * @return  none
 * @param {String} _form
 * @param {String} [_formSaveName] dynamic created form can work with a form save name
 *
 * @properties={typeid:24,uuid:"e6e79a11-971d-489d-9daa-a84c75d7e68f"}
 */
function svy_nav_saveTableViewPersistance(_form, _formSaveName) {
	var _type
	
	if(_formSaveName)
	{
		globals.nav_current_formname = _formSaveName
	}
	else
	{
		globals.nav_current_formname = _form
	}

	if (forms[_form].controller.view != 3) // view
	{
		return;
	}

	//determine the body part.
	var _jsForm = solutionModel.getForm(_form)

	var _formpart = globals.svy_utl_getBeginEndPosFormPart(_form, JSPart.BODY)
	var _beginBody = _formpart.begin
	var _endBody = _formpart.end

	// loop true all elements and if it is a fiels save positions to table
	var _elements = forms[_form].elements.allnames;
	for (var i = 0; i < _elements.length; i++) {
		globals.nav_element_name = _elements[i];
		if (forms[_form].elements[_elements[i]].getElementType) {
			_type = forms[_form].elements[_elements[i]].getElementType()
		}
		if (_type == 'TEXT_FIELD' ||
		_type == 'TEXT_AREA' ||
		_type == 'RTF_AREA' ||
		_type == 'HTML_AREA' ||
		_type == 'TYPE_AHEAD' ||
		_type == 'COMBOBOX' ||
		_type == 'RADIOS' ||
		_type == 'CHECK' ||
		_type == 'CALENDAR' ||
		_type == 'IMAGE_MEDIA' ||
		_type == 'LABEL' ||
		_type == 'PASSWORD') {
			var _jsElement
			if (_type == 'LABEL') {
				_jsElement = _jsForm.getLabel(_elements[i])
			} else {
				_jsElement = _jsForm.getField(_elements[i])
			}
			if ( (_jsElement.y >= _beginBody) && (_jsElement.y <= _endBody)) {

				if (!utils.hasRecords(_to_sec_user_table_properties$formname$element_name$user_id$organization_id)) {
					_to_sec_user_table_properties$formname$element_name$user_id$organization_id.newRecord();
				}
				_to_sec_user_table_properties$formname$element_name$user_id$organization_id.location_x = forms[_form].elements[_elements[i]].getLocationX();
				_to_sec_user_table_properties$formname$element_name$user_id$organization_id.location_y = forms[_form].elements[_elements[i]].getLocationY();
				_to_sec_user_table_properties$formname$element_name$user_id$organization_id.width = forms[_form].elements[_elements[i]].getWidth();
				_to_sec_user_table_properties$formname$element_name$user_id$organization_id.height = forms[_form].elements[_elements[i]].getHeight();
			}
			databaseManager.saveData(_to_sec_user_table_properties$formname$element_name$user_id$organization_id.getRecord(_to_sec_user_table_properties$formname$element_name$user_id$organization_id.getSelectedIndex()));
		}
	}
}

/**
 *	Set the form names where the framework will work with
 *
 * @author Sanneke Aleman
 * @since 2005-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"e33ab3a6-4a71-4cc9-a312-81b7bea7082e"}
 */
function svy_nav_set_form_names() {
	nav.viewer_form = 'svy_nav_fr_viewer'
	nav.browser_form = 'svy_nav_fr_browser'
	nav.viewer_buttonbar = 'svy_nav_fr_buttonbar_viewer'
	nav.browser_buttonbar = 'svy_nav_fr_buttonbar_browser'
}

/**
 *	Set the color of the field, used to give fields a different color in edit
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {String} _form name of the form
 * @param {String} _status you want to set it to (edit/browse)
 * @return  none
 *
 * @properties={typeid:24,uuid:"639a2351-a916-4243-9d24-2cf88243aaa7"}
 */
function svy_nav_setFieldsColor(_form, _status) {
	var _type
	// MAVariazione - check if elements exist
//	var _elements = forms[_form].elements.allnames
	var _elements = forms[_form].elements ? forms[_form].elements.allnames : null
			
	if(_elements == null)
		return
		
	var _color, _color_fg, _formTab

	var _jsForm = solutionModel.getForm(globals.nav_styleForm)
	var _jsCForm = solutionModel.getForm(_form)

	// MAVariazione - include also the add status
	if (!forms[_form].controller.readOnly && (_status == 'edit' || _status == 'add')) {
		_color    = _jsForm.getField('fld_bg_editMode').background
		_color_fg = _jsForm.getField('fld_bg_editMode').foreground
	} else {
		_color    = _jsForm.getField('fld_bg_default').background
		_color_fg = _jsForm.getField('fld_bg_default').foreground
	}
	var _element
	var _style_color, _style_color_fg;
	for (var i = 0; i < _elements.length; i++) {
		_element = _elements[i]
		try {
			_type = forms[_form].elements[_elements[i]].getElementType()
		} catch (e) {
			_type = null;
		}

		if ( (_type == 'TEXT_FIELD' ||
		_type == 'TEXT_AREA' ||
		_type == 'RTF_AREA' ||
		_type == 'HTML_AREA' ||
		_type == 'TYPE_AHEAD' ||
		_type == 'COMBOBOX' ||
		_type == 'RADIOS' ||
		_type == 'CHECK' ||
		_type == 'CALENDAR' ||
		_type == 'IMAGE_MEDIA' ||
		_type == 'PASSWORD') && (forms[_form].elements[_element].transparent != 1) && ( ( _status == 'edit') || _status != 'edit')) {
			var _editable = !forms[_form].elements[_element].readOnly
			if (_jsCForm.getField(_element) && _jsCForm.getField(_element).styleClass && _jsForm.getField('fld_bg_default$' + _jsCForm.getField(_element).styleClass) &&(_editable && _status != 'edit')) {
				_style_color    = _jsForm.getField('fld_bg_default$' + _jsCForm.getField(_element).styleClass).background
				_style_color_fg = _jsForm.getField('fld_bg_default$' + _jsCForm.getField(_element).styleClass).foreground
			} else if (forms[_form].elements[_element].readOnly &&_jsCForm.getField(_element).styleClass && _jsForm.getField('fld_bg_editModeReadOnly$' + _jsCForm.getField(_element).styleClass) && (_status == 'edit')){
				_style_color    = _jsForm.getField('fld_bg_editModeReadOnly$' + _jsCForm.getField(_element).styleClass).background
				_style_color_fg = _jsForm.getField('fld_bg_editModeReadOnly$' + _jsCForm.getField(_element).styleClass).foreground
			} else if (_jsCForm.getField(_element) && _jsCForm.getField(_element).styleClass && _jsForm.getField('fld_bg_editMode$' + _jsCForm.getField(_element).styleClass) && (_editable && _status == 'edit')) {
				_style_color    = _jsForm.getField('fld_bg_editMode$' + _jsCForm.getField(_element).styleClass).background
				_style_color_fg = _jsForm.getField('fld_bg_editMode$' + _jsCForm.getField(_element).styleClass).foreground
			// MAVariazione - handle disabled fields
			} else if (forms[_form].elements[_element] && !forms[_form].elements[_element].enabled && (_status == 'edit' || _status == 'add')) {
				_style_color    = _jsForm.getField('fld_bg_disabled').background
				_style_color_fg = _jsForm.getField('fld_bg_disabled').foreground
				forms[_form].elements[_element].border = _jsForm.getField('fld_bg_disabled').borderType;
			} else  {
				_style_color    = _color
				_style_color_fg = _color_fg;
			}
			// MAVariazione - END
			forms[_form].elements[_element].bgcolor = _style_color
			forms[_form].elements[_element].fgcolor = _style_color_fg;
			
		} else if (_type == 'TABPANEL' ) {
			for (var k = 1; k <= forms[_form].elements[_element].getMaxTabIndex(); k++) {	
				_formTab = forms[_form].elements[_element].getTabFormNameAt(k)
				if (_formTab && forms[_formTab]) {
					globals.svy_nav_setFieldsColor(_formTab, _status)
				}
			}
		} else if (_type == 'SPLITPANE') {
			/** @type {Form} */
			var _formObj = forms[_form].elements[_element].getRightForm()
			_formTab = _formObj.controller.getName()
			if (_formTab && forms[_formTab]) {
				globals.svy_nav_setFieldsColor(_formTab, _status)
			}
			_formObj = forms[_form].elements[_element].getLeftForm()
			_formTab = _formObj.controller.getName()
			if (_formTab && forms[_formTab]) {
				globals.svy_nav_setFieldsColor(_formTab, _status)
			}
		}
	}
}

/**
 *	To save a shortcut
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"c427d4d8-ab90-46cb-8840-f5c61ecfacef"}
 */
function svy_nav_shortcut_save() {
	if (!globals.nav_program_name) return;
	if (databaseManager.hasRecords(_to_nav_shortcut$user_id$organization_id$program_name)) return;// shortcut already exist

	if (databaseManager.hasRecords(_to_nav_shortcut$user_id$organization_id) && _to_nav_shortcut$user_id$organization_id.getSize() == 7) // user has 7 shortcuts, maximum
	{
		globals.svy_mod_dialogs_global_showWarningDialog('', i18n.getI18NMessage('svy.fr.lbl.maximum_shortcuts'), i18n.getI18NMessage('svy.fr.lbl.ok'))
		return
	}

	// create the shortcut
	forms.svy_nav_fr_shortcuts.controller.newRecord();
	forms.svy_nav_fr_shortcuts.program_name = globals.nav_program_name;
	forms.svy_nav_fr_shortcuts.user_id = globals.svy_sec_lgn_user_id;
	forms.svy_nav_fr_shortcuts.organization_id = globals.svy_sec_lgn_organization_id;	

	//set the right sort order
	var maxReturnedRows = 1;
	var query = 'SELECT MAX(sort_order) FROM nav_shortcut WHERE user_id = ? AND organization_id = ?';
	var args = new Array();
	args[0] = globals.svy_sec_lgn_user_id;
	args[1] = globals.svy_sec_lgn_organization_id;
	var dataset = databaseManager.getDataSetByQuery(databaseManager.getDataSourceServerName(forms.svy_nav_fr_shortcuts.controller.getDataSource()), query, args, maxReturnedRows);
	if (dataset.getValue(1, 1)) {
		forms.svy_nav_fr_shortcuts.sort_order = dataset.getValue(1, 1) + 1
	} else {
		forms.svy_nav_fr_shortcuts.sort_order = 1
	}
	// load the shortcuts to see the new one
	forms.svy_nav_fr_shortcuts.loadShortcuts();
	// show the tab of the shortcuts
	forms.svy_nav_fr_bottom_bkmk_short.onClickShortcut();

}

/**
 *	To show a form in the framework
 *
 * @author Sanneke Aleman
 * @since 2005-11-24
 * @param {String} _form the name of the form
 * @param {String} [_program] name of the program
 * @param {Boolean} [_showAll] Load all records
 * @param {Boolean} [_orgTableView] don't go the the default table view
 * @param {Number} [_forcedTabNr] the number of the tab the form is on
 * @param {Boolean} [_dontOpenNewTab] 
 * @param {{anno:Number,mese:Number,anno_attivo:Number,mese_attivo:Number,
 *          periodo:Number,periodo_attivo:Number,giorni_sel:Array,ultimo_rec:Number,
 *          gruppo_inst:Number,gruppo_lav:String,idditta:Number,
 *          filtro_anag:Boolean,selected_tab:Number,selected_elements:Array,op_id:String}} [_objGiornParams]
 * @param {Boolean} [_onCloseTab]
 * 
 * @return {Array<String>} array with the selected form and program
 *
 * @properties={typeid:24,uuid:"c9f878b6-f664-4a42-b5cb-d60860396c05"}
 * @AllowToRunInFind
 * @SuppressWarnings(wrongparameters)
 */
function svy_nav_showForm(_form, _program, _showAll, _orgTableView, _forcedTabNr, _dontOpenNewTab, _objGiornParams, _onCloseTab) {
	if (_showAll == undefined) {
		_showAll = true;
		globals.nav.program[_program].active_search = null;
	}

	globals.nav.openNewTab = _dontOpenNewTab ? null : 1;

	//update the record history for the last program
	globals.svy_nav_history_update_record()

	//save the tab properties if tabs are used
	if(globals.nav_show_open_tabs)
	{		
		if(_onCloseTab)
    		forms.svy_nav_fr_openTabs.saveTabProperties(_onCloseTab)
	    else
		    forms.svy_nav_fr_openTabs.saveTabProperties()
					
	}
	//call the onProgramSwitch trigger if program changes
	if(_program && globals.nav_program_name && (_program!=globals.nav_program_name ))
	{
		if (globals[globals.nav_program_name + '_onProgramSwitch']) {
			var _methodReturn = globals[globals.nav_program_name + '_onProgramSwitch']()
			if (_methodReturn == -1) {
				return [];
			}
		}	
	}
	
	if (_program == undefined) {
		_program = globals.nav_program_name;
	} else {
		globals.nav_program_name = _program;
	}
	
	/** @type {{	view:Number,
	 * 				foundset:JSFoundset,
	 * 				divider_height:Number,
	 * 				base_form_name:String,
	 * 				path:Array,
	 * 				filter:Array,
	 * 				nobuttonbar:Number,
	 * 				form:Array,
	 * 				divider_locked:Number,
	 * 				tab:Array,
	 *              empty_foundset:boolean
     *         }}*/
	var _progObj = globals.nav.program[_program]

	//if form doesn't exist create it, it can happen that table views don't exist but are created dynamically
	if (!forms[_form]) {
		globals.svy_nav_createDefaultTableView(_program, _form)
		forms[_form].controller.loadRecords(_progObj.foundset)
	}

	globals.nav.lastProgram = _program
	globals.nav.lastView = _progObj.view
	
	
	//set the right view
	if(globals.svy_nav_multi_tab_programs && forms['svy_nav_fr_openTabs']['setView'])
	{
		forms['svy_nav_fr_openTabs']['setView']()
	}

	//run onPreShow-method of program when available
	if (globals[_program + '_onPreShow']) {
		_methodReturn = globals[_program + '_onPreShow']()

		if (_methodReturn == -1) {
			return [];
		}
	}

	//determine the template
	/** @type {String}*/
	var _template = globals.nav.getTemplate()
	
	/** @type {Form} */
	var _templateForm = forms[_template];
	var _dividerHeight = _progObj.divider_height

	globals.nav_base_form_name = _progObj.base_form_name
	// empty related text
	globals.nav.related_text = globals.nav.related_form = ''

	// set view 1 with the form
	globals.nav.form_view_01 = _form

	// setMenuTree
	if (!globals.svy_utl_compareArrays(forms.svy_nav_fr_tree.elements.dbtreeview.selectionPath, _progObj.path)) {
		globals.nav.setMenuTree = 1
		forms.svy_nav_fr_tree.elements.dbtreeview.selectionPath = _progObj.path
	}

	// set the foundset of the form, if a form doesn't have a table you don't have to load a foundset
	if (_showAll && _progObj.table_name) {
		if (_progObj.foundset) {
			forms[_form].dc_sort(globals.svy_nav_form_name, globals.nav_program_name, true);
			_progObj.foundset.loadAllRecords()
			forms[_form].controller.loadRecords(_progObj.foundset)
		} else if (!_progObj.empty_foundset) {									
			_progObj.foundset = databaseManager.getFoundSet(forms[_form].controller.getDataSource())
			forms[_form].dc_sort(globals.svy_nav_form_name, globals.nav_program_name, true);
			// set filters
			for (var j = 0; j < _progObj.filter.length; j++) {
				/** @type {String} */
				var _value = globals.nav.program[_program].filter[j].filter_value
					//global value is used
				if (/^globals\./.test(_value)) {
					_value = eval(_value)
				} else if (/globals\./.test(_value)) {
					var _global = _value.match(/(globals\.\w*)/)[0];
					_value = _value.replace(/(globals\.\w*)/, eval(_global));
				}
				// daniele: give the filter a name if the user feel so
				_progObj.foundset.addFoundSetFilterParam(_progObj.filter[j].filter_field_name, _progObj.filter[j].filter_operator, _value, _progObj.filter[j].filter_name)
			}
			_progObj.foundset.loadAllRecords()
			forms[_form].controller.loadRecords(_progObj.foundset)
		}
	}

	//no buttonbar, onshow of the form will set it
	forms[globals.nav.browser_form]['vNobuttonbar'] = _progObj.nobuttonbar
	forms[globals.nav.browser_form].elements['form_view_01'].setRightForm(forms[_form], null)

	
	// sync the foundset, if there is a table
	if (_progObj.table_name) {
		var _index = forms[_form].foundset.getSelectedIndex()
		for (var i = 0; i < _progObj.form.length; i++) {
			if (forms[_progObj.form[i][2]]) {
				forms[_progObj.form[i][2]].controller.loadRecords(forms[_form].foundset)
				forms[_progObj.form[i][2]].controller.setSelectedIndex(_index)
			}

		}
		forms[globals.nav_program_name + '_tab'].controller.loadRecords(forms[_form].foundset)
		forms[globals.nav_program_name + '_tab'].controller.setSelectedIndex(_index)
	}
	
	globals.svy_nav_form_name = _form

	// set the buttons
	globals.svy_nav_dc_setStatus(globals.nav.mode, _form)

	//set image to show with template is selected
	var _elementsButtonbar = forms.svy_nav_fr_buttonbar_browser.elements
	var _templateImages = globals.svy_nav_getProperty('template_images')
	for (i = 0; i < _templateImages.length; i++) {
		_elementsButtonbar['template_selected'+i].visible = false
	}
	_elementsButtonbar['template_selected' + _progObj.view].visible = true
	
	// MA_Variazione : se viene passato un oggetto di parametri e all'oggetto è associata la proprietà 
	// indicante il tab correntemente selezionato, imposta il valore del _progObj corrente a quel valore
	// (altrimenti nel caso di passaggio tra due tab già esistenti (es. da anomalie a giornaliera) questo
	// valore viene impostato automaticamente a 1 (es. si finisce sul tab del flusso) 
	if(_objGiornParams
		&& _objGiornParams['selected_tab']
		&& _progObj.tab['selected'] != _objGiornParams['selected_tab'])
		_progObj.tab['selected'] = _objGiornParams['selected_tab'];
	var _return = globals.svy_nav_setTabs(_template, _progObj, _progObj.tab['selected']);

	forms.svy_nav_fr_main.elements.tab_split.setRightForm(forms[_template], null)

	// set the splitter
	if (_templateForm['hasSplitter']()) {
		if (_progObj.divider_locked) _templateForm.elements['tab_split']['dividerSize'] = 0
		else _templateForm.elements['tab_split']['dividerSize'] = 1
	}

	// adjust layout based on divider height settings in configuration when using a template that has a splitter
	if (_dividerHeight && _templateForm['hasSplitter']()) {
		var _splitpos = _dividerHeight
		if(globals.nav_show_open_tabs)_splitpos += 25
		var _userSplitPos = globals.svy_utl_getUserProperty('Divider_' + _program + '.' +_progObj.view);
		if(_userSplitPos)
		{
			_splitpos = _userSplitPos
		}
		_templateForm.elements['tab_split']['dividerLocation'] = _splitpos;
	}
	
	if (globals.nav.program[_program].user_table_view_id) {
		globals.svy_nav_createTableView(null, globals.nav.program[_program].user_table_view_id, false);
	} else if (globals.nav['viewHasTable']() && !_orgTableView && utils.hasRecords(_to_nav_user_table_view$default)) {
		globals.svy_nav_createTableView(null, _to_nav_user_table_view$default.user_table_view_id, true);
	}
	
	// write form to history stack
	globals.svy_nav_history_update(_form);
	
	//if show open tabs, then add the tab
	if(globals.nav_show_open_tabs)
	{
		var tab_UUID = forms.svy_nav_fr_openTabs.drawTab(null,_program, _forcedTabNr);
		//MAVariazione nel caso di alcuni program impostiamo l'array dei parametri aggiuntivi 
		if (
			(_program == 'LEAF_Giornaliera' 
			|| _program == 'LEAF_CartolinaDipendente'
			|| _program == 'TimbratureMancantiDitta'
			|| _program == 'SquadratureGiornaliera'	
			|| _program == 'NEG'
			|| _program == 'NEG_CR'
			|| _program == 'NEG_CR_2'	
			|| _program == 'NEG_Rete'
			|| _program == 'NEG_Programmazione')
			|| _program == 'NEG_Cop'
			|| (_program == 'ProgrammazioneTurni' || (_program == 'RP_VisualizzaCopertura' && _objGiornParams 
					                                  || _program == 'LEAF_VisualizzaCopertura' && _objGiornParams))
			|| _program == 'LEAF_Pannello'
			|| _program == 'Commesse_Lavoratore'	
			|| _program == 'MA_StoricoOperazioni'	
				
		)
		addObjGiornParameters(tab_UUID,_objGiornParams);
	
	}
	
	return _return;
}

/**
 *	To toggle view between table/form or top/bottom
 *
 * @author Sanneke Aleman
 * @since 2005-11-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_formToArg] optional form you want to show
 * @return  none
 *
 * @properties={typeid:24,uuid:"a57e0b12-f008-409b-9a7f-5da6cdc8643f"}
 * @SuppressWarnings(unused)
 */
function svy_nav_toggleView(_event, _formToArg) {
	var _button = _event.getElementName()
	var _form_trigger = _event.getFormName()
	var _form
	var _form_to
	var _base
	var _program
	var _program_name = globals.nav.program[globals.nav_program_name].description
	var _tab_nr
	var _tab_form
	var _lenght

		// fill variables depending on if top form is calling the method or bottom form
	if ( (_form_trigger == globals.nav.browser_buttonbar) || (_event.getFormName() == globals.nav.form_view_01)) {
		_form = globals.nav.form_view_01
		_base = globals.nav.program[globals.nav_program_name].base_form_name
		_program = globals.nav_program_name
	} else if ( (_form_trigger == globals.nav.viewer_buttonbar) || (_formToArg) || (_event.getFormName() == globals.nav.form_view_02)) {
		_tab_form = globals.nav_program_name + '_tab'
		_tab_nr = forms[_tab_form].elements['tabs']['tabIndex']
		_form = forms[_tab_form].elements['tabs'].getTabFormNameAt(_tab_nr)
		_base = globals.nav.program[globals.nav_program_name].tab[_tab_nr].base_form_name
		_program = globals.nav.program[globals.nav_program_name].tab[_tab_nr].program_name
		_form_trigger = globals.nav.viewer_buttonbar
		globals.nav.toggle = 1
		globals.nav.activeView = 1
	}
	
	/** @type {{	view:Number,
	 * 				foundset:JSFoundset,
	 * 				divider_height:Number,
	 * 				base_form_name:String,
	 * 				filter:Array,
	 * 				form:Array,
	 * 				divider_locked:Number}}*/
	var _progObj = globals.nav.program[_program]


	// define the form where the method will navigate to
	if (utils.stringPatternCount(_button, 'btn_template') > 0) // method is called by one of the template buttons
	{
		var _buttonnr = utils.stringReplace(_button, 'btn_template', '')
		_progObj.view = _buttonnr
		var _template = globals.nav.template_types[_buttonnr]
		_form_to = _progObj.form[forms[_template].has1()][2]
	} else {
		_form_to = _formToArg;
	}

	_tab_form = _program + '_tab'

	// if the toggle is from the bottom form to the top form filters have to be set.
	if ( (_form_trigger == globals.nav.viewer_buttonbar)) {
		var _foundset = databaseManager.getFoundSet(forms[_form].controller.getDataSource())
		/** @type {{foundset:Array,parentProgram:String,tabIndex:Number,parentRec:JSRecord,foundset_related_form:Sting,foundset_related_text:String}} */
		globals.nav.his = new Object()
		globals.nav.his.foundset = new Array()
		globals.nav.his.parentProgram = globals.nav_program_name
		globals.nav.his.tabIndex = globals.nav.program[globals.nav_program_name]['tab']['selected']
		globals.nav.his.parentRec = forms[globals.nav.form_view_01].foundset.getRecord(forms[globals.nav.form_view_01].foundset.getSelectedIndex())

		// set program specific filters
		for (var j = 0; j < _progObj.filter.length; j++) {
			/** @type {String} */
			var _value = _progObj.filter[j].filter_value
				//global value is used
			if (utils.stringPatternCount(_value, 'globals.')) {
				_value = eval(_value)
			}
			_foundset.addFoundSetFilterParam(_progObj.filter[j].filter_field_name, _progObj.filter[j].filter_operator, _value)
			_lenght = globals.nav.his.foundset.length
			globals.nav.his.foundset[_lenght] = new Array()
			globals.nav.his.foundset[_lenght][0] = _progObj.filter[j].filter_field_name
			globals.nav.his.foundset[_lenght][1] = _progObj.filter[j].filter_operator
			globals.nav.his.foundset[_lenght][2] = _value
			globals.nav.his.foundset[_lenght][3] =_from_key
		}
		
		//copy the sort
		_foundset.sort(forms[_form].foundset.getCurrentSort(),true)
		
		// set relation specific filters
		for (var k = 0; k < nav.program[globals.nav_program_name].tab[_tab_nr]['relation_filter'].length; k++) {
			var _from_key = nav.program[globals.nav_program_name].tab[_tab_nr].relation_filter[k].from_key
			var _to_key = nav.program[globals.nav_program_name].tab[_tab_nr].relation_filter[k].to_key
			_foundset.addFoundSetFilterParam(_to_key, '=', forms[globals.nav.form_view_01][_from_key])

			_lenght = globals.nav.his.foundset.length
			globals.nav.his.foundset[_lenght] = new Array()
			globals.nav.his.foundset[_lenght][0] = _to_key
			globals.nav.his.foundset[_lenght][1] = '='
			globals.nav.his.foundset[_lenght][2] = forms[globals.nav.form_view_01][_from_key]
			globals.nav.his.foundset[_lenght][3] =_from_key
		}
		// load all records only if filters set
		if (nav.program[globals.nav_program_name].tab[_tab_nr].relation_filter.length > 0 || _progObj.filter.length > 0) {
			_foundset.loadAllRecords()
			_foundset.setSelectedIndex(forms[_form].foundset.getSelectedIndex())
		}

		nav.new_record_filter = globals.nav.his.foundset
		// load the foundset to the form
		if (_form != _form_to) {
			forms[_form_to].controller.loadRecords(_foundset)
		}
		// load the foundset to the tab form
		forms[_program + '_tab'].controller.loadRecords(_foundset)
		var _field_value
		if (globals.nav.program[globals.nav_program_name].display_field_header) {
			_field_value = forms[globals.nav.form_view_01][globals.nav.program[globals.nav_program_name].display_field_header]
		}
		globals.nav.his.foundset_related_text = _program_name + ' - ' + _field_value
		globals.nav.his.foundset_related_form = globals.nav.form_view_01

	}
	// show the form

	globals.svy_nav_showForm(_form_to, _program, false, null, null, true);
	globals.nav.related_form = globals.nav.his.foundset_related_form
	globals.nav.related_text = globals.nav.his.foundset_related_text
	// set the right text in the status bar
	if (globals.nav.related_text) {
		forms.svy_nav_fr_status_bar.elements.form_name.text += ' -> ' + globals.nav.related_text
	}
	return _form_to
}

/**
 *	Called when the user select a tree node, will navigate to a program
 *
 * @author Sanneke Aleman
 * @since 2005-11-24
 * @param {Number} _menu_item_id Menu item id of the item you want to open
 * @return  none
 *
 * @properties={typeid:24,uuid:"A08DC111-2E5A-4335-9E4E-715885CC759B"}
 */
function svy_nav_tree_node_selected(_menu_item_id) {
	if (globals.nav.mode != 'browse') return; // no navigation in find and edit

	globals.nav.openNewTab = 1
//M.A. Variations as suggested by Sanneke on Servoy forum
//	if (globals.nav.setMenuTree == 1) // if the tree is called because showForm set the right node, don't navigate
//	{
//		globals.nav.setMenuTree = 0
//		return
//	}

	globals.nav_menu_item_id = _menu_item_id

	if (_to_nav_menu_items.menuitem_type == 'F') {
		var _rec = _to_nav_menu_items.nav_menu_items_to_nav_function.getRecord(1)

		var _methodcall = _rec.method + '('
		var _rec_arg
		for (var i = 1; i <= _rec.nav_function_to_nav_function_arguments.getSize(); i++) {
			_rec_arg = _rec.nav_function_to_nav_function_arguments.getRecord(i)
			if (i != 1) {
				_methodcall += ', '
			}

			if (_rec_arg.arg_type == 1) {
				_methodcall += '"' + _rec_arg.argument + '"'
			} else if (_rec_arg.arg_type == 2) {
				_methodcall += '"' + globals[_rec_arg.argument] + '"'
			}
		}
		_methodcall += ')'

		eval(_methodcall)
	} else if (_to_nav_menu_items.menuitem_type == 'P') {
		var _program_name = _to_nav_menu_items.program_name
		if (_program_name) {
			var _program = _program_name
			if (!globals.nav.program[_program] || globals.nav.program[_program] == undefined) return

			globals.nav.his = new Object()

			var _template = globals.nav.template_types[globals.nav.program[_program].view]
			var _form = globals.nav.program[_program].form[forms[_template].has1()][2]

			// show the program
			var _return = globals.svy_nav_showForm(_form, _program);
			// sort the tables
			if (_return == -1) {
				return
			}
			if (_return[0])// only if there are tabs
			{
				forms.svy_nav_base.dc_sort(_return[0], _return[1]);
			}

		}
	} 
	// M.A. Variazione : espandi automaticamente quando il nodo ha dei figli
	else if (_to_nav_menu_items.menuitem_type == 'R')
	{
		var sqlMenu = 'WITH RECURSIVE rec_nav_menu_items AS \
		( \
	      SELECT parent_id, 1 AS depth \
	      FROM nav_menu_items \
   		  WHERE menu_item_id = ? \
		  UNION ALL \
		  SELECT nmih.parent_id, depth+1 \
		  FROM nav_menu_items nmih \
		  JOIN rec_nav_menu_items rnmi \
		  ON rnmi.parent_id = nmih.menu_item_id \
		) \
		\
		SELECT * FROM rec_nav_menu_items rnmi \
        WHERE rnmi.parent_id IS NOT NULL';
		
		var arrMenu = [_menu_item_id];
		var dsMenu = databaseManager.getDataSetByQuery('svy_framework',sqlMenu,arrMenu,-1);
		var arrMenuItem = dsMenu.getColumnAsArray(1);
		arrMenuItem.push(_menu_item_id);
		if(forms.svy_nav_fr_tree.elements.dbtreeview.isNodeExpanded(arrMenuItem))
		   forms.svy_nav_fr_tree.elements.dbtreeview.setExpandNode(arrMenuItem,false)
		else
			forms.svy_nav_fr_tree.elements.dbtreeview.setExpandNode(arrMenuItem,true);
	}
}


/**
 * Will show the right click menus in the navigation tree
 * @author Sanneke Aleman
 * @since 2011-06-15
 * @param {Object} _menu_item_id
 * @param {String} _tableName
 * @param {Number} _mouseX
 * @param {Number} _mouseY
 *
 * @properties={typeid:24,uuid:"05938BC5-EF99-464E-9D07-B6E5AA8EC0DD"}
 */
function svy_nav_tree_node_selected_rightClick(_menu_item_id, _tableName, _mouseX, _mouseY) {
	
	globals.nav_menu_item_id = _menu_item_id
	if (utils.hasRecords(_to_nav_menu_items) && utils.hasRecords(_to_nav_menu_items.nav_menu_items_to_nav_menu_items_context_menu))
	{
		//get the foundset
		var _fs = _to_nav_menu_items.nav_menu_items_to_nav_menu_items_context_menu
		var _rec, _menuitem
		//sort the foundset
		_fs.sort('sequence asc')
		//create menu
		var _popupmenu = plugins.window.createPopupMenu()

		for (var i = 1; i <= _fs.getSize(); i++) {
			_rec = _fs.getRecord(i)
			_menuitem = _popupmenu.addMenuItem(_rec.display_description, globals.svy_nav_callFunctionFromPopmenu)
			_menuitem.methodArguments = [_rec.function_id]
		}
		_popupmenu.show(_mouseX, _mouseY);
	}
			
}

/**
 *	Key shortcut 4 to open the security window
 *
 * @author Sanneke Aleman
 * @since 2008-05-24
 * @return  none
 *
 * @properties={showInMenu:true,typeid:24,uuid:"4d3ae3f6-4e6c-4a3b-80bf-34f24ddfa113"}
 */
function _4_svy_nav_openSecurityDialog() {
	if (_to_sec_user$user_id.flag_system_administrator) {
		globals.svy_mod_showFormInDialog(forms.svy_sec_main, -1, -1, -1, -1, null, true, false, 'Security', false)
	}
}

/**
 * Callback method for when solution is closed, force boolean argument tells if this is a force (not stopable) close or not.
 *
 * @param {Boolean} force if false then solution close can be stopped by returning false
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"7A5BA424-0891-4A07-A72C-8D7E0C390C1E"}
 * @AllowToRunInFind
 */
function svy_nav_onClose(force) {
	// rollback any open transactions
	if (databaseManager.hasTransaction()) {
		databaseManager.rollbackTransaction();
	}
	
	// register logout
	/** @type {JSFoundset<db:/svy_framework/sec_user_login_attempt>} */
	var _fs_loginAttempt = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_login_attempt');
	if (_fs_loginAttempt.find()) {
		_fs_loginAttempt.user_id = globals.svy_sec_lgn_user_id;
		_fs_loginAttempt.is_successful = 1;
		if (_fs_loginAttempt.search()) {
			_fs_loginAttempt.sort('attempt_datetime desc');
			_fs_loginAttempt.setSelectedIndex(1);
			_fs_loginAttempt.logout_datetime = new Date();
			databaseManager.saveData(_fs_loginAttempt);
		}
	}

	application.removeClientInfo(globals.owner_id)
	
	//run onClose-method of when available
	if (globals['onClose']) {
		var _methodReturn = globals['onClose']()
	}
	if (_methodReturn == false) {
		return false
	} else {
		return true
	}
}

/**
 *	Shows a menu of the history stack
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"03fedae0-b665-4f9c-b7cd-d67ba4290d91"}
 */
function svy_nav_history_menu(_event) {
	if (globals.nav.mode != 'browse') return

	var _popupmenu = plugins.window.createPopupMenu()
	var _item
	for (var i = 0; i < globals.nav.stack.length; i++) {
		_item = _popupmenu.addCheckBox(globals.nav.stack[i].program, globals.svy_nav_history_moveFromPopmenu, 'media:///' + globals.nav.program[globals.nav.stack[i].program].program_image)
		_item.methodArguments = [null, i, 'sec_arg'];
		if (i == globals.nav.stack_position) {
			_item.selected = true

		}
	}

	/** @type {RuntimeComponent} */
	var _source = _event.getSource()
	if (_source != null) {
		_popupmenu.show(_source);
	}

}

/**
 *	To show an array as a popup where you can edit
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {String}	_array you want to edit
 * @param {String}	_form you want to save youre edited array to
 * @param {String}	_field you want to save youre edited array to
 * @return  none
 *
 * @properties={typeid:24,uuid:"99af8973-092c-4fe4-96ed-f5a6bd6b48c6"}
 */
function svy_nav_arrayEdit(_array, _form, _field) {
	globals.nav.arrayForm = _form
	globals.nav.arrayField = _field
	var _dataset = databaseManager.createEmptyDataSet(0,0)
	_dataset.addColumn('data_field')
	_dataset.addColumn('sort_field')
	for (var i = 0; i < _array.length; i++) {
		_dataset.addRow([_array[i], i])
	}

	var _datasource = _dataset.createDataSource('array_table', [JSColumn.TEXT,JSColumn.INTEGER]);
	var jsForm = solutionModel.getForm('svy_nav_c_array_editor')
	jsForm.dataSource = _datasource
	var jsField = jsForm.getField('sort_field')
	jsField.dataProviderID = 'sort_field'
	jsField = jsForm.getField('data_field')
	jsField.dataProviderID = 'data_field'
	forms.svy_nav_c_array_editor.controller.recreateUI()
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_array_editor, -1, -1, 318, 318)

}

/**
 *	To set the images of the templates
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 *
 *
 * @properties={typeid:24,uuid:"53142689-ef03-478e-bf73-a8593151236a"}
 */
function svy_nav_init_setTemplateImages() {
	
	var _templateImages = globals.svy_nav_getProperty('template_images')
	for (var i = 0; i < _templateImages.length; i++) {
		forms.svy_nav_fr_buttonbar_browser.elements['btn_template' + i].setImageURL('media:///' + _templateImages[i])
		forms.svy_nav_fr_buttonbar_viewer.elements['btn_template' + i].setImageURL('media:///' + _templateImages[i])
	}

}

/**
 *	Get the row identifiers
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 * @param {String}	[_form] Formname you want the row id from
 * @return {Array} Rowidents
 *
 * @properties={typeid:24,uuid:"2c1a70a4-b8a6-4d51-87d6-78491b12f8b3"}
 */
function svy_nav_getRowIdentifierValues(_form) {
	var jsTable = databaseManager.getTable(forms[_form].controller.getDataSource())

	if (!jsTable) return null //form without table

	var _record_names = jsTable.getRowIdentifierColumnNames()
	var _record_ids = new Array()
	for (var i = 0; i < _record_names.length; i++) {
		// get the record id values
		_record_ids[i] = forms[_form][_record_names[i]]
	}
	return _record_ids
}

/**
 *	Update the history with the record information
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 *
 * @properties={typeid:24,uuid:"c1491815-ecd4-4559-9351-c8d8035ccc21"}
 */
function svy_nav_history_update_record() {
	if (globals.nav.noHistory == 1) {
		return
	}

	//update record history
	if (globals.nav.stack_position > 0) {
		/**@type {{form:String,program:String}}  */
		var _stackObj = globals.nav.stack[globals.nav.stack_position]
		var _form = _stackObj.form
		var _program = _stackObj.program
		if ( (globals.nav.program[_program].tab.length > 1) && globals.nav.form_view_02) {
			_stackObj.tab_form = globals.nav.form_view_02
			_stackObj.tab_rowId = globals.svy_nav_getRowIdentifierValues(globals.nav.form_view_02);
		}

		if (_stackObj['foundsetfilter']) //related foundset
		{
			_stackObj.sql = databaseManager.getSQL(forms[_stackObj.form].foundset)
			_stackObj.sql_parameters = databaseManager.getSQLParameters(forms[_stackObj.form].foundset)
		} else {
			_stackObj.sql = databaseManager.getSQL(globals.nav.program[_stackObj.program].foundset)
			_stackObj.sql_parameters = databaseManager.getSQLParameters(globals.nav.program[_stackObj.program].foundset)
		}
		_stackObj.rowId = globals.svy_nav_getRowIdentifierValues(_form)

	}
}

/**
 *	To open the valuelist editor with the shortcut ctrl+5
 *
 * @author Erik Kramer
 * @since 2009-03-12
 *
 * @properties={showInMenu:true,typeid:24,uuid:"41176068-33a9-4787-81aa-42a1d8904c2c"}
 */
function _5_svy_nav_openValuelistEditor() {
	if (_to_sec_user$user_id.flag_system_administrator) {
		globals.svy_mod_showFormInDialog(forms.svy_utl_valuelists_dtl, -1, -1, -1, -1, 'Valuelists', true, false, 'Valuelists', false)
	}
}

/**
 *	Is used to get form out of find when user uses ESC, or to load all Records
 *
 * @author Sanneke Aleman
 * @since 2009-03-26
 * @param {JSEvent} _event
 *
 *
 * @properties={typeid:24,uuid:"2f31774a-5143-4281-a403-15b3217622aa"}
 */
function svy_nav_showAllRecordsCmd(_event) {
	var _form = _event.getFormName();
	if (forms[_form].foundset.isInFind()) {
		_form = globals.svy_sea_searchForm
		globals.svy_sea_cancelSearch()
		globals.svy_nav_dc_setStatus('browse', _form)
		return
	} else if (forms.svy_nav_fr_buttonbar_browser.elements.btn_loadAllRecords.enabled) {
		forms.svy_nav_base.dc_loadAll()
	}
}

/**
 *	To the status of the browserbar
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 * @param {String}	_status the status you want to set the bar in (browse edit add delete)
 * @param {String}	_form	the formname
 * @return  none
 *
 * @properties={typeid:24,uuid:"67a57a72-0f49-4823-b860-775582468fba"}
 */
function svy_nav_setBrowserbar(_status, _form) {

	var _browse = (_status == 'edit' || _status == 'add' || _status == 'find' || _status == 'required_fields') ? false : true
	var _foundset = (forms[globals.nav.form_view_01].controller.getMaxRecordIndex() > 0)
	
	/**@type {{
	 * add_mode:Number, 
	 * btn_all_records:Number,
	 * btn_export:Number,
	 * btn_help:Number,
	 * btn_method:Number, 
	 * btn_print:Number,
	 * btn_rec_nav:Number,
	 * btn_record_information:Number, 
	 * btn_resettblheader:Number,
	 * btn_sort:Number, 
	 * btn_search:Number, 
	 * btn_search_prop:Number,
	 * btn_required_fields:Number,
	 * delete_mode:Number, 
	 * duplicate_mode:Number, 
	 * update_mode:Number, 
	 * server_name:String, 
	 * table_name:String
	 * }} 
	 */
	var _progObj = globals.nav.program[globals.nav_program_name]
	
	var _buttonBarElements = forms.svy_nav_fr_buttonbar_browser.elements
	
	var _datasource = forms[globals.nav.form_view_01].controller.getDataSource();
	
	var _buttonObj = forms[globals.nav.form_view_01].getButtonObject()
	
	// MA_Variazione : modificato da Giovanni il 31/10/2017 per consentire di rendere invisibili i pulsanti del framework  
	var _btn_new = true; //_browse && (_progObj.add_mode == 1) && security.canInsert(_datasource)
	var _btn_edit = true; //_browse && (_progObj.update_mode == 1) && security.canUpdate(_datasource) && _foundset
	var _btn_delete = true; //_browse && (_progObj.delete_mode == 1) && security.canDelete(_datasource) && _foundset
	var _btn_duplicate = false; //_browse && (_progObj.duplicate_mode == 1) && security.canInsert(_datasource) && _foundset
	
	// test if buttons new,edit,duplicate,delete are visible
	if(_buttonObj.forceValues)
	{
		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_new =  _buttonObj['btn_new']['visible']
		}
		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_delete =  _buttonObj['btn_delete']['visible']
		}
		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_duplicate = _buttonObj['btn_duplicate']['visible']
		}
		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_edit = _buttonObj['btn_edit']['visible']
		}
	}
	else
	{
		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_new = _btn_new && _buttonObj['btn_new']['visible']
		}
		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_delete = _btn_delete && _buttonObj['btn_delete']['visible']
		}
		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_duplicate = _btn_duplicate && _buttonObj['btn_duplicate']['visible']
		}
		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['visible'] != 'undefined')//the property exist and is entered
		{
			_btn_edit = _btn_edit && _buttonObj['btn_edit']['visible']
		}
		
	}
	_buttonBarElements.btn_new.visible = _btn_new
	_buttonBarElements.btn_edit.visible = _btn_edit
	_buttonBarElements.btn_delete.visible = _btn_delete
	_buttonBarElements.btn_duplicate.visible = _btn_duplicate
	
	// test if buttons new,edit,duplicate,delete are enabled
	_btn_new = _browse && (_progObj.add_mode == 1) && security.canInsert(_datasource)
	_btn_edit = _browse && (_progObj.update_mode == 1) && security.canUpdate(_datasource) && _foundset
	_btn_delete = _browse && (_progObj.delete_mode == 1) && security.canDelete(_datasource) && _foundset
	_btn_duplicate = _browse && (_progObj.duplicate_mode == 1) && security.canInsert(_datasource) && _foundset
	
	if(_buttonObj.forceValues)
	{
		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_new =  _buttonObj['btn_new']['enabled']
		}
		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_delete =  _buttonObj['btn_delete']['enabled']
		}
		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_duplicate = _buttonObj['btn_duplicate']['enabled']
		}
		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_edit = _buttonObj['btn_edit']['enabled']
		}
	}
	else
	{
		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_new = _btn_new && _buttonObj['btn_new']['enabled']
		}
		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_delete = _btn_delete && _buttonObj['btn_delete']['enabled']
		}
		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_duplicate = _btn_duplicate && _buttonObj['btn_duplicate']['enabled']
		}
		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_edit = _btn_edit && _buttonObj['btn_edit']['enabled']
		}
		
	}
	_buttonBarElements.btn_new.enabled = _btn_new
	_buttonBarElements.btn_edit.enabled = _btn_edit
	_buttonBarElements.btn_delete.enabled = _btn_delete
	_buttonBarElements.btn_duplicate.enabled = _btn_duplicate
	
	// other buttons
	_buttonBarElements.btn_print.enabled = _status != 'find' && (_progObj.btn_print == 1)
	_buttonBarElements.btn_methods.enabled = _status != 'find' && (_progObj.btn_method == 1)
	_buttonBarElements.btn_sort.enabled = _browse && (_progObj.btn_sort == 1) && _foundset
	_buttonBarElements.btn_search.enabled = _browse && (_progObj.btn_search == 1)
	_buttonBarElements.btn_search_menu.enabled = _browse && (_progObj.btn_search_prop == 1)
	_buttonBarElements.btn_loadAllRecords.enabled = _browse && (_progObj.btn_all_records == 1)
	_buttonBarElements.btn_export.enabled = _browse && (_progObj.btn_export == 1) && _foundset
	//the reset table headers is only available in tbl
	_buttonBarElements.btn_resettblheader.enabled = _browse && (/(_tbl)$|(_tblt)$/.test(globals.nav.form_view_01)) && (_progObj.btn_resettblheader == 1)
	
	var _templateImages = globals.svy_nav_getProperty('template_images')
	for (var i = 0; i < _templateImages.length; i++) {
		_buttonBarElements['btn_template'+i].enabled = (_progObj['template'][i][2] == 1) && _browse
	}

	var _browse_nav = (utils.stringPatternCount(_form, '_tbl') && (_form == globals.nav.form_view_01) && (_status == 'edit' || _status == 'add')) ? true : _browse

	_buttonBarElements.btn_next.enabled = _browse_nav && (_progObj.btn_rec_nav == 1) && _foundset
	_buttonBarElements.btn_prev.enabled = _browse_nav && (_progObj.btn_rec_nav == 1) && _foundset
	_buttonBarElements.btn_record_information.enabled = _browse_nav && (_progObj.btn_record_information == 1) && _foundset
	_buttonBarElements.btn_first.enabled = _browse_nav && (_progObj.btn_rec_nav == 1) && _foundset
	_buttonBarElements.btn_last.enabled = _browse_nav && (_progObj.btn_rec_nav == 1) && _foundset

	_buttonBarElements.btn_cancel.enabled = !_browse && (_form == globals.nav.form_view_01)
	_buttonBarElements.btn_save.enabled = !_browse && (_form == globals.nav.form_view_01)

	_buttonBarElements.btn_help.enabled = _browse && (_progObj.btn_help == 1)
	
	
	//button for required fields will dissapear if users don't have rights to it.
	if(_progObj.btn_required_fields)
	{
		_buttonBarElements.btn_required_fields.visible = false //era true modificato da Danilo 21/03/2012
		_buttonBarElements.btn_required_fields.enabled = _browse_nav
	}
	else
	{
		_buttonBarElements.btn_required_fields.visible = false
	}
	
	//Hook to do custom things when setting the browserbar
	if (globals['onSetBrowserBar']) {
		globals['onSetBrowserBar']();
	}
}

/**
 *	To the status of the viewerbar
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 * @param {String}	_status the status you want to set the bar in (browse edit add delete)
 * @param {String}	_form	the formname
 * @return  none
 *
 * @properties={typeid:24,uuid:"2a2345ca-1e0c-405f-8ea2-c330309591c3"}
 */
function svy_nav_setViewerBar(_status, _form) {
	if (!globals.nav.form_view_02) return

	var _browse = (_status == 'edit' || _status == 'add' || _status == 'find' || _status == 'required_fields') ? false : true
	//no child records when there is no main record
	var _foundset_main = (forms[globals.nav.form_view_01].controller.getMaxRecordIndex() > 0)
	var _foundset = (forms[globals.nav.form_view_02].controller.getMaxRecordIndex() > 0)
	var _program = globals.nav_program_name
	var _buttonbarviewerElements = forms.svy_nav_fr_buttonbar_viewer.elements
	if (globals.nav.program[_program].tab.length <= 1)return //program with no tabs
	globals.nav.program[_program]['tab']['selected'] = forms[globals.nav_program_name + '_tab'].elements['tabs']['tabIndex']
	if (globals.nav.program[_program].tab.selected == -1)globals.nav.program[_program].tab.selected = 1
	var _tab_form = globals.nav_program_name + '_tab' 
	var _index = forms[_tab_form].elements['tabs']['tabIndex']
	if(_index < 0)
	{
		globals.nav.form_view_02 = globals.nav.getTabForm()
	}
	else
	{
		globals.nav.form_view_02 = forms[_tab_form].elements['tabs'].getTabFormNameAt(_index)
	}
	if (globals.nav.getTabRelation()) // if tab is related
	{
		_foundset = forms[globals.nav.form_view_01][globals.nav.getTabRelation()] != null 
		            && forms[globals.nav.form_view_01][globals.nav.getTabRelation()].getSize() > 0
	}
	
	var _tab_program = globals.nav.getTabProgram()
	/** @type {{
	 * add_mode:Number, 
	 * btn_all_records:Number,
	 * btn_method:Number,
	 * btn_print:Number,
	 * btn_record_information:Number,
	 * btn_sort:Number,
	 * btn_search:Number,
	 * btn_export:Number,
	 * btn_resettblheader:Number,
	 * btn_rec_nav:Number,
	 * delete_mode:Number, 
	 * update_mode: Number, 
	 * server_name:String,
	 * table_name:String
	 * }}
	 */
	var _tabProgObj = globals.nav.program[_tab_program]
	var _datasource = forms[globals.nav.form_view_02].controller.getDataSource();
	/** @type {{add_mode:Number, delete_mode:Number, update_mode: Number}}*/
	var _tabProp = globals.nav.program[_program].tab[globals.nav.program[_program].tab.selected]
	
	var _buttonObj = forms[globals.nav.form_view_02].getButtonObject()
	
//	var _btn_new = (_tabProp.add_mode == 1) && _browse && security.canInsert(_datasource) && _foundset_main
//	var _btn_edit = (_tabProp.update_mode == 1) && _browse && security.canUpdate(_datasource) && _foundset
//	var _btn_delete = (_tabProp.delete_mode == 1) && _browse && security.canDelete(_datasource) && _foundset
//	var _btn_duplicate = (_tabProp.add_mode == 1) && _browse && security.canInsert(_datasource) && _foundset
//	
//	// verify if add,edit,delete,duplicate buttons are visible
//	if(_buttonObj.forceValues)
//	{
//		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_new =  _buttonObj['btn_new']['visible']
//		}
//		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_delete =  _buttonObj['btn_delete']['visible']
//		}
//		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_duplicate = _buttonObj['btn_duplicate']['visible']
//		}
//		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_edit = _buttonObj['btn_edit']['visible']
//		}
//	}
//	else
//	{
//		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_new = _btn_new && _buttonObj['btn_new']['visible']
//		}
//		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_delete = _btn_delete && _buttonObj['btn_delete']['visible']
//		}
//		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_duplicate = _btn_duplicate && _buttonObj['btn_duplicate']['visible']
//		}
//		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['visible'] != 'undefined')//the property exist and is entered
//		{
//			_btn_edit = _btn_edit && _buttonObj['btn_edit']['visible']
//		}
//	}
//	_buttonbarviewerElements.btn_new.visible = _btn_new
//	_buttonbarviewerElements.btn_edit.visible = _btn_edit
//	_buttonbarviewerElements.btn_delete.visible = _btn_delete
//	_buttonbarviewerElements.btn_duplicate.visible = _btn_duplicate
		
	// verify if add,edit,delete,duplicate buttons are enabled
	var _btn_new = (_tabProp.add_mode == 1) && _browse && security.canInsert(_datasource) && _foundset_main
	var _btn_edit = (_tabProp.update_mode == 1) && _browse && security.canUpdate(_datasource) && _foundset
	var _btn_delete = (_tabProp.delete_mode == 1) && _browse && security.canDelete(_datasource) && _foundset
	var _btn_duplicate = (_tabProp.add_mode == 1) && _browse && security.canInsert(_datasource) && _foundset
	if(_buttonObj.forceValues)
	{
		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_new =  _buttonObj['btn_new']['enabled']
		}
		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_delete =  _buttonObj['btn_delete']['enabled']
		}
		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_duplicate = _buttonObj['btn_duplicate']['enabled']
		}
		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_edit = _buttonObj['btn_edit']['enabled']
		}
	}
	else
	{
		if(typeof _buttonObj['btn_new'] != 'undefined' && typeof _buttonObj['btn_new']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_new = _btn_new && _buttonObj['btn_new']['enabled']
		}
		if(typeof _buttonObj['btn_delete'] != 'undefined' && typeof _buttonObj['btn_delete']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_delete = _btn_delete && _buttonObj['btn_delete']['enabled']
		}
		if(typeof _buttonObj['btn_duplicate'] != 'undefined' && typeof _buttonObj['btn_duplicate']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_duplicate = _btn_duplicate && _buttonObj['btn_duplicate']['enabled']
		}
		if(typeof _buttonObj['btn_edit'] != 'undefined' && typeof _buttonObj['btn_edit']['enabled'] != 'undefined')//the property exist and is entered
		{
			_btn_edit = _btn_edit && _buttonObj['btn_edit']['enabled']
		}
	}
	_buttonbarviewerElements.btn_new.enabled = _btn_new
	_buttonbarviewerElements.btn_edit.enabled = _btn_edit
	_buttonbarviewerElements.btn_delete.enabled = _btn_delete
	_buttonbarviewerElements.btn_duplicate.enabled = _btn_duplicate
	
	_buttonbarviewerElements.btn_print.enabled = _status != 'find' && (_tabProgObj.btn_print == 1)
	_buttonbarviewerElements.btn_methods.enabled = _status != 'find' && (_tabProgObj.btn_method == 1)
	_buttonbarviewerElements.btn_sort.enabled = _browse && (_tabProgObj.btn_sort == 1) && _foundset
	_buttonbarviewerElements.btn_search.enabled = _browse && (_tabProgObj.btn_search == 1)
	_buttonbarviewerElements.btn_loadAllRecords.enabled = _browse && (_tabProgObj.btn_all_records == 1)
	_buttonbarviewerElements.btn_export.enabled = _browse && (_tabProgObj.btn_export == 1) && _foundset
	//the reset table headers is only available in tbl
	_buttonbarviewerElements.btn_resettblheader.enabled = _browse && (/(_tbl)$|(_tblt)$/.test(globals.nav.form_view_02)) && (_tabProgObj.btn_resettblheader == 1)


	var _templateImages = globals.svy_nav_getProperty('template_images')
	for (var i = 0; i < _templateImages.length; i++) {
		_buttonbarviewerElements['btn_template'+i].enabled = (_tabProgObj['template'][i][2] == 1) && _browse && _foundset
	}

	_buttonbarviewerElements.btn_save.enabled = !_browse && (_form == globals.nav.form_view_02)  && (!globals.nav.activeView || globals.nav.activeView == 2)
	_buttonbarviewerElements.btn_cancel.enabled = !_browse && (_form == globals.nav.form_view_02)  && (!globals.nav.activeView || globals.nav.activeView == 2)

	var _browse_nav = (utils.stringPatternCount(_form, '_tbl') && (_form == globals.nav.form_view_02) && (_status == 'edit' || _status == 'add')) ? true : _browse

	_buttonbarviewerElements.btn_next.enabled = _browse_nav && (_tabProgObj.btn_rec_nav == 1) && _foundset
	_buttonbarviewerElements.btn_prev.enabled = _browse_nav && (_tabProgObj.btn_rec_nav == 1) && _foundset
	_buttonbarviewerElements.btn_record_information.enabled = _browse_nav && (_tabProgObj.btn_record_information == 1) && _foundset
	_buttonbarviewerElements.btn_first.enabled = _browse_nav && (_tabProgObj.btn_rec_nav == 1) && _foundset
	_buttonbarviewerElements.btn_last.enabled = _browse_nav && (_tabProgObj.btn_rec_nav == 1) && _foundset
	
	_buttonbarviewerElements.btn_switch_tab.enabled = _browse_nav && _tabProgObj['form'][0][3] && _tabProgObj['form'][1][3] // if there is a detail and table view
	
	//MAVariazione	if nobuttonbar hide the button bar
	if (_tabProgObj['nobuttonbar'])
		forms[globals.nav.viewer_form]['ButtonBarHide'](_tabProgObj['nobuttonbar'])
	else
		forms[globals.nav.viewer_form]['ButtonBarHide'](0)
}

/**
 *	To the status of the navigationbar
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 * @param {String}	_status the status you want to set the bar in (browse edit add delete)
 * @return  none
 *
 * @properties={typeid:24,uuid:"d92fb9e4-5e4f-4927-bfb0-8c2b7036e336"}
 */
function svy_nav_setNavigationBar(_status) {
	var _browse = (_status == 'edit' || _status == 'add' || _status == 'find' || _status == 'required_fields') ? false : true

	forms.svy_nav_fr_tree_top.elements.btn_his_back.enabled = _browse && (globals.nav.stack_position != 0)
	forms.svy_nav_fr_tree_top.elements.btn_his_forw.enabled = _browse && (! (globals.nav.stack.length == globals.nav.stack_position + 1))
	forms.svy_nav_fr_tree_top.elements.btn_shortcut.enabled = _browse
	forms.svy_nav_fr_tree_top.elements.btn_bookmark.enabled = _browse
	forms.svy_nav_fr_viewCompareTab.setViewButtonsEnabled(_browse)
	forms.svy_nav_fr_tree_top.elements.btn_print.enabled = _browse
	forms.svy_nav_fr_tree_top.elements.tree.enabled = _browse
	forms.svy_nav_fr_bottom_bkmk_short.controller.enabled = _browse
	if(globals.nav_show_open_tabs)
	{
		forms.svy_nav_fr_openTabs.controller.enabled = _browse
	}
	if (forms.svy_nav_fr_bottom_bkmk_short.elements.tab_bookmark.visible && _browse)// bookmarks are visibele
	{
		if (globals.nav.bookmarks.length > 0) {
			forms.svy_nav_fr_bookmarks.elements.btnshortcutMoveUp0.enabled = false
			forms.svy_nav_fr_bookmarks.elements['btnshortcutMoveDown' + (globals.nav.bookmarks.length - 1)].enabled = false
		}
	} else if (forms.svy_nav_fr_bottom_bkmk_short.elements.tab_favorites.visible && _browse)// shortcuts are visibele
	{
		//if (globals.nav.shortcuts.length > 0) {
		//	forms.svy_nav_fr_shortcuts.elements.btnshortcutMoveUp0.enabled = false
		//	forms.svy_nav_fr_shortcuts.elements['btnshortcutMoveDown' + (globals.nav.shortcuts.length - 1)].enabled = false
		//}
	}
}

/**
 *	Create shortcut last open record
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 *
 * @properties={typeid:24,uuid:"7c4b7ec6-fff4-4c7a-a8ee-5b0bbf539c58"}
 */
function svy_nav_lastOpenRecordCreate() {

	//Returns an array containing the names of the identifier (PK) column(s)
	var jsTable = databaseManager.getTable(globals.nav.program[globals.nav_program_name].server_name, globals.nav.program[globals.nav_program_name].table_name)

	if (!jsTable) return // there is no table attached to the form

	var i
		// save the recordids
	var _record_names = jsTable.getRowIdentifierColumnNames()
	var _record_ids = new Array() //saving array directly to database field doesn't work
	var _record_types = new Array()
//	var _program_info = globals.nav.program[globals.nav_program_name].description
//	var _record_info = forms[globals.nav.form_view_01][globals.nav.program[globals.nav_program_name].display_field_header]

	for (i = 0; i < _record_names.length; i++) {
		// get the record id values
		_record_ids[i] = forms[globals.nav.form_view_01][_record_names[i]]

		// get the column types
		var _jsColumn = jsTable.getColumn(_record_names[i])
		_record_types[i] = _jsColumn.getTypeAsString()

	}

	//look if already in array_ if delete from array
	//for (i = 0; i < globals.nav.recordHistory.length; i++) {
	//	if (globals.svy_utl_compareArrays(globals.nav.recordHistory[i].record_ids, _record_ids) &&
	//	globals.nav.recordHistory[i].program == globals.nav_program_name
	//	) {

//			if ( (i + 1) == globals.nav.recordHistory.length) {
	//			return
		//	}

			//object already in Array so delete it
			//globals.nav.recordHistory = globals.nav.recordHistory.slice(0, i).concat(globals.nav.recordHistory.slice(i + 1));
			//i--;
	//	}
//	}

	//if (globals.nav.recordHistory.length >= 7) {
		//remove first entry array can only be 7 long
	//	globals.nav.recordHistory.shift()

	//}

	//put in the array at the end
	//var _l = globals.nav.recordHistory.length
	//globals.nav.recordHistory[_l] = new Object()
	//globals.nav.recordHistory[_l].record_names = _record_names
	//globals.nav.recordHistory[_l].record_ids = _record_ids
//	globals.nav.recordHistory[_l].record_types = _record_types
///	globals.nav.recordHistory[_l].program = globals.nav_program_name
///	globals.nav.recordHistory[_l].program_info = _program_info
///	globals.nav.recordHistory[_l].record_info = _record_info
///	globals.nav.recordHistory[_l].view = globals.nav.program[globals.nav_program_name].view

	// rePaint record History if visible
//	if (forms.svy_nav_fr_bottom_bkmk_short.elements.tab_record_history.visible) {
	//	// load the record History to see the new recordHistory
	//	forms.svy_nav_fr_recordHistory.loadRecordHistory()
	//}

}

/**
 *	To use by deeplinking and setting the owner_id
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 *
 * @properties={typeid:24,uuid:"79d17d46-535b-492e-bbfe-3bf8ccd0c74a"}
 */
function svy_nav_deeplink() {
	//	If you now open a client with an url like this: http://<server_ip:port>/servoy-client/sampleuse_navigation.jnlp?method=svy_nav_deeplink&argument=<uuid>
	//then the <uuid> that is passed will be the owner_id for that session. (for webclient the url will look like this:
	//http://<server_ip:port>/servoy-webclient/ss/s/sampleuse_navigation/m/svy_nav_deeplink/a/<uuid>)
	
}

/**
 *	To init the functions of the nav object.
 *
 * @author Sanneke Aleman
 * @since 2009-09-24
 *
 * @properties={typeid:24,uuid:"2be9468c-4a5b-4bd3-b57b-45095e81f7cc"}
 */
function svy_nav_init_functions() {
	globals.nav.getTabProgram = function() {
		var _program = globals.nav_program_name
		return globals.nav.program[_program].tab[globals.nav.program[_program].tab.selected].program_name
	}

	globals.nav.getTabRelation = function() {
		return globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].relation
	}

	globals.nav.getTabSelected = function() {
		return globals.nav.program[globals.nav_program_name].tab.selected
	}

	globals.nav.getTabForm = function() {
		return globals.nav.program[globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].program_name].form[globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].form_type][2]
	}

	globals.nav.getTemplate = function() {
		var _template
		if (globals.nav.program[globals.nav_program_name].tab.length > 0) {
			_template = globals.nav.template_types[globals.nav.program[globals.nav_program_name].view]
		} else {
			_template = globals.nav.template_types_notabs[globals.nav.program[globals.nav_program_name].view]
		}
		return _template
	}
	
	globals.nav.viewHasTable = function() {
		var _template = globals.nav.getTemplate()
		return forms[_template].hasTable()
		
	}
	
	globals.nav.getCurrentFormName = function() {
		return globals.nav.form_view_01
	}
	
	globals.nav.getCurrentTabFormName = function() {
		return globals.nav.form_view_02
	}
	
	globals.nav.viewHasDetail = function() {
		var _template = globals.nav.getTemplate()
		return forms[_template].hasDetail()
	}

}

/**
 * @properties={typeid:24,uuid:"63beb2bf-4fe3-45ac-a3f6-8b95aaac647a"}
 */
function svy_nav_documentation() {
	/*
	 *
	 *
	 * The Navigation object.

	 globals.nav
	 bookmarks
	 Array containing an object for each bookmark.
	 The object contains Bookmark_id, program and records_ids.
	 For example: globals.nav.bookmarks.1.program
	 browser_buttonbar
	 Name of the browserbuttonbar.
	 browser_form
	 Name of the browser form.
	 default_edit_template
	 The template where the navigation will go for edits.
	 form_view_01
	 The form that is currently showing in the top view, view 01
	 form_view_02
	 The form that is currently showing in the bottom view, view 02
	 history (Object)
	 foundset (array)		=	The filter for the related foundset
	 foundset_related_form 	=	The related foundset form
	 foundset_related_text	=	The related text for in the toolbar
	 history_max_entries
	 Max entries for the history so the history doesn't become to big.
	 keys
	 Security keys for all the rights that the logged in user has.
	 lastProgram
	 Last program that the user has visited.
	 lastView
	 Last view that the user has visited.
	 mode
	 Mode that the navigation is in, possible: edit, browse, find, add.
	 new_record_filter
	 Fields that have to be entered if a related record is created.
	 noHistory
	 Boolean, can be set to 1 if no history entry is needed while navigating, for example if you 	navigate in the history because otherwise you would get double entry's

	 program
	 Object containing an object for each program.
	 In each of those program-objects the following:
	 add_mode				= 	Has user right for adding records in this program.
	 base_form_name			= 	Has form name of the program.
	 btn_all_records			= 	Has user right for the all records button.
	 btn_export				=	Has user right for the export button.
	 btn_help				= 	Has user right for the help button.
	 btn_method				= 	Has user right for the methods button.
	 btn_print				= 	Has user right for the print button.
	 btn_rec_nav 			= 	Has user right for the buttons of the record navigation.
	 btn_record_information 	= 	Has user right for the record information button.
	 btn_resettblheader		= 	Has user right for the reset table headers button.
	 btn_search				= 	Has user right for the search button.
	 btn_search_prop			= 	Has user right for the search properties button.
	 btn_sort				= 	Has user right for the sort button.
	 delete_mode  			= 	Has user right to delete records in this program.
	 description				=	The description of the program for the end user.
	 display_field_header	=	The field that will be displayed in the header.
	 divider_height			= 	Height of the divider.
	 divider_locked			= 	Divider locked, user can not change it’s position.
	 duplicate_mode			= 	Has user right to duplicate records in this program.
	 filter (array)			= 	The filter for the data of the program.
	 filter_field_name	=	The field to filter on.
	 filter_field_operator =	Operator to filter with.
	 filter_value		=	Value to filter with.
	 form					= 	Object with information which forms are available.
	 method (array)			= 	Method menu of the program.
	 in_browse			=	Show method in menu if user is in browse.
	 in_edit				=	Show method in menu if user is in edit.
	 label				= 	Label shown to the user in menu.
	 method				= 	Method that the menu will call.
	 nav_popmenu_id		= 	Id of the popmenu in database.
	 parent_popmenu_id   = 	Id of the parentpopmenu in database.
	 noreadonly				=	program doesn't go in read only.
	 path					=	Path of the program in the tree.
	 program_image			= 	Image of the program.
	 record_locking			=	When record is edited record should be locked.
	 report	Array			=	Report menu for program.
	 in_browse			=	Show report in menu if user is in browse.
	 in_edit				=	Show report in menu if user is in edit.
	 label				= 	Label shown to the user in menu.
	 method				= 	Method that the menu will call.
	 nav_popmenu_id		= 	Id of the popmenu in database.
	 parent_popmenu_id   = 	Id of the parentpopmenu in database.
	 server_name				= 	Servername of the program forms.
	 sort_value				= 	Value where the program should sort on by default.
	 tab.selected			= 	Tab that is selected.
	 tab (array)				=	Array with the tabs of a program.
	 add_mode			=	Addmode for the tab.
	 base_form_name		= 	Base form name of the tab.
	 delete_mode			=	Delete mode for the tab.
	 description			=	Description of the program on the tab.
	 edit_on_tab			= 	Edit on tab, no navigation.
	 form_type			=	Type of the form on tab.
	 program_name		= 	Name of the program on tab.
	 relation			=	The relation between the program and the tab program.
	 relation_filter (array)	=	Relation filter.
	 form_key		=	From key column from the program.
	 to_key			= 	To key column to the tab program.
	 update_mode			= 	Update mode of the tab.
	 table_name				= 	Table name of the forms of the program.
	 template				=	Object with information witch templates are available.
	 update_mode				=	Has user right to update records in this program.
	 view					=	Current view of the program.
	 recordHistory (array)		= 	Object for the tab record history.
	 program					= 	Program name.
	 program_info			= 	Info about the selected record, program description.
	 record_ids				= 	Record column ids.
	 record_info				= 	Record info.
	 record_names			=	Record column names.
	 record_types			=	Record column types.
	 related_form				=	Only used if the framework is in a related view.
	 related_text				=	Header text of the related view.
	 shortcuts (array)			=	Array with the information of the shortcuts.
	 program					=	Program.
	 shortcut_id				=	Id of the shortcut.
	 stack (array)				= 	Stack of the history of the program.
	 form					=	Form that the user was on in history.
	 foundset_related_form	=	Foundset of the related form.
	 foundset_related_text	=	Related text.
	 foundsetfilter			=	Foundset filter.
	 program					=	Program.
	 view					=	View that the program was in.
	 stack_position				= 	Position of the framework in the history stack.
	 switchedForEdit				=	Has the navigation switched for edit.
	 template_types				= 	The template type.
	 template_types_notabs		=	The template types used when there are no tabs.
	 viewer_buttonbar			=	Formname of the viewer buttonbar.
	 viewer_form					=	Formname of the viewer.

	 */

}

/**
 *	On click open the program from the shortcut, by using information in the object that is build in loadShortcuts
 *
 * @author Sanneke Aleman
 * @since 2008-05-24
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"20d4344d-a086-40b7-a1cb-db0c64afef01"}
 */
function svy_nav_shortcut_goto(_event) {
	if (globals.nav.mode != 'browse') return

	var _button = _event.getElementName();
	// get the programname
	globals.nav.openNewTab = 1
	var _program
	if(utils.stringPatternCount(_button,'shortcutLabel')>0) //webclient is used
	{
		_program = globals.nav.shortcuts[utils.stringReplace(_button, 'shortcutLabel', '')].program
	}
	else
	{
		_program = globals.nav.shortcuts[utils.stringReplace(_button, 'shortcut', '')].program
	}
	var _template = globals.nav.template_types[globals.nav.program[_program].view]
	var _form = globals.nav.program[_program].form[forms[_template].has1()][2]
		//show the program
	globals.svy_nav_showForm(_form, _program);

}

/**
 *	To set the tabs
 *
 * @author Sanneke Aleman
 * @since 2009-09-14 
 * @param {String}	_template name of the template
 * @param {{tab:Array}} _progObj Object of the program
 * @param {Number} [_forcedTabIndex] 
 * 
 * @return {Array<String>} array with the selected form and program
 *
 * @properties={typeid:24,uuid:"f7b0b4ea-a693-4b69-9926-9be49745c5ce"}
 */
function svy_nav_setTabs(_template, _progObj, _forcedTabIndex) {
	var _return = [];

	// if there are tabs set tabs
	if (forms[_template].hasTab()) {

		//set view 2 with the form
		var _tab_form = globals.nav_program_name + '_tab' // depending on the table the right tab form schould be set
		if (!forms[_tab_form]) // if the form doesn't exist print a warning to output and exit the method.
		{
			return null;
		}
		forms[globals.nav.viewer_form].elements['form_view_02'].removeAllTabs()
		forms[globals.nav.viewer_form].elements['form_view_02'].addTab(forms[_tab_form])

		//set the tabs on view 2
		var _tab_relation = null
		var _form_at_tab
		forms[_tab_form].elements['tabs'].removeAllTabs()

		for (var i = 1; i < _progObj.tab.length; i++) {
			_form_at_tab = globals.nav.program[_progObj.tab[i].program_name].form[_progObj.tab[i].form_type][2]

			//if form doesn't exist create it, it can happen that table views don't exist but are created dynamicly
			if (!forms[_form_at_tab]) {
				globals.svy_nav_createDefaultTableView(_progObj.tab[i].program_name, _form_at_tab)
			}
			/** @type {{program_image:String}} */
			var _progObjTab = globals.nav.program[_progObj.tab[i].program_name]
			/** @type {{add_mode:String, description:String,relation:String,program_name:String}} */
			var _tabObj = _progObj.tab[i]
			var _imageUrl
			if (_progObjTab.program_image) {
				_imageUrl = 'media:///' + _progObjTab.program_image
			} else {
				_imageUrl = null
			}
			// set the form on the tab
			if (_tabObj.relation) {
				_tab_relation = _tabObj.relation
				forms[_tab_form].elements['tabs'].addTab(forms[_form_at_tab], '', _tabObj.description, null, _imageUrl, null, null, _tab_relation)
			} else {
				forms[_tab_form].elements['tabs'].addTab(forms[_form_at_tab], '', _tabObj.description, null, _imageUrl, null, null, null)
			}

			// if the tab is the selected tab
			var currSelectedTab = 1;
			if(_forcedTabIndex) 
				currSelectedTab = _forcedTabIndex;
			else if(_progObj && _progObj['tab'].selected)
				currSelectedTab = _progObj['tab'].selected; 
			if (i == currSelectedTab) {
			//MAVariazione(just moved upper the previous one)
				forms[_tab_form].elements['tabs']['tabIndex'] = i
				// set the buttons of the tab form
//				forms[globals.nav.viewer_buttonbar].elements['btn_duplicate']['enabled'] = (_tabObj.add_mode == 1) && (globals.nav.mode != 'edit' && globals.nav.mode != 'add' && globals.nav.mode != 'find')
//				forms[globals.nav.viewer_buttonbar].elements['btn_new']['enabled'] = (_tabObj.add_mode == 1) && (globals.nav.mode != 'edit' && globals.nav.mode != 'add' && globals.nav.mode != 'find')
				globals.svy_nav_setViewerBar(globals.nav.mode,_form_at_tab)
				globals.nav.form_view_02 = _form_at_tab
				// forms[_tab_form].elements['tabs']['tabIndex'] = _progObj['tab'].selected

				// sort
				_return[0] = _form_at_tab
				_return[1] = _tabObj.program_name

			}
		}
	}
	return _return
}

/**
 * Method that calls the function on the svy_nav_base form
 * @author Sanneke Aleman
 * @since 2009-11-18
 * @param {JSEvent} _event the event that triggered the action
 * @param {String}	_function name of the function that should be called on the svy_nav_base form
 * @properties={typeid:24,uuid:"0BF1BA7A-91E6-40D9-BC7D-9021D389EA47"}
 * @AllowToRunInFind
 */
function svy_nav_dc_onClick(_event, _function) {
	
	var _triggerForm
		
	//MAVariazione : se non è in edit sulla particolare form della parte viewer si comporta come prima
	if (!_editOnViewer) {

		_triggerForm = _event.getFormName()
		//controller.search()
		if (_triggerForm == 'svy_nav_fr_buttonbar_browser') {
			globals.nav.activeView = 1
			forms[globals.nav.form_view_01][_function](_event, _triggerForm)
		} else {
			globals.nav.activeView = 2
			forms[globals.nav.form_view_02][_function](_event, _triggerForm)
		}
	}
	else {
		
		_triggerForm = 'svy_nav_fr_buttonBar_viewer'
        	
		globals.nav.activeView = 2
		
		if(_forcedFormOnViewer)
		   forms[globals.nav.form_view_02][_function](_event, _triggerForm, _forcedFormOnViewer)
	    else
		   forms[globals.nav.form_view_02][_function](_event, _triggerForm)
	
	}
}

/**
 * @AllowToRunInFind
 * 
 * @author Sanneke Aleman
 * @since 2009-11-18
 * @param {JSEvent} _event the event that triggered the action
 * @param {String}	_function name of the function that should be called on the svy_nav_base form
 *
 * @properties={typeid:24,uuid:"DDA341D7-34B2-4B06-8099-97EF52A5C30A"}
 */
function svy_nav_dc_onRightClick(_event, _function) {
	var _triggerForm = _event.getFormName()
		//controller.search()
	if (_triggerForm == 'svy_nav_fr_buttonbar_browser') {
		globals.nav.activeView = 1
		forms[globals.nav.form_view_01][_function](_event, _triggerForm)
	} else {
		globals.nav.activeView = 2
		forms[globals.nav.form_view_02][_function](_event, _triggerForm)
	}

}

/**
 * Method that selects the right record in the menu configurator
 * @author Sanneke Aleman
 * @since 2010-02-18
 * @param {Number} _menu_item_id the id of the menu item
 * @properties={typeid:24,uuid:"76228E33-44DE-457E-9633-4B8747D08126"}
 * @AllowToRunInFind
 */
function svy_nav_c_nodeSelected(_menu_item_id) {

	/** @type {JSFoundset<db:/svy_framework/nav_menu_items>} */
	var _foundset = databaseManager.getFoundSet(forms.svy_nav_c_menu_item_dtl.controller.getDataSource())

	if (_foundset.find()) {
		_foundset.menu_item_id = _menu_item_id
		_foundset.search()
	}
	forms.svy_nav_c_menu_item_dtl.controller.loadRecords(_foundset)
}

///**
// * Error handling method
// * @author Sanneke Aleman
// * @since 2010-02-18
// * @param {Exception} e
// *
// * @properties={typeid:24,uuid:"29E39484-4E1A-4B58-80C3-21886DD6B42D"}
// */
//function svy_nav_onError(e) {
//
//	application.output("Exception Object: " + e)
//	application.output("MSG: " + e.getMessage())
//	
//	if(/^User has no menu/.test(e.getMessage()))
//	{
//		return false	
//	}
//
//	if (e instanceof ServoyException) {
//		/** @type {ServoyException} */
//		var servoyException = e;
//		application.output("is a ServoyException")
//		application.output("Errorcode: " + servoyException.getErrorCode())
//		var trace = "";
////		if (e.getScriptStackTrace) trace = servoyException.getScriptStackTrace();
////		else 
//		if (servoyException.getStackTrace) trace = servoyException.getStackTrace();
//		if (servoyException.getErrorCode() == ServoyException.SAVE_FAILED) {
//			plugins.dialogs.showErrorDialog('Error', 'It seems you did not fill in a required field', 'OK');
//			//Get the failed records after a save
//			var array = databaseManager.getFailedRecords()
//			for (var i = 0; i < array.length; i++) {
//				var record = array[i];
//				application.output(record.exception);
//				if (record.exception instanceof DataException) {
//					/** @type {DataException} */
//					var dataException = record.exception;
//					application.output('SQL: ' + dataException.getSQL())
//					application.output('SQLState: ' + dataException.getSQLState())
//					application.output('VendorErrorCode: ' + dataException.getVendorErrorCode())
//				}
//			}
//			return false
//		}
//		
//		if (servoyException.getErrorCode() == ServoyException.NO_PARENT_DELETE_WITH_RELATED_RECORDS) {
//			globals.svy_mod_dialogs_global_showErrorDialog(i18n.getI18NMessage('svy.fr.dlg.error'), i18n.getI18NMessage('svy.fr.dlg.noParentDeleteWithRelatedRecords'), 'OK');
//			if (databaseManager.hasTransaction()) databaseManager.rollbackTransaction();
//			if (databaseManager.hasLocks()) databaseManager.releaseAllLocks();
//			return false;
//		}
//		
//		if (servoyException.getErrorCode() == ServoyException.NO_RELATED_CREATE_ACCESS) {
//			globals.svy_mod_dialogs_global_showErrorDialog(i18n.getI18NMessage('svy.fr.dlg.error'), i18n.getI18NMessage('svy.fr.dlg.noRelatedCreateAccess'), 'OK');
//			if (databaseManager.hasTransaction()) databaseManager.rollbackTransaction();
//			if (databaseManager.hasLocks()) databaseManager.releaseAllLocks();
//			return false;
//		}
//	}
//	//if returns false or no return, error is not reported to client; if returns true error is reported
//	//by default error report means logging the error, in smart client an error dialog will also show up
//	return true
//}

/**
 * Method that sets the shortkeys that are available for a user by functions
 * @author Sanneke Aleman
 * @since 2010-03-03
 * @param {Array} _function_array array with the functions that a user has rights to.
 * @properties={typeid:24,uuid:"300E8D16-8E32-4E1A-BE65-B18F95C3EE9F"}
 */
function svy_nav_setShortKeys(_function_array) {

	/** @type {JSFoundset<db:/svy_framework/nav_shortkey>} */
	var _foundset = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_shortkey')
	var _rec
	var _shortcut

	//security check
	var _function_string = _function_array.join(",")
	if(_function_string == '')_function_string = '-1'
	var _query = "SELECT s.shortkey_id\
					FROM nav_shortkey s\
					WHERE s.function_id IN (" + _function_string + ")";
//	var maxReturnedRows = 10000
//	var _dataset = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, null, maxReturnedRows);
	_foundset.loadRecords(_query)

	globals.nav.shortkeys = new Object()

	for (var i = 1; i <= _foundset.getSize(); i++) {
		_rec = _foundset.getRecord(i)
		_shortcut = ''
		if (databaseManager.hasRecords(_rec.nav_shortkey_to_nav_function)) {
			if (_rec.flag_control) {
				_shortcut = _shortcut ? _shortcut + " control" : "control";
			}
			if (_rec.flag_shift) {
				_shortcut = _shortcut ? _shortcut + " shift" : "shift";
			}
			if (_rec.flag_alt) {
				_shortcut = _shortcut ? _shortcut + " alt" : "alt";
			}
			_shortcut = _shortcut ? _shortcut + " " + _rec.shortkey : _rec.shortkey;

			//set method and arguments in a array so that the callback method nows with method to call with which argument
			globals.nav.shortkeys[_shortcut] = new Object()
			globals.nav.shortkeys[_shortcut].method = _rec.nav_shortkey_to_nav_function.method
			globals.nav.shortkeys[_shortcut].arg = new Array()
			globals.nav.shortkeys[_shortcut].argtypes = new Array()
			_foundset.nav_shortkey_to_nav_function.nav_function_to_nav_function_arguments.sort('sort_order asc')
			for (var j = 1; j <= _rec.nav_shortkey_to_nav_function.nav_function_to_nav_function_arguments.getSize(); j++) {
				var _arg = _rec.nav_shortkey_to_nav_function.nav_function_to_nav_function_arguments.getRecord(j)
				globals.nav.shortkeys[_shortcut].arg[j - 1] = _arg.argument
				globals.nav.shortkeys[_shortcut].argtypes[j - 1] = _arg.arg_type
			}

			plugins.window.createShortcut(_shortcut, globals.svy_nav_callBackShortkeys)
		}
	}
}

/**
 * Method that is called by all the shortkeys to handle arguments
 * @author Sanneke Aleman
 * @since 2010-03-03
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"9637A11A-13A8-49CB-ACF6-86D80FA5E88D"}
 */
function svy_nav_callBackShortkeys(_event) {
	var _shortkey = _event.getType()
	/** @type {{arg:Array, method:String}} */
	var _shk_obj = globals.nav.shortkeys[_shortkey]
	if (!_shk_obj) return

	var _methodcall = _shk_obj.method + '('

	for (var i = 0; i < _shk_obj.arg.length; i++) {

		if (i != 0) {
			_methodcall += ', '
		}

		if (_shk_obj['argtypes'][i] == 1) {
			_methodcall += '"' + _shk_obj.arg[i] + '"'
		} else if (_shk_obj['argtypes'][i] == 2) {
			_methodcall += '"' + globals[_shk_obj.arg[i]] + '"'
		}
	}
	_methodcall += ')'

	eval(_methodcall)
}

/**
 *
 * Method that looks up all the functions that are available for the logged in user
 * @author Sanneke Aleman
 * @since 2010-03-03
 * @return return the function id, so they can be filtered in the menu
 * @properties={typeid:24,uuid:"46418AB3-DA49-4106-87A2-B08B3C8AD65C"}
 */
function svy_nav_get_functions() {
	var _query = 'SELECT f.function_id\
					FROM  nav_function f\
					WHERE ( 	f.security_key_id is null \
						OR	f.security_key_id IN (' + globals.nav.keys + '))'
	var maxReturnedRows = 10000
	var _dataset = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, null, maxReturnedRows);
	var _function_array = _dataset.getColumnAsArray(1)
	return _function_array
}

/**
 * Method that places elements on a form
 * @author Sanneke Aleman
 * @since 2010-03-03
 * @param {JSForm} _jsForm the form where you want to place elements on
 * @param {JSFoundset<db:/svy_framework/sec_user_table_properties>} _foundset the foundset of elements you want to place on the form
 * @param {Array} [_fixedElements] fixed elements of the design-time form which should be generated
 * 
 * @properties={typeid:24,uuid:"D7CF0A2F-D6A5-4E00-8F14-CFD8EA50337F"}
 */
function svy_nav_placeElementsOnForm(_jsForm, _foundset, _fixedElements) {
	var _start_pos_x = 0
	var _start_pos_y = 0
	if(_jsForm.getHeaderPart()) _start_pos_y += _jsForm.getHeaderPart().height
	if(_jsForm.getTitleHeaderPart()) _start_pos_y += _jsForm.getTitleHeaderPart().height
	
	// check for fixed elements at the beginning and place them on the form
	if (_fixedElements) {
		for (var j = 0; j < _fixedElements.length; j++) {
			if (_fixedElements[j][2] == false) {
				// element should be fixed at the beginning
				var _fixedElementStart = solutionModel.cloneComponent(_fixedElements[j][0].name, _fixedElements[j][0], _jsForm);
				_fixedElementStart.x = _start_pos_x;
				_fixedElementStart.y = _start_pos_y;
			
				if (_fixedElements[j][1]) {
					// place the header of the element
					var _fixedHeaderStart = solutionModel.cloneComponent(_fixedElements[j][1].name, _fixedElements[j][1], _jsForm);
					_fixedHeaderStart.x = _start_pos_x;
					_fixedHeaderStart.y = _start_pos_y;
				}
				
				_start_pos_x += _fixedElementStart.width;
			}
		}
	}
	
	var _endPositionX = 0
	for (var i = 1; i <= _foundset.getSize(); i++) {
		var _rec = _foundset.getRecord(i)
		if (_jsForm.getComponent(_rec.element_name)) continue // element already exist on form
		if (databaseManager.hasRecords(_rec.sec_user_table_properties_to_nav_program_fields)) {
			var _rec_pf = _rec.sec_user_table_properties_to_nav_program_fields.getRecord(1)

			var _name = _rec.element_name

			if ( (!_rec.location_x) && (!_rec.location_y)) {
				_rec.location_x = 10 + 200
				_rec.location_y = 20 * i + _start_pos_y
				_rec.height = 20
				_rec.width = 200 
				if(_rec_pf.field_width)
				{
					_rec.width = _rec_pf.field_width
				}

			}
			
			var _field = _jsForm.newField(_rec_pf.dataprovider,
				JSField[_rec_pf.display_type],
				_rec.location_x + _start_pos_x,
				_rec.location_y,
				_rec.width,
				_rec.height)
			_field.name = _name
			_field.styleClass = 'table'
			_field.anchors = SM_ANCHOR.ALL

			if (_rec_pf.valuelistname) {
				_field.valuelist = solutionModel.getValueList(_rec_pf.valuelistname)
			}
			var _label = _jsForm.newLabel(_rec_pf.label, _rec.location_x + _start_pos_x, _rec.location_y, _rec.width, _rec.height)
			_label.name = 'lbl_' + _rec.element_name
			_label.labelFor = _name
			_label.styleClass = 'table'
		}
		
		_endPositionX = _rec.location_x + _start_pos_x + _rec.width;
	}
	
	// check for fixed elements at the end and place them on the form
	if (_fixedElements) {
		for (var k = 0; k < _fixedElements.length; k++) {
			if (_fixedElements[k][2] == true) {
				// element should be fixed at the end
				var _fixedElementEnd = solutionModel.cloneComponent(_fixedElements[k][0].name, _fixedElements[k][0], _jsForm);
				_fixedElementEnd.x = _endPositionX;
				_fixedElementEnd.y = _start_pos_y;
			
				if (_fixedElements[k][1]) {
					// place the header of the element
					var _fixedHeaderEnd = solutionModel.cloneComponent(_fixedElements[k][1].name, _fixedElements[k][1], _jsForm);
					_fixedHeaderEnd.x = _endPositionX;
					_fixedHeaderEnd.y = _start_pos_y;
				}
				
				_endPositionX += _fixedElementEnd.width;
			}
		}
	}
	
	forms[_jsForm.name].controller.recreateUI()
}

/**
 * Method that creates a table view
 * @author Sanneke Aleman
 * @since 2010-03-03
 * @param {JSEvent} [_event]
 * @param {Number} _tableViewID user_table_view_id
 * @param {Boolean} _applyNewFoundset whether or not a new foundset should be applied
 * @properties={typeid:24,uuid:"AF5763CF-2B76-4BFB-A464-16ABC8B594E2"}
 * @AllowToRunInFind
 */
function svy_nav_createTableView(_event, _tableViewID, _applyNewFoundset) {
	/** @type {JSFoundset<db:/svy_framework/sec_user_table_properties>} */
	var _foundset = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_table_properties')
	_foundset.addFoundSetFilterParam('user_table_view_id', '=', _tableViewID)
	_foundset.addFoundSetFilterParam('user_id', '=', globals.svy_sec_lgn_user_id);
	_foundset.addFoundSetFilterParam('organization_id', '=', globals.svy_sec_lgn_organization_id);
	_foundset.loadAllRecords();

	if (_foundset.getSize() == 0) {
		application.output('Could not create view, no data found');
		return;
	}

	var _base = globals.nav.program[globals.nav_program_name].base_form_name;
	var _form = _base + '_tbl';
	
	// get all the fixed elements which should be placed on the generated table view
	var _fixedElementsTable = new Array();
	_fixedElementsTable = globals.svy_nav_getFixedElementsTable(_form);
	
	var _jsForm = solutionModel.getForm(_form);
	var _bodyTop = 0;
	if (_jsForm.getHeaderPart()) _bodyTop += _jsForm.getHeaderPart().height;
	if (_jsForm.getTitleHeaderPart()) _bodyTop += _jsForm.getTitleHeaderPart().height;
	var _bodyBottom = _jsForm.getBodyPart().height;
	
	var _components = _jsForm.getComponents();
	for (var i = 0; i < _components.length; i++) {
		if (_components[i].y >= _bodyTop && _components[i].y + _components[i].height <= _bodyBottom) {
			_jsForm.removeComponent(_components[i].name);
		}
	}
	
	globals.svy_nav_placeElementsOnForm(_jsForm, _foundset, _fixedElementsTable);

	forms[_form].controller.recreateUI()
	
	/** @type {JSFoundset<db:/svy_framework/nav_user_table_view>} */
	var _foundsetTableView = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_user_table_view');
	_foundsetTableView.addFoundSetFilterParam('user_table_view_id', '=', _tableViewID);
	_foundsetTableView.addFoundSetFilterParam('user_id', '=', globals.svy_sec_lgn_user_id);
	_foundsetTableView.addFoundSetFilterParam('organization_id', '=', globals.svy_sec_lgn_organization_id);
	_foundsetTableView.loadAllRecords();
	
	
	if (_applyNewFoundset) {
		if (_foundsetTableView.search_type == 'R') {
			globals.svy_sea_restoreSearch(_foundsetTableView.search_id);
		} else if (_foundsetTableView.search_type == 'A') {
			globals.svy_sea_restoreAdvancedSearch(_foundsetTableView.search_id);
		} else {
			globals.nav.activeView = 1
			forms[globals.nav.form_view_01].dc_loadAll();
		}
	}
	
	if(_event) {
		globals.svy_mod_closeForm(_event);
	}
}

/**
 * Method that creates a default table view
 * @author Sanneke Aleman
 * @since 2010-03-03
 * @param {String} _program program name
 * @param {String} _form form name
 * @properties={typeid:24,uuid:"E3C1AABD-CF67-4EF7-89F7-E8DC475D7237"}
 */
function svy_nav_createDefaultTableView(_program, _form) {
	globals.nav.program[_program].table_created = 1

	//get an id
	/** @type {JSFoundset<db:/svy_framework/nav_user_table_view>} */
	var _foundset = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_user_table_view')
	_foundset.addFoundSetFilterParam('program_name', '=', _program)
	_foundset.addFoundSetFilterParam('flag_system', '=', 1)
	_foundset.addFoundSetFilterParam('user_id', '=', globals.svy_sec_lgn_user_id);
	_foundset.addFoundSetFilterParam('organization_id', '=', globals.svy_sec_lgn_organization_id);

	_foundset.loadAllRecords()

	if (_foundset.getSize() == 0) {//user doesn't have a view yet
		//create the view
		_foundset.newRecord()
		_foundset.program_name = _program
		_foundset.table_name = globals.nav.program[_program].table_name
		_foundset.server_name = globals.nav.program[_program].server_name
		_foundset.flag_system = 1
		_foundset.user_id = globals.svy_sec_lgn_user_id;
		_foundset.organization_id = globals.svy_sec_lgn_organization_id;
		_foundset.name = 'System'

		/** @type {JSFoundset<db:/svy_framework/sec_user_table_properties>} */
		var _foundset_prop = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_table_properties')

//		var _rec_field

		for (var i = 1; i <= _to_nav_program.nav_program_to_nav_program_fields$default.getSize(); i++) {
			var _rec = _to_nav_program.nav_program_to_nav_program_fields$default.getRecord(i)
			_foundset_prop.newRecord()
			_foundset_prop.program_field_id = _rec.program_field_id
			_foundset_prop.user_table_view_id = _foundset.user_table_view_id
			_foundset_prop.user_id = globals.svy_sec_lgn_user_id;
			_foundset_prop.organization_id = globals.svy_sec_lgn_organization_id;
			_foundset_prop.element_name = _rec.elementname
		}

	}

	var _user_table_view_id = _foundset.user_table_view_id
	//var _save = 
	databaseManager.saveData()

	//find the foundset with the properties of the elements
	_foundset_prop = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_table_properties')
	_foundset_prop.addFoundSetFilterParam('user_table_view_id', '=', _user_table_view_id)
	_foundset_prop.addFoundSetFilterParam('user_id', '=', globals.svy_sec_lgn_user_id);
	_foundset_prop.addFoundSetFilterParam('organization_id', '=', globals.svy_sec_lgn_organization_id);
	_foundset_prop.loadAllRecords()
	
	//create the form
	var _jsForm = solutionModel.newForm(_form, 'db:/'+globals.nav.program[_program].server_name+'/'+ globals.nav.program[_program].table_name, 'sampleuse_navigation', false, 800, 500)
	var _extend = 'svy_nav_base'
	var _base = globals.nav.program[_program].base_form_name
	if(forms[_base]) _extend = _base
	_jsForm.extendsForm = solutionModel.getForm(_extend)
	_jsForm.view = JSForm.LOCKED_TABLE_VIEW
	
	//place the fields on the form.
	globals.svy_nav_placeElementsOnForm(_jsForm, _foundset_prop)

}

/**
 * @properties={typeid:24,uuid:"959C3499-A965-468D-9934-B7367CCA778E"}
 * @AllowToRunInFind
 */
function svy_nav_postLogin(_rec) {
	
	forms.svy_nav_fr_loading.setStatusBar(5)
	globals.user_id = globals.svy_sec_lgn_user_id;
	globals.svy_sec_username = security.getUserName()
	
	
	//show open tabs in the framework if the property is set.
	if(globals.svy_nav_getBooleanProperty('show_open_tabs'))
	{
		forms.svy_nav_fr_openTabs.showFormInFramework();
		globals.nav_show_open_tabs = 1
	}
	
	globals.owner_id = globals.svy_sec_owner_id = _rec.owner_id
 
	 //set valuelistOwner id
	 if(globals.vlt_owner_id) globals.vlt_owner_id = globals.svy_sec_owner_id
	
	//check if the password is expired
	globals.svy_sec_currentdate = new Date()
	if(!databaseManager.hasRecords(_rec.sec_user_to_sec_user_password$current_date)) //password is expired, show dialog to change password
	{		
		globals.svy_mod_showFormInDialog(forms.svy_sec_password_new_login);
	}
	
		//run onPostLogin-method when available
		if(globals['onPostLogin'])
		{
			//var _methodReturn = 
			globals['onPostLogin']()
			
		}
		globals.nav = new Object()
		
		_rec.times_wrong_login = null
		
		// set the i18n based on the owner/organization
		if (globals.svy_nav_setI18N) {
			globals.svy_nav_setI18N(globals.svy_sec_lgn_organization_id);
		}
	
		//set the security for the elements
		globals.svy_sec_getSecurityKeys()
		
		//MAVariazione - check keys before going on
		if(!globals.nav.keys || globals.nav.keys.length == 0)
			return false;
		
		globals.svy_sec_setElementRightsWithKeys()
		globals.svy_sec_setTableFilters();
		
		globals.svy_nav_init();
		forms.svy_nav_fr_loading.setStatusBar(100)
		
		return true;
	}

/**
 * @properties={typeid:24,uuid:"7D0B5E3F-4AA6-4D91-87DC-80A52FC496EC"}
 */
function svy_nav_showTabDetail() {
	
	//set view 2 with the form
	var _tab_form = globals.nav_program_name + '_tab' // depending on the table the right tab form schould be set
	if (!forms[_tab_form]) // if the form doesn't exist print a warning to output and exit the method.
	{
		return null;
	}
	
	var _progObj = globals.nav.program[globals.nav_program_name]
	
	//set the tabs on view 2
	var _tab_relation = null
	var _form_at_tab

	var _tabIndex = forms[_tab_form].elements['tabs'].tabIndex
	
	forms[_tab_form].elements['tabs'].removeTabAt(_tabIndex)
	_form_at_tab = globals.nav.program[_progObj['tab'][_tabIndex].program_name].form[0][2]

	//if form doesn't exist create it, it can happen that table views don't exist but are created dynamicly
	if (!forms[_form_at_tab]) {
		globals.svy_nav_createDefaultTableView(_progObj['tab'][_tabIndex].program_name, _form_at_tab)
	}

	/** @type {{program_image:String}} */
	var _progObjTab = globals.nav.program[_progObj['tab'][_tabIndex].program_name]
	/** @type {{relation:String,description:String}} */
	var _tabObj = _progObj['tab'][_tabIndex]
	var _imageUrl
	if (_progObjTab.program_image) {
		_imageUrl = 'media:///' + _progObjTab.program_image
	} else {
		_imageUrl = null
	}
	// set the form on the tab
	if (_tabObj.relation) {
		_tab_relation = _tabObj.relation
		forms[_tab_form].elements['tabs'].addTab(forms[_form_at_tab], '', _tabObj.description, null, _imageUrl, null, null, _tab_relation, (_tabIndex-1))
	} else {
		forms[_tab_form].elements['tabs'].addTab(forms[_form_at_tab], '', _tabObj.description, null, _imageUrl, null, null, null, (_tabIndex-1))
	}
	forms[_tab_form].elements['tabs']['tabIndex'] = _tabIndex
	globals.nav.form_view_02 = _form_at_tab
	return true
}

/**
 * @properties={typeid:24,uuid:"FD0A6E8D-007F-4C9C-8910-38638A435377"}
 */
function svy_nav_showTabTable() {
	//set view 2 with the form
	var _tab_form = globals.nav_program_name + '_tab' // depending on the table the right tab form schould be set
	if (!forms[_tab_form]) // if the form doesn't exist print a warning to output and exit the method.
	{
		return null;
	}
	
	var _progObj = globals.nav.program[globals.nav_program_name]
	
	//set the tabs on view 2
	var _tab_relation = null
	var _form_at_tab

	var _tabIndex = forms[_tab_form].elements['tabs']['tabIndex']

	forms[_tab_form].elements['tabs'].removeTabAt(_tabIndex)
	_form_at_tab = globals.nav.program[_progObj['tab'][_tabIndex].program_name].form[1][2]

	//if form doesn't exist create it, it can happen that table views don't exist but are created dynamicly
	if (!forms[_form_at_tab]) {
		globals.svy_nav_createDefaultTableView(_progObj['tab'][_tabIndex].program_name, _form_at_tab)
	}

	/** @type {{program_image:String}} */
	var _progObjTab = globals.nav.program[_progObj['tab'][_tabIndex].program_name]
	/** @type {{description:String,relation:String}} */
	var _tabObj = _progObj['tab'][_tabIndex]
	var _imageUrl
	if (_progObjTab.program_image) {
		_imageUrl = 'media:///' + _progObjTab.program_image
	} else {
		_imageUrl = null
	}
	// set the form on the tab
	if (_tabObj.relation) {
		_tab_relation = _tabObj.relation
		forms[_tab_form].elements['tabs'].addTab(forms[_form_at_tab], '', _tabObj.description, null, _imageUrl, null, null, _tab_relation, (_tabIndex-1))
	} else {
		forms[_tab_form].elements['tabs'].addTab(forms[_form_at_tab], '', _tabObj.description, null, _imageUrl, null, null, null, (_tabIndex-1))
	}
	forms[_tab_form].elements['tabs']['tabIndex'] = _tabIndex
	return true
}

/**
 * @properties={typeid:24,uuid:"82FE7A09-2056-4460-B544-813F69E73B8F"}
 */
function svy_nav_rec_prev(_event) {
	//function is used by the shortkeys
	forms[globals.nav.form_view_01].controller.setSelectedIndex(forms[globals.nav.form_view_01].controller.getSelectedIndex()-1)
}

/**
 * @properties={typeid:24,uuid:"A1D32F7C-E58C-451D-8C23-4D0395A47598"}
 */
function svy_nav_rec_next(_event) {
	//function is used by the shortkeys
	forms[globals.nav.form_view_01].controller.setSelectedIndex(forms[globals.nav.form_view_01].controller.getSelectedIndex()+1)
}

/**
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"C065EA78-CF55-48C5-A4EA-518E1F676AFB"}
 */
function svy_nav_rec_first(_event) {
	//function is used by the shortkeys
	forms[globals.nav.form_view_01].controller.setSelectedIndex(1);
}

/**
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"6B2622F4-A038-46D1-89E4-51D2AEA287A4"}
 */
function svy_nav_rec_last(_event) {
	//function is used by the shortkeys
	forms[globals.nav.form_view_01].controller.setSelectedIndex(forms[globals.nav.form_view_01].controller.getMaxRecordIndex());
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"14A0F13F-E763-4B2F-9356-2AB7A222D8F9"}
 */
function vaiAlTabFlusso(event)
{
	if(forms['LEAF_Giornaliera_tab']
	   && forms['LEAF_Giornaliera_tab'].elements['tabs']['tabIndex'] != 1)
	forms['LEAF_Giornaliera_tab'].elements['tabs']['tabIndex'] = 1;

}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"ECB0FF86-16BF-47FF-B066-B5B73788CDF7"}
 */
function vaiAlTabGiornaliera(event)
{
	if(forms['LEAF_Giornaliera_tab']
	   && forms['LEAF_Giornaliera_tab'].elements['tabs']['tabIndex'] != 2)
	forms['LEAF_Giornaliera_tab'].elements['tabs']['tabIndex'] = 2;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"90FEE5DA-7F23-43FB-9191-C65BE56C628B"}
 */
function vaiAlTabTimbratura(event)
{
   if(forms['LEAF_Giornaliera_tab']
      && forms['LEAF_Giornaliera_tab'].elements['tabs']['tabIndex'] != 3
	  && forms['LEAF_Giornaliera_tab'].elements['tabs'].getTabFormNameAt(3) != null)
	  forms['LEAF_Giornaliera_tab'].elements['tabs']['tabIndex'] = 3;
}

/**
 * Method that navigates to the form and program and selects the record
 * @author Sanneke Aleman
 * @since 2010-10-11
 * @param {String} _program program name
 * @param {String} _form form name
 * @param {Number} _record_id record id
 * 
 * @properties={typeid:24,uuid:"553CF49E-35AE-400B-9DA9-B95CF09BD2BB"}
 */
function svy_nav_showProgramRecord(_form, _program, _record_id) {
	globals.nav.program[_program].view = 0
	globals.svy_nav_showForm(_form,_program,false)
	forms[_form].controller.loadRecords(_record_id)
}

/**
 * Will create a different menu not using the tree menu for easy use on mobile divices
 * @author Sanneke Aleman
 * @since 2011-02-03
 * @properties={typeid:24,uuid:"4AB46F90-1A5E-4E91-A2DB-9067C4DBA83A"}
 * @SuppressWarnings(unused)
 */
function svy_nav_m_init_menu() {
	
	var _jsFormMenu = solutionModel.getForm('svy_nav_fr_m_menu')

	var _rec, _formname, _jsTabP
	for (var i = 1; i <= forms.svy_nav_fr_tree.foundset.getSize(); i++) {
		
		/** @type {JSRecord<db:/svy_framework/nav_menu_items>} */
		_rec =  forms.svy_nav_fr_tree.foundset.getRecord(i)
		//build a menu
		
		_formname = 'svy_nav_fr_m_menu_parts'+i
		//make new form instance
		application.createNewFormInstance('svy_nav_fr_m_menu_parts',_formname)
		forms[_formname].elements['lbl_menu']['text'] = _rec.display_description
	
		_rec.nav_menu_items_to_nav_menu_items$parent_id.sort('sort_order asc')
		forms[_formname].controller.loadRecords(_rec.nav_menu_items_to_nav_menu_items$parent_id)
		
		if(i==1)
		{
			forms[_formname]['vMenuExpanded'] = 1
		}
		
		//Add the menu part to the menu form as a tabpannel, 
		//other method (forms.svy_nav_fr_m_menu.drawForm()) will give it the right size and pos
		_jsTabP = _jsFormMenu.newTabPanel('tab_'+i,0,0,50,50)
		
	}
	forms.svy_nav_fr_m_menu.controller.recreateUI()
	for (var j = 1; j <= forms.svy_nav_fr_tree.foundset.getSize(); j++) {
		forms.svy_nav_fr_m_menu.elements['tab_'+j].addTab(forms['svy_nav_fr_m_menu_parts'+j])
	}
	forms.svy_nav_fr_m_menu.drawForm()
	
	//put the form in menu
	forms.svy_nav_fr_tree_top.elements.tree.removeAllTabs()
	forms.svy_nav_fr_tree_top.elements.tree.addTab(forms.svy_nav_fr_m_menu)
	forms.svy_nav_fr_main.elements.tab_split.dividerLocation = 200
}

/**
 * Will remove tooltips from forms so they can be easily used in ipad/iphone
 * @author Sanneke Aleman
 * @since 2011-02-03
 * @properties={typeid:24,uuid:"F3E56CD6-6344-4EA1-A73F-FFEF1EB77357"}
 */
function svy_nav_removeTooltips() {
	
	// check if iPhone is used
	if(!globals.svy_utl_OsIsIphoneIpad())return


	var _forms = ['svy_nav_fr_bottom_bkmk_short',
	              'svy_nav_fr_tree_top',
	              'svy_nav_fr_buttonbar_browser',
	              'svy_nav_fr_buttonbar_viewer']
	var _jsForm, _labels, _label              
	for (var i = 0; i <  _forms.length; i++) {
		_jsForm = solutionModel.getForm(_forms[i])
		_labels = _jsForm.getLabels()
		for (var j = 0; j < _labels.length; j++) {
			_label = _labels[j]
			_label.toolTipText = null
		}
	}
}

/**
 * @properties={typeid:24,uuid:"1A44C555-3CA1-4682-ACF4-3885673168B3"}
 * @AllowToRunInFind
 */
function svy_nav_changeOrganization(oldValue, newValue, event) {
	//check with security
	var _user_org_id;
	var _reset = true;

	/** @type {JSFoundset<db:/svy_framework/sec_user_org>} */
	var _fsUserOrg = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_org');
//	var _found = false;
	
	if (_fsUserOrg.find()) {
		_fsUserOrg.user_id = globals.svy_sec_lgn_user_id;
		_fsUserOrg.organization_id = globals.svy_sec_lgn_organization_id;
		_fsUserOrg.search();
		
		if (databaseManager.hasRecords(_fsUserOrg)) {
			_user_org_id = _fsUserOrg.user_org_id;
		
			if(_user_org_id >= 0) {
				globals.svy_sec_lgn_user_org_id = _user_org_id;
				
				svy_nav_filterOrganization();
				var _program_array = svy_nav_init_programs();
				var _function_array = svy_nav_get_functions();
				
				//recreate menu
				svy_nav_init_menu_items(_program_array, _function_array, true);
		
				//reset rights
				globals.svy_sec_getSecurityKeys()
				globals.svy_sec_setElementRightsWithKeys()
				globals.svy_sec_setTableFilters();
				
				//TODO: close programs the user doesn't have the right to in this organization
				
				_reset = false;
			}
		}
	}
	
	if (_reset) {//don't allow the change
		globals.svy_sec_lgn_organization_id = oldValue;
	}
}

/**
 * @properties={typeid:24,uuid:"D17443D2-3A4A-4B7B-ABDB-8C7FE90D6D3A"}
 */
function svy_nav_filterOwner(_rec) {
	var _owner_id = globals.svy_sec_lgn_owner_id;
	
	var _database = globals.nav_db_framework;
	if (globals["svy_nav_getUserDBName"]) {
		_database = globals["svy_nav_getUserDBName"]();
	}		
	
	//filter navigation tables
	// MAVariazione - add filter one by one, so we can remove them later if necessary
//	databaseManager.addTableFilterParam(_database, null, "owner_id", "=", _owner_id, "owner_filter");
	databaseManager.addTableFilterParam(datasources.db[_database].sec_owner.getDatasource(), "owner_id", "=", _owner_id, "owner_filter_sec_owner");
	databaseManager.addTableFilterParam(datasources.db[_database].sec_owner_in_module.getDatasource(), "owner_id", "=", _owner_id, "owner_filter_sec_owner_in_module");
	databaseManager.addTableFilterParam(datasources.db[_database].sec_group.getDatasource(), "owner_id", "=", _owner_id, "owner_filter_sec_group");
	databaseManager.addTableFilterParam(datasources.db[_database].sec_user.getDatasource(), "owner_id", "=", _owner_id, "owner_filter_sec_user");
	databaseManager.addTableFilterParam(datasources.db[_database].sec_organization.getDatasource(), "owner_id", "=", _owner_id, "owner_filter_sec_organization");
	databaseManager.addTableFilterParam(datasources.db[_database].sec_security_key.getDatasource(), "owner_id", "^||=",  _owner_id, "owner_filter_sec_security_key");
}

/**
 *  Will add table filters to filter all the organization records
 * @author Sanneke Aleman
 * @since 2011-02-05
 * @SuppressWarnings(deprecated)
 * @properties={typeid:24,uuid:"9BE76907-D275-45DE-B54A-7D654502F7D0"}
 */
function svy_nav_filterOrganization() {
	var _organization_id = globals.svy_sec_lgn_organization_id;
	
	var _database;
	if (globals["svy_nav_getUserDBName"]) {
		_database = globals["svy_nav_getUserDBName"]();
		
		if(_to_sec_owner$owner_id.filter_field_organization)
		{
			databaseManager.removeTableFilterParam(_database,"organization_filter");
			databaseManager.addTableFilterParam(_database,null,_to_sec_owner$owner_id.filter_field_organization,'=',_organization_id,'organization_filter')
		}
	}
	
	//filter navigation tables
	var _nav_database = globals.nav_db_framework
	databaseManager.removeTableFilterParam(_nav_database,"organization_filter");
	databaseManager.addTableFilterParam(_nav_database,'nav_user_required_field','organization_id','=',_organization_id,'organization_filter')
	
	// filter i18n
	databaseManager.addTableFilterParam(_nav_database, "i18n_messages", "i18n_organization_id", "IN", (_organization_id, null));
	//i18n.setI18NMessagesFilter('i18n_organization_id', _organization_id);
	
}

/**
 * Gets the required fields for a program, the ones defined by the programmer and the ones defined by the user
 * @param {{required_fields:Object,program_name:String}} _progObj the object of the current program 
 * @return {Object} _progObj.required_fields the object with the required fields
 * @author Sanneke Aleman
 * @since 2011-02-09
 * 
 * @properties={typeid:24,uuid:"AEA84C67-4E8C-4E7E-A1F2-60C9EDD973C5"}
 */
function svy_nav_getRequiredFields(_progObj) {
		
	//if the required fields are already known just return them
	if(_progObj.required_fields)
	{
		return _progObj.required_fields
	}
	
	_progObj.required_fields = new Object()

	var _fs_fields, _fs_fields_size, _rec_fields
	
	//get the required fields for a program
	/** @type {JSFoundset<db:/svy_framework/nav_program_fields>} */
	_fs_fields = databaseManager.getFoundSet(globals.nav_db_framework,'nav_program_fields')
	_fs_fields.addFoundSetFilterParam('program_name','=',_progObj.program_name)
	_fs_fields.addFoundSetFilterParam('flag_required','=',1)
	_fs_fields.loadAllRecords()
	_fs_fields_size = _fs_fields.getSize()
	for (var i = 1; i <= _fs_fields_size; i++) {
		_rec_fields = _fs_fields.getRecord(i)
		_progObj.required_fields[_rec_fields['dataprovider']] = new Object()
		_progObj.required_fields[_rec_fields['dataprovider']].db_status = 'R'
		_progObj.required_fields[_rec_fields['dataprovider']].req_by_prog = true
		_progObj.required_fields[_rec_fields['dataprovider']].form_status = 'R'
		_progObj.required_fields[_rec_fields['dataprovider']].on_form = false
		
	}
	
	//get the required fields for a program set by user - organization
	_fs_fields = databaseManager.getFoundSet(globals.nav_db_framework,'nav_user_required_field')
	_fs_fields.addFoundSetFilterParam('program_name','=',_progObj.program_name)
	_fs_fields.loadAllRecords()
	_fs_fields_size = _fs_fields.getSize()
	for (var j = 1; j <= _fs_fields_size; j++) {
		_rec_fields = _fs_fields.getRecord(j)
		_progObj.required_fields[_rec_fields['dataprovider']] = new Object()
		_progObj.required_fields[_rec_fields['dataprovider']].db_status = 'R'
		_progObj.required_fields[_rec_fields['dataprovider']].req_by_prog = false
		_progObj.required_fields[_rec_fields['dataprovider']].form_status = 'R'
		_progObj.required_fields[_rec_fields['dataprovider']].on_form = false
		
	}
	
	return _progObj.required_fields
}

/**
 * Sets the required fields on the form, will add * to the label of the required fields
 * @param {{required_fields:Object,program_name:String}} _progObj the object of the current program
 * @param {String} _form the name of the form
 * @param {String} _status the status of the framework
 * @author Sanneke Aleman
 * @since 2011-02-11
 * 
 * @properties={typeid:24,uuid:"6C1E0095-7982-423B-83F2-4EFF26F08EEC"}
 */
function svy_nav_setRequiredFields(_progObj,_form, _status) {
	
	globals.svy_nav_getRequiredFields(_progObj)

	if(!solutionModel.getForm(_form)) return
	
	var _jsForm = solutionModel.getForm(_form)
//	var _fields = _jsForm.getFields()
	// MAVariazione - also check inherited fields
	var _fields = _jsForm.getFields(true);
	var _formObj = forms[_form]
	var _req_text
	
	var _fieldName, _fieldDataprovider, _label
	for (var i = 0; i < _fields.length; i++) {
		_fieldName = _fields[i].name
		_fieldDataprovider = _fields[i].dataProviderID
		if(_progObj.required_fields[_fieldDataprovider])//this is a required field
		{
			//set the * for the required field
			if(!_formObj.elements[_fieldName] || !_formObj.elements[_fieldName].getLabelForElementNames)return
//			_label = _formObj.elements[_fieldName].getLabelForElementNames()[0]
			// MAVariazione - check all label for elements
			/** @type{Array}*/
			var _labelFor = _formObj.elements[_fieldName].getLabelForElementNames();
			var found = false;
			for(var j = 0; j < _labelFor.length && !found; j++)
			{
				found = _formObj.elements[_labelFor[j]]['text'];
			}
			
			if (found) {
				_label = _labelFor[j-1];
				// MAVariazione - also consider the 'add' status
				if ((_status == 'add' || _status == 'edit' || _status == 'required_fields') && _progObj.required_fields[_fieldDataprovider].form_status == 'R') {
					_progObj.required_fields[_fieldDataprovider].on_form = true
					if(_status == 'required_fields' && _progObj.required_fields[_fieldDataprovider].req_by_prog ) //show differance between programmer required field and user required fields in required field mode
					{
						_req_text = '** '
					}
					else 
					{
						_req_text = '* '
					}
					
					_formObj.elements[_label]['text'] = _req_text + _formObj.elements[_label]['text']
				} else {
					//remove all the starting * and the space
					_formObj.elements[_label]['text'] = _formObj.elements[_label]['text'].replace(/^\*+\s/, "");
				}
			}
		}
	}
	
	//if there are tabs with forms
	var _tabpanels = _jsForm.getTabPanels()
	var _tabpn_name, _type, _formTab
	for (var k = 0; k < _tabpanels.length; k++) {
		_tabpn_name = _tabpanels[k].name
		if(!_formObj.elements[_tabpn_name])
			continue
		_type = _formObj.elements[_tabpn_name].getElementType()
		if (_type == 'TABPANEL' && _formObj.elements[_tabpn_name].tabIndex >= 0) {
			_formTab = _formObj.elements[_tabpn_name].getTabFormNameAt(_formObj.elements[_tabpn_name].tabIndex)
			if (_formTab && forms[_formTab]) {
				globals.svy_nav_setRequiredFields(_progObj,_formTab,_status)
			}
		}
		else if(_type == 'SPLITPANE')
		{
			/** @type {Form} */
			var _formTabObj = _formObj.elements[_tabpn_name].getRightForm()
			_formTab = _formTabObj.controller.getName()
			if (_formTab && forms[_formTab]) {
				globals.svy_nav_setRequiredFields(_progObj,_formTab,_status)
			}
			_formTabObj = _formObj.elements[_tabpn_name].getLeftForm()
			_formTab = _formTabObj.controller.getName()
			if (_formTab && forms[_formTab]) {
				globals.svy_nav_setRequiredFields(_progObj,_formTab,_status)
			}
		}
	}
}

/**
 *  Check if all the required fields are entered, otherwise put warning in the validation_msg
 * @param {Object} _progObj the object of the current program
 * @param {String} _form the name of the form
 * @author Sanneke Aleman
 * @since 2011-02-11
 * 
 * @properties={typeid:24,uuid:"E6A6988B-0B51-47F2-9E46-70BCEA8623BE"}
 */
function svy_nav_checkRequiredFields(_progObj, _form) {
	var _jsForm = solutionModel.getForm(_form)
	// MAVariazione - get also inherited fields
	var _fields = _jsForm.getFields(true)
//	var _fields = _jsForm.getFields()
	var _formObj = forms[_form]
	var _return = true
	var _fieldName, _fieldDataprovider, _label
	for (var i = 0; i < _fields.length; i++) {
		_fieldName = _fields[i].name
		_fieldDataprovider = _fields[i].dataProviderID
		if(_progObj.required_fields && _progObj.required_fields[_fieldDataprovider] && _progObj.required_fields[_fieldDataprovider].on_form && _formObj.elements[_fieldName].getLabelForElementNames)//this is a required field
		{
			// MAVAriazione - check all label for elements	//			_label = _formObj.elements[_fieldName].getLabelForElementNames()[0]
			/** @type {Array<String>}*/
			var _labelFor = _formObj.elements[_fieldName].getLabelForElementNames();
			var found = false;
			for(var lbl = 0; lbl < _labelFor.length && !found; lbl++)
			{
				_label = _labelFor[lbl];
				// MAVariazione - don't consider 0 or false as not entered	//				if (_label && !_formObj[_fieldDataprovider]) {//field is not entered
				if (_formObj.elements[_label].text && (_formObj[_fieldDataprovider] !== 0 && _formObj[_fieldDataprovider] !== false && !_formObj[_fieldDataprovider])) {//field is not entered
					globals.nav.validation_msg +=  utils.stringReplace(_formObj.elements[_label].text, '* ', '') + i18n.getI18NMessage('svy.fr.dlg.is_required') + '\n'
					_return = -1
					found = true;
				}
			}
		}
	}

	//if there are tabs with forms
//	var _tabpanels = _jsForm.getTabPanels()

	// MAVariazione - also search inherited panels
	var _tabpanels = _jsForm.getTabPanels(true)
	var _tabpn_name, _type, _formTab, _return_call
	for (var j = 0; j < _tabpanels.length; j++) {
		_tabpn_name = _tabpanels[j].name
		if(!_formObj.elements[_tabpn_name])
			continue
		_type = _formObj.elements[_tabpn_name].getElementType()
		if (_type == 'TABPANEL' && _formObj.elements[_tabpn_name].tabIndex >= 0) {
			_formTab = _formObj.elements[_tabpn_name].getTabFormNameAt(_formObj.elements[_tabpn_name].tabIndex)
			if (_formTab && forms[_formTab]) {
				_return_call = globals.svy_nav_checkRequiredFields(_progObj, _formTab)
				if(_return_call == -1) _return = _return_call
			}
		}
		else if(_type == 'SPLITPANE')
		{
			/** @type {Form} */
			var _formTabObj = _formObj.elements[_tabpn_name].getRightForm()
			_formTab = _formTabObj.controller.getName()
			if (_formTab && forms[_formTab]) {
				_return_call = globals.svy_nav_checkRequiredFields(_progObj, _formTab)
				if(_return_call == -1) _return = _return_call
			}
			_formTabObj = _formObj.elements[_tabpn_name].getLeftForm()
			_formTab = _formTabObj.controller.getName()
			if (_formTab && forms[_formTab]) {
				_return_call = globals.svy_nav_checkRequiredFields(_progObj, _formTab)
				if(_return_call == -1) _return = _return_call
			}
		}
	}
	
	return _return
}

/**
 * To start a transaction
 * @author Sanneke Aleman
 * @since 2011-02-11
 * @properties={typeid:24,uuid:"BE637AA7-B523-43E2-8D56-6E30BE0981EA"}
 */
function svy_nav_startTransaction() {
	databaseManager.startTransaction()
}

/**
 * To save the open edits and commit the transaction, works best in combination with svy_nav_startTransaction
 * @author Sanneke Aleman
 * @since 2011-02-11
 * @SuppressWarnings(deprecated)
 * @properties={typeid:24,uuid:"468E84CB-FCE9-42E8-A5B8-B7A5B6239667"}
 */
function svy_nav_saveCommitTransaction() {
	var _record, _failedArray
	if (!databaseManager.saveData()) {
		_failedArray = databaseManager.getFailedRecords()
		for (var i = 0; i < _failedArray.length; i++) {
			_record = _failedArray[i];
		}
		application.output('Error in save:' + _record.exception, LOGGINGLEVEL.ERROR)
		databaseManager.revertEditedRecords()
		databaseManager.rollbackTransaction()
		return false;
	}

	if (!databaseManager.commitTransaction()) {
		_failedArray = databaseManager.getFailedRecords()
		for (i = 0; i < _failedArray.length; i++) {
			_record = _failedArray[i];
		}
		databaseManager.saveData()
		application.output('Error in commit:' + _record.exception, LOGGINGLEVEL.ERROR)
		databaseManager.revertEditedRecords()
		databaseManager.rollbackTransaction()
		databaseManager.releaseAllLocks()
		return false;

	} 
	databaseManager.setAutoSave(true)
	return true

}

/**
 * To lose the focus, this method will set the focus on a small element that the user will not see
 * @author Sanneke Aleman
 * @since 2011-02-14
 * @properties={typeid:24,uuid:"E3830529-9AC3-4ABD-848B-A6BC843FBEFD"}
 */
function svy_nav_loseFocus() {
	forms.svy_nav_fr_status_bar.elements.loseFocus.requestFocus()
}

/**
 *  Check the validation rules for all the fields
 * @param {{program_name:String,table_name:String}} _progObj the object of the current program
 * @param {String} _form the name of the form
 * @author Sanneke Aleman
 * @since 2011-02-14
 * @properties={typeid:24,uuid:"875274EA-22AC-40A4-8EB1-84789B40A2F9"}
 */
function svy_nav_checkValidationRules(_progObj,_form) {
	
	//look what the validation rules are
	/** @type {JSFoundset<db:/svy_framework/nav_field_validation_rule>} */
	var _fs_rules = databaseManager.getFoundSet(globals.nav_db_framework,'nav_field_validation_rule')
	_fs_rules.addFoundSetFilterParam('program_name','=',_progObj.program_name)
	_fs_rules.sort('dataprovider asc, sequence asc', true)
	_fs_rules.loadRecords()
	
	var _fs_rules_size = _fs_rules.getSize()
	var _fs_rec, _method, _dataprovider, _newValue, _record, _return
	
	var _table = _progObj.table_name
	_record = forms[_form].foundset.getSelectedRecord()
	var _success = 0
	
	for (var i = 1; i <= _fs_rules_size; i++) {
		_fs_rec = _fs_rules.getRecord(i)
		_dataprovider = _fs_rec.dataprovider
		_newValue = forms[_form][_dataprovider]
		
		if( utils.stringPatternCount(_fs_rec.method,'globals.')>0)
		{
			_method = utils.stringReplace(_fs_rec.method,'globals.','')
			_return = globals[_method](_table,_dataprovider, _newValue, _record)
		}
		else if( utils.stringPatternCount(_fs_rec.method,'forms.')>0)
		{	
			_method = _fs_rec.method.split('.', 5)
			_return = forms[_method[1]][_method[2]](_table,_dataprovider, _newValue, _record)
		}
				
		if(_return == -1)
		{
			_success = -1
		}
	}
	return _success
}

/**
 * to call a function from a popmenu you don't need the first 5 arguments
 * @param {Object} _arg1
 * @param {Object} _arg2
 * @param {Object} _arg3
 * @param {Object} _arg4
 * @param {Object} _arg5
 * @param {Number} _function_id
 *
 * @properties={typeid:24,uuid:"4F35026E-E49D-472C-A110-C1B4AD5E70F9"}
 */
function svy_nav_callFunctionFromPopmenu(_arg1, _arg2, _arg3, _arg4, _arg5, _function_id) {
	 svy_nav_callFunction(_function_id)
}

/**
* to call a function from a popmenu you don't need the first 5 arguments
* @param {Object} _arg1
* @param {Object} _arg2
* @param {Object} _arg3
* @param {Object} _arg4
* @param {Object} _arg5
* @param {JSEvent} [_event]
* @param {Number} _position
* 
 * @properties={typeid:24,uuid:"950C39C5-6CF1-45CE-A301-6DEF4DEBFE79"}
 */
function svy_nav_history_moveFromPopmenu(_arg1, _arg2, _arg3, _arg4, _arg5, _event, _position) {	
	globals.svy_nav_history_move(_event, _position) 
}

/**
 * @param {Number} _function_id
 * @properties={typeid:24,uuid:"CCD4815D-3A52-4BCA-A159-9AB30D3D241E"}
 */
function svy_nav_callFunction(_function_id) {
	
	/** @type {JSFoundset<db:/svy_framework/nav_function>} */
	var _fs_function = databaseManager.getFoundSet(globals.nav_db_framework,'nav_function')
	_fs_function.addFoundSetFilterParam('function_id','=',_function_id)
	_fs_function.loadAllRecords()

	if(_fs_function.getSize() != 1) return
	
	var _rec = _fs_function.getRecord(1)

	var _methodcall = _rec.method + '('
	var _rec_arg
	for (var i = 1; i <= _rec.nav_function_to_nav_function_arguments.getSize(); i++) {
		_rec_arg = _rec.nav_function_to_nav_function_arguments.getRecord(i)
		if (i != 1) {
			_methodcall += ', '
		}

		if (_rec_arg.arg_type == 1) {
			_methodcall += '"' + _rec_arg.argument + '"'
		} else if (_rec_arg.arg_type == 2) {
			_methodcall += '"' + globals[_rec_arg.argument] + '"'
		}
	}
	_methodcall += ')'

	eval(_methodcall)
}

/**
 * @properties={typeid:24,uuid:"04F454D0-EAF0-4A08-AEE4-AE5A1E6F73EC"}
 */
function svy_nav_setTemplateButtons() {
	
	var _b_y = 4
	var _b_size = 30
	var _b_w = 24
	var _b_h = 24
	var _b_x = 600
	var _b_offset_arrow = 8
	var _b_y_arrow = 27
	var _b_arrow_h = 6
	var _b_arrow_w = 9
	var _b_offset_line = 7
	
	var _v_y = 4
	var _v_size = 30
	var _v_w = 18
	var _v_h = 18
	var _v_x = 655
	var _v_offset_line = 7
	
	var _bForm = solutionModel.getForm('svy_nav_fr_buttonbar_browser')
	var _vForm = solutionModel.getForm('svy_nav_fr_buttonbar_viewer')
	/** @type {Array<String>} */
	var _template_images = globals.svy_nav_getProperty('template_images')
	/** @type {Array<String>} */
	var _template_tooltips = globals.svy_nav_getProperty('template_i18n_labels')
	var _method = solutionModel.getGlobalMethod("globals",'svy_nav_toggleView')
	var _template_types = globals.svy_nav_getProperty('template_types')
	
	//calculate_start
	_b_x = _b_x - ((_template_images.length)*_b_size)
	_v_x = _v_x - ((_template_images.length)*_v_size)
	
	//set the line on the right location
	var _lineElement = _bForm.getComponent('btn_begin_views')
	_lineElement.x = _b_x - _b_offset_line
	
	_lineElement = _vForm.getComponent('btn_begin_views')
	_lineElement.x = _v_x - _v_offset_line
	
	var _create_table = globals.svy_nav_getBooleanProperty('create_table_by_user')
	
	for (var i = 0; i < _template_images.length; i++) {
		
		var _bLabel = _bForm.newLabel('', _b_x, _b_y, _b_w, _b_h, _method)
		if(!globals.svy_utl_OsIsIphoneIpad()) _bLabel.toolTipText = i18n.getI18NMessage(_template_tooltips[i])
		_bLabel.name = 'btn_template'+i
		_bLabel.imageMedia = solutionModel.getMedia(_template_images[i])
		//_bLabel.styleClass = 'btn_template' MODIFICATO DA DANILO 
		_bLabel.anchors = SM_ANCHOR.NORTH | SM_ANCHOR.EAST;
		_bLabel.formIndex = 999999
		_bLabel.transparent = true
		_bLabel.showClick = false
		_bLabel.rolloverCursor = SM_CURSOR.HAND_CURSOR;
		_bLabel.enabled = false
		_bLabel.visible = false
		
		//set right click for table views
		if(forms[_template_types[i]].hasTable() && _create_table)
		{
			_bLabel.onRightClick = _bForm.getMethod('listMenu')		
			
		}		
		
		var _arrowLabel = _bForm.newLabel('', _b_x + _b_offset_arrow, _b_y_arrow, _b_arrow_w, _b_arrow_h)
		//_arrowLabel.styleClass = 'btn_selected_template'
		_arrowLabel.name = 'template_selected'+i
		_arrowLabel.anchors = SM_ANCHOR.NORTH | SM_ANCHOR.EAST;
		_arrowLabel.formIndex = 999999
		_arrowLabel.transparent = true
		_arrowLabel.transparent = true
		_arrowLabel.showClick = false
		_arrowLabel.enabled = false
		_arrowLabel.visible = false
		
		_b_x += _b_size
		
		var _vLabel = _vForm.newLabel('', _v_x, _v_y, _v_w, _v_h, _method)
		if(!globals.svy_utl_OsIsIphoneIpad()) _vLabel.toolTipText = i18n.getI18NMessage(_template_tooltips[i])
		_vLabel.name = 'btn_template'+i
		_vLabel.imageMedia = solutionModel.getMedia(_template_images[i])
		//_vLabel.styleClass = 'btn_template' MODIFICATO DA DANILO
		_vLabel.anchors = SM_ANCHOR.NORTH | SM_ANCHOR.EAST;
		_vLabel.formIndex = 999999
		_vLabel.transparent = true
		_vLabel.transparent = true
		_vLabel.showClick = false
		_vLabel.enabled = false
		_vLabel.visible = false
		
		_v_x += _v_size
	}
}

/**
 * Retrieves the elements of the form that should be shown at generated table views
 * 
 * @param {String} _form the name of the form
 * 
 * @author Vincent Schuurhof
 * @since 2011-07-07
 * 
 * @properties={typeid:24,uuid:"475A4C3A-047D-495E-A71E-8689E54E4364"}
 */
function svy_nav_getFixedElementsTable(_form) {
	if (forms[_form].vFixedElementsTable.length) {
		// first revert the form to get its design-time fixed elements
		solutionModel.revertForm(_form);
		forms[_form].controller.recreateUI();
	} else {
		return null;
	}
	
	var _jsForm = solutionModel.getForm(_form)	
	var _components = _jsForm.getComponents()
	
	/** @type {Array} */
	var _fixedElementsTable = forms[_form].vFixedElementsTable;
	var _fixedElements = new Array();
	var _fixedElementsCounter = 0;
	for (var i = 0; i < _components.length; i++) {
		for (var j = 0; j < _fixedElementsTable.length; j++) {
			if (_components[i].name == _fixedElementsTable[j][0]) {
				_fixedElements[_fixedElementsCounter] = new Array();
				// define the record type element
				_fixedElements[_fixedElementsCounter][0] = _components[i];
				for (var k = 0; k < _components.length; k++) {
					if (_components[k] == _fixedElementsTable[j][0]) {
						// define the header element
						_fixedElements[_fixedElementsCounter][1] = _components[k];
						break;
					}
				}
				
				// define whether the element should be fixed at the front or the back
				_fixedElements[_fixedElementsCounter][2] = _fixedElementsTable[j][1];
				
				_fixedElementsCounter++;
			}
		}
	}
	
	return _fixedElements;
}

/**
 * @param {String} _program
 * @param {JSFoundset} _foundset
 * 
 * @properties={typeid:24,uuid:"A018E2DF-7D74-401D-A2BB-161C052F1258"}
 */
function svy_nav_create_print_list(_program, _foundset) {
	forms['ltg_main'].show(_program,_foundset)
}

/**
 * @properties={typeid:24,uuid:"FDCAEA90-6653-4154-AEA1-8431DAEBC05C"}
 */
function svy_nav_create_print_list_from_reportMenu() {
	
	globals.svy_nav_create_print_list(globals.nav_program_name, forms[globals.nav.form_view_01].foundset)
}

/**
 * @param {String} _property_name
 * @return {Boolean}
 * 
 * @properties={typeid:24,uuid:"AAE7343B-68F1-4B84-B8C9-DF28C858B1FF"}
 */
function svy_nav_getBooleanProperty(_property_name) {
	var _valueArray = globals.svy_nav_getProperty(_property_name)
	if(_valueArray && _valueArray[0] == 'true')
	{
		return true
	}
	else
	{
		return false
	}
}

/**
 * 
 * @param {String} _property_name
 * @return {Array}
 *
 * @properties={typeid:24,uuid:"747CFBC8-0C33-4EE8-88D7-77B0B5D4842B"}
 */
function svy_nav_getProperty(_property_name) {
	globals.nav_properties = _property_name
	if(utils.hasRecords(_to_nav_properties$property_name))
	{
		var _returnValue;
		if (_to_nav_properties$property_name.property_value instanceof java.util.ArrayList) {
			/** @type {java.util.ArrayList} */
			var _arrayList = _to_nav_properties$property_name.property_value;
			_returnValue = _arrayList.toArray();
			return _returnValue;
		} else {
			/** @type {Array} */
			_returnValue = _to_nav_properties$property_name.property_value
			return _returnValue
		}
//		/** @type {Array} */
//		var _returnValue = _to_nav_properties$property_name.property_value
//		return _returnValue
	}
	else
	{
		application.output(_property_name + 'is missing in the navigation properties',LOGGINGLEVEL.WARNING)
		return null
	}
    
}

/**
 * Can be used to refresh the table and server names in the nav_program records
 * For example when tables are renamed
 * Only to be used in developer
 * 
 * @properties={typeid:24,uuid:"DA87163F-E1D7-491D-8751-965169B4C7D0"}
 */
function svy_nav_refreshProgramTables() {
	if (!application.isInDeveloper()) {
		return;
	}
	
	var _fs = databaseManager.getFoundSet("svy_framework", "nav_program");
	_fs.loadAllRecords();
	
	/** @type {JSRecord<db:/svy_framework/nav_program>} */
	var _programRec;
	for (var i = 1; i <= _fs.getSize(); i++) {
		_programRec = _fs.getRecord(i);
		if (_programRec.base_form_name && _programRec.base_form_name != '-no form-') {
			for (var j = 0; j < _programRec.form_object.length; j++) {
				if (_programRec.form_object[j][3] && forms[_programRec.form_object[j][2]]) { // 3-available 2-formname
					_programRec.form_name = _programRec.form_object[j][2]
					_programRec.table_name = databaseManager.getDataSourceTableName(forms[_programRec.form_object[j][2]].controller.getDataSource())
					_programRec.server_name = databaseManager.getDataSourceServerName(forms[_programRec.form_object[j][2]].controller.getDataSource())
					databaseManager.saveData()
				}
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"FEFC9B67-36A6-4769-91FF-BC3D20350AD6"}
 */
function svy_nav_fillSolutionNameColumns() {
	var _solutionName = application.getSolutionName();
	var _tables = databaseManager.getTableNames(globals.nav_db_framework);
	var _jsTable, _columns, _fs, _fsUpdater;
	for (var i = 0; i < _tables.length; i++) {
		_jsTable = databaseManager.getTable(globals.nav_db_framework, _tables[i]);
		_columns = _jsTable.getColumnNames();
		for (var j = 0; j < _columns.length; j++) {
			if (_columns[j] == "solution_name") {
				//fill solution_name column
				_fs = databaseManager.getFoundSet(globals.nav_db_framework, _tables[i]);
				_fs.loadAllRecords();
				_fsUpdater = databaseManager.getFoundSetUpdater(_fs);
				_fsUpdater.setColumn("solution_name", _solutionName);
				_fsUpdater.performUpdate()
				break;
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"B474E4CB-ACBC-46D5-8892-E4EF320603F2"}
 * @SuppressWarnings(deprecated)
 */
function svy_nav_printCurrentProgram() {
	
	var _printForm = globals.nav.form_view_01
	var _main_h = globals.svy_utl_getFormHeight(_printForm)
//	var _main_w = forms[_printForm].controller.getFormWidth()
	
	var _width = 703 //pixels that can be on a form on printscale 150
	var _height = _main_h
	//look if there is a tab
	
	//determine the template
	var _template = globals.nav.getTemplate()
	
//	/** @type {Form} */
//	var _templateForm = forms[_template];
	var _tab = false

	if(forms[_template].hasTab())
	{
		var _printTab = globals.nav.form_view_02
		var _tab_h = globals.svy_utl_getFormHeight(_printTab)
//		var _tab_w = forms[_printTab].controller.getFormWidth()
		var _between_h = 30
		_height += _tab_h + _between_h
		application.output('there is a tab')	
		_tab = true
	}
	//create a form
	var _formname = 'printScreen'
	history.removeForm(_formname)
	solutionModel.removeForm(_formname)
	var _jsForm = solutionModel.newForm(_formname,forms[_printForm].controller.getDataSource(),'sampleuse_navigation',false,_width,_height)
	var _body = _jsForm.newPart(JSPart.BODY,_height)
	_body.allowBreakAcrossPageBounds = true
	_jsForm.paperPrintScale = 120
	_jsForm.defaultPageFormat = solutionModel.createPageFormat(942, 646, 20, 20, 20, 20, SM_ORIENTATION.PORTRAIT, SM_UNITS.PIXELS);
	_jsForm.navigator = SM_DEFAULTS.NONE
	_jsForm.scrollbars = SM_SCROLLBAR.HORIZONTAL_SCROLLBAR_NEVER + SM_SCROLLBAR.VERTICAL_SCROLLBAR_NEVER
	
	//create tab
	var _jsTab = _jsForm.newTabPanel('tab_browser', 0, 0, _width, _main_h)	
	_jsTab.anchors = 15
	_jsTab.transparent = true
	_jsTab.printable = true
	_jsTab.newTab('','',solutionModel.getForm(_printForm))
	_jsTab.printSliding = SM_PRINT_SLIDING.GROW_HEIGHT
		
	if(_tab)
	{
		//label between the tabpanels.
		var _label = _jsForm.newLabel(globals.nav.program[globals.nav.getTabProgram()].description,0,_main_h,_width,_between_h)
		_label.printSliding = SM_PRINT_SLIDING.GROW_HEIGHT | SM_PRINT_SLIDING.ALLOW_MOVE_Y
		
		
		//tab for the tab
		var _jsTabViewer = _jsForm.newTabPanel('tab_viewer', 0, _main_h + _between_h, _width, _main_h)	
		_jsTabViewer.anchors = 15
		_jsTabViewer.transparent = true
		_jsTabViewer.printable = true
		_jsTabViewer.newTab('','',solutionModel.getForm(_printTab))
		_jsTabViewer.printSliding = SM_PRINT_SLIDING.GROW_HEIGHT | SM_PRINT_SLIDING.ALLOW_MOVE_Y
	}
	forms[_formname].controller.recreateUI()
	
	//load the foundset, otherwise printing is not aloud
	forms[_formname].controller.loadRecords(forms[_printForm].foundset)
	
	//set the tabs
	forms[_formname].controller.showPrintPreview(true)
}

/**
 * Switch to the tab of the programname provided
 * @param {JSEvent} [event]
 * @param {String} _program name of program
 * @properties={typeid:24,uuid:"4667E0F2-11A9-4B58-8C92-F7735EC60498"}
 */
function svy_nav_switchTabProgram(event, _program) {
	var _progObj = globals.nav.program[globals.nav_program_name]
	for (var i = 1; i < _progObj['tab'].length; i++) {
		if(_progObj['tab'][i].program_name == _program)
		{
			break
		}
	}
	var _tab_form = globals.nav_program_name + '_tab'
	forms[_tab_form].elements['tabs']['tabIndex'] = i

}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"60173907-4171-49A5-9165-8B7351BE5450"}
 */
function svy_nav_shiftTabProgramLeft(event)
{
	var form = forms.svy_nav_fr_openTabs;
	if(form.vSelectedTab - 1 > 0)
		forms.svy_nav_fr_openTabs.vSelectedTab = --forms.svy_nav_fr_openTabs.vSelectedTab;
	form.recreateUI();
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"64D51EB8-E845-446A-B8EA-BEBF3AB41842"}
 */
function svy_nav_shiftTabProgramRight(event)
{
	var form = forms.svy_nav_fr_openTabs;
	if(form.vSelectedTab + 1 < form.vOpenTabs.length)
		forms.svy_nav_fr_openTabs.vSelectedTab = forms.svy_nav_fr_openTabs.vSelectedTab++;
	form.recreateUI();
}

/**
 * Switch to the tab of the programname provided and create new record
 * 
 * @param {JSEvent} [event]
 * @param {String} _program name of program
 * @properties={typeid:24,uuid:"B1630FC1-17DF-4570-B409-CD63E96E0DFE"}
 */
function svy_nav_newRecordOnTabProgram(event, _program) {

	forms[globals.nav.form_view_02]['dc_new'](null,'svy_nav_fr_buttonbar_viewer') ; 
   
}


/**
 * Logging out from the current solution
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"9FC62DF8-8D2C-4E91-B285-F3D4A5AA4899"}
 */
function svy_nav_logout(event)
{
	// MODIFICA del 18/06/2015 per ovviare al problema della cittadinanza in entrata --- non è stato sufficiente...
//	var serverUrl = '/servoy-webclient/ss/s/StudioMiazzoWebApps';
//    application.showURL(serverUrl,'_self');

	// MODIFICA del 27/11/2017 post Servoy 8
	var serverUrl = 'https://webapp.studiomiazzo.it/servoy-webclient/ss/s/StudioMiazzoWebApps';
    application.showURL(serverUrl,'_self');
    application.exit();
}

/**
 * Aggiunge l'oggetto di parametri all'array dei parameteri della sessione
 * 
 * @param {String} tabName
 * @param {{anno:Number,mese:Number,anno_attivo:Number,mese_attivo:Number,
 *          periodo:Number,periodo_attivo:Number,giorni_sel:Array,ultimo_rec:Number,
 *          gruppo_inst:Number,gruppo_lav:String,idditta:Number,
 *          filtro_anag:Boolean,selected_tab:Number,selected_elements:Array,op_id:String}} propObj
 *
 * @properties={typeid:24,uuid:"7C932662-0E3D-4599-AC5C-0F00F2DF5531"}
 */
function addObjGiornParameters(tabName,propObj)
{
	objGiornParams[tabName] = propObj;
}

/**
 * Rimuove l'oggetto di parametri dall'array dei parametri della sessione
 * 
 * @param {String} tabName
 *
 * @properties={typeid:24,uuid:"7EFC9BC5-EE0E-4F1F-98ED-7966D0CA63C6"}
 */
function removeObjGiornParameters(tabName)
{
	delete objGiornParams[tabName];	
}

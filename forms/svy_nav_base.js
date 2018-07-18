/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"A55B155D-370E-4C55-8B54-C6D700670B8C",variableType:-4}
 */
var vFixedElementsTable = new Array();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"95B96BF3-0FEB-4AAE-86B3-03D1388647E2"}
 */
var vFocusElement = null;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A8D8EAF0-1AB8-4248-8AB0-3D153A09C5FA"}
 */
function onLoad(event) {
	/**
	 * To have certain elements fixed in generated table views, define array "vFixedElementsTable" at the overridden version of this method in the table form and specify the following properties:
	 * 
	 * 1. Name of the element that should be fixed (String)
	 * 2. If the element should be fixed at the end of the form. If false it will be fixed at the beginning of the form (Boolean)
	 * 
	 * You need to specify the elements from left to right. So start with the elements at the utmost left and finish the the elements at the utmost right.
	 * 
	 * Please note that it is vital to specify the name of the element for both field and header (if there is any header used)!
	 */
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} allow hide
 *
 * @properties={typeid:24,uuid:"B0310BCD-FB09-4D4E-9C6F-714973A38A39"}
 */
function onHide(event) {
	return true
}

/**
 *	On record selection, enables disables the right buttons, sets the text in the tile bar
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_form] name of the form
 *
 * @properties={typeid:24,uuid:"16BD9642-A11B-44C2-8838-4E694E689436"}
 * @SuppressWarnings(unused)
 */
function onRecordSelection(_event, _form) {	
	if (_form == undefined || !forms[_form]) {
		_form = _event.getFormName();
	}

	var _program = globals.nav_program_name
	var _index = forms[_form].controller.getSelectedIndex()
	var _button_form
	
		// if form is the top form change the description text on the top bar
	if (globals.nav && globals.nav.form_view_01 && _form == globals.nav.form_view_01) // view1
	{
		_button_form = 'svy_nav_fr_buttonbar_browser'

		if (globals.nav.program[_program].description && globals.nav.program[_program].display_field_header && (forms[_form].controller.getMaxRecordIndex() > 0)) 
		{
			/** @type {Array<String>}*/ 
			var _arrHeader = globals.nav.program[_program].display_field_header.split(",");
			var _text = globals.nav.program[_program].description;
			for(var h = 0; h < _arrHeader.length; h++)
			{
				if(h == 0)
				   _text += ' - ';
				
				if(utils.stringLeft(_arrHeader[h],1) == '\'') // condizione a priori per considerare del testo nell'intestazione del tab
					_text += (' ' + utils.stringReplace(_arrHeader[h],'\'',''));
				else
				{
					_text += forms[_form][_arrHeader[h]];
					if(h != _arrHeader.length - 1)
					   _text += ' - ';
				}
			}
//			+ ' - ' + forms[_form][globals.nav.program[_program].display_field_header]
			forms.svy_nav_fr_status_bar.elements.form_name.text = _text
			if(globals.svy_nav_multi_tab_programs && _event) //otherwise it is comming from showForm
			{
				forms.svy_nav_fr_openTabs.setTabText(_text)
			}
		} else if (globals.nav.program[_program].description) {
			forms.svy_nav_fr_status_bar.elements.form_name.text = globals.nav.program[_program].description
		}
		
		if (globals.nav.program[globals.nav_program_name].active_search) {
			forms.svy_nav_fr_status_bar.elements.form_name.text += ' (' + globals.nav.program[globals.nav_program_name].active_search + ')';
		}
		
		if (globals.nav.related_text) {
			forms.svy_nav_fr_status_bar.elements.form_name.text += ' -> ' + globals.nav.related_text;
			}
		
		// set buttons enabled and disabled bottom form
		globals.svy_nav_setViewerBar(globals.nav.mode, _form)

     // MAVariazione
		//if template has detail, log last open record
		//if (forms[globals.nav.template_types_notabs[globals.nav.program[_program].view]].hasDetail()) {
		//	globals.svy_nav_lastOpenRecordCreate()
	//	}
	} // if form is bottom form, look up the right program
	else if ( (globals.nav && globals.nav.form_view_02 && _form == globals.nav.form_view_02) && globals.nav.program[globals.nav_program_name].tab.length > 0) {
		// set buttons enabled and disabled bottom form
		globals.svy_nav_setViewerBar(globals.nav.mode, _form)
	} else if (! ( (globals.nav && globals.nav.form_view_02 && _form == globals.nav.form_view_02) && globals.nav.program[globals.nav_program_name].tab.length > 0)) {
		// if form is not a top form or bottom form don't do anything
		return
	}
	
	// MAVariazione
	// Reload documents for the current program
	if (globals.nav_program_name != 'svy_documents' && forms['svy_doc_program_documents']) 
		forms['svy_doc_program_documents'].setUpFoundset(_event);
}

/**
 * On show method, enables the right buttons
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {Boolean} _firstShow form is shown first time after load
 * @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C16CDCAD-9011-4AEE-8ED7-426C60FC19D8"}
 */
function onShowForm(_firstShow, _event) {
	var _form = _event.getFormName();
	
	if (! (globals.nav 
//		   && globals.nav.form_view_01
		   ))
		// navigation object is not jet loaded
	{
		return;
	}

	if (_firstShow == true /*First show*/) {
		if (globals.nav) {
			if (! (globals.nav && globals.nav.mode && globals.nav.mode == 'edit' 
				   || globals.nav.mode == 'add' 
				   || utils.stringRight(_form, 4) == '_sea' 
				   || _form == 'svy_nav_fr_buttonbar_browser')
				  && (globals.nav.program[globals.nav_program_name] && !globals.nav.program[globals.nav_program_name].noreadonly)) {
				forms[_form].controller.readOnly = true
			}
		}
		if (globals.svy_utl_isJavaClient() &&
		forms[_form].controller.view == 3 /*TableView*/) {
			globals.svy_nav_loadTableViewPersistance(_form);
		}
		
		var _field_mode = 'browse'
		if(globals.nav.mode == 'edit'||globals.nav.mode == 'add')
			_field_mode = 'edit'
				
		globals.svy_nav_setFieldsColor(controller.getName(),_field_mode);
	}


	// MAVariazione - only update the viewer bar when called from the bottom form
	if ( (globals.nav.program[globals.nav_program_name]
	      && globals.nav.program[globals.nav_program_name].tab.length > 1)) {
//	if (controller.getName() === globals.nav.form_view_02 && (globals.nav.program[globals.nav_program_name].tab.length > 1)) {
		// set buttons enabled and disabled bottom form
		globals.svy_nav_setViewerBar(globals.nav.mode, _form)
	}


	if (globals.nav[_form + 'focusFirstField']) {
		controller.focusFirstField()
		globals.nav[_form + 'focusFirstField'] = false
	}
}

/**
 *	Unload of the form, save table view persistence
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D788B242-6897-449B-9174-78B8A24FEFA2"}
 */
function onUnload(_event) {
	var _form = _event.getFormName();
//MAVariazione
	if(forms[_form].elements != undefined){
	
		var _elements = forms[_form].elements.allnames
		var _elementType;
		
		globals.svy_nav_saveTableViewPersistance(_form);

		//Loop through all named elements and perform required actions
		for (var i = 0; i < _elements.length; i++) {
			_elementType = globals.svy_utl_getElementType(_form, _elements[i])
			if (globals.svy_utl_isJavaClient()) {
				switch (_elementType) {
				default:
					break;
				}
			}
		}
	}

	return true
}

/**
 * Handle focus element gaining focus.
 *
 * @param {JSEvent} _event the event that triggered the action
 *
 * @returns {Boolean} proceed to next on-focus-gained handler
 *
 * @properties={typeid:24,uuid:"9BC9624D-48D2-4A5D-8D9D-9A882FEEF5C6"}
 */
function onElementFocusGained(_event) {

	if(globals.nav.mode == 'required_fields')
	{
		toggleRequiredField(_event)
		return false
	}
	else if (globals.nav.mode == 'browse') return false

	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) return false //in the webclient it keeps getting the focus
	
	var _form = _event.getFormName()
	var _element = _event.getElementName()

	var _jsForm = solutionModel.getForm(globals.nav_styleForm)
	
	var _border = _jsForm.getField('fld_border_onFocus').borderType

	var _jsCForm = solutionModel.getForm(_form)

	var _type

	try {
		_type = forms[_form].elements[_element].getElementType()
	} catch (e) {
		_type = null;
	}

	if ( (_type == 'TEXT_FIELD' ||
	_type == 'TEXT_AREA' ||
	_type == 'RTF_AREA' ||
	_type == 'HTML_AREA' ||
	_type == 'TYPE_AHEAD' ||
	_type == 'COMBOBOX' ||
	_type == 'CHECK' ||
	_type == 'CALENDAR' ||
	_type == 'IMAGE_MEDIA' ||
	_type == 'PASSWORD') && forms[_form].elements[_element].editable) {
		if (_jsCForm.getField(_element) &&_jsCForm.getField(_element).styleClass && _jsForm.getField('fld_border_onFocus$' + _jsCForm.getField(_element).styleClass)) {
			var _style_border = _jsCForm.getField(_element).styleClass && _jsForm.getField('fld_border_onFocus$' + _jsCForm.getField(_element).styleClass).borderType
			forms[_form].elements[_element].setBorder(_style_border)
		} else {
			forms[_form].elements[_element].setBorder(_border)
		}
		vFocusElement = forms[_form].elements[_element];
		return true
	}

	return true
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} _event the event that triggered the action
 *
 * @returns {Boolean} proceed to next on-focus-lost handler
 *
 * @properties={typeid:24,uuid:"291598B4-DEF3-48FC-AF18-05697874A902"}
 */
function onElementFocusLost(_event) {

	if (globals.nav.mode == 'browse') return false
	
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) return false //in the webclient it keeps getting the focus
	
	var _form = _event.getFormName()
	var _element = _event.getElementName()

	var _jsForm = solutionModel.getForm(globals.nav_styleForm)
	var _border = _jsForm.getField('fld_border_default').borderType

	var _jsCForm = solutionModel.getForm(_form)

	//if (_jsCForm.view != JSForm.RECORD_VIEW) return false // only set borders in record view
	
	var _type

	try {
		_type = elements[_element].getElementType()
	} catch (e) {
		_type = null;
	}

	if ( (_type == 'TEXT_FIELD' ||
	_type == 'TEXT_AREA' ||
	_type == 'RTF_AREA' ||
	_type == 'HTML_AREA' ||
	_type == 'TYPE_AHEAD' ||
	_type == 'COMBOBOX' ||
	_type == 'CHECK' ||
	_type == 'CALENDAR' ||
	_type == 'IMAGE_MEDIA' ||
	_type == 'PASSWORD') && forms[_form].elements[_element].editable) {
		if (_jsCForm.getField(_element) && _jsCForm.getField(_element).styleClass && _jsForm.getField('fld_border_default$' + _jsCForm.getField(_element).styleClass)) {
			var _style_border = _jsCForm.getField(_element).styleClass && _jsForm.getField('fld_border_default$' + _jsCForm.getField(_element).styleClass).borderType
			forms[_form].elements[_element].setBorder(_style_border)
		} else {
			forms[_form].elements[_element].setBorder(_border)
		}
	}

	return true
}

/**
 *	To create a new record
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @param {String}  [_forceForm]
 * @return  none
 *
 *
 * @properties={typeid:24,uuid:"A643B3D1-A21C-4F16-9513-F707A7FDEF98"}
 * @SuppressWarnings(unused)
 */
function dc_new(_event, _triggerForm, _forceForm) {
	var _methodReturn
	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
	var _form = _args[0]
	var _form_to = _args[1]
	var _program = _args[2]
	var _base = _args[3]
	var _form_trigger = _args[4]
	var _showForm = false
	var _toggle_view = false
	var _template

	var _activeView = globals.nav.activeView
	
	var _table = databaseManager.getDataSourceTableName(forms[_form].controller.getDataSource())

	/** @type {{filter:Array, view:Number, template:Array, form: Array}} */
	var _progObj = globals.nav.program[_program]
	globals.nav.mode = 'add'

	if (_form_trigger == globals.nav.viewer_buttonbar) {
		if (globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].edit_on_tab == 1) {
			globals.svy_nav_dc_setStatus('add', _form)
		}  else if (globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].edit_on_tab == 2) {
			globals.svy_nav_showTabDetail()
			globals.svy_nav_dc_setStatus('add', globals.nav.form_view_02)
		} else {
			if (_progObj.template[globals.nav.default_edit_template][2])//template is available
			{
				_progObj.view = globals.nav.default_edit_template
			}
			_template = globals.nav.template_types[_progObj.view]
			if (_progObj.form[0][3])// form has detail form
			{
				_form = _progObj.form[forms[_template].has1()][2]
			} else {
				_form = _progObj.form[1][2]
			}
			_form = globals.svy_nav_toggleView(_event, _form)
			globals.nav.switchedForEdit = true
			_toggle_view = true
		}
	} else if (!_progObj.template[_progObj.view][3]) // no edit aloud on this template
	{
		_progObj.view = globals.nav.default_edit_template
		_template = globals.nav.template_types[_progObj.view]
		if (_form != _progObj.form[forms[_template].has1()][2]) {
			_form = _progObj.form[forms[_template].has1()][2]
			globals.svy_nav_showForm(_form, _program, false);
			globals.nav.switchedForEdit = true
		} else {
			globals.svy_nav_dc_setStatus('add', _form)
		}
	} else {
		globals.svy_nav_dc_setStatus('add', _form)
	}
	
	// daniele: if a form to be forced is specified, use that
	var _origForm = _form
	if(_forceForm)
	{
		_form = _forceForm
	}

	databaseManager.setAutoSave(false)
	forms[_form].controller.newRecord()

	// if there are filters for the form the new record gets the values of the filter.
	if (_activeView == 2) {
		
		if(globals.nav.new_record_filter)
		{
			for (var n = 0; n < globals.nav.new_record_filter.length; n++) {
				if(!forms[_form][globals.nav.new_record_filter[n][0]]){ //don't enter primary keys
					forms[_form][globals.nav.new_record_filter[n][0]] = globals.nav.new_record_filter[n][2]
				}
				else
				{
					//check if column is pk
					var _pk = globals.svy_utl_getRowIdentifierName(_form)
					if(_pk == globals.nav.new_record_filter[n][0])
					{
						globals.nav.childRelation = new Object()
						globals.nav.childRelation.field = globals.nav.new_record_filter[n][0]
						globals.nav.childRelation.form = globals.nav.his.foundset_related_form;
						globals.nav.childRelation.field_child = globals.nav.new_record_filter[n][3]
					}
				}
			}
		}
		var _autofill = []
		if(globals.nav.switchedForEdit) //navigated for edit so get items from history
		{
			if (globals.nav.program[globals.nav.his.parentProgram].tab[globals.nav.his.tabIndex].autofill) {
				 _autofill = globals.nav.program[globals.nav.his.parentProgram].tab[globals.nav.his.tabIndex].autofill
			}
		}
		else
		{
			// MAVariazione check that the tab exists
			if (globals.nav.program[globals.nav_program_name].tab[globals.nav.getTabSelected()] && globals.nav.program[globals.nav_program_name].tab[globals.nav.getTabSelected()].autofill) {
			 	_autofill = globals.nav.program[globals.nav_program_name].tab[globals.nav.getTabSelected()].autofill
			}
		}	

		if (_autofill) {
			var _parentRec
			if(globals.nav.switchedForEdit) //navigated for edit so get items from history
			{
				_parentRec = globals.nav.his.parentRec
			}
			else
			{
				_parentRec = forms[globals.nav.form_view_01].foundset.getSelectedRecord()
			}	
			for (var m = 0; m < _autofill.length; m++) {
				

				// expression type (field|1, value|2, globals|3, related field|4, method|5)
				switch (_autofill[m].expression_type) {
				case 1:
					forms[_form][_autofill[m].child_field] = _parentRec[_autofill[m].parent_expression];
					break;
				case 2:
					forms[_form][_autofill[m].child_field] = _autofill[m].parent_expression;
					break;
				case 3:
					forms[_form][_autofill[m].child_field] = globals[_autofill[m].parent_expression];
					break;
				case 4:
					/** @type {Array}*/
					var _fieldArray = _autofill[m].parent_expression.split(".")
					if (_fieldArray.length == 2) {
						if (databaseManager.hasRecords(_parentRec[_fieldArray[0]])) {
							forms[_form][_autofill[m].child_field] = _parentRec[_fieldArray[0]][_fieldArray[1]];
						}
					} else if (_fieldArray.length == 3) {
						if (databaseManager.hasRecords(_parentRec[_fieldArray[0]]) && databaseManager.hasRecords(_parentRec[_fieldArray[0]][_fieldArray[1]])) {
							forms[_form][_autofill[m].child_field] = _parentRec[_fieldArray[0]][_fieldArray[1]][_fieldArray[2]];
						}

					}
					break;
				case 5:
					forms[_form][_autofill[m].child_field] = eval(_autofill[m].parent_expression);
					break;
				}
			}
		}
	} else {
		for (var j = 0; j < _progObj.filter.length; j++) {
			/** @type {String} */
			var _value = _progObj.filter[j].filter_value
				//global value is used
			if (utils.stringPatternCount(_value, 'globals.')) {
				_value = eval(_value)
			}
			if(_value)
			{
				forms[_form][_progObj.filter[j].filter_field_name] = _value
			}
		}
	}
	
	// daniele: restore the original form
	var _fs = forms[_form].foundset
	_form = _origForm
	
	//run onPostNew-method of table when available
//	forms[_form].dc_new_post(forms[_form].foundset)
	forms[_form].dc_new_post(_fs)
}

/**
 *	To go to edit mode
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @param {String} [_forceForm]
 * @return  none
 *
 * @properties={typeid:24,uuid:"1C3BF3FE-E5CD-4F21-ABB7-CD6BC0679E6E"}
 * @SuppressWarnings(unused)
 */
function dc_edit(_event, _triggerForm, _forceForm) {
	var _methodReturn
	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
	var _form = _args[0]
	var _form_to = _args[1]
	var _program = _args[2]
	var _base = _args[3]
	var _form_trigger = _args[4]
	var _showForm = false
	var _template
	var _table = databaseManager.getDataSourceTableName(forms[_form].controller.getDataSource())
	var success, _toggle_view

	// acquire a lock or not, based on the program properties
	if (globals.nav.program[_program].record_locking) {

		if (forms[_form].controller.view != 0) //list or table view, so lock more records
		{
			success = databaseManager.acquireLock(forms[_form].foundset, -1)
			if (!success) {
				globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.warning'), i18n.getI18NMessage('svy.fr.dlg.record_lock'),i18n.getI18NMessage('svy.fr.lbl.ok'));
				return;
			}

		} else {
			success = databaseManager.acquireLock(forms[_form].foundset, 0)
			if (!success) {
				globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.warning'), i18n.getI18NMessage('svy.fr.dlg.record_lock'),i18n.getI18NMessage('svy.fr.lbl.ok'));
				return;
			}

		}
	}
	globals.nav.mode = 'edit'
	
	// daniele: if a form to use is specified, override the computed one
	var _origForm
	if(_forceForm)
	{
		_origForm = _form
		_form = _forceForm
	}
		
	if (_form_trigger == globals.nav.viewer_buttonbar) {
		if (globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].edit_on_tab == 1) {
			globals.svy_nav_dc_setStatus('edit', _form)
		} else if (globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].edit_on_tab == 2) {
			globals.svy_nav_showTabDetail()
			globals.svy_nav_dc_setStatus('edit', globals.nav.form_view_02)
		} 
		else {
			if (globals.nav.program[_program].template[globals.nav.default_edit_template][2])//template is available
			{
				globals.nav.program[_program].view = globals.nav.default_edit_template
			}
			_template = globals.nav.template_types[globals.nav.program[_program].view]
			if (globals.nav.program[_program].form[0][3])// form has detail form
			{
				_form = globals.nav.program[_program].form[forms[_template].has1()][2]
			} else {
				_form = globals.nav.program[_program].form[1][2]
			}
			_form = globals.svy_nav_toggleView(_event, _form)
			globals.nav.switchedForEdit = true
			_toggle_view = true
		}
	} else if (!globals.nav.program[_program].template[globals.nav.program[_program].view][3]) // no edit aloud on this template
	{
		globals.nav.program[_program].view = globals.nav.default_edit_template
		_template = globals.nav.template_types[globals.nav.program[_program].view]
		if (_form != globals.nav.program[_program].form[forms[_template].has1()][2]) {
			var _form_from = _form
			_form = globals.nav.program[_program].form[forms[_template].has1()][2]
			forms[_form].controller.loadRecords(forms[_form_from].foundset)
			globals.svy_nav_showForm(_form, _program, false);
			globals.nav.switchedForEdit = true
		} else {
			globals.svy_nav_dc_setStatus('edit', _form)
		}
	} else {
		globals.svy_nav_dc_setStatus('edit', _form)
	}
	
	// daniele: restore the original form
	if(_forceForm)
	{
		_form = _origForm
		_origForm = null
	}

	globals.nav.readOnlyset = 1
	databaseManager.setAutoSave(false)

}

/**
 *	Deletes a record and checkes if the delete was succesfull
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @param {String} [_forceForm]
 * @param {Boolean} [_noConfirm]
 * @return  none


 * @properties={typeid:24,uuid:"FDE36218-0F1B-45AF-9214-66098A470098"}
 * @SuppressWarnings(unused)
 */
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) {
	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
	var _form = _args[0]
	var _form_to = _args[1]
	var _program = _args[2]
	var _base = _args[3]
	var _form_trigger = _args[4]
	var _methodReturn
	var _showForm = false
	var _template, _toggle_view
	
	// daniele: allow to override the form
	var origForm = _form;
	if(_forceForm)
		_form = _forceForm

		//determine if multiple records are selected
	var _indexes = forms[_form].foundset.getSelectedIndexes()
	var _multiDelete = false

	if (_indexes.length > 1) _multiDelete = true

	_methodReturn = dc_delete_pre(forms[_form].foundset, _multiDelete)
	if (_methodReturn == -1) {
		return;
	}

	// acquire a lock or not, based on the program properties
	if (globals.nav.program[_program].record_locking) {
		var success
		if (_multiDelete)// lock the hole foundset
		{
			success = databaseManager.acquireLock(forms[_form].foundset, -1)
		} else {
			success = databaseManager.acquireLock(forms[_form].foundset, 0)
		}
		if (!success) {
			globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.warning'), i18n.getI18NMessage('svy.fr.dlg.record_lock'),i18n.getI18NMessage('svy.fr.lbl.ok'));
			return;
		}
	}

	if (_multiDelete == false) //only go to detail form if one record is selected
	{
		if (_form_trigger == globals.nav.viewer_buttonbar) {
			if (! (globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].edit_on_tab)) {
				if (globals.nav.program[_program].template[globals.nav.default_edit_template][2])//template is available
				{
					globals.nav.program[_program].view = globals.nav.default_edit_template
				}
				_template = globals.nav.template_types[globals.nav.program[_program].view]
				if (globals.nav.program[_program].form[0][3])// form has detail form
				{
					_form = globals.nav.program[_program].form[forms[_template].has1()][2]
				} else {
					_form = globals.nav.program[_program].form[1][2]
				}
				_form = globals.svy_nav_toggleView(_event, _form)
				globals.nav.switchedForEdit = true
				_toggle_view = true
			}
		} else if (!globals.nav.program[_program].template[globals.nav.program[_program].view][3]) // no edit aloud on this template
		{
			globals.nav.program[_program].view = globals.nav.default_edit_template
			_template = globals.nav.template_types[globals.nav.program[_program].view]
			if (_form != globals.nav.program[_program].form[forms[_template].has1()][2]) {
				_form = globals.nav.program[_program].form[forms[_template].has1()][2]
				globals.svy_nav_showForm(_form, _program, false);
				globals.nav.switchedForEdit = true
			}
		}
	}

	var _message = dc_delete_message(_multiDelete);

	var _answer = null
	
	// show the dialog
    var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
	
	// daniele: if no confirmation just don't show the dialog
	if(_noConfirm)
		_answer = true
	else
		_answer = (globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'),_message,_ok) == _ok) 
			
	if (_answer == true) {
		databaseManager.startTransaction()
		
		dc_delete_pre_action(forms[_form].foundset, _multiDelete);

		var _success = forms[_form].controller.deleteRecord()

		dc_delete_post(forms[_form].foundset, _multiDelete)

		if (_success) {
			databaseManager.commitTransaction()
		} else {
			databaseManager.rollbackTransaction()
			globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), i18n.getI18NMessage('svy.fr.dlg.delete_cancel'),i18n.getI18NMessage('svy.fr.lbl.ok'));
		}

		if (forms[_form].controller.getMaxRecordIndex() < 1) {	
			globals.svy_nav_dc_setStatus('browse', origForm);	// MAVariazione - use the original form
//				globals.svy_nav_dc_setStatus('browse', _form);
		}

	}
	if (globals.nav.switchedForEdit) {
		var _fs = forms[globals.nav.stack[globals.nav.stack_position].form].foundset.duplicateFoundSet()
		globals.nav.stack_position--
		globals.svy_nav_history_move(_event, globals.nav.stack_position, _fs)
		globals.nav.switchedForEdit = false
	}
}

/**
 * Is called inside the transaction, can be used to delete/change other records -> changes can be canceled
 * 
 * @author Joas de Haan
 * @since 2011-09-06
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete
 * 
 * @properties={typeid:24,uuid:"5C6EDF26-12D5-4EE3-8745-5C4D0CE5B87B"}
 */
function dc_delete_pre_action(_foundset, _multiDelete) {
}

/**
 *	Duplicates the selected record and goes to edit mode
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @return  none
 *
 *
 * @properties={typeid:24,uuid:"8EA1287F-17B4-4DBB-BECB-4E22260D2B48"}
 * @SuppressWarnings(unused)
 */
function dc_duplicate(_event, _triggerForm) {
	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
	var _form = _args[0]
	var _form_to = _args[1]
	var _program = _args[2]
	var _base = _args[3]
	var _form_trigger = _args[4]
	var _methodReturn, _toggle_view

	var _showForm = false

	var _table = databaseManager.getDataSourceTableName(forms[_form].controller.getDataSource())
	var _template

	globals.nav.mode = 'add'

	if (_form_trigger == globals.nav.viewer_buttonbar) {
		if (globals.nav.program[globals.nav_program_name].tab[globals.nav.program[globals.nav_program_name].tab.selected].edit_on_tab) {
			globals.svy_nav_dc_setStatus('add', _form)
		} else {
			if (globals.nav.program[_program].template[globals.nav.default_edit_template][2])//template is available
			{
				globals.nav.program[_program].view = globals.nav.default_edit_template
			}
			_template = globals.nav.template_types[globals.nav.program[_program].view]
			if (globals.nav.program[_program].form[0][3])// form has detail form
			{
				_form = globals.nav.program[_program].form[forms[_template].has1()][2]
			} else {
				_form = globals.nav.program[_program].form[1][2]
			}
			_form = globals.svy_nav_toggleView(_event, _form)
			globals.nav.switchedForEdit = true
			_toggle_view = true
		}
	} else if (!globals.nav.program[_program].template[globals.nav.program[_program].view][3]) // no edit aloud on this template
	{
		globals.nav.program[_program].view = globals.nav.default_edit_template
		_template = globals.nav.template_types[globals.nav.program[_program].view]
		if (_form != globals.nav.program[_program].form[forms[_template].has1()][2]) {
			_form = globals.nav.program[_program].form[forms[_template].has1()][2]
			globals.svy_nav_showForm(_form, _program, false);
			globals.nav.switchedForEdit = true
		} else {
			globals.svy_nav_dc_setStatus('add', _form)
		}
	} else {
		globals.svy_nav_dc_setStatus('add', _form)
	}

	databaseManager.setAutoSave(false)
	forms[_form].controller.duplicateRecord()
	
	//run onPostDuplicate-method of table
	_methodReturn = dc_duplicate_post(forms[_form].foundset)
	if (_methodReturn == -1) {
		return _methodReturn;
	}
	return _methodReturn;
}

/**
 *
 *	Popmenu for the reports attached to a specific program
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @return  none
 *
 * @properties={typeid:24,uuid:"A9BF2433-E106-47E1-9B83-75EA50DB8969"}
 * @SuppressWarnings(unused)
 */
function dc_reportsPopmenu(_event) {
	var _button = _event.getElementName();
	var _args = globals.svy_nav_dc_getInfo(_event);
	var _form = _args[0]
	var _form_to = _args[1]
	var _program = _args[2]
	var _base = _args[3]
	var _form_trigger = _args[4]

	var menu = plugins.window.createPopupMenu()
	var submenuArray;
	var submenu, _item

	/** @type {{report:Array}} */
	var _progObj = globals.nav.program[_program]
	
	if(globals.svy_nav_getBooleanProperty('print_list'))
	{
		_item = menu.addMenuItem('i18n:svy.fr.lbl.create_print_list', globals.svy_nav_create_print_list_from_reportMenu);
	}
	if(globals.svy_nav_getBooleanProperty('print_form'))
	{
		_item = menu.addMenuItem('i18n:svy.fr.lbl.print_form', globals.svy_nav_printCurrentProgram);
	}
	
	if (!_progObj.report.length && menu.getItemCount() == 0) {
		return
	}
	// read the menu out the nav object and create a popmenu
	for (var i = 0; i < _progObj.report.length; i++) {
		submenuArray = new Array();
		if (_progObj.report[i].parent_popmenu_id == null && 
				((globals.nav.mode == 'browse' && _progObj.report[i].in_browse) || 
						(globals.nav.mode != 'browse' && _progObj.report[i].in_edit)) &&
						(!_progObj.report[i].show_in  || _progObj.report[i].show_in == globals.nav.activeView)) {
			for (var j = 0; j < _progObj.report.length; j++) {
				if (_progObj.report[j].parent_popmenu_id == _progObj.report[i].nav_popmenu_id && 
						( (globals.nav.mode == 'browse' && _progObj.report[j].in_browse) || 
								(globals.nav.mode != 'browse' && _progObj.report[j].in_edit)) &&
								(!_progObj.report[j].show_in  || _progObj.report[j].show_in == globals.nav.activeView)) {
					submenuArray.push([_progObj.report[j].label,_progObj.report[j].function_id])					
				}
			}
			if (submenuArray.length == 0  && (!_progObj.report[i].show_in  || _progObj.report[i].show_in == globals.nav.activeView)) {
				_item = menu.addMenuItem(_progObj.report[i].label, globals.svy_nav_callFunctionFromPopmenu);
				_item.methodArguments = [_progObj.report[i].function_id]
			} else if( (!_progObj.report[i].show_in  || _progObj.report[i].show_in == globals.nav.activeView)){
				submenu = menu.addMenu(_progObj.report[i].label);
				for (var k = 0; k < submenuArray.length; k++) {	
					_item = submenu.addMenuItem(submenuArray[k][0], globals.svy_nav_callFunctionFromPopmenu);
					_item.methodArguments = [submenuArray[k][1]]
				}
			}
		}
	}

	/** @type {RuntimeComponent} */
	var _source = _event.getSource()
	if (_source != null) {
		menu.show(_source);
	}
}

/**
 *	Popmenu for the methods attached to a specific program
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 *
 * @properties={typeid:24,uuid:"EE60834B-31AE-4B30-A230-F49888545ED3"}
 * @SuppressWarnings(unused)
 */
function dc_methodsPopmenu(_event) {
	var _args = globals.svy_nav_dc_getInfo(_event);


	var _form = _args[0]
	var _form_to = _args[1]
	var _program = _args[2]
	var _base = _args[3]
	var _form_trigger = _args[4]
	var menu = plugins.window.createPopupMenu()
	var submenuArray;
	var submenu, _item

	/** @type {{method:Array}} */
	var _progObj = globals.nav.program[_program]

	if (!_progObj.method.length) {
		return
	}
	// read the menu out the nav object and create a popmenu
	for (var i = 0; i < _progObj.method.length; i++) {
		submenuArray = new Array();
		if (_progObj.method[i].parent_popmenu_id == null && 
			((globals.nav.mode == 'browse' && _progObj.method[i].in_browse) || 
				(globals.nav.mode != 'browse' && _progObj.method[i].in_edit))&&
				(!_progObj.method[i].show_in  || _progObj.method[i].show_in == globals.nav.activeView)) {
			for (var j = 0; j < _progObj.method.length; j++) {
				if (_progObj.method[j].parent_popmenu_id == _progObj.method[i].nav_popmenu_id && 
					((globals.nav.mode == 'browse' && _progObj.method[j].in_browse) || 
					(globals.nav.mode != 'browse' && _progObj.method[j].in_edit))&&
					(!_progObj.method[j].show_in  || _progObj.method[j].show_in == globals.nav.activeView)) {
					submenuArray.push([_progObj.method[j].label,_progObj.method[j].function_id])	
				}
			}
			if (submenuArray.length == 0 && (!_progObj.method[i].show_in  || _progObj.method[i].show_in == globals.nav.activeView)) {
				_item = menu.addMenuItem(_progObj.method[i].label, globals.svy_nav_callFunctionFromPopmenu);
				_item.methodArguments = [_progObj.method[i].function_id]
				
			} else {
				submenu = menu.addMenu(_progObj.method[i].label);
				for (var k = 0; k < submenuArray.length; k++) {
					_item = submenu.addMenuItem(submenuArray[k][0], globals.svy_nav_callFunctionFromPopmenu);
					_item.methodArguments = [submenuArray[k][1]]
				}
			}
		}
	}
	/** @type {RuntimeComponent} */
	var _source = _event.getSource()
	if (_source != null) {
		menu.show(_source);
	}
}

/**
 *	Sorts a form with the sort order of the program propeties
 *
 * @author Sanneke Aleman
 * @since 2007-07-03
 * @param {String}	[_form] name of the form
 * @param {String}	[_program] name of the program
 * @param {Boolean}	[_defer] boelean sort defer
 * @return  none
 *
 * @properties={typeid:24,uuid:"E70CF323-F3AA-4DF1-A9BC-0FCC5C928E9A"}
 */
function dc_sort(_form, _program, _defer) {

	if (_form instanceof JSEvent) {
		/** @type {JSEvent} */
		var _event = _form
		var _args = globals.svy_nav_dc_getInfo(_event);
		//	if(_args[0])
		{
			_form = _args[0]
			_program = _args[2]
		}

	}


	if (_defer == undefined) _defer = false

	if (globals.nav.program[_program].sort_value) {
		if (_form == globals.svy_nav_form_name) {
			//only sort if the current sort is different
			if(globals.nav.program[_program].foundset.getCurrentSort() != globals.nav.program[_program].sort_value)
			{
				globals.nav.program[_program].foundset.sort(globals.nav.program[_program].sort_value, _defer)
			}
		} else {
			//only sort if the current sort is different
			if(forms[_form].foundset.getCurrentSort() != globals.nav.program[_program].sort_value)
			{
				forms[_form].foundset.sort(globals.nav.program[_program].sort_value, _defer)
			}
		}
	}

}

/**
 *	Shows popup search menu with in it extend/reduce/save/line/the saved searches
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @return  none
 *
 *
 * @properties={typeid:24,uuid:"45691F1D-6C24-4E36-A3D3-4497EEF408C6"}
 * @AllowToRunInFind
 */
function dc_searchPopmenu(_event) {	
	globals.svy_sea_searchForm = globals.nav.form_view_01
	globals.svy_sea_mainForm = 'svy_nav_fr_main'

	var _menu = plugins.window.createPopupMenu()
	_menu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.extend_search'), globals.svy_sea_extend_find, 'media:///find_extend.png')
	_menu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.reduce_search'), globals.svy_sea_reduce_find, 'media:///find_reduce.png')
	_menu.addSeparator()
	_menu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.save_regular_search'), globals.svy_sea_saveSearch, 'media:///find_save.png')
	_menu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.delete_regular_search'), globals.svy_sea_deleteSearch, 'media:///find_delete.png')

	if (globals.nav.mode == 'browse') {
		/* edit. */
		// show saved regular searches
		if (_to_search_criteria$user_id$organization_id$search_form_name.getSize() != 0) {
			_menu.addSeparator()
		}
		
		for (var i = 1; i <= _to_search_criteria$user_id$organization_id$search_form_name.getSize(); i++) {
			var _recRegular = _to_search_criteria$user_id$organization_id$search_form_name.getRecord(i)
			var _menuItemRegular = _menu.addMenuItem(_recRegular.name, globals.svy_sea_restoreSearchFromPopmenu)
			_menuItemRegular.methodArguments = [_recRegular.search_criteria_id, false];
		}
		
		// search for advanced searches based on this form type and user table view
		_to_nav_advanced_search$program_name$user_id$organization_id.find();
		_to_nav_advanced_search$program_name$user_id$organization_id.form_name = globals.nav.form_view_01;
		if (globals.nav.program[globals.nav_program_name].user_table_view_id) {
			_to_nav_advanced_search$program_name$user_id$organization_id.user_table_view_id = globals.nav.program[globals.nav_program_name].user_table_view_id;
		} else {
			_to_nav_advanced_search$program_name$user_id$organization_id.user_table_view_id = '^=';
		}
		
		_to_nav_advanced_search$program_name$user_id$organization_id.search();
		
		if (_to_nav_advanced_search$program_name$user_id$organization_id.getSize() != 0) {
			_menu.addSeparator();
		}


		for (var j = 1; j <= _to_nav_advanced_search$program_name$user_id$organization_id.getSize(); j++) {
			var _recAdvanced = _to_nav_advanced_search$program_name$user_id$organization_id.getRecord(j);
			var _menuItemAdvanced = _menu.addMenuItem(_recAdvanced.name, globals.svy_sea_restoreSearchFromPopmenu, 'media:///advanced_16_16.png');
			_menuItemAdvanced.methodArguments = [_recAdvanced.nav_advanced_search_id, true];
		}		
	}
	/** @type {RuntimeComponent} */
	var _source = _event.getSource()
	if (_source != null) {
		_menu.show(_source);
		//or you can set the coordinates popupmenu.show(10, 10);
	}
}

/**
 *	Loads all records.
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3D1C36E6-3FDB-4D97-B6DC-57BDD9961A2F"}
 * @AllowToRunInFind
 */
function dc_loadAll(_event) {
	var _trigView
	if (_event == null) {
		if (globals.nav.activeView == 1) {
			_trigView = globals.nav.browser_buttonbar
		} else {
			_trigView = globals.nav.viewer_buttonbar
		}
	} else {
		 _trigView = _event.getFormName();
	}
	var _form
		//if form is the top form
	if (_trigView == 'svy_nav_fr_buttonbar_browser' || _trigView == 'svy_nav_fr_main') {
		_form = globals.nav.form_view_01
		var _selected_index = forms[globals.nav.form_view_01].controller.getSelectedIndex()

		globals.nav.program[globals.nav_program_name].active_search = null;
		globals.nav.program[globals.nav_program_name].search_type = null;
		globals.nav.program[globals.nav_program_name].search_id = null;		
		
		forms[_form].foundset.loadAllRecords()
		if (forms[globals.nav_program_name + '_tab']) {
			forms[globals.nav_program_name + '_tab'].foundset.loadAllRecords()
		}

		// to set the index right, if you don't do this it can go wrong by a big global foundset
		var _new_selected_index = forms[globals.nav.form_view_01].controller.getSelectedIndex()
		if (_new_selected_index != _selected_index) {
			forms[globals.nav.form_view_01].foundset.getRecord(_selected_index)
			forms[globals.nav.form_view_01].controller.setSelectedIndex(_selected_index)
		}
	}
	
	//if form is the bottom form
	if (_trigView == 'svy_nav_fr_buttonbar_viewer') {
		_form = globals.nav.form_view_02
		forms[_form].controller.loadRecords()
	}
}

/**
 *	To export the current foundset to a file
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @return  none
 *
 * @properties={typeid:24,uuid:"CCD65F1C-3A6C-4ED0-93AA-8EC9BBFBA47A"}
 */
function dc_export(_event, _triggerForm) {
	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
	var _form = _args[0]
	var _program = _args[2]
	var _maxRow = forms[_form].foundset.getSize();

	// get the names of the fields on the form
	var _colProps = getExportFormFields(_form);

	/** @type {Array} */
	var _colList = _colProps[0];
	var _colValueList = _colProps[1];
	var _colFormats = _colProps[2];
	var _maxCols = _colList.length;
	var _format;

	if (_colList.length > 0) {
		//output the column names first
		var _output = _colList.join('\t')

			//loop through foundset of form and get all the columns and data
		for (var i = 1; i <= _maxRow; i++) {
			forms[_form].foundset.setSelectedIndex(i)

			for (var c = 0; c < _maxCols; c++) {
				if (c == 0) {
					//first column
					_output += '\n"';
				} else {
					//subsequent columns
					_output += '\t"';
				}
				if (!_colValueList[c]) {
					if (_colFormats[c]) {
						if (/i18n/.test(_colFormats[c])) {
							_format = i18n.getI18NMessage(_colFormats[c]);
						} else {
							_format = _colFormats[c];
						}
						_output += utils.dateFormat(forms[_form].foundset[_colList[c]], _format) + '"';
					} else {
						_output += forms[_form].foundset[_colList[c]] + '"';
					}
				} else {
					_output += application.getValueListDisplayValue(_colValueList[c], forms[_form].foundset[_colList[c]]) + '"'
				}
			}
		}


		var fileName = 'Export_' + globals.nav.program[_program].description + '_' + utils.dateFormat(new Date(), 'yyyy-MM-dd') + '.xls'
		
		//prompt for the fileName is smart client
		if(application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT)
		{
			fileName = plugins.file.showFileSaveDialog(fileName)
		}
			//see if they chose an export name
		if (fileName) {
			var success = plugins.file.writeTXTFile(fileName, _output)
			if (success) {
				globals.svy_mod_dialogs_global_showInfoDialog(i18n.getI18NMessage('svy.fr.lbl.export'), i18n.getI18NMessage('svy.fr.dlg.export_successful'), i18n.getI18NMessage('svy.fr.lbl.ok'))
			} else {
				globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.export'), i18n.getI18NMessage('svy.fr.dlg.export_failed'), i18n.getI18NMessage('svy.fr.lbl.ok'))
			}
		}

	}
}

/**
	 *	To export the current foundset to a file
	 *
	 * @author Sanneke Aleman
	 * @since 2007-05-24
	 * @param {String}	_form
	 * @return {Array} 
	 *
	 * @properties={typeid:24,uuid:"697980B3-64A8-4BF5-A3E6-32FD20A37AB4"}
	 */
function getExportFormFields(_form) {
	//pass in the form name
	var _elements = forms[_form].elements.allnames;
	var _colNames = new Array();
	var _vlNames = new Array();
	var _formats = new Array();
	var _jsTable, _jsColumn, _relation;
	/** @type {String} */
	var _datap

	if (/_tbl/.test(_form) && _elements.length > 0) {
		_elements.sort(function(a, b) {
			return forms[_form].elements[a].getLocationX() - forms[_form].elements[b].getLocationX()
		});
	}

	var _type
	for (var i = 0; i < _elements.length; i++) {
		// only export field not buttons.
		_type = forms[_form].elements[_elements[i]].getElementType()
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
			_datap = forms[_form].elements[_elements[i]].getDataProviderID()
			
			if (_datap) {
				_colNames[_colNames.length] = _datap;

				
				if (!/\./.test(_datap)) {
					_jsTable = databaseManager.getTable(forms[_form].foundset);
				} else { //related field
					_relation = _datap.replace(/\.\w*$/, "");
					_datap = _datap.match(/(\w*)$/)[0];
					_jsTable = databaseManager.getTable(forms[_form].foundset[_relation]);
				}
				
				_jsColumn = _jsTable.getColumn(_datap); 
				
				if (_jsColumn && _jsColumn.getType() == JSColumn.DATETIME && forms[_form].elements[_elements[i]].format) {
					_formats[i] = forms[_form].elements[_elements[i]].format;
				}

				
				if (_type != 'LABEL' && _type != 'CALENDAR' && !/_AREA$/.test(_type)) {
					_vlNames[i] = forms[_form].elements[_elements[i]].getValueListName();
				}
			}
		}
	}

	return [_colNames, _vlNames, _formats];
}

/**
 *	Reset the table view persistance
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @return  none
 *
 * @properties={typeid:24,uuid:"808A2787-A541-45CF-B94C-46C74CFCC6B4"}
 */
function dc_resetTableViewPersistance(_event, _triggerForm) {
	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
	var _form = _args[0]
	forms[_form].controller.recreateUI()
}

/**
 *	Set the right form and call globals.svy_sea_find
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"8F04EDE8-29DE-40D7-966D-A9FF93650B86"}
 */
function dc_find(_event, _triggerForm) {
	globals.nav.bar_triggered = _triggerForm
	if (_triggerForm == 'svy_nav_fr_buttonbar_browser') {
		globals.svy_sea_mainForm = 'svy_nav_fr_main'
		globals.svy_sea_searchForm = globals.nav.form_view_01
	} else {
		globals.svy_sea_mainForm = globals.nav.form_view_02
		globals.svy_sea_searchForm = globals.nav.form_view_02
	}

	globals.svy_sea_find();
}

/**
 *	Save the edited data to the database in a transaction, If in search call the search
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @param {String} [_forceForm]
 * @return {Number}
 *
 * @properties={typeid:24,uuid:"63FF12D7-0060-4DAD-81BF-D5E7B950871A"}
 * @AllowToRunInFind
 * @SuppressWarnings(unused)
 */
function dc_save(_event, _triggerForm, _forceForm) {
	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
    var _form = _args[0]
    var _form_to = _args[1]
	var _program = _args[2]
	var _base = _args[3]
	var _record, _thePressedButton, i
                      
	if (globals.nav.mode == 'find') // if in find mode, search
	{
		// controller.search()
		globals.svy_sea_search();
		globals.svy_nav_dc_setStatus('browse', _form)
		return 1
	}
	else if (globals.nav.mode == 'required_fields')
	{	
		saveRequiredFields()
		globals.svy_nav_dc_setStatus('browse', _form)
		return 1
	}




	var _table = databaseManager.getDataSourceTableName(forms[_form].controller.getDataSource())

	//run validate-method of table when available

	var _methodReturn = dc_save_validate(forms[_forceForm ? _forceForm : _form].foundset)	//daniele
	if (_methodReturn == -1) {
		return -1;
	}


	databaseManager.startTransaction()

	//run onPreSave-method of table when available
	// MAVariazione - Allow to force the form to run the dc* method on
	_methodReturn = dc_save_pre(forms[_forceForm ? _forceForm : _form].foundset)
	if (_methodReturn == -1) {
		return -1;
	}


	var _failedArray
	
	/** @type {String} */
	var _ex

		// save with output if the save went wrong
	if (!databaseManager.saveData()) {
		_failedArray = databaseManager.getFailedRecords()
		for (i = 0; i < _failedArray.length; i++) {
			_record = _failedArray[i];
		}
		
		_ex = _record.exception
		_thePressedButton = globals.DIALOGS.showWarningDialog(_ex.getMessage(),'Error in save', 'OK');
		databaseManager.revertEditedRecords()
		databaseManager.rollbackTransaction()
		databaseManager.saveData()
		databaseManager.releaseAllLocks()
		globals.svy_nav_dc_setStatus('browse', _form)
		return -1;
	} 

	//run onPostSave-method of table when available
	_methodReturn = dc_save_post(forms[_forceForm ? _forceForm : _form].foundset)	//MAVariazione
	//MAVariazione : reimpostiamo i valori di default dei triggers
	globals._editOnViewer = false
	globals._forcedFormOnViewer = null
	
	if (_methodReturn == -1) {
		databaseManager.rollbackTransaction()
		return -1;
	}

	// save with output if the save went wrong
	if (!databaseManager.saveData()) {
		_failedArray = databaseManager.getFailedRecords()
		for (i = 0; i < _failedArray.length; i++) {
			_record = _failedArray[i];
		}
		_ex = _record.exception
		_thePressedButton = globals.DIALOGS.showWarningDialog('Error in save', _ex, 'OK');
		databaseManager.revertEditedRecords()
		databaseManager.rollbackTransaction()
		databaseManager.saveData()
		databaseManager.setAutoSave(true)
		databaseManager.releaseAllLocks()
		globals.svy_nav_dc_setStatus('browse', _form)
		return -1;
	} 
	databaseManager.releaseAllLocks()

	// commit with output if the commit went wrong
	if (!databaseManager.commitTransaction()) {
		_failedArray = databaseManager.getFailedRecords()
		for (i = 0; i < _failedArray.length; i++) {
			_record = _failedArray[i];
		}

		databaseManager.saveData()
		_ex = _record.exception
		_thePressedButton = globals.DIALOGS.showWarningDialog('Error in Commit', _ex, 'OK');
		databaseManager.revertEditedRecords()
		databaseManager.rollbackTransaction()
		databaseManager.releaseAllLocks()
		globals.svy_nav_dc_setStatus('browse', _form)
		return -1;
	}
	databaseManager.setAutoSave(true)
	globals.svy_nav_dc_setStatus('browse', _form)
	if (globals.nav.switchedForEdit) {
		var _fs = forms[globals.nav.stack[globals.nav.stack_position].form].foundset.duplicateFoundSet()
		globals.nav.stack_position--
		globals.svy_nav_history_move(_event, globals.nav.stack_position, _fs)
		globals.nav.switchedForEdit = false
	}
	
	return 1

}

/**
 * @properties={typeid:24,uuid:"DDBE161C-FE45-45CB-98CD-2DD79373875F"}
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {Boolean} [_noConfirm] true if you want to hide the yes/no dialog before canceling
 * @AllowToRunInFind
 * @SuppressWarnings(unused)
 */
function dc_cancel(_event, _triggerForm, _noConfirm) {

	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
    var _form = _args[0]

    //MAVariazione : reimpostiamo i valori di default dei triggers
	globals._editOnViewer = false
	globals._forcedFormOnViewer = null
	
    if (globals.nav.mode == 'find') // if in find mode, cancel the find
    {
        // controller.search()
        globals.svy_sea_cancelSearch()
        globals.svy_nav_dc_setStatus('browse', _form)
        return
    }
    else if(globals.nav.mode == 'required_fields')
    {
    	cancelRequiredFields()
    	 globals.svy_nav_dc_setStatus('browse', _form)
    	 return
    	
    }

    // show the dialog
    var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
    var _no = i18n.getI18NMessage('svy.fr.lbl.no')

    var _answer;
    var _editedRecords = databaseManager.getEditedRecords();
    if (!_editedRecords || _editedRecords.length == 0 || _noConfirm) {//MAVariazione: allow to not show the dialog
        _answer = _ok;
    } else {
        _answer = globals.svy_mod_dialogs_global_showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.cancel'), i18n.getI18NMessage('svy.fr.dlg.cancel_record'), _ok, _no);
    }

    if (_answer == _ok) {
        var _methodReturn
        var _table = databaseManager.getDataSourceTableName(forms[_form].controller.getDataSource())

        _methodReturn = dc_cancel_pre(forms[_form].foundset)
        if (_methodReturn == -1) {
            return;
        }

        databaseManager.revertEditedRecords()
        databaseManager.saveData()

        databaseManager.releaseAllLocks()
        globals.svy_nav_dc_setStatus('browse', _form)
        if (globals.nav.switchedForEdit) {
			var _fs = forms[globals.nav.stack[globals.nav.stack_position].form].foundset.duplicateFoundSet()
            globals.nav.stack_position--
            globals.svy_nav_history_move(_event, globals.nav.stack_position, _fs)
            globals.nav.switchedForEdit = false
        }
        databaseManager.setAutoSave(true)
    }
}

/**
 *	To set the index to 1
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3C8B3936-6C69-44CB-B396-7FA581757EDA"}
 */
function dc_rec_first(_event) {
	var _form_trigger = _event.getFormName();
	var _form

		// determine if the method is called from the top form or the bottom form
	if (_form_trigger == globals.nav.browser_buttonbar) _form = globals.nav.form_view_01
	if (_form_trigger == globals.nav.viewer_buttonbar) _form = globals.nav.form_view_02

	globals.svy_utl_setSelectedIndexFirst(_form);
}

/**
 *	To set the index to 1 (without using the browser_buttonbar)
 *
 * @since 2012-06-04
 * @param {JSEvent} [_event] the event that triggered the action
 *
 *
 * @properties={typeid:24,uuid:"6F4437FF-DB24-4A6D-9363-1C23D90D16FF"}
 */
function dc_rec_first_browser(_event) {
	
    var _form = globals.nav.form_view_01
	globals.svy_utl_setSelectedIndexFirst(_form);
}

/**
 *	Set index to previous record
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7C18115C-AE9E-46F8-9922-F9468D85C568"}
 */
function dc_rec_prev(_event) {
	var _form_trigger;
	if (_event) {
		_form_trigger = _event.getFormName();
	}
	
	var _form
		// determine if the method is called from the top form or the bottom form
	if (!_form_trigger || _form_trigger == globals.nav.browser_buttonbar || _form_trigger == 'svy_nav_fr_main') _form = globals.nav.form_view_01
	if (_form_trigger == globals.nav.viewer_buttonbar) _form = globals.nav.form_view_02

	globals.svy_utl_setSelectedIndexPrevious(_form);
}

/**
 *	Set index to previous record (without using the browser_buttonbar)
 *
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * 
 *
 * @properties={typeid:24,uuid:"DFB5DBEC-5009-48CD-9E56-16D99433C12E"}
 */
function dc_rec_prev_browser(_event) {
		
	var _form
	_form = globals.nav.form_view_01

	globals.svy_utl_setSelectedIndexPrevious(_form);
}

/**
 *	Set index to next record
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E6EC1EA4-E312-4A3A-8989-0ABF32EB3D18"}
 */
function dc_rec_next(_event) {
	var _form_trigger;
	if (_event) {
		_form_trigger = _event.getFormName();
	}
	var _form

		// determine if the method is called from the top form or the bottom form
	if (_form_trigger == globals.nav.viewer_buttonbar) _form = globals.nav.form_view_02
	if ( (!_form_trigger || _form_trigger == globals.nav.browser_buttonbar) || _form_trigger == 'svy_nav_fr_main') _form = globals.nav.form_view_01

	globals.svy_utl_setSelectedIndexNext(_form);
	
}

/**
 *	Set index to next record (without using the browser_buttonbar)
 *
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0952CCCD-7509-43E0-B027-054E8CE5E5BA"}
 */
function dc_rec_next_browser(_event) {
	
	var _form = globals.nav.form_view_01
	
	globals.svy_utl_setSelectedIndexNext(_form);
	
}

/**
 *	Set index to last record
 *
 * @author Sanneke Aleman
 * @since 2007-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"480DBC55-5057-4556-818B-0EB483E107D6"}
 */
function dc_rec_last(_event) {
	var _form_trigger = _event.getFormName();
	var _form
		// determine if the method is called from the top form or the bottom form
	if (_form_trigger == globals.nav.browser_buttonbar) _form = globals.nav.form_view_01
	if (_form_trigger == globals.nav.viewer_buttonbar) _form = globals.nav.form_view_02

	globals.svy_utl_setSelectedIndexLast(_form);
}

/**
 *	Set index to last record (without using the browser_buttonbar)
 *
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * 
 *
 * @properties={typeid:24,uuid:"C7F39461-B102-40F7-85BD-AEB76B1C06E7"}
 */
function dc_rec_last_browser(_event) {
	
	var _form =  globals.nav.form_view_01
	
	globals.svy_utl_setSelectedIndexLast(_form);
}

/**
 *	Shows record information and information about the size of the foundset
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 * @param {JSEvent} [_event] the event that triggered the action
 * @param {String}	[_triggerForm] (svy_nav_fr_buttonbar_browser/svy_nav_fr_buttonbar_viewer)
 * @return  none
 *
 * @properties={typeid:24,uuid:"5CC51767-4303-469E-ACE6-CD3D610FC93F"}
 */
function dc_rec_info(_event, _triggerForm) {

	var _args = globals.svy_nav_dc_getInfo(_event, _triggerForm);
	var _form = _args[0]
//	var _program = _args[2]
//	var _base = _args[3]
//	var _form_trigger = _args[4]

	var _tableCount = databaseManager.getTableCount(forms[_form].foundset)
	var _foundsetCount = databaseManager.getFoundSetCount(forms[_form].foundset)

	var _table_percent = (_tableCount - _foundsetCount) / _tableCount
	var _foundset_percent = (_foundsetCount) / _tableCount

	forms.svy_nav_fr_recordInformation.elements.lbl_recordsInFoundset.text = _foundsetCount
	forms.svy_nav_fr_recordInformation.elements.lbl_recordsInTable.text = _tableCount
	forms.svy_nav_fr_recordInformation.elements.lbl_selectedRecord.text = forms[_form].foundset.getSelectedIndex()
	/** @type {String} */
	var _url = 'http://chart.apis.google.com/chart?cht=p3&chd=t:' + _table_percent + ',' + _foundset_percent + '&chs=270x100&chl=' + i18n.getI18NMessage('svy.fr.lbl.table') + '|' + i18n.getI18NMessage('svy.fr.lbl.foundset')
	if (plugins.http.getMediaData(_url)) {
		forms.svy_nav_fr_recordInformation.vChart = plugins.http.getMediaData(_url)
		forms.svy_nav_fr_recordInformation.elements.vChart.visible = true
	} else {
		forms.svy_nav_fr_recordInformation.elements.vChart.visible = false
	}
	
	// create and show a window, with specified title, initial location and size
	var _win = application.createWindow("infoDialog", JSWindow.MODAL_DIALOG);
	forms.svy_nav_fr_recordInformation.controller.show(_win);

}

/**
 *	Opens a help dialog
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"75F6A36A-2DB4-4DB1-942F-824EA556DA5F"}
 * @AllowToRunInFind
 */
function dc_help(_event) {
	var _type = 'show'
	var _form = 'svy_nav_fr_help'
	var _found
		//get the last key modifiers of last user action (shift = 1,ctrl = 2,meta = 4,alt = 8)
	var m = _event.getModifiers();
	if ( (m & 1) == 1 && _to_sec_user$user_id.flag_system_administrator) // if shift is pressed and user is admin
	{
		_type = 'edit'
		_form = 'svy_nav_c_help_dtl'
	}

	// find the help record for this program, if there is none, create one
	/** @type {JSFoundSet<db:/svy_framework/nav_help>} */
	var _foundset = forms[_form].foundset
	if (_foundset.find()) {
		_foundset.program_name = globals.nav_program_name
		if (_type == 'show') {
			_foundset.i18n_language = i18n.getCurrentLanguage()
		}
		_found = _foundset.search()
		if (_found == 0 && _type == 'edit') {
			_foundset.newRecord()
			_foundset.program_name = globals.nav_program_name
		} else if (_found == 0) {
			if (_foundset.find()) {
				_foundset.program_name = globals.nav_program_name
				_found = _foundset.search()
				if (_found == 0) {
					// no record found
					globals.svy_mod_dialogs_global_showInfoDialog('i18n:svy.fr.lbl.help', 'i18n:svy.fr.dlg.help', 'i18n:svy.fr.lbl.ok');
					return
				}
			}
		}
	}


	// show the help record
	globals.svy_mod_showFormInDialog(forms[_form])

}

/**
 * On pre Cancel method
 * @author Sanneke Aleman
 * @since 2009-11-19
 * @param {JSFoundset} _foundset
 * @return {Number} [_status] -1 will stop the method
 *
 * @properties={typeid:24,uuid:"3065FCF4-0262-46E7-B398-163BF6959AD7"}
 */
function dc_cancel_pre(_foundset) { 
	return 1
}

/**
 * MAVariazione - Aggiunto parametro di scelta per la finestra di messaggio
 * 
 * Validate records before save to database
 *
 * @author Sanneke Aleman
 * @since 2009-11-19
 * @param {JSFoundset} _foundset
 * @param {String} [_program]
 * @param {Boolean} [showMessage]
 * 
 * @return {Number} _status -1 will stop the method
 *
 * @properties={typeid:24,uuid:"AA388990-2987-4CAA-906B-96BE6062BD37"}
 */
function dc_save_validate(_foundset, _program, showMessage) {
	
//	globals.nav.validation_msg = i18n.getI18NMessage('svy.fr.dlg.field_validation_failed') + '\n'
	// MAVariazione - rimuovi il messaggio iniziale 'la validazione del campo è fallita perché...'
	globals.nav.validation_msg = '';
		
	var _form = controller.getName()
	if(!_program)_program = globals.nav_program_name
	/** @type {{program_name:String,table_name:String}} */
	var _progObj = globals.nav.program[_program] 
	/** @type {Number}*/
	var _success = globals.svy_nav_checkRequiredFields(_progObj, _form)
	var _success_rules = globals.svy_nav_checkValidationRules(_progObj,_form)

	if (_success == -1 || _success_rules == -1)
	{
		if(showMessage)
			//there is a failure, give the user a message
			globals.DIALOGS.showWarningDialog(globals.nav.validation_msg,'Validate base',i18n.getI18NMessage('svy.fr.lbl.ok'));
		
		return -1;
	}
	
	return 0;
}

/**
 * On pre save
 *
 * @author Sanneke Aleman
 * @since 2009-11-19
 * @param {JSFoundset} _foundset
 * @return {Number} [_status] -1 will stop the method
 *
 * @properties={typeid:24,uuid:"FD6F9848-D35A-47A4-947D-96DF9CEA2FC3"}
 */
function dc_save_pre(_foundset) { return 1 }

/**
 * On post save
 *
 * @author Sanneke Aleman
 * @since 2009-11-19
 * @param {JSFoundset} _foundset
 * @return {Number} [_status] -1 will rollback the transaction
 *
 * @properties={typeid:24,uuid:"A4CFB6FC-2207-4820-BCA5-91344B1806B9"}
 */
function dc_save_post(_foundset) { return 1 }

/**
 * Customize delete message
 * @author Sanneke Aleman
 * @since 2009-11-19
 * @param {Boolean} _multiDelete true if multiple records will be deleted
 * @return {String} message
 * @properties={typeid:24,uuid:"7C9751DB-6DD7-423B-A6DB-55ACA8334BC7"}
 */
function dc_delete_message(_multiDelete) {

	if (_multiDelete) {
		return i18n.getI18NMessage('i18n:svy.fr.dlg.deletes')
	} else {
		return i18n.getI18NMessage('i18n:svy.fr.dlg.delete')
	}
}

/**
 * Post delete method, is still in the delete transaction
 * @author Sanneke Aleman
 * @since 2009-11-19
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete true if multiple records will be deleted
 *
 * @properties={typeid:24,uuid:"D5B489B9-28E1-4CB5-B064-1C118A5B0663"}
 */
function dc_delete_post(_foundset, _multiDelete) { }

/**
 * Popmenu for the delete button
 * @author Sanneke Aleman
 * @param {JSEvent} _event
 * @since 2009-11-19
 *
 * @properties={typeid:24,uuid:"055B310B-3EFA-46C6-BA6D-0B6134C900E3"}
 */
function dc_deletePopmenu(_event) {

	var _menu =  plugins.window.createPopupMenu()
	var _menuItem = _menu.addMenuItem('i18n:svy.fr.lbl.mutiple_delete', dc_setFoundsetMultipleSelectHelper);
	_menuItem.methodArguments = [_event]
	
	/** @type {RuntimeComponent} */
	var _source = _event.getSource()
	if (_source != null) {
		_menu.show(_source);
		//or you can set the coordinates popupmenu.show(10, 10);
	}
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Object} a
 * @param {Object} b
 * @param {Object} c
 * @param {Object} d
 * @param {Object} e
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"76405F8E-D386-45D7-AAC8-7C6A1DBCF8ED"}
 */
function dc_setFoundsetMultipleSelectHelper(a,b,c,d,e,_event) {
	dc_setFoundsetMultipleSelect(_event);
}

/**
 * @author Sanneke Aleman
 * @param {JSEvent} _event
 * 
 * @properties={typeid:24,uuid:"1166DC92-F614-47A7-AC88-AFC96D93EEFA"}
 */
function dc_setFoundsetMultipleSelect(_event) {

	var _args = globals.svy_nav_dc_getInfo(_event, _event.getFormName());
	var _form = _args[0]
	forms[_form].foundset.multiSelect = true

}

/**
 * Pre delete method
 * @author Sanneke Aleman
 * @since 2009-11-19
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete true if multiple records will be deleted
 * @return {Number} if -1 is returned the delete will stop
 * @properties={typeid:24,uuid:"31D46D56-1804-49B4-BA7A-D07E5C2F4E8C"}
 */
function dc_delete_pre(_foundset, _multiDelete) { return 1 }

/**
 * When the framework goes to browse the method is triggered
 * @author Sanneke Aleman
 * @since 2010-09-19
 * @properties={typeid:24,uuid:"E0FF568C-AAF1-4DCA-AB93-AE30A7424CFA"}
 */
function gotoBrowse() {
}

/**
 * When the framework goes to edit the method is triggered
 * @author Sanneke Aleman
 * @since 2010-09-19
 * @properties={typeid:24,uuid:"EC6E3B97-42EE-4053-8894-B4F1327C42E0"}
 */
function gotoEdit() {
}

/**
 * This method will go into required fields mode, so users can select the required fields.
 * @author Sanneke Aleman
 * @since 2011-02-14
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"8AB20F4A-9C82-4AD9-8F06-E4DADFA6170C"}
 */
function dc_setRequiredFields(_event) {
	
	var _form = globals.nav.form_view_01

	globals.svy_nav_dc_setStatus('required_fields',_form)
	
}

/**
 * To select or deselect a required field, invoked by onElementFocusGained
 * @author Sanneke Aleman
 * @since 2011-02-14
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"52291669-EC77-4C2E-B626-31BBD20C4BAC"}
 */
function toggleRequiredField(_event)
{
	var _element = _event.getElementName()
	var _fieldDataprovider
	if(elements[_element].getDataProviderID())
	{
		_fieldDataprovider = elements[_element].getDataProviderID()
	}
	else //element is not a field and can not be set required
	{
		return
	}
	
	var _progObj = globals.nav.program[globals.nav_program_name]
	
	// end users cannot change fields that are set by programmers
	if(_progObj.required_fields[_fieldDataprovider] &&_progObj.required_fields[_fieldDataprovider].req_by_prog)
	{
		return
	}
	
	var _label = elements[_element].getLabelForElementNames()[0]
	
	if(!_label) return // there is no label
	
	//Field is not required yet, enter it in the required object
	if(!_progObj.required_fields[_fieldDataprovider])
	{
		_progObj.required_fields[_fieldDataprovider] = new Object()
		_progObj.required_fields[_fieldDataprovider].db_status = ''
		_progObj.required_fields[_fieldDataprovider].req_by_prog = false
		_progObj.required_fields[_fieldDataprovider].form_status = 'R'
		_progObj.required_fields[_fieldDataprovider].on_form = true
		elements[_label]['text'] = '* ' + elements[_label]['text']
	}
	else if(_progObj.required_fields[_fieldDataprovider].form_status == 'R' )
	{
		_progObj.required_fields[_fieldDataprovider].form_status = ''
		//remove all the starting * and the space
		elements[_label]['text'] = elements[_label]['text'].replace(/^\*+\s/, "");
	}
	else
	{
		_progObj.required_fields[_fieldDataprovider].form_status = 'R'
		elements[_label]['text'] = '* ' + elements[_label]['text']	
	}
	globals.svy_nav_loseFocus()
}

/**
 * Save the required fields
 * @author Sanneke Aleman
 * @since 2011-02-14
 * @properties={typeid:24,uuid:"05E46EBD-4FBB-494A-869B-38F3A7B8A85A"}
 * @AllowToRunInFind
 */
function saveRequiredFields()
{
	var _progObj = globals.nav.program[globals.nav_program_name]
	/** @type {JSFoundSet<db:/svy_framework/nav_user_required_field>} */
	var _fs = databaseManager.getFoundSet(globals.nav_db_framework,'nav_user_required_field')                                   
	for(var i in _progObj.required_fields)
	{
		//field is not saved yet, can be saved
		if(_progObj.required_fields[i].form_status == 'R' && _progObj.required_fields[i].db_status == '')
		{
			//enter in db
			_fs.newRecord()
			_fs.program_name = globals.nav_program_name
			_fs.dataprovider = i
			databaseManager.saveData(_fs.getSelectedRecord())
			//enter in object
			_progObj.required_fields[i].db_status = 'R'
		} //field is saved needs to be removed
		else if(_progObj.required_fields[i].form_status == '' && _progObj.required_fields[i].db_status == 'R')
		{
			//delete from db
			if(_fs.find())
			{
				_fs.program_name = globals.nav_program_name
				_fs.dataprovider = i
				var _found = _fs.search()
				if(_found)
				{
					_fs.deleteRecord()
				}
			}
			//delete from object
			delete _progObj.required_fields[i]
		}//empty value remove from object
		else if(_progObj.required_fields[i].form_status == '' && _progObj.required_fields[i].db_status == '')
		{
			delete _progObj.required_fields[i]
		}
	}
}

/**
 * Cancel the edit of the required fields
 * @author Sanneke Aleman
 * @since 2011-02-14
 * 
 * @properties={typeid:24,uuid:"97705907-3750-4333-9DBC-34DC6BD99C7D"}
 */
function cancelRequiredFields()
{
	var _progObj = globals.nav.program[globals.nav_program_name]                              
	for(var i in _progObj.required_fields)
	{
		// new required field, remove it from object
		if(_progObj.required_fields[i].form_status == 'R' && _progObj.required_fields[i].db_status == '')
		{
			//set it empty first so the set_status can set the label back to normal, next round it will be removed from the object
			_progObj.required_fields[i].form_status = ''
		} //field is saved needs to be reset
		else if(_progObj.required_fields[i].form_status == '' && _progObj.required_fields[i].db_status == 'R')
		{
			_progObj.required_fields[i].form_status = 'R'
		}//empty value remove from object
		else if(_progObj.required_fields[i].form_status == '' && _progObj.required_fields[i].db_status == '')
		{
			delete _progObj.required_fields[i]
		}
	}
}

/**
 * @param {JSFoundset} _foundset
 * @properties={typeid:24,uuid:"F8CA23FF-EF0C-4DEA-8FAD-F74B8DFF3464"}
 */
function dc_duplicate_post(_foundset) {

}

/**
 * @param {JSFoundset} _foundset
 * @properties={typeid:24,uuid:"BB137784-F2A8-4E72-B2CA-4FBE690AF4F4"}
 */
function dc_new_post(_foundset) {
	
}

/**
 * Shows popup find menu where the user can choose for regular or advanced find
 *
 * @author Vincent Schuurhof
 * @since 2011-05-19
 * @param {JSEvent} [_event] the event that triggered the action
 *
 * @return none
 * 
 * @properties={typeid:24,uuid:"23244941-AE4E-4963-84EA-A697417B177D"}
 * @AllowToRunInFind
 */
function dc_findPopmenu(_event) {
	globals.svy_sea_searchForm = globals.nav.form_view_01;
	globals.svy_sea_mainForm = 'svy_nav_fr_main';

	if (globals.svy_nav_getBooleanProperty('advanced_search')) {
	var _menu = plugins.window.createPopupMenu();
	_menu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.regular_search'), globals.svy_sea_executeFindMethod).methodArguments = [_event, 'dc_find'];	
	_menu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.advanced_search') + '...', globals.svy_sea_executeFindMethod, 'media:///advanced_16_16.png').methodArguments = [_event, 'dc_findAdvanced'];

	/** @type {RuntimeComponent} */
	var _source = _event.getSource()
	if (_source != null) {
		_menu.show(_source);
	}
	} else {
		globals.svy_sea_executeFindMethod(null, null, null, null, null, _event, 'dc_find');
	}
}

/**
 * Trigger the advanced find selection dialog
 *
 * @author Vincent Schuurhof
 * @since 2011-05-19
 * 
 * @param {JSEvent} _event the event that triggered the action
 * @param {String} _triggerForm the form which triggered the action
 * @return none
 *
 * @properties={typeid:24,uuid:"216FDE2E-C1D2-46A8-ABE3-228C46931FE2"}
 */
function dc_findAdvanced(_event, _triggerForm) {
	globals.nav.bar_triggered = _triggerForm;
	if (_triggerForm == 'svy_nav_fr_buttonbar_browser') {
		globals.svy_sea_mainForm = 'svy_nav_fr_main';
		globals.svy_sea_searchForm = globals.nav.form_view_01;
	} else {
		globals.svy_sea_mainForm = globals.nav.form_view_02;
		globals.svy_sea_searchForm = globals.nav.form_view_02;
	}
	
	globals.svy_mod_showFormInDialog(forms.svy_sea_advanced_search_dtl, -1, -1, -1, -1, i18n.getI18NMessage('svy.fr.lbl.advanced_search'));
}

/**
 * @properties={typeid:24,uuid:"D80C75A6-DB80-4378-91EE-C280437B6CD0"}
 */
function onPostSearch() {
	
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"E5B5CAFC-9D07-45B8-A462-B31275D626BA"}
 */
function dc_save_new(_event) {
	var _return = dc_save(_event)
	if(_return == -1)return
	dc_new(_event)
}

/**
 * Buttons available btn_new/btn_edit/btn_delete/btn_duplicate
 * Property forceValues to overwrite security
 * Sample:
 * 			var _buttons = new Object()
 *				_buttons.forceValues = true //will not keep security in mind
 *				_buttons.forceValues = false //will not keep security in mind
 *				_buttons.btn_new = new Object()
 *				_buttons.btn_new.enabled = true
 *				return _buttons
 * 		
 * @properties={typeid:24,uuid:"B5ED6560-61BB-4B60-B530-3457DB7FC597"}
 */
function getButtonObject() {
	var _buttons = new Object()
	return _buttons
}

/**
 * Will set the buttons again on the datacontroller forms
 * 
 * @properties={typeid:24,uuid:"5D764710-31E9-4079-809D-3F681666DB09"}
 */
function setButtons()
{
	var _form = controller.getName()
	if(_form == globals.nav.form_view_01)
	{
		globals.svy_nav_setBrowserbar(globals.nav.mode, _form)
	}
	else if (_form == globals.nav.form_view_02)
	{
		globals.svy_nav_setViewerBar(globals.nav.mode, _form)
	}
}

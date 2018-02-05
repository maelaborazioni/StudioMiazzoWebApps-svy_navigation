/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C28422E3-656A-4537-A368-84B932808905",variableType:12}
 */
var vForm1 = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"697EA8DF-0C1D-4A1E-A6A2-F89D675F933A",variableType:12}
 */
var vForm2 = null;

/**
 * @properties={typeid:35,uuid:"110D6869-4ED6-4A0A-9950-585973450E46",variableType:-4}
 */
var vProgramFoundset1 = null;

/**
 * @properties={typeid:35,uuid:"85614D83-F5FD-4086-A3C6-72442C6E3713",variableType:-4}
 */
var vProgramFoundset2 = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FA051455-5CA8-4E43-9665-BD1CD10F710B",variableType:12}
 */
var vProgramView1 = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7C0F9E3C-4C12-4C03-9074-1E166702FE9E",variableType:12}
 */
var vProgramView2 = null;

/**
 * Onload method, set buttons not visible
 * 
 * @author Sanneke Aleman
 * @since 2011-04-19
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"562AD8B3-A3B9-4FCA-9A22-E3C9D2A8DE13"}
 */
function onLoad(event) {
	elements.btnshortcutDel1.visible = false
	elements.program_image1.visible = false
	elements.program_info1.visible = false
	elements.record_info1.visible = false
	
	elements.btnshortcutDel2.visible = false
	elements.program_image2.visible = false
	elements.program_info2.visible = false
	elements.record_info2.visible = false
	
	setBtnCompare();
}

/**
 * Set a view to compare
 * @author Sanneke Aleman
 * @since 2011-04-19
 * @param {JSEvent} event the event that triggered the action
 * @param {Number} _view
 *
 * @properties={typeid:24,uuid:"60240864-6FD0-42CE-A91D-08CC44B31A6D"}
 */
function selectCurrentView(event, _view) {
	var _form = event.getFormName()
	var _formObj = forms[globals.nav.form_view_01]
	
	forms[_form]['vProgramView'+_view] = globals.nav_program_name
	
	//the form could not have a datasource
	if(_formObj.controller.getDataSource())
	{
		forms[_form]['vProgramFoundset'+_view] = databaseManager.getFoundSet(_formObj.controller.getDataSource())
		forms[_form]['vProgramFoundset'+_view].loadRecords(_formObj.foundset)
	}
	else
	{
		forms[_form]['vProgramFoundset'+_view] = null
	}
	forms[_form]['vForm'+_view] = globals.nav.form_view_01
	
	//set program text
	elements['program_info'+ _view]['text'] =   globals.nav.program[globals.nav_program_name].description	
	//set record text
	elements['record_info'+ _view]['text'] = _formObj.foundset[globals.nav.program[globals.nav_program_name].display_field_header]
	// set image
	elements['program_image'+ _view].setImageURL('media:///'+ globals.nav.program[globals.nav_program_name].program_image);
	
	//make the elements visible
	elements['btnshortcutDel'+ _view].visible = true
	elements['program_image'+ _view].visible = true
	elements['program_info'+ _view].visible = true
	elements['record_info'+ _view].visible = true
	elements['btn_view'+ _view].visible = false
	
	setBtnCompare()
	
}

/**
 * Remove a view from the compare
 * @author Sanneke Aleman
 * @since 2011-04-19
 * @param {JSEvent} event the event that triggered the action
 * @param {Number} _view
 * @properties={typeid:24,uuid:"B2229C58-8D9E-49A4-B7ED-7431E3B62223"}
 */
function removeView(event, _view) {
	var _form = event.getFormName()
	forms[_form]['vProgramView'+_view] = null
	forms[_form]['vProgramFoundset'+_view] = null
	forms[_form]['vForm'+_view] = null

	//make the elements visible
	elements['btnshortcutDel'+ _view].visible = false
	elements['program_image'+ _view].visible = false
	elements['program_info'+ _view].visible = false
	elements['record_info'+ _view].visible = false
	elements['btn_view'+ _view].visible = true
	setBtnCompare()
}

/**
 * Compare the two selected views
 *
 * @param {JSEvent} event the event that triggered the action
 * @author Sanneke Aleman
 * @since 2011-04-19
 *
 * @properties={typeid:24,uuid:"19277333-7E23-46A8-8B06-F6DB6DCCB1E1"}
 */
function compareViews(event) {
	var _formObj1 = solutionModel.getForm(vForm1)
	var _cloneForm1 = globals.svy_utl_cloneForm(_cloneForm1 + application.getUUID(), _formObj1)
	
	var _formObj2 = solutionModel.getForm(vForm2)
	var _cloneForm2 = globals.svy_utl_cloneForm(_cloneForm2 + application.getUUID(), _formObj2)

	var _form1 = forms[_cloneForm1]
	var _form2 = forms[_cloneForm2]

	forms.svy_nav_fr_viewCompare.elements.tab_compare.setLeftForm(_form1, null)
	forms.svy_nav_fr_viewCompare.elements.tab_compare.setRightForm(_form2, null)
	
	//load the right data
	if(vProgramFoundset1)
	{
		_form1.controller.loadRecords(vProgramFoundset1)
	}
	if(vProgramFoundset2)
	{
		_form2.controller.loadRecords(vProgramFoundset2)
	}
	
	globals.svy_utl_setButtonsDisabled(_cloneForm1)
	globals.svy_utl_setButtonsDisabled(_cloneForm2)
	
	globals.svy_mod_showFormInDialog(forms.svy_nav_fr_viewCompare,null,null,null,null,null,true,false,'compare_view')
}

/**
 * Set the btn compare enabled
 * 
 * @author Sanneke Aleman
 * @since 2011-04-19
 * @properties={typeid:24,uuid:"2B7A1295-EEAF-4460-927E-276DA3C995AD"}
 */
function setBtnCompare() {
	if(vProgramView1 && vProgramView2)
	{
		elements.btn_compare.enabled = true
	}
	else
	{
		elements.btn_compare.enabled = false
	}
}

/**
 * @properties={typeid:24,uuid:"E111D30E-3745-40B3-8F32-9C35339EE16C"}
 */
function setViewButtonsEnabled(_enabled) {
	elements.btn_view1.enabled = _enabled
	elements.btn_view2.enabled = _enabled
}

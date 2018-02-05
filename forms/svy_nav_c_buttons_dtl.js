/**
 *	onLoad method
 *
 * @author Sanneke Aleman
 * @since 2008-05-24
 * 
 * @properties={typeid:24,uuid:"564544b2-3b98-4bdc-ac54-26a8d89052a9"}
 */
function onLoad()
{
	
	// set the background of the buttons
	setButtonBg()
}

/**
 *	To select or deselect a button
 * @param {JSEvent} _event
 * @author Sanneke Aleman
 * @since 2007-11-24
 * 
 * @properties={typeid:24,uuid:"daea79f0-aac2-4abf-8e99-434c8890f294"}
 */
function select_button(_event)
{
	var _element = _event.getElementName();
	var _form = _event.getFormName();
	
	//deselect the button
	if(forms[_form][_element] == 1)
	{
		forms[_form][_element] = 0
		elements[_element].bgcolor = '#FF0000'
	}
	else // select the button
	{
		forms[_form][_element] = 1
	
		elements[_element].bgcolor = '#33CC00'
	}
//	databaseManager.saveData()
}

/**
 *	Set the background color of the buttons, green or red, selected or deselected
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * 
 * @properties={typeid:24,uuid:"49709537-2166-4c4a-9fcd-3068c9231661"}
 */
function setButtonBg()
{
	
	// all the buttons
	var _buttons = ['btn_method','btn_print','btn_search','btn_search_prop','btn_sort','btn_all_records', 'btn_rec_nav', 'btn_new', 'btn_delete', 'btn_edit', 'btn_duplicate', 'btn_export','btn_resettblheader','btn_help','btn_record_information','btn_required_fields']
	for ( var i = 0 ; i < _buttons.length ; i++ )
	{
		if(	forms.svy_nav_c_buttons_dtl[_buttons[i]])
		{
			elements[_buttons[i]].bgcolor = '#33CC00' //selected
		}
		else
		{
			elements[_buttons[i]].bgcolor = '#FF0000' //deselected
		}
	}
}

/**
 *	Remove the related record of the key
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @param {Object} _oldValue old value
 * @param {Object} _newValue new value
 * @param {JSEvent} _event the event that triggered the action
 *
 * 
 * @properties={typeid:24,uuid:"3b4eb58b-e2c0-4d7c-8426-f7acb1e1c50e"}
 */
function onDataChange(_oldValue, _newValue, _event)
{	
	// if field is set to null also delete the related record
	if(_newValue == null)
	{
		var _element = _event.getElementName();
		/** @type {String} */
		var _field = elements[_element].getDataProviderID()
		var _relation = _field.replace(/\.[\w\$]*$/, "")
		forms.svy_nav_c_buttons_dtl[_relation].loadAllRecords()
		forms.svy_nav_c_buttons_dtl[_relation].deleteRecord()
		
	}
	
}

/**
 * @properties={typeid:24,uuid:"C02A9886-EB56-49D3-B8F6-22F28C31556A"}
 */
function gotoEdit() {
	_super.gotoEdit.apply(this, arguments)
	controller.enabled = true
}

/**
 * @properties={typeid:24,uuid:"01E62839-67E1-48AC-BF97-72E6977677EE"}
 */
function gotoBrowse() {
	_super.gotoBrowse.apply(this, arguments)
	controller.enabled = false
	setButtonBg();
}

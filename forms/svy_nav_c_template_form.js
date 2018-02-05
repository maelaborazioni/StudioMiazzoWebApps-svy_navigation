/**
 *	Onrecordseletion set the forms and templates
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"a8621c43-1162-4f82-8fe2-7803cf54507f"}
 */
function onRecordSelection()
{
	setForms()
	setTemplate()
	if(!controller.readOnly)
	{
		forms.svy_nav_c_forms.mode = 'edit'
		forms.svy_nav_c_forms.gotoEdit()
		forms.svy_nav_c_programTemplates.mode = 'edit'
		forms.svy_nav_c_programTemplates.gotoEdit()
	}
	
}

/**
 *	Reset all the form info
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"f46ae45e-8c1a-4d53-8606-54fbc192c97f"}
 */
function resetAllFormInfo()
{
	var _size = foundset.getSize()
	for (var i = 1; i <=_size; i++) 
	{
		foundset.setSelectedIndex(i)
		form_object = null
	}
}

/**
 *	Reset all the template info
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"e526d5e6-3e44-47fe-a279-c7ecc50f0d9e"}
 */
function resetAllTemplateInfo()
{
	var _size = foundset.getSize()
	for (var i = 1; i <=_size; i++) 
	{
		foundset.setSelectedIndex(i)
		template_object = null
	}
}

/**
 *	Reset all the template and form info
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"5150e990-eb2a-435a-be0c-88389316b563"}
 */
function resetForms()
{
	form_object = null
	template_object = null

}

/**
 *	Translate the information of the form object to a form with fields so the user can change the information
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"605c6d32-93b6-4e1f-9a51-0153f3d490bf"}
 */
function setForms()
{
	elements.form_tab.removeAllTabs()
	var jsForm = solutionModel.revertForm('svy_nav_c_forms')
	var i
	var _form_object
	if(base_form_name)
	{
		if(!form_object)
		{
			_form_object = new Array()
			globals.nav_properties = 'form_types'
			for (i = 0; i < _to_nav_properties$property_name.property_value.length; i++) 
			{
				_form_object[i] = new Array()
				_form_object[i][0] = i + 1
				_form_object[i][1] = _to_nav_properties$property_name.property_value[i]
				globals.nav_properties = 'form_conventions'                                                                
				_form_object[i][2] = eval(_to_nav_properties$property_name.property_value[i])     
				globals.nav_properties = 'form_types'
				_form_object[i][3] = 1
			}	
			
			//if there is no form, only table view should be available
			if(forms.svy_nav_c_program_dtl.base_form_name == '-no form-' )
			{
				_form_object[0][3] = 0
			}	
			form_object = _form_object
		}
		else
		{
			_form_object = form_object
		}
	

		var _dataset =  databaseManager.createEmptyDataSet(0,0)
		_dataset.addColumn('sort_field')
		_dataset.addColumn('form_type')
		_dataset.addColumn('form_name')
		_dataset.addColumn('flag_available')
		for (i = 0; i < _form_object.length; i++) {
			_dataset.addRow([_form_object[i][0],_form_object[i][1],_form_object[i][2],_form_object[i][3]])
		}
		
		var _datasource = _dataset.createDataSource('fo_table', [ JSColumn.INTEGER, JSColumn.TEXT, JSColumn.TEXT, JSColumn.INTEGER]);
		jsForm.dataSource = _datasource
		var jsField = jsForm.getField('sort_field')
		jsField.dataProviderID = 'sort_field'
		jsField = jsForm.getField('form_type')
		jsField.dataProviderID = 'form_type'
		jsField = jsForm.getField('form_name')
		jsField.dataProviderID = 'form_name'
		jsField = jsForm.getField('flag_available')
		jsField.dataProviderID = 'flag_available'
			forms.svy_nav_c_forms.controller.recreateUI()
		elements.form_tab.addTab(forms.svy_nav_c_forms)
	}
}

/**
 *	Translate the information of the templates object to a form with fields so the user can change the information
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"dd0775df-4f9c-42d5-9029-1bc01e140226"}
 */
function setTemplate()
{
	elements.template_tab.removeAllTabs()
	var jsForm = solutionModel.revertForm('svy_nav_c_programTemplates')
	var i
	var _template_object

		if(!template_object)
		{
			_template_object = new Array()
			globals.nav_properties = 'template_names'
			for (i = 0; i < _to_nav_properties$property_name.property_value.length; i++) 
			{
				_template_object[i] = new Array()
				_template_object[i][0] = i + 1
				_template_object[i][1] = _to_nav_properties$property_name.property_value[i]			
				_template_object[i][2] = 1
				_template_object[i][3] = 0
			}	
			
			//if there is no form, only table view should be available
			if(forms.svy_nav_c_program_dtl.base_form_name == '-no form-' )
			{
				_template_object[0][2] = 0
				_template_object[1][2] = 0
				_template_object[2][3] = 1
			}
			template_object = _template_object
		}
		else
		{
			_template_object = template_object
		}
	

	var _dataset =  databaseManager.createEmptyDataSet(0,0)
	_dataset.addColumn('sort_field')
	_dataset.addColumn('template_name')
	_dataset.addColumn('flag_available')
	_dataset.addColumn('edit_aloud')
	for (i = 0; i < _template_object.length; i++) {
		_dataset.addRow([_template_object[i][0],_template_object[i][1],_template_object[i][2],_template_object[i][3]])
	}
	
	var _datasource = _dataset.createDataSource('to_table', [JSColumn.INTEGER, JSColumn.TEXT, JSColumn.INTEGER, JSColumn.INTEGER]);
	jsForm.dataSource = _datasource
	var jsField = jsForm.getField('sort_field')
	jsField.dataProviderID = 'sort_field'
	jsField = jsForm.getField('template_name')
	jsField.dataProviderID = 'template_name'
	jsField = jsForm.getField('flag_available')
	jsField.dataProviderID = 'flag_available'
	jsField = jsForm.getField('edit_aloud')
	jsField.dataProviderID = 'edit_aloud'
	forms.svy_nav_c_programTemplates.controller.recreateUI()
	elements.template_tab.addTab(forms.svy_nav_c_programTemplates)
}

/**
 *	Onhide check startupview
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"f39e341c-720d-47a3-bab4-db81950a3fc9"}
 */
function onHide()
{

 if (startup_view == null) {
  globals.DIALOGS.showWarningDialog("i18n:svy.fr.lbl.warning", i18n.getI18NMessage("svy.fr.dlg.value_empty", [i18n.getI18NMessage("svy.fr.lbl.startupview")]))
  forms.svy_nav_c_program_dtl.tabSwitch(null, 2);
  return false;
 }
 return true
}

/**
 * @properties={typeid:24,uuid:"A02E4F00-6E7A-4D73-81B2-2902E894F590"}
 */
function gotoEdit() {
	_super.gotoEdit.apply(this, arguments)
	forms.svy_nav_c_forms.mode = 'edit'
	forms.svy_nav_c_forms.gotoEdit()
	forms.svy_nav_c_programTemplates.mode = 'edit'
	forms.svy_nav_c_programTemplates.gotoEdit()
}

/**
 * @properties={typeid:24,uuid:"331D735D-0F27-49D4-AF6C-D74C65C4F7A3"}
 */
function gotoBrowse() {
	_super.gotoBrowse.apply(this, arguments)
	forms.svy_nav_c_programTemplates.mode = 'browse'
	forms.svy_nav_c_programTemplates.gotoBrowse()
	forms.svy_nav_c_forms.mode = 'browse'
	forms.svy_nav_c_forms.gotoBrowse()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7D05F0B3-6E55-4700-9067-0BA58C040311"}
 */
function refreshTableProperties(event) {
	template_object = null
	setTemplate()
}

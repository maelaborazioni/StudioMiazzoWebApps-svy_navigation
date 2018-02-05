/**
 *	Delete Record
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"23B33222-B0AB-4498-AB25-1B5CC1C982AE"}
 */
function deleteRecord()
{
	var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
	var _no = i18n.getI18NMessage('svy.fr.lbl.no')
	var _answer =  globals.svy_mod_dialogs_global_showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), i18n.getI18NMessage('svy.fr.dlg.delete'), _ok, _no); 	
	if(_answer == _ok)
	{
		controller.deleteRecord()
	}
}

/**
 *	Duplicate record
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"124AA56D-BA93-4F32-B952-FBE055AF767C"}
 */
function duplicateRecord()
{
	controller.duplicateRecord()
}

/**
 *	Open a form to edit the array
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"73D4D042-EA98-4C66-8842-9ABF37944BE0"}
 */
function editFunction()
{
	forms.svy_nav_c_function_dtl.controller.loadRecords(foundset)
	forms.svy_nav_c_function_dtl.mode = 'EDIT'
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_function_dtl,null,null,null,null,null,true,false,'Function_edit')
}

/**
 *	On show load all records
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"340460CD-ABC8-4572-B40A-02FED99AFB96"}
 * @AllowToRunInFind
 */
function onShow()
{
	controller.loadAllRecords();
	controller.sort('label asc');
}

/**
 *
 * @param _event
 *
 * @properties={typeid:24,uuid:"9C7D0987-E74D-4040-8633-632C84ABCD94"}
 */
function dc_new(_event) {
	_super.dc_new(_event)
	editFunction()
}

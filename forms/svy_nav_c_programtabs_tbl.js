/**
 *	New record, open detail dialog
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"697960c6-e794-4ff5-ac59-600e76151da5"}
 */
function newRecord()
{
	if (forms.svy_nav_c_program_dtl.program_name == null || forms.svy_nav_c_program_dtl.program_name == "") {
		globals.DIALOGS.showWarningDialog("i18n:svy.fr.lbl.create_tab", "i18n:svy.fr.dlg.warning_programtab",i18n.getI18NMessage('svy.fr.lbl.ok'));
	} else {
		controller.newRecord() 
		showDetails()
	}

}

/**
 *	Open dialog with the details of the record
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"a94cf6cf-24a9-4209-8d90-fdf9ccad09e0"}
 */
function showDetails()
{

	forms.svy_nav_c_programtabs_dtl.controller.loadRecords(foundset)
	forms.svy_nav_c_programtabs_autofill_tbl.mode = 'edit'
	forms.svy_nav_c_programtabs_dtl.mode = 'edit'
	forms.svy_nav_c_programtabs_dtl.gotoEdit()
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_programtabs_dtl,null,null,null,null,null,true,false,'program_tabs')
}

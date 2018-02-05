/**
 *	Open a form to edit the array
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"A946D806-AA34-404E-A9ED-29A1BA9EFFF7"}
 */
function editShortkey()
{
	forms.svy_nav_c_shortkey_dtl.controller.loadRecords(foundset)
	forms.svy_nav_c_shortkey_dtl.mode = 'EDIT'
	globals.svy_mod_showFormInDialog(forms.svy_nav_c_shortkey_dtl,null,null,null,null,null,true,false,'edit_shortkey')
}

/**
 *	On show load all records
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"38602C07-1DEA-43C0-92F2-9230ABD9CBE7"}
 * @AllowToRunInFind
 */
function onShow()
{
	controller.loadAllRecords()
}

/**
 *
 * @param _event
 *
 * @properties={typeid:24,uuid:"4509BC3E-B840-46D7-9D94-487158A51957"}
 */
function dc_new(_event) {
	_super.dc_new(_event)
	editShortkey()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"77CD6196-25C2-43A4-802A-6208CC936537"}
 */
function showDetails(event)
 {

 	forms.svy_nav_c_contextmenu_dtl.controller.loadRecords(foundset)
 	forms.svy_nav_c_contextmenu_dtl.mode = 'edit'
 	forms.svy_nav_c_contextmenu_dtl.gotoEdit()
 	globals.svy_mod_showFormInDialog(forms.svy_nav_c_contextmenu_dtl,null,null,null,null,null,true,false,'svy_nav_c_contextmenu_dtl')
 }

/** *
  * @param _event
  *
  * @properties={typeid:24,uuid:"66F838D7-10F5-4E8F-B825-209A18581320"}
  */
function dc_new(_event) {
 	_super.dc_new(_event)
	showDetails(_event)
 }

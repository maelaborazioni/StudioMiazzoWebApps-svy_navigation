/**
 *	 Create a new record
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"D8DA8DCF-D3F0-4CE8-B0CD-9CF6E615344E"}
 */
function newRecord()
{
	controller.newRecord()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2FEEFF92-79D6-468E-977C-4482F1C8AEF9"}
 */
function deleteRecord(event) {
	var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
	var _no = i18n.getI18NMessage('svy.fr.lbl.no')
	var _answer =  globals.svy_mod_dialogs_global_showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), i18n.getI18NMessage('svy.fr.dlg.delete'), _ok, _no); 	
	if(_answer == _ok)
	{
		controller.deleteRecord()
	}
}

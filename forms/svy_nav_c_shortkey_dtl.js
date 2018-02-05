/**
 *	Delete Record
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"1DA2E5D0-F5F5-491B-ABE9-CBBDCA454433"}
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
 * @properties={typeid:24,uuid:"9444EB69-B142-4A8F-B54D-AC2BB91849C9"}
 */
function duplicateRecord()
{
	controller.duplicateRecord()
}

/**
 *	Create new record
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"BB8D7F48-2941-48C0-BE68-311085855AB7"}
 */
function newRecord()
{
	controller.newRecord()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D1346AE9-DC25-41BA-8951-C510D6C5D736"}
 */
function closeForm(_event) {
	globals.svy_mod_closeForm(_event)
}

/**
 *
 * @param {JSEvent} _event the event that triggered the action
 * @param {Boolean} _all
 *
 * @properties={typeid:24,uuid:"4B1FE351-233A-4F2B-9C6E-16CADD659750"}
 */
function dc_save(_event, _all) {
	
	//check if shortkey is not a duplicate
	var _query = 'SELECT shortkey_id \
					FROM nav_shortkey \
					WHERE shortkey_id != ? \
					AND shortkey = ? \
					AND flag_alt = ? \
					AND flag_system  = ? \
					AND flag_control = ? \
					AND flag_shift = ?'
	var _args = [shortkey_id, shortkey, flag_alt, flag_system, flag_control, flag_shift]
	var _dataset = databaseManager.getDataSetByQuery(globals.nav_db_framework,_query,_args,1)
	if(_dataset.getValue(1,1))
	{
		globals.DIALOGS.showWarningDialog(i18n.getI18NMessage('svy.fr.lbl.excuse_me'), i18n.getI18NMessage('svy.fr.dlg.shortkey_exist'),i18n.getI18NMessage('svy.fr.lbl.ok'));
		return
	}
	_super.dc_save(_event, _all)
	globals.svy_mod_closeForm(_event)
}

/**
 *  @param {JSEvent} _event the event that triggered the action
 * @properties={typeid:24,uuid:"B482B367-5A91-4810-ACE1-8597ACF42865"}
 */
function dc_cancel(_event) {
	_super.dc_cancel(_event)
	globals.svy_mod_closeForm(_event)
}

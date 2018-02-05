/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2A5AE510-B4F7-496C-BA48-C314CB37C1BE"}
 */
var mode = 'BROWSE';

/**
 *
 * @properties={typeid:24,uuid:"C46519E8-1FB4-41C8-A4E2-E075EDFEA0D4"}
 */
function dc_save(_event, _all)
{
	if (onPreSave) {
		onPreSave(_event);
	}
	
	if(_all)
	{
		databaseManager.saveData()
	}
	else
	{
		var _rec = foundset.getRecord(foundset.getSelectedIndex())
		databaseManager.saveData(_rec)
	}
	
	gotoBrowse()
}

/**
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"75CB5145-C95E-43F5-B6C1-541A1E9E6764"}
 */
function onPreSave(event) {
	
}

/**
 *
 * @properties={typeid:24,uuid:"430B6B9E-3A30-4275-9CCE-AB93D4EABAFB"}
 */
function dc_delete(_event) {
	var _ok = i18n.getI18NMessage('svy.fr.lbl.ok')
	var _no = i18n.getI18NMessage('svy.fr.lbl.no')
	var _answer = globals.svy_mod_dialogs_global_showQuestionDialog(i18n.getI18NMessage('svy.fr.lbl.record_delete'), i18n.getI18NMessage('svy.fr.dlg.delete'), _ok, _no);
	if(_answer == _ok)
	{
		controller.deleteRecord()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"8FA28D6B-3504-4E13-B34A-1D5C533559BE"}
 */
function dc_new(_event) {
	
	controller.newRecord()
	gotoEdit()
	
	
}

/**
 *
 * @properties={typeid:24,uuid:"1B499691-8EF2-445F-8200-B43D97B44035"}
 */
function dc_edit(_event) {
	gotoEdit()
}

/**
 *
 * @properties={typeid:24,uuid:"81589D30-9C44-4F80-B3E1-02508675A06A"}
 */
function gotoEdit() {
	databaseManager.setAutoSave(false)
	controller.readOnly = false
	
	if(elements['btn_save'])
	{
		elements['btn_save']['enabled'] = true
	}
	if(elements['btn_cancel'])
	{
		elements['btn_cancel']['enabled'] = true
	}
	
	
	var _buttons = ['btn_new', 'btn_delete', 'btn_edit', 'btn_duplicate', 'btn_refresh']
	for (var i = 0; i < _buttons.length; i++) {
		if(elements[_buttons[i]])
		{
			elements[_buttons[i]].enabled = false
		}
		
	}
	
	
}

/**
 *
 * @properties={typeid:24,uuid:"EA93A361-C650-4A4E-B342-07440831E75D"}
 */
function gotoBrowse() {
	databaseManager.setAutoSave(true)
	controller.readOnly = true
	if(elements['btn_save'])
	{
		elements['btn_save']['enabled'] = false
	}
	if(elements['btn_cancel'])
	{
		elements['btn_cancel']['enabled'] = false
	}
	var _buttons = ['btn_new', 'btn_delete', 'btn_edit', 'btn_duplicate', 'btn_refresh']
	for (var i = 0; i < _buttons.length; i++) {
		if(elements[_buttons[i]])
		{
			elements[_buttons[i]].enabled = true
		}
		
	}
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"37440A5D-2643-41DE-96FD-02B0D476DF70"}
 */
function dc_duplicate(_event) {
	gotoEdit()
	controller.duplicateRecord()
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"587F3CE4-A0FC-46E5-AF1C-9829FBD9FC7F"}
 */
function dc_cancel(_event) {
	databaseManager.revertEditedRecords()
	databaseManager.setAutoSave(true)
	gotoBrowse()
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E377074C-E300-4983-AF0C-B1EA916603E1"}
 */
function onShow(firstShow, event) {
	if(firstShow && mode == 'BROWSE')
	{
		gotoBrowse()
	}
	else if(mode == 'EDIT')
	{
		gotoEdit()
	}
}

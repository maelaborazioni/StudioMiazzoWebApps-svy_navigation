/**
 *	 Closes the form in dialog
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"084559b0-802f-4dd2-a890-74daa614c7e8"}
 */
function closeWindow(_event)
{
	globals.svy_mod_closeForm(_event)
}

/**
 *
 * @properties={typeid:24,uuid:"26E09BDA-2DFE-4FD0-A7A6-322FA0A1F504"}
 */
function setI18n() {

	if(flag_i18n)
	{
		elements.Description.visible = false
		elements.Description_i18n.visible = true
		elements.btn_i18n.visible = true
	}
	else
	{
		elements.Description.visible = true
		elements.Description_i18n.visible = false
		elements.btn_i18n.visible = false
	}

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3212A28F-54DD-46EF-95E8-351DA4B752DD"}
 */
function getI18n(event) {
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
	{
		globals.svy_mod_dialogs_global_showInfoDialog('i18n:svy.fr.lbl.I18n_key_selector',i18n.getI18NMessage('svy.fr.dlg.I18n_key_selector'),'i18n:svy.fr.lbl.ok')
		return
	}
	description = application.showI18NDialog(description)
}

/**
 *
 * @param {JSEvent} _event
 * @param {Boolean} _all
 *
 * @properties={typeid:24,uuid:"476EC741-E6AA-4BE4-BE65-A2AE3C2FD84A"}
 */
function dc_save(_event, _all) {
	_super.dc_save(_event, false)
	globals.svy_mod_closeForm(_event)
	
}

/**
 * @param {JSEvent} _event
 * @param {Boolean} _all
 * 
 * @properties={typeid:24,uuid:"0B13A2F9-320A-498D-9A1C-FB2601676161"}
 */
function dc_cancel(_event, _all) {
	_super.dc_cancel(_event)
	globals.svy_mod_closeForm(_event)
}

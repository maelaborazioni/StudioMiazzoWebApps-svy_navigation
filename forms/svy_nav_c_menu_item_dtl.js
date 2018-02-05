/**
 *	New record
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"F2CDDFA5-DEA3-4DF5-A290-CEB9D5B9D379"}
 */
function newRecord()
{
	controller.newRecord()
}

/**
 *	On record selection, calls set_i18n_Fields
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"5EE8BE62-2F5A-4E86-BF1E-80353991B673"}
 */
function onRecordSelection()
{
	setElementProgramname();
	set_i18n_Fields();
	setMenuImage()
	setElementFunction()
}

/**
 *	Show i18n dialog to enter description
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"46AEA588-9B21-496E-80B8-BCBFC02768F2"}
 */
function selectI18n()
{
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
	{
		globals.svy_mod_dialogs_global_showInfoDialog('i18n:svy.fr.lbl.I18n_key_selector',i18n.getI18NMessage('svy.fr.dlg.I18n_key_selector'),'i18n:svy.fr.lbl.ok')
		return
	}
	description = application.showI18NDialog()
}

/**
 *	Enable or disable the i18n description
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"1284BB5A-1DFC-4928-8562-599E620D4601"}
 */
function set_i18n_Fields()
{
	if(menuitem_type == 'P' || menuitem_type == 'F')
	{
		elements.description_i18n.visible = false
		elements.description.visible = false
		elements.btn_i18n.visible = false
		elements.lbl_description.visible = false
		elements.flag_i18n.visible = false
		
	}	
	else if(flag_i18n)
	{
		elements.lbl_description.visible = true
		elements.description_i18n.visible = true
		elements.description.visible = false
		elements.btn_i18n.visible = true
		elements.flag_i18n.visible = true
	}
	else
	{
		elements.lbl_description.visible = true
		elements.description_i18n.visible = false
		elements.description.visible = true
		elements.btn_i18n.visible = false
		elements.flag_i18n.visible = true
	}
}

/**
 *
 * @properties={typeid:24,uuid:"8227E9F3-F532-4CC3-A835-78DF0F3B211C"}
 */
function setElementProgramname() {
		elements.program_name.visible = (menuitem_type == 'P')
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"57CD3E7B-C971-4A10-AC7E-211BDEAB094B"}
 */
function onDataChange_menuType(oldValue, newValue, event) {
	setElementProgramname();
	set_i18n_Fields();
	setMenuImage()
	setElementFunction()
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"12ED30A6-2A6B-49C0-B9A3-47779AABEA2E"}
 */
function setMenuImage() {
	elements.menu_image.visible = (menuitem_type != 'P')
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"91555C25-E973-4488-BC4C-0D06A63A7E0A"}
 */
function refreshTree(event) {
	forms.svy_nav_c_menu_dtl.refreshTree(null, false);
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"79163EA3-4481-4A21-8FE1-A25B4F051F8D"}
 */
function setElementFunction() {
	elements.function_id.visible = (menuitem_type == 'F')
}

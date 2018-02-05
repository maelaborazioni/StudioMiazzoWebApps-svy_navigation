/** *
 * @param {JSEvent} _event
 * @param _all
 *
 * @properties={typeid:24,uuid:"B5EBAC2C-942E-48A7-9055-4EAF3D1A3EFC"}
 */
function dc_save(_event, _all) {
	_super.dc_save(_event, _all)
	globals.svy_mod_closeForm(_event)
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"BAE851E0-1AA1-42D2-A51B-3174E11091FE"}
 */
function dc_cancel(_event) {
	_super.dc_cancel.apply(this, arguments)
	globals.svy_mod_closeForm(_event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"26D2137A-E5EF-4103-B1D4-08EDA212F3E8"}
 */
function set_i18n_field(event) {

	if (flag_i18n) {
		elements.label_i18n.visible = true
		elements.label.visible = false
		elements.btn_i18n.visible = true
	} else {
		elements.label_i18n.visible = false
		elements.label.visible = true
		elements.btn_i18n.visible = false
	}
}

/** *
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"C29A235C-190D-48BD-A89C-191290D08AFB"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow, event)
	set_i18n_field(event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2119EF9A-7673-4096-9762-AC9CCD337E78"}
 */
function getI18nLabel(event) {
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		globals.svy_mod_dialogs_global_showInfoDialog('i18n:svy.fr.lbl.I18n_key_selector', i18n.getI18NMessage('svy.fr.dlg.I18n_key_selector'), 'i18n:svy.fr.lbl.ok')
		return
	}
	label = application.showI18NDialog()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E23A0732-76F3-4E17-B782-B700C1A2A990"}
 */
function closeForm(_event) {
	globals.svy_mod_closeForm(_event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4AB17504-C86A-4441-95B0-A3BED97406AF"}
 */
function getI18n(event) {
	description = application.showI18NDialog()
}

/**
 *
 * @properties={typeid:24,uuid:"6021E076-2E4D-48BA-8345-8055D206D08F"}
 */
function setLabelField() {
	if(flag_i18n)
	{
		elements.description.visible = false
		elements.display_description.visible = true
		elements.btn_i18n.visible = true
	}
	else
	{
		elements.description.visible = true
		elements.display_description.visible = false
		elements.btn_i18n.visible = false
	}
}

/**
 *
 * @param _event
 * @param _all
 *
 * @properties={typeid:24,uuid:"5ECD0FF0-F329-4F5D-BBEE-B1266C9C20E6"}
 */
function dc_save(_event, _all) {
	_super.dc_save(_event, _all)
	globals.svy_mod_closeForm(_event)
}

/**
 *
 * @properties={typeid:24,uuid:"5993B6FD-D1C4-4A39-B0E7-56A3533401FA"}
 */
function dc_cancel(_event) {
	_super.dc_cancel(_event)
	globals.svy_mod_closeForm(_event)
}

/** *
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"DCDD862E-77C2-41D0-80C6-9DB6DD92FA07"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow, event)
	setLabelField()
}

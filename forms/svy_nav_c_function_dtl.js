/**
 * Perform the element default action.
 *
 * @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CB329B84-CD3A-482A-9D23-5C53744D5E74"}
 */
function closeForm(_event) {
	globals.svy_mod_closeForm(_event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"79EA5647-4883-4D24-964A-DE7EDBCA15CD"}
 */
function getI18n(event) {
	label = application.showI18NDialog()
}

/**
 *
 * @properties={typeid:24,uuid:"2F72CE5B-83E9-4C83-8112-FADE2068DA59"}
 */
function setLabelField() {
	if(flag_i18n)
	{
		elements.label.visible = false
		elements.display_description.visible = true
		elements.btn_i18n.visible = true
	}
	else
	{
		elements.label.visible = true
		elements.display_description.visible = false
		elements.btn_i18n.visible = false
	}
}

/**
 *
 * @param _event
 * @param _all
 *
 * @properties={typeid:24,uuid:"60DFBB94-6809-424D-8D12-F2646490D3CF"}
 */
function dc_save(_event, _all) {
	_super.dc_save(_event, _all)
	globals.svy_mod_closeForm(_event)
}

/**
 *
 * @properties={typeid:24,uuid:"8C8A6C36-7F35-48AC-BBA9-9F3A124A09B4"}
 */
function dc_cancel(_event) {
	_super.dc_cancel(_event)
	globals.svy_mod_closeForm(_event)
}

/** *
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"12A1586D-ADF0-428B-A81B-206AFCA8B1F5"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow, event)
	setLabelField()
}

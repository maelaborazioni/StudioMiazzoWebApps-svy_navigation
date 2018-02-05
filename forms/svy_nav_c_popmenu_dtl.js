/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"73590DC0-8B77-4F26-9BC6-083496019A1F",variableType:12}
 */
var from = null;

/** *
 * @param {JSEvent} _event
 * @param {Boolean} _all
 *
 * @properties={typeid:24,uuid:"4385213D-B324-4BD0-8AB1-4328B5EA7E59"}
 */
function dc_save(_event, _all) {
	_super.dc_save(_event, _all)
	globals.svy_mod_closeForm(_event)
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"8A531A19-E6A1-45B6-8FBB-65B87FE14243"}
 */
function dc_cancel(_event) {
	_super.dc_cancel.apply(this, arguments)
	globals.svy_mod_closeForm(_event)
}

/** *
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"35685580-D6A9-4887-98B6-122D9ED9DE79"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow, event)
	elements.fld_menu_type.readOnly = from == 'root'

}

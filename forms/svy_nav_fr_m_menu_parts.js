/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"098D9E64-55E9-416E-8D86-C0DAA21FEFDF",variableType:4}
 */
var vMenuExpanded = 0;

/**
 * @properties={typeid:24,uuid:"B34DCD21-2147-4BDB-9768-9F89DD61488A"}
 */
function onShow(firstShow) {
	if(firstShow)
	{
		setExpand()
	}
}

/**
 * @properties={typeid:24,uuid:"B9DCBD7C-D630-42F7-904F-21ABDA6E4FAF"}
 */
function setExpand() {
	if(vMenuExpanded)
	{
		elements.btn_collapsed.visible = false
		elements.btn_expanded.visible = true
	}
	else
	{
		elements.btn_collapsed.visible = true
		elements.btn_expanded.visible = false
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4ADDE48C-EE87-45F7-9683-B1B384DD3498"}
 */
function toggleColapse(event) {
	if(vMenuExpanded)vMenuExpanded = 0
	else vMenuExpanded =1
	setExpand()
	forms.svy_nav_fr_m_menu.drawForm()

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"892F234C-FA10-42BE-8831-04EF4F985299"}
 */
function selectMenu(event) {
	globals.nav_menu_item_id = menu_item_id
	databaseManager.recalculate(foundset)
	globals.nav.setMenuTree = 0
	globals.svy_nav_tree_node_selected(menu_item_id)
	
}

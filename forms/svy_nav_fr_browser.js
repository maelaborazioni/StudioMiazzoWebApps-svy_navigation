/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"17DA3A9D-EBC8-4F41-8FBB-59D978A24B13",variableType:4}
 */
var vNobuttonbar = null;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E8729551-8640-4755-8328-C3ECA0A6DF81"}
 */
function onLoad(event) {
	elements.form_view_01.dividerSize = 0
	elements.form_view_01.dividerLocation = 34
	elements.form_view_01.leftFormMinSize = 0
}

/**
 * @properties={typeid:24,uuid:"CB457F2C-7019-4566-8C8A-1A0B44CE2050"}
 */
function onShow() {
	
	if(vNobuttonbar)
	{
		if(elements.form_view_01.dividerLocation!= 0)
		{
			elements.form_view_01.dividerLocation = 0
		}
	} 
	else // set the form back if a program is used with buttonbar
	{
		if(elements.form_view_01.dividerLocation!= 34)
		{
			elements.form_view_01.dividerLocation = 34
		}
	}
}

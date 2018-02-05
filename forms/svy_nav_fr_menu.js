/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"93D89BBF-357D-4B25-8D81-9C57D45E90CC"}
 */
function onLoad(_event) 
{
	//	globals.svy_utl_initSplitTab(_event.getFormName(),'tab_split',0,Math.floor(application.getWindow().getHeight() * 0.6),1,1, '#6B6A65')	
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"F9E82C66-7BBA-45A3-AD02-0CFFB7095AD5"}
 */
function onHide(_event)
{
	//globals.svy_utl_saveSplitTabDividerPosition(_event.getFormName(),'tab_split')
}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"27F06EED-4B87-470E-B45A-F5BE7B00D61A"}
 */
function onResize(event) 
{
	//save splitter between main and navigation
	//globals.svy_utl_saveSplitTabDividerPosition('svy_nav_fr_main','tab_split')
}


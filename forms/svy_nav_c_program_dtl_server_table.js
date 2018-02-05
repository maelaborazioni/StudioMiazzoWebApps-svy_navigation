/**
 * Perform the element default action.
 *
 * @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2B502763-38A8-4BD6-8A92-19EC7112FED5"}
 */
function closeForm(_event) {
	globals.svy_mod_closeForm(_event)
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"674255D3-40A1-45AC-8CEE-A0090B6F2052"}
 */
function onShow(firstShow, event) {
	if(firstShow)
	{
		initVLservernames()	
	}
	initVLtablenames()
}

/**
 * @properties={typeid:24,uuid:"9F6DCF30-7188-4EE8-BBB4-D91B3FDC7964"}
 */
function initVLservernames() {
	var _servers = databaseManager.getServerNames()
	_servers.sort()
	application.setValueListItems('nav_server_names',  _servers )
}

/**
 * @properties={typeid:24,uuid:"38769887-3764-43B2-8241-E2A2D6721286"}
 */
function initVLtablenames() {
	if( server_name)
	{
		var _tables = databaseManager.getTableNames(server_name)
		_tables.sort()
		application.setValueListItems('nav_table_names',  _tables)
	
	}
	else
	{
		application.setValueListItems('nav_table_names',  null)
	}
}

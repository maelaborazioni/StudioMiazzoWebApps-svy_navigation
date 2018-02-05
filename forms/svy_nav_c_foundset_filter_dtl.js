/**
 *	Set the valuelist nav_table_names
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"82af8296-e4d3-44cf-96a6-7385fa718512"}
 */
function getTableValuelist()
{
	if( server_name)
	{
		var _tables = databaseManager.getTableNames(server_name)
		if(_tables.length)
			_tables.sort()
		application.setValueListItems('nav_table_names',  _tables)
	}
	else
	{
		application.setValueListItems('nav_table_names',  null)
	}

}

/**
 *	Create a new record
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"6d989a40-41b1-4283-ab9e-f1a70206c780"}
 */
function newRecord()
{

	controller.newRecord()
}

/**
 *	On data change, set column valuelist
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"64861d64-3b3e-46e7-a0b6-f2d7646e55d2"}
 */
function onDataChange()
{
	setColumnValuelist();
}

/**
 *	On load, set server valuelist
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"6688583d-5ee4-497d-8267-bef58f0e4aec"}
 */
function onLoad()
{
	var _servers = databaseManager.getServerNames()
	_servers.sort()
	application.setValueListItems('nav_server_names',  _servers )

}

/**
 *	Set the valuelist for this record
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"adbe1026-355c-4460-82f6-b8b84ed37152"}
 */
function onRecordSelection()
{
	getTableValuelist();
	setColumnValuelist();
}

/**
 *	Delete record and set the linked records to null
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"a841247a-0ab4-47c7-9944-85160177804a"}
 */
function recordDelete()
{
	while ( nav_foundset_filter_to_nav_program.getSize() > 0 )
	{
		nav_foundset_filter_to_nav_program.nav_foundset_filter_id = null
		databaseManager.saveData()
	}
	
	controller.deleteRecord()
	databaseManager.saveData()
}

/**
 *	Select a foundsetfilter, link it to a program
 *	
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @param {JSEvent} _event
 * @return  none
 * 
 * @properties={typeid:24,uuid:"847768fd-3cb5-48b0-8956-46bfcf35b430"}
 */
function recordSelect(_event)
{
	forms.svy_nav_c_program_dtl.nav_foundset_filter_id = nav_foundset_filter_id
//	databaseManager.saveData()
	globals.svy_mod_closeForm(_event)
}

/**
 *	Set the valuelust nav_field_names
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"0d63a215-e0eb-4ed5-a303-8accb2aa3e6a"}
 */
function setColumnValuelist()
{
	if(table_name)
	{
		//Returns an array containing the names of all table columns
		var jsTable = databaseManager.getTable( server_name, table_name)
		var columnNames = jsTable.getColumnNames()
		columnNames.sort()
		application.setValueListItems('nav_field_names',  columnNames)
	}
	else
	{
		application.setValueListItems('nav_field_names',  null)
	}

}

/**
 *	Onshow
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"791cf6bc-dd26-4b46-89a6-36b78965add2"}
 * @AllowToRunInFind
 */
function onShow(_firstShow)
{
	if(_firstShow)
	{
		controller.loadAllRecords()
	}
}

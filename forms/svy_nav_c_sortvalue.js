/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0f8b2c5d-957f-471c-b110-579480be580c",variableType:12}
 */
var vFielName = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9e7546d7-45a1-4359-bdb8-452f883d36ac",variableType:12}
 */
var vSortOrder = '';

/**
 *	Add a field to the sort criteria
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"ae9172a7-9a71-4eed-ac14-48cee3dfc50e"}
 */
function addField()
{
	if(sort_value)
	{	
		sort_value += ', '	+ vFielName +' '+ vSortOrder	
	}
	else
	{
		sort_value = vFielName +' '+ vSortOrder		
		
	}
	
}

/**
 *	Clear the sort value field
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"07181cfb-c475-4583-b72a-710496408d2d"}
 */
function clear_field()
{
	sort_value = null
}

/**
 *	Close the form in dialog
 * 
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @param {JSEvent} _event the event that triggered the action
 * @return  none
 *
 * @properties={typeid:24,uuid:"8732c7d7-378e-4375-8806-65db13f74228"}
 */
function closeDialog(_event)
{
	globals.svy_mod_closeForm(_event)
}

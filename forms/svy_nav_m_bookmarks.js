/**
 * Show the record id's'
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"4f9d2460-d8b2-4465-86fa-a622bad7af4f"}
 */
function showRecord_ids()
{
	var _message = ''
		
	for (var i = 0; i < record_ids['length']; i++) {
		_message += 'Position '+i + ':'+ record_ids[i] +'\n'
	}
	

	plugins.dialogs.showInfoDialog('',_message,'OK')

}

/**
 * Show the record id's names
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"079a72b3-9788-4af4-89e8-ca6947189f98"}
 */
function showRecord_idsNames()
{

	var _message = ''
		
	for (var i = 0; i < record_ids_names['length']; i++) {
		_message += 'Position '+i + ':'+ record_ids_names[i] +'\n'
	}
	

	plugins.dialogs.showInfoDialog('',_message,'OK')

}

/**
 * Show the record id's types
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"90bab10a-7e18-40aa-8c6f-1a4b062234a4"}
 */
function showRecord_idsTypes()
{

	var _message = ''
		
	for (var i = 0; i < record_ids_types['length']; i++) {
		_message += 'Position '+i + ':'+ record_ids_types[i] +'\n'
	}
	

	plugins.dialogs.showInfoDialog('',_message,'OK')

}

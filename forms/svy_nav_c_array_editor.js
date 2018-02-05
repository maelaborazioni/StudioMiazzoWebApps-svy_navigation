/**
 *	To save the values of the form in an array and save that to the destination form
 *
 * @author Sanneke Aleman
 * @since 2009-05-24
 * 
 * @properties={typeid:24,uuid:"b3efea48-30ac-4825-9214-d0c93c7acc6a"}
 */
function saveArrayToForm()
{
    var _array = new Array()
    var _size = foundset.getSize()
    foundset.sort('sort_field asc')
    //get values from form to array
    for (var i = 1; i <= _size; i++) {
        foundset.setSelectedIndex(i)
        _array[i-1] = foundset['data_field']
    }
   //set values from array to destination form
    if(globals.nav.arrayForm && globals.nav.arrayField )
    {
        forms[globals.nav.arrayForm][globals.nav.arrayField] = _array
        globals.nav.arrayForm = null
        globals.nav.arrayField = null
    }
    
}

/**
 *
 * @param _event
 *
 * @properties={typeid:24,uuid:"8BEECBFF-259C-4176-A452-E99A93ECCA1F"}
 */
function dc_new(_event) {
	_super.dc_new(_event)
	foundset['sort_field'] = controller.getMaxRecordIndex()
}

/**
 *
 * @param _event
 * @param _all
 *
 * @properties={typeid:24,uuid:"D5799324-D936-4C66-B852-282C3FE6B2ED"}
 */
function dc_save(_event, _all) {
	_super.dc_save(_event, _all)
	globals.svy_mod_closeForm(_event)
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"D92CC7D9-DC4C-421B-A609-F57AB6B9CF36"}
 */
function dc_cancel(_event) {
	_super.dc_cancel(_event)
	globals.svy_mod_closeForm(_event)
}

/**
 *	Delete a record
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"3646fb88-9ef6-404a-b2e8-f48ee4ebb86c"}
 */
function deleteRecord()
{
	controller.deleteRecord()
}

/**
 *	On record selection, calls set_i18n_Fields
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * 
 * @param {JSEvent} _event
 * @param {Boolean} [_select]
 * @return  none
 * 
 * @properties={typeid:24,uuid:"d37b20a0-1e5e-4f76-a5e3-965f9e102a2a"}
 * @AllowToRunInFind
 */
function refreshTree(_event,_select)
{
	try
	{
		databaseManager.saveData()
		
		// set the tree with the right items
		/** @type {JSFoundSet<db:/svy_framework/nav_menu_items>} */  
		var _foundset = databaseManager.getFoundSet(forms.svy_nav_c_menu_item_dtl.controller.getDataSource())
		
		if(_foundset.find())
		{
			_foundset.menu_id = menu_id
			_foundset.parent_id = '^'
			_foundset.sort('sort_order asc')
			var _found = _foundset.search()
		
			elements.tree.removeAllRoots()
			var _binding = elements.tree.createBinding(_foundset.getDataSource())
			_binding.setImageURLDataprovider('tree_image');
			_binding.setChildSortDataprovider('sort_calc');
			_binding.setNRelationName('nav_menu_items_to_nav_menu_items$parent_id');
			_binding.setTextDataprovider('display_description');
			_binding.setCallBackInfo(globals.svy_nav_c_nodeSelected, 'menu_item_id');
			elements.tree.addRoots(_foundset);
			
			if(_found > 0 && _select)
			{
				elements.tree.selectionPath = [_foundset.menu_item_id]
			}
			else if(_select)
			{
				forms.svy_nav_c_menu_item_dtl.foundset.unrelate()
				forms.svy_nav_c_menu_item_dtl.foundset.clear()
			}
			
		}
		forms.svy_nav_fr_tree.init_tree(true);
	}
	catch(ex)
	{
		globals.svy_mod_dialogs_global_showWarningDialog('Menu navigazione',ex.message,'Ok');
		databaseManager.rollbackTransaction();
	}
	
}

/**
 *	Reload the nav object, calls globals.svy_nav_init
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 * 
 * @properties={typeid:24,uuid:"b161b1c5-1a27-45e7-a677-273e167d719b"}
 */
function reloadMenu()
{
	globals.svy_nav_init();
}

/**
 *	Load all records in the foundset
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"9f72dfc0-05b3-474d-b075-1505b42620fb"}
 */
function showAllRecords()
{
	foundset.loadAllRecords()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3E332F4F-18B4-422E-B7A6-445520A41F0D"}
 */
function newMenuItem(event) {
	
	if(forms.svy_nav_c_menu_item_dtl.controller.getMaxRecordIndex()>0)
	{
		var _root = i18n.getI18NMessage('svy.fr.lbl.root') 
		var _child = i18n.getI18NMessage('svy.fr.lbl.child') 
		var _answer = globals.DIALOGS.showQuestionDialog('i18n:svy.fr.lbl.record_new','i18n:svy.fr.dlg.newmenu',_root,_child);
			//globals.svy_mod_dialogs_global_showQuestionDialog('i18n:svy.fr.lbl.record_new','i18n:svy.fr.dlg.newmenu',_root,_child); 		
	}
	
	if(_answer == _child)
	{
		var _menu_item_id = forms.svy_nav_c_menu_item_dtl.menu_item_id
	}
	
	nav_menu_to_nav_menu_items.newRecord()
	
	
	forms.svy_nav_c_menu_item_dtl.controller.loadRecords(nav_menu_to_nav_menu_items)
	
	if(_answer == _child)
	{
		forms.svy_nav_c_menu_item_dtl.parent_id = _menu_item_id
	}
	gotoEdit()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7C179249-0FB0-42DA-8B73-371BA5770AC9"}
 */
function deleteMenuItem(_event) {
	forms.svy_nav_c_menu_item_dtl.dc_delete(_event)
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} _firstShow form is shown first time after load
 * @param {JSEvent} _event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EE29E2D3-6033-4102-8863-086D48176B87"}
 * @AllowToRunInFind
 */
function onShow(_firstShow, _event) {
	_super.onShow(_firstShow, _event)
	if(_firstShow)
	{
		controller.loadAllRecords()
	}
}

/**
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"6D074788-C2F7-4845-AB44-A1933259E0AB"}
 */
function onPreSave(event) {
	refreshTree(event);
	return _super.onPreSave.apply(this, arguments); // try to pass the arguments as a normal method call: _super.onPreSave(arg1,arg2)
}

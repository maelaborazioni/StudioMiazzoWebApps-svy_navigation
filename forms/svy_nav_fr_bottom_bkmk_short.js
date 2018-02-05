/**
 *	Show the bookmark tab
 * 
 * @author Erik Kramer
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"0a12503d-4b03-4c71-98fa-79958e9bb60b"}
 */
function onClickBookmark()
{
	elements.tabLeftBottomMenu.removeAllTabs()
	elements.tabLeftBottomMenu.addTab(forms.svy_nav_fr_bookmarks)
	elements.tab_bookmark.visible = true
	elements.tab_favorites.visible = false
	elements.tab_record_history.visible = false
	elements.tab_record_compare.visible = false
	elements.tab_program_doc.visible = false
	elements.tab_document_management.visible = false
}

/**
 *	Logout
 * 
 * @author Erik Kramer
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"8a8092c7-7e9f-4b17-bf58-f8ff675d9ed8"}
 */
function onClickLogOut()
{
	var _solution = application.getSolutionName()
	security.logout(_solution)
}

/**
 *	Show the shortcut tab
 * 
 * @author Erik Kramer
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"3b8e80e6-e8a4-4931-a28e-3978f13ea8ca"}
 */
function onClickShortcut()
{
	elements.tabLeftBottomMenu.removeAllTabs()
	elements.tabLeftBottomMenu.addTab(forms.svy_nav_fr_shortcuts)
	elements.tab_bookmark.visible = false
	elements.tab_favorites.visible = true
	elements.tab_record_history.visible = false
	elements.tab_record_compare.visible = false
	elements.tab_program_doc.visible = false
	elements.tab_document_management.visible = false

}

/**
 *	Onload, set favorites visible
 * 
 * @author Erik Kramer
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"f7dafa3a-e1ed-42eb-aaa3-e0178a76999f"}
 */
function onLoad()
{
	elements.tab_bookmark.visible = false
	elements.tab_favorites.visible = true
	elements.tab_record_history.visible = false
	elements.tab_record_compare.visible = false
	elements.tab_program_doc.visible = false
	elements.tab_document_management.visible = false;
	
	var _docManagement = globals.svy_nav_getBooleanProperty("document_management");
	elements.btn_doc_management.visible = _docManagement;
	elements.btn_doc_attachment.visible = _docManagement;
}

/**
 *	Show the recordhistory tab
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"3a317a37-988c-426c-b717-81a828ca05c9"}
 */
function onClickRecordHistory()
{
	elements.tabLeftBottomMenu.removeAllTabs()
	elements.tabLeftBottomMenu.addTab(forms.svy_nav_fr_recordHistory)
	elements.tab_bookmark.visible = false
	elements.tab_favorites.visible = false
	elements.tab_record_history.visible = true
	elements.tab_record_compare.visible = false
	elements.tab_program_doc.visible = false
	elements.tab_document_management.visible = false
}

/**
 * @properties={typeid:24,uuid:"28AC2EE8-B237-4F34-8B46-04EA26ED29E2"}
 */
function onClickViewCompare() {
	elements.tabLeftBottomMenu.removeAllTabs()
	elements.tabLeftBottomMenu.addTab(forms.svy_nav_fr_viewCompareTab)
	elements.tab_bookmark.visible = false
	elements.tab_favorites.visible = false
	elements.tab_record_history.visible = false
	elements.tab_record_compare.visible = true
	elements.tab_program_doc.visible = false
	elements.tab_document_management.visible = false
	
	
	//set the height of the splitter
	if(globals.nav && globals.nav.shortcuts)
	{
		var _extra_size = 150
		var _windowSize = 200
		if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) _extra_size = 70
		var _loc = application.getWindow().getHeight() - (_windowSize +_extra_size)
		if(_loc != forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'])
		{
			forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'] = _loc
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B0EC8241-B49C-45A1-8707-E58D19912794"}
 * @AllowToRunInFind
 */
function onClickViewDocumentManagement(event) {
	
	/** @type {JSFoundset <db:/svy_framework/nav_properties>} */
	 var _propertiesFs = databaseManager.getFoundSet('svy_framework', 'nav_properties');
	 
	 if (_propertiesFs && _propertiesFs.find()) {
		  _propertiesFs.property_name = 'document_management';
		  _propertiesFs.search();
		  
		  if(_propertiesFs.property_value[0] != 'true') {
			  globals.svy_mod_dialogs_global_showInfoDialog('Info',
					'Document Management is not enabled.' ,'Ok');
			  return ;
		  }
	 }
	 
	elements.tabLeftBottomMenu.removeAllTabs()
	
	/** @type {JSForm <db:/svy_framework/doc_folder>}  */
	var _frm = forms['svy_doc_treeview'];
	elements.tabLeftBottomMenu.addTab(_frm)
	elements.tab_program_doc.visible = false
	elements.tab_document_management.visible = true
	elements.tab_favorites.visible = false
	elements.tab_record_history.visible = false
	elements.tab_record_compare.visible = false
	elements.tab_bookmark.visible = false
	
	//set the height of the splitter
	if(globals.nav && globals.nav.shortcuts)
	{
		var _extra_size = 150
		var _windowSize = forms['svy_doc_treeview'].controller.getPartHeight(JSPart.BODY);
		
		if(!_windowSize)
			_windowSize = 240;

		if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) _extra_size = 70
		var _loc = application.getWindow().getHeight() - (_windowSize +_extra_size)
		if(_loc != forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'])
		{
			forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'] = _loc
		}
	}
	
	// Set view
	globals['svy_doc_view_type'] = 'folder';
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5554A892-01AE-48C9-924A-DD341B34D722"}
 */
function onClickShowProgramDocuments(event) {

	elements.tabLeftBottomMenu.removeAllTabs()
	
	/** @type {JSForm <db:/svy_framework/doc_document>}  */
	var _frm = forms['svy_doc_program_documents'];
	elements.tabLeftBottomMenu.addTab(_frm);
	elements.tab_program_doc.visible = true
	elements.tab_document_management.visible = false
	elements.tab_favorites.visible = false
	elements.tab_record_history.visible = false
	elements.tab_record_compare.visible = false
	elements.tab_bookmark.visible = false
	
	//set the height of the splitter
	if(globals.nav && globals.nav.shortcuts)
	{
		var _extra_size = 200
		var _windowSize = 200
		if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) _extra_size = 70
		var _loc = application.getWindow().getHeight() - (_windowSize +_extra_size)
		if(_loc != forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'])
		{
			forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'] = _loc
		}
	}
	
	// Set view
	globals.svy_doc_view_type = 'program';
}

/**
 * Called before the form component is rendered.
 *
 * @param {JSRenderEvent} event the render event
 *
 * @properties={typeid:24,uuid:"1DE7CCC2-B320-4235-BEE7-A841C0A28D57"}
 */
function onRenderProgramDocuments(event) {

	if (forms['svy_doc_program_documents'])
	{
		if (globals.nav_program_name == 'svy_documents') {
			event.getRenderable().enabled = false;
			forms['svy_doc_program_documents'].controller.enabled = false;
		}
		else {
			event.getRenderable().enabled = true;
			forms['svy_doc_program_documents'].controller.enabled = true;
		}
	}
}

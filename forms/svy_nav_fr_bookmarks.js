/**
 *	Load the bookmarks for the loged in user
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"31159dd9-e304-4cdd-9143-473001a8bd85"}
 * @AllowToRunInFind
 */
function loadBookmarks()
{
	if(!globals.nav)
	{
		return;
	}
	// bookmarks are stored in a object
	globals.nav.bookmarks = new Array()
	// search the bookmark for the user
	if(forms.svy_nav_fr_bookmarks.controller.find())
	{
		// forms.svy_nav_fr_bookmarks.user_org_id = globals.svy_sec_lgn_user_org_id
		forms.svy_nav_fr_bookmarks.user_id = globals.svy_sec_lgn_user_id;
		forms.svy_nav_fr_bookmarks.organization_id = globals.svy_sec_lgn_organization_id;
		
		forms.svy_nav_fr_bookmarks.controller.sort('sort_order asc')
		var _found = forms.svy_nav_fr_bookmarks.controller.search();
		
		// hide all
		for (var _i = 0; _i < 7; _i++)
		{
			// Hide all bookmarks
			elements['bookmark'+ _i].visible = false
			elements['program_info'+ _i].visible = false
			elements['record_info'+ _i].visible = false
			elements['btnshortcutDel'+ _i].visible = false
			elements['btnshortcutMoveDown'+ _i].visible = false
			elements['btnshortcutMoveUp'+ _i].visible = false
			elements['program_image'+ _i].visible = false
		}
		
		
		// loop true records and set bookmarks
		for (_i = 0; _i < _found; _i++)
		{
			// Loop over foundset to set bookmarks labels and show bookmarks
			forms.svy_nav_fr_bookmarks.foundset.setSelectedIndex(_i + 1);
			
			if(globals.nav.program[forms.svy_nav_fr_bookmarks.program])
			{
			
				elements['bookmark'+ _i].visible = true
				elements['program_info'+ _i].visible = true
				elements['record_info'+ _i].visible = true
				elements['btnshortcutDel'+ _i].visible = true
				elements['btnshortcutMoveDown'+ _i].visible = true
				elements['btnshortcutMoveUp'+ _i].visible = true
				elements['program_image'+ _i].visible = true
				
				if(_i == 0)
				{
					elements['btnshortcutMoveUp'+ _i].enabled = false
				}
				else
				{
					elements['btnshortcutMoveUp'+ _i].enabled = true
				}
				if(_i == (_found-1))
				{
					elements['btnshortcutMoveDown'+ _i].enabled = false
				}
				else
				{
					elements['btnshortcutMoveDown'+ _i].enabled = true
				}
				
				
				var _relation = 'nav_bookmarks_to_'+ globals.nav.program[forms.svy_nav_fr_bookmarks.program].table_name + bookmark_id
				//create the relation if it doesn't exist
				if(!globals[_relation]) 
				{
				
//					var _jsTable = 	databaseManager.getTable(globals.nav.program[forms.svy_nav_fr_bookmarks.program].server_name ,  globals.nav.program[forms.svy_nav_fr_bookmarks.program].table_name)			
					var _jsDataSource = databaseManager.getDataSource(globals.nav.program[forms.svy_nav_fr_bookmarks.program].server_name ,  globals.nav.program[forms.svy_nav_fr_bookmarks.program].table_name)
					var _jsRelation = solutionModel.newRelation( _relation,  controller.getDataSource(), _jsDataSource,  JSRelation.INNER_JOIN);		
									
					//relation to get to the related record
					for (var i = 0; i < record_ids_names['length']; i++) {
						var _globalName = 'bookmark' + record_ids_names[i] + bookmark_id
						if(!solutionModel.getGlobalVariable('globals',_globalName))
						{	                                  
							switch (record_ids_types[i]) {
								case 'INTEGER': solutionModel.newGlobalVariable('globals',_globalName, JSVariable.INTEGER); break;
								case 'DATETIME': solutionModel.newGlobalVariable('globals',_globalName, JSVariable.DATETIME); break;
								case 'TEXT': solutionModel.newGlobalVariable('globals',_globalName, JSVariable.TEXT); break;
								case 'MEDIA': solutionModel.newGlobalVariable('globals',_globalName, JSVariable.MEDIA); break;
								case 'NUMBER': solutionModel.newGlobalVariable('globals',_globalName, JSVariable.NUMBER); break;
								default:
							}	
							globals[_globalName] = record_ids[i]	
							_jsRelation.newRelationItem('globals.'+_globalName, '=', record_ids_names[i])
						}
					}
				}
				
				//set program text
				elements['program_info'+ _i]['text'] =   globals.nav.program[forms.svy_nav_fr_bookmarks.program].description	
				//set record text
				if(_relation)
				{
					elements['record_info'+ _i]['text'] = globals[_relation][globals.nav.program[forms.svy_nav_fr_bookmarks.program].display_field_header]
				}
				else
				{
					elements['record_info'+ _i]['text'] = forms.svy_nav_fr_bookmarks.record_ids
				}
				// set image
				elements['program_image'+ _i].setImageURL('media:///'+ globals.nav.program[forms.svy_nav_fr_bookmarks.program].program_image);
			
				// set information in object
				globals.nav.bookmarks[_i] = new Object()
				globals.nav.bookmarks[_i].program = forms.svy_nav_fr_bookmarks.program
				globals.nav.bookmarks[_i].record_ids = forms.svy_nav_fr_bookmarks.record_ids
				globals.nav.bookmarks[_i].bookmark_id = forms.svy_nav_fr_bookmarks.bookmark_id
				globals.nav.bookmarks[_i].view = forms.svy_nav_fr_bookmarks.program_view
			}
		}
	}
	setHeight()

}

/**
 *	Onclick of a bookmark, get the right information and call globals.svy_nav_bookmarkGoto, depending on loadBookmarks
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"a384ebb1-350d-4a76-9450-f03a72c51983"}
 */
function onClick(_event)
{
	if(globals.nav.mode != 'browse') return	
	var _button = _event.getElementName();
	globals.nav.openNewTab = 1
	var _program = globals.nav.bookmarks[_button.replace(/[^0-9]/g, "")].program
	var _pk = globals.nav.bookmarks[_button.replace(/[^0-9]/g, "")].record_ids	
	var _view = globals.nav.bookmarks[_button.replace(/[^0-9]/g, "")].view
	globals.svy_nav_bookmarkGoto(null,_program, _pk, _view);

}

/**
 *	On load method, hides all bookmarks
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"78a68cc1-860c-4ff4-9e74-c76c9871df43"}
 */
function onLoad()
{
	// hide all
	for (var _i = 0; _i < 7; _i++)
	{
		// Hide all bookmarks
		elements['bookmark'+ _i].visible = false
		elements['program_info'+ _i].visible = false
		elements['record_info'+ _i].visible = false
		elements['btnshortcutDel'+ _i].visible = false
		elements['btnshortcutMoveDown'+ _i].visible = false
		elements['btnshortcutMoveUp'+ _i].visible = false
		elements['program_image'+ _i].visible = false
	}
}

/**
 *	Toggles the sort order of a bookmark, up - down
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"67118611-d974-48b7-98d3-6db12ad1b381"}
 * @AllowToRunInFind
 */
function toggleBookmark(_event)
{
	var _button = _event.getElementName();
	var _buttonnr = _button.replace(/[^0-9]/g, "") * 1
	var _buttonnr_next
	var _rec_org
	var _rec_next
	var _sort_org
	var _sort_next

	// if bookmark has to move up
	if(/Up/.test(_button))
	{
		_buttonnr_next  = _buttonnr - 1
	}
	// if bookmark has to move down
	if(/Down/.test(_button))
	{
		_buttonnr_next  = _buttonnr + 1
	}
	// get the origenal record
	if(foundset.find())
	{
		bookmark_id = globals.nav.bookmarks[_buttonnr].bookmark_id
		foundset.search()
		_rec_org = foundset.getRecord(1)


	}
	// get the next record
	if(foundset.find())
	{
		bookmark_id = globals.nav.bookmarks[_buttonnr_next].bookmark_id
		foundset.search()
		_rec_next = foundset.getRecord(1)
	}
	
	// toggle the sortorder of the records
	_sort_org = _rec_org.sort_order
	_sort_next = _rec_next.sort_order
	_rec_org.sort_order = _sort_next
	_rec_next.sort_order = _sort_org 
	loadBookmarks();

}

/**
 *	Set height of the splitter
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"7b564b01-08e1-4910-af4d-7223f212069e"}
 */
function setHeight()
{
	if(globals.nav && globals.nav.bookmarks)
	{
		var _extra_size = 150
		if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) _extra_size = 70
		var _loc = application.getWindow().getHeight() - ((globals.nav.bookmarks.length * 32)+_extra_size)
		if(_loc != forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'])
		{
			forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'] = _loc
		}
	}
	
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CC018A4F-A8C2-4253-AA2C-87111CFF0F6F"}
 */
function onShow(firstShow, event) {
	setHeight()
}

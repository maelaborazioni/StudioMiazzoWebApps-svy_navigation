/**
 *	Deletes the shortcut
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"fa727a9f-4117-464d-863f-f71da4081de0"}
 * @AllowToRunInFind
 */
function onClickDelete(_event)
{
	var _button = _event.getElementName();
	var _buttonnr = _button.replace(/[^0-9]/g, "") * 1
	
	// find shortcut and delete
	if(foundset.find())
	{
		nav_shortcut_id = globals.nav.shortcuts[_buttonnr].shortcut_id 
		program_name =  globals.nav.shortcuts[_buttonnr].program
		foundset.search()
	}
	
    foundset.deleteRecord()
    loadShortcuts()
	
}

/**
 *	Toggles the sort order of a shortcut, up - down
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"bd0ee5e3-63e8-4d3a-b768-4f03ee851455"}
 * @AllowToRunInFind
 */
function toggleShortcut(_event)
{

	var _button = _event.getElementName();
	var _buttonnr = _button.replace(/[^0-9]/g, "") * 1
	var _buttonnr_next
	var _rec_org
	var _rec_next
	var _sort_org
	var _sort_next

	// if shortcut has to move up
	if(/Up/.test(_button))
	{
		_buttonnr_next  = _buttonnr - 1
	}
	// if shortcut has to move down
	if(/Down/.test(_button))
	{
		_buttonnr_next  = _buttonnr + 1
	}
	// get the origenal record
	if(foundset.find())
	{
		nav_shortcut_id = globals.nav.shortcuts[_buttonnr].shortcut_id 
		program_name =  globals.nav.shortcuts[_buttonnr].program
		foundset.search()
		_rec_org = foundset.getRecord(1)
	}
	// get the next record
	if(foundset.find())
	{
		nav_shortcut_id = globals.nav.shortcuts[_buttonnr_next].shortcut_id
		program_name =  globals.nav.shortcuts[_buttonnr_next].program
		foundset.search()
		_rec_next = foundset.getRecord(1)
	}
	
	// toggle the sortorder of the records
	_sort_org = _rec_org.sort_order
	_sort_next = _rec_next.sort_order
	_rec_org.sort_order = _sort_next
	_rec_next.sort_order = _sort_org 
	
	loadShortcuts();

}

/**
 * Load the shorcuts for the loged in user
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"eb9bd716-5925-4415-ae4a-298500528cdb"}
 * @AllowToRunInFind
 */
function loadShortcuts()
{
	if(!globals.nav)
	{
		return;
	}
	
	globals.nav.shortcuts = new Array()
	// Look for user shortcuts first

	forms.svy_nav_m_shortcut.controller.find();
	forms.svy_nav_m_shortcut.user_id = globals.svy_sec_lgn_user_id;
	forms.svy_nav_m_shortcut.organization_id = globals.svy_sec_lgn_organization_id;
	
	forms.svy_nav_m_shortcut.foundset.sort('sort_order asc')
	var _found = forms.svy_nav_m_shortcut.controller.search();
	
	if (_found == 0)
	{
	    // If no user shortcuts are present, use default shortcuts
		forms.svy_nav_m_shortcut.controller.find();
		forms.svy_nav_m_shortcut.user_org_id = "-1"
		forms.svy_nav_m_shortcut.foundset.sort('sort_order asc')
		_found = forms.svy_nav_m_shortcut.controller.search();
	}
	for (var _i = 0; _i < elements.length; _i++)
	{
		// Hide all shortcuts and shortcut labels
		elements[_i].visible = false;
	}
	var _count = 0
	for (var _j = 0; _j < _found; _j++)
	{
	
		// Loop over foundset to set shortcut labels and show shortcuts
		forms.svy_nav_m_shortcut.foundset.setSelectedIndex(_j + 1);
		
		if( globals.nav.program[forms.svy_nav_m_shortcut.program_name])
		{
			elements['shortcutLabel' + _count]['text'] = globals.nav.program[forms.svy_nav_m_shortcut.program_name].description
			elements['shortcut' + _count]['visible'] = elements['shortcutLabel' + _count].visible = true;
			elements['btnshortcutDel' + _count].visible = true;
			elements['btnshortcutMoveUp' + _count].visible = true;
			if(_count == 0) // first bookmark can not get up
			{ 
				elements['btnshortcutMoveUp' + _count].enabled = false;  
			}
			else
			{
				elements['btnshortcutMoveUp' + _count].enabled = true;  
			}
			elements['btnshortcutMoveDown' + _count].visible = true;
			
			if(_count == (_found -1)) // if it is the last bookmark you can not move down
			{ 
				elements['btnshortcutMoveDown' + _count].enabled = false; 
			}
			else
			{
				elements['btnshortcutMoveDown' + _count].enabled = true; 
			}
			// put into a object for later use, when the user clicks a shortcut
			globals.nav.shortcuts[_count] = new Object()
			globals.nav.shortcuts[_count].program = forms.svy_nav_m_shortcut.program_name
			globals.nav.shortcuts[_count].shortcut_id = forms.svy_nav_m_shortcut.nav_shortcut_id
			_count ++
		}
		
	}
	setHeight()
}

/**
 * Set the height of the divider
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"5cf0255c-92c1-490b-945f-d3ff725ddbef"}
 */
function setHeight()
{
	if(globals.nav && globals.nav.shortcuts)
	{
		var _extra_size = 150
		if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) _extra_size = 70
		var _loc = application.getWindow().getHeight() - ((globals.nav.shortcuts.length * 32)+_extra_size)
		if(_loc != forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'])
		{
			forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'] = _loc
			application.output('LOC SS'+_loc)
		}
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B9E51033-9A8D-42D7-8C7B-9CD45DCE0837"}
 */
function onShow(firstShow, event) {
	setHeight()
}

/**
 *	Load the record history for the loged in user
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"b188e5bf-ee54-4ca2-8990-2ad4316fed37"}
 */
function loadRecordHistory()
{
	if(!globals.nav || !globals.nav.recordHistory)
	{
		return;
	}
	var _i
	
	// hide all
	for (_i = 0; _i < 7; _i++)
	{
		// Hide all bookmarks
		elements['record_history'+ _i].visible = false
		elements['program_info'+ _i].visible = false
		elements['record_info'+ _i].visible = false
		elements['program_image'+ _i].visible = false
	}
		
	// loop true records and set bookmarks
	for (_i = 0; _i < globals.nav.recordHistory.length; _i++)
	{

		elements['record_history'+ _i].visible = true
		elements['program_info'+ _i].visible = true
		elements['record_info'+ _i].visible = true
		elements['program_image'+ _i].visible = true
			
		//set program text
		elements['program_info'+ _i]['text'] =   globals.nav.recordHistory[_i].program_info
		//set record text
		
		elements['record_info'+ _i]['text'] = 	globals.nav.recordHistory[_i].record_info
		
		// set image
		elements['program_image'+ _i].setImageURL('media:///'+ globals.nav.program[globals.nav.recordHistory[_i].program].program_image);
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
 * @properties={typeid:24,uuid:"a3b6dcc3-80e1-4202-98b0-4e02d0d35c12"}
 */
function onClick(_event)
{
	if(globals.nav.mode != 'browse') return	
	var _button = _event.getElementName();
	globals.nav.openNewTab = 1
	var _program = globals.nav.recordHistory[_button.replace(/[^0-9]/g, "")].program
	var _pk = globals.nav.recordHistory[_button.replace(/[^0-9]/g, "")].record_ids	
	var _view = globals.nav.recordHistory[_button.replace(/[^0-9]/g, "")].view	
	globals.svy_nav_bookmarkGoto(null,_program, _pk, _view);

}

/**
 *	On load method, hides all bookmarks
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"2c4d4c80-6c3b-4105-b37c-285185e40b94"}
 */
function onLoad()
{
	// hide all
	for (var _i = 0; _i < 7; _i++)
	{
		// Hide all bookmarks
		elements['record_history'+ _i].visible = false
		elements['program_info'+ _i].visible = false
		elements['record_info'+ _i].visible = false
		elements['program_image'+ _i].visible = false
	}
}

/**
 *	Set the height of the divider
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"272857ee-92f0-4cb7-89c3-ac5643469782"}
 */
function setHeight()
{
	if(globals.nav && globals.nav.recordHistory)
	{
		var _extra_size = 150
		if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) _extra_size = 70
		var _loc = application.getWindow().getHeight() - ((globals.nav.recordHistory.length * 32)+_extra_size)
		if(_loc != forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'])
		{
			forms.svy_nav_fr_menu.elements.tab_split['dividerLocation'] = _loc
		}
	}
}

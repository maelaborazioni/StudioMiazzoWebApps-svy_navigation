/**
 *	Goto a program by his shortname
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @param {JSEvent} _event
 * @return  none
 *
 * @properties={typeid:24,uuid:"1d3dc892-36b6-415e-ac7b-cc760dffa1d1"}
 */
function goto_shortName(_event)
{	
	// if there is a program found
	if(databaseManager.hasRecords(_to_nav_program$shortname))
	{
		var _program = _to_nav_program$shortname.program_name	
		var _template = globals.nav.template_types[globals.nav.program[_program].view]
		var _form = globals.nav.program[_program].form[forms[_template].has1()][2]  
		//show the program
		globals.svy_nav_showForm(_form, _program); 	
	}	
	globals.svy_mod_closeForm(_event)
	globals.progam_shortname = null
}

/**
 *	On show, set focus on field
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"0531191f-297d-4a78-a76e-2bc032ccfe93"}
 */
function onShow()
{
	elements.fld_shortcut.requestFocus()
}

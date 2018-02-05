/** *
 * @param _event
 *
 * @properties={typeid:24,uuid:"DCC9D2B3-1FA7-4DA2-9418-B18F30EF7D78"}
 */
function dc_new(_event) {
	_super.dc_new(_event)
	if(!program_name)// the relation can fill it to
	{
		program_name = globals.nav_program_name
	}
	forms.svy_nav_c_program_dtl.gotoEdit()
}

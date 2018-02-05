/**
 * MAVariazione - Hide or show the 2°level of button bar
 * @param {Number} _hide
 *
 * @properties={typeid:24,uuid:"38EEFDA2-7E3F-4D37-8ABA-E44DEFE1B4F8"}
 */
function ButtonBarHide(_hide) {
		
	if(_hide == 1)
	{
		if(elements.buttonbar.visible != false) 
		{
			elements.buttonbar.visible = false
			elements.form_view_02.setLocation(0,0)			
		}
	} 
	else // set the form back if a program is used with buttonbar
	{
		if(elements.buttonbar.visible != true)
		{
			elements.buttonbar.visible = true
			elements.form_view_02.setLocation(0,25)
		}
	}
}

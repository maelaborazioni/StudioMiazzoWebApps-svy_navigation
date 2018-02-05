/**
 *	Tab switch
 *
 * @author Sanneke Aleman
 * @since 2007-11-24
 * @param {JSEvent} [_event]
 * @param {Number} [_arg] number of the tab you want to navigate to
 * @return  none
 * 
 * @properties={typeid:24,uuid:"10530FDC-8581-4641-AE0E-1962613D8B1A"}
 * @SuppressWarnings(unused)
 */
function tabSwitch(_event, _arg)
{
	var _tab 
	var _form
	if(_arg == undefined )
	{
		_tab = _event.getElementName().replace(/[^0-9]/g, "")
	}
	else
	{
		_tab = _arg
	}
	
	//deactivated tabs
	for (var i = 0; i < 7; i++) 
	{
		elements['tab_left_'+(i+1)].setImageURL('media:///tab_grey_left.png')
		elements['tab_right_'+(i+1)].setImageURL('media:///tab_grey_right.png')
		elements['tab_'+(i+1)].setImageURL('media:///tab_grey_btw.png')
		elements['lbl_'+(i+1)].setFont('Verdana,0,10');
		elements['lbl_'+(i+1)].fgcolor = '#000000'
	}

	//activated
	elements['tab_left_'+ _tab].setImageURL('media:///tab_blue_left.png')
	elements['tab_right_'+ _tab].setImageURL('media:///tab_blue_right.png')
	elements['tab_'+ _tab].setImageURL('media:///tab_blue_btw.png')
	elements['lbl_'+ _tab].setFont('Verdana,1,10');
	elements['lbl_'+ _tab].fgcolor = '#ffffff'
	
	elements.metadata_tab.tabIndex = _tab	
}

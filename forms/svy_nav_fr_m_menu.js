/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B678AC50-1FD4-49B8-97C3-4BA8EF3FDCC5",variableType:4}
 */
var vMenu_item_id = null;

/**
 * @properties={typeid:24,uuid:"6C47A2AE-36F2-4A72-9688-6F91BDD07EF2"}
 */
function drawForm() {
	
	var i = 1
	
	var _x = 0
	var _y = 0
	var _w = 200
	var _h_m = 38
	var _h_m_i = 30
	
	var _form, _h
	
	
	while (elements['tab_'+i]) {
		
		_form = 'svy_nav_fr_m_menu_parts' + i
		//menu is expanded
		if(forms[_form].vMenuExpanded)
		{
			_h = _h_m + (forms[_form].controller.getMaxRecordIndex() * _h_m_i)
		}
		else //menu is not expanded
		{
			_h = _h_m
		}
		
		elements['tab_'+i].setLocation(_x,_y)
		elements['tab_'+i].setSize(_w,_h)
		_y += _h
		i++
	}
}

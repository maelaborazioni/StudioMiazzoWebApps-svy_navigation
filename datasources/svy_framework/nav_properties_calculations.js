/**
 * @properties={type:12,typeid:36,uuid:"e4680405-c26f-4f28-b5b6-d1437f296ce7"}
 */
function clc_property_value()
{
	if(property_value)
	{
		var _return = ''		
		for (var i = 0; i < property_value['length']; i++) 
		{
			if(i != 0) _return += ', '
			_return += property_value[i]
		}
		return  _return 
		//property_value.join(',')
	}
	else
	{
		return ''
	}

}

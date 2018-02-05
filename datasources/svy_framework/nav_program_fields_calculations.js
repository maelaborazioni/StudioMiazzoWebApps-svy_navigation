/**
 * @properties={type:12,typeid:36,uuid:"35F9811A-5C24-481A-9ABD-FB7247C5B8B9"}
 */
function display_label()
{
	if(flag_i18n)
	{
		return i18n.getI18NMessage(label)
	}
	else
	{
		return label
	}
}

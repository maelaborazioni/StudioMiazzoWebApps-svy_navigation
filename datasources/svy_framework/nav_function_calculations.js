/**
 *
 * @properties={type:12,typeid:36,uuid:"361D748B-01A9-4906-9E52-41EE038B77F5"}
 */
function display_description()
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

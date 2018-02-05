/**
 * @properties={type:12,typeid:36,uuid:"88b053c2-3de4-4673-87ba-faa97c3e96da"}
 */
function display_description()
{
	if(description)
	{
		return description
	}
	else if(utils.hasRecords(nav_programtabs_to_nav_program$target_program_name))
	{
		return nav_programtabs_to_nav_program$target_program_name.display_description
	}
	else
	{
		return ''
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"6b3b313f-34ab-4729-8ca2-a755aadbf28b"}
 */
function i18n_description()
{

	if(flag_i18n)
	{
		return i18n.getI18NMessage(description)
	}
	else
	{
		return description
	}


}

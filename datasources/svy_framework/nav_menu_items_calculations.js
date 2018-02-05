/**
 * @properties={type:-4,typeid:36,uuid:"EEE57526-FD42-415F-A0DA-673BE42737E2"}
 */
function m_select_menu()
{
    if(globals.nav_menu_item_id == menu_item_id)
    {
    	return solutionModel.getMedia('m_menu_select.png').bytes
    }
    else return null;
}

/**
 * Calculate the row background color.
 *
 * @param {Number} index row index
 * @param {Boolean} selected is the row selected
 * @param {String} elementType element type
 * @param {String} dataProviderID element data provider
 * @param {Boolean} edited is the record edited
 *
 * @returns {String} row background color
 *
 * @properties={type:12,typeid:36,uuid:"A57943B5-C859-4B79-8477-B8D25E7BC9D7"}
 */
function rowBGColorCalc(index, selected, elementType, dataProviderID, edited)
{
	
	return '#ffffff';
	
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"BD6A1D4E-A521-4628-9C5F-0261A834AEBF"}
 */
function display_description()
{
	if(menuitem_type == 'F' && utils.hasRecords(nav_menu_items_to_nav_function))
	{
		return nav_menu_items_to_nav_function.display_description
	}
	else if(utils.hasRecords(nav_menu_items_to_nav_program))
	{
		return nav_menu_items_to_nav_program.display_description
	}
	else if(flag_i18n)
	{
		return i18n.getI18NMessage(description)
	}
	else
	{
		return description
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"C8C0EB61-FE04-4EDD-8392-CE397698D670"}
 */
function sort_calc()
{
	return 'sort_order asc';
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"BB7BF528-4BE2-4508-A534-94C9A83DC551"}
 */
function tree_image() {

	switch (menuitem_type) {
	case 'P':
		if (utils.hasRecords(nav_menu_items_to_nav_program) && nav_menu_items_to_nav_program.program_image) {
			return 'media:///' + nav_menu_items_to_nav_program.program_image;
		} else {
			return 'media:///program_orange.png';
		}

		break;
	case 'F':
		if (menuitem_image) {
			return 'media:///' + menuitem_image;
		} else {
			return 'media:///function_16_16.png';
		}

		break;
	default:
		if (menuitem_image) {
			return 'media:///' + menuitem_image;
		} else {
			return 'media:///folder_blue.png';
		}
		break;
	}
}

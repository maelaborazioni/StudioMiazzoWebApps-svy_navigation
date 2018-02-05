/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6C621000-A54C-4E1B-B8A3-07A2BCEAD562",variableType:4}
 */
var vDidTreeViewInit = 0;

/**
 * Init the tree
 *
 * @author Sanneke Aleman
 * @since 2008-11-24
 * 
 * @param {Boolean} [_reset]
 * @return  none
 *
 * @properties={typeid:24,uuid:"eb2a7f84-594c-4e95-a09b-487aa0151666"}
 */
function init_tree(_reset)
{
	var _path;
	
	if (_reset) {
		vDidTreeViewInit = 0;
		_path = elements.dbtreeview.selectionPath;
		elements.dbtreeview.removeAllRoots();
	}

	if (vDidTreeViewInit == 0)
	{
		var _binding = elements.dbtreeview.createBinding(foundset.getDataSource())
		_binding.setImageURLDataprovider('tree_image');
		_binding.setChildSortDataprovider('sort_calc');
		_binding.setNRelationName('nav_menu_items_to_nav_menu_items$parent_id');
		_binding.setTextDataprovider('display_description');
		_binding.setMethodToCallOnClick(globals.svy_nav_tree_node_selected, 'menu_item_id');	
		_binding.setMethodToCallOnDoubleClick(globals.svy_nav_tree_node_selected, 'menu_item_id');	
		_binding.setMethodToCallOnRightClick(globals.svy_nav_tree_node_selected_rightClick, 'menu_item_id');	
		elements.dbtreeview.addRoots(foundset);
		vDidTreeViewInit = 1
		if (_path) {
			elements.dbtreeview.selectionPath = _path;
		}
	}

}

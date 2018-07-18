/**
 *	Set the right form and call globals.svy_sea_find
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"7e8d0bc1-6899-4306-a8eb-b4093cc181d9"}
 */
function find()
{
	globals.nav.bar_triggered = controller.getName()
	globals.svy_sea_mainForm = 'svy_nav_fr_main'
	globals.svy_sea_searchForm = globals.nav.form_view_01
	
	globals.svy_sea_find();

}

/**
 *	Set readOnly false
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"09bbeeac-3172-484f-8688-6c7c438f406e"}
 */
function onShow()
{

	controller.readOnly = false
}

/**
 *	Open the form in view 1, only in developer
 * 
 * @author Sanneke Aleman
 * @since 2008-11-24
 * @return  none
 *
 * @properties={typeid:24,uuid:"78698b46-b028-47b0-b0ab-f71f321627b2"}
 */
function openForm()
{

	if(application.getApplicationType() == 3)//developer
	{
		forms[globals.nav.form_view_01].controller.show()
	}
}

/**
 * Perform the element right-click action.
 * @author Sanneke Aleman
 * @since 2010-03-09
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E7CF21C2-8022-4ADD-9D60-C0F2A2A326A5"}
 */
function listMenu(event) {
	//listmenu
	var _foundset, _menuItem
	/** @type {JSRecord<db:/svy_framework/nav_user_table_view>} */
	var _rec
	var popupmenu = plugins.window.createPopupMenu()

	_menuItem = popupmenu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.create_new_tableview'),createTableView)
	_menuItem = popupmenu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.edit_delete_view'),editTableView)
	
	if(utils.hasRecords(_to_nav_user_table_view$default))
	{
		_menuItem = popupmenu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.set_system_table_view_as_default_table_view'),setSystemTableAsDefault)
	}
	
	popupmenu.addSeparator()
	
	
	if(!globals.nav.program[globals.nav_program_name].table_created == 1)
	{
		_menuItem = popupmenu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.system_table'), showOriginal) 
	}
	else //show the default
	{
		/** @type {JSFoundSet<db:/svy_framework/nav_user_table_view>} */
		_foundset = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_user_table_view')
		_foundset.addFoundSetFilterParam('user_id','=', globals.svy_sec_lgn_user_id);
		_foundset.addFoundSetFilterParam('organization_id','=', globals.svy_sec_lgn_organization_id)
		_foundset.addFoundSetFilterParam('program_name','=',globals.nav_program_name)
		_foundset.addFoundSetFilterParam('flag_system','=',1)
		_foundset.loadAllRecords()
		_rec = _foundset.getRecord(1)
		_menuItem = popupmenu.addMenuItem(i18n.getI18NMessage('svy.fr.lbl.system_table'),showTableView)
		_menuItem.methodArguments = [_rec.user_table_view_id]
		
	}
	 popupmenu.addSeparator()
	/** @type {JSFoundSet<db:/svy_framework/nav_user_table_view>} */
	_foundset = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_user_table_view')
	_foundset.addFoundSetFilterParam('user_id','=', globals.svy_sec_lgn_user_id);
	_foundset.addFoundSetFilterParam('organization_id','=', globals.svy_sec_lgn_organization_id);
	_foundset.addFoundSetFilterParam('program_name','=',globals.nav_program_name)
	_foundset.addFoundSetFilterParam('flag_system','IS NULL',null)
	_foundset.loadAllRecords()
	
	
	for (var i = 1; i <= _foundset.getSize(); i++) 
	{
		
		_rec = _foundset.getRecord(i)
		var _name = _rec.name 
		if(_rec.flag_user_default)
		{
			_name += ' ' + i18n.getI18NMessage('svy.fr.lbl.<default>')
		}
		_menuItem = popupmenu.addMenuItem(_name,showTableView)
		_menuItem.methodArguments = [_rec.user_table_view_id]
	}
	
	/** @type {RuntimeComponent} */
	var source = event.getSource()
	if (source != null)
	{
		popupmenu.show(source);
	}
}

/**
 *
 * @properties={typeid:24,uuid:"589B7570-7B6A-4A3F-BD84-98032F39AB1E"}
 */
function createTableView() {
	forms.svy_nav_fr_user_table_view_dtl.controller.newRecord()
	forms.svy_nav_fr_user_table_view_dtl.program_name = globals.nav_program_name
	forms.svy_nav_fr_user_table_view_dtl.server_name = globals.nav.program[globals.nav_program_name].server_name
	forms.svy_nav_fr_user_table_view_dtl.table_name = globals.nav.program[globals.nav_program_name].table_name
	forms.svy_nav_fr_user_table_view_dtl.user_id = globals.svy_sec_lgn_user_id;
	forms.svy_nav_fr_user_table_view_dtl.organization_id = globals.svy_sec_lgn_organization_id;
	globals.svy_mod_showFormInDialog(forms.svy_nav_fr_user_table_view_dtl,null,null,null,null,null,true,false,'user_table_view')
}

/**
 *
 * @properties={typeid:24,uuid:"FD308652-5426-450E-B0BC-7A10D59948B4"}
 */
function editTableView() {
	/** @type {JSFoundSet<db:/svy_framework/nav_user_table_view>} */
	var _foundset = databaseManager.getFoundSet(globals.nav_db_framework, 'nav_user_table_view')
	_foundset.addFoundSetFilterParam('user_id','=', globals.svy_sec_lgn_user_id);
	_foundset.addFoundSetFilterParam('organization_id','=', globals.svy_sec_lgn_organization_id);
	_foundset.addFoundSetFilterParam('program_name','=',globals.nav_program_name)
	_foundset.loadAllRecords()
	forms.svy_nav_fr_user_table_view_tbl.controller.loadRecords(_foundset)
	globals.svy_mod_showFormInDialog(forms.svy_nav_fr_user_table_view_tbl,null,null,null,null,null,true,false,'user_table_view')
}

/**
 *
 * @properties={typeid:24,uuid:"326D8CCA-6067-4099-AE28-DCFB0FBF7E16"}
 */
function showTableView(_arg1, _arg2, _arg3, _arg4, _menuName, _table_view_id ) {
	if(globals.nav.program[globals.nav_program_name].view == 0 )
	{
		globals.nav.program[globals.nav_program_name].view = 2
		var _program = globals.nav_program_name
		var _template = globals.nav.template_types[2]
		var _form = globals.nav.program[_program].form[forms[_template].has1()][2]         
			
		// show the program
		globals.svy_nav_showForm(_form, _program); 
	}
	
	globals.nav.program[globals.nav_program_name].user_table_view_id = _table_view_id;
	globals.svy_nav_createTableView(null, _table_view_id, true)
}

/**
 *
 * @properties={typeid:24,uuid:"A1E9E9A4-6EA9-400B-9CDC-FAED45FB38D7"}
 */
function showOriginal() {
	forms.svy_nav_fr_processing.controller.show()
	var _program = globals.nav_program_name 
	
	if(globals.nav.program[globals.nav_program_name].view == 0 )
	{
		globals.nav.program[_program].view = 2
	}
	
	globals.nav.program[_program].user_table_view_id = null;
	
	var _template = globals.nav.template_types[globals.nav.program[_program].view]
	var _form = globals.nav.program[_program].form[forms[_template].has1()][2]         
	history.removeForm(_form)
	solutionModel.revertForm(_form)
	forms[_form].controller.loadRecords(globals.nav.program[globals.nav_program_name].foundset)
	globals.svy_nav_showForm(_form, _program, false, true); 
	forms.svy_nav_fr_main.controller.show()
}

/**
 * @properties={typeid:24,uuid:"9D01C9F9-B7F4-42E2-9708-78075D1FE3C3"}
 */
function setSystemTableAsDefault() {
	if(utils.hasRecords(_to_nav_user_table_view$default))
	{
		_to_nav_user_table_view$default.flag_user_default = 0
		databaseManager.saveData(_to_nav_user_table_view$default.getSelectedRecord())
	}
}

/**
 * @properties={typeid:24,uuid:"9B9645FB-93F7-43A7-9854-A1258951EAD6"}
 */
function onClickLogOut()
{
	var _solution = application.getSolutionName()
	security.logout(_solution)
}

/**
 * MAVariazione - allow other code to save its own properties
 * @properties={typeid:35,uuid:"9C915380-307F-4161-AC4C-EC6EFA29A6E3",variableType:-4}
 */
var vSaveTabPropertiesListeners = {};

/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"8071B84D-6C94-4E9D-92EC-E70CB4D9F105",variableType:-4}
 */
var vExtraTabs = new Array();

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1D797D55-0D1C-455D-8C9A-6AB6C23977F6",variableType:4}
 */
var vFormWidth = 0;

/**
 * @properties={typeid:35,uuid:"81377889-CC6A-4906-90E9-D34A7B4397DB",variableType:-4}
 */
var vFoundsets = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C69AEDAF-087B-4A15-BDE8-7B8949CC935C",variableType:4}
 */
var vFromOpenTabs = null;

/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"A1D5EAE9-1AA2-43BA-91B6-A8B534D9BDA9",variableType:-4}
 */
var vOpenTabs = new Array();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"26E11D67-34D3-4581-AD98-C281A35DB4A6"}
 */
var vPreviousTabName = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"98B03E81-77AC-486F-8634-3FC8B6939033",variableType:4}
 */
var vRemoveTab = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"75D0DC26-7925-420A-A1E3-B776A7F8A47C",variableType:4}
 */
var vSelectedTab = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"35E9D544-1A1F-4E35-90F1-24C03CB1FDFF",variableType:4}
 */
var vStartPosition = 0;

/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"8EBD562B-1C11-4E23-B75D-773EC41316EB",variableType:-4}
 */
var vTabNames = [];

/**
 * @properties={typeid:35,uuid:"2244AB6C-C0FE-49B8-8AD6-677F0952EF63",variableType:-4}
 */
var vTabObjects = new Object();

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1D92344F-EFFC-4D6A-90A5-9E66AD9EE190",variableType:4}
 */
var vTabWidth = 175;

/**
 * @param {JSEvent} [_event]
 * @param {String} _program
 * @param {Number} [_forcedSelected]
 * 
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"C11E0BBE-5D1C-4970-9264-8E5780D2BFE7"}
 * @AllowToRunInFind
 */
function drawTab(_event, _program, _forcedSelected) {

	var _multiTab = false	
		
	if(globals.svy_nav_multi_tab_programs && (globals.nav.openNewTab || vRemoveTab))
	{
		_multiTab = true
		if (globals.nav.openNewTab) {
			_forcedSelected = vOpenTabs.length
		}
	}
	
	if(!globals.nav.openNewTab 
			&& !vFromOpenTabs 
			&& !vRemoveTab 
			&& !globals.nav.toggle)
		return null//tabs should not react if click is not from tree or tabs
	
	globals.nav.openNewTab = null
	globals.nav.toggle = 0
	
	/** @type {String}*/
	var _newTabName = null;
	
	//was opened by clicking a open tab, so doesn't have to be added to the open tabs
	if((vRemoveTab && vFromOpenTabs) || !_multiTab && (vFromOpenTabs || vOpenTabs.indexOf(_program) > -1)) { // && _program != vOpenTabs[vFromOpenTabs]) {
		if(!vFromOpenTabs)
		{
			vSelectedTab = vOpenTabs.indexOf(_program);
		}
		if (vRemoveTab) {
			vSelectedTab = _forcedSelected;
		}
		var _jsForm = solutionModel.getForm(controller.getName());
		var _jsLabel;
		for (var i = 0; i < vOpenTabs.length; i++) {
			if(i != vSelectedTab) {// && _program != vOpenTabs[vFromOpenTabs]) {
				_jsLabel = _jsForm.getLabel('leftLabel_'+ i);
				_jsLabel.imageMedia = solutionModel.getMedia("nav_ot_tab_left.png");
				
				_jsLabel = _jsForm.getLabel('btwLabel_'+ i);
				_jsLabel.imageMedia = solutionModel.getMedia("nav_ot_tab_btw.png");

				_jsLabel = _jsForm.getLabel('rightLabel_'+ i);
				_jsLabel.imageMedia = solutionModel.getMedia("nav_ot_tab_right.png");

//				elements['leftLabel_'+ i].setImageURL("media:///nav_ot_tab_left.png");
//				elements['btwLabel_'+ i].setImageURL("media:///nav_ot_tab_btw.png");
//				elements['rightLabel_'+ i].setImageURL("media:///nav_ot_tab_right.png");

			} else {
				_jsLabel = _jsForm.getLabel('leftLabel_'+ i);
				_jsLabel.imageMedia = solutionModel.getMedia("nav_ot_tab_left_sel.png");
				
				_jsLabel = _jsForm.getLabel('btwLabel_'+ i);
				_jsLabel.imageMedia = solutionModel.getMedia("nav_ot_tab_btw_sel.png");

				_jsLabel = _jsForm.getLabel('rightLabel_'+ i);
				_jsLabel.imageMedia = solutionModel.getMedia("nav_ot_tab_right_sel.png");
				
//				elements['leftLabel_'+ i].setImageURL("media:///nav_ot_tab_left_sel.png");
//				elements['btwLabel_'+ i].setImageURL("media:///nav_ot_tab_btw_sel.png");
//				elements['rightLabel_'+ i].setImageURL("media:///nav_ot_tab_right_sel.png");
			}
		}
		vFromOpenTabs = 0;
	} else {
		var _x = vStartPosition
		var _y = 0

		var _closeImgh = 10
		var _closeImgw = 11
		var _closeImgOffset = 7

		var _tabLeftImgh = 25
		var _tabLeftImgw = 7

		var _tabRightImgh = 25
		var _tabRightImgw = 8

		var _tabBtwImgh = 25
		var _tabBtwImgw = vTabWidth - (_tabRightImgw + _tabLeftImgw);

		if (vFormWidth == 0) {
			vFormWidth = controller.getFormWidth();
			if (vFormWidth == 0) {
				application.updateUI();
				vFormWidth = controller.getFormWidth();
				if (vFormWidth == 0) {
					vFormWidth = application.getWindow().getWidth() - forms.svy_nav_fr_main.elements.tab_split.dividerLocation;
				}
			}
		}
		var _tabsWidth = vOpenTabs.length * vTabWidth;
		
		if (_tabsWidth + vTabWidth > vFormWidth) {
			_newTabName = _program + "__" + application.getUUID();
			
			if(globals.svy_nav_multi_tab_programs)
			{	//connect the foundset to the object
				if(!vTabObjects[_newTabName])
				{
					vTabObjects[_newTabName] = new Object()
				}
				vTabObjects[_newTabName].view = globals.nav.program[globals.nav_program_name].view
				vTabObjects[_newTabName].program = globals.nav_program_name
			}
			//add new UUID in same position as tab will be added below
			var z = vTabNames.slice(0,vOpenTabs.length);
			var z_last = z.pop();
			z.push(_newTabName);
			z.push(z_last);
			vTabNames = z.concat(vTabNames.slice(vOpenTabs.length));
			
			//add new program as second to last, so it won't end up in the popupmenu
			var _last = vOpenTabs.pop();
			vOpenTabs.push(_program);
			vOpenTabs.push(_last);
			
			checkSize(_event);
		} else {
//			var _height = 20
			var _width = vTabWidth - (_tabRightImgw + _tabLeftImgw);
	
			var _closeImg = solutionModel.getMedia("nav_ot_tab_close.png")
			var _tabLeftImg = solutionModel.getMedia("nav_ot_tab_left.png")
			var _tabBtwImg = solutionModel.getMedia("nav_ot_tab_btw.png")
			var _tabRightImg = solutionModel.getMedia("nav_ot_tab_right.png")
			
			var _closeImgMouseOver = solutionModel.getMedia("nav_ot_tab_close_sel.png")
			var _tabLeftImgSel = solutionModel.getMedia("nav_ot_tab_left_sel.png")
			var _tabBtwImgSel = solutionModel.getMedia("nav_ot_tab_btw_sel.png")
			var _tabRightImgSel = solutionModel.getMedia("nav_ot_tab_right_sel.png")
			
			var _form = controller.getName()
			
			var _formObj = solutionModel.getForm(_form)
			
			var _method = _formObj.getMethod('openProgram')
			
			var _leftLabel = _formObj.newLabel('',_x,_y,_tabLeftImgw,_tabLeftImgh,null)
			_leftLabel.imageMedia = _tabLeftImgSel;
			_leftLabel.transparent = true
			_leftLabel.name = 'leftLabel_'+ vOpenTabs.length
			_leftLabel.onRightClick = _formObj.getMethod("openContextMenu");
			_x += _tabLeftImgw - 1
		
			var _labelText = getTabText(vOpenTabs.length, _program)
			
			//Original
			//var _label = _formObj.newLabel(_labelText,_x,_y,_width-16,_tabRightImgh,_method)
			
			//MAVariazione use the dots when the text is too long
			var _label = _formObj.newLabel(_labelText.substring(0, 24) + '...',_x,_y,_width-16,_tabRightImgh, _method)
			
			
			_label.formIndex = 999
			_label.transparent = true
			_label.styleClass = 'opentab'
			_label.toolTipText = _labelText
			_label.name = 'label_'+ vOpenTabs.length
			_label.onRightClick = _formObj.getMethod("openContextMenu");
			_label.showClick = false
			
			
			var _btwLabel = _formObj.newLabel('',_x,_y,_tabBtwImgw,_tabBtwImgh,null)
			_btwLabel.imageMedia = _tabBtwImgSel;
			_btwLabel.mediaOptions = SM_MEDIAOPTION.ENLARGE
			_btwLabel.transparent = true
			_btwLabel.name = 'btwLabel_'+ vOpenTabs.length
			_btwLabel.onRightClick = _formObj.getMethod("openContextMenu");
			_x += _tabBtwImgw -1
			
			var _rightLabel = _formObj.newLabel('',_x,_y,_tabRightImgw,_tabRightImgh,null)
			_rightLabel.imageMedia = _tabRightImgSel;
			_rightLabel.transparent = true
			_rightLabel.name = 'rightLabel_'+ vOpenTabs.length
			_rightLabel.onRightClick = _formObj.getMethod("openContextMenu");
			_x += _tabRightImgw -1
			
			var _closeMethod = _formObj.getMethod('closeTab')
			var _closeLabel = _formObj.newLabel('',_x+_closeImgOffset - 25,_y+_closeImgOffset,_closeImgw,_closeImgh,_closeMethod)
			_closeLabel.imageMedia = _closeImg
			_closeLabel.formIndex = 999
			_closeLabel.rolloverImageMedia = _closeImgMouseOver
			_closeLabel.transparent = true
			_closeLabel.name = 'close_'+ vOpenTabs.length
			_closeLabel.showClick = false
			_closeLabel.onRightClick = _formObj.getMethod("openContextMenu");
			
			vOpenTabs.push(_program);
			if (!vRemoveTab) {
				_newTabName = _program + "__" + application.getUUID()
				
				vTabNames.push(_newTabName);
				if(globals.svy_nav_multi_tab_programs)
				{
					//connect the foundset to the object
					if(!vTabObjects[_newTabName])
					{
						vTabObjects[_newTabName] = new Object()
					}
					vTabObjects[_newTabName].view = globals.nav.program[globals.nav_program_name].view
					vTabObjects[_newTabName].program = globals.nav_program_name
					vTabObjects[_newTabName].text = _labelText
				}
			}
			else
			{
				if(globals.svy_nav_multi_tab_programs)
				{
					vTabObjects[vTabNames[vOpenTabs.length-1]].text = _labelText	
				}
			}
			
			if(!vFromOpenTabs)
			{
				vSelectedTab = _forcedSelected!=null ? _forcedSelected : vOpenTabs.indexOf(_program);
			}
			
			vStartPosition = _x
			
			for (var j = 0; j < vOpenTabs.length; j++) {
				if(j != vSelectedTab) {// && _program != vOpenTabs[vFromOpenTabs]) {
					_formObj.getLabel('leftLabel_'+ j).imageMedia = _tabLeftImg;
					_formObj.getLabel('rightLabel_'+ j).imageMedia = _tabRightImg;
					_formObj.getLabel('btwLabel_'+ j).imageMedia = _tabBtwImg;
				} else {
					_formObj.getLabel('leftLabel_'+ j).imageMedia = _tabLeftImgSel;
					_formObj.getLabel('rightLabel_'+ j).imageMedia = _tabRightImgSel;
					_formObj.getLabel('btwLabel_'+ j).imageMedia = _tabBtwImgSel;
				}
			}
		}
	}
	recreateUI()
	
	if(globals.svy_nav_multi_tab_programs) // && !vRemoveTab)
	{
		//keep the old foundset, load the new one, because tabs can have different foundsets.		
		/** @type {String} */
		var _currentName = vTabNames[vSelectedTab]
				
		//use the foundset from the object 
		if(vTabObjects[_currentName].foundset)
		{
			/** @type {{form:Array}} */
			var _progObj = globals.nav.program[globals.nav_program_name]
			// sync the foundset, if there is a table
			if (_progObj.table_name && _progObj.table_name == vTabObjects[_currentName].foundset.getTableName()) {
				for (var k = 0; k < _progObj.form.length; k++) {
					if (forms[_progObj.form[k][2]]) {
						forms[_progObj.form[k][2]].controller.loadRecords(vTabObjects[_currentName].foundset)
					}
		
				}
				forms[globals.nav_program_name + '_tab'].controller.loadRecords(vTabObjects[_currentName].foundset)
			}
		}
		else
		{
			vTabObjects[_currentName].foundset = forms[globals.nav.form_view_01].foundset
		}
		
		vPreviousTabName = vTabNames[vSelectedTab]
	
	}
	
	vFromOpenTabs = null;
	
	return _newTabName || _currentName;
}

/**
 * @param {JSEvent} _event
 * @param {Number} [_forcedTabNr]
 * @param {Boolean} [_onCloseTab] //tiene traccia dell'eventuale chiamata dal metodo closeTab()
 * 
 * @properties={typeid:24,uuid:"0D82AE3F-ED4F-4762-B57B-270C1447D772"}
 * @AllowToRunInFind
 */
function openProgram(_event, _forcedTabNr, _onCloseTab) {
	
	// MAVariazione - check for the null event
	if(_event)
		var _element = _event.getElementName()
		
	var _tab = _forcedTabNr != null ? _forcedTabNr : _element.replace(/[^\d]/g, "")*1;

	vFromOpenTabs = 1;
	vSelectedTab = _tab;

	/** @type {String} */
	var _program_name;
	if (_tab >= vOpenTabs.length) {
		_program_name = vExtraTabs[_tab - vOpenTabs.length];
	} else {
		_program_name = vOpenTabs[_tab];
	}
		
	if (_program_name) {
		var _program = _program_name
		if (!globals.nav.program[_program] || globals.nav.program[_program] == undefined) return

		globals.nav.his = new Object()
		
		var _template
		/** @type {String}*/
		var _form
		
		if(globals.svy_nav_multi_tab_programs)
		{
			_template = globals.nav.template_types[vTabObjects[vTabNames[_tab]].view]
		}
		else
		{
			_template = globals.nav.template_types[globals.nav.program[_program].view]
		}
		_form = globals.nav.program[_program].form[forms[_template].has1()][2]
		
		// show the program
		var _return = [];
		//MA Variazione : add the objGiornParam (if any) during the show form 
		/** @type {{anno:Number,mese:Number,anno_attivo:Number,mese_attivo:Number,
		  *         periodo:Number,periodo_attivo:Number,giorni_sel:Array,ultimo_rec:Number,
		  *         gruppo_inst:Number,gruppo_lav:String,idditta:Number,
		  *         filtro_anag:Boolean,selected_tab:Number,selected_elements:Array,op_id:String}}*/
		var objGiornParam = globals.objGiornParams[vTabNames[_tab]];
		if(_onCloseTab)
		   _return = globals.svy_nav_showForm(_form, _program, false, false, _forcedTabNr, true, objGiornParam ,_onCloseTab);//globals.svy_nav_showForm(_form, _program, false, false, _forcedTabNr, true, null ,_onCloseTab);
		else
		   _return = globals.svy_nav_showForm(_form, _program, false, false, _forcedTabNr, true, objGiornParam);//globals.svy_nav_showForm(_form, _program, false, false, _forcedTabNr, true);
		// sort the tables
		if (_return == -1) {
			return
		}
		if (_return[0])// only if there are tabs
		{
			forms[_form].dc_sort(_return[0], _return[1]);
//			forms.svy_nav_base.dc_sort(_return[0], _return[1]);
		}
	}

}

/**
 * @properties={typeid:24,uuid:"A0488317-8410-4924-B703-995C0A0A2CD9"}
 * @AllowToRunInFind
 *
 */
function setView()
{
	if(vFromOpenTabs)//vSelectedTab &&
	{
		var _program = globals.nav_program_name
		//set the right view
		globals.nav.program[_program].view = vTabObjects[vTabNames[vSelectedTab]].view
		globals.nav.program[_program].user_table_view_id = vTabObjects[vTabNames[vSelectedTab]].user_table_view_id;
		globals.nav.program[_program].active_search = vTabObjects[vTabNames[vSelectedTab]].active_search;
		globals.nav.program[_program].search_type = vTabObjects[vTabNames[vSelectedTab]].search_type;
		globals.nav.program[_program].search_id = vTabObjects[vTabNames[vSelectedTab]].search_id;
	}
}

/**
 * @properties={typeid:24,uuid:"FA86603B-9520-4C63-82A1-FD051BF5C0F8"}
 */
function openProgramHelper(a,b,c,d,e, _event, _forcedTabNr) {
//	application.output("pre: " + (vOpenTabs.concat(vExtraTabs)).join(", "));
//	application.output(vTabNames.join(", ") + "\n");
	
	var i = _forcedTabNr - vOpenTabs.length;

	//put chosen element in front of array
	var _uuid = vTabNames[vOpenTabs.length + i]
	vTabNames = vTabNames.slice(0,vOpenTabs.length+i).concat(vTabNames.slice(vOpenTabs.length+i+1))
	vTabNames.unshift(_uuid);

	//put program from popupmenu as first open tab
	vOpenTabs.unshift(vExtraTabs[i]);
	vExtraTabs = vExtraTabs.slice(0, i).concat(vExtraTabs.slice(i+1));
	
	//put last open tab as first item in popupmenu
	vExtraTabs.unshift(vOpenTabs.pop());
		
	rebuildTabs(_event);

	vRemoveTab = true;
	openProgram(_event, 0);
	vRemoveTab = false;
	
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"EE4740D7-E462-4D3E-9B40-F2DA6F6D6098"}
 */
function openContextMenu(event) {
	var _popupmenu = plugins.window.createPopupMenu()

	var _item1 = _popupmenu.addMenuItem(i18n.getI18NMessage("svy.fr.lbl.close_tab"), closeTabHelper);
	var _item2 = _popupmenu.addMenuItem(i18n.getI18NMessage("svy.fr.lbl.close_all_tabs"), closeAllTabsHelper);
	var _item3 = _popupmenu.addMenuItem(i18n.getI18NMessage("svy.fr.lbl.close_other_tabs"), closeOtherTabsHelper);

	_item1.methodArguments = [event];
	_item2.methodArguments = [event];
	_item3.methodArguments = [event];

	/** @type {RuntimeLabel} */
	var _source = event.getSource()
	if (_source != null) {
		_popupmenu.show(_source);
	}
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"21249D88-E01F-470A-8D3A-60D2BD942F75"}
 */
function closeTab(_event) {
	
	var _element = _event.getElementName()
	var _tab = _element.replace(/\D+/g,"") * 1;
	var _previous = vSelectedTab;
	
	//MA Variazione : se è presente l'oggetto di parametri per il tab che si sta chiudendo, rimuoviamolo
    if(globals.objGiornParams[vTabNames[_tab]])
    	globals.removeObjGiornParameters(vTabNames[_tab]);
	
	vTabNames = vTabNames.slice(0,_tab).concat(vTabNames.slice(_tab+1));
	vOpenTabs = vOpenTabs.slice(0,_tab).concat(vOpenTabs.slice(_tab+1));
	if (vExtraTabs.length > 0) {
		vOpenTabs.push(vExtraTabs.shift());
	}
	
	rebuildTabs(_event);

	if (vOpenTabs.length == 0) { //last tab closed
		loadStartForm(_event)
	} else if (_tab == _previous) { //selected tab closed
		if (_previous == vOpenTabs.length) { //the closed tab was the last tab -> open the new last tab
			openProgram(_event, _previous-1, true); 
		} else {
			openProgram(_event, _previous, true);
		}
	}
}

/**
 * Loads startup form/program
 * 
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"16DB8476-B4B5-4C1F-86BF-4BE42F93FB83"}
 */
function loadStartForm(event) {
	//remove title text;
	forms.svy_nav_fr_status_bar.elements.form_name.text = "";
	
	//set startup form
	var _startUpForm = globals.svy_nav_getProperty('startup_form');
//	var _startUpProgram = globals.svy_nav_getProperty('startup_program');
	
	if (_startUpForm && _startUpForm[0]) { 
		//load startup form
		forms.svy_nav_fr_main.elements.tab_split.setRightForm(forms[_startUpForm[0]], null)
// TODO: Not sure if we should load the startupprogram, this basically prevents you from closing the last tab
//	} else if (_startUpProgram && _startUpProgram[0]) { 
//		//load startup program
//		var _program =	_startUpProgram[0]
//		var _template = globals.nav.template_types[globals.nav.program[_program].view]
//		var _form = globals.nav.program[_program].form[forms[_template].has1()][2]
//		globals.svy_nav_showForm(_form, _program);
	} else { 
		//framework default form;
		forms.svy_nav_fr_main.elements.tab_split.setRightForm(forms["svy_nav_fr_home_dtl"], null);
	}
}

/**
 * @param {Number} _index
 * @param {Number} _parentIndex
 * @param {Boolean} _isSelected
 * @param {String} _parentText
 * @param {String} _text
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"11AC04E3-BA7A-40BA-95E8-C6692807965F"}
 */
function closeTabHelper(_index, _parentIndex, _isSelected, _parentText, _text, _event) {
	closeTab(_event);
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"75D38C58-00F7-40AA-B061-EBEEAFEE1D25"}
 */
function closeOtherTabs(_event) {
	var _element = _event.getElementName()
	var _tab = _element.replace(/\D+/g,"") * 1;

	vTabNames = [].concat(vTabNames[_tab]);
	vOpenTabs = [].concat(vOpenTabs[_tab]);
	vExtraTabs = [];
	
	rebuildTabs(_event);
	
	openProgram(_event, 0);
}

/**
 * @param {Number} _index
 * @param {Number} _parentIndex
 * @param {Boolean} _isSelected
 * @param {String} _parentText
 * @param {String} _text
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"E7D7779B-E641-4C84-B093-AE9256CB5F4C"}
 */
function closeOtherTabsHelper(_index, _parentIndex, _isSelected, _parentText, _text, _event) {
	closeOtherTabs(_event);
}

/**
 * @param {JSEvent} _event
 * @properties={typeid:24,uuid:"6B22C73B-2E85-4087-ABDB-B8D7E9564F55"}
 */
function closeAllTabs(_event) {
	vTabNames = [];
	vOpenTabs = [];
	vExtraTabs = [];
	
	// MAVariazione : puliamo eventuali oggetti di parametri dei tab precedentemente aperti
	globals.objGiornParams = {}
	
	loadStartForm(_event);
	
	rebuildTabs(_event);
}

/**
 * @param {Number} _index
 * @param {Number} _parentIndex
 * @param {Boolean} _isSelected
 * @param {String} _parentText
 * @param {String} _text
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"3165939A-BFA4-4949-A3F3-CD42750EF7D3"}
 */
function closeAllTabsHelper(_index, _parentIndex, _isSelected, _parentText, _text, _event) {
	closeAllTabs(_event);
}

/**
 * @properties={typeid:24,uuid:"459CEC15-EC87-4320-A5CC-E610A5E4A3A1"}
 */
function rebuildTabs(_event) {
	var _prev = vRemoveTab;
	vRemoveTab = true;
	
	/** @type {Array<String>}*/
	var _array = [].concat(vOpenTabs);
	vOpenTabs = [];

	var _forcedSelected
	if (!vRemoveTab) {
		vTabNames = [];
	}
	_forcedSelected = vSelectedTab >= _array.length ? _array.length-1 : vSelectedTab; 
	
	vStartPosition = 0

	var _formObj = solutionModel.getForm(controller.getName())
	var _components = _formObj.getComponents()
	
	for (var j = 0; j < _components.length; j++) {
		if (_components[j].name != "lbl_bg") {
			_formObj.removeComponent(_components[j].name);
		}
	}
	recreateUI()
	
	for (var i = 0; i < _array.length; i++) {
		drawTab(_event, _array[i], _forcedSelected);
	}
	if (vExtraTabs.length > 0) {
		var _tabsWidth = vOpenTabs.length * vTabWidth;
		var _method = _formObj.getMethod("showExtraTabs");
		var _btnExtraTabs = _formObj.newButton("",_tabsWidth, 0, 19, 22, _method);
		_btnExtraTabs.showClick = false;
		_btnExtraTabs.imageMedia = solutionModel.getMedia("tabs_more.png")
		_btnExtraTabs.name = "btnExtraTabs";
		// MAVariazione - tooltip
		_btnExtraTabs.toolTipText = "Mostra tab aggiuntivi"
		recreateUI()
	} else if (_formObj.getComponent("btnExtraTabs")) {
		_formObj.removeComponent("btnExtraTabs");
	}
	vRemoveTab = _prev;
	
}

/**
 * @properties={typeid:24,uuid:"024E4705-D7AD-41A5-8885-D12AED950484"}
 */
function showFormInFramework() {
	// set the form on the main form
	var _browserFormObj = solutionModel.getForm('svy_nav_fr_browser')
	var _historyTab = _browserFormObj.newTabPanel('history_tabpanel',0,0,835,25)
	_historyTab.anchors = SM_ANCHOR.WEST | SM_ANCHOR.NORTH | SM_ANCHOR.EAST
	_historyTab.newTab('history_tab','',solutionModel.getForm(controller.getName()),null)
	
	//resize tabpanel below to make space
	var _form_view_tab = _browserFormObj.getTabPanel('form_view_01')
	_form_view_tab.height = 35
	_form_view_tab.y = 25
	
}

/**
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"1BD1BD06-3965-44A0-A9C3-9F3F8BE5B9FF"}
 */
function showExtraTabs(event) {
	var _popupmenu = plugins.window.createPopupMenu();
	
	var _item;
	for (var i = 0; i < vExtraTabs.length; i++) {
		var _text = getTabText(vOpenTabs.length +i, vExtraTabs[i])
		_item = _popupmenu.addMenuItem(_text , openProgramHelper);
		_item.methodArguments = [event, vOpenTabs.length + i];
	}

	/** @type {RuntimeComponent} */
	var _source = event.getSource()
	if (_source != null)	{
		_popupmenu.show(_source);
	}
}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1730D3BA-7A81-4AEB-9021-69DA0DCAB81B"}
 */
function onResize(event) {
	vFormWidth = controller.getFormWidth();
	checkSize(event);
}

/**
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"3B78BAF7-BD1D-4955-A34E-E862ACB4FACB"}
 */
function checkSize(event) {
	application.updateUI(); //needed because getFormWidth returns 0 if called directly after recreateUI()
	var _formWidth = controller.getFormWidth();
	vOpenTabs = [].concat(vOpenTabs);

	var _tabsWidth = vOpenTabs.length * vTabWidth;
	
	if (_formWidth == 0) {
		_formWidth = application.getWindow().getWidth() - forms.svy_nav_fr_main.elements.tab_split.dividerLocation;
	}

	var _tabsNr = Math.floor((_formWidth-30) / vTabWidth);

	if (_formWidth < _tabsWidth) {
		var _jsForm = solutionModel.getForm(controller.getName());
		
		for (var i = _tabsNr; i < vOpenTabs.length; i++) {
			_jsForm.removeComponent("leftLabel_" + i);
			_jsForm.removeComponent("btwLabel_" + i);
			_jsForm.removeComponent("rightLabel_" + i);
			_jsForm.removeComponent("label_" + i);
			_jsForm.removeComponent("close_" + i);
			
			vExtraTabs.unshift(vOpenTabs[i]);
		}
		vOpenTabs = vOpenTabs.slice(0,_tabsNr);
		rebuildTabs(event);
	} else if (_formWidth > _tabsWidth) { //form is big enough for the current tabs and maybe more
		var _added = false;
		while ( (_formWidth >= (_tabsWidth + vTabWidth + 30)) && (vExtraTabs.length > 0) ) {
			vOpenTabs.push(vExtraTabs.shift());
			_added = true;
		}
		if (_added) {
			rebuildTabs(event);
		}
	}
	
}

/**
 * @param {Boolean} [_onCloseTab]
 *  
 * @properties={typeid:24,uuid:"36532709-3BC1-4E5C-9361-71A65DD1700E"}
 * 
 * @AllowToRunInFind
 */
function saveTabProperties(_onCloseTab) {
	//seperate the last used foundset so it is not changes
	// MAVariazione Se il salvataggio deriva dalla chiusura di un tab, non salvare (sovrascriverebbe i parametri del program che sarà aperto successivamente)
	if(vPreviousTabName && !_onCloseTab)
	{
		var _fs = forms[globals.nav.form_view_01].foundset.duplicateFoundSet()
		vTabObjects[vPreviousTabName].foundset = null
		vTabObjects[vPreviousTabName].foundset = _fs
		vTabObjects[vPreviousTabName].view = globals.nav.program[globals.nav_program_name].view
		vTabObjects[vPreviousTabName].user_table_view_id = globals.nav.program[globals.nav_program_name].user_table_view_id;
		vTabObjects[vPreviousTabName].active_search = globals.nav.program[globals.nav_program_name].active_search;
		vTabObjects[vPreviousTabName].search_type = globals.nav.program[globals.nav_program_name].search_type;
		vTabObjects[vPreviousTabName].search_id = globals.nav.program[globals.nav_program_name].search_id;
	}
	
	// MAVariazione - allow other code to save its own properties
//	var listeners = vSaveTabPropertiesListeners[vPreviousTabName];
//	for(var l in listeners)
//	{	
//		listeners[l](vPreviousTabName, _onCloseTab);
//	
//	}
}

/**
 * @param {Number} _tab
 * @param {String} [_program]
 * @return {String}
 * @properties={typeid:24,uuid:"A053C9F2-6EBE-4A5B-A5A0-A4E0B785CD63"}
 */
function getTabText(_tab, _program) {
	
	var _tabName = vTabNames[_tab]
	if(_tabName && vTabObjects[_tabName] && vTabObjects[_tabName].text)
	{
		return vTabObjects[_tabName].text
	}
	else
	{
		if(globals.svy_nav_multi_tab_programs)
		{
			/** @type {Array} */
			var arrHeader = globals.nav.program[_program].display_field_header == null 
					         || globals.nav.program[_program].display_field_header == '' ? [] : globals.nav.program[_program].display_field_header.split(",");
			var tabText = globals.nav.program[_program].description;
			for(var h = 0; h < arrHeader.length; h++)
				tabText += ' - ' + forms[globals.nav.form_view_01][arrHeader[h]]; 
			return tabText;
		}
		else
		{
			return globals.nav.program[_program].description
		}
	}
}

/**
 * @param {String} _tabText
 * @properties={typeid:24,uuid:"2A96BAD4-B46A-4683-92C7-77E07B97D857"}
 */
function setTabText(_tabText) {
	
	if(globals.nav.openNewTab) return // tab is not set yet
	
	if(vSelectedTab == null || !vTabNames[vSelectedTab] || !elements['label_'+vSelectedTab]) return
	
	//find out what the selected tab is
	var _tabName = vTabNames[vSelectedTab]
	vTabObjects[_tabName].text = _tabText
	//Original
	//elements['label_'+vSelectedTab]['text'] = _tabText
	//MAVariazione use the dots when the text is too long
	elements['label_'+vSelectedTab]['text'] = _tabText.substring(0, 24) + '...'
	elements['label_'+vSelectedTab]['toolTipText'] = _tabText			
}

/**
 * @properties={typeid:24,uuid:"7B2F0DBD-371E-4ED3-AAAD-64FF53A5A3BF"}
 */
function recreateUI() {
	
	controller.recreateUI()
	
	if(globals.svy_nav_multi_tab_programs)
	{
		//set all the texts
		for (var i = 0; i < vOpenTabs.length; i++) {
			//Original
			//elements['label_'+i]['text'] = vTabObjects[vTabNames[i]].text 
			
			//MAVariazione use the dots when the text is too long
			elements['label_'+i]['text'] = vTabObjects[vTabNames[i]].text.substring(0, 24) + '...'
		}
	}
}

/**
 * MAVariazione
 * 
 * @param {String} tabName
 * @param {Function} callback
 * @param {String} [listenerName]
 *
 * @properties={typeid:24,uuid:"A7C64DA9-7FA4-4468-910C-AE79B4A8DE0D"}
 */
function registerSaveTabPropertiesListener(tabName, callback, listenerName)
{
	var listeners = vSaveTabPropertiesListeners[tabName];
	if(!listeners)
		forms.svy_nav_fr_openTabs.vSaveTabPropertiesListeners[tabName] = listeners = {};
	
	listeners[listenerName || application.getUUID(callback.toString())] = callback;
}

/**
 * MAVariazione
 * 
 * @param tabName
 * @param listenerName
 *
 * @properties={typeid:24,uuid:"696860A0-EE28-4C32-AE78-D3B7172894F0"}
 */
function hasListener(tabName, listenerName)
{
	return vSaveTabPropertiesListeners[tabName] != null && vSaveTabPropertiesListeners[tabName][listenerName] != null;
}


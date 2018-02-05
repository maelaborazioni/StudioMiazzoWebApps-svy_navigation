/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"B8707BC3-D74C-4FAA-995A-7AD56FD5C3BD",variableType:8}
 */
var svy_nav_filter_codditta = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6560C912-3539-4B44-A692-D1A24AA85688"}
 */
var svy_nav_filter_country = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"9FAAF38C-3778-416C-9E42-8AF32A37795B",variableType:8}
 */
var svy_nav_filter_idditta = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0A60C57F-55C1-4A0F-A72E-90462C7F32FA",variableType:4}
 */
var vLoseFocus = null;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F6B37061-F68E-4CF8-A721-526732FA5A84"}
 */
function onLoad(event) {
	if (_to_sec_owner$owner_id.allow_org_filter_change) {
		elements.organization_filter.visible = true;
	// MAVariazione factory filter added
	} else if(elements.organization_filter) {
		elements.organization_filter.visible = false;
	}
	
// MA_Variazione : property svy_nav_getFilers and method globals.svy_nav_getFilters are both undefined...	
//	if (globals.svy_nav_getFilters) {
//		var _filterObj = globals.svy_nav_getFilters();
//		
//		if (_filterObj) {
//			var _jsForm = solutionModel.getForm(controller.getName());
//
//			var _jsField, _jsVar, _jsMethod, _xpos = 404
//			for (var i in _filterObj) {
//				
//				_jsVar = solutionModel.newGlobalVariable("globals","svy_nav_filter_" + i, JSVariable.TEXT);
//				
//				_jsMethod = solutionModel.newGlobalMethod('globals','\
//					function filter_'+i+' (oldValue, newValue, event) {\
//						if (globals["svy_nav_getUserDBName"]) {\
//							databaseManager.removeTableFilterParam(globals["svy_nav_getUserDBName"](), i+"_filter");\
//							databaseManager.addTableFilterParam(globals["svy_nav_getUserDBName"](), null, _filterObj[i].column, "=", forms[controller.getName()]["svy_nav_filter_" + i], i+"_filter");\
//						}\
//					}'
//				);
//				
//				_jsField = _jsForm.newField(_jsVar, JSField.COMBOBOX, _xpos, 11, 100, 20);
//
//				_jsField.valuelist = solutionModel.getValueList(_filterObj[i].vlName);
//				_jsField.onDataChange = _jsMethod;
//				_jsField.formIndex = 11000;
//				_jsField.editable = false;
//				_xpos += 104
//			}
//			controller.recreateUI();
//		}
//	}
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Object} oldValue
 * @param {Object} newValue
 * @param {Object} event
 *
 * @properties={typeid:24,uuid:"E556E565-19FC-4C10-B4AC-04E697D0C775"}
 */
function filter_country (oldValue, newValue, event) {
	if (globals["svy_nav_getUserDBName"]) {
		databaseManager.removeTableFilterParam(globals["svy_nav_getUserDBName"](), "country"+"_filter");
		databaseManager.addTableFilterParam(globals["svy_nav_getUserDBName"](), null, "country", "=", forms[controller.getName()]["svy_nav_filter_" + "country"], "country"+"_filter");
	}
}

/**
 * Attiva il filtro per tenere in memoria la ditta sulla quale
 * effettuare le operazioni.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"455AEC5F-B523-4F00-98B2-10BB00D08903"}
 */
function attivaFiltroSuDitta(event) 
{
	if (svy_nav_filter_codditta != null && svy_nav_filter_idditta != null)
	{		
		globals._filtroSuDitta = svy_nav_filter_idditta;

		elements.btn_filtro_attiva.enabled = false;
		elements.btn_filtro_disattiva.enabled = true;
		elements.lbl_filtro_ditta.text = 'Filtro attivo';
	}		
	//messaggio di feedback : selezionare almeno una ditta...
}

/**
 * Disattiva la memorizzazione della ditta sulla quale effettuare 
 * le operazioni richieste. 
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5A1274B8-CDA6-42A3-9140-C37CF814F7FA"}
 */
function disattivaFiltroDitta(event) {
	
    if (globals._filtroSuDitta != null){
    	
    	svy_nav_filter_codditta = null
    	svy_nav_filter_idditta = null
		globals._filtroSuDitta = svy_nav_filter_idditta
    	
    }
	
    elements.btn_filtro_attiva.enabled = true
	elements.btn_filtro_disattiva.enabled = false
	elements.lbl_filtro_ditta.text = 'Nessun filtro'
		
}

/**
 * Assegna alle variabili i rispettivi valori
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"C1648054-86C3-45BF-8CD6-2605B68DBF44"}
 */
function AggiornaFiltroDitta(_rec)
{
	svy_nav_filter_idditta = _rec['idditta'];
	svy_nav_filter_codditta= _rec['codice'];
	globals._filtroSuDitta = svy_nav_filter_idditta;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9A8AB8F1-9DC0-4EC8-8222-7FEC7995CCD3"}
 */
function showLkpFiltroDitta(event) 
{
	globals.svy_nav_showLookupWindow(event,'','AG_Lkp_Ditta','AggiornaFiltroDitta','',null,null,null,true)
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"667D841F-C9C1-49DB-A7A9-567C188D09F1"}
 */
function onDataChangeFiltroDitta(oldValue, newValue, event) {

	var _fs = databaseManager.getFoundSet(globals.nav.program['AG_Lkp_Ditta'].server_name,
		                                  globals.nav.program['AG_Lkp_Ditta'].table_name)

	_fs.removeFoundSetFilterParam('ftr_filtroSelezioneDitta')
	_fs.addFoundSetFilterParam('codice', '=', newValue, 'ftr_filtroSelezioneDitta')
	_fs.loadAllRecords()

	if (_fs.getSize() == 1) {

		svy_nav_filter_idditta = _fs['idditta']
		svy_nav_filter_codditta = _fs['codice']
        globals._filtroSuDitta = svy_nav_filter_idditta
				
	} else
		globals.svy_nav_showLookupWindow(event,'','AG_Lkp_Ditta','AggiornaFiltroDitta','',null,null,null,true)

	attivaFiltroSuDitta(event);
		
	return true

}

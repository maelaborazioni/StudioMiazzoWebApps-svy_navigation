/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CA96C7BE-EBDA-4359-8FBC-32148075400D"}
 */
function explainConversion1(event) {
	globals.svy_mod_dialogs_global_showInfoDialog(null, i18n.getI18NMessage('svy.fr.dlg.explanation_conversion1'), i18n.getI18NMessage('svy.fr.lbl.ok'));
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8037D659-92EE-44EA-973C-0EB315A78B59"}
 */
function runConversion1(event) {
	var buttonYes = i18n.getI18NMessage('svy.fr.lbl.yes');
	if (globals.svy_mod_dialogs_global_showQuestionDialog(null, i18n.getI18NMessage('svy.fr.dlg.run_conversion'), i18n.getI18NMessage('svy.fr.lbl.yes'), i18n.getI18NMessage('svy.fr.lbl.no')) == buttonYes) {
		if (globals.svy_cnv_userOrgID()) {
			globals.svy_mod_dialogs_global_showInfoDialog(null, i18n.getI18NMessage('svy.fr.dlg.conversion_successful'), i18n.getI18NMessage('svy.fr.lbl.ok'));
		} else {
			globals.svy_mod_dialogs_global_showErrorDialog(null, i18n.getI18NMessage('svy.fr.dlg.conversion_unsuccessful'), i18n.getI18NMessage('svy.fr.lbl.ok'));
		}
	}
}

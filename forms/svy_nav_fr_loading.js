/**
 * @properties={typeid:24,uuid:"7474D293-0E9A-408B-81AE-BF1A061F57F3"}
 */
function setStatusBar(_percent) {
	
	if(application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT)
	{
		elements.progress_bar.value = _percent
		application.updateUI()
	}
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6C1F858F-7E06-4129-A3ED-108B6D175935"}
 */
function onLoad(event) {
	
	if(application.getApplicationType() == 5 /*webclient*/)elements.progress_bar.visible = false

		
	//init bar
	elements.progress_bar.minimum = 0
	elements.progress_bar.maximum = 100
	setStatusBar(0)
}

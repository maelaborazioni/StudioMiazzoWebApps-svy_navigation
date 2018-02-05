/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0766B187-A43B-4D24-863A-4F10126C1910"}
 */
function onResize(event) {
	var _height = application.getWindow().getHeight()
	var _width = application.getWindow().getWidth()
	var _org_height = 600
	var _org_width = 1000
	
	var _hResize = (_org_height - _height) / 2
	var _wResize = (_org_width - _width) / 2
	
	var _elements = elements.allnames
	var _component
	var _jsForm = solutionModel.getForm(controller.getName())
	
	for (var i = 0; i < _elements.length; i++) {
		_component = _jsForm.getComponent(_elements[i])
		elements[_elements[i]].setLocation(_component.x - _wResize, _component.y -_hResize )
	}
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2362F32A-B555-4DAB-84C3-12A78D6595BD"}
 */
function onLoad(event) {
	onResize(event)
}

'use strict';

app.viewType11 = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('viewType11');

// START_CUSTOM_CODE_viewType11
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType11
(function(parent) {
    var
    /// start global model properties
    /// end global model properties
        viewType11Model = kendo.observable({
        /// start add model functions
        /// end add model functions

    });

    /// start form functions
    /// end form functions

    parent.set('onShow', function _onShow() {
        var that = parent;
        that.set('addFormData', {
            date: '',
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        /// end add form show
    });
    parent.set('viewType11Model', viewType11Model);
})(app.viewType11);

// START_CUSTOM_CODE_viewType11Model
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType11Model
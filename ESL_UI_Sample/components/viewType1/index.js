'use strict';

app.viewType1 = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('viewType1');

// START_CUSTOM_CODE_viewType1
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType1
(function(parent) {
    var
    /// start global model properties

        processImage = function(img) {

            if (!img) {
                var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
                img = 'data:image/png;base64,' + empty1x1png;
            }

            return img;
        },
        /// end global model properties

        viewType1Model = kendo.observable({
            /// start add model functions
            /// end add model functions

        });

    /// start form functions
    /// end form functions

    parent.set('onShow', function _onShow() {
        var that = parent;
        that.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        /// end add form show
    });
    parent.set('viewType1Model', viewType1Model);
})(app.viewType1);

// START_CUSTOM_CODE_viewType1Model
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType1Model
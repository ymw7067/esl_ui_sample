'use strict';

app.viewType6 = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('viewType6');

// START_CUSTOM_CODE_viewType6
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType6

(function(parent) {

    parent.set('onInit', function _onInit(e) {
        $(".clickanswer", "#viewType6Screen").click(function() {
            $(this).addClass("found");
        });
    });
    
})(app.viewType6);

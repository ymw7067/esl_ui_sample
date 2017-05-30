'use strict';

app.viewType5 = kendo.observable({
    view: null,
    screen: null,
    model: null,
    vtop: 0,

    // event
    onShow: function(sender) {},
    afterShow: function(sender) {},
    beforeHide: function(sender) {},

    // method
    selectedClick: function(sender) {},
    bindScroll: function(sender) {},
    unbindScroll: function(sender) {},
    sticky: function(fixed) {}
});
app.localization.registerView('viewType5');

(function(model) {
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

    data = kendo.observable({
        /// start add model functions
        /// end add model functions
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    /// start form functions
    model.set("onInit", function(sender) {
        // 초기화 루틴
        model.view = sender.view;
        model.screen = $("#viewType5Screen");

        model.selectedClick(sender);
    });

    model.set("onShow", function(sender) {
        model.set("addFormData", {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        
        model.bindScroll(sender);

        // 재방문 할때를 위해 초기화 한다.
        model.vtop = 0;
        model.view.scroller.scrollTo(0,0);
        $(".en-bottom-blank", model.screen).text("");
        $(".en-bottom-blank, .en-cols-word", model.screen).removeClass("selected");
    });

    model.set("beforeHide", function(sender) {
        model.unbindScroll(sender);
    });

    model.set("data", data);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("selectedClick", function(sender) {
        $(".en-bottom-blank", model.screen).click(function(e) {
            if ($(this).text() != "") {
                return;
            }
            if ($("#sticky-panel").is(":visible")) {
                $(".en-bottom-blank, .en-cols-word", "#sticky-panel").removeClass("selected");
                $(this, "#sticky-panel").addClass("selected");
                $(this, "#sticky-panel").next().addClass("selected");
            } else {
                $(".en-bottom-blank, .en-cols-word", model.screen).removeClass("selected");
                $(this).addClass("selected");
                $(this).next().addClass("selected");
            }
        });

        $(".en-cols-word", model.screen).click(function(e) {
            if ($(this).prev().text() != "") {
                return;
            }
            if ($("#sticky-panel").is(":visible")) {
                $(".en-bottom-blank, .en-cols-word", "#sticky-panel").removeClass("selected");
                $(this, "#sticky-panel").prev().addClass("selected");
                $(this, "#sticky-panel").addClass("selected");
            } else {
                $(".en-bottom-blank, .en-cols-word", model.screen).removeClass("selected");
                $(this).prev().addClass("selected");
                $(this).addClass("selected");
            }
        });

        $("mark", model.screen).click(function(e) {
            var where = $("#sticky-panel").is(":visible") ? "#sticky-panel" : model.screen;

            if (!$(".en-bottom-blank, .en-cols-word", where).hasClass("selected")) {
                return false;
            }
            if ($(this).text() != $(".en-bottom-blank.selected", where).attr("en-word")) {
                alert("Wrong answer !!");
                return;
            }
            $(".en-bottom-blank.selected", where).text($(this).text());
            $(".en-bottom-blank, .en-cols-word", where).removeClass("selected");

            // div는 자동으로 resize 이벤트가 발생하지 않으므로 강제로 발생시킨다.
            $("#sticky-panel").trigger("resize");
            
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("bindScroll", function(sender) {
        $("#sticky-panel").css("top", $(".km-header", model.screen).css("height"));
        
        model.view.scroller.bind("scroll", function(e) {
            var top = $(".en-sticky-dummy", model.screen).position().top 
                            - parseInt($(".en-sticky-dummy", model.screen).parent().css("margin-top"),10)
                            - parseInt($(".en-sticky-dummy", model.screen).parent().css("padding-top"),10);
            var fixed = $(".en-sticky-dummy", model.screen).attr("en-fixed");

            if( top ) model.vtop = top;

            if( model.vtop <= 0  ) {
                if( fixed == "no" ) {
                    model.sticky(true);
                }
            } else {
                if( fixed == "yes" ) {
                    model.sticky(false);
                }
            }
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("unbindScroll", function(sender) {
        model.view.scroller.unbind("scroll");
        
        if( $(".en-sticky-dummy", model.screen).attr("en-fixed") == "yes" ) {
            model.sticky(false);
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("sticky", function(yes){
        if( yes ) {
            // sticky_panel 로 옮긴다.
            $("#sticky-panel .form-content-item").append($(".en-sticky-content", model.screen));
            $(".en-sticky-dummy", model.screen).attr("en-fixed", "yes");
            $("#sticky-panel").show();
            $(".en-sticky-source", model.screen).css("height", $("#sticky-panel").css("height"));

            // sticky-panel 크기를 원본과 맞추고 resize 이벤트를 바인드한다.
            $(".en-sticky-source", model.screen).css("height", $("#sticky-panel").css("height"));
            $("#sticky-panel").bind("resize", function() {
                $(".en-sticky-source", model.screen).css("height", $("#sticky-panel").css("height"));
            });
        } else {
            $("#sticky-panel").unbind("resize");

            $(".en-sticky-dummy", model.screen).after($(".en-sticky-content", "#sticky-panel"));
            $(".en-sticky-dummy", model.screen).attr("en-fixed", "no");
            $("#sticky-panel").hide();
            $(".en-sticky-source", model.screen).css("height", "");
        }
    });
})(app.viewType5);

// START_CUSTOM_CODE_viewType5
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType5

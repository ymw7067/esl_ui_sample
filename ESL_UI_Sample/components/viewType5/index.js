'use strict';

app.viewType5 = kendo.observable({
    screen: null,
    model: null,
    vtop: 0,

    // event
    onShow: function(e) {},
    afterShow: function(e) {},
    beforeHide: function(e) {},

    // method
    selectedClick: function(e) {},
    bindScroll: function(e) {},
    unbindScroll: function(e) {},
    sticky: function(fixed) {}
});
app.localization.registerView('viewType5');

(function(view) {
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

    model = kendo.observable({
        /// start add model functions
        /// end add model functions
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    /// start form functions
    view.set('onInit', function(e) {
        // 초기화 루틴
        view.screen = $("#viewType5Screen");

        view.selectedClick(e);
    });

    view.set('onShow', function(e) {
        view.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        
        view.bindScroll(e);

        // 재방문 할때를 위해 초기화 한다.
        view.vtop = 0;
        e.view.scroller.scrollTo(0,0);
        $(".en-bottom-blank", view.screen).text("");
        $(".en-bottom-blank, .en-cols-word", view.screen).removeClass("selected");
    });

    view.set('beforeHide', function(e) {
        view.unbindScroll(e);
    });
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('selectedClick', function(e) {
        $(".en-bottom-blank", view.screen).click(function(e) {
            if ($(this).text() != "") {
                return;
            }
            if ($("#sticky-panel").is(':visible')) {
                $(".en-bottom-blank, .en-cols-word", "#sticky-panel").removeClass("selected");
                $(this, "#sticky-panel").addClass("selected");
                $(this, "#sticky-panel").next().addClass("selected");
            } else {
                $(".en-bottom-blank, .en-cols-word", view.screen).removeClass("selected");
                $(this).addClass("selected");
                $(this).next().addClass("selected");
            }
        });

        $(".en-cols-word", view.screen).click(function(e) {
            if ($(this).prev().text() != "") {
                return;
            }
            if ($("#sticky-panel").is(':visible')) {
                $(".en-bottom-blank, .en-cols-word", "#sticky-panel").removeClass("selected");
                $(this, "#sticky-panel").prev().addClass("selected");
                $(this, "#sticky-panel").addClass("selected");
            } else {
                $(".en-bottom-blank, .en-cols-word", view.screen).removeClass("selected");
                $(this).prev().addClass("selected");
                $(this).addClass("selected");
            }
        });

        $("mark", view.screen).click(function(e) {
            var where = $("#sticky-panel").is(':visible') ? "#sticky-panel" : view.screen;

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
    view.set('bindScroll', function(e) {
        $('#sticky-panel').css("top", $('.km-header', view.screen).css('height'));
        
        var scroller = e.view.scroller;
        scroller.bind("scroll", function(e) {
            var top = $(".en-sticky-dummy", view.screen).position().top 
                            - parseInt($(".en-sticky-dummy", view.screen).parent().css("margin-top"),10)
                            - parseInt($(".en-sticky-dummy", view.screen).parent().css("padding-top"),10);
            var fixed = $(".en-sticky-dummy", view.screen).attr("en-fixed");

            if( top ) view.vtop = top;

            if( view.vtop <= 0  ) {
                if( fixed == "no" ) {
                    view.sticky(true);
                }
            } else {
                if( fixed == "yes" ) {
                    view.sticky(false);
                }
            }
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('unbindScroll', function(e) {
        e.view.scroller.unbind("scroll");
        
        if( $(".en-sticky-dummy", view.screen).attr("en-fixed") == "yes" ) {
            view.sticky(false);
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('sticky', function(yes){
        if( yes ) {
            // sticky_panel 로 옮긴다.
            $("#sticky-panel .form-content-item").append($(".en-sticky-content", view.screen));
            $(".en-sticky-dummy", view.screen).attr("en-fixed", "yes");
            $("#sticky-panel").show();
            $(".en-sticky-source", view.screen).css("height", $("#sticky-panel").css("height"));

            // sticky-panel 크기를 원본과 맞추고 resize 이벤트를 바인드한다.
            $(".en-sticky-source", view.screen).css("height", $("#sticky-panel").css("height"));
            $("#sticky-panel").bind("resize", function() {
                $(".en-sticky-source", view.screen).css("height", $("#sticky-panel").css("height"));
            });
        } else {
            $("#sticky-panel").unbind("resize");

            $(".en-sticky-dummy", view.screen).after($(".en-sticky-content", '#sticky-panel'));
            $(".en-sticky-dummy", view.screen).attr("en-fixed", "no");
            $("#sticky-panel").hide();
            $(".en-sticky-source", view.screen).css("height", "");
        }
    });
})(app.viewType5);

// START_CUSTOM_CODE_viewType5
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType5

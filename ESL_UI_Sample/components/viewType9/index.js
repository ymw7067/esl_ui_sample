'use strict';

app.viewType9 = kendo.observable({
    view: null,    
    screen: null,
    data: null,
    vtop: 0,

    // event
    onShow: function(sender) {},
    afterShow: function(sender) {},
    beforeHide: function(sender) {},

    // method
    initTemplate: function(sender) {},
    initDragdrop: function(sender) {},
    bindScroll: function(sender) {},
    unbindScroll: function(sender) {},
    sticky: function(fixed) {}
});
app.localization.registerView('viewType9');

// START_CUSTOM_CODE_viewType9
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_viewType9
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
        sentences: [
            { hierarchy: "1", sentence: "I crashed my car at 80 kph" },
            { hierarchy: "2", sentence: "I fell off my bike" },
            { hierarchy: "3", sentence: "I slipped in the shower" },
            { hierarchy: "3", sentence: "I crashed my car at 20 kph" },
            { hierarchy: "4", sentence: "I tripped over the cat" },
            { hierarchy: "5", sentence: "I bumped into my colleague" }
        ]
        /// end add model functions
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    /// start form functions
    model.set('onInit', function(sender) {
        // 초기화 루틴
        model.view = sender.view;
        model.screen = $("#viewType9Screen");

        model.initTemplate(sender);
        model.initDragdrop(sender);
    });

    model.set('onShow', function(sender) {
        model.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        model.bindScroll(sender);

        // 재방문 할때를 위해 초기화 한다.
        model.vtop = 0;
        model.view.scroller.scrollTo(0,0);
        $(".en-draggable", model.screen).show();
        $(".en-droptarget", model.screen).text("");
        $(".en-draggable", model.screen).parent().parent().show().next().show();
    });

    model.set('beforeHide', function(sender) {
        model.unbindScroll(sender);
    });

    model.set('data', data);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('bindScroll', function(sender) {
        $('#sticky-panel').css("top", $('.km-header', model.screen).css('height'));
        
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
    model.set('unbindScroll', function(sender) {
        model.view.scroller.unbind("scroll");
        model.view.scroller.scrollTo(0,0);
        $(".km-scroll-container").removeClass("en-scroll-tn");
        
        if( $(".en-sticky-dummy", model.screen).attr("en-fixed") == "yes" ) {
            model.sticky(false);
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('sticky', function(yes){
        if( yes ) {
            // sticky_panel 로 옮긴다.
            $("#sticky-panel .form-content-item").append($(".en-sticky-content", model.screen));
            $(".en-sticky-dummy", model.screen).attr("en-fixed", "yes");
            $("#sticky-panel").show();

            // sticky-panel 크기를 원본과 맞추고 resize 이벤트를 바인드한다.
            $(".en-sticky-source", model.screen).css("height", $("#sticky-panel").css("height"));
            $("#sticky-panel").bind("resize", function() {
                if( $(".en-sticky-dummy", model.screen).attr("en-fixed") == "yes" )
                    $(".en-sticky-source", model.screen).css("height", $("#sticky-panel").css("height"));
            });
        } else {
            $(".en-sticky-dummy", model.screen).after($(".en-sticky-content", '#sticky-panel'));
            $(".en-sticky-dummy", model.screen).attr("en-fixed", "no");
            $("#sticky-panel").hide();
            $(".en-sticky-source", model.screen).css("height", "");
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('initTemplate', function (sender) {
        var template = kendo.template($(".en-sentences-template", model.screen).html());
        var randomArr = new kendo.data.ObservableArray( shuffle( model.data.sentences.slice(), { 'copy': true }) );
        var result = kendo.render(template, randomArr);

        $(".en-sticky-content", model.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('initDragdrop', function (sender) {
        $(".en-draggable", model.screen).kendoDraggable({
            hint: function(el) {
                return el.clone().addClass("en-dragdrop-clone");
            },
            dragstart: function(e) {
                e.currentTarget.addClass("en-text-drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("en-text-drag");
                $(".en-droptarget", model.screen).removeClass("en-droptarget-over");
            }
        });

        $(".en-droptarget", model.screen).kendoDropTarget({
            dragenter: function(e) {
                 e.dropTarget.addClass("en-droptarget-over");
            },
            dragleave: function(e) {
                e.dropTarget.removeClass("en-droptarget-over");
            },
            drop: function(e) { 
                console.dir(e);
                var sentence = e.draggable.element;
                var answer = e.dropTarget;

                if( sentence.attr("en-compare") != answer.attr("en-compare") ) {
                    e.preventDefault();
                    return;
                }

                sentence.hide();
                answer.text(sentence.text());
                sentence.removeClass("en-text-drag");

                // div는 자동으로 resize 이벤트가 발생하지 않으므로 강제로 발생시킨다.
                if( $(".en-sticky-dummy", model.screen).attr("en-fixed") == "yes") {
                    $("#sticky-panel").trigger("resize");
                }

                if (sentence.parent().find(".en-draggable:visible").length <= 0) {
                    model.view.scroller.scrollTo(0,0);
                    sentence.parent().parent().hide().next().hide();
                    
                }

            }
        });
    });

})(app.viewType9);

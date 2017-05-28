'use strict';

app.viewType9 = kendo.observable({
    screen: null,
    model: null,
    vtop: 0,

    // event
    onShow: function(e) {},
    afterShow: function(e) {},
    beforeHide: function(e) {},

    // method
    initTemplate: function(e) {},
    initDragdrop: function(e) {},
    bindScroll: function(e) {},
    unbindScroll: function(e) {},
    sticky: function(fixed) {}
});
app.localization.registerView('viewType9');

// START_CUSTOM_CODE_viewType9
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_viewType9
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
    view.set('onInit', function(e) {
        // 초기화 루틴
        view.screen = $("#viewType9Screen");

        view.initTemplate(e);
        view.initDragdrop(e);
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
        $(".en-draggable", view.screen).show();
        $(".en-droptarget", view.screen).text("");
        $(".en-draggable", view.screen).parent().parent().show().next().show();
    });

    view.set('beforeHide', function(e) {
        view.unbindScroll(e);
    });

    view.set('model', model);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('bindScroll', function(e) {
        $('#sticky-panel').css("top", $('.km-header', view.screen).css('height'));
        
        var scroller = e.view.scroller;
        scroller.bind("scroll", function(e) {
            var top = $(".en-sticky-dummy", view.screen).offset().top;
            var fixed = $(".en-sticky-dummy", view.screen).attr("en-fixed");

            if( top ) view.vtop = top;

            if( view.vtop <= e.scrollTop  ) {
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
        } else {
            $(".en-sticky-dummy", view.screen).after($(".en-sticky-content", '#sticky-panel'));
            $(".en-sticky-dummy", view.screen).attr("en-fixed", "no");
            $("#sticky-panel").hide();
            $(".en-sticky-source", view.screen).css("height", "");
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initTemplate', function (e) {
        var template = kendo.template($(".en-sentences-template", view.screen).html());
        var randomArr = new kendo.data.ObservableArray( shuffle( view.model.sentences.slice(), { 'copy': true }) );
        var result = kendo.render(template, randomArr);

        $(".en-sticky-content", view.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initDragdrop', function (e) {
        $(".en-draggable", view.screen).kendoDraggable({
            hint: function(el) {
                return el.clone().addClass("en-dragdrop-clone");
            },
            dragstart: function(e) {
                e.currentTarget.addClass("en-text-drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("en-text-drag");
                $(".en-droptarget", view.screen).removeClass("en-droptarget-over");
            }
        });

        $(".en-droptarget", view.screen).kendoDropTarget({
            dragenter: function(e) {
                 e.dropTarget.addClass("en-droptarget-over");
            },
            dragleave: function(e) {
                e.dropTarget.removeClass("en-droptarget-over");
            },
            drop: function(e) { 
                var sentence = e.draggable.element;
                var answer = e.dropTarget;

                if( sentence.attr("en-compare") != answer.attr("en-compare") ) {
                    e.preventDefault();
                    return;
                }

                sentence.hide();
                answer.text(sentence.text());
                sentence.removeClass("en-text-drag");

                if (sentence.parent().find(".en-draggable:visible").length <= 0) sentence.parent().parent().hide().next().hide();
            }
        });
    });

})(app.viewType9);

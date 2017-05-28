'use strict';

app.viewType13 = kendo.observable({
    view: null,    
    screen: null,
    data: null,
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
app.localization.registerView('viewType13');

// START_CUSTOM_CODE_viewType13
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_viewType13
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
        phonetics: [
            { phonetic: "d͡ʒ" },
            { phonetic: "d͡ʒ" },
            { phonetic: "t͡ʃ" },
            { phonetic: "ɑɪ" },
            { phonetic: "ɛɪ" },
            { phonetic: "ə" },
            { phonetic: "ə" },
            { phonetic: "ə" },
            { phonetic: "ə" }
        ]
        /// end add model functions
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    /// start form functions
    model.set('onInit', function(e) {
        // 초기화 루틴
        model.view = e.view;
        model.screen = $("#viewType13Screen")

        model.initTemplate(e);
        model.initDragdrop(e);
    });

    model.set('onShow', function(e) {
        model.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        
        model.bindScroll(e);

        // 재방문 할때를 위해 초기화 한다.
        model.vtop = 0;
        model.view.scroller.scrollTo(0,0);
        $(".en-draggable", model.screen).show();
        $(".en-dragdrop-answer", model.screen).text("");
    });

    model.set('beforeHide', function(e) {
        model.unbindScroll(e);
    });

    model.set('data', data);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('bindScroll', function(e) {
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
    model.set('unbindScroll', function(e) {
        model.view.scroller.unbind("scroll");
        
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
            $(".en-sticky-source", model.screen).css("height", $("#sticky-panel").css("height"));
        } else {
            $(".en-sticky-dummy", model.screen).after($(".en-sticky-content", '#sticky-panel'));
            $(".en-sticky-dummy", model.screen).attr("en-fixed", "no");
            $("#sticky-panel").hide();
            $(".en-sticky-source", model.screen).css("height", "");
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('initTemplate', function (e) {
        var template, result;

        template = kendo.template($(".en-buttons-template", model.screen).html());
        var randomArr = new kendo.data.ObservableArray( shuffle( model.data.phonetics.slice(), { 'copy': true }) );

        result = kendo.render(template, randomArr);
        $("#phonetics-buttons", model.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('initDragdrop', function (e) {
        $(".en-draggable", model.screen).kendoDraggable({
            hint: function(el) {
                return el.clone();
            },
            dragstart: function(e) {
                e.currentTarget.addClass("en-drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("en-drag");
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
                var word = e.draggable.element;
                var answer = e.dropTarget;

                if( word.text() != answer.attr("en-word") ) {
                    e.preventDefault();
                    return;
                }

                word.hide();
                answer.text(word.text());
                word.removeClass("en-drag");
            }
        });
    });

})(app.viewType13);

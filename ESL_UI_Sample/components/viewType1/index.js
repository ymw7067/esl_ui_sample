'use strict';

app.viewType1 = kendo.observable({
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
    initImages: function(sendere) {},
    initDragdrop: function(sendere) {},
    bindScroll: function(sender) {},
    unbindScroll: function(sender) {},
    sticky: function(fixed) {},
    randomWords: function(sender) {}
});
app.localization.registerView('viewType1');
//------------------------------------------------------------------------------------------------------------------------------------------------------------

// START_CUSTOM_CODE_viewType1
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_viewType1
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
        questions : [
            { image_src: "resources/Picture1.png", word: "cool" },
            { image_src: "resources/Picture2.png", word: "kind" },
            { image_src: "resources/Picture3.png", word: "immature" },
            { image_src: "resources/Picture4.png", word: "spoiled" },
            { image_src: "resources/Picture5.png", word: "generous" },
            { image_src: "resources/Picture6.png", word: "messy" },
            { image_src: "resources/Picture7.png", word: "brave" },
            { image_src: "resources/Picture8.png", word: "idiot" },
            { image_src: "resources/Picture9.png", word: "genius" }
        ]
        /// end add model functions
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    /// start form functions
    model.set('onInit', function(sender) {
        // 초기화 루틴
        model.view = sender.view;
        model.screen = $("#viewType1Screen")

        model.initTemplate(sender);
        model.initImages(sender);
    });

    model.set('onShow', function(sender) {
        model.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        
        model.randomWords(sender);
        model.initDragdrop(sender);
        model.bindScroll(sender);

        // 재방문 할때를 위해 초기화 한다.
        model.vtop = 0;
        model.view.scroller.scrollTo(0,0);
        $(".en-sticky-source", model.screen).show().next().show();
        $(".en-draggable", model.screen).show();
        $(".en-dragdrop-answer", model.screen).text("");
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
        var template, result;

        template = kendo.template($(".en-image-list-template").html());
        result = kendo.render(template, model.data.questions);
        $(".en-image-list-content", model.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('randomWords', function (sender) {
        var template, result;

        template = kendo.template($(".en-buttons-template").html());
        var randomArr = new kendo.data.ObservableArray( shuffle( model.data.questions.slice(), { 'copy': true }) );

        result = kendo.render(template, randomArr);
        $(".en-sticky-content", model.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('initImages', function (sender) {
        $(".en-image-panel img", model.screen).each(function(i, el) {
            $(el).load(function() {
                if ($(el).height() > 120) {
                    $(el).removeClass("en-fixed-width");
                    $(el).addClass("en-fixed-height");
                }
                if ($(el).width() > 150) {
                    $(el).removeClass("en-fixed-height");
                    $(el).addClass("en-fixed-width");
                }
            });
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('initDragdrop', function (sender) {
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
                var answer = e.dropTarget.find(".en-dragdrop-answer");

                if( word.text() != answer.attr("en-word") ) {
                    e.preventDefault();
                    return;
                }

                word.hide();
                answer.text(word.text());
                word.removeClass("en-drag");

                // div는 자동으로 resize 이벤트가 발생하지 않으므로 강제로 발생시킨다.
                if( $(".en-sticky-dummy", model.screen).attr("en-fixed") == "yes") {
                    $("#sticky-panel").trigger("resize");
                }

                if (word.parent().find(".en-draggable:visible").length <= 0) {
                    model.unbindScroll(model.view);
                    $(".en-sticky-source", model.screen).hide().next().hide();
                }
            }
        });
    });

})(app.viewType1);

// START_CUSTOM_CODE_viewType1Model
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType1Model
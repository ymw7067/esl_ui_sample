'use strict';

app.viewType1 = kendo.observable({
    screen: null,
    model: null,
    vtop: 0,

    // event
    onShow: function(e) {},
    afterShow: function(e) {},
    beforeHide: function(e) {},

    // method
    initScroll: function(e) {},
    initTemplate: function(e) {},
    initImages: function(e) {},
    initDragdrop: function(e) {}
});
app.localization.registerView('viewType1');
//------------------------------------------------------------------------------------------------------------------------------------------------------------

// START_CUSTOM_CODE_viewType1
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_viewType1
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
    view.set('onInit', function(e) {
        // 초기화 루틴
        view.screen = $("#viewType1Screen")

        view.initScroll(e);
        view.initTemplate(e);
        view.initImages(e);
        view.initDragdrop(e);
    });

    view.set('onShow', function(e) {
        view.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        
        // 재방문 할때를 위해 초기화 한다.
        view.vtop = 0;
        e.view.scroller.scrollTo(0,0);
        $(".en-draggable", view.screen).show();
        $(".en-answer", view.screen).text("");
    });

    view.set('beforeHide', function(e) {
        e.view.scroller.scrollTo(0,0);
    });

    view.set('model', model);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initScroll', function(e) {
        $('<div class="en-sticky-dummy" en-fixed="no"></div>').insertBefore($(".en-sticky-content", view.screen));

        var scroller = e.view.scroller;
        scroller.bind("scroll", function(e) {
            var top = $(".en-sticky-dummy", view.screen).offset().top;
            var fixed = $(".en-sticky-dummy", view.screen).attr("en-fixed");

            if( top ) view.vtop = top;

            if( view.vtop <= e.scrollTop  ) {
                if( fixed == "no" ) {
                    // sticky_panel 로 옮긴다.
                    $(".en-sticky-target", view.screen).append($(".en-sticky-content", view.screen));
                    $(".en-sticky-dummy", view.screen).attr("en-fixed", "yes");
                    $(".en-sticky-panel", view.screen).show();
                    $(".en-sticky-source", view.screen).hide();
                }
            } else {
                if( fixed == "yes" ) {
                    $(".en-sticky-dummy", view.screen).after($(".en-sticky-content", view.screen));
                    $(".en-sticky-dummy", view.screen).attr("en-fixed", "no");
                    $(".en-sticky-panel", view.screen).hide();
                    $(".en-sticky-source", view.screen).show();
                }
            }
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initTemplate', function (e) {
        var template, result;

        template = kendo.template($(".en-buttons-template").html());
        var randomArr = new kendo.data.ObservableArray( shuffle( view.model.questions.slice(), { 'copy': true }) );

        result = kendo.render(template, randomArr);
        $(".en-sticky-content", view.screen).html(result);

        template = kendo.template($(".en-list-template").html());
        result = kendo.render(template, view.model.questions);
        $(".en-list-view", view.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initImages', function (e) {
        $(".en-image-panel img", view.screen).each(function(i, el) {
            $(el).load(function() {
                if ($(el).height() > 120) {
                    $(el).removeClass("en-fix-width");
                    $(el).addClass("en-fix-height");
                }
                if ($(el).width() > 150) {
                    $(el).removeClass("en-fix-height");
                    $(el).addClass("en-fix-width");
                }
            });
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initDragdrop', function (e) {
        $(".en-draggable", view.screen).kendoDraggable({
            hint: function(el) {
                return el.clone();
            },
            dragstart: function(e) {
                e.currentTarget.addClass("en-drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("en-drag");
                $(".en-droptarget", view.screen).removeClass("en-draggable-target");
            }
        });

        $(".en-droptarget", view.screen).kendoDropTarget({
            dragenter: function(e) {
                 e.dropTarget.addClass("en-draggable-target");
            },
            dragleave: function(e) {
                e.dropTarget.removeClass("en-draggable-target");
            },
            drop: function(e) {
                var word = e.draggable.element;
                var answer = e.dropTarget.find(".en-answer");

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

})(app.viewType1);

// START_CUSTOM_CODE_viewType1Model
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType1Model
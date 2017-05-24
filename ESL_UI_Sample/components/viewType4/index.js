'use strict';

app.viewType4 = kendo.observable({
    screen: null,
    model: null,

    // event
    onShow: function(e) {},
    afterShow: function(e) {},
    beforeHide: function(e) {},

    // method
    initTemplate: function(e) {},
    initGoodBadDragdrop: function(e) {},
    initAdjectivesNounsDragdrop: function(e) {}
});
app.localization.registerView('viewType4');

// START_CUSTOM_CODE_viewType4
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType4
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
        good_bad_questions : [
            { word: "kind", answer: "good" },
            { word: "brave", answer: "good" },
            { word: "spoiled", answer: "bad" },
            { word: "generous", answer: "good" },
            { word: "idiot", answer: "bad" },
            { word: "cool", answer: "good" },
            { word: "messy", answer: "bad" },
            { word: "genius", answer: "good" },
            { word: "immature", answer: "bad" }
        ],
        adjectives_nouns_questions : [
            { word: "kind", answer: "nouns" },
            { word: "brave", answer: "adjectives" },
            { word: "spoiled", answer: "adjectives" },
            { word: "generous", answer: "adjectives" },
            { word: "idiot", answer: "nouns" },
            { word: "cool", answer: "adjectives" },
            { word: "messy", answer: "adjectives" },
            { word: "genius", answer: "nouns" },
            { word: "immature", answer: "adjectives" }
        ]
        /// end add model functions
    });

    /// start form functions
    view.set('onInit', function(e) {
        // 초기화 루틴
        view.screen = $("#viewType4Screen")

        view.initTemplate(e);
        view.initGoodBadDragdrop(e);
        view.initAdjectivesNounsDragdrop(e);
    });

    view.set('onShow', function(e) {
        view.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        
        // 재방문 할때를 위해 초기화 한다.
        e.view.scroller.scrollTo(0,0);
        $(".en-draggable", view.screen).show();
        $(".en-droptarget", view.screen).text("");
    });

    view.set('beforeHide', function(e) {
        e.view.scroller.scrollTo(0,0);
    });

    view.set('model', model);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initTemplate', function (e) {
        var template, randomArr, result;

        template = kendo.template($(".en-good-bad-buttons-template").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.good_bad_questions.slice(), { 'copy': true }) );

        result = kendo.render(template, randomArr);
        $(".en-good-bad-buttons-content", view.screen).html(result);

        template = kendo.template($(".en-adjectives-nouns-buttons-template").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.adjectives_nouns_questions.slice(), { 'copy': true }) );

        result = kendo.render(template, randomArr);
        $(".en-adjectives-nouns-buttons-content", view.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initGoodBadDragdrop', function (e) {
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
                var answer = e.dropTarget;

                if( word.attr("en-word") != answer.attr("en-word") ) {
                    e.preventDefault();
                    return;
                }

                word.hide();
                answer.append("<div>" + word.text() + "</div>");
                word.removeClass("en-drag");
            }
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initAdjectivesNounsDragdrop', function (e) {
        $(".en-adjectives-nouns-draggable", view.screen).kendoDraggable({
            hint: function(el) {
                return el.clone();
            },
            dragstart: function(e) {
                e.currentTarget.addClass("en-drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("en-drag");
                $(".en-adjectives-nouns-droptarget", view.screen).removeClass("en-adjectives-nouns-draggable-target");
            }
        });

        $(".en-adjectives-nouns-droptarget", view.screen).kendoDropTarget({
            dragenter: function(e) {
                 e.dropTarget.addClass("en-adjectives-nouns-draggable-target");
            },
            dragleave: function(e) {
                e.dropTarget.removeClass("en-adjectives-nouns-draggable-target");
            },
            drop: function(e) {
                var word = e.draggable.element;
                var answer = e.dropTarget;

                if( word.attr("en-word") != answer.attr("en-word") ) {
                    e.preventDefault();
                    return;
                }

                word.hide();
                answer.append("<div>" + word.text() + "</div>");
                word.removeClass("en-drag");
            }
        });
    });
})(app.viewType4);

'use strict';

app.viewType4 = kendo.observable({
    view: null,
    screen: null,
    model: null,

    // event
    onShow: function(sender) {},
    afterShow: function(sender) {},
    beforeHide: function(sender) {},

    // method
    initTemplate: function(sender) {},
    initDragdrop: function(sender) {}
});
app.localization.registerView('viewType4');

// START_CUSTOM_CODE_viewType4
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType4
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
    model.set("onInit", function(sender) {
        // 초기화 루틴
        model.view = sender.view;
        model.screen = $("#viewType4Screen");

        model.initTemplate(sender);
        model.initDragdrop(sender);
    });

    model.set("onShow", function(sender) {
        model.set("addFormData", {
            /// start add form data init
            /// end add form data init
        });
        
        // 재방문 할때를 위해 초기화 한다.
        model.view.scroller.scrollTo(0,0);
        $(".en-draggable", model.screen).show();
        $(".en-droptarget", model.screen).text("");
    });

    model.set("beforeHide", function(sender) {
        model.view.scroller.scrollTo(0,0);
    });

    model.set("data", data);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("initTemplate", function (sender) {
        var template, randomArr, result;

        template = kendo.template($(".en-good-bad-buttons-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.good_bad_questions.slice(), { "copy": true }) );

        result = kendo.render(template, randomArr);
        $(".en-good-bad-buttons-content", model.screen).html(result);

        template = kendo.template($(".en-adjectives-nouns-buttons-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.adjectives_nouns_questions.slice(), { "copy": true }) );

        result = kendo.render(template, randomArr);
        $(".en-adjectives-nouns-buttons-content", model.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("initDragdrop", function (sender) {
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

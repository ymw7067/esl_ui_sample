'use strict';

app.viewType7 = kendo.observable({
    view: null,
    screen: null,
    model: null,

    // event
    onShow: function(sender) {},
    afterShow: function(sender) {},
    beforeHide: function(sender) {},

    // method
    initTemplate: function(sender) {},
    selectedClick: function(sender) {}
});
app.localization.registerView('viewType7');

// START_CUSTOM_CODE_viewType7
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType7
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
        positive_form_questions: [
            { word: "modal verb (+)", compare: "positive_form" },
            { word: "V1 (infinitive)", compare: "positive_form" },
            { word: "subject", compare: "positive_form" }
        ],
        negative_form_questions: [
            { word: "modal verb (-)", compare: "negative_form" },
            { word: "V1 (infinitive)", compare: "negative_form" },
            { word: "subject", compare: "negative_form" },
            { word: "cannot", compare: "negative_form" }
        ],
        question_form_questions: [
            { word: "modal verb (+)", compare: "question_form" },
            { word: "V1 (infinitive)", compare: "question_form" },
            { word: "subject", compare: "question_form" }
        ],
        short_answers_questions: [
            { word: "can", compare: "short_answers" },
            { word: "can", compare: "short_answers" },
            { word: "can't", compare: "short_answers" }
        ]
        /// end add model functions
    });

    /// start form functions
    model.set("onInit", function(sender) {
        // 초기화 루틴
        model.view = sender.view;
        model.screen = $("#viewType7Screen");

        model.initTemplate(sender);
        model.selectedClick(sender);
    });

    model.set("onShow", function(sender) {
        model.set("addFormData", {
            /// start add form data init
            /// end add form data init
        });
        
        // 재방문 할때를 위해 초기화 한다.
        model.view.scroller.scrollTo(0,0);
        $(".en-button", model.screen).show().parent().parent("tr:last-child").show();
        $(".en-bottom-blank", model.screen).text("");
        $(".en-bottom-blank", model.screen).removeClass("selected");
    });

    model.set("beforeHide", function(sender) {
        model.view.scroller.scrollTo(0,0);
    });

    model.set("data", data);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("initTemplate", function (sender) {
        var template, randomArr, result;

        template = kendo.template($(".en-positive-form-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.positive_form_questions.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-positive-form-buttons td", model.screen).html(result);

        template = kendo.template($(".en-negative-form-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.negative_form_questions.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-negative-form-buttons td", model.screen).html(result);

        template = kendo.template($(".en-question-form-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.question_form_questions.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-question-form-buttons td", model.screen).html(result);

        template = kendo.template($(".en-short-answers-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.short_answers_questions.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-short-answers-buttons td", model.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("selectedClick", function(sender) {
        $(".en-bottom-blank", model.screen).click(function(e) {
            if ($(this).text() != "") {
                return;
            }
            $(this).parentsUntil("table").find(".selected").removeClass("selected");
            $(this).addClass("selected");
        });

        $(".en-button", model.screen).click(function(e) {
            var selected = $(this).parentsUntil("table").find(".selected");

            if (!selected.length) {
                return;
            }
            if ($(this).text() != selected.attr("en-word")) {
                alert("Wrong answer !!");
                return;
            }
            $(this, model.screen).hide();
            selected.text($(this).text());
            selected.removeClass("selected");

            if ($(this).parent().find("button:visible").length <= 0) $(this).parent().parent("tr:last-child").hide();
        });
    });
})(app.viewType7);

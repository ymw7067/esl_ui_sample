'use strict';

app.viewType7 = kendo.observable({
    screen: null,
    model: null,

    // event
    onShow: function(e) {},
    afterShow: function(e) {},
    beforeHide: function(e) {},

    // method
    initTemplate: function(e) {},
    selectedClick: function(e) {}
});
app.localization.registerView('viewType7');

// START_CUSTOM_CODE_viewType7
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType7
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
    view.set('onInit', function(e) {
        // 초기화 루틴
        view.screen = $("#viewType7Screen")

        view.initTemplate(e);
        view.selectedClick(e);
    });

    view.set('onShow', function(e) {
        view.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        
        // 재방문 할때를 위해 초기화 한다.
        e.view.scroller.scrollTo(0,0);
        $(".en-button", view.screen).show().parent().parent("tr:last-child").show();
        $(".en-bottom-blank", view.screen).text("");
        $(".en-bottom-blank", view.screen).removeClass("selected");
    });

    view.set('beforeHide', function(e) {
        e.view.scroller.scrollTo(0,0);
    });

    view.set('model', model);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('initTemplate', function (e) {
        var template, randomArr, result;

        template = kendo.template($(".en-positive-form-template").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.positive_form_questions.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-positive-form-buttons td", view.screen).html(result);

        template = kendo.template($(".en-negative-form-template").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.negative_form_questions.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-negative-form-buttons td", view.screen).html(result);

        template = kendo.template($(".en-question-form-template").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.question_form_questions.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-question-form-buttons td", view.screen).html(result);

        template = kendo.template($(".en-short-answers-template").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.short_answers_questions.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-short-answers-buttons td", view.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    view.set('selectedClick', function(e) {
        $(".en-bottom-blank", view.screen).click(function(e) {
            if ($(this).text() != "") {
                return;
            }
            $(this).parentsUntil("table").find(".selected").removeClass("selected");
            $(this).addClass("selected");
        });

        $(".en-button", view.screen).click(function(e) {
            var selected = $(this).parentsUntil("table").find(".selected");

            if (!selected.length) {
                return;
            }
            if ($(this).text() != selected.attr("en-word")) {
                alert("정답아님 !!")
                return;
            }
            $(this, view.screen).hide();
            selected.text($(this).text());
            selected.removeClass("selected");

            if ($(this).parent().find('button:visible').length <= 0) $(this).parent().parent("tr:last-child").hide();
        });
    });
})(app.viewType7);

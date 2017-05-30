'use strict';

app.viewType8 = kendo.observable({
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
app.localization.registerView('viewType8');

// START_CUSTOM_CODE_viewType8
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType8
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
        questions1: [
            { word: "(be) verb", compare: "questions1" },
            { word: "subject", compare: "questions1" },
            { word: "adjective", compare: "questions1" },
            { word: "so (adverb)", compare: "questions1" }
        ],
        questions2: [
            { word: "(be) verb", compare: "questions2" },
            { word: "adjective", compare: "questions2" },
            { word: "subject", compare: "questions2" },
            { word: "really (adverb)", compare: "questions2" }
        ],
        questions3: [
            { word: "(be) verb", compare: "questions3" },
            { word: "subject", compare: "questions3" },
            { word: "noun (singular)", compare: "questions3" },
            { word: "a/an", compare: "questions3" },
            { word: "such (adverb)", compare: "questions3" }
        ],
        questions4: [
            { word: "(be) verb", compare: "questions4" },
            { word: "subject", compare: "questions4" },
            { word: "noun (plural)", compare: "questions4" },
            { word: "such (adverb)", compare: "questions4" }
        ],
        questions5: [
            { word: "(be) verb", compare: "questions5" },
            { word: "subject", compare: "questions5" },
            { word: "noun (singular)", compare: "questions5" },
            { word: "such (adverb)", compare: "questions5" },
            { word: "a/an", compare: "questions5" },
            { word: "adjective", compare: "questions5" }
        ]
        /// end add model functions
    });

    /// start form functions
    model.set("onInit", function(sender) {
        // 초기화 루틴
        model.view = sender.view;
        model.screen = $("#viewType8Screen");

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
        $(".en-button", model.screen).show().parent().show();
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

        template = kendo.template($(".en-questions1-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.questions1.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-questions1-buttons", model.screen).html(result);

        template = kendo.template($(".en-questions2-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.questions2.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-questions2-buttons", model.screen).html(result);

        template = kendo.template($(".en-questions3-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.questions3.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-questions3-buttons", model.screen).html(result);

        template = kendo.template($(".en-questions4-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.questions4.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-questions4-buttons", model.screen).html(result);

        template = kendo.template($(".en-questions5-template", model.screen).html());
        randomArr = new kendo.data.ObservableArray( shuffle( model.data.questions5.slice(), { "copy": true } ) );
        result = kendo.render(template, randomArr);

        $(".en-questions5-buttons", model.screen).html(result);
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set("selectedClick", function(sender) {
        $(".en-bottom-blank", model.screen).click(function(e) {
            if ($(this).text() != "") {
                return;
            }
            $(this).parentsUntil(".form-content").find(".selected").removeClass("selected");
            $(this).addClass("selected");
        });

        $(".en-button", model.screen).click(function(e) {
            var selected = $(this).parentsUntil(".form-content").find(".selected");

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

            if ($(this).parent().find("button:visible").length <= 0) $(this).parent().hide(); 
        });
    });
})(app.viewType8);

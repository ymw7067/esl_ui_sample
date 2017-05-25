'use strict';

app.viewType8 = kendo.observable({
    screen: null,
    model: null,

    // event
    onShow: function(e) {},
    afterShow: function(e) {},
    beforeHide: function(e) {},

    // method
    initTemplate: function(e) {},
    initDragdrop: function(e) {}
});
app.localization.registerView('viewType8');

// START_CUSTOM_CODE_viewType8
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType8
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
    view.set('onInit', function(e) {
        // 초기화 루틴
        view.screen = $("#viewType8Screen")

        view.initTemplate(e);
        view.initDragdrop(e);
    });

    view.set('onShow', function(e) {
        view.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        
        // 재방문 할때를 위해 초기화 한다.
        e.view.scroller.scrollTo(0,0);
        $(".en-draggable", view.screen).show().parent().show();
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

        template = kendo.template($(".en-questions1").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.questions1.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-questions1-buttons", view.screen).html(result);

        template = kendo.template($(".en-questions2").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.questions2.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-questions2-buttons", view.screen).html(result);

        template = kendo.template($(".en-questions3").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.questions3.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-questions3-buttons", view.screen).html(result);

        template = kendo.template($(".en-questions4").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.questions4.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-questions4-buttons", view.screen).html(result);

        template = kendo.template($(".en-questions5").html());
        randomArr = new kendo.data.ObservableArray( shuffle( view.model.questions5.slice(), { 'copy': true } ) );

        result = kendo.render(template, randomArr);
        $(".en-questions5-buttons", view.screen).html(result);
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
                var answer = e.dropTarget;

                if( word.attr("en-compare") != answer.attr("en-compare") ) {
                    e.preventDefault();
                    return;
                }
                if( word.text() != answer.attr("en-word") ) {
                    e.preventDefault();
                    return;
                }

                word.hide();
                answer.text(word.text());
                word.removeClass("en-drag");

                if (word.parent().find('button:visible').length <= 0) word.parent().hide(); 
            }
        });
    });
})(app.viewType8);

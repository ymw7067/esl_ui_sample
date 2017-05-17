'use strict';

app.viewType4 = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('viewType4');

// START_CUSTOM_CODE_viewType4
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType4
(function(parent) {
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

        viewType4Model = kendo.observable({
            /// start add model functions
            /// end add model functions

        });

    /// start form functions
    /// end form functions

    parent.set('onShow', function _onShow() {
        var that = parent;
        that.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        /****************************************
         *  Draggable
         ****************************************/

        $(".good_bad_draggable").kendoDraggable({
            hint: function(elem) {
                return elem.clone();
            },
            dragstart: function(e) {
                e.currentTarget.addClass("drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("drag");
                $(".good_bad_droptarget").parent().css({ "border-color": "#ccc", "border-width": "1px" });
            }
        });
        
        $(".good_bad_droptarget").kendoDropTarget({
            dragenter: function(e) {
                e.dropTarget.parent().css({ "border-color": "#000", "border-width": "2px" });
            },
            dragleave: function(e) {
                e.dropTarget.parent().css({ "border-color": "#ccc", "border-width": "1px"});
            },
            drop: function(e) {
                e.dropTarget.append('<div class="good_bad_answer_items"><div class="good_bad_answer">' + e.draggable.element.text() + '</div><div class="good_bad_items_delete">x</div></div>');

                if (e.dropTarget.attr("e-word") != e.draggable.element.attr("e-word")) {
                    $(".good_bad_answer", e.dropTarget).each(function(i) {
                        var text = $(this).text();
                        if (e.draggable.element.text() == $(this).text()) {
                            $(this).css("color", "red");
                        }
                    });
                }

                e.draggable.element.removeClass("drag");
                e.draggable.element.hide();
            }
        });

        $(".adjectives_nouns_draggable").kendoDraggable({
            hint: function(elem) {
                return elem.clone();
            },
            dragstart: function(e) {
                e.currentTarget.addClass("drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("drag");
                $(".adjectives_nouns_droptarget").parent().css({ "border-color": "#ccc", "border-width": "1px" });
            }
        });
        
        $(".adjectives_nouns_droptarget").kendoDropTarget({
            dragenter: function(e) {
                e.dropTarget.parent().css({ "border-color": "#000", "border-width": "2px" });
            },
            dragleave: function(e) {
                e.dropTarget.parent().css({ "border-color": "#ccc", "border-width": "1px"});
            },
            drop: function(e) {
                e.dropTarget.append('<div class="adjectives_nouns_answer_items"><div class="adjectives_nouns_answer">' + e.draggable.element.text() + '</div><div class="adjectives_nouns_items_delete">x</div></div>');

                if (e.dropTarget.attr("e-word") != e.draggable.element.attr("e-word")) {
                    $(".adjectives_nouns_answer", e.dropTarget).each(function(i) {
                        var text = $(this).text();
                        if (e.draggable.element.text() == $(this).text()) {
                            $(this).css("color", "red");
                        }
                    });
                }

                e.draggable.element.removeClass("drag");
                e.draggable.element.hide();
            }
        });

		$(document).on("click", ".good_bad_answer_items", function(e) {
            var text = $(this).find(".good_bad_answer").text();
            $("button.good_bad_draggable").each(function(i) {
                if ($(this).text() == text) {
                    $(this).show();
                }
            });
            $(this).remove();
		});

		$(document).on("click", ".adjectives_nouns_answer_items", function(e) {
            var text = $(this).find(".adjectives_nouns_answer").text();
            $("button.adjectives_nouns_draggable").each(function(i) {
                if ($(this).text() == text) {
                    $(this).show();
                }
            });
            $(this).remove();
		});


        /// end add form show
    });
    parent.set('viewType4Model', viewType1Model);
})(app.viewType4);

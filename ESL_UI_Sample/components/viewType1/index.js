'use strict';

app.viewType1 = kendo.observable({
    _vtop: 0,
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('viewType1');

// START_CUSTOM_CODE_viewType1
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_viewType1
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

        viewType1Model = kendo.observable({
            /// start add model functions
            /// end add model functions

        });

    /// start form functions
    /// end form functions
    
    parent.set('onInit', function _onInit(e) {
        $("<div id='sticky_dummy' e-fixed='no'></div>").insertBefore($("#sticky_content", "#viewType1Screen"));

      var scroller = e.view.scroller;
      scroller.bind("scroll", function(e) {
          var top = $("#sticky_dummy", "#viewType1Screen").offset().top;
          var fixed = $("#sticky_dummy", "#viewType1Screen").attr("e-fixed");

          if( top )
            parent._vtop = top;

          if( parent._vtop <= e.scrollTop  ) {
            if( fixed == "no" ) {
                // sticky_panel 로 옮긴다.
                $("#sticky_target", "#viewType1Screen").append($("#sticky_content", "#viewType1Screen"));
                $("#sticky_dummy", "#viewType1Screen").attr("e-fixed", "yes");
                $("#sticky_panel", "#viewType1Screen").show();
                $("#sticky_source", "#viewType1Screen").hide();
            }
          } else {
            if( fixed == "yes" ) {
                $("#sticky_dummy", "#viewType1Screen").after($("#sticky_content", "#viewType1Screen"));
                $("#sticky_dummy", "#viewType1Screen").attr("e-fixed", "no");
                $("#sticky_panel", "#viewType1Screen").hide();
                $("#sticky_source", "#viewType1Screen").show();
            }
          }

        //$("#info").html($("#sticky").offset().top + "; " + e.scrollTop + ", " + e.scrollLeft);
      });
    });

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
        $("img", ".productitem").each(function(i, el) {
            var box_width = $(".product").width();
            var box_height = $(".product").height();
            $(el).load(function() {

                if (120 < $(el).height()) {
                    $(el).css({  "width": "auto", "height": "120px" });
                }
            });
        });
         
        $(".draggable", "#viewType1Screen").kendoDraggable({
            hint: function(elem) {
                return elem.clone();
            },
            dragstart: function(e) {
                e.currentTarget.addClass("drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("drag");
                $(".droptarget", "#viewType1Screen").css("border-color", "#efefef").css("border-width", "1px");
            }
        });

        $(".droptarget", "#viewType1Screen").kendoDropTarget({
            dragenter: function(e) {
                 e.dropTarget.css("border-color", "#000088").css("border-width", "2px");
            },
            dragleave: function(e) {
                e.dropTarget.css("border-color", "#efefef");
            },
            drop: function(e) {
                e.draggable.element.hide();
                if (e.dropTarget.find(".answer").text() != "") {
                    var text = e.dropTarget.find(".answer").text();
                    $("button").each(function(i) {
                        if ($(this).text() == text) {
                            $(this).show();
                        }
                    });
                }
                e.dropTarget.find(".answer").text(e.draggable.element.text());
                if( e.dropTarget.find(".answer").text() == e.dropTarget.find(".answer").attr("e-word") ) {
                    e.dropTarget.find(".answer").removeClass("wrong"); 
                } else {
                    e.dropTarget.find(".answer").addClass("wrong");
                } 

                e.draggable.element.removeClass("drag");
                e.dropTarget.find(".items_delete").show();
            }
        });

        $(".items_delete, .answer").click(function(e) {
            var text = $(this).parent().find(".answer").text();
            $("button").each(function(i) {
                if ($(this).text() == text) {
                    $(this).show();
                }
            });
            $(this).parent().find(".items_delete").hide();
            $(this).parent().find(".answer").text("");
        });


        /// end add form show
    });
    parent.set('viewType1Model', viewType1Model);
})(app.viewType1);

// START_CUSTOM_CODE_viewType1Model
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType1Model
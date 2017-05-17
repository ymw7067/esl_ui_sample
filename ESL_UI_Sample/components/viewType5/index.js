'use strict';

app.viewType5 = kendo.observable({
    _vtop: 0,
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('viewType5');

// START_CUSTOM_CODE_viewType5
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_viewType5


(function(parent) {

    parent.set('onInit', function _onInit(e) {
        $("<div id='sticky_dummy' e-fixed='no'></div>").insertBefore($("#sticky_content", "#viewType5Screen"));

      var scroller = e.view.scroller;
      scroller.bind("scroll", function(e) {
          var top = $("#sticky_dummy", "#viewType5Screen" ).offset().top;
          var fixed = $("#sticky_dummy", "#viewType5Screen").attr("e-fixed");

          if( top )
            parent._vtop = top;

          if( parent._vtop <= e.scrollTop - 60  ) {
            if( fixed == "no" ) {
                // sticky_panel 로 옮긴다.
                $("#sticky_target", "#viewType5Screen").append($("#sticky_content", "#viewType5Screen"));
                $("#sticky_dummy", "#viewType5Screen").attr("e-fixed", "yes");
                $("#sticky_panel", "#viewType5Screen").show();
                $("#sticky_source", "#viewType5Screen").hide();
            }
          } else {
            if( fixed == "yes" ) {
                $("#sticky_dummy", "#viewType5Screen").after($("#sticky_content", "#viewType5Screen"));
                $("#sticky_dummy", "#viewType5Screen").attr("e-fixed", "no");
                $("#sticky_panel", "#viewType5Screen").hide();
                $("#sticky_source", "#viewType5Screen").show();
            }
          }

        //$("#info").html($("#sticky").offset().top + "; " + e.scrollTop + ", " + e.scrollLeft);
      });
    });


    parent.set('onShow', function _onShow(e) {
        $(".draggable", "#viewType5Screen").kendoDraggable({
            hint: function(elem) {
                var clone = elem.clone();
                clone.css("font-size", "40px");
                return clone;
            },
            dragstart: function(e) {
                e.currentTarget.addClass("drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("drag");
                e.currentTarget.css("border-color", "#888888");
            }
        });

        $(".droptarget", "#viewType5Screen").kendoDropTarget({
            dragenter: function(e) {
                 e.dropTarget.css("border-color", "#0000ff");
                 e.dropTarget.next().addClass("dragover");
            },
            dragleave: function(e) {
                e.dropTarget.css("border-color", "#888888");
                e.dropTarget.next().removeClass("dragover");
            },
            drop: function(e) {
                e.dropTarget.text(e.draggable.element.text());
                if( e.dropTarget.text() == e.dropTarget.attr("e-word") )
                    e.dropTarget.removeClass("wrong"); 
                else
                    e.dropTarget.addClass("wrong"); 

                e.draggable.element.removeClass("drag");
                e.dropTarget.css("border-color", "#888888");
                e.dropTarget.next().removeClass("dragover");
                //e.dropTarget.find(".items_delete").show();
            }
        });
    });
    
})(app.viewType5);

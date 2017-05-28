'use strict';

app.viewType13 = kendo.observable({
    view: null,    
    screen: null,
    data: null,
    vtop: 0,
    step: 0,

    // event
    onShow: function(sender) {},
    afterShow: function(sender) {},
    beforeHide: function(sender) {},

    // method
    initDragdrop: function(sender) {},
    bindScroll: function(sender) {},
    unbindScroll: function(sender) {},
    sticky: function(fixed) {},
    randomPhonetics: function(sender) {},
    nextStep: function(sender) { alert(1); }
});
app.localization.registerView('viewType13');

// START_CUSTOM_CODE_viewType13
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_viewType13
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
        phonetics: [
            { phonetic: "d͡ʒ" },
            { phonetic: "d͡ʒ" },
            { phonetic: "t͡ʃ" },
            { phonetic: "ɑɪ" },
            { phonetic: "ɛɪ" },
            { phonetic: "ə" },
            { phonetic: "ə" },
            { phonetic: "ə" },
            { phonetic: "ə" }
        ]
        /// end add model functions
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    /// start form functions
    model.set('onInit', function(sender) {
        // 초기화 루틴
        model.view = sender.view;
        model.screen = $("#viewType13Screen")

    });

    model.set('onShow', function(sender) {
        model.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        
        model.randomPhonetics(sender);

        // 재방문 할때를 위해 초기화 한다.
        model.vtop = 0;
        model.view.scroller.scrollTo(0,0);
        $(".en-sticky-source", model.screen).hide().next().hide();
        $(".en-draggable", model.screen).show();
        $(".en-dragdrop-answer", model.screen).text("");
    });

    model.set('beforeHide', function(sender) {
        model.unbindScroll(sender);
    });

    model.set('data', data);
    /// end form functions

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('bindScroll', function(sender) {
        $('#sticky-panel').css("top", $('.km-header', model.screen).css('height'));
        
        model.view.scroller.bind("scroll", function(e) {
            var top = $(".en-sticky-dummy", model.screen).position().top 
                            - parseInt($(".en-sticky-dummy", model.screen).parent().css("margin-top"),10)
                            - parseInt($(".en-sticky-dummy", model.screen).parent().css("padding-top"),10);
            var fixed = $(".en-sticky-dummy", model.screen).attr("en-fixed");

            if( top ) model.vtop = top;

            if( model.vtop <= 0  ) {
                if( fixed == "no" ) {
                    model.sticky(true);
                }
            } else {
                if( fixed == "yes" ) {
                    model.sticky(false);
                }
            }
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('unbindScroll', function(sender) {
        model.view.scroller.unbind("scroll");
        
        if( $(".en-sticky-dummy", model.screen).attr("en-fixed") == "yes" ) {
            model.sticky(false);
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('sticky', function(yes){
        if( yes ) {
            // sticky_panel 로 옮긴다.
            $("#sticky-panel .form-content-item").append($(".en-sticky-content", model.screen));
            $(".en-sticky-dummy", model.screen).attr("en-fixed", "yes");
            $("#sticky-panel").show();
            $(".en-sticky-source", model.screen).css("height", $("#sticky-panel").css("height"));
        } else {
            $(".en-sticky-dummy", model.screen).after($(".en-sticky-content", '#sticky-panel'));
            $(".en-sticky-dummy", model.screen).attr("en-fixed", "no");
            $("#sticky-panel").hide();
            $(".en-sticky-source", model.screen).css("height", "");
        }
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('randomPhonetics', function (sender) {
        var template, result;

        template = kendo.template($(".en-buttons-template", model.screen).html());
        var randomArr = new kendo.data.ObservableArray( shuffle( model.data.phonetics.slice(), { 'copy': true }) );

        result = kendo.render(template, randomArr);
        $("#phonetics-buttons", model.screen).html(result);
        $("button", $("#phonetics-buttons", model.screen)).click(function(){
            $(this).siblings().removeClass("km-primary");
            $(this).addClass("km-primary");
        });

        // word 리스트 클릭시 배경색을 해당 word 배경색을 바꾸고 phonetic-symbol 을 보여준다.
        $(".word", model.screen).removeClass("bg-info");
        $(".word", model.screen).click(function(){
            $(this).siblings(".word").removeClass("bg-info");
            $(this).addClass("bg-info");

            $(".en-phonetic-symbol", model.screen).parent().hide(); 
            $(".en-phonetic-symbol",$(this)).parent().show(); 
        });

        // 모든 en-phonetic-symbol 을 숨긴다.
        $(".en-phonetic-symbol", model.screen).parent().hide();
        $(".en-phonetic-text", model.screen).hide();


        // 강세가 있는 음절을 클릭하면 색상을 바꾼다.
        $(".en-stress-text.en-stress").removeClass("en-stress");
        $(".en-stress-text[en-stress]").click(function(){
            $(this).addClass("en-stress");
            
            var total = $(".en-stress-text[en-stress]").length;
            var found = $(".en-stress-text.en-stress").length;

            // 강세를 모두 찾아다면 음절 찾기 시작
            if( total == found && model.step == 1 ) {
                model.step = 2;
                console.log("found / total = %s / %s", found, total);
                model.view.footer.show();
                model.view.scroller.scrollTo(
                    model.view.scroller.scrollLeft, 
                    (model.view.scroller.scrollTop + model.view.footer.height()) * -1
                );
            }
        });

        // step 초기화
        model.step = 1;
        model.view.footer.hide();
        $("#instruction", model.screen).html("Listen to the words and click on the main stress");
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('nextStep', function(sender) {
        model.step = 3;
        $("#instruction", model.screen).html("Move the symbols over the right sounds");

        $(".word", model.screen).removeClass("bg-info");

        $(".en-sticky-source", model.screen).show().next().show();

        $(".en-phonetic-text", model.screen).html("&nbsp;").show();
        $(".en-stress-text", model.screen).parent().addClass("en-phonetic-droptarget");
        model.initDragdrop(sender);

        model.bindScroll(sender);
        model.view.scroller.scrollTo(0,0);
        model.view.footer.hide();

    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    model.set('initDragdrop', function (sender) {
        $(".en-draggable", model.screen).kendoDraggable({
            hint: function(el) {
                $(el).siblings().removeClass("km-primary");
                $(el).addClass("km-primary");
                return el.clone();
            },
            dragstart: function(e) {
                e.currentTarget.addClass("en-drag");
            },
            dragend: function(e) {
                e.currentTarget.removeClass("en-drag");
                $(".en-phonetic-droptarget", model.screen).removeClass("en-droptarget-over");
            }
        });

        $(".en-phonetic-droptarget", model.screen).kendoDropTarget({
            dragenter: function(e) {
                e.dropTarget.addClass("en-droptarget-over");

                e.dropTarget.parent().siblings(".word").removeClass("bg-info");
                e.dropTarget.parent().addClass("bg-info")
                $(".en-phonetic-symbol", model.screen).parent().hide(); 
                $(".en-phonetic-symbol",e.dropTarget.parent()).parent().show(); 
            },
            dragleave: function(e) {
                e.dropTarget.removeClass("en-droptarget-over");
            },
            drop: function(e) { 
                var phonetic = e.draggable.element;
                var answer = e.dropTarget.find(".en-phonetic-text");

                console.log(phonetic.text(), e.dropTarget.find(".en-stress-text").text());
                if( phonetic.text() != answer.attr("en-phonetic") || phonetic.text() == answer.text()) {
                    e.preventDefault();
                    return;
                }

                phonetic.hide();
                answer.text(phonetic.text());
                phonetic.removeClass("en-drag");

                // div는 자동으로 resize 이벤트가 발생하지 않으므로 강제로 발생시킨다.
                if( $(".en-sticky-dummy", model.screen).attr("en-fixed") == "yes") {
                    $("#sticky-panel").trigger("resize");
                }

                if (phonetic.parent().find(".en-draggable:visible").length <= 0) {
                    model.unbindScroll(model.view);
                    $(".en-sticky-source", model.screen).hide().next().hide();
                }
            }
        });
        $(".word", model.screen).kendoDropTarget({
            dragenter: function(e) {
                e.dropTarget.siblings(".word").removeClass("bg-info");
                e.dropTarget.addClass("bg-info")
                $(".en-phonetic-symbol", model.screen).parent().hide(); 
                $(".en-phonetic-symbol",e.dropTarget).parent().show(); 
            },
            dragleave: function(e) {
            },
            drop: function(e) { 
                e.preventDefault();
                return;
            }
        });

    });

})(app.viewType13);

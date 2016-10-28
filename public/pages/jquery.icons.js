/**
* Theme: Zircos Admin Template
* Author: Coderthemes
* Icon search
*/

!function($) {
    "use strict";

    var Icons = function() {
        this.$body = $("body"),
        this.$searchInput = $("#search-input"),
        this.$iconsContainer = $(".icon-list-demo"),
        this.noMatchEl = $("#no-matching-result")
    };

    //searches the icons matching with given name
    Icons.prototype.search = function(query_string) {
        if(query_string && query_string.length > 0) {
            this.$iconsContainer.find(".col-sm-6").hide();
            var matching_icons = this.$iconsContainer.find('div:contains("' + query_string + '")');
            if(matching_icons.length > 0) {
                matching_icons.show();
                this.noMatchEl.hide();
            } else { //no match
                this.noMatchEl.show();
            }
        } else {
            this.$iconsContainer.find(".col-sm-6").show();
            this.noMatchEl.hide();
        }
    },
    Icons.prototype.init = function () {
        var $this = this;

        $this.noMatchEl.hide();
        //binding key press event on chat input box - on enter we are adding the chat into chat list -
        $this.$searchInput.keyup(function (ev) {
            ev.preventDefault();
            $this.search($(this).val());
        });
    },
    //init ChatApp
    $.Icons = new Icons, $.Icons.Constructor = Icons
    
}(window.jQuery),

//initializing main application module
function($) {
    "use strict";
    $.Icons.init();
}(window.jQuery);
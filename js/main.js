// To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "dropdownFilter".

var dropdownFilter = {

    // Declare any variables we will need as properties of the object

    $filters: null,
    $reset: null,
    groups: [],
    outputArray: [],
    outputString: '',

    // The "init" method will run on document ready and cache any jQuery objects we will need.

    init: function(){
        var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "dropdownFilter" object so that we can share methods and properties between all parts of the object.

        self.$filters = $('#filters');
        self.$reset = $('#reset');
        self.$container = $('#card-container');

        self.$filters.find('fieldset').each(function(){
            self.groups.push({
                $dropdown: $(this).find('select'),
                active: ''
            });
        });

        self.bindHandlers();
    },

    // The "bindHandlers" method will listen for whenever a select is changed.

    bindHandlers: function(){
        var self = this;

        // Handle select change

        self.$filters.on('change', 'select', function(e){
            e.preventDefault();

            self.parseFilters();
        });

        // Handle reset click

        self.$reset.on('click', function(e){
            e.preventDefault();

            self.$filters.find('select').val('');

            self.parseFilters();
        });
    },

    // The parseFilters method pulls the value of each active select option

    parseFilters: function(){
        var self = this;

        // loop through each filter group and grap the value from each one.

        for(var i = 0, group; group = self.groups[i]; i++){
            group.active = group.$dropdown.val();
        }

        self.concatenate();
    },

    // The "concatenate" method will crawl through each group, concatenating filters as desired:

    concatenate: function(){
        var self = this,
            type = null;

        self.outputString = ''; // Reset output string

        for(var i = 0, group; group = self.groups[i]; i++){
            if(group.active.indexOf('.equipment') > -1) {
                type = 'equipment';
            } else if(group.active.indexOf('.spawn') > -1) {
                type = 'spawn';
            }

            if(group.$dropdown.closest('fieldset').is('.'+type+'-filter') ||
               group.$dropdown.closest('fieldset').is('.section-filter')) {
                self.outputString += group.active;
            }
        }

        // If the output string is empty, show all rather than none:

        !self.outputString.length && (self.outputString = 'all');

        //console.log(self.outputString);

        // Send the output string to MixItUp via the 'filter' method:

        if(self.$container.mixItUp('isLoaded')){
            if(self.outputString.indexOf('.equipment') > -1) {
                $('.equipment-filter').css('display', 'inline-block');
                $('.spawn-filter').css('display', 'none');
            } else {
                $('.equipment-filter').css('display', 'none');
                $('.spawn-filter').css('display', 'inline-block');
            }

            self.$container.mixItUp('filter', self.outputString);
        }
    }
};

// On document ready, initialise our code.

$(document).ready(function() {

    // Initialize dropdownFilter code

    dropdownFilter.init();

    // Instantiate MixItUp

    $('#card-container').mixItUp({
        controls: {
            enable: false // we won't be needing these
        },
        selectors: {
            target: '.card'
        },
        load: {
            filter: '.equipment'
        },
        callbacks: {
            onMixEnd: function(state){
                $("img").lazyload({
                    threshold : 200,
                    event : "scroll lazyloadupdate",
                    skip_invisible : false
                });
            },
            onMixFail: function(){
                console.log('No items were found matching the selected filters.');
            }
        }
    });
});
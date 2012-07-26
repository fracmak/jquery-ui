/*
 * datepicker_tickets.js
 */
(function($) {

module("datepicker: tickets");

// http://forum.jquery.com/topic/several-breaking-changes-in-jquery-ui-1-8rc1
test('beforeShowDay-getDate', function() {
	var inp = init('#inp', {beforeShowDay: function(date) { inp.datepicker('getDate'); return [true, '']; }});
	var dp = $('#ui-datepicker-div');
	inp.val('01/01/2010').datepicker('show');
	// contains non-breaking space
	equals($('div.ui-datepicker-title').text(), 'January 2010', 'Initial month');
	$('a.ui-datepicker-next', dp).click();
	$('a.ui-datepicker-next', dp).click();
	// contains non-breaking space
	equals($('div.ui-datepicker-title').text(), 'March 2010', 'After next clicks');
	inp.datepicker('hide').datepicker('show');
	$('a.ui-datepicker-prev', dp).click();
	$('a.ui-datepicker-prev', dp).click();
	// contains non-breaking space
	equals($('div.ui-datepicker-title').text(), 'November 2009', 'After prev clicks');
	inp.datepicker('hide');
});

test('Ticket 7362: Able to navigate past the year range which causes weird behavior', function(){
    var d = $('<div></div>').datepicker({
        changeYear: true,
        changeMonth: true,
        yearRange: '-0:+1',
        defaultDate: new Date(new Date().getFullYear(), 0, 1)
    });
    ok(d.find(".ui-datepicker-prev").hasClass("ui-state-disabled"), "previous button disabled");
    d.datepicker("setDate", new Date(new Date().getFullYear() + 1, 11, 30));
    ok(d.find(".ui-datepicker-next").hasClass("ui-state-disabled"), "next button disabled");
    d.remove();
});

})(jQuery);

/*
 * Ally Coding Challenge
 * By Samuel B Grundman
 * @author "Sam Grundman" <samuel@yodas.ws>
 */

// JavaScript 1.8, via MDN
if (!Array.prototype.forEach)
Array.prototype.forEach=function(a,b){var T,k,O,l,m;if(this==null){throw new TypeError('this is null or not defined')}O=Object(this);l=O.length>>>0;if(typeof a!=="function"){throw new TypeError(a+' is not a function')}if(arguments.length>1)T=b;k=0;while(k<l){if(k in O){m=O[k];a.call(T,m,k,O)}k++}};

window.format = (window.Intl && Intl.NumberFormat) ?
	new Intl.NumberFormat('en-us', { minimumFractionDigits:2, style:'decimal' }).format
	: function(n) {
		// Granted, not the best, but will suffice in most cases
		// see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
		return Math.round(n * 100) / 100
	}

$(document).ready(function(){
	// Highlight Link to Current Page
	// Use a CSS Class so server-side code can set the "selected" link
	// Use a CSS Class so we separate styling from scripting
	// Use a CSS Class so we can easily change the highlighted link without complicated JavaScript
	// Use a CSS Class so we can change the hightlighted link without a page reload, such as with History API
	$('header > nav > a, footer > div > a').removeClass('selected')
	$('header > nav > a, footer > div > a').each(function(i,l){
		var href = $(l).attr('href')
		if (window.location.pathname.toLowerCase() == href)
			$(this).addClass('selected')
	})
	// Open Login Modal
	// By activating it on a link to a page, users without JavaScript can log in
	// By activating it on all links to the login page, we can easily add more login links anywhere at anytime
	$(document).on('click', 'a[href$="login"]', function() {
		$('#modalbg,#loginbox').show()
		setTimeout(function(){
			$('#modalbg,#loginbox').removeClass('hidden')
		}, 1)
		return false
	})
	// Close Login Modal
	// By closing on clicking the black background, it's easier for the user to close the modal without hitting the small X
	$(document).on('click', '#modalbg, #loginbox > a, #loginbox > a *', function() {
		$('#modalbg,#loginbox').addClass('hidden')
		setTimeout(function(){
			$('#modalbg,#loginbox').hide()
		}, 300)
		return false
	})
	// Change News Section
	// Using the selector within .on() lets us add more to the DOM without re-attaching the event
	$(document).on('click', 'body > aside > h1', function(e) {
		$(e.target).addClass('selected').siblings('h1').removeClass('selected')
		return false
	})
	// Load Rates Table
	$.ajax({
		url:'code-test.json',
		dataType:'json',
		success:function(d){ // Data Loaded!
			var $t = $('#tblRates > tbody')
			if (!$t.length) $t = $('#tblRates').append('<tbody>').children('tbody')
			// Sort
			d.sort(function(a,b){
				if (a.name == 'URBank') return -1
				return b.apy - a.apy
			})
			// Add Row to Table
			d.forEach(function(r){
				var $r = $('<tr>')
				$r.append('<td>' + r.name)
				$r.append('<td class="apy">' + window.format(r.apy))
				$r.append('<td class="money">' + window.format(r.earnings))
				$t.append($r)
			})
		},
		error:function(){
			// Yes, something should go here…
		}
	})
})

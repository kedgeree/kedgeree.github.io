$.fn.tagcloud.defaults = {
  size: {start: 14, end: 18, unit: 'pt'},
  color: {start: '#ccc', end: '#000'}
};
$(function () {
	$('.tags a').tagcloud();
});

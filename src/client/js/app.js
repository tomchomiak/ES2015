/*
 * Main application file
 */
 
 var converter = new showdown.Converter();

 $.get('README.md', function (data) {
 	var html = converter.makeHtml(data);
 	$("#ES2015").html(html);
 })
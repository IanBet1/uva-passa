$(document).ready(function(){
	$("#txtPesquisa").keyup(function (event) {
		if (event.keyCode === 13) {
			$("#btnPesquisa").click();
		}
	});
});

function Pesquisar(){
	//alert('UvaPassa');
	$("#divResultado").html("");
	
	var textoPesquisa = $('#txtPesquisa').val();
	
	$.getJSON( "https://api.themoviedb.org/3/search/movie?api_key=1feaee1568e8ea65c78670425ea80323&query=" + textoPesquisa, function( data ) {
	  var items = [];
	  $.each( data.results, function( key, val ) {
		var d = new Date(val.release_date);
		
		var titulo =  val.title;
		if(val.original_title.toLowerCase().trim() != val.title.toLowerCase().trim())
			titulo = val.original_title  + " - " + "<i>" + titulo + "</i> ";
		titulo = titulo + " (" + d.getFullYear() + ")";
		
		var poster = ""; 
		if(val.poster_path)
			poster = "https://image.tmdb.org/t/p/w500" + val.poster_path;
		else
			poster = "Content/images/noimage.png";
		
		var htmlItem = 	"<div id='" + val.id + "' class='table-cell ItemResultado'>" + 
							"<img src='" + poster + "' class='Imagem' /><br/>" +
							"<span class='Titulo'>" + titulo + "</span>" +
						"</div>";
		
		
		items.push(htmlItem);
	  });
	 
	  $( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	  }).appendTo( "#divResultado" );
	});
}
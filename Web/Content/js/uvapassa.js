$(document).ready(function(){
	$("#txtPesquisa").keyup(function (event) {
		if (event.keyCode === 13) {
			$("#btnPesquisa").click();
		}
	});
});

function Pesquisar(selectedPage){
	//alert('UvaPassa');
	$("#divResultado").html("");
	
	if(!selectedPage) selectedPage = 1;
	
	var textoPesquisa = $('#txtPesquisa').val();
	
	$.getJSON( "https://api.themoviedb.org/3/search/movie?api_key=1feaee1568e8ea65c78670425ea80323&query=" + textoPesquisa + "&page=" + selectedPage, function( data ) {
	  var items = [];
	  $.each( data.results, function( key, val ) {
		var d = new Date(val.release_date);
		
		var titulo =  val.title;
		if(val.original_title.toLowerCase().trim() != val.title.toLowerCase().trim())
			titulo = val.original_title  + " - " + "<i>" + titulo + "</i> ";
		var anoLancamento = "";
		if(d && d.toString() != "Invalid Date"){
			anoLancamento = " (" + d.getFullYear() + ")";
		}
		
		var poster = ""; 
		if(val.poster_path)
			poster = "https://image.tmdb.org/t/p/w500" + val.poster_path;
		else
			poster = "Content/images/noimage.png";
		
		// var htmlItem = 	"<div id='" + val.id + "' class='table-cell ItemResultado'>" + 
							// "<img src='" + poster + "' class='Imagem' /><br/>" +
							// "<span class='Titulo'>" + titulo + "</span><br/>" +
							// "<span class='Titulo'>" + anoLancamento + "</span>" +
						// "</div>";
		
		var htmlItem = 	"<div id='" + val.id + "' class='ItemResultado'>" + 
							"<img src='" + poster + "' class='Imagem' /><br/>" +
							"<span class='Titulo'>" + titulo + "</span><br/>" +
							"<span class='Titulo'>" + anoLancamento + "</span>" +
						"</div>";
		items.push(htmlItem);
		
		if(data.total_pages > 1){
			$('#ulpaginacao').pagination({
				items: data.total_pages,
				itemOnPage: 10,
				currentPage: selectedPage,
				cssStyle: 'light-theme',
				prevText: '<span aria-hidden="true">&laquo;</span>',
				nextText: '<span aria-hidden="true">&raquo;</span>',
				onInit: function () {
					// fire first page loading
				},
				onPageClick: function (page, evt) {
					Pesquisar(page);
				}
			});
		}
		
	  });
	 
	  // $( "<ul/>", {
		// "class": "my-new-list",
		// html: items.join( "" )
	  // }).appendTo( "#divResultado" );
	  
	  $('#divResultado').html(items.join( "" ));
	  	  
	});
}
$(document).ready(function(){
	$("#txtPesquisa").keyup(function (event) {
		if (event.keyCode === 13) {
			$("#btnPesquisa").click();
		}
	});
});

function Pesquisar(){
	
	var selectedPageFilmes = 1;
	var selectedPageSeries = 1;
	
	BuscarEPreencherFilmes(selectedPageFilmes);
	
	BuscarEPreencherSeries(selectedPageSeries);
	
	$(".Resultado").show();
	$(".row.Resultado").css('display', 'flex');
}

function BuscarEPreencherFilmes(selectedPageFilmes){
	$("#divResultadoFilmes").html("");
	var textoPesquisa = $('#txtPesquisa').val();
	if(!selectedPageFilmes) selectedPageFilmes = 1;
	
	$.getJSON( "https://api.themoviedb.org/3/search/movie?api_key=1feaee1568e8ea65c78670425ea80323&query=" + textoPesquisa + "&page=" + selectedPageFilmes, function( data ) {
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
		
		var htmlItem = 	"<div id='" + val.id + "' class='ItemResultado'>" + 
							"<img src='" + poster + "' class='Imagem' /><br/>" +
							"<span class='Titulo'>" + titulo + "</span><br/>" +
							"<span class='Titulo'>" + anoLancamento + "</span>" +
						"</div>";
		items.push(htmlItem);
		
		if(data.total_pages > 1){
			$('#ulpaginacaoFilmes').pagination({
				items: data.total_pages,
				itemOnPage: 10,
				currentPage: selectedPageFilmes,
				cssStyle: 'light-theme',
				prevText: '<span aria-hidden="true">&laquo;</span>',
				nextText: '<span aria-hidden="true">&raquo;</span>',
				onInit: function () {
					// fire first page loading
				},
				onPageClick: function (page, evt) {
					BuscarEPreencherFilmes(page);
				}
			});
		}
		
	  });
	  
	  $('#divResultadoFilmes').html(items.join( "" ));
	  	  
	});
}

function BuscarEPreencherSeries(selectedPageSeries){
	$("#divResultadoSeries").html("");
	var textoPesquisa = $('#txtPesquisa').val();
	if(!selectedPageSeries) selectedPageSeries = 1;
	
	$.getJSON( "https://api.themoviedb.org/3/search/tv?api_key=1feaee1568e8ea65c78670425ea80323&query=" + textoPesquisa + "&page=" + selectedPageSeries, function( data ) {
	  var items = [];
	  $.each( data.results, function( key, val ) {
		var d = new Date(val.first_air_date);
		
		var titulo =  val.name;
		if(val.original_name.toLowerCase().trim() != val.name.toLowerCase().trim())
			titulo = val.original_name  + " - " + "<i>" + titulo + "</i> ";
		var anoLancamento = "";
		if(d && d.toString() != "Invalid Date"){
			anoLancamento = " (" + d.getFullYear() + ")";
		}
		
		var poster = ""; 
		if(val.poster_path)
			poster = "https://image.tmdb.org/t/p/w500" + val.poster_path;
		else
			poster = "Content/images/noimage.png";
		
		var htmlItem = 	"<div id='" + val.id + "' class='ItemResultado'>" + 
							"<img src='" + poster + "' class='Imagem' /><br/>" +
							"<span class='Titulo'>" + titulo + "</span><br/>" +
							"<span class='Titulo'>" + anoLancamento + "</span>" +
						"</div>";
		items.push(htmlItem);
		
		if(data.total_pages > 1){
			$('#ulpaginacaoSeries').pagination({
				items: data.total_pages,
				itemOnPage: 10,
				currentPage: selectedPageSeries,
				cssStyle: 'light-theme',
				prevText: '<span aria-hidden="true">&laquo;</span>',
				nextText: '<span aria-hidden="true">&raquo;</span>',
				onInit: function () {
					// fire first page loading
				},
				onPageClick: function (page, evt) {
					BuscarEPreencherSeries(page);
				}
			});
		}
		
	  });
	 	  
	  $('#divResultadoSeries').html(items.join( "" ));
	  	  
	});
}

//Detalhes Filme:
//https://api.themoviedb.org/3/movie/343611?api_key={api_key}

//Gêneros:
//https://api.themoviedb.org/3/genre/movie/list?api_key=1feaee1568e8ea65c78670425ea80323&language=en-US
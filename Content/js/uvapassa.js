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
	$("#idLogoBox").removeClass("LogoBox").addClass("LogoBoxSearch");
}

function BuscarEPreencherFilmes(selectedPageFilmes){
	$("#divResultadoFilmes").html("");
	var textoPesquisa = $('#txtPesquisa').val();
	if(!selectedPageFilmes) selectedPageFilmes = 1;
	
	$.getJSON( "https://api.themoviedb.org/3/search/movie?api_key=1feaee1568e8ea65c78670425ea80323&query=" + textoPesquisa + "&page=" + selectedPageFilmes, function( data ) {
	  var items = [];
	  $.each( data.results, function( key, val ) {
		var d = new Date(val.release_date);
		
		
		var htmlTitulo = "<span><b>" + val.title + "</b></span><br/>";
		if(val.original_title.toLowerCase().trim() != val.title.toLowerCase().trim())
			htmlTitulo = htmlTitulo  + "<span><i>" + val.original_title + "</i></span><br/>";
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
							"<a href='#' onclick='VotarFilme(" + val.id + ");' style='width:110px; float: left;'>" +
								"<img src='" + poster + "' style='width:100%;'></a>" +
							"<div style='float: left; text-align: left; padding-left: 10px;width: 140px;'>" +
								"<a href='#' onclick='AbrirTelaFilme(" + val.id + ");'>" +
									htmlTitulo +
									"<span>" + anoLancamento + "</span><br/><br/></a>" +
									"<span>Bom</span><span>Ruim</span></div></div>";
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
		
		var htmlTitulo = "<span><b>" + val.name + "</b></span><br/>";
		if(val.original_name.toLowerCase().trim() != val.name.toLowerCase().trim())
			htmlTitulo = htmlTitulo  + "<span><i>" + val.original_name + "</i></span><br/>";
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
							"<a href='#' onclick='AbrirTelaFilme(" + val.id + ");' style='width:110px; float: left;'>" +
								"<img src='" + poster + "' style='width:100%;'></a>" +
							"<div style='float: left; text-align: left; padding-left: 10px;width: 140px;'>" +
								"<a href='#' onclick='AbrirTelaFilme(" + val.id + ");'>" +
									htmlTitulo +
									"<span>" + anoLancamento + "</span><br/><br/></a>" +
									"<span>Bom</span><span>Ruim</span></div></div>";
						
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

function AbrirTelaFilme(idFilme){
	$.ajax({ url: 'Controller/UvaPassaBLL.php',
         data: {
	        'tipoReq': 'obter',
	        'tipoConteudo':'F',
	        'conteudo': idFilme,
            'nota': '0' },
         type: 'POST',
         success: function(output) {
			 //sessionStorage.setItem("ErroDeMerda", output);
			 $("#myModal").modal();
			 $("#ModalContent").html(output);
         }
	});
}

function VotarFilme(idFilme){
	$.ajax({ url: 'Controller/UvaPassaBLL.php',
         data: {
	        'tipoReq': 'votar',
	        'tipoConteudo':'F',
	        'conteudo': idFilme,
            'nota': '1' },
         type: 'POST',
         success: function(output) {
			 //sessionStorage.setItem("ErroDeMerda", output);
			 $("#myModal").modal();
			 $("#ModalContent").html(output);
         }
	});
}

function AbrirTelaSerie(idSerie){
	//alert('Em desenvolvimento');
	// $.ajax({ url: 'Controller/UvaPassaBLL.php',
         // data: {json: '{"tipoReq": "obter"; "tipoConteudo":"F"; "conteudo":"' + idFilme + '";"nota": "0"}'},
         // type: 'post',
         // success: function(output) {
                      // alert(output);
         // }
	// });
}

//Detalhes Filme:
//https://api.themoviedb.org/3/movie/343611?api_key={api_key}

//Gêneros:
//https://api.themoviedb.org/3/genre/movie/list?api_key=1feaee1568e8ea65c78670425ea80323&language=en-US
<?php
	include ('../Model/UvaPassaModel.php');
	include ('../Model/ConteudoModel.php');
	include ('../Controller/MySQL.php');
	
	try {
		$json = json_decode(file_get_contents($_POST['json']),true);
		$novoConteudo = new UvaPassaModel();
		$novoConteudo -> setTipoReq($json['tipoReq']);
		$novoConteudo -> setTipoConteudo($json['tipoConteudo']);	
		foreach ($json['conteudo'] as $conteudo){
			$classeConteudo = new ConteudoModel($conteudo);
			if($json['nota'] == 0) {
				$classeConteudo -> setContNdv(1);
			} else if($json['nota'] == 1) {
				$classeConteudo -> setContRuim(1);
			} else {
				$classeConteudo -> setContBom(1);
			}
			$novoConteudo -> conteudo[] = $classeConteudo;
		}
	} catch	(Exception $e) {
		return $e;
	}
	
	switch($novoConteudo -> getTipoReq()){
		case "votar":{
			try {
				$dbQuery = new mySql();
				$dbQuery -> dbConnect();
				$retorno = $dbQuery -> selectWhereConteudo(
					'tb_content', 
					'id_content', 
					'content_type', 
					'=', 
					'=', 
					$novoConteudo -> conteudo[0] -> getIdConteudo(), 
					$novoConteudo -> getTipoReq(), 
					'int', 
					'char'
				);
				if (mysqli_num_rows($retorno) > 0) {
					while ($linha = mysqli_fetch_assoc($retorno)) {
						//Update em linha existente
						$meubanco -> dbDisconnect();
					}
				} else {
					$novoConteudo -> conteudo[0] -> calcularNota();
					$valores[0]["val"] = $novoConteudo -> conteudo[0] -> getIdConteudo();
					$valores[0]["type"] = 'int';
					$valores[1]["val"] = $novoConteudo -> getTipoConteudo();
					$valores[1]["type"] = 'char';
					$valores[2]["val"] = $novoConteudo -> conteudo[0] -> getContBom();
					$valores[2]["type"] = 'int';
					$valores[3]["val"] = $novoConteudo -> conteudo[0] -> getContRuim();
					$valores[3]["type"] = 'int';
					$valores[4]["val"] = $novoConteudo -> conteudo[0] -> getContDnv();
					$valores[4]["type"] = 'int';
					$valores[5]["val"] = $novoConteudo -> conteudo[0] -> getNotaConteudo();
					$valores[5]["type"] = 'int';
					$valores[6]["val"] = ''
					$valores[6]["type"] = 'char';
					
					$dbQuery -> insertInto(
						'tb_content', 
						$valores
					);
					$meubanco -> dbDisconnect();
					return 0;
				}
			} catch (Exception $e) {
				$dbQuery -> dbDisconnect();
			}
		};break;
		case "obter":{
			try {
				$dbQuery = new mySql();
				$dbQuery -> dbConnect();
				$retorno = $dbQuery -> selectWhereConteudo(
					'tb_content', 
					'id_content', 
					'content_type', 
					'=', 
					'=', 
					$novoConteudo -> conteudo[0] -> getIdConteudo(), 
					$novoConteudo -> getTipoReq(), 
					'int', 
					'char'
				);
				if (mysqli_num_rows($retorno) > 0) {
					while ($linha = mysqli_fetch_assoc($retorno)) {
						$meubanco -> dbDisconnect();
						$novoConteudo -> conteudo[0] -> setContBom($linha["cont_good"]);
						$novoConteudo -> conteudo[0] -> setContRuim($linha["cont_bad"]);
						$novoConteudo -> conteudo[0] -> setContNdv($linha["cont_ndv"]);
						$novoConteudo -> conteudo[0] -> calcularNota();
						return $novoConteudo -> conteudo[0] -> getNotaConteudo();
					}
				} else {
					$meubanco -> dbDisconnect();
					return 0;
				}
			} catch (Exception $e) {
				$dbQuery -> dbDisconnect();
			}
		};break;
		default:{
			
		};break;
	}
?>

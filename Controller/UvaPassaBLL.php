<?php
	include ('../Model/UvaPassaModel.php');
	include ('../Model/ConteudoModel.php');
	include ('../Controller/MySQL.php');
	
	try {
		$novoConteudo = new UvaPassaModel();
        if(isset($_POST['tipoReq'])) {
            $novoConteudo -> setTipoReq($_POST['tipoReq']);
        }
        if(isset($_POST['tipoConteudo'])) {
            $novoConteudo -> setTipoConteudo($_POST['tipoConteudo']);
        }
        if(isset($_POST['tipoConteudo'])) {
            $classeConteudo = new ConteudoModel($_POST['conteudo']);
            if($_POST['nota'] == 0) {
                $classeConteudo -> setContNdv(1);
            } else if($_POST['nota'] == 1) {
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
					$novoConteudo -> getTipoConteudo(), 
					'int', 
					'char'
				);
				if (mysqli_num_rows($retorno) > 0) {
					while ($linha = mysqli_fetch_assoc($retorno)) {
						//Update em linha existente
						$dbQuery -> dbDisconnect();
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
					$valores[4]["val"] = $novoConteudo -> conteudo[0] -> getContNdv();
					$valores[4]["type"] = 'int';
					$valores[5]["val"] = $novoConteudo -> conteudo[0] -> getNotaConteudo();
					$valores[5]["type"] = 'int';
					$valores[6]["val"] = '';
					$valores[6]["type"] = 'char';
					$dbQuery -> insertInto(
						'tb_content', 
						$valores
					);
					$dbQuery -> dbDisconnect();
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
					$novoConteudo -> getTipoConteudo(), 
					'int', 
					'char'
				);
				if (!$retorno || mysqli_num_rows($retorno) > 0) {
					while ($linha = mysqli_fetch_assoc($retorno)) {
						$dbQuery -> dbDisconnect();
						$novoConteudo -> conteudo[0] -> setContBom($linha["cont_good"]);
						$novoConteudo -> conteudo[0] -> setContRuim($linha["cont_bad"]);
						$novoConteudo -> conteudo[0] -> setContNdv($linha["cont_ndv"]);
						$novoConteudo -> conteudo[0] -> calcularNota();
						echo $novoConteudo -> conteudo[0] -> getNotaConteudo();
					}
				} else {
					$dbQuery -> dbDisconnect();
					echo 0;
				}
			} catch (Exception $e) {
				$dbQuery -> dbDisconnect();
			}
		};break;
		default:{
		};break;
	}
?>

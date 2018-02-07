<?php
	class UvaPassaModel {
		private $tipoReq;
		private $tipoConteudo;
		private $conteudo;
		
		private function getTipoReq(){
			return $this -> tipoReq;
		}
		private function setTipoReq($tipoReq){
			$this -> tipoReq = $tipoReq;
		}
		
		private function getTipoConteudo(){
			return $this -> tipoConteudo;
		}
		private function setTipoConteudo($tipoConteudo){
			$this -> tipoConteudo = $tipoConteudo;
		}
		
	}
?>

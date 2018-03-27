<?php
	class UvaPassaModel {
		public $tipoReq;
		public $tipoConteudo;
		public $conteudo;
		
		public function getTipoReq(){
			return $this -> tipoReq;
		}
        public function setTipoReq($tipoReq){
			$this -> tipoReq = $tipoReq;
		}

        public function getTipoConteudo(){
			return $this -> tipoConteudo;
		}
        public function setTipoConteudo($tipoConteudo){
			$this -> tipoConteudo = $tipoConteudo;
		}
		
	}
?>

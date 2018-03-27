<?php
	class ConteudoModel {
		private $idConteudo;
		private $contBom;
		private $contRuim;
		private $contNdv;
		private $notaConteudo;
		
		function __construct($idConteudo){
			$this -> setIdConteudo($idConteudo); 
			$this -> setContBom(0);
			$this -> setContRuim(0);
			$this -> setContNdv(0);
			$this -> setNotaConteudo(0);
		}
		
		public function getIdConteudo(){
			return $this -> idConteudo;
		}
        public function setIdConteudo($idConteudo){
			$this -> idConteudo = $idConteudo;
		}

        public function getContBom(){
			return $this -> contBom;
		}
        public function setContBom($contBom){
			$this -> contBom = $contBom;
		}

        public function getContRuim(){
			return $this -> contRuim;
		}
        public function setContRuim($contRuim){
			$this -> contRuim = $contRuim;
		}

        public function getContNdv(){
			return $this -> contNdv;
		}
        public function setContNdv($contNdv){
			$this -> contNdv = $contNdv;
		}

        public function getNotaConteudo(){
			return $this -> notaConteudo;
		}
        public function setNotaConteudo($notaConteudo){
			$this -> notaConteudo = $notaConteudo;
		}

        public function calcularNota(){
			$notaFinal = 0;
			$val = max($this -> contBom, $this -> contRuim, $this -> contNdv);
			if($val == $this ->contBom) {
				$notaFinal = 2;
			} else if($val == $this ->contRuim) {
				$notaFinal = 1;
			} else if($val == $this ->contNdv) {
				$notaFinal = 0;
			}
		}
	}
?>

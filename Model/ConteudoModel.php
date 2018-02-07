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
		
		private function getIdConteudo(){
			return $this -> idConteudo;
		}
		private function setIdConteudo($idConteudo){
			$this -> idConteudo = $idConteudo;
		}
		
		private function getContBom(){
			return $this -> contBom;
		}
		private function setContBom($contBom){
			$this -> contBom = $contBom;
		}
		
		private function getContRuim(){
			return $this -> contRuim;
		}
		private function setContRuim($contRuim){
			$this -> contRuim = $contRuim;
		}
		
		private function getContNdv(){
			return $this -> contNdv;
		}
		private function setContNdv($contNdv){
			$this -> contNdv = $contNdv;
		}
		
		private function getNotaConteudo(){
			return $this -> notaConteudo;
		}
		private function setNotaConteudo($notaConteudo){
			$this -> notaConteudo = $notaConteudo;
		}
		
		private function calcularNota(){
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

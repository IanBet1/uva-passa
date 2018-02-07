<?php
	class dbConfig {
		protected $serverName;
		protected $userName;
		protected $passCode;
		protected $dbName;

		function dbConfig() {
			$this -> serverName = 'localhost';
			$this -> userName = 'root';
			$this -> passCode = '';
			$this -> dbName = 'dbUvaPassa';
		}
}
?>
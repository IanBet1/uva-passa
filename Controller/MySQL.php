<?php
	require('../Config/UvaPassaDB.php');
	class mySql extends dbConfig
	{
		public $connectionString;
		public $dataSet;
		private $sqlQuery;
		protected $databaseName;
		protected $hostName;
		protected $userName;
		protected $passCode;
		public function mySql()
		{
			$this -> connectionString = null;
			$this -> sqlQuery = null;
			$this -> dataSet = null;
			$dbPara = new dbConfig();
			$this -> databaseName = $dbPara -> dbName;
			$this -> hostName = $dbPara -> serverName;
			$this -> userName = $dbPara -> userName;
			$this -> passCode = $dbPara -> passCode;
			$dbPara = null;
		}
		public function dbConnect()
		{
			$this -> connectionString = mysqli_connect($this -> hostName, $this -> userName, $this -> passCode, $this -> databaseName);
			return $this -> connectionString;
		}
		public function dbDisconnect()
		{
			$this -> connectionString = null;
			$this -> sqlQuery = null;
			$this -> dataSet = null;
			$this -> databaseName = null;
			$this -> hostName = null;
			$this -> userName = null;
			$this -> passCode = null;
		}
		public function selectAll($tableName)
		{
			$this -> sqlQuery = 'SELECT * FROM '.$this -> databaseName.'.'.$tableName;
			$this -> dataSet = mysqli_query($this -> connectionString, $this -> sqlQuery);
			return $this -> dataSet;
		}
		public function selectWhere($tableName, $rowName, $operator, $value, $valueType)
		{
			$this -> sqlQuery = 'SELECT * FROM '.$this -> databaseName.'.'.$tableName.' WHERE '.$rowName.' '.$operator.' ';
			if ($valueType == 'int') {
				$this -> sqlQuery .= $value;
			} elseif ($valueType == 'char') {
				$this -> sqlQuery .= "'".$value."'";
			}
			$this -> dataSet = mysqli_query($this -> connectionString, $this -> sqlQuery);
			$this -> sqlQuery = null;
			return $this -> dataSet;
		}
		public function selectWhereConteudo($tableName, $rowName0, $rowName1, $operator0, $operator1, $value0, $value1, $valueType0, $valueType1)
		{
			$this -> sqlQuery = 'SELECT * FROM '.$this -> databaseName.'.'.$tableName.' WHERE '.$rowName0.' '.$operator0.' ';
			if ($valueType0 == 'int') {
				$this -> sqlQuery .= $value0;
			} elseif ($valueType0 == 'char') {
				$this -> sqlQuery .= "'".$value0."'";
			}
			$this -> sqlQuery .= ' AND '.$rowName1.' '.$operator1.' ';
			if ($valueType1 == 'int') {
				$this -> sqlQuery .= $value1;
			} elseif ($valueType1 == 'char') {
				$this -> sqlQuery .= "'".$value1."'";
			}
			$this -> dataSet = mysqli_query($this -> connectionString, $this -> sqlQuery);
			$this -> sqlQuery = null;
			return $this -> dataSet;
		}
		public function insertInto($tableName, $values)
		{
			$j = count($values);
			$i = null;
			$this -> sqlQuery = 'INSERT INTO '.$tableName.' VALUES (';
			$i = 0;
			while ($i < $j) {
				if ($values[$i]["type"] == "char") {
					$this -> sqlQuery .= "'";
					$this -> sqlQuery .= $values[$i]["val"];
					$this -> sqlQuery .= "'";
				} elseif ($values[$i]["type"] == 'int') {
					$this -> sqlQuery .= $values[$i]["val"];
				}
				if($i != $j-1){
					$this -> sqlQuery .= ',';
				}
				$i++;
			}
			$this -> sqlQuery .= ')';
			mysqli_query($this -> connectionString, $this -> sqlQuery);
			return $this -> sqlQuery;
		}
		public function updateData($tableName, $rowName0, $rowName1, $rowName2, $values)
		{
			$j = count($values);
			$i = null;
			$this -> sqlQuery = 'UPDATE '.$tableName.' SET '.$rowName0.' = '.$rowName0.' + '.$values[0]["val"].' WHERE '.$rowName1.' = '.$values[1]["val"].' AND '.$rowName2.' = '."'".$values[2]["val"]."'";
			var_dump($this -> sqlQuery);
			mysqli_query($this -> connectionString, $this -> sqlQuery);
			return $this -> sqlQuery;
		}
		public function selectFreeRun($query)
		{
			$this -> dataSet = mysqli_query($this -> connectionString, $query);
			return $this -> dataSet;
		}
		public function freeRun($query)
		{
			return mysqli_query($this -> connectionString, $query);
		}
	}
?>
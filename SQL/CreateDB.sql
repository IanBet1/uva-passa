CREATE DATABASE IF NOT EXISTS dbUvaPassa;
USE dbUvaPassa;

CREATE TABLE IF NOT EXISTS tb_content (
	id_content INT NOT NULL,
	content_type CHAR(1) NOT NULL,
	cont_good INT NOT NULL,
	cont_bad INT NOT NULL,
	cont_ndv INT NOT NULL,
	cont_critics INT NOT NULL,
	comm_critics VARCHAR(280),
	PRIMARY KEY (id_content, content_type)
);
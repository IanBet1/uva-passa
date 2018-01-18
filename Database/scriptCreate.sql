CREATE DATABASE IF NOT EXISTS db_uvapassa;
USE db_uvapassa;

CREATE TABLE IF NOT EXISTS tb_movie (
  id_movie INT NOT NULL,
  cont_good INT NOT NULL,
  cont_bad INT NOT NULL,
  cont_ndv INT NOT NULL,
  cont_critics INT NOT NULL,
  comm_critics VARCHAR(280) NOT NULL,
  PRIMARY KEY (id_movie)
);

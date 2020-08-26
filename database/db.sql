CREATE DATABASE sistema_mantenimiento;

USE sistema_mantenimiento;

CREATE TABLE usuarios (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL
);

ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

ALTER TABLE usuarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE usuarios;

INSERT INTO usuarios (id, username, password) 
  VALUES (1, 'john', 'password1');

SELECT * FROM usuarios;

-- maquinas TABLE
CREATE TABLE lista_maquinas (
  id INT(11) NOT NULL,
  tipo boolean (10) NOT NULL,
            nombre_cliente INT (5) NOT NULL,
            marca VARCHAR(100) NOT NULL,
            modelo VARCHAR(100) NOT NULL,
            funcionamiento TEXT,
            observaciones TEXT,
  user_id INT(11),
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_listamaquina_user FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE lista_maquinas
  ADD PRIMARY KEY (id);

ALTER TABLE lista_maquinas
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE lista_maquinas;

-- productos TABLE
CREATE TABLE lista_productos (
  id INT(11) NOT NULL,
  producto VARCHAR (100) NOT NULL,
            cantidad INT (5) NOT NULL,
            precio_por_lote VARCHAR(100) NOT NULL,
            precio_unitario VARCHAR(100) NOT NULL,
            codificacion TEXT,
            peso TEXT,
            medida TEXT,
  user_id INT(11),
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_listruser FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE lista_productos
  ADD PRIMARY KEY (id);

ALTER TABLE lista_productos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE lista_productos;

-- SERVICIO TABLE
CREATE TABLE servicio (
  id INT(11) NOT NULL,
  tipo VARCHAR (100) NOT NULL,
  cantidad INT (5) NOT NULL,
  nombre_cliente VARCHAR(100) NOT NULL,
  cedula VARCHAR(100) NOT NULL,
  modelo TEXT,
  marca TEXT,
  falla TEXT,
  reparaciones_hechas TEXT,
  user_id INT(11),
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user2 FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE servicio
  ADD PRIMARY KEY (id);

ALTER TABLE servicio
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE servicio;


CREATE DATABASE IF NOT EXISTS sistema_mantenimiento;

USE sistema_mantenimiento;

CREATE TABLE IF NOT EXISTS usuarios (
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
CREATE TABLE IF NOT EXISTS lista_maquinas (
  id INT(11) NOT NULL,
  tipo boolean (10) NOT NULL,
            nombre_cliente INT (5) NOT NULL,
            marca VARCHAR(100) NOT NULL,
            modelo VARCHAR(100) NOT NULL,
            funcionamiento TEXT,
            observaciones TEXT,
  user_id INT(11),
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_maquina_user FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE lista_maquinas
  ADD PRIMARY KEY (id);

ALTER TABLE lista_maquinas
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE lista_maquinas;

-- productos TABLE
CREATE TABLE IF NOT EXISTS lista_productos (
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
  CONSTRAINT fk_Productos_user FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE lista_productos
  ADD PRIMARY KEY (id);

ALTER TABLE lista_productos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE lista_productos;

-- SERVICIO TABLE
CREATE TABLE IF NOT EXISTS servicio (
  id INT(11) NOT NULL,
  tipo VARCHAR (100) NOT NULL,
  cantidad INT (5) NOT NULL,
  nombre_cliente VARCHAR(100) NOT NULL,
  cedula VARCHAR(100) NOT NULL,
  modelo VARCHAR(20),
  marca VARCHAR(20),
  falla TEXT,
  reparaciones_hechas TEXT,
  local  boolean(10),
  user_id INT(11),
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_servicio_user FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE servicio
  ADD PRIMARY KEY (id);

ALTER TABLE servicio
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE servicio;
-- tabla herramientas
CREATE TABLE IF NOT EXISTS herramientas (
  id INT(11) NOT NULL,
  tipo VARCHAR (100) NOT NULL,
  cantidad INT (5) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  detalles VARCHAR(100) NOT NULL,
  marca VARCHAR(20),
  user_id INT(11),
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_herramientas_user FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE herramientas
  ADD PRIMARY KEY (id);

ALTER TABLE herramientas
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE herramientas;

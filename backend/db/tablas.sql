USE consultasdb;

CREATE TABLE PERSONA (
	cedula CHAR(9),
    email VARCHAR(50) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    primerApellido VARCHAR(15) NOT NULL,
    segundoApellido VARCHAR(15) NOT NULL,
    CONSTRAINT U_email UNIQUE (email),
    CONSTRAINT PK_Persona PRIMARY KEY (cedula)
);

CREATE TABLE USUARIO (
	cedulaPersona CHAR(9) NOT NULL,
    nombreUsuario VARCHAR(255),
    passwordHash BINARY(64) NOT NULL,
    salt VARCHAR(36), -- UUID() value
    CONSTRAINT PK_Usuario PRIMARY KEY (nombreUsuario),
    CONSTRAINT FK_Usuario_Persona FOREIGN KEY (cedulaPersona)
		REFERENCES PERSONA(cedula),
	CONSTRAINT U_nombreUsuario UNIQUE (nombreUsuario)
);

CREATE TABLE PROFESOR (
	cedula CHAR(9),
    CONSTRAINT PK_Profesor PRIMARY KEY (cedula),
    CONSTRAINT FK_Profesor_Persona FOREIGN KEY (cedula)
		REFERENCES PERSONA(cedula)
);

CREATE TABLE ESTUDIANTE (
	cedula CHAR(9),
    carne CHAR(6) NOT NULL,
    CONSTRAINT U_carne UNIQUE (carne),
    CONSTRAINT PK_Estudiante PRIMARY KEY (cedula),
    CONSTRAINT FK_Estudiante_Persona FOREIGN KEY (cedula)
		REFERENCES PERSONA(cedula)
);

CREATE TABLE CURSO (
	sigla CHAR(7),
	nombre VARCHAR(100) NOT NULL,
	CONSTRAINT PK_Curso PRIMARY KEY (sigla)
);

CREATE TABLE GRUPO (
	siglaCurso CHAR(7),
	numGrupo INT,
	semestre INT,
	anno INT,
	CONSTRAINT PK_Grupo PRIMARY KEY  (siglaCurso, numGrupo, semestre, anno),
	CONSTRAINT FK_Grupo_Curso FOREIGN KEY (siglaCurso)
		REFERENCES CURSO (sigla)
);

CREATE TABLE IMPARTE (
	cedProf CHAR(9),
	siglaCurso CHAR(7),
	numGrupo INT,
	semestre INT,
	anno INT,
    CONSTRAINT PK_Imparte PRIMARY KEY  (cedProf, siglaCurso, numGrupo, semestre, anno),
    CONSTRAINT FK_Imparte_Profesor FOREIGN KEY (cedProf)
		REFERENCES PROFESOR (cedula),
    CONSTRAINT FK_Imparte_Grupo FOREIGN KEY (siglaCurso, numGrupo, semestre, anno)
		REFERENCES GRUPO (siglaCurso, numGrupo, semestre, anno)
);

CREATE TABLE LLEVA (
	cedEst CHAR(9),
	siglaCurso CHAR(7),
	numGrupo INT,
	semestre INT,
	anno INT,
	CONSTRAINT PK_Lleva PRIMARY KEY  (cedEst, siglaCurso, numGrupo, semestre, anno),
	CONSTRAINT FK_Lleva_Estudiante FOREIGN KEY (cedEst)
		REFERENCES ESTUDIANTE (cedula),
	CONSTRAINT FK_Lleva_Grupo FOREIGN KEY (siglaCurso, numGrupo, semestre, anno)
		REFERENCES GRUPO (siglaCurso, numGrupo, semestre, anno)
);

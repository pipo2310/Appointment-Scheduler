use consultasdb;

DELIMITER $$
CREATE FUNCTION loginUsuario (usuario VARCHAR(255), pass VARCHAR(50))
	RETURNS BOOL
    DETERMINISTIC
BEGIN
	DECLARE res BOOL;
	DECLARE sal CHAR(36);
    DECLARE hashh BINARY(64);
    DECLARE ced CHAR(9);
    
	IF EXISTS ( SELECT cedulaPersona FROM USUARIO WHERE nombreUsuario=usuario LIMIT 1) THEN
		SET sal = (SELECT salt FROM USUARIO WHERE nombreUsuario=usuario);
        SET hashh = SHA2(concat(pass, sal), 256);
		SET ced = (SELECT cedulaPersona FROM USUARIO WHERE
			nombreUsuario = usuario AND
            passwordHash = hashh
		);
		IF (ced IS NULL) THEN
			SET res = FALSE;
		ELSE
			SET res = TRUE;
		END IF;
    ELSE
		SET res = FALSE;
	END IF;
	RETURN res;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION getRol (ced CHAR(9))
	RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE rol INT;
    
    SET rol = 0;
    
    IF EXISTS ( SELECT cedula FROM PROFESOR WHERE cedula=ced LIMIT 1) THEN
		SET rol = 1;
    ELSE
		IF EXISTS ( SELECT cedula FROM ESTUDIANTE WHERE cedula=ced LIMIT 1) THEN
			SET rol = 2;
		END IF;
	END IF;
    
    RETURN rol;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE conmutarLogueado (IN cedula CHAR(9))
BEGIN
  UPDATE USUARIO U SET logueado = (NOT U.logueado) WHERE U.cedulaPersona = cedula;
END $$
DELIMITER ;
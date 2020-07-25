<?php
    $server = "192.168.0.12:3306";
    $nombre_base_de_datos = "actividad2";
    $usuario = "adminact2";
    $contraseña = "Upds19.JG";
    try {
        return new PDO('mysql:host='.$server.';dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
    } catch (Exception $e) {
        echo "Ocurrió algo con la base de datos: " . $e->getMessage();
    }
?>
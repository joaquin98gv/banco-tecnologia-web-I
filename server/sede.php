<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    if (empty($_GET["idSede"])) {
        exit (json_encode(NULL));
    }
    $id = $_GET["idSede"];
    $bd = include_once "bd.php";
    if ($id == -1) {
        $sentencia = $bd->query("select * from Sede");
        $data = $sentencia->fetchAll(PDO::FETCH_OBJ);
    }else{
        $sentencia = $bd->prepare("select * from Sede where id = ?");
        $sentencia->execute([$id]);
        $data = $sentencia->fetchObject();
    }
    
    echo json_encode($data);
?>
<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: *");
    $jsonCliente = json_decode(file_get_contents("php://input"));
    if (!$jsonCliente) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Objeto no enviado"
        ]));
    }
    $bd = include_once "bd.php";
    $sentencia = $bd->prepare("insert into Cliente(NombreCompleto, Email, Pass, Telefono, Direccion) values (?,?,?,?,?)");
    $resultado = $sentencia->execute([$jsonCliente->NombreCompleto, $jsonCliente->Email, base64_encode($jsonCliente->Pass), $jsonCliente->Telefono, $jsonCliente->Direccion]);
    
    if ($resultado == false) {
        exit (json_encode([
            "status" => 500,
            "data" => null,
            "msg" => "Error al registrar"
        ]));
    }

    echo json_encode([
        "status" => 200,
        "data" => $jsonCliente,
        "msg" => "Registrado exitosamente"
    ]);
?>
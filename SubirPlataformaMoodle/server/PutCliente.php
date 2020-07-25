<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-Headers: *");
    if ($_SERVER["REQUEST_METHOD"] != "PUT") {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Solo acepto peticiones PUT"
        ]));
    }
    $jsonCliente = json_decode(file_get_contents("php://input"));
    if (!$jsonCliente) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Objeto no enviado"
        ]));
    }
    $bd = include_once "bd.php";
    $sentencia = $bd->prepare("UPDATE Cliente SET NombreCompleto = ?, Email = ?, Telefono = ?, Direccion = ? WHERE Id = ?");
    $resultado = $sentencia->execute([$jsonCliente->NombreCompleto, $jsonCliente->Email, $jsonCliente->Telefono, $jsonCliente->Direccion, $jsonCliente->Id]);
    
    if ($resultado == false) {
        exit (json_encode([
            "status" => 500,
            "data" => null,
            "msg" => "Error al editar"
        ]));
    }

    echo json_encode([
        "status" => 200,
        "data" => $jsonCliente,
        "msg" => "Editado exitosamente"
    ]);
?>
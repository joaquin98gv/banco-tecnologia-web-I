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
    $hoy = getdate();
    $stringHoy = strval($hoy['year'].'-'.$hoy['mon'].'-'.$hoy['mday'].' '.$hoy['hours'].':'.$hoy['minutes']);
    $sentencia = $bd->prepare("insert into Cuenta(Monto, FechaRegistro, IdCliente) values (?,?,?)");
    $resultado = $sentencia->execute([0, $stringHoy, $jsonCliente->Id]);
    
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
        "msg" => "Pago enviado exitosamente"
    ]);
?>
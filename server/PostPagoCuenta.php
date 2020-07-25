<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: *");
    $jsonT = json_decode(file_get_contents("php://input"));
    if (!$jsonT) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Objeto no enviado"
        ]));
    }
    $bd = include_once "bd.php";
    $hoy = getdate();
    $stringHoy = strval($hoy['year'].'-'.$hoy['mon'].'-'.$hoy['mday'].' '.$hoy['hours'].':'.$hoy['minutes']);

    // exit (json_encode($jsonT));
    $sentencia = $bd->prepare("insert into Transaccion(IdTipoTransaccion, Monto, FechaRegistro, Descripcion, IdCuenta, IdDestino) values (?,?,?,?,?,?)");
    $resultado = $sentencia->execute([ $jsonT->IdTipoTransaccion, intval($jsonT->Monto), $stringHoy, $jsonT->Descripcion, $jsonT->IdCuenta, $jsonT->IdDestino]);
    if ($resultado == false) {
        exit (json_encode([
            "status" => 500,
            "data" => null,
            "msg" => "Error al registrar"
        ]));
    }

    $sentencia = $bd->prepare("insert into Transaccion(IdTipoTransaccion, Monto, FechaRegistro, Descripcion, IdCuenta, IdDestino) values (?,?,?,?,?,?)");
    $resultado = $sentencia->execute([ 1, intval($jsonT->Monto), $stringHoy, $jsonT->Descripcion, $jsonT->IdDestino, $jsonT->IdCuenta ]);
    if ($resultado == false) {
        exit (json_encode([
            "status" => 500,
            "data" => null,
            "msg" => "Error al registrar"
        ]));
    }

    //Disminuir monto del que envia
    $sentencia = $bd->prepare("UPDATE Cuenta SET Monto = Monto - ? WHERE (`Id` = ?);");
    $resultado = $sentencia->execute([ intval($jsonT->Monto), $jsonT->IdCuenta ]);
    if ($resultado == false) {
        exit (json_encode([
            "status" => 500,
            "data" => null,
            "msg" => "Error al registrar"
        ]));
    }

    //Aumentar monto del que recibe
    $sentencia = $bd->prepare("UPDATE Cuenta SET Monto = Monto + ? WHERE (`Id` = ?);");
    $resultado = $sentencia->execute([ intval($jsonT->Monto), $jsonT->IdDestino ]);
    if ($resultado == false) {
        exit (json_encode([
            "status" => 500,
            "data" => null,
            "msg" => "Error al registrar"
        ]));
    }

    echo json_encode([
        "status" => 200,
        "data" => $jsonT,
        "msg" => "Registrado exitosamente"
    ]);
?>
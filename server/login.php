<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: *");
    $jsonLogin = json_decode(file_get_contents("php://input"));
    if (!$jsonLogin) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Objeto no enviado"
        ]));
    }
    $bd = include_once "bd.php";
    $sentencia = $bd->prepare("Select c.Id, c.NombreCompleto, c.Email, c.Pass, cu.Monto from Cliente c left join Cuenta cu on c.Id = cu.IdCliente where c.Email = ?");
    $sentencia->execute([$jsonLogin->Email]);
    $data = $sentencia->fetchObject();
    if ($data == false) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Correo no encontrado"
        ]));
    }
    if (base64_decode($data->Pass) == $jsonLogin->Pass) {
        echo json_encode([
            "status" => 200,
            "data" => $data,
            "msg" => "Credenciales correctas"
        ]);
    } else {
        echo json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Contraseña incorrecta"
        ]);
    }
    
?>
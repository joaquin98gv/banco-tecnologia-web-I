<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    if (empty($_GET["idCliente"])) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Id no enviado"
        ]));
    }
    $id = $_GET["idCliente"];
    $bd = include_once "bd.php";
    
    $sentencia = $bd->prepare("select cl.Id, cl.NombreCompleto, cl.Email, cl.Telefono, cu.Id as IdCuenta, cu.Monto from Cliente cl left join Cuenta cu on cl.Id = cu.IdCliente where cl.Id = ?");
    $sentencia->execute([$id]);
    $data = $sentencia->fetchObject();
    
    if ($data == false) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "No existe cliente con este Id"
        ]));
    }

    echo json_encode([
        "status" => 200,
        "data" => $data,
        "msg" => "Data obtenida correctamente"
    ]);
?>
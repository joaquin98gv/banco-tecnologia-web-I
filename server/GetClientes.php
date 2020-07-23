<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");

    $bd = include_once "bd.php";
    $sentencia = $bd->query("select cl.Id, cl.NombreCompleto, cl.Email, cl.Telefono, cu.Monto from Cliente cl left join Cuenta cu on cl.Id = cu.IdCliente");
    $data = $sentencia->fetchAll(PDO::FETCH_OBJ);
    
    echo json_encode([
        "status" => 200,
        "data" => $data,
        "msg" => "Data obtenida correctamente"
    ]);
?>
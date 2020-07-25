<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    if (empty($_GET["idCuenta"])) {
        exit (json_encode([
            "status" => 400,
            "data" => null,
            "msg" => "Id no enviado"
        ]));
    }
    $id = $_GET["idCuenta"];
    $bd = include_once "bd.php";
    
    $sentencia = $bd->prepare("select t.Monto, t.FechaRegistro, tt.Nombre as 'TipoTransaccion', t.IdTipoTransaccion, t.Descripcion, clo.NombreCompleto as 'ClienteOrigen', cld.NombreCompleto as 'ClienteDestino' from Transaccion t 
    left join TipoTransaccion tt on t.IdTipoTransaccion = tt.Id 
    left join Cuenta co on t.IdCuenta = co.Id 
    left join Cuenta cd on t.IdDestino = cd.Id 
    left join Cliente clo on co.IdCliente = clo.Id 
    left join Cliente cld on cd.IdCliente = cld.Id 
    where IdCuenta = ?");
    $sentencia->execute([$id]);
    $data = $sentencia->fetchAll(PDO::FETCH_OBJ);

    echo json_encode([
        "status" => 200,
        "data" => $data,
        "msg" => "Data obtenida correctamente"
    ]);
?>
<?php
    $hoy = getdate();
    print_r($hoy);
    echo ($hoy['year'].'-'.$hoy['mon'].'-'.$hoy['mday'].' '.$hoy['hours'].':'.$hoy['minutes']);
?>
<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@ss", "contacts")

    if ($sqlConn->connect_error) {
        sendJson('{"success": false}')
    }
    $stmt = $sqlConn->prepare("SELECT * FROM contact_info")
    $stmt->execute();
    $result = $stmt->get_result();

    sendJson($result)

    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
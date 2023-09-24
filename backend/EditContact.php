<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331");

    if ($sqlConn->connect_error) {
        sendJson('{"message": "Error connecting to database", "code": 401}');
    }

    $stmt = $sqlConn->prepare("UPDATE contact_info SET name=?, email=?, phone=? WHERE username=?");
    $stmt->bind_param("ssss", $inData["contactName"], $inData["contactEmail"], $inData["contactPhoneNumber"], $inData["username"]);
    $stmt->execute();
    $result = $stmt->get_result();

    sendJson('{"message": "Successfully updated contact", "code": 200}');

    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
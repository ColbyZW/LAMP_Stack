<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331");
    
    if ($sqlConn->connect_error) {
        sendJson('{"message": "Error connecting to database", "code": 401}');
    }
    $uuid = uniqid();

    $stmt = $sqlConn->prepare("INSERT INTO contact_info (name, email, phone, username, uuid) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $inData["contactName"], $inData["contactEmail"], $inData["contactNumber"], $inData["username"], $uuid);
    $stmt->execute();
    
    sendJson('{"message": "Successfully added contact", "code": 200}');
    
    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
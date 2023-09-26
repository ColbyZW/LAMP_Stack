<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@SS", "COP4331");
    
    if ($sqlConn->connect_error) {
        sendJson('{"message": "Error connecting to database", "code": 401}');
    }
    $uuid = uniqid();

    $stmt = $sqlConn->prepare("INSERT INTO contact_info (username, contactName, contactNumber, uuid) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $inData["username"], $inData["contactName"], $inData["contactNumber"], $uuid);
    $stmt->execute();
    
    sendJson('{"message": "Successfully added contact", "code": 200}');
    
    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
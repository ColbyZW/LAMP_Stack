<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "YourPassword", "YourDatabase");
    
    if ($sqlConn->connect_error) {
        sendJson('{"message": "Error connecting to database", "code": 401}');
    }
    
    $stmt = $sqlConn->prepare("INSERT INTO contact_info (username, contactName, contactNumber) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $inData["username"], $inData["contactName"], $inData["contactNumber"]);
    $stmt->execute();
    
    sendJson('{"message": "Successfully added contact", "code": 200}');
    
    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
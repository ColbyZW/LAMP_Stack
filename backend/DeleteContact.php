<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331");

    if ($sqlConn->connect_error) {
        sendJson('{"message": "Error connecting to database", "code": 401}');
    }

    $stmt = $sqlConn->prepare("DELETE FROM contact_info WHERE username=? AND uuid=?");
    $stmt->bind_param("ss", $inData["username"], $inData["contactId"]);
    $stmt->execute();
    $result = $stmt->get_result();

    sendJson('{"message": "Successfully deleted contact", "code": 200}');

    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
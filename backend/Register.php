<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331");

    if ($sqlConn->connect_error) {
        sendJson('{"message": "Error connecting to database",
                   "code": 401}');
    }
    $stmt = $sqlConn->prepare("SELECT * FROM users WHERE username = " . $inData["username"]);
    $stmt->execute();
    $result = $stmt->get_result();

    $matches = 0;
    while ( $row = $result->fetch_assoc() ) {
        $matches++;
    }

    if ( $matches != 0 ) {
        sendJson('{"message": "User with this name already exists",
                   "code": 400}');
    } else {
        $stmt = $sqlConn->prepare("INSERT INTO users(username,password) VALUES(?,?)");
        $stmt->bind_param("ss", $inData["username"], $inData["password"]);
        $stmt->execute();
        $sqlConn->close();

        sendJson('{"message": "Successfully created user",
                   "code": "200",
                   "username": ' . $inData["username"] . '}');
    }




    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
<?php
/*
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@ss", "contacts");

    if ($sqlConn->connect_error) {
        sendJson('{"success": false}');
    }
    $stmt = $sqlConn->prepare("SELECT * FROM contact_info");
    $stmt->execute();
    $result = $stmt->get_result();

    sendJson($result);

    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
    */
    session_start();
    //login info
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = 'SPL-16P@ss';
    $DATABASE_NAME = 'COP4331';
    
    //connect
    $con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);

    if ( mysqli_connect_errno() ) {
        // If there is an error with the connection, stop the script and display the error.
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    // Check if the data from the login form was submitted, isset() will check if the data exists.
    if ( !isset($_POST['username'], $_POST['password']) ) {
	// Could not get the data that should have been sent.
	exit('Please fill both the username and password fields!');
}
?>
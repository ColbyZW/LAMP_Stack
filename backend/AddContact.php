<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    
    $sqlConn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331");
    
    if ($sqlConn->connect_error) {
        sendJson('{"message": "Error connecting to database", "code": 401}');
    }
    $uuid = uniqid();
    $date = date("Y/m/d");

    $stmt = $sqlConn->prepare("INSERT INTO contact_info (name, email, phone, username, uuid, date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $inData["contactName"], $inData["contactEmail"], $inData["contactNumber"], $inData["username"], $uuid, $date);
    $stmt->execute();
    $stmt->close();

    $stmt = $sqlConn->prepare("SELECT name,email,phone,uuid FROM contact_info WHERE username=?"); //where UserID is the id we got from this 
    $stmt->bind_param("s", $inData["username"]);
    $stmt->execute();
    $result = $stmt->get_result();

    while( $row = $result->fetch_assoc()  )
    {
        if($searchCount > 0)
        {
            $searchResults .= ",";
        }
        $searchCount++;
        $searchResults .= 
            '{' 
            . '"contactName":' . '"' . $row["name"] . '"' . ","
            . '"contactEmail":' . '"' . $row["email"] . '"'  . ","
            . '"contactPhoneNumber":' . '"' . $row["phone"] . '"' . ","
            . '"uuid":' . '"' . $row["uuid"] . '"'
            . '}';
    }

    if($searchCount > 0)
    {
        returnWithInfo($searchResults);
    }
    else
    {
        returnWithInfo("");
    }
    
    $stmt->close();

	function sendResultInfoAsJson( $obj )
	{
		header('Content-Type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{Error: ' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '], "code": 200}';
		sendResultInfoAsJson( $retValue );
	}

    function sendJson ($obj) {
        header('Content-Type: application/json');
        echo $obj;
    }
?>
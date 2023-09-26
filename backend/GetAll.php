<?php

    $inData = $_GET["username"];

    $searchCount = 0;
    $searchResults = "";

    $conn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331");//not sure what to put in here

    if($conn -> connect_error)
    {
        returnWithError("Conn ran into connect error");
    }
    else
    {
        $stmt = $conn->prepare("SELECT name,email,phone FROM contact_info WHERE username=?"); //where UserID is the id we got from this 
        $stmt->bind_param("s", $inData);
        $stmt->execute();
        $result = $stmt->get_result();

        while( $row = $result->fetch_assoc()  )
		{
            if($searchCount > 0)
            {
				$searchResults .= "";
			}
			$searchCount++;
			$searchResults .= 
                '{' 
                . '"contactName:"' . $row["name"] . ","
                . '"contactEmail:"' . $row["email"]  . ","
                . '"contactPhoneNumber:"' . $row["phone"] . ","
                . '},';
        }

        if($searchCount > 0)
        {
            returnWithInfo($searchResults);
        }
        else
        {
            returnWithError("User has no contacts");
        }

        $usIDsrch->close();
        $userIDconn->close();
        $stmt->close();
        $conn->close();
    }

    //Right now, I'm just snatching this from their example, I don't even know if the input is 
    //formatted like a json
    // payload should be : {username: ""}
    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

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
?>

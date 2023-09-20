<?php

    $inData = getRequestInfo();

    $searchCount = 0;
    $searchResults = "";

    $userIDconn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331"); // have to hook this one up in 
    $conn = new mysqli("localhost", "root", "SPL-16P@ss", "COP4331");//not sure what to put in here

    if(($conn -> connect_error) || ($userIDconn -> connect_error))
    {
        returnWithError("Conn ran into connect error, tell Hyrum to do something about this");
    }
    else
    {
        $usIDsrch = $userIDconn->prepare("SELECT user_id FROM users WHERE username=?");
        $usIDsrch->bind_param("s", $inData["username"]);
        $usIDsrch->execute();
        $usID = $usIDsrch->get_result();

        if( ($row = $usID->fetch_assoc()) == false  ) //can I do that?
		{
			returnWithError("Username not found");
		}

        $stmt = $conn->prepare("SELECT name,email,phone FROM contact_info WHERE user_id=?"); //where UserID is the id we got from this 
        $stmt->bind_param("i", $usID);
        $stmt->execute();
        $result = $stmt->get_result();

        while( $row = $result->fetch_assoc()  )
		{
            if($searchCount > 0)
            {
				$searchResults .= ";";
			}
			$searchCount++;
			$searchResults .= '"' . $row["name"] . "," . $row["email"]  . "," . $row["phone"] .'"';
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
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{Error: ' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>

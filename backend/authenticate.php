<?php
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

    // Now we check if the data from the login form was submitted, isset() will check if the data exists.
if ( !isset($_POST['username'], $_POST['password']) ) {
	// Could not get the data that should have been sent.
	exit('Please fill both the username and password fields!');
}

// Prepare our SQL, preparing the SQL statement will prevent SQL injection.
if ($stmt = $con->prepare('SELECT id, password FROM users WHERE username = ?')) {
	// Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
	    /*bind types:
            i	corresponding variable has type int
            d	corresponding variable has type float
            s	corresponding variable has type string
            b	corresponding variable is a blob and will be sent in packets
        */

    $stmt->bind_param('s', $_POST['username']);

    $stmt->execute();
    
    // Store the result so we can check if the account exists in the database.
	$stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $password);
        $stmt->fetch();
        // If account exists, now we verify the password.
        // Note: remember to use password_hash in your registration file to store the hashed passwords.
        
        //Use this if statement for MD5 hashed passwords.
        if (md5($_POST['password']) === $password) {
        
        //Use this if statement for plain text passwords. For testing only.
        //if ($_POST['password'] === $password) {

            // Verification success! User has logged-in!
            // Create sessions, so we know the user is logged in, they basically act like cookies but remember the data on the server.
            session_regenerate_id();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['name'] = $_POST['username'];
            $_SESSION['id'] = $id;
            header('Location: /backend/home.php');
            exit;
        } else {
            // Incorrect password
            echo 'Incorrect username and/or password!';
        }
    } else {
        // Incorrect username
        echo 'Check your username and/or password!';
    }
	$stmt->close();
}
?>
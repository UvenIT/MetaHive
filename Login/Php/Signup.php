<?php
	session_start();
	include("../../connect.php");

	$polaczenie = new mysqli($server, $user, $pass, $baza);

	if($polaczenie->connect_errno!=0){
		
		echo "Error:".$polaczenie->connect_errno;
		
	}else{
    	$sql = $polaczenie->query("SELECT * FROM `users`");
    	while($row = mysqli_fetch_array($sql)){
        	$actualids = $row['UID'];
        }
        $id = uniqid();
        $name = $_POST['name'];
        $surname = $_POST['surname'];
		$email = $_POST['email'];
		$password = $_POST['password'];
        $terms = $_POST['terms'];
    	$setterms = isset($terms);

    	$pytanie = $polaczenie->query("INSERT INTO `users` (`UID`, `Name`, `Surname`, `Email`, `Password`, `Terms`) VALUES ('$id', '$name', '$surname', '$email', '$password', '$setterms');");
      	
            if($pytanie){
			$sql = "SELECT * FROM users WHERE Email='$email' AND Password='$password'";
            if($rezultat = $polaczenie->query($sql)){
              	$polaczenie->query("INSERT INTO `socialmedia` (`UID_social`) VALUES ('$id');");
              	$polaczenie->query("INSERT INTO `followers`(`UID_follow`) VALUES ('$id')");
                $ilu = $rezultat->num_rows;
                if($ilu>0){
                    $_SESSION['logged'] = true;
                    $wiersz = $rezultat->fetch_assoc();
                    $_SESSION['id'] = $wiersz['UID'];
                    $_SESSION['email'] = $wiersz['Email'];
                    $_SESSION['name'] = $wiersz['Name'];
                    $_SESSION['surname'] = $wiersz['Surname'];
                    $_SESSION['password'] = $wiersz['Password'];

                    unset($_SESSION['error']);
                    $rezultat->close();
                    header('Location: ../../index.php');
                	}else{
                    header('Location: ../login.html');
                	}
            	}
          $polaczenie->close();
          };
    };
    $polaczenie->close();
?>
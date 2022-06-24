<?php
	session_start();
	
	include("../../connect.php");

	$polaczenie = new mysqli($server, $user, $pass, $baza);

	if($polaczenie->connect_errno!=0)
	{
		echo "Error:".$polaczenie->connect_errno;
	}
	else
	{
		$login = $_POST['login'];
		$password = $_POST['password'];
		
		$sql = "SELECT * FROM `users`,`socialmedia`,`followers` WHERE Email='$login' AND Password='$password' AND UID_follow=UID AND UID_social=UID";
		
		if ($rezultat = $polaczenie->query($sql))
		{
			$ilu = $rezultat->num_rows;
			if($ilu>0)
		
			{
				$_SESSION['logged'] = true;
				$wiersz = $rezultat->fetch_assoc();
				$_SESSION['id'] = $wiersz['UID'];
				$_SESSION['email'] = $wiersz['Email'];
				$_SESSION['name'] = $wiersz['Name'];
				$_SESSION['surname'] = $wiersz['Surname'];
				$_SESSION['password'] = $wiersz['Password'];
              	$_SESSION['posts'] = $wiersz['Posts'];
              	$_SESSION['followers'] = $wiersz['Followers'];
              	$_SESSION['follow'] = $wiersz['Follow'];
                $txt = $_SESSION['password'];
				$nbtxt = strlen($txt);
				$enhaslo =  str_repeat("*", $nbtxt);
				$_SESSION['enhaslo'] = $enhaslo;
                
				unset($_SESSION['error']);
				$rezultat->close();
				header('Location: ../../index.php');
			}
			else
			{
				$_SESSION['error'] = '<span style="color:red">zly login lub haslo</span> ';
				header('Location: ../login.html');
			}
		}
		$polaczenie->close();
	}
?>
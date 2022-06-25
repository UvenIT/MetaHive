<?php
session_start();
include("../../connect.php");
$polaczenie = new mysqli($server, $user, $pass, $baza);


if($polaczenie->connect_errno!=0){
		echo "Error:".$polaczenie->connect_errno;
	}
	else{
        if (isset($_POST['uploadfile'])) {

            $filename = $_FILES["file"]["name"];
        
            $tempname = $_FILES["file"]["tmp_name"];
        
            $folder = "Images/".$filename;
            
            $id = $_SESSION['id'];

            $sql = "UPDATE `profileimages` SET `filesrc`='$filename' WHERE `UID_image`='$id'";

            $polaczenie->query($sql);       

            if (move_uploaded_file($tempname, $folder)) {
                $select = "SELECT `filesrc` FROM `profileimages` WHERE `UID_image`='$id'";
                if($result = $polaczenie->query($select)){
                    $numrows = $result->num_rows;
                    if($numrows>0){
                        $row = $result->fetch_assoc();
                        $_SESSION['profileimage'] = $row['filesrc'];
                    }
                }

                header('Location: ../../index.php');

            }else{

                $msg = "Failed to upload image";
                echo $msg;

            }
        }
    };
?>
<?php
	session_start();
	
	include("../../connect.php");

	$connect = new mysqli($server, $user, $pass, $baza);

	if($connect->connect_errno!=0)
	{
		echo "Error:".$connect->connect_errno;
	}
	else
	{
        $id = $_SESSION['id'];
        $idpost = uniqid();
        $tags = $_POST['posttags'];
        $text = $_POST['posttext'];
        $time = new DateTime();
		$date = $time->format('Y-m-d H:i:s');      
        
        $filename = $_FILES['addimg']['name'];
        if(isset($filename)) {
            $tempname = $_FILES['addimg']['tmp_name'];
            $folder = "Postimages/".$filename;
            move_uploaded_file($tempname, $folder);
            $sql = "INSERT INTO `posts`(`UID_posts`, `UID_post`, `tags`, `post_text`, `post_img`, `post_date`) VALUES ('$id','$idpost','$tags','$text','$filename','$date')";
            $connect->query("UPDATE `followers` SET `Posts`=`Posts`+ 1 WHERE `UID_follow`='$id'");
        }else{
            $sql = "INSERT INTO `posts`(`UID_posts`, `UID_post`, `tags`, `post_text`,`post_date`) VALUES ('$id','$idpost','$tags','$text','$date')";
            $connect->query("UPDATE `followers` SET `Posts`=`Posts`+ 1 WHERE `UID_follow`='$id'");
        }

        $select = "SELECT * FROM `posts`,`profileimages`,`users` WHERE UID_posts=UID AND UID=UID_image ORDER BY `post_date` DESC";
        if($result = $connect->query($select)){
                while($row = mysqli_fetch_array($result)){
                    $userimg = $row['filesrc'];
                    $username = $row['Name'];
                    $usersurname = $row['Surname'];
                    $postdate = $row['post_date'];
                    $posttag = $row['tags'];
                    $posttext = $row['post_text'];
                    $postimg = $row['post_img'];
                    $likes = $row['likes'];
                    $comment = $row['comment'];
                    if(empty($postimg)){
                        echo("
                        <div class='postbox'>
                            <div class='postbox-nav'>
                                <img src='ProfileInfo/Upload/Images/$userimg' alt='' srcset=''>
                                <div>
                                    <h5>$username $usersurname</h5>
                                    <p>$postdate</p>
                                </div>
                            </div>
                            <p class='postbox-tags'><a href='#'>$posttag</a></p>
                            <p class='postbox-text'>$posttext</p>
                            <div class='postbox-interactions'>
                                <div class='postbox-interactions-like'>
                                    <i class='fa-regular fa-heart fa-lg'></i>
                                    <p>$likes</p>
                                </div>
                                <div class='postbox-interactions-like'>
                                    <i class='fa-regular fa-message fa-lg'></i>
                                    <p>$comment</p>
                                </div>
                                <div class='postbox-interactions-like'>
                                    <i class='fa-regular fa-paper-plane fa-lg'></i>
                                </div>
                            </div>
                        </div>
                        ");
                    }else{
                        echo("
                        <div class='postbox'>
                            <div class='postbox-nav'>
                                <img src='ProfileInfo/Upload/Images/$userimg' alt='' srcset=''>
                                <div>
                                    <h5>$username $usersurname</h5>
                                    <p>$postdate</p>
                                </div>
                            </div>
                            <p class='postbox-tags'><a href='#'>$posttag</a></p>
                            <p class='postbox-text'>$posttext</p>
                            <img src='ProfileInfo/Addpost/Postimages/$postimg' alt='' class='postbox-img'>
                            <div class='postbox-interactions'>
                                <div class='postbox-interactions-like'>
                                    <i class='fa-regular fa-heart fa-lg'></i>
                                    <p>$likes</p>
                                </div>
                                <div class='postbox-interactions-like'>
                                    <i class='fa-regular fa-message fa-lg'></i>
                                    <p>$comment</p>
                                </div>
                                <div class='postbox-interactions-like'>
                                    <i class='fa-regular fa-paper-plane fa-lg'></i>
                                </div>
                            </div>
                        </div>
                    ");
                    }
                }
        }

        $connect->query($sql);
        
		$connect->close();
	}
?>
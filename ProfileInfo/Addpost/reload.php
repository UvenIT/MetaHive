<?php
	session_start();
	include("../../connect.php");

	$connect = new mysqli($server, $user, $pass, $baza);

	if($connect->connect_errno!=0){
		
		echo "Error:".$connect->connect_errno;
		
	}else{
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
                if(!$postimg){
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
    }
    $connect->close();
?>
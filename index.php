<?php
	session_start();

	if(!isset($_SESSION['logged'])){
		header("Location: ../LogOn/LogOn.php");
	}
?>

<!DOCTYPE html>
<html>
<head>
    <script src="heightmobile.js"></script>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>MetaHive</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>
    <nav>
        <h4 class="nav-text">Chats</h4>
        <img src="/ProfileInfo/Upload/Images/<?php echo $_SESSION['profileimage'] ?>" alt="" class="nav-image">
    </nav>
    <div class="profile-info d-none">
        <div class="profile-info-nav d-flex">
            <i class="fa-solid fa-chevron-left fa-lg"></i>
            <h4>Me</h4>
        </div>
        <div class="profile-img">
            <img src="/ProfileInfo/Upload/Images/<?php echo $_SESSION['profileimage'] ?>" alt="" class="profile-info-image">
            <p class="profile-name"><?php echo $_SESSION['name']." ". $_SESSION['surname'] ?></p>
        </div>
        <div class="profile-details">
            <div>
                <p>Posts</p>
                <p><?php echo $_SESSION['posts']?></p>
            </div>
            <div>
                <p>Followers</p>
                <p><?php echo $_SESSION['followers']?></p>
            </div>
            <div>
                <p>Follow</p>
                <p><?php echo $_SESSION['follow']?></p>
            </div>
        </div>
        <div class="profile-edit">
            <div class="profile-edit-heart">
                <img src="/UserInterface/heart.png">
                <p>Notification</p>
            </div>
            <div class="profile-edit-posts" onclick="reload()">
                <img src="/UserInterface/hashtag.png">
                <p>Explore</p>
            </div>
            <div class="profile-edit-links">
                <img src="/UserInterface/link.png" alt="">
                <p>Social media</p>
            </div>
            <div class="profile-edit-profile">
                <img src="/UserInterface/user.png" alt="">
                <p>Edit profile</p>
            </div>
            <div class="profile-edit-privacy">
                <img src="/UserInterface/padlock.png" alt="">
                <p>Privacy</p>
            </div>
          	<a href="logout.php">
            	<div class="profile-edit-logout">
                	<img src="/UserInterface/logout.png" alt="">
                	<p>Log out</p>
            	</div>
          	</a>
        </div>
        <div class="profile-socialmedia--active d-none">
            <div class="profile-socialmedia--active-container">
                <div class="profile-sm--box fb-box">
                    <img src="/UserInterface/icons8-facebook.svg">
                    <div>
                        <h5>Facebook</h5>
                        <p>Richard Hamilton</p>
                    </div>
                </div>
                <div class="profile-sm--box ins-box">
                    <img src="/UserInterface/icons8-instagram.svg">
                    <div>
                        <h5>Instagram</h5>
                        <p>Richard Hamilton</p>
                    </div>
                </div>
                <div class="profile-sm--box tw-box">
                    <img src="/UserInterface/icons8-twitter-circled.svg">
                    <div>
                        <h5>Twitter</h5>
                        <p>Richard Hamilton</p>
                    </div>
                </div>
                <div class="profile-sm--box sn-box">
                    <img src="/UserInterface/icons8-snapchat.svg">
                    <div>
                        <h5>Snapchat</h5>
                        <p>Richard Hamilton</p>
                    </div>
                </div>
                <div class="profile-sm--box tt-box">
                    <img src="/UserInterface/icons8-tiktok.svg">
                    <div>
                        <h5>Tiktok</h5>
                        <p>Richard Hamilton</p>
                    </div>
                </div>
                <p class="profile-sm-back">Back</p>
            </div>
        </div>
        <div class="profile-edit--active d-none">
            <div class="profile-file">
                <form action="ProfileInfo/Upload/uploadfile.php" method="post" enctype="multipart/form-data">
                    <div class="profile-file--input">
                        <input type="file" name="file" id="file" value="" accept="image/*">
                        <label for="file">Upload image</label>
                    </div>
                    <div class="profile-file--active d-none">
                        <h5>Upload new profile avatar</h5>
                        <div class="d-flex">
                            <input type="button" value="Back" class="uploadbackbutton">
                            <input type="submit" name="uploadfile" value="Upload">
                        </div>
                    </div>
                </form>
            </div>
            <div class="change-email">
                <p>Change email</p>
                <input type="text" placeholder="New Email">
            </div>
            <div class="change-password">
                <p>Change password</p>
                <input type="password" placeholder="New Password">
            </div>
            <p class="profile-edit-back">Back</p>
        </div>
        <div class="profile-explore d-none">
            <div class="profile-explore--nav">
                <i class="fa-solid fa-chevron-left fa-lg explore-back"></i>
                <h4>Explore</h4>
            </div>
            <div class="profile-explore--container">
                <div class="addpost">
                    <form action="ProfileInfo/Addpost/addpost.php" method="post" enctype="multipart/form-data" id="form-post">
                        <div class="d-flex align-middle inputs">
                            <img src="/ProfileInfo/Upload/Images/<?php echo $_SESSION['profileimage'] ?>" alt="" class="post-profile-img">
                            <div>
                                <input type="text" name="posttags" id="" class="add-tags" placeholder="Add tags e.g: #tags">
                                <textarea name="posttext" id="" class="add-text" maxlength="1024" placeholder="What's on your mind?"></textarea>
                            </div>
                        </div>
                        <img class="uploaded-img">
                        <div class="d-flex align-middle justify-content-between">
                            <div class="add-img">
                                <input type="file" name="addimg" id="add-img-input" class="add-img-input" accept="image/*" onchange="showPreview(event)" >
                                <label for="addimg"><i class="fa-regular fa-image fa-lg"></i></label>
                            </div>
                            <input type="submit" value="Done" name="addpost" class="addpost-submit" onclick="reloadwhenadd()">
                        </div>
                    </form>
                </div>
                <div class="posts">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="menu">
        <a href="#" class="chatsbutton menu-button--active"><i class="fa-solid fa-message"></i><p>Chats</p></a>
        <a href="#" class="usersbutton"><i class="fa-solid fa-users"></i><p>Users</p></a>
        <a href="#" class="stockbutton"><i class="fa-solid fa-arrow-trend-up"></i><p>Stock</p></a> 
    </div>
    <div class="maincolumn">
        <div class="maincolumn-chats">
            <div class="maincolumn-chats--input">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="">
            </div>
            <div class="maincolumn-chats--messages">
                <img src="/Avatars/1.svg" alt="">
                <div class="details">
                    <div>
                        <span class="status"></span>
                        <h5>Richard Hamilton</h5>
                    </div>
                    <p>Last message</p>
                </div>
            </div>
            <div class="maincolumn-chats--messages">
                <img src="/Avatars/2.svg" alt="">
                <div class="details">
                    <div>
                        <span class="status"></span>
                        <h5>Richard Hamilton</h5>
                    </div>
                    <p>Last message</p>
                </div>
            </div>
        </div>
        <div class="maincolumn-users d-none">
            <div class="maincolumn-users--box">
                <img src="/Avatars/1.svg" alt="">
                <h5>Richard Hamilton</h5>
            </div>
            <div class="line"></div>
            <div class="maincolumn-users--box">
                <img src="/Avatars/2.svg" alt="">
                <h5>Richard Hamilton</h5>
            </div>
        </div>
        <div class="maincolumn-stock d-none flex-column justify-content-between">
            <div class="maincolumn-stock--input">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" name="" crypto-search>
            </div>
            <div class="crypto-pages">
                <div crypto-cards-container class="crypto-container"></div>
                <div crypto-cards-page2></div>
            </div>
            <template crypto-card-template>
                <div class="maincolumn-stock--box">
                    <div>
                        <img src="" alt="" class="crypto-icon" crypto-icon>
                        <p class="crypto-symbol" crypto-symbol></p>
                    </div>
                    <p class="stock-price" crypto-price></p>
                    <p class="change-price" crypto-change></p>
                </div>
            </template>        
            <div class="maincolumn-stock-pagination">
                <i class="fa-solid fa-chevron-left fa-lg stock-arrow"></i>
                <h5 class="stock-page--number">1</h5>
                <i class="fa-solid fa-chevron-right fa-lg stock-arrow"></i>
            </div>
        </div>
    </div>
    <div class="extmaincontent">

    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src='main.js'></script>
<script src='ProfileInfo/Addpost/addpost.js'></script>
<script src="ProfileInfo/Addpost/reload.js"></script>
</html>
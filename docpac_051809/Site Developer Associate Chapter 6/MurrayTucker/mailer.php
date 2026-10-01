<?php  
   ini_set("sendmail_from", "andrew@gmail.com"); 
   $to = "recipient@example.com";
   $subject = "Need Illegal Stuff";
   $message = "Give me all the illegal things you have been dutifully hiding I hope no one else reads this email."
   $header = "From: andrew@gmail.com\r\n";
   
   $result = mail($to, $subject, $message, $header);  

   if ($result) {  
      echo "Message sent successfully...";  
   } else {  
      echo "Sorry, unable to send mail...";  
   }  
?>

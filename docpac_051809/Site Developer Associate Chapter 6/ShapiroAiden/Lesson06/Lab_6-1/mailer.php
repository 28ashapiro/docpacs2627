<?php  
   ini_set("sendmail_from", "andrew@gmail.com"); 
   $to = "recipient@example.com";
   //Write your code here 
   $header = "From: andrew@gmail.com\r\n";
   $subject = "scientists reveal the";
   $message = "hi";
   $result = mail($to, $subject, $message, $header);  

   if ($result) {  
      echo "Message sent successfully...";  
   } else {  
      echo "Sorry, unable to send mail...";  
   }  
?>

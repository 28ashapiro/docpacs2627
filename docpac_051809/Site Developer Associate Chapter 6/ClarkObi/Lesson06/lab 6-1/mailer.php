<?php  
   ini_set("sendmail_from", "andrew@gmail.com"); 
   $to = "recipient@example.com";
   //Write your code here 
   $header = "From: andrew@gmail.com\r\n";
   $subject = "BUY FORM US";
   $message = "BUY FORM US(not a scam)";
   
   $result = mail($to, $subject, $message, $header);  


   if ($result) {  
      echo "Message sent successfully...";  
   } else {  
      echo "Sorry, unable to send mail...";  
   }  
?>

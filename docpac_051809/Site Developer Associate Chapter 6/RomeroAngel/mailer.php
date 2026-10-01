<?php  
   ini_set("sendmail_from", "andrew@gmail.com"); 
   $to = "recipient@example.com";
   //Write your code here 
   
   $message = "Line 1\r\nLine 2\r\nLine 3";
   $message = wordwrap($message, 70, "\r\n");
   bool mail ( string $to , string $subject , string $message , string $headers , string $parameters )
   $header = "From: andrew@gmail.com\r\n";
   
   $result = mail($to, $subject, $message, $header);  

   if ($result) {  
      echo "Message sent successfully...";  
   } else {  
      echo "Sorry, unable to send mail...";  
   }  
?>

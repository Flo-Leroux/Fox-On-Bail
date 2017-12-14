<?php

   $pseudo = $_POST['pseudo'];
   $mail = $_POST['mail'];
   $sujet = $_POST['sujet'];
   $message = $_POST['message'];
   
   $adresse = "lerouxflorian1@mail.com";
   $expediteur="From: $pseudo <$mail>";
   
    if(mail($adresse, $sujet, $message, $expediteur)){
      echo "<p style=\"text-align:center;font-size:18px; color:green;\">Votre mail est bien envoyé. Je vous répondrai rapidement.</p><p style=\"text-align:center;font-size:18px; color:green;\"><a href=\"index.php\">Cliquez ici pour retourner à l'accueil du site</a></p>";
  }else{
      echo "<p style=\"text-align:center;font-size:18px; color:red;\">Un problème est survenu lors de l'envoi du mail.</p><p style=\"text-align:center;font-size:18px; color:red;\"><a href=\"contact.php\">Veuillez réessayer</a></p>";
  }
?>
$(document).ready(function(){							// Charge les fonctions après avoir chargé tous le document
	
	if(screen.width>900) {
		$(window).bind('resize', function(e){
			if (window.RT) clearTimeout(window.RT); 
			window.RT = setTimeout(function(){
			skroll_or_not();
			this.location.reload(false);
			}, 200);
		});
	}
	
	window.addEventListener("orientationchange", function() {
		$(window).bind('resize', function(e){
			if (window.RT) clearTimeout(window.RT); 
			window.RT = setTimeout(function(){
			this.location.reload(false);
			}, 200);
		});
	}, false);
	
	scroll_auto();													// Permet de scroll jusqu'à une ancre / problème le scroll s'effectue trop vite
	initialize_info();												//Initialise la partie Infos Pratiques
	affiche_masque_info();											//Fait apparaitre, disparaitre le contenu des parties Infos Pratiques
	skroll_or_not();
	carre();
	mobile_menu();
});

function scroll_auto() {
	$('a[href^="#"]').click(function(){
		var hauteur = $(this).attr("href");
		var vitesse = 0;
		
		if(($(hauteur).offset().top) < 1) {
			vitesse = 7000;
		}
		else {
			vitesse = (($(hauteur).offset().top)*3000)/1000;
		}
		
		$('html, body').animate({scrollTop:$(hauteur).offset().top}, vitesse);
		return false;
	});
}

function initialize_info(){
	$('.partie_list').each(function(){
		$(this).append("<div class='titre_partie_list'>" + $(this).data('titre') + '</div>');
	});
	return false;
}


function affiche_masque_info(){
	$('.titre_partie_list').click(function(){ 								//Echange le - en + des parties non s�l�ctionn�es
		$('.titre_partie_list').each(function(){
			var titre = $(this).text();
			titre = replace(titre, '-', '+');
			$(this).empty().append(titre);
		});
		
		
		var titre = $(this).text(); 										//Echange le + en - de la partie s�l�ctionn�e
		titre = replace(titre, '+', '-');
		$(this).empty().append(titre);
		
	
		$('#contenu').fadeOut();											//Anime en fondue OUT le contenu dans #contenu
		$('#contenu').children().empty();									//Efface le contenu dans #contenu
		$('.titre_partie_list').css({'font-size':'1em'});					//Diminu la taille des parties non s�l�ctionn�es
		$(this).css({'font-size':'1.6em'});									//Augmente la taille de la partie s�l�ctionn�e
		
		if (window.matchMedia("screen and (min-width: 900px)").matches) {
			$('#flex_partie_list').css({'flex-direction':'row'});
		}
		
		//Fait apparaitre dans #contenu, le contenu des infos pratiques s�l�ctionn�es 
		if($(this).text() == '- Lieu'){
			$('#contenu').append('<p> Le festival se situe à l’Est de France dans l’agglomération de Nancy, à Villers-lès-Nancy. Le lieu est facile d’accès, le camping est aux abords du festival pas besoin de reprendre la voiture !</p>');
		}
		
		else if($(this).text() == "- Comment s'y rendre ?"){
			$('#contenu').append("<p id='texte_info2'>	Si vous habitez à proximité du festival n’hésitez pas à venir en vélo ou à pieds afin de libérer de la place sur le parking, évitez les bouchons et surtout diminuer la pollution. </br> </br> C’est pourquoi nous décidons de mettre en avant le covoiturage, BlaBlaCar vous permettra d'économiser un peu d'argent, de limiter la pollution et la saturation de nos parkings. Que se soit pour proposer un trajet ou en rejoindre un déjà existant. </br> </br> Ou prenez le train jusqu’à Nancy puis le réseau Stan jusqu’au lieu du festival. </p>");
		}
		
		else if($(this).text() == "- Le Camping"){
			$('#contenu').append("<p>	Le camping sera disponible aux visiteurs du lundi 2 septembre à 12h00 au lundi 4 septembre à 16h00. Son accès est limité aux porteurs de billets et ceux disposant du bracelet du festival. Les bracelets vous seront remis à l’accueil du festival afin de facilité vos déplacements durant votre séjour. </br> </br> L'accès au Camping n'est pas autorisé aux jeunes de moins de 16 ans non accompagnés d’un adulte. A noter que tout campement doit être installé dans le camping uniquement. Les tentes, camping-cars ou caravanes ne sont pas tolérés dans des zones telles que dans les parkings par exemple.</p>");
		}
		
		else if($(this).text() == "- L'argent dans le festival"){
			$('#contenu').append("<p> Les paiements dans les bars, les restaurants et autres stands s'effectuent grâce à des jetons “Foxy’s” monnaie du festival Fox on Bail. Les jetons seront à échanger aux stands dédié à cet effet situé un peu partout dans le festival. Vous pourrez choisir entre 3 offres 15 jetons pour 20€, 30 jetons pour 35€ ou bien 50 jetons pour 60€. </p>");
		}
		
		else if($(this).text() == "- Nourriture et boissons"){
			$('#contenu').append("<p> Toute nourriture et boissons sont interdites dans l’enceinte du festival mis à part celle vendus sur les différents stands qui seront à votre dispositions. Ainsi que des boutiques pour acheter un petit souvenir du festival de quoi rapporté chez vous ! </p>");
		}
		
		else if($(this).text() == "- Déchets et environnement"){
			$('#contenu').append("<p> Le festival est très impliqué dans la cause environnementale pour cela des points de recyclage des déchets sont mis à votre disposition dans l’enceinte du festival, ainsi que dans le camping. Qui en plus vous fournira des Foxy’s toute les 10 bouteilles vides que vous y aurez déposé ! </br> Lors de votre départ, nous vous invitons à rendre les lieux comme ils étaient quand vous y etes arrivés, afin de faciliter le travail des nettoyeurs. </br> Merci ! </p>");
		}
		
		else if($(this).text() == "- Bénévolat"){
			$('#contenu').append("<p> Pour réalisé cet évênement de grande envergure, l'association fait appel à de nombreux bénévoles. Afin de monter ou démonter les scènes, chapiteaux, structures, en passant par la restauration, les buvettes, la décoration, le nettoyage, l'accueil des artistes ou la billetterie, nous avons besoin de vous ! </br> </br> N'hésitez pas à nous contacter afin de rejoindre notre équipe et vivre des moments inoubliables ! </br> </br> foxonbail.contact@gmail.com Tel. 06 12 12 12 12</p>");
		}
		
		else if($(this).text() == "- Notre Loi"){
			$('#contenu').append("<p> La présence d’animaux n'est pas autorisée que ce soit sur le terrain du Festival, ou au Camping, pour des raisons évidentes d'hygiène et de sécurité Cela permettra de respecter le bien-être des animaux. </br> </br> Toute consommation et/ou possession de stupéfiants est punissable par la loi et par conséquent prohibé dans l’enceinte du festival ainsi que le camping.</p>");
		}
		
		$('#contenu').fadeIn();
		
		//Permet d'ajuster le slide 4 en fonction de la longueur du contenu visualis�
		if (window.matchMedia("screen and (max-width: 900px)").matches) {
			$('#scroll_helper_1').css({'height':$(window).height()+'px'});
			$('#slide-1').css({'height':$(window).height()+'px'});
			$('#slide-1').css({'top': 0 + 'px'});
			
			$('#slide-2').css({'top':$('#scroll_helper_1').height() + 'px'});
			$('#scroll_helper_2').css({'height':$('#slide-2').height()});
			$('#slide-3').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + 'px'});
			$('#scroll_helper_3').css({'height':$('#slide-3').height()});
			$('#slide-4').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + $('#scroll_helper_3').height() + 'px'});
			$('#scroll_helper_4').css({'height':$('#slide-4').height()});
			$('#slide-5').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + $('#scroll_helper_3').height() + $('#scroll_helper_4').height() + 'px'});
			$('#scroll_helper_5').css({'height':$('#slide-5').height()});
			$('#slide-6').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + $('#scroll_helper_3').height() + $('#scroll_helper_4').height() + $('#scroll_helper_5').height() + 'px'});
			$('#scroll_helper_6').css({'height':$('#slide-6').height()});
		}
	});
	
	return false;
}

function replace(mot, elmt1, elmt2) { //Fonction de remplacement de caract�re
	mot = mot.replace(elmt1, elmt2)
	return mot;
}

function carre() {
	$('#affiche_menu_mobile').css({'height':$('#affiche_menu_mobile').width() + 'px'});
}

function remove_for_mobile() {
	$('#triangles_flou_L, #triangles_nets_L, #fox_L, #barre_L, #trait_menu').remove();
	$('#boutons_bas_droit').css({'display' : 'none'});
	
	$('#scroll_helper_1').css({'height':$(window).height()+'px'});
	$('#slide-1').css({'height':$(window).height()+'px'});
	$('#slide-1').css({'top': 0 + 'px'});
	
	$('#slide-2').css({'top':$('#scroll_helper_1').height() + 'px'});
	$('#scroll_helper_2').css({'height':$('#slide-2').height()});
	$('#slide-3').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + 'px'});
	$('#scroll_helper_3').css({'height':$('#slide-3').height()});
	$('#slide-4').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + $('#scroll_helper_3').height() + 'px'});
	$('#scroll_helper_4').css({'height':$('#slide-4').height()});
	$('#slide-5').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + $('#scroll_helper_3').height() + $('#scroll_helper_4').height() + 'px'});
	$('#scroll_helper_5').css({'height':$('#slide-5').height()});
	$('#slide-6').css({'top':$('#scroll_helper_1').height() + $('#scroll_helper_2').height() + $('#scroll_helper_3').height() + $('#scroll_helper_4').height() + $('#scroll_helper_5').height() + 'px'});
	$('#scroll_helper_6').css({'height':$('#slide-6').height()});
}

function skroll_or_not() {
	if (window.matchMedia("screen and (min-width: 900px)").matches) {
		skrollr.init();										// Script de lancement du plugin Skrollr
		$('#menu_mobile').css({'display' : 'none'});
	}
	else {
		$('#affiche_menu_mobile').css({'display' : 'fixed'});
		remove_for_mobile();		
	}
}

function mobile_menu() {
	
	$('#affiche_menu_mobile').click(function() {
		if($('#menu_mobile').css('display') == 'flex'){
			$('#menu_mobile').css({'display':'none'});
			$('#affiche_menu_mobile').css({'opacity':'1'});
		}
		else {
			$('#menu_mobile').css({'display':'flex'});
			$('#affiche_menu_mobile').css({'opacity':'0.3'});
		}
	});
	
	$('.after_click').click(function() {
		$('#menu_mobile').css({'display':'none'});
		$('#affiche_menu_mobile').css({'opacity':'1'});
	});
}

//
//
//

function verif(LeForm){
	var pseudo = LeForm.pseudo.value;
	var mail = LeForm.mail.value;
	var sujet = LeForm.sujet.value;
	var message = LeForm.message.value;

	var on_envoie = true;

	if((pseudo == "")||(pseudo == "Veuillez entrer votre pseudo")) {
		$('#pseudo_formulaire input').css({'border':'1px solid #eebb3a'});
		$('#pseudo_formulaire p').css({'color':'#eebb3a'});
		on_envoie = false;
	}
	else if ((pseudo != "")||(pseudo != "Veuillez entrer votre pseudo")) {
		$('#pseudo_formulaire input').css({'border':'1px solid lightgray'});
		$('#pseudo_formulaire p').css({'color':'white'});
	}

	if ((mail == "")||(mail == "Veuillez indiquer votre mail")||(mail.indexOf("@") == -1)) {
		$('#email_formulaire input').css({'border':'1px solid #eebb3a'});
		$('#email_formulaire p').css({'color':'#eebb3a'});
		on_envoie = false;
	}
	else if ((mail != "")||(mail != "Veuillez indiquer votre mail")||(mail.indexOf("@") != -1)) {
		$('#email_formulaire input').css({'border':'1px solid lightgray'});
		$('#email_formulaire p').css({'color':'white'});
	}

	if((sujet == "")||(sujet == "Veuillez indiquer le sujet de votre message")) {
		$('#sujet_formulaire input').css({'border':'1px solid #eebb3a'});
		$('#sujet_formulaire p').css({'color':'#eebb3a'});
		on_envoie = false;
	}
	else if ((sujet != "")||(sujet != "Veuillez indiquer le sujet de votre message")) {
		$('#sujet_formulaire input').css({'border':'1px solid lightgray'});
		$('#sujet_formulaire p').css({'color':'white'});
	}
	
	if((message == "")||(message == "Veuillez entrer votre message")) {
		$('#textarea_formulaire textarea').css({'border':'1px solid #eebb3a'});
		$('#textarea_formulaire p').css({'color':'#eebb3a'});
		on_envoie = false;
	}
	else if ((message != "")||(messae != "Veuillez entrer votre message")) {
		$('#textarea_formulaire textarea').css({'border':'1px solid lightgray'});
		$('#textarea_formulaire p').css({'color':'white'});
	}

	if(on_envoie){
		LeForm.submit();
	}
}
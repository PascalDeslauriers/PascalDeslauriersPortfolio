//Importation des scripts et classes nécessaires
import {
	SceneChargement
} from './scenes/SceneChargement.js';

import {
	SceneIntro
} from './scenes/SceneIntro.js';
import {
	SceneJeu
} from './scenes/SceneJeu.js';
import {
	SceneFinJeu
} from './scenes/SceneFinJeu.js';
//import { Input } from 'phaser';



//On crééra le jeu quand la page HTML sera chargée
window.addEventListener("load", function () {
	//On définit avec des variables les dimensions du jeu sur desktop
	let largeur = 576,
		hauteur = 1024;

	//On fait 2 vérifications la première pour "Mobile" et la seconde pour "Tablet"
	//Et si on est sur un mobile (tablette ou téléphone), on re-dimensionne le jeu
	if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Tablet")) {
		//console.log("Le jeu est lu sur un mobile... on change les dimensions...");
		largeur = Math.min(window.innerWidth, window.innerHeight);
		hauteur = Math.max(window.innerWidth, window.innerHeight);
	}

	// Object pour la configuration du jeu - qui sera passé en paramètre au constructeur
	let config = {
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: largeur,
			height: hauteur,
		},
		scene: [SceneChargement, SceneIntro, SceneJeu, SceneFinJeu],
		backgroundColor: 0xDCDCDC,
		input: {
			activePointers: 1,
		}
	}
	// gestion de la police de caractaire
	let webFontConfig = {
		google: {
			families: ["IM+Fell+English"]
		},

		// les fonts ont le temps de charger avant d'etre afficher
	}
	// chargement des fonts
	WebFont.load(webFontConfig);


	// Création du jeu comme tel - comme objet global pour qu'il soit accessible à toutes les scènes du jeu
	window.game = new Phaser.Game(config);


	window.game.jeuKTW = {
		//NB_IMAGES: 64, //nb d'image total
		NB_PAIRES: 32, //nb de paires total
		NB_PAIRES_PAR_MATCH: 8, //nb de paires par match
		NB_IMG_PAR_MATCH: 16, //nb d'image afficher par match		
		DISTANCE_IMG_2: 32,
		NO_IMAGE_DESSUS: 64, //index de l'image de l'ados de la carte
		TEMPS_JEU: 30, //temps initial
		score: 0, //Score de la partie courante
		meilleurScore: 0, // meilleur score, dans le local storage
		NOM_LOCAL_STORAGE: "MeilleurScoreKnowThyWeapons"
	}

}, false);
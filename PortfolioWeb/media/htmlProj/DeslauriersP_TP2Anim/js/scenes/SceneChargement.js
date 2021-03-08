//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";

/**
 * Class representant la scène du jeu qui charge les médias.
 * @extends Phaser.Scene
 */

export class SceneChargement extends Phaser.Scene {

	constructor() {
		super("SceneChargement");
		this.barre = null; //La barre pour illustrer le % de chargement
		this.progressionTxt = null; //Le texte pour afficher le % de chargement
	}

	preload() {
		// création de la barre de chargement
		this.barre = this.add.rectangle(0, 0, this.game.config.width, 1, 0xE4E4E4);
		this.barre.setOrigin(0);
		// création du texte qui affiche le pourcentage de chargement
		let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());
		this.progressionTxt = this.add.text(game.config.width / 2, game.config.height / 2, "0%", {
			fontFamily: "IM Fell English",
			fontSize: `${tailleTexte}px`,
			color: "#000000",
			align: "center"
		});
		this.progressionTxt.setOrigin(0.5);

		//chemin vers les images
		this.load.setPath("medias/img/")
		//load de l'image d'introduction
		this.load.image("intro", "intro.png");
		//Charger les feuilles de sprite des cartes
		this.load.spritesheet("cards", "cards.png", {
			frameWidth: 143,
			frameHeight: 255
		});
		// charger l'feuille de sprite des fleurs de lys
		this.load.spritesheet("animFleurs", "AnimFleurs.png", {
			frameWidth: 132,
			frameHeight: 243
		});
		//chemin vers l'audio
		this.load.setPath("medias/sons/")
		//Chargement de la music provenant de https://www.youtube.com/watch?v=-zmtpHFaGyc&list=RD-zmtpHFaGyc&start_radio=1
		this.load.audio("music", ["music.mp3", "music.ogg"]);
		//Chargement du son de victoire
		this.load.audio("trumpet", ["trumpet.mp3", "trumpet.ogg"]);
		//Chargement du son d'interacton
		this.load.audio("interact", ["interact.mp3", "interact.ogg"]);

		//gestion des élément visuel du chargement
		this.load.on('progress', this.afficherProgression, this);

	}

	/**
	 * Affiche la progression du chargement
	 * @param {Number} pourcentage Taux de chargement exprimé en nombre décimal
	 */
	afficherProgression(pourcentage) {
		this.progressionTxt.text = Math.floor(pourcentage * 100) + " %";
		this.barre.scaleY = game.config.height * pourcentage;
	}

	create() {

		this.scene.start("SceneIntro");
	}
}
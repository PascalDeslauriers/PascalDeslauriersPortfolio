//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Class representant la scène du jeu comme tel
 */

export class SceneFinJeu extends Phaser.Scene {

	constructor() {
		super("SceneFinJeu");
	}


	create() {

		//Titre
		let tailleTexte = Math.round(32 * GrilleMontage.ajusterRatioX());

		let scoreText = this.add.text(game.config.width / 2, game.config.height / 2, "HUZZAH!!\n\nVotre score: " + game.jeuKTW.score + "\nVotre meilleur score: " + game.jeuKTW.meilleurScore + "\n\nCliquer dans l'écran pour rejouer", {
			font: `${tailleTexte}px Monospace`,
			color: "#000000",
			align: "center",
			wordWrap: {
				width: game.config.width * 0.7
			}
		});
		scoreText.setOrigin(0.5);
		scoreText.setFontFamily("IM Fell English");

		//Vérification et enregistrement du meilleur score
		game.jeuKTW.meilleurScore = Math.max(game.jeuKTW.score, game.jeuKTW.meilleurScore);
		localStorage.setItem(game.jeuKTW.NOM_LOCAL_STORAGE, game.jeuKTW.meilleurScore);

		//Clic dans l'écran
		this.input.once("pointerdown", this.rejouer, this);
		//on ajoute un son
		let trumpet = this.sound.add("trumpet");
		// jou son de victoire pour la transition de scene
		trumpet.play();

		// gestion de l'orientation
		if (!this.sys.game.device.os.desktop === true) { // Pas un ordinateur de bureau
			//On est sur mobile et on gère l'orientation de l'écran
			//Vérification immédiate
			this.verifierOrientation();
			//Vérification pendant le jeu selon les manipulations du joueur
			//On utilise un autre événement que 'orientationchange'
			//Le hic... est que la nouvelle orientation ne sera pas passée en paramètre
			this.scale.on('resize', this.verifierOrientation, this);
		}
	}

	/**
	 * Vérifie l'orientation de l'écran
	 * 
	 */
	verifierOrientation() {
		//On va donc utiliser une propriété de l'objet window : window.orientation
		//qui renvoie l'orientation en degrés (par incréments de 90 degrés)
		//de la fenêtre (viewport) par rapport à l'orientation naturelle de l'appareil.
		if (window.orientation === 90 || window.orientation === -90) {
			//On met le jeu en pause
			this.scene.pause(this);
			//On affiche la balise <div>
			document.getElementById("orientation").style.display = "block";
		} else {
			//On repart le jeu
			this.scene.resume(this);
			//On enlève l'affichage de la balise <div>
			document.getElementById("orientation").style.display = "none";
		}
	}


	rejouer(pointer) {
		//Aller à l'écran de jeu
		this.scene.start("SceneJeu");
	}

}
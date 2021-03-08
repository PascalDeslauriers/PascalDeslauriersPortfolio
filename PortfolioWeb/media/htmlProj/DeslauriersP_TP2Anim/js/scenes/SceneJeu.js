//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Class representant la scène du jeu comme tel
 */

export class SceneJeu extends Phaser.Scene {

	constructor() {
		super("SceneJeu");
	}

	init() {
		//Initialiser le temps restant
		this.tempsRestant = game.jeuKTW.TEMPS_JEU;
		//Initialiser le score
		game.jeuKTW.score = 0;

		//Initialiser le tableau des images d'armes à trouver.
		this.tableauImagesArmesATrouver = [];
		//Initialiser le tableau des images des paires
		this.tableauImagesMatch = []; // contienderas les images d'un match de 8 paires
		//Initialiser le tableau des images sélectionnées
		this.tableauImagesSelectionnees = [];
		//Enregistrer que le chronomètre n'est pas activé
		this.chronoActif = false;
		//pour déterminer si tout les paires on été trouver
		this.pairesTrouve = 0;
	}


	create() {
		//this.scene.start("SceneFinJeu");
		this.timer = null; //Le timer pour limiter le temps de jeu????

		//crée la grille de montage
		this.grille = new GrilleMontage(this, 4, 4);
		//this.grille.afficherGrille();

		//on places les image dans le canvas
		this.PlacerImages();

		//Partir la minuterie pour le temps du jeu
		this.minuterie = this.time.addEvent({
			delay: 1000,
			loop: true,
			callback: this.diminuerTemps,
			callbackScope: this
		});

		// Création et l'élément visuel du timer
		let barre = this.add.rectangle(0, 0, this.game.config.width, 1, 0xE4E4E4);
		barre.setOrigin(0, 0);
		//création de l'animation de l'élément visuel du timer
		this.tweens.add({
			targets: barre,
			scaleY: this.game.config.height,
			duration: this.game.jeuKTW.TEMPS_JEU * 1000,
		});

		//création de l'animation des fleurs de lys -- 
		// tout le code fonctionne mais je n'est pas été capable de faire la spritesheet alors j'ai mis le code en commentaire.
		this.anims.create({
			key: 'animFleurs',
			frames: this.anims.generateFrameNumbers('animFleurs'),
			frameRate: 24,
			repeat: 0
		});

		//création des sons et de la music
		this.trumpet = this.sound.add("trumpet");
		this.interact = this.sound.add("interact");
		this.bgMusic = this.sound.add("music", {
			volume: 3,
		});
		//on part la music
		this.bgMusic.play();

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
	 * choisi des image et les place dans la scene aléatoirement
	 */
	PlacerImages() {
		//On s'assure que le tableau des armes à trouver contiennet toutes les armes initiales
		for (let i = 0; i < game.jeuKTW.NB_PAIRES; i++) {
			this.tableauImagesArmesATrouver.push(i);
		}

		//console.log("this.tableauImagesArmesATrouver - 1, nb:" + this.tableauImagesArmesATrouver.length, this.tableauImagesArmesATrouver);

		//************  PREMIÈRE ÉTAPE POUR ALLER CHERCHER LES PAIRES À TROUVER...
		//Du tableau des armes à trouver, on en choisi 8 au hasard
		//Que l'on met dans le tableau this.tableauImagesMatch 
		for (let i = 0; i < game.jeuKTW.NB_PAIRES_PAR_MATCH; i++) {
			this.tableauImagesMatch[i] = Phaser.Utils.Array.RemoveRandomElement(this.tableauImagesArmesATrouver);
		}

		//console.log("this.tableauImagesArmesATrouver - 2, nb:" + this.tableauImagesArmesATrouver.length, this.tableauImagesArmesATrouver);
		//console.log("this.tableauImagesMatch - 1", this.tableauImagesMatch);

		//************  DEUXIÈME ÉTAPE POUR ALLER CHERCHER LES PAIRES À TROUVER...
		//Du tableau tableauImagesMatch, on va ajouter l'image du nom correspondant
		for (let i = 0; i < game.jeuKTW.NB_PAIRES_PAR_MATCH; i++) {
			//On va chercher l'index de l'arme
			let indexArme = this.tableauImagesMatch[i];
			//On ajoute au tableau des armes, l'image correspondante
			this.tableauImagesMatch.push(indexArme + game.jeuKTW.DISTANCE_IMG_2);
		}

		//console.log("this.tableauImagesMatch - 2", this.tableauImagesMatch);

		//On mélange ensuite toutes les images
		this.tableauImagesMatch = Phaser.Utils.Array.Shuffle(this.tableauImagesMatch);
		//console.log("this.tableauImagesMatch - 3", this.tableauImagesMatch);

		//on place les image correspondant au elements du tableau dans la grille ainci que l'animation de feuille de spride de fleurs de lys

		for (let i = 0; i < game.jeuKTW.NB_IMG_PAR_MATCH; i++) {
			let uneCarte = this.add.image(0, 0, "cards", this.tableauImagesMatch[i]);
			//let uneAnim = this.add.sprite(0,0, "animFleurs");
			uneCarte.setOrigin(0.5);
			this.grille.placerIndexCellule(i, uneCarte);
			//this.grille.placerIndexCellule(i, uneAnim);
			this.grille.mettreEchelleProportionMaximale(uneCarte, 1);
			uneCarte.setInteractive();
			uneCarte.setFrame(game.jeuKTW.NO_IMAGE_DESSUS);
			uneCarte.noCarte = this.tableauImagesMatch[i];
			//uneCarte.anim = uneAnim;
			uneCarte.setDepth(1);
			//uneAnim.setDepth(1);

		}
		//Mettre un écouteur sur les éléments du jeu
		this.input.on('gameobjectdown', this.choisirImages, this);

	}

	/**
	 * gestion de selection d'image
	 * @param {*} pointer pointer de l'utilisateur
	 * @param {*} imageCible image choisis
	 */
	choisirImages(pointer, imageCible) {
		if (this.tableauImagesSelectionnees.length < 2 &&
			!this.tableauImagesSelectionnees.includes(imageCible)) {
			//Montrer l'image correspondante
			imageCible.setFrame(imageCible.noCarte);
			//Enregistrer l'image dans le tableau des images sélectionnées
			this.tableauImagesSelectionnees.push(imageCible);
			//imageCible.anim.anims.play("animFleurs");
			//jou le son d'interaction
			this.interact.play();
		}
		//Lorsque deux images sont choisies - on vérifie si elle sont identiques
		//Mais avec un certain délai afin d'avoir le temps de voir les deux images
		//On fait cela uniquement si le chronomètre n'est pas déjà activé
		if (this.tableauImagesSelectionnees.length == 2 && this.chronoActif == false) {
			this.time.addEvent({
				delay: 500,
				callback: this.verifierImages,
				callbackScope: this
			});
			this.chronoActif = true;
		}
	}

	/**
	 * verification des deux images selectionner, si ils sont paires
	 */
	verifierImages() {
		//Si les deux images forment une paire, on les détruits...etc... avec leurs anims de fleurs de lys
		if (this.tableauImagesSelectionnees[0].noCarte === this.tableauImagesSelectionnees[1].noCarte + game.jeuKTW.DISTANCE_IMG_2 ||
			this.tableauImagesSelectionnees[0].noCarte === this.tableauImagesSelectionnees[1].noCarte - game.jeuKTW.DISTANCE_IMG_2) {
			//On détruit les deux images
			this.tableauImagesSelectionnees[0].destroy();
			this.tableauImagesSelectionnees[1].destroy();
			// this.tableauImagesSelectionnees[0].anim.destroy();
			// this.tableauImagesSelectionnees[1].anim.destroy();
			//On incrémente le score
			game.jeuKTW.score++;

			// Si il ne reste plus d'iage, le jeu est terminé
			this.pairesTrouve++;
			if (this.pairesTrouve === game.jeuKTW.NB_PAIRES_PAR_MATCH) {
				this.scene.start("SceneFinJeu");
			}
			//jou son trompet
			this.trumpet.play();
		} else {
			//On remet l'image du dessus
			this.tableauImagesSelectionnees[0].setFrame(game.jeuKTW.NO_IMAGE_DESSUS);
			this.tableauImagesSelectionnees[1].setFrame(game.jeuKTW.NO_IMAGE_DESSUS);
		}
		//Enlever les images du tableau des images sélectionnées
		// pour les prochains choix...
		this.tableauImagesSelectionnees = [];
		//Enregistrer que le timer est maintenant désactivé
		this.chronoActif = false;
	}

	/**
	 * gestion du timer
	 */
	diminuerTemps() {
		this.tempsRestant--;
		//this.tempsTxt.text = "Temps restant: " + this.tempsRestant;
		//Si toutes les secondes sont écoulées, c'est la fin du jeu
		if (this.tempsRestant === 0) {
			//Arrêter la minuterie du jeu
			this.minuterie.destroy();
			//Enlever l'écouteur sur la scène
			this.input.off('gameobjectdown', this.choisirImages, this);
			//On va à la scène de la fin du jeu
			this.scene.start("SceneFinJeu");
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
			//On met le jeu en pause et on arrête le son
			this.scene.pause(this);
			this.bgMusic.pause();
			//On affiche la balise <div>
			document.getElementById("orientation").style.display = "block";
		} else {
			//On repart le jeu et le son
			this.scene.resume(this);
			this.bgMusic.resume();
			//On enlève l'affichage de la balise <div>
			document.getElementById("orientation").style.display = "none";
		}
	}

	update() {

	}
}
//Importation des fichiers classes ou fichiers nécessaires
import {
    GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Class representant la scène d'intro du jeu
 * @extends Phaser.Scene
 */

export class SceneIntro extends Phaser.Scene {

    constructor() {
        super("SceneIntro");
    }

    create() {
        //On ajoute l'image
        let imgIntro = this.add.image(game.config.width / 2, game.config.height / 2, "intro");
        imgIntro.setOrigin(0.5);
        // on ajuste la largeur de l'image
        GrilleMontage.mettreEchelleLargeurJeu(imgIntro, 0.70)
        //on ajoute un son d'introduction
        let trumpet = this.sound.add("trumpet");
        trumpet.play();
        //Clic dans l'écran
        this.input.once("pointerdown", this.rejouer, this);

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
            //On met le jeu en pause et on arrête le son
            this.scene.pause(this);
            //On affiche la balise <div>
            document.getElementById("orientation").style.display = "block";
        } else {
            //On repart le jeu et le son
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
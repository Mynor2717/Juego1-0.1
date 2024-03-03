class Game extends Phaser.Scene {

    preload() {
        this.load.image('fondo', 'background.png');
        this.load.image('bola', 'ball.png');
        this.load.spritesheet('pala', 'ladrillos.png', { frameWidth: 32, frameHeight: 16 })
    }

    create() {

        //configuraciones del mundo
        this.physics.world.setBounds(0, 0, 800, 600);
        this.physics.world.setBoundsCollision(true);

        //fondo
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);


        //Configuraciones de la bola
        this.bola = this.physics.add.sprite(400, 500, 'bola');
        this.bola.setVelocity(-300, -300).setBounce(1).setScale(0.6);
        this.bola.setCollideWorldBounds(true);

        //Configuraciones de la pala
        this.pala = this.physics.add.sprite(400, 560, 'pala');
        this.pala.setScale(2.5, 1).setImmovable(true);
        this.pala.setCollideWorldBounds(true);

        this.ladrillos = this.physics.add.staticGroup({
            key: 'pala',
            frame: [4, 5, 6, 7, 8, 9],
            frameQuantity: 18,
            gridAlign: {
                width: 18,
                height: 6,
                cellWidth: 32,
                cellHeight: 16,
                x: 100,
                y: 100
            }
        })

        //Controles
        this.controles = this.input.keyboard.createCursorKeys();

        //coliciones 
        this.physics.add.collider(this.pala, this.bola);
        this.physics.add.collider(this.ladrillos, this.bola, (ladrillos, bola) =>{
            bola.disableBody(true, true);
        } );
    }

    update() {

        if (this.controles.right.isDown) {
            this.pala.setVelocityX(350);

        } else if (this.controles.left.isDown) {
            this.pala.setVelocityX(-350);
        } else {
            this.pala.setVelocityX(0);
        }

    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            physics: { y: 700 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}


let game = new Phaser.Game(config);
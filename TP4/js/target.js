function Target(x, y) {
    this.x = x;
    this.y = y;
    this.y0 = y;

    this.targetTypes = [
        {
            score: 1,
            weight: 1,
            img: new Image(),
            takeHit: function(target) {
                return true;
            },
        },
        {
            score: 1,
            weight: 0.4,
            img: new Image(),
            lives: 2,
            takeHit: function(target) {
                this.lives--;
                return this.lives <= 0;
            },
        },
        {
            score: 1,
            weight: 0.4,
            img: new Image(),
            takeHit: function(target) {
                targets.push(new Target(target.x, target.y + 10));
                targets.push(new Target(target.x, target.y - 10));
                return true;
            },
        }
    ];

    this.targetTypes[0].img.src = "./assets/Enemy/Example/e_f1.png";
    this.targetTypes[1].img.src = "./assets/Enemy/Example/e2_f1.png";
    this.targetTypes[2].img.src = "./assets/Enemy/Example/e3_f1.png";

    this.height = 4;
    this.width = 8;
    this.targetHeight = 30;
    this.targetWidth = 30;
    this.imgHeight = 40;
    this.imgWidth = 40;
    this.xSpeed = -1;

    this.a = Math.random() * 2;
    // noinspection PointlessArithmeticExpressionJS
    this.a = Math.random() * 2 + 0;
    this.b = Math.random() * 2 + 2;
    this.c = Math.random() * 2 + 3;
    this.s = Math.random() > 0.5 ? -1 : 1;

    this.t = 0;
    this.dt = 0.01;

    // Load the correct type element
    let totalWeight = 0;
    for(let targetT of this.targetTypes) {
        totalWeight += targetT.weight;
    }

    let rand = Math.random() * totalWeight;
    for(let targetT of this.targetTypes) {
        rand -= targetT.weight;
        if(rand <= 0) {
            this.targetType = targetT;
            break;
        }
    }

    this.yFunction = function(t) {
        return this.y0 + 1 / 3 * this.s * (Math.sin(this.a * t) + Math.sin(this.b * t) + Math.sin(this.c * t)) * ArenaHeight;
    };

    this.updatePosition = function() {
        this.t += this.dt;
        this.x += this.xSpeed;
        this.y = this.yFunction(this.t);
    };

    this.getCollisionRect = function() {
        return {
            x: this.x, y: this.y,
            width: this.targetWidth, height: this.targetHeight
        };
    };
}
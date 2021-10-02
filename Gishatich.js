let LivingCreature = require('./LivingCreature')

module.exports = class Gishatich extends LivingCreature {
    constructor(x, y, index) {
		super(x, y, index);
		this.energy = 16
	}


	move() {
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}


	}
	eat() {
		var grassCells = super.chooseCell(2);
		var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			for (var i in grasseaterArr) {
				if (grasseaterArr[i].x == newX && grasseaterArr[i].y == newY) {
					grasseaterArr.splice(i, 1)
				}
			}

			this.x = newX;
			this.y = newY;
			this.energy++;

			if (this.energy >= 20) {
				this.mul();
				this.energy = 16
			}

		}
		else {
			this.move();
		}
	}

	mul() {
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = 3
			gishArr.push(new Gishatich(newX, newY, 3))
			this.energy = 14;
		}
		if (weath == "winter") {
			this.energy -= 4;
			this.multiply -= 4;
		}
		if (weath == "summer") {
			this.energy += 2;
			this.multiply += 2;
		}

	}

	die() {
		matrix[this.y][this.x] = 0;
		for (var i in gishArr) {
			if (gishArr[i].x == this.x && gishArr[i].y == this.y) {
				gishArr.splice(i, 1)
			}
		}
	}
}


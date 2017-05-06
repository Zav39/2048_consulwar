class Game {
	constructor(parentElement, size = 4) {
		this.fieldSize = 80;
		this.size = size;
		this.cellSize = ((this.fieldSize / this.size) - 2);

		let gameFieldElement = createAndAppend({
			className: 'game',
			parentElement
		});

		this.headerElement = createAndAppend({
			className: 'header',
			parentElement: gameFieldElement
		});

		this.ratingElement = createAndAppend({
			className: 'rating',
			parentElement: this.headerElement
		});

		this.rating = 0;


		let fieldElement = createAndAppend({
			className: 'field',
			parentElement: gameFieldElement
		});

		this.field = [];

		for (let i = 0; i < size; i++) {
			this.field[i] = [];
			for (let k = 0; k < size; k++) {
				this.field[i][k] = new Cell(fieldElement, this);
			}
		}

		window.addEventListener('keyup', function(e) {
			switch (e.keyCode) {
				case 38:
					this.moveUp();
					break;
				case 40:
					this.moveDown();
					break;
				case 37:
					this.moveLeft();
					break;
				case 39:
					this.moveRight();
					break;
			}
		}.bind(this));
	}

	set rating(value) {
		this._rating = value;
		this.ratingElement.innerHTML = 'Rating: ' + value;
	}

	get rating() {
		return this._rating;
	}

	addRating(value) {
		this.rating += value;
	}

	spawnUnit() {
		let emptyCells = [];

		for (let i = 0; i < this.field.length; i++) {
			for (let k = 0; k < this.field[i].length; k++) {
				if (!this.field[i][k].value) {
					emptyCells.push(this.field[i][k]);
				}
			}
		}

		if (emptyCells.length) {
			emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn();
		} else {
			alert('You lose');
		}
	}

	// Обходим все ячейки в противоположном направлении от нажатия клавиши
	// По направлению первую строку или столбец пропускаем
	// Для ячейки ищем следующую заяную ячейку (или последнюю)
	//	если ячейка занята и совпадает с нашей, то объединяем
	//	если ячейка занята и не совпадет, то проверяем предыдущую ячейку
	moveRight() {
		let hasMoved = false;
		for (let i = 0; i < this.size; i++) {
			for (let k = this.size - 2; k >= 0; k--) {
				hasMoved = this.move(i, k, false, true, this.isLastKey.bind(this)) || hasMoved;
			}
		}

		if (hasMoved) {
			this.spawnUnit();
		}
	}

	isLastKey(key) {
		return key == (this.size - 1);
	}

	isFirstKey(key) {
		return key == 0;
	}

	moveLeft() {
		let hasMoved = false;
		for (let i = 0; i < this.size; i++) {
			for (let k = 1; k < this.size; k++) {
				hasMoved = this.move(i, k, false, false, this.isFirstKey.bind(this)) || hasMoved;
			}
		}

		if (hasMoved) {
			this.spawnUnit();
		}
	}


	moveDown() {
		let hasMoved = false;
		for (let i = this.size - 2; i >= 0; i--) {
			for (let k = 0; k < this.size; k++) {
				hasMoved = this.move(i, k, true, true, this.isLastKey.bind(this)) || hasMoved;
			}
		}

		if (hasMoved) {
			this.spawnUnit();
		}
	}

	moveUp() {
		let hasMoved = false;
		for (let i = 1; i < this.size; i++) {
			for (let k = 0; k < this.size; k++) {
				hasMoved = this.move(i, k, true, false, this.isFirstKey.bind(this)) || hasMoved;
			}
		}

		if (hasMoved) {
			this.spawnUnit();
		}
	}


	move(i, k, isI, isIncrement, keyCheck) {
		let hasMoved = false;

		let inc = isIncrement ? 1 : -1;
		let currentCell = this.field[i][k];
		if (currentCell.isEmpty) {
			return hasMoved;
		}

		let nextCellKey = (isI ? i : k) + inc;
		while (nextCellKey < this.size && nextCellKey >= 0) {
			let nextCell = this.field[isI ? nextCellKey : i][isI ? k : nextCellKey];
			if (!nextCell.isEmpty || keyCheck(nextCellKey)) {
				if ((nextCell.isEmpty && keyCheck(nextCellKey)) 
					|| nextCell.isSameTo(currentCell)) {
					this.field[isI ? nextCellKey : i][isI ? k: nextCellKey].merge(currentCell);
					hasMoved = true;
				} else if (!nextCell.isEmpty && ((isI && (nextCellKey + (inc * -1) != i)) || (!isI && (nextCellKey + (inc * -1) != k)))) {
					this.field[isI ? nextCellKey + (inc * -1) : i][isI ? k: nextCellKey + (inc * -1)].merge(currentCell);
					hasMoved = true;
				}

				break;
			}
			nextCellKey += inc;
			nextCell = this.field[isI ? nextCellKey : i][isI ? k : nextCellKey];
		}

		return hasMoved;
	}
}

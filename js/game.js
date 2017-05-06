class Game {
	constructor(parentElement, size = 4) {
		this.size = size;

		let gameFieldElement = createAndAppend({
			className: 'game',
			parentElement
		});

		this.headerElement = createAndAppend({
			className: 'header',
			parentElement: gameFieldElement
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


		console.log(this.field);
	}

	set rating(value) {
		this._rating = value;
		this.headerElement.innerHTML = 'Rating: ' + value;
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
				let currentCell = this.field[i][k];
				if (currentCell.isEmpty) {
					continue;
				}

				let nextCellKey = k + 1;
				while (nextCellKey < this.size) {

					let nextCell = this.field[i][nextCellKey];
					if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
						if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) // last cell with no value
							|| nextCell.isSameTo(currentCell)) {
							this.field[i][nextCellKey].merge(currentCell);
							hasMoved = true;
						} else if (!nextCell.isEmpty && nextCellKey - 1 != k) {
							this.field[i][nextCellKey - 1].merge(currentCell);
							hasMoved = true;
						}

						break;
					}
					nextCellKey++;
					nextCell = this.field[i][nextCellKey];
				}
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
				let currentCell = this.field[i][k];
				if (currentCell.isEmpty) {
					continue;
				}

				let nextCellKey = k - 1;
				while (nextCellKey >= 0) {
					let nextCell = this.field[i][nextCellKey];
					if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
						if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) // last cell with no value
							|| nextCell.isSameTo(currentCell)) {
							this.field[i][nextCellKey].merge(currentCell);
							hasMoved = true;
						} else if (!nextCell.isEmpty && nextCellKey + 1 != k) {
							this.field[i][nextCellKey + 1].merge(currentCell);
							hasMoved = true;
						}

						break;
					}
					nextCellKey--;
					nextCell = this.field[i][nextCellKey];
				}
			}
		}

		if (hasMoved) {
			this.spawnUnit();
		}
	}


	moveDown() {
		let hasMoved = false;
		for (let k = 0; k < this.size; k++) {
			for (let i = this.size - 2; i >= 0; i--) {
				let currentCell = this.field[i][k];
				if (currentCell.isEmpty) {
					continue;
				}

				let nextCellKey = i + 1;
				while (nextCellKey < this.size) {

					let nextCell = this.field[nextCellKey][k];
					if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
						if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) // last cell with no value
							|| nextCell.isSameTo(currentCell)) {
							this.field[nextCellKey][k].merge(currentCell);
							hasMoved = true;
						} else if (!nextCell.isEmpty && nextCellKey - 1 != i) {
							this.field[nextCellKey - 1][k].merge(currentCell);
							hasMoved = true;
						}

						break;
					}
					nextCellKey++;
					nextCell = this.field[nextCellKey][k];
				}
			}
		}

		if (hasMoved) {
			this.spawnUnit();
		}
	}

	moveUp() {
		let hasMoved = false;
		for (let k = 0; k < this.size; k++) {
			for (let i = 1; i < this.size; i++) {
				let currentCell = this.field[i][k];
				if (currentCell.isEmpty) {
					continue;
				}

				let nextCellKey = i - 1;
				while (nextCellKey < this.size) {

					let nextCell = this.field[nextCellKey][k];
					if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
						if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) // last cell with no value
							|| nextCell.isSameTo(currentCell)) {
							this.field[nextCellKey][k].merge(currentCell);
							hasMoved = true;
						} else if (!nextCell.isEmpty && nextCellKey + 1 != i) {
							this.field[nextCellKey + 1][k].merge(currentCell);
							hasMoved = true;
						}

						break;
					}
					nextCellKey--;
					nextCell = this.field[nextCellKey][k];
				}
			}
		}

		if (hasMoved) {
			this.spawnUnit();
		}
	}
}

class Game {
	constructor(parentElement, size = 4) {
		let gameFieldElement = createAndAppend({
			className: 'game',
			parentElement
		});

		let headerElement = createAndAppend({
			className: 'header',
			parentElement: gameFieldElement
		});

		this.rating = 0;

		headerElement.innerHTML = 'Rating: ' + this.rating;


		let fieldElement = createAndAppend({
			className: 'field',
			parentElement: gameFieldElement
		});

		this.field = [];

		for (let i = 0; i < size; i++) {
			this.field[i] = [];
			for (let k = 0; k < size; k++) {
				this.field[i][k] = new Cell(fieldElement);
			}
		}

		console.log(this.field);
	}
}
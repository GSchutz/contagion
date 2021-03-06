function Contagion(element) {
	this.element = element = element instanceof HTMLElement ? element : document.querySelector(element);

	var canvas = this.canvas = document.createElement('canvas');
	canvas.width = 600;
	canvas.height = 400;

	element.appendChild(canvas);


	this.start = function() {
		var proton = new Proton(),
			emitter = new Proton.Emitter();

		this.proton = proton;
		this.emitter = emitter;

		//set Rate
		emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);
		//add Initialize
		emitter.addInitialize(new Proton.Radius(1, 12));
		emitter.addInitialize(new Proton.Life(2, 4));
		emitter.addInitialize(new Proton.Velocity(3, Proton.getSpan(0, 360), 'polar'));
		//add Behaviour
		emitter.addBehaviour(new Proton.Color('ff0000', 'random'));
		emitter.addBehaviour(new Proton.Alpha(1, 0));
		//set emitter position
		emitter.p.x = canvas.width / 2;
		emitter.p.y = canvas.height / 2;
		emitter.emit();
		//add emitter to the proton
		proton.addEmitter(emitter);
		// add canvas renderer
		var renderer = new Proton.Renderer('canvas', proton, canvas);
		renderer.start();
	}
}

function contagion(element) {
	return new Contagion(element);
}
import RequestAnimationFrame	from "awayjs-core/lib/utils/RequestAnimationFrame";

class RequestAnimationFrameTest
{
	private requestAnimationFrameTimer:RequestAnimationFrame;

	constructor()
	{
		this.requestAnimationFrameTimer = new RequestAnimationFrame(this.tick, this);
		this.requestAnimationFrameTimer.start()

		document.onmousedown = (event:Event) => this.onMouseDown(event);
	}

	private onMouseDown(event:Event)
	{
		console.log('mouseDown');

		if (this.requestAnimationFrameTimer.active)
			this.requestAnimationFrameTimer.stop();
		else
			this.requestAnimationFrameTimer.start();
	}

	private tick(dt:number)
	{
		console.log('tick');
	}
}
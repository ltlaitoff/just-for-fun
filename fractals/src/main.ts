import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
	<canvas id="canvas"></canvas>
` 

const canvas: HTMLCanvasElement = document.querySelector('#canvas')!

canvas.width = canvas.parentElement.clientWidth
canvas.height = canvas.parentElement.clientHeight

const ctx = canvas.getContext('2d')!
// ctx.fillStyle = "green";

/* CTX contants */
ctx.lineWidth = 1;

/* CONSTANTS */
const START_POSITION_X = canvas.width / 2
const START_POSITION_Y = canvas.height - 100
const START_LENGTH = 100
const COUNT = 3
const MAX_LEVEL = 5

// Roof

function degreeToRadians(degree: number) {
	return degree * (Math.PI / 180)
}


function tree(length: number, startX: number, startY: number, fi: number, result: Array<[number, number, number, number]> = [], level = 0) {	


	const newX = startX + Math.cos(fi) * length
	const newY = startY - Math.sin(fi) * length

	// console.log(startX, startY, newX, newY)

	result.push([startX, startY, newX, newY])



	if (level > MAX_LEVEL) {
		return
	}

	const newLength = length * 0.7

	const newFis = []
	const degreeBeetween = 90 / (COUNT - 1)
	let persistDegree = 0
	
	newFis.push(fi + degreeToRadians(persistDegree + degreeBeetween) - degreeToRadians(135 - 45))

	for (let i = 1; i < COUNT; i++) {		
	persistDegree += degreeBeetween
	newFis.push(fi + degreeToRadians(persistDegree + degreeBeetween) - degreeToRadians(135 - 45) )
	}

	newFis.map(fi => {
		tree(newLength, newX, newY, fi, result, level + 1)
	})	
}

const result: Array<[number, number, number, number]> = []

tree(START_LENGTH, START_POSITION_X, START_POSITION_Y, degreeToRadians(90), result)

console.log(result)
result.map(item => {
	ctx.beginPath();
	ctx.moveTo(item[0], item[1]);
	ctx.lineTo(item[2], item[3])
	ctx.stroke();
})




class Key  {

	isDown: boolean = false;
	upPress!: SVGAnimateElement;
	downPress!: SVGAnimateElement;
	view!: SVGPathElement;
	
	id:string;
	alternateValues:Array<string>;
	
	
	constructor(id:string,pos:{x:number, y:number}={x:0,y:0},size:{width:number,height:number} = {width:6,height:6}, alternateValues:Array<string>=[id]){
		//super();
		this.id = id;
		this.alternateValues = alternateValues;

		this.view = this.createKeySVG(id,pos,size);
		var anims = this.createAnimSVGs(id, pos, size);
		this.upPress = anims.up;
		this.downPress = anims.down;
		this.view.appendChild(this.upPress);
		this.view.appendChild(this.downPress);
	}

	createKeySVG(id:string,pos:{x:number, y:number},size:{width:number,height:number}) : SVGPathElement {
		var keySVG = document.createElementNS('http://www.w3.org/2000/svg','path');
		keySVG.setAttribute("stroke","white");
		keySVG.setAttribute("fill","none");
		keySVG.setAttribute("id","key_"+id);
		keySVG.setAttribute("d","M " + pos.x.toString() + " " + pos.y.toString() + "\
			m 10 10 h "+ size.width.toString() + " a 3 3, 0, 0, 1, 1.5 5.2 l -3 3 a 3 3, 0, 0, 1, -2 1 \
			h -" + size.width.toString() + " a 3 3, 0, 0, 1, -1.5 -5.2 l 3 -3 a 3 3, 0, 0, 1, 2 -1 Z \
			m " + (2.5 + size.width).toString() + " 3 v " + size.height.toString() + " a 3 3, 0, 0, 1, -1 2 \
			l -2.5 2.5 a 3 3, 0, 0, 1, -2 1 h -" + size.width.toString() + " a 3 3, 0, 0, 1, -3 -3 v -" + size.height.toString());
		return keySVG;
	}

	createAnimSVGs(id:string,pos:{x:number, y:number},size:{width:number,height:number}) : {down:SVGAnimateElement,up:SVGAnimateElement} {
		var keyDown = document.createElementNS('http://www.w3.org/2000/svg','animate');
		keyDown.setAttribute('attributeName','d');
		keyDown.setAttribute('dur','.1s');
		keyDown.setAttribute('fill','freeze');
		keyDown.setAttribute('begin','indefinite');
		keyDown.setAttribute('id','downstroke_' + id);
		var keyUp = keyDown.cloneNode() as SVGAnimateElement;
		keyUp.setAttribute('id','upstroke_' + id);

		keyDown.setAttribute('values',"M "
			+ pos.x.toString() + " " + pos.y.toString() + " m 10 10 h "+ size.width.toString() + " a 3 3, 0, 0, 1, 1.5 5.2 l -3 3 a 3 3, 0, 0, 1, -2 1 \
			h -" + size.width.toString() + " a 3 3, 0, 0, 1, -1.5 -5.2 l 3 -3 a 3 3, 0, 0, 1, 2 -1 Z\
				m " + (2.5 + size.width).toString() + " 3 v " + size.height.toString() + " a 3 3, 0, 0, 1, -1 2 l -2.5 2.5 \
				a 3 3, 0, 0, 1, -2 1 h -"+ size.width.toString() + " a 3 3, 0, 0, 1, -3 -3 v -"+ size.height.toString() +";\
			M "+ pos.x.toString() + " " + pos.y.toString() + " m 10 15 h "+ size.width.toString() + " a 3 3, 0, 0, 1, 1.5 5.2 l -3 3 \
			a 3 3, 0, 0, 1, -2 1 h -" + size.width.toString() + " a 3 3, 0, 0, 1, -1.5 -5.2 l 3 -3 a 3 3, 0, 0, 1, 2 -1 Z\
				m " + (2.5 + size.width).toString() + " 3 v 2 a 3 3, 0, 0, 1, -1 2 l -2.5 2.5 a 3 3, 0, 0, 1, -2 1 \
				h -"+ size.width.toString() + " a 3 3, 0, 0, 1, -3 -3 v -2;");
		keyUp.setAttribute('values',"M "
			+ pos.x.toString() + " "+ pos.y.toString() + " m 10 15 h "+ size.width.toString() + " a 3 3, 0, 0, 1, 1.5 5.2 l -3 3 a 3 3, 0, 0, 1, -2 1 \
			h -" + size.width.toString() + " a 3 3, 0, 0, 1, -1.5 -5.2 l 3 -3 a 3 3, 0, 0, 1, 2 -1 Z\
				m " + (2.5 + size.width).toString() + " 3 v 2 a 3 3, 0, 0, 1, -1 2 l -2.5 2.5 a 3 3, 0, 0, 1, -2 1 h -"+ size.width.toString() + " a 3 3, 0, 0, 1, -3 -3 v -2;\
			M "+ pos.x.toString() + " " + pos.y.toString() + " m 10 10 h "+ size.width.toString() + " a 3 3, 0, 0, 1, 1.5 5.2 l -3 3 a 3 3, 0, 0, 1, -2 1 h -" + size.width.toString() + " a 3 3, 0, 0, 1, -1.5 -5.2 l 3 -3 a 3 3, 0, 0, 1, 2 -1 Z\
				m " + (2.5 + size.width).toString() + " 3 v " + size.height.toString() + " a 3 3, 0, 0, 1, -1 2 l -2.5 2.5 a 3 3, 0, 0, 1, -2 1 h -"+ size.width.toString() + " a 3 3, 0, 0, 1, -3 -3 v -" + size.height.toString() + ";");
	
		return {down: keyDown, up: keyUp};
	}
}

export class Keyboard {

	keyboardSVG :SVGSVGElement;
	keyMap : Map<string, Key> = new Map<string, Key>();

	constructor(configJSON:JSON) {
		this.keyboardSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
		this.keyboardSVG.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
		this.keyboardSVG.setAttribute("id","keyboard");
		this.keyboardSVG.setAttribute("autoFocus", "true");
		if (this.readJSON(configJSON))
		{
			this.createBinding();
		}
	}

	resetKeys() {
		this.keyboardSVG.focus();
		console.log(`requested key reset: resetting ${this.keyMap.size} ${this.keyMap.keys()}`)
		this.keyMap.forEach((key,id) =>
		{
			if (key.isDown)
			{
				console.log(`setUp: ${id}`);
				key.view.setAttribute("fill", "none");
				console.log(document.getElementById(`upstroke_${id}`));
				(document.getElementById(`upstroke_${id}`) as any).beginElement();
				key.isDown = key.id == "tab"; // tab does not redraw correctly upon tab out
			}

		});
	}
	resetKey(id:string)
	{
		this.keyMap.get(id)?.upPress.beginElement();
		this.keyMap.get(id)?.view.setAttribute("fill", "none");
	}

	addKey(id: string, row:number, column:number, accepted:Array<string> = [id], offset:[number,number] = [0,0], size:number = 1) {
		id = id.toLowerCase();
		var width = size * 6;
		var x = 15*column + offset[0];
		var y = 18*row + offset[1];
		var key = new Key(id,{x:x,y:y}, {width:width, height:6},accepted);
		console.info(`adding key: ${id}`);
		this.keyMap.set(key.id, key);
		this.keyboardSVG.appendChild(key.view);
	}

	createBinding()
	{
		console.log("creating binding");
		document.addEventListener('keydown', event => {
			if (event.repeat)
				{
					console.log(`repeat hold detected`);
					return;
				}
			let key = this.keyMap.get(event.code.toLowerCase());
			console.log(`keydown: ${event.code}`);
			if (key != null && !key.isDown)
			{
				//key.setAttribute("fill", "gray");
				(key.downPress as any).beginElement();
				//console.log(`key ${key.id} fill gray`);
				key.view.setAttribute("fill", "gray");
				key.isDown = true;
			}
			else if (key == null)
			{
				console.warn(`Key not found: ${event.code}:${event.key.toLowerCase()}`);
			}
			else if (event.key.toLowerCase().includes("lock"))
			{
				console.log(`lock key found, likely caps, num, or scroll: ${event.code}:${event.key.toLowerCase()}`);
				if (key.isDown)
				{
					//key.setAttribute("fill", "none");
					(key.upPress as any).beginElement();
					//console.log(`key ${key.id} fill none`);
					key.view.setAttribute("fill", "none");
					key.isDown = false;
				}
			}
			else if (key.isDown)
			{
				console.warn(`key down with key already down: ${event.code}:${event.key.toLowerCase()}`);
			}
		});

		document.addEventListener('keyup', event => {
			if (event.repeat)
			{
				console.log(`repeat hold detected`);
				return;
			}
			let key = this.keyMap.get(event.code.toLowerCase());
			console.log(`keyup: ${event.code}:${event.key.toLowerCase()}`);
			if (key != null && key.isDown)
			{
				//key.setAttribute("fill", "blue");
				(key.upPress as any).beginElement();
				//console.log(`key ${key.id} fill none`);
				key.view.setAttribute("fill", "none");
				key.isDown = false;
			}
			else if (key==null)
			{
				console.warn(`Key not found: ${event.code}:${event.key.toLowerCase()}`);
			}
			else if (!key.isDown)
			{
				console.warn(`key up with key not down: ${event.code}:${event.key.toLowerCase()}`);
			}
		});
	}

	readJSON(configJSON:any) : boolean
	{
		try
		{
			var offset:[number,number]=[0,0];
			for (const row in configJSON["keys"])
			{
				offset[0] = 0;
				var offsetKeys = 0;
				for (const column in configJSON["keys"][row])
				{
					
					var size = 1;
					var accepted:string[] = [];
					var key = configJSON["keys"][row][column];
					if (typeof key === "string")
					{
						offset[0] += 3;
						//console.info(`found default key ${key}`);
						this.addKey(key, Number(row), Number(column) - offsetKeys,[key], offset);
						continue;
					}
					if (key["gap"])
					{
						offset[1] += Number(key["gap"]) * 6;
						offsetKeys += 1;
						//console.info("inserting gap: ", key["gap"], Number(key["gap"]) * 6);
						continue;
					}

					if (key["offset"])
					{
						offset[0] += Number(key["offset"]) * 6;
						offsetKeys += 1;
						//console.info("inserting offset: ", key["offset"], Number(key["offset"]) * 6);
						continue;
					}

					for (const attribute in key)
					{
						key["id"] = attribute;
						for (const arg in key[key.id])
						{
							if (arg == "offset")
							{
								offset[0] += Number(key[key.id][arg]);
							}
							if (arg == "size")
							{
								size = Number(key[key.id][arg]);
							}
							if (arg == "accepted")
							{
								accepted.push(...key[key.id]["accepted"]);
								//console.log("setting accepted: ", accepted, key[key.id]["accepted"]);
								
							}
						}
					}
					if (key.id == "offset")
					{
						console.warn("Found offset key: ", key);
						offset[0] += Number(key["offset"]) * 6;
						offsetKeys += 1;
						//console.info("inserting offset: ", key["offset"], Number(key["offset"]) * 6);
						continue;
					}

					if (accepted.length == 0)
					{
						accepted.push(key.id);
						//console.info("Pushing singular accept: ", key.id);
					}

					//console.log(key.id, key, offset);
					if (size > 1)
					{
						offset[0] += 1;
					}
					offset[0] += 3;
					this.addKey(key.id, Number(row), Number(column) - offsetKeys,accepted, offset, size);
					offset[0] += (size*6-6);
					if (size > 1)
					{
						offset[0] += 1;
					}
				}
				
			}
			return true;
		} 
		catch (error)
		{
			console.error(`Could not create keyboard: ${error}`)
			return false;
		}
	}
}
/*
export async function createKeyboard(): Promise<SVGSVGElement>
{
	let keyboardSVG : SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg','svg');
	keyboardSVG.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
	keyboardSVG.setAttribute("id","keyboard");
	keyboardSVG.setAttribute("autoFocus", "true");
	

	let keyMap : Map<string, Key> = new Map<string, Key>();

	function createKey(id: string, row:number, column:number, accepted:Array<string> = [id], offset:[number,number] = [0,0], size:number = 1): Key
	{
		id = id.toLowerCase();
		var width = size * 6;
		var x = 15*column + offset[0];
		var y = 18*row + offset[1];
		var key = new Key(id,{x:x,y:y}, {width:width, height:6},accepted);
		console.info(`adding key: ${id}`);
		keyMap.set(key.id, key);
		return key;
		
	}

	/*try
	{
		const requestURL = '../../assets/config/keyConfig.json';
  		const request = new Request(requestURL);

  		const response = await fetch(request);
  		const keyFile = await response.json();
		var offset:[number,number]=[0,0];
		for (const row in keyFile["keys"])
		{
			offset[0] = 0;
			var offsetKeys = 0;
			for (const column in keyFile["keys"][row])
			{
				
				var size = 1;
				var accepted:string[] = [];
				var key = keyFile["keys"][row][column];
				if (typeof key === "string")
				{
					offset[0] += 3;
					//console.info(`found default key ${key}`);
					keyboardSVG.appendChild(createKey(key, Number(row), Number(column) - offsetKeys,[key], offset).view);
					continue;
				}
				if (key["gap"])
				{
					offset[1] += Number(key["gap"]) * 6;
					offsetKeys += 1;
					//console.info("inserting gap: ", key["gap"], Number(key["gap"]) * 6);
					continue;
				}

				if (key["offset"])
				{
					offset[0] += Number(key["offset"]) * 6;
					offsetKeys += 1;
					//console.info("inserting offset: ", key["offset"], Number(key["offset"]) * 6);
					continue;
				}

				for (const attribute in key)
				{
					key["id"] = attribute;
					for (const arg in key[key.id])
					{
						if (arg == "offset")
						{
							offset[0] += Number(key[key.id][arg]);
						}
						if (arg == "size")
						{
							size = Number(key[key.id][arg]);
						}
						if (arg == "accepted")
						{
							accepted.push(...key[key.id]["accepted"]);
							//console.log("setting accepted: ", accepted, key[key.id]["accepted"]);
							
						}
					}
				}
				if (key.id == "offset")
				{
					console.warn("Found offset key: ", key);
					offset[0] += Number(key["offset"]) * 6;
					offsetKeys += 1;
					//console.info("inserting offset: ", key["offset"], Number(key["offset"]) * 6);
					continue;
				}

				if (accepted.length == 0)
				{
					accepted.push(key.id);
					//console.info("Pushing singular accept: ", key.id);
				}

				//console.log(key.id, key, offset);
				if (size > 1)
				{
					offset[0] += 1;
				}
				offset[0] += 3;
				keyboardSVG.appendChild(createKey(key.id, Number(row), Number(column) - offsetKeys,accepted, offset, size).view);
				offset[0] += (size*6-6);
				if (size > 1)
				{
					offset[0] += 1;
				}
			}
			
		}
	}
	catch(e)
	{
		console.log("ERROR: ");
		console.log(e);
		let firstRow = 'tab keyq keyw keye keyr keyt keyy keyu keyi keyo keyp [ ] \\'.split(' ');
		let secondRow = 'capslock a s d f g h j k l ; \' enter'.split(' ');
		let thirdRow = 'shift z x c v b n m , . / rshift'.split(' ');

		let isoLayout = [firstRow, secondRow, thirdRow];
		var keyLayout = isoLayout;
		for (const [row, keyList] of keyLayout!.entries())
		{
			console.log(row + " shows " + keyList.entries());
			for (const [index, char] of keyList.entries())
			{
	
				keyboardSVG.appendChild(createKey(char, row, index ).view);
			}
		}

	}
	finally {
		console.log(`keyMap complete`);
	}



	console.log("creating binding");*/
	/*document.addEventListener('keydown', event => {
		if (event.repeat)
			{
				console.log(`repeat hold detected`);
				return;
			}
		let key = keyMap.get(event.code.toLowerCase());
		console.log(`keydown: ${event.code}`);
		if (key != null && !key.isDown)
		{
			//key.setAttribute("fill", "gray");
			(key.downPress as any).beginElement();
			//console.log(`key ${key.id} fill gray`);
			key.view.setAttribute("fill", "gray");
			key.isDown = true;
		}
		else if (key == null)
		{
			console.warn(`Key not found: ${event.code}:${event.key.toLowerCase()}`);
		}
		else if (event.key.toLowerCase().includes("lock"))
		{
			console.log(`lock key found, likely caps, num, or scroll: ${event.code}:${event.key.toLowerCase()}`);
			if (key.isDown)
			{
				//key.setAttribute("fill", "none");
				(key.upPress as any).beginElement();
				//console.log(`key ${key.id} fill none`);
				key.view.setAttribute("fill", "none");
				key.isDown = false;
			}
		}
		else if (key.isDown)
		{
			console.warn(`key down with key already down: ${event.code}:${event.key.toLowerCase()}`);
		}
		});


	document.addEventListener('keyup', event => {
		if (event.repeat)
		{
			console.log(`repeat hold detected`);
			return;
		}
		let key = keyMap.get(event.code.toLowerCase());
		console.log(`keyup: ${event.code}:${event.key.toLowerCase()}`);
		if (key != null && key.isDown)
		{
			//key.setAttribute("fill", "blue");
			(key.upPress as any).beginElement();
			//console.log(`key ${key.id} fill none`);
			key.view.setAttribute("fill", "none");
			key.isDown = false;
		}
		else if (key==null)
		{
			console.warn(`Key not found: ${event.code}:${event.key.toLowerCase()}`);
		}
		else if (!key.isDown)
		{
			console.warn(`key up with key not down: ${event.code}:${event.key.toLowerCase()}`);
		}
		});


	return keyboardSVG;
}*/
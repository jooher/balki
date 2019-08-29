const	form	= document.getElementById("form"),
	inputs	= [...form.elements],
	input	= ()=>{let i={}; inputs.forEach(e=>i[e.name]=e.value); return i;},
	output	= obj=>{for(let i in obj)form.elements[i].value=obj[i];},
	doska	= w=> w<100?40 : w<150?70 : w<200?100 : w,
	
	height	= form.elements["height"],
		
	calc	= ()=>{
		const	$	= input(),
			p	= document.querySelector("input[name='profile']:checked").value,
			//p	= $.profile,
			doski	= doska($.width)*Math.round(p/10) + doska($.height)*(p%10),
			brush	= $.brush ? doski*.5 : 0,
			kraska	= $.paint ? doski*.4 : 0,
			meter	= doski + brush + kraska,
			balka	= meter * $.length *.001,
			summa	= balka * $.qty,
			skidka	= summa>1e5?25 : summa>5e4?15 :  summa>1e4?10 : 0,
			itogo	= summa * (1-(.01*skidka));
			
		height.disabled = p=='10';
			
		output({meter,balka,summa,skidka,itogo});
	};
	
	inputs.forEach(i=>i.onchange=calc);
	
	calc();
	
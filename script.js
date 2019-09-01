const	form	= document.getElementById("form"),
	inputs	= [...form.elements],
	input	= ()=>{let i={}; inputs.forEach(e=>i[e.name]=e.value); return i;},
	output	= obj=>{for(let i in obj)form.elements[i].value=obj[i];},
	doska	= w=> w<100?40 : w<150?70 : w<200?100 : w,
	
	height	= form.elements["height"],
	
	K		= 2,
		
	calc	= ()=>{
		const	$	= input(),
			p	= document.querySelector("input[name='profile']:checked").value,
			//p	= $.profile,
			
			doski	= doska($.width)*[0,1,1,1,2][p] + doska($.height)*[0,0,1,2,2][p],
			brush	= doski*[0,1.5,2][$.brush||0],
			paint	= doski*[0,2,3,5][$.paint||0],
			meter	= doski + brush + paint,
			balka	= meter * $.length *.001,
			summa	= balka * $.qty,
			skidka	= summa>1e5?25 : summa>5e4?15 :  summa>1e4?10 : 0,
			itogo	= Math.round(summa * (1-(.01*skidka)));
			
		height.disabled = p=='10';
			
		output({meter,balka,summa,skidka,itogo});
	};
	
	inputs.forEach(i=>i.onchange=calc);
	
	calc();
	
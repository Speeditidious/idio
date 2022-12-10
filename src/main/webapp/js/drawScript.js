/* color picker http://bgrins.github.io/spectrum/ */
$(function() {
	CreatePallete();
	InitDragDrop();
});

// Create Color Pallete
function CreatePallete(){
	$('#pallete').spectrum({
		preferredFormat: 'hex',		// color format
		color: '#000000',						// initial color
		showPalette: true,				// show color
		showInitial: true,				// show current color
		showInput: true,					// input color by text available
		showAlpha: true,					// alpha available
		maxSelectionSize: 3,			// max num of recently used color
		// event when open pallete
		show: function(color){
			
		},
		// event when color changed
		change: function(color){
			color.toHexString()
		},
		// event when close pallete
		hide: function(color){
			ChangeBrushColor(color);
		},
	});
}


// Change all the brush color
function ChangeBrushColor(color){
	$('.brush').css('color', color);
}

/* Drag & Drop start */
// set drag & drop event
// reference: https://heodolf.tistory.com/105
function InitDragDrop(){
	
	// get relative position of brush when clicked
	function handleMouseDown(e){
		e.preventDefault();
		
		var el = e.target.parentNode;
		var classList = el.classList;
		
		if(!classList.contains('hold')){
			// 마우스 커서의 XY좌표
	    const mouseX = e.pageX;
	    const mouseY = e.pageY;
	    
	    // 선택한 브러쉬의 XY좌표 (왼쪽 상단 모서리 기준)
	    const brushPos = el.getBoundingClientRect();
	    const brushX = brushPos.x + (mouseX - e.clientX);
	    const brushY = brushPos.y + (mouseY - e.clientY);
	    
	    // 선택한 브러쉬 안에 있는 마우스 커서의 XY좌표
	    const gapX = mouseX - brushX;
	    const gapY = mouseY - brushY;
	    
	    el.setAttribute("gap-x", gapX);
    	el.setAttribute("gap-y", gapY);
    	
    	const copyElem = CopyBrush(el);
			copyElem.style.position = 'absolute';
			copyElem.style.left = brushX+'px';
			copyElem.style.top = brushY+'px';
			copyElem.classList.add('hold');
			$('#canvas').append(copyElem);
		}
	}
	
	// move the brush
	function handleMouseMove(e){
		e.preventDefault();
		
		const el = document.querySelector(".hold");
		
		if( el ){
			// 마우스 커서의 XY좌표
	    const mouseX = e.pageX;
	    const mouseY = e.pageY;
	    
	    // 선택한 브러쉬 안에 있는 마우스 커서의 XY좌표
	    const gapX = el.getAttribute("gap-x");
    	const gapY = el.getAttribute("gap-y");
    	
    	// 마우스 커서의 위치에 따른 브러쉬의 XY좌표
    	const brushX = mouseX - gapX;
	    const brushY = mouseY - gapY;
	    
	    // 움직이기
			el.style.left = brushX+'px';
			el.style.top = brushY+'px';
		}
	}
	
	// put on canvas
	function handleMouseUp(e){
		e.preventDefault();
		
		const el = document.querySelector(".hold");
		
		if( el ){
			// 마우스 커서의 XY좌표
	    const mouseX = e.pageX;
	    const mouseY = e.pageY;
	    
	    // 선택한 브러쉬 안에 있는 마우스 커서의 XY좌표
	    const gapX = el.getAttribute("gap-x");
    	const gapY = el.getAttribute("gap-y");
    	
    	// 마우스 커서의 위치에 따른 브러쉬의 XY좌표
    	const brushX = mouseX - gapX;
	    const brushY = mouseY - gapY;
	    // 우측아래
	    const brushRightBottomX = brushX + 100;
	    const brushRightBottomY = brushY + 100;
		
	    // 움직이면 적용된 속성 및 class를 삭제
	    el.removeAttribute("gap-x")
	    el.removeAttribute("gap-y")
	    
	    el.classList.remove("hold");
	    
	    // 마우스 위치 캔버스 안에 없으면 삭제
	    var canvas = document.getElementById('canvas');
	    const canvasPos = canvas.getBoundingClientRect();
	    const canvasPosLeftTopX = canvasPos.x + (mouseX - e.clientX);
	    const canvasPosLeftTopY = canvasPos.y + (mouseY - e.clientY);
	    const canvasPosRightBottomX = canvasPos.right + (mouseX - e.clientX);
	    const canvasPosRightBottomY = canvasPos.bottom + (mouseY - e.clientY);
	    // 캔버스 밖
	    if(brushRightBottomX <= canvasPosLeftTopX || brushRightBottomY <= canvasPosLeftTopY
	    	|| brushX >= canvasPosRightBottomX || brushY >= canvasPosRightBottomY){
	    	var parent = el.parentNode;
	    	parent.removeChild(el);
	    }
	    // 이미지 캔버스 바깥 쪽 자르기
	    canvasBorder = getComputedStyle(canvas).getPropertyValue('border-width');
	    canvasBorder = Number(canvasBorder.slice(0, -2));
	    clipTop = canvasPosLeftTopY - brushY + canvasBorder;
	    if(clipTop <= 0) clipTop = 0;
	    clipRight = canvasPosRightBottomX - brushRightBottomX + 100 - canvasBorder;
	    if(clipRight >= 100) clipRight = 100; 
	    clipBottom = canvasPosRightBottomY - brushRightBottomY + 100 - canvasBorder;
	    if(clipBottom >= 100) clipBottom = 100; 
	    clipLeft = canvasPosLeftTopX - brushX + canvasBorder;
	    if(clipLeft <= 0) clipLeft = 0;
	    el.style.clip = 'rect(' + clipTop+'px, ' + clipRight+'px, ' + clipBottom+'px, ' + clipLeft+'px ' + ')';
	  }
	}
	
	let items = document.querySelectorAll('.brush');
	items.forEach(function(item) {
    item.firstElementChild.addEventListener('mousedown', handleMouseDown);
  });
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

// copy brush element
function CopyBrush(el){
	const copyElem = el.cloneNode(true);
	var brushStyle = getComputedStyle(el);
	copyElem.className = "copied-brush";
	copyElem.style.width = brushStyle.getPropertyValue('width');
	copyElem.style.height = brushStyle.getPropertyValue('height');
	copyElem.style.fontSize = brushStyle.getPropertyValue('font-size');
	copyElem.style.lineHeight = brushStyle.getPropertyValue('line-height');
	copyElem.style.textAlign = brushStyle.getPropertyValue('text-align');
	copyElem.style.color = brushStyle.getPropertyValue('color');
	
	return copyElem;
}
/* Drag & Drop end */
var entity_index = 0;
var current_brush_set = 1;
var NUM_BRUSH_SET = 6;

var brush_1_set = [
	'<i class="fa-sharp fa-solid fa-circle"></i>',
	'<i class="fa-sharp fa-solid fa-grip-lines">',
	'<i class="fa-sharp fa-solid fa-person"></i>',
	'<i class="fa-sharp fa-solid fa-plus"></i>',
	'<i class="fa-sharp fa-solid fa-star"></i>',
	'<i class="fa-sharp fa-solid fa-comment"></i>'
];

var brush_2_set = [
	'<i class="fa-solid fa-arrow-pointer"></i>',
	'<i class="fa-solid fa-plane"></i>',
	'<i class="fa-solid fa-car"></i>',
	'<i class="fa-brands fa-github"></i>',
	'<i class="fa-solid fa-music"></i>',
	'<i class="fa-solid fa-bomb"></i>'
];

var brush_3_set = [
	'<i class="fa-brands fa-youtube"></i>',
	'<i class="fa-solid fa-bell"></i>',
	'<i class="fa-solid fa-triangle-exclamation"></i>',
	'<i class="fa-solid fa-droplet"></i>',
	'<i class="fa-solid fa-bolt"></i>',
	'<i class="fa-regular fa-snowflake"></i>'
];

var brush_4_set = [
	'<i class="fa-solid fa-copyright"></i>',
	'<i class="fa-solid fa-clock"></i>',
	'<i class="fa-solid fa-person-running"></i>',
	'<i class="fa-solid fa-person-swimming"></i>',
	'<i class="fa-solid fa-fish"></i>',
	'<i class="fa-solid fa-face-angry"></i>'
]

var brush_5_set = [
	'<i class="fa-solid fa-tree"></i></div>',
	'<i class="fa-brands fa-pagelines"></i>',
	'<i class="fa-solid fa-gift"></i>',
	'<i class="fa-solid fa-1"></i>',
	'<i class="fa-solid fa-phone"></i>',
	'<i class="fa-solid fa-mobile-screen-button"></i>'
]

var brush_6_set = [
	'<i class="fa-solid fa-hashtag"></i>',
	'<i class="fa-solid fa-display"></i>',
	'<i class="fa-solid fa-computer-mouse"></i>',
	'<i class="fa-solid fa-print"></i>',
	'<i class="fa-solid fa-robot"></i>',
	'<i class="fa-solid fa-brain"></i>'
]

/* color picker http://bgrins.github.io/spectrum/ */
$(function() {
	CreatePallete();
	UpdateBrushSet(current_brush_set);
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

// Change brush set
function PrevBrushSet(){
	// first page of brush set
	if(current_brush_set <= 1){
		current_brush_set = 1;
		return;
	}
	
	current_brush_set -= 1;
	UpdateBrushSet(current_brush_set);
}

function NextBrushSet(){
	// last page of brush set
	if(current_brush_set >= NUM_BRUSH_SET){
		current_brush_set = NUM_BRUSH_SET;
		return;
	}
	
	current_brush_set += 1;
	UpdateBrushSet(current_brush_set);
}

function UpdateBrushSet(page){
	$('#brush-1').empty();
	$('#brush-1').append(brush_1_set[page - 1]);
	$('#brush-2').empty();
	$('#brush-2').append(brush_2_set[page - 1]);
	$('#brush-3').empty();
	$('#brush-3').append(brush_3_set[page - 1]);
	$('#brush-4').empty();
	$('#brush-4').append(brush_4_set[page - 1]);
	$('#brush-5').empty();
	$('#brush-5').append(brush_5_set[page - 1]);
	$('#brush-6').empty();
	$('#brush-6').append(brush_6_set[page - 1]);
	UpdateDragDrop();
}

/* Drag & Drop start */
// set drag & drop event
// reference: https://heodolf.tistory.com/105
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
	
function InitDragDrop(){
	let items = document.querySelectorAll('.brush');
	items.forEach(function(item) {
    item.firstElementChild.addEventListener('mousedown', handleMouseDown);
  });
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

// apply drag & drop handler to new brushes
function UpdateDragDrop(){
	let items = document.querySelectorAll('.brush');
	items.forEach(function(item) {
    item.firstElementChild.addEventListener('mousedown', handleMouseDown);
  });
}

// copy brush element
function CopyBrush(el){
	const copyElem = el.cloneNode(true);
	entity_index += 1;
	var brushStyle = getComputedStyle(el);
	copyElem.className = "copied-brush";
	copyElem.setAttribute('id', 'copied-brush-' + entity_index);
	copyElem.style.width = brushStyle.getPropertyValue('width');
	copyElem.style.height = brushStyle.getPropertyValue('height');
	copyElem.style.fontSize = brushStyle.getPropertyValue('font-size');
	copyElem.style.lineHeight = brushStyle.getPropertyValue('line-height');
	copyElem.style.textAlign = brushStyle.getPropertyValue('text-align');
	copyElem.style.color = brushStyle.getPropertyValue('color');
	
	return copyElem;
}
/* Drag & Drop end */
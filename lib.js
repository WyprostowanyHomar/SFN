SQRT  = Math.sqrt
ABS   = Math.abs
MIN   = Math.min
MAX   = Math.max
SIN   = Math.sin
COS   = Math.cos
EXP   = Math.exp
LOG   = Math.log
FLOOR = Math.floor
CEIL  = Math.ceil
CONST = function(x){return function(){return x}}

//------------------------------------------------------------------------------

function MAP  (t, x0, y0, x1, y1){ return y1 + (y0 - t)/(y0 - x0) * (x1 - y1) }
function MAPV (t, x0, y0, x1, y1){ return Vec2(MAP(t.x, x0.x, y0.x, x1.x, y1.x), MAP(t.y, x0.y, y0.y, x1.y, y1.y)) }
function QMAPV(t, x0, y0, x1, y1){ t.x = MAP(t.x, x0.x, y0.x, x1.x, y1.x); t.y = MAP(t.y, x0.y, y0.y, x1.y, y1.y); return t }
function LERP  (t, x, y){ return x + (y - x) * t }
function LERPV (t, x, y){ return QADD(SMultiple(t, SUB(y, x)), x) }
function QLERPV(t, x, y){ return QADD(QSMultiple(t, SUB(y, x)), x) }
function RLERP  (t, x, y){ return (t - x) / (y - x) }
function RLERPV (t, x, y){ let T = SUB(t, x); let V = SUB(y, x); return Vec2(SProduct(T,V), SProduct(T, QPerpendicular(V)))}
function QRLERPV(t, x, y){ QSUB(t, x); let V = SUB(y, x); return Vec2(SProduct(t,V), SProduct(t, QPerpendicular(V)))}

function Vec2(x = 0, y = 0){ return {x:x,y:y} }
function Vec1(x = 0){ return {x:x,y:0} }

EVec1 = Vec2(1, 0)
EVec2 = Vec2(0, 1)

function ADD (v, w){ return {x:v.x + w.x, y:v.y + w.y} }
function QADD(v, w){ v.x += w.x; v.y += w.y; return v }

function SUB (v, w){ return {x:v.x - w.x, y:v.y - w.y} }
function QSUB(v, w){ v.x -= w.x; v.y -= w.y; return v }
function NEG (v){ return {x:-v.x, y:-v.y} }
function QNEG(v){ v.x = -v.x; v.y = -v.y; return v }

function CProduct (v, w) { return {x:v.x*w.x - v.y*w.y, y:v.x*w.y+v.y*w.x} }
function QCProduct(v, w) { let x = v.x*w.x - v.y*w.y; v.y = v.x*w.y+v.y*w.x; v.x = x; return v }
function SProduct (v, w) { return v.x*w.x + v.y*w.y }
function VProduct (v, w) { return v.x*w.y-v.y*w.x }
//function PlusProduct(v) {v = {x:ABS(v.x),y:ABS(v.y)}; return QCProduct(v,v)}

function SMultiple (s, v){ return {x:v.x*s, y:v.y*s} }
function QSMultiple(s, v){ v.x *= s; v.y *= s; return v }

function CDiv (v, w){ let l = v.x*v.x+v.y*v.y; return {x:(v.x*w.x+v.y*w.y)/l, y:(v.y*w.x-v.x*w.y)/l} }
function QCDiv(v, w){ let l = v.x*v.x+v.y*v.y; let x = (v.x*w.x+v.y*w.y)/l; v.y = (v.y*w.x-v.x*w.y)/l; v.x = x; return v }
function CInvert (v){ let l = v.x*v.x+v.y*v.y; return {x:v.x / l, y:-v.y / l} }
function QCInvert(v){ let l = v.x*v.x+v.y*v.y; v.x /= l; v.y /= -l; return v }

function Conjugate (v){ return {x:v.x, y:-v.y} }
function QConjugate(v){ v.y = -v.y; return v }
function Perpendicular (v){ return {x:-v.y, y:v.x} }
function QPerpendicular(v){ let x = v.x; v.x = -v.y; v.y = x; return v }
function Projection  (v, w){ let s = v.x*w.x + v.y*w.y; return {x:w.x * s, y:w.y * s} }
function QProjection (v, w){ let s = v.x*w.x + v.y*w.y; v.x = w.x*s; v.y = w.y*s; return v }

function Len1(v){ return ABS(v.x) }
function Len2(v){ return SQRT(v.x*v.x+v.y*v.y) }

function QLen1(v){ return v.x*v.x }
function QLen2(v){ return v.x*v.x+v.y*v.y }

function Unit1  (v){ return {x:v.x / ABS(v.x), y:0} }
function QUnit1 (v){ v.x /= ABS(v.x); return v }
function Unit2  (v){ let l = SQRT(v.x*v.x+v.y*v.y); return {x:v.x / l, y:v.y / l} }
function QUnit2 (v){ let l = SQRT(v.x*v.x+v.y*v.y); v.x /= l; v.y /= l; return v }
function VecABS (v){ return {x:ABS(v.x), y:ABS(v.y)} }
function QVecABS(v){ v.x = ABS(v.x); v.y = ABS(v.y); return v }

function Matrix22(a, b, c, d){ return {M:[[a,b], [c,d]], x:2, y:2} }
function Matrix33(a,b,c, d,e,f, g,h,j){ return {M:[[a,b,c], [c,d,e], [g,h,j]], x:3, y:3} }
function Matrix(data){ return {M:data, x:data[0].length, y:data.length} }
function RotMatrix(alpha){ return {M:[[COS(alpha), SIN(alpha)], [-SIN(alpha), COS(alpha)]], x:2, y:2} }
function RotAffMatrix(alpha){ return {M:[[COS(alpha), SIN(alpha), 0], [-SIN(alpha), COS(alpha), 0], [0, 0, 1]], x:3, y:3} }
function TransAffMatrix(dx, dy){ return {M:[[0, 0, dx], [0, 0, dy], [0, 0, 1]], x:3, y:3} }

function MulMM(A, B){
  let AM = A.M; BM = B.M
  let x  = B.x; y  = A.y
  let z  = MIN(A.x, B.y)
  let res = new Array(y)
  let sum = 0
  for(j = 0; j < y; j++){
    res[j] = new Array(x)
    for(i = 0; i < x; i++){
      sum = AM[j][0]*BM[0][i]
      for(k = 1; k < z; k++)
        sum += AM[j][k]*BM[k][i]
      res[j][i] = sum
  }}
  return {M:res, x:x, y:y}
}

function MulMV2(A, v){
  let AM = A.M
  return Vec2(AM[0][0]*v.x + AM[0][1]*v.y, AM[1][0]*v.x + AM[1][1]*v.y)
}

function AffMV2(A, v){
  let AM = A.M
  return Vec2(AM[0][0]*v.x + AM[0][1]*v.y + AM[0][2], AM[1][0]*v.x + AM[1][1]*v.y + AM[1][2]) 
}

function ProjMV2(A, v){
  let AM = A.M
  let s = AM[2][0]*v.x+AM[2][1]*v.y+AM[2][2]
  return Vec2((AM[0][0]*v.x + AM[0][1]*v.y + AM[0][2])/s, (AM[1][0]*v.x + AM[1][1]*v.y + AM[1][2])/s) 
}

//------------------------------------------------------------------------------

function inBox(X, A, B)   { return X.x >= A.x && X.x <= B.x && X.y >= A.y && X.y <= B.y }
function inCircle(X, p, r){ return QLen2(SUB(X,p)) <= r*r }

//------------------------------------------------------------------------------

Mouse = {pos:{x:0, y:0}, pressed:0, justPressed:0, justRelised:0}

document.onmousemove = function(event){
  Mouse.pos.x = event.clientX + document.body.scrollLeft
  Mouse.pos.y = event.clientY + document.body.scrollTop
}

document.onmousedown = function(event){
  Mouse.pressed     |= event.buttons
  Mouse.justPressed |= event.buttons
}

document.onmouseup   = function(event){
  Mouse.pressed     ^= Mouse.pressed & [0, 1, 4, 2][event.which]
  Mouse.justRelised |= [0, 1, 4, 2][event.which]
}

Mouse.ButtonsDown = function(){
  return {left  : 1 === (1 & Mouse.pressed),
          right : 2 === (2 & Mouse.pressed),	    
	  middle: 4 === (4 & Mouse.pressed)}
  }
Mouse.Pressed = function(){
  let temp = {left  : 1 === (1 & Mouse.justPressed),
              right : 2 === (2 & Mouse.justPressed),
	      middle: 4 === (4 & Mouse.justPressed)}
  Mouse.justPressed = 0
  return temp
}

Mouse.Relised = function(){
  let temp = {left  : 1 === (1 & Mouse.justRelised),
              right : 2 === (2 & Mouse.justRelised),
	      middle: 4 === (4 & Mouse.justRelised)}
  Mouse.justRelised = 0
  return temp
}

//------------------------------------------------------------------------------

function Canvas(width, height, origin, scale){
  let canvas = document.createElement('canvas')
  canvas.oncontextmenu = CONST(false)
  canvas.width  = width
  canvas.height = height
  let self = {obj:canvas, ctx:canvas.getContext('2d'), mouseInRange:false, width:width, height:height, size:MIN(width, height), scale:scale, origin:origin}
  self.px = (width  - self.size)/2
  self.py = (height - self.size)/2
  self.mousePos = function(){
    let pos = SUB(Mouse.pos, Vec2(canvas.offsetLeft, canvas.offsetTop))
    self.mouseInRange = inBox(pos, Vec2(0,0), Vec2(width, height))
    return pos
  }
  self.imagePos = function(vec){
    return QADD(QConjugate(QSMultiple(self.scale/self.size*2, QSUB(vec, Vec2(self.width/2, self.height/2)))), self.origin)
  }
  self.pixelPos = function(vec){
	return QADD(Vec2(self.width/2, self.height/2),QConjugate(QSMultiple(self.size/self.scale/2, SUB(vec, self.origin)))) 
  }
  self.clear = function(color = QGray(255)){
	  self.ctx.fillStyle = COLOR(color)
	  self.ctx.fillRect(0,0, self.width, self.height)
  }
  return self
}

function Slider(min, max, start, f = function(x){return x}){
  let range   = document.createElement('input')
  range.type  = 'range'
  range.min   = min
  range.max   = max
  range.value = start
  range.setAttribute('class', 'slider')
  let self = {obj:range, value:start}
  self.hasChanged = function(){
    let t = self.value != parseInt(self.obj.value)
    self.value = parseInt(self.obj.value)
    return t
  }
  self.getValue = function(){
    self.value = parseInt(self.obj.value)
    return self.value
  }
  return self
}

function Button(name){
  let button = document.createElement('button')
  button.innerHTML = name
  button.setAttribute('class', 'button')
  let self = {obj:button, pressedCount: 0}
  button.onclick = function(){ self.pressedCount++ }
  self.Pressed = function(){
    let t = self.pressedCount;
    self.pressedCount = 0;
    return t
  }
  return self
}

function Switch(cycle){
  let button = document.createElement('button')
  button.setAttribute('class', 'switch')
  button.innerHTML = cycle[0]
  let self = {obj:button, cycle:cycle, index:0, changed:false}
  self.setIndex = function(index){
    self.index  = index % self.cycle.length
    self.obj.innerHTML = self.cycle[index]
  }
  button.onclick = function(){
    self.index = (self.index + 1) % self.cycle.length
    self.obj.innerHTML = self.cycle[self.index]
    self.changed = true
  }
  button.oncontextmenu = function(){
    self.index = (self.cycle.length + self.index - 1) % self.cycle.length
    self.obj.innerHTML = self.cycle[self.index]
    self.changed = true
    return false
  }
  self.hasChanged = function(){
    let t = self.changed
    self.changed = false
    return t
  }
  return self
}

function TextInput(columns, lines, start){
  let input = document.createElement('textarea')
  let self  = {obj:input, value:start}
  input.setAttribute('class', 'textInput')
  input.cols = columns
  input.rows = lines
  input.style.resize = 'none'
  input.value = start
  self.hasChanged = function(){
    let t = (self.obj.value != self.value)
    self.value = self.obj.value
    return t
  }
  self.getText = function(){
    self.value = self.obj.value
    return self.value
  }
  self.setText = function(str){
    input.value = str
    self.value  = str
  }
  return self
}

function Text(str){
  let text = document.createElement('textarea')
  text.setAttribute('class', 'text')
  text.value = str
  text.style.resize = 'none'
  text.setAttribute('readonly', true)
  text.cols = str.length
  text.rows = 1
  let self = {obj:text}
  self.setText = function(str){
    text.value = str
  }
  return self
}

//------------------------------------------------------------------------------

function AppendOBJ(obj, div = document.body){
  div.appendChild(obj.obj ? obj.obj : obj)
}

function CreatePresentation(options, origin = Vec2(0,0), scale = 1){
  let DIV     = document.createElement('div')
  let MAIN    = document.createElement('div')
  let OPTIONS = document.createElement('div')
  DIV.    setAttribute('class', 'presentation')
  MAIN.   setAttribute('class', 'main')
  OPTIONS.setAttribute('class', 'options')
  AppendOBJ(MAIN,    DIV)
  AppendOBJ(OPTIONS, DIV)
  AppendOBJ(DIV)
  let CANVAS = Canvas(MAIN.clientWidth, MAIN.clientHeight, origin, scale)
  AppendOBJ(CANVAS, MAIN)
  CANVAS.obj.setAttribute('class', 'center')
  let self = {obj:DIV, can:CANVAS, opt:OPTIONS}
  self.addOptions = function(options){
    options.forEach(function(list){
      if(!list.format){
        list.forEach(function(o){ 
	  o.obj.style.width = '100%'
          AppendOBJ(o, OPTIONS)
        })
      } else if(list.format === 'justify'){
        let len = list.elems.length
        list.elems.forEach(function(o){ 
          o.obj.style.width = (100/len - 1) + '%'
          AppendOBJ(o, OPTIONS)
        })
      } else if(list.format === 'alignLeft'){
        list.elems.forEach(function(o){ 
	  o.obj.style.float = 'left'
	  o.obj.style.verticalalign = 'top'
          AppendOBJ(o, OPTIONS)
        })
	/* It does not work as intended
	let width = 0
	console.log(width)
        list.elems.forEach(function(o){
	  console.log(o.obj.clientwidth) 
	  width += o.obj.clientwidth
	})
	console.log(width)
        list.elems.forEach(function(o){
	  o.obj.style.width = (width / o.obj.clientwidth) + '%'
	})*/
      }
      AppendOBJ(document.createElement('br'), OPTIONS)
    })
  }
  self.addOptions(options)
  return self
}

//------------------------------------------------------------------------------

function QRGB(r,g,b){ return [r, g, b] }
function RGB (r,g,b){ return [(r%256)|0, (g%256)|0, (b%256)|0] }
function NRGB(r,g,b){ return [(r*256)|0, (g*256)|0, (b*256)|0] }
function QGray(l){ return [l, l, l] }
function Gray (l){ return RGB (l,l,l) }
function NGray(l){ return NRGB(l,l,l) }

function ColorLerp(t, A, B){ return [LERP(t, A[0], B[0]), LERP(t, A[1], B[1]), LERP(t, A[2], B[2])] }

function COLOR(C){ 
  r = C[0].toString(16);
  g = C[1].toString(16);
  b = C[2].toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
//------------------------------------------------------------------------------

function MakeCanvasGreatAgain(self){
	self.LINE = function(A, B, color = QGray(0), w = 1){
		self.ctx.beginPath()
		X = self.pixelPos(A)
		self.ctx.moveTo(X.x, X.y)
		X = self.pixelPos(B)
		self.ctx.lineTo(X.x, X.y)
		self.ctx.lineWidth = (w / self.scale)
		self.ctx.strokeStyle = COLOR(color)
		self.ctx.stroke()
	}
	self.CIRCLE = function(A, r, color = QGray(0), w = 1, a0 = 0, a1 = 2 * Math.PI){
		self.ctx.beginPath()
		X = self.pixelPos(A)
		self.ctx.arc(X.x, X.y, r / self.scale, a0, a1);
		self.ctx.lineWidth = (w / self.scale)
		self.ctx.strokeStyle = COLOR(color)
		self.ctx.stroke()
	}
	self.BALL = function(A, r, color = QGray(0), a0 = 0, a1 = 2 * Math.PI){
		self.ctx.beginPath()
		X = self.pixelPos(A)
		self.ctx.arc(X.x, X.y, r / self.scale, a0, a1);
		self.ctx.fillStyle = COLOR(color)
		self.ctx.fill()
		//console.log(X, COLOR(color), r / self.scale, a0, a1)
	}
	return self
}
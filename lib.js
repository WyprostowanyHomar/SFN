SQRT  = Math.sqrt
ABS   = Math.abs
MIN   = Math.min
MAX   = Math.max
SIN   = Math.sin
COS   = Math.cos
EXP   = Math.exp
LOG   = Math.log
FLOOR = Math.floor

function MAP (t, x0, y0, x1, y1){ return y1 + (y0 - t)/(y0 - x0) * (x1 - y1) }
function MAPV(t, x0, y0, x1, y1){ return Vec3(MAP(t.x, x0.x, y0.x, x1.x, y1.x), MAP(t.y, x0.y, y0.y, x1.y, y1.y), MAP(t.z, x0.z, y0.z, x1.z, y1.z)) }
function LERP (t, x, y){ return x + (y - x) * t }
function LERPV(t, x, y){ return QADD(QSMultiple(t, SUB(y, x)), x) }

function Vec3(x = 0, y = 0, z = 0){ return {x:x, y:y, z:z, u:1} }
function Vec2(x = 0, y = 0){ return Vec3(x,y,0) }
function Vec1(x = 0){ return Vec3(x,0,0) }

EVec1 = Vec3(1, 0, 0)
EVec2 = Vec3(0, 1, 0)
EVec3 = Vec3(0, 0, 1)

function ADD (v, w){ return Vec3(v.x + w.x, v.y + w.y, v.z + w.z) }
function QADD(v, w){ v.x += w.x; v.y += w.y; v.z += w.z; return v }

function SUB (v, w){ return Vec3(v.x - w.x, v.y - w.y, v.z - w.z) }
function QSUB(v, w){ v.x -= w.x; v.y -= w.y; v.z -= w.z; return v }
function NEG (v){ return Vec3(-v.x, -v.y, -v.z) }
function QNEG(v){ v.x = -v.x; v.y = -v.y; v.z = -v.z; return v }

function CProduct (v, w) { return Vec2(v.x*w.x - v.y*w.y, v.x*w.y+v.y*w.x) }
function QCProduct(v, w) { let x = v.x*w.x - v.y*w.y; v.y = v.x*w.y+v.y*w.x; v.x = x; return v }
function SProduct (v, w) { return v.x*w.x + v.y*w.y + v.z*w.z }
function VProduct (v, w) { return Vec3(v.y*w.z - v.z*w.y, v.z*w.x-v.x*w.z, v.x*w.y-v.y*w.x) }
function QVProduct(v, w) { let x = v.y*w.z - v.z*w.y; let y = v.z*w.x-v.x*w.z; v.z = v.x*w.y-v.y*w.x; v.x = x; v.y = y; return v }

function SMultiple(s, v) { return Vec3(v.x*s, v.y*s, v.z*s) }
function QSMultiple(s, v){ v.x *= s; v.y *= s; v.z *= s; return v }

function CDiv (v, w){ let l = v.x*v.x+v.y*v.y; return Vec2((v.x*w.x+v.y*w.y)/l, (v.y*w.x-v.x*w.y)/l) }
function QCDiv(v, w){ let l = v.x*v.x+v.y*v.y; let x = (v.x*w.x+v.y*w.y)/l; v.y = (v.y*w.x-v.x*w.y)/l; v.x = x; return v }
function CInvert (v){ let l = v.x*v.x+v.y*v.y; return Vec2(v.x / l, -v.y / l) }
function QCInvert(v){ let l = v.x*v.x+v.y*v.y; v.x /= l; v.y /= -l; return v }

function Conjugate(v) { return Vec2(v.x, -v.y) }
function QConjugate(v){ return Vec2(v.x, -v.y) }

function Len1(v){ return ABS(v.x) }
function Len2(v){ return SQRT(v.x*v.x+v.y*v.y) }
function Len3(v){ return SQRT(v.x*v.x+v.y*v.y+v.z*v.z) }

function QLen1(v){ return v.x*v.x }
function QLen2(v){ return v.x*v.x+v.y*v.y }
function QLen3(v){ return v.x*v.x+v.y*v.y+v.z*v.z }

function Unit1 (v){ return Vec1(v.x / ABS(v.x)) }
function QUnit1(v){ v.x /= ABS(v.x); return v }
function Unit2 (v){ let l = SQRT(v.x*v.x+v.y*v.y); return Vec2(v.x / l, v.y / l) }
function QUnit2(v){ let l = SQRT(v.x*v.x+v.y*v.y); v.x /= l; v.y /= l; return v }
function Unit3 (v){ let l = SQRT(v.x*v.x+v.y*v.y+v.z*v.z); return Vec3(v.x / l, v.y / l, v.z / l) }
function QUnit3(v){ let l = SQRT(v.x*v.x+v.y*v.y+v.z*v.z); v.x /= l; v.y /= l; v.z /= l; return v }
function VecABS(v){ return Vec3(ABS(v.x), ABS(v.y), ABS(v.z)) }
function QVecABS(v){ v.x = ABS(v.x); v.y = ABS(v.y); v.z = ABS(v.z); return v }

function Matrix22(a, b, c, d){ return {M:[[a,b], [c,d]], x:2, y:2} }
function Matrix33(a,b,c, d,e,f, g,h,j){ return {M:[[a,b,c], [c,d,e], [g,h,j]], x:3, y:3} }
function Matrix44(a,b,c,d, e,f,g,h, i,j,k,l, m,n,s,t){ return {M:[[a,b,c,d], [e,f,g,h], [i,j,k,l], [m,n,s,t]], x:4, y:4} }
function Matrix(data){ return {M:data, x:data[0].length, y:data.length} }

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

function MulMV(A, v){
  let AM = A.M
  let x = MIN(A.x, 4)
  let y = MIN(A.y, 4)
  let res = [0,0,0,0]
  if     (x == 1) for(i = 0; i < y; i++) res[i] = AM[i][0] * v.x
  else if(x == 2) for(i = 0; i < y; i++) res[i] = AM[i][0] * v.x + AM[i][1] * v.y
  else if(x == 3) for(i = 0; i < y; i++) res[i] = AM[i][0] * v.x + AM[i][1] * v.y + AM[i][2] * v.z
  else if(x == 4) for(i = 0; i < y; i++) res[i] = AM[i][0] * v.x + AM[i][1] * v.y + AM[i][2] * v.z + AM[i][3] * v.u
  if (y == 1) return Vec1(res[0])
  if (y == 2) return Vec2(res[0], res[1])
  if (y == 3) return Vec3(res[0], res[1], res[2])
  if (y == 4) return Vec3(res[0]/res[3], res[1]/res[3], res[2]/res[3])
}



// ####################################################### //
// Ten interface jeszcze się znieni, to tylko szybkie demo //
// Całość została napisana w jeden wieczór, więc ...       //
// ####################################################### //



function Canvas(width, height, display = true){
  let canvas = document.createElement('canvas')
  canvas.width  = width
  canvas.height = height
  if(display)  document.body.appendChild(canvas)
  return {obj:canvas, ctx:canvas.getContext('2d')}
}

function Slider(name, min, max, start, display = true){
  let div       = document.createElement('div')
  let range     = document.createElement('input')
  range.type    = 'range'
  range.min     = min
  range.max     = max
  range.value   = start
  div.innerHTML = name
  div.appendChild(range)
  if(display)     document.body.appendChild(div)
  return {obj:range, div:div}
}

function Button(name, display = true, callback = undefined){
  let button = document.createElement('button')
  button.innerHTML = name
  if(display)  document.body.appendChild(button)
  let self = {obj:button, callback:callback}
  button.onclick = function(){
    if(typeof self.callback !== 'undefined') self.callback()
  }
  return self
}

function Switch(cycle, display = true, callback = undefined){
  let button = document.createElement('button')
  button.innerHTML = cycle[0]
  if(display)  document.body.appendChild(button)
  let self = {obj:button, cycle:cycle, index:0, callback:callback}
  self.setIndex = function(index){
    self.index  = index % self.cycle.length
    self.obj.innerHTML = self.cycle[index]
  }
  button.onclick = function(){
    self.index = (self.index + 1) % self.cycle.length
    self.obj.innerHTML = self.cycle[self.index]
    if(typeof self.callback !== 'undefined') self.callback()
  }
  return self
}

function PaintingAnimation(size, domain, f){
  let canvas    = Canvas(size[0], size[1], false)
  let delay     = Slider('Delay', 0, 100, 0)
  let batchsize = Slider('Batch', 1, MIN(256, MIN(size[0], size[1])), 100)
  let self = {canvas:canvas, delay:delay, batchsize:batchsize, size:size, domain:domain, f:f, imagedata:canvas.ctx.getImageData(0,0,size[0], size[1]), StartStop:Switch(['Start', 'Stop'])}
  self.loop = function(){
    let data = self.imagedata.data
    let w    = self.size[0]
    let h    = self.size[1]
    let s    = self.batchsize.obj.value|0
    let x0   = (MAP(Math.random(), 0, 1, 0, (w/s-1))|0)*s
    let y0   = (MAP(Math.random(), 0, 1, 0, (h/s-1))|0)*s
    let end  = false
    while(data[(x0 + y0*w)*4+3] === 0xff){
      x0 += s
      if(x0 >= w){
        x0 = 0
	y0 += s
	if(y0 >= h){
          y0 = 0
	  if(end) return self.StartStop.setIndex(0)
	  end = true
    }}}
    data[(x0 + y0*w)*4+3] = 0xff
    if(self.StartStop.index === 1)
      setTimeout(self.loop, self.delay.obj.value)
    let w0 = MIN(x0 + s, w)
    let h0 = MIN(y0 + s, h)
    let f  = self.f
    let y, x, RGB, pos
    for(j = y0; j < h0; j++){
      y = MAP(j, 0, h, self.domain[2], self.domain[3])
      for(i = x0; i < w0; i++){
        x = MAP(i, 0, w, self.domain[0], self.domain[1])
        RGB = f(x, y)
	pos = (i + j*w) * 4
        data[pos+0] = RGB[0]
        data[pos+1] = RGB[1]
        data[pos+2] = RGB[2]
        data[pos+3] = 0xff
    }}
    self.canvas.ctx.putImageData(self.imagedata, 0, 0, x0, y0, s, s)
  }
  self.reset = function(){
    let data = self.imagedata.data
    let w  = self.size[0]
    let h  = self.size[1]
    for(let x = 0; x < w; x++)for(let y = 0; y < h; y++)
      data[(x+y*w)*4+3] = data[(x+y*w)*4+3] ? 0xFE : 0
    self.canvas.ctx.putImageData(self.imagedata, 0, 0)
  }
  self.StartStop.callback = function(){if(self.StartStop.index === 1) self.loop()}
  self.reset = Button('Override', true, self.reset)
  document.body.appendChild(self.canvas.obj)
  return self
}

function RGBfromVec3(v){ return [(ABS(v.x)%256)|0, (ABS(v.y)%256)|0, (ABS(v.z)%256)|0] }



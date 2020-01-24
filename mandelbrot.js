UPDATE = Button('Update')
X0     = TextInput(5, 1, '-0.75')
Y0     = TextInput(5, 1, '0')
S      = TextInput(5, 1, '1')
MOUSE  = Text('0, 0')
MANDELBROT = Switch(['Mandelbrot', 'Hello', 'Buhahaha'])
NSLIDER = Slider(1, 1000, 50)

Functions = ['c = Vec2(x, y)\nv = Vec2()\nfor(i = 0; i < N && QLen2(v) <= 4; i++)\nQADD(QCProduct(v,v), c)\nF = i / N',
 'F = x + y',
 'F = x - y']

F = TextInput(40, 10, Functions[0])

HELP = Text('HELP')
Options = [
  {elems:[UPDATE, MANDELBROT], format:'justify'},
  {elems:[Text('(x, y) ='), X0, Y0, Text('ε ='), S], format:'alignLeft'},
  [MOUSE],
  [NSLIDER],
  {elems:[Text('F(x,y) = '), F], format:'alignLeft'},
  [HELP]
]

State   = {}
P = CreatePresentation(Options, Vec2(), 1)
MakeCanvasGreatAgain(P.can)
State.imagePos  = P.can.imagePos
State.imageData = P.can.ctx.getImageData(0, 0, P.can.width, P.can.height)
State.size = 60
State.W    = CEIL(P.can.width  / State.size)
State.H    = CEIL(P.can.height / State.size)
State.N    = 100

Update = function(){
  State.N = parseFloat(NSLIDER.value)
  let N = State.N
  eval('State.f = function(x,y){\nlet F = 0\n' + F.getText() + '\n return F}')
  P.can.origin.x = parseFloat(X0.getText())
  P.can.origin.y = parseFloat(Y0.getText())
  P.can.scale    = parseFloat( S.getText())
  State.i = 0
}

loop = function(){
  let pos = P.can.imagePos(P.can.mousePos())
  if(MANDELBROT.hasChanged()){
    F.setText(Functions[MANDELBROT.index])
    Update()
  }
  if(UPDATE.Pressed()){
    Update()
  }
  mouse = Mouse.Relised()
  if(mouse.left && P.can.mouseInRange){
    X0.setText(pos.x)
    Y0.setText(pos.y)
    Update()
  }
  if(NSLIDER.hasChanged()){
    Update()
  }
  if(State.i <= State.W * State.H){
    let data     = State.imageData.data
    let imagePos = P.can.imagePos
    let s  = State.size
    let w  = P.can.width
    let h  = P.can.height
    let x  = s * (State.i % State.W)
    let y  = s * FLOOR(State.i / State.W)
    let w0 = MIN(x + s, w)
    let h0 = MIN(y + s, h)
    let f  = State.f
    for(let j = y; j < h0; j++){
      for(let i = x; i < w0; i++){
      let X = imagePos(Vec2(i, j))
      let c = NGray(f(X.x, X.y))
      let P0 = (i + j*w)*4
      data[P0+0] = c[0]
      data[P0+1] = c[1]
      data[P0+2] = c[2]
      data[P0+3] = 0xff
    }}
    P.can.ctx.putImageData(State.imageData, 0, 0, x, y, s, s)
    State.i++;
  }
  MOUSE.setText(JSON.stringify(pos))
  setTimeout(loop, 1)
}

Update()
loop()

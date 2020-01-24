UPDATE = Button('Update')
X0     = TextInput(5, 1, '0')
Y0     = TextInput(5, 1, '4.5')
S      = TextInput(5, 1, '7')
MOUSE  = Text('0, 0')
F_SWITCH = Switch(['fern'])
BALL_SIZE  = TextInput(5, 1, '10')
SPEED_SLIDER = Slider(0, 1000, 50)
Functions = ['let r = Math.random();\nif (r < 0.01) {nextX =  0;nextY =  0.16 * y;}\nelse if (r < 0.86) {nextX =  0.85 * x + 0.04 * y;nextY = -0.04 * x + 0.85 * y + 1.6;}\nelse if (r < 0.93) {nextX =  0.20 * x - 0.26 * y;nextY =  0.23 * x + 0.22 * y + 1.6;}\nelse {nextX = -0.15 * x + 0.28 * y;nextY =  0.26 * x + 0.24 * y + 0.44;}']
F = TextInput(40, 10, Functions[0])

State = {}


Options = [
  {elems:[UPDATE, F_SWITCH], format:'justify'},
  {elems:[Text('(x, y) ='), X0, Y0, Text('Scale ='), S], format:'alignLeft'},
  [MOUSE],
  {elems:[Text('Ball size ='), BALL_SIZE], format:'alignLeft'},
  [SPEED_SLIDER],
  {elems:[Text('F(x,y) = '), F], format:'alignLeft'},
]

State   = {}
P = CreatePresentation(Options, Vec2(), 1)
MakeCanvasGreatAgain(P.can)


Update = function(){ 
  eval('State.f = function(x,y){\nlet nextX = x\nnextY = y\n' + F.getText() + '\n return {x:nextX, y:nextY}}')
  P.can.origin.x = parseFloat(X0.getText())
  P.can.origin.y = parseFloat(Y0.getText())
  P.can.scale    = parseFloat( S.getText())
  State.BALL_SIZE = parseFloat( BALL_SIZE.getText())
  P.can.clear(QGray(255))
  State.X = Vec2(0,0)
}


loop = function(){
  let pos = P.can.imagePos(P.can.mousePos())
  if(F_SWITCH.hasChanged()){
    F.setText(Functions[F_SWITCH.index])
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
  if(SPEED_SLIDER.hasChanged())
    State.SPEED = parseInt(SPEED_SLIDER.value)
  P.can.BALL(State.X, State.BALL_SIZE, QRGB(0, 255, 0))
  State.X = State.f(State.X.x, State.X.y)
  P.can.BALL(State.X, State.BALL_SIZE, QRGB(255, 0, 0))
  setTimeout(loop, State.SPEED)
  //setTimeout(loop, 0)
}

Update()
loop()
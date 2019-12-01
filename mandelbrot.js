len = 500
f = function(x, y){
  if(x < .25 && x > -.5 && y < .5 && y > -.5)
    return RGBfromVec3(Vec3(0,0,0))
  let c = Vec2(x,y)
  let v = Vec2(x,y)
  let i = 0
  for(; QLen2(v) <= 4 && i < len; i++)
    QADD(QCProduct(v, v), c)
  return RGBfromVec3(LERPV(SQRT(SQRT(SQRT(i / (len+1)))), Vec3(0, 230, 170), Vec3(0, 0, 0)))
}
P = PaintingAnimation([4000, 4000], [-2, 1, -1.3, 1.3], f) 

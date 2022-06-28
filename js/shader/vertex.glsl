varying vec2 vUv;
uniform float time;
uniform float scroll;

void main() {
  vUv = uv;

  vec3 pos  = position;
  pos.y += 0.005*sin(pos.x/0.08 + time/2.) * step(0.0000001, abs(scroll))  ;
 // pos.y *= ((1.-step(0.001, vUv.y))  );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
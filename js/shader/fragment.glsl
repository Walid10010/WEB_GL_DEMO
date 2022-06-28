varying vec2 vUv;

uniform float progress;
uniform float scroll;


uniform sampler2D texture1;



float g(float m, float t, vec2 p){

     return   step(0., p.y - m*p.x - t); 
	  if (p.y - m*p.x - t >= 0.){
		  return 1.;
	  }else{
		  return 0.;
	  }

}


void main()	{
	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	float offset = 0.001*abs(scroll);
	vec4 img1 = texture2D(texture1, vUv + vec2(0.,offset));
	float r = texture2D(texture1, vUv + vec2(0.,offset+ 0.02*step(0.0001, abs(scroll)))).r;
    vec2 gb = texture2D(texture1, vUv + offset ).gb;



    gl_FragColor  = img1;
	gl_FragColor.r = r;
	gl_FragColor.gb = gb; 
   // gl_FragColor = vec4(scroll, 0., 0., 1.);
}
varying vec2 vUv;

uniform float progress;



uniform sampler2D texture1;
uniform sampler2D texture2;



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

	vec4 img1 = texture2D(texture1, vUv + vec2(0.2*progress, 0.));
	vec4 img2 = texture2D(texture2, vUv + vec2(-1.+ progress, 0.));


	gl_FragColor = vec4(vUv,0.0,1.);
	vec4 finalcolor = mix(img1, img2, (step(1.-progress, vUv.x)) * g(0.3, 0.55, vUv));
	 finalcolor = mix(finalcolor, img2, (step(1.-progress, 0.6*vUv.x)) * g(0.2, 0.35, vUv));
	 finalcolor = mix(finalcolor, img2, (step(1.-progress, 0.4*vUv.x)));

	gl_FragColor = finalcolor;

}
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import fragment from "./shader/fragment.glsl";
import fragment1 from "./shader/fragment1.glsl";

import vertex from "./shader/vertex.glsl";
import * as dat from "dat.gui";
import gsap from "gsap";

import img1 from '../res/game_1.jpg'
import img2 from '../slider/21.jpg'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import {Text} from 'troika-three-text'
//import font1 from 'url:../res/Press_Start_2P/PressStart2P-Regular.ttf' 
import font1 from 'url:../res/Source_Sans_Pro/SourceSansPro-Regular.ttf'
import ScrollToPlugin from 'gsap/ScrollToPlugin';


global.THREE = THREE;
var winX = null;
var winY = null;
let dic  =  {
    'ps5-div':false,
    'xbox-div':false,
    'nin-div':false,
    'mobile-div':false,
    'more-div':false,

}

document.addEventListener('scroll', function () {
    if (winX !== null && winY !== null) {
       // console.log('disable')
        window.scrollTo(winX, winY);
    }
  //  console.log('enable')

});

function disableWindowScroll() {
    winX = 0;
    winY = 0;
}

function enableWindowScroll() {
    winX = null;
    winY = null;
}

disableWindowScroll()
//enableWindowScroll()

var createGeometry = require('three-bmfont-text')

// var MSDFShader = require('three-bmfont-text/shaders/msdf');
var MSDFShader = require('./msdf');


import font from '../font/manifold.json'
import fontTexture from '../font/manifold.png'


export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({
     alpha:true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xffffff, 1)
    new THREE.TextureLoader().load(fontTexture,(t)=>{
      this.fontTexture = t;
      console.log(this.fontTexture);

      this.baseTexture  = new THREE.WebGLRenderTarget(
        this.width, this.height, {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat
    })
    this.group = new THREE.Group()

    this.addObjects();
    //this.addText()
    this.addText1()

    this.addObjects2();
    this.addObjects3()
    this.resize();

    this.composerPass()
    this.render();
    this.setupResize();
    this.settings();
    this.mouse()


    gsap.to(this.material.uniforms.progress, {value:1, duration:5, ease:"rough({ strength: 1, points: 20, template: none.out, taper: none, randomize: true, clamp: false })" })
    gsap.to(this.group.position, {y: '-=' + 0.5, duration:3, delay:0,  ease:"rough({ strength: 1, points: 20, template: none.out, taper: none, randomize: true, clamp: false })" })
    


    })

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 0, 2);
    //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.isPlaying = true;
    

    console.log(this.scene.children)
  }

  addObjects2(){
    const video1 = document.getElementById( 'v1' );
    video1.play()

    const texture2 = new THREE.VideoTexture( video1 );


    let material = new THREE.MeshBasicMaterial({
      map: texture2, 
      transparent:true
    })
    let geometry = new THREE.PlaneGeometry(2.5, 2.5, 1, 1);

   let plane = new THREE.Mesh(geometry, material);
   plane.position.y -= 2.3
   plane.position.x -= 1.
   this.group.add(plane) 

   const myText = new Text()

// Set properties to configure:
myText.text = 'Gaming \n      and FUN'
myText.fontSize = 0.25
myText.position.z = 0
myText.font = font1
myText.color =  0xDC5A5A
//myText.material.color =  0xFF5733


myText.position.x -= -0.4
myText.position.y -= 1.6


// Update the rendering:
myText.sync()
this.group.add(myText)



  }

  addObjects3(){
    this.material3 = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        progress:{value:0},
        resolution: { value: new THREE.Vector4() },
        texture1:{value: new THREE.TextureLoader().load(img1)},
        scroll:{value:0}
       
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment
    });
    let geometry = new THREE.PlaneBufferGeometry(1.5, 2.5, 64, 64)
    let plane = new THREE.Mesh(geometry, this.material3)
    plane.position.y -= 5

    this.group.add(plane)
    this.plane3 = plane;


  }

  addText1(){
    // Create:
const myText = new Text()

// Set properties to configure:
myText.text = 'WELCOME TO    \n GAMES OF YEAR AWARD'
myText.fontSize = 0.25
myText.position.z = 0
myText.color =0xDC5A5A
myText.font = font1
myText.position.x -= 1.8
myText.position.y += 1.2


// Update the rendering:
myText.sync()
this.group.add(myText)

  }

  mouse(){
    this.group.add(this.plane)
    this.scene.add(this.group)
    const thl = gsap.timeline()
    window.addEventListener('wheel', (e) => {
       e.preventDefault() 
       this.group.position.y +=  0.005*e.deltaY 
       this.material3.uniforms.scroll.value = e.deltaY
    
      


    }, false)
   // thl.to(this.material3.uniforms.scroll, {value:1})
   // thl.to(this.material3.uniforms.scroll, {value:0, duration:2})

  }

  addText(){
    this.geom = createGeometry({
      text: 'WEBGL \n MEETS \n HTML AND CO',
      font: font,
      align: 'center',
       flipY: this.fontTexture.flipY,
    //   flipX: this.fontTexture.flipX,

    })

    this.geom.flipY = true

    this.materialText = new THREE.RawShaderMaterial(MSDFShader({
      map: this.fontTexture,
      transparent: true,
      color: 0xFF5733, //
      side: THREE.DoubleSide
    }))

    let layout = this.geom.layout
    console.log(layout);
    let text = new THREE.Mesh(this.geom, this.materialText)
    text.flipY = false
     text.scale.set(0.005,-0.005,0.005);
    //text.position.set(-0.01*layout.width/2, 0.6, 10)
     text.position.x -= 1.5
     text.position.y -= 0
    // text.position.set(0, -layout.descender + layout.height, 0)
    // text.scale.multiplyScalar(Math.random() * 0.5 + 0.5)
    this.text = text
  // this.scene.add(text);
  }

  composerPass(){
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    //custom shader pass
    var counter = 0.0;
    this.myEffect = {
      uniforms: {
        "tDiffuse": { value: null },
        "scrollSpeed": { value: null },
        'mouse':{value:null}
      },
      vertexShader: `
      varying vec2 vUv;
      uniform vec2 mouse;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float dist = distance(pos.xy, mouse);
        dist = step(0.25, dist);

    
        pos.x += 10. * (1.-dist);
        gl_Position = projectionMatrix 
          * modelViewMatrix 
          * vec4( pos, 1.0 );
      }
      `,
      fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
       uniform float scrollSpeed;
      uniform vec2 mouse;
      void main(){
        vec2 newUV = vUv;
        float area = (1.-  smoothstep(0.,0.1,vUv.y))  + smoothstep(.9,1.,vUv.y);
        area = pow(area,4.);
        float dist = distance(vUv, mouse);
        dist = step(dist, 0.15);
        newUV.x -=  (vUv.x - 0.5)*area;
        vec4 j = texture2D( tDiffuse, newUV);
        j.r += 0.7*area*smoothstep(0.3,0.5, vUv.x)*j.r;
        j.g += 0.1*area*(1.-smoothstep(0.3,0.5, vUv.x))*j.g;
         j.b += 0.2*area*j.b;


        gl_FragColor = texture2D( tDiffuse, vUv);
        gl_FragColor = vec4(1.,0.,0.,1.);
        gl_FragColor = vec4(newUV.x,0.,0.,1.);
         //gl_FragColor = vec4(j.rgb,dist);
       gl_FragColor = j;
       
      }
      `
    }

    this.customPass = new ShaderPass(this.myEffect);
    this.customPass.renderToScreen = true;

    this.composer.addPass(this.customPass);
  }
  

  settings() {
    let that = this;
    this.settings = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.01);
}

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    const video1 = document.getElementById( 'v1' );
    video1.play()
    const texture1 = new THREE.VideoTexture( video1 );

    const video2 = document.getElementById( 'v2' );
    video2.play()
    const texture2 = new THREE.VideoTexture( video2 );
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        progress:{value:0},
        resolution: { value: new THREE.Vector4() },
        texture1:{value: texture1},
        texture2:{value: texture2}
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment1
    });

    this.geometry = new THREE.PlaneGeometry(2.5, 1.5, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.position.x += 0.5
    this.plane.position.y -= 0.2

    //this.scene.add(this.plane);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if(!this.isPlaying){
      this.render()
      this.isPlaying = true;
    }
  }

  render(){
    this.time+=0.5;  
    //this.scroll.render();
    //this.currentScroll = this.scroll.scrollToRender;
    //this.setPosition();
    //this.customPass.uniforms.scrollSpeed.value = this.scroll.speedTarget;

    this.customPass.uniforms.mouse.value = new THREE.Vector2()
    this.material3.uniforms.scroll.value *=0.5;
    this.material3.uniforms.time.value = this.time    // this.material.uniforms.time.value = this.time;


    //console.log(this.group.position.y)
    // this.renderer.render( this.scene, this.camera );
    if(this.group.position.y >1.5){
        //console.log("frei")
        enableWindowScroll()
    }else{
        disableWindowScroll()
    }
    this.composer.render()
    window.requestAnimationFrame(this.render.bind(this));
}
}

function start(){
    let s = new Sketch({
        dom: document.getElementById("container")
      });
      
}

//gsap.to(window, {duration: 2, scrollTo: 600});

gsap.registerPlugin(ScrollToPlugin);
t1 = gsap.timeline({
    onComplete: start
})
t1.to('.rect-slider', {display:'block', top:0, duration:2,  ease: "back.out(1.7)"})
t1.to('.rect-slider', {display:'none', top:'100vw', duration:1})

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true){
        let name =  '.' + entries[0].target.className + '-div1'
        if (!dic[entries[0].target.className]) {
            dic[entries[0].target.className] = true
        }else{
            return
        }
        let t = gsap.timeline()
        t.to('.' + entries[0].target.className , {width:'100%', duration:1, delay:0.5})
        t.to('.' + entries[0].target.className  + '-div1', {x:'100vw', duration:1})

		console.log('Element is fully visible in screen');
        console.log('.' + entries[0].target.className)
		console.log('Element is fully visible in screen');
    }
        
}, { threshold: [0] });

observer.observe(document.querySelector(".ps5-div"));
observer.observe(document.querySelector(".xbox-div"));
observer.observe(document.querySelector(".nin-div"));
observer.observe(document.querySelector(".mobile-div"));
observer.observe(document.querySelector(".more-div"));



//gsap.to('.ps5-div-div1', {x:'100vw', duration:2})

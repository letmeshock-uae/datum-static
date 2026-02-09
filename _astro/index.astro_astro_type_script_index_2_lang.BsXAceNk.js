import{_ as u}from"./preload-helper.BlTxHScW.js";document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("webgl-reveal-canvas"),h=document.querySelectorAll("[data-webgl-reveal]");!c||h.length===0||(async()=>{const e=await u(()=>import("./three.module.jK16zlKs.js"),[]),{default:g}=await u(async()=>{const{default:t}=await import("./index.tUWw1UFN.js");return{default:t}},[]),{ScrollTrigger:f}=await u(async()=>{const{ScrollTrigger:t}=await import("./ScrollTrigger.CrR5uyL1.js");return{ScrollTrigger:t}},[]);g.registerPlugin(f);const a=new e.WebGLRenderer({canvas:c,alpha:!0,antialias:!0});a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.setSize(window.innerWidth,window.innerHeight);const m=new e.Scene,r=new e.OrthographicCamera(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,-1e3,1e3);r.position.z=1;const w=new e.TextureLoader,p=`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,x=`
        uniform sampler2D uTexture;
        uniform float uProgress;
        uniform vec2 uResolution;
        uniform vec2 uContainerRes;
        uniform vec2 uUVScale;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float random (vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
        }

        float sdRoundedBox(vec2 p, vec2 b, float r) {
            vec2 q = abs(p) - b + r;
            return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
        }

        void main() {
          // Apply rounded corners mask
          vec2 halfRes = uContainerRes * 0.5;
          float mask = sdRoundedBox(vUv * uContainerRes - halfRes, halfRes, uBorderRadius);
          if (mask > 0.0) discard;

          // Apply object-fit: cover logic
          vec2 centeredUv = (vUv - 0.5) * uUVScale + 0.5;
          
          float gridCount = 40.0;
          vec2 grid = vec2(floor(centeredUv.x * gridCount) / gridCount, floor(centeredUv.y * gridCount) / gridCount);
          
          vec4 textureCol = texture2D(uTexture, centeredUv);
          
          float height = 0.25;
          float p = uProgress;
          
          // Reveal Progress Logic
          float revealProgress = (1.0 + height) - (p * (1.0 + height + height));
          
          float dist = 1.0 - distance(grid.y, revealProgress);
          float clampedDist = smoothstep(height, 0.0, distance(grid.y, revealProgress));
          
          float rand = random(grid);
          float randDist = step(1.0 - height * rand, dist);
          
          dist = step(1.0 - height, dist);
          
          float alpha = dist * (clampedDist + rand - 0.5 * (1.0 - randDist));
          alpha = max(0.0, alpha);
          
          float threshold = step(revealProgress, grid.y);
          
          vec4 finalColor = textureCol;
          finalColor.a *= threshold * (1.0 - alpha);
          
          vec4 edgeColor = vec4(0.0, 0.0, 0.0, alpha); 
          
          gl_FragColor = mix(finalColor, edgeColor, alpha);
        }
      `;class R{element;scene;mesh=null;material=null;geometry=null;texture=null;constructor(n,i){this.element=n,this.scene=i,this.init()}async init(){const n=this.element.getAttribute("src");n&&(this.texture=await new Promise(i=>{w.load(n,i)}),this.texture&&(this.material=new e.ShaderMaterial({uniforms:{uTexture:{value:this.texture},uProgress:{value:0},uResolution:{value:new e.Vector2(0,0)},uContainerRes:{value:new e.Vector2(0,0)},uUVScale:{value:new e.Vector2(1,1)},uBorderRadius:{value:0}},vertexShader:p,fragmentShader:x,transparent:!0}),this.geometry=new e.PlaneGeometry(1,1),this.mesh=new e.Mesh(this.geometry,this.material),this.scene.add(this.mesh),this.updatePosition(),this.observe()))}updatePosition(){if(!this.mesh||!this.material||!this.texture)return;const n=this.element.getBoundingClientRect(),{width:i,height:o,top:y,left:C}=n;this.mesh.scale.set(i,o,1),this.mesh.position.set(C-window.innerWidth/2+i/2,-y+window.innerHeight/2-o/2,0),this.material.uniforms.uResolution.value.set(i,o),this.material.uniforms.uContainerRes.value.set(i,o);const l=this.texture.image.width/this.texture.image.height,d=i/o;d>l?this.material.uniforms.uUVScale.value.set(1,l/d):this.material.uniforms.uUVScale.value.set(d/l,1)}observe(){this.material&&g.to(this.material.uniforms.uProgress,{value:1,scrollTrigger:{trigger:this.element,start:"top 90%",toggleActions:"play none none reverse"},duration:1.2,ease:"power2.out"})}}const s=[];h.forEach(t=>{s.push(new R(t,m))});function P(){a.setSize(window.innerWidth,window.innerHeight),r.left=window.innerWidth/-2,r.right=window.innerWidth/2,r.top=window.innerHeight/2,r.bottom=window.innerHeight/-2,r.updateProjectionMatrix(),s.forEach(t=>t.updatePosition())}window.addEventListener("resize",P);function v(){s.forEach(t=>t.updatePosition()),a.render(m,r),requestAnimationFrame(v)}v()})()});

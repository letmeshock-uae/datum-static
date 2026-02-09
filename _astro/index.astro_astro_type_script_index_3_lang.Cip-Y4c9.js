import{_ as k}from"./preload-helper.BlTxHScW.js";document.addEventListener("DOMContentLoaded",()=>{k(()=>import("./three.module.jK16zlKs.js"),[]).then(e=>{const l=document.getElementById("globe-container");if(!l)return;const a=new e.WebGLRenderer({antialias:!0,alpha:!0}),c=l.getBoundingClientRect();a.setSize(c.width,c.height),a.setPixelRatio(Math.min(2,window.devicePixelRatio)),a.setClearColor(0,0),l.appendChild(a.domElement);const f=new e.Scene,s=new e.PerspectiveCamera(45,c.width/c.height,.1,100);s.position.z=3.2;const r=new e.Group;f.add(r);const A="https://cdn.prod.website-files.com/6907819e9bba86a092e04958/6909fb57085b41bc08d54c6d_vecteezyblack-and-white-world-mapYS0223_generated%20copy.png";(async function(){const i=await new Promise(t=>{const o=new Image;o.crossOrigin="Anonymous",o.onload=()=>t(o),o.onerror=()=>t(null),o.src=A});if(!i)return;const m=document.createElement("canvas");m.width=i.width,m.height=i.height;const w=m.getContext("2d");w.drawImage(i,0,0);const D=w.getImageData(0,0,i.width,i.height).data;function I(t,o){const n=Math.floor(t*(i.width-1)),d=(Math.floor((1-o)*(i.height-1))*i.width+n)*4;return D[d]/255}const P=[],v=1,y=180,C=360;for(let t=0;t<=y;t++){const o=t/y,n=Math.PI*(o-.5);for(let h=0;h<=C;h++){const d=h/C,B=2*Math.PI*(d-.5);I(d,o)<.5||P.push(Math.cos(n)*Math.sin(B)*v,Math.sin(n)*v,Math.cos(n)*Math.cos(B)*v)}}const x=new e.BufferGeometry;x.setAttribute("position",new e.Float32BufferAttribute(P,3));const g={baseAlpha:{value:.15},pointSize:{value:4.5},hoverDirection:{value:new e.Vector3(0,0,1)},highlightRadius:{value:.1},highlightSoftness:{value:.8},uTime:{value:0}},L=new e.ShaderMaterial({uniforms:g,vertexShader:`
          precision mediump float;
          uniform float pointSize;
          uniform float uTime;
          varying vec3 vPosition;
          varying float vPhase;
          void main() {
            vPosition = normalize(position);
            vPhase = fract(sin(dot(position.xyz, vec3(12.9898,78.233,37.719))) * 43758.5453);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float flickerSize = 0.8 + 0.2 * sin(uTime * 1.5 + vPhase * 10.0);
            gl_PointSize = clamp(pointSize * flickerSize * (300.0 / -mvPosition.z), 1.0, 7.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,fragmentShader:`
          precision mediump float;
          uniform float baseAlpha;
          uniform vec3 hoverDirection;
          uniform float highlightRadius;
          uniform float highlightSoftness;
          uniform float uTime;
          varying vec3 vPosition;
          varying float vPhase;
          void main() {
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            if (dot(p,p) > 1.0) discard;
            float d = acos(clamp(dot(normalize(vPosition), normalize(hoverDirection)), -1.0, 1.0));
            float h = 1.0 - smoothstep(highlightRadius, highlightRadius + highlightSoftness, d);
            float flicker = 0.6 + 0.4 * sin(uTime * 1.5 + vPhase * 10.0);
            
            // Color variation based on position and time
            float latColor = vPosition.y * 0.5 + 0.5;
            float lonColor = atan(vPosition.x, vPosition.z) / 6.28318 + 0.5;
            
            // Muted color palette
            vec3 colorBlue = vec3(0.31, 0.43, 0.49);   // #506D7E (Base)
            vec3 colorSage = vec3(0.45, 0.55, 0.40);   // Muted Green
            vec3 colorCopper = vec3(0.65, 0.45, 0.35); // Muted Orange
            
            // Create dynamic color patches
            float mix1 = sin(lonColor * 10.0 + uTime * 0.5 + vPhase * 2.0) * 0.5 + 0.5;
            float mix2 = cos(latColor * 6.0 - uTime * 0.3 + vPhase * 5.0) * 0.5 + 0.5;
            
            vec3 base = mix(colorBlue, colorSage, mix1 * 0.4);
            vec3 finalColor = mix(base, colorCopper, mix2 * 0.3);
            
            // Stronger white 'dodge' highlight
            vec3 glowColor = mix(finalColor, vec3(1.0), pow(h, 1.5) * 0.8);
            
            float alpha = mix(baseAlpha, 1.0, h) * flicker;
            // Boost alpha in highlighted areas
            float finalAlpha = clamp(alpha + h * 0.5, 0.0, 1.0);
            
            gl_FragColor = vec4(glowColor, finalAlpha);
          }
        `,transparent:!0,depthWrite:!1}),G=new e.Points(x,L);r.add(G);const b=new e.Raycaster,p=new e.Vector2(2,2),M=new e.Mesh(new e.SphereGeometry(1,64,64),new e.MeshBasicMaterial({visible:!1}));r.add(M);let S=new e.Vector3(0,0,1);const z=new e.Vector3(0,0,1),V=.05;window.addEventListener("pointermove",t=>{const o=a.domElement.getBoundingClientRect();p.x=(t.clientX-o.left)/o.width*2-1,p.y=-((t.clientY-o.top)/o.height)*2+1,b.setFromCamera(p,s);const n=b.intersectObject(M)[0];n&&S.copy(r.worldToLocal(n.point.clone()).normalize())});let u=0;function _(){requestAnimationFrame(_),u+=.01,g.uTime.value=u,r.rotation.y+=.001,r.rotation.x=Math.sin(u*.3)*.05,z.lerp(S,V),g.hoverDirection.value.copy(z),a.render(f,s)}_(),window.addEventListener("resize",()=>{const t=l.getBoundingClientRect();s.aspect=t.width/t.height,s.updateProjectionMatrix(),a.setSize(t.width,t.height)})})()})});

var colorGris = new THREE.Color("rgb(30, 30, 30)");
var materialGris =new THREE.MeshLambertMaterial({color: colorGris});
//materialGris.color = colorGris;
var colorBlanco = new THREE.Color("rgb(255, 255, 255)");
var materialBlanco = new THREE.MeshLambertMaterial({color: colorBlanco});
//materialBlanco.color = colorBlanco;
var colorBorde = new THREE.Color("rgb(200, 130, 60)");
var materialBorde = new THREE.MeshLambertMaterial({color: colorBorde});
var mat1 = false;
var mat2 = false;
var mat3 = false;
var cuadros = [];
var torres = [];
var camara;
var escena;
var renderizador;

var fnBlack = function(textura) {
   materialGris = new THREE.MeshBasicMaterial({map: textura});  
   mat1 = true;
}
var fnWhite = function(textura) {
   materialBlanco = new THREE.MeshBasicMaterial({map: textura});  
   mat2 = true;
}
var fnWood = function(textura) {
   materialBorde = new THREE.MeshBasicMaterial({map: textura});  
   mat3 = true;
}

var cargadorBlack=new THREE.TextureLoader();
cargadorBlack.load("marmolNegro.jpeg",
              fnBlack);
var cargadorWhite=new THREE.TextureLoader();
cargadorWhite.load("marmolBlanco.jpeg",
              fnWhite);
var cargadorWood=new THREE.TextureLoader();
cargadorWood.load("madera.jpeg",
              fnWood);


function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

var setup = function() {
var cubeSize = 10;
for (i = 0; i < 8; i++) {
  for (j = 0; j < 8; j++) {
    var material = materialGris;
    if (isEven(i)) {
      if (isOdd(j)) {
        material = materialBlanco;
      } 
    } else {
      if (isEven(j)) {
        material = materialBlanco;
      } 
    }
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    var cubo = new THREE.Mesh(geometry,material);
    cubo.position.x = j*cubeSize;
    cubo.position.y = i*cubeSize; 
    cuadros.push(cubo);
  }
}
// Join cuadros
for (i = 1; i < 64; i++) {
cuadros[0].add(cuadros[i]);
}
// var cuboS = new THREE.Mesh(new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize),material);
//////////////////////////////////////////////////////////////////
camara = new THREE.PerspectiveCamera();
camara.position.z = 100;
camara.position.x = 65;
camara.position.y = -70;
camara.lookAt(new THREE.Vector3(35,35,11))

escena = new THREE.Scene();
for (i = 0; i < 64; i++) {
cuadros[i].receiveShadow=true;
escena.add(cuadros[i]);
}

//Lados o bordes del tablero


var geometryLado1 = new THREE.BoxGeometry( 10, 100, 10 );
var geometryLado2 = new THREE.BoxGeometry( 100, 10, 10 );
var geometryLado3 = new THREE.BoxGeometry( 100, 10, 10 );
var geometryLado4 = new THREE.BoxGeometry( 10, 100, 10 );
var lado1 = new THREE.Mesh(geometryLado1,materialBorde);
var lado2 = new THREE.Mesh(geometryLado2,materialBorde);
var lado3 = new THREE.Mesh(geometryLado3,materialBorde);
var lado4 = new THREE.Mesh(geometryLado4,materialBorde);
lado1.position.x = -10;
lado1.position.y = 35;
lado2.position.x = 35;
lado2.position.y = -10;
lado3.position.x = 35;
lado3.position.y = 80;
lado4.position.x = 80;
lado4.position.y = 35;
lado1.receiveShadow=true;
lado2.receiveShadow=true;
lado3.receiveShadow=true;
lado4.receiveShadow=true;
escena.add(lado1);
escena.add(lado2);
escena.add(lado3);
escena.add(lado4);


for (i = 0; i < 4; i++) {
   torres[i] = mallaFinal3.clone();
   torres[i].rotateX(Math.PI/2);
   torres[i].geometry.scale(0.6,0.6,0.6);
   torres[i].position.z = 10
   torres[i].castShadow=true;
   escena.add(torres[i]);
}

torres[0].position.y = -2;
torres[0].position.x = 2;
torres[1].position.y = -2;
torres[1].position.x = 69;
torres[2].position.y = 64;
torres[2].position.x = 2;
torres[3].position.y = 64;
torres[3].position.x = 69;

torres[2].material = new THREE.MeshLambertMaterial({color:colorGris});
torres[3].material = new THREE.MeshLambertMaterial({color:colorGris});

torres[0].material.opacity = 0.25;
torres[1].material.opacity = 0.5;
torres[2].material.opacity = 0.75;
torres[3].material.opacity = 1.0;

var luzPuntual1 = new THREE.PointLight(0x00FFFF,1,100);
luzPuntual1.position.set(30,-15,65);
var luzPuntual2 = new THREE.PointLight(0xFF00FF,1,100);
luzPuntual2.position.set(-10,95,65);
var luzPuntual3 = new THREE.PointLight(0xFFFF00,1,100);
luzPuntual3.position.set(90,75,65);

var iluminacionAmbiental = new THREE.AmbientLight(0x777777);


escena.add(luzPuntual1, luzPuntual2, luzPuntual3, iluminacionAmbiental);


renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth,window.innerHeight);

renderizador.shadowMapEnabled=true;
luzPuntual1.castShadow=true;
luzPuntual2.castShadow=true;
luzPuntual3.castShadow=true;

document.body.appendChild(renderizador.domElement);
}

var didSetup = false;

var loop = function(){
   requestAnimationFrame(loop);
   if(mat1 && mat2 && mat3){
      if (didSetup == false) {
      setup();
      didSetup = true;
      }
   
   renderizador.render(escena, camara);
   }
}
loop();

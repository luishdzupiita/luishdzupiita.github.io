var figura = new THREE.Shape();

figura.moveTo(0,4);
figura.lineTo(1,2);
figura.lineTo(3,2);
figura.lineTo(2,0);
figura.lineTo(3,-2);
figura.lineTo(1,-2);
figura.lineTo(0,-4);
figura.lineTo(-1,-2);
figura.lineTo(-3,-2);
figura.lineTo(-2,0);
figura.lineTo(-3,2);
figura.lineTo(-1,2);
figura.lineTo(0,4);

var forma = new THREE.ShapeGeometry(figura);
var malla = new THREE.Mesh(forma);

var escena = new THREE.Scene();
escena.add(malla);
var camara = new THREE.PerspectiveCamera();
camara.position.z = 30;
var renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerHeight*.95,window.innerHeight*.95);

document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2, false );
document.body.appendChild( renderer.domElement );

var textureLoader = new THREE.TextureLoader();

var planet = {
    sphere: function(size){
        let sphere = new THREE.SphereGeometry(size, 32, 32);
    }
    return sphere;
}
/*
var geometry = new THREE.BoxGeometry( 1, 1, 1 );

var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );

scene.add( cube );
*/
var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
var material  = new THREE.MeshPhongMaterial()
var earthMesh = new THREE.Mesh(geometry, material)
scene.add(earthMesh)
material.map  = THREE.TextureLoader('textures/earth.jpg')

material.bumpMap    = THREE.TextureLoader('textures/earthbump.jpg')
material.bumpScale = 0.05

camera.position.z = 5;


var animate = function () {
    requestAnimationFrame( animate );
    onRenderFcts.push(function(delta, now){
        earthMesh.rotation.y  += 1/32 * delta
    })
/*
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);

    onRenderFcts.push(function(delta, now){
        earthMesh.rotation.y  += 1/32 * delta
    })
*/
};

animate();

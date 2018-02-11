var DAT = DAT || {};

DAT.Globe = function(container, colorFn) {

  colorFn = colorFn || function(x) {
    var c = new THREE.Color();
    c.setHSL( ( 0.6 - ( x * 0.5 ) ), 1.0, 0.5 );
    return c;
  };

  var camera, scene, renderer;
  var geometry, material, mesh, point;
  var canvas;


  var x = 1;
  var y = 1;

  var data;

  function init() {
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
      camera.position.z = 1;

      scene = new THREE.Scene();

      //Create a new ambient light
      var light = new THREE.AmbientLight( 0x888888 )
      scene.add( light )

      //Create a new directional light
      var light = new THREE.DirectionalLight( 0xfdfcf0, 1 )
      light.position.set(20,10,20)
      scene.add( light )

      //Create geometry and material
      var geometry = new THREE.SphereGeometry(0.5, 32, 32);
      var texture = new THREE.TextureLoader().load( "../images/earth.jpg" );
      var material = new THREE.MeshBasicMaterial( {
          map: texture
      } );

      point = new THREE.Mesh(geometry);
      var subgeo = new THREE.Geometry();

/*
      for (i = 0; i < data.length; i++) {
        lat = data[i];
        lng = data[i + 1];
        //color = colorFnWrapper(data,i);
        size = data[i + 2];
        size = size*150;
        addPoint(lat, lng, size, color, subgeo);
      }
*/
      //material.map  = THREE.TextureLoader('textures/earth.jpg')
      material.bumpMap = THREE.TextureLoader('textures/earthbump.jpg')
      material.bumpScale = 0.05

      /////////////////////////////////
      ///  GLOBE DOTS ///
  /*
      var addDot = function(targetX, targetY) {

  		// Add a point with zero coordinates
          var point = new THREE.Vector3(0, 0, 0);
  	geometry.vertices.push(point);

  		// Add the coordinates to a new array for the intro animation
  	var result = returnSphericalCoordinates(
  		targetX,
  		targetY
  	);

  	animations.dots.points.push(new THREE.Vector3(result.x, result.y, result.z));
       };

      for (var i = 0; i < data.points.length; i++) {
  	addDot(data.points[i].x, data.points[i].y);
      }

      for (var country in data.countries) {
  	addDot(data.countries[country].x, data.countries[country].y);
      }

  	// Add the points to the scene
      groups.globeDots = new THREE.Points(geometry, material);
      groups.globe.add(groups.globeDots);
  */


      /////////////////////////////////


      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

  }

  function addData() {


  }

  function addPoint(lat, lng, size, color, subgeo) {

      var phi = (90 - lat) * Math.PI / 180;
      var theta = (180 - lng) * Math.PI / 180;

      point.position.x = 200 * Math.sin(phi) * Math.cos(theta);
      point.position.y = 200 * Math.cos(phi);
      point.position.z = 200 * Math.sin(phi) * Math.sin(theta);

      point.lookAt(mesh.position);

      point.scale.z = Math.max( size, 0.1 ); // avoid non-invertible matrix
      point.updateMatrix();

      for (var i = 0; i < point.geometry.faces.length; i++) {

        point.geometry.faces[i].color = color;

      }

      THREE.GeometryUtils.merge(subgeo, point);
  }


  function positioning(event) {
      console.log("mouse: "+event.clientX +","+event.clientY+" window"+ window.innerWidth/2+","+window.innerHeight/2+"\nx and y")
      if(event.clientX > window.innerWidth/2 && x < 0)
              x = 1

      if(event.clientX < window.innerWidth/2 && x > 0)
              x = -1

      if(event.clientY > window.innerHeight/2 && y < 0)
              y = 1

      if(event.clientY < window.innerHeight/2 && y > 0)
              y = -1
  }

  function animate(e) {

      requestAnimationFrame( animate );
      document.addEventListener("click", positioning);

      mesh.rotation.x += 0.003*x
      mesh.rotation.y += 0.003*y

      renderer.render( scene, camera )

  }

  init();
  //getData();
  animate();
}

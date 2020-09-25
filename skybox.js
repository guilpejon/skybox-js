let scene, camera, renderer;

function init() {
  scene = new THREE.Scene();

  const fov = 80; // field of view
  const aspect = window.innerWidth/window.innerHeight; // aspect ratio
  const near = 45; // space rendered near camera
  const far = 30000; // space rendered far from the camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(1500, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 500;
  // controls.maxDistance = 1500;

  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load('front.jpg');
  let texture_bk = new THREE.TextureLoader().load('back.jpg');
  let texture_up = new THREE.TextureLoader().load('up.jpg');
  let texture_dn = new THREE.TextureLoader().load('down.jpg');
  let texture_rt = new THREE.TextureLoader().load('right.jpg');
  let texture_lf = new THREE.TextureLoader().load('left.jpg');

  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide; // only the back face of the objects will be rendered
  }

  let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();

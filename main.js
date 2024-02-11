import './style.css'
import * as THREE from 'three'
// import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import { brickHouse } from './addMeshes'

const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  .01,
  100
)

const scene = new THREE.Scene()
const meshes = {}
const lights = {}
const clock = new THREE.Clock()
const listener = new THREE.AudioListener()
camera.add(listener)

const sound = new THREE.Audio(listener)

const audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/brickHouseLong.m4a', function (buffer) {
  sound.setBuffer(buffer)
  sound.setLoop(true)
  sound.setVolume(0.5)
  sound.play()
})

const analyser = new THREE.AudioAnalyser(sound, 32)

init()
function init() {
  // set up our render default settings, add scene/canvas to webpage
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  meshes.brickHouse = brickHouse()
  // meshes.default = addBoilerPlateMeshes()
  // meshes.standard = addStandardMesh()

  lights.default = addLight()

  scene.add(lights.default)
  scene.add(meshes.brickHouse)
  // scene.add(meshes.standard)
  // scene.add(meshes.default)

  camera.position.set(0, 0, 30)
  resize()
  animate()
}

function resize() {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

function animate() {
  requestAnimationFrame(animate)
  const data = analyser.getAverageFrequency()
  const tick = clock.getElapsedTime()
  meshes.brickHouse.position.z += Math.cos(data)
  meshes.brickHouse.rotation.y += .02
  meshes.brickHouse.rotation.x += .03
  // meshes.brickHouse.position.x = Math.sin(data)

  renderer.render(scene, camera)
}


import * as THREE from "three";


export function createGeometry() {
    let positions, colors, sizes;

    const geometry = new THREE.PlaneGeometry(2,2);
/*     geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 )); */
    return geometry;
}
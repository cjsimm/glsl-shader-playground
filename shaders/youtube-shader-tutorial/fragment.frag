varying vec2 vUv;
uniform vec2 resolution;
void main() {
    //normalize the coords between 0 and 1 to fit GLSL requirements
    vec2 coord = gl_FragCoord.xy / resolution.xy;
	gl_FragColor = vec4(coord.x,coord.y,0.137,1.0);
}
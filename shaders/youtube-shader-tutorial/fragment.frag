uniform vec2 resolution;
void main() {
    //normalize the coords between 0 and 1 to fit GLSL requirements
    vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
    //magnitude of the vector (distance from the origin)
    //passing the magnitude as a colour will create a circle centered at the origin 
    float d = length(uv);
    //subtracting a static value to shrink the circle 
    d -= 0.5;
    //make negative values absolute to hollow the circle
    d = abs(d);

	gl_FragColor = vec4(d,0.0,0.0,1.0);
}
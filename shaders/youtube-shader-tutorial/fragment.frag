//colour palette function
vec3 palette(float t) {
    vec3 a = vec3(0.5,0.5,0.5);
    vec3 b = vec3(0.5,0.5,0.5);
    vec3 c = vec3(2.0,1.0,0.0);
    vec3 d = vec3(0.50,0.20,0.25);
    return a + b*cos(6.28318*(c*t+d));
}

uniform vec2 resolution;
uniform float time;
void main() {
    //normalize the coords between 0 and 1 to fit GLSL requirements
/*     vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y; */
    vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
    
    //distance to the center of the canvas at any point 
    vec2 uv0 = uv;
    //color to be manupulated then passed to the output
    vec3 finalCol = vec3(0.0);
    //for loop to 
    for (float i = 0.0; i < 4.0; i++) {
        //distance to the centre of each fractional portion of the canvas 
        uv = fract(uv * 1.5) - 0.5;
        //create spacial repetition int e canvas using the fract function 
        //magnitude of the vector (distance from the origin)
        //passing the magnitude as a colour will create a circle centered at the origin 
        float d = length(uv) * exp(-length(uv0));
        //call palette function with a base set of colour vectors, introduce d + time
        // to create variation in the colour produced by the trig function, continuously shifting
        //the produced colour gradient. use distance to centre of the canvas to break the colour uniformity
        //across each fraction of the canvas 
        vec3 col = palette(length(uv0) + i*0.2 + time*0.6); 
        //create radial repitition of ring with sin() function. d is multiplied before sin() to increase
        // the oscillating pattern of the sin function. sin values between 0 and 1 are very close
        // to the original values 
        // add the time uniform passed in from JS to cause the derived rings to collapse towards the center
        d = sin(d*8. + time)/2.;
        //make negative values absolute to hollow the rings created by the sin function
        d = abs(d);
        //take the multiplicative inverse of d. becauseour valuesare normalized within the clipspace 0-1, the results of our 
        //inverse function always exceed 1 if we set the inverse to 1.0 and therefore make our fragment output always white. 
        //if we use a value less than 1.0, we can
        d = pow(0.02 / d, 2.0);
        //multiply red colour by d scalar 
        finalCol += col * d; 
    }


	gl_FragColor = vec4(finalCol,1.0);
}
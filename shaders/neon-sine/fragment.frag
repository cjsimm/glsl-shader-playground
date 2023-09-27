uniform vec2 resolution;
uniform float time;

void main() {
    vec3 rCol = vec3(0.9, 0.0, 0.3);
    vec3 gCol = vec3(0.0, 0.9, 0.3);
    vec3 bCol = vec3(0.9, 0.3, 0.9);
    vec3 yCol = vec3(0.9, 0.9, 0.3);
    //normalize values between -1 and 1, making origin the centre of the canvas
    vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
    //define amplitude of sine wave (controls max/min height of wave. higher creates
    //larger peaks)
    // at 1., the exact centre of our sine wave will hit each border 
    float amp = .58; 
    //value to scale time by. higher value makes animation faster
    float tScale = .5;
    //still need a value to control the wavelength. at 1. (with amp at 1.) we will,
    // see one max/min at a time. doubling the value each time will increase the 
    // number of wave peaks that we see by 1 
    float wavelength = 8.;
    

    //calculate the y position of the sine wave. introduce scaled time to cause 
    // variation between render cycles and cause the wave to be animated
    float r = amp * sin(uv.y * wavelength - time * tScale); //r
    float y = amp * sin(uv.y * wavelength + time * tScale); //r
    float g = .3 * sin(uv.y / 0.005 - time * 1.); //r

    
    // derive value that controls color intensity based on horizontal position
    //using the absolute value gives us an even interpolaton of colour on each
    //side of the sine wave 
    float a = 0.05 / abs(uv.x + r);
    float b = 0.005 / abs(uv.x + g);
    float c = 0.05 / abs(uv.x + y);
    
    //scale our color value with our determined x and y position for the sine wave
    //dividing by a value will make our sine wave position values closer to 1. (bright wae)
    //multiplying will make sine wave position values closer to 0 (darker wave)
    vec3 col = gCol * b + rCol * a + yCol * c;
    gl_FragColor = vec4(col, 1.0);

}
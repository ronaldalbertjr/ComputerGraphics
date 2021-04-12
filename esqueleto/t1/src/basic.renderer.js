(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.BasicRenderer = {}));
}(this, (function (exports) { 'use strict';


        /* ------------------------------------------------------------ */


        
    function inside(  x, y, primitive  ) {
        var shape = primitive.shape;
        if(shape == 'circle'){
            var center = primitive.center;
            var radius = primitive.radius;

            if((x - center[0])*(x - center[0]) + (y - center[1])*(y - center[1]) > radius*radius)  return false;

            return true;
        }
        else {
            var L = [];
            var vertices = primitive.vertices;

            for (var i = 0; i < vertices.length; i++ ) {
                var n = [];

                if(i != vertices.length - 1) {
                    n[0] = - ( vertices[i + 1][1] - vertices[i][1] );
                    n[1] =  vertices[i + 1][0] - vertices[i][0];
                }
                else {
                    n[0] = - ( vertices[0][1] - vertices[i][1] );
                    n[1] =  vertices[0][0] - vertices[i][0];
                }

                var vec_to_point = [];
                vec_to_point[0] = x - vertices[i][0];
                vec_to_point[1] = y - vertices[i][1];

                L[i] = vec_to_point[0] * n[0] +  vec_to_point[1] * n[1];
            }

            const sign = L[0] > 0 ? true : false;

            for(var result of L) {
                if(result == 0) return true;
                if(sign != (result > 0 ? true : false)) return false;
            }

            return true;
        }
    }

    function generateBoundingBox( primitive ) {
        var shape = primitive.shape;
        if(shape == "circle") {
            var center = primitive.center;
            var radius = primitive.radius;

            var min_x = center[0] - radius;
            var max_x = center[0] + radius;
            var min_y = center[1] - radius;
            var max_y = center[1] + radius;
        }
        else {
            var vertices = primitive.vertices;
            var min_x = vertices[0][0];
            var max_x = vertices[0][0];
            var min_y = vertices[0][1];
            var max_y = vertices[0][1];

            for( var i = 1; i < vertices.length; i++ ){
                min_x = vertices[i][0] < min_x ? vertices[i][0] : min_x;
                max_x = vertices[i][0] > max_x ? vertices[i][0] : max_x;
                min_y = vertices[i][1] < min_y ? vertices[i][1] : min_y;
                max_y = vertices[i][1] > max_y ? vertices[i][1] : max_y;
            }
        }
        min_x = Math.floor(min_x);
        min_y = Math.floor(min_y);
        max_x = Math.ceil(max_x);
        max_y = Math.ceil(max_y);

        return {
            min_x,
            max_x,
            min_y,
            max_y,
        }
    }

    function _multiplyMatrices( m1, m2 ) {
        var result = [];
        for (var i = 0; i < m1.length; i++) {
            result[i] = [];
            for (var j = 0; j < m2[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < m1[0].length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    function applyTransformation( primitive ) {
        var vertices = primitive.vertices;
        var xform = primitive.xform;
        for(var i = 0; i < vertices.length; i++) {
            vertices[i][2] = 1;
        }

        var transformedVertices = _multiplyMatrices(vertices, xform);

        vertices = []
        for(var i = 0; i < transformedVertices.length; i++) {
            vertices[i] = []
            vertices[i][0] = transformedVertices[i][0];
            vertices[i][1] = transformedVertices[i][1];
        }
        return vertices;
    }

    function rasterizeCircle( primitive, n ) {
        var center = primitive.center;
        var radius = primitive.radius;

        var newScene = [];
        var sectionLength = (2*Math.PI)/n;

        for(var i = 0; i <= n; i++) {
            newScene.push({
                shape: "triangle",
                vertices: [ center, 
                    [(Math.cos(i * sectionLength) * radius) + center[0], (Math.sin(i * sectionLength)*radius) + center[1]], 
                    [(Math.cos(( i + 1 ) * sectionLength) * radius) + center[0], (Math.sin((i + 1) * sectionLength) * radius) + center[1]]
                ],
                color: primitive.color,
            })
        }

        return newScene;

    }

    function _transposeMatrix( m ) {
        var transposedM = []

        for (var i = 0; i < m.length; i++) {
            transposedM[i] = [];
            for (var j = 0; j < m[0].length; j++){
                transposedM[i][j] = m[j][i];
            }
        }

        return transposedM;
    }

        
    
    function Screen( width, height, scene ) {
        this.width = width;
        this.height = height;
        this.scene = this.preprocess(scene);   
        this.createImage(); 
    }

    Object.assign( Screen.prototype, {

            preprocess: function(scene) {
                // Possible preprocessing with scene primitives, for now we don't change anything
                // You may define bounding boxes, convert shapes, etc
                
                var preprop_scene = [];

                for( var primitive of scene ) {  
                    // do some processing
                    // for now, only copies each primitive to a new list

                    preprop_scene.push( primitive );
                    
                }

                
                return preprop_scene;
            },

            createImage: function() {
                this.image = nj.ones([this.height, this.width, 3]).multiply(255);
            },

            rasterize: function() {
                var color;
                var bounding_box
                // In this loop, the image attribute must be updated after the rasterization procedure.
                for( var primitive of this.scene ) {
                    
                    if(primitive.hasOwnProperty('xform'))
                        primitive.vertices = applyTransformation( primitive );

                    bounding_box = generateBoundingBox( primitive );
                    for (var i = bounding_box.min_x; i <= bounding_box.max_x; i++) {
                        var x = i + 0.5;
                        for( var j = bounding_box.min_y; j <= bounding_box.max_y; j++) {
                            var y = j + 0.5;
                            // First, we check if the pixel center is inside the primitive 
                            if ( inside( x, y, primitive ) ) {
                                // only solid colors for now
                                color = nj.array(primitive.color);
                                this.set_pixel( i, this.height - (j + 1), color );
                            }
                            
                        }
                    }
                }
                
               
              
            },

            set_pixel: function( i, j, colorarr ) {
                // We assume that every shape has solid color
         
                this.image.set(j, i, 0,    colorarr.get(0));
                this.image.set(j, i, 1,    colorarr.get(1));
                this.image.set(j, i, 2,    colorarr.get(2));
            },

            update: function () {
                // Loading HTML element
                var $image = document.getElementById('raster_image');
                $image.width = this.width; $image.height = this.height;

                // Saving the image
                nj.images.save( this.image, $image );
            }
        }
    );

    exports.Screen = Screen;
    
})));


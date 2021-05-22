(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ImageProcessing = {}));
}(this, (function (exports) { 'use strict';



    function ImageProcesser(img, kernel = null, xform = null, bhandler = 'icrop') {
        this.img = img.clone();
        this.width = img.shape[1];
        this.height = img.shape[0];
        this.kernel = kernel;
        this.xform = xform;
        this.bhandler = bhandler;
        this.transformed = img.clone();
    }

    Object.assign( ImageProcesser.prototype, {

        convolution(convolution_matrix){
            var sum;
            var n = convolution_matrix.length;

            for(var i = ((n-1)/2); i < this.height - ((n-1)/2); i++) {
                for(var j = ((n-1)/2); j < this.width - ((n-1)/2); j++) {
                    for(var k = 0; k < 3; k++) {
                        sum = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sum += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 
                                    convolution_matrix[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        this.transformed.selection.data[((i * this.width) + j)*4 + k ] = sum;
                    }
                }
            }

        },

        convolution_extend (convolution_matrix) {
            var sum;
            var extended_image = this.img.selection.data;
            var n = convolution_matrix.length;
            
            for(var i = 0; i < this.height; i++) {
                extended_image[ ((i * this.width) - 1)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ];
                extended_image[ ((i * this.width) + this.width)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ]; 
            }
            for(var j = 0; j < this.width; j++) {
                extended_image[ ((-1 * this.width) + j)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ];
                extended_image[ ((this.height * this.width) + j)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ]; 
            }
            
            for(var i = 0; i < this.height; i++) {
                for(var j = 0; j < this.width; j++) {
                    for(var k = 0; k < 3; k++) {
                        sum = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {

                                sum += extended_image[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 
                                    convolution_matrix[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        this.transformed.selection.data[ ((i * this.width) + j)*4 + k ] = sum;
                    }
                }
            }
        },

        sobel_filter(convolution_matrix_x, convolution_matrix_y){
            var sx;
            var sv;
            var n = convolution_matrix_x.length;
            
            for(var i = ((n-1)/2); i < this.height - ((n-1)/2); i++) {
                
                for(var j = ((n-1)/2); j < this.width - ((n-1)/2); j++) {
                    for(var k = 0; k < 3; k++) {
                        sx = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sx += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] 
                                    * convolution_matrix_x[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        sv = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sv += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 
                                    convolution_matrix_y[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        this.transformed.selection.data[((i * this.width) + j)*4 + k ] = Math.sqrt(sx * sx + sv * sv);
                    }
                }
            }

        },

        sobel_filter_extend (convolution_matrix_x, convolution_matrix_y) {
            var sx;
            var sv;
            var extended_image = this.img.selection.data;
            var n = convolution_matrix_x.length;
            
            for(var i = 0; i < this.height; i++) {
                extended_image[ ((i * this.width) - 1)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ];
                extended_image[ ((i * this.width) + this.width)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ]; 
            }
            for(var j = 0; j < this.width; j++) {
                extended_image[ ((-1 * this.width) + j)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ];
                extended_image[ ((this.height * this.width) + j)*4 + k ] = extended_image[ ((i * this.width) + j)*4 + k ]; 
            }
            
            for(var i = 0; i < this.height; i++) {
                for(var j = 0; j < this.width; j++) {
                    for(var k = 0; k < 3; k++) {
                        sx = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sx += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 
                                    convolution_matrix_x[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        sv = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sv += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 
                                    convolution_matrix_y[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        this.transformed.selection.data[((i * this.width) + j)*4 + k ] = Math.sqrt(sx * sx + sv * sv);
                    }
                }
            }
        },

        apply_kernel: function(border = 'icrop') {
            let convolution_matrix = [1];
            let convolution_matrix_x = [1];
            let convolution_matrix_y = [1];
            switch(this.kernel) {
                case 'box':
                    convolution_matrix = [[1/9, 1/9, 1/9], [1/9, 1/9, 1/9], [1/9, 1/9, 1/9]];
                    break;
                case 'sobel':
                    convolution_matrix_x = [[-1/8, 0, 1/8], [-1/4, 0, 1/4], [-1/8, 0, 1/8]];
                    convolution_matrix_y = [[1/8, 1/4, 1/8], [0, 0, 0], [-1/8, -1/4, -1/8]];
                    break;
                case 'laplace':
                    convolution_matrix = [[0, -1/4, 0], [-1/4, 1, -1/4], [0, -1/4, 0]];
                    break;
            }

            if(border === 'icrop')
            {   
                if(this.kernel === 'sobel')
                    this.sobel_filter(convolution_matrix_x, convolution_matrix_y);
                else { 
                    this.convolution(convolution_matrix);
                }    
            }
            else if(border === 'extend')
            {
                if(this.kernel === 'sobel')
                    this.sobel_filter_extend(convolution_matrix_x, convolution_matrix_y);
                else 
                    this.convolution_extend(convolution_matrix);
                
            }

            // Method to apply kernel over image (incomplete)
            // border: 'icrop' is for cropping image borders, 'extend' is for extending image border
            // You may create auxiliary functions/methods if you'd like

        },

        apply_xform: function()  {
            //transformed = this.img;
            // Method to apply affine transform through inverse mapping (incomplete)
            // You may create auxiliary functions/methods if you'd like
        },

        update: function() {   
            // Method to process image and present results
            var start = new Date().valueOf();
            if(this.kernel != null) {
                this.apply_kernel(this.bhandler);
            }

            if(this.xform != null) {
                this.apply_xform();
            }

            return this.transformed;
            /*
            // Loading HTML elements and saving
            var $transformed = document.getElementById('transformed');
            $transformed.width = this.width; $transformed.height = this.height;
            nj.images.save(transformed, $transformed);
            var duration = new Date().valueOf() - start;
            document.getElementById('duration').textContent = '' + duration;
            */
        }

    } )


    exports.ImageProcesser = ImageProcesser;
    
    
})));


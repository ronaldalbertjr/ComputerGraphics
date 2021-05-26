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
        extendImage(img) {
            var extended_image = img.clone();

            for(var i = 0; i < this.height; i++) {
                for(var k = 0; k < 4; k++)
                {
                    extended_image.selection.data[ ((i * this.width) - 1)*4 + k ] = extended_image.selection.data[ ((i * this.width))*4 + k ];
                    extended_image.selection.data[ ((i * this.width) + this.width)*4 + k ] = extended_image.selection.data[ ((i * this.width) + (this.width - 1))*4 + k ]; 
                }
            }
            for(var j = 0; j < this.width; j++) {
                for(var k = 0; k < 4; k++)
                {
                    extended_image.selection.data[ ((-1 * this.width) + j)*4 + k ] = extended_image.selection.data[ j*4 + k ];
                    extended_image.selection.data[ ((this.height * this.width) + j)*4 + k ] = extended_image.selection.data[ (((this.height - 1) * this.width) + j)*4 + k ]; 
                }
            }

            return extended_image
        },

        convolution(convolution_matrix, img){
            var sum;
            var n = convolution_matrix.length;

            var originalImg = img.clone();
            var imgTransformed = img.clone();

            for(var i = ((n-1)/2); i < this.height - ((n-1)/2); i++) {
                for(var j = ((n-1)/2); j < this.width - ((n-1)/2); j++) {
                    for(var k = 0; k < 4; k++) {
                        sum = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sum += originalImg.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 
                                    convolution_matrix[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        imgTransformed.selection.data[((i * this.width) + j)*4 + k ] = sum;
                    }
                }
            }

            return imgTransformed;

        },

        sobel_filter(convolution_matrix_x, convolution_matrix_y, img) {
            var sx;
            var sv;
            var n = convolution_matrix_x.length;

            var originalImg = img.clone();
            var imgTransformed = img.clone();
            
            for(var i = ((n-1)/2); i < this.height - ((n-1)/2); i++) {
                
                for(var j = ((n-1)/2); j < this.width - ((n-1)/2); j++) {
                    for(var k = 0; k < 3; k++) {
                        sx = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sx += originalImg.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] 
                                    * convolution_matrix_x[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        sv = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sv += originalImg.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 
                                    convolution_matrix_y[i2 + ((n-1)/2)][j2 + ((n-1)/2)];
                            }
                        }
                        imgTransformed.selection.data[((i * this.width) + j)*4 + k ] = Math.sqrt(sx * sx + sv * sv);
                    }
                }
            }

            return imgTransformed;
        },


        apply_kernel: function(border = 'icrop') {
            let convolution_matrix_box_filter = [[1/9, 1/9, 1/9], [1/9, 1/9, 1/9], [1/9, 1/9, 1/9]];
            let convolution_matrix_x_sobel_filter = [[-1/8, 0, 1/8], [-1/4, 0, 1/4], [-1/8, 0, 1/8]];
            let convolution_matrix_y_sobel_filter = [[1/8, 1/4, 1/8], [0, 0, 0], [-1/8, -1/4, -1/8]];
            let convolution_matrix_laplace_filter = [[0, -1/4, 0], [-1/4, 1, -1/4], [0, -1/4, 0]];

            var img  = this.img.clone();
            if(border == 'extend')
                img = this.extendImage(this.img)
  
            switch(this.kernel) {
                case 'box':
                    this.transformed = this.convolution(convolution_matrix_box_filter, img);
                    break;
                case 'sobel':
                    this.transformed = this.sobel_filter(convolution_matrix_x_sobel_filter, convolution_matrix_y_sobel_filter, img);
                    break;
                case 'laplace':
                    this.transformed = this.convolution(convolution_matrix_laplace_filter, img  ); 
                    break;
            }

        },

        apply_xform: function()  {
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

            // Loading HTML elements and saving
            var $transformed = document.getElementById('transformed');
            $transformed.width = this.width; 
            $transformed.height = this.height;
            nj.images.save(this.transformed, $transformed);
            var duration = new Date().valueOf() - start;
            document.getElementById('duration').textContent = '' + duration;
        }

    } )


    exports.ImageProcesser = ImageProcesser;
    
    
})));


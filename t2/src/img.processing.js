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

        covolution(covolution_array){
            var sum;
            var n = covolution_array.length;
            for(var i = ((n-1)/2); i < this.height - ((n-1)/2); i++) {
                for(var j = ((n-1)/2); j < this.width - ((n-1)/2); j++) {
                    for(var k = 0; k < 4; k++) {
                        sum = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sum += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * covolution_array[((i2 + ((n-1)/2)) * (((n-1)/2) + 1)) + (j2 + ((n-1)/2))];
                            }
                        }
                        this.transformed.selection.data[((i * this.width) + j)*4 + k ] = sum;
                    }
                }
            }
        },

        box_filter(n) {
            var sum;
            for(var i = ((n-1)/2); i < this.height - ((n-1)/2); i++) {
                for(var j = ((n-1)/2); j < this.width - ((n-1)/2); j++) {
                    for(var k = 0; k < 4; k++) {
                        sum = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {
                                sum += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ];
                            }
                        }
                        this.transformed.selection.data[((i * this.width) + j)*4 + k ] = (sum/(n**2));
                    }
                }
            }
        },

        box_filter_extend(n) {
            var sum;
            var extended_image = this.img.selection.data;

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
                    for(var k = 0; k < 4; k++) {
                        sum = 0;
                        for(var i2 = -((n-1)/2); i2 < ((n-1)/2) + 1; i2++) {
                            for(var j2 = -((n-1)/2); j2 < ((n-1)/2) + 1; j2++) {

                                sum += extended_image[ (((i + i2) * this.width) + (j + j2))*4 + k ];
                            }
                        }
                        this.transformed.selection.data[((i * this.width) + j)*4 + k ] = (sum/(n**2));
                    }
                }
            }
        },

        laplace_filter() {
            var sum;
            for(var i = 1; i < this.height - 1; i++) {
                for(var j = 1; j < this.width - 1; j++) {
                    for(var k = 0; k < 4; k++) {
                        sum = 0;
                        for(var i2 = -1; i2 < 2; i2++) {
                            for(var j2 = -1; j2 < 2; j2++) {
                                if(i2 == 0 && j2 == 0) 
                                    sum += this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ] * 4;
                                else if(i2 == 0 || j2 == 0)
                                    sum -= this.img.selection.data[ (((i + i2) * this.width) + (j + j2))*4 + k ];
                            }
                        }
                        this.transformed.selection.data[((i * this.width) + j)*4 + k ] = (sum/4);
                    }
                }
            }
        },

        apply_kernel: function(border = 'icrop') {
            switch(this.kernel) {
                case 'box':
                    if(border === 'icrop')
                    {
                        let covolution_array = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
                        this.covolution(covolution_array);
                    }
                    else if(border === 'extend')
                        this.box_filter_extend(3);
                    break;
                case 'laplace':
                    if(border === 'icrop')
                        this.laplace_filter(3);
                    else if(border === 'extend')
                        this.laplace_filter(3);
                    break;
            }

            // Method to apply kernel over image (incomplete)
            // border: 'icrop' is for cropping image borders, 'extend' is for extending image border
            // You may create auxiliary functions/methods if you'd like

        },

        apply_xform: function()  {
            transformed = this.img;
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


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

        cut_matrix(rowToRemove, columnToRemove, originalMatrix)
        {
            let result = [];
            let n = originalMatrix.length;

            for (let i = 0, j = 0; i < n; i++)
            {
                if (i == rowToRemove)
                    continue;

                result[j] = []
                for (let k = 0, u = 0; k < n; k++)
                {
                    if (k == columnToRemove)
                        continue;

                    result[j][u] = originalMatrix[i][k];
                    u++;
                }
                j++;
            }

            return result;
        },

        cofactor(matrix, i, j) {
            return ((-1)**(i + j)) * this.laplace(matrix);
        },

        laplace(matrix) {

            let originalMatrix = matrix.map((x) => [...x]);
            let result = 0;

            var n = matrix.length;
            if (n == 1)
            {
                return matrix[0, 0];
            }
            for (var j = 0; j < n; j++)
            {
                matrix = this.cut_matrix(0, j, originalMatrix);

                result += originalMatrix[0][j] * this.cofactor(matrix, 0, j);
            }

            return result;
        },

        transpose_matrix(matrix) {
            let result_matrix = [];
            var n = matrix.length;


            for (let i = 0; i < n; i++)
            {
                result_matrix[i] = [];
                for (let j = 0; j < n; j++)
                {
                    result_matrix[i][j] = matrix[j][i];
                }
            }
            return result_matrix;
        },

        scale_matrix(matrix, value) {
            let finalMatrix = []
            let n = matrix.length;

            for (let i = 0; i < n; i++)
            {
                finalMatrix[i] = []
                for (let j = 0; j < n; j++)
                {
                    finalMatrix[i][j] = matrix[i][j] * value;
                }
            }
            return finalMatrix;
        },

        inverse_matrix(matrix) {
            let originalMatrix = matrix.map((x) => [...x]);
            let cofactor = [];
            let adjugate_matrix = []
            let result = [];
            let n = matrix.length;

            for (let i = 0; i < n; i++)
            {
                cofactor[i] = []
                for (let j = 0; j < n; j++)
                {
                    matrix = this.cut_matrix(i, j, originalMatrix);
                    cofactor[i][j] = this.cofactor(matrix, i, j);
                }
            }
            adjugate_matrix = this.transpose_matrix(cofactor);
            result = this.scale_matrix(adjugate_matrix, 1 / this.laplace(originalMatrix));
            return result;
        },

        transformed_image(img, inverse_matrix) {
            let position_i;
            let position_j;
            let a;
            let b;
            let x;
            let y;
            let imgToBeInverseMapped = img.clone();
            let transformedImage = img.clone();

            for(var i=0; i<this.height; i++) {
                for(var j=0; j<this.width; j++) {
                    x = i * inverse_matrix[0][0] + j * inverse_matrix[0][1];
                    y = i * inverse_matrix[1][0] + j * inverse_matrix[1][1];

                    position_i = Math.floor(x);
                    position_j = Math.floor(y);
                    a = x-position_i;
                    b = y-position_j;

                    
                    for(let k=0; k<4; k++){
                        transformedImage.selection.data[(i * this.width + j)*4 + k] = 
                        (1-a)*(1-b)*imgToBeInverseMapped.selection.data[(position_i)*this.width*4+(position_j)*4+k]+
                        a*(1-b)*imgToBeInverseMapped.selection.data[(position_i+1)*this.width*4+(position_j)*4+k]+
                        a*b*imgToBeInverseMapped.selection.data[(position_i+1)*this.width*4+(position_j+1)*4+k]+
                        (1-a)*b*imgToBeInverseMapped.selection.data[(position_i)*this.width*4+(position_j+1)*4+k]
                    }
                }
            }

            return transformedImage;
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
                    this.transformed = this.convolution(convolution_matrix_laplace_filter, img ); 
                    break;
            }

        },

        apply_xform: function()  {
            let transformationMatrix = this.xform.tolist();

            let inverse = this.inverse_matrix(transformationMatrix);
            
            this.transformed = this.transformed_image(this.transformed, inverse);
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


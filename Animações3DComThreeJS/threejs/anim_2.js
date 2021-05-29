

function Comemorando() {}

Object.assign( Comemorando.prototype, {

    init: function() {



                           let headturn = new TWEEN.Tween( {theta:0} )
                           .to( {theta:Math.PI }, 500)
                           .onUpdate(function(){
                               
                               let right_upper_arm =  robot.getObjectByName("head");
                               let [x,y,z]= [right_upper_arm.position.x,right_upper_arm.position.y,right_upper_arm.position.z];
                               let pivot = {x:0, y:1.7,z:0};

                               right_upper_arm.matrix.makeTranslation(0,0,0)
                               .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                               .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/8))
                               .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                               .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                       
                           


                       
                               right_upper_arm.updateMatrixWorld(true);
                           
                               stats.update();
                               renderer.render(scene, camera);    
                           }).easing(TWEEN.Easing.NossaFuncao.Abs)

                            let torsoTween = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 500)
                            .onUpdate(function(){
                                
                                let local =  robot.getObjectByName("torso");
                                let [x,y,z]= [local.position.x,local.position.y,local.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                local.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(0,this._object.theta*1.5,0))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                local.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)
                            

                            let torsoBaixoTween = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 600)
                            .onUpdate(function(){
                                
                                let local =  robot.getObjectByName("torso");
                                let [x,y,z]= [local.position.x,local.position.y,local.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                local.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(0,-this._object.theta/2,0))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                local.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)







                            let upperArmTween = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 600)
                            .onUpdate(function(){
                                
                                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                                let [x,y,z]= [right_upper_arm.position.x,right_upper_arm.position.y,right_upper_arm.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                right_upper_arm.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/10))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                right_upper_arm.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)


                            let lowArmTween = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 600)
                            .onUpdate(function(){
                                
                                let right_upper_arm =  robot.getObjectByName("right_lower_arm");
                                let [x,y,z]= [right_upper_arm.position.x,right_upper_arm.position.y,right_upper_arm.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                right_upper_arm.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/10))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                right_upper_arm.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)






                            let upperArmTween2 = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 500)
                            .onUpdate(function(){
                                
                                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                                let [x,y,z]= [right_upper_arm.position.x,right_upper_arm.position.y,right_upper_arm.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                right_upper_arm.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/1.5))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                right_upper_arm.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)

                            
                            let lowerArmTween2 = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 700)
                            .onUpdate(function(){
                                
                                let right_upper_arm =  robot.getObjectByName("right_lower_arm");
                                let [x,y,z]= [right_upper_arm.position.x,right_upper_arm.position.y,right_upper_arm.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                right_upper_arm.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/1.5))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                right_upper_arm.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)


                        






                            let upperleftArmTween = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 600)
                            .onUpdate(function(){
                                
                                let right_upper_arm =  robot.getObjectByName("left_upper_arm");
                                let [x,y,z]= [right_upper_arm.position.x,right_upper_arm.position.y,right_upper_arm.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                right_upper_arm.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/10))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                right_upper_arm.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)





                            let leftlowArmTween = new TWEEN.Tween( {theta:0} )
                            .to( {theta:Math.PI }, 600)
                            .onUpdate(function(){
                                
                                let right_upper_arm =  robot.getObjectByName("left_lower_arm");
                                let [x,y,z]= [right_upper_arm.position.x,right_upper_arm.position.y,right_upper_arm.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                right_upper_arm.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/10))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                right_upper_arm.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)







                            
                            
                            let leftuplegTween = new TWEEN.Tween( {theta:1} )
                            .to( {theta:7/10}, 600)
                            .onUpdate(function(){
                                
                                let local =  robot.getObjectByName("left_upper_leg");
                                let [x,y,z]= [local.position.x,local.position.y,local.position.z];
                                let pivot = {x:0, y:1.7,z:0};
                                let localson= robot.getObjectByName("left_lower_leg");

                                local.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeScale(1,this._object.theta,1))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                            


                        
                                local.updateMatrixWorld(true);
                                
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)

                            
                            
                            
                            let leftlowlegTween  = new TWEEN.Tween( {theta:3/4} )
                            .to( {theta:1 }, 600)
                            .onUpdate(function(){
                                
                                let local =  robot.getObjectByName("left_lower_leg");
                                let [x,y,z]= [local.position.x,local.position.y,local.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                local.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeScale(1,this._object.theta,1))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                local.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)
                            
                            



                            
                            
                            let rightuplegTween = new TWEEN.Tween( {theta:1} )
                            .to( {theta:7/10}, 600)
                            .onUpdate(function(){
                                
                                let local =  robot.getObjectByName("right_upper_leg");
                                let [x,y,z]= [local.position.x,local.position.y,local.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                local.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeScale(1,this._object.theta,1))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                local.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)



                            let rightlowlegTween = new TWEEN.Tween( {theta:3/4} )
                            .to( {theta:1}, 600)
                            .onUpdate(function(){
                                
                                let local =  robot.getObjectByName("right_lower_leg");
                                let [x,y,z]= [local.position.x,local.position.y,local.position.z];
                                let pivot = {x:0, y:1.7,z:0};

                                local.matrix.makeTranslation(0,0,0)
                                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeScale(1,this._object.theta,1))
                                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
                        
                            


                        
                                local.updateMatrixWorld(true);
                            
                                stats.update();
                                renderer.render(scene, camera);    
                            }).easing(TWEEN.Easing.NossaFuncao.Abs)
                            
                            
                            


                            
                            torsoBaixoTween.chain(torsoTween);
                            upperArmTween.chain(upperArmTween2, lowerArmTween2, headturn);
                            
                            
                            
        

                            upperleftArmTween.start();
                            leftlowArmTween.start();


                            upperArmTween.start();
                            lowArmTween.start();
                            


                            leftuplegTween.start();
                            leftlowlegTween.start();
                            rightuplegTween.start();
                            rightlowlegTween.start();



                            torsoBaixoTween.start(); 
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});





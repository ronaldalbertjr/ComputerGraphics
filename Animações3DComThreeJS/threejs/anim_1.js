function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 300)
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
            })

        let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 3000)
            .onUpdate(function(){
                
                let right_lower_arm =  robot.getObjectByName("right_lower_arm");
                let [x,y,z]= [right_lower_arm.position.x,right_lower_arm.position.y,right_lower_arm.position.z];
                let pivot = {x:0, y:1.7,z:0};

                right_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/2))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
        
            


                right_lower_arm.updateMatrixWorld(true);
            
            
                stats.update();
                renderer.render(scene, camera);    
            }).easing(TWEEN.Easing.NossaFuncao.Sin)


        let leftlowArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 3300)
            .onUpdate(function(){
                
                let left_lower_arm =  robot.getObjectByName("left_lower_arm");
                let [x,y,z]= [left_lower_arm.position.x,left_lower_arm.position.y,left_lower_arm.position.z];
                let pivot = {x:0, y:1.7,z:0};

                left_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/18))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );

                left_lower_arm.updateMatrixWorld(true);
            
               
                stats.update();
                renderer.render(scene, camera);    
            }).easing(TWEEN.Easing.NossaFuncao.constantAbs)


        let headtween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 3300)
            .onUpdate(function(){
                
                let head =  robot.getObjectByName("head");
                let [x,y,z]= [head.position.x,head.position.y,head.position.z];
                let pivot = {x:0, y:1.7,z:0};

                head.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/18))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );

                //console.log(head.position.x,head.position.y,head.position.z);
                head.updateMatrixWorld(true);
               
                stats.update();
                renderer.render(scene, camera);    
            }).easing(TWEEN.Easing.NossaFuncao.constantAbs)
        
        let inverseUpperArmTween = new TWEEN.Tween( {theta:Math.PI} )
            .to( {theta:0 }, 500)
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
            })
        
            
        upperArmTween.chain( lowerArmTween );
        upperArmTween.start(); 
        leftlowArmTween.start(650);
        headtween.start(650);
        inverseUpperArmTween.start(3500)
        
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





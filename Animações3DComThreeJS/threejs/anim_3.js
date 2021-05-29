function Tocando() {}

Object.assign( Tocando.prototype, {

    init: function() {


        let headnod = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
         
            














            let head =  robot.getObjectByName("head");
            let [x,y,z]= [head.position.x,head.position.y,head.position.z];
            let pivot = {x:0, y:-1,z:0};

            head.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/5))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


            head.updateMatrixWorld(true);
        
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.SinMais)

        let headstart = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 500)
        .onUpdate(function(){
            
            let head =  robot.getObjectByName("head");
            let [x,y,z]= [head.position.x,head.position.y,head.position.z];
            let pivot = {x:0, y:-1,z:0};

            head.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/18))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


            head.updateMatrixWorld(true);
        
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.constantAbs)






        let torsoTween = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 500)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("torso");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(0,this._object.theta/2,0))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.Abs)






        let torsoTweenbaixo = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("torso");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(0,-this._object.theta/3,0))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.Abs)



        let leftupperarm = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("left_upper_arm");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/6))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.consRapidAbs)

        let rightupperarm = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("right_upper_arm");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/4))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.SinMais)




        let leftlowerarm = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("left_lower_arm");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/8))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.constantAbs)








        let rightlowerarm = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("right_lower_arm");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/3))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.consRapidAbs)





        let rightlegup = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("right_upper_leg");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/7))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.Abs)




        let leftlegup = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("left_upper_leg");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/7))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.Abs)










        let rightleglowerup = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("right_lower_leg");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/7))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.Abs)




        let leftleglower = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI }, 3000)
        .onUpdate(function(){
            
            let local =  robot.getObjectByName("left_lower_leg");
            let [x,y,z]= [local.position.x,local.position.y,local.position.z];
            let pivot = {x:0, y:1.7,z:0};

            local.matrix.makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ) )
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/7))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ) )
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ) );
    
        


    
            local.updateMatrixWorld(true);
        
            stats.update();
            renderer.render(scene, camera);    
        }).easing(TWEEN.Easing.NossaFuncao.Abs)





        headstart.chain(headnod)
        torsoTween.chain(torsoTweenbaixo,leftlegup,rightlegup, rightleglowerup, leftleglower)




        torsoTween.start()
        headstart.start()


        leftupperarm.start()
        rightupperarm.start()
        leftlowerarm.start()
        rightlowerarm.start()
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





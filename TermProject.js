var scene = null;
var blockNum = 0;
var notAbleToJump = 0;
var type = 'cobble';
var creeper = false;
var createScene = function (canvas, engine) {
    scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.04, 0);
    scene.collisionsEnabled = true;
    var music = new BABYLON.Sound("Music", "music/Dog.mp3", scene, null, { loop: true, autoplay: true });
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(1, 3, -2), scene);

    buildAtmosphere();
    buildStage();
    robot = buildRobot(0,0.6,-5);
    var player = new Player(scene,new BABYLON.Vector3(0,1.1,-10));
/*
    window.addEventListener("mousemove", MouseMove, false);
    function MouseMove(event) {
        var xx = player.camera.position.x;
        var yy = player.camera.position.y;
        var zz = player.camera.position.z;
        var angle = player.camera.rotation.y;
        robot.rotation.y = angle;
        robot.position.x = xx+3*Math.sin(angle);
        robot.position.z = zz+3*Math.cos(angle);
    }
    window.addEventListener("keydown", onKeyDown, false);
    function onKeyDown(event) {
        switch (event.keyCode) {
            case 87:{
                console.log('yes');
                var xx = player.camera.position.x;
                var yy = player.camera.position.y;
                var zz = player.camera.position.z;
                var angle = player.camera.rotation.y;
                robot.rotation.y = angle;
                robot.position.x = xx+3*Math.sin(angle);
                robot.position.z = zz+3*Math.cos(angle);
            }
            case 83:{
                console.log('yes');
                var xx = player.camera.position.x;
                var yy = player.camera.position.y;
                var zz = player.camera.position.z;
                var angle = player.camera.rotation.y;
                robot.rotation.y = angle;
                robot.position.x = xx+3*Math.sin(angle);
                robot.position.z = zz+3*Math.cos(angle);
            }
            case 65:{
                console.log('yes');
                var xx = player.camera.position.x;
                var yy = player.camera.position.y;
                var zz = player.camera.position.z;
                var angle = player.camera.rotation.y;
                robot.rotation.y = angle;
                robot.position.x = xx+3*Math.sin(angle);
                robot.position.z = zz+3*Math.cos(angle);
            }
            case 68:{
                console.log('yes');
                var xx = player.camera.position.x;
                var yy = player.camera.position.y;
                var zz = player.camera.position.z;
                var angle = player.camera.rotation.y;
                robot.rotation.y = angle;
                robot.position.x = xx+3*Math.sin(angle);
                robot.position.z = zz+3*Math.cos(angle);
            }
        }
    }
    */
    window.addEventListener("keyup", onKeyUp, false);
    function onKeyUp(event) {
        switch (event.keyCode) {
            case 32:{
                if (notAbleToJump ==0) {
                    notAbleToJump = 1;
                    cameraJump();
                }
                break;
            }
            case 49:{
                type = 'cobble';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[0].style.display='block';
                break;
            }
            case 50:{
                type = 'dirt';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[1].style.display='block';
                break;
            }
            case 51:{
                type = 'leaf';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[2].style.display='block';
                break;
            }
            case 52:{
                type = 'plank';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[3].style.display='block';
                break;
            }
            case 53:{
                type = 'grass';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[4].style.display='block';
                break;
            }
            case 54:{
                type = 'gravel';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[5].style.display='block';
                break;
            }
            case 55:{
                type = 'stone';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[6].style.display='block';
                break;
            }
            case 56:{
                type = 'wood';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[7].style.display='block';
                break;
            }
            case 57:{
                type = 'glass';
                var pics=document.getElementById('pics').getElementsByTagName('img');
                for(i=0;i<pics.length;i++){
                    pics[i].style.display='none';
                }
                pics[8].style.display='block';
                break;
            }

        }
    }

    var cameraJump = function() {
        var cam1 = scene.cameras[0];
        cam1.animations = [];
        var a = new BABYLON.Animation(
            "a",
            "position.y", 20,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = [];
        keys.push({ frame: 0, value: cam1.position.y });
        keys.push({ frame: 6, value: cam1.position.y + 1.4 });
        keys.push({ frame: 8, value: cam1.position.y +1});
        a.setKeys(keys);
        var easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        a.setEasingFunction(easingFunction);
        cam1.animations.push(a);
        scene.beginAnimation(cam1, 0, 8, false);
        notAbleToJump = 0;
    }
    scene.onPointerDown = function (evt, pickResult) {
        if (!player.controlEnabled) {
            if (evt.button==2){
                rc = true;
            }
            else {
                rc = false;
            }
        if (pickResult.pickedMesh) {
            console.log(pickResult.pickedMesh.name);
            var xx = player.camera.position.x;
            var yy = player.camera.position.y;
            var zz = player.camera.position.z;
            if (pickResult.pickedMesh.name == 'door') {
                var door = scene.getMeshByID(pickResult.pickedMesh.name);
                if (dist(xx, yy, zz, door.position.x, door.position.y, door.position.z) <= 10) {
                    if (door.rotation.y == Math.PI / 2) {
                        door.checkCollisions = true;
                        door.rotation.y = 0;
                        var sfx = new BABYLON.Sound("Music", "music/door_close.ogg", scene, null, { loop: false, autoplay: true });
                    }
                    else {
                        door.checkCollisions = false;
                        door.rotation.y = Math.PI / 2;
                        var sfx = new BABYLON.Sound("Music", "music/door_open.ogg", scene, null, { loop: false, autoplay: true });
                    }
                }
            }
            else if (pickResult.pickedMesh.name == 'head'||
                pickResult.pickedMesh.name == 'face'||
                pickResult.pickedMesh.name == 'chest'||
                pickResult.pickedMesh.name == 'waist'||
                pickResult.pickedMesh.name == 'leftshoulder'||
                pickResult.pickedMesh.name == 'rightshoulder'||
                pickResult.pickedMesh.name == 'leftelbow'||
                pickResult.pickedMesh.name == 'rightelbow'||
                pickResult.pickedMesh.name == 'leftwrist'||
                pickResult.pickedMesh.name == 'rightwrist'||
                pickResult.pickedMesh.name == 'lefthip'||
                pickResult.pickedMesh.name == 'righthip'||
                pickResult.pickedMesh.name == 'leftknee'||
                pickResult.pickedMesh.name == 'rightknee'||
                pickResult.pickedMesh.name == 'leftankle'||
                pickResult.pickedMesh.name == 'rightankle'){
                if (creeper){creeper = false;}else{creeper = true;}
                applyTexture();
            }
            else {
                if (rc) {
                    if (pickResult.pickedMesh.name == 'extraGround' || pickResult.pickedMesh.name == 'skyBox') {
                    }

                    else {
                        var face = scene.getMeshByID(pickResult.pickedMesh.name);
                        if (dist(xx, yy, zz, face.position.x, face.position.y, face.position.z) <= 10) {
                            dtype = trimNumber(pickResult.pickedMesh.name);
                            deleteSound(dtype);
                            face.dispose();
                        }
                    }
                }
                else {
                    var testx = pickResult.pickedPoint.x;
                    var testy = pickResult.pickedPoint.y;
                    var testz = pickResult.pickedPoint.z;
                    var norm = pickResult.getNormal();
                    var normA = norm.asArray();
                    for (var i = 0; i <= 3; i++) {
                        if (normA[2] == -1) {
                            var a = Math.round(testx);
                            var b = Math.round(testy);
                            var c = Math.floor(testz);
                            if (dist(xx, yy, zz, a, b, c) <= 10) {
                                createSound(type);
                                createBlocks(1, 1, 1, a, b, c, type);
                            }
                            break;
                        }
                        else if (normA[2] == 1) {
                            var a = Math.round(testx);
                            var b = Math.round(testy);
                            var c = Math.ceil(testz);
                            if (dist(xx, yy, zz, a, b, c) <= 10) {
                                createSound(type);
                                createBlocks(1, 1, 1, a, b, c, type);
                            }
                            break;
                        }
                        else if (normA[0] == 1) {
                            var a = Math.ceil(testx);
                            var b = Math.round(testy);
                            var c = Math.round(testz);
                            if (dist(xx, yy, zz, a, b, c) <= 10) {
                                createSound(type);
                                createBlocks(1, 1, 1, a, b, c, type);
                            }
                            break;
                        }
                        else if (normA[0] == -1) {
                            var a = Math.floor(testx);
                            var b = Math.round(testy);
                            var c = Math.round(testz);
                            if (dist(xx, yy, zz, a, b, c) <= 10) {
                                createSound(type);
                                createBlocks(1, 1, 1, a, b, c, type);
                            }
                            break;
                        }
                        else if (normA[1] == 1) {
                            var a = Math.round(testx);
                            var b = Math.ceil(testy);
                            var c = Math.round(testz);
                            if (dist(xx, yy, zz, a, b, c) <= 10) {
                                createSound(type);
                                createBlocks(1, 1, 1, a, b, c, type);
                            }
                            break;
                        }
                        else if (normA[0] == -1) {
                            var a = Math.round(testx);
                            var b = Math.floor(testy);
                            var c = Math.round(testz);
                            if (dist(xx, yy, zz, a, b, c) <= 10) {
                                createSound(type);
                                createBlocks(1, 1, 1, a, b, c, type);
                            }
                            break;
                        }
                    }
                }
            }

        }
    }
};
    return scene;
}

function createSound(type){
    var ran = Math.floor(Math.random()*3+1);
    switch (type){
        case "grass":
            var sfx = new BABYLON.Sound("Music", "music/grass"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "leaf":
            var sfx = new BABYLON.Sound("Music", "music/grass"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "dirt":
            var sfx = new BABYLON.Sound("Music", "music/gravel"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "gravel":
            var sfx = new BABYLON.Sound("Music", "music/gravel"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "stone":
            var sfx = new BABYLON.Sound("Music", "music/stone"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "cobble":
            var sfx = new BABYLON.Sound("Music", "music/stone"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "glass":
            var sfx = new BABYLON.Sound("Music", "music/stone"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "wood":
            var sfx = new BABYLON.Sound("Music", "music/wood"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "plank":
            var sfx = new BABYLON.Sound("Music", "music/wood"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        default:
    }
}

function deleteSound(dtype){
    var ran = Math.floor(Math.random()*3+1);
    switch (dtype){
        case "grass":
            var sfx = new BABYLON.Sound("Music", "music/grass"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "leaf":
            var sfx = new BABYLON.Sound("Music", "music/grass"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "dirt":
            var sfx = new BABYLON.Sound("Music", "music/gravel"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "gravel":
            var sfx = new BABYLON.Sound("Music", "music/gravel"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "stone":
            var sfx = new BABYLON.Sound("Music", "music/stone"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "cobble":
            var sfx = new BABYLON.Sound("Music", "music/stone"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "glass":
            var sfx = new BABYLON.Sound("Music", "music/glass"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "wood":
            var sfx = new BABYLON.Sound("Music", "music/wood"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        case "plank":
            var sfx = new BABYLON.Sound("Music", "music/wood"+ran+".ogg", scene, null, { loop: false, autoplay: true });
            break;
        default:
    }
}

function dist(x1,y1,z1,x2,y2,z2){
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2)+Math.pow(z1-z2,2));
}

function trimNumber(str){
    return str.replace(/\d+/g,'');
}

function buildAtmosphere(){
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.003;
    scene.fogColor = new BABYLON.Color3(0.8,0.83,0.8);

    var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
    var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
    extraGroundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
    extraGroundMaterial.diffuseTexture.uScale = 600;
    extraGroundMaterial.diffuseTexture.vScale = 600;
    extraGroundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    extraGround.position.y = -0.5;
    extraGround.material = extraGroundMaterial;
    extraGround.checkCollisions = true;

} 

function buildStage(){
    createBlocks(2,3,1,-5,0,0,"plank");
    createBlocks(4,3,1,-2,0,0,"plank");
    createBlocks(7,3,1,-5,0,5,"plank");
    createBlocks(1,3,4,-5,0,1,"plank");
    createBlocks(10,1,10,-20,0,0,"cobble");
    createBlocks(1,3,4,1,0,1,"plank");
    createBlocks(7,1,6,-5,3,0,"plank");
    createBlocks(1,1,1,-3,2,0,"plank");
    createBlocks(1,3,1,-8,0,-6,"wood");
    createBlocks(3,1,3,-9,3,-7,"leaf");
    createBlocks(4,1,5,-10,4,-8,"leaf");
    createBlocks(2,1,3,-8,5,-7,"leaf");
    createDoor(-3,0,0);
    var box = new BABYLON.Mesh.CreateBox('stairs', createTexture(), scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.position = new BABYLON.Vector3(-15, 0, -1);
    box.scaling = new BABYLON.Vector3(1, 1.414, .01);
    box.rotation.x = Math.PI/4;
    box.checkCollisions = true;
    box.material.specularColor = new BABYLON.Color3(0, 0, 0);
    box.material.diffuseTexture = new BABYLON.Texture("textures/cobble.jpg", scene);
}

function createDoor(px,py,pz){
    var a=10;var b=5;var c=1;
    var w=2*b+2*c;var l=a+2*c;
    var top = new BABYLON.Vector4(c/w,(a+c)/l,(b+c)/w,1);
    var bottom = top;
    var left = new BABYLON.Vector4(0,c/l,c/w,(a+c)/l);
    var right = left;
    var behind = new BABYLON.Vector4(c/w,c/l,(b+c)/w,(a+c)/l);
    var front = new BABYLON.Vector4((b+2*c)/w,c/l,1,(a+c)/l);
    var faceUV = new Array(front,behind,left,right,top,bottom);
    var options = {
        width: 1,
        height: 2,
        depth: 0.1,
        faceUV: faceUV
    };
    var door = BABYLON.Mesh.CreateBox("door", options, scene);
    door.material = new BABYLON.StandardMaterial("red", scene);
    door.material.specularColor = new BABYLON.Color3(0, 0, 0);
    var tx = new BABYLON.Texture("textures/door2.png", scene);
    door.material.diffuseTexture = tx;
    door.material.opacityTexture = tx;
    door.position = new BABYLON.Vector3(px-0.5,py+0.5,pz-0.5);
    door.checkCollisions = true;
    var matrix = BABYLON.Matrix.Translation(0.5, 0, 0);
    door.setPivotMatrix(matrix);
}

function createTexture(btype){
    switch (btype){
        case "glass":
            var faceUV = new Array(6);
            break;
        default:
            var top = new BABYLON.Vector4(1/4,1/3,2/4,2/3);
            var bottom = new BABYLON.Vector4(3/4,1/3,4/4,2/3);
            var left = new BABYLON.Vector4(0/4,1/3,1/4,2/3);
            var right = new BABYLON.Vector4(3/4,1/3,2/4,2/3);
            var front = new BABYLON.Vector4(1/4,2/3,2/4,1);
            var behind = new BABYLON.Vector4(1/4,0/3,2/4,1/3);
            var faceUV = new Array(front,behind,left,right,top,bottom);
    }

    var options = {
        width: 1,
        height: 1,
        depth: 1,
        faceUV: faceUV
    };
    return options;
}

function createBlocks(nx,ny,nz,px,py,pz,btype){
    var block = new Array();
    var pt = 0;
    for (var i=1;i<=nx;i++){
        for (var j=1;j<=ny;j++){
            for (var k=1;k<=nz;k++){
                block[pt] = BABYLON.Mesh.CreateBox(btype+blockNum, createTexture(btype), scene);
                block[pt].material = new BABYLON.StandardMaterial("red", scene);
                block[pt].material.specularColor = new BABYLON.Color3(0, 0, 0);
                block[pt].position = new BABYLON.Vector3(px+i-1,py+j-1,pz+k-1);
                block[pt].checkCollisions = true;
                if (btype=="glass"){
                    var tx = new BABYLON.Texture("textures/"+btype+".png", scene);
                    block[pt].material.diffuseTexture = tx;
                    block[pt].material.opacityTexture = tx;
                }
                else{
                    block[pt].material.diffuseTexture = new BABYLON.Texture("textures/"+btype+".jpg", scene);
                }
                pt++;
                blockNum++;
            }
        }
    }
}



function buildRobot(px,py,pz){
    /*
    var materialSphere3 = new BABYLON.StandardMaterial("texture3", scene);
    //materialSphere3.diffuseTexture = new BABYLON.Texture("tree.png", scene);
    var robot = BABYLON.Mesh.CreateBox("lamont", 0.0001, scene);
    var head = BABYLON.Mesh.CreateBox("head", { width: 0.2, height: 0.2, depth: 0.2 }, scene);
    head.parent = robot;
    head.position.y = 0.08;
    head.material = new BABYLON.StandardMaterial("red", scene);
    //head.material.diffuseColor = new BABYLON.Color3(0.8, 0.0, 0.0);
    head.checkCollisions = true;
    var face = BABYLON.Mesh.CreatePlane("face", 0.2, scene);
    face.parent = head;
    face.position.z = 0.101;
    face.rotation.y = Math.PI;
    face.material = new BABYLON.StandardMaterial("white", scene);
    face.checkCollisions = true;
    var chest = BABYLON.Mesh.CreateBox("chest", { width: 0.4, height: 0.55, depth: 0.2 }, scene);
    chest.material = new BABYLON.StandardMaterial("red", scene);
    //chest.material.diffuseColor = new BABYLON.Color3(0.0, 0.0, 0.8);
    chest.position.y = -0.3;
    chest.parent = robot;
    chest.checkCollisions = true;
    createArm("right",  chest);
    createArm("left",  chest);

    var waist = BABYLON.Mesh.CreateBox("waist", { width: 0.4, height: 0.1, depth: 0.2 }, scene);
    waist.parent = robot;
    waist.position.y = -0.64;
    waist.material = materialSphere3;
    waist.checkCollisions = true;
    var animateHead = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var animateHead2 = new BABYLON.Animation("myAnimation", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys0 = [];
    var keys01 =[];
    keys0.push({
        frame:0,
        value:7
    });
    keys0.push({
        frame:50,
        value: 5.5
    });
    keys0.push({
        frame:100,
        value:7
    });
    keys01.push({
        frame:0, value:0.2
    });
    keys01.push({
        frame:1, value:-0.2
    });
    keys01.push({
        frame:2, value:0.2
    });
    animateHead.setKeys(keys0);
    head.animations.push(animateHead);
    scene.beginAnimation(head, 0, 100, true);
    var animateChest = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys = [];
    keys.push({
        frame: 0,
        value: 5.5//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 2,
        value: 5.7//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 4,
        value: 5.5//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 50,
        value: 7//(side == "left"? 7: -7)
    });
    keys.push({
        frame: 52,
        value: 6.8//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 54,
        value: 7//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 100,
        value: 5.5//(side == "left"? 5: -5)
    });
    animateChest.setKeys(keys);
    chest.animations.push(animateChest);
    scene.beginAnimation(chest, 0, 100, true);

    createLeg("right", waist);
    createLeg("left", waist);
    */
    var robot = BABYLON.Mesh.CreateBox("lamont", 0.0001, scene);
    var head = BABYLON.Mesh.CreateBox("head", { width: 0.2, height: 0.2, depth: 0.2 }, scene);
    head.parent = robot;
    head.position.y = 0.35;
    head.material = new BABYLON.StandardMaterial("red", scene);
    head.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    head.checkCollisions = true;
    //head.material.ambientTexture = new BABYLON.Texture("steve_hair.jpg", scene);


    //creation of three planes to change 3 sides of the cube
    var face = BABYLON.Mesh.CreatePlane("face", 0.2, scene);
    face.parent = head;
    face.position.z = 0.105;
    face.rotation.y = Math.PI;
    face.material = new BABYLON.StandardMaterial("white", scene);
    face.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    face.checkCollisions = true;
    //face.material.ambientTexture = new BABYLON.Texture("steve_face.jpg", scene);

    var chest = BABYLON.Mesh.CreateBox("chest", { width: 0.35, height: .5, depth: 0.2 }, scene);
    chest.material = new BABYLON.StandardMaterial("red", scene);
    chest.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    chest.material.ambientTexture = new BABYLON.Texture("normal.jpg", scene);
    //chest.scaling.y = 3;
    //chest.scaling.x = 2;
    chest.parent = robot;
    chest.checkCollisions = true;
    createArm("right",  chest);
    createArm("left",  chest);

    var waist = BABYLON.Mesh.CreateBox("waist", { width: 0.35, height: 0.15, depth: 0.2 }, scene);
    waist.parent = robot;
    waist.position.y = -0.325;
    waist.material = new BABYLON.StandardMaterial("yellow", scene);
    waist.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    waist.checkCollisions = true;
    //waist.material.ambientTexture = new BABYLON.Texture("normal_pants.jpg", scene);

    createLeg("right", waist);
    createLeg("left", waist);

    var animateHead = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var animateHead2 = new BABYLON.Animation("myAnimation", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys0 = [];
    var keys01 =[];
    keys0.push({
        frame:0,
        value:7
    });
    keys0.push({
        frame:50,
        value: 5.5
    });
    keys0.push({
        frame:100,
        value:7
    });
    keys01.push({
        frame:0, value:0.2
    });
    keys01.push({
        frame:1, value:-0.2
    });
    keys01.push({
        frame:2, value:0.2
    });
    animateHead.setKeys(keys0);
    head.animations.push(animateHead);
    //animateHead2.setKeys(keys01);
    //head.animations.push(animateHead2);
    scene.beginAnimation(head, 0, 100, true);


    var animateChest = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys = [];
    keys.push({
        frame: 0,
        value: 5.5//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 2,
        value: 5.7//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 4,
        value: 5.5//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 50,
        value: 7//(side == "left"? 7: -7)
    });
    keys.push({
        frame: 52,
        value: 6.8//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 54,
        value: 7//(side == "left"? 5: -5)
    });
    keys.push({
        frame: 100,
        value: 5.5//(side == "left"? 5: -5)
    });
    animateChest.setKeys(keys);
    chest.animations.push(animateChest);
    scene.beginAnimation(chest, 0, 100, true);
    robot.position.x = px;
    robot.position.y = py;
    robot.position.z = pz;
    robot.rotation.y = Math.PI;
    applyTexture();
    return robot;
}

function applyTexture() {
    var head = scene.getNodeByName('head');
    var face = scene.getNodeByName('face');
    var chest = scene.getNodeByName('chest');
    var waist = scene.getNodeByName('waist');
    var LSH = scene.getNodeByName('leftshoulder');
    var RSH = scene.getNodeByName('rightshoulder');
    var LEL = scene.getNodeByName('leftelbow');
    var REL = scene.getNodeByName('rightelbow');
    var LWR = scene.getNodeByName('leftwrist');
    var RWR = scene.getNodeByName('rightwrist');
    var LHIP = scene.getNodeByName('lefthip');
    var RHIP = scene.getNodeByName('righthip');
    var LKN = scene.getNodeByName('leftknee');
    var RKN = scene.getNodeByName('rightknee');
    var LAN = scene.getNodeByName('leftankle');
    var RAN = scene.getNodeByName('rightankle');
    var LFT = scene.getNodeByName('leftfoot');
    var RFT = scene.getNodeByName('rightfoot');
    if (creeper){
        head.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        face.material.ambientTexture = new BABYLON.Texture("CREEPFACE.jpg", scene);
        chest.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        waist.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        LSH.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        RSH.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        LEL.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        REL.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        LWR.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        RWR.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        LHIP.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        RHIP.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        LKN.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        RKN.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        LAN.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        RAN.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        LFT.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
        RFT.material.ambientTexture = new BABYLON.Texture("creeper_skin.png", scene);
    }
    else {
        head.material.ambientTexture = new BABYLON.Texture("steve_hair.jpg", scene);
        face.material.ambientTexture = new BABYLON.Texture("steve_face.jpg", scene);
        chest.material.ambientTexture = new BABYLON.Texture("normal.jpg", scene);
        waist.material.ambientTexture = new BABYLON.Texture("normal_pants.jpg", scene);
        LSH.material.ambientTexture = new BABYLON.Texture("normal.jpg", scene);
        RSH.material.ambientTexture = new BABYLON.Texture("normal.jpg", scene);
        LEL.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        REL.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        LWR.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        RWR.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        LHIP.material.ambientTexture = new BABYLON.Texture("normal_pants.jpg", scene);
        RHIP.material.ambientTexture = new BABYLON.Texture("normal_pants.jpg", scene);
        LKN.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        RKN.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        LAN.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        RAN.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);
        LFT.material.ambientTexture = new BABYLON.Texture("normal_shoes.png", scene);
        RFT.material.ambientTexture = new BABYLON.Texture("normal_shoes.png", scene);
    }
}
/*
function createArm(side, parent) {
    var emptyPivotA = new BABYLON.Mesh(side + "pivos",scene);
    emptyPivotA.parent = parent;
    emptyPivotA.position.x = (side == "right"?0.25:-0.25);
    emptyPivotA.position.y = 0;
    var opts = { width: 0.15, height: 0.2, depth: 0.12 };
    var shoulder = BABYLON.Mesh.CreateBox(side + "shoulder",opts, scene);
    shoulder.parent = emptyPivotA;
    //shoulder.position.x = (side == "right"?0.1:-0.1);
    shoulder.position.y = 0.18;
    shoulder.material = new BABYLON.StandardMaterial("shouldercolor", scene);
    //shoulder.material.diffuseColor = new BABYLON.Color3(0.0, 0.8, 0.8);
    shoulder.checkCollisions = true;
    opts.depth = 0.15;opts.height = 0.2;opts.width = 0.12;
    var elbow = BABYLON.Mesh.CreateBox(side + "elbow", opts, scene);
    elbow.parent = shoulder;
    elbow.position.y = -0.2;
    elbow.material = new BABYLON.StandardMaterial("elbowcolor", scene);
    elbow.checkCollisions = true;
    //elbow.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.0);
    
    //opts.depth = 0.2;opts.height = 0.3;opts.width = 0.2;
    var wrist = BABYLON.Mesh.CreateBox(side + "wrist", opts, scene);
    wrist.parent = elbow;
    wrist.position.y = -0.2;
    wrist.material = new BABYLON.StandardMaterial("elbowcolor", scene);
    wrist.checkCollisions = true;
    //wrist.material.diffuseColor = new BABYLON.Color3(0.0, 0.8, 0.0);
    var animateLeg = new BABYLON.Animation("myAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys = [];
    keys.push({
        frame: 0,
        value: (side == "left"? -5: 5)
    });
    keys.push({
        frame: 50,
        value: (side == "left"? -7.5: 7.5)
    });
    keys.push({
        frame: 100,
        value: (side == "left"? -5: 5)
    });
    animateLeg.setKeys(keys);
    emptyPivotA.animations.push(animateLeg);
    scene.beginAnimation(emptyPivotA, 0, 100, true);

    var animateElbow = new BABYLON.Animation("animateWY", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys2 = [];
    keys2.push({
        frame: 0,
        value: (side == "left"? 1.5: -1.5)
    });
    keys2.push({
        frame: 20,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 40,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 50,
        value: (side == "left"? 1.5: -1.5)
    });
    keys2.push({
        frame: 70,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 90,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 100,
        value: (side == "left"? 1.5: -1.5)
    });
    animateElbow.setKeys(keys2);
    elbow.animations.push(animateElbow);
    scene.beginAnimation(elbow, 0, 100, true);
    
}

function createLeg(side, parent) {
    var emptyPivotL = new BABYLON.Mesh(side + "pivos",scene);
    emptyPivotL.parent = parent;
    emptyPivotL.position.x = (side == "right"?0.1:-0.1);
    emptyPivotL.position.y = 0;
    emptyPivotL.position.z = 0.07;
    var opts = { width: 0.18, height: 0.2, depth: 0.2 };
    var shoulder = BABYLON.Mesh.CreateBox(side + "hip",opts, scene);
    shoulder.parent = emptyPivotL;
    //shoulder.position.x = (side == "right"?0.18:-0.18);
    shoulder.position.y = -0.1;
    shoulder.material = new BABYLON.StandardMaterial("hipcolor", scene);
    shoulder.checkCollisions = true;
    //shoulder.material.diffuseColor = new BABYLON.Color3(0.0, 0.8, 0.8);
    
    //opts.depth = 0.23;opts.height = 0.4;opts.width = 0.23;
    var elbow = BABYLON.Mesh.CreateBox(side + "knee", opts, scene);
    elbow.parent = shoulder;
    elbow.position.y =-0.2;
    //elbow.scaling.y = 0.5;
    elbow.material = new BABYLON.StandardMaterial("kneecolor", scene);
    elbow.checkCollisions = true;
    //elbow.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.0);
    
    //opts.depth = 0.2;opts.height = 0.3;opts.width = 0.2;
    var wrist = BABYLON.Mesh.CreateBox(side + "ankle", opts, scene);
    wrist.parent = elbow;
    wrist.position.y = -0.2;
    //wrist.scaling.y = 0.75;
    wrist.material = new BABYLON.StandardMaterial("anklecolor", scene);
    wrist.checkCollisions = true;
    //wrist.material.diffuseColor = new BABYLON.Color3(0.0, 0.8, 0.0);
    var animateLeg = new BABYLON.Animation("myAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys = [];
    keys.push({
        frame: 0,
        value: (side == "left"? 0: -1.5)
    });
    keys.push({
        frame: 20,
        value: (side == "left"? -1.5: 0)
    });
    keys.push({
        frame: 25,
        value: (side == "left"? -1.5: 0)
    });
    keys.push({
        frame: 45,
        value: (side == "left"? 0: -1.5)
    });
    keys.push({
        frame: 50,
        value: (side == "left"? 0: -1.5)
    });

    animateLeg.setKeys(keys);
    emptyPivotL.animations.push(animateLeg);
    scene.beginAnimation(emptyPivotL, 0, 100, true);

    var animateKnee = new BABYLON.Animation("myAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys2 = [];
    keys2.push({
        frame: 0,
        value: (side == "left"? 0: 1.5)
    });
    keys2.push({
        frame: 20,
        value: (side == "left"? 1.5: 0)
    });
    keys2.push({
        frame: 25,
        value: (side == "left"? 1.5: 0)
    });
    keys2.push({
        frame: 45,
        value: (side == "left"? 0: 1.5)
    });
    keys2.push({
        frame: 50,
        value: (side == "left"? 0: 1.5)
    });
    animateKnee.setKeys(keys2);
    elbow.animations.push(animateKnee);
    scene.beginAnimation(elbow, 0, 100, true);

    var animateKneeY = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys3 = [];
    keys3.push({
        frame: 0,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 20,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 21,
        value: (side == "left"? 1: 0)
    });
    keys3.push({
        frame: 23,
        value: (side == "left"? -1: 0)
    });
    keys3.push({
        frame: 25,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 45,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 46,
        value: (side == "left"? 0: -1)
    });
    keys3.push({
        frame: 48,
        value: (side == "left"? 0: 1)
    });
    keys3.push({
        frame: 50,
        value: (side == "left"? 0: 0)
    });
    animateKneeY.setKeys(keys3);
    elbow.animations.push(animateKneeY);
    scene.beginAnimation(elbow, 0, 100, true);
    
}
*/
function createArm(side, parent) {
    var emptyPivotA = new BABYLON.Mesh(side + "pivos",scene);
    emptyPivotA.parent = parent;
    emptyPivotA.position.x = (side == "right"?0.24:-0.24);
    emptyPivotA.position.y = 0.3;

    var opts = { width: 0.125, height: 0.25, depth: 0.125 };
    var shoulder = BABYLON.Mesh.CreateBox(side + "shoulder",opts, scene);
    shoulder.parent = emptyPivotA;
    //shoulder.position.x = (side == "right"?0.5:-0.5);
    shoulder.position.y = -0.3;
    //shoulder.scaling.x = 0.25;shoulder.scaling.z = 0.5;shoulder.scaling.y = 0.5;
    shoulder.material = new BABYLON.StandardMaterial("shouldercolor", scene);
    shoulder.material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    shoulder.checkCollisions = true;
    //shoulder.material.ambientTexture = new BABYLON.Texture("normal.jpg", scene);

    opts.depth = 0.115;opts.height = 0.2;opts.width = 0.115;
    var elbow = BABYLON.Mesh.CreateSphere(side + "elbow", 10, 0.15, scene);
    elbow.parent = shoulder;
    elbow.position.y = -0.15;
    //elbow.scaling.y = 0.5;
    elbow.material = new BABYLON.StandardMaterial("elbowcolor", scene);
    elbow.material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    elbow.checkCollisions = true;
    //elbow.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);

    opts.depth = 0.1;opts.height = 0.25;opts.width = 0.1;
    var wrist = BABYLON.Mesh.CreateBox(side + "wrist", opts, scene);
    wrist.parent = elbow;
    wrist.position.y = -0.125;
    //wrist.scaling.y = 0.75;
    wrist.material = new BABYLON.StandardMaterial("elbowcolor", scene);
    wrist.material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    wrist.checkCollisions = true;
    //wrist.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);

    var animateLeg = new BABYLON.Animation("myAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys = [];
    keys.push({
        frame: 0,
        value: (side == "left"? -5: 5)
    });
    keys.push({
        frame: 50,
        value: (side == "left"? -7.5: 7.5)
    });
    keys.push({
        frame: 100,
        value: (side == "left"? -5: 5)
    });
    animateLeg.setKeys(keys);
    emptyPivotA.animations.push(animateLeg);
    scene.beginAnimation(emptyPivotA, 0, 100, true);

    var animateElbow = new BABYLON.Animation("animateWY", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys2 = [];
    keys2.push({
        frame: 0,
        value: (side == "left"? 1.5: -1.5)
    });
    keys2.push({
        frame: 20,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 40,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 50,
        value: (side == "left"? 1.5: -1.5)
    });
    keys2.push({
        frame: 70,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 90,
        value: (side == "left"? 0: 0)
    });
    keys2.push({
        frame: 100,
        value: (side == "left"? 1.5: -1.5)
    });
    animateElbow.setKeys(keys2);
    elbow.animations.push(animateElbow);
    scene.beginAnimation(elbow, 0, 100, true);

}

function createLeg(side, parent) {
    //empty object to be used as pivot
    var emptyPivotL = new BABYLON.Mesh(side + "pivos",scene);
    emptyPivotL.parent = parent;
    emptyPivotL.position.x = (side == "right"?0.1:-0.1);
    emptyPivotL.position.y = 0.15;
    //emptyPivotL.position.z = 0.035;

    var opts = { width: 0.125, height: 0.25, depth: 0.125 };
    var shoulder = BABYLON.Mesh.CreateBox(side + "hip",opts, scene);
    //shoulder.parent = parent;
    shoulder.parent = emptyPivotL;
    //shoulder.position.x = (side == "right"?0.35:-0.35);
    shoulder.position.y = -0.35;
    //shoulder.position.z = 0.07;
    //shoulder.scaling.x = 0.25;shoulder.scaling.z = 0.5;shoulder.scaling.y = 0.5;
    shoulder.material = new BABYLON.StandardMaterial("hipcolor", scene);
    shoulder.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    shoulder.checkCollisions = true;

    opts.depth = 0.115;opts.height = 0.2;opts.width = 0.115;
    var elbow = BABYLON.Mesh.CreateSphere(side + "knee", 10, 0.15, scene);
    elbow.parent = shoulder;
    elbow.position.y = -0.175;
    //elbow.scaling.y = 0.5;
    elbow.material = new BABYLON.StandardMaterial("kneecolor", scene);
    elbow.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    elbow.checkCollisions = true;
    //elbow.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);

    opts.depth = 0.1;opts.height = 0.25;opts.width = 0.1;
    var wrist = BABYLON.Mesh.CreateBox(side + "ankle", opts, scene);
    wrist.parent = elbow;
    wrist.position.y = -0.125;
    //wrist.scaling.y = 0.75;
    wrist.material = new BABYLON.StandardMaterial("anklecolor", scene);
    wrist.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    wrist.checkCollisions = true;
    //wrist.material.ambientTexture = new BABYLON.Texture("skin.jpg", scene);

    opts.depth = 0.15;opts.height=0.05;opts.width=0.1;
    var foot = BABYLON.Mesh.CreateBox(side + "foot", opts, scene);
    foot.parent = wrist;
    foot.position.z = 0.05;
    foot.position.y = -0.15;
    foot.material = new BABYLON.StandardMaterial("footcolor", scene);
    foot.material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0);
    foot.checkCollisions = true;
    //foot.material.ambientTexture = new BABYLON.Texture("normal_shoes.png", scene);

    var animateLeg = new BABYLON.Animation("myAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys = [];
    keys.push({
        frame: 0,
        value: (side == "left"? 0: -1.5)
    });
    keys.push({
        frame: 20,
        value: (side == "left"? -1.5: 0)
    });
    keys.push({
        frame: 25,
        value: (side == "left"? -1.5: 0)
    });
    keys.push({
        frame: 45,
        value: (side == "left"? 0: -1.5)
    });
    keys.push({
        frame: 50,
        value: (side == "left"? 0: -1.5)
    });

    animateLeg.setKeys(keys);
    emptyPivotL.animations.push(animateLeg);
    scene.beginAnimation(emptyPivotL, 0, 100, true);

    var animateKnee = new BABYLON.Animation("myAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys2 = [];
    keys2.push({
        frame: 0,
        value: (side == "left"? 0: 1.5)
    });
    keys2.push({
        frame: 20,
        value: (side == "left"? 1.5: 0)
    });
    keys2.push({
        frame: 25,
        value: (side == "left"? 1.5: 0)
    });
    keys2.push({
        frame: 45,
        value: (side == "left"? 0: 1.5)
    });
    keys2.push({
        frame: 50,
        value: (side == "left"? 0: 1.5)
    });
    animateKnee.setKeys(keys2);
    elbow.animations.push(animateKnee);
    scene.beginAnimation(elbow, 0, 100, true);

    var animateKneeY = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE )
    var keys3 = [];
    keys3.push({
        frame: 0,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 20,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 21,
        value: (side == "left"? 1: 0)
    });
    keys3.push({
        frame: 23,
        value: (side == "left"? -1: 0)
    });
    keys3.push({
        frame: 25,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 45,
        value: (side == "left"? 0: 0)
    });
    keys3.push({
        frame: 46,
        value: (side == "left"? 0: -1)
    });
    keys3.push({
        frame: 48,
        value: (side == "left"? 0: 1)
    });
    keys3.push({
        frame: 50,
        value: (side == "left"? 0: 0)
    });
    animateKneeY.setKeys(keys3);
    elbow.animations.push(animateKneeY);
    scene.beginAnimation(elbow, 0, 100, true);

}
function main() {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    engine.runRenderLoop(function () {
        scene.render();
    });
    var scene = new createScene(canvas, engine);
    
    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}
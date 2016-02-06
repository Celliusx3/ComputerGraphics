Player = function(scene,spawnPoint) {
    if (!spawnPoint) {
        spawnPoint = new BABYLON.Vector3(-5, 2.5, 2);
    }
    this.spawnPoint = spawnPoint;
    this.scene = scene;
    this.height = 0.8;
    this.speed = 1.0;
    this.inertia = 0.8;
    this.angularInertia = 0;
    this.angularSensibility = 2000;
    this.camera = this._initCamera();
    this.controlEnabled = false;

    // The player weapon
    //this.weapon = new Weapon(scene, this);
    var _this = this;
    var canvas = this.scene.getEngine().getRenderingCanvas();

    canvas.addEventListener("mousedown", function(evt) {
        var width = _this.scene.getEngine().getRenderWidth();
        var height = _this.scene.getEngine().getRenderHeight();
        if (_this.controlEnabled) {
            if (evt.button==2){
                rc = true;
            }
            else {
                rc = false;
            }
            var pickInfo = _this.scene.pick(width/2.5, height/2.5, null, false, _this.camera);
            _this.handleUserMouse(evt, pickInfo,rc);
        }
    }, false);

    this._initPointerLock();

};

Player.prototype = {
    _initPointerLock : function() {
        var _this = this;
        var canvas = this.scene.getEngine().getRenderingCanvas();
        canvas.addEventListener("click", function(evt) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }, false);
        var pointerlockchange = function (event) {
            _this.controlEnabled = (document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas);
            if (!_this.controlEnabled) {
                _this.camera.detachControl(canvas);
            } else {
                _this.camera.attachControl(canvas);
            }
        };
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    },

    _initCamera : function() {

        var cam = new BABYLON.FreeCamera("camera", this.spawnPoint, this.scene);
        cam.attachControl(this.scene.getEngine().getRenderingCanvas());
        cam.ellipsoid = new BABYLON.Vector3(0.4, this.height, 0.4);
        cam.checkCollisions = true;
        cam.applyGravity = true;
        cam.keysUp = [87];
        cam.keysDown = [83];
        cam.keysLeft = [65];
        cam.keysRight = [68];
        cam.speed = this.speed;
        cam.inertia = this.inertia;
        cam.angularInertia = this.angularInertia;
        cam.angularSensibility = this.angularSensibility;
        return cam;
    },



    handleUserMouse : function(evt, pickResult,rc) {

        if (pickResult.pickedMesh) {
            var xx = this.camera.position.x;
            var yy = this.camera.position.y;
            var zz = this.camera.position.z;
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
            else {
                if (rc) {
                    if (pickResult.pickedMesh.name == 'extraGround' || pickResult.pickedMesh.name == 'skyBox') {
                        console.log(pickResult.pickedMesh.name);
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
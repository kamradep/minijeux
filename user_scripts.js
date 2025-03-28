
discoveryDefine("/render/main", async function (scope) {
    eval(loadDiscoveryApi)

    
    clear()
    
    let map = await fetchImageSource(
        urlFor("sjaueairkvk71-7xPdWJbm.webp")
    )
    
    let knightSprites = await m.initPlayerMoves()
    knightSprites.switchTo("front")
    
    
    let mobSoldatMortImage = await fetchImageSource(
        urlFor("PC Computer - Wizorb - Enemies-Beh6BgsR.png")
    )
    
    let mobSoldat = createSpriteCollection({
        image: mobSoldatMortImage,
    })
    
    mobSoldat.add({
        name: "deathSoldier",
        width: 31,
        height: 25,
        frames: [
            {
                topLeft: {x: 2.5, y: 291.5},
            },
            {
                topLeft: {x: 36.5, y: 291.5},
            },
            {
                topLeft: {x: 70.5, y: 291.5},
            },
            {
                topLeft: {x: 104.5, y: 291.5},
            },
            {
                topLeft: {x: 138.5, y: 291.5},
            },
            {
                topLeft: {x: 172.5, y: 291.5},
            },
        ]
        
    })
    
    let xpMobImage = await fetchImageSource(
        urlFor("Browser Games - Godzilla Singular Point Escape Radio Wave Monster Rodan - Unused Graphics-eAqcty2y.png")
    )
    let xpSprite = createSpriteCollection({
        image: xpMobImage,
    })
    
    xpSprite.add({
        name:   "XPmobs",
        width:  139,
        height: 139,
        frames: [
            {
                topLeft: {x: 2.5, y: 2.5},
            }, 
            {
                topLeft: {x: 428.5, y: 2.5}
            },
        ]
    })
    
    
    
    let mobFlyImage = await fetchImageSource(
        urlFor("PC Computer - Wizorb - Eye of the Beholder-BCjFhGTj.png")
    )
    let mobFly = createSpriteCollection({
        image: mobFlyImage
    })
    
    mobFly.add({
        name: "deathFlyEye",
        width: 102,
        height: 55,
        frames: [
            {
                topLeft: {x: 3, y: 14.5},
            }, 
            {
                topLeft: {x: 109, y: 14.5}
            },
            {
                topLeft: {x: 215, y: 14.5},
            },
            {
                topLeft: {x: 321, y: 14.5}
            },
            {
                topLeft: {x: 427, y: 14.5}
            },
            {
                topLeft: {x: 533, y: 14.5}
            }
        ]
    })
    
    
    screen.disableMouseZoom()
    
    
    
    let mobData = [
        {
            name: "tank",
            life: 100,
            degat: 15,
            sprites: mobSoldat
        },
        {
            name: "fly",
            life: 50,
            degat: 20,
            sprites: mobFly
        }
    ]
    
    let player = {
        name: "Karma",
        life: 100,
        degat: 5,
        xp: 0,
        x: 0,
        y: 0,
        direction: "front",
        hasSomeCloseMonster: false,
        sprites: knightSprites
        /*stuff: {
            shield: 23,
            sword:  10
        },
        skills: ["strong", "elf", "sneaky"]*/
    }
    
    m.movePlayer(player, knightSprites)
    m.initShieldAttack(player)
    m.initSwordAttack(player)
    
    let mobs = []
    
    for (let i = 0; i < 100; i++) {
        spawn()
    }
    
    
    
    draw()
    
    await ui.showChoices({
        title:    "Hello life !",
        content:  "Un jeu de Denis Tibuleac",
        choices: [
            "Jouer"
        ]
    })
    
    
    
    
    function spawn () {
        
        let data = random.pick(mobData)
        
        let coords = {
            x: random.between(-30, 30),
            y: random.between(-25, 25)
        }
        
        let d = geo.distance(player, coords)
        
        if (d > 5) {
            
            let mob = {
                sprites: data.sprites, //random.pick(mobIconImages),
                xpSprite: xpSprite,
                xp:      random.intBetween(2, 5),
                name:    "mob",
                maxLife: data.life,
                life:    data.life,
                degat:   data.degat,
                speed:   0.02, //random.between(0.05, 0.02),
                x: coords.x,
                y: coords.y,
                animationStartIndex: random.between(0, 2),
                animationSpeed:      random.between(2, 4)
            }
        
            mobs.push(mob)
        }
        
    }
    
    
    
    
    
    function draw () {
        
        screen.clear()
        screen.addImage({
            image:  map,
            width:  100,
            center: {x: 0, y: 0},
            smoothing: false
        })
        screen.setCamera({
            center: player,
            zoom: 10,
            delay:  0 //500
        })
        
        
        screen.addGrid({
            color: "grey",
            step:  1
        })
        
        if (player.shieldEnabled) {
            screen.addCircle({
                center: player,
                radius: 5,
                strokeColor: "teal",
                lineWidth: 1
            })
        }
        
        m.displayPlayer(player)
        
        displayAlerteAttaque()
        
        
        mobs.forEach(m.drawMob)
    }
    
    /* screen.when("e pressed", tryToEnableShield)
    
    function tryToEnableShield () {
        if (!player.shieldForbidden) {
            player.shieldForbidden = true
            player.shieldEnabled = true
            setTimeout(removeShield, 1000)
            setTimeout(allowShield, 2000)
        }
    }
    */
    
    
    
    function displayAlerteAttaque () {
        
        if (player.hasSomeCloseMonster) {
            screen.addIcon({
                name: "exclamation",
                center: {
                    x: player.x,
                    y: player.y + -6
                },
                size:  1,
                color: "red"
            })
        }
        
    }
    
    
    
    /* attaque () {
        player.life = player.life+1
    
    }
    */
    
    
    
    
    /*
    
    
    normal: [frame0, frame1],
    attack: [frame0, frame1, frame2]
    
    attack index 3  currentTime()
    
    
    
    
    
    */
    
    
    
    
    
    function moveMob (mob) {
        
    
        let d = geo.distance(player, mob)
        
        if (mob.life <= 0) {
            if (d <= 1 && mob.xp > 0) {
                player.degat = player.degat + player.xp 
                log({degat: player.degat, xp: player.xp})
                player.xp += mob.xp
                mob.xp = 0
            }
            
            return  //random.pick(mobIconImages),
        }
        
        
        if (
            player.swordAttack &&
            player.direction === "back"
        ) {
            let dist = geo.distance({
                x: player.x,
                y: player.y + 1
            }, mob)
            
            if (dist < 7) {
                mob.life -= player.degat
                log('test pas une merde')
            }
        }
        
    
    
        if (player.shieldEnabled && d < 7) {
            mob.life -= player.degat
        }
     
        
        if (d < 2) {
            player.life -= mob.degat
            mob.life = 0
        }
        
        if (player.life <= 0) {
            lose()
            return 
        }
        
        
        
        
        if (d < 2) {
            player.hasSomeCloseMonster = true
        }
    
        if (d < 8) {
        
            if (player.x > mob.x) {
                mob.x += mob.speed
            } else {
                mob.x -= mob.speed
            }
            
            
            if (player.y > mob.y) {
                mob.y += mob.speed
            } else {
                mob.y -= mob.speed
            }
            
            
            /*
            
            if (player.x > mob.x) {
                mob.x += mob.speed
            } else if (player.x < mob.x) {
                mob.x -= mob.speed
            } else if (player.y > mob.y) {
                mob.y += mob.speed
            } else {
                mob.y -= mob.speed
            }
            
            */
            
        } else {
            m.moveMob(mob)
        }
    }
    
    async function lose () {
        screen.addRectangle({
            center: {
                x: player.x,
                y: player.y
            },
            width:  4,
            height: 2,
            color:  "orange"
        })
    }
    
    
    function update () {
        
        m.movePlayer(player, knightSprites )
        
        /*for (let i = 0; i < mobs.length; i += 1) {
            m.moveMob(mobs[i])
        }*/
        
        player.hasSomeCloseMonster = false
        mobs.forEach(moveMob)
        //attaque()
        draw()
    }
    
    
    onEveryFrame(update)

})






//----------------------------------------- MODULES


discoveryDefine("/modules/culture_code_txt", function () {
    return `https://www.spriters-resource.com/saturn/dragonforce/sheet/34257/

https://www.spriters-resource.com/pc_computer/wizorb/sheet/228499/

https://www.spriters-resource.com/fullview/114581/

https://www.spriters-resource.com/pc_computer/wizorb/sheet/228500/

https://www.spriters-resource.com/pc_computer/wizorb/sheet/228503/

variables
functions (avec paramètres)
listes, objets(comment on stocke / modifie / supprime / lit)

=> comment organiser son code


Javascript : 
- modifier le comportement d'une page web, avec JQuery
- modifier le comportement d'une page web avec autre chose 
- coder un serveur (comme ton Php)
- faire un jeu
- ...


// Ruby
// Ruby on Rails (web avec ruby)

// Django (web avec python)

// Framework : Symfony (php)

// JavaScript (React)


`
})



discoveryDefine("/modules/move", function (scope) {
    eval(loadDiscoveryApi)

        
    function move (item, speed) {
        if ("ArrowLeft" in pressedKeys) {
            item.x -= speed
        }
        
        if ("ArrowRight" in pressedKeys) {
            item.x += speed
        }
        
        if ("ArrowUp" in pressedKeys) {
            item.y += speed
        }
        
        if ("ArrowDown" in pressedKeys) {
            item.y -= speed
        }
        
    }
    
    
    /*
    function movemob (mob) {
        
        let direction = random.intBetween(0, 3)
        
        switch (direction) {
        case 0:
        mob.x -= speed;
        break;
        case 1:
        mob.x += speed;
        break;
        case 2:
        mob.y -= speed;
        break;
        case 3:
        mob.y += speed;
        break;
        }
    }
    
    setInterval(movemob, 10)
    movemob()
    movemob()
    movemob()
    movemob()
    */

    if (typeof move !== "undefined") {
        return move
    }
})



discoveryDefine("/modules/moveMob", function (scope) {
    eval(loadDiscoveryApi)

        let player
    
     function moveMob (mob) {
        
        mob.x += mob.speed * random.between(-1, 1)
        mob.y += mob.speed * random.between(-1, 1)
       
    /*
    function moveMob (mob) {
    
    if ( player > mob.x) {
        mob.x += mob.speed * random.between(1, 1)
    }
    if (player.x < mob.x) {
        mob.x += mob.speed * random.between(-1,-1)
    }
    if (player.y > mob.y) {
        mob.y += mob.speed * random.between(1, 1)
    }
    else{
        mob.y += mob.speed * random.between(-1, -1)
    }
    
    */
    
        /*
        mob.orientation += random.between(-orientationRandomness, orientationRandomness)
        speed = sheepPeaceSpeed
        
        
        mob.x += mob.orientation.x
        mob.y += mob.orientation.y
        */
        
        
        
        /*let direction = random.pick("up", "left", "right", "down")
    
        if (direction === "up") {
            mob.y += mob.speed
        }
        
        if (direction === "left") {
            mob.x -= mob.speed
        }
        
        if (direction === "right") {
            mob.x += mob.speed
        }
        
        if (direction === "down") {
            mob.y -= mob.speed
        }*/
        
    }
    

    if (typeof moveMob !== "undefined") {
        return moveMob
    }
})



discoveryDefine("/modules/drawMob", function (scope) {
    eval(loadDiscoveryApi)

        
    function drawMob (mob) {
        
        if (mob.life <= 0) {    
            //let idexXP = currentTime()
            if (mob.xp === 0) {
                return
            }
            screen.addImage({
                image:  mob.xpSprite, //() => mob.XP.goTo(index),
                center: mob,
                width: 1,
                smoothing: false
            })
            
            return
        }
        
        let index = 1 - mob.speed + mob.animationStartIndex + mob.animationSpeed  * currentTime()
        
        screen.addImage({
            image:  () => mob.sprites.goTo(index),
            center: mob,
            width: 6,
            smoothing: false
        })
      
        screen.addRectangle({
            bottomLeft: {
                x: mob.x - 0.5,
                y: mob.y + 2
            },
            width:  mob.life / mob.maxLife,
            height: 0.2,
            color:  "pink"
        })
    }
    
    

    if (typeof drawMob !== "undefined") {
        return drawMob
    }
})



discoveryDefine("/modules/movePlayer", function (scope) {
    eval(loadDiscoveryApi)

        
    
    
    function movePlayer (player, spritesCollection) {
        
        let speed = 0.2
        
        if ("ArrowUp" in pressedKeys) {
            player.y += speed
            player.direction = "back"
        }
        
        
        if ("ArrowDown" in pressedKeys) {
            player.y -= speed
            player.direction = "front"
        }
    
        
        /*
        if ("ArrowDown" in pressedKeys) {
            player.y -= speed
            spritesCollection.switchTo("front")
        }
        */
        if ("ArrowLeft" in pressedKeys) {
            player.x -= speed
            player.direction = "left"
        }
        
        if ("ArrowRight" in pressedKeys) {
            player.x += speed
            player.direction = "right"
        }
        
        if (player.swordAttack) {
            spritesCollection.switchTo(player.direction + "Fight")
        } else {
            spritesCollection.switchTo(player.direction)
        }
        
        if (player.x < -37) {
            player.x = -37
        }
        if (player.y > 26) {
            player.y = 26
        }
        if (player.x > 37) {
            player.x = 37
        }
        if (player.y < -26) {
            player.y = -26
        }
    }
    
    

    if (typeof movePlayer !== "undefined") {
        return movePlayer
    }
})



discoveryDefine("/modules/displayPlayerLife", function (scope) {
    eval(loadDiscoveryApi)

        
    function displayPlayerLife (player) {
        screen.addRectangle({
            bottomLeft: {
                x: player.x - 0.5,
                y: player.y + 1.5
            },
            width:  player.life / 100,
            height: 0.2,
            color:  "red"
            
        })
        screen.addText({
            text: player.xp,
            center: {
                x: player.x,
                y: player.y + 2
            },
            font: "1u Nasalization",
            color: "yellow"
        })
    }
    
    

    if (typeof displayPlayerLife !== "undefined") {
        return displayPlayerLife
    }
})



discoveryDefine("/modules/initPlayerMoves", function (scope) {
    eval(loadDiscoveryApi)

        
    async function initPlayerMoves () {
        
        let player = await fetchImageSource(
            urlFor("knight_sprites-LhRfP3bE.png")
        )
        
        let playerMoves = createSpriteCollection({
            image: player,
            width:  70,
            height: 110
        })
        
        
        
        playerMoves.add({
            name: 'back',
            index:  7,
            frames: 7
        })
        
        playerMoves.add({
            name: 'backFight',
            index:  0,
            frames: 7
        })
        
        
        playerMoves.add({
            name: 'front',
            index:  21,
            frames: 7
        })
        
        playerMoves.add({
            name: 'frontFight',
            index:  14,
            frames: 7
        })
        
        playerMoves.add({
            name: 'left',
            index:  35,
            frames: 7
        })
        playerMoves.add({
            name: 'leftFight',
            index:  28,
            frames: 7
        })
        
        playerMoves.add({
            name: 'right',
            index:  49,
            frames: 7
        })
        playerMoves.add({
            name: 'rightFight',
            index:  42,
            frames: 7
        })
        
        return playerMoves
        
    }
    

    if (typeof initPlayerMoves !== "undefined") {
        return initPlayerMoves
    }
})



discoveryDefine("/modules/initSwordAttack", function (scope) {
    eval(loadDiscoveryApi)

        
    function initSwordAttack (player) {
        
        player.swordAttack = false 
        player.swordAttackForbidden = false
        
        function stopAttack () {
            player.swordAttack = false
        }
        
        function allowAttack () {
            player.swordAttackForbidden = false
        }
        
        screen.when("a pressed", tryToEnableAttack)
        
        function tryToEnableAttack () {
            if (!player.swordAttackForbidden) {
                player.swordAttack = true
                player.swordAttackForbidden = true
                setTimeout(stopAttack,  1000)
                setTimeout(allowAttack, 6000)
            }
        }
        
        
        
    }
    

    if (typeof initSwordAttack !== "undefined") {
        return initSwordAttack
    }
})



discoveryDefine("/modules/displayPlayer", function (scope) {
    eval(loadDiscoveryApi)

        
    function displayPlayer (player) {
        let index = currentTime() * 10
        screen.addImage({
            image:  () => player.sprites.goTo(index),
            width:  2,
            center: player,
            smoothing: false
        })
        
        m.displayPlayerLife(player)
    }
    

    if (typeof displayPlayer !== "undefined") {
        return displayPlayer
    }
})



discoveryDefine("/modules/initShieldAttack", function (scope) {
    eval(loadDiscoveryApi)

        
    function initShieldAttack (player) {
        
        
        player.shieldForbidden = false
        player.shieldEnabled   = false
        
        screen.when("e pressed", tryToEnableShield)
        
        function tryToEnableShield () {
            if (!player.shieldForbidden) {
                player.shieldForbidden = true
                player.shieldEnabled   = true
                setTimeout(removeShield, 1000)
                setTimeout(allowShield, 2000)
            }
        }
        
        function removeShield () {
            player.shieldEnabled = false
        }
        
        function allowShield () {
            player.shieldForbidden = false
        }
        
    }
    

    if (typeof initShieldAttack !== "undefined") {
        return initShieldAttack
    }
})



discoveryDefine("/modules/firstplayerattack", function (scope) {
    eval(loadDiscoveryApi)

        
    function firstplayerattack (player) {
        if (player.xp === 15 ) {
            
        }
        
    }
    

    if (typeof firstplayerattack !== "undefined") {
        return firstplayerattack
    }
})



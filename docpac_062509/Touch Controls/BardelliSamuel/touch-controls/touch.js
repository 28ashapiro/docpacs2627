const swipe_distance = 10
const maxTap = 50
const width = 50
const height = 50

let touchArea = document.getElementById('touchArea')
let touchStatus = document.getElementById('touchStatus')
let player = document.getElementById('player')

let touchActive = false
let startX = 0
let startY = 0
let currentX = 0
let currentY = 0
let deltaX = 0
let deltaY = 0
let gestureType
let domDir

touchArea.addEventListener('touchstart', (event) => {
    if (event.touches[0]) {
        event.preventDefault()
        let touch = event.touches[0]
        startX = touch.clientX
        currentX = touch.clientX
        startY = touch.clientY
        currentY = touch.clientY
        touchActive = true
        touchStatus.textContent = 'Touch started'

        console.log('Viewport coords:', startX, startY)

        //console.log(`Event: touchStart,     Page X: ${startX},      Page Y: ${startY},      Active touches: ${event.touches.length}`)

        /*let areaRect = touchArea.getBoundingClientRect()
        let localX = touch.clientX - areaRect.left
        let localY = touch.clientY - areaRect.top

        let playerX = localX - width / 2
        let playerY = localY - height / 2

        playerX = Math.min(playerX, areaRect.width - width)
        playerY = Math.min(playerY, areaRect.height - height)

        playerX = Math.max(playerX, 0)
        playerY = Math.max(playerY, 0)

        player.style.left = String(playerX) + 'px'
        player.style.top = String(playerY) + 'px'*/
        //console.log(`Viewport X: ${touch.clientX},   Viewport Y: ${touch.clientY},   Local X: ${localX},     Local Y: ${localY}`)
    }
})

touchArea.addEventListener('touchmove', (event) => {
    if (event.touches.length) {
        event.preventDefault()
        let touch = event.touches[0]
        let areaRect = touchArea.getBoundingClientRect()
        let currentX = touch.clientX - areaRect.left
        let currentY = touch.clientY - areaRect.top

        deltaX = currentX - startX
        deltaY = currentY - startY

        touchStatus.textContent = `Starting X: ${startX} Y: ${startY},      Current X: ${currentX} Y: ${currentY},      Delta X: ${deltaX} Y: ${deltaY}`

        var totalDistance = Math.hypot(deltaX, deltaY)
        domDir

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                domDir = 'r'
            }
            else {
                domDir = 'l'
            }
        }
        else {
            if (deltaY > 0) {
                domDir = 'd'
            }
            else {
                domDir = 'u'
            }
        }

        let localX = touch.clientX - areaRect.left
        let localY = touch.clientY - areaRect.top

        let playerX = localX - width / 2
        let playerY = localY - height / 2

        playerX = Math.min(playerX, areaRect.width - width)
        playerY = Math.min(playerY, areaRect.height - height)

        playerX = Math.max(playerX, 0)
        playerY = Math.max(playerY, 0)

        player.style.left = String(playerX) + 'px'
        player.style.top = String(playerY) + 'px'
        console.log(totalDistance, domDir)
    }
})

touchArea.addEventListener('touchend', (event) => {
    if (touchActive) {
        let touch = event.changedTouches[0]
        let areaRect = touchArea.getBoundingClientRect()
        let currentX = touch.clientX - areaRect.left
        let currentY = touch.clientY - areaRect.top

        console.log('local coords: ', currentX, currentY)

        deltaX = currentX - startX
        deltaY = currentY - startY
        totalDistance = Math.hypot(deltaX, deltaY)

        if (totalDistance < maxTap) {
            gestureType = 'tap'
            let playerX = currentX - width / 2
            let playerY = currentY - height / 2

            playerX = Math.min(playerX, areaRect.width - width)
            playerY = Math.min(playerY, areaRect.height - height)

            playerX = Math.max(playerX, 0)
            playerY = Math.max(playerY, 0)

            player.style.left = String(playerX) + 'px'
            player.style.top = String(playerY) + 'px'
        }
        else {
            gestureType = 'swipe'
            console.log(domDir)

            let playerRect = player.getBoundingClientRect()

            let playerX = playerRect.left
            let playerY = playerRect.top

            console.log(playerX, playerY)
            if (domDir == 'r') {
                playerX += 150
            }
            else if (domDir == 'l') {
                playerX -= 150
            }
            else if (domDir == 'u') {
                playerY -= 150
            }
            else if (domDir == 'd') {
                playerY += 150
            }


            playerX = Math.min(playerX, areaRect.width - width)
            playerY = Math.min(playerY, areaRect.height - height)

            playerX = Math.max(playerX, 0)
            playerY = Math.max(playerY, 0)

            player.style.left = String(playerX) + 'px'
            player.style.top = String(playerY) + 'px'
        }
        console.log(gestureType)
        touchStatus.textContent = gestureType
    }
})

touchArea.addEventListener('touchcancel', (event) => {
    touchActive = false
    touchStatus.textContent = 'touch canceled'
    gestureType = 'none'
})
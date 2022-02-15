function readyMaps () {
    maps = []
    maps.push(tilemap`レベル1`)
    maps.push(tilemap`レベル3`)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    treasure += 1
    music.baDing.play()
    info.changeScoreBy(1)
    mySprite.sayText("やったー", 1000, true)
    tiles.setTileAt(tiles.getTileLocation(location.column, location.row), sprites.castle.tileGrass1)
    if (treasure == max_treasure) {
        music.magicWand.play()
        for (let wall_location of tiles.getTilesByType(sprites.dungeon.floorLight0)) {
            tiles.setWallAt(wall_location, false)
            tiles.setTileAt(wall_location, assets.tile`broken_wall`)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    stage += 1
    music.thump.playUntilDone()
    game.splash("ステージクリア")
    if (stage == maps.length) {
        game.over(true)
    } else {
        makeStage(stage)
    }
})
function makeStage (stage: number) {
    treasure = 0
    max_treasure = 0
    tiles.setCurrentTilemap(maps[stage])
    for (let wall_location of tiles.getTilesByType(sprites.dungeon.chestClosed)) {
        max_treasure += 1
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let max_treasure = 0
let treasure = 0
let maps: tiles.TileMapData[] = []
let mySprite: Sprite = null
let stage = 0
scene.setBackgroundColor(7)
info.setScore(0)
stage = 0
readyMaps()
makeStage(0)
game.splash("Get Crystal")
game.showLongText("敵に捕まらないように", DialogLayout.Top)
game.showLongText("クリスタルを取ってね", DialogLayout.Top)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let mySprite2 = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Enemy)
mySprite2.setPosition(20, 20)
mySprite2.follow(mySprite, 10)
scene.cameraFollowSprite(mySprite)

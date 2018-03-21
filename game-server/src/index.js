const uuid = require("uuid/v4")

const ioOptions = {
  pingTimeout: 3000,
  pingInterval: 1000
}

const io = require("socket.io")(3000, ioOptions)
const MongoClient = require("mongodb").MongoClient

const MONGODB_URI = `${process.env.MONGODB_URI}:27017`
const DATABASE_NAME = "EPPSA_KSM"

let database

MongoClient.connect(MONGODB_URI).then((client) => {
  console.log("Connected to mongodb")
  database = client.db(DATABASE_NAME)

  io.on("connect", socket => {
    console.log(`${new Date()} client ${socket.id} connected.`)

    socket.on("disconnecting", reason => {
      console.log(`${new Date()} client ${socket.id} disconnected because ${reason}.`)
    })

    socket.on("pingo", toSocket => {
      console.log(`${new Date()} got ping. sending pong.`)
      toSocket("pong")
    })

    let gameInfo = null

    socket.on("newGame", async (name, avatar, toSocket) => {
      console.log(`client ${socket.id} started a new Game with name: ${name} and avatar: ${avatar}`)

      if (!gameInfo) {
        gameInfo = {
          gameId: uuid(),
          name,
          avatar,
          challenge: 1,
          score: 0,
          startTime: new Date()
        }

        await database.collection("games").insertOne(gameInfo)
        toSocket(gameInfo)
      } else {
        toSocket(new Error("gameInfo already exists!"))
      }
    })

    socket.on("resumeGame", async (gameId, toSocket) => {
      gameInfo = await database.collection("games").find({ gameId }).limit(1).next()
      if (!gameInfo) {
        console.log(`Error: Could not find gameInfo for gameId: ${gameId}`)
      }

      toSocket(gameInfo)
    })

    socket.on("getGameInfo", async (gameId, toSocket) => {
      toSocket(await database.collection("games").find({ gameId }).limit(1).next())
    })

    socket.on("startChallenge", () => {
      if (gameInfo) {
        const startTime = new Date()
        const collection = `challenge-${gameInfo.challenge}`
        database.collection(collection).insertOne({ gameId: gameInfo.gameId, startTime })
        console.log("startChallenge " + collection)
      }
    })

    socket.on("completeChallenge", async (result, toSocket) => {
      if (gameInfo) {
        const collection = `challenge-${gameInfo.challenge}`
        const filter = await database.collection(collection)
          .find({ gameId: gameInfo.gameId })
          .sort({ startTime: -1 })
          .limit(1).next()
          console.log("completeChallenge with " + JSON.stringify(result) + "  " + JSON.stringify(filter))

        const challenge = { endTime: new Date(), ...result }
        database.collection(collection).updateOne(filter, { $set: challenge })

        gameInfo.score += result.score
        gameInfo.challenge++

        updateGameInfo(gameInfo)
        toSocket(gameInfo)
      }
    })
  })

  function updateGameInfo(gameInfo) {
    return database.collection("games").updateOne({ gameId: gameInfo.gameId }, { $set: gameInfo })
  }
}).catch((error) => console.error(error))

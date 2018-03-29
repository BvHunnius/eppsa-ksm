const uuid = require("uuid/v4")

module.exports = class Client {
  constructor(socket, mongoDB, log) {
    this.socket = socket
    this.mongoDB = mongoDB
    this.log = log
    this.currentGame = null

    this.log.info({ socketId: this.socket.id }, "Client connected")
  }

  subscribe() {
    this.socket.on("findGame", this.findGame.bind(this))
    this.socket.on("findConnectedGames", this.findConnectedGames.bind(this))
    this.socket.on("newGame", this.newGame.bind(this))
    this.socket.on("resumeGame", this.resumeGame.bind(this))
    this.socket.on("startChallenge", this.startChallenge.bind(this))
    this.socket.on("finishChallenge", this.finishChallenge.bind(this))
    this.socket.on("disconnect", this.disconnect.bind(this))
    this.socket.conn.on("packet", this.onPacket.bind(this))
  }

  async findGame(gameId, toSocket) {
    toSocket(await this.mongoDB.findGame(gameId))
  }

  async findConnectedGames(toSocket) {
    toSocket(await this.mongoDB.findConnectedGames())
  }

  async newGame(name, avatar, maxChallenges, toSocket) {
    if (this.currentGame) {
      this.currentGame.connected = false
      this.mongoDB.updateGame(this.currentGame)
    }

    this.currentGame = {
      gameId: uuid(),
      finished: false,
      name,
      avatar,
      score: 0,
      challengeNumber: 1,
      maxChallenges,
      disconnects: 0,
      connected: true,
      lastUpdate: new Date(),
      startTime: new Date()
    }

    this.log.info({
      socketId: this.socket.id,
      playerName: name,
      avatar,
      maxChallenges,
      gameId: this.currentGame.gameId
    }, "Starting a new game")

    this.mongoDB.newGame(this.currentGame)
    toSocket(this.currentGame)
  }

  async resumeGame(gameId, maxChallenges, toSocket) {
    this.log.info({ socketId: this.socket.id, gameId, maxChallenges }, "Resuming game")

    this.currentGame = await this.mongoDB.findGame(gameId)
    if (this.currentGame) {
      this.currentGame.maxChallenges = maxChallenges
      this.handleGameFinished(this.currentGame)

      this.currentGame.connected = true
      this.mongoDB.updateGame(this.currentGame)
    } else {
      this.log.error({ socketId: this.socket.id, gameId }, "Could not find game in database")
    }

    toSocket(this.currentGame)
  }

  async startChallenge() {
    if (this.currentGame) {
      this.log.info({ socketId: this.socket.id, gameId: this.currentGame.gameId },
        "Starting challenge")

      const challenge = { gameId: this.currentGame.gameId, startTime: new Date() }
      this.mongoDB.startChallenge(this.currentGame.challengeNumber, challenge)
    } else {
      this.log.error({ socketId: this.socket.id }, "Could not start challenge without current game")
    }
  }

  async finishChallenge(result, toSocket) {
    if (this.currentGame) {
      this.log.info({ socketId: this.socket.id, gameId: this.currentGame.gameId },
        "Finishing challenge")

      const challenge = { gameId: this.currentGame.gameId, finishTime: new Date(), ...result }
      this.mongoDB.finishChallenge(this.currentGame.challengeNumber, challenge)

      this.currentGame.score += result.score
      this.currentGame.challengeNumber++
      handleGameFinished(this.currentGame)

      this.mongoDB.updateGame(this.currentGame)
    } else {
      this.log.error({ socketId: this.socket.id },
        "Could not finish challenge without current game")
    }

    toSocket(this.currentGame)
  }

  disconnect() {
    if (this.currentGame) {
      this.log.info({ socketId: this.socket.id, gameId: this.currentGame.gameId },
        "Client disconnected with currentGame")

      this.currentGame.connected = false
      this.currentGame.disconnects++
      this.mongoDB.updateGame(this.currentGame)
    } else {
      this.log.info({ socketId: this.socket.id }, "Client disconnected")
    }
  }

  onPacket() {
    if (this.currentGame) {
      this.currentGame.lastUpdate = new Date()
      this.mongoDB.updateGame(this.currentGame, false)
    }
  }

  handleGameFinished(game) {
    if (!game.finished && game.challengeNumber > game.maxChallenges) {
      game.finished = true
      game.finishTime = new Date()
      this.log.info({ socketId: this.socket.id, gameId: game.gameId }, "Game finished")
    }
  }
}

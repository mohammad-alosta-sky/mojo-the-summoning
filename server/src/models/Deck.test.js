const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const Deck  = require('./Deck')
const {db} = require('../db/config')

// define in global scope
let deck;

// clear db and create new Deck before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({
    name: 'golden deck',
    xp:1000,
    })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id')
  })


  it("has a name", () => {
    expect(deck).toHaveProperty("name")
  })

  it("has mojo property", () => {
    expect(deck).toHaveProperty("xp");
  })


  it("name has the correct value", () => {
    expect(deck.name).toBe("golden deck");
  })

  it("mojo has the correct value", () => {
    expect(deck.xp).toBe(1000);
  })


  //TODO:add dataTypes test cases
})

const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const Attack  = require('./Attack')
const {db} = require('../db/config')

// define in global scope
let attack;

// clear db and create new Attack before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({
    title: 'Iron kick',
    mojoCost:10,
    staminaCost: 150
    })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id')
  })


  it("has a title", () => {
    expect(attack).toHaveProperty("title")
  })

  it("has mojoCost property", () => {
    expect(attack).toHaveProperty("mojoCost");
  })

  it("has staminaCost property", () => {
    expect(attack).toHaveProperty("staminaCost");
  })

  it("title has the correct value", () => {
    expect(attack.title).toBe("Iron kick");
  })

  it("mojoCost has the correct value", () => {
    expect(attack.mojoCost).toBe(10);
  })

  it("staminaCost has the correct value", () => {
    expect(attack.staminaCost).toBe(150);
  })


  //TODO:add dataTypes test cases
})


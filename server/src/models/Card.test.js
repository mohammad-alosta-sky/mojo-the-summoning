const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const Card  = require('./Card')
const {db} = require('../db/config')

// define in global scope
let card;

// clear db and create new card before tests
beforeAll(async () => {
  await db.sync({ force: true })
  card = await Card.create({
    name: 'gandalf',
    mojo:50,
    stamina:500,
    imgUrl:"http://www.mojocards.com/gandalfimg.jpg"
    })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id')
  })


  it("has a name", () => {
    expect(card).toHaveProperty("name")
  })

  it("has mojo property", () => {
    expect(card).toHaveProperty("mojo");
  })

  it("has stamina property", () => {
    expect(card).toHaveProperty("stamina");
  })

  it("has imgUrl property", () => {
    expect(card).toHaveProperty("imgUrl");
  })

  it("name has the correct value", () => {
    expect(card.name).toBe("gandalf");
  })

  it("mojo has the correct value", () => {
    expect(card.mojo).toBe(50);
  })

  it("stamina has the correct value", () => {
    expect(card.stamina).toBe(500);
  })

  it("imgUrl has the correct value", () => {
    expect(card.imgUrl).toBe("http://www.mojocards.com/gandalfimg.jpg");
  })


  //TODO:add dataTypes test cases
})

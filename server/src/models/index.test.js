const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const {User, Deck, Card, Attack}  = require('.')
const {db} = require('../db/config')

let user;
let deck;
let card;
let attack;

beforeAll(async () => {
    await db.sync({ force: true })
  })
  
  // clear db after tests
afterAll(async () => await db.sync({ force: true }))


describe("User", () => {
    it("user can add a deck and has the correct values", async () => {
        user = await User.create({username: "Gandalf"});
        await user.createDeck({
            name: "Golden deck",
            xp: 1000
        });
        deck = await Deck.findByPk(1);
        const result = await user.getDeck();
        expect(result.name).toBe("Golden deck");
        expect(deck.name).toBe("Golden deck");
        expect(deck.xp).toBe(1000);
    })
});

describe("Deck", () => {
    it("a new card can be added to the deck", async () => {
        deck = await Deck.create({
            name: "Golden deck",
            xp: 1500
        })
        await deck.createCard({
            name: "Wizard",
            mojo: 100,
            stamina: 10,
            imgUrl: "wizardImg"
        })
        const cardToTest = await deck.getCards()

        expect(cardToTest[0].name).toBe("Wizard")
        expect(cardToTest[0].mojo).toBe(100);
        expect(cardToTest[0].stamina).toBe(10);
        expect(cardToTest[0].imgUrl).toBe("wizardImg");
    })

    it("add many cards to the deck", async () => {
        deck = await Deck.create({
            name: "Golden deck",
            xp: 1500
        })

        await deck.createCard({
            name: "Wizard",
            mojo: 100,
            stamina: 10,
            imgUrl: "wizardImg"
        })
        await deck.createCard({
            name: "Warrior",
            mojo: 100,
            stamina: 10,
            imgUrl: "warriorImg"
        })

        await deck.createCard({
        
            name: "Dragon",
            mojo: 100,
            stamina: 10,
            imgUrl: "dragonImg"
        })

        expect(await deck.countCards()).toBe(3)
    })

});

describe("Cards and Attacks", () => {
    it("add attacks to a card", async () => {
        card = await Card.create({
            name: "Dragon",
            mojo: 100,
            stamina: 10,
            imgUrl: "dragonImg"
        })
        await card.createAttack({
            title: "magic wind",
            mojoCost: 2,
            staminaCost: 1
        })
        // const attack1 = await Attack.create()

        const attack2 = await Attack.create({
            title: "Iron kick",
            mojoCost: 2,
            staminaCost: 1
        })

        const attack3 = await Attack.create({
            title: "Silver sword",
            mojoCost: 2,
            staminaCost: 1
        })
        await card.addAttacks([attack2, attack3])
        // await attack1.addCard(card.id)
        // await attack2.addCard(card.id)
        // await attack3.addCard(card.id)

        expect(await card.countAttacks()).toBe(3)
    })

    it("add cards to an attack", async () => {
        const card1 = await Card.create({
            name: "Dragon",
            mojo: 100,
            stamina: 10,
            imgUrl: "dragonImg"
        })
        const card2 = await Card.create({
            name: "Wizard",
            mojo: 100,
            stamina: 10,
            imgUrl: "wizardImg"
        })

        const card3 = await Card.create({
            name: "Warrior",
            mojo: 100,
            stamina: 10,
            imgUrl: "warriorImg"
        })

        attack = await Attack.create({
            title: "Silver sword",
            mojoCost: 2,
            staminaCost: 1
        })

        await attack.addCards([card1, card2, card3])      

        expect(await attack.countCards()).toBe(3)
    })

})

describe("Eager loading", () =>{
    it("A user can be loaded with it's deck", async () => {
        user = await User.create({username: "gandalf"})
        await user.createDeck({
            name: "Golden deck",
            xp: 1500
        })
        const addedUsed = await User.findByPk(1, {include: Deck})
        expect(addedUsed.deck.name).toEqual("Golden deck")
    })
})
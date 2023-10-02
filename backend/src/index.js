const express = require("express")
const app = express()
const { fakerPT_BR } = require('@faker-js/faker')
const { Sequelize, DataTypes } = require("sequelize")
const { v4: uuidv4 } = require('uuid')

try {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD, {
        host: process.env.DB_HOST,
        dialect: "mysql"
    })

    const People = sequelize.define("People", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    
    sequelize.sync()
        .then(() => {
            return People.create({ id: uuidv4(), name: fakerPT_BR.person.fullName() })
        })

    app.get('/', async(_req, _res) => {
        try {
            const people = await People.findAll()
            _res.json(people);
        } catch (_error) {
            console.log("Ocorreu um erro: ", _error)
            _res.status(500).json({ error: "Ocorreu um erro ao buscar as pessoas" })
        }
    })

    app.listen(process.env.APP_PORT, () => {
        console.log("server initialize")
    })
} catch (_err) {
    console.log(_err)
}

// console.log(process.env.APP_PORT)
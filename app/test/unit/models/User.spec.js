const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
  } = require('sequelize-test-helpers')

  const UserModel = require('../../../models/user')

  describe('src/models/User', () => {
    const Model = UserModel(sequelize, dataTypes)
    const instance = new Model()
    checkModelName(Model)('user')
    context('properties', () => {
      ;['id','name', 'email', 'password'].forEach(checkPropertyExists(instance))
    })
  })
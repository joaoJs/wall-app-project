const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
  } = require('sequelize-test-helpers')

  const MessageModel = require('../../../models/message')

  describe('src/models/Message', () => {
    const Model = MessageModel(sequelize, dataTypes)
    const instance = new Model()
    checkModelName(Model)('message')
    context('properties', () => {
      ;['id','content', 'userId'].forEach(checkPropertyExists(instance))
    })
  })
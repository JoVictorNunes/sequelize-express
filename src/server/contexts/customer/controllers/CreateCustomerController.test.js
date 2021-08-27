/**
 * @jest-environment ./test-environment
 */

const request = require('supertest')
const app = require('../../../app')

describe('Create Customer Tests', () => {

  test('should create a new customer[nome, cpf]', async () => {
    const res = await request(app).post('/customer').send({
      customer: {
        nome: 'João Victor',
        cpf: '178.292.317-96'
      }
    })

    expect(res.status).toBe(201)
    expect(res.headers).toHaveProperty('location')
  })

  test('should create a new customer[nome, cpf, telefones[tipo, numero]]', async () => {
    const res = await request(app).post('/customer').send({
      customer: {
        nome: 'Kassio',
        cpf: '111.111.111-11'
      },
      telefones: [{
        tipo: 'cel',
        numero: '28999999999'
      }]
    })

    expect(res.status).toBe(201)
    expect(res.headers).toHaveProperty('location')
  })

  test('should create a new customer[nome, cpf, telefones[tipo, numero], carros[fabricante, modelo, placa, ano_lancamento]]', async () => {
    const res = await request(app).post('/customer').send({
      customer: {
        nome: 'Raissa',
        cpf: '111.111.111-22'
      },
      telefones: [
        {
          tipo: 'cel',
          numero: '28999999999'
        }
      ],
      carros: [
        {
          fabricante: 'Ford',
          modelo: 'Focus',
          placa: 'HRT1178',
          ano_lancamento: '2010'
        }
      ]
    })

    expect(res.status).toBe(201)
    expect(res.headers).toHaveProperty('location')
  })
})
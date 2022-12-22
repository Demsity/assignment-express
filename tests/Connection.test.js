const bCrypt = require('bcrypt')

test('Can Encrpyt and Decrpyt a created password', async () => {
    const user = {name: 'test', email: 'test@test.test', password: 'test123' }
    const hashedPassword = await bCrypt.hash(user.password, 10)


    expect(hashedPassword).not.toStrictEqual(user.password)
    expect(await bCrypt.compare(user.password, hashedPassword)).toBe(true)
})
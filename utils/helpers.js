const bcrypt = require('bcrypt')


async function hashedPassword(password){
const salt = await bcrypt.genSalt()
return await bcrypt.hash(password,salt)
}

async function compare(raw,hashed){
return await bcrypt.compare(raw,hashed)
}

module.exports = {
    hashedPassword,
    compare
}
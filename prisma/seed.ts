// the seed script is run with the command `npx prisma db seed --preview-feature`
// contains the data to be seeded into the database 
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const now = new Date()
const formattedDate = now.toISOString();


async function main() {
const John = await prisma.user.upsert({
    where: { email:'johndoe@mail.com'},
    update: {},
    create: {
        first_name: 'John',
        last_name: 'Doe',
        email:'johndoe@mail.com',
        created_at: formattedDate, 
        updated_at: formattedDate,
        USERID: 1,
        userprofile: {
            create: {
                username: 'jdoe',
                email: 'johndoe@mail.com',
                phone_number: '+23488888',
                address: {
                    create:{
                        state: 'Lagos',
                        city: 'Eti-Osa',
                        street: 'Garnet close',
                    }
                }
            }
        }
    }
})
console.log(John);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

# User_profile
## Description 
- a user authentication system, api implementation of signup, signin, login and logout routes.
<p> **Languages and frameworks**
<ol>
<li> NodeJs </li>
<li> typescript </li>
<li> Express </li>
<li> postgreSQL </li>
<li> Prisma </li>
</ol>
</p>

<p> **Challenges** - for this project i had to learn how to protect REST API routes with JWT and refresh token.
> to ensure that all typescript files are moved to a seperated directory set 
> `"outDir" : "Directorypath" in the compiler options of tsconfig file
> uuid v4 is used to autogenerate the id 
> when working with prisma run the following commands
> after installing all the necessary dependencies for typescript
> `npx prisma`- to set up the project
> `npx prisma init` - creates a new directory called prisma and adds a file schema.prisma to it
> it also adds a .env file to the root of the project
> follow the outlined steps in the documentation to connect to the database
> `npx prisma db pull` - gets all models from the local instance of the database
> follow the documentation to set up migrations for the database schema to prisma
> to an already existing project that you made changes on the local daatabase
> `npx prisma migrate diff` - to check the differences between prisma schema and the database
> schema, it generates a new migration script in sql. changes can then be applied by running 
> `npx prisma migrate up`


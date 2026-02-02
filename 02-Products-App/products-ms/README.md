<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Instalación Prisma


1. Instalar Prisma
```
pnpm i prisma --save -dev
```
2. Inicializar configuración de Prisma
```
pnpm prisma init
```
3. Crear migración a base de datos
```
pnpm prisma migrate dev --name init
```
4. Instalar Prisma Client
```
pnpm install @prisma/client
```
5. Prisma Generate
```
pnpm prisma generate
```
6. Instalar prisma para __SQLITE__
```
pnpm install @prisma/adapter-better-sqlite3
```
7. Ver BD
```
pnpm run prisma:studio
```



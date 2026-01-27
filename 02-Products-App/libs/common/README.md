# @app/common

Librería compartida para los microservicios del proyecto Products App.

## Descripción

Esta librería contiene código compartido entre los diferentes microservicios, incluyendo DTOs, interfaces, constantes y utilidades comunes.

## Estructura

```
libs/common/
├── src/
│   ├── dtos/              # Data Transfer Objects compartidos
│   │   ├── pagination.dto.ts
│   │   └── index.ts
│   └── index.ts           # Exportaciones principales
├── dist/                  # Código compilado
├── package.json
└── tsconfig.json
```

## Contenido Actual

### DTOs

- **PaginationDto**: DTO para paginación con `limit` y `offset`

## Uso

### 1. Importar en otros microservicios

En el `package.json` del microservicio:

```json
{
  "dependencies": {
    "@app/common": "workspace:^"
  }
}
```

### 2. Usar en el código

```typescript
import { PaginationDto } from '@app/common';

@Get()
findAll(@Query() paginationDto: PaginationDto) {
  // paginationDto.limit (default: 10)
  // paginationDto.offset (default: 0)
}
```

## Desarrollo

### Compilar la librería

```bash
cd libs/common
pnpm run build
```

### Agregar nuevo contenido

1. Crear el archivo en `src/`
2. Exportarlo en el `index.ts` correspondiente
3. Exportarlo en `src/index.ts`
4. Compilar: `pnpm run build`

## Dependencias

- `class-validator`: Para validación de DTOs
- `class-transformer`: Para transformación de tipos


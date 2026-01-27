import 'dotenv/config';
import { Joi } from '@app/common'; 

interface EnvVars {
    PORT: number;
}

const envSchema = Joi.object<EnvVars>({
    PORT: Joi.number().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
}


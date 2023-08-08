import dotenv from 'dotenv';

dotenv.config();

export interface Environment{
    token: string
}

const loadEnvironment = () => {
    if(!process.env.TOKEN)
    {
        throw Error('Token is not set')
    }
    
    return {
        token: process.env.TOKEN
    };
}

const environment: Environment = loadEnvironment();

export default environment;

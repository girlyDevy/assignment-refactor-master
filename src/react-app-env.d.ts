/// <reference types="react-scripts" />
// type for .env variable
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_BACKEND_URL: string

    }
}


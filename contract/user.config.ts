import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

export const privateKey1 = process.env.PRIVATE_KEY_1 ?? '0d647a62d6c707605360eb066d2f6fc23fe5c005fa6c2f5590b609e503102320'
export const privateKey2 = process.env.PRIVATE_KEY_2 ?? '0d647a62d6c707605360eb066d2f6fc23fe5c005fa6c2f5590b609e503102320'

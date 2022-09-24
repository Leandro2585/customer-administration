import { contentType, cors } from '@main/middlewares'
import { Express, json } from 'express'

export default (app: Express): void => {
	app.use(json())
	app.use(cors)
	app.use(contentType)
}
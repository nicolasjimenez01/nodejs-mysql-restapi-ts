import  express from 'express';
import employeesRoutes from './routes/employees.routes'
import indexRoutes from './routes/index.routes'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',employeesRoutes)

app.use((_, res)=> {
  res.status(404).json({
    message: 'enpoint not found'
  })
})

export default app
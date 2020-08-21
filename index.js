const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const dfff = require('dialogflow-fulfillment')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.status(200).send('Server is working now.')
})


app.post('/', (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    })

    function demo(agent){
        agent.add("Sending response from Webhook server")
    }

    function cek_kebutuhan(agent){
        const umur = req.body.queryResult.parameters['umur_user']
        const status = agent.parameters.status_pernikahan.original

        agent.add("Umur kamu adalah " + umur + " dan status kamu adalah " + status + ".")
        console.log(`umur = ${umur} dan status = ${status}` )   
    }

    var intentMap = new Map()

    intentMap.set('webhookDemo', demo)
    intentMap.set('siklus.kebutuhan.info.cek', cek_kebutuhan)

    agent.handleRequest(intentMap)
})

app.listen(port, () => {
	console.log(`🌏 Server is running at http://localhost:${port}`)
})
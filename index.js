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
        const umur = req.body.queryResult.parameters["umur_user"]
        const status = agent.parameters.status_pernikahan
        var payloadCard = {
            "richContent": [
                {
                    "type": "accordion",
                    "title": "Accordion title",
                    "subtitle": "Accordion subtitle",
                    "image": {
                        "src": {
                            "rawUrl": "https://example.com/images/logo.png"
                        }
                    },
                    "text": "Accordion text"
                }
            ]
        }

        if (umur <= 21 && status == "single")
        agent.add("Kamu bisa mulai dari menabung dulu, baik di bank atau di celengan pribadi. Pastikan kamu mulai menabung, berapapun nominalnya.")
        agent.add("Selain itu, mulailah mencatat setiap pengeluaranmu, baik jajan gorengan di sekolah atau di kampus, agar kebiasaan mencatat bisa terbentuk.")
        agent.add("Kamu bisa pakai aplikasi seperti Money Lover atau Money Manager untuk memudahkan kamu.")
        agent.add(new dfff.Payload(agent.UNSPECIFIED, payloadCard), {sendAsMessage: true, rawPayload: true})
            
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
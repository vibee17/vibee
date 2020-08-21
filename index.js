const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const dfff = require('dialogflow-fulfillment')
const { BasicCard } = require('actions-on-google')

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

        if (umur <= 21 && status == "single"){
        agent.add("Untuk saat ini, kamu bisa mulai dari menabung dulu. Ga masalah berapapun nominalnya. Akan lebih baik juga apabila ditabung di bank, dibandingkan disimpan secara tunai. Selain lebih aman, kamu juga bisa menginvestasikannya nanti.")
        agent.add("Selain itu, mulailah mencatat setiap pengeluaranmu, seperti jajan gorengan, beli pulsa, dan lain-lain agar kebiasaan mencatat bisa terbentuk. Ini akan sangat berguna seiring kamu semakin pandai mengatur keuangan.")
        agent.add("Sambilan kamu juga bisa menambah pengetahuanmu mengenai rencana keuangan.")
        agent.add(new dfff.Card({
            title: 'hello1',
            text: 'test1',
            imageUrl: 'https://goo.gl/aeDtrS',
            buttonText: 'Details',
            buttonUrl: 'https://assistant.google.com/'
        
        }))
        agent.add(new dfff.Card({
            title: 'hello2',
            text: 'test2',
            imageUrl: 'https://goo.gl/aeDtrS',
            buttonText: 'Details',
            buttonUrl: 'https://assistant.google.com/'
        
        }))
        
        }    
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
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

        const lineMessage = {
            "altText": "Langkah-langkah perencanaan keuangan",
            "template": {
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "type": "carousel",
            "columns": [
                {
                    "imageBackgroundColor": "#FFFFFF",
                    "actions": [
                        {
                            "text": "Penjelasan evaluasi kondisi keuangan dong",
                            "type": "message",
                            "label": "Lebih lengkap"
                        }
                                ],
          "text": "Pertama, ketahui dulu posisi keuanganmu saat ini.",
          "thumbnailImageUrl": "https://i.ibb.co/9wjM0rM/Langkah-1.jpg",
          "title": "Evaluasi kondisi keuangan"
                },
                {
          "thumbnailImageUrl": "https://i.ibb.co/Y3gxL2T/Langkah-2.jpg",
          "actions": [
            {
              "text": "Penjelasan susun tujuan keuangan dong",
              "type": "message",
              "label": "Lebih lengkap"
            }
          ],
          "imageBackgroundColor": "#000000",
          "text": "Kedua, cari tahu apa tujuan yang ingin kamu capai.",
          "title": "Susun tujuan keuangan"
        },
        {
          "actions": [
            {
              "type": "message",
              "text": "Penjelasan susun rencana keuangan dong",
              "label": "Lebih lengkap"
            }
          ],
          "imageBackgroundColor": "#000000",
          "title": "Susun rencana keuangan",
          "text": "Ketiga, buat rencana untuk mencapai tujuan keuangan.",
          "thumbnailImageUrl": "https://i.ibb.co/cxnZkpz/Langkah-3.jpg"
        },
        {
          "text": "Keempat, realisasikan rencana yang sudah disusun.",
          "title": "Jalankan rencana keuangan",
          "actions": [
            {
              "type": "message",
              "text": "Penjelasan jalankan rencana keuangan dong",
              "label": "Lebih lengkap"
            }
          ],
          "imageBackgroundColor": "#000000",
          "thumbnailImageUrl": "https://i.ibb.co/7yQM7d4/Langkah-4-2.jpg"
        },
        {
          "title": "Review kembali rencana",
          "actions": [
            {
              "label": "Lebih lengkap",
              "type": "message",
              "text": "Penjelasan review kembali rencana keuangan dong"
            }
          ],
          "imageBackgroundColor": "#000000",
          "text": "Kelima, review kembali rencana setelah realisasi",
          "thumbnailImageUrl": "https://i.ibb.co/JxMwt3c/Langkah-5-2.jpg"
        }
      ]
    },
    "type": "template"
        
        }

        var payloadDB21S = new dfff.Payload('LINE', lineMessage, {
            sendAsMessage: true
        })

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
        agent.add(payloadDB21S)
        
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
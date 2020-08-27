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

    function rasio_likuiditas(agent){
        const status = agent.parameters.status_pernikahan
        const dana_tunai = agent.parameters.dana_tunai
        const pengeluaran = agent.parameters.pengeluaran

        const rasio_likuiditas = dana_tunai / pengeluaran
        const dana_darurat_single = pengeluaran * 4
        const dana_darurat_merid = pengeluaran  * 6
        const dana_darurat_merid_1_anak = pengeluaran * 9
        const dana_darurat_merid_2_anak = pengeluaran * 12
        
        const dana_darurat_single_bulat = dana_darurat_single.toLocaleString('id-ID')
        const dana_darurat_merid_bulat = dana_darurat_merid.toLocaleString('id-ID')
        const dana_darurat_merid_1_anak_bulat = dana_darurat_merid_1_anak.toLocaleString('id-ID')
        const dana_darurat_merid_2_anak_bulat = dana_darurat_merid_2_anak.toLocaleString('id-ID')
        const rasio_likuiditas_bulat = Math.round(rasio_likuiditas)

        if (status == "single" && rasio_likuiditas < 4){
          agent.add('Wah, kamu masih harus meningkatkan dana daruratmu hingga mencapai sebesar Rp ' + dana_darurat_single_bulat + '.')
          agent.add('Rasio likuiditas kamu hanya ' + rasio_likuiditas_bulat + ', sementara rasio idealnya adalah 4.')
          agent.add('Langkah berikutnya adalah kamu harus segera mulai mengumpulkan dana daruratmu ya! Bisa dengan mulai sisihkan 10% dari penghasilanmu kok!')
          agent.add('Semangat ya!')
        } else if (status == "single" && rasio_likuiditas >= 4){
          agent.add('Kamu keren banget! Dana darurat yang kamu miliki sudah mencapai minimal sebesar Rp ' + dana_darurat_single_bulat + '.')
          agent.add('Rasio likuiditas kamu adalah ' + rasio_likuiditas_bulat + ' dan rasio idealnya adalah 4.')
          agent.add('Langkah berikutnya adalah kamu harus selalu memastikan bahwa dana daruratmu bersifat likuid. Jangan digunakan untuk investasi dengan risiko tinggi ya!')
        } else if (status == "merid" && rasio_likuiditas < 6){
          agent.add('Wah, kamu masih harus meningkatkan dana daruratmu hingga mencapai sebesar Rp ' + dana_darurat_merid_bulat + '.')
          agent.add('Rasio likuiditas kamu hanya ' + rasio_likuiditas_bulat + ', sementara rasio idealnya adalah 6.')
          agent.add('Langkah berikutnya adalah kamu harus segera mulai mengumpulkan dana daruratmu ya! Bisa dengan mulai sisihkan 10% dari penghasilanmu kok!')
          agent.add('Semangat ya!')
        } else if (status == "merid" && rasio_likuiditas >= 6){
          agent.add('Kamu keren banget! Dana darurat yang kamu miliki sudah mencapai minimal sebesar Rp ' + dana_darurat_merid_bulat + '.')
          agent.add('Rasio likuiditas kamu adalah ' + rasio_likuiditas_bulat + ' dan rasio idealnya adalah 6.')
          agent.add('Langkah berikutnya adalah kamu harus selalu memastikan bahwa dana daruratmu bersifat likuid. Jangan digunakan untuk investasi dengan risiko tinggi ya!')
        } else if (status == "merid 1 anak" && rasio_likuiditas < 9){
          agent.add('Wah, kamu masih harus meningkatkan dana daruratmu hingga mencapai sebesar Rp ' + dana_darurat_merid_1_anak_bulat + '.')
          agent.add('Rasio likuiditas kamu hanya ' + rasio_likuiditas_bulat + ', sementara rasio idealnya adalah 9.')
          agent.add('Langkah berikutnya adalah kamu harus segera mulai mengumpulkan dana daruratmu ya! Bisa dengan mulai sisihkan 10% dari penghasilanmu kok!')
          agent.add('Semangat ya!')
        } else if (status == "merid 1 anak" && rasio_likuiditas >= 9){
          agent.add('Kamu keren banget! Dana darurat yang kamu miliki sudah mencapai minimal sebesar Rp ' + dana_darurat_merid_1_anak_bulat + '.')
          agent.add('Rasio likuiditas kamu adalah ' + rasio_likuiditas_bulat + ' dan rasio idealnya adalah 9.')
          agent.add('Langkah berikutnya adalah kamu harus selalu memastikan bahwa dana daruratmu bersifat likuid. Jangan digunakan untuk investasi dengan risiko tinggi ya!')
        } else if (status == "merid 2 anak" && rasio_likuiditas < 12){
          agent.add('Wah, kamu masih harus meningkatkan dana daruratmu hingga mencapai sebesar Rp ' + dana_darurat_merid_2_anak_bulat + '.')
          agent.add('Rasio likuiditas kamu hanya ' + rasio_likuiditas_bulat + ', sementara rasio idealnya adalah 12.')
          agent.add('Langkah berikutnya adalah kamu harus segera mulai mengumpulkan dana daruratmu ya! Bisa dengan mulai sisihkan 10% dari penghasilanmu kok!')
          agent.add('Semangat ya!')
        } else if (status == "merid 2 anak" && rasio_likuiditas >= 12){
          agent.add('Kamu keren banget! Dana darurat yang kamu miliki sudah mencapai minimal sebesar Rp ' + dana_darurat_merid_2_anak_bulat + '.')
          agent.add('Rasio likuiditas kamu adalah ' + rasio_likuiditas_bulat + ' dan rasio idealnya adalah 12.')
          agent.add('Langkah berikutnya adalah kamu harus selalu memastikan bahwa dana daruratmu bersifat likuid. Jangan digunakan untuk investasi dengan risiko tinggi ya!')
        }

        console.log(`dana tunai = ${dana_tunai}, pengeluaran = ${pengeluaran}, rasio likuiditas = ${rasio_likuiditas}, dana darurat single = ${dana_darurat_single} / ${dana_darurat_single_bulat} dan status = ${status}` )  
    }

    function rasio_tabungan(agent){
      const dana_tabungan = agent.parameters.dana_tabungan
      const penghasilan = agent.parameters.penghasilan

      const rasio_tabungan = (dana_tabungan / penghasilan) * 100
      const dana_tabungan_ideal = penghasilan * 0.1
      
      const dana_tabungan_ideal_bulat = dana_tabungan_ideal.toLocaleString('id-ID')
      const rasio_tabungan_bulat = Math.round(rasio_tabungan)

      const lineMessage = {
        "type": "template",
        "altText": "Rasio tabungan",
        "template": {
        "type": "buttons",
        "text": "Yuk kita cek investasi yang sesuai!",
        "actions": [
          {
            "type": "message",
            "label": "Di sini",
            "text": "Penjelasan mengenai investasi dong yon"
          }
        ]
        }
      }

      var payloadtopikinvestasi = new dfff.Payload('LINE', lineMessage, {
        sendAsMessage: true
    })

      if (rasio_tabungan < 10){
        agent.add('Wah, kamu masih harus memperbaiki pengelolaan keuanganmu untuk menabung paling tidak 10% atau sekitar Rp ' + dana_tabungan_ideal_bulat + '.')
        agent.add('Rasio tabungan kamu hanya ' + rasio_tabungan_bulat + '%.')
        agent.add('Kamu bisa mencoba untuk segera menyisihkan sekitar 10% ketika kamu menerima penghasilan. Lakukan ini secara rutin setiap bulan.')
        agent.add('Kamu pasti bisa! Semangat ya!')
      } else if (rasio_tabungan >= 10){
        agent.add('Kamu berhasil membentuk kebiasaan menabung yang baik, dengan menyisihkan minimal sebesar Rp ' + dana_tabungan_ideal_bulat + ' setiap bulannya.')
        agent.add('Rasio tabungan kamu adalah ' + rasio_likuiditas_bulat + '%, di mana rasio idealnya adalah 10%.')
        agent.add('Sekarang langkah berikutnya adalah kamu harus mencari tahu instrumen investasi apa yang cocok buat kamu, sehingga aset kamu bisa berkembang.')
        agent.add(payloadtopikinvestasi)
      } 

      console.log(`dana tabungan = ${dana_tabungan}, penghasilan = ${penghasilan}, rasio tabungan = ${rasio_tabungan}` )  
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
    intentMap.set('rasio.likuiditas.hitung.dana', rasio_likuiditas)
    intentMap.set('rasio.tabungan.hitung.dana', rasio_tabungan)

    agent.handleRequest(intentMap)
})

app.listen(port, () => {
	console.log(`🌏 Server is running at http://localhost:${port}`)
})
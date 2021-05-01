'use strict';

const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const {WebhookClient, Payload, Card} = require('dialogflow-fulfillment')

process.env.DEBUG = 'dialogflow:debug';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.status(200).send('Server is working now.')
})


app.post('/', (req, res)=>{
    const agent = new WebhookClient({
        request : req,
        response : res
    })

    function demo(agent){
        agent.add("Sending response from Webhook server")
    }

    function cek_dana_darurat(agent) {
		const status = agent.context.get('session-vars').parameters['statusmarried'];
		const dana_tunai = agent.parameters.total_dana_tunai;
		const pengeluaran = agent.parameters.total_pengeluaran;
		
		const rasio_dana_darurat = dana_tunai / pengeluaran;
		const rasio_dd_bulat = rasio_dana_darurat.toFixed(2);
		
		const buttoncekup = {
		"type": "template",
		"altText": "Kriteria lainnya",
		"template": {
			"type": "buttons",
			"text": "Cek kondisi finansial lainnya",
			"actions": [
				{
					"type": "message",
					"label": "Cicilan",
					"text": "Cicilan"
				},
				{
					"type": "message",
					"label": "Dana Investasi",
					"text": "Dana Investasi"
				}
						]
					}
		};

		let button_cek_up_dd = new Payload(agent.LINE, {		
		"type": "template",
		"altText": "Kriteria lainnya",
		"template": {
			"type": "buttons",
			"text": "Cek kondisi finansial lainnya",
			"actions": [
				{
					"type": "message",
					"label": "Cicilan",
					"text": "Cicilan"
				},
				{
					"type": "message",
					"label": "Dana Investasi",
					"text": "Dana Investasi"
				}
						]
					}
		}, { sendAsMessage : true, rawPayload: false });
		
		if (status == "belum") { 
			if (rasio_dana_darurat < 3) {
			agent.add('Berdasarkan perhitungan VIRA, rasio dana darurat kamu adalah ' + rasio_dd_bulat + '. Buat yang berstatus single, rasio dana darurat yang ideal adalah 3 ke atas. Yuk bisa yuk!')
			agent.add(`VIRA punya beberapa saran buat kamu yang mau mulai kumpulin dana darurat: 
1. Langsung sisihkan minimal 10% pendapatan setelah bayar semua kewajiban
2. Coba kurangi pengeluaran yang tidak terlalu mendesak ya
3. Dana darurat bisa disimpan di tabungan terpisah dan pastiin bisa diambil kapan aja dibutuhkan, misalnya di Tahapan BCA. Kalau kamu belum punya, sekarang buka rekening gak harus ke kantor cabang, kamu bisa buka rekening lewat aplikasi BCA mobile. 
Lihat info lengkapnya di sini https://bca.id/virabukarekening`)			
		}
		
			else if (rasio_dana_darurat >= 3) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus single, rasio yang ideal adalah 3 ke atas. Nah pastiin aja dana tersebut bisa kamu ambil kapan aja saat dibutuhkan, bisa juga disimpan di tabungan, misalnya Tahapan BCA.')
			agent.add('Kalau kamu belum punya Tahapan BCA, sekarang buka rekening gak harus ke kantor cabang lho. Kamu bisa langsung buka rekening lewat aplikasi BCA mobile.  Lihat info lengkapnya di sini https://bca.id/virabukatabungan')
		}
		}
		
		else if (status == "sudahxanak") {
			if (rasio_dana_darurat < 9) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan belum punya anak, rasio dana darurat yang ideal adalah 9 ke atas. Yuk bisa yuk!')
			agent.add(`VIRA punya beberapa saran buat kamu yang mau mulai kumpulin dana darurat: 
1. Langsung sisihkan minimal 10% pendapatan setelah bayar semua kewajiban
2. Coba kurangi pengeluaran yang tidak terlalu mendesak ya
3. Dana darurat bisa disimpan di tabungan terpisah dan pastiin bisa diambil kapan aja dibutuhkan, misalnya di Tahapan BCA. Kalau kamu belum punya, sekarang buka rekening gak harus ke kantor cabang, kamu bisa buka rekening lewat aplikasi BCA mobile. 
Lihat info lengkapnya di sini https://bca.id/virabukarekening`)
		}
		
			else if (rasio_dana_darurat >= 9) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan belum punya anak, rasio yang ideal adalah 9 ke atas. Nah pastiin aja dana tersebut bisa kamu ambil kapan aja saat dibutuhkan, bisa juga disimpan di tabungan, misalnya Tahapan BCA.')
			agent.add('Kalau kamu belum punya Tahapan BCA, sekarang buka rekening gak harus ke kantor cabang lho. Kamu bisa langsung buka rekening lewat aplikasi BCA mobile.  Lihat info lengkapnya di sini https://bca.id/virabukatabungan')
		}
		}
		
		else if (status == "sudahanak") {
			if (rasio_dana_darurat < 12) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan sudah punya anak, rasio dana darurat yang ideal adalah 12 ke atas. Yuk bisa yuk!')
			agent.add(`VIRA punya beberapa saran buat kamu yang mau mulai kumpulin dana darurat: 
1. Langsung sisihkan minimal 10% pendapatan setelah bayar semua kewajiban
2. Coba kurangi pengeluaran yang tidak terlalu mendesak ya
3. Dana darurat bisa disimpan di tabungan terpisah dan pastiin bisa diambil kapan aja dibutuhkan, misalnya di Tahapan BCA. Kalau kamu belum punya, sekarang buka rekening gak harus ke kantor cabang, kamu bisa buka rekening lewat aplikasi BCA mobile. 
Lihat info lengkapnya di sini https://bca.id/virabukarekening`)
		}
		
		else if (rasio_dana_darurat >= 12) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan sudah punya anak, rasio yang ideal adalah 12 ke atas. Nah pastiin aja dana tersebut bisa kamu ambil kapan aja saat dibutuhkan, bisa juga disimpan di tabungan, misalnya Tahapan BCA.')
			agent.add('Kalau kamu belum punya Tahapan BCA, sekarang buka rekening gak harus ke kantor cabang lho. Kamu bisa langsung buka rekening lewat aplikasi BCA mobile.  Lihat info lengkapnya di sini https://bca.id/virabukatabungan')
		}
		};
		
		agent.add(button_cek_up_dd);
		
		console.log(`dana tunai = ${dana_tunai}, pengeluaran = ${pengeluaran}, rasio dana darurat = ${rasio_dd_bulat}, status = ${status}` );
	}	

    var intentMap = new Map()

    intentMap.set('webhookDemo', demo)
	intentMap.set('cek.up.gen.dana.darurat', cek_dana_darurat)

    agent.handleRequest(intentMap)
})

app.listen(port, () => {
	console.log(`🌏 Server is running at http://localhost:${port}`)
})
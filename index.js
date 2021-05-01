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
		
		const buttoncekup_dd = {
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

		let button_cek_up_dd = new Payload(agent.LINE, buttoncekup_dd, { sendAsMessage : true, rawPayload: false });
		
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
			agent.add('Berdasarkan perhitungan VIRA, rasio dana darurat kamu adalah ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan belum punya anak, rasio dana darurat yang ideal adalah 9 ke atas. Yuk bisa yuk!')
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
			agent.add('Berdasarkan perhitungan VIRA, rasio dana darurat kamu adalah ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan sudah punya anak, rasio dana darurat yang ideal adalah 12 ke atas. Yuk bisa yuk!')
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

	function cek_cicilan(agent) {

		const utang = agent.parameters.total_cicilan;
		const pendapatan = agent.parameters.total_pendapatan;		
		
		const rasio_utang = utang / pendapatan;
		const rasio_dd_utang = rasio_utang.toFixed(2);
		
		const buttoncekup = {
		"type": "template",
		"altText": "Kriteria lainnya",
		"template": {
			"type": "buttons",
			"text": "Cek kondisi finansial lainnya",
			"actions": [
				{
					"type": "message",
					"label": "Dana Darurat",
					"text": "Dana darurat"
				},
				{
					"type": "message",
					"label": "Dana Investasi",
					"text": "Dana Investasi"
				}
						]
					}
		};

		let button_cek_up_cicilan = new Payload(agent.LINE, buttoncekup, { sendAsMessage : true, rawPayload: false });		

		if (rasio_utang < 0.3) { 
		agent.add(`Nah, menurut VIRA kamu sudah cukup oke kok dalam mengatur porsi cicilan. Yeay!
Jangan lupa untuk mengontrol cicilanmu supaya tidak lebih dari 30% dari pendapatanmu. Lalu, sisihkan juga buat investasi biar tabungan kamu gak terkikis inflasi.`)
		agent.add('Kalau kamu mau investasi di obligasi atau reksadana secara online bisa lewat aplikasi WELMA. Lihat info lengkapnya di sini https://bca.id/infolengkapwelma')			
		}
		
		else if (rasio_utang >= 0.3) {
		agent.add('Buat kamu, sebaiknya mulai pelan-pelan nurunin jumlah cicilan tiap bulannya. Maksimal 30% aja. Ayo semangaat, kamu pasti bisa!')
		agent.add(`Beberapa saran dari VIRA: 
1. Sebelum ngambil cicilan baru, coba pertimbangkan lagi apakah itu kebutuhan atau keinginan.
2. Coba prioritaskan untuk melunasi cicilan kartu kredit kamu dengan mengurangi alokasi pengeluaran yang kurang mendesak yaa.`)
		}
		agent.add(button_cek_up_cicilan);
		
	}

    var intentMap = new Map()

    intentMap.set('webhookDemo', demo)
	intentMap.set('cek.up.gen.dana.darurat', cek_dana_darurat)
	intentMap.set('cek.up.gen.cicilan', cek_cicilan)
    agent.handleRequest(intentMap)
})

app.listen(port, () => {
	console.log(`🌏 Server is running at http://localhost:${port}`)
})
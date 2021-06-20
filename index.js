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
		const kriteria_cek = agent.parameters.kriteria_cek;
	    	const dana_tunai = agent.parameters.total_dana_tunai;
		const pengeluaran = agent.parameters.total_pengeluaran;
		
	    
		const rasio_dana_darurat = dana_tunai / pengeluaran;
		const rasio_dd_bulat = rasio_dana_darurat.toFixed(2);
		
		const button_dd = {
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
		}
		
		if (kriteria_cek == "Darurat" && status == "belum" && rasio_dana_darurat < 3) {
			agent.add('Berdasarkan perhitungan VIRA, rasio dana darurat kamu adalah ' + rasio_dd_bulat + '. Buat yang berstatus single, rasio dana darurat yang ideal adalah 3 ke atas. Yuk bisa yuk!')
			agent.add(`VIRA punya beberapa saran buat kamu yang mau mulai kumpulin dana darurat: 
1. Langsung sisihkan minimal 10% pendapatan setelah bayar semua kewajiban
2. Coba kurangi pengeluaran yang tidak terlalu mendesak ya
3. Dana darurat bisa disimpan di tabungan terpisah dan pastiin bisa diambil kapan aja dibutuhkan, misalnya di Tahapan BCA. Kalau kamu belum punya, sekarang buka rekening gak harus ke kantor cabang, kamu bisa buka rekening lewat aplikasi BCA mobile. 
Lihat info lengkapnya di sini https://bca.id/virabukarekening`)			
		}
		
		else if (kriteria_cek == "Darurat" && status == "belum" && rasio_dana_darurat >= 3) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus single, rasio yang ideal adalah 3 ke atas. Nah pastiin aja dana tersebut bisa kamu ambil kapan aja saat dibutuhkan, bisa juga disimpan di tabungan, misalnya Tahapan BCA.')
			agent.add('Kalau kamu belum punya Tahapan BCA, sekarang buka rekening gak harus ke kantor cabang lho. Kamu bisa langsung buka rekening lewat aplikasi BCA mobile.  Lihat info lengkapnya di sini https://bca.id/virabukatabungan')
		}
				
		else if (kriteria_cek == "Darurat" && status == "sudahxanak" && rasio_dana_darurat < 9) {
			agent.add('Berdasarkan perhitungan VIRA, rasio dana darurat kamu adalah ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan belum punya anak, rasio dana darurat yang ideal adalah 9 ke atas. Yuk bisa yuk!')
			agent.add(`VIRA punya beberapa saran buat kamu yang mau mulai kumpulin dana darurat: 
1. Langsung sisihkan minimal 10% pendapatan setelah bayar semua kewajiban
2. Coba kurangi pengeluaran yang tidak terlalu mendesak ya
3. Dana darurat bisa disimpan di tabungan terpisah dan pastiin bisa diambil kapan aja dibutuhkan, misalnya di Tahapan BCA. Kalau kamu belum punya, sekarang buka rekening gak harus ke kantor cabang, kamu bisa buka rekening lewat aplikasi BCA mobile. 
Lihat info lengkapnya di sini https://bca.id/virabukarekening`)
		}
		
		else if (kriteria_cek == "Darurat" && status == "sudahxanak" && rasio_dana_darurat >= 9) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan belum punya anak, rasio yang ideal adalah 9 ke atas. Nah pastiin aja dana tersebut bisa kamu ambil kapan aja saat dibutuhkan, bisa juga disimpan di tabungan, misalnya Tahapan BCA.')
			agent.add('Kalau kamu belum punya Tahapan BCA, sekarang buka rekening gak harus ke kantor cabang lho. Kamu bisa langsung buka rekening lewat aplikasi BCA mobile.  Lihat info lengkapnya di sini https://bca.id/virabukatabungan')
		}
		
		else if (kriteria_cek == "Darurat" && status == "sudahanak" && rasio_dana_darurat < 12) {
			agent.add('Berdasarkan perhitungan VIRA, rasio dana darurat kamu adalah ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan sudah punya anak, rasio dana darurat yang ideal adalah 12 ke atas. Yuk bisa yuk!')
			agent.add(`VIRA punya beberapa saran buat kamu yang mau mulai kumpulin dana darurat: 
1. Langsung sisihkan minimal 10% pendapatan setelah bayar semua kewajiban
2. Coba kurangi pengeluaran yang tidak terlalu mendesak ya
3. Dana darurat bisa disimpan di tabungan terpisah dan pastiin bisa diambil kapan aja dibutuhkan, misalnya di Tahapan BCA. Kalau kamu belum punya, sekarang buka rekening gak harus ke kantor cabang, kamu bisa buka rekening lewat aplikasi BCA mobile. 
Lihat info lengkapnya di sini https://bca.id/virabukarekening`)
		}
		
		else if (kriteria_cek == "Darurat" && status == "sudahanak" && rasio_dana_darurat >= 12) {
			agent.add('Menurut VIRA, dana daruratmu udah cukup optimal kok yaitu di angka rasio ' + rasio_dd_bulat + '. Buat yang berstatus menikah dan sudah punya anak, rasio yang ideal adalah 12 ke atas. Nah pastiin aja dana tersebut bisa kamu ambil kapan aja saat dibutuhkan, bisa juga disimpan di tabungan, misalnya Tahapan BCA.')
			agent.add('Kalau kamu belum punya Tahapan BCA, sekarang buka rekening gak harus ke kantor cabang lho. Kamu bisa langsung buka rekening lewat aplikasi BCA mobile.  Lihat info lengkapnya di sini https://bca.id/virabukatabungan')
		};
		agent.add(new Payload('LINE', button_dd, {sendAsMessage: true}));
		
		console.log(`dana tunai = ${dana_tunai}, pengeluaran = ${pengeluaran}, rasio dana darurat = ${rasio_dd_bulat}, status = ${status}, kriteria = ${kriteria_cek}` );
	}	

	function cek_cicilan(agent) {
		const status = agent.context.get('session-vars').parameters['statusmarried'];
		const kriteria_cek = agent.parameters.kriteria_cek;
		const utang = agent.parameters.total_cicilan;
		const pendapatan = agent.parameters.total_pendapatan;		
				
		const rasio_utang = utang / pendapatan;
		const rasio_utang_bulat = rasio_utang.toFixed(2);
		
		const buttoncekup_ci = {
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

		var button_cek_up_cicilan = new Payload('LINE', buttoncekup_ci, { sendAsMessage : true });		

		if (kriteria_cek == "Cicilan" && rasio_utang < 0.3) { 
		agent.add(`Nah, menurut VIRA kamu sudah cukup oke kok dalam mengatur porsi cicilan. Yeay!
Jangan lupa untuk mengontrol cicilanmu supaya tidak lebih dari 30% dari pendapatanmu. Lalu, sisihkan juga buat investasi biar tabungan kamu gak terkikis inflasi.`)
		agent.add('Kalau kamu mau investasi di obligasi atau reksadana secara online bisa lewat aplikasi WELMA. Lihat info lengkapnya di sini https://bca.id/infolengkapwelma')			
		agent.add(button_cek_up_cicilan)
		}
		
		else if (kriteria_cek == "Cicilan" && rasio_utang >= 0.3) {
		agent.add('Buat kamu, sebaiknya mulai pelan-pelan nurunin jumlah cicilan tiap bulannya. Maksimal 30% aja. Ayo semangaat, kamu pasti bisa!')
		agent.add(`Beberapa saran dari VIRA: 
1. Sebelum ngambil cicilan baru, coba pertimbangkan lagi apakah itu kebutuhan atau keinginan.
2. Coba prioritaskan untuk melunasi cicilan kartu kredit kamu dengan mengurangi alokasi pengeluaran yang kurang mendesak yaa.`)
		agent.add(button_cek_up_cicilan)
		}

		console.log(`utang = ${utang}, pendapatan = ${pendapatan}, rasio utang = ${rasio_utang_bulat}, status = ${status}, kriteria = ${kriteria_cek}`)
	}

	function cek_investasi(agent) {
		const status = agent.context.get('session-vars').parameters['statusmarried'];
		const kriteria_cek = agent.parameters.kriteria_cek;
		const sisihan = agent.parameters.total_sisihan;
		const pendapatan = agent.parameters.total_pendapatan;	
				
		const rasio_investasi = sisihan / pendapatan;
		const rasio_investasi_bulat = rasio_investasi.toFixed(2);
		
		const buttoncekup_iv = {
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
					"label": "Cicilan",
					"text": "Cicilan"
				}
						]
					}
		};

		var button_cek_up_investasi = new Payload('LINE', buttoncekup_iv, { sendAsMessage : true });		

		if (kriteria_cek == "Investasi" && rasio_investasi < 0.1) { 
		agent.add('Yuk, pelan-pelan mulai atur lagi dana investasi kamu yaa. Untuk investasi yang ideal minimal 10% dari jumlah pendapatan kamu. Dengan berinvestasi kita jadi belajar untuk mengatur keuangan yang lebih  baik di masa depan.')
		agent.add(`Nah, saran dari VIRA:
1. Setelah bayar semua kewajiban kayak tagihan rutin, sisihkan minimal 10% buat investasi, sebelum dialokasikan buat pengeluaran lainnya 
2. Kamu bisa manfaatin promo-promo menarik dari BCA! Cek ke https://bca.id/PROMONYABCA 
3. Supaya gak lupa untuk nyisihin dana investasi, kamu bisa pakai Tabungan Berjangka. Gak perlu lagi repot transfer tiap bulan, karena uang tabungan diautodebet tiap bulan dari rekening sumber dana. Cek selengkapnya di sini https://bca.id/infotahapanberjangka`)			
		}
		
		else if (kriteria_cek == "Investasi" && rasio_investasi >= 0.1) {
		agent.add('Menurut VIRA kamu keren karena udah terbiasa buat nabung ataupun investasi Investasi yang ideal minimal 10% dari jumlah pendapatan kamu. Tinggal pastiin aja instrumen investasi kamu sudah sesuai sama tujuan keuangan dan profil risiko kamu!')
		agent.add('Dalam investasi inget aja prinsip “High risk, high return” yaa! Nah buat kamu yang pengen tahu gambaran diri saat menghadapi risiko berinvestasi, cek dulu profil risiko kamu di sini https://bca.id/viraprofilrisiko')
		}

		agent.add(button_cek_up_investasi)	
		console.log(`investasi = ${sisihan}, pendapatan = ${pendapatan}, rasio investasi = ${rasio_investasi_bulat}, status = ${status}, kriteria = ${kriteria_cek}`)
	}

	function hitung_dana_pendi(agent) {
		const target_dana = agent.parameters.target_dana_pendi;
		const tahun_pendi_1 = agent.parameters.tahun_pendi;
		const dana_sedia_pendi_1 = agent.parameters.dana_sedia_pendi;
		
		const total_dana_pendi = target_dana * (Math.pow(1.21, tahun_pendi_1));
		const net_target_dana = total_dana_pendi - dana_sedia_pendi_1;
		const net_target_dana_pendi_bulat = Math.round(net_target_dana);
		const net_target_dana_pendi_bulat_rp = net_target_dana_pendi_bulat.toLocaleString('de-DE');		
		
		const param_a = 1 + (0.1/12);
		const param_b = Math.pow(param_a, (tahun_pendi_1 * 12));
		const param_c = net_target_dana * (0.1/12);
		const invest_pendi = param_c / ((param_b - 1) * param_a);
		const invest_pendi_bulat = Math.round(invest_pendi);
		const invest_pendi_bulat_rp = invest_pendi_bulat.toLocaleString('de-DE');
		
		const button_pendi = {
		"type": "template",
		"altText": "Metode pendidikan",
		"template": {
			"type": "buttons",
			"text": "Pilih yang ingin kamu ketahui",
			"actions": [
				{
					"type": "message",
					"label": "Investasi",
					"text": "Investasi"
				},
				{
					"type": "message",
					"label": "Asuransi pendidikan",
					"text": "Asuransi pendidikan"
				}
						]
					}
		};
		
		var button_pendi_payload = new Payload('LINE', button_pendi, { sendAsMessage : true });	
		
		agent.add('Untuk biaya pendidikan anak kamu, kamu butuh Rp '+ net_target_dana_pendi_bulat_rp +' atau kalau kamu taruh di instrumen investasi yang memberikan return 10%, kamu harus menyisihkan Rp ' + invest_pendi_bulat_rp + ' per bulan.');
		agent.add('Ada 2 cara yang bisa bantu kamu capai impian sekolahin anak kamu. Kamu tertarik yang mana?')
		agent.add(button_pendi_payload)
	}
	
    var intentMap = new Map()

    intentMap.set('webhookDemo', demo)
	intentMap.set('cek.up.gen.dana.darurat', cek_dana_darurat)
	intentMap.set('cek.up.gen.cicilan', cek_cicilan)
	intentMap.set('cek.up.gen.investasi', cek_investasi)
	intentMap.set('dana.pendidikan.anak.gen.q1', hitung_dana_pendi)
    agent.handleRequest(intentMap)
})

app.listen(port, () => {
	console.log(`🌏 Server is running at http://localhost:${port}`)
})

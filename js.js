let hak,sure,aralik,hedefSayi,skor,sayac,zorluk;
let hakCarpani, sureCarpani;
let enYuksekSkor = 0;

function zorlukSec(secim){
    if(secim==='kolay'){
        hak=7;
        sure=60;
        aralik=50;
        hakCarpani=5;
        sureCarpani=4;
        zorluk="Kolay";
    }
    else if (secim==='orta'){
        hak=7;
        sure=45;
        aralik=100;
        hakCarpani=10;
        sureCarpani=8;
        zorluk="Orta";
    }
    else if (secim==='zor'){
        hak=8;
        sure=30; 
        aralik=400; 
        hakCarpani=20;
        sureCarpani=16;
        zorluk="Zor";
    }

    document.getElementById("hak").textContent=hak;
    document.getElementById("sure").textContent=sure;
    document.getElementById("enYuksekSkor").textContent=enYuksekSkor;
    document.getElementById("eYuksekSkor").textContent=enYuksekSkor;
    document.getElementById("zorluk").textContent=zorluk;

    hedefSayi=Math.floor(Math.random()*aralik)+1;

    document.getElementById("secimEkrani").style.display="none";
    document.getElementById("oyunEkrani").style.display="block";
    document.getElementById("skor").style.display="none";
    document.getElementById("tahminInput").focus();
    mesajEkle("1-"+aralik+" arasında bir sayı tuttum, tahmin et!","oyun");

    clearInterval(sayac);
    sayac=setInterval(sureAzalt,1000);
    
}

function sureAzalt(){
    sure--;
    document.getElementById("sure").textContent=sure;

    if(sure<=0){
        mesajEkle("Süre bitti! Tuttuğum sayı: "+hedefSayi,"oyun")
        bitir(false);
    }
}

function mesajEkle(yazi,kim){
    let balon=document.createElement("div");
    balon.textContent=yazi;
    balon.classList.add(kim);
    document.getElementById("mesajlar").appendChild(balon);
    document.getElementById("mesajlar").scrollTop=document.getElementById("mesajlar").scrollHeight;
}

var girilenSayi=[];
function tahminEt(){
    

    let input=document.getElementById("tahminInput").value;
    
    mesajEkle(input,"kullanici");

    if(isNaN(input) || document.getElementById("tahminInput").value.trim()===""){
        mesajEkle("Lütfen bir tam sayı giriniz!","oyun");
        document.getElementById("tahminInput").value="";
        document.getElementById("tahminInput").focus();
        return;
    }
    else {
        var tahmin=Number(document.getElementById("tahminInput").value);

        if (tahmin>aralik || tahmin<1){
            mesajEkle("Lütfen 1-"+aralik+" arasında bir sayı giriniz!","oyun");
            document.getElementById("tahminInput").value="";
            document.getElementById("tahminInput").focus();
            return;
        }

        if(girilenSayi.includes(tahmin)){
            mesajEkle("Lütfen daha önce girmediğiniz bir sayıyı yazınız!","oyun");
           
            document.getElementById("tahminInput").value="";
            document.getElementById("tahminInput").focus();

            return;
        }
        else{
            girilenSayi.push(tahmin);
        }
        
        let kontrol;
        let dogru=false;

        if(tahmin>hedefSayi){
            kontrol="Lütfen daha küçük bir sayı giriniz.";
            hak--;
            document.getElementById("hak").textContent=hak;
        }
        else if(tahmin<hedefSayi){
            kontrol="Lütfen daha büyük bir sayı giriniz.";
            hak--;
            document.getElementById("hak").textContent=hak;
        }
        else{
            kontrol="Tebrikler! Doğru tahmin ettiniz.";
            dogru=true;
        }

        if(hak<=0){
            mesajEkle("Hakkın bitti! Tuttuğum sayı: "+hedefSayi,"oyun");
            bitir(false);
        }
        else{
            mesajEkle(kontrol,"oyun");
        }

        if(dogru){
            bitir(true);
        }

        document.getElementById("tahminInput").value="";
        document.getElementById("tahminInput").focus();
    }

}

function bitir(kazandi){
    if (kazandi){
        skor=(hak*hakCarpani)+(sure*sureCarpani);
        if(skor>enYuksekSkor){
            enYuksekSkor=skor;
            document.getElementById("enYuksekSkor").textContent=enYuksekSkor;
            document.getElementById("eYuksekSkor").textContent=enYuksekSkor;
        }
        mesajEkle("Skorun: "+skor,"oyun");
    }
    else{
        skor=0;
        mesajEkle("Skorun: "+skor,"oyun");
    }

    document.getElementById("btnTahmin").disabled=true;
    document.getElementById("tahminInput").disabled=true;
    clearInterval(sayac);
    document.getElementById("tahminInput").value="";

}

function tekrarOyna(){
    document.getElementById("mesajlar").innerHTML="";
    document.getElementById("oyunEkrani").style.display="none";
    document.getElementById("secimEkrani").style.display="block";
    document.getElementById("skor").style.display="block";
    document.getElementById("btnTahmin").disabled=false;
    document.getElementById("tahminInput").disabled=false;
    document.getElementById("tahminInput").value="";
    girilenSayi.length=0;
}
    


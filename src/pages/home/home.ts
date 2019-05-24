import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage{
map: any;
  //Abrir menu
  abrirMenu(){
    this.navCtrl.setRoot('MenuPage');
    }
  
  burgers: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private geolocation: Geolocation,
  ) {
    this.getBurgers();
  }

  //ionViewDidLoad(){

  

  getBurgers() {
    this.firebaseProvider.getBurgers()
      .then((r) => {
        this.burgers = r;
        console.log(this.burgers)
      })
  }
//mapa
  ngOnInit() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 18,
          center: position
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const marker = new google.maps.Marker({
          position: position,
         map: this.map
        });

      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

}


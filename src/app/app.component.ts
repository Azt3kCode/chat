import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase-admin/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.getResponse().subscribe(data => {
      this.response = data;
    });
  }

  response: any = [];

  getResponse() {
    return this.http.get('https://chat-general-418c8-default-rtdb.firebaseio.com/usuario.json');
  }
  //guardar account en el localstorage en el navegador
  
  @Input() comentario: string = '';

  id: number = 0;
  sendMessage(message: string) {
    this.comentario = '';
    this.id = this.response.length;
    // Guardar message en la base de datos y agregarlo a la lista usuario
    this.http.put('https://chat-general-418c8-default-rtdb.firebaseio.com/usuario/' + this.id + '.json', {
      mensaje: message
    }).subscribe(data => {
      console.log(data);
    }
    );
    // refrrescar pagina
    location.reload();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})

export class PeopleService {

  selectedPerson : person =  {
    _id: "",
    id: 0,
    Nombre: "",
    Apellidos: "",
    Edad: "",
    DNI: "",
    Cumpleanos: "",
    ColorFavorito: "",
    Sexo: "",
  };

  personArray: Array<person> = []

  readonly URL_API: string = 'http://localhost:3000/users';
  
  constructor(private http: HttpClient) { 
    this.selectedPerson = {
      _id: "",
      id: 0,
      Nombre: "",
      Apellidos: "",
      Edad: "",
      DNI: "",
      Cumpleanos: "",
      ColorFavorito: "",
      Sexo: "",
    };
  }

  getPersons() {
    return this.http.get<person[]>(this.URL_API);
  }

  postPerson(persona: person) {
    return this.http.post(this.URL_API, persona);
  }

  putPerson(persona: person) {
    return this.http.put(this.URL_API + `/${persona._id}`, persona);
  }

  deletePerson(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

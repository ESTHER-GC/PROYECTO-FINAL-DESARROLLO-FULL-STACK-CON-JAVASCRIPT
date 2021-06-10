import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { person } from './../../interfaces/person';
import { PeopleService } from './../../services/people.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PeopleService],
})

export class PersonComponent 

implements OnInit {

  personArray: Array<person> = [];
  selectedPerson : person =  {
    _id:"",
    id: 0,
    Nombre: "",
    Apellidos: "",
    Edad: "",
    DNI: "",
    Cumpleanos: "",
    ColorFavorito: "",
    Sexo: "",
  };
  
  constructor(public peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getPersons();
  }

  addPerson(form?: NgForm) {
    if (form) {
      if (form.value._id) {
        this.peopleService.putPerson(form.value).subscribe((res) => {
          this.resetForm(form);
          this.getPersons();
        });
      } else {
        this.peopleService.postPerson(form.value).subscribe((res) => {
          this.getPersons();
          this.resetForm(form);
        });
      }
    }
  } 
 
  getPersons() {
    this.peopleService.getPersons().subscribe((res) => {
      this.peopleService.personArray = res;
    });
  }

  editPerson(persona: person) {
    this.peopleService.selectedPerson = persona;
  }

  deletePerson(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.peopleService.deletePerson(_id).subscribe((res) => {
        this.getPersons();
        this.resetForm(form);
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.peopleService.selectedPerson = {
        _id:"",
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
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';
import { PersoneditComponent } from '../partials/personedit/personedit.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  person: Person[] = []
  limit = new FormControl()
  search = new FormControl()

  constructor(
    private dialog: MatDialog,
    private personService: PersonService) { }

  ngOnInit() {
    this.loadGridPerson(10, null)
  }

  loadGridPerson(limit, filter) {
    this.personService.getPersonByLimitAndFilter(limit, filter)
      .subscribe(data => {
        this.person = data['data']

      }, err => console.log(err))
  }


  UpdateByFilter(e) {
    this.personService.getPersonByLimitAndFilter(this.limit.value, e)
    .subscribe(res=>{
      this.person = res['data']
    }, err => console.log(err))
  }

  updateByLimit(e) {
    this.personService.getPersonByLimitAndFilter(e, this.search.value)
    .subscribe(res=>{
      this.person = res['data']
    }, err => console.log(err))
  }

  Edit(person:Person) {
    const modalDialog = this.dialog.open(PersoneditComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
      data:{
        title:'Editar este registro',
        person: person
      }
    })

    modalDialog.afterClosed()
    .subscribe(result=>{
      if (result){
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Espere por favor...'
        });
    
        Swal.showLoading();

        this.personService.personUpdate(result)
        .subscribe(data =>{
          this.loadGridPerson(10, null)
          Swal.close()
          
          Swal.fire({
            title: 'Actualizado correctamente',
            timer: 2000,
            timerProgressBar: true
          })
        }, err => console.log(err))
      }
    })
  }

  updategrid() {
    let limit = this.limit
    let filter = this.search

    console.log(filter)
    console.log(limit)
  }

}

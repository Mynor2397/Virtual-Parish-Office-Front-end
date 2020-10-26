import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


import Swal from 'sweetalert2'
import { DialogComponent } from '../partials/dialog/dialog.component';

import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

import { Priest } from 'src/app/models/priest.model';
import { PriestService } from 'src/app/services/priest.service';

import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

import { Partida } from 'src/app/models/partida.model';
import { PartidaService } from 'src/app/services/partida.service';

import { Book } from 'src/app/models/books.model';
import { Folio } from 'src/app/models/folio.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  partida: FormGroup;

  person = new Person()
  submitted: boolean = false;
  par = new Partida()

  priestList: Priest[] = []
  placeList: Place[] = []
  bookList: Book[] = []
  folioList: Folio[] = []
  fatherList: Person[] = []
  motherList: Person[] = []
  gfatherList: Person[] = []
  gmotherList: Person[] = []
  unisexList: Person[] = []



  // options: User[] = [
  //   {
  //     username: "Hola",
  //     password: "asdfasldkf"
  //   }
  // ]
  // priestOptions: Observable<Priest[]>;
  // placeOptions: Observable<Place[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personService: PersonService,
    private priestService: PriestService,
    private placeService: PlacesService,
    private documentService: PartidaService) { }

  ngOnInit() {
    this.getPriest()
    this.getPlace()
    this.getBook()
    this.getMasculine()
    this.getFemenine()
    this.getUnisex()

    this.partida = this.formBuilder.group({
      firstname: ['', Validators.required],
      secondname: new FormControl(),
      lastname: ['', Validators.required],
      secondlastname: new FormControl(),
      borndate: ['', Validators.required],
      baptismdate: new FormControl(),
      priest: ['', Validators.required],
      place: new FormControl(),
      sex: ['', Validators.required],
      father: new FormControl(),
      mother: new FormControl(),
      gfather: new FormControl(),
      gmother: new FormControl(),
      manager: new FormControl(),
      folio: ['', Validators.required],
      book: new FormControl()
    })


    // this.priestOptions = this.f.priest.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.firstname),
    //     map(value => value ? this._filterPriest(value) : this.priestList.slice())
    //   );

    // this.placeOptions = this.f.place.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(value => value ? this._filterPlace(value) : this.placeList.slice())
    //   )


  }


  get f() { return this.partida.controls }

  // displayPriest(priest): Priest[] {
  //   return priest ? priest.firstname : undefined
  // }

  // displayPlace(place): Place[] {
  //   return place ? place.name : undefined
  // }

  // private _filterPlace(name: string): Place[] {
  //   const filterValue = name.toLowerCase();

  //   return this.placeList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
  // }

  // private _filterPriest(name: string): Priest[] {
  //   const filterValue = name.toLowerCase();

  //   return this.priestList.filter(option => option.firstname.toLowerCase().indexOf(filterValue) === 0);
  // }


  openDialog(title: string, sexo: string, component: string) {
    var height = '300'

    if (component == 'MNG') {
      height = '380'
      console.log(height)
    }
    const modalDialog = this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
      data: {
        component: component,
        title: title,
        sexo: sexo
      }
    })

    // When user close the dialog
    modalDialog.afterClosed().subscribe(result => {



      if (result) {
        this.person = result
        this.person.component = component

        if (result.sexo == null) {
          this.person.sexo = sexo
        } else {
          this.person.sexo = result.sexo
        }

        this.personService.insertPerson(this.person)
          .subscribe(data => {
            if (data) {

              if (data['data'][0].component == 'FA') {
                this.fatherList = data['data']
              }

              if (data['data'][0].component == 'MO') {
                this.motherList = data['data']
              }

              if (data['data'][0].component == 'GF') {
                this.gfatherList = data['data']
              }

              if (data['data'][0].component == 'GM') {
                this.gmotherList = data['data']
              }

              if (data['data'][0].component == 'MNG') {
                this.unisexList = data['data']
              }
            }
          }, error => {
            console.log(error);
          })
      }
    });
  }

  getPriest() {
    this.priestService.getPriest()
      .subscribe(data => {
        this.priestList = data['data']
      }, error => console.log(error))
  }

  getPlace() {
    this.placeService.getPlaces()
      .subscribe(data => {
        this.placeList = data['data']

      }, err => console.log(err))
  }

  getFolios(book) {
    this.documentService.getFolios(book)
      .subscribe(data => {
        this.folioList = data['data']

      }, err => console.log(err))

  }

  getBook() {
    this.documentService.getBooks()
      .subscribe(data => {
        this.bookList = data['data']

      }, err => console.log(err))
  }

  getMasculine() {
    this.personService.getPerson('M')
      .subscribe(data => {
        this.fatherList = data['data']
        this.gfatherList = data['data']

      }, err => console.log(err))
  }

  getFemenine() {
    this.personService.getPerson('F')
      .subscribe(data => {
        this.motherList = data['data']
        this.gmotherList = data['data']
      }, err => console.log(err))
  }


  getUnisex() {
    this.personService.getPerson('G')
      .subscribe(data => {
        this.unisexList = data['data']
      }, err => console.log(err))
  }

  insert() {


    if (this.partida.invalid) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "Por favor llena los campos"
      })
      return
    }


    this.par.firstname = this.f.firstname.value || null
    this.par.secondname = this.f.secondname.value || null
    this.par.lastname = this.f.lastname.value || null
    this.par.secondlastname = this.f.secondlastname.value || null
    this.par.borndate = this.f.borndate.value || null
    this.par.sex = this.f.sex.value || null
    this.par.folio = this.f.folio.value || null
    this.par.baptism_date = this.f.baptismdate.value || null
    this.par.priest = this.f.priest.value || null
    this.par.place = this.f.place.value || null
    this.par.id_father = this.f.father.value || null
    this.par.id_mother = this.f.mother.value || null
    this.par.id_godfather = this.f.gfather.value || null
    this.par.id_godmother = this.f.gmother.value || null
    this.par.id_manager = this.f.manager.value || null

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    // console.log(this.par)
    this.documentService.createPartida(this.par)
      .subscribe(data => {
        
        if (data['ok'] == true) {
          Swal.close()

          this.partida.reset()
          
          this.documentService.postAudit(data['data'])
          .subscribe(data=>{
          }, err => console.log(err))
          
          Swal.fire({
            title: 'Creado correctamente',
            timer: 2000,
            timerProgressBar: true
          })

        }
      }, err => console.log(err))
  }
}

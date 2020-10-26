import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import Swal from 'sweetalert2';
import { BookmodalComponent } from '../partials/bookmodal/bookmodal.component';
import { CreateuserComponent } from '../partials/createuser/createuser.component';
import { PlacemodalComponent } from '../partials/placemodal/placemodal.component';
import { PriestmodalComponent } from '../partials/priestmodal/priestmodal.component';

import { Book } from 'src/app/models/books.model';
import { Claims } from 'src/app/models/claims.model';
import { Place } from 'src/app/models/place.model';
import { Priest } from 'src/app/models/priest.model';
import { User } from 'src/app/models/user.model';
import { PartidaService } from 'src/app/services/partida.service';
import { PlacesService } from 'src/app/services/places.service';
import { PriestService } from 'src/app/services/priest.service';
import { UserService } from 'src/app/services/user.service';
import { Audit } from 'src/app/models/Audit.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  countBook: number
  countPlace: number
  countPriest: number

  priestList: Priest[] = []
  placeList: Place[] = []

  audits : Audit[] = []

  user: Claims = new Claims()
  book = new Book()

  usuario: User[] = []
  constructor(
    private dialog: MatDialog,
    private partidaService: PartidaService,
    private placeService: PlacesService,
    private priestService: PriestService,
    private authService: UserService
  ) { }

  ngOnInit() {
    this.getCount()
    this.getCountPlaces()
    this.getCountPriests()
    this.getPriest()
    this.getPlace()
    this.getAudit()
    this.user.rol = this.authService.userValue.rol
    this.getmanyUsers()
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

  savebook() {
    const modalDialog = this.dialog.open(BookmodalComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: {
        title: 'Ingresar libro'
      }
    })

    modalDialog.afterClosed()
      .subscribe(result => {
        if (result) {
          this.book = result

          var start_date = new Date(result.start_date);
          var diastart = start_date.getDate()
          var aniostart = start_date.getFullYear()
          var month = start_date.getMonth()

          this.book.start_date = `${aniostart}-${month}-${diastart}`

          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Espere por favor...'
          });

          Swal.showLoading();


          this.partidaService.createBook(result)
            .subscribe(data => {
              this.getCount()
              Swal.close()
            }, err => {
              Swal.fire({
                icon: 'error',
                title: 'Fallo al crear libro',
                text: 'Revise su conexión a internet'
              });
            })
        }
      })
  }

  savepriest() {
    const modalDialog = this.dialog.open(PriestmodalComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
      data: {
        title: 'Ingresar Sacerdote'
      }
    })

    modalDialog.afterClosed()
      .subscribe(result => {
        if (result) {

          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Espere por favor...'
          });

          Swal.showLoading();

          this.priestService.createPriest(result)
            .subscribe(data => {
              this.getCountPriests()
              this.getPriest()
              Swal.close()
            }, err => {
              console.log(err)
              Swal.fire({
                icon: 'error',
                title: 'Fallo al crear libro',
                text: 'Revise su conexión a internet'
              });
            })
        }
      })
  }


  saveUser() {
    const modalDialog = this.dialog.open(CreateuserComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: {
        title: 'Crear usuario'
      }
    })


    modalDialog.afterClosed()
      .subscribe(result => {

        if (result) {

          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Espere por favor...'
          });

          Swal.showLoading();

          this.authService.crearUsuario(result)
            .subscribe(data => {
              this.getmanyUsers()
              Swal.close()
            }, err => {
              console.log(err)
              if (err == 'User already exists'){
                Swal.fire({
                  icon: 'error',
                  title: 'Fallo al crear usuario',
                  text: `Este usuario ya existe!`
                });
                return
              }

              Swal.fire({
                icon: 'error',
                title: 'Fallo al crear usuario',
                text: 'Revise su conexión a internet'
              });
            })
        }
      })
  }

  saveplace() {
    const modalDialog = this.dialog.open(PlacemodalComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: {
        title: 'Ingresar lugar'
      }
    })

    modalDialog.afterClosed()
      .subscribe(result => {
        if (result) {

          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Espere por favor...'
          });

          Swal.showLoading();

          this.placeService.insertPlace(result)
            .subscribe(data => {
              this.countPlace = data['data']
              this.getPlace()
              Swal.close()
            }, err => {
              console.log(err['message'])
              Swal.fire({
                icon: 'error',
                title: 'Fallo al crear libro',
                text: 'Revise su conexión a internet'
              });
            })
        }
      })
  }

  getCount() {
    this.partidaService.getCountBoks()
      .subscribe(data => {
        this.countBook = data['data']
      }, err => console.log(err))
  }

  getCountPlaces() {
    this.placeService.getCountPlaces()
      .subscribe(data => {
        this.countPlace = data['data']
      }, err => console.log(err))
  }

  getCountPriests() {
    this.priestService.getPriestCount()
      .subscribe(data => {
        this.countPriest = data['data']
      }, err => console.log(err))
  }


  getmanyUsers() {
    if (this.user.rol == 'admin') {
      this.authService.usermany()
        .subscribe(data => {
          this.usuario = data['data']
        }, err => console.log(err))
    }
  }

  getAudit(){
    this.partidaService.getAudit()
    .subscribe(data =>{
      this.audits = data['data']
    })
  }
}

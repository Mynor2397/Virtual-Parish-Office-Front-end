import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Columns, Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Swal from 'sweetalert2'
import { EmailComponent } from '../partials/email/email.component';

import { NotificationService } from 'src/app/services/notification.service';
import { Claims } from 'src/app/models/claims.model';
import { PersonService } from 'src/app/services/person.service';
import { Partida } from 'src/app/models/partida.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  search = ''
  limit = 0
  countBook = ''

  prepartida: Partida[] = []
  partida: Partida
  user: Claims = new Claims()

  constructor(
    private dialog: MatDialog,
    private personService: PersonService,
    private authServie: UserService,
    private notiService: NotificationService
    ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.getBaptizedPerson()
    this.user.rol = this.authServie.userValue.rol
  }

  getBaptizedPerson() {
    this.personService.getBaptizedPerson(0)
      .subscribe(data => {
        this.prepartida = data['data']
      })
  }

  updategrid(filter: string) {
    if (filter == '') {
      this.getBaptizedPerson()
    }

    this.personService.getBaptizedPersonByFilter(filter)
      .subscribe(data => {
        if (data) {
          this.prepartida = data['data']
        }
      })

  }

  MostrarID(limit){
    this.personService.getBaptizedPerson(limit)
    .subscribe(data =>{
      this.prepartida = data['data']
    }, err => console.log(err))
  }


  async createPDF(id: string) {

    this.personService.getPartida(id)
      .subscribe(data => {
        this.partida = data['data']
        this.PDF(this.partida)
      }, err => {
        console.log(err)
        return
      })

  }

  async PDF(part) {
    var t1 = `El infrascrito, Párroco de: Parroquia Inmaculada Concepción de `
    var t2 = `Monjas del departamento de Jalapa.`;

    var cert = `CERTIFICA`

    var names = `${part.firstname || ''} ${part.secondname || ''} ${part.lastname || ''} ${part.secondlastname || ''}`

    var borndate = new Date(part.borndate);
    var dia = borndate.getDate() + 1
    var anio = borndate.getFullYear()
    var mes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(part.borndate));


    var baptism_date = new Date(part.baptism_date);
    var diabap = baptism_date.getDate() + 1
    var aniobap = baptism_date.getFullYear()
    var mesbap = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(part.baptism_date));

    var emitteddate = new Date()
    var emitday = emitteddate.getDate()
    var emitmonth = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(emitteddate));
    var emitanio = emitteddate.getFullYear()

    var entpapas = ''
    var sexo = ''
    var bapti = ''
    var hijo = ''

    if (part.sex == 'M') {
      sexo = 'nacido'
      bapti = 'bautizado'
      hijo = 'hijo de'
    } else {
      sexo = 'nacida'
      bapti = 'bautizada'
      hijo = 'hija de'
    }



    var folio = ` y folio No. ${part.folio} de esta parroquia consta que`;
    var infdate = `${sexo} el ${dia} de ${mes} de ${anio} y ${bapti} el ${diabap} de ${mesbap} de ${aniobap}`
    var fobook = `que ${infdate} en el libro de Bautizos No. ${part.book} ${folio} quedó inscrito el registro de:`

    if (part.father.firstname_father && part.mother.firstname_mother) {
      entpapas = 'y de'
    }
    var papa = ` ${part.father.firstname_father || ''} ${part.father.secondname_father || ''} ${part.father.lastname_father || ''} ${part.father.secondlastname_father || ''}`
    var mama = ` ${part.mother.firstname_mother || ''} ${part.mother.secondname_mother || ''} ${part.mother.lastname_mother || ''} ${part.mother.secondlastname_mother || ''}`
    if (papa.trim() == '') {
      papa = "--------------------"
    }

    if (mama.trim() == '') {
      mama = "--------------------"
    }

    var padrino = ` ${part.godfather.firstname_godfather || ''} ${part.godfather.secondname_godfather || ''}  ${part.godfather.lastname_godfather || ''} ${part.godfather.secondlastname_godfather || ''} `
    var madrina = ` ${part.godmother.firstname_godmother || ''} ${part.godmother.secondname_godmother || ''}  ${part.godmother.lastname_godmother || ''} ${part.godmother.secondlastname_godmother || ''} `

    if (padrino.trim() == '') {
      padrino = "--------------------"
    }

    if (madrina.trim() == '') {
      madrina = "--------------------"
    }

    var tutor = ` ${part.manager.firstname_manager || ''} ${part.manager.secondname_manager || ''} ${part.manager.lastname_manager || ''} ${part.manager.secondlastname_manager || ''}`
    if (tutor.trim() == '') {
      tutor = "--------------------"
    }

    var sacerdote = ` ${part.priest.firstname_priest || ''} ${part.priest.secondname_priest || ''} ${part.priest.lastname_priest || ''} ${part.priest.second_lastname_priest || ''}`
    if (sacerdote.trim() == '') {
      sacerdote = "--------------------"
    }

    var celebro = `Habiendo celebrado el bautismo el P. ${sacerdote || ''}`

    const pdf = new PdfMakeWrapper()
    pdf.pageSize({
      width: 460,
      height: 'auto'
    })


    pdf.add(await new Img('http://localhost:5000/images/membrete.png').alignment('center').build())
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Txt(`${t1}`).alignment('center').bold().end)
    pdf.add(new Txt(t2).alignment('center').bold().end)
    pdf.add(' ')
    pdf.add(new Txt(cert).alignment('center').bold().end)
    pdf.add(' ')
    pdf.add(new Txt(fobook).alignment("center").bold().end)
    pdf.add(' ')
    pdf.add(new Txt(names).alignment('center').color('blue').fontSize(14).bold().decoration('underline').end)
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Columns(['Datos del Padre', 'Datos de la Madre']).alignment('center').columnGap(10).bold().end)
    pdf.add(' ')
    pdf.add(new Columns([`${papa || '---------------'}`, `${mama || '---------------'}`]).alignment('center').columnGap(10).end)
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Columns(['Datos del Padrino', 'Datos de la Madrina']).alignment('center').columnGap(10).bold().end)
    pdf.add(' ')
    pdf.add(new Columns([`${padrino || "---------------"}`, `${madrina || '---------------'}`]).alignment('center').columnGap(10).end)
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Columns(['Datos del Tutor', '']).alignment('center').columnGap(10).bold().end)
    pdf.add(' ')
    pdf.add(new Columns([`${tutor}`, ``]).alignment('center').columnGap(10).end)
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Txt(celebro).alignment("center").bold().end)
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Columns(['', 'Párroco:_______________________']).alignment('center').columnGap(10).bold().end)
    pdf.add(' ')
    pdf.add(new Columns([``,`Emitida el dia ${emitday} de ${emitmonth} de ${emitanio}`]).alignment('right').columnGap(6).fontSize(8).end)
    pdf.add(' ')
    pdf.create().open()
  }

  deletePartida(id: string) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Borrar el registro, esta acción es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"Cancelar",
      confirmButtonText: 'Si, borrar!'
    }).then((result)=>{
      if(result.isConfirmed){
        this.personService.deletePartida(id)
        .subscribe(data => {
          Swal.fire(
            'Borrado!',
            'El registro fue borrado satisfactoriamente!',
            'success'
          )
          
          this.getBaptizedPerson()
        }, err => console.log(err))
        
      }
    })

    
  }


  openDialog() {
    const modalDialog = this.dialog.open(EmailComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
        title: 'Notificar a la oficina central'
      }
    })

    modalDialog.afterClosed()
      .subscribe(result => {
        if (result) {
          this.notiService.sendNotification(result)
            .subscribe(data => {
            }, err => console.log(err))
        }
      })
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Person } from 'src/app/models/person.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personedit',
  templateUrl: './personedit.component.html',
  styleUrls: ['./personedit.component.scss']
})
export class PersoneditComponent implements OnInit {
  form: FormGroup;
  title: string;
  id: string
  component: string
  submitted: boolean = false

  person = new Person()

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersoneditComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.person = data.person
    this.id = data.person.id
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstname: [this.person.firstname, Validators.required],
      secondname: [this.person.secondname, []],
      lastname: [this.person.lastname, Validators.required],
      secondlastname: [this.person.secondlastname, []],
      dpi: [this.person.dpi, []],
      sexo: [this.person.sexo, []],
      address: [this.person.address, []],
    });
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Actualizar el registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4299e1',
      cancelButtonColor: '#f56565',
      cancelButtonText:"Cancelar",
      confirmButtonText: 'si, actualizar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.person = this.form.value
        this.person.id = this.id

        this.dialogRef.close(this.person);
      }
    })

  }

  close(): void {
    this.dialogRef.close();
  }

}

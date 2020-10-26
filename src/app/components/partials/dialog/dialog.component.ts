import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  entity: string;
  form: FormGroup;
  title: string;
  sex: string
  component: string
  submitted: boolean = false

  person = new Person()

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.sex = data.sexo
    this.title = data.title
    this.component = data.component

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
    console.log()
    this.submitted = true;
    if (this.form.invalid){return;}
  
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

}


import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Bpriest } from 'src/app/models/priest.model';

@Component({
  selector: 'app-priestmodal',
  templateUrl: './priestmodal.component.html',
  styleUrls: ['./priestmodal.component.scss']
})
export class PriestmodalComponent implements OnInit {

  form: FormGroup;
  title: string
  submitted: boolean = false;

  priest = new Bpriest()
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PriestmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstname_priest: [this.priest.firstname_priest, Validators.required],
      secondname_priest: [this.priest.secondname_priest],
      lastname_priest: [this.priest.lastname_priest, Validators.required],
      second_lastname_priest: [this.priest.second_lastname_priest],
      credentials: [this.priest.credentials]
    })
  }

  get f (){ return this.form.controls}

  save() {
    this.submitted = true;
    if(this.form.invalid) { return;}

    this.dialogRef.close(this.form.value)
  }

  close() {
    this.dialogRef.close()
  }

}

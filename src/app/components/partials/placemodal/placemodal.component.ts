import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-placemodal',
  templateUrl: './placemodal.component.html',
  styleUrls: ['./placemodal.component.scss']
})
export class PlacemodalComponent implements OnInit {
  form: FormGroup;
  title: string
  submitted: boolean = false

  place = new Place()
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlacemodalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title
   }

  ngOnInit() {

    this.form = this.fb.group({
      id: [this.place.id],
      name: [this.place.name, Validators.required],
      description: [this.place.description]
    })   
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true
    if (this.form.invalid) { return }
    this.dialogRef.close(this.form.value)
  }

  close() {
    this.dialogRef.close()
  }

}

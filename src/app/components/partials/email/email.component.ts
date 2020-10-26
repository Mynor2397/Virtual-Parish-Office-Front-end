import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  form: FormGroup;
  title: string
  notification = new Notification()

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmailComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstname: [this.notification.firstname],
      secondname: [this.notification.secondname],
      thirdname: [this.notification.thirdname],
      lastname: [this.notification.lastname],
      secondlastname: [this.notification.secondlastname],
    })
  }

  get f() { return this.form.controls }

  save() {
    this.dialogRef.close(this.form.value)
  }

  close() {
    this.dialogRef.close()
  }
}


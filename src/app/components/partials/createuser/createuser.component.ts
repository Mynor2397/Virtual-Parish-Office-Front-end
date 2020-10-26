import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Rol } from 'src/app/models/rols.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  form: FormGroup;
  title: string
  user = new User()


  submitted: boolean = false;
  error: string = '';

  rols: Rol[] = []

  constructor(
    private rolsService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateuserComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title
  }

  ngOnInit() {
    this.getrols()

    this.form = this.fb.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      rol: [this.user.rol, Validators.required]
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


  getrols() {
    this.rolsService.rols()
      .subscribe(data => {
        this.rols = data['data']
      }, err => console.log(err))
  }

}

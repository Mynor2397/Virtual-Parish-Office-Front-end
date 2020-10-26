import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { Book } from 'src/app/models/books.model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-bookmodal',
  templateUrl: './bookmodal.component.html',
  styleUrls: ['./bookmodal.component.scss']
})
export class BookmodalComponent implements OnInit {
  submitted: boolean = false;
  form: FormGroup;
  title: string
  book = new Book()


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title
  }

  ngOnInit() {
    this.form = this.fb.group({
      id_book: [this.book.id_book],
      number_book: [this.book.number_book, Validators.required],
      start_date: [this.book.start_date],
      end_date: [this.book.end_date],
      commentary: [this.book.commentary],
      folios: [this.book.folios, Validators.required]
    })
  }

  get f() { return this.form.controls }

  save() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.dialogRef.close(this.form.value)
  }

  close() {
    this.dialogRef.close()
  }
}

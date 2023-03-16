import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss']
})
export class EstablishmentComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    search: ['', Validators.required],
  })

  deleteEstablishmentForm: boolean = false;

  perPage: number = 10;
  activity: "actif" | "inactif" = "actif";

  typeOfEstablishment: string = "clinique privée"
  typesOfEstablishment: string[] = ["clinique privée", "Hopital public"];

  perPageRange: number[] = [10, 20, 30, 40, 50];
  activitiesRange: string[] = ["actif", "inactif"];

  search!: string;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  chang() {
    console.log(this.searchForm.getRawValue());
    console.log(this.activity);
    console.log(this.perPage);
    console.log(this.typeOfEstablishment);
  }

  toggleDeleteEstablishmentForm() {
    this.deleteEstablishmentForm = !this.deleteEstablishmentForm;
  }

}
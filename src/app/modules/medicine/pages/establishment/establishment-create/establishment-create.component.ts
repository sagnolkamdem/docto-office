import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestLoaderService } from '@app/core/services/request-loader.service';
import { City } from '@app/modules/location/interfaces/city.interface';
import { LocationService } from '@app/modules/location/services/location.service';
import { MedecineService } from '@app/modules/medicine/services/medecine.service';
import { Breadscrump } from '@app/shared/components/breadscrumb/interface/breadscrumb.interface';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-establishment-create',
  templateUrl: './establishment-create.component.html',
  styleUrls: ['./establishment-create.component.scss']
})
export class EstablishmentCreateComponent implements OnInit {

  establishmentForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    type: [null, Validators.required],
    city: [null, Validators.required],
    admin_practician: [null, Validators.required],
    address: [null, Validators.required],
    postal_code: [null, Validators.required],
    description: [null, Validators.required],
    status: [false, Validators.required]
  });

  breadscrumbs: Breadscrump[] = [
    {
      reference: {
        name: 'Établissements',
        link: '/medicine/establishments'
      },
      referees: [
        {
          name: "Créer un établissement",
          link: ''
        }
      ]
    }
  ]
  adminTypeTable = ['Mohamed Belaiouer', 'Mohamed Belaiouer1', 'Mohamed Belaiouer2'];
  establishmentTypeTable = ['public', 'prive'];
  cities: City[] = [];
  filteredCities!: Observable<City[]> | undefined;

  
  establishmentType!: string;
  admin!: string;
  loading: boolean = true;
  establishmentFormSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private medecineService: MedecineService,
    private notificationService: NotificationService,
    private requestLoaderService: RequestLoaderService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.filteredCities = this.establishmentForm.get('city')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): City[] {
    return this.cities.filter(city => city.name.toLowerCase().includes(value)).sort((function(a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }));
  }

  checkCity(value: string): boolean {
    if (value) {
      const city = this.cities.filter(city => city.name.toLowerCase() === value.toLowerCase());
    
      if (city.length === 1 && city[0].name === value) {
        return true;
      }
        
      return false;

    }

    return false
  }

  getCities() {
    const filters = {
      per_page: 2000
    }
    this.locationService.getCities(filters)
      .then((data) => {
        this.loading = false;
        this.cities = data.data['cities'].data;
        console.log(this.cities);
      }).catch((error) => {
        this.loading = false;
        this.pushErrorNotif('Une érreur est survenue, veuillez réessayer!');
      })
    ;
  }

  toggleStatus() {
    this.establishmentForm.get('status')?.setValue(!this.establishmentForm.get('status')?.value);
  }

  createEstablishment() {
    this.establishmentFormSubmitted = true;

    if (this.establishmentForm.valid && this.checkCity(this.establishmentForm.get('city')?.value)) {
      this.requestLoaderService.startLoading();
      this.medecineService.postEstablishment(this.establishmentForm.getRawValue())
        .then((data) => {
          this.pushSuccesNotif('Établissement crée avec succès!');
          this.requestLoaderService.stopLoader();
        }).catch((error) => {
          this.requestLoaderService.stopLoader();
          this.pushErrorNotif('Une érreur est survenue, veuillez reéssayer!');
        })
      ;
    }
  }

  pushSuccesNotif(message: string) {
    this.notificationService.notificationController.next({
      isOpen: true,
      title: 'Succès',
      message,
      type: 'success'
    })
    setTimeout(() => {
      this.notificationService.notificationController.next({
        isOpen: false
      })
    }, 3000)
  }

  pushErrorNotif(message: string) {
    this.notificationService.notificationController.next({
      isOpen: true,
      title: 'Érreur',
      message,
      type: 'error'
    })
    setTimeout(() => {
      this.notificationService.notificationController.next({
        isOpen: false
      })
    }, 3000)
  }

}

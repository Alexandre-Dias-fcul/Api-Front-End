import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AgentService } from '../../../services/back-office/agent.service';
import { agentAll } from '../../../models/agentAll';
import dayjs from "dayjs"

@Component({
  selector: 'app-agent-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './agent-register.html',
  styleUrl: './agent-register.css'
})
export class AgentRegister implements OnInit {
  id: number | null = null
  agentForm: FormGroup
  errorMessage: string | null = null;
  agent: agentAll = {} as agentAll

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.makeFormOnEdit(this.id)
  }

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.agentForm = this.fb.group(
      {
        name: this.fb.group({
          firstName: ['', [Validators.required]],
          middleNames: [''],
          lastName: ['', [Validators.required]],
        }),
        isActive: [true, [Validators.required]],
        gender: ['', [Validators.required]],
        dateOfBirth: [null],
        hiredDate: [null],
        dateOfTermination: [null],
        photoFileName: [''],
        supervisorEmail: '',
        role: [null, Validators.required],
      }, {
      validators: Validators.compose([
        this.hireDateValidator('hiredDate', 'dateOfTermination'),
        this.dateOfBirthValidator('dateOfBirth', 'hiredDate')
      ])
    });
  }

  makeFormOnEdit(id: number | null) {
    if (!id) {
      return
    }

    this.agentService.getByIdWithAll(id).subscribe({
      next: (data) => {

        this.agent = data;

        const middleNames = data.name.middleNames ? data.name.middleNames.join(' ') : '';

        if (this.agent.supervisorId != null) {
          this.agentService.getByIdWithAll(this.agent.supervisorId).subscribe({
            next: (supervisor: agentAll) => {
              const supervisorEmail = supervisor.entityLink?.account?.email || '';
              this.agentForm.patchValue({ supervisorEmail });
            }, error: (error) => {
              console.error('Erro ao obter supervisor', error);
              this.errorMessage = error;
            }
          });
        } else {
          this.agentForm.patchValue({ supervisorEmail: '' });
        }

        this.agentForm.patchValue({
          name: {
            firstName: data.name.firstName,
            middleNames: middleNames,
            lastName: data.name.lastName
          },
          isActive: data.isActive,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth ? dayjs(data.dateOfBirth).format('YYYY-MM-DD') : undefined,
          hiredDate: data.hiredDate ? dayjs(data.hiredDate).format('YYYY-MM-DD') : undefined,
          dateOfTermination: data.dateOfTermination ? dayjs(data.dateOfTermination).format('YYYY-MM-DD') : undefined,
          photoFileName: data.photoFileName,
          role: data.role
        });
      }, error: (error) => {
        console.error('Erro ao obter Agent', error);
        this.errorMessage = error;
      }
    });
  }

  validateForm() {

  }

  onSubmit() {
    if (this.agentForm.valid) {
      const agentData: agentAll = {
        id: this.id!,
        name: {
          firstName: this.agentForm.get('name.firstName')?.value,
          middleNames: this.middleNamesToArray(this.agentForm.get('name.middleNames')?.value),
          lastName: this.agentForm.get('name.lastName')?.value
        },
        isActive: Boolean(this.agentForm.get('isActive')?.value),
        gender: this.agentForm.get('gender')?.value,
        dateOfBirth: this.agentForm.get('dateOfBirth')?.value,
        hiredDate: this.agentForm.get('hiredDate')?.value,
        dateOfTermination: this.agentForm.get('dateOfTermination')?.value,
        photoFileName: this.agentForm.get('photoFileName')?.value,
        role: Number(this.agentForm.get('role')?.value),
        supervisorId: this.adminId(this.agentForm.get('supervisorEmail')?.value)!,
      }

      if (this.id) {
        this.updateAgent(agentData)
      } else {
        this.saveAgent(agentData)
      }
    }
    else {
      this.errorMessage = 'Formulário inválido.';
    }

  }

  private updateAgent(agentData: agentAll) {
    this.agentService.updateAgent(agentData).subscribe({
      next: () => {
        this.agentForm.reset();
        this.router.navigate(['/main-page/agent-list']);
      },
      error: (error) => {
        console.error('Erro ao atualizar agente:', error);
        this.errorMessage = error
      }
    });
  }

  private saveAgent(agentData: agentAll) {
    this.agentService.addAgent(agentData).subscribe({
      next: (response) => {
        this.agentForm.reset();
        this.router.navigate(['/main-page/agent-new-account/', response.id, 1]);
      },
      error: (error) => {
        console.error('Erro ao criar agente:', error);
        this.errorMessage = error;
      }
    });
  }


  private middleNamesToArray(middleNames: string) {
    if (middleNames) {
      return middleNames
        .split(' ')
        .map((name: string) => name.trim());
    }
    else {
      return [];
    }
  }

  private adminId(email: string) {
    if (!email) {
      return
    }

    this.agentService.getAgentByEmail(email).subscribe(
      {
        next: (response) => {
          return response.id
        },
        error: (error) => {
          console.error('Erro ao buscar agent:', error);
          this.errorMessage = error;
        }
      }
    )
  }

  private hireDateValidator(hiredDateField: string, dateOfTerminationField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const hiredField = formGroup.get(hiredDateField)?.value;
      const terminationField = formGroup.get(dateOfTerminationField)?.value;

      if (hiredField > terminationField) {
        formGroup.get(dateOfTerminationField)?.setErrors({ invalidDates: true });
        return { invalidDates: true };
      } else {
        formGroup.get(dateOfTerminationField)?.setErrors(null);
        return null;
      }
    };
  }

  private dateOfBirthValidator(dateOfBirthField: string, hiredDateField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const dobField = formGroup.get(dateOfBirthField)?.value;
      const hiredField = formGroup.get(hiredDateField)?.value;
      if (dobField > hiredField) {

        formGroup.get(hiredDateField)?.setErrors({ invalidBirthDate: true });
        return { invalidBirthDate: true };
      } else {
        formGroup.get(hiredDateField)?.setErrors(null);
        return null;
      }
    };
  }
}

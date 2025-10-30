import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '../../../services/back-office/agent.service';

@Component({
  selector: 'app-agent-account-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './agent-account-modal.component.html',
  styleUrl: './agent-account-modal.component.css'
})
export class AgentAccountModalComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() agentId: number | null = null;
  @Input() isEdit: boolean = false;
  @Input() accountEmail: string = ''
  @Output() modalClosed = new EventEmitter<void>();
  @Output() accountCreated = new EventEmitter<void>();

  accountForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private agentService: AgentService) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnChanges(): void {
    if (this.isVisible) {
      if (this.isEdit && this.accountEmail) {
        this.accountForm.patchValue({
          email: this.accountEmail,
          password: ''
        });
      } else {
        this.accountForm.reset();
      }
      this.errorMessage = null;
    }
  }

  onSubmit() {
    if (this.accountForm.valid && this.agentId) {
      this.isLoading = true;
      const accountData = this.accountForm.value;

      if (this.isEdit) {
        this.agentService.agentUpdateAccount(accountData, this.agentId).subscribe(
          (response) => {
            console.log('Conta criada com sucesso:', response);
            this.isLoading = false;
            this.accountCreated.emit();
            this.closeModal();
          },
          (error) => {
            console.error('Erro ao criar conta:', error);
            this.errorMessage = error.error || 'Erro ao criar conta.';
            this.isLoading = false;
          }
        );

        return
      }

      this.agentService.agentAddAccount(accountData, this.agentId).subscribe(
        (response) => {
          console.log('Conta criada com sucesso:', response);
          this.isLoading = false;
          this.accountCreated.emit();
          this.closeModal();
        },
        (error) => {
          console.error('Erro ao criar conta:', error);
          this.errorMessage = error.error || 'Erro ao criar conta.';
          this.isLoading = false;
        }
      );
    } else {
      console.log(this.accountForm.errors)
      this.errorMessage = 'Formulário inválido. Verifique os campos.';
    }
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}

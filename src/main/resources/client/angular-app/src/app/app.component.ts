import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public showModal: boolean = false;
  public method = '';
  public selectedEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error);
      },
    });
  }

   public open(content: any, method: string, employee?: Employee) {
      this.method = method;
      this.selectedEmployee = employee;
      this.modalService.open(
        content,
        {ariaLabelledBy: 'modal-basic-title', backdrop: false, centered: true, scrollable: true}
      );
    }
}

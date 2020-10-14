import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/user.class';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit {
  search$: BehaviorSubject<string> = new BehaviorSubject('');
  public userCurrentList: User[] = [];
  constructor(private data: DataService,
    private router: Router) { 

  }

  ngOnInit(): void {
    // for(let i = 0 ; i<=5 ; i++) {
    //   const user = new User(null,`1234${i}`,`Nhan vien ${i}`,`a${i}@gmail.com`,'Kinh',null,null,null);
    //   this.data.userList.push(user);
    // }
    this.userCurrentList = this.data.userList;
    console.log(this.data.userList);
    this.search$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
    ).subscribe(query => {
      this.userCurrentList = this.data.userList.filter(item => 
        item.userName && (item.userName.toLocaleLowerCase().trim().indexOf(query.toLocaleLowerCase().trim()) !== -1))
    })
  }

  // changeFormEmployee() {
  //   this.router.navigate(['/first-component']); //chuyeen huong routing
  // }

  changeViewEmployee(id: number) {
    this.router.navigate(['/view/',id]); //chuyeen huong routing
  }

  changeEditEmployee(id: number) {
    this.router.navigate(['/edit/',id]); //chuyeen huong routing
  }

  changeCreateEmployee() {
    this.router.navigate(['/create/']); //chuyeen huong routing
  }

  changeSearch(){
    // JS
    // var input, filter, table, tr, td, i, txtValue;
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    // table = document.getElementById("myTable");
    // tr = table.getElementsByTagName("tr");

    // for (i = 0; i < tr.length; i++) {
    //   td = tr[i].getElementsByTagName("td")[2];
    //   if (td) {
    //     txtValue = td.textContent || td.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }
    // }


  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  allTransactions: any;
  searchkey: string = ''
  constructor(private api: ApiService,private router:Router) {

  }
  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      alert("Please Login")
      //navigate to login
      this.router.navigateByUrl('')
    }
    this.api.getAllTransactions()
      .subscribe((result: any) => {
        this.allTransactions = result.transaction
        console.log(this.allTransactions);
      });

  }
  //search
  search(event: any) {
    this.searchkey = event.target.value
  }
  //generatwe pdf
  generatePdf() {
    var pdf = new jspdf()
    let col = ['Type','fromAcno','ToAcno','Amount']
    let row: any = []
    pdf.setFontSize(16);
    pdf.text('Mini statment', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    //convert allTYransaction to rested array
    var itemNew = this.allTransactions
    console.log(itemNew)
    for (let element of itemNew) {
      var temp = [element.type,element.fromAcno,element.toAcno,element.amount]
      row.push(temp)
    }
    (pdf as any).autoTable(col, row, { startY: 10 })
    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')
    // Download PDF doc  
    pdf.save('Ministatment.pdf');
  }
}

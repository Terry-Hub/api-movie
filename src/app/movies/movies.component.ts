import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../service/movies.service';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @Input()
  public result: Observable<any>;

  public details: Observable<any>;

  public categories: String;

  closeResult: string;
  
  
  /*constructor(public moviesService: MoviesService) {
    this.result = moviesService.resolveItems();
  }*/
  
  constructor(private http: HttpClient,private modalService: NgbModal) { }



  ngOnInit(): void {
    this.http.get<any>('http://www.omdbapi.com/?s=movies&type=movie&page=1&apikey=afb82e05').subscribe(data => {
      this.result = data.Search;
    })

    this.categories = 'movies'
  }

  

  films()
  {
    this.http.get<any>('http://www.omdbapi.com/?s=movies&type=movie&page=1&apikey=afb82e05').subscribe(data => {
      this.result = data.Search;
    })

    this.categories = 'movies'
  }

  series() 
  {
    this.http.get<any>('http://www.omdbapi.com/?s=series&type=series&page=1&apikey=afb82e05').subscribe(data => {
      this.result = data.Search;
    })

    this.categories = 'series'
  }
  
  emissions()
  {
    this.http.get<any>('http://www.omdbapi.com/?s=shows&page=1&apikey=afb82e05').subscribe(data => {
      this.result = data.Search;
    })

    this.categories = 'shows'
  }

  onSubmit(f: NgForm) {
    console.log(f.value.recherche);

    this.http.get<any>('http://www.omdbapi.com/?s='+f.value.recherche+'&apikey=afb82e05').subscribe(data => {
      this.result = data.Search;
    })
  }

  pagination(id)
  {

   
   
    if(this.categories == "movies")
    {
      this.http.get<any>('http://www.omdbapi.com/?s=movies&type=movie&page='+id+'&apikey=afb82e05').subscribe(data => {
        this.result = data.Search;
      })
     
      window.scrollTo(0,0);
    }

    if(this.categories == "series")
    {
      this.http.get<any>('http://www.omdbapi.com/?s=series&type=series&page='+id+'&apikey=afb82e05').subscribe(data => {
        this.result = data.Search;
      })
      window.scrollTo(0,0);
    }

    if(this.categories == "shows")
    {
      this.http.get<any>('http://www.omdbapi.com/?s=shows&page='+id+'&apikey=afb82e05').subscribe(data => {
      this.result = data.Search;
    })

     window.scrollTo(0,0);
    
    }


  }

  open(content,imdbid) {
     
    this.http.get<any>('http://www.omdbapi.com/?i='+imdbid+'&apikey=afb82e05').subscribe(data => {
      this.details = data;

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
  
      }, (reason) => {
  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
      });
      
    })

    

  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }


}

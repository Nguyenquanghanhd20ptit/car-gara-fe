import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn : "root"
})
export class ConfigService{
  config: any;
  loader: any;
  private http: HttpClient;
  constructor(private httpBack: HttpBackend) {
    this.http = new HttpClient(httpBack);
  }

  loadConfig() {
    if (this.loader) {
      this.loader.style.display = 'block';
      this.loader.classList.add('d-flex');
    }
    return this.http
      .get("./assets/configuration/configuration.json")
      .toPromise()
      .then((config) => {
        console.log("fđf" + config);
        this.config = config;
        if (this.loader) {
          this.loader.style.display = 'none';
          this.loader.classList.remove('d-flex');
        }
      });
  }
}
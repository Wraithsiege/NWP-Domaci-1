import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services/config.service'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit{
  token: string;

  constructor(private configService: ConfigService) {
    this.token = this.configService.getToken();
  }

  ngOnInit(): void {
    console.log("Configuration Page");
  }

  setToken() {
    this.configService.setToken(this.token);
  }
}

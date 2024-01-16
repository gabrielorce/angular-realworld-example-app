import { Component, OnInit } from "@angular/core";
import { AppConfig, AppConfigService } from "./service/AppConfigService";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  config: AppConfig | undefined;

  constructor(private configService: AppConfigService) {}

  ngOnInit(): void {
    this.config = this.configService.readConfig();
  }
}

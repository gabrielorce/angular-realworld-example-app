import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { HttpClient, HttpBackend } from "@angular/common/http";

//Move this type to a shared folder
export interface AppConfig {
  textkey: string;
}

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  //We create the configuration with default values in case anything fails
  private configuration: AppConfig = {
    textkey: "testDEVPROD",
  };

  private httpClient: HttpClient;
  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  //This function will get the current config for the environment
  setConfig(): Promise<void | AppConfig> {
    return firstValueFrom(
      this.httpClient.get<AppConfig>("/assets/appConfig.json"),
    )
      .then((config: AppConfig) => (this.configuration = config))
      .catch((error) => {
        console.error(error);
      });
  }

  //We're going to use this function to read the config.
  readConfig(): AppConfig {
    return this.configuration;
  }
}

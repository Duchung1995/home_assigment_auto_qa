import { MasterTest } from "../configs/masterTest";
import { Request } from "./request";
import { VerificationAPI } from "./verficationAPI";

export class API {
  public readonly request: Request;
  public readonly verficationAPI: VerificationAPI;

  constructor(masterTest: MasterTest) {
    this.request = new Request(masterTest);
    this.verficationAPI = new VerificationAPI();
  }
}

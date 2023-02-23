import { MasterTest } from "../configs/masterTest";
import { CommonAction } from "./commonAction";
import { Verification } from "./verfication";

export class WebUI {
  public readonly commonAction: CommonAction;
  public readonly verification: Verification;

  constructor(masterTest: MasterTest) {
    this.commonAction = new CommonAction(masterTest);
    this.verification = new Verification(masterTest);
  }
}

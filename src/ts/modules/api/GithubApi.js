import Api from "./Api";
import { FULL_URL, ACCEPT } from "../../constants/githubApi";

export default class GithubApi extends Api{
  getCommits = () => this._get(FULL_URL, {}, { headers: { Accept: ACCEPT } });
}

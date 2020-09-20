import Api from "./Api";
import { FULL_URL, ACCEPT } from "../../constants/githubApi";
import { DetailedCommit } from "../../types";

export default class GithubApi extends Api{
  getCommits = (): Promise<DetailedCommit[]> =>{
    const headers = new Headers();
    headers.append('Accept', ACCEPT);
    return this.http<DetailedCommit[]>(FULL_URL, {
      method: 'GET',
      headers: headers
    });
  }
}

import BaseComponent from "../../ts/components/BaseComponent";
import { getDateWithStringMonth } from "../../ts/utils/dateHelper";
import ITemplateElement from "../../ts/interfaces/ITemplateElement";
import { DetailedCommit } from "../../ts/types";

export default class CommitCard extends BaseComponent implements ITemplateElement{
  constructor(template: HTMLElement){
    super(template);
  }

  create({ commit, author }: DetailedCommit){
    const { committer, message } = commit;
    const { name, email, date } = committer;
    const { avatar_url } = author;

    const newCommitCard = <HTMLElement>this._element.cloneNode(true);

    const dateNode = <HTMLElement>newCommitCard.querySelector('.commit-card__date');
    dateNode.textContent = getDateWithStringMonth(date);

    const avatarNode = <HTMLElement>newCommitCard.querySelector('.committer__avatar');
    avatarNode.setAttribute('src', avatar_url);

    const nameNode = <HTMLElement>newCommitCard.querySelector('.committer__name');
    nameNode.textContent = name;

    const emailNode = <HTMLElement>newCommitCard.querySelector('.committer__mail');
    emailNode.textContent = email;

    const messageNode = <HTMLElement>newCommitCard.querySelector('.commit-card__message');
    messageNode.textContent = message;

    return newCommitCard;
  }
}

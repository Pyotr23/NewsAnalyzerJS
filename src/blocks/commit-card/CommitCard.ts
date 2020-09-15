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

    const newCommitCard = <HTMLElement>this.getElement().cloneNode(true);

    const dateNode = newCommitCard.querySelector('.commit-card__date');
    dateNode.textContent = getDateWithStringMonth(date);

    const avatarNode = newCommitCard.querySelector('.committer__avatar');
    avatarNode.setAttribute('src', avatar_url);

    const nameNode = newCommitCard.querySelector('.committer__name');
    nameNode.textContent = name;

    const emailNode = newCommitCard.querySelector('.committer__mail');
    emailNode.textContent = email;

    const messageNode = newCommitCard.querySelector('.commit-card__message');
    messageNode.textContent = message;

    return newCommitCard;
  }
}

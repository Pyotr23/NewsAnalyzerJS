import BaseComponent from "../../js/components/BaseComponent";
import { getDateWithStringMonth } from "../../js/utils/dateHelper";

export default class CommitCard extends BaseComponent{
  constructor(...args){
    super(...args);
  }

  create({ commit, author }){
    const { committer, message } = commit;
    const { name, email, date } = committer;
    const { avatar_url } = author;

    const newCommitCard = this._element.cloneNode(true);

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

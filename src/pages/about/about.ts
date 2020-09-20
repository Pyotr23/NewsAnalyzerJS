import './about.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import { SWIPER_CONFIG } from '../../ts/constants/swiperConfig';
import GithubApi from '../../ts/modules/api/GithubApi';
import Container from '../../ts/components/Container';
import CommitCard from '../../blocks/commit-card/CommitCard';
import { SHOWED_COMMITS_PACK_SIZE } from '../../ts/constants/github';
import { REPO_URL } from '../../ts/constants/githubApi';
import Button from '../../blocks/button/Button';

const commitsNode = <HTMLElement>document.querySelector('.commits');
const commitTemplate = <HTMLTemplateElement>document.querySelector('#commit-template');
const commitCardNode = <HTMLElement>commitTemplate.content.querySelector('.swiper-slide');
const githubbButtonNode = <HTMLElement>document.querySelector('.button_place_commits');
const commitContainer = <HTMLElement>commitsNode.querySelector('.swiper-wrapper');

const githubApi = new GithubApi();
const commitsContainer = new Container(commitContainer, commitsNode)
const button = new Button(githubbButtonNode, showRepo);

Swiper.use([Navigation, Pagination]);

function initSwiper() {
  new Swiper('.swiper__container', SWIPER_CONFIG);
}

function showRepo(): void {
  window.open(REPO_URL);
}

function init(): void {
  githubApi
    .getCommits()
    .then(dtoCommits => {
      const commits = dtoCommits.slice(0, SHOWED_COMMITS_PACK_SIZE);
      const commitCards = commits.map(commit => new CommitCard(commitCardNode).create(commit))
      commitsContainer.render(commitCards);
      initSwiper();
    })
    .catch(error => alert(error));;
}

init();

import './about.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import { SWIPER_CONFIG } from '../../js/constants/swiperConfig';
import GithubApi from '../../js/modules/api/GithubApi';
import Container from '../../js/components/Container';
import CommitCard from '../../blocks/commit-card/CommitCard';
import { SHOWED_COMMITS_PACK_SIZE } from '../../js/constants/github';
import { REPO_URL } from '../../js/constants/githubApi';
import Button from '../../blocks/button/Button';

const commitsNode = document.querySelector('.commits');
const commitCardNode = document.getElementById('commit-template').content.querySelector('.swiper-slide');
const githubbButtonNode = document.querySelector('.button_place_commits');

const githubApi = new GithubApi();
const commitsContainer = new Container('.swiper-wrapper', commitsNode)
const button = new Button(githubbButtonNode);
button.addClickHandler(showRepo);

Swiper.use([Navigation, Pagination]);

function initSwiper() {
  new Swiper('.swiper__container', SWIPER_CONFIG);
}

function showRepo() {
  window.open(REPO_URL);
}

function init(){
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

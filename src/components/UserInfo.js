export class UserInfo {
  constructor(nameProfileSelector, jobProfileSelector) {
    this._nameProfile = document.querySelector(nameProfileSelector);
    this._jobProfile = document.querySelector(jobProfileSelector);
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent
    }
  }

  setUserInfo(name, job) {
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = job;
  }
}

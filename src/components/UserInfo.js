export class UserInfo {
  constructor(nameProfileSelector, jobProfileSelector, userAvatarSelector) {
    this._nameProfile = document.querySelector(nameProfileSelector);
    this._jobProfile = document.querySelector(jobProfileSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent
    }
  }

  setUserInfo(name, job, avatar) {
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = job;
    this._userAvatar.src = avatar;
    this._userAvatar.alt = name;
  }
}

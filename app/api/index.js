const API_ROOT = process.env.NODE_ENV === 'production' ? '//api.perkfec.com' : '//localhost:1337'
const WEBAPP_DOMAIN = process.env.NODE_ENV === 'production' ? 'perkfec.com' : 'localhost:3000'

// API for checking subdomain available
export function verifySubDomain() {
  const subDomain = window.location.hostname.split('.')[0]
  return fetch(`${API_ROOT}/teams/verifysubdomain/${subDomain}`)
    .then(statusHelper)
    .then(responseBody)
}

// API for checking user exist via invite link in email
export function fetchVerifyUser(data) {
  return fetch(`${API_ROOT}/users/verify/${data.email}?accessToken=${data.accessToken}`)
    .then(statusHelper)
    .then(responseBody)
}

// API for checking username/password
export function userLogin(data) {
  return fetch(`${API_ROOT}/oauth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

// API for authorizing user's access_token
// fetching user's info if available
export function checkToken(token) {
  return fetch(`${API_ROOT}/users/current`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${token}`,
    },
  }).then(statusHelper)
    .then(responseBody)
}

export function createNewFeedBackAnonymousUrl(data) {
  return fetch(`${API_ROOT}/feedbackanonymousurls/get_anonymous_urls`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(responseBody)
}

export function createRegisterLink(subDomain) {
  const initRequest = { subDomain }
  return fetch(`${API_ROOT}/users/create_invite_link`, {
    method: 'POST',
    body: JSON.stringify(initRequest),
  })
    .then(responseBody)
}

export function updateFeedbackStatus(data) {
  return fetch(`${API_ROOT}/feedbackitemresponses/updataStatusFeedback`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${data.accessToken}`,
    },
    body: JSON.stringify({ id: data.id, status: 'seen' }),
  }).then(statusHelper)
    .then(responseBody)
}

export function createTakeActionResponse(data) {
  return fetch(`${API_ROOT}/feedbackitemresponses/create_feedback_take_action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${data.accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function updateProfileUserAPI(data, token) {
  return fetch(`${API_ROOT}/users/editprofile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function uploadAvatarAPI(imgFile) {
  return fetch(`${API_ROOT}/file/uploadfile`, {
    method: 'POST',
    body: imgFile,
  }).then(responseBody)
}

export function getCompanyMembers() {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/users/members_company`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }).then(statusHelper)
    .then(responseBody)
}

export function inviteByEmail(values) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  const initRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  }
  return fetch(`${API_ROOT}/users/register`, initRequest)
    .then(responseBody)
}

export function inviteInactivatedEmail(values, accessToken) {
  const initRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  }
  return fetch(`${API_ROOT}/users/register`, initRequest)
    .then(responseBody)
}

export function getMemberProfileResponse(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/users/member_by_code/${data.code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }).then(statusHelper)
    .then(responseBody)
}

export function getLogProccesses(data) {
  return fetch(`${API_ROOT}/logproccesses/getlog`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${data.accessToken}`,
    },
  }).then(statusHelper)
    .then(responseBody)
}

export function changePasswordAPI(data) {
  const initRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${data.accessToken}`,
    },
    body: JSON.stringify(data.values),
  }
  return fetch(`${API_ROOT}/users/changepassword`, initRequest)
    .then(statusHelper)
    .then(responseBody)
}

export function upgradeUserToAdmin(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  const initRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${API_ROOT}/users/upgrade_admin`, initRequest)
    .then(statusHelper)
    .then(responseBody)
}

export function upgradeUserToOwner(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  const initRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${API_ROOT}/users/upgrade_owner`, initRequest)
    .then(statusHelper)
    .then(responseBody)
}

export function downGradeUserRole(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  const initRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${API_ROOT}/users/downgrade_user`, initRequest)
    .then(statusHelper)
    .then(responseBody)
}

export function deleteUser(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  const initRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${API_ROOT}/users/delete_user`, initRequest)
    .then(statusHelper)
    .then(responseBody)
}

export function verifyRegisterCode(data) {
  return fetch(`${API_ROOT}/users/verify_register_link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function registerByLink(data) {
  return fetch(`${API_ROOT}/users/register_by_invite_link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function forgotPassword(data) {
  return fetch(`${API_ROOT}/users/forgot_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function setNewPassword(data) {
  return fetch(`${API_ROOT}/users/change_password_in_forgot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function verifyAnonymousUrl(data) {
  return fetch(`${API_ROOT}/feedbackanonymousurls/verify_anonymous_urls`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getAnonymousQuestions(data) {
  return fetch(`${API_ROOT}/feedbackitemsamples/createfeedbacksamples`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .then(responseBody)
}

export function createAnonymousFeedback(data) {
  return fetch(`${API_ROOT}/feedBacklistresponses/createfeedback`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function uploadFileAnonymousFeedback(file) {
  return fetch(`${API_ROOT}/file/uploadfilefeedback`, {
    method: 'POST',
    body: file,
  }).then(responseBody)
}

export function verifyTrackingUrl(data) {
  return fetch(`${API_ROOT}/feedBacklistresponses/getlistfeedback`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .then(responseBody)
}

export function sendUrlToEmail(data) {
  return fetch(`${API_ROOT}/feedBacklistresponses/send_url_feedback_list_to_email`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .then(responseBody)
}

export function ratingFeedback(data) {
  return fetch(`${API_ROOT}/feedbacklistresponses/rating_feedback`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .then(responseBody)
}

// TODO: unclear name of function
export function loginByUrlParameters(subDomain, loginData) {
  return `//${subDomain}.${WEBAPP_DOMAIN}/login/?email=${loginData.email}&accessToken=${loginData.accessToken}`
}

export function getAllFeedbackStats(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/feedbackitemresponses/get_stat_of_all_issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getAllFeedback(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/feedbackitemresponses/get_issue_by_type`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getFeedbackDiscussionByCode(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/feedbackitemresponses/get_public_issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function voteForFeedbackByCode(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/activities/create_vote_public_issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function commentFeedbackByCode(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/activities/create_comment_public_issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function updateFeedbackByCode(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/activities/update_content_public_issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getSampleByType(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/feedbackitemsamples/createfeedbacksamples_unanonymous`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function fetchAllCompetenciesFromServer(accessToken) {
  return fetch(`${API_ROOT}/compentencies/get_all_compentencies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `bearer ${accessToken}`,
    },
  }).then(statusHelper)
    .then(responseBody)
}

export function submitIssue(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/feedbackitemresponses/create_public_issue`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function updateStatePublicIssue(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/activities/update_state_public_issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getSurveyQuestion(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/get_survey_question_per_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function replySurvey(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/create_survey_response_per_question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getQuestionTypes(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/questions/get_all_type_input`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getAllSurveyTemplates(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/feedbackitemsamples/get_all_survey_template`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getMyCreatedSurveys(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/get_my_created_survey`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getMyRequestedSurveys(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/get_all_survey_need_to_ask`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getSurveyDetailByTemplateCode(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/feedbackitemsamples/get_feedback_samples_by_code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

// Create survey in Step 1
export function createSurveyStep1(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/submit_survey_content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function submitSurveySetting(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/submit_survey_setting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function publishSurvey(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/publish_survey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function deleteSurvey(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/send_survey_to_trash`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

export function getSurveyByTemplateCode(data) {
  const accessToken = localStorage.getItem('perkfecAccessCode')
  return fetch(`${API_ROOT}/survey/get_survey_by_template_code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(statusHelper)
    .then(responseBody)
}

// -----------------------------------------------

function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}

function responseBody(response) {
  return response.json().then((body) => ({
    status: response.status,
    statusText: response.statusText,
    ...body,
  }))
}
